
import { useState, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface APIProvider {
  id: string;
  name: string;
  endpoint: string;
  apiKey?: string;
  isConnected: boolean;
  lastPing: number;
  responseTime: number;
  errorCount: number;
}

interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
  provider: string;
  responseTime: number;
}

export const useAPIConnectionManager = () => {
  const [providers, setProviders] = useState<APIProvider[]>([
    {
      id: 'gemini',
      name: 'Gemini API',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
      isConnected: false,
      lastPing: 0,
      responseTime: 0,
      errorCount: 0
    },
    {
      id: 'deepai',
      name: 'DeepAI',
      endpoint: 'https://api.deepai.org/api/text-generator',
      isConnected: false,
      lastPing: 0,
      responseTime: 0,
      errorCount: 0
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      endpoint: 'https://api-inference.huggingface.co/models',
      isConnected: false,
      lastPing: 0,
      responseTime: 0,
      errorCount: 0
    }
  ]);

  const connectionCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Test API connection
  const testConnection = useCallback(async (provider: APIProvider): Promise<boolean> => {
    const startTime = Date.now();
    
    try {
      // Ping endpoint to check connectivity with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(provider.endpoint, {
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const responseTime = Date.now() - startTime;
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id 
          ? { 
              ...p, 
              isConnected: response.ok,
              lastPing: Date.now(),
              responseTime,
              errorCount: response.ok ? 0 : p.errorCount + 1
            }
          : p
      ));

      return response.ok;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id 
          ? { 
              ...p, 
              isConnected: false,
              lastPing: Date.now(),
              responseTime,
              errorCount: p.errorCount + 1
            }
          : p
      ));

      console.error(`API Connection failed for ${provider.name}:`, error);
      return false;
    }
  }, []);

  // Test all providers
  const testAllConnections = useCallback(async () => {
    console.log('🔄 Testing API connections...');
    
    const results = await Promise.all(
      providers.map(provider => testConnection(provider))
    );
    
    const connectedCount = results.filter(Boolean).length;
    
    toast({
      title: `🔗 API Connection Test Complete`,
      description: `${connectedCount}/${providers.length} providers connected successfully`,
      duration: 4000,
    });

    return connectedCount;
  }, [providers, testConnection]);

  // Make API call with fallback
  const makeAPICall = useCallback(async (
    prompt: string, 
    preferredProvider?: string
  ): Promise<APIResponse> => {
    const availableProviders = providers.filter(p => p.isConnected);
    
    if (availableProviders.length === 0) {
      throw new Error('No API providers available');
    }

    // Use preferred provider if available, otherwise use first available
    const provider = preferredProvider 
      ? availableProviders.find(p => p.id === preferredProvider) || availableProviders[0]
      : availableProviders[0];

    const startTime = Date.now();

    try {
      // Simulate API call based on provider
      let response;
      
      switch (provider.id) {
        case 'gemini':
          response = await simulateGeminiAPI(prompt);
          break;
        case 'deepai':
          response = await simulateDeepAIAPI(prompt);
          break;
        case 'huggingface':
          response = await simulateHuggingFaceAPI(prompt);
          break;
        default:
          throw new Error(`Unknown provider: ${provider.id}`);
      }

      const responseTime = Date.now() - startTime;

      // Update provider stats
      setProviders(prev => prev.map(p => 
        p.id === provider.id 
          ? { ...p, responseTime, errorCount: 0 }
          : p
      ));

      return {
        success: true,
        data: response,
        provider: provider.name,
        responseTime
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id 
          ? { ...p, responseTime, errorCount: p.errorCount + 1 }
          : p
      ));

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: provider.name,
        responseTime
      };
    }
  }, [providers]);

  // Simulate API calls (replace with real API calls when keys are available)
  const simulateGeminiAPI = async (prompt: string) => {
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    return `[Gemini] Enhanced response: ${prompt} - Multimodal analysis with deep contextual understanding`;
  };

  const simulateDeepAIAPI = async (prompt: string) => {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));
    return `[DeepAI] Quick response: ${prompt} - Lightweight text generation optimized for speed`;
  };

  const simulateHuggingFaceAPI = async (prompt: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    return `[HuggingFace] Detailed response: ${prompt} - Advanced reasoning with local model processing`;
  };

  // Start connection monitoring
  const startConnectionMonitoring = useCallback(() => {
    if (connectionCheckInterval.current) {
      clearInterval(connectionCheckInterval.current);
    }

    connectionCheckInterval.current = setInterval(() => {
      testAllConnections();
    }, 30000); // Check every 30 seconds

    // Initial test
    testAllConnections();
  }, [testAllConnections]);

  // Stop connection monitoring
  const stopConnectionMonitoring = useCallback(() => {
    if (connectionCheckInterval.current) {
      clearInterval(connectionCheckInterval.current);
      connectionCheckInterval.current = null;
    }
  }, []);

  // Get connection statistics
  const getConnectionStats = useCallback(() => {
    const connected = providers.filter(p => p.isConnected).length;
    const avgResponseTime = providers.length > 0 
      ? providers.reduce((sum, p) => sum + p.responseTime, 0) / providers.length 
      : 0;
    const totalErrors = providers.reduce((sum, p) => sum + p.errorCount, 0);

    return {
      connected,
      total: providers.length,
      connectionRate: Math.round((connected / providers.length) * 100),
      avgResponseTime: Math.round(avgResponseTime),
      totalErrors,
      providers: providers.map(p => ({
        id: p.id,
        name: p.name,
        isConnected: p.isConnected,
        responseTime: p.responseTime,
        errorCount: p.errorCount
      }))
    };
  }, [providers]);

  return {
    providers,
    testConnection,
    testAllConnections,
    makeAPICall,
    startConnectionMonitoring,
    stopConnectionMonitoring,
    getConnectionStats
  };
};
