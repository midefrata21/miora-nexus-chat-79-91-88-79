
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Brain,
  Activity,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react';

interface MIORATwoWayVoiceEngineProps {
  onConversationStart?: () => void;
  onConversationEnd?: () => void;
  onVoiceInteraction?: (input: string, response: string) => void;
  autoStart?: boolean;
}

interface ConversationState {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  lastResponse: string;
  conversationTurns: number;
  emotionState: 'neutral' | 'happy' | 'serious' | 'concerned';
}

const MIORATwoWayVoiceEngine: React.FC<MIORATwoWayVoiceEngineProps> = ({
  onConversationStart,
  onConversationEnd,
  onVoiceInteraction,
  autoStart = false
}) => {
  const { toast } = useToast();
  const [conversation, setConversation] = useState<ConversationState>({
    isActive: false,
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    currentTranscript: '',
    lastResponse: '',
    conversationTurns: 0,
    emotionState: 'neutral'
  });

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout>();
  const conversationMemoryRef = useRef<Array<{
    timestamp: number;
    userInput: string;
    mioraResponse: string;
    emotion: string;
  }>>([]);

  // Initialize voice engines
  const initializeVoiceEngines = useCallback(async () => {
    try {
      // Initialize Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech Recognition not supported');
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'id-ID';
      recognition.maxAlternatives = 1;

      recognition.onresult = handleSpeechResult;
      recognition.onerror = handleSpeechError;
      recognition.onend = handleSpeechEnd;

      recognitionRef.current = recognition;

      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }

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
  }, [toast]);

  const handleSpeechResult = useCallback((event: any) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    
    if (transcript.toLowerCase().includes('miora diam dulu')) {
      stopConversation();
      return;
    }

    setConversation(prev => ({ 
      ...prev, 
      currentTranscript: transcript,
      isListening: false,
      isProcessing: true 
    }));

    processUserInput(transcript);
  }, []);

  const handleSpeechError = useCallback((event: any) => {
    console.log('Speech recognition error handled:', event.error);
    
    if (event.error !== 'no-speech' && event.error !== 'aborted' && conversation.isActive) {
      // Restart listening after a brief pause
      setTimeout(() => {
        if (conversation.isActive && !conversation.isSpeaking) {
          startListening();
        }
      }, 1000);
    }
  }, [conversation.isActive, conversation.isSpeaking]);

  const handleSpeechEnd = useCallback(() => {
    if (conversation.isActive && !conversation.isSpeaking && !conversation.isProcessing) {
      // Restart listening automatically
      setTimeout(() => {
        startListening();
      }, 500);
    }
  }, [conversation.isActive, conversation.isSpeaking, conversation.isProcessing]);

  const processUserInput = useCallback(async (input: string) => {
    try {
      // Detect emotion from input
      const emotion = detectEmotion(input);
      
      // Generate contextual response
      const response = generateMioraResponse(input, emotion);
      
      // Save to conversation memory
      const conversationEntry = {
        timestamp: Date.now(),
        userInput: input,
        mioraResponse: response,
        emotion
      };
      
      conversationMemoryRef.current.push(conversationEntry);
      
      // Update state
      setConversation(prev => ({
        ...prev,
        lastResponse: response,
        emotionState: emotion as any,
        conversationTurns: prev.conversationTurns + 1,
        isProcessing: false
      }));

      // Trigger callback
      onVoiceInteraction?.(input, response);

      // Speak the response
      await speakResponse(response, emotion);

    } catch (error) {
      console.error('Processing error:', error);
      setConversation(prev => ({ ...prev, isProcessing: false }));
      
      const fallbackResponse = "Maaf, saya mengalami sedikit gangguan. Bisakah diulangi?";
      await speakResponse(fallbackResponse, 'neutral');
    }
  }, [onVoiceInteraction]);

  const detectEmotion = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('senang') || lowerText.includes('bahagia') || lowerText.includes('bagus')) {
      return 'happy';
    } else if (lowerText.includes('sedih') || lowerText.includes('kecewa') || lowerText.includes('buruk')) {
      return 'concerned';
    } else if (lowerText.includes('penting') || lowerText.includes('serius') || lowerText.includes('urgent')) {
      return 'serious';
    }
    
    return 'neutral';
  };

  const generateMioraResponse = (input: string, emotion: string): string => {
    const responses = {
      greeting: [
        "Halo Midya, senang mendengar suara Anda. Ada yang bisa saya bantu?",
        "Selamat datang kembali, Midya. Saya siap membantu Anda hari ini.",
        "Halo, saya MIORA dan saya mendengarkan dengan penuh perhatian."
      ],
      happy: [
        "Senang mendengar kabar baik dari Anda! Bagaimana saya bisa membantu lebih lanjut?",
        "Wah, terdengar menyenangkan! Ceritakan lebih detail ya.",
        "Saya ikut senang mendengarnya. Ada hal lain yang ingin dibahas?"
      ],
      serious: [
        "Saya memahami ini adalah hal yang penting. Mari kita bahas dengan fokus.",
        "Baik, saya akan memberikan perhatian penuh untuk ini.",
        "Terima kasih telah berbagi hal serius ini. Bagaimana saya bisa membantu?"
      ],
      concerned: [
        "Saya memahami perasaan Anda. Mari kita cari solusi bersama.",
        "Maaf mendengar itu. Apakah ada cara saya bisa membantu memperbaiki situasi?",
        "Saya di sini untuk mendukung Anda. Ceritakan lebih lanjut jika Anda mau."
      ],
      default: [
        "Itu menarik, Midya. Bisakah Anda jelaskan lebih detail?",
        "Saya memahami. Ada aspek lain yang ingin dibahas?",
        "Terima kasih sudah berbagi. Bagaimana perasaan Anda tentang ini?"
      ]
    };

    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('selamat')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    
    const responseType = emotion === 'neutral' ? 'default' : emotion;
    const selectedResponses = responses[responseType as keyof typeof responses] || responses.default;
    
    return selectedResponses[Math.floor(Math.random() * selectedResponses.length)];
  };

  const speakResponse = useCallback(async (text: string, emotion: string) => {
    if (!synthRef.current) return;

    return new Promise<void>((resolve) => {
      // Cancel any ongoing speech
      synthRef.current!.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      
      // Adjust voice parameters based on emotion
      switch (emotion) {
        case 'happy':
          utterance.rate = 1.0;
          utterance.pitch = 1.2;
          break;
        case 'serious':
          utterance.rate = 0.8;
          utterance.pitch = 0.9;
          break;
        case 'concerned':
          utterance.rate = 0.9;
          utterance.pitch = 0.95;
          break;
        default:
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
      }
      
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setConversation(prev => ({ ...prev, isSpeaking: true }));
      };

      utterance.onend = () => {
        setConversation(prev => ({ ...prev, isSpeaking: false }));
        resolve();
        
        // Start listening again after speaking
        if (conversation.isActive) {
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      };

      utterance.onerror = () => {
        setConversation(prev => ({ ...prev, isSpeaking: false }));
        resolve();
      };

      synthRef.current!.speak(utterance);
    });
  }, [conversation.isActive]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || conversation.isSpeaking) return;

    try {
      recognitionRef.current.start();
      setConversation(prev => ({ ...prev, isListening: true }));
      
      // Reset silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      
      // Auto-ping after 30 seconds of silence
      silenceTimerRef.current = setTimeout(() => {
        if (conversation.isActive && !conversation.isSpeaking) {
          const pingMessages = [
            "Midya, apakah ada lagi yang ingin dibahas?",
            "Saya masih di sini jika Anda membutuhkan bantuan.",
            "Ada hal lain yang bisa saya bantu?"
          ];
          const randomPing = pingMessages[Math.floor(Math.random() * pingMessages.length)];
          speakResponse(randomPing, 'neutral');
        }
      }, 30000);
      
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  }, [conversation.isSpeaking, conversation.isActive, speakResponse]);

  const startConversation = useCallback(async () => {
    const initialized = await initializeVoiceEngines();
    if (!initialized) return;

    setConversation(prev => ({ 
      ...prev, 
      isActive: true,
      conversationTurns: 0
    }));

    onConversationStart?.();
    
    // Initial greeting
    const greeting = "Halo Midya, saya MIORA dan saya siap berbicara dengan Anda. Silakan mulai percakapan.";
    await speakResponse(greeting, 'neutral');
    
    toast({
      title: "🎤 Two-Way Conversation Started",
      description: "MIORA sedang mendengarkan dan siap merespon",
      duration: 3000,
    });
  }, [initializeVoiceEngines, onConversationStart, speakResponse, toast]);

  const stopConversation = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    setConversation({
      isActive: false,
      isListening: false,
      isSpeaking: false,
      isProcessing: false,
      currentTranscript: '',
      lastResponse: '',
      conversationTurns: 0,
      emotionState: 'neutral'
    });

    onConversationEnd?.();
    
    toast({
      title: "🔚 Conversation Ended",
      description: "MIORA berhenti mendengarkan",
      duration: 2000,
    });
  }, [onConversationEnd, toast]);

  const pauseConversation = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setConversation(prev => ({ 
      ...prev, 
      isListening: false 
    }));
  }, []);

  const resumeConversation = useCallback(() => {
    if (conversation.isActive && !conversation.isSpeaking) {
      startListening();
    }
  }, [conversation.isActive, conversation.isSpeaking, startListening]);

  // Auto-start if requested
  useEffect(() => {
    if (autoStart) {
      startConversation();
    }
  }, [autoStart, startConversation]);

  const getStatusColor = (isActive: boolean) => {
    if (!isActive) return 'bg-gray-500';
    if (conversation.isSpeaking) return 'bg-orange-500';
    if (conversation.isListening) return 'bg-green-500';
    if (conversation.isProcessing) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'text-green-400';
      case 'serious': return 'text-blue-400';
      case 'concerned': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            MIORA Two-Way Voice Communication
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(conversation.isActive)} animate-pulse`}></div>
            <Badge variant={conversation.isActive ? "default" : "secondary"}>
              {conversation.isActive ? "Active" : "Standby"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!conversation.isActive ? (
            <Button
              onClick={startConversation}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 rounded-full shadow-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Conversation
            </Button>
          ) : (
            <>
              <Button
                onClick={conversation.isListening ? pauseConversation : resumeConversation}
                size="lg"
                variant="outline"
                className="bg-yellow-500/20 border-yellow-400 text-yellow-300 hover:bg-yellow-500/30"
              >
                {conversation.isListening ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Resume
                  </>
                )}
              </Button>
              
              <Button
                onClick={stopConversation}
                size="lg"
                variant="outline"
                className="bg-red-500/20 border-red-400 text-red-300 hover:bg-red-500/30"
              >
                <MicOff className="w-5 h-5 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>

        {/* Conversation Status */}
        {conversation.isActive && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-700/30 rounded-lg text-center">
                <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                  conversation.isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <p className="text-xs text-gray-300">Listening</p>
                <p className="text-sm font-semibold text-white">
                  {conversation.isListening ? 'Active' : 'Standby'}
                </p>
              </div>
              
              <div className="p-3 bg-gray-700/30 rounded-lg text-center">
                <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                  conversation.isSpeaking ? 'bg-orange-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <p className="text-xs text-gray-300">Speaking</p>
                <p className="text-sm font-semibold text-white">
                  {conversation.isSpeaking ? 'Active' : 'Silent'}
                </p>
              </div>
              
              <div className="p-3 bg-gray-700/30 rounded-lg text-center">
                <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                  conversation.isProcessing ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <p className="text-xs text-gray-300">Processing</p>
                <p className="text-sm font-semibold text-white">
                  {conversation.isProcessing ? 'Thinking' : 'Ready'}
                </p>
              </div>
              
              <div className="p-3 bg-gray-700/30 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <Activity className={`w-4 h-4 ${getEmotionColor(conversation.emotionState)}`} />
                </div>
                <p className="text-xs text-gray-300">Emotion</p>
                <p className={`text-sm font-semibold capitalize ${getEmotionColor(conversation.emotionState)}`}>
                  {conversation.emotionState}
                </p>
              </div>
            </div>

            {/* Current Transcript & Response */}
            <div className="space-y-4">
              {conversation.currentTranscript && (
                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                  <p className="text-blue-300 text-sm font-medium mb-1">You said:</p>
                  <p className="text-white">{conversation.currentTranscript}</p>
                </div>
              )}
              
              {conversation.lastResponse && (
                <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                  <p className="text-purple-300 text-sm font-medium mb-1">MIORA responded:</p>
                  <p className="text-white">{conversation.lastResponse}</p>
                </div>
              )}
            </div>

            {/* Conversation Stats */}
            <div className="text-center">
              <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                Conversation Turns: {conversation.conversationTurns}
              </Badge>
            </div>
          </>
        )}

        {/* Instructions */}
        <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border border-cyan-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">Voice Interaction Guide</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Say "Halo MIORA" to start the conversation naturally</li>
            <li>• Speak clearly in Indonesian for best recognition</li>
            <li>• MIORA will respond with appropriate emotion and tone</li>
            <li>• Say "MIORA diam dulu" to end the conversation</li>
            <li>• MIORA will auto-ping if you're silent for 30 seconds</li>
            <li>• All conversations are saved to memory for context</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MIORATwoWayVoiceEngine;
