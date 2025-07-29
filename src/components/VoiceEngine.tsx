import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceEngineState {
  isListening: boolean;
  isSpeaking: boolean;
  isInitialized: boolean;
  recognition: any;
  synthesis: SpeechSynthesis | null;
  currentUtterance: SpeechSynthesisUtterance | null;
}

export const useVoiceEngine = () => {
  const { toast } = useToast();
  const [voiceState, setVoiceState] = useState<VoiceEngineState>({
    isListening: false,
    isSpeaking: false,
    isInitialized: false,
    recognition: null,
    synthesis: null,
    currentUtterance: null
  });

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  // Initialize voice engine
  const initializeVoiceEngine = useCallback(() => {
    try {
      // Initialize Speech Recognition
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        const recognition = new SpeechRecognitionConstructor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'id-ID';
        recognition.maxAlternatives = 1;

        recognition.onerror = (event: any) => {
          console.log('Speech recognition error handled:', event.error);
          setVoiceState(prev => ({ ...prev, isListening: false }));
          
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            toast({
              title: "🎤 Voice Input Error",
              description: `Kesalahan input suara: ${event.error}. Mencoba lagi...`,
              duration: 3000,
            });
          }
        };

        recognition.onend = () => {
          setVoiceState(prev => ({ ...prev, isListening: false }));
        };

        recognitionRef.current = recognition;
      }

      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        synthesisRef.current = window.speechSynthesis;
      }

      setVoiceState(prev => ({
        ...prev,
        isInitialized: true,
        recognition: recognitionRef.current,
        synthesis: synthesisRef.current
      }));

      return true;
    } catch (error) {
      console.error('Voice engine initialization error:', error);
      toast({
        title: "⚠️ Voice Engine Error",
        description: "Gagal menginisialisasi voice engine. Menggunakan mode teks.",
        duration: 4000,
      });
      return false;
    }
  }, [toast]);

  // Safe speech synthesis
  const speakText = useCallback((text: string) => {
    if (!text || !synthesisRef.current || voiceState.isSpeaking || isProcessingRef.current) {
      return;
    }

    try {
      isProcessingRef.current = true;
      
      // Cancel any ongoing speech
      synthesisRef.current.cancel();
      
      // Clean text
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/♾️|∞|🎯|🧠|🚀/g, '')
        .substring(0, 300); // Limit length to prevent interruption

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: true, currentUtterance: utterance }));
      };

      utterance.onend = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
        isProcessingRef.current = false;
      };

      utterance.onerror = (event) => {
        console.log('Speech synthesis error handled:', event.error);
        setVoiceState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
        isProcessingRef.current = false;
        
        if (event.error !== 'interrupted' && event.error !== 'canceled') {
          toast({
            title: "🔊 Voice Output Error",
            description: "Kesalahan output suara. Sistem tetap berfungsi normal.",
            duration: 2000,
          });
        }
      };

      utteranceRef.current = utterance;
      synthesisRef.current.speak(utterance);

    } catch (error) {
      console.error('Speech synthesis error:', error);
      isProcessingRef.current = false;
      setVoiceState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
    }
  }, [voiceState.isSpeaking, toast]);

  // Start listening
  const startListening = useCallback((onResult: (transcript: string) => void) => {
    if (!recognitionRef.current || voiceState.isListening) {
      return false;
    }

    try {
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0]?.transcript?.trim();
        if (transcript && transcript.length > 2) {
          onResult(transcript);
        }
      };

      recognitionRef.current.start();
      setVoiceState(prev => ({ ...prev, isListening: true }));
      return true;
    } catch (error) {
      console.error('Speech recognition start error:', error);
      return false;
    }
  }, [voiceState.isListening]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && voiceState.isListening) {
      try {
        recognitionRef.current.stop();
        setVoiceState(prev => ({ ...prev, isListening: false }));
      } catch (error) {
        console.error('Speech recognition stop error:', error);
      }
    }
  }, [voiceState.isListening]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current && voiceState.isSpeaking) {
      try {
        synthesisRef.current.cancel();
        setVoiceState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
        isProcessingRef.current = false;
      } catch (error) {
        console.error('Speech synthesis stop error:', error);
      }
    }
  }, [voiceState.isSpeaking]);

  // Initialize on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeVoiceEngine();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [initializeVoiceEngine]);

  return {
    voiceState,
    speakText,
    startListening,
    stopListening,
    stopSpeaking,
    initializeVoiceEngine
  };
};

export default useVoiceEngine;
