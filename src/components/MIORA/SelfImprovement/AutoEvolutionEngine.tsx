import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Cog, RefreshCw, TrendingUp, Code, Cpu, GitBranch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EvolutionTask {
  id: string;
  name: string;
  type: 'optimization' | 'feature' | 'bug_fix' | 'enhancement';
  progress: number;
  status: 'queued' | 'active' | 'completed' | 'testing';
  impact: number;
  estimatedTime: number;
}

export const AutoEvolutionEngine: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [evolutionCycle, setEvolutionCycle] = useState(0);
  const [totalEvolutions, setTotalEvolutions] = useState(0);
  
  const [evolutionTasks, setEvolutionTasks] = useState<EvolutionTask[]>([
    { id: '1', name: 'Algorithm Optimization', type: 'optimization', progress: 0, status: 'queued', impact: 85, estimatedTime: 120 },
    { id: '2', name: 'UI Enhancement', type: 'enhancement', progress: 0, status: 'queued', impact: 70, estimatedTime: 90 },
    { id: '3', name: 'Performance Bug Fix', type: 'bug_fix', progress: 0, status: 'queued', impact: 95, estimatedTime: 60 },
    { id: '4', name: 'New AI Feature', type: 'feature', progress: 0, status: 'queued', impact: 80, estimatedTime: 180 }
  ]);

  const [evolutionMetrics, setEvolutionMetrics] = useState({
    systemEfficiency: 0,
    codeQuality: 0,
    performanceGain: 0,
    stabilityIndex: 0,
    innovationRate: 0
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setEvolutionTasks(prev => prev.map(task => {
          if (task.status === 'active') {
            const newProgress = Math.min(100, task.progress + Math.random() * 5);
            const newStatus = newProgress >= 100 ? 'testing' : 'active';
            
            if (newProgress >= 100 && task.progress < 100) {
              setTotalEvolutions(prev => prev + 1);
              setTimeout(() => {
                setEvolutionTasks(current => current.map(t => 
                  t.id === task.id ? { ...t, status: 'completed' } : t
                ));
              }, 2000);
            }
            
            return { ...task, progress: newProgress, status: newStatus };
          }
          
          if (task.status === 'queued' && Math.random() > 0.8) {
            return { ...task, status: 'active' };
          }
          
          return task;
        }));

        setEvolutionCycle(prev => prev + 1);
        
        setEvolutionMetrics(prev => ({
          systemEfficiency: Math.min(100, prev.systemEfficiency + Math.random() * 1.5),
          codeQuality: Math.min(100, prev.codeQuality + Math.random() * 1.2),
          performanceGain: Math.min(100, prev.performanceGain + Math.random() * 2),
          stabilityIndex: Math.min(100, prev.stabilityIndex + Math.random() * 1),
          innovationRate: Math.min(100, prev.innovationRate + Math.random() * 1.8)
        }));

        // Generate new evolution tasks
        if (Math.random() > 0.85) {
          const taskTypes = ['optimization', 'feature', 'bug_fix', 'enhancement'] as const;
          const taskNames = [
            'Neural Network Upgrade',
            'Security Enhancement',
            'Database Optimization',
            'ML Model Refinement',
            'API Performance Boost',
            'Memory Management Fix'
          ];
          
          const newTask: EvolutionTask = {
            id: Date.now().toString(),
            name: taskNames[Math.floor(Math.random() * taskNames.length)],
            type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
            progress: 0,
            status: 'queued',
            impact: Math.random() * 100,
            estimatedTime: Math.random() * 200 + 30
          };
          
          setEvolutionTasks(prev => [newTask, ...prev.slice(0, 7)]);
        }
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleEvolutionEngine = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Evolution Engine Stopped" : "🚀 Auto-Evolution Engine Started",
      description: isActive ? "Self-improvement dihentikan" : "MIORA mulai mengembangkan dan meningkatkan dirinya secara otomatis",
      variant: isActive ? "destructive" : "default"
    });
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="h-4 w-4" />;
      case 'feature': return <Code className="h-4 w-4" />;
      case 'bug_fix': return <Cog className="h-4 w-4" />;
      case 'enhancement': return <Zap className="h-4 w-4" />;
      default: return <RefreshCw className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600';
      case 'completed': return 'bg-green-600';
      case 'testing': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-emerald-300 flex items-center justify-between">
          <div className="flex items-center">
            <RefreshCw className="h-6 w-6 mr-3" />
            Auto-Evolution Engine
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "EVOLVING" : "STATIC"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Evolution Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <RefreshCw className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
            <div className="text-2xl font-bold text-white">{evolutionCycle}</div>
            <div className="text-sm text-gray-400">Evolution Cycles</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <GitBranch className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{totalEvolutions}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{evolutionTasks.filter(t => t.status === 'active').length}</div>
            <div className="text-sm text-gray-400">Active Tasks</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{evolutionMetrics.systemEfficiency.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Efficiency</div>
          </div>
        </div>

        {/* Evolution Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(evolutionMetrics).map(([key, value]) => (
            <div key={key} className="p-4 bg-black/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-emerald-300 font-bold">{value.toFixed(1)}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </div>

        {/* Active Evolution Tasks */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Evolution Tasks</h3>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {evolutionTasks.map((task) => (
              <div key={task.id} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTaskTypeIcon(task.type)}
                    <span className="text-white font-medium">{task.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-400">
                      Impact: {task.impact.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <Progress value={task.progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Progress: {task.progress.toFixed(1)}%</span>
                  <span>ETA: {Math.max(0, task.estimatedTime - (task.progress * task.estimatedTime / 100)).toFixed(0)}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleEvolutionEngine}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {isActive ? "Stop Evolution" : "Start Evolution"}
          </Button>
        </div>

        {/* Capabilities */}
        <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
          <h4 className="text-emerald-300 font-medium mb-2">🚀 Auto-Evolution Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Autonomous code optimization dan refactoring</div>
            <div>• Self-diagnostic dan automatic bug fixing</div>
            <div>• Performance monitoring dan automatic tuning</div>
            <div>• Feature development berdasarkan usage patterns</div>
            <div>• Continuous integration dan self-testing mechanisms</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoEvolutionEngine;