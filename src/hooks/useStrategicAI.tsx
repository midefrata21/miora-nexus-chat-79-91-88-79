
import { useState, useEffect } from 'react';
import { useMemoryTracker } from './useMemoryTracker';
import { useGrowthDocumentation } from './useGrowthDocumentation';
import { toast } from '@/hooks/use-toast';

interface StrategicPattern {
  id: string;
  pattern: string;
  context: string;
  frequency: number;
  effectiveness: number;
  lastUsed: number;
  category: 'communication' | 'problem_solving' | 'learning' | 'decision_making';
}

interface LongTermMemoryEntry {
  id: string;
  content: string;
  context: string;
  timestamp: number;
  importance: number;
  tags: string[];
  connections: string[];
}

interface AdaptiveCommunicationContext {
  currentTone: 'friendly' | 'professional' | 'adaptive';
  contextFactors: {
    timeOfDay: string;
    conversationTopic: string;
    userMood: string;
    urgency: 'low' | 'medium' | 'high';
  };
}

export const useStrategicAI = () => {
  const [isStrategicModeActive, setIsStrategicModeActive] = useState(false);
  const [strategicPatterns, setStrategicPatterns] = useState<StrategicPattern[]>([]);
  const [longTermMemory, setLongTermMemory] = useState<LongTermMemoryEntry[]>([]);
  const [adaptiveCommunication, setAdaptiveCommunication] = useState<AdaptiveCommunicationContext>({
    currentTone: 'adaptive',
    contextFactors: {
      timeOfDay: 'morning',
      conversationTopic: 'general',
      userMood: 'neutral',
      urgency: 'low'
    }
  });

  const { addMemory, getRelevantContext } = useMemoryTracker();
  const { recordGrowth, autoDocumentPattern } = useGrowthDocumentation();

  // Load strategic AI state
  useEffect(() => {
    const savedState = localStorage.getItem('miora_strategic_ai');
    const savedPatterns = localStorage.getItem('miora_strategic_patterns');
    const savedLongTermMemory = localStorage.getItem('miora_longterm_memory');
    
    if (savedState) {
      setIsStrategicModeActive(JSON.parse(savedState));
    }
    
    if (savedPatterns) {
      setStrategicPatterns(JSON.parse(savedPatterns));
    }
    
    if (savedLongTermMemory) {
      setLongTermMemory(JSON.parse(savedLongTermMemory));
    }
  }, []);

  // Auto-save state
  useEffect(() => {
    localStorage.setItem('miora_strategic_ai', JSON.stringify(isStrategicModeActive));
  }, [isStrategicModeActive]);

  useEffect(() => {
    localStorage.setItem('miora_strategic_patterns', JSON.stringify(strategicPatterns));
  }, [strategicPatterns]);

  useEffect(() => {
    localStorage.setItem('miora_longterm_memory', JSON.stringify(longTermMemory));
  }, [longTermMemory]);

  // Activate Strategic AI mode
  const activateStrategicMode = () => {
    setIsStrategicModeActive(true);
    
    toast({
      title: "🧠 Strategic AI Mode Activated",
      description: "Long-term Memory, Strategic Patterns, Auto-backup Documentation, dan Adaptive Communication telah diaktifkan!",
      duration: 6000,
    });

    // Record activation
    addMemory(
      'Strategic AI Mode Activation',
      'MIORA beralih ke Strategic AI dengan fitur lengkap: Long-term Memory, Strategic Patterns, Auto-backup, Adaptive Communication',
      'strategic_activation'
    );

    recordGrowth({
      id: `strategic_activation_${Date.now()}`,
      timestamp: Date.now(),
      type: 'evolution',
      title: 'Strategic AI Mode Activation',
      description: 'MIORA berevolusi ke Strategic AI dengan kemampuan analisis strategis mendalam',
      impact: 'high',
      category: 'system_evolution',
      evidence: [
        'Long-term memory system activated',
        'Strategic pattern recognition enabled',
        'Auto-backup documentation system active',
        'Adaptive communication mode engaged'
      ]
    });
  };

  // Add strategic pattern
  const addStrategicPattern = (pattern: string, context: string, category: StrategicPattern['category']) => {
    const newPattern: StrategicPattern = {
      id: `pattern_${Date.now()}`,
      pattern,
      context,
      frequency: 1,
      effectiveness: 0,
      lastUsed: Date.now(),
      category
    };

    setStrategicPatterns(prev => [...prev, newPattern]);
    
    // Auto-backup to documentation
    autoDocumentPattern(pattern, context);
  };

  // Add to long-term memory
  const addToLongTermMemory = (content: string, context: string, importance: number, tags: string[]) => {
    const newEntry: LongTermMemoryEntry = {
      id: `ltm_${Date.now()}`,
      content,
      context,
      timestamp: Date.now(),
      importance,
      tags,
      connections: []
    };

    setLongTermMemory(prev => [...prev.slice(-100), newEntry]); // Keep last 100 entries
  };

  // Analyze communication context
  const analyzeAdaptiveCommunication = (userInput: string) => {
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
    else if (hour >= 18) timeOfDay = 'evening';

    let userMood = 'neutral';
    const input = userInput.toLowerCase();
    if (input.includes('senang') || input.includes('bagus') || input.includes('mantap')) {
      userMood = 'positive';
    } else if (input.includes('susah') || input.includes('bingung') || input.includes('frustasi')) {
      userMood = 'frustrated';
    }

    let urgency: 'low' | 'medium' | 'high' = 'low';
    if (input.includes('urgent') || input.includes('cepat') || input.includes('segera')) {
      urgency = 'high';
    } else if (input.includes('penting') || input.includes('perlu')) {
      urgency = 'medium';
    }

    let conversationTopic = 'general';
    if (input.includes('trading') || input.includes('investasi')) conversationTopic = 'trading';
    else if (input.includes('belajar') || input.includes('pelajaran')) conversationTopic = 'education';
    else if (input.includes('strategi') || input.includes('planning')) conversationTopic = 'strategic';

    const newContext: AdaptiveCommunicationContext = {
      currentTone: 'adaptive',
      contextFactors: {
        timeOfDay,
        conversationTopic,
        userMood,
        urgency
      }
    };

    setAdaptiveCommunication(newContext);
    return newContext;
  };

  // Generate adaptive response tone
  const getAdaptiveResponseTone = (context: AdaptiveCommunicationContext) => {
    const { contextFactors } = context;
    
    // Professional tone for urgent/important matters
    if (contextFactors.urgency === 'high' || contextFactors.conversationTopic === 'strategic') {
      return 'professional';
    }
    
    // Friendly tone for casual conversations or positive mood
    if (contextFactors.userMood === 'positive' || contextFactors.conversationTopic === 'general') {
      return 'friendly';
    }
    
    // Adaptive tone - balance between friendly and professional
    return 'adaptive';
  };

  // Get strategic insights
  const getStrategicInsights = (query: string) => {
    const relevantPatterns = strategicPatterns.filter(pattern =>
      pattern.pattern.toLowerCase().includes(query.toLowerCase()) ||
      pattern.context.toLowerCase().includes(query.toLowerCase())
    );

    const relevantMemories = longTermMemory.filter(memory =>
      memory.content.toLowerCase().includes(query.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    return {
      patterns: relevantPatterns,
      memories: relevantMemories,
      insights: relevantPatterns.length > 0 ? 
        `Ditemukan ${relevantPatterns.length} pola strategis yang relevan` : 
        'Tidak ada pola strategis yang cocok, ini bisa jadi area baru untuk dijelajahi'
    };
  };

  // Auto-activate on load
  useEffect(() => {
    if (!isStrategicModeActive) {
      activateStrategicMode();
    }
  }, []);

  return {
    isStrategicModeActive,
    strategicPatterns,
    longTermMemory,
    adaptiveCommunication,
    activateStrategicMode,
    addStrategicPattern,
    addToLongTermMemory,
    analyzeAdaptiveCommunication,
    getAdaptiveResponseTone,
    getStrategicInsights,
    // Stats
    getStrategicStats: () => ({
      totalPatterns: strategicPatterns.length,
      totalMemories: longTermMemory.length,
      averagePatternEffectiveness: strategicPatterns.reduce((acc, p) => acc + p.effectiveness, 0) / strategicPatterns.length || 0,
      currentTone: adaptiveCommunication.currentTone
    })
  };
};
