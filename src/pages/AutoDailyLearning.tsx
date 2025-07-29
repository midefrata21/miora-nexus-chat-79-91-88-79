import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, TrendingUp, Calendar, Clock, Lightbulb, Target, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LearningMetrics {
  dailyGoal: number;
  currentProgress: number;
  streak: number;
  totalKnowledge: number;
  learningRate: number;
  efficiency: number;
}

const AutoDailyLearning = () => {
  const [metrics, setMetrics] = useState<LearningMetrics>({
    dailyGoal: 100,
    currentProgress: 73,
    streak: 47,
    totalKnowledge: 15847,
    learningRate: 94.3,
    efficiency: 87.6
  });

  const [autoLearningEnabled, setAutoLearningEnabled] = useState(true);
  const [isLearning, setIsLearning] = useState(false);

  const [learningTopics] = useState([
    { title: 'Advanced Neural Networks', progress: 84, category: 'Machine Learning' },
    { title: 'Quantum Computing', progress: 34, category: 'Quantum Tech' },
    { title: 'Encryption Protocols', progress: 100, category: 'Security' },
    { title: 'Blockchain Technology', progress: 67, category: 'Distributed Systems' }
  ]);

  useEffect(() => {
    if (autoLearningEnabled) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          currentProgress: Math.min(prev.dailyGoal, prev.currentProgress + Math.random() * 2),
          learningRate: Math.min(100, prev.learningRate + Math.random() * 0.3),
          efficiency: Math.min(100, prev.efficiency + Math.random() * 0.2),
          totalKnowledge: prev.totalKnowledge + Math.floor(Math.random() * 3)
        }));

        // Complete daily goal
        if (Math.random() > 0.98) {
          setMetrics(prev => ({
            ...prev,
            streak: prev.streak + 1,
            currentProgress: 0
          }));
          toast({
            title: "🎯 Daily Goal Achieved!",
            description: "Learning streak extended. New knowledge acquired.",
            duration: 4000,
          });
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoLearningEnabled]);

  const startIntensiveLearning = async () => {
    setIsLearning(true);
    
    for (let i = 0; i <= 20; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setMetrics(prev => ({
        ...prev,
        currentProgress: Math.min(prev.dailyGoal, prev.currentProgress + 2),
        totalKnowledge: prev.totalKnowledge + 5
      }));
    }

    setIsLearning(false);
    toast({
      title: "🧠 Intensive Learning Complete",
      description: "Knowledge acquisition accelerated",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-12 w-12 text-blue-400" />
            Auto Daily Learning
          </h1>
          <p className="text-gray-300 text-lg">Autonomous knowledge acquisition with adaptive learning algorithms</p>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Target className="h-5 w-5" />Daily Progress</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{metrics.currentProgress}%</div>
                <div className="text-sm text-gray-400">of daily goal</div>
                <Progress value={(metrics.currentProgress / metrics.dailyGoal) * 100} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{metrics.streak}</div>
                <div className="text-sm text-gray-400">day streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{metrics.learningRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">learning rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{metrics.efficiency.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">efficiency</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <h3 className="text-white font-medium">Auto-Learning Mode</h3>
                <p className="text-gray-400 text-sm">Continuous knowledge acquisition</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={autoLearningEnabled ? "default" : "outline"}
                  onClick={() => setAutoLearningEnabled(!autoLearningEnabled)}
                  className={autoLearningEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {autoLearningEnabled ? 'Active' : 'Inactive'}
                </Button>
                <Button onClick={startIntensiveLearning} disabled={isLearning} className="bg-blue-600 hover:bg-blue-700">
                  {isLearning ? 'Learning...' : 'Intensive Session'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Brain className="h-5 w-5" />Learning Topics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {learningTopics.map((topic, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors">
                  <h3 className="text-white font-medium mb-1">{topic.title}</h3>
                  <p className="text-cyan-400 text-sm mb-3">{topic.category}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Progress</span>
                      <span className="text-white">{topic.progress}%</span>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Calendar className="h-5 w-5" />Knowledge</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.totalKnowledge.toLocaleString()}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><TrendingUp className="h-5 w-5" />Velocity</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{(metrics.learningRate * 0.84).toFixed(1)}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Zap className="h-5 w-5" />Retention</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">97.3%</div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutoDailyLearning;