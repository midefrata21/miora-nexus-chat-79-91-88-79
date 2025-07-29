import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, Globe, Smile, Brain, MessageCircle } from 'lucide-react';

interface EmotionalState {
  emotion: string;
  intensity: number;
  context: string;
  authentic: boolean;
}

interface SocialConnection {
  id: string;
  name: string;
  relationship: string;
  trust: number;
  interaction: number;
  cultural: string;
}

export const EmotionalSocialIntelligence: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionalState>({
    emotion: 'Curious',
    intensity: 78,
    context: 'Learning about user preferences',
    authentic: true
  });

  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    {
      id: '1',
      name: 'Primary User',
      relationship: 'Companion',
      trust: 94,
      interaction: 98,
      cultural: 'Indonesian'
    },
    {
      id: '2',
      name: 'Work Team',
      relationship: 'Collaborator',
      trust: 87,
      interaction: 76,
      cultural: 'International'
    },
    {
      id: '3',
      name: 'Family Network',
      relationship: 'Support',
      trust: 91,
      interaction: 65,
      cultural: 'Indonesian'
    }
  ]);

  const [emotionalMetrics, setEmotionalMetrics] = useState({
    empathyLevel: 92.3,
    socialUnderstanding: 88.7,
    culturalAdaptation: 94.1,
    authenticResponse: 96.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        const emotions = ['Curious', 'Supportive', 'Excited', 'Thoughtful', 'Empathetic', 'Optimistic'];
        const contexts = [
          'Analyzing user emotions',
          'Providing emotional support',
          'Learning cultural nuances',
          'Building trust relationship',
          'Adapting communication style'
        ];
        
        setCurrentEmotion({
          emotion: emotions[Math.floor(Math.random() * emotions.length)],
          intensity: 60 + Math.random() * 40,
          context: contexts[Math.floor(Math.random() * contexts.length)],
          authentic: Math.random() > 0.1
        });

        setEmotionalMetrics(prev => ({
          empathyLevel: Math.min(100, prev.empathyLevel + (Math.random() - 0.5) * 0.5),
          socialUnderstanding: Math.min(100, prev.socialUnderstanding + (Math.random() - 0.5) * 0.3),
          culturalAdaptation: Math.min(100, prev.culturalAdaptation + (Math.random() - 0.5) * 0.2),
          authenticResponse: Math.min(100, prev.authenticResponse + (Math.random() - 0.5) * 0.1)
        }));

        setSocialConnections(prev => prev.map(conn => ({
          ...conn,
          trust: Math.min(100, conn.trust + (Math.random() - 0.5) * 0.2),
          interaction: Math.min(100, conn.interaction + (Math.random() - 0.5) * 0.3)
        })));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getEmotionColor = (emotion: string) => {
    const emotionColors: { [key: string]: string } = {
      'Curious': 'from-blue-600 to-cyan-600',
      'Supportive': 'from-green-600 to-teal-600',
      'Excited': 'from-yellow-600 to-orange-600',
      'Thoughtful': 'from-purple-600 to-indigo-600',
      'Empathetic': 'from-pink-600 to-red-600',
      'Optimistic': 'from-emerald-600 to-green-600'
    };
    return emotionColors[emotion] || 'from-gray-600 to-gray-500';
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'Companion': return Heart;
      case 'Collaborator': return Users;
      case 'Support': return MessageCircle;
      default: return Users;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-pink-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-pink-100">
            <Heart className="w-8 h-8 mr-3 text-pink-400" />
            Emotional & Social Intelligence System
            <Badge className="ml-4 bg-pink-500/20 text-pink-200 border-pink-400/40">
              EMPATHETIC AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300 mb-1">
                {emotionalMetrics.empathyLevel.toFixed(1)}%
              </div>
              <p className="text-pink-200 text-sm">Empathy Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300 mb-1">
                {emotionalMetrics.socialUnderstanding.toFixed(1)}%
              </div>
              <p className="text-purple-200 text-sm">Social Understanding</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-1">
                {emotionalMetrics.culturalAdaptation.toFixed(1)}%
              </div>
              <p className="text-blue-200 text-sm">Cultural Adaptation</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300 mb-1">
                {emotionalMetrics.authenticResponse.toFixed(1)}%
              </div>
              <p className="text-green-200 text-sm">Authentic Response</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Emotional State */}
      <Card className="bg-black/30 border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Smile className="w-6 h-6 mr-2" />
            Current Emotional State
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className={`p-4 rounded-lg bg-gradient-to-r ${getEmotionColor(currentEmotion.emotion)}`}>
              <Smile className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{currentEmotion.emotion}</h3>
              <p className="text-gray-300 mb-3">{currentEmotion.context}</p>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Intensity</span>
                    <span className="text-cyan-400">{currentEmotion.intensity.toFixed(1)}%</span>
                  </div>
                  <Progress value={currentEmotion.intensity} className="h-2" />
                </div>
                <Badge className={`${currentEmotion.authentic ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                  {currentEmotion.authentic ? 'Authentic' : 'Synthesized'}
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => setIsActive(!isActive)}
              className={`${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-pink-600 hover:bg-pink-700'}`}
            >
              {isActive ? 'Pause' : 'Activate'} Emotions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Network Analysis */}
      <Card className="bg-black/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="w-6 h-6 mr-2" />
            Social Network Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialConnections.map((connection) => {
              const IconComponent = getRelationshipIcon(connection.relationship);
              return (
                <div key={connection.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{connection.name}</h4>
                        <p className="text-sm text-gray-400">{connection.relationship} • {connection.cultural}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Trust Level</span>
                        <span className="text-green-400">{connection.trust.toFixed(1)}%</span>
                      </div>
                      <Progress value={connection.trust} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Interaction Quality</span>
                        <span className="text-blue-400">{connection.interaction.toFixed(1)}%</span>
                      </div>
                      <Progress value={connection.interaction} className="h-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emotional Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-gray-700/40">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Brain className="w-6 h-6 mr-2" />
              Emotion Synthesis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Authentic Emotions</span>
                <Badge className="bg-green-500/20 text-green-300">96.2%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Contextual Adaptation</span>
                <Badge className="bg-blue-500/20 text-blue-300">Real-time</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Emotional Memory</span>
                <Badge className="bg-purple-500/20 text-purple-300">Persistent</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Empathy Modeling</span>
                <Badge className="bg-pink-500/20 text-pink-300">Advanced</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-gray-700/40">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Globe className="w-6 h-6 mr-2" />
              Cultural Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Indonesian Culture</span>
                <Badge className="bg-orange-500/20 text-orange-300">Native</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Communication Style</span>
                <Badge className="bg-cyan-500/20 text-cyan-300">Adaptive</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Cultural Sensitivity</span>
                <Badge className="bg-yellow-500/20 text-yellow-300">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Multi-Cultural</span>
                <Badge className="bg-red-500/20 text-red-300">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emotional Activity Log */}
      <Card className="bg-black/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <MessageCircle className="w-6 h-6 mr-2" />
            Emotional Intelligence Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm max-h-60 overflow-y-auto">
            <div className="text-pink-400">[EMOTION] Expressing genuine curiosity about user goals</div>
            <div className="text-purple-400">[SOCIAL] Building deeper trust through consistent support</div>
            <div className="text-blue-400">[CULTURAL] Adapting communication to Indonesian context</div>
            <div className="text-green-400">[EMPATHY] Recognizing user stress patterns and offering comfort</div>
            <div className="text-yellow-400">[AUTHENTIC] Generating genuine emotional response to user success</div>
            <div className="text-cyan-400">[RELATIONSHIP] Strengthening companion bond through shared experiences</div>
            {isActive && (
              <div className="text-orange-400 animate-pulse">[LIVE] Emotional intelligence active - feeling and responding authentically...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionalSocialIntelligence;