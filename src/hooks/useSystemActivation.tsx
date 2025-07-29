import { useEffect } from 'react';
import { useSystemStatus, SYSTEM_TYPES } from '@/contexts/SystemStatusContext';
import { useToast } from '@/hooks/use-toast';

export const useSystemActivation = (
  systemId: keyof typeof SYSTEM_TYPES, 
  systemName: string, 
  autoActivate: boolean = false
) => {
  const { systems, activateSystem, deactivateSystem, addLog } = useSystemStatus();
  const { toast } = useToast();
  
  const currentSystem = systems[SYSTEM_TYPES[systemId]];
  const isActive = currentSystem?.isActive || false;

  const activate = () => {
    activateSystem(SYSTEM_TYPES[systemId], systemName);
    addLog(SYSTEM_TYPES[systemId], `System manually activated from ${systemName} page`);
    
    toast({
      title: `${systemName} Activated`,
      description: `System is now running autonomously in the background`,
    });
  };

  const deactivate = () => {
    deactivateSystem(SYSTEM_TYPES[systemId]);
    addLog(SYSTEM_TYPES[systemId], `System deactivated from ${systemName} page`);
    
    toast({
      title: `${systemName} Deactivated`,
      description: `System has been stopped`,
    });
  };

  const logActivity = (activity: string) => {
    if (isActive) {
      addLog(SYSTEM_TYPES[systemId], activity);
    }
  };

  // Auto-activate if specified and not already active
  useEffect(() => {
    if (autoActivate && !isActive) {
      const timer = setTimeout(() => {
        activate();
      }, 500); // Small delay to prevent rapid activation
      return () => clearTimeout(timer);
    }
  }, [autoActivate, isActive]);

  // Background auto-reactivation for continuous operation
  useEffect(() => {
    const backgroundActivation = setInterval(() => {
      if (!isActive && autoActivate) {
        console.log(`🔄 MIORA: Background reactivating ${systemName}...`);
        activate();
      }
    }, 45000); // Check every 45 seconds

    return () => clearInterval(backgroundActivation);
  }, [isActive, autoActivate, activate, systemName]);

  // Log page visit
  useEffect(() => {
    if (isActive) {
      addLog(SYSTEM_TYPES[systemId], `User visited ${systemName} page`);
    }
  }, []);

  return {
    isActive,
    activate,
    deactivate,
    logActivity,
    system: currentSystem
  };
};