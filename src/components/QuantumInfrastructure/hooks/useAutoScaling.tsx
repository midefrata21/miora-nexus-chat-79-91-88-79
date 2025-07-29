import { useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import type { SystemMetrics } from './useSystemMetrics';
import type { InfrastructureNode } from './useInfrastructureNodes';

export const useAutoScaling = (
  isQuantumActive: boolean,
  systemMetrics: SystemMetrics,
  infrastructureNodes: InfrastructureNode[]
) => {
  const performAutoScaling = useCallback((direction: 'up' | 'down') => {
    const scalingNodes = infrastructureNodes.filter(node => node.type === 'scaling');
    
    if (direction === 'up') {
      toast({
        title: "📈 AUTO-SCALING UP",
        description: "Deploying additional nodes to handle increased load",
        duration: 4000,
      });
    } else {
      toast({
        title: "📉 AUTO-SCALING DOWN",
        description: "Optimizing resources by reducing unnecessary nodes",
        duration: 4000,
      });
    }
  }, [infrastructureNodes]);

  // Auto-scaling logic
  useEffect(() => {
    if (!isQuantumActive) return;

    const scalingInterval = setInterval(() => {
      // Check if scaling is needed
      if (systemMetrics.responseTime > 200 || systemMetrics.activeConnections > 4000) {
        performAutoScaling('up');
      } else if (systemMetrics.responseTime < 50 && systemMetrics.activeConnections < 1000) {
        performAutoScaling('down');
      }
    }, 15000);

    return () => clearInterval(scalingInterval);
  }, [isQuantumActive, systemMetrics, performAutoScaling]);

  return {
    performAutoScaling
  };
};