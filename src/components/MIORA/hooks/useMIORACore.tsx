
import { useMIORASystem } from './useMIORASystem';

export const useMIORACore = () => {
  const systemHook = useMIORASystem({
    systemId: 'miora-core',
    systemName: 'MIORA Core',
    autoStart: false  // Changed to false to prevent auto-restart on page navigation
  });

  return {
    ...systemHook,
    // Alias for backward compatibility
    startMIORA: systemHook.startSystem,
    stopMIORA: systemHook.stopSystem
  };
};
