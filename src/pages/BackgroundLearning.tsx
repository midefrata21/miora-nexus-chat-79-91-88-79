
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  TrendingUp, 
  Zap, 
  Play,
  Pause,
  BarChart3,
  Activity
} from 'lucide-react';

const BackgroundLearning = () => {
  const { toast } = useToast();
  const [isLearning, setIsLearning] = useState(true);
  const [learningProgress, setLearningProgress] = useState(67);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLearning) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        if (Math.random() > 0.7) {
          setLearningProgress(prev => Math.min(prev + 0.1, 100));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLearning]);

  const learningAreas = [
    {
      name: 'Language Processing',
      progress: 84,
      status: 'active',
      description: 'Pemrosesan bahasa natural dan komunikasi'
    },
    {
      name: 'Pattern Recognition',
      progress: 72,
      status: 'active',
      description: 'Pengenalan pola dan analisis data'
    },
    {
      name: 'Decision Making',
      progress: 59,
      status: 'learning',
      description: 'Sistem pengambilan keputusan cerdas'
    },
    {
      name: 'Creative Thinking',
      progress: 43,
      status: 'learning',
      description: 'Pemikiran kreatif dan inovasi'
    }
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleLearning = () => {
    setIsLearning(!isLearning);
    toast({
      title: isLearning ? "⏸️ Background Learning Paused" : "▶️ Background Learning Resumed",
      description: isLearning ? "Pembelajaran latar belakang dihentikan" : "Pembelajaran latar belakang dilanjutkan",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Background Learning System
          </h1>
          <p className="text-gray-300 text-lg">Continuous AI Learning & Improvement</p>
        </div>

        {/* Learning Status */}
        <Card className="bg-gradient-to-r from-indigo-800/50 to-blue-800/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Learning Session Status
              </div>
              <Badge className={`${isLearning ? 'bg-green-500/20 text-green-400 border-green-500 animate-pulse' : 'bg-gray-500/20 text-gray-400 border-gray-500'}`}>
                {isLearning ? 'Learning Active' : 'Paused'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formatTime(sessionTime)}</div>
                <div className="text-gray-400 text-sm">Session Time</div>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{learningProgress.toFixed(1)}%</div>
                <div className="text-gray-400 text-sm">Learning Progress</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">+12.4%</div>
                <div className="text-gray-400 text-sm">Improvement Rate</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleToggleLearning}
                className={`${isLearning ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isLearning ? <><Pause className="w-4 h-4 mr-2" /> Pause Learning</> : <><Play className="w-4 h-4 mr-2" /> Resume Learning</>}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Areas */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Active Learning Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningAreas.map((area, index) => (
                <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{area.name}</h3>
                      <p className="text-gray-400 text-sm">{area.description}</p>
                    </div>
                    <Badge className={`${
                      area.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500' 
                        : 'bg-blue-500/20 text-blue-400 border-blue-500'
                    }`}>
                      {area.status === 'active' ? 'Active' : 'Learning'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={area.progress} className="flex-1 h-3" />
                    <span className="text-cyan-300 font-semibold min-w-[50px]">{area.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Learning Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Learning Time</span>
                  <span className="text-white font-semibold">247h 32m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Concepts Learned</span>
                  <span className="text-green-400 font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Knowledge Retention</span>
                  <span className="text-blue-400 font-semibold">94.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Learning Efficiency</span>
                  <span className="text-purple-400 font-semibold">87.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Real-time Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">Processing new language patterns...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">Analyzing decision algorithms...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">Optimizing neural pathways...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">Updating knowledge base...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-purple-800/50 to-pink-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Learning Boost Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 h-16">
                <div className="text-center">
                  <Brain className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Focus Mode</div>
                </div>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 h-16">
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Accelerate</div>
                </div>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                <div className="text-center">
                  <Zap className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Boost Power</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackgroundLearning;
