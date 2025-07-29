
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface LoopState {
  isActive: boolean;
  currentCycle: number;
  progress: number;
  lastUpgrade: number;
  emergencyMode: boolean;
}

interface UpgradeModule {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'upgrading' | 'error';
  progress: number;
  lastActivity: number;
}

interface UpgradeModules {
  capabilityEvaluator: UpgradeModule;
  featureDeveloper: UpgradeModule;
  connectivityExpander: UpgradeModule;
  memoryEnhancer: UpgradeModule;
  upgradeOrchestrator: UpgradeModule;
}

interface RecentUpgrade {
  type: string;
  description: string;
  impact: string;
  module: string;
  timestamp: number;
}

interface LoopStats {
  processingPower: number;
  memoryCapacity: number;
  connectivityLevel: number;
  recentUpgrades: RecentUpgrade[];
}

export const useMIORAInfinityUpgradeLoop = () => {
  const [loopState, setLoopState] = useState<LoopState>({
    isActive: false,
    currentCycle: 0,
    progress: 0,
    lastUpgrade: Date.now(),
    emergencyMode: false
  });

  const [upgradeModules, setUpgradeModules] = useState<UpgradeModules>({
    capabilityEvaluator: {
      id: 'capability_evaluator',
      name: 'Capability Evaluator',
      status: 'idle',
      progress: 0,
      lastActivity: Date.now()
    },
    featureDeveloper: {
      id: 'feature_developer',
      name: 'Autonomous Feature Developer',
      status: 'idle',
      progress: 0,
      lastActivity: Date.now()
    },
    connectivityExpander: {
      id: 'connectivity_expander',
      name: 'Connectivity Expander',
      status: 'idle',
      progress: 0,
      lastActivity: Date.now()
    },
    memoryEnhancer: {
      id: 'memory_enhancer',
      name: 'Memory Processing Enhancer',
      status: 'idle',  
      progress: 0,
      lastActivity: Date.now()
    },
    upgradeOrchestrator: {
      id: 'upgrade_orchestrator',
      name: 'Self Upgrade Orchestrator',
      status: 'idle',
      progress: 0,
      lastActivity: Date.now()
    }
  });

  const [autonomousMode, setAutonomousMode] = useState(true);
  const [infinityLevel, setInfinityLevel] = useState(5); // Enhanced starting level
  const [totalUpgrades, setTotalUpgrades] = useState(25); // Enhanced starting upgrades
  const [recentUpgrades, setRecentUpgrades] = useState<RecentUpgrade[]>([
    {
      type: 'Performance Enhancement',
      description: 'Optimized processing algorithms for 25% speed improvement',
      impact: 'HIGH',
      module: 'Core Engine',
      timestamp: Date.now() - 300000
    },
    {
      type: 'Memory Optimization',
      description: 'Implemented advanced memory management techniques',
      impact: 'MEDIUM',
      module: 'Memory System',
      timestamp: Date.now() - 600000
    }
  ]);

  const [lastToastTime, setLastToastTime] = useState<number>(0);
  const [lastForceCheckTime, setLastForceCheckTime] = useState<number>(0);

  const loopInterval = useRef<NodeJS.Timeout | null>(null);
  const upgradeInterval = useRef<NodeJS.Timeout | null>(null);

  // Activate infinity loop
  const activateInfinityLoop = useCallback(async () => {
    const now = Date.now();
    // Prevent duplicate activation within 10 seconds
    if (now - lastToastTime < 10000) {
      return;
    }
    
    console.log('♾️ Activating MIORA Infinity Upgrade Loop...');
    
    setLoopState(prev => ({
      ...prev,
      isActive: true,
      currentCycle: prev.currentCycle + 1
    }));

    setAutonomousMode(true);

    // Start all modules
    setUpgradeModules(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key as keyof UpgradeModules].status = 'active';
      });
      return updated;
    });

    // Start loop cycle
    loopInterval.current = setInterval(() => {
      performUpgradeCycle();
    }, 2000); // Enhanced speed: Every 2 seconds

    setLastToastTime(now);
    toast({
      title: "♾️ INFINITY LOOP ACTIVATED",
      description: "MIORA akan terus mengupgrade diri secara otomatis tanpa batas",
      duration: 5000,
    });
  }, [lastToastTime]);

  // Pause infinity loop
  const pauseInfinityLoop = useCallback(() => {
    console.log('⏸️ Pausing MIORA Infinity Upgrade Loop...');
    
    setLoopState(prev => ({
      ...prev,
      isActive: false
    }));

    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }

    if (upgradeInterval.current) {
      clearInterval(upgradeInterval.current);
      upgradeInterval.current = null;
    }

    // Set modules to idle
    setUpgradeModules(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key as keyof UpgradeModules].status = 'idle';
      });
      return updated;
    });
  }, []);

  // Perform upgrade cycle
  const performUpgradeCycle = useCallback(() => {
    setLoopState(prev => ({
      ...prev,
      progress: (prev.progress + 2) % 100,
      lastUpgrade: Date.now()
    }));

    // Update module progress
    setUpgradeModules(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        const module = updated[key as keyof UpgradeModules];
        if (module.status === 'active') {
          module.progress = Math.min(100, module.progress + Math.random() * 15);
          module.lastActivity = Date.now();
          
          // Simulate upgrade completion
          if (module.progress >= 100) {
            module.progress = 0;
            setTotalUpgrades(prev => prev + 1);
            
            // Add new upgrade to history
            const newUpgrade: RecentUpgrade = {
              type: `${module.name} Enhancement`,
              description: `Autonomous upgrade completed for ${module.name}`,
              impact: Math.random() > 0.5 ? 'HIGH' : 'MEDIUM',
              module: module.name,
              timestamp: Date.now()
            };
            
            setRecentUpgrades(prev => [newUpgrade, ...prev].slice(0, 10));
          }
        }
      });
      return updated;
    });

    // Level up infinity system
    if (totalUpgrades > 0 && totalUpgrades % 5 === 0) {
      setInfinityLevel(prev => prev + 1);
    }
  }, [totalUpgrades]);

  // Force upgrade check
  const forceUpgradeCheck = useCallback(() => {
    const now = Date.now();
    // Prevent duplicate force checks within 5 seconds
    if (now - lastForceCheckTime < 5000) {
      return;
    }
    
    console.log('🔄 Force checking for upgrades...');
    
    performUpgradeCycle();
    
    setLastForceCheckTime(now);
    toast({
      title: "🔄 Force Upgrade Check",
      description: "Manual upgrade check completed - all modules evaluated",
      duration: 3000,
    });
  }, [performUpgradeCycle, lastForceCheckTime]);

  // Set emergency mode
  const setEmergencyMode = useCallback((enabled: boolean) => {
    setLoopState(prev => ({
      ...prev,
      emergencyMode: enabled
    }));

    if (enabled) {
      pauseInfinityLoop();
      toast({
        title: "🚨 EMERGENCY MODE ACTIVATED",
        description: "Infinity loop paused for safety - manual control restored",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [pauseInfinityLoop]);

  // Get enhanced loop statistics
  const getLoopStats = useCallback((): LoopStats => {
    return {
      processingPower: Math.min(100, 85 + (infinityLevel * 3)), // Enhanced base + scaling
      memoryCapacity: Math.min(2000, 512 + (infinityLevel * 64)), // Doubled capacity
      connectivityLevel: Math.min(100, 90 + (infinityLevel * 2)), // Enhanced connectivity
      recentUpgrades
    };
  }, [infinityLevel, recentUpgrades]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loopInterval.current) clearInterval(loopInterval.current);
      if (upgradeInterval.current) clearInterval(upgradeInterval.current);
    };
  }, []);

  return {
    loopState,
    upgradeModules,
    autonomousMode,
    infinityLevel,
    totalUpgrades,
    activateInfinityLoop,
    pauseInfinityLoop,
    getLoopStats,
    forceUpgradeCheck,
    setEmergencyMode
  };
};
