import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain, 
  Zap, 
  Activity,
  Settings,
  User,
  Heart,
  MessageCircle,
  Clock
} from 'lucide-react';
import { 
  defaultVoiceConfig, 
  VoiceEngineStatus,
  VoiceConfig 
} from '@/config/voiceConfig';
import { 
  detectEmotion, 
  detectTopic, 
  generateContextualResponse,
  getVoiceSettings,
  getAutoResponseMessage
} from '@/utils/voiceUtils';
import VoiceMemoryEngine from './VoiceMemoryEngine';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Conversation {
  id: string;
  timestamp: Date;
  userInput: string;
  mioraResponse: string;
  emotion: string;
  topic: string;
  confidence: number;
}

interface ConversationContext {
  id: string;
  timestamp: number;
  speaker: 'user' | 'miora';
  content: string;
  emotion: string;
  topic: string;
  confidence: number;
}

const MIORAVoiceEngine2: React.FC = () => {
  const { toast } = useToast();
  
  // Core States
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [engineStatus, setEngineStatus] = useState<VoiceEngineStatus>('initializing');
  const [currentPersonality, setCurrentPersonality] = useState<string>('bersahabat');
  const [lastEmotion, setLastEmotion] = useState<string>('neutral');
  const [conversationCount, setConversationCount] = useState(0);
  
  // Voice Engine States
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>(defaultVoiceConfig);
  
  // Conversation & Memory
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [isAutoResponseActive, setIsAutoResponseActive] = useState(true);
  
  // Refs for managing timers
  const autoResponseTimer = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Voice Engine
  useEffect(() => {
    initializeVoiceEngine();
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (autoResponseTimer.current) {
      clearTimeout(autoResponseTimer.current);
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const initializeVoiceEngine = async () => {
    setEngineStatus('initializing');
    
    try {
      // Initialize Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognitionClass();
        
        recognitionInstance.continuous = voiceConfig.recognition.continuous;
        recognitionInstance.interimResults = voiceConfig.recognition.interimResults;
        recognitionInstance.lang = voiceConfig.recognition.language;
        recognitionInstance.maxAlternatives = voiceConfig.recognition.maxAlternatives;
        
        recognitionInstance.onresult = handleSpeechResult;
        recognitionInstance.onend = handleSpeechEnd;
        recognitionInstance.onerror = handleSpeechError;
        recognitionInstance.onstart = handleSpeechStart;
        
        setRecognition(recognitionInstance);
        recognitionRef.current = recognitionInstance;
      }
      
      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
      
      setEngineStatus('ready');
      
      toast({
        title: "🎤 MIORA Voice Engine 2.0 Ready",
        description: "Sistem komunikasi suara dengan emosi dan konteks telah diaktifkan",
        duration: 4000,
      });
      
      // Start auto response if enabled
      if (voiceConfig.autoResponse.enabled) {
        startAutoResponse();
      }
      
    } catch (error) {
      setEngineStatus('error');
      console.error('Voice engine initialization error:', error);
      
      toast({
        title: "❌ Voice Engine Error",
        description: "Gagal menginisialisasi voice engine",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleSpeechResult = useCallback((event: any) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if (!transcript || typeof transcript !== 'string') {
      return;
    }
    
    const cleanTranscript = transcript.trim();
    
    if (event.results[current].isFinal && cleanTranscript) {
      setCurrentTranscript(cleanTranscript);
      processUserInput(cleanTranscript);
    }
  }, []);

  const handleSpeechStart = () => {
    setEngineStatus('listening');
    if (autoResponseTimer.current) {
      clearTimeout(autoResponseTimer.current);
    }
  };

  const handleSpeechEnd = () => {
    setIsListening(false);
    setEngineStatus('ready');
    if (isAutoResponseActive) {
      startAutoResponse();
    }
  };

  const handleSpeechError = (event: any) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
    setEngineStatus('error');
    
    toast({
      title: "🎤 Speech Recognition Error",
      description: `Error: ${event.error}`,
      variant: "destructive",
      duration: 3000,
    });
  };

  const processUserInput = async (userInput: string) => {
    setEngineStatus('processing');
    
    try {
      // Detect emotion and topic
      const emotion = detectEmotion(userInput);
      const topic = detectTopic(userInput);
      
      setLastEmotion(emotion);
      
      // Generate contextual response
      const response = generateContextualResponse(
        userInput, 
        emotion, 
        topic, 
        currentPersonality
      );
      
      // Create conversation entry
      const conversation: Conversation = {
        id: Date.now().toString(),
        timestamp: new Date(),
        userInput,
        mioraResponse: response,
        emotion,
        topic,
        confidence: 0.85
      };
      
      // Save conversation
      setConversations(prev => [...prev, conversation]);
      setConversationCount(prev => prev + 1);
      
      // Speak response
      await speakResponse(response, emotion);
      
    } catch (error) {
      console.error('Error processing user input:', error);
      setEngineStatus('error');
    }
  };

  const speakResponse = async (text: string, emotion: string = 'neutral') => {
    if (!synthesis || !text) return;
    
    setIsSpeaking(true);
    setEngineStatus('speaking');
    
    try {
      // Get voice settings based on emotion and personality
      const voiceSettings = getVoiceSettings(emotion, currentPersonality, voiceConfig);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voiceConfig.synthesis.language;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;
      
      // Try to get Indonesian voice
      const voices = synthesis.getVoices();
      const indonesianVoice = voices.find(voice => 
        voice.lang.includes('id') || voice.name.toLowerCase().includes('indonesia')
      );
      
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setEngineStatus('ready');
        if (isAutoResponseActive) {
          startAutoResponse();
        }
      };
      
      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        setIsSpeaking(false);
        setEngineStatus('error');
      };
      
      synthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsSpeaking(false);
      setEngineStatus('error');
    }
  };

  const startListening = () => {
    if (!recognition) {
      toast({
        title: "❌ Speech Recognition Unavailable",
        description: "Browser Anda tidak mendukung speech recognition",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (autoResponseTimer.current) {
      clearTimeout(autoResponseTimer.current);
    }
    
    try {
      recognition.start();
      setIsListening(true);
      setEngineStatus('listening');
    } catch (error) {
      console.error('Error starting recognition:', error);
      setEngineStatus('error');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setEngineStatus('ready');
  };

  const startAutoResponse = () => {
    if (!isAutoResponseActive) return;
    
    if (autoResponseTimer.current) {
      clearTimeout(autoResponseTimer.current);
    }
    
    autoResponseTimer.current = setTimeout(() => {
      if (!isListening && !isSpeaking && engineStatus === 'ready') {
        const autoMessage = getAutoResponseMessage(voiceConfig, lastEmotion);
        speakResponse(autoMessage, 'neutral');
      }
    }, voiceConfig.autoResponse.interval);
  };

  const toggleAutoResponse = () => {
    setIsAutoResponseActive(!isAutoResponseActive);
    if (autoResponseTimer.current) {
      clearTimeout(autoResponseTimer.current);
    }
    
    toast({
      title: isAutoResponseActive ? "🔇 Auto Response Off" : "🔊 Auto Response On",
      description: isAutoResponseActive 
        ? "MIORA tidak akan memulai percakapan otomatis" 
        : "MIORA akan memulai percakapan setiap 7 detik",
      duration: 3000,
    });
  };

  const changePersonality = (newPersonality: string) => {
    setCurrentPersonality(newPersonality);
    const personalityConfig = voiceConfig.personalities[newPersonality];
    
    if (personalityConfig) {
      speakResponse(personalityConfig.greeting, 'happy');
      
      toast({
        title: `🎭 Personality Changed`,
        description: `MIORA sekarang dalam mode: ${newPersonality}`,
        duration: 3000,
      });
    }
  };

  const getStatusColor = () => {
    switch (engineStatus) {
      case 'ready': return 'text-green-400';
      case 'listening': return 'text-blue-400';
      case 'processing': return 'text-yellow-400';
      case 'speaking': return 'text-purple-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (engineStatus) {
      case 'initializing': return 'Inisialisasi...';
      case 'ready': return 'Siap';
      case 'listening': return 'Mendengarkan...';
      case 'processing': return 'Memproses...';
      case 'speaking': return 'Berbicara...';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  // Convert conversations to the format expected by VoiceMemoryEngine
  const convertToConversationContext = (conversations: Conversation[]): ConversationContext[] => {
    const contextArray: ConversationContext[] = [];
    
    conversations.forEach(conv => {
      // Add user message
      contextArray.push({
        id: `${conv.id}-user`,
        timestamp: conv.timestamp.getTime(),
        speaker: 'user',
        content: conv.userInput,
        emotion: conv.emotion,
        topic: conv.topic,
        confidence: conv.confidence
      });
      
      // Add MIORA response
      contextArray.push({
        id: `${conv.id}-miora`,
        timestamp: conv.timestamp.getTime() + 1,
        speaker: 'miora',
        content: conv.mioraResponse,
        emotion: 'neutral',
        topic: conv.topic,
        confidence: conv.confidence
      });
    });
    
    return contextArray;
  };

  const handleClearMemory = () => {
    setConversations([]);
    setConversationCount(0);
    toast({
      title: "🧠 Memory Cleared",
      description: "Semua riwayat percakapan telah dihapus",
      duration: 3000,
    });
  };

  const handleExportMemory = () => {
    const data = JSON.stringify(conversations, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miora-conversation-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "📄 Memory Exported",
      description: "Riwayat percakapan telah diunduh",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">MIORA Voice Engine 2.0</h1>
            <Mic className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-lg">
            Sistem komunikasi suara dua arah dengan emosi dan konteks
          </p>
        </div>

        {/* Status Panel */}
        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Status Sistem
              </div>
              <Badge className={`${getStatusColor()} bg-gray-700/50`}>
                {getStatusText()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">{conversationCount}</div>
                <div className="text-sm text-gray-400">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300">{currentPersonality}</div>
                <div className="text-sm text-gray-400">Personality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">{lastEmotion}</div>
                <div className="text-sm text-gray-400">Last Emotion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-300">
                  {isAutoResponseActive ? 'ON' : 'OFF'}
                </div>
                <div className="text-sm text-gray-400">Auto Response</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voice Controls */}
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300">Voice Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  size="lg"
                  className={`rounded-full w-20 h-20 ${
                    isListening 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}
                  disabled={engineStatus === 'error' || engineStatus === 'initializing'}
                >
                  {isListening ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
                
                <Button
                  onClick={toggleAutoResponse}
                  size="lg"
                  variant="outline"
                  className={`rounded-full w-20 h-20 ${
                    isAutoResponseActive 
                      ? 'border-green-400 text-green-400' 
                      : 'border-gray-400 text-gray-400'
                  }`}
                >
                  {isAutoResponseActive ? (
                    <Volume2 className="w-8 h-8" />
                  ) : (
                    <VolumeX className="w-8 h-8" />
                  )}
                </Button>
              </div>
              
              {currentTranscript && (
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Last Input:</p>
                  <p className="text-white">{currentTranscript}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personality Selection */}
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">Personality Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(voiceConfig.personalities).map((personality) => (
                  <Button
                    key={personality}
                    onClick={() => changePersonality(personality)}
                    variant={currentPersonality === personality ? "default" : "outline"}
                    className={`justify-start ${
                      currentPersonality === personality 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {personality.charAt(0).toUpperCase() + personality.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversation History */}
        <Card className="bg-gray-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {conversations.slice(-5).reverse().map((conv) => (
                <div key={conv.id} className="p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {conv.timestamp.toLocaleTimeString()}
                    </span>
                    <Badge className="bg-purple-600/50 text-purple-200 ml-2">
                      {conv.emotion}
                    </Badge>
                    <Badge className="bg-blue-600/50 text-blue-200">
                      {conv.topic}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-cyan-400 mt-1" />
                      <p className="text-gray-300 text-sm">{conv.userInput}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-purple-400 mt-1" />
                      <p className="text-gray-200 text-sm">{conv.mioraResponse}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {conversations.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada percakapan. Mulai dengan menekan tombol microphone!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Memory Engine with converted data */}
        <VoiceMemoryEngine 
          conversations={convertToConversationContext(conversations)}
          onClearMemory={handleClearMemory}
          onExportMemory={handleExportMemory}
        />
      </div>
    </div>
  );
};

export default MIORAVoiceEngine2;
