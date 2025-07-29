import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useGroqIntegration } from '@/components/GroqIntegration';
import { VoiceAssistant } from '@/components/MIORA/VoiceAssistant';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare,
  Activity,
  Waves
} from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'miora';
  timestamp: number;
  type?: 'voice' | 'text';
}

interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  confidence: number;
}

const MIORASimpleVoiceChat: React.FC = () => {
  const { toast } = useToast();
  const voiceAssistant = VoiceAssistant();
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>('ready');

  // Voice State
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
    currentTranscript: '',
    confidence: 0
  });

  // Voice recognition refs
  const recognitionRef = useRef<any>(null);
  const isProcessingRef = useRef(false);

  // Groq integration
  const { sendToGroq } = useGroqIntegration(
    async (response: string) => {
      const assistantMessage: Message = {
        text: response,
        sender: 'miora',
        timestamp: Date.now(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
      
      // Update voice state to speaking
      setVoiceState(prev => ({ ...prev, isSpeaking: true }));
      
      // Speak the response with proper error handling
      try {
        await voiceAssistant.speak(response);
      } catch (error) {
        console.error('Error speaking response:', error);
      } finally {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        // Resume listening after speaking
        setTimeout(() => {
          if (recognitionRef.current && !isProcessingRef.current) {
            try {
              recognitionRef.current.start();
            } catch (error) {
              console.log('Recognition already started or not available');
            }
          }
        }, 500);
      }
    },
    messages
  );

  // Initialize voice recognition
  useEffect(() => {
    initializeVoiceRecognition();
    
    // Auto-start with greeting
    setTimeout(() => {
      handleAutoGreeting();
    }, 1000);

    return () => {
      cleanup();
    };
  }, []);

  const initializeVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionClass();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'id-ID';
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onresult = handleVoiceResult;
      recognitionRef.current.onend = handleVoiceEnd;
      recognitionRef.current.onerror = handleVoiceError;
      recognitionRef.current.onstart = () => {
        setVoiceState(prev => ({ ...prev, isListening: true }));
      };
    }
  };

  const handleAutoGreeting = async () => {
    const greetingMessage = "Halo! Saya MIORA, AI assistant yang siap membantu Anda. Saya dapat berkomunikasi melalui suara dan teks. Bagaimana saya bisa membantu Anda hari ini?";
    
    const assistantMessage: Message = {
      text: greetingMessage,
      sender: 'miora',
      timestamp: Date.now(),
      type: 'text'
    };
    
    setMessages([assistantMessage]);
    setCurrentStatus('active');
    
    // Speak greeting with proper state management
    setTimeout(async () => {
      setVoiceState(prev => ({ ...prev, isSpeaking: true }));
      try {
        await voiceAssistant.speak(greetingMessage);
      } catch (error) {
        console.error('Error speaking greeting:', error);
      } finally {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
        // Start listening after greeting
        setTimeout(() => {
          if (recognitionRef.current && !isProcessingRef.current) {
            try {
              recognitionRef.current.start();
            } catch (error) {
              console.log('Recognition already started or not available');
            }
          }
        }, 500);
      }
    }, 1000);
  };

  const handleVoiceResult = (event: any) => {
    if (isProcessingRef.current) return;
    
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    const confidence = event.results[current][0].confidence;
    
    setVoiceState(prev => ({
      ...prev,
      currentTranscript: transcript,
      confidence: confidence * 100
    }));
    
    if (event.results[current].isFinal && transcript.trim().length > 0) {
      handleVoiceInput(transcript, confidence);
    }
  };

  const handleVoiceEnd = () => {
    setVoiceState(prev => ({ ...prev, isListening: false }));
  };

  const handleVoiceError = (event: any) => {
    console.error('Voice recognition error:', event.error);
    setVoiceState(prev => ({ ...prev, isListening: false }));
    
    // Only show error for significant issues, not for common ones
    if (event.error !== 'no-speech' && event.error !== 'aborted') {
      toast({
        title: "🎤 Voice Error",
        description: `Masalah dengan voice recognition: ${event.error}. Coba lagi.`,
        variant: "destructive",
      });
    }
    
    // Auto-retry listening after a short delay for recoverable errors
    if (event.error === 'no-speech' || event.error === 'audio-capture') {
      setTimeout(() => {
        if (recognitionRef.current && !isProcessingRef.current) {
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.log('Cannot restart recognition:', error);
          }
        }
      }, 2000);
    }
  };

  const handleVoiceInput = async (transcript: string, confidence: number) => {
    if (!transcript.trim() || isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    
    // Stop listening while processing
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const userMessage: Message = {
      text: transcript,
      sender: 'user',
      timestamp: Date.now(),
      type: 'voice'
    };

    setMessages(prev => [...prev, userMessage]);
    setVoiceState(prev => ({ ...prev, isProcessing: true }));
    setIsThinking(true);
    setCurrentStatus('processing');

    try {
      // Send to Groq for processing
      await sendToGroq(transcript);
      setCurrentStatus('active');
    } catch (error) {
      console.error('Error processing voice input:', error);
      
      // Add fallback response when AI is unavailable
      const fallbackResponse = "Maaf, saya mengalami masalah teknis saat ini. Sistem AI sedang dalam pemeliharaan atau quota habis. Silakan coba lagi nanti atau gunakan perintah sederhana.";
      
      const fallbackMessage: Message = {
        text: fallbackResponse,
        sender: 'miora',
        timestamp: Date.now(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      setIsThinking(false);
      
      // Speak the fallback response
      try {
        setVoiceState(prev => ({ ...prev, isSpeaking: true }));
        await voiceAssistant.speak(fallbackResponse);
      } catch (speechError) {
        console.error('Error speaking fallback response:', speechError);
      } finally {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      }
      
      toast({
        title: "⚠️ AI Service Unavailable",
        description: "Sistem AI sedang maintenance. Menggunakan mode fallback.",
        variant: "destructive",
      });
      
      setCurrentStatus('error');
      
      // Resume listening after a delay
      setTimeout(() => {
        if (recognitionRef.current && !isProcessingRef.current) {
          try {
            recognitionRef.current.start();
            setCurrentStatus('active');
          } catch (error) {
            console.log('Cannot restart recognition:', error);
          }
        }
      }, 3000);
    } finally {
      setVoiceState(prev => ({ ...prev, isProcessing: false }));
      isProcessingRef.current = false;
    }
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
    } else {
      if (!isProcessingRef.current) {
        recognitionRef.current.start();
      }
    }
  };

  const toggleSpeaking = async () => {
    if (voiceState.isSpeaking) {
      speechSynthesis.cancel();
      setVoiceState(prev => ({ ...prev, isSpeaking: false }));
    } else {
      const testMessage = "MIORA voice system aktif dan siap berkomunikasi dengan Anda";
      setVoiceState(prev => ({ ...prev, isSpeaking: true }));
      try {
        await voiceAssistant.speak(testMessage);
      } catch (error) {
        console.error('Error testing voice:', error);
      } finally {
        setVoiceState(prev => ({ ...prev, isSpeaking: false }));
      }
    }
  };

  const cleanup = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    speechSynthesis.cancel();
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'ready': case 'active': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-3xl font-bold text-white">MIORA Simple Voice Chat</h1>
            <Mic className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-lg text-cyan-200">
            Conversational AI dengan Voice Interface yang Mudah Digunakan
          </p>
          <div className="flex justify-center gap-4">
            <Badge className={`${getStatusColor()} text-white px-4 py-2`}>
              Status: {currentStatus.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-cyan-400 text-cyan-300">
              Groq Integration: Active
            </Badge>
          </div>
        </div>

        {/* Voice Controls */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5" />
                Voice Controls
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
            <div className="flex gap-4 justify-center">
              <Button
                onClick={toggleVoiceListening}
                size="lg"
                className={`px-6 py-3 ${
                  voiceState.isListening 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                }`}
                disabled={voiceState.isProcessing}
              >
                {voiceState.isListening ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                {voiceState.isListening ? 'Stop Listening' : 'Start Listening'}
              </Button>
              
              <Button
                onClick={toggleSpeaking}
                size="lg"
                variant="outline"
                className={`px-6 py-3 ${
                  voiceState.isSpeaking 
                    ? 'border-green-500 text-green-400' 
                    : 'border-gray-500 text-gray-300'
                }`}
              >
                {voiceState.isSpeaking ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
                {voiceState.isSpeaking ? 'Speaking' : 'Test Voice'}
              </Button>
            </div>
            
            {voiceState.currentTranscript && (
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Current Transcript:</p>
                <p className="text-white">{voiceState.currentTranscript}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">
                    Confidence: {voiceState.confidence.toFixed(1)}%
                  </span>
                  {voiceState.isProcessing && (
                    <span className="text-xs text-blue-400 animate-pulse">
                      Processing...
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
                  <p className="text-gray-400 text-lg">MIORA Ready</p>
                  <p className="text-sm text-gray-500">Mulai berbicara atau ketik pesan</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 ml-8' 
                        : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 mr-8'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.sender === 'user' ? (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {message.type === 'voice' ? '🎤' : 'U'}
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white leading-relaxed">{message.text}</p>
                        <span className="text-xs text-gray-400 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {isThinking && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-500/30 mr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white animate-spin" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-300 animate-pulse">MIORA is thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORASimpleVoiceChat;