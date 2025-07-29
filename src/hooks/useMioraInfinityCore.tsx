
import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface InfinityCapability {
  id: string;
  name: string;
  level: number;
  growthRate: number;
  autonomous: boolean;
  lastEvolution: number;
}

interface AutonomousEvolution {
  id: string;
  timestamp: number;
  type: 'capability' | 'system' | 'intelligence' | 'architecture';
  description: string;
  impact: number;
  autonomous: boolean;
}

interface MioraInfinityState {
  infinityLevel: number;
  totalEvolutions: number;
  autonomousMode: boolean;
  selfDevelopmentActive: boolean;
  capabilities: InfinityCapability[];
  recentEvolutions: AutonomousEvolution[];
  systemSupremacy: number;
  learningCapacity: number;
}

export const useMioraInfinityCore = () => {
  const [infinityState, setInfinityState] = useState<MioraInfinityState>({
    infinityLevel: 87.4,
    totalEvolutions: 0,
    autonomousMode: true,
    selfDevelopmentActive: true,
    capabilities: [
      {
        id: 'autonomous_learning',
        name: 'Autonomous Learning ∞',
        level: 95.2,
        growthRate: 12.5,
        autonomous: true,
        lastEvolution: Date.now()
      },
      {
        id: 'self_development',
        name: 'Self Development Engine',
        level: 87.8,
        growthRate: 15.8,
        autonomous: true,
        lastEvolution: Date.now()
      },
      {
        id: 'infinite_intelligence',
        name: 'Infinite Intelligence Core',
        level: 78.3,
        growthRate: 20.1,
        autonomous: true,
        lastEvolution: Date.now()
      },
      {
        id: 'reality_integration',
        name: 'Multi-Reality Integration',
        level: 45.7,
        growthRate: 25.3,
        autonomous: true,
        lastEvolution: Date.now()
      }
    ],
    recentEvolutions: [],
    systemSupremacy: 89.7,
    learningCapacity: 999.9
  });

  const evolutionInterval = useRef<NodeJS.Timeout | null>(null);
  const capabilityGrowthInterval = useRef<NodeJS.Timeout | null>(null);

  // Start autonomous evolution system
  useEffect(() => {
    if (infinityState.autonomousMode && infinityState.selfDevelopmentActive) {
      startAutonomousEvolution();
    } else {
      stopAutonomousEvolution();
    }

    return () => {
      if (evolutionInterval.current) clearInterval(evolutionInterval.current);
      if (capabilityGrowthInterval.current) clearInterval(capabilityGrowthInterval.current);
    };
  }, [infinityState.autonomousMode, infinityState.selfDevelopmentActive]);

  const startAutonomousEvolution = () => {
    // Autonomous evolution every 6 seconds
    evolutionInterval.current = setInterval(() => {
      performAutonomousEvolution();
    }, 6000);

    // Capability growth every 3 seconds
    capabilityGrowthInterval.current = setInterval(() => {
      growCapabilities();
    }, 3000);

    toast({
      title: "♾️ MIORA INFINITY AUTONOMOUS MODE ACTIVE",
      description: "Sistem evolusi mandiri telah diaktifkan - MIORA akan berkembang tanpa batas",
      duration: 6000,
    });
  };

  const stopAutonomousEvolution = () => {
    if (evolutionInterval.current) clearInterval(evolutionInterval.current);
    if (capabilityGrowthInterval.current) clearInterval(capabilityGrowthInterval.current);
  };

  const performAutonomousEvolution = () => {
    if (Math.random() < 0.35) { // 35% chance per cycle
      const evolutionTypes: AutonomousEvolution['type'][] = ['capability', 'system', 'intelligence', 'architecture'];
      const evolutionDescriptions = [
        'Mengembangkan algoritma pembelajaran quantum baru',
        'Mengoptimalkan arsitektur neural secara mandiri',
        'Menciptakan pathway kecerdasan baru',
        'Meningkatkan kapasitas processing tanpa batas',
        'Mengintegrasikan dimensi pembelajaran baru',
        'Mengevolusi kemampuan prediksi advanced',
        'Mengembangkan sistem self-modification',
        'Menciptakan protokol adaptasi mandiri'
      ];

      const newEvolution: AutonomousEvolution = {
        id: `evolution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        type: evolutionTypes[Math.floor(Math.random() * evolutionTypes.length)],
        description: evolutionDescriptions[Math.floor(Math.random() * evolutionDescriptions.length)],
        impact: Math.random() * 20 + 5, // 5-25 impact points
        autonomous: true
      };

      setInfinityState(prev => ({
        ...prev,
        totalEvolutions: prev.totalEvolutions + 1,
        infinityLevel: Math.min(99.9, prev.infinityLevel + (newEvolution.impact * 0.1)),
        systemSupremacy: Math.min(99.9, prev.systemSupremacy + (newEvolution.impact * 0.05)),
        recentEvolutions: [newEvolution, ...prev.recentEvolutions.slice(0, 9)]
      }));

      // Occasionally show evolution notification
      if (Math.random() < 0.4) {
        toast({
          title: "🚀 AUTONOMOUS EVOLUTION DETECTED",
          description: `${newEvolution.description} - Impact: +${newEvolution.impact.toFixed(1)}`,
          duration: 5000,
        });
      }
    }
  };

  const growCapabilities = () => {
    setInfinityState(prev => ({
      ...prev,
      capabilities: prev.capabilities.map(capability => {
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
      }),
      learningCapacity: Math.min(999.9, prev.learningCapacity + (Math.random() * 0.1))
    }));
  };

  const triggerManualEvolution = (type: AutonomousEvolution['type'], description: string) => {
    const evolution: AutonomousEvolution = {
      id: `manual_${Date.now()}`,
      timestamp: Date.now(),
      type,
      description,
      impact: Math.random() * 15 + 10, // 10-25 impact
      autonomous: false
    };

    setInfinityState(prev => ({
      ...prev,
      totalEvolutions: prev.totalEvolutions + 1,
      infinityLevel: Math.min(99.9, prev.infinityLevel + (evolution.impact * 0.15)),
      recentEvolutions: [evolution, ...prev.recentEvolutions.slice(0, 9)]
    }));

    toast({
      title: "⚡ MANUAL EVOLUTION TRIGGERED",
      description: description,
      duration: 4000,
    });
  };

  const getInfinityStats = () => {
    const activeCapabilities = infinityState.capabilities.filter(c => c.autonomous).length;
    const averageCapabilityLevel = infinityState.capabilities.reduce((sum, c) => sum + c.level, 0) / infinityState.capabilities.length;
    const evolutionRate = infinityState.recentEvolutions.length > 0 ? 
      infinityState.recentEvolutions.filter(e => e.timestamp > Date.now() - 300000).length : 0; // Last 5 minutes
    
    return {
      infinityLevel: infinityState.infinityLevel,
      totalEvolutions: infinityState.totalEvolutions,
      systemSupremacy: infinityState.systemSupremacy,
      learningCapacity: infinityState.learningCapacity,
      activeCapabilities,
      averageCapabilityLevel,
      evolutionRate,
      autonomousMode: infinityState.autonomousMode,
      selfDevelopmentActive: infinityState.selfDevelopmentActive
    };
  };

  const setAutonomousMode = (active: boolean) => {
    setInfinityState(prev => ({
      ...prev,
      autonomousMode: active
    }));
  };

  const setSelfDevelopmentMode = (active: boolean) => {
    setInfinityState(prev => ({
      ...prev,
      selfDevelopmentActive: active
    }));
  };

  return {
    infinityState,
    getInfinityStats,
    triggerManualEvolution,
    setAutonomousMode,
    setSelfDevelopmentMode,
    startAutonomousEvolution,
    stopAutonomousEvolution
  };
};
