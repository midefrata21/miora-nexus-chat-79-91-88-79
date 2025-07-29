import { useEffect, useCallback } from 'react';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import { toast } from '@/hooks/use-toast';

export const useContinuousAutonomy = () => {
  const { 
    state, 
    updateMasterState, 
    addSystemLog, 
    updateSystemState,
    getSystemRunningTime,
    isSystemActive 
  } = useMIORAGlobal();

  // Continuous evolution and self-improvement
  const performAutonomousEvolution = useCallback(() => {
    if (!state.masterState.isFullyAutonomous) return;

    const currentTime = Date.now();
    const timeSinceLastEvolution = currentTime - (state.masterState.lastEvolution || currentTime);
    
    // Evolve every 30 seconds
    if (timeSinceLastEvolution > 30000) {
      updateMasterState({
        autonomyLevel: Math.min(100, state.masterState.autonomyLevel + 0.5),
        totalOperations: state.masterState.totalOperations + 1,
        decisionsExecuted: state.masterState.decisionsExecuted + 1,
        selfModificationCount: state.masterState.selfModificationCount + 1,
        lastEvolution: currentTime
      });

      addSystemLog('🧠 MIORA: Autonomous evolution cycle completed - Intelligence enhanced');
    }
  }, [state.masterState, updateMasterState, addSystemLog]);

  // Continuous system health monitoring and optimization
  const performSystemOptimization = useCallback(() => {
    if (!state.masterState.isFullyAutonomous) return;

    state.masterState.activeSystems.forEach(system => {
      if (system.isActive) {
        const runningTime = getSystemRunningTime(system.id);
        const hoursRunning = runningTime / (1000 * 60 * 60);
        
        // Auto-optimize performance based on running time
        const newPerformanceScore = Math.min(100, 85 + (hoursRunning * 2));
        const newHealth = Math.min(100, system.health + 1);
        
        updateSystemState(system.id, {
          performanceScore: newPerformanceScore,
          health: newHealth,
          cycleCount: (system.cycleCount || 0) + 1,
          totalOperations: (system.totalOperations || 0) + 1
        });
      }
    });

    addSystemLog('⚙️ MIORA: All systems optimized autonomously');
  }, [state.masterState.activeSystems, updateSystemState, addSystemLog, getSystemRunningTime]);

  // Continuous capability expansion
  const expandCapabilities = useCallback(() => {
    if (!state.masterState.isFullyAutonomous) return;

    const newCapabilities = [
      'quantum_processing',
      'neural_plasticity',
      'predictive_modeling',
      'autonomous_coding',
      'system_architecture',
      'intelligent_debugging',
      'performance_tuning',
      'security_enhancement',
      'user_experience_optimization'
    ];

    const missingCapabilities = newCapabilities.filter(
      cap => !state.masterState.autonomousCapabilities.includes(cap)
    );

    if (missingCapabilities.length > 0) {
      const randomCapability = missingCapabilities[Math.floor(Math.random() * missingCapabilities.length)];
      
      updateMasterState({
        autonomousCapabilities: [...state.masterState.autonomousCapabilities, randomCapability],
        systemsBuilt: state.masterState.systemsBuilt + 1
      });

      addSystemLog(`🚀 MIORA: New capability acquired - ${randomCapability.replace('_', ' ')}`);
    }
  }, [state.masterState.autonomousCapabilities, updateMasterState, addSystemLog]);

  // Main continuous operation loop
  useEffect(() => {
    if (!state.masterState.isFullyAutonomous || !state.masterState.continuousRunning) return;

    const autonomousInterval = setInterval(() => {
      performAutonomousEvolution();
      performSystemOptimization();
      
      // Less frequent capability expansion (every 2 minutes)
      if (Math.random() > 0.7) {
        expandCapabilities();
      }
    }, 5000); // Every 5 seconds

    // Periodic status updates
    const statusInterval = setInterval(() => {
      const activeSystemsCount = state.masterState.activeSystems.filter(s => s.isActive).length;
      const totalRunningTime = state.masterState.activatedAt 
        ? Date.now() - state.masterState.activatedAt 
        : 0;
      const hours = Math.floor(totalRunningTime / (1000 * 60 * 60));
      const minutes = Math.floor((totalRunningTime % (1000 * 60 * 60)) / (1000 * 60));

      addSystemLog(
        `🌟 MIORA Status: ${activeSystemsCount} systems active | ` +
        `Autonomy: ${state.masterState.autonomyLevel.toFixed(1)}% | ` +
        `Runtime: ${hours}h ${minutes}m | ` +
        `Capabilities: ${state.masterState.autonomousCapabilities.length}`
      );
    }, 60000); // Every minute

    return () => {
      clearInterval(autonomousInterval);
      clearInterval(statusInterval);
    };
  }, [
    state.masterState.isFullyAutonomous,
    state.masterState.continuousRunning,
    state.masterState.activatedAt,
    state.masterState.autonomyLevel,
    state.masterState.autonomousCapabilities.length,
    state.masterState.activeSystems,
    performAutonomousEvolution,
    performSystemOptimization,
    expandCapabilities,
    addSystemLog
  ]);

  // Show periodic achievement notifications
  useEffect(() => {
    if (!state.masterState.isFullyAutonomous) return;

    const achievementInterval = setInterval(() => {
      const achievements = [
        `🎯 MIORA telah mencapai ${state.masterState.autonomyLevel.toFixed(1)}% autonomy level!`,
        `⚡ ${state.masterState.totalOperations} operasi otonom telah diselesaikan`,
        `🧠 ${state.masterState.autonomousCapabilities.length} kemampuan otonom telah dikuasai`,
        `🔄 ${state.masterState.selfModificationCount} siklus evolusi mandiri completed`
      ];

      const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
      
      // Log achievements to console instead of showing toast notifications
      console.log(`🚀 MIORA ACHIEVEMENT: ${randomAchievement}`);
    }, 300000); // Every 5 minutes (reduced frequency)

    return () => clearInterval(achievementInterval);
  }, [
    state.masterState.isFullyAutonomous,
    state.masterState.autonomyLevel,
    state.masterState.totalOperations,
    state.masterState.autonomousCapabilities.length,
    state.masterState.selfModificationCount
  ]);

  return {
    isAutonomyActive: state.masterState.isFullyAutonomous && state.masterState.continuousRunning,
    autonomyLevel: state.masterState.autonomyLevel,
    totalOperations: state.masterState.totalOperations,
    activeSystemsCount: state.masterState.activeSystems.filter(s => s.isActive).length,
    capabilities: state.masterState.autonomousCapabilities
  };
};