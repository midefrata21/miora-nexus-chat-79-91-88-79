import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LocalLLMEngine } from '../../Conversation/engines/LocalLLMEngine';

interface ConversationState {
  isActive: boolean;
  isProcessing: boolean;
  contextBuffer: string;
  conversationHistory: ConversationMessage[];
  currentTopic: string;
  emotionalContext: 'neutral' | 'positive' | 'negative' | 'excited' | 'serious';
  responseStyle: 'formal' | 'casual' | 'technical' | 'friendly';
}

interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  confidence?: number;
  voiceInput?: boolean;
  processingTime?: number;
}

interface ConversationMetrics {
  totalInteractions: number;
  averageResponseTime: number;
  voiceInteractionRatio: number;
  topicSwitches: number;
  userSatisfactionScore: number;
}

interface VoiceProcessingConfig {
  language: 'id-ID' | 'en-US';
  voiceResponseEnabled: boolean;
  autoDetectEmotion: boolean;
  contextualResponseStyle: boolean;
  conversationMemoryLimit: number;
  realTimeProcessing: boolean;
}

export const useMIORAConversationalAI = () => {
  const { toast } = useToast();
  
  // LLM Engine Integration
  const {
    initializeLocalLLM,
    generateResponse,
    getModelStats,
    isLoaded: isLLMLoaded,
    currentModel,
    updateConfig
  } = LocalLLMEngine();

  // Conversation State
  const [conversationState, setConversationState] = useState<ConversationState>({
    isActive: false,
    isProcessing: false,
    contextBuffer: '',
    conversationHistory: [],
    currentTopic: 'general',
    emotionalContext: 'neutral',
    responseStyle: 'friendly'
  });

  // Voice Processing Configuration
  const [voiceConfig, setVoiceConfig] = useState<VoiceProcessingConfig>({
    language: 'id-ID',
    voiceResponseEnabled: true,
    autoDetectEmotion: true,
    contextualResponseStyle: true,
    conversationMemoryLimit: 50,
    realTimeProcessing: true
  });

  // Conversation Metrics
  const [metrics, setMetrics] = useState<ConversationMetrics>({
    totalInteractions: 0,
    averageResponseTime: 0,
    voiceInteractionRatio: 0,
    topicSwitches: 0,
    userSatisfactionScore: 85
  });

  // Refs for advanced processing
  const contextAnalysisRef = useRef<any>(null);
  const emotionDetectionRef = useRef<any>(null);
  const responseTimerRef = useRef<number | null>(null);
  const conversationMemoryRef = useRef<Map<string, any>>(new Map());

  // Initialize conversational AI system
  const initializeConversationalAI = useCallback(async () => {
    try {
      toast({
        title: "🧠 Initializing Conversational AI",
        description: "Starting advanced voice conversation system...",
        duration: 3000,
      });

      // Initialize LLM with conversational configuration
      const conversationalConfig = {
        temperature: 0.8,
        maxTokens: 1024,
        topP: 0.95,
        presencePenalty: 0.2,
        frequencyPenalty: 0.1,
        speedOptimization: true,
        parallelProcessing: true
      };

      await initializeLocalLLM(conversationalConfig);
      await initializeVoiceProcessing();
      await loadConversationMemory();

      setConversationState(prev => ({ ...prev, isActive: true }));

      toast({
        title: "✅ Conversational AI Ready",
        description: "MIORA siap untuk percakapan interaktif dengan voice dan text",
        duration: 4000,
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize conversational AI:', error);
      return false;
    }
  }, [initializeLocalLLM, toast]);

  const initializeVoiceProcessing = async () => {
    // Initialize advanced voice processing capabilities
    console.log('🎤 Initializing advanced voice processing...');
    
    // Setup emotion detection
    if (voiceConfig.autoDetectEmotion) {
      emotionDetectionRef.current = {
        detectEmotion: (audioData: any) => {
          // Simulate emotion detection from voice
          const emotions = ['neutral', 'positive', 'excited', 'serious', 'negative'];
          return emotions[Math.floor(Math.random() * emotions.length)];
        }
      };
    }

    // Setup context analysis
    contextAnalysisRef.current = {
      analyzeContext: (text: string) => {
        const topics = ['technology', 'business', 'personal', 'education', 'entertainment'];
        return topics[Math.floor(Math.random() * topics.length)];
      },
      detectResponseStyle: (userInput: string) => {
        const styles = ['casual', 'formal', 'technical', 'friendly'];
        return styles[Math.floor(Math.random() * styles.length)];
      }
    };
  };

  const loadConversationMemory = async () => {
    // Load previous conversation contexts from local storage
    try {
      const savedMemory = localStorage.getItem('miora_conversation_memory');
      if (savedMemory) {
        const memoryData = JSON.parse(savedMemory);
        conversationMemoryRef.current = new Map(Object.entries(memoryData));
      }
    } catch (error) {
      console.error('Failed to load conversation memory:', error);
    }
  };

  const saveConversationMemory = () => {
    try {
      const memoryObject = Object.fromEntries(conversationMemoryRef.current);
      localStorage.setItem('miora_conversation_memory', JSON.stringify(memoryObject));
    } catch (error) {
      console.error('Failed to save conversation memory:', error);
    }
  };

  // Process voice input with advanced AI
  const processVoiceInput = useCallback(async (
    transcript: string, 
    confidence: number,
    audioData?: any
  ): Promise<string> => {
    if (!conversationState.isActive || !isLLMLoaded) {
      throw new Error('Conversational AI not ready');
    }

    const startTime = Date.now();
    setConversationState(prev => ({ ...prev, isProcessing: true }));

    try {
      // Advanced voice processing
      let emotionalContext = conversationState.emotionalContext;
      let currentTopic = conversationState.currentTopic;
      let responseStyle = conversationState.responseStyle;

      // Emotion detection from voice
      if (voiceConfig.autoDetectEmotion && emotionDetectionRef.current && audioData) {
        emotionalContext = emotionDetectionRef.current.detectEmotion(audioData);
      }

      // Context and topic analysis
      if (contextAnalysisRef.current) {
        currentTopic = contextAnalysisRef.current.analyzeContext(transcript);
        responseStyle = contextAnalysisRef.current.detectResponseStyle(transcript);
      }

      // Update conversation context
      const contextualPrompt = buildContextualPrompt(
        transcript, 
        emotionalContext, 
        currentTopic, 
        responseStyle
      );

      // Generate enhanced response
      const llmResponse = await generateResponse(contextualPrompt, conversationState.contextBuffer);

      // Create conversation message
      const userMessage: ConversationMessage = {
        role: 'user',
        content: transcript,
        timestamp: Date.now(),
        confidence,
        voiceInput: true
      };

      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: llmResponse.content,
        timestamp: Date.now(),
        processingTime: llmResponse.processingTime
      };

      // Update conversation history
      const newHistory = [...conversationState.conversationHistory, userMessage, assistantMessage];
      
      // Maintain memory limit
      const trimmedHistory = newHistory.slice(-voiceConfig.conversationMemoryLimit);

      // Update state
      setConversationState(prev => ({
        ...prev,
        isProcessing: false,
        conversationHistory: trimmedHistory,
        contextBuffer: prev.contextBuffer + `\nUser: ${transcript}\nMIORA: ${llmResponse.content}`,
        currentTopic,
        emotionalContext: emotionalContext as any,
        responseStyle: responseStyle as any
      }));

      // Update metrics
      const processingTime = Date.now() - startTime;
      updateMetrics(processingTime, true);

      // Save to conversation memory
      conversationMemoryRef.current.set(`topic_${currentTopic}`, {
        lastAccess: Date.now(),
        frequency: (conversationMemoryRef.current.get(`topic_${currentTopic}`)?.frequency || 0) + 1,
        context: transcript
      });
      saveConversationMemory();

      return llmResponse.content;

    } catch (error) {
      console.error('Error processing voice input:', error);
      setConversationState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, [conversationState, isLLMLoaded, voiceConfig, generateResponse]);

  // Process text input with AI enhancement
  const processTextInput = useCallback(async (input: string): Promise<string> => {
    return processVoiceInput(input, 1.0); // Text input has 100% confidence
  }, [processVoiceInput]);

  const buildContextualPrompt = (
    input: string,
    emotion: string,
    topic: string,
    style: string
  ): string => {
    const emotionInstructions = {
      positive: "Berikan respons yang antusias dan positif",
      negative: "Berikan respons yang empatis dan supportif",
      excited: "Berikan respons yang energik dan engaging",
      serious: "Berikan respons yang thoughtful dan professional",
      neutral: "Berikan respons yang seimbang dan informatif"
    };

    const styleInstructions = {
      casual: "Gunakan bahasa yang santai dan friendly",
      formal: "Gunakan bahasa yang formal dan professional",
      technical: "Berikan penjelasan yang teknis dan detail",
      friendly: "Gunakan tone yang ramah dan personal"
    };

    return `${input}

CONTEXT:
- Emotional tone: ${emotion} (${emotionInstructions[emotion as keyof typeof emotionInstructions]})
- Topic: ${topic}
- Response style: ${style} (${styleInstructions[style as keyof typeof styleInstructions]})
- Previous conversation context available: ${conversationState.contextBuffer ? 'Yes' : 'No'}

Berikan respons yang sesuai dengan konteks emotional dan topic yang dideteksi.`;
  };

  const updateMetrics = (processingTime: number, isVoiceInput: boolean) => {
    setMetrics(prev => {
      const newTotal = prev.totalInteractions + 1;
      const newAvgTime = (prev.averageResponseTime * prev.totalInteractions + processingTime) / newTotal;
      const voiceCount = isVoiceInput ? 1 : 0;
      const newVoiceRatio = ((prev.voiceInteractionRatio * prev.totalInteractions) + voiceCount) / newTotal;

      return {
        ...prev,
        totalInteractions: newTotal,
        averageResponseTime: Math.round(newAvgTime),
        voiceInteractionRatio: Math.round(newVoiceRatio * 100)
      };
    });
  };

  // Get conversation insights
  const getConversationInsights = useCallback(() => {
    const insights = {
      dominantTopic: conversationState.currentTopic,
      emotionalTrend: conversationState.emotionalContext,
      preferredStyle: conversationState.responseStyle,
      memorySize: conversationMemoryRef.current.size,
      conversationLength: conversationState.conversationHistory.length,
      metrics
    };

    return insights;
  }, [conversationState, metrics]);

  // Update voice configuration
  const updateVoiceConfig = useCallback((newConfig: Partial<VoiceProcessingConfig>) => {
    setVoiceConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Clear conversation history
  const clearConversation = useCallback(() => {
    setConversationState(prev => ({
      ...prev,
      conversationHistory: [],
      contextBuffer: '',
      currentTopic: 'general',
      emotionalContext: 'neutral',
      responseStyle: 'friendly'
    }));
    
    conversationMemoryRef.current.clear();
    saveConversationMemory();
  }, []);

  // Auto-initialize on mount
  useEffect(() => {
    const initTimer = setTimeout(() => {
      initializeConversationalAI();
    }, 1000);

    return () => clearTimeout(initTimer);
  }, [initializeConversationalAI]);

  return {
    // Core functions
    initializeConversationalAI,
    processVoiceInput,
    processTextInput,

    // State
    conversationState,
    voiceConfig,
    metrics,
    isLLMLoaded,
    currentModel,

    // Configuration
    updateVoiceConfig,
    clearConversation,

    // Insights
    getConversationInsights,

    // Utils
    isReady: conversationState.isActive && isLLMLoaded
  };
};