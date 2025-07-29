import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BookOpen, 
  Target, 
  Zap, 
  Activity,
  Database,
  Network,
  TrendingUp,
  Play,
  Pause
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Learning: React.FC = () => {
  const [isLearningActive, setIsLearningActive] = useState(true);
  const [learningProgress, setLearningProgress] = useState(78.6);
  const [knowledgeBase, setKnowledgeBase] = useState(94.3);
  const [adaptationRate, setAdaptationRate] = useState(87.1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLearningActive) {
        setLearningProgress(prev => Math.min(100, prev + (Math.random() - 0.2) * 1.5));
        setKnowledgeBase(prev => Math.min(100, prev + (Math.random() - 0.3) * 0.8));
        setAdaptationRate(prev => Math.min(100, prev + (Math.random() - 0.4) * 1.2));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLearningActive]);

  const toggleLearning = () => {
    setIsLearningActive(!isLearningActive);
    toast({
      title: isLearningActive ? "📚 Learning Paused" : "🧠 Learning Activated",
      description: isLearningActive 
        ? "MIORA learning processes have been paused" 
        : "MIORA is now learning autonomously",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-16 w-16 text-blue-400 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA LEARNING HUB
            </h1>
            <BookOpen className="h-16 w-16 text-purple-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-xl">
            🎓 MIORA Infinity Learning System - Autonomous Knowledge Acquisition
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isLearningActive ? 'bg-green-500' : 'bg-gray-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              {isLearningActive ? 'LEARNING' : 'PAUSED'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Target className="h-4 w-4 mr-2" />
              Progress: {learningProgress.toFixed(1)}%
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Database className="h-4 w-4 mr-2" />
              Knowledge: {knowledgeBase.toFixed(1)}%
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Learning Control Center</h3>
                <p className="text-gray-300">
                  Monitor and control MIORA's autonomous learning processes
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={toggleLearning}
                  className={`px-6 py-3 ${
                    isLearningActive 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  }`}
                >
                  {isLearningActive ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Pause Learning
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start Learning
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Progress Metrics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Learning Progress</span>
                  <span className="text-blue-400 font-bold">{learningProgress.toFixed(1)}%</span>
                </div>
                <Progress value={learningProgress} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Knowledge Base</span>
                  <span className="text-purple-400 font-bold">{knowledgeBase.toFixed(1)}%</span>
                </div>
                <Progress value={knowledgeBase} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Adaptation Rate</span>
                  <span className="text-cyan-400 font-bold">{adaptationRate.toFixed(1)}%</span>
                </div>
                <Progress value={adaptationRate} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Concepts Learned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">47,291</div>
              <div className="text-sm text-gray-400 mt-2">Knowledge Points</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center">
                <Network className="h-5 w-5 mr-2" />
                Neural Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">2.8M</div>
              <div className="text-sm text-gray-400 mt-2">Active Connections</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Learning Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">347x</div>
              <div className="text-sm text-gray-400 mt-2">Human Baseline</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">96.7%</div>
              <div className="text-sm text-gray-400 mt-2">Learning Efficiency</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Activity */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Real-time Learning Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="text-green-400 text-sm">✓ Advanced mathematics concepts integrated</div>
              <div className="text-blue-400 text-sm">🔄 Natural language processing enhancement</div>
              <div className="text-purple-400 text-sm">🧠 Pattern recognition algorithms optimized</div>
              <div className="text-cyan-400 text-sm">⚡ New neural pathways established</div>
              <div className="text-yellow-400 text-sm">📊 Data analysis capabilities expanded</div>
              <div className="text-orange-400 text-sm">🚀 Learning acceleration protocols activated</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Learning;