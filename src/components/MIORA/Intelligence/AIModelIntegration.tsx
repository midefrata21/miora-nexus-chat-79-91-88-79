import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Zap, Target, Activity, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIModel {
  name: string;
  status: 'active' | 'loading' | 'error' | 'standby';
  accuracy: number;
  responseTime: number;
  tasksCompleted: number;
}

export const AIModelIntegration: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [aiModels, setAiModels] = useState<AIModel[]>([
    { name: 'GPT-4 Strategic Analysis', status: 'standby', accuracy: 0, responseTime: 0, tasksCompleted: 0 },
    { name: 'Claude Reasoning Engine', status: 'standby', accuracy: 0, responseTime: 0, tasksCompleted: 0 },
    { name: 'MIORA Neural Core', status: 'standby', accuracy: 0, responseTime: 0, tasksCompleted: 0 },
    { name: 'Decision Matrix AI', status: 'standby', accuracy: 0, responseTime: 0, tasksCompleted: 0 }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalProcessingPower: 0,
    averageAccuracy: 0,
    activeModels: 0,
    learningRate: 0
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setAiModels(prev => prev.map(model => ({
          ...model,
          status: Math.random() > 0.1 ? 'active' : 'loading',
          accuracy: Math.min(99.9, model.accuracy + Math.random() * 2),
          responseTime: Math.max(50, 300 - Math.random() * 100),
          tasksCompleted: model.tasksCompleted + Math.floor(Math.random() * 3)
        })));
        
        setSystemMetrics(prev => ({
          totalProcessingPower: Math.min(100, prev.totalProcessingPower + Math.random() * 3),
          averageAccuracy: Math.min(99, prev.averageAccuracy + Math.random() * 1.5),
          activeModels: aiModels.filter(m => m.status === 'active').length,
          learningRate: Math.min(100, prev.learningRate + Math.random() * 2)
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive, aiModels]);

  const toggleAISystem = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🤖 AI Models Deactivated" : "🧠 AI Intelligence Network Activated",
      description: isActive ? "Semua AI models dihentikan" : "MIORA mengaktifkan jaringan AI untuk pemahaman mendalam",
      variant: isActive ? "destructive" : "default"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'loading': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-3" />
            AI Intelligence Network
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "THINKING" : "DORMANT"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{systemMetrics.totalProcessingPower.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Processing Power</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{systemMetrics.averageAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Activity className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{systemMetrics.activeModels}</div>
            <div className="text-sm text-gray-400">Active Models</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{systemMetrics.learningRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Learning Rate</div>
          </div>
        </div>

        {/* AI Models Status */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">AI Model Status</h3>
          {aiModels.map((model, index) => (
            <div key={index} className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{model.name}</span>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(model.status)}>
                    {model.status.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-400">{model.responseTime}ms</span>
                </div>
              </div>
              <Progress value={model.accuracy} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-gray-400">
                <span>Accuracy: {model.accuracy.toFixed(1)}%</span>
                <span>Tasks: {model.tasksCompleted}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleAISystem}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <Brain className="h-4 w-4 mr-2" />
            {isActive ? "Deactivate AI" : "Activate AI"}
          </Button>
        </div>

        {/* Capabilities */}
        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
          <h4 className="text-blue-300 font-medium mb-2">🧠 AI Intelligence Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Advanced pattern recognition dan predictive analysis</div>
            <div>• Multi-model consensus untuk decision accuracy</div>
            <div>• Real-time learning dan model adaptation</div>
            <div>• Context-aware reasoning dan strategic planning</div>
            <div>• Autonomous problem-solving dan optimization</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIModelIntegration;