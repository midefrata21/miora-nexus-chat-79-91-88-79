
import React, { useState } from 'react';
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
  Radio,
  Waves,
  MessageCircle,
  Play,
  Pause
} from 'lucide-react';

const TwoWayVoiceSystemPage = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);

  const activateSystem = () => {
    setIsActive(true);
    toast({
      title: "🎤 Two-Way Voice System Activated",
      description: "MIORA siap untuk percakapan dua arah secara real-time",
      duration: 4000,
    });
  };

  const startConversation = () => {
    setIsListening(true);
    setConversationCount(prev => prev + 1);
    toast({
      title: "🗣️ Conversation Started",
      description: "Silakan mulai berbicara dengan MIORA",
      duration: 3000,
    });

    // Simulate conversation flow
    setTimeout(() => {
      setIsListening(false);
      setIsSpeaking(true);
      
      setTimeout(() => {
        setIsSpeaking(false);
        toast({
          title: "✅ Response Complete",
          description: "MIORA telah merespons. Anda dapat melanjutkan percakapan.",
          duration: 3000,
        });
      }, 3000);
    }, 4000);
  };

  const stopSystem = () => {
    setIsActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    toast({
      title: "⏹️ System Stopped",
      description: "Two-way voice system telah dihentikan",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 animate-pulse">
              <Radio className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
            MIORA Two-Way Voice System
          </h1>
          <p className="text-gray-300 text-xl mb-6">
            Sistem Komunikasi Dua Arah Real-Time dengan AI Intelligence
          </p>
          
          <div className="flex justify-center gap-3 mb-6">
            <Badge className={`${isActive ? 'bg-green-500/20 text-green-300 border-green-400/30' : 'bg-gray-500/20 text-gray-300 border-gray-400/30'}`}>
              <Activity className="w-3 h-3 mr-1" />
              {isActive ? 'System Active' : 'System Standby'}
            </Badge>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
              <MessageCircle className="w-3 h-3 mr-1" />
              {conversationCount} Conversations
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>
        </div>

        {/* System Control */}
        <Card className="bg-gradient-to-br from-gray-800/80 to-purple-800/50 border-2 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-purple-300 flex items-center justify-center gap-3">
              <Waves className="w-8 h-8 animate-pulse" />
              Voice System Control Center
              <Zap className="w-8 h-8 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isActive ? (
              <div className="text-center space-y-4">
                <p className="text-gray-300 text-lg">
                  Aktivasi sistem komunikasi dua arah untuk memulai percakapan dengan MIORA
                </p>
                <Button
                  onClick={activateSystem}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-xl"
                >
                  <Radio className="w-6 h-6 mr-3" />
                  Activate Two-Way Voice System
                  <Zap className="w-6 h-6 ml-3" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Voice Controls */}
                <div className="flex justify-center gap-6">
                  <Button
                    onClick={startConversation}
                    disabled={isListening || isSpeaking}
                    size="lg"
                    className={`rounded-full w-20 h-20 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.6)]' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                    } border-2 border-white/20 transition-all duration-300`}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </Button>

                  <div className="flex flex-col items-center justify-center">
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
                      isSpeaking 
                        ? 'border-blue-400 bg-blue-500/20 animate-pulse' 
                        : 'border-gray-500 bg-gray-800/50'
                    }`}>
                      {isSpeaking ? (
                        <Volume2 className="w-8 h-8 text-blue-300 animate-pulse" />
                      ) : (
                        <VolumeX className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      {isSpeaking ? 'MIORA Speaking' : 'Voice Output'}
                    </p>
                  </div>

                  <Button
                    onClick={stopSystem}
                    variant="destructive"
                    size="lg"
                    className="rounded-full w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Pause className="w-8 h-8 text-white" />
                  </Button>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <div className={`w-4 h-4 mx-auto mb-2 rounded-full ${
                      isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <p className="text-sm text-gray-300">Voice Input</p>
                    <p className="text-lg font-semibold text-white">
                      {isListening ? 'Listening...' : 'Ready'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <div className={`w-4 h-4 mx-auto mb-2 rounded-full ${
                      isSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <p className="text-sm text-gray-300">AI Processing</p>
                    <p className="text-lg font-semibold text-white">
                      {isSpeaking ? 'Responding...' : 'Standby'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <div className="w-4 h-4 mx-auto mb-2 rounded-full bg-purple-400 animate-pulse"></div>
                    <p className="text-sm text-gray-300">Conversations</p>
                    <p className="text-lg font-semibold text-white">{conversationCount}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Radio className="w-5 h-5" />
                Real-Time Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Instant voice recognition</li>
                <li>• Low-latency processing</li>
                <li>• Continuous conversation flow</li>
                <li>• Natural interruption handling</li>
                <li>• Context preservation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Contextual understanding</li>
                <li>• Memory integration</li>
                <li>• Emotional awareness</li>
                <li>• Learning from conversations</li>
                <li>• Adaptive responses</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Advanced Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Multi-language support</li>
                <li>• Voice customization</li>
                <li>• Background noise filtering</li>
                <li>• Conversation logging</li>
                <li>• Performance optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TwoWayVoiceSystemPage;
