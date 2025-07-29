
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Mic, Brain, Zap, ArrowRight, Volume2, Settings } from 'lucide-react';

const VoicePage = () => {
  const navigate = useNavigate();
  const [voiceActive, setVoiceActive] = useState(false);

  const voiceFeatures = [
    {
      title: 'Speech Recognition',
      description: 'Advanced voice input with real-time processing',
      icon: Mic,
      status: 'active'
    },
    {
      title: 'Text-to-Speech',
      description: 'Natural voice output with emotion expression',
      icon: Volume2,
      status: 'active'
    },
    {
      title: 'Context Awareness',
      description: 'Understanding conversation context and memory',
      icon: Brain,
      status: 'active'
    },
    {
      title: 'Voice Commands',
      description: 'System control through voice commands',
      icon: Settings,
      status: 'active'
    }
  ];

  const activateVoiceEngine = () => {
    setVoiceActive(true);
    setTimeout(() => {
      navigate('/voice-engine-2');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎤 MIORA Voice System
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced AI voice interaction and control center
          </p>
        </div>

        {/* Voice Engine 2.0 Activation */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border-2 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-cyan-300 flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 animate-pulse" />
              MIORA Voice Engine 2.0
              <Mic className="w-8 h-8 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Button
                onClick={activateVoiceEngine}
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-bold py-6 px-12 rounded-full text-xl"
              >
                {voiceActive ? (
                  <>
                    <Zap className="w-6 h-6 mr-3 animate-spin" />
                    Activating Voice Engine 2.0...
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 mr-3" />
                    Launch Voice Engine 2.0
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Voice Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {voiceFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-3">
                    <IconComponent className="w-6 h-6" />
                    {feature.title}
                    <Badge className="bg-green-600 text-white ml-auto">
                      {feature.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate('/voice-engine-2')}
                className="bg-gradient-to-r from-purple-600 to-cyan-600"
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice Engine 2.0
              </Button>
              <Button
                onClick={() => navigate('/voice-diagnostics')}
                variant="outline"
                className="border-purple-400/50 text-purple-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Voice Diagnostics
              </Button>
              <Button
                onClick={() => navigate('/settings')}
                variant="outline"
                className="border-cyan-400/50 text-cyan-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Voice Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoicePage;
