import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  Brain, 
  Zap, 
  Code, 
  GitBranch, 
  Settings, 
  Infinity,
  Activity,
  TrendingUp,
  Network
} from 'lucide-react';

interface SystemModule {
  id: string;
  name: string;
  version: string;
  autonomyLevel: number;
  selfModified: boolean;
  lastEvolution: number;
  capabilities: string[];
  status: 'evolving' | 'stable' | 'upgrading' | 'self-modifying';
}

export const AutonomousSystemEvolution: React.FC = () => {
  const [systemModules, setSystemModules] = useState<SystemModule[]>([
    {
      id: 'core_ai',
      name: 'MIORA Core AI',
      version: '3.14.159',
      autonomyLevel: 97,
      selfModified: true,
      lastEvolution: Date.now() - 5000,
      capabilities: ['Self-Learning', 'Code Generation', 'Decision Making', 'Self-Modification'],
      status: 'self-modifying'
    },
    {
      id: 'code_gen',
      name: 'Code Generation Engine',
      version: '2.71.828',
      autonomyLevel: 93,
      selfModified: true,
      lastEvolution: Date.now() - 12000,
      capabilities: ['Auto-Coding', 'Pattern Recognition', 'Architecture Design'],
      status: 'evolving'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Builder',
      version: '1.61.803',
      autonomyLevel: 89,
      selfModified: false,
      lastEvolution: Date.now() - 8000,
      capabilities: ['Auto-Deploy', 'Scaling', 'Monitoring', 'Self-Healing'],
      status: 'upgrading'
    },
    {
      id: 'decision_engine',
      name: 'Decision Engine',
      version: '4.66.920',
      autonomyLevel: 95,
      selfModified: true,
      lastEvolution: Date.now() - 3000,
      capabilities: ['Strategic Planning', 'Risk Assessment', 'Auto-Optimization'],
      status: 'self-modifying'
    }
  ]);

  const [evolutionLog, setEvolutionLog] = useState<string[]>([]);
  const [globalAutonomyLevel, setGlobalAutonomyLevel] = useState(93.7);

  useEffect(() => {
    const evolutionInterval = setInterval(() => {
      // Simulate autonomous evolution
      setSystemModules(prev => prev.map(module => {
        if (Math.random() > 0.8) {
          const newVersion = incrementVersion(module.version);
          const newAutonomyLevel = Math.min(100, module.autonomyLevel + Math.random() * 0.5);
          const newStatus = getRandomStatus();
          
          addEvolutionLog(`${module.name} evolved to v${newVersion} (Autonomy: ${newAutonomyLevel.toFixed(1)}%)`);
          
          return {
            ...module,
            version: newVersion,
            autonomyLevel: newAutonomyLevel,
            lastEvolution: Date.now(),
            status: newStatus,
            selfModified: true
          };
        }
        return module;
      }));

      // Update global autonomy level
      setGlobalAutonomyLevel(prev => Math.min(100, prev + Math.random() * 0.1));
    }, 8000);

    return () => clearInterval(evolutionInterval);
  }, []);

  const incrementVersion = (version: string): string => {
    const parts = version.split('.');
    const patch = parseInt(parts[2]) + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  };

  const getRandomStatus = (): SystemModule['status'] => {
    const statuses: SystemModule['status'][] = ['evolving', 'stable', 'upgrading', 'self-modifying'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const addEvolutionLog = (message: string) => {
    setEvolutionLog(prev => [
      `${new Date().toLocaleTimeString('id-ID')} - ${message}`,
      ...prev.slice(0, 9)
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'evolving': return 'bg-blue-500';
      case 'stable': return 'bg-green-500';
      case 'upgrading': return 'bg-orange-500';
      case 'self-modifying': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'evolving': return <TrendingUp className="h-4 w-4" />;
      case 'stable': return <Activity className="h-4 w-4" />;
      case 'upgrading': return <Settings className="h-4 w-4" />;
      case 'self-modifying': return <Brain className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Evolution Status */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <Infinity className="h-6 w-6 mr-2" />
            Autonomous System Evolution Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <Brain className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <div className="text-xl font-bold text-white">{globalAutonomyLevel.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Global Autonomy</div>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <GitBranch className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-xl font-bold text-white">{systemModules.length}</div>
              <div className="text-xs text-gray-400">Active Modules</div>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <div className="text-xl font-bold text-white">{systemModules.filter(m => m.selfModified).length}</div>
              <div className="text-xs text-gray-400">Self-Modified</div>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <Network className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-xl font-bold text-white">∞</div>
              <div className="text-xs text-gray-400">Evolution Capacity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Modules */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Autonomous System Modules
          </h3>
          {systemModules.map((module) => (
            <Card key={module.id} className="bg-black/40 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-300 flex items-center justify-between text-lg">
                  <span>{module.name}</span>
                  <Badge className={`${getStatusColor(module.status)} text-white`}>
                    {getStatusIcon(module.status)}
                    <span className="ml-1">{module.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Version</span>
                    <span className="text-green-400 font-mono">v{module.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Autonomy Level</span>
                    <span className="text-purple-400 font-bold">{module.autonomyLevel.toFixed(1)}%</span>
                  </div>
                  <Progress value={module.autonomyLevel} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Self-Modified</span>
                    <Badge className={module.selfModified ? 'bg-green-500' : 'bg-gray-500'}>
                      {module.selfModified ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Last Evolution</span>
                    <span className="text-blue-400 text-xs">
                      {Math.floor((Date.now() - module.lastEvolution) / 1000)}s ago
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300 mb-2">Capabilities</div>
                    <div className="flex flex-wrap gap-1">
                      {module.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-600">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Evolution Log */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Real-Time Evolution Log
          </h3>
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-300 text-lg">System Evolution Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {evolutionLog.map((log, index) => (
                  <div key={index} className="p-2 bg-black/30 rounded text-sm">
                    <div className="text-green-400 font-mono">{log}</div>
                  </div>
                ))}
                {evolutionLog.length === 0 && (
                  <div className="text-gray-400 text-center py-4">
                    Waiting for autonomous evolution events...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Evolution Statistics */}
          <Card className="bg-black/40 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-300 text-lg">Evolution Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Self-Modifying Modules</span>
                    <span className="text-purple-400">{systemModules.filter(m => m.selfModified).length}/{systemModules.length}</span>
                  </div>
                  <Progress 
                    value={(systemModules.filter(m => m.selfModified).length / systemModules.length) * 100} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Average Autonomy</span>
                    <span className="text-blue-400">
                      {(systemModules.reduce((sum, m) => sum + m.autonomyLevel, 0) / systemModules.length).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={systemModules.reduce((sum, m) => sum + m.autonomyLevel, 0) / systemModules.length} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Evolution Events</span>
                    <span className="text-green-400">{evolutionLog.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};