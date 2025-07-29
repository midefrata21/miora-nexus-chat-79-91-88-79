import React, { useState, useEffect } from 'react';
import StrategicReflection, { LearningPattern, StrategicProfile } from './StrategicReflection';

export interface UserProfile {
  communicationStyle: 'casual' | 'formal' | 'technical' | 'emotional';
  preferredTopics: string[];
  conversationHistory: Array<{
    timestamp: number;
    userMessage: string;
    tone: 'happy' | 'frustrated' | 'neutral' | 'excited' | 'confused';
    context: string;
    response: string;
  }>;
  learningPatterns: {
    responsePreferences: Record<string, number>;
    effectiveStrategies: Record<string, number>;
  };
}

export interface AdaptiveContext {
  currentTone: string;
  conversationFlow: string;
  detectedEmotion: string;
  suggestedStrategy: string;
  adaptationReason: string;
  strategicInsight: string;
  deeperQuestions: string[];
  alternativeThinking: string[];
  strategicPatternCount?: number; // Add this optional property
}

const AdaptiveEngine = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    communicationStyle: 'casual',
    preferredTopics: [],
    conversationHistory: [],
    learningPatterns: {
      responsePreferences: {},
      effectiveStrategies: {}
    }
  });

  const [adaptiveContext, setAdaptiveContext] = useState<AdaptiveContext>({
    currentTone: 'neutral',
    conversationFlow: 'introduction',
    detectedEmotion: 'neutral',
    suggestedStrategy: 'general',
    adaptationReason: '',
    strategicInsight: '',
    deeperQuestions: [],
    alternativeThinking: []
  });

  // Integrate Strategic Reflection
  const strategicReflection = StrategicReflection();
  const { strategicProfile, analyzeStrategically, learnFromResults } = strategicReflection;

  // Enhanced analysis dengan strategic thinking
  const analyzeToneAndContext = (message: string): AdaptiveContext => {
    const lowerMessage = message.toLowerCase();
    
    // Basic emotion detection
    let detectedEmotion = 'neutral';
    let currentTone = 'neutral';
    let suggestedStrategy = 'general';
    let adaptationReason = '';
    
    // Analisis emosi negatif
    if (lowerMessage.includes('frustasi') || lowerMessage.includes('bingung') || 
        lowerMessage.includes('susah') || lowerMessage.includes('gagal')) {
      detectedEmotion = 'frustrated';
      currentTone = 'supportive';
      suggestedStrategy = 'patience_and_guidance';
      adaptationReason = 'User menunjukkan tanda frustasi, beralih ke mode supportif';
    }
    
    // Analisis emosi positif
    else if (lowerMessage.includes('senang') || lowerMessage.includes('bagus') || 
             lowerMessage.includes('mantap') || lowerMessage.includes('keren')) {
      detectedEmotion = 'happy';
      currentTone = 'enthusiastic';
      suggestedStrategy = 'encourage_exploration';
      adaptationReason = 'User dalam mood positif, meningkatkan antusiasme';
    }
    
    // Analisis konteks teknikal
    else if (lowerMessage.includes('trading') || lowerMessage.includes('crypto') || 
             lowerMessage.includes('analisis') || lowerMessage.includes('strategi')) {
      detectedEmotion = 'focused';
      currentTone = 'technical';
      suggestedStrategy = 'technical_analysis';
      adaptationReason = 'Topik teknikal terdeteksi, beralih ke mode analitis';
    }
    
    // Analisis konteks santai
    else if (lowerMessage.includes('santai') || lowerMessage.includes('ngobrol') || 
             lowerMessage.includes('cerita') || lowerMessage.includes('curhat')) {
      detectedEmotion = 'relaxed';
      currentTone = 'casual';
      suggestedStrategy = 'casual_conversation';
      adaptationReason = 'User ingin percakapan santai, menyesuaikan tone';
    }

    // Strategic analysis integration
    const strategicInsight = analyzeStrategically(message, {
      detectedEmotion,
      currentTone,
      suggestedStrategy
    });

    // Enhanced adaptation berdasarkan strategic reflection
    if (strategicInsight.patternLearned) {
      adaptationReason += ` | Strategic Learning: ${strategicInsight.patternLearned.alasan}`;
    }

    return {
      currentTone,
      conversationFlow: 'active',
      detectedEmotion,
      suggestedStrategy,
      adaptationReason,
      strategicInsight: strategicInsight.strategicInsight,
      deeperQuestions: strategicInsight.deeperQuestions,
      alternativeThinking: strategicInsight.alternativeThinking
    };
  };

  // Enhanced user profile update dengan strategic learning
  const updateUserProfile = (message: string, context: AdaptiveContext) => {
    const timestamp = Date.now();
    
    setUserProfile(prev => {
      const newHistory = [...prev.conversationHistory, {
        timestamp,
        userMessage: message,
        tone: context.detectedEmotion as any,
        context: context.suggestedStrategy,
        response: ''
      }].slice(-15); // Keep more history for strategic analysis
      
      // Strategic pattern learning
      if (context.strategicInsight) {
        learnFromResults(
          `User: ${message.substring(0, 50)}`,
          context.suggestedStrategy,
          'success', // Will be updated based on user feedback
          context.strategicInsight
        );
      }

      // Update learning patterns
      const newPreferences = { ...prev.learningPatterns.responsePreferences };
      const newStrategies = { ...prev.learningPatterns.effectiveStrategies };
      
      // Increment strategy usage
      newStrategies[context.suggestedStrategy] = (newStrategies[context.suggestedStrategy] || 0) + 1;
      
      return {
        ...prev,
        conversationHistory: newHistory,
        learningPatterns: {
          responsePreferences: newPreferences,
          effectiveStrategies: newStrategies
        }
      };
    });
  };

  // Self-improvement mechanism
  const performSelfImprovement = () => {
    // Analyze recent conversation patterns
    const recentHistory = userProfile.conversationHistory.slice(-10);
    
    // Identify blind spots
    const emotionDistribution = recentHistory.reduce((acc, curr) => {
      acc[curr.tone] = (acc[curr.tone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Auto-adjust strategies based on effectiveness
    const { effectiveStrategies } = userProfile.learningPatterns;
    const leastEffective = Object.keys(effectiveStrategies)
      .sort((a, b) => effectiveStrategies[a] - effectiveStrategies[b])
      .slice(0, 2);

    // Generate self-improvement insights
    console.log('🧠 MIORA Self-Improvement:', {
      emotionTrends: emotionDistribution,
      strategiesToImprove: leastEffective,
      totalPatterns: strategicProfile.patterns.length
    });
  };

  // Auto-trigger self-improvement every 5 interactions
  useEffect(() => {
    if (userProfile.conversationHistory.length > 0 && 
        userProfile.conversationHistory.length % 5 === 0) {
      performSelfImprovement();
    }
  }, [userProfile.conversationHistory.length]);

  return {
    userProfile,
    adaptiveContext,
    strategicProfile,
    analyzeToneAndContext,
    updateUserProfile,
    setAdaptiveContext,
    performSelfImprovement,
    learnFromResults
  };
};

export default AdaptiveEngine;
