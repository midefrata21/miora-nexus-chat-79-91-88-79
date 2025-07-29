
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Network, Zap, Activity, Database, Cpu, Settings, Play, Pause } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NeuralModule {
  id: number;
  name: string;
  type: 'processing' | 'memory' | 'learning' | 'decision';
  activation: number;
  efficiency: number;
  connections: number;
  status: 'active' | 'idle' | 'training' | 'optimizing';
}

const Neural: React.FC = () => {
  const [neuralModules, setNeuralModules] = useState<NeuralModule[]>([
    { id: 1, name: 'Primary Processing Unit', type: 'processing', activation: 0, efficiency: 95, connections: 15000, status: 'idle' },
    { id: 2, name: 'Memory Bank Alpha', type: 'memory', activation: 0, efficiency: 92, connections: 8000, status: 'idle' },
    { id: 3, name: 'Learning Engine Beta', type: 'learning', activation: 0, efficiency: 88, connections: 12000, status: 'idle' },
    { id: 4, name: 'Decision Matrix', type: 'decision', activation: 0, efficiency: 90, connections: 10000, status: 'idle' },
    { id: 5, name: 'Pattern Recognition Core', type: 'processing', activation: 0, efficiency: 94, connections: 18000, status: 'idle' },
    { id: 6, name: 'Adaptive Memory System', type: 'memory', activation: 0, efficiency: 91, connections: 9500, status: 'idle' }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalNeurons: 2500000,
    activeSynapses: 0,
    learningRate: 0.85,
    processingSpeed: 0,
    memoryUtilization: 0,
    networkEfficiency: 0
  });

  const [isActive, setIsActive] = useState(false);
  const [currentThought, setCurrentThought] = useState('');

  const thoughts = [
    'Processing neural pathway optimization...',
    'Analyzing pattern recognition algorithms...',
    'Optimizing synaptic connections...',
    'Learning from data patterns...',
    'Adapting neural network structure...',
    'Enhancing decision-making processes...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setNeuralModules(prev => prev.map(module => ({
          ...module,
          activation: Math.min(100, module.activation + Math.random() * 15 - 5),
          efficiency: Math.min(100, module.efficiency + Math.random() * 2 - 1),
          status: module.activation > 70 ? 'training' : 
                 module.activation > 30 ? 'active' : 
                 module.activation > 10 ? 'optimizing' : 'idle'
        })));

        setCurrentThought(thoughts[Math.floor(Math.random() * thoughts.length)]);

        const avgActivation = neuralModules.reduce((sum, m) => sum + m.activation, 0) / neuralModules.length;
        const avgEfficiency = neuralModules.reduce((sum, m) => sum + m.efficiency, 0) / neuralModules.length;
        
        setSystemMetrics(prev => ({
          ...prev,
          activeSynapses: Math.floor(avgActivation * 1000 + Math.random() * 5000),
          processingSpeed: avgActivation * 10,
          memoryUtilization: Math.min(95, prev.memoryUtilization + Math.random() * 3 - 1.5),
          networkEfficiency: avgEfficiency
        }));
      }, 2500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, neuralModules]);

  const activateNeuralSystem = () => {
    setIsActive(true);
    toast({
      title: "🧠 NEURAL SYSTEM ACTIVATED",
      description: "All neural modules are now processing information",
      duration: 5000,
    });
  };

  const deactivateNeuralSystem = () => {
    setIsActive(false);
    setNeuralModules(prev => prev.map(module => ({
      ...module,
      activation: 0,
      status: 'idle'
    })));
    toast({
      title: "🧠 Neural System Deactivated",
      description: "All neural modules are now in idle state",
      variant: "destructive",
      duration: 3000,
    });
  };

  const optimizeNeuralNetwork = () => {
    setNeuralModules(prev => prev.map(module => ({
      ...module,
      efficiency: Math.min(100, module.efficiency + 5),
      connections: Math.floor(module.connections * 1.1),
      status: 'optimizing'
    })));

    setTimeout(() => {
      setNeuralModules(prev => prev.map(module => ({
        ...module,
        status: 'active'
      })));
    }, 3000);

    toast({
      title: "⚡ Neural Network Optimized",
      description: "All modules have been enhanced for better performance",
      duration: 4000,
    });
  };

  const getModuleTypeColor = (type: NeuralModule['type']) => {
    switch (type) {
      case 'processing': return 'bg-blue-500';
      case 'memory': return 'bg-green-500';
      case 'learning': return 'bg-purple-500';
      case 'decision': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: NeuralModule['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'training': return 'text-blue-400 bg-blue-400/20 animate-pulse';
      case 'optimizing': return 'text-yellow-400 bg-yellow-400/20 animate-bounce';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-blue-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NEURAL ARCHITECTURE
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Advanced Neural Network Processing & Intelligence System
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Neural: {isActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              Modules: {neuralModules.length}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              Neurons: {(systemMetrics.totalNeurons / 1000000).toFixed(1)}M
            </Badge>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Network className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-sm text-gray-400">Active Synapses</p>
              <p className="text-2xl font-bold text-blue-300">{systemMetrics.activeSynapses.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-400">Processing Speed</p>
              <p className="text-2xl font-bold text-green-300">{systemMetrics.processingSpeed.toFixed(0)} Hz</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Database className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-400">Memory Usage</p>
              <p className="text-2xl font-bold text-purple-300">{systemMetrics.memoryUtilization.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Cpu className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-sm text-gray-400">Network Efficiency</p>
              <p className="text-2xl font-bold text-orange-300">{systemMetrics.networkEfficiency.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Neural Activity */}
        {isActive && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Brain className="h-5 w-5 mr-2 animate-pulse" />
                Current Neural Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-black/30 rounded-lg">
                <p className="text-cyan-300 animate-pulse">{currentThought}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Control Panel */}
        <Card className="bg-black/40 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Neural System Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Learning Rate</label>
                  <Progress value={systemMetrics.learningRate * 100} className="mt-2" />
                  <span className="text-xs text-gray-500">{(systemMetrics.learningRate * 100).toFixed(1)}%</span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Network Efficiency</label>
                  <Progress value={systemMetrics.networkEfficiency} className="mt-2" />
                  <span className="text-xs text-gray-500">{systemMetrics.networkEfficiency.toFixed(1)}%</span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Memory Utilization</label>
                  <Progress value={systemMetrics.memoryUtilization} className="mt-2" />
                  <span className="text-xs text-gray-500">{systemMetrics.memoryUtilization.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={isActive ? deactivateNeuralSystem : activateNeuralSystem}
                  className={isActive ? "bg-red-600 hover:bg-red-500" : "bg-blue-600 hover:bg-blue-500"}
                >
                  {isActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Deactivate Neural System
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate Neural System
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={optimizeNeuralNetwork}
                  variant="outline"
                  className="text-purple-400 border-purple-400"
                  disabled={!isActive}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Optimize Network
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Neural Modules */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Neural Modules Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {neuralModules.map((module) => (
                <div key={module.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium text-sm">{module.name}</span>
                      <Badge className={getModuleTypeColor(module.type)}>
                        {module.type}
                      </Badge>
                    </div>
                    <Badge className={`${getStatusColor(module.status)} border-0`}>
                      {module.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Activation</span>
                        <span>{module.activation.toFixed(0)}%</span>
                      </div>
                      <Progress value={module.activation} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Efficiency</span>
                        <span>{module.efficiency.toFixed(0)}%</span>
                      </div>
                      <Progress value={module.efficiency} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-400">
                    Connections: {module.connections.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Neural Capabilities */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400">Neural Architecture Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Core Functions</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Advanced pattern recognition</li>
                  <li>• Adaptive memory management</li>
                  <li>• Real-time learning algorithms</li>
                  <li>• Decision optimization processes</li>
                  <li>• Neural pathway enhancement</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">System Specifications</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• {(systemMetrics.totalNeurons / 1000000).toFixed(1)}M artificial neurons</li>
                  <li>• {systemMetrics.activeSynapses.toLocaleString()} active synapses</li>
                  <li>• {systemMetrics.processingSpeed.toFixed(0)} Hz processing speed</li>
                  <li>• {(systemMetrics.learningRate * 100).toFixed(1)}% learning efficiency</li>
                  <li>• Self-optimizing neural pathways</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Neural;
