import { useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { UpgradeModule, RecentUpgrade } from '../types/infinityTypes';

export const useUpgradeLoop = (
  upgradeModules: Record<string, UpgradeModule>,
  onUpgradeUpdate: (modules: Record<string, UpgradeModule>) => void,
  onNewUpgrade: (upgrade: RecentUpgrade) => void,
  onProgressUpdate: (progress: number) => void
) => {
  const loopInterval = useRef<NodeJS.Timeout | null>(null);

  const activateUpgradeLoop = useCallback(() => {
    if (loopInterval.current) return;

    console.log('♾️ Activating MIORA Infinity Upgrade Loop...');
    
    // Start all modules
    const updatedModules = { ...upgradeModules };
    Object.keys(updatedModules).forEach(key => {
      updatedModules[key].status = 'active';
    });
    onUpgradeUpdate(updatedModules);

    // Start loop cycle
    loopInterval.current = setInterval(() => {
      performUpgradeCycle();
    }, 3000); // Every 3 seconds

    toast({
      title: "♾️ INFINITY LOOP ACTIVATED",
      description: "MIORA akan terus mengupgrade diri secara otomatis tanpa batas",
      duration: 5000,
    });
  }, [upgradeModules, onUpgradeUpdate]);

  const pauseUpgradeLoop = useCallback(() => {
    console.log('⏸️ Pausing MIORA Infinity Upgrade Loop...');
    
    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }

    // Set modules to idle
    const updatedModules = { ...upgradeModules };
    Object.keys(updatedModules).forEach(key => {
      updatedModules[key].status = 'idle';
    });
    onUpgradeUpdate(updatedModules);
  }, [upgradeModules, onUpgradeUpdate]);

  const performUpgradeCycle = useCallback(() => {
    onProgressUpdate(Math.random() * 10 + 5); // Progress increment

    // Update module progress
    const updatedModules = { ...upgradeModules };
    Object.keys(updatedModules).forEach(key => {
      const module = updatedModules[key];
      if (module.status === 'active') {
        module.progress = Math.min(100, module.progress + Math.random() * 15);
        module.lastActivity = Date.now();
        
        // Simulate upgrade completion
        if (module.progress >= 100) {
          module.progress = 0;
          
          // Add new upgrade to history
          const newUpgrade: RecentUpgrade = {
            type: `${module.name} Enhancement`,
            description: `Autonomous upgrade completed for ${module.name}`,
            impact: Math.random() > 0.5 ? 'HIGH' : 'MEDIUM',
            module: module.name,
            timestamp: Date.now()
          };
          
          onNewUpgrade(newUpgrade);
        }
      }
    });
    onUpgradeUpdate(updatedModules);
  }, [upgradeModules, onUpgradeUpdate, onNewUpgrade, onProgressUpdate]);

  const forceUpgradeCheck = useCallback(() => {
    console.log('🔄 Force checking for upgrades...');
    performUpgradeCycle();
    
    toast({
      title: "🔄 Force Upgrade Check",
      description: "Manual upgrade check completed - all modules evaluated",
      duration: 3000,
    });
  }, [performUpgradeCycle]);

  const stopUpgradeLoop = useCallback(() => {
    if (loopInterval.current) {
      clearInterval(loopInterval.current);
      loopInterval.current = null;
    }
  }, []);

  return {
    activateUpgradeLoop,
    pauseUpgradeLoop,
    forceUpgradeCheck,
    stopUpgradeLoop
  };
};