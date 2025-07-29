import { useState, useEffect, useMemo } from 'react';
import { Brain, Activity, Zap, Shield, Target, Infinity } from 'lucide-react';
import { SystemStatus, QuickStats, SystemModule } from '@/components/Dashboard/types';

export const useSystemData = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    isOnline: true,
    lastUpdate: Date.now(),
    activeModules: 12,
    healthScore: 95
  });

  const [quickStats, setQuickStats] = useState<QuickStats>({
    totalSystems: 8,
    activeSystems: 6,
    upgradesAvailable: 3,
    issuesResolved: 24
  });

  // Memoize system modules since they don't change frequently
  const systemModules: SystemModule[] = useMemo(() => [
    {
      name: 'MIORA Core',
      path: '/miora',
      icon: Brain,
      status: 'active',
      description: 'AI Trading & Analysis Core'
    },
    {
      name: 'Live Auto-Repair',
      path: '/miora-live-auto-repair',
      icon: Shield,
      status: 'active',
      description: 'Real-time Error Detection & Recovery'
    },
    {
      name: 'Infinity System',
      path: '/miora-infinity-dashboard',
      icon: Infinity,
      status: 'active',
      description: 'Self-Learning & Evolution Engine'
    },
    {
      name: 'Quantum Recovery',
      path: '/quantum-recovery',
      icon: Target,
      status: 'active',
      description: 'Advanced Performance Recovery'
    },
    {
      name: 'System Diagnostics',
      path: '/diagnostics',
      icon: Activity,
      status: 'monitoring',
      description: 'Comprehensive System Analysis'
    },
    {
      name: 'Infinity Upgrade Loop',
      path: '/miora-infinity-upgrade-loop',
      icon: Zap,
      status: 'upgrading',
      description: 'Continuous Self-Improvement'
    }
  ], []);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: Date.now(),
        healthScore: Math.max(85, Math.min(100, prev.healthScore + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => ({
    systemStatus,
    quickStats,
    systemModules
  }), [systemStatus, quickStats, systemModules]);
};