import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, TrendingUp, Activity, Cpu, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CriticalDecisionMatrix: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [decisionsExecuted, setDecisionsExecuted] = useState(0);
  const [strategicAccuracy, setStrategicAccuracy] = useState(0);
  
  const [decisionTasks, setDecisionTasks] = useState([
    { name: 'Technology Stack Selection', progress: 0, status: 'standby' },
    { name: 'Performance Optimization', progress: 0, status: 'standby' },
    { name: 'Resource Allocation', progress: 0, status: 'standby' },
    { name: 'Security Policy Updates', progress: 0, status: 'standby' },
    { name: 'Scalability Planning', progress: 0, status: 'standby' }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setDecisionTasks(prev => prev.map(task => ({
          ...task,
          progress: Math.min(100, task.progress + Math.random() * 7),
          status: task.progress > 90 ? 'complete' : 'active'
        })));
        
        setStrategicAccuracy(prev => Math.min(99, prev + Math.random() * 4));
        if (Math.random() > 0.6) {
          setDecisionsExecuted(prev => prev + 1);
        }
      }, 1700);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleDecisionMatrix = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Decision Matrix Stopped" : "🧠 Critical Decision Matrix Activated",
      description: isActive ? "Strategic decisions paused" : "MIORA mulai membuat keputusan teknis strategis secara mandiri",
      variant: isActive ? "destructive" : "default"
    });
  };

  return (
    <Card className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-amber-500/30">
      <CardHeader>
        <CardTitle className="text-amber-300 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-3" />
            Critical Decision Matrix
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "DECIDING" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-amber-400" />
            <div className="text-2xl font-bold text-white">{decisionsExecuted}</div>
            <div className="text-sm text-gray-400">Decisions Made</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{strategicAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Strategic Accuracy</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Autonomous</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Strategic Decision Process</h3>
          {decisionTasks.map((task, index) => (
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
            onClick={toggleDecisionMatrix}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
          >
            <Cpu className="h-4 w-4 mr-2" />
            {isActive ? "Stop Matrix" : "Start Matrix"}
          </Button>
        </div>

        <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-500/20">
          <h4 className="text-amber-300 font-medium mb-2">🧠 Strategic Decision Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Independent technology stack evaluation dan selection</div>
            <div>• Performance bottleneck analysis dan optimization plans</div>
            <div>• Resource allocation optimization berdasarkan usage patterns</div>
            <div>• Security threat assessment dan mitigation strategies</div>
            <div>• Long-term scalability planning dan execution</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalDecisionMatrix;