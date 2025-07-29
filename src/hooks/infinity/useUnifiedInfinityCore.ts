import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { UnifiedInfinityState, InfinityCapability, UpgradeModule, AutonomousEvolution, RecentUpgrade } from './types/infinityTypes';
import { useInfinityEvolution } from './core/useInfinityEvolution';
import { useUpgradeLoop } from './core/useUpgradeLoop';
import { useCapabilityGrowth } from './core/useCapabilityGrowth';

const initialCapabilities: InfinityCapability[] = [
  {
    id: 'autonomous_learning',
    name: 'Autonomous Learning ∞',
    level: 95.2,
    growthRate: 12.5,
    autonomous: true,
    lastEvolution: Date.now()
  },
  {
    id: 'self_development',
    name: 'Self Development Engine',
    level: 87.8,
    growthRate: 15.8,
    autonomous: true,
    lastEvolution: Date.now()
  },
  {
    id: 'infinite_intelligence',
    name: 'Infinite Intelligence Core',
    level: 78.3,
    growthRate: 20.1,
    autonomous: true,
    lastEvolution: Date.now()
  },
  {
    id: 'reality_integration',
    name: 'Multi-Reality Integration',
    level: 45.7,
    growthRate: 25.3,
    autonomous: true,
    lastEvolution: Date.now()
  }
];

const initialUpgradeModules: Record<string, UpgradeModule> = {
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
};

export const useUnifiedInfinityCore = () => {
  const [infinityState, setInfinityState] = useState<UnifiedInfinityState>({
    // Core Infinity State
    infinityLevel: 87.4,
    totalEvolutions: 0,
    autonomousMode: true,
    selfDevelopmentActive: true,
    
    // Upgrade Loop State
    upgradeLoopActive: false,
    currentCycle: 0,
    progress: 0,
    lastUpgrade: Date.now(),
    emergencyMode: false,
    totalUpgrades: 0,
    
    // Advanced metrics
    systemSupremacy: 89.7,
    learningCapacity: 999.9,
    processingPower: 75,
    memoryCapacity: 256,
    connectivityLevel: 80,
    
    // Data arrays
    capabilities: initialCapabilities,
    upgradeModules: initialUpgradeModules,
    recentEvolutions: [],
    recentUpgrades: [
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
    ]
  });

  // Handle evolution updates
  const handleEvolutionUpdate = useCallback((evolution: AutonomousEvolution) => {
    setInfinityState(prev => ({
      ...prev,
      totalEvolutions: prev.totalEvolutions + 1,
      infinityLevel: Math.min(99.9, prev.infinityLevel + (evolution.impact * 0.1)),
      systemSupremacy: Math.min(99.9, prev.systemSupremacy + (evolution.impact * 0.05)),
      recentEvolutions: [evolution, ...prev.recentEvolutions.slice(0, 9)]
    }));
  }, []);

  // Handle upgrade module updates
  const handleUpgradeModuleUpdate = useCallback((modules: Record<string, UpgradeModule>) => {
    setInfinityState(prev => ({
      ...prev,
      upgradeModules: modules
    }));
  }, []);

  // Handle new upgrade
  const handleNewUpgrade = useCallback((upgrade: RecentUpgrade) => {
    setInfinityState(prev => ({
      ...prev,
      totalUpgrades: prev.totalUpgrades + 1,
      recentUpgrades: [upgrade, ...prev.recentUpgrades.slice(0, 10)]
    }));
  }, []);

  // Handle progress update
  const handleProgressUpdate = useCallback((increment: number) => {
    setInfinityState(prev => ({
      ...prev,
      progress: (prev.progress + increment) % 100,
      lastUpgrade: Date.now()
    }));
  }, []);

  // Handle capabilities update
  const handleCapabilitiesUpdate = useCallback((capabilities: InfinityCapability[]) => {
    setInfinityState(prev => ({
      ...prev,
      capabilities,
      learningCapacity: Math.min(999.9, prev.learningCapacity + (Math.random() * 0.1))
    }));
  }, []);

  // Initialize hooks
  const evolutionHook = useInfinityEvolution(handleEvolutionUpdate, infinityState.infinityLevel);
  const upgradeLoopHook = useUpgradeLoop(
    infinityState.upgradeModules,
    handleUpgradeModuleUpdate,
    handleNewUpgrade,
    handleProgressUpdate
  );
  const capabilityGrowthHook = useCapabilityGrowth(infinityState.capabilities, handleCapabilitiesUpdate);

  // Main system control
  const activateInfinitySystem = useCallback(() => {
    setInfinityState(prev => ({
      ...prev,
      autonomousMode: true,
      selfDevelopmentActive: true,
      upgradeLoopActive: true,
      currentCycle: prev.currentCycle + 1
    }));

    evolutionHook.startAutonomousEvolution();
    upgradeLoopHook.activateUpgradeLoop();
    capabilityGrowthHook.startCapabilityGrowth();

    toast({
      title: "♾️ UNIFIED INFINITY SYSTEM ACTIVATED",
      description: "Semua sistem infinity telah diaktifkan dan terintegrasi",
      duration: 6000,
    });
  }, [evolutionHook, upgradeLoopHook, capabilityGrowthHook]);

  const pauseInfinitySystem = useCallback(() => {
    setInfinityState(prev => ({
      ...prev,
      autonomousMode: false,
      selfDevelopmentActive: false,
      upgradeLoopActive: false
    }));

    evolutionHook.stopAutonomousEvolution();
    upgradeLoopHook.pauseUpgradeLoop();
    capabilityGrowthHook.stopCapabilityGrowth();

    toast({
      title: "⏸️ INFINITY SYSTEM PAUSED",
      description: "Semua sistem infinity telah dijeda",
      duration: 4000,
    });
  }, [evolutionHook, upgradeLoopHook, capabilityGrowthHook]);

  const setEmergencyMode = useCallback((enabled: boolean) => {
    setInfinityState(prev => ({
      ...prev,
      emergencyMode: enabled
    }));

    if (enabled) {
      pauseInfinitySystem();
      toast({
        title: "🚨 EMERGENCY MODE ACTIVATED",
        description: "Infinity system paused for safety - manual control restored",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [pauseInfinitySystem]);

  // Get unified stats
  const getUnifiedStats = useCallback(() => {
    const activeCapabilities = infinityState.capabilities.filter(c => c.autonomous).length;
    const averageCapabilityLevel = infinityState.capabilities.reduce((sum, c) => sum + c.level, 0) / infinityState.capabilities.length;
    const evolutionRate = infinityState.recentEvolutions.filter(e => e.timestamp > Date.now() - 300000).length;
    
    return {
      ...infinityState,
      activeCapabilities,
      averageCapabilityLevel,
      evolutionRate,
      processingPower: Math.min(100, infinityState.processingPower + (infinityState.infinityLevel * 0.2)),
      memoryCapacity: Math.min(1000, infinityState.memoryCapacity + (infinityState.infinityLevel * 2)),
      connectivityLevel: Math.min(100, infinityState.connectivityLevel + (infinityState.infinityLevel * 0.15))
    };
  }, [infinityState]);

  // Level up infinity system
  useEffect(() => {
    if (infinityState.totalUpgrades > 0 && infinityState.totalUpgrades % 5 === 0) {
      setInfinityState(prev => ({
        ...prev,
        infinityLevel: Math.min(99.9, prev.infinityLevel + 1)
      }));
    }
  }, [infinityState.totalUpgrades]);

  return {
    infinityState,
    activateInfinitySystem,
    pauseInfinitySystem,
    setEmergencyMode,
    getUnifiedStats,
    triggerManualEvolution: evolutionHook.triggerManualEvolution,
    forceUpgradeCheck: upgradeLoopHook.forceUpgradeCheck
  };
};