
import { useRef, useCallback, useState } from 'react';
import { useMemoryTracker } from '@/hooks/useMemoryTracker';

interface ConversationSession {
  id: string;
  title: string;
  startTime: number;
  lastActivity: number;
  messageCount: number;
  topics: string[];
  mood: 'casual' | 'professional' | 'analytical' | 'creative';
}

interface ConversationContext {
  currentSession: ConversationSession | null;
  activeSessions: ConversationSession[];
  memoryContext: string;
  userPreferences: Record<string, any>;
}

interface AutonomousQuestion {
  id: string;
  question: string;
  context: string;
  priority: 'low' | 'medium' | 'high';
  category: 'follow_up' | 'clarification' | 'exploration' | 'strategic';
  timestamp: number;
}

export const ConversationManager = () => {
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    currentSession: null,
    activeSessions: [],
    memoryContext: '',
    userPreferences: {}
  });

  const [autonomousQuestions, setAutonomousQuestions] = useState<AutonomousQuestion[]>([]);
  const [questionGenerationEnabled, setQuestionGenerationEnabled] = useState(true);

  const sessionCounterRef = useRef(0);
  const { addMemory, getRelevantContext } = useMemoryTracker();

  const startNewSession = useCallback((topic?: string) => {
    const sessionId = `session_${Date.now()}_${++sessionCounterRef.current}`;
    
    const newSession: ConversationSession = {
      id: sessionId,
      title: topic || `Conversation ${sessionCounterRef.current}`,
      startTime: Date.now(),
      lastActivity: Date.now(),
      messageCount: 0,
      topics: topic ? [topic] : [],
      mood: 'casual'
    };

    setConversationContext(prev => ({
      ...prev,
      currentSession: newSession,
      activeSessions: [...prev.activeSessions.slice(-4), newSession] // Keep last 5 sessions
    }));

    console.log(`💬 New conversation session started: ${sessionId}`);
    return sessionId;
  }, []);

  const updateSessionActivity = useCallback((messageContent: string, isUserMessage: boolean) => {
    if (!conversationContext.currentSession) return;

    setConversationContext(prev => {
      if (!prev.currentSession) return prev;

      const updatedSession = {
        ...prev.currentSession,
        lastActivity: Date.now(),
        messageCount: prev.currentSession.messageCount + 1,
        topics: extractAndMergeTopics(prev.currentSession.topics, messageContent)
      };

      return {
        ...prev,
        currentSession: updatedSession,
        activeSessions: prev.activeSessions.map(session =>
          session.id === updatedSession.id ? updatedSession : session
        )
      };
    });

    // Generate autonomous questions based on user input
    if (isUserMessage && questionGenerationEnabled) {
      generateAutonomousQuestions(messageContent);
    }
  }, [conversationContext.currentSession, questionGenerationEnabled]);

  const extractAndMergeTopics = (existingTopics: string[], content: string): string[] => {
    const contentLower = content.toLowerCase();
    const newTopics: string[] = [];

    // Simple topic extraction
    const topicKeywords = {
      'trading': ['trading', 'investasi', 'saham', 'crypto', 'portfolio'],
      'technology': ['teknologi', 'AI', 'sistem', 'software', 'development'],
      'strategy': ['strategi', 'planning', 'rencana', 'optimasi', 'improvement'],
      'analysis': ['analisis', 'data', 'metrik', 'performance', 'evaluasi']
    };

    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => contentLower.includes(keyword))) {
        if (!existingTopics.includes(topic)) {
          newTopics.push(topic);
        }
      }
    });

    return [...existingTopics, ...newTopics].slice(0, 5); // Limit to 5 topics
  };

  const generateAutonomousQuestions = useCallback((userInput: string) => {
    const inputLower = userInput.toLowerCase();
    const questions: Omit<AutonomousQuestion, 'id' | 'timestamp'>[] = [];

    // Follow-up questions
    if (inputLower.includes('bagus') || inputLower.includes('menarik')) {
      questions.push({
        question: "Aspek mana yang paling menarik bagi Anda? Saya bisa explore lebih dalam.",
        context: 'positive_feedback',
        priority: 'medium',
        category: 'follow_up'
      });
    }

    // Clarification questions
    if (inputLower.includes('masalah') || inputLower.includes('error') || inputLower.includes('gagal')) {
      questions.push({
        question: "Bisa ceritakan lebih spesifik tentang masalahnya? Saya ingin memahami root cause-nya.",
        context: 'problem_solving',
        priority: 'high',
        category: 'clarification'
      });
    }

    // Strategic exploration
    if (inputLower.includes('rencana') || inputLower.includes('strategi') || inputLower.includes('planning')) {
      questions.push({
        question: "Apa timeline yang Anda bayangkan untuk implementasi ini? Dan resource apa yang available?",
        context: 'strategic_planning',
        priority: 'medium',
        category: 'strategic'
      });
    }

    // Learning exploration
    if (inputLower.includes('belajar') || inputLower.includes('learn') || inputLower.includes('skill')) {
      questions.push({
        question: "Approach pembelajaran apa yang biasanya paling efektif untuk Anda?",
        context: 'learning_optimization',
        priority: 'low',
        category: 'exploration'
      });
    }

    // Add generated questions
    const newQuestions: AutonomousQuestion[] = questions.map(q => ({
      ...q,
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    }));

    if (newQuestions.length > 0) {
      setAutonomousQuestions(prev => [...prev.slice(-10), ...newQuestions]); // Keep last 10 questions
      console.log(`🤔 Generated ${newQuestions.length} autonomous questions`);
    }
  }, []);

  const getContextForResponse = useCallback((userInput: string): string => {
    // Get memory context
    const memoryContext = getRelevantContext(userInput);
    
    // Get session context
    const sessionContext = conversationContext.currentSession ? 
      `Current session: ${conversationContext.currentSession.title} (${conversationContext.currentSession.messageCount} messages, topics: ${conversationContext.currentSession.topics.join(', ')})` : 
      'No active session';

    // Combine contexts
    const fullContext = `
Memory Context: ${memoryContext}
Session Context: ${sessionContext}
Recent Topics: ${conversationContext.currentSession?.topics.join(', ') || 'None'}
Conversation Mood: ${conversationContext.currentSession?.mood || 'neutral'}
    `.trim();

    return fullContext;
  }, [conversationContext, getRelevantContext]);

  const processConversationTurn = useCallback((userInput: string, mioraResponse: string) => {
    // Update session activity
    updateSessionActivity(userInput, true);
    updateSessionActivity(mioraResponse, false);

    // Store in memory with conversation context
    const context = getContextForResponse(userInput);
    addMemory(userInput, mioraResponse, `conversation_${conversationContext.currentSession?.id || 'unknown'}`);

    // Update memory context for next turn
    setConversationContext(prev => ({
      ...prev,
      memoryContext: context
    }));
  }, [updateSessionActivity, getContextForResponse, addMemory, conversationContext.currentSession]);

  const getNextAutonomousQuestion = useCallback((): AutonomousQuestion | null => {
    const sortedQuestions = autonomousQuestions
      .sort((a, b) => {
        // Sort by priority and recency
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return b.timestamp - a.timestamp;
      });

    return sortedQuestions[0] || null;
  }, [autonomousQuestions]);

  const consumeAutonomousQuestion = useCallback((questionId: string) => {
    setAutonomousQuestions(prev => prev.filter(q => q.id !== questionId));
  }, []);

  const getConversationStats = useCallback(() => {
    const currentSession = conversationContext.currentSession;
    
    return {
      activeSession: currentSession?.id || null,
      sessionCount: conversationContext.activeSessions.length,
      currentMessageCount: currentSession?.messageCount || 0,
      sessionDuration: currentSession ? Date.now() - currentSession.startTime : 0,
      pendingQuestions: autonomousQuestions.length,
      topics: currentSession?.topics || [],
      mood: currentSession?.mood || 'neutral'
    };
  }, [conversationContext, autonomousQuestions]);

  const setSesssionMood = useCallback((mood: ConversationSession['mood']) => {
    if (!conversationContext.currentSession) return;

    setConversationContext(prev => {
      if (!prev.currentSession) return prev;

      const updatedSession = { ...prev.currentSession, mood };
      
      return {
        ...prev,
        currentSession: updatedSession,
        activeSessions: prev.activeSessions.map(session =>
          session.id === updatedSession.id ? updatedSession : session
        )
      };
    });
  }, [conversationContext.currentSession]);

  const endCurrentSession = useCallback(() => {
    if (!conversationContext.currentSession) return;

    console.log(`💬 Ending session: ${conversationContext.currentSession.id}`);
    
    setConversationContext(prev => ({
      ...prev,
      currentSession: null
    }));

    // Clear autonomous questions for ended session
    setAutonomousQuestions([]);
  }, [conversationContext.currentSession]);

  return {
    conversationContext,
    autonomousQuestions,
    startNewSession,
    updateSessionActivity,
    processConversationTurn,
    getContextForResponse,
    getNextAutonomousQuestion,
    consumeAutonomousQuestion,
    getConversationStats,
    setSesssionMood,
    endCurrentSession,
    questionGenerationEnabled,
    setQuestionGenerationEnabled
  };
};

export default ConversationManager;
