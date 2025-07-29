import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface SystemHealthData {
  geminiAPI: {
    status: 'healthy' | 'quota_exceeded' | 'error' | 'fallback';
    lastCheck: number;
    requestsToday: number;
    maxRequests: number;
  };
  exchangeConnections: {
    binance: boolean;
    bybit: boolean;
    okx: boolean;
    bingx: boolean;
  };
  systemMetrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
  autoRecovery: {
    enabled: boolean;
    lastRecovery: number;
    attempts: number;
  };
}

export const useSystemHealth = () => {
  const [healthData, setHealthData] = useState<SystemHealthData>({
    geminiAPI: {
      status: 'fallback',
      lastCheck: Date.now(),
      requestsToday: 50,
      maxRequests: 50
    },
    exchangeConnections: {
      binance: true,
      bybit: true,
      okx: true,
      bingx: true
    },
    systemMetrics: {
      uptime: Date.now() - (1000 * 60 * 60 * 2), // 2 hours ago
      responseTime: 150,
      errorRate: 0.02
    },
    autoRecovery: {
      enabled: true,
      lastRecovery: 0,
      attempts: 0
    }
  });

  const [isRecovering, setIsRecovering] = useState(false);

  // Alternative API fallback system
  const fallbackAPISources = [
    'openai_gpt4', 
    'claude_api', 
    'local_analysis',
    'cached_responses'
  ];

  const attemptAPIRecovery = useCallback(async () => {
    if (isRecovering) return;
    
    setIsRecovering(true);
    
    // Try fallback APIs in order
    for (const fallback of fallbackAPISources) {
      try {
        // Simulate fallback API check
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setHealthData(prev => ({
          ...prev,
          geminiAPI: {
            ...prev.geminiAPI,
            status: 'fallback',
            lastCheck: Date.now()
          },
          autoRecovery: {
            ...prev.autoRecovery,
            lastRecovery: Date.now(),
            attempts: prev.autoRecovery.attempts + 1
          }
        }));

        // Reduce notification spam - only show for critical recoveries
        if (fallback === 'openai_gpt4' || fallback === 'claude_api') {
          toast({
            title: "🔄 API RECOVERY",
            description: `Switched to ${fallback} fallback`,
            duration: 3000,
          });
        }
        
        break;
      } catch (error) {
        console.error(`Fallback ${fallback} failed:`, error);
      }
    }
    
    setIsRecovering(false);
  }, [isRecovering]);

  // Enhanced exchange reconnection
  const reconnectExchanges = useCallback(async () => {
    const exchanges = ['binance', 'bybit', 'okx', 'bingx'];
    
    for (const exchange of exchanges) {
      try {
        // Simulate reconnection attempt
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const connected = Math.random() > 0.3; // 70% success rate
        
        setHealthData(prev => ({
          ...prev,
          exchangeConnections: {
            ...prev.exchangeConnections,
            [exchange]: connected
          }
        }));
        
        // Reduce notification spam - only show successful reconnections
        if (connected && exchange === 'binance') {
          toast({
            title: `🔗 PRIMARY EXCHANGE RESTORED`,
            description: "Core trading stream reconnected",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error(`Failed to reconnect ${exchange}:`, error);
      }
    }
  }, []);

  // System metrics monitoring
  const updateSystemMetrics = useCallback(() => {
    setHealthData(prev => ({
      ...prev,
      systemMetrics: {
        uptime: Date.now() - prev.systemMetrics.uptime,
        responseTime: Math.random() * 200 + 50, // 50-250ms
        errorRate: Math.max(0, prev.systemMetrics.errorRate - 0.001)
      }
    }));
  }, []);

  // Enhanced Auto-recovery system - Optimized for efficiency
  useEffect(() => {
    if (!healthData.autoRecovery.enabled) return;

    // More reasonable interval for stable operation
    const recoveryInterval = setInterval(() => {
      // Check if recovery is needed
      const needsAPIRecovery = healthData.geminiAPI.status === 'error';
      const needsExchangeRecovery = Object.values(healthData.exchangeConnections)
        .filter(Boolean).length < 2; // Reasonable threshold

      // API recovery with reasonable timing
      if (needsAPIRecovery && !isRecovering) {
        const lastRecovery = healthData.autoRecovery.lastRecovery;
        if (Date.now() - lastRecovery > 120000) { // Wait 2 minutes between attempts
          attemptAPIRecovery();
        }
      }

      // Exchange reconnection with reasonable timing
      if (needsExchangeRecovery && !isRecovering) {
        const lastRecovery = healthData.autoRecovery.lastRecovery;
        if (Date.now() - lastRecovery > 60000) { // Wait 1 minute between attempts
          reconnectExchanges();
        }
      }

      // Update metrics periodically
      updateSystemMetrics();

    }, 60000); // Check every minute for balanced performance

    return () => clearInterval(recoveryInterval);
  }, [healthData.autoRecovery.enabled, healthData.geminiAPI.status, healthData.exchangeConnections, attemptAPIRecovery, reconnectExchanges, updateSystemMetrics, isRecovering]);

  // Initialize system on mount - reduced spam
  useEffect(() => {
    console.log('System Health Monitor initialized');
    
    // Only show initialization message once
    const hasShownInit = sessionStorage.getItem('health_monitor_init');
    if (!hasShownInit) {
      toast({
        title: "🛠️ SYSTEM HEALTH MONITOR ACTIVE",
        description: "Auto-recovery systems enabled",
        duration: 3000,
      });
      sessionStorage.setItem('health_monitor_init', 'true');
    }

    // Delayed initial check to avoid overwhelming startup
    const initTimer = setTimeout(() => {
      attemptAPIRecovery();
      reconnectExchanges();
    }, 5000);

    return () => clearTimeout(initTimer);
  }, []);

  const getOverallHealthStatus = (): 'healthy' | 'degraded' | 'critical' => {
    const apiHealthy = healthData.geminiAPI.status === 'healthy' || 
                      healthData.geminiAPI.status === 'fallback';
    const exchangesConnected = Object.values(healthData.exchangeConnections)
      .filter(Boolean).length;
    
    if (apiHealthy && exchangesConnected >= 3) return 'healthy';
    if (apiHealthy && exchangesConnected >= 1) return 'degraded';
    return 'critical';
  };

  const manualRecovery = () => {
    attemptAPIRecovery();
    reconnectExchanges();
  };

  const toggleAutoRecovery = () => {
    setHealthData(prev => ({
      ...prev,
      autoRecovery: {
        ...prev.autoRecovery,
        enabled: !prev.autoRecovery.enabled
      }
    }));
  };

  return {
    healthData,
    overallStatus: getOverallHealthStatus(),
    isRecovering,
    manualRecovery,
    toggleAutoRecovery,
    reconnectExchanges,
    updateSystemMetrics
  };
};