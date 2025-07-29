import { useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { AutonomousEvolution } from '../types/infinityTypes';

export const useInfinityEvolution = (
  onEvolutionUpdate: (evolution: AutonomousEvolution) => void,
  infinityLevel: number
) => {
  const evolutionInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutonomousEvolution = useCallback(() => {
    if (evolutionInterval.current) return;

    evolutionInterval.current = setInterval(() => {
      performAutonomousEvolution();
    }, 6000);

    toast({
      title: "♾️ AUTONOMOUS EVOLUTION ACTIVE",
      description: "Sistem evolusi mandiri telah diaktifkan - MIORA akan berkembang tanpa batas",
      duration: 6000,
    });
  }, []);

  const stopAutonomousEvolution = useCallback(() => {
    if (evolutionInterval.current) {
      clearInterval(evolutionInterval.current);
      evolutionInterval.current = null;
    }
  }, []);

  const performAutonomousEvolution = useCallback(() => {
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

      onEvolutionUpdate(newEvolution);

      // Occasionally show evolution notification
      if (Math.random() < 0.4) {
        toast({
          title: "🚀 AUTONOMOUS EVOLUTION DETECTED",
          description: `${newEvolution.description} - Impact: +${newEvolution.impact.toFixed(1)}`,
          duration: 5000,
        });
      }
    }
  }, [onEvolutionUpdate]);

  const triggerManualEvolution = useCallback((type: AutonomousEvolution['type'], description: string) => {
    const evolution: AutonomousEvolution = {
      id: `manual_${Date.now()}`,
      timestamp: Date.now(),
      type,
      description,
      impact: Math.random() * 15 + 10, // 10-25 impact
      autonomous: false
    };

    onEvolutionUpdate(evolution);

    toast({
      title: "⚡ MANUAL EVOLUTION TRIGGERED",
      description: description,
      duration: 4000,
    });
  }, [onEvolutionUpdate]);

  return {
    startAutonomousEvolution,
    stopAutonomousEvolution,
    triggerManualEvolution
  };
};