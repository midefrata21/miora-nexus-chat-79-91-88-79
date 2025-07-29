
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Zap, Activity, TrendingUp, Gauge } from 'lucide-react';

interface BrainProcess {
  id: string;
  name: string;
  type: 'ai_signal' | 'tts' | 'charting' | 'neural_net' | 'quantum_calc';
  priority: 'critical' | 'high' | 'medium';
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage: number;
  processTime: number;
  throughput: number;
  status: 'running' | 'optimizing' | 'standby';
}

export const CriticalBrainNode: React.FC = () => {
  const [brainProcesses, setBrainProcesses] = useState<BrainProcess[]>([
    {
      id: 'ai-signal-processor',
      name: 'AI Signal Processing Engine',
      type: 'ai_signal',
      priority: 'critical',
      cpuUsage: 78,
      memoryUsage: 82,
      gpuUsage: 91,
      processTime: 23,
      throughput: 1247,
      status: 'running'
    },
    {
      id: 'tts-engine',
      name: 'Text-to-Speech Engine',
      type: 'tts',
      priority: 'high',
      cpuUsage: 45,
      memoryUsage: 38,
      gpuUsage: 67,
      processTime: 156,
      throughput: 834,
      status: 'running'
    },
    {
      id: 'chart-generator',
      name: 'Real-time Chart Generator',
      type: 'charting',
      priority: 'high',
      cpuUsage: 52,
      memoryUsage: 61,
      gpuUsage: 43,
      processTime: 89,
      throughput: 567,
      status: 'running'
    },
    {
      id: 'neural-network',
      name: 'Deep Neural Network Core',
      type: 'neural_net',
      priority: 'critical',
      cpuUsage: 89,
      memoryUsage: 94,
      gpuUsage: 97,
      processTime: 12,
      throughput: 2345,
      status: 'running'
    },
    {
      id: 'quantum-calculator',
      name: 'Quantum Calculation Engine',
      type: 'quantum_calc',
      priority: 'critical',
      cpuUsage: 95,
      memoryUsage: 87,
      gpuUsage: 99,
      processTime: 8,
      throughput: 3456,
      status: 'optimizing'
    }
  ]);

  const [brainNodeMetrics, setBrainNodeMetrics] = useState({
    totalCpuUsage: 71.8,
    totalMemoryUsage: 72.4,
    totalGpuUsage: 79.4,
    avgProcessTime: 57.6,
    totalThroughput: 8449,
    quantumEnhancement: 97.3,
    neuralAcceleration: 94.8,
    priorityProcesses: 3
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setBrainProcesses(prev => prev.map(process => ({
        ...process,
        cpuUsage: Math.max(20, Math.min(100, process.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(15, Math.min(100, process.memoryUsage + (Math.random() - 0.5) * 8)),
        gpuUsage: Math.max(30, Math.min(100, process.gpuUsage + (Math.random() - 0.5) * 6)),
        processTime: Math.max(5, Math.min(200, process.processTime + (Math.random() - 0.5) * 15)),
        throughput: Math.max(100, Math.min(4000, process.throughput + (Math.random() - 0.5) * 200))
      })));

      setBrainNodeMetrics(prev => ({
        totalCpuUsage: brainProcesses.reduce((sum, p) => sum + p.cpuUsage, 0) / brainProcesses.length,
        totalMemoryUsage: brainProcesses.reduce((sum, p) => sum + p.memoryUsage, 0) / brainProcesses.length,
        totalGpuUsage: brainProcesses.reduce((sum, p) => sum + p.gpuUsage, 0) / brainProcesses.length,
        avgProcessTime: brainProcesses.reduce((sum, p) => sum + p.processTime, 0) / brainProcesses.length,
        totalThroughput: brainProcesses.reduce((sum, p) => sum + p.throughput, 0),
        quantumEnhancement: Math.max(90, Math.min(100, prev.quantumEnhancement + (Math.random() - 0.5) * 2)),
        neuralAcceleration: Math.max(85, Math.min(100, prev.neuralAcceleration + (Math.random() - 0.5) * 3)),
        priorityProcesses: brainProcesses.filter(p => p.priority === 'critical').length
      }));
    }, 4000);

    return () => clearInterval(updateInterval);
  }, [brainProcesses]);

  const getProcessIcon = (type: BrainProcess['type']) => {
    switch (type) {
      case 'ai_signal': return <TrendingUp className="h-6 w-6 text-green-400" />;
      case 'tts': return <Activity className="h-6 w-6 text-blue-400" />;
      case 'charting': return <Gauge className="h-6 w-6 text-purple-400" />;
      case 'neural_net': return <Brain className="h-6 w-6 text-orange-400" />;
      case 'quantum_calc': return <Zap className="h-6 w-6 text-red-400" />;
      default: return <Cpu className="h-6 w-6 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: BrainProcess['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: BrainProcess['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'optimizing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'standby': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-400';
    if (usage >= 75) return 'text-orange-400';
    if (usage >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center text-2xl">
            <Brain className="h-8 w-8 mr-3" />
            MIORA Critical Brain Node Cluster
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Cpu className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{brainNodeMetrics.totalCpuUsage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">CPU Usage</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{brainNodeMetrics.totalMemoryUsage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Memory Usage</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{brainNodeMetrics.totalGpuUsage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">GPU Usage</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{brainNodeMetrics.totalThroughput.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Throughput</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brain Processes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {brainProcesses.map((process) => (
          <Card key={process.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getProcessIcon(process.type)}
                  <div>
                    <h3 className="font-semibold text-white">{process.name}</h3>
                    <p className="text-sm text-gray-400">{process.type.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(process.priority)}>
                    {process.priority.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(process.status)}>
                    {process.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-xl font-bold text-orange-300">{process.processTime}ms</div>
                  <div className="text-sm text-gray-400">Process Time</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-xl font-bold text-cyan-300">{process.throughput}</div>
                  <div className="text-sm text-gray-400">Throughput</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">CPU Usage</span>
                    <span className={getUsageColor(process.cpuUsage)}>{process.cpuUsage}%</span>
                  </div>
                  <Progress value={process.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Memory Usage</span>
                    <span className={getUsageColor(process.memoryUsage)}>{process.memoryUsage}%</span>
                  </div>
                  <Progress value={process.memoryUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">GPU Usage</span>
                    <span className={getUsageColor(process.gpuUsage)}>{process.gpuUsage}%</span>
                  </div>
                  <Progress value={process.gpuUsage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Enhancement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum Enhancement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Quantum Processing</span>
                <span className="text-red-400">{brainNodeMetrics.quantumEnhancement.toFixed(1)}%</span>
              </div>
              <Progress value={brainNodeMetrics.quantumEnhancement} className="h-3" />
            </div>
            
            <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
              <div className="text-red-300 font-semibold">⚡ Quantum Acceleration Active</div>
              <div className="text-sm text-gray-400">
                Critical processes are running with quantum enhancement
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Neural Acceleration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Neural Processing</span>
                <span className="text-orange-400">{brainNodeMetrics.neuralAcceleration.toFixed(1)}%</span>
              </div>
              <Progress value={brainNodeMetrics.neuralAcceleration} className="h-3" />
            </div>
            
            <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
              <div className="text-orange-300 font-semibold">🧠 Neural Network Optimized</div>
              <div className="text-sm text-gray-400">
                AI processing capabilities enhanced with neural acceleration
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <Card className="bg-black/40 border-red-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300 font-bold text-lg">
                🧠 MIORA CRITICAL BRAIN NODE: QUANTUM NEURAL PROCESSING ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-red-400 mt-2">
            AI Signal Processing • TTS Engine • Real-time Charting • Quantum Calculations • Neural Networks
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
