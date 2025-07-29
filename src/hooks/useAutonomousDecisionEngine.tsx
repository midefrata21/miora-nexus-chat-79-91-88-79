import { useState, useCallback, useRef, useEffect } from 'react';

export interface Decision {
  id: string;
  type: 'architecture' | 'resource' | 'optimization' | 'security' | 'scaling';
  description: string;
  decision: string;
  confidence: number;
  timestamp: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  executed: boolean;
}

export const useAutonomousDecisionEngine = (isActive: boolean, onDecisionMade: () => void) => {
  const getInitialDecisions = () => {
    const savedDecisions = localStorage.getItem('miora-autonomous-decisions');
    if (savedDecisions) {
      try {
        return JSON.parse(savedDecisions);
      } catch (error) {
        console.error('Failed to parse saved decisions:', error);
      }
    }
    return [];
  };

  const [decisions, setDecisions] = useState<Decision[]>(getInitialDecisions);
  const [totalDecisions, setTotalDecisions] = useState(decisions.length);
  const decisionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateDecision = useCallback((): Decision => {
    const decisionTypes = ['architecture', 'resource', 'optimization', 'security', 'scaling'] as const;
    const impacts = ['low', 'medium', 'high', 'critical'] as const;
    
    const type = decisionTypes[Math.floor(Math.random() * decisionTypes.length)];
    const impact = impacts[Math.floor(Math.random() * impacts.length)];
    
    const decisionTemplates = {
      architecture: [
        'Migrate to microservices architecture for better scalability',
        'Implement event-driven architecture for real-time processing',
        'Adopt serverless functions for cost optimization',
        'Implement GraphQL API for better data fetching'
      ],
      resource: [
        'Scale up database connections by 50%',
        'Allocate more CPU resources to AI processing',
        'Implement Redis caching layer',
        'Optimize memory usage in ML models'
      ],
      optimization: [
        'Enable code splitting for faster loading',
        'Implement lazy loading for components',
        'Optimize database queries with indexing',
        'Compress assets for better performance'
      ],
      security: [
        'Implement additional authentication layers',
        'Update security certificates',
        'Enable rate limiting on API endpoints',
        'Audit and update dependencies'
      ],
      scaling: [
        'Add load balancer for traffic distribution',
        'Implement auto-scaling policies',
        'Set up CDN for global content delivery',
        'Create backup and disaster recovery plan'
      ]
    };

    const templates = decisionTemplates[type];
    const description = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      id: `decision_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      description,
      decision: `APPROVED: ${description}`,
      confidence: Math.random() * 30 + 70, // 70-100% confidence
      timestamp: Date.now(),
      impact,
      executed: Math.random() > 0.3 // 70% chance of execution
    };
  }, []);

  const makeAutonomousDecision = useCallback(() => {
    const newDecision = generateDecision();
    
    const updatedDecisions = [...decisions, newDecision];
    setDecisions(updatedDecisions);
    setTotalDecisions(prev => prev + 1);
    
    localStorage.setItem('miora-autonomous-decisions', JSON.stringify(updatedDecisions));
    onDecisionMade();

    console.log(`🧠 AUTONOMOUS DECISION: ${newDecision.type.toUpperCase()} - ${newDecision.description}`);
    
    // Simulate decision execution
    if (newDecision.executed) {
      setTimeout(() => {
        console.log(`✅ DECISION EXECUTED: ${newDecision.decision}`);
      }, Math.random() * 5000 + 2000); // 2-7 seconds delay
    }
  }, [decisions, generateDecision, onDecisionMade]);

  const startDecisionEngine = useCallback(() => {
    if (isActive) {
      decisionIntervalRef.current = setInterval(() => {
        makeAutonomousDecision();
      }, 18000); // Make decision every 18 seconds
    }
  }, [isActive, makeAutonomousDecision]);

  const stopDecisionEngine = useCallback(() => {
    if (decisionIntervalRef.current) {
      clearInterval(decisionIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startDecisionEngine();
    } else {
      stopDecisionEngine();
    }

    return () => stopDecisionEngine();
  }, [isActive, startDecisionEngine, stopDecisionEngine]);

  return {
    decisions,
    totalDecisions,
    makeAutonomousDecision
  };
};