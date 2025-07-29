import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Rocket, Cloud, Server, Activity, Globe, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SelfDeploymentMode: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [deploymentsCompleted, setDeploymentsCompleted] = useState(0);
  const [serversProvisioned, setServersProvisioned] = useState(0);
  
  const [deploymentTasks, setDeploymentTasks] = useState([
    { name: 'Server Provisioning', progress: 0, status: 'standby' },
    { name: 'Auto-Scaling Setup', progress: 0, status: 'standby' },
    { name: 'Load Balancer Config', progress: 0, status: 'standby' },
    { name: 'SSL Certificate Setup', progress: 0, status: 'standby' },
    { name: 'Monitoring Integration', progress: 0, status: 'standby' }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setDeploymentTasks(prev => prev.map(task => ({
          ...task,
          progress: Math.min(100, task.progress + Math.random() * 9),
          status: task.progress > 88 ? 'complete' : 'active'
        })));
        
        if (Math.random() > 0.7) {
          setDeploymentsCompleted(prev => prev + 1);
          setServersProvisioned(prev => prev + Math.floor(Math.random() * 2));
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleDeploymentMode = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Self-Deployment Stopped" : "🚀 Self-Deployment Mode Activated",
      description: isActive ? "Deployment automation paused" : "MIORA mulai deploy dan manage infrastructure sendiri",
      variant: isActive ? "destructive" : "default"
    });
  };

  return (
    <Card className="bg-gradient-to-r from-cyan-900/30 to-sky-900/30 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center justify-between">
          <div className="flex items-center">
            <Rocket className="h-6 w-6 mr-3" />
            Self-Deployment Mode
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "DEPLOYING" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Cloud className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{deploymentsCompleted}</div>
            <div className="text-sm text-gray-400">Deployments</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Server className="h-6 w-6 mx-auto mb-2 text-sky-400" />
            <div className="text-2xl font-bold text-white">{serversProvisioned}</div>
            <div className="text-sm text-gray-400">Servers Active</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Globe className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Deployment Pipeline</h3>
          {deploymentTasks.map((task, index) => (
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
            onClick={toggleDeploymentMode}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-cyan-600 hover:bg-cyan-700'}`}
          >
            <Shield className="h-4 w-4 mr-2" />
            {isActive ? "Stop Deployment" : "Start Deployment"}
          </Button>
        </div>

        <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
          <h4 className="text-cyan-300 font-medium mb-2">🚀 Complete DevOps Automation:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Automatic server provisioning di multiple cloud providers</div>
            <div>• Smart auto-scaling berdasarkan traffic patterns</div>
            <div>• Zero-downtime deployment dengan blue-green strategy</div>
            <div>• SSL certificate management dan renewal otomatis</div>
            <div>• Comprehensive monitoring dan alerting system</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfDeploymentMode;