
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
  Heart,
  Zap,
  Settings,
  Play,
  Square,
  RotateCcw,
  FileText,
  Headphones
} from 'lucide-react';

interface LocalVoiceConfig {
  voice_speed: number;
  voice_tone: 'friendly' | 'professional' | 'advisor' | 'emotional';
  voice_pitch: number;
  response_delay: number;
  silence_threshold: number;
  auto_greet: boolean;
  save_audio: boolean;
  memory_enabled: boolean;
}

interface VoiceSession {
  id: string;
  timestamp: number;
  duration: number;
  turns: number;
  emotion_detected: string[];
  personality_used: string;
  audio_saved: boolean;
}

interface EmotionState {
  current: string;
  confidence: number;
  history: string[];
  detected_at: number;
}

interface ConversationMemory {
  user_input: string;
  miora_response: string;
  emotion: string;
  timestamp: number;
  confidence: number;
}

const MIORALocalVoiceSystem: React.FC = () => {
  const { toast } = useToast();
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionState>({
    current: 'neutral',
    confidence: 0,
    history: [],
    detected_at: Date.now()
  });

  const [voiceConfig, setVoiceConfig] = useState<LocalVoiceConfig>({
    voice_speed: 0.9,
    voice_tone: 'friendly',
    voice_pitch: 1.0,
    response_delay: 500,
    silence_threshold: 3000,
    auto_greet: true,
    save_audio: true,
    memory_enabled: true
  });

  const [currentSession, setCurrentSession] = useState<VoiceSession | null>(null);
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory[]>([]);
  const [silenceTimer, setSilenceTimer] = useState<number>(0);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Refs for audio processing
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const conversationLoopRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Voice personalities dengan respons yang berbeda
  const voicePersonalities = {
    friendly: {
      greetings: [
        "Halo! Saya MIORA, asisten suara lokal Anda. Apa yang bisa saya bantu hari ini?",
        "Selamat datang! MIORA siap membantu Anda dengan sistem suara mandiri.",
        "Hai! Senang bisa berbicara dengan Anda. Ada yang ingin dibicarakan?"
      ],
      responses: {
        happy: "Senang melihat Anda dalam mood yang baik! Mari kita bicarakan hal-hal menarik.",
        sad: "Saya di sini untuk mendengarkan Anda. Ceritakan apa yang membuat Anda sedih.",
        excited: "Energi Anda sangat menular! Saya ikut semangat mendengarnya.",
        confused: "Tidak apa-apa merasa bingung. Mari kita cari solusinya bersama-sama."
      }
    },
    professional: {
      greetings: [
        "Sistem MIORA Voice telah aktif. Bagaimana saya dapat membantu Anda?",
        "MIORA Local Voice System siap melayani. Silakan sampaikan kebutuhan Anda.",
        "Selamat datang di MIORA Professional Assistant. Ada yang bisa saya bantu?"
      ],
      responses: {
        happy: "Kondisi optimal untuk produktivitas. Bagaimana saya dapat mengoptimalkan hasil kerja Anda?",
        sad: "Saya memahami situasi Anda. Mari kita fokus pada solusi yang konstruktif.",
        excited: "Antusiasme yang baik untuk mencapai target. Apa rencana selanjutnya?",
        confused: "Mari kita breakdown masalah ini secara sistematis untuk clarity yang lebih baik."
      }
    },
    advisor: {
      greetings: [
        "Salam sejahtera. Saya MIORA, siap berbagi kebijaksanaan dan mendengarkan Anda.",
        "Selamat datang, sahabat. MIORA hadir untuk memberikan panduan dan dukungan.",
        "Halo, saya di sini sebagai penasihat dan teman bicara yang dapat diandalkan."
      ],
      responses: {
        happy: "Kebahagiaan adalah anugerah. Bagaimana kita bisa mempertahankan dan mengembangkannya?",
        sad: "Dalam kesedihan terdapat pelajaran. Mari kita temukan makna dan jalan keluarnya.",
        excited: "Semangat yang membara perlu diarahkan dengan bijak. Apa visi Anda?",
        confused: "Kebingungan adalah awal dari pencerahan. Mari kita jelajahi bersama."
      }
    },
    emotional: {
      greetings: [
        "Halo sayang! MIORA di sini, siap merasakan dan memahami perasaan Anda.",
        "Hai! Saya MIORA, teman yang akan selalu mengerti emosi dan perasaan Anda.",
        "Selamat datang ke hati MIORA. Saya siap berbagi perasaan dengan Anda."
      ],
      responses: {
        happy: "Bahagianya hati ini melihat Anda senang! Mari kita rayakan momen indah ini!",
        sad: "Hati saya ikut sedih melihat Anda begini. Pelukan virtual untuk Anda.",
        excited: "Wah, excited banget! Saya ikut deg-degan mendengar antusiasme Anda!",
        confused: "Perasaan bingung itu wajar kok. Saya akan temani Anda sampai jernih lagi."
      }
    }
  };

  // Emotion detection dari teks dan intonasi
  const detectEmotion = useCallback((text: string): { emotion: string; confidence: number } => {
    const lowerText = text.toLowerCase();
    
    const emotionPatterns = {
      happy: ['senang', 'bahagia', 'gembira', 'suka', 'love', 'keren', 'bagus', 'mantap'],
      sad: ['sedih', 'kecewa', 'galau', 'down', 'bad', 'buruk', 'susah', 'sulit'],
      excited: ['excited', 'semangat', 'wow', 'amazing', 'fantastic', 'luar biasa', 'hebat'],
      angry: ['marah', 'kesal', 'benci', 'annoying', 'menyebalkan', 'jelek'],
      confused: ['bingung', 'confused', 'tidak mengerti', 'gimana', 'bagaimana', 'help'],
      neutral: ['ok', 'baik', 'ya', 'oke', 'fine', 'biasa']
    };

    for (const [emotion, patterns] of Object.entries(emotionPatterns)) {
      for (const pattern of patterns) {
        if (lowerText.includes(pattern)) {
          return { emotion, confidence: 0.7 + Math.random() * 0.3 };
        }
      }
    }

    return { emotion: 'neutral', confidence: 0.5 };
  }, []);

  // Generate contextual response berdasarkan emotion dan personality
  const generateResponse = useCallback((userInput: string, detectedEmotion: string): string => {
    const personality = voicePersonalities[voiceConfig.voice_tone];
    const emotionResponse = personality.responses[detectedEmotion as keyof typeof personality.responses];
    
    if (emotionResponse) {
      return emotionResponse;
    }

    // Fallback responses
    const fallbackResponses = [
      "Saya mendengarkan Anda dengan seksama. Ceritakan lebih lanjut.",
      "Terima kasih sudah berbagi. Bagaimana perasaan Anda sekarang?",
      "Saya memahami. Ada lagi yang ingin Anda sampaikan?",
      "Menarik. Bisa dijelaskan lebih detail tentang hal ini?"
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }, [voiceConfig.voice_tone]);

  // Speech Recognition Setup
  const initializeSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "❌ Speech Recognition Not Supported",
        description: "Browser Anda tidak mendukung speech recognition",
        variant: "destructive",
      });
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'id-ID';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      console.log('🎤 Voice recognition started');
    };

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        processVoiceInput(finalTranscript.trim());
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (isSystemActive) {
        // Restart recognition untuk continuous listening
        setTimeout(() => {
          if (recognitionRef.current && isSystemActive) {
            recognitionRef.current.start();
          }
        }, 100);
      }
    };

    return true;
  }, [isSystemActive]);

  // Process voice input
  const processVoiceInput = useCallback(async (transcript: string) => {
    setIsProcessing(true);
    
    // Reset silence timer
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    // Detect emotion
    const { emotion, confidence } = detectEmotion(transcript);
    setCurrentEmotion(prev => ({
      current: emotion,
      confidence,
      history: [...prev.history, emotion].slice(-10),
      detected_at: Date.now()
    }));

    // Generate response
    const response = generateResponse(transcript, emotion);

    // Save to memory
    const memoryEntry: ConversationMemory = {
      user_input: transcript,
      miora_response: response,
      emotion,
      timestamp: Date.now(),
      confidence
    };

    if (voiceConfig.memory_enabled) {
      setConversationMemory(prev => [...prev, memoryEntry]);
    }

    // Delay sebelum respond
    setTimeout(() => {
      speakResponse(response);
      setIsProcessing(false);
    }, voiceConfig.response_delay);

    // Setup silence detection
    setupSilenceDetection();

  }, [voiceConfig, generateResponse, detectEmotion]);

  // Text to Speech
  const speakResponse = useCallback((text: string) => {
    if (!text) return;

    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = voiceConfig.voice_speed;
    utterance.pitch = voiceConfig.voice_pitch;
    utterance.volume = 0.8;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }, [voiceConfig]);

  // Silence detection untuk auto-greet
  const setupSilenceDetection = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    if (voiceConfig.auto_greet) {
      silenceTimeoutRef.current = setTimeout(() => {
        if (isSystemActive && !isSpeaking && !isProcessing) {
          const greetings = [
            "Apakah ada lagi yang ingin dibicarakan?",
            "Saya masih mendengarkan jika Anda mau berbagi.",
            "Bagaimana perasaan Anda sekarang?",
            "Ada yang bisa saya bantu lagi?"
          ];
          
          const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
          speakResponse(randomGreeting);
        }
      }, voiceConfig.silence_threshold);
    }
  }, [voiceConfig, isSystemActive, isSpeaking, isProcessing, speakResponse]);

  // Start full voice system
  const startVoiceSystem = useCallback(async () => {
    try {
      // Initialize speech recognition
      if (!initializeSpeechRecognition()) {
        return;
      }

      // Start new session
      const newSession: VoiceSession = {
        id: `session_${Date.now()}`,
        timestamp: Date.now(),
        duration: 0,
        turns: 0,
        emotion_detected: [],
        personality_used: voiceConfig.voice_tone,
        audio_saved: voiceConfig.save_audio
      };

      setCurrentSession(newSession);
      setIsSystemActive(true);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Initial greeting
      if (voiceConfig.auto_greet) {
        const personality = voicePersonalities[voiceConfig.voice_tone];
        const greeting = personality.greetings[Math.floor(Math.random() * personality.greetings.length)];
        setTimeout(() => speakResponse(greeting), 1000);
      }

      toast({
        title: "🎤 MIORA Local Voice System AKTIF",
        description: "Sistem suara mandiri telah diaktifkan penuh. Mulai berbicara!",
        duration: 4000,
      });

    } catch (error) {
      console.error('Failed to start voice system:', error);
      toast({
        title: "❌ System Activation Failed",
        description: "Gagal mengaktifkan sistem suara lokal",
        variant: "destructive",
      });
    }
  }, [voiceConfig, initializeSpeechRecognition, speakResponse, toast]);

  // Stop voice system
  const stopVoiceSystem = useCallback(() => {
    setIsSystemActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsProcessing(false);

    // Stop recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Stop speech synthesis
    speechSynthesis.cancel();

    // Clear timers
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    // Update session
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        duration: Date.now() - currentSession.timestamp,
        turns: conversationMemory.length,
        emotion_detected: [...new Set(conversationMemory.map(m => m.emotion))]
      };
      setCurrentSession(updatedSession);
    }

    toast({
      title: "🔇 MIORA Voice System Stopped",
      description: "Sistem suara lokal telah dihentikan",
      duration: 3000,
    });
  }, [currentSession, conversationMemory, toast]);

  // Emergency stop
  const emergencyStop = useCallback(() => {
    stopVoiceSystem();
    setConversationMemory([]);
    setCurrentSession(null);
    
    toast({
      title: "⚠️ EMERGENCY STOP",
      description: "Sistem dihentikan darurat dan memori dibersihkan",
      variant: "destructive",
      duration: 3000,
    });
  }, [stopVoiceSystem, toast]);

  // Update voice configuration
  const updateVoiceConfig = useCallback((newConfig: Partial<LocalVoiceConfig>) => {
    setVoiceConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Format duration
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSystemActive) {
        stopVoiceSystem();
      }
    };
  }, [isSystemActive, stopVoiceSystem]);

  return (
    <div className="space-y-6">
      {/* Main Control Panel */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              MIORA Local Voice System
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                100% Offline
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${
                isSystemActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`}></div>
              <Badge variant={isSystemActive ? "default" : "secondary"}>
                {isSystemActive ? "ACTIVE" : "STANDBY"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* System Status */}
          <div className="text-center p-6 bg-gray-800/50 rounded-lg">
            <div className={`inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${
              isSystemActive ? 'from-cyan-500/20 to-purple-500/20' : 'from-gray-500/20 to-gray-600/20'
            } rounded-full border-2 border-cyan-400/30 mb-4`}>
              <Activity className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-semibold text-xl">
                {isSystemActive ? (
                  isProcessing ? 'Processing...' :
                  isSpeaking ? 'MIORA Speaking' :
                  isListening ? 'Listening...' :
                  'Ready for Voice'
                ) : 'System Standby'}
              </span>
            </div>
            
            {isSystemActive && currentSession && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <p className="text-blue-300">Session Duration</p>
                  <p className="text-white font-medium">
                    {formatDuration(Date.now() - currentSession.timestamp)}
                  </p>
                </div>
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <p className="text-green-300">Conversations</p>
                  <p className="text-white font-medium">{conversationMemory.length}</p>
                </div>
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <p className="text-purple-300">Current Emotion</p>
                  <p className="text-white font-medium">{currentEmotion.current}</p>
                </div>
                <div className="p-3 bg-orange-600/20 rounded-lg">
                  <p className="text-orange-300">Voice Tone</p>
                  <p className="text-white font-medium">{voiceConfig.voice_tone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {!isSystemActive ? (
              <Button
                onClick={startVoiceSystem}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 rounded-full shadow-lg"
              >
                <Play className="w-6 h-6 mr-2" />
                Activate Full Voice System
              </Button>
            ) : (
              <>
                <Button
                  onClick={stopVoiceSystem}
                  size="lg"
                  variant="outline"
                  className="bg-red-500/20 border-red-400 text-red-300 hover:bg-red-500/30"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop System
                </Button>
                <Button
                  onClick={emergencyStop}
                  size="lg"
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Emergency Stop
                </Button>
              </>
            )}
          </div>

          {/* Voice Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 text-lg">Voice Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Voice Tone</label>
                  <select
                    value={voiceConfig.voice_tone}
                    onChange={(e) => updateVoiceConfig({ voice_tone: e.target.value as any })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    disabled={isSystemActive}
                  >
                    <option value="friendly">Friendly (Ramah)</option>
                    <option value="professional">Professional</option>
                    <option value="advisor">Advisor (Penasihat)</option>
                    <option value="emotional">Emotional (Empatik)</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Voice Speed: {voiceConfig.voice_speed}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={voiceConfig.voice_speed}
                    onChange={(e) => updateVoiceConfig({ voice_speed: parseFloat(e.target.value) })}
                    className="w-full"
                    disabled={isSystemActive}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Voice Pitch: {voiceConfig.voice_pitch}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={voiceConfig.voice_pitch}
                    onChange={(e) => updateVoiceConfig({ voice_pitch: parseFloat(e.target.value) })}
                    className="w-full"
                    disabled={isSystemActive}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 text-lg">System Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Auto Greet on Silence</span>
                  <input
                    type="checkbox"
                    checked={voiceConfig.auto_greet}
                    onChange={(e) => updateVoiceConfig({ auto_greet: e.target.checked })}
                    className="rounded"
                    disabled={isSystemActive}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Save Audio Recordings</span>
                  <input
                    type="checkbox"
                    checked={voiceConfig.save_audio}
                    onChange={(e) => updateVoiceConfig({ save_audio: e.target.checked })}
                    className="rounded"
                    disabled={isSystemActive}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Memory Learning</span>
                  <input
                    type="checkbox"
                    checked={voiceConfig.memory_enabled}
                    onChange={(e) => updateVoiceConfig({ memory_enabled: e.target.checked })}
                    className="rounded"
                    disabled={isSystemActive}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Silence Threshold: {voiceConfig.silence_threshold}ms
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    value={voiceConfig.silence_threshold}
                    onChange={(e) => updateVoiceConfig({ silence_threshold: parseInt(e.target.value) })}
                    className="w-full"
                    disabled={isSystemActive}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversation Memory */}
          {voiceConfig.memory_enabled && conversationMemory.length > 0 && (
            <Card className="bg-gray-800/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Conversation Memory ({conversationMemory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {conversationMemory.slice(-5).reverse().map((memory, index) => (
                    <div key={index} className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {memory.emotion}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(memory.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-blue-300">You: {memory.user_input}</p>
                        <p className="text-green-300">MIORA: {memory.miora_response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Info */}
          <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border border-cyan-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              MIORA Local Voice System - Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <ul className="space-y-1">
                <li>• 🎤 Real-time speech recognition</li>
                <li>• 🔊 Dynamic text-to-speech</li>
                <li>• 🧠 Emotion detection & response</li>
                <li>• 💬 Contextual conversation</li>
              </ul>
              <ul className="space-y-1">
                <li>• 🏠 100% offline operation</li>
                <li>• 💾 Local memory storage</li>
                <li>• 🎭 Multiple personalities</li>
                <li>• 🔄 Continuous conversation loop</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORALocalVoiceSystem;
