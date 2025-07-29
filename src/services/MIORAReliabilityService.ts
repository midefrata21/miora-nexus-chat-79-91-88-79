// MIORA Reliability Service - API Failover & Error Recovery System
interface APIEndpoint {
  url: string;
  name: string;
  priority: number;
  status: 'active' | 'down' | 'maintenance';
  responseTime: number;
  errorRate: number;
  lastChecked: number;
}

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

class MIORAReliabilityService {
  private endpoints: APIEndpoint[] = [
    {
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      name: 'Gemini Primary',
      priority: 1,
      status: 'active',
      responseTime: 0,
      errorRate: 0,
      lastChecked: Date.now()
    },
    {
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
      name: 'Gemini Pro Fallback',
      priority: 2,
      status: 'active',
      responseTime: 0,
      errorRate: 0,
      lastChecked: Date.now()
    }
  ];

  private circuitBreakerState: Map<string, {
    state: 'closed' | 'open' | 'half-open';
    failureCount: number;
    lastFailureTime: number;
    nextAttemptTime: number;
  }> = new Map();

  private retryConfig: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2
  };

  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  constructor() {
    this.initializeCircuitBreakers();
    this.startHealthMonitoring();
  }

  private initializeCircuitBreakers() {
    this.endpoints.forEach(endpoint => {
      this.circuitBreakerState.set(endpoint.url, {
        state: 'closed',
        failureCount: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0
      });
    });
  }

  private healthCheckInterval: NodeJS.Timeout | null = null;

  private startHealthMonitoring() {
    // Clear existing interval if any
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    // Only start health monitoring in production or when specifically needed
    if (process.env.NODE_ENV === 'production') {
      this.healthCheckInterval = setInterval(() => {
        this.healthCheck();
      }, 120000); // Health check every 2 minutes (reduced frequency)
    }
  }

  private async healthCheck() {
    for (const endpoint of this.endpoints) {
      try {
        const startTime = Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        // Use POST with minimal payload instead of HEAD for Gemini API
        const response = await fetch(endpoint.url + '?key=' + (process.env.GEMINI_API_KEY || 'test'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "OK" }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 5
            }
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        const responseTime = Date.now() - startTime;
        endpoint.responseTime = responseTime;
        endpoint.lastChecked = Date.now();
        
        if (response.ok) {
          endpoint.status = 'active';
          this.resetCircuitBreaker(endpoint.url);
          console.log(`[MIORA RELIABILITY] Health check passed for ${endpoint.name}`);
        } else {
          this.recordFailure(endpoint.url);
        }
      } catch (error) {
        // Only log in development or if it's a new error
        if (process.env.NODE_ENV === 'development') {
          console.debug(`[MIORA RELIABILITY] Health check failed for ${endpoint.name} - this is expected in development`);
        }
        endpoint.status = 'down';
        this.recordFailure(endpoint.url);
      }
    }
  }

  public stopHealthMonitoring() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  private recordFailure(endpointUrl: string) {
    const breaker = this.circuitBreakerState.get(endpointUrl);
    if (breaker) {
      breaker.failureCount++;
      breaker.lastFailureTime = Date.now();
      
      // Open circuit breaker after 3 failures
      if (breaker.failureCount >= 3) {
        breaker.state = 'open';
        breaker.nextAttemptTime = Date.now() + 60000; // 1 minute timeout
        console.warn(`[MIORA RELIABILITY] Circuit breaker opened for ${endpointUrl}`);
      }
    }
  }

  private resetCircuitBreaker(endpointUrl: string) {
    const breaker = this.circuitBreakerState.get(endpointUrl);
    if (breaker) {
      breaker.failureCount = 0;
      breaker.state = 'closed';
      breaker.nextAttemptTime = 0;
    }
  }

  private isCircuitBreakerOpen(endpointUrl: string): boolean {
    const breaker = this.circuitBreakerState.get(endpointUrl);
    if (!breaker) return false;
    
    if (breaker.state === 'open') {
      // Check if it's time to try half-open
      if (Date.now() > breaker.nextAttemptTime) {
        breaker.state = 'half-open';
        return false;
      }
      return true;
    }
    
    return false;
  }

  public getAvailableEndpoints(): APIEndpoint[] {
    return this.endpoints
      .filter(endpoint => 
        endpoint.status === 'active' && 
        !this.isCircuitBreakerOpen(endpoint.url)
      )
      .sort((a, b) => a.priority - b.priority);
  }

  public async makeResilientRequest<T>(
    requestConfig: {
      path: string;
      method?: string;
      body?: any;
      headers?: Record<string, string>;
    },
    cacheKey?: string,
    cacheTTL: number = 300000 // 5 minutes default
  ): Promise<T> {
    // Try cache first
    if (cacheKey) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached) {
        console.log(`[MIORA RELIABILITY] Cache hit for ${cacheKey}`);
        return cached;
      }
    }

    const availableEndpoints = this.getAvailableEndpoints();
    
    if (availableEndpoints.length === 0) {
      throw new Error('No available endpoints for request');
    }

    let lastError: Error | null = null;

    for (const endpoint of availableEndpoints) {
      for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
        try {
          if (attempt > 0) {
            const delay = Math.min(
              this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt - 1),
              this.retryConfig.maxDelay
            );
            await this.sleep(delay);
            console.log(`[MIORA RELIABILITY] Retry attempt ${attempt} for ${endpoint.name} after ${delay}ms`);
          }

          const response = await this.executeRequest<T>(endpoint, requestConfig);
          
          // Reset circuit breaker on successful request
          this.resetCircuitBreaker(endpoint.url);
          
          // Cache successful response
          if (cacheKey && response) {
            this.setCache(cacheKey, response, cacheTTL);
          }
          
          console.log(`[MIORA RELIABILITY] Successful request via ${endpoint.name}`);
          return response;
          
        } catch (error) {
          lastError = error as Error;
          console.warn(`[MIORA RELIABILITY] Request failed on ${endpoint.name}, attempt ${attempt + 1}:`, error);
          
          // Record failure for circuit breaker
          this.recordFailure(endpoint.url);
          
          // If it's a 503 error, try next endpoint immediately
          if (error instanceof Error && error.message.includes('503')) {
            break; // Skip retries for this endpoint, try next one
          }
        }
      }
    }

    throw lastError || new Error('All endpoints failed after retries');
  }

  private async executeRequest<T>(
    endpoint: APIEndpoint, 
    config: {
      path: string;
      method?: string;
      body?: any;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      const startTime = Date.now();
      
      const response = await fetch(`${endpoint.url}${config.path || ''}`, {
        method: config.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      // Update response time
      endpoint.responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data: T = await response.json();
      return data;
      
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.timestamp + cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  }

  private setCache<T>(key: string, data: T, ttl: number) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Public methods for monitoring
  public getSystemStatus() {
    return {
      endpoints: this.endpoints.map(endpoint => ({
        ...endpoint,
        circuitBreakerState: this.circuitBreakerState.get(endpoint.url)
      })),
      cacheSize: this.cache.size,
      availableEndpoints: this.getAvailableEndpoints().length
    };
  }

  public clearCache() {
    this.cache.clear();
    console.log('[MIORA RELIABILITY] Cache cleared');
  }

  public resetAllCircuitBreakers() {
    this.endpoints.forEach(endpoint => {
      this.resetCircuitBreaker(endpoint.url);
    });
    console.log('[MIORA RELIABILITY] All circuit breakers reset');
  }

  public destroy() {
    this.stopHealthMonitoring();
    this.clearCache();
    this.circuitBreakerState.clear();
  }
}

// Export singleton instance
export const mioraReliabilityService = new MIORAReliabilityService();
export default MIORAReliabilityService;