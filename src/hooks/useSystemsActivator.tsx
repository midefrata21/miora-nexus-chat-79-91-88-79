import { useEffect } from 'react';
import { useSystemStatus, SYSTEM_TYPES } from '@/contexts/SystemStatusContext';
import { toast } from '@/hooks/use-toast';

export const useSystemsActivator = () => {
  const { systems, activateSystem, addLog } = useSystemStatus();

  const activateAllSystems = () => {
    const systemsToActivate = [
      { id: 'AUTONOMOUS_CORE', name: 'MIORA Autonomous Core' },
      { id: 'AUTO_DEVELOP', name: 'Auto Development Engine' },
      { id: 'INFRASTRUCTURE', name: 'Infrastructure Manager' },
      { id: 'SECURITY', name: 'Security Protocol System' },
      { id: 'VOICE_ENGINE', name: 'Voice Processing Engine' },
      { id: 'QUANTUM_ENGINE', name: 'Quantum Computing Module' },
      { id: 'AI_SUPREME', name: 'AI Supreme Intelligence' },
      { id: 'INFINITY_CORE', name: 'Infinity Processing Core' },
      { id: 'STRATEGIC_PLANNING', name: 'Strategic Planning System' },
      { id: 'SELF_MODIFICATION', name: 'Self-Modification Engine' },
      { id: 'RESOURCE_ALLOCATION', name: 'Resource Allocation Manager' },
      { id: 'DECISION_ENGINE', name: 'Decision Making Engine' },
      { id: 'NEURAL_NETWORK', name: 'Neural Network Processor' },
      { id: 'MACHINE_LEARNING', name: 'Machine Learning Engine' },
      { id: 'OPTIMIZATION_ENGINE', name: 'Performance Optimization' },
      { id: 'DATA_ANALYTICS', name: 'Advanced Data Analytics' },
      { id: 'PREDICTIVE_AI', name: 'Predictive AI System' },
      { id: 'SELF_HEALING', name: 'Self-Healing Infrastructure' }
    ] as const;

    let activatedCount = 0;
    systemsToActivate.forEach(({ id, name }) => {
      const systemKey = SYSTEM_TYPES[id as keyof typeof SYSTEM_TYPES];
      if (!systems[systemKey]?.isActive) {
        activateSystem(systemKey, name);
        addLog(systemKey, `Auto-activated for optimal performance`);
        activatedCount++;
      }
    });

    // Only show toast if systems were actually activated
    if (activatedCount > 0) {
      toast({
        title: "🚀 MIORA ENHANCED DEPLOYMENT",
        description: `${activatedCount} critical systems activated for autonomous operation`,
        duration: 3000,
      });
    }
  };

  const getSystemsStatus = () => {
    const totalSystems = Object.keys(SYSTEM_TYPES).length;
    const activeSystems = Object.values(systems).filter(s => s.isActive).length;
    
    return {
      total: totalSystems,
      active: activeSystems,
      percentage: Math.round((activeSystems / totalSystems) * 100)
    };
  };

  return {
    activateAllSystems,
    getSystemsStatus
  };
};