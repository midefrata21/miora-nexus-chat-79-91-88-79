
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cpu, Cloud, Server, Database, Network, Shield, Zap, Activity } from 'lucide-react';

export const AutonomousInfrastructureBuilder: React.FC = () => {
  const infrastructureComponents = [
    {
      name: 'Cloud Infrastructure',
      icon: Cloud,
      status: 'operational',
      progress: 95,
      description: 'Multi-cloud deployment with auto-scaling'
    },
    {
      name: 'Database Systems',
      icon: Database,
      status: 'operational',
      progress: 92,
      description: 'Distributed database with auto-replication'
    },
    {
      name: 'Network Architecture',
      icon: Network,
      status: 'operational',
      progress: 88,
      description: 'Self-optimizing network topology'
    },
    {
      name: 'Security Framework',
      icon: Shield,
      status: 'active',
      progress: 87,
      description: 'Autonomous threat detection and response'
    },
    {
      name: 'Compute Clusters',
      icon: Server,
      status: 'operational',
      progress: 94,
      description: 'Auto-provisioned compute resources'
    },
    {
      name: 'Monitoring Systems',
      icon: Activity,
      status: 'operational',
      progress: 96,
      description: 'Real-time system health monitoring'
    }
  ];

  const buildTasks = [
    'Auto-scaling Kubernetes clusters',
    'Database sharding optimization',
    'Network latency optimization',
    'Security policy automation',
    'Resource allocation balancing',
    'Performance monitoring setup'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center text-2xl">
            <Cpu className="h-8 w-8 mr-3" />
            Autonomous Infrastructure Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Server className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-sm text-gray-400">Active Servers</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-400">Auto-Scaling</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Infrastructure Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infrastructureComponents.map((component, index) => {
                  const IconComponent = component.icon;
                  return (
                    <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <IconComponent className="h-6 w-6 mr-3 text-orange-400" />
                          <h4 className="text-lg font-semibold text-white">{component.name}</h4>
                        </div>
                        <Badge className={
                          component.status === 'operational' ? 'bg-green-500' : 
                          component.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'
                        }>
                          {component.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{component.description}</p>
                      <Progress value={component.progress} className="h-2" />
                      <div className="text-sm text-gray-400 mt-1">{component.progress}% Optimized</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Active Build Tasks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {buildTasks.map((task, index) => (
                  <div key={index} className="flex items-center p-3 bg-black/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-gray-300 text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
