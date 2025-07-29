import React, { useEffect, useRef } from 'react';
import { useSystemsActivator } from '@/hooks/useSystemsActivator';
import { useSystemStabilizer } from '@/hooks/useSystemStabilizer';
import { toast } from '@/hooks/use-toast';

interface AutoSystemActivatorProps {
  enabled?: boolean;
  interval?: number; // in milliseconds
}

export const AutoSystemActivator: React.FC<AutoSystemActivatorProps> = ({
  enabled = true,
  interval = 300000 // 5 minutes default
}) => {
  const { activateAllSystems, getSystemsStatus } = useSystemsActivator();
  const { forceStabilize } = useSystemStabilizer();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivationRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial activation
    setTimeout(() => {
      const status = getSystemsStatus();
      if (status.percentage < 80) {
        activateAllSystems();
        lastActivationRef.current = Date.now();
      }
    }, 2000);

    // Set up periodic check
    intervalRef.current = setInterval(() => {
      const status = getSystemsStatus();
      const now = Date.now();
      
      // Only activate if system percentage is low and enough time has passed since last activation
      if (status.percentage < 70 && (now - lastActivationRef.current) > 60000) {
        activateAllSystems();
        lastActivationRef.current = now;
        
        // Also perform system stabilization
        forceStabilize();
        
        // Show notification only for critical activations
        if (status.percentage < 50) {
          toast({
            title: "🔄 AUTO-RECOVERY ACTIVATED",
            description: `System autonomy restored: ${status.active}/${status.total} systems active`,
            duration: 2000,
          });
        }
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, interval, activateAllSystems, forceStabilize, getSystemsStatus]);

  // This component renders nothing - it's purely for side effects
  return null;
};

export default AutoSystemActivator;