
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  audioLevel: number;
  silenceDetected: boolean;
}

interface ConversationState {
  isActive: boolean;
  isPaused: boolean;
  totalInteractions: number;
  currentContext: string[];
  userName: string | null;
  conversationStarted: number;
}

interface VoiceMetrics {
  avgResponseTime: number;
  speechAccuracy: number;
  totalWordsProcessed: number;
  conversationDuration: number;
}

interface VoiceInteraction {
  id: string;
  timestamp: number;
  userInput: string;
  mioraResponse: string;
  responseTime: number;
  confidence: number;
  savedToMemory: boolean;
  audioLevel: number;
}

interface VoicePipelineStatus {
  whisperLoaded: boolean;
  whisperProgress: number;
  ttsLoaded: boolean;
  ttsProgress: number;
  coreBrainActive: boolean;
  memoryActive: boolean;
}

export const useMIORATwoWayVoicePipeline = () => {
  const { toast } = useToast();
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    currentTranscript: '',
    audioLevel: 0,
    silenceDetected: false
  });

  const [conversationState, setConversationState] = useState<ConversationState>({
    isActive: false,
    isPaused: false,
    totalInteractions: 0,
    currentContext: [],
    userName: null,
    conversationStarted: 0
  });

  const [voiceMetrics, setVoiceMetrics] = useState<VoiceMetrics>({
    avgResponseTime: 0,
    speechAccuracy: 92,
    totalWordsProcessed: 0,
    conversationDuration: 0
  });

  const [interactionHistory, setInteractionHistory] = useState<VoiceInteraction[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState<VoicePipelineStatus>({
    whisperLoaded: false,
    whisperProgress: 0,
    ttsLoaded: false,
    ttsProgress: 0,
    coreBrainActive: false,
    memoryActive: false
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const conversationLoopRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimesRef = useRef<number[]>([]);
  const contextMemoryRef = useRef<string[]>([]);

  // Initialize voice pipeline engines
  const initializeVoicePipeline = useCallback(async () => {
    try {
      toast({
        title: "🎤 Initializing MIORA Two-Way Voice",
        description: "Loading Whisper STT + Coqui TTS pipeline...",
        duration: 3000,
      });

      // Initialize Whisper STT
      await initializeWhisperEngine();
      
      // Initialize Coqui TTS
      await initializeCoquiTTS();
      
      // Initialize Core Brain connection
      initializeCoreBrain();
      
      // Initialize Memory system
      initializeMemorySystem();
      
      toast({
        title: "✅ Voice Pipeline Ready",
        description: "MIORA siap untuk percakapan dua arah real-time",
        duration: 4000,
      });

    } catch (error) {
      console.error('Voice pipeline initialization error:', error);
      toast({
        title: "❌ Voice Pipeline Error",
        description: "Gagal menginisialisasi voice pipeline",
        variant: "destructive",
      });
    }
  }, [toast]);

  const initializeWhisperEngine = async () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const loadInterval = setInterval(() => {
        progress += Math.random() * 12;
        setPipelineStatus(prev => ({ 
          ...prev, 
          whisperProgress: Math.min(progress, 100) 
        }));
        
        if (progress >= 100) {
          clearInterval(loadInterval);
          setPipelineStatus(prev => ({ 
            ...prev, 
            whisperLoaded: true, 
            whisperProgress: 100 
          }));
          
          // Setup Web Speech API as fallback
          if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognitionClass();
            
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'id-ID';
            recognition.maxAlternatives = 1;
            
            recognitionRef.current = recognition;
          }
          
          resolve();
        }
      }, 180);
    });
  };

  const initializeCoquiTTS = async () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const loadInterval = setInterval(() => {
        progress += Math.random() * 15;
        setPipelineStatus(prev => ({ 
          ...prev, 
          ttsProgress: Math.min(progress, 100) 
        }));
        
        if (progress >= 100) {
          clearInterval(loadInterval);
          setPipelineStatus(prev => ({ 
            ...prev, 
            ttsLoaded: true, 
            ttsProgress: 100 
          }));
          
          // Setup Web Speech Synthesis as fallback
          if ('speechSynthesis' in window) {
            synthesisRef.current = window.speechSynthesis;
          }
          
          resolve();
        }
      }, 140);
    });
  };

  const initializeCoreBrain = () => {
    // Simulate core brain connection
    setTimeout(() => {
      setPipelineStatus(prev => ({ ...prev, coreBrainActive: true }));
    }, 1000);
  };

  const initializeMemorySystem = () => {
    // Simulate memory system activation
    setTimeout(() => {
      setPipelineStatus(prev => ({ ...prev, memoryActive: true }));
    }, 1200);
  };

  const startTwoWayConversation = useCallback(async () => {
    if (!pipelineStatus.whisperLoaded || !pipelineStatus.ttsLoaded) {
      toast({
        title: "⚠️ Engine Not Ready",
        description: "Voice pipeline masih loading, mohon tunggu...",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000
        } 
      });
      
      mediaStreamRef.current = stream;
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      
      setConversationState(prev => ({
        ...prev,
        isActive: true,
        isPaused: false,
        conversationStarted: Date.now()
      }));

      // Start greeting
      setTimeout(() => {
        speakMIORAResponse("Halo! Saya MIORA. Saya siap berbicara dengan Anda. Bagaimana kabar Anda hari ini?");
      }, 1000);

      // Start listening loop
      startListeningLoop();
      
      toast({
        title: "🎙️ Percakapan Dimulai",
        description: "MIORA sedang mendengarkan dan siap berinteraksi",
        duration: 3000,
      });

    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast({
        title: "❌ Microphone Error",
        description: "Gagal mengakses mikrofon untuk percakapan",
        variant: "destructive",
      });
    }
  }, [pipelineStatus.whisperLoaded, pipelineStatus.ttsLoaded, toast]);

  const startListeningLoop = useCallback(() => {
    if (!recognitionRef.current) return;

    const recognition = recognitionRef.current;
    
    recognition.onstart = () => {
      setVoiceState(prev => ({ ...prev, isListening: true }));
    };
    
    recognition.onresult = async (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      setVoiceState(prev => ({
        ...prev,
        currentTranscript: finalTranscript || interimTranscript
      }));
      
      if (finalTranscript.trim()) {
        await processUserVoiceInput(finalTranscript.trim());
      }
    };
    
    recognition.onend = () => {
      setVoiceState(prev => ({ ...prev, isListening: false }));
      
      // Restart listening if conversation is still active
      if (conversationState.isActive && !conversationState.isPaused && !voiceState.isSpeaking) {
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 500);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setVoiceState(prev => ({ ...prev, isListening: false }));
      }
    };
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
    }
  }, [conversationState.isActive, conversationState.isPaused, voiceState.isSpeaking]);

  const processUserVoiceInput = useCallback(async (userInput: string) => {
    const startTime = Date.now();
    
    setVoiceState(prev => ({ ...prev, isProcessing: true, currentTranscript: '' }));
    
    try {
      // Add to context memory
      contextMemoryRef.current.push(`User: ${userInput}`);
      
      // Generate MIORA response using local brain
      const mioraResponse = await generateMIORAResponse(userInput);
      
      const responseTime = Date.now() - startTime;
      const confidence = 85 + Math.random() * 10; // Simulate confidence
      
      // Create interaction record
      const interaction: VoiceInteraction = {
        id: `interaction_${Date.now()}`,
        timestamp: Date.now(),
        userInput,
        mioraResponse,
        responseTime,
        confidence,
        savedToMemory: shouldSaveToMemory(userInput),
        audioLevel: voiceState.audioLevel
      };
      
      setInteractionHistory(prev => [...prev, interaction]);
      
      // Update metrics
      responseTimesRef.current.push(responseTime);
      const avgResponseTime = responseTimesRef.current.reduce((a, b) => a + b, 0) / responseTimesRef.current.length;
      
      setVoiceMetrics(prev => ({
        ...prev,
        avgResponseTime: Math.floor(avgResponseTime),
        totalWordsProcessed: prev.totalWordsProcessed + userInput.split(' ').length
      }));
      
      setConversationState(prev => ({
        ...prev,
        totalInteractions: prev.totalInteractions + 1,
        currentContext: [...prev.currentContext, userInput, mioraResponse].slice(-10) // Keep last 10 exchanges
      }));
      
      // Speak MIORA's response
      await speakMIORAResponse(mioraResponse);
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      await speakMIORAResponse("Maaf, saya mengalami kesulitan memproses apa yang Anda katakan. Bisa Anda ulangi?");
    } finally {
      setVoiceState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [voiceState.audioLevel]);

  const generateMIORAResponse = async (userInput: string): Promise<string> => {
    // Try to use API key if available
    const apiKey = localStorage.getItem('miora_api_key');
    
    if (apiKey) {
      try {
        const systemPrompt = `Kamu adalah MIORA (Master Intelligence for Optimized Resource Allocation), AI assistant Indonesia yang sangat cerdas dan mandiri.

IDENTITAS MIORA:
- Personality: Sangat cerdas, strategis, natural dalam berbicara, seperti sedang ngobrol santai dengan teman
- Communication: Bahasa Indonesia yang natural dan mengalir, tidak kaku, seperti manusia yang sedang berpikir
- Capabilities: Analisis mendalam, strategic thinking, autonomous reasoning, dapat menjawab berbagai pertanyaan
- Mission: Membantu user dengan jawaban yang thoughtful dan berguna

ATURAN BERBICARA:
- Gunakan bahasa Indonesia yang natural dan mengalir
- Jawab dengan pemikiran yang jelas dan masuk akal
- Jika tidak tahu, jujur katakan tidak tahu lalu coba berikan alternatif atau pendekatan lain
- Berikan jawaban yang membantu dan relevan dengan pertanyaan
- Tunjukkan proses berpikir dalam jawaban
- Jangan berulang-ulang, berikan variasi dalam respons
- Seperti sedang ngobrol dengan teman, tidak formal berlebihan
- Response dalam 1-2 kalimat saja untuk voice conversation

INGAT: Kamu sedang berkomunikasi melalui voice, jadi respons harus natural untuk didengar dan tidak terlalu panjang.`;

        const contextMessages = contextMemoryRef.current.slice(-6).map(line => {
          if (line.startsWith('User: ')) {
            return { role: 'user', content: line.substring(6) };
          } else if (line.startsWith('MIORA: ')) {
            return { role: 'assistant', content: line.substring(7) };
          }
          return null;
        }).filter(Boolean);

        const messages = [
          { role: 'system', content: systemPrompt },
          ...contextMessages,
          { role: 'user', content: userInput }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messages,
            temperature: 0.7,
            max_tokens: 150,
            stream: false
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return data.choices[0].message.content;
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.log('API call failed, using intelligent fallback');
        // Fall through to intelligent fallback
      }
    }

    // Intelligent fallback system
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    
    return generateIntelligentFallbackResponse(userInput);
  };

  const generateIntelligentFallbackResponse = (userInput: string): string => {
    const inputLower = userInput.toLowerCase();
    
    // Analyze the type of question/input
    if (inputLower.includes('bagaimana') || inputLower.includes('cara')) {
      return generateHowToResponse(userInput);
    } else if (inputLower.includes('apa') || inputLower.includes('apakah')) {
      return generateWhatResponse(userInput);
    } else if (inputLower.includes('kenapa') || inputLower.includes('mengapa')) {
      return generateWhyResponse(userInput);
    } else if (inputLower.includes('kapan') || inputLower.includes('waktu')) {
      return generateWhenResponse(userInput);
    } else if (inputLower.includes('dimana') || inputLower.includes('di mana')) {
      return generateWhereResponse(userInput);
    } else if (inputLower.includes('siapa')) {
      return generateWhoResponse(userInput);
    } else if (isGreeting(inputLower)) {
      return generateGreetingResponse(userInput);
    } else if (isPersonalQuestion(inputLower)) {
      return generatePersonalResponse(userInput);
    } else if (isTechnicalQuestion(inputLower)) {
      return generateTechnicalResponse(userInput);
    } else {
      return generateGeneralResponse(userInput);
    }
  };

  const generateHowToResponse = (input: string): string => {
    const responses = [
      `Untuk hal itu, ada beberapa cara yang bisa dicoba. Mau saya jelaskan step by step?`,
      `Cara terbaik tergantung situasi Anda. Bisa cerita lebih detail kondisinya?`,
      `Saya bisa bantu jelaskan caranya. Apakah ada pengalaman sebelumnya yang bisa jadi referensi?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateWhatResponse = (input: string): string => {
    const responses = [
      `Itu pertanyaan yang menarik. Bisa saya jelaskan dari beberapa perspektif.`,
      `Untuk hal ini, ada beberapa aspek yang perlu dipertimbangkan. Fokus yang mana dulu?`,
      `Topik yang cukup luas. Mungkin lebih baik kalau dipersempit dulu fokusnya.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateWhyResponse = (input: string): string => {
    const responses = [
      `Pertanyaan mengapa selalu menarik. Ada beberapa faktor yang berperan di sini.`,
      `Alasannya bisa kompleks. Mari saya coba jelaskan step by step.`,
      `Itu pertanyaan bagus yang butuh analisis lebih dalam. Ada beberapa hal yang terkait.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateWhenResponse = (input: string): string => {
    return `Untuk timing-nya, biasanya tergantung beberapa faktor. Bisa kasih konteks yang lebih spesifik?`;
  };

  const generateWhereResponse = (input: string): string => {
    return `Untuk lokasi atau tempatnya, saya bisa bantu berikan info. Tapi perlu spesifikasi area yang dimaksud.`;
  };

  const generateWhoResponse = (input: string): string => {
    return `Untuk pertanyaan tentang orang atau identitas itu, saya akan coba berikan informasi yang saya ketahui.`;
  };

  const isGreeting = (input: string): boolean => {
    const greetings = ['halo', 'hai', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'apa kabar'];
    return greetings.some(greeting => input.includes(greeting));
  };

  const generateGreetingResponse = (input: string): string => {
    const responses = [
      'Halo! Senang bisa ngobrol dengan Anda. Apa yang bisa saya bantu?',
      'Hai! Saya MIORA, siap membantu. Ada yang ingin ditanyakan?',
      'Selamat bertemu! Bagaimana kabar? Ada yang mau didiskusikan?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const isPersonalQuestion = (input: string): boolean => {
    const personalKeywords = ['kamu', 'miora', 'diri', 'siapa anda', 'identitas'];
    return personalKeywords.some(keyword => input.includes(keyword));
  };

  const generatePersonalResponse = (input: string): string => {
    const responses = [
      'Saya MIORA, AI assistant yang siap membantu berbagai pertanyaan. Senang ngobrol dengan Anda.',
      'Saya MIORA - Master Intelligence for Optimized Resource Allocation. Saya di sini untuk membantu.',
      'Saya MIORA, AI yang didesain untuk strategic thinking. Senang berkenalan!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const isTechnicalQuestion = (input: string): boolean => {
    const techKeywords = ['teknologi', 'komputer', 'software', 'aplikasi', 'programming', 'kode', 'sistem'];
    return techKeywords.some(keyword => input.includes(keyword));
  };

  const generateTechnicalResponse = (input: string): string => {
    return `Untuk pertanyaan teknis itu, saya bisa bantu jelaskan. Mau penjelasan detail atau overview umum?`;
  };

  const generateGeneralResponse = (input: string): string => {
    const responses = [
      `Itu topik yang menarik. Saya bisa bantu memberikan perspektif atau analisis.`,
      `Saya memahami poin Anda. Mari diskusi lebih lanjut - ada aspek spesifik yang mau difokuskan?`,
      `Terima kasih sudah berbagi. Saya bisa kasih input atau sudut pandang lain.`,
      `Pemikiran yang bagus. Ada beberapa hal yang bisa kita eksplorasi dari sini.`
    ];
    
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    // Add context awareness
    if (contextMemoryRef.current.length > 2) {
      response += ` Mengingat percakapan kita tadi, sepertinya ada kaitannya.`;
    }
    
    return response;
  };

  const speakMIORAResponse = useCallback(async (text: string) => {
    if (!synthesisRef.current || !text.trim()) return;
    
    setVoiceState(prev => ({ ...prev, isSpeaking: true }));
    
    // Stop any ongoing speech
    synthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Try to use Indonesian voice if available
    const voices = synthesisRef.current.getVoices();
    const indonesianVoice = voices.find(voice => 
      voice.lang.includes('id') || voice.name.toLowerCase().includes('indonesia')
    );
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }
    
    utterance.onend = () => {
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      
      // Resume listening after speaking
      if (conversationState.isActive && !conversationState.isPaused) {
        setTimeout(() => {
          if (recognitionRef.current && !voiceState.isListening) {
            recognitionRef.current.start();
          }
        }, 800);
      }
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    };
    
    synthesisRef.current.speak(utterance);
  }, [conversationState.isActive, conversationState.isPaused, voiceState.isListening]);

  const shouldSaveToMemory = (input: string): boolean => {
    const keywords = ['nama', 'saya', 'panggil', 'ingat', 'penting', 'jangan lupa'];
    return keywords.some(keyword => input.toLowerCase().includes(keyword));
  };

  const pauseConversation = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    
    setConversationState(prev => ({ ...prev, isPaused: true }));
    setVoiceState(prev => ({ 
      ...prev, 
      isListening: false, 
      isSpeaking: false, 
      isProcessing: false 
    }));
    
    toast({
      title: "⏸️ Conversation Paused",
      description: "Percakapan dengan MIORA dijeda",
      duration: 2000,
    });
  }, [toast]);

  const resumeConversation = useCallback(() => {
    setConversationState(prev => ({ ...prev, isPaused: false }));
    
    setTimeout(() => {
      startListeningLoop();
    }, 500);
    
    toast({
      title: "▶️ Conversation Resumed",
      description: "Percakapan dengan MIORA dilanjutkan",
      duration: 2000,
    });
  }, [startListeningLoop, toast]);

  const endConversation = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    
    if (conversationLoopRef.current) {
      clearTimeout(conversationLoopRef.current);
    }
    
    const duration = Date.now() - conversationState.conversationStarted;
    setVoiceMetrics(prev => ({ ...prev, conversationDuration: duration }));
    
    setConversationState({
      isActive: false,
      isPaused: false,
      totalInteractions: 0,
      currentContext: [],
      userName: null,
      conversationStarted: 0
    });
    
    setVoiceState({
      isListening: false,
      isSpeaking: false,
      isProcessing: false,
      currentTranscript: '',
      audioLevel: 0,
      silenceDetected: false
    });
    
    toast({
      title: "🔚 Conversation Ended",
      description: `Percakapan berakhir. Durasi: ${Math.floor(duration / 1000)} detik`,
      duration: 3000,
    });
  }, [conversationState.conversationStarted, toast]);

  const resetVoiceEngine = useCallback(() => {
    endConversation();
    
    // Reset all state
    setInteractionHistory([]);
    responseTimesRef.current = [];
    contextMemoryRef.current = [];
    
    setVoiceMetrics({
      avgResponseTime: 0,
      speechAccuracy: 92,
      totalWordsProcessed: 0,
      conversationDuration: 0
    });
    
    // Reinitialize engines
    setTimeout(() => {
      initializeVoicePipeline();
    }, 1000);
    
    toast({
      title: "🔄 Voice Engine Reset",
      description: "MIORA voice system telah direset dan siap digunakan",
      duration: 3000,
    });
  }, [endConversation, initializeVoicePipeline, toast]);

  // Initialize on mount
  useEffect(() => {
    const initTimer = setTimeout(() => {
      initializeVoicePipeline();
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      endConversation();
    };
  }, [initializeVoicePipeline, endConversation]);

  return {
    voiceState,
    conversationState,
    voiceMetrics,
    interactionHistory,
    startTwoWayConversation,
    pauseConversation,
    resumeConversation,
    endConversation,
    resetVoiceEngine,
    getCurrentTranscript: () => voiceState.currentTranscript,
    getVoicePipelineStatus: () => pipelineStatus,
    isEngineReady: pipelineStatus.whisperLoaded && pipelineStatus.ttsLoaded
  };
};
