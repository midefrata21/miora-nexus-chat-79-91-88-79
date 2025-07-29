// MIORA Smart Load Balancer - Advanced Request Distribution
interface LoadBalancerEndpoint {
  id: string;
  url: string;
  name: string;
  weight: number;
  currentLoad: number;
  maxLoad: number;
  responseTime: number;
  successRate: number;
  isHealthy: boolean;
  lastUsed: number;
}

interface RequestMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  throughputPerSecond: number;
}

class MIORALoadBalancer {
  private endpoints: Map<string, LoadBalancerEndpoint> = new Map();
  private requestQueue: Array<{
    id: string;
    priority: number;
    timestamp: number;
    request: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];
  
  private metrics: RequestMetrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    throughputPerSecond: 0
  };

  private isProcessingQueue = false;
  private maxConcurrentRequests = 10;
  private currentConcurrentRequests = 0;

  constructor() {
    this.initializeEndpoints();
    this.startQueueProcessor();
    this.startMetricsCalculation();
  }

  private initializeEndpoints() {
    const defaultEndpoints = [
      {
        id: 'gemini-primary',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        name: 'Gemini Flash Primary',
        weight: 10,
        maxLoad: 20
      },
      {
        id: 'gemini-pro',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
        name: 'Gemini Pro Backup',
        weight: 8,
        maxLoad: 15
      },
      {
        id: 'gemini-experimental',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-exp-1206:generateContent',
        name: 'Gemini Experimental',
        weight: 6,
        maxLoad: 10
      }
    ];

    defaultEndpoints.forEach(config => {
      this.endpoints.set(config.id, {
        ...config,
        currentLoad: 0,
        responseTime: 0,
        successRate: 100,
        isHealthy: true,
        lastUsed: 0
      });
    });
  }

  private startQueueProcessor() {
    setInterval(() => {
      this.processQueue();
    }, 100); // Process queue every 100ms
  }

  private startMetricsCalculation() {
    setInterval(() => {
      this.calculateThroughput();
    }, 1000); // Calculate throughput every second
  }

  private calculateThroughput() {
    // This would be more sophisticated in a real implementation
    // For now, we'll estimate based on recent activity
    const now = Date.now();
    const recentRequests = this.requestQueue.filter(
      req => now - req.timestamp < 1000
    ).length;
    
    this.metrics.throughputPerSecond = recentRequests;
  }

  public async distribute<T>(
    request: () => Promise<T>,
    priority: number = 1
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      this.requestQueue.push({
        id: requestId,
        priority,
        timestamp: Date.now(),
        request,
        resolve,
        reject
      });

      // Sort queue by priority (higher priority first)
      this.requestQueue.sort((a, b) => b.priority - a.priority);
      
      this.metrics.totalRequests++;
    });
  }

  private async processQueue() {
    if (this.isProcessingQueue || this.requestQueue.length === 0) {
      return;
    }

    if (this.currentConcurrentRequests >= this.maxConcurrentRequests) {
      return;
    }

    this.isProcessingQueue = true;

    while (
      this.requestQueue.length > 0 && 
      this.currentConcurrentRequests < this.maxConcurrentRequests
    ) {
      const queuedRequest = this.requestQueue.shift();
      if (!queuedRequest) break;

      this.currentConcurrentRequests++;
      this.executeRequest(queuedRequest);
    }

    this.isProcessingQueue = false;
  }

  private async executeRequest(queuedRequest: {
    id: string;
    priority: number;
    timestamp: number;
    request: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }) {
    const selectedEndpoint = this.selectOptimalEndpoint();
    
    if (!selectedEndpoint) {
      this.currentConcurrentRequests--;
      queuedRequest.reject(new Error('No healthy endpoints available'));
      this.metrics.failedRequests++;
      return;
    }

    const startTime = Date.now();
    selectedEndpoint.currentLoad++;
    selectedEndpoint.lastUsed = Date.now();

    try {
      console.log(`[MIORA LOAD BALANCER] Executing request ${queuedRequest.id} on ${selectedEndpoint.name}`);
      
      const result = await queuedRequest.request();
      const responseTime = Date.now() - startTime;
      
      // Update endpoint metrics
      selectedEndpoint.responseTime = this.calculateMovingAverage(
        selectedEndpoint.responseTime,
        responseTime,
        0.1 // Alpha for exponential moving average
      );
      
      selectedEndpoint.successRate = this.calculateMovingAverage(
        selectedEndpoint.successRate,
        100,
        0.05
      );

      // Update global metrics
      this.metrics.successfulRequests++;
      this.metrics.averageResponseTime = this.calculateMovingAverage(
        this.metrics.averageResponseTime,
        responseTime,
        0.1
      );

      queuedRequest.resolve(result);
      
      console.log(`[MIORA LOAD BALANCER] Request ${queuedRequest.id} completed in ${responseTime}ms`);
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Update endpoint metrics for failure
      selectedEndpoint.successRate = this.calculateMovingAverage(
        selectedEndpoint.successRate,
        0,
        0.1
      );

      // Mark endpoint as unhealthy if success rate drops below 50%
      if (selectedEndpoint.successRate < 50) {
        selectedEndpoint.isHealthy = false;
        console.warn(`[MIORA LOAD BALANCER] Endpoint ${selectedEndpoint.name} marked as unhealthy`);
      }

      this.metrics.failedRequests++;
      
      console.error(`[MIORA LOAD BALANCER] Request ${queuedRequest.id} failed:`, error);
      queuedRequest.reject(error);
    } finally {
      selectedEndpoint.currentLoad--;
      this.currentConcurrentRequests--;
    }
  }

  private selectOptimalEndpoint(): LoadBalancerEndpoint | null {
    const healthyEndpoints = Array.from(this.endpoints.values())
      .filter(endpoint => endpoint.isHealthy && endpoint.currentLoad < endpoint.maxLoad);

    if (healthyEndpoints.length === 0) {
      return null;
    }

    // Weighted Round Robin with Response Time consideration
    let bestEndpoint = healthyEndpoints[0];
    let bestScore = this.calculateEndpointScore(bestEndpoint);

    for (const endpoint of healthyEndpoints) {
      const score = this.calculateEndpointScore(endpoint);
      if (score > bestScore) {
        bestScore = score;
        bestEndpoint = endpoint;
      }
    }

    return bestEndpoint;
  }

  private calculateEndpointScore(endpoint: LoadBalancerEndpoint): number {
    // Calculate score based on multiple factors
    const loadFactor = 1 - (endpoint.currentLoad / endpoint.maxLoad);
    const responseFactor = endpoint.responseTime > 0 ? 1000 / endpoint.responseTime : 1;
    const successFactor = endpoint.successRate / 100;
    const weightFactor = endpoint.weight / 10;
    const freshnessFactor = Date.now() - endpoint.lastUsed > 10000 ? 1.2 : 1; // Prefer less recently used

    return loadFactor * responseFactor * successFactor * weightFactor * freshnessFactor;
  }

  private calculateMovingAverage(current: number, newValue: number, alpha: number): number {
    return alpha * newValue + (1 - alpha) * current;
  }

  // Health check and recovery
  public async performHealthCheck() {
    const healthPromises = Array.from(this.endpoints.values()).map(async (endpoint) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const startTime = Date.now();
        const response = await fetch(endpoint.url, {
          method: 'HEAD',
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const responseTime = Date.now() - startTime;

        if (response.ok || response.status === 405) { // 405 Method Not Allowed is expected for HEAD
          endpoint.isHealthy = true;
          endpoint.responseTime = this.calculateMovingAverage(endpoint.responseTime, responseTime, 0.2);
          console.log(`[MIORA LOAD BALANCER] Health check passed for ${endpoint.name}`);
        } else {
          endpoint.isHealthy = false;
        }
      } catch (error) {
        endpoint.isHealthy = false;
        console.warn(`[MIORA LOAD BALANCER] Health check failed for ${endpoint.name}:`, error);
      }
    });

    await Promise.all(healthPromises);
  }

  // Public API for monitoring
  public getMetrics(): RequestMetrics & {
    endpoints: LoadBalancerEndpoint[];
    queueSize: number;
    concurrentRequests: number;
  } {
    return {
      ...this.metrics,
      endpoints: Array.from(this.endpoints.values()),
      queueSize: this.requestQueue.length,
      concurrentRequests: this.currentConcurrentRequests
    };
  }

  public resetMetrics() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      throughputPerSecond: 0
    };
    console.log('[MIORA LOAD BALANCER] Metrics reset');
  }

  public addEndpoint(config: {
    id: string;
    url: string;
    name: string;
    weight: number;
    maxLoad: number;
  }) {
    this.endpoints.set(config.id, {
      ...config,
      currentLoad: 0,
      responseTime: 0,
      successRate: 100,
      isHealthy: true,
      lastUsed: 0
    });
    console.log(`[MIORA LOAD BALANCER] Added endpoint: ${config.name}`);
  }

  public removeEndpoint(id: string) {
    this.endpoints.delete(id);
    console.log(`[MIORA LOAD BALANCER] Removed endpoint: ${id}`);
  }
}

// Export singleton instance
export const mioraLoadBalancer = new MIORALoadBalancer();
export default MIORALoadBalancer;