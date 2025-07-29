import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useMioraVoiceEngine } from '@/hooks/useMioraVoiceEngine';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain,
  MessageCircle,
  Zap,
  Activity,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

interface InteractiveCommunicationProps {
  onVoiceInteraction?: (input: string) => Promise<string>;
  onStatusChange?: (status: string) => void;
}

const MioraInteractiveCommunication: React.FC<InteractiveCommunicationProps> = ({
  onVoiceInteraction,
  onStatusChange
}) => {
  const {
    isInitialized,
    isListening,
    isSpeaking,
    isProcessing,
    voiceEnabled,
    currentTranscript,
    conversationHistory,
    lastResponse,
    voiceSettings,
    isInteractiveMode,
    startInteractiveListening,
    stopInteractiveListening,
    speak,
    stopSpeaking,
    toggleInteractiveMode,
    clearConversationHistory,
    getVoiceMetrics,
    hasVoiceSupport,
    isReady
  } = useMioraVoiceEngine();

  const [communicationActive, setCommunicationActive] = useState(false);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    if (conversationHistory.length > 0) {
      setInteractionCount(Math.floor(conversationHistory.length / 2));
    }
  }, [conversationHistory]);

  useEffect(() => {
    if (lastResponse) {
      const currentTime = Date.now();
      const userMessage = conversationHistory
        .filter(msg => msg.type === 'user')
        .pop();
      
      if (userMessage) {
        setResponseTime(currentTime - userMessage.timestamp);
      }
    }
  }, [lastResponse, conversationHistory]);

  const handleStartCommunication = async () => {
    if (!onVoiceInteraction) {
      console.warn('No voice interaction handler provided');
      return;
    }

    setCommunicationActive(true);
    onStatusChange?.('Komunikasi interaktif dimulai');
    
    await startInteractiveListening(async (input: string) => {
      onStatusChange?.('Memproses input suara...');
      const response = await onVoiceInteraction(input);
      onStatusChange?.('Memberikan respons...');
      return response;
    });
  };

  const handleStopCommunication = () => {
    setCommunicationActive(false);
    stopInteractiveListening();
    onStatusChange?.('Komunikasi interaktif dihentikan');
  };

  const handleVoiceToggle = () => {
    if (communicationActive) {
      handleStopCommunication();
    } else {
      handleStartCommunication();
    }
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      toggleInteractiveMode();
    }
  };

  const testCommunication = () => {
    const testMessage = "Halo, saya MIORA. Sistem komunikasi dua arah telah aktif. Saya siap berinteraksi dengan Anda secara natural dan responsif.";
    speak(testMessage);
  };

  const voiceMetrics = getVoiceMetrics();

  const getStatusColor = () => {
    if (isProcessing) return 'from-yellow-400 to-orange-400';
    if (isSpeaking) return 'from-green-400 to-cyan-400';
    if (isListening) return 'from-blue-400 to-purple-400';
    if (communicationActive) return 'from-cyan-400 to-blue-400';
    return 'from-gray-400 to-gray-600';
  };

  const getStatusText = () => {
    if (isProcessing) return 'Memproses input...';
    if (isSpeaking) return 'MIORA sedang berbicara';
    if (isListening) return 'Mendengarkan Anda...';
    if (communicationActive) return 'Siap berinteraksi';
    return 'Komunikasi tidak aktif';
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-purple-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          MIORA Interactive Communication System
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isReady ? "default" : "secondary"} className="bg-green-600">
            {isReady ? "System Ready" : "Initializing"}
          </Badge>
          <Badge variant="outline" className="border-cyan-400 text-cyan-300">
            {isInteractiveMode ? "Interactive Mode" : "Manual Mode"}
          </Badge>
          {hasVoiceSupport && (
            <Badge variant="outline" className="border-green-400 text-green-300">
              <CheckCircle className="w-3 h-3 mr-1" />
              Voice Support
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status Display */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${getStatusColor()} rounded-full shadow-lg mb-4`}>
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-lg">{getStatusText()}</span>
          </div>
          
          {currentTranscript && (
            <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">Transcript: "{currentTranscript}"</p>
            </div>
          )}
        </div>

        {/* Communication Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleVoiceToggle}
            disabled={!isReady}
            size="lg"
            className={`rounded-full w-20 h-20 ${
              communicationActive 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            } border-2 border-white/20 transition-all duration-300 backdrop-blur-sm`}
          >
            {communicationActive ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </Button>

          <Button
            onClick={handleSpeakToggle}
            disabled={!isReady}
            size="lg"
            variant="outline"
            className={`rounded-full w-20 h-20 ${
              voiceEnabled && !isSpeaking
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                : 'bg-gray-800/50 border-gray-500/50 shadow-[0_0_15px_rgba(107,114,128,0.3)]'
            } backdrop-blur-sm transition-all duration-300`}
          >
            {voiceEnabled && !isSpeaking ? (
              <Volume2 className="w-8 h-8 text-green-400" />
            ) : (
              <VolumeX className="w-8 h-8 text-gray-400" />
            )}
          </Button>

          <Button
            onClick={testCommunication}
            disabled={!isReady}
            size="lg"
            variant="outline"
            className="rounded-full w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 hover:bg-purple-500/30 backdrop-blur-sm transition-all duration-300"
          >
            <Zap className="w-8 h-8 text-purple-400" />
          </Button>
        </div>

        {/* Communication Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <MessageCircle className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
            <p className="text-xs text-gray-300">Interactions</p>
            <p className="text-lg font-semibold text-white">{interactionCount}</p>
          </div>
          
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <p className="text-xs text-gray-300">Response Time</p>
            <p className="text-lg font-semibold text-white">
              {responseTime > 0 ? `${(responseTime / 1000).toFixed(1)}s` : '--'}
            </p>
          </div>
          
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <p className="text-xs text-gray-300">Voice Quality</p>
            <p className="text-sm font-semibold text-white">
              {voiceMetrics.voiceQuality.includes('Neural') ? 'High' : 'Standard'}
            </p>
          </div>
          
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <p className="text-xs text-gray-300">Mode</p>
            <p className="text-sm font-semibold text-white">
              {voiceMetrics.interactionMode}
            </p>
          </div>
        </div>

        {/* Conversation History */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Riwayat Komunikasi</h3>
            <Button
              onClick={clearConversationHistory}
              size="sm"
              variant="outline"
              className="border-red-400/50 text-red-300 hover:bg-red-400/20"
            >
              Clear History
            </Button>
          </div>
          
          <ScrollArea className="h-[200px] p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
            {conversationHistory.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p className="text-gray-400">Belum ada percakapan</p>
                <p className="text-sm text-gray-500">Mulai komunikasi untuk melihat riwayat</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversationHistory.map((message, index) => (
                  <div key={index} className="space-y-2">
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600/20 border-l-4 border-blue-400' 
                        : 'bg-green-600/20 border-l-4 border-green-400'
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className={`text-sm font-semibold ${
                          message.type === 'user' ? 'text-blue-300' : 'text-green-300'
                        }`}>
                          {message.type === 'user' ? 'You' : 'MIORA'}:
                        </span>
                        <span className="text-white text-sm">{message.text}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Communication Features */}
        <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border border-cyan-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Fitur Komunikasi Dua Arah</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Real-time Voice Recognition
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Natural Language Processing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Contextual Response Generation
              </li>
            </ul>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Adaptive Communication Style
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Multi-turn Conversation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Response Accuracy Optimization
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MioraInteractiveCommunication;
