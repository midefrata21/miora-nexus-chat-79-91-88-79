import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface EvolutionTrigger {
  type: 'scheduled' | 'memory_threshold' | 'performance_degradation' | 'manual';
  timestamp: number;
  condition?: string;
  threshold?: number;
  actualValue?: number;
}

interface SystemHealth {
  overall: 'excellent' | 'good' | 'degraded' | 'critical';
  memoryUsage: number;
  cpuUsage: number;
  responseTime: number;
  errorRate: number;
  moduleFailures: number;
}

export const useMIORAEvolution = () => {
  const [evolutionEnabled, setEvolutionEnabled] = useState(false);
  const [lastEvolutionCheck, setLastEvolutionCheck] = useState<number>(0);
  const [evolutionHistory, setEvolutionHistory] = useState<EvolutionTrigger[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overall: 'excellent',
    memoryUsage: 45,
    cpuUsage: 30,
    responseTime: 120,
    errorRate: 0.02,
    moduleFailures: 0
  });

  const evolutionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const healthCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor system health continuously
  const monitorSystemHealth = useCallback(() => {
    // Simulate real system monitoring
    setSystemHealth(prev => {
      const newHealth = {
        memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        cpuUsage: Math.max(15, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 8)),
        responseTime: Math.max(50, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 30)),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.01)),
        moduleFailures: Math.max(0, prev.moduleFailures + (Math.random() < 0.05 ? 1 : 0))
      };

      // Determine overall health
      let overall: SystemHealth['overall'] = 'excellent';
      if (newHealth.memoryUsage > 80 || newHealth.cpuUsage > 75 || newHealth.responseTime > 300 || newHealth.errorRate > 0.05) {
        overall = 'critical';
      } else if (newHealth.memoryUsage > 65 || newHealth.cpuUsage > 60 || newHealth.responseTime > 200 || newHealth.errorRate > 0.03) {
        overall = 'degraded';
      } else if (newHealth.memoryUsage > 50 || newHealth.cpuUsage > 45 || newHealth.responseTime > 150) {
        overall = 'good';
      }

      return { ...newHealth, overall };
    });
  }, []);

  // Check if evolution should be triggered
  const checkEvolutionTriggers = useCallback(() => {
    const now = Date.now();
    const triggers: EvolutionTrigger[] = [];

    // Scheduled trigger (every 6 hours)
    if (now - lastEvolutionCheck > 6 * 60 * 60 * 1000) {
      triggers.push({
        type: 'scheduled',
        timestamp: now,
        condition: '6-hour scheduled check'
      });
    }

    // Memory threshold trigger
    if (systemHealth.memoryUsage > 65) {
      triggers.push({
        type: 'memory_threshold',
        timestamp: now,
        condition: 'Memory usage exceeded threshold',
        threshold: 65,
        actualValue: systemHealth.memoryUsage
      });
    }

    // Performance degradation trigger
    if (systemHealth.responseTime > 150 || systemHealth.overall === 'degraded' || systemHealth.overall === 'critical') {
      triggers.push({
        type: 'performance_degradation',
        timestamp: now,
        condition: 'System performance degradation detected',
        threshold: 150,
        actualValue: systemHealth.responseTime
      });
    }

    // Execute evolution if triggers found
    if (triggers.length > 0 && evolutionEnabled) {
      executeEvolution(triggers);
    }

    return triggers;
  }, [systemHealth, lastEvolutionCheck, evolutionEnabled]);

  // Execute evolution process
  const executeEvolution = useCallback(async (triggers: EvolutionTrigger[]) => {
    console.log('🧬 MIORA Evolution triggered by:', triggers.map(t => t.type).join(', '));
    
    setEvolutionHistory(prev => [...triggers, ...prev].slice(0, 50));
    setLastEvolutionCheck(Date.now());

    // Simulate evolution process
    for (const trigger of triggers) {
      switch (trigger.type) {
        case 'memory_threshold':
          await optimizeMemoryUsage();
          break;
        case 'performance_degradation':
          await optimizePerformance();
          break;
        case 'scheduled':
          await performScheduledMaintenance();
          break;
        default:
          await performGeneralOptimization();
      }
    }

    toast({
      title: "🧬 MIORA Evolution Complete",
      description: `System optimized based on ${triggers.length} trigger(s)`,
      duration: 5000,
    });
  }, []);

  // Optimization functions
  const optimizeMemoryUsage = async () => {
    console.log('🧠 Optimizing memory usage...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSystemHealth(prev => ({
      ...prev,
      memoryUsage: Math.max(20, prev.memoryUsage - 15)
    }));

    toast({
      title: "🧠 Memory Optimized",
      description: "Memory usage reduced through garbage collection and cache optimization",
      duration: 3000,
    });
  };

  const optimizePerformance = async () => {
    console.log('⚡ Optimizing system performance...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSystemHealth(prev => ({
      ...prev,
      responseTime: Math.max(50, prev.responseTime - 30),
      cpuUsage: Math.max(15, prev.cpuUsage - 10)
    }));

    toast({
      title: "⚡ Performance Optimized",
      description: "Response time and CPU usage improved",
      duration: 3000,
    });
  };

  const performScheduledMaintenance = async () => {
    console.log('🔧 Performing scheduled maintenance...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSystemHealth(prev => ({
      ...prev,
      errorRate: Math.max(0, prev.errorRate - 0.01),
      moduleFailures: 0
    }));

    toast({
      title: "🔧 Scheduled Maintenance Complete",
      description: "System health checks and routine optimizations performed",
      duration: 3000,
    });
  };

  const performGeneralOptimization = async () => {
    console.log('🚀 Performing general system optimization...');
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setSystemHealth(prev => ({
      ...prev,
      memoryUsage: Math.max(20, prev.memoryUsage - 5),
      cpuUsage: Math.max(15, prev.cpuUsage - 5),
      responseTime: Math.max(50, prev.responseTime - 10)
    }));
  };

  // Manual evolution trigger
  const triggerManualEvolution = useCallback(() => {
    const manualTrigger: EvolutionTrigger = {
      type: 'manual',
      timestamp: Date.now(),
      condition: 'User-initiated evolution'
    };

    executeEvolution([manualTrigger]);
  }, [executeEvolution]);

  // Enable/disable evolution - renamed to avoid conflict
  const toggleEvolutionMode = useCallback((enabled: boolean) => {
    setEvolutionEnabled(enabled);
    
    if (enabled) {
      // Start monitoring intervals
      evolutionIntervalRef.current = setInterval(checkEvolutionTriggers, 5 * 60 * 1000); // Check every 5 minutes
      healthCheckIntervalRef.current = setInterval(monitorSystemHealth, 30 * 1000); // Monitor every 30 seconds
      
      toast({
        title: "🧬 MIORA Evolution Enabled",
        description: "System will continuously monitor and optimize itself",
        duration: 4000,
      });
    } else {
      // Clear intervals
      if (evolutionIntervalRef.current) {
        clearInterval(evolutionIntervalRef.current);
        evolutionIntervalRef.current = null;
      }
      if (healthCheckIntervalRef.current) {
        clearInterval(healthCheckIntervalRef.current);
        healthCheckIntervalRef.current = null;
      }
      
      toast({
        title: "⏹️ MIORA Evolution Disabled",
        description: "Manual control restored",
        variant: "destructive",
        duration: 4000,
      });
    }
  }, [checkEvolutionTriggers, monitorSystemHealth]);

  // Get evolution statistics
  const getEvolutionStats = useCallback(() => {
    const last24h = evolutionHistory.filter(
      h => Date.now() - h.timestamp < 24 * 60 * 60 * 1000
    );
    
    const triggerCounts = evolutionHistory.reduce((acc, trigger) => {
      acc[trigger.type] = (acc[trigger.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEvolutions: evolutionHistory.length,
      evolutionsLast24h: last24h.length,
      lastEvolution: evolutionHistory[0]?.timestamp || 0,
      triggerCounts,
      systemHealth,
      isEnabled: evolutionEnabled
    };
  }, [evolutionHistory, systemHealth, evolutionEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (evolutionIntervalRef.current) clearInterval(evolutionIntervalRef.current);
      if (healthCheckIntervalRef.current) clearInterval(healthCheckIntervalRef.current);
    };
  }, []);

  return {
    evolutionEnabled,
    systemHealth,
    evolutionHistory,
    lastEvolutionCheck,
    toggleEvolutionMode,
    triggerManualEvolution,
    checkEvolutionTriggers,
    getEvolutionStats,
    monitorSystemHealth
  };
};
