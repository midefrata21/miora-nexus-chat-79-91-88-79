
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceEngineState {
  isInitialized: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  voiceEnabled: boolean;
  currentTranscript: string;
  lastResponse: string;
  conversationHistory: Array<{
    timestamp: number;
    userInput: string;
    mioraResponse: string;
    emotion: string;
    type: 'user' | 'assistant';
    text: string;
  }>;
}

interface VoiceSettings {
  language: string;
  rate: number;
  pitch: number;
  volume: number;
}

interface VoiceEngineMetrics {
  recognitionAccuracy: number;
  responseLatency: number;
  totalInteractions: number;
  successfulInteractions: number;
  voiceQuality: string;
  interactionMode: string;
}

export const useMioraVoiceEngine = () => {
  const { toast } = useToast();
  const [voiceState, setVoiceState] = useState<VoiceEngineState>({
    isInitialized: false,
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    voiceEnabled: true,
    currentTranscript: '',
    lastResponse: '',
    conversationHistory: []
  });

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    language: 'id-ID',
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [metrics, setMetrics] = useState<VoiceEngineMetrics>({
    recognitionAccuracy: 0,
    responseLatency: 0,
    totalInteractions: 0,
    successfulInteractions: 0,
    voiceQuality: 'Neural Enhanced',
    interactionMode: 'Interactive'
  });

  const [isInteractiveMode, setIsInteractiveMode] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize voice engines
  const initializeVoiceEngine = useCallback(async () => {
    try {
      // Initialize Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = voiceSettings.language;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0]?.transcript?.trim();
          if (transcript) {
            const confidence = event.results[0]?.confidence || 0.8;
            handleSpeechResult(transcript, confidence);
          }
        };

        recognition.onerror = (event: any) => {
          console.log('Speech recognition error handled:', event.error);
          setVoiceState(prev => ({ ...prev, isListening: false, isProcessing: false }));
        };

        recognition.onend = () => {
          setVoiceState(prev => ({ ...prev, isListening: false }));
        };

        recognitionRef.current = recognition;
      }

      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        synthesisRef.current = window.speechSynthesis;
        
        // Load available voices
        const loadVoices = () => {
          const voices = speechSynthesis.getVoices();
          setAvailableVoices(voices);
          
          // Select Indonesian voice if available
          const indonesianVoice = voices.find(voice => 
            voice.lang.includes('id') || voice.name.toLowerCase().includes('indonesia')
          );
          
          if (indonesianVoice) {
            setSelectedVoice(indonesianVoice);
          }
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
      }

      setVoiceState(prev => ({ ...prev, isInitialized: true }));

      toast({
        title: "🎤 Voice Engine Ready",
        description: "MIORA voice interface telah diinisialisasi",
        duration: 3000,
      });

      return true;
    } catch (error) {
      console.error('Voice engine initialization failed:', error);
      toast({
        title: "❌ Voice Engine Error",
        description: "Gagal menginisialisasi voice engine",
        variant: "destructive",
      });
      return false;
    }
  }, [voiceSettings.language, toast]);

  const handleSpeechResult = useCallback((transcript: string, confidence: number) => {
    const responseTime = Date.now() - startTimeRef.current;
    
    setVoiceState(prev => ({
      ...prev,
      currentTranscript: transcript,
      isListening: false,
      isProcessing: true
    }));

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalInteractions: prev.totalInteractions + 1,
      recognitionAccuracy: ((prev.recognitionAccuracy * (prev.totalInteractions - 1)) + confidence) / prev.totalInteractions,
      responseLatency: ((prev.responseLatency * (prev.totalInteractions - 1)) + responseTime) / prev.totalInteractions
    }));

    // Process the transcript (simulate AI response generation)
    setTimeout(() => {
      const response = generateMioraResponse(transcript);
      
      setVoiceState(prev => {
        const userMessage = {
          timestamp: Date.now(),
          userInput: transcript,
          mioraResponse: '',
          emotion: detectEmotion(transcript),
          type: 'user' as const,
          text: transcript
        };

        const assistantMessage = {
          timestamp: Date.now() + 1,
          userInput: '',
          mioraResponse: response,
          emotion: 'neutral',
          type: 'assistant' as const,
          text: response
        };

        const newHistory = [...prev.conversationHistory, userMessage, assistantMessage];

        return {
          ...prev,
          lastResponse: response,
          isProcessing: false,
          conversationHistory: newHistory
        };
      });

      // Speak the response if voice is enabled
      if (voiceState.voiceEnabled) {
        speak(response);
      }

      setMetrics(prev => ({
        ...prev,
        successfulInteractions: prev.successfulInteractions + 1
      }));
    }, 800 + Math.random() * 700);
  }, [voiceState.voiceEnabled]);

  const detectEmotion = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('senang') || lowerText.includes('bahagia') || lowerText.includes('bagus')) {
      return 'happy';
    } else if (lowerText.includes('sedih') || lowerText.includes('kecewa') || lowerText.includes('buruk')) {
      return 'sad';
    } else if (lowerText.includes('penting') || lowerText.includes('serius') || lowerText.includes('urgent')) {
      return 'serious';
    }
    
    return 'neutral';
  };

  const generateMioraResponse = (input: string): string => {
    const responses = {
      greeting: [
        "Halo, senang mendengar suara Anda. Ada yang bisa saya bantu?",
        "Selamat datang! Saya MIORA dan siap membantu Anda.",
        "Halo, saya mendengarkan dengan penuh perhatian."
      ],
      question: [
        "Itu pertanyaan yang menarik. Mari saya pikirkan...",
        "Saya memahami pertanyaan Anda. Berikut yang bisa saya sampaikan...",
        "Berdasarkan pemahaman saya, saya akan mencoba menjawab..."
      ],
      default: [
        "Terima kasih sudah berbagi. Bisakah Anda jelaskan lebih detail?",
        "Saya memahami. Ada aspek lain yang ingin dibahas?",
        "Menarik sekali. Bagaimana perasaan Anda tentang ini?"
      ]
    };

    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('halo') || lowerInput.includes('hai')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (lowerInput.includes('?') || lowerInput.includes('apa') || lowerInput.includes('bagaimana')) {
      return responses.question[Math.floor(Math.random() * responses.question.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const startListening = useCallback((onResult?: (transcript: string) => void) => {
    if (!recognitionRef.current || voiceState.isListening || !voiceState.isInitialized) {
      return false;
    }

    try {
      startTimeRef.current = Date.now();
      
      if (onResult) {
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0]?.transcript?.trim();
          if (transcript) {
            onResult(transcript);
          }
        };
      }

      recognitionRef.current.start();
      setVoiceState(prev => ({ ...prev, isListening: true }));
      
      return true;
    } catch (error) {
      console.error('Failed to start listening:', error);
      return false;
    }
  }, [voiceState.isListening, voiceState.isInitialized]);

  const startInteractiveListening = useCallback(async (onResponse?: (input: string) => Promise<string>) => {
    setIsInteractiveMode(true);
    
    const handleInteractiveResult = async (transcript: string) => {
      if (onResponse) {
        try {
          const response = await onResponse(transcript);
          
          // Add to conversation history
          const userMessage = {
            timestamp: Date.now(),
            userInput: transcript,
            mioraResponse: '',
            emotion: detectEmotion(transcript),
            type: 'user' as const,
            text: transcript
          };

          const assistantMessage = {
            timestamp: Date.now() + 1,
            userInput: '',
            mioraResponse: response,
            emotion: 'neutral',
            type: 'assistant' as const,
            text: response
          };

          setVoiceState(prev => ({
            ...prev,
            conversationHistory: [...prev.conversationHistory, userMessage, assistantMessage],
            lastResponse: response
          }));

          if (voiceState.voiceEnabled) {
            speak(response);
          }
        } catch (error) {
          console.error('Error processing interactive response:', error);
        }
      }
    };

    return startListening(handleInteractiveResult);
  }, [voiceState.voiceEnabled, startListening, detectEmotion]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && voiceState.isListening) {
      try {
        recognitionRef.current.stop();
        setVoiceState(prev => ({ ...prev, isListening: false }));
      } catch (error) {
        console.error('Failed to stop listening:', error);
      }
    }
  }, [voiceState.isListening]);

  const stopInteractiveListening = useCallback(() => {
    setIsInteractiveMode(false);
    stopListening();
  }, [stopListening]);

  const speak = useCallback((text: string) => {
    if (!synthesisRef.current || !text.trim() || voiceState.isSpeaking) {
      return;
    }

    try {
      // Cancel any ongoing speech
      synthesisRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceSettings.language;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: true }));
      };

      utterance.onend = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        currentUtteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        console.log('Speech synthesis error handled:', event.error);
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        currentUtteranceRef.current = null;
      };

      currentUtteranceRef.current = utterance;
      synthesisRef.current.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, [voiceState.isSpeaking, voiceSettings, selectedVoice]);

  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      currentUtteranceRef.current = null;
    }
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceState(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
  }, []);

  const toggleInteractiveMode = useCallback(() => {
    setIsInteractiveMode(prev => !prev);
  }, []);

  const clearConversationHistory = useCallback(() => {
    setVoiceState(prev => ({ ...prev, conversationHistory: [] }));
  }, []);

  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const selectVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
  }, []);

  const getEngineStatus = useCallback(() => {
    return {
      isReady: voiceState.isInitialized,
      isListening: voiceState.isListening,
      isSpeaking: voiceState.isSpeaking,
      isProcessing: voiceState.isProcessing,
      voiceEnabled: voiceState.voiceEnabled,
      totalInteractions: metrics.totalInteractions,
      accuracy: metrics.recognitionAccuracy,
      latency: metrics.responseLatency
    };
  }, [voiceState, metrics]);

  const getVoiceMetrics = useCallback((): VoiceEngineMetrics => {
    return { ...metrics };
  }, [metrics]);

  // Initialize on mount
  useEffect(() => {
    const initTimer = setTimeout(() => {
      initializeVoiceEngine();
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [initializeVoiceEngine]);

  const hasVoiceSupport = !!(window.SpeechRecognition || window.webkitSpeechRecognition) && 'speechSynthesis' in window;
  const isReady = voiceState.isInitialized && hasVoiceSupport;

  return {
    // State
    isInitialized: voiceState.isInitialized,
    isListening: voiceState.isListening,
    isSpeaking: voiceState.isSpeaking,
    isProcessing: voiceState.isProcessing,
    voiceEnabled: voiceState.voiceEnabled,
    currentTranscript: voiceState.currentTranscript,
    lastResponse: voiceState.lastResponse,
    conversationHistory: voiceState.conversationHistory,
    availableVoices,
    selectedVoice,
    voiceSettings,
    metrics,
    isInteractiveMode,
    
    // Actions
    startListening,
    stopListening,
    startInteractiveListening,
    stopInteractiveListening,
    speak,
    stopSpeaking,
    toggleVoice,
    toggleInteractiveMode,
    clearConversationHistory,
    updateVoiceSettings,
    selectVoice,
    initializeVoiceEngine,
    getEngineStatus,
    getVoiceMetrics,
    
    // Computed
    isReady,
    hasVoiceSupport
  };
};
