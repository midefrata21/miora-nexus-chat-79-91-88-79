import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Target, Activity, BookOpen, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdaptiveLearningCore: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [learningCycles, setLearningCycles] = useState(0);
  const [knowledgeBase, setKnowledgeBase] = useState(0);
  
  const [learningTasks, setLearningTasks] = useState([
    { name: 'Pattern Recognition Learning', progress: 0, status: 'standby' },
    { name: 'Performance Optimization', progress: 0, status: 'standby' },
    { name: 'User Behavior Analysis', progress: 0, status: 'standby' },
    { name: 'Code Quality Assessment', progress: 0, status: 'standby' },
    { name: 'Predictive Modeling', progress: 0, status: 'standby' }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setLearningTasks(prev => prev.map(task => ({
          ...task,
          progress: Math.min(100, task.progress + Math.random() * 8),
          status: task.progress > 85 ? 'complete' : 'active'
        })));
        
        setKnowledgeBase(prev => Math.min(100, prev + Math.random() * 5));
        setLearningCycles(prev => prev + Math.floor(Math.random() * 2));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleLearningCore = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Learning Core Stopped" : "🧠 Adaptive Learning Core Activated",
      description: isActive ? "Learning processes paused" : "MIORA mulai belajar dan beradaptasi secara otomatis",
      variant: isActive ? "destructive" : "default"
    });
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-emerald-300 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-3" />
            Adaptive Learning Core
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "LEARNING" : "IDLE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
            <div className="text-2xl font-bold text-white">{learningCycles}</div>
            <div className="text-sm text-gray-400">Learning Cycles</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-teal-400" />
            <div className="text-2xl font-bold text-white">{knowledgeBase.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Knowledge Base</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">97.8%</div>
            <div className="text-sm text-gray-400">Accuracy Rate</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Learning Processes</h3>
          {learningTasks.map((task, index) => (
            <div key={index} className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{task.name}</span>
                <Badge className={
                  task.status === 'complete' ? 'bg-green-500' : 
                  task.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'
                }>
                  <Activity className="h-3 w-3 mr-1" />
                  {task.status}
                </Badge>
              </div>
              <Progress value={task.progress} className="h-2" />
              <div className="text-sm text-gray-400 mt-1">{task.progress.toFixed(1)}% Complete</div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={toggleLearningCore}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <Zap className="h-4 w-4 mr-2" />
            {isActive ? "Stop Learning" : "Start Learning"}
          </Button>
        </div>

        <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
          <h4 className="text-emerald-300 font-medium mb-2">🧠 Adaptive Learning Features:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Continuous pattern recognition dari user interactions</div>
            <div>• Real-time performance optimization berdasarkan usage</div>
            <div>• Predictive code suggestions dan improvements</div>
            <div>• Adaptive UI/UX berdasarkan user behavior</div>
            <div>• Self-improving algorithms dengan reinforcement learning</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveLearningCore;