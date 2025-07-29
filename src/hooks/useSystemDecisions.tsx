
import { useState, useCallback, useRef, useEffect } from 'react';

export interface SystemDecision {
  id: string;
  type: 'infrastructure' | 'feature' | 'optimization' | 'architecture';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  autoImplemented: boolean;
  timestamp: number;
  impact: string;
}

export const useSystemDecisions = (isActive: boolean, onDecisionMade: () => void) => {
  const getInitialDecisions = () => {
    const savedDecisions = localStorage.getItem('miora-system-decisions');
    if (savedDecisions) {
      try {
        return JSON.parse(savedDecisions);
      } catch (error) {
        console.error('Failed to parse saved system decisions:', error);
      }
    }
    return [];
  };

  const [systemDecisions, setSystemDecisions] = useState<SystemDecision[]>(getInitialDecisions);
  const decisionMakingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const makeAutonomousDecision = useCallback(() => {
    const decisionTypes = ['infrastructure', 'feature', 'optimization', 'architecture'] as const;
    const priorities = ['critical', 'high', 'medium', 'low'] as const;
    
    const decisionTemplates = {
      infrastructure: [
        'Membangun sistem database terdistribusi untuk skalabilitas',
        'Implementasi CDN untuk optimasi performa global',
        'Setup monitoring sistem real-time dengan alerting'
      ],
      feature: [
        'Menambahkan sistem AI chat terintegrasi',
        'Implementasi sistem rekomendasi cerdas',
        'Membangun dashboard analytics real-time'
      ],
      optimization: [
        'Optimasi algoritma machine learning untuk performa',
        'Implementasi caching multi-layer',
        'Refaktor arsitektur untuk microservices'
      ],
      architecture: [
        'Migrasi ke arsitektur serverless',
        'Implementasi event-driven architecture',
        'Setup container orchestration dengan Kubernetes'
      ]
    };

    const type = decisionTypes[Math.floor(Math.random() * decisionTypes.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const templates = decisionTemplates[type];
    const description = templates[Math.floor(Math.random() * templates.length)];

    const newDecision: SystemDecision = {
      id: `decision_${Date.now()}`,
      type,
      description,
      priority,
      autoImplemented: Math.random() > 0.3,
      timestamp: Date.now(),
      impact: priority === 'critical' ? 'Revolutionary' : 
              priority === 'high' ? 'Significant' : 
              priority === 'medium' ? 'Moderate' : 'Minor'
    };

    const newDecisions = [...systemDecisions, newDecision];
    setSystemDecisions(newDecisions);
    localStorage.setItem('miora-system-decisions', JSON.stringify(newDecisions));
    onDecisionMade();

    console.log(`🧠 AUTONOMOUS DECISION: ${description} [${priority}] - Auto-implemented: ${newDecision.autoImplemented}`);
  }, [onDecisionMade]);

  const startAutonomousDecisionMaking = useCallback(() => {
    if (isActive) {
      decisionMakingIntervalRef.current = setInterval(() => {
        makeAutonomousDecision();
      }, 20000);
    }
  }, [isActive, makeAutonomousDecision]);

  const stopAutonomousDecisionMaking = useCallback(() => {
    if (decisionMakingIntervalRef.current) {
      clearInterval(decisionMakingIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startAutonomousDecisionMaking();
    } else {
      stopAutonomousDecisionMaking();
    }

    return () => stopAutonomousDecisionMaking();
  }, [isActive, startAutonomousDecisionMaking, stopAutonomousDecisionMaking]);

  return {
    systemDecisions,
    makeAutonomousDecision
  };
};
