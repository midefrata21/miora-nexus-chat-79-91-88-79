import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export type AutonomyLevel = 'manual' | 'supervised' | 'full';

export interface AutoDevConfig {
  autonomyLevel: AutonomyLevel;
  autoTriggers: {
    performanceThreshold: number;
    errorThreshold: number;
    timeInterval: number; // in ms
    marketAnalysis: boolean;
  };
  autoApproval: {
    uiImprovements: boolean;
    performance: boolean;
    newFeatures: boolean;
    architectureChanges: boolean;
  };
  safetyBounds: {
    maxChangesPerHour: number;
    requireBackup: boolean;
    emergencyStop: boolean;
  };
}

interface SystemMetrics {
  performance: number;
  errorCount: number;
  uptime: number;
  lastAssessment: Date;
}

interface LearningEvent {
  id: string;
  type: 'assessment' | 'improvement' | 'skill_proposal' | 'auto_fix';
  timestamp: Date;
  description: string;
  status: 'pending' | 'approved' | 'implemented' | 'failed';
  autonomyLevel: AutonomyLevel;
}

export const useEnhancedAutonomous = () => {
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [config, setConfig] = useState<AutoDevConfig>({
    autonomyLevel: 'supervised',
    autoTriggers: {
      performanceThreshold: 0.8,
      errorThreshold: 3,
      timeInterval: 30000, // 30 seconds for demo
      marketAnalysis: true,
    },
    autoApproval: {
      uiImprovements: true,
      performance: true,
      newFeatures: false,
      architectureChanges: false,
    },
    safetyBounds: {
      maxChangesPerHour: 10,
      requireBackup: true,
      emergencyStop: false,
    },
  });

  const [isActive, setIsActive] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    performance: 0.95,
    errorCount: 0,
    uptime: 0,
    lastAssessment: new Date(),
  });

  const [learningEvents, setLearningEvents] = useState<LearningEvent[]>([]);
  const [changesThisHour, setChangesThisHour] = useState(0);

  // Auto-monitoring loop
  const monitorSystem = useCallback(() => {
    // Simulate system monitoring
    setMetrics(prev => ({
      ...prev,
      performance: Math.random() * 0.3 + 0.7, // 0.7-1.0 range
      errorCount: Math.floor(Math.random() * 5),
      uptime: prev.uptime + config.autoTriggers.timeInterval,
    }));

    // Check if auto-assessment should trigger
    if (config.autonomyLevel !== 'manual') {
      const shouldTrigger = 
        metrics.performance < config.autoTriggers.performanceThreshold ||
        metrics.errorCount >= config.autoTriggers.errorThreshold ||
        (Date.now() - metrics.lastAssessment.getTime()) > (24 * 60 * 60 * 1000); // 24h

      if (shouldTrigger && changesThisHour < config.safetyBounds.maxChangesPerHour) {
        performAutoAssessment();
      }
    }
  }, [config, metrics, changesThisHour]);

  // Auto self-assessment
  const performAutoAssessment = useCallback(() => {
    const event: LearningEvent = {
      id: Date.now().toString(),
      type: 'assessment',
      timestamp: new Date(),
      description: `Auto-assessment triggered: Performance ${metrics.performance.toFixed(2)}, Errors: ${metrics.errorCount}`,
      status: config.autonomyLevel === 'full' ? 'implemented' : 'pending',
      autonomyLevel: config.autonomyLevel,
    };

    setLearningEvents(prev => [event, ...prev.slice(0, 19)]); // Keep last 20 events
    setMetrics(prev => ({ ...prev, lastAssessment: new Date() }));

    if (config.autonomyLevel === 'full') {
      // Auto-implement improvements
      setTimeout(() => {
        implementAutoImprovement(event.id);
      }, 2000);
    } else {
      // Request approval
      toast({
        title: "🧠 MIORA Auto-Assessment",
        description: "Sistema mendeteksi perlunya optimisasi. Approve untuk melanjutkan?",
        duration: 10000,
      });
    }

    setChangesThisHour(prev => prev + 1);
  }, [config, metrics, toast]);

  // Implement automatic improvements
  const implementAutoImprovement = useCallback((eventId: string) => {
    setLearningEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, status: 'implemented' }
          : event
      )
    );

    const improvements = [
      "Optimized memory allocation algorithms",
      "Enhanced error handling protocols", 
      "Improved response time by 15%",
      "Updated learning patterns for better accuracy",
      "Refined decision-making algorithms",
    ];

    const randomImprovement = improvements[Math.floor(Math.random() * improvements.length)];

    toast({
      title: "⚡ Auto-Improvement Implemented",
      description: randomImprovement,
      duration: 5000,
    });

    // Simulate performance improvement
    setMetrics(prev => ({
      ...prev,
      performance: Math.min(prev.performance + 0.05, 1.0),
      errorCount: Math.max(prev.errorCount - 1, 0),
    }));
  }, [toast]);

  // Emergency stop
  const emergencyStop = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      safetyBounds: { ...prev.safetyBounds, emergencyStop: true }
    }));
    setIsActive(false);
    
    toast({
      title: "🛑 Emergency Stop Activated",
      description: "All autonomous operations halted",
      variant: "destructive",
    });
  }, [toast]);

  // Start/stop autonomous system
  const toggleAutonomousSystem = useCallback((active: boolean) => {
    setIsActive(active);
    
    if (active && !config.safetyBounds.emergencyStop) {
      intervalRef.current = setInterval(monitorSystem, config.autoTriggers.timeInterval);
      toast({
        title: "🚀 Enhanced Autonomous Mode Activated",
        description: `Level: ${config.autonomyLevel.toUpperCase()}`,
      });
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      toast({
        title: "⏸️ Autonomous Mode Deactivated",
        description: "Manual control restored",
      });
    }
  }, [config, monitorSystem, toast]);

  // Approve pending improvements
  const approveImprovement = useCallback((eventId: string) => {
    implementAutoImprovement(eventId);
  }, [implementAutoImprovement]);

  // Update configuration
  const updateConfig = useCallback((newConfig: Partial<AutoDevConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Restart monitoring with new config if active
      if (isActive && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(monitorSystem, updated.autoTriggers.timeInterval);
      }
      
      return updated;
    });
  }, [isActive, monitorSystem]);

  // Reset hourly change counter
  useEffect(() => {
    const hourlyReset = setInterval(() => {
      setChangesThisHour(0);
    }, 60 * 60 * 1000); // Reset every hour

    return () => clearInterval(hourlyReset);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    // State
    config,
    isActive,
    metrics,
    learningEvents,
    changesThisHour,

    // Actions
    toggleAutonomousSystem,
    updateConfig,
    performAutoAssessment,
    approveImprovement,
    emergencyStop,

    // Utilities
    getPendingEvents: () => learningEvents.filter(e => e.status === 'pending'),
    getRecentEvents: () => learningEvents.slice(0, 10),
    getSystemHealth: () => ({
      status: metrics.performance > 0.8 ? 'excellent' : metrics.performance > 0.6 ? 'good' : 'poor',
      uptime: Math.floor(metrics.uptime / 1000),
      efficiency: metrics.performance,
    }),
  };
};