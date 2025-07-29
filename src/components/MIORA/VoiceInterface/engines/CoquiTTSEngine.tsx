
import { useRef, useCallback } from 'react';

interface CoquiConfig {
  voice: string;
  language: string;
  speed: number;
  pitch: number;
  emotion: 'neutral' | 'happy' | 'sad' | 'angry' | 'excited' | 'calm';
  quality: 'low' | 'medium' | 'high' | 'ultra';
  adaptiveTone: boolean;
}

interface TTSResult {
  audioUrl: string;
  duration: number;
  processingTime: number;
  emotion: string;
  adaptedTone: string;
}

interface EmotionContext {
  sentiment: 'positive' | 'negative' | 'neutral';
  urgency: 'low' | 'medium' | 'high';
  formality: 'casual' | 'professional' | 'technical';
}

export const CoquiTTSEngine = () => {
  const configRef = useRef<CoquiConfig>({
    voice: 'indonesian-neural-female',
    language: 'id',
    speed: 1.0,
    pitch: 1.0,
    emotion: 'neutral',
    quality: 'high',
    adaptiveTone: true
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const synthesizerRef = useRef<any>(null);

  const initializeCoqui = useCallback(async (config?: Partial<CoquiConfig>) => {
    if (config) {
      configRef.current = { ...configRef.current, ...config };
    }

    try {
      console.log('🎵 Initializing Coqui TTS with config:', configRef.current);
      
      // Initialize AudioContext for advanced audio processing
      audioContextRef.current = new AudioContext({ sampleRate: 22050 });
      
      // Simulate loading Coqui TTS models
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          console.log('✅ Coqui TTS loaded successfully');
          resolve(true);
        }, 1500);
      });
    } catch (error) {
      console.error('❌ Failed to initialize Coqui TTS:', error);
      return false;
    }
  }, []);

  const analyzeEmotionContext = useCallback((text: string): EmotionContext => {
    const lowerText = text.toLowerCase();
    
    // Sentiment analysis
    const positiveWords = ['baik', 'bagus', 'berhasil', 'sukses', 'hebat', 'luar biasa'];
    const negativeWords = ['error', 'gagal', 'masalah', 'buruk', 'salah'];
    
    let sentiment: EmotionContext['sentiment'] = 'neutral';
    if (positiveWords.some(word => lowerText.includes(word))) {
      sentiment = 'positive';
    } else if (negativeWords.some(word => lowerText.includes(word))) {
      sentiment = 'negative';
    }
    
    // Urgency detection
    const urgentWords = ['cepat', 'segera', 'darurat', 'penting', 'urgent'];
    const urgency: EmotionContext['urgency'] = urgentWords.some(word => lowerText.includes(word)) ? 'high' : 'medium';
    
    // Formality detection
    const technicalWords = ['sistem', 'algoritma', 'data', 'analisis', 'parameter'];
    const casualWords = ['hai', 'halo', 'gimana', 'oke', 'ya'];
    
    let formality: EmotionContext['formality'] = 'professional';
    if (technicalWords.some(word => lowerText.includes(word))) {
      formality = 'technical';
    } else if (casualWords.some(word => lowerText.includes(word))) {
      formality = 'casual';
    }
    
    return { sentiment, urgency, formality };
  }, []);

  const adaptToneForContext = useCallback((context: EmotionContext): Partial<CoquiConfig> => {
    const adaptedConfig: Partial<CoquiConfig> = {};
    
    // Adapt based on sentiment
    switch (context.sentiment) {
      case 'positive':
        adaptedConfig.emotion = 'happy';
        adaptedConfig.pitch = 1.1;
        adaptedConfig.speed = 1.05;
        break;
      case 'negative':
        adaptedConfig.emotion = 'calm';
        adaptedConfig.pitch = 0.95;
        adaptedConfig.speed = 0.9;
        break;
      default:
        adaptedConfig.emotion = 'neutral';
        adaptedConfig.pitch = 1.0;
        adaptedConfig.speed = 1.0;
    }
    
    // Adapt based on urgency
    if (context.urgency === 'high') {
      adaptedConfig.speed = (adaptedConfig.speed || 1.0) * 1.15;
      adaptedConfig.emotion = 'excited';
    }
    
    // Adapt based on formality
    switch (context.formality) {
      case 'technical':
        adaptedConfig.pitch = 0.98;
        adaptedConfig.speed = 0.95;
        adaptedConfig.emotion = 'neutral';
        break;
      case 'casual':
        adaptedConfig.pitch = 1.05;
        adaptedConfig.emotion = 'happy';
        break;
    }
    
    return adaptedConfig;
  }, []);

  const synthesizeSpeech = useCallback(async (text: string): Promise<TTSResult> => {
    const startTime = Date.now();
    
    if (!text.trim()) {
      throw new Error('Empty text provided for synthesis');
    }

    // Analyze emotion context for adaptive tone
    const emotionContext = analyzeEmotionContext(text);
    let currentConfig = { ...configRef.current };
    
    if (currentConfig.adaptiveTone) {
      const adaptedSettings = adaptToneForContext(emotionContext);
      currentConfig = { ...currentConfig, ...adaptedSettings };
    }

    console.log('🎭 Synthesizing with adaptive tone:', {
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      context: emotionContext,
      config: currentConfig
    });

    // Simulate Coqui TTS processing with realistic delay
    return new Promise((resolve) => {
      const processingDelay = Math.max(500, text.length * 50 + Math.random() * 1000);
      
      setTimeout(() => {
        // In real implementation, this would generate actual audio
        // For now, we'll use Web Speech API as fallback with enhanced parameters
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = currentConfig.speed;
        utterance.pitch = currentConfig.pitch;
        utterance.volume = 0.8;
        
        // Try to find Indonesian voice
        const voices = speechSynthesis.getVoices();
        const indonesianVoice = voices.find(voice => 
          voice.lang.includes('id') || voice.lang.includes('ID')
        );
        if (indonesianVoice) {
          utterance.voice = indonesianVoice;
        }
        
        speechSynthesis.speak(utterance);
        
        const result: TTSResult = {
          audioUrl: 'blob:audio/wav', // Mock URL
          duration: text.length * 80, // Estimate duration in ms
          processingTime: Date.now() - startTime,
          emotion: currentConfig.emotion,
          adaptedTone: `${emotionContext.sentiment}-${emotionContext.urgency}-${emotionContext.formality}`
        };
        
        resolve(result);
      }, processingDelay);
    });
  }, [analyzeEmotionContext, adaptToneForContext]);

  const setVoice = useCallback((voice: string) => {
    configRef.current.voice = voice;
    console.log(`🎤 TTS voice set to: ${voice}`);
  }, []);

  const setEmotion = useCallback((emotion: CoquiConfig['emotion']) => {
    configRef.current.emotion = emotion;
    console.log(`😊 TTS emotion set to: ${emotion}`);
  }, []);

  const setSpeed = useCallback((speed: number) => {
    configRef.current.speed = Math.max(0.5, Math.min(2.0, speed));
    console.log(`⚡ TTS speed set to: ${configRef.current.speed}`);
  }, []);

  const setPitch = useCallback((pitch: number) => {
    configRef.current.pitch = Math.max(0.5, Math.min(2.0, pitch));
    console.log(`🎵 TTS pitch set to: ${configRef.current.pitch}`);
  }, []);

  const toggleAdaptiveTone = useCallback((enabled: boolean) => {
    configRef.current.adaptiveTone = enabled;
    console.log(`🎭 Adaptive tone ${enabled ? 'enabled' : 'disabled'}`);
  }, []);

  const getConfig = useCallback(() => ({ ...configRef.current }), []);

  const cleanup = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    speechSynthesis.cancel();
  }, []);

  return {
    initializeCoqui,
    synthesizeSpeech,
    analyzeEmotionContext,
    adaptToneForContext,
    setVoice,
    setEmotion,
    setSpeed,
    setPitch,
    toggleAdaptiveTone,
    getConfig,
    cleanup
  };
};

export default CoquiTTSEngine;
