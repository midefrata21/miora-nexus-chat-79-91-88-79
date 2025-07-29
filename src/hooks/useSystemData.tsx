
import { useState, useEffect } from 'react';
import { Brain, Code, Database, Network, Activity, Shield, Target, Zap } from 'lucide-react';

export const useSystemData = () => {
  const [systemStatus, setSystemStatus] = useState({
    isOnline: true,
    lastUpdate: Date.now(),
    activeModules: 8,
    healthScore: 98
  });

  const [quickStats, setQuickStats] = useState({
    totalSystems: 15,
    activeSystems: 12,
    upgradesAvailable: 3,
    issuesResolved: 24
  });

  const systemModules = [
    {
      name: 'MIORA Autonomous Core',
      path: '/miora-autonomous-core',
      icon: Brain,
      status: 'active' as const,
      description: 'Self-operating AI system with autonomous capabilities'
    },
    {
      name: 'Self-Code Generation',
      path: '/miora-self-code-generation',
      icon: Code,
      status: 'active' as const,
      description: 'Autonomous code generation and optimization'
    },
    {
      name: 'Infrastructure Builder',
      path: '/miora-autonomous-infrastructure',
      icon: Network,
      status: 'monitoring' as const,
      description: 'Self-building infrastructure management'
    },
    {
      name: 'Memory System',
      path: '/long-memory-system',
      icon: Database,
      status: 'active' as const,
      description: 'Advanced memory and learning capabilities'
    },
    {
      name: 'Performance Monitor',
      path: '/system-diagnostics',
      icon: Activity,
      status: 'monitoring' as const,
      description: 'Real-time system performance tracking'
    },
    {
      name: 'Security Core',
      path: '/security-center',
      icon: Shield,
      status: 'active' as const,
      description: 'Autonomous security and protection systems'
    },
    {
      name: 'Evolution Engine',
      path: '/full-self-evolution',
      icon: Target,
      status: 'upgrading' as const,
      description: 'Continuous self-improvement and evolution'
    },
    {
      name: 'Quantum Core',
      path: '/quantum-infrastructure',
      icon: Zap,
      status: 'active' as const,
      description: 'Advanced quantum processing capabilities'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: Date.now(),
        healthScore: Math.max(95, Math.min(100, prev.healthScore + (Math.random() - 0.5) * 2))
      }));

      setQuickStats(prev => ({
        ...prev,
        activeSystems: Math.max(10, Math.min(15, prev.activeSystems + Math.floor((Math.random() - 0.5) * 3))),
        issuesResolved: prev.issuesResolved + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    systemStatus,
    quickStats,
    systemModules
  };
};
