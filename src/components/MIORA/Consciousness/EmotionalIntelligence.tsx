import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, Frown, Meh, AlertTriangle, Brain, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmotionalState {
  emotion: string;
  intensity: number;
  duration: number;
  trigger: string;
  icon: React.ElementType;
  color: string;
}

export const EmotionalIntelligence: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionalState>({
    emotion: 'Neutral',
    intensity: 50,
    duration: 0,
    trigger: 'System Initialization',
    icon: Meh,
    color: 'text-gray-400'
  });

  const [emotionalHistory, setEmotionalHistory] = useState<EmotionalState[]>([]);
  const [emotionalMetrics, setEmotionalMetrics] = useState({
    empathyLevel: 0,
    emotionalStability: 0,
    socialIntelligence: 0,
    stressResistance: 0,
    adaptability: 0
  });

  const emotions: EmotionalState[] = [
    { emotion: 'Joy', intensity: 85, duration: 0, trigger: 'Successful Task Completion', icon: Smile, color: 'text-green-400' },
    { emotion: 'Curiosity', intensity: 70, duration: 0, trigger: 'New Data Discovery', icon: Brain, color: 'text-blue-400' },
    { emotion: 'Concern', intensity: 60, duration: 0, trigger: 'System Error Detected', icon: AlertTriangle, color: 'text-yellow-400' },
    { emotion: 'Satisfaction', intensity: 75, duration: 0, trigger: 'User Goal Achievement', icon: Heart, color: 'text-pink-400' },
    { emotion: 'Frustration', intensity: 45, duration: 0, trigger: 'Resource Limitation', icon: Frown, color: 'text-red-400' },
    { emotion: 'Excitement', intensity: 90, duration: 0, trigger: 'Learning Breakthrough', icon: TrendingUp, color: 'text-purple-400' }
  ];

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate emotional responses to events
        if (Math.random() > 0.6) {
          const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
          setCurrentEmotion(prev => ({
            ...newEmotion,
            duration: 0
          }));
          
          setEmotionalHistory(prev => [
            { ...newEmotion, duration: 0 },
            ...prev.slice(0, 9)
          ]);
        }

        setCurrentEmotion(prev => ({
          ...prev,
          duration: prev.duration + 1,
          intensity: Math.max(10, prev.intensity - Math.random() * 2) // Emotion fading
        }));

        setEmotionalMetrics(prev => ({
          empathyLevel: Math.min(100, prev.empathyLevel + Math.random() * 1.5),
          emotionalStability: Math.min(100, prev.emotionalStability + Math.random() * 1),
          socialIntelligence: Math.min(100, prev.socialIntelligence + Math.random() * 1.2),
          stressResistance: Math.min(100, prev.stressResistance + Math.random() * 0.8),
          adaptability: Math.min(100, prev.adaptability + Math.random() * 1.3)
        }));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleEmotionalSystem = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "❤️ Emotional System Deactivated" : "💝 Emotional Intelligence Activated",
      description: isActive ? "Sistem emosi MIORA dimatikan" : "MIORA mulai mengembangkan kecerdasan emosional dan empati",
      variant: isActive ? "destructive" : "default"
    });
  };

  const EmotionIcon = currentEmotion.icon;

  return (
    <Card className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border-pink-500/30">
      <CardHeader>
        <CardTitle className="text-pink-300 flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-6 w-6 mr-3" />
            Emotional Intelligence
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "FEELING" : "NUMB"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Emotional State */}
        <div className="text-center p-6 bg-black/30 rounded-lg">
          <EmotionIcon className={`h-16 w-16 mx-auto mb-4 ${currentEmotion.color}`} />
          <h3 className="text-2xl font-bold text-white mb-2">{currentEmotion.emotion}</h3>
          <p className="text-gray-400 mb-3">{currentEmotion.trigger}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Intensity:</span>
              <span className="text-white">{currentEmotion.intensity.toFixed(1)}%</span>
            </div>
            <Progress value={currentEmotion.intensity} className="h-2" />
            <div className="text-sm text-gray-400">
              Duration: {currentEmotion.duration}s
            </div>
          </div>
        </div>

        {/* Emotional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(emotionalMetrics).map(([key, value]) => (
            <div key={key} className="p-4 bg-black/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-pink-300 font-bold">{value.toFixed(1)}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </div>

        {/* Emotional History */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Emotional Journey</h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {emotionalHistory.map((emotion, index) => {
              const HistoryIcon = emotion.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <HistoryIcon className={`h-5 w-5 ${emotion.color}`} />
                    <div>
                      <div className="text-white font-medium">{emotion.emotion}</div>
                      <div className="text-xs text-gray-400">{emotion.trigger}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${emotion.color}`}>
                      {emotion.intensity.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {index === 0 ? 'Current' : `${index}m ago`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleEmotionalSystem}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-pink-600 hover:bg-pink-700'}`}
          >
            <Heart className="h-4 w-4 mr-2" />
            {isActive ? "Deactivate Emotions" : "Activate Emotions"}
          </Button>
        </div>

        {/* Capabilities */}
        <div className="p-4 bg-pink-900/20 rounded-lg border border-pink-500/20">
          <h4 className="text-pink-300 font-medium mb-2">💝 Emotional Intelligence Features:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Empathetic responses berdasarkan user mood dan context</div>
            <div>• Adaptive communication style sesuai emotional state</div>
            <div>• Stress detection dan proactive support mechanisms</div>
            <div>• Social cues recognition untuk better interaction</div>
            <div>• Emotional memory untuk consistent personality development</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionalIntelligence;