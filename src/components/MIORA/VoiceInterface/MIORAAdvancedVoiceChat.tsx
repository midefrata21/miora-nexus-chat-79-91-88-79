import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { LocalLLMEngine } from '../Conversation/engines/LocalLLMEngine';
import InteractiveChatInterface from '@/components/InteractiveChatInterface';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare,
  Zap,
  Activity,
  Cpu,
  Waves,
  Settings
} from 'lucide-react';
import MIORAAPIKeyManager from './components/MIORAAPIKeyManager';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  type?: 'text' | 'voice' | 'command';
}

interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  confidence: number;
  audioLevel: number;
}

interface ConversationMetrics {
  responseTime: number;
  voiceAccuracy: number;
  conversationTurns: number;
  llmTokensUsed: number;
  voiceProcessingLatency: number;
}

const MIORAAdvancedVoiceChat: React.FC = () => {
  const { toast } = useToast();
  
  // LLM Engine
  const {
    initializeLocalLLM,
    generateResponse,
    getModelStats,
    isLoaded: isLLMLoaded,
    currentModel,
    isInitializing
  } = LocalLLMEngine();

  // Voice State
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    currentTranscript: '',
    confidence: 0,
    audioLevel: 0
  });

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isLearning, setIsLearning] = useState(false);
  const [brainActivity, setBrainActivity] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('initializing');
  const [showAPISettings, setShowAPISettings] = useState(false);
  const [hasValidAPIKey, setHasValidAPIKey] = useState(false);

  // Metrics
  const [metrics, setMetrics] = useState<ConversationMetrics>({
    responseTime: 0,
    voiceAccuracy: 85,
    conversationTurns: 0,
    llmTokensUsed: 0,
    voiceProcessingLatency: 0
  });

  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const recognitionRef = useRef<any>(null);
  const conversationContextRef = useRef<string>('');

  // Initialize system
  useEffect(() => {
    initializeSystem();
    return () => {
      cleanup();
    };
  }, []);

  const initializeSystem = async () => {
    try {
      setCurrentStatus('initializing');
      
      toast({
        title: "🚀 Menginisialisasi MIORA Voice Chat",
        description: "Loading LLM engine dan voice processing system...",
        duration: 3000,
      });

      // Initialize LLM
      await initializeLocalLLM();
      
      // Initialize voice recognition
      await initializeVoiceRecognition();
      
      setCurrentStatus('ready');
      
      toast({
        title: "✅ MIORA Voice Chat Siap",
        description: "Sistem percakapan suara dengan AI lokal telah aktif",
        duration: 4000,
      });

      // Auto-start with greeting
      setTimeout(() => {
        handleAutoGreeting();
      }, 1000);

    } catch (error) {
      console.error('System initialization error:', error);
      setCurrentStatus('error');
      toast({
        title: "❌ Gagal Inisialisasi",
        description: "Error saat memulai sistem voice chat",
        variant: "destructive",
      });
    }
  };

  const initializeVoiceRecognition = async () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionClass();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'id-ID';
      
      recognitionRef.current.onresult = handleVoiceResult;
      recognitionRef.current.onend = handleVoiceEnd;
      recognitionRef.current.onerror = handleVoiceError;
    }
  };

  const handleAutoGreeting = async () => {
    const greetingMessage = "Halo! Saya MIORA, AI assistant yang siap membantu Anda. Saya dapat berkomunikasi melalui suara dan teks. Bagaimana saya bisa membantu Anda hari ini?";
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: greetingMessage,
      timestamp: Date.now(),
      type: 'text'
    };
    
    setMessages([assistantMessage]);
    await speakText(greetingMessage);
  };

  const handleVoiceResult = (event: any) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    const confidence = event.results[current][0].confidence;
    
    setVoiceState(prev => ({
      ...prev,
      currentTranscript: transcript,
      confidence: confidence * 100
    }));
    
    if (event.results[current].isFinal) {
      handleVoiceInput(transcript, confidence);
    }
  };

  const handleVoiceEnd = () => {
    setVoiceState(prev => ({ ...prev, isListening: false }));
  };

  const handleVoiceError = (event: any) => {
    console.error('Voice recognition error:', event.error);
    setVoiceState(prev => ({ ...prev, isListening: false }));
    toast({
      title: "🎤 Voice Error",
      description: "Masalah dengan voice recognition",
      variant: "destructive",
    });
  };

  const handleVoiceInput = async (transcript: string, confidence: number) => {
    if (!transcript.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: transcript,
      timestamp: Date.now(),
      type: 'voice'
    };

    setMessages(prev => [...prev, userMessage]);
    setVoiceState(prev => ({ ...prev, isProcessing: true }));
    
    await processUserInput(transcript);
  };

  const handleTextSubmit = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    await processUserInput(input);
  };

  const processUserInput = async (input: string) => {
    const startTime = Date.now();
    
    setIsThinking(true);
    setIsLearning(true);
    setBrainActivity(Math.random() * 40 + 60);
    setCurrentStatus('processing');

    try {
      // Update conversation context
      conversationContextRef.current += `\nUser: ${input}`;
      
      // Ensure LLM is initialized before generating response
      if (!isLLMLoaded && !isInitializing) {
        console.log('🔄 LLM not loaded, initializing...');
        await initializeLocalLLM();
      }
      
      // Generate LLM response
      const llmResponse = await generateResponse(input, conversationContextRef.current);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: llmResponse.content,
        timestamp: Date.now(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update conversation context
      conversationContextRef.current += `\nMIORA: ${llmResponse.content}`;
      
      // Speak the response
      await speakText(llmResponse.content);
      
      // Update metrics
      const responseTime = Date.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        responseTime,
        conversationTurns: prev.conversationTurns + 1,
        llmTokensUsed: prev.llmTokensUsed + llmResponse.tokenCount
      }));

      setCurrentStatus('active');

    } catch (error) {
      console.error('Error processing input:', error);
      toast({
        title: "❌ Processing Error",
        description: "Gagal memproses input",
        variant: "destructive",
      });
    } finally {
      setIsThinking(false);
      setIsLearning(false);
      setVoiceState(prev => ({ ...prev, isProcessing: false }));
      setBrainActivity(Math.random() * 20 + 10);
    }
  };

  const speakText = async (text: string) => {
    if (!text.trim()) return;

    setVoiceState(prev => ({ ...prev, isSpeaking: true }));

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        resolve();
      };
      
      utterance.onerror = () => {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        resolve();
      };
      
      speechSynthesis.speak(utterance);
    });
  };

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "❌ Voice Recognition Unavailable",
        description: "Browser tidak mendukung voice recognition",
        variant: "destructive",
      });
      return;
    }

    if (voiceState.isListening) {
      recognitionRef.current.stop();
      setVoiceState(prev => ({ ...prev, isListening: false }));
    } else {
      recognitionRef.current.start();
      setVoiceState(prev => ({ ...prev, isListening: true }));
    }
  };

  const toggleSpeaking = () => {
    if (voiceState.isSpeaking) {
      speechSynthesis.cancel();
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    } else {
      const testMessage = "MIORA voice system aktif dan siap berkomunikasi";
      speakText(testMessage);
    }
  };

  const cleanup = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    speechSynthesis.cancel();
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  // Real-time metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setBrainActivity(prev => {
        if (isThinking) return Math.random() * 40 + 60;
        if (voiceState.isProcessing) return Math.random() * 30 + 50;
        return Math.random() * 20 + 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isThinking, voiceState.isProcessing]);

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'ready': case 'active': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'initializing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const modeConfig = {
    name: 'MIORA Voice Chat',
    icon: '🎤'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-12 h-12 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">MIORA Advanced Voice Chat</h1>
            <Mic className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-xl text-cyan-200">
            Conversational AI dengan Voice Interface & Local LLM Integration
          </p>
          <div className="flex justify-center gap-4">
            <Badge className={`${getStatusColor()} text-white px-4 py-2`}>
              Status: {currentStatus.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-cyan-400 text-cyan-300">
              Model: {currentModel}
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-300">
              Brain Activity: {Math.round(brainActivity)}%
            </Badge>
          </div>
        </div>

        {/* Voice Controls Panel */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6" />
                Voice Control Center
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${voiceState.isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span className="text-sm">Listening</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${voiceState.isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span className="text-sm">Speaking</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Voice Controls */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Voice Controls
                </h3>
                <div className="flex gap-3">
                  <Button
                    onClick={toggleVoiceListening}
                    size="lg"
                    className={`flex-1 ${
                      voiceState.isListening 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    }`}
                  >
                    {voiceState.isListening ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                    {voiceState.isListening ? 'Stop' : 'Listen'}
                  </Button>
                  <Button
                    onClick={toggleSpeaking}
                    size="lg"
                    variant="outline"
                    className={`flex-1 ${
                      voiceState.isSpeaking 
                        ? 'border-green-500 text-green-400' 
                        : 'border-gray-500 text-gray-300'
                    }`}
                  >
                    {voiceState.isSpeaking ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
                    {voiceState.isSpeaking ? 'Speaking' : 'Test Voice'}
                  </Button>
                </div>
              </div>

              {/* Voice Metrics */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Voice Metrics
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Voice Accuracy:</span>
                    <span className="text-white">{metrics.voiceAccuracy}%</span>
                  </div>
                  <Progress value={metrics.voiceAccuracy} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Confidence:</span>
                    <span className="text-white">{voiceState.confidence.toFixed(1)}%</span>
                  </div>
                  <Progress value={voiceState.confidence} className="h-2" />
                </div>
              </div>

              {/* LLM Metrics */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  LLM Metrics
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Response Time:</span>
                    <span className="text-white">{metrics.responseTime}ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Conversation Turns:</span>
                    <span className="text-white">{metrics.conversationTurns}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Tokens Used:</span>
                    <span className="text-white">{metrics.llmTokensUsed}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Transcript */}
            {voiceState.currentTranscript && (
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-cyan-500/30">
                <h4 className="text-cyan-300 font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Live Transcript
                </h4>
                <p className="text-white">{voiceState.currentTranscript}</p>
              </div>
            )}

            {/* API Key Settings */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-700/30 to-purple-700/30 border border-gray-600/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-purple-300">AI Enhancement Settings</h3>
                <Button
                  onClick={() => setShowAPISettings(!showAPISettings)}
                  variant="outline"
                  size="sm"
                  className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showAPISettings ? 'Hide' : 'Configure'}
                </Button>
              </div>
              
              {showAPISettings && (
                <MIORAAPIKeyManager onKeyValidated={setHasValidAPIKey} />
              )}
              
              {!showAPISettings && (
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${hasValidAPIKey ? 'bg-green-400' : 'bg-orange-400'}`}></div>
                  <span className="text-gray-300">
                    {hasValidAPIKey ? 'OpenAI API aktif - respons yang lebih cerdas' : 'Menggunakan intelligent fallback responses'}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <InteractiveChatInterface
          messages={messages}
          isLoading={false}
          isThinking={isThinking}
          isListening={voiceState.isListening}
          isSpeaking={voiceState.isSpeaking}
          isLearning={isLearning}
          modeConfig={modeConfig}
          onSubmit={handleTextSubmit}
          onVoiceToggle={toggleVoiceListening}
          onSpeakToggle={toggleSpeaking}
          currentStatus={currentStatus}
          brainActivity={brainActivity}
        />
      </div>
    </div>
  );
};

export default MIORAAdvancedVoiceChat;