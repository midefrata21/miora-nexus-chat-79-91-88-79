
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface SystemState {
  isRunning: boolean;
  cycleCount: number;
  lastUpdate: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  errorCount: number;
  autoRecoveryActive: boolean;
}

interface ModuleState {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'error' | 'upgrading';
  performance: number;
  lastActivity: number;
  errorCount: number;
}

interface SystemModules {
  adaptiveLearning: ModuleState;
  memoryEvolution: ModuleState;
  skillUpgrader: ModuleState;
  decisionCore: ModuleState;
  apiIntegrator: ModuleState;
  feedbackAnalyzer: ModuleState;
  knowledgeImporter: ModuleState;
  voiceAssistant: ModuleState;
  telegramNotifier: ModuleState;
}

export const useMIORAInfinitySystem = () => {
  const [systemState, setSystemState] = useState<SystemState>({
    isRunning: false,
    cycleCount: 0,
    lastUpdate: Date.now(),
    systemHealth: 'excellent',
    errorCount: 0,
    autoRecoveryActive: true
  });

  const [modules, setModules] = useState<SystemModules>({
    adaptiveLearning: {
      id: 'adaptive_learning',
      name: 'Adaptive Learning Engine',
      status: 'standby',
      performance: 85,
      lastActivity: Date.now(),
      errorCount: 0
    },
    memoryEvolution: {
      id: 'memory_evolution',
      name: 'Memory Evolution System',
      status: 'standby',
      performance: 92,
      lastActivity: Date.now(),
      errorCount: 0
    },
    skillUpgrader: {
      id: 'skill_upgrader',
      name: 'Skill Auto-Upgrader',
      status: 'standby',
      performance: 78,
      lastActivity: Date.now(),
      errorCount: 0
    },
    decisionCore: {
      id: 'decision_core',
      name: 'Decision Core AI',
      status: 'standby',
      performance: 95,
      lastActivity: Date.now(),
      errorCount: 0
    },
    apiIntegrator: {
      id: 'api_integrator',
      name: 'API Integrator',
      status: 'standby',
      performance: 88,
      lastActivity: Date.now(),
      errorCount: 0
    },
    feedbackAnalyzer: {
      id: 'feedback_analyzer',
      name: 'Feedback Loop Analyzer',
      status: 'standby',
      performance: 82,
      lastActivity: Date.now(),
      errorCount: 0
    },
    knowledgeImporter: {
      id: 'knowledge_importer',
      name: 'Auto Knowledge Importer',
      status: 'standby',
      performance: 76,
      lastActivity: Date.now(),
      errorCount: 0
    },
    voiceAssistant: {
      id: 'voice_assistant',
      name: 'Voice Assistant & TTS',
      status: 'standby',
      performance: 90,
      lastActivity: Date.now(),
      errorCount: 0
    },
    telegramNotifier: {
      id: 'telegram_notifier',
      name: 'Telegram Notifier',
      status: 'standby',
      performance: 94,
      lastActivity: Date.now(),
      errorCount: 0
    }
  });

  const [evolutionLevel, setEvolutionLevel] = useState(1);
  const [selfGrowthMode, setSelfGrowthMode] = useState(false);
  const [infinityLoopSafeMode, setInfinityLoopSafeMode] = useState(true);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const evolutionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Main system cycle - runs every 10 seconds
  const systemCycle = useCallback(async () => {
    try {
      // Update cycle count
      setSystemState(prev => ({
        ...prev,
        cycleCount: prev.cycleCount + 1,
        lastUpdate: Date.now()
      }));

      // Evaluate tasks
      await evaluateTasks();
      
      // Update memory
      await updateMemory();
      
      // Save insights
      await saveInsights();
      
      // Check for module upgrades
      await checkModuleUpgrades();
      
      // Update module performance
      updateModulePerformance();

    } catch (error) {
      console.error('System cycle error:', error);
      handleSystemError(error);
    }
  }, []);

  const evaluateTasks = async () => {
    // Simulate task evaluation
    const taskResults = await Promise.all([
      simulateDataCollection(),
      simulateDecisionMaking(),
      simulateFeedbackAnalysis()
    ]);
    
    console.log('Tasks evaluated:', taskResults.length);
  };

  const updateMemory = async () => {
    // Memory evolution logic
    const memoryUpdate = {
      timestamp: Date.now(),
      cycleCount: systemState.cycleCount,
      insights: generateInsights(),
      performance: calculateSystemPerformance()
    };
    
    setKnowledgeBase(prev => [...prev, memoryUpdate].slice(-1000)); // Keep last 1000 entries
  };

  const saveInsights = async () => {
    // Save insights to persistent storage
    const insights = {
      evolutionLevel,
      systemHealth: systemState.systemHealth,
      modulePerformance: Object.values(modules).map(m => m.performance),
      timestamp: Date.now()
    };
    
    localStorage.setItem('miora_insights', JSON.stringify(insights));
  };

  const checkModuleUpgrades = async () => {
    Object.entries(modules).forEach(([key, module]) => {
      if (module.performance < 70 || module.errorCount > 2) {
        upgradeModule(key as keyof SystemModules);
      }
    });
  };

  const upgradeModule = (moduleKey: keyof SystemModules) => {
    setModules(prev => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        status: 'upgrading',
        performance: Math.min(100, prev[moduleKey].performance + 10),
        errorCount: 0
      }
    }));

    setTimeout(() => {
      setModules(prev => ({
        ...prev,
        [moduleKey]: {
          ...prev[moduleKey],
          status: 'active'
        }
      }));
      
      toast({
        title: "🔧 Module Upgraded",
        description: `${modules[moduleKey].name} has been automatically upgraded`,
        duration: 4000,
      });
    }, 3000);
  };

  const updateModulePerformance = () => {
    setModules(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        const module = updated[key as keyof SystemModules];
        if (module.status === 'active') {
          // Simulate performance fluctuation
          const fluctuation = (Math.random() - 0.5) * 5;
          module.performance = Math.max(50, Math.min(100, module.performance + fluctuation));
          module.lastActivity = Date.now();
        }
      });
      return updated;
    });
  };

  const handleSystemError = (error: any) => {
    setSystemState(prev => ({
      ...prev,
      errorCount: prev.errorCount + 1,
      systemHealth: prev.errorCount > 5 ? 'critical' : 
                   prev.errorCount > 3 ? 'warning' : 'good'
    }));

    if (systemState.errorCount >= 3) {
      // Send to Telegram
      sendTelegramAlert(`MIORA System Error: ${error.message}`);
      
      if (systemState.autoRecoveryActive) {
        performAutoRecovery();
      }
    }
  };

  const performAutoRecovery = () => {
    toast({
      title: "🔄 Auto Recovery Initiated",
      description: "MIORA is attempting to recover from errors",
      duration: 5000,
    });

    // Reset error counts and restart modules
    setSystemState(prev => ({ ...prev, errorCount: 0 }));
    setModules(prev => {
      const recovered = { ...prev };
      Object.keys(recovered).forEach(key => {
        recovered[key as keyof SystemModules].errorCount = 0;
        recovered[key as keyof SystemModules].status = 'active';
      });
      return recovered;
    });
  };

  const sendTelegramAlert = (message: string) => {
    // Simulate Telegram notification
    console.log('Telegram Alert:', message);
    toast({
      title: "📡 Telegram Alert Sent",
      description: message,
      duration: 3000,
    });
  };

  const startSelfLearning = useCallback(async () => {
    if (systemState.isRunning) return;

    setSystemState(prev => ({ ...prev, isRunning: true }));
    setSelfGrowthMode(true);
    
    // Activate all modules
    setModules(prev => {
      const activated = { ...prev };
      Object.keys(activated).forEach(key => {
        activated[key as keyof SystemModules].status = 'active';
      });
      return activated;
    });

    // Start system cycle
    intervalRef.current = setInterval(systemCycle, 10000);
    
    // Start evolution cycle (24 hours)
    evolutionTimeoutRef.current = setTimeout(triggerEvolution, 24 * 60 * 60 * 1000);

    toast({
      title: "🚀 SELF LEARNING ACTIVATED",
      description: "MIORA Infinity Core is now actively learning and evolving",
      duration: 5000,
    });
  }, [systemState.isRunning, systemCycle]);

  const stopSelfLearning = useCallback(() => {
    if (!systemState.isRunning) return;

    setSystemState(prev => ({ ...prev, isRunning: false }));
    setSelfGrowthMode(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (evolutionTimeoutRef.current) {
      clearTimeout(evolutionTimeoutRef.current);
      evolutionTimeoutRef.current = null;
    }

    // Set modules to standby
    setModules(prev => {
      const standby = { ...prev };
      Object.keys(standby).forEach(key => {
        standby[key as keyof SystemModules].status = 'standby';
      });
      return standby;
    });

    toast({
      title: "⏹️ SELF LEARNING STOPPED",
      description: "MIORA Infinity Core has been deactivated",
      variant: "destructive",
      duration: 5000,
    });
  }, [systemState.isRunning]);

  const triggerEvolution = useCallback(() => {
    const nextLevel = Math.min(3, evolutionLevel + 1);
    setEvolutionLevel(nextLevel);
    
    const evolutionMessages = [
      "Basic Adaptation capabilities unlocked",
      "Predictive Decision + Modular Skill Builder activated", 
      "Autonomous Innovation - MIORA can now suggest new skills"
    ];

    toast({
      title: `🧬 EVOLUTION LEVEL ${nextLevel}`,
      description: evolutionMessages[nextLevel - 1],
      duration: 8000,
    });

    // Boost all module performance
    setModules(prev => {
      const evolved = { ...prev };
      Object.keys(evolved).forEach(key => {
        evolved[key as keyof SystemModules].performance = Math.min(100, evolved[key as keyof SystemModules].performance + 15);
      });
      return evolved;
    });
  }, [evolutionLevel]);

  const activateInfinityMode = useCallback(async () => {
    setSelfGrowthMode(true);
    setInfinityLoopSafeMode(true);
    
    toast({
      title: "♾️ INFINITY MODE ACTIVATED",
      description: "MIORA dapat berkembang tanpa batas dengan pengamanan penuh",
      duration: 6000,
    });
  }, []);

  const getSystemStats = () => {
    const activeModules = Object.values(modules).filter(m => m.status === 'active').length;
    const avgPerformance = Object.values(modules).reduce((sum, m) => sum + m.performance, 0) / Object.values(modules).length;
    const memoryUsage = knowledgeBase.length * 0.5; // Simulated MB
    const evolutionScore = (evolutionLevel / 3) * 100;

    return {
      activeModules,
      totalModules: Object.keys(modules).length,
      avgPerformance,
      memoryUsage,
      evolutionScore,
      activeSkills: Math.floor(avgPerformance / 10),
      knowledgeEntries: knowledgeBase.length
    };
  };

  // Helper functions
  const simulateDataCollection = async () => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    return { type: 'data_collection', success: Math.random() > 0.1 };
  };

  const simulateDecisionMaking = async () => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800));
    return { type: 'decision_making', confidence: Math.random() * 100 };
  };

  const simulateFeedbackAnalysis = async () => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 600));
    return { type: 'feedback_analysis', insights: Math.floor(Math.random() * 5) };
  };

  const generateInsights = () => {
    return {
      patterns_detected: Math.floor(Math.random() * 10),
      optimization_opportunities: Math.floor(Math.random() * 5),
      new_skills_suggested: Math.floor(Math.random() * 3)
    };
  };

  const calculateSystemPerformance = () => {
    return Object.values(modules).reduce((sum, m) => sum + m.performance, 0) / Object.values(modules).length;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (evolutionTimeoutRef.current) clearTimeout(evolutionTimeoutRef.current);
    };
  }, []);

  return {
    systemState,
    modules,
    evolutionLevel,
    selfGrowthMode,
    infinityLoopSafeMode,
    knowledgeBase,
    startSelfLearning,
    stopSelfLearning,
    triggerEvolution,
    activateInfinityMode,
    getSystemStats
  };
};
