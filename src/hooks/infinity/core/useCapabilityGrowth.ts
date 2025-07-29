import { useCallback, useRef } from 'react';
import { InfinityCapability } from '../types/infinityTypes';

export const useCapabilityGrowth = (
  capabilities: InfinityCapability[],
  onCapabilitiesUpdate: (capabilities: InfinityCapability[]) => void
) => {
  const capabilityGrowthInterval = useRef<NodeJS.Timeout | null>(null);

  const startCapabilityGrowth = useCallback(() => {
    if (capabilityGrowthInterval.current) return;

    capabilityGrowthInterval.current = setInterval(() => {
      growCapabilities();
    }, 3000);
  }, []);

  const stopCapabilityGrowth = useCallback(() => {
    if (capabilityGrowthInterval.current) {
      clearInterval(capabilityGrowthInterval.current);
      capabilityGrowthInterval.current = null;
    }
  }, []);

  const growCapabilities = useCallback(() => {
    const updatedCapabilities = capabilities.map(capability => {
      if (capability.autonomous && capability.level < 999) {
        const growth = (capability.growthRate / 100) * (Math.random() + 0.5);
        const newLevel = Math.min(999, capability.level + growth);
        
        return {
          ...capability,
          level: newLevel,
          lastEvolution: Date.now()
        };
      }
      return capability;
    });

    onCapabilitiesUpdate(updatedCapabilities);
  }, [capabilities, onCapabilitiesUpdate]);

  return {
    startCapabilityGrowth,
    stopCapabilityGrowth
  };
};