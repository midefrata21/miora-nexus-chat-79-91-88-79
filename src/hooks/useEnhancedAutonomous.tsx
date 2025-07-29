import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export type AutonomyLevel = 'manual' | 'supervised' | 'full';

export interface AutonomousConfig {
  autonomyLevel: AutonomyLevel;
  autoTriggers: {
    performanceThreshold: number;
    errorThreshold: number;
    timeInterval: number;
    marketAnalysis: boolean;
  };
  safetyBounds: {
    maxChangesPerHour: number;
    requireBackup: boolean;
    emergencyStop: boolean;
  };
}

export interface AutonomousMetrics {
  performance: number;
  errorCount: number;
  successRate: number;
  lastUpdate: number;
}

export interface LearningEvent {
  id: string;
  type: 'optimization' | 'bug_fix' | 'feature_addition' | 'performance_improvement';
  status: 'pending' | 'implemented' | 'failed';
  description: string;
  timestamp: Date;
  impact?: string;
}

export const useEnhancedAutonomous = () => {
  const [config, setConfig] = useState<AutonomousConfig>({
    autonomyLevel: 'supervised',
    autoTriggers: {
      performanceThreshold: 0.8,
      errorThreshold: 5,
      timeInterval: 30000, // 30 seconds
      marketAnalysis: true
    },
    safetyBounds: {
      maxChangesPerHour: 10,
      requireBackup: true,
      emergencyStop: false
    }
  });

  const [isActive, setIsActive] = useState(false);
  const [metrics, setMetrics] = useState<AutonomousMetrics>({
    performance: 0.87,
    errorCount: 0,
    successRate: 0.95,
    lastUpdate: Date.now()
  });

  const [learningEvents, setLearningEvents] = useState<LearningEvent[]>([]);
  const [changesThisHour, setChangesThisHour] = useState(0);
  const [systemStartTime] = useState(Date.now());

  // Load persisted state
  useEffect(() => {
    const savedConfig = localStorage.getItem('enhanced-autonomous-config');
    const savedEvents = localStorage.getItem('enhanced-autonomous-events');
    
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    
    if (savedEvents) {
      const events = JSON.parse(savedEvents).map((e: any) => ({
        ...e,
        timestamp: new Date(e.timestamp)
      }));
      setLearningEvents(events);
    }
  }, []);

  // Auto-save state
  useEffect(() => {
    localStorage.setItem('enhanced-autonomous-config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('enhanced-autonomous-events', JSON.stringify(learningEvents));
  }, [learningEvents]);

  // Metrics update interval
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        performance: Math.min(1, prev.performance + (Math.random() - 0.3) * 0.05),
        lastUpdate: Date.now()
      }));
    }, config.autoTriggers.timeInterval);

    return () => clearInterval(interval);
  }, [isActive, config.autoTriggers.timeInterval]);

  // Auto-trigger assessments
  useEffect(() => {
    if (!isActive || config.autonomyLevel === 'manual') return;

    const shouldTrigger = 
      metrics.performance < config.autoTriggers.performanceThreshold ||
      metrics.errorCount >= config.autoTriggers.errorThreshold;

    if (shouldTrigger && changesThisHour < config.safetyBounds.maxChangesPerHour) {
      performAutoAssessment();
    }
  }, [metrics, config, isActive, changesThisHour]);

  const toggleAutonomousSystem = useCallback((activate: boolean) => {
    setIsActive(activate);
    
    if (activate) {
      toast({
        title: "🚀 Enhanced Autonomous System Activated",
        description: `Operating in ${config.autonomyLevel} mode`,
        duration: 4000,
      });
    } else {
      toast({
        title: "⏸️ Autonomous System Deactivated",
        description: "Manual control restored",
        duration: 3000,
      });
    }
  }, [config.autonomyLevel]);

  const updateConfig = useCallback((updates: Partial<AutonomousConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    
    toast({
      title: "⚙️ Configuration Updated",
      description: "Autonomous system configuration has been updated",
      duration: 2000,
    });
  }, []);

  const performAutoAssessment = useCallback(() => {
    if (config.safetyBounds.emergencyStop || changesThisHour >= config.safetyBounds.maxChangesPerHour) {
      return;
    }

    const newEvent: LearningEvent = {
      id: `event_${Date.now()}`,
      type: metrics.performance < 0.8 ? 'performance_improvement' : 'optimization',
      status: config.autonomyLevel === 'full' ? 'implemented' : 'pending',
      description: `Auto-assessment triggered: Performance at ${(metrics.performance * 100).toFixed(1)}%`,
      timestamp: new Date()
    };

    setLearningEvents(prev => [newEvent, ...prev.slice(0, 49)]);
    setChangesThisHour(prev => prev + 1);

    if (config.autonomyLevel === 'full') {
      // Simulate improvement
      setMetrics(prev => ({
        ...prev,
        performance: Math.min(1, prev.performance + 0.1),
        errorCount: Math.max(0, prev.errorCount - 1)
      }));
    }

    toast({
      title: "🧠 Auto-Assessment Performed",
      description: newEvent.description,
      duration: 3000,
    });
  }, [config, metrics, changesThisHour]);

  const approveImprovement = useCallback((eventId: string) => {
    setLearningEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: 'implemented' as const }
        : event
    ));

    // Simulate improvement implementation
    setMetrics(prev => ({
      ...prev,
      performance: Math.min(1, prev.performance + 0.05),
      successRate: Math.min(1, prev.successRate + 0.02)
    }));

    toast({
      title: "✅ Improvement Approved",
      description: "Changes have been implemented successfully",
      duration: 3000,
    });
  }, []);

  const emergencyStop = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      safetyBounds: {
        ...prev.safetyBounds,
        emergencyStop: true
      }
    }));
    setIsActive(false);

    toast({
      title: "🚨 Emergency Stop Activated",
      description: "All autonomous operations have been halted",
      variant: "destructive",
      duration: 5000,
    });
  }, []);

  const getPendingEvents = useCallback(() => {
    return learningEvents.filter(event => event.status === 'pending');
  }, [learningEvents]);

  const getRecentEvents = useCallback(() => {
    return learningEvents.slice(0, 10);
  }, [learningEvents]);

  const getSystemHealth = useCallback(() => {
    const uptime = Math.floor((Date.now() - systemStartTime) / 1000);
    const status = metrics.performance > 0.9 ? 'excellent' : 
                  metrics.performance > 0.7 ? 'good' : 'poor';
    
    return { status, uptime };
  }, [metrics.performance, systemStartTime]);

  return {
    config,
    isActive,
    metrics,
    learningEvents,
    changesThisHour,
    toggleAutonomousSystem,
    updateConfig,
    performAutoAssessment,
    approveImprovement,
    emergencyStop,
    getPendingEvents,
    getRecentEvents,
    getSystemHealth
  };
};