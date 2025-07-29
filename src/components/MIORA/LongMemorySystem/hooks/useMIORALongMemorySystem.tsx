
import { useState, useCallback, useRef, useEffect } from 'react';

interface ConversationEntry {
  id: string;
  timestamp: number;
  userInput: string;
  mioraResponse: string;
  context: string;
  mood: 'casual' | 'professional' | 'analytical' | 'creative' | 'supportive';
  topics: string[];
  emotionalTone: number; // -1 to 1 scale
  responseTime: number;
  effectiveness: number; // User satisfaction estimation 0-1
}

interface ConversationPattern {
  id: string;
  patternType: 'topic_preference' | 'communication_style' | 'response_timing' | 'emotional_adaptation';
  pattern: string;
  frequency: number;
  confidence: number;
  lastSeen: number;
  examples: string[];
}

interface AdaptiveBehavior {
  id: string;
  behaviorType: 'response_style' | 'topic_focus' | 'interaction_timing' | 'emotional_mirroring';
  trigger: string;
  adaptation: string;
  effectiveness: number;
  usage_count: number;
  last_used: number;
}

interface MemoryInsight {
  id: string;
  category: 'user_preference' | 'conversation_pattern' | 'behavioral_adaptation' | 'system_optimization';
  insight: string;
  confidence: number;
  timestamp: number;
  impact_score: number;
}

interface MemoryStats {
  totalConversations: number;
  recognizedPatterns: number;
  adaptiveBehaviors: number;
  databaseSize: number;
  dominantStyle?: string;
  topTopics?: string[];
  avgResponseTime: number;
  memoryEfficiency: number;
}

interface LocalMemoryDatabase {
  conversations: ConversationEntry[];
  patterns: ConversationPattern[];
  behaviors: AdaptiveBehavior[];
  insights: MemoryInsight[];
  metadata: {
    created: number;
    lastUpdated: number;
    version: string;
    totalEntries: number;
  };
}

export const useMIORALongMemorySystem = () => {
  const [memoryDatabase, setMemoryDatabase] = useState<LocalMemoryDatabase>({
    conversations: [],
    patterns: [],
    behaviors: [],
    insights: [],
    metadata: {
      created: Date.now(),
      lastUpdated: Date.now(),
      version: '1.0.0',
      totalEntries: 0
    }
  });

  const [isInitialized, setIsInitialized] = useState(false);
  const dbWorkerRef = useRef<Worker | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the memory system
  const initializeMemorySystem = useCallback(async () => {
    console.log('🧠 Initializing MIORA Long Memory System...');
    
    try {
      // Load existing memory from localStorage
      const savedMemory = localStorage.getItem('miora_long_memory');
      if (savedMemory) {
        const parsedMemory = JSON.parse(savedMemory);
        setMemoryDatabase(parsedMemory);
        console.log(`✅ Loaded ${parsedMemory.conversations.length} conversations from local storage`);
      }

      // Initialize background pattern analysis
      analysisIntervalRef.current = setInterval(() => {
        performBackgroundAnalysis();
      }, 300000); // Every 5 minutes

      setIsInitialized(true);
      console.log('✅ MIORA Long Memory System initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize memory system:', error);
    }
  }, []);

  // Auto-save memory to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('miora_long_memory', JSON.stringify(memoryDatabase));
    }
  }, [memoryDatabase, isInitialized]);

  // Store new conversation
  const storeConversation = useCallback((conversationData: {
    userInput: string;
    mioraResponse: string;
    context: string;
    mood: ConversationEntry['mood'];
    topics: string[];
  }) => {
    const newConversation: ConversationEntry = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      ...conversationData,
      emotionalTone: analyzeEmotionalTone(conversationData.userInput),
      responseTime: Date.now(), // This would be calculated in real implementation
      effectiveness: estimateResponseEffectiveness(conversationData.userInput, conversationData.mioraResponse)
    };

    setMemoryDatabase(prev => ({
      ...prev,
      conversations: [...prev.conversations.slice(-499), newConversation], // Keep last 500 conversations
      metadata: {
        ...prev.metadata,
        lastUpdated: Date.now(),
        totalEntries: prev.metadata.totalEntries + 1
      }
    }));

    // Trigger pattern analysis for new conversation
    setTimeout(() => analyzeNewConversationPatterns(newConversation), 1000);
    
    console.log('💾 Stored conversation in long memory:', newConversation.id);
  }, []);

  // Analyze emotional tone from text
  const analyzeEmotionalTone = (text: string): number => {
    const positiveWords = ['bagus', 'terima kasih', 'hebat', 'senang', 'suka', 'mantap'];
    const negativeWords = ['buruk', 'marah', 'sedih', 'kecewa', 'bingung', 'frustasi'];
    
    const textLower = text.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => {
      if (textLower.includes(word)) score += 0.2;
    });
    
    negativeWords.forEach(word => {
      if (textLower.includes(word)) score -= 0.2;
    });
    
    return Math.max(-1, Math.min(1, score));
  };

  // Estimate response effectiveness
  const estimateResponseEffectiveness = (userInput: string, mioraResponse: string): number => {
    let effectiveness = 0.5; // baseline
    
    // Length appropriateness
    const inputLength = userInput.length;
    const responseLength = mioraResponse.length;
    const lengthRatio = responseLength / Math.max(inputLength, 50);
    
    if (lengthRatio > 0.5 && lengthRatio < 3) effectiveness += 0.2;
    
    // Topic relevance (simplified)
    const userWords = userInput.toLowerCase().split(' ');
    const responseWords = mioraResponse.toLowerCase().split(' ');
    const commonWords = userWords.filter(word => responseWords.includes(word) && word.length > 3);
    effectiveness += Math.min(0.3, commonWords.length * 0.1);
    
    return Math.max(0, Math.min(1, effectiveness));
  };

  // Analyze conversation patterns
  const analyzeConversationPattern = useCallback((timeframe: 'recent' | 'all') => {
    const conversations = timeframe === 'recent' 
      ? memoryDatabase.conversations.slice(-50) 
      : memoryDatabase.conversations;
    
    const patterns: ConversationPattern[] = [];
    
    // Analyze topic preferences
    const topicFrequency: Record<string, number> = {};
    conversations.forEach(conv => {
      conv.topics.forEach(topic => {
        topicFrequency[topic] = (topicFrequency[topic] || 0) + 1;
      });
    });
    
    Object.entries(topicFrequency).forEach(([topic, frequency]) => {
      if (frequency >= 3) {
        patterns.push({
          id: `pattern_topic_${topic}`,
          patternType: 'topic_preference',
          pattern: `User frequently discusses ${topic}`,
          frequency,
          confidence: Math.min(1, frequency / conversations.length),
          lastSeen: Date.now(),
          examples: conversations
            .filter(conv => conv.topics.includes(topic))
            .slice(0, 3)
            .map(conv => conv.userInput.substring(0, 100))
        });
      }
    });
    
    // Analyze communication style
    const formalCount = conversations.filter(conv => 
      conv.userInput.includes('Anda') || conv.userInput.includes('mohon')
    ).length;
    const casualCount = conversations.filter(conv => 
      conv.userInput.includes('kamu') || conv.userInput.includes('gimana')
    ).length;
    
    if (formalCount > casualCount && formalCount >= 3) {
      patterns.push({
        id: 'pattern_formal_style',
        patternType: 'communication_style',
        pattern: 'User prefers formal communication style',
        frequency: formalCount,
        confidence: formalCount / conversations.length,
        lastSeen: Date.now(),
        examples: conversations
          .filter(conv => conv.userInput.includes('Anda'))
          .slice(0, 2)
          .map(conv => conv.userInput.substring(0, 80))
      });
    }
    
    setMemoryDatabase(prev => ({
      ...prev,
      patterns: [...prev.patterns.filter(p => !patterns.find(np => np.id === p.id)), ...patterns]
    }));
    
    console.log(`🔍 Analyzed ${patterns.length} conversation patterns`);
    return patterns;
  }, [memoryDatabase.conversations]);

  // Analyze new conversation for patterns
  const analyzeNewConversationPatterns = useCallback((conversation: ConversationEntry) => {
    // Check for immediate pattern triggers
    const adaptations: AdaptiveBehavior[] = [];
    
    // Emotional mirroring adaptation
    if (Math.abs(conversation.emotionalTone) > 0.3) {
      adaptations.push({
        id: `adapt_emotion_${Date.now()}`,
        behaviorType: 'emotional_mirroring',
        trigger: `Emotional tone: ${conversation.emotionalTone > 0 ? 'positive' : 'negative'}`,
        adaptation: conversation.emotionalTone > 0 
          ? 'Use more enthusiastic and supportive language'
          : 'Use more empathetic and careful language',
        effectiveness: 0.7,
        usage_count: 1,
        last_used: Date.now()
      });
    }
    
    // Topic focus adaptation
    if (conversation.topics.length > 0) {
      const dominantTopic = conversation.topics[0];
      adaptations.push({
        id: `adapt_topic_${dominantTopic}`,
        behaviorType: 'topic_focus',
        trigger: `Topic: ${dominantTopic}`,
        adaptation: `Provide more detailed and specific responses about ${dominantTopic}`,
        effectiveness: 0.8,
        usage_count: 1,
        last_used: Date.now()
      });
    }
    
    if (adaptations.length > 0) {
      setMemoryDatabase(prev => ({
        ...prev,
        behaviors: [...prev.behaviors.slice(-99), ...adaptations] // Keep last 100 behaviors
      }));
    }
  }, []);

  // Update adaptive behavior
  const updateAdaptiveBehavior = useCallback((behaviorId: string, effectiveness: number) => {
    setMemoryDatabase(prev => ({
      ...prev,
      behaviors: prev.behaviors.map(behavior => 
        behavior.id === behaviorId 
          ? { 
              ...behavior, 
              effectiveness: (behavior.effectiveness + effectiveness) / 2,
              usage_count: behavior.usage_count + 1,
              last_used: Date.now()
            }
          : behavior
      )
    }));
  }, []);

  // Get memory insights
  const getMemoryInsights = useCallback((): MemoryInsight[] => {
    const insights: MemoryInsight[] = [];
    
    // User preference insights
    const recentConversations = memoryDatabase.conversations.slice(-20);
    if (recentConversations.length >= 5) {
      const avgEmotionalTone = recentConversations.reduce((sum, conv) => sum + conv.emotionalTone, 0) / recentConversations.length;
      
      insights.push({
        id: `insight_emotion_${Date.now()}`,
        category: 'user_preference',
        insight: avgEmotionalTone > 0.1 
          ? 'User tends to communicate with positive emotional tone'
          : avgEmotionalTone < -0.1 
            ? 'User may need more supportive communication'
            : 'User maintains neutral emotional tone',
        confidence: Math.abs(avgEmotionalTone),
        timestamp: Date.now(),
        impact_score: 0.8
      });
    }
    
    // Pattern insights
    const topicCounts: Record<string, number> = {};
    recentConversations.forEach(conv => {
      conv.topics.forEach(topic => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    });
    
    const dominantTopic = Object.entries(topicCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['none', 0]);
    if (dominantTopic[1] >= 3) {
      insights.push({
        id: `insight_topic_${Date.now()}`,
        category: 'conversation_pattern',
        insight: `User shows strong interest in ${dominantTopic[0]} topics (${dominantTopic[1]} recent mentions)`,
        confidence: dominantTopic[1] / recentConversations.length,
        timestamp: Date.now(),
        impact_score: 0.9
      });
    }
    
    return insights.slice(0, 10); // Return top 10 insights
  }, [memoryDatabase.conversations]);

  // Background analysis
  const performBackgroundAnalysis = useCallback(() => {
    if (memoryDatabase.conversations.length < 5) return;
    
    console.log('🔄 Performing background memory analysis...');
    
    // Analyze recent patterns
    analyzeConversationPattern('recent');
    
    // Generate new insights
    const newInsights = getMemoryInsights();
    setMemoryDatabase(prev => ({
      ...prev,
      insights: [...prev.insights.slice(-20), ...newInsights]
    }));
    
    console.log('✅ Background analysis completed');
  }, [memoryDatabase.conversations.length, analyzeConversationPattern, getMemoryInsights]);

  // Export memory data
  const exportMemoryData = useCallback(() => {
    const exportData = {
      ...memoryDatabase,
      exportTimestamp: Date.now(),
      exportVersion: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miora_memory_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('📤 Memory data exported successfully');
  }, [memoryDatabase]);

  // Import memory data
  const importMemoryData = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setMemoryDatabase(importedData);
        console.log('📥 Memory data imported successfully');
      } catch (error) {
        console.error('❌ Failed to import memory data:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  // Calculate memory statistics
  const memoryStats: MemoryStats = {
    totalConversations: memoryDatabase.conversations.length,
    recognizedPatterns: memoryDatabase.patterns.length,
    adaptiveBehaviors: memoryDatabase.behaviors.length,
    databaseSize: JSON.stringify(memoryDatabase).length,
    dominantStyle: memoryDatabase.patterns.find(p => p.patternType === 'communication_style')?.pattern.includes('formal') ? 'Formal' : 'Casual',
    topTopics: Object.entries(
      memoryDatabase.conversations.reduce((acc: Record<string, number>, conv) => {
        conv.topics.forEach(topic => {
          acc[topic] = (acc[topic] || 0) + 1;
        });
        return acc;
      }, {})
    )
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic]) => topic),
    avgResponseTime: memoryDatabase.conversations.reduce((sum, conv) => sum + conv.responseTime, 0) / Math.max(memoryDatabase.conversations.length, 1),
    memoryEfficiency: memoryDatabase.conversations.length > 0 ? 0.85 : 0
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
      if (dbWorkerRef.current) {
        dbWorkerRef.current.terminate();
      }
    };
  }, []);

  return {
    memoryDatabase,
    conversationPatterns: memoryDatabase.patterns,
    adaptiveBehaviors: memoryDatabase.behaviors,
    memoryStats,
    storeConversation,
    analyzeConversationPattern,
    updateAdaptiveBehavior,
    getMemoryInsights,
    exportMemoryData,
    importMemoryData,
    isInitialized,
    initializeMemorySystem
  };
};
