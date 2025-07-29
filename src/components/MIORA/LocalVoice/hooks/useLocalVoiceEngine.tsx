
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LocalVoiceState {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  lastResponse: string;
  sessionDuration: number;
  conversationCount: number;
}

interface VoiceMetrics {
  totalSessions: number;
  totalConversations: number;
  averageSessionDuration: number;
  emotionsDetected: string[];
  personalityUsed: string[];
}

export const useLocalVoiceEngine = () => {
  const { toast } = useToast();
  const [voiceState, setVoiceState] = useState<LocalVoiceState>({
    isActive: false,
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    currentTranscript: '',
    lastResponse: '',
    sessionDuration: 0,
    conversationCount: 0
  });

  const [voiceMetrics, setVoiceMetrics] = useState<VoiceMetrics>({
    totalSessions: 0,
    totalConversations: 0,
    averageSessionDuration: 0,
    emotionsDetected: [],
    personalityUsed: []
  });

  const recognitionRef = useRef<any>(null);
  const sessionStartRef = useRef<number>(0);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'id-ID';

    return true;
  }, []);

  // Start voice system
  const startVoiceSystem = useCallback(async () => {
    if (!initializeRecognition()) {
      toast({
        title: "❌ Speech Recognition Error",
        description: "Browser tidak mendukung speech recognition",
        variant: "destructive",
      });
      return false;
    }

    try {
      setVoiceState(prev => ({ ...prev, isActive: true }));
      sessionStartRef.current = Date.now();
      
      // Start duration counter
      durationIntervalRef.current = setInterval(() => {
        setVoiceState(prev => ({
          ...prev,
          sessionDuration: Date.now() - sessionStartRef.current
        }));
      }, 1000);

      // Update metrics
      setVoiceMetrics(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1
      }));

      return true;
    } catch (error) {
      console.error('Failed to start voice system:', error);
      return false;
    }
  }, [initializeRecognition, toast]);

  // Stop voice system
  const stopVoiceSystem = useCallback(() => {
    setVoiceState(prev => ({ 
      ...prev, 
      isActive: false,
      isListening: false,
      isSpeaking: false,
      isProcessing: false
    }));

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    speechSynthesis.cancel();

    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    // Update final metrics
    const sessionDuration = Date.now() - sessionStartRef.current;
    setVoiceMetrics(prev => ({
      ...prev,
      averageSessionDuration: (prev.averageSessionDuration + sessionDuration) / 2
    }));
  }, []);

  // Speak text
  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
    if (!text) return;

    setVoiceState(prev => ({ ...prev, isSpeaking: true, lastResponse: text }));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1.0;
    utterance.volume = options?.volume || 0.8;

    utterance.onend = () => {
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    };

    speechSynthesis.speak(utterance);
  }, []);

  // Process voice input
  const processVoiceInput = useCallback((transcript: string) => {
    setVoiceState(prev => ({ 
      ...prev, 
      currentTranscript: transcript,
      conversationCount: prev.conversationCount + 1
    }));

    setVoiceMetrics(prev => ({
      ...prev,
      totalConversations: prev.totalConversations + 1
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (voiceState.isActive) {
        stopVoiceSystem();
      }
    };
  }, [voiceState.isActive, stopVoiceSystem]);

  return {
    voiceState,
    voiceMetrics,
    startVoiceSystem,
    stopVoiceSystem,
    speak,
    processVoiceInput,
    isReady: true,
    hasVoiceSupport: 'speechSynthesis' in window && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  };
};
