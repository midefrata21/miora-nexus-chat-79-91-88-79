import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code2, Brain, Zap, Activity, Cpu, GitBranch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MetaProgrammingEngine: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [generatedSystems, setGeneratedSystems] = useState(0);
  const [selfModificationProgress, setSelfModificationProgress] = useState(0);
  
  const [metaTasks, setMetaTasks] = useState([
    { name: 'Recursive Code Generator', progress: 0, status: 'standby' },
    { name: 'Self-Modifying Architecture', progress: 0, status: 'standby' },
    { name: 'Dynamic API Creator', progress: 0, status: 'standby' },
    { name: 'Auto-Component Factory', progress: 0, status: 'standby' },
    { name: 'Pattern Recognition Engine', progress: 0, status: 'standby' }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setMetaTasks(prev => prev.map(task => ({
          ...task,
          progress: Math.min(100, task.progress + Math.random() * 15),
          status: task.progress > 80 ? 'complete' : 'active'
        })));
        
        setSelfModificationProgress(prev => Math.min(100, prev + Math.random() * 8));
        setGeneratedSystems(prev => prev + Math.floor(Math.random() * 3));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleMetaProgramming = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Meta-Programming Engine Stopped" : "🧬 Meta-Programming Engine Activated",
      description: isActive ? "Self-modification paused" : "MIORA mulai memodifikasi kode dirinya sendiri",
      variant: isActive ? "destructive" : "default"
    });
  };

  return (
    <Card className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border-violet-500/30">
      <CardHeader>
        <CardTitle className="text-violet-300 flex items-center justify-between">
          <div className="flex items-center">
            <Code2 className="h-6 w-6 mr-3" />
            Meta-Programming Engine
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "ACTIVE" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Brain className="h-6 w-6 mx-auto mb-2 text-violet-400" />
            <div className="text-2xl font-bold text-white">{generatedSystems}</div>
            <div className="text-sm text-gray-400">Generated Systems</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{selfModificationProgress.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Self-Modification</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <GitBranch className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-sm text-gray-400">Code Branches</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Meta-Programming Tasks</h3>
          {metaTasks.map((task, index) => (
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
            onClick={toggleMetaProgramming}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-violet-600 hover:bg-violet-700'}`}
          >
            <Cpu className="h-4 w-4 mr-2" />
            {isActive ? "Stop Meta-Programming" : "Start Meta-Programming"}
          </Button>
        </div>

        <div className="p-4 bg-violet-900/20 rounded-lg border border-violet-500/20">
          <h4 className="text-violet-300 font-medium mb-2">🧬 Meta-Programming Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Recursive code generation yang membuat generator lain</div>
            <div>• Self-modifying architecture untuk adaptasi real-time</div>
            <div>• Dynamic component creation berdasarkan requirements</div>
            <div>• Pattern recognition untuk optimasi kode otomatis</div>
            <div>• Autonomous API development dan integration</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaProgrammingEngine;