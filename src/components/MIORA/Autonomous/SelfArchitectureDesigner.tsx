import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layout, Database, Network, Activity, PenTool, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SelfArchitectureDesigner: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [architecturesCreated, setArchitecturesCreated] = useState(0);
  const [designComplexity, setDesignComplexity] = useState(0);
  
  const [designTasks, setDesignTasks] = useState([
    { name: 'Database Schema Design', progress: 0, status: 'standby' },
    { name: 'API Architecture Planning', progress: 0, status: 'standby' },
    { name: 'Microservices Layout', progress: 0, status: 'standby' },
    { name: 'Security Architecture', progress: 0, status: 'standby' },
    { name: 'Scalability Framework', progress: 0, status: 'standby' }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setDesignTasks(prev => prev.map(task => ({
          ...task,
          progress: Math.min(100, task.progress + Math.random() * 10),
          status: task.progress > 80 ? 'complete' : 'active'
        })));
        
        setDesignComplexity(prev => Math.min(100, prev + Math.random() * 7));
        if (Math.random() > 0.6) {
          setArchitecturesCreated(prev => prev + 1);
        }
      }, 2200);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleArchitectureDesigner = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Architecture Designer Stopped" : "🏛️ Self-Architecture Designer Activated",
      description: isActive ? "Architecture design paused" : "MIORA mulai mendesign system architecture sendiri",
      variant: isActive ? "destructive" : "default"
    });
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center justify-between">
          <div className="flex items-center">
            <Layout className="h-6 w-6 mr-3" />
            Self-Architecture Designer
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "DESIGNING" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Database className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{architecturesCreated}</div>
            <div className="text-sm text-gray-400">Architectures Created</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Network className="h-6 w-6 mx-auto mb-2 text-indigo-400" />
            <div className="text-2xl font-bold text-white">{designComplexity.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Design Complexity</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Layers className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-sm text-gray-400">Scalability Level</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Architecture Design Progress</h3>
          {designTasks.map((task, index) => (
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
            onClick={toggleArchitectureDesigner}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <PenTool className="h-4 w-4 mr-2" />
            {isActive ? "Stop Designer" : "Start Designer"}
          </Button>
        </div>

        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
          <h4 className="text-blue-300 font-medium mb-2">🏛️ Architecture Design Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Automatic database schema design dan optimization</div>
            <div>• RESTful dan GraphQL API architecture planning</div>
            <div>• Microservices decomposition strategies</div>
            <div>• Security patterns dan best practices integration</div>
            <div>• Auto-scaling infrastructure design</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfArchitectureDesigner;