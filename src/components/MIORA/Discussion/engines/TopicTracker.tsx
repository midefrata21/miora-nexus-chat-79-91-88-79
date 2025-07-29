
import { useState, useCallback } from 'react';

interface TopicHistory {
  topic: string;
  timestamp: number;
  userInput: string;
  mioraResponse: string;
  depth: number; // How deep into this topic we are
}

interface ConversationState {
  currentTopic: string;
  topicHistory: TopicHistory[];
  topicDepth: number;
  lastTransition: number;
}

export const useTopicTracker = () => {
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentTopic: 'general',
    topicHistory: [],
    topicDepth: 0,
    lastTransition: Date.now()
  });

  const trackTopic = useCallback((topic: string, userInput: string, mioraResponse: string) => {
    setConversationState(prev => {
      const isTopicChange = prev.currentTopic !== topic;
      const newDepth = isTopicChange ? 1 : prev.topicDepth + 1;

      const newHistory: TopicHistory = {
        topic,
        timestamp: Date.now(),
        userInput,
        mioraResponse,
        depth: newDepth
      };

      return {
        currentTopic: topic,
        topicHistory: [...prev.topicHistory.slice(-10), newHistory], // Keep last 10 interactions
        topicDepth: newDepth,
        lastTransition: isTopicChange ? Date.now() : prev.lastTransition
      };
    });
  }, []);

  const getTopicContext = useCallback((currentTopic: string): string => {
    const relatedHistory = conversationState.topicHistory
      .filter(h => h.topic === currentTopic)
      .slice(-3); // Last 3 interactions on this topic

    if (relatedHistory.length === 0) return '';

    return `Previous discussion on ${currentTopic}: ${relatedHistory
      .map(h => `User: ${h.userInput} | MIORA: ${h.mioraResponse}`)
      .join(' || ')}`;
  }, [conversationState]);

  const shouldTransitionSmoothly = useCallback((newTopic: string): boolean => {
    const timeSinceLastTransition = Date.now() - conversationState.lastTransition;
    const hasRecentContext = conversationState.topicHistory.length > 0;
    
    return timeSinceLastTransition > 30000 || // 30 seconds since last transition
           conversationState.currentTopic === newTopic ||
           !hasRecentContext;
  }, [conversationState]);

  const generateTopicTransition = useCallback((fromTopic: string, toTopic: string): string => {
    const transitions = {
      business_to_technology: "Bicara soal bisnis, teknologi juga penting banget untuk growth. Soal teknologi yang kamu maksud...",
      technology_to_business: "Teknologi memang powerful, tapi implementasi bisnisnya gimana ya? Kalau dari sisi bisnis...",
      general_to_learning: "Menarik yang kamu bilang. Kalau mau explore lebih dalam, kita bisa belajar tentang...",
      learning_to_personal: "Belajar itu personal journey ya. Bicara soal personal development..."
    };

    const transitionKey = `${fromTopic}_to_${toTopic}` as keyof typeof transitions;
    return transitions[transitionKey] || `Oke, sekarang kita beralih ke ${toTopic}. `;
  }, []);

  return {
    conversationState,
    trackTopic,
    getTopicContext,
    shouldTransitionSmoothly,
    generateTopicTransition
  };
};
