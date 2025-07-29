
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cpu, Zap, Activity, Database, Network, Infinity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProcessingCore {
  id: number;
  name: string;
  usage: number;
  temperature: number;
  frequency: number;
  status: 'active' | 'idle' | 'overclocked' | 'cooling';
}

interface ParallelTask {
  id: number;
  name: string;
  progress: number;
  cores: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'running' | 'queued' | 'completed' | 'paused';
}

const ParallelProcessing: React.FC = () => {
  const [cores, setCores] = useState<ProcessingCore[]>([
    { id: 1, name: 'Quantum Core Alpha', usage: 0, temperature: 35, frequency: 3.8, status: 'idle' },
    { id: 2, name: 'Quantum Core Beta', usage: 0, temperature: 37, frequency: 3.9, status: 'idle' },
    { id: 3, name: 'Quantum Core Gamma', usage: 0, temperature: 33, frequency: 4.1, status: 'idle' },
    { id: 4, name: 'Quantum Core Delta', usage: 0, temperature: 36, frequency: 4.0, status: 'idle' },
    { id: 5, name: 'Neural Core Alpha', usage: 0, temperature: 32, frequency: 4.2, status: 'idle' },
    { id: 6, name: 'Neural Core Beta', usage: 0, temperature: 34, frequency: 4.0, status: 'idle' },
    { id: 7, name: 'AI Core Prime', usage: 0, temperature: 38, frequency: 4.5, status: 'idle' },
    { id: 8, name: 'Infinity Core', usage: 0, temperature: 40, frequency: 5.0, status: 'idle' }
  ]);

  const [tasks, setTasks] = useState<ParallelTask[]>([
    { id: 1, name: 'Quantum Machine Learning Training', progress: 0, cores: 4, priority: 'high', status: 'queued' },
    { id: 2, name: 'Neural Network Optimization', progress: 0, cores: 2, priority: 'medium', status: 'queued' },
    { id: 3, name: 'Data Mining & Analysis', progress: 0, cores: 3, priority: 'high', status: 'queued' },
    { id: 4, name: 'AI Model Inference', progress: 0, cores: 1, priority: 'critical', status: 'queued' }
  ]);

  const [systemStats, setSystemStats] = useState({
    totalCores: 8,
    activeCores: 0,
    totalThreads: 32,
    activeThreads: 0,
    memoryUsage: 0,
    processingPower: 0,
    efficiency: 0,
    throughput: 0
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isProcessing) {
      interval = setInterval(() => {
        // Update core usage and temperatures
        setCores(prev => prev.map(core => ({
          ...core,
          usage: Math.min(100, core.usage + Math.random() * 20 - 5),
          temperature: Math.min(85, core.temperature + Math.random() * 5 - 2.5),
          frequency: core.frequency + Math.random() * 0.2 - 0.1,
          status: core.usage > 80 ? 'overclocked' : core.usage > 10 ? 'active' : 'idle'
        })));

        // Update task progress
        setTasks(prev => prev.map(task => {
          if (task.status === 'running') {
            const newProgress = Math.min(100, task.progress + Math.random() * 5 + 1);
            return {
              ...task,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'running'
            };
          }
          return task;
        }));

        // Update system stats
        setSystemStats(prev => {
          const activeCores = cores.filter(c => c.status === 'active' || c.status === 'overclocked').length;
          const avgUsage = cores.reduce((sum, c) => sum + c.usage, 0) / cores.length;
          return {
            ...prev,
            activeCores,
            activeThreads: activeCores * 4,
            memoryUsage: Math.min(95, prev.memoryUsage + Math.random() * 2 - 1),
            processingPower: avgUsage * 10,
            efficiency: Math.max(0, 100 - (cores.reduce((sum, c) => sum + c.temperature, 0) / cores.length - 30) * 2),
            throughput: prev.throughput + Math.random() * 1000 + 500
          };
        });
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing, cores]);

  const startParallelProcessing = () => {
    setIsProcessing(true);
    
    // Start queued tasks
    setTasks(prev => prev.map(task => 
      task.status === 'queued' ? { ...task, status: 'running' } : task
    ));

    toast({
      title: "⚡ PARALLEL PROCESSING ACTIVATED",
      description: "All cores are now running at maximum efficiency",
      duration: 5000,
    });
  };

  const stopParallelProcessing = () => {
    setIsProcessing(false);
    
    setCores(prev => prev.map(core => ({
      ...core,
      usage: 0,
      status: 'idle'
    })));

    setTasks(prev => prev.map(task => ({
      ...task,
      status: task.status === 'running' ? 'paused' : task.status
    })));

    toast({
      title: "⏸️ Parallel Processing Stopped",
      description: "All cores are now in idle state",
      variant: "destructive",
      duration: 3000,
    });
  };

  const overclockCores = () => {
    setCores(prev => prev.map(core => ({
      ...core,
      frequency: core.frequency * 1.15,
      temperature: core.temperature + 10,
      status: 'overclocked'
    })));

    toast({
      title: "🔥 CORES OVERCLOCKED",
      description: "All cores running at 115% capacity - monitor temperatures",
      duration: 4000,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      case 'paused': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Cpu className="h-12 w-12 text-green-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              PARALLEL PROCESSING ENGINE
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Multi-Core Quantum Processing & Thread Management System
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isProcessing ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Processing: {isProcessing ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Cpu className="h-4 w-4 mr-2" />
              Cores: {systemStats.activeCores}/{systemStats.totalCores}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              Threads: {systemStats.activeThreads}/{systemStats.totalThreads}
            </Badge>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Cpu className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-400">Processing Power</p>
              <p className="text-2xl font-bold text-green-300">{systemStats.processingPower.toFixed(0)} GFLOPS</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Database className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-sm text-gray-400">Memory Usage</p>
              <p className="text-2xl font-bold text-blue-300">{systemStats.memoryUsage.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-400">Efficiency</p>
              <p className="text-2xl font-bold text-purple-300">{systemStats.efficiency.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Network className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-sm text-gray-400">Throughput</p>
              <p className="text-2xl font-bold text-orange-300">{(systemStats.throughput / 1000).toFixed(1)}K ops/s</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Cpu className="h-6 w-6 mr-2" />
              Parallel Processing Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={isProcessing ? stopParallelProcessing : startParallelProcessing}
                className={isProcessing ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}
              >
                {isProcessing ? 'Stop Processing' : 'Start Parallel Processing'}
              </Button>
              
              <Button
                onClick={overclockCores}
                variant="outline"
                className="text-orange-400 border-orange-400"
                disabled={!isProcessing}
              >
                <Zap className="h-4 w-4 mr-2" />
                Overclock Cores
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400">System Efficiency</label>
                <Progress value={systemStats.efficiency} className="mt-2" />
              </div>
              <div>
                <label className="text-sm text-gray-400">Memory Usage</label>
                <Progress value={systemStats.memoryUsage} className="mt-2" />
              </div>
              <div>
                <label className="text-sm text-gray-400">Core Utilization</label>
                <Progress value={(systemStats.activeCores / systemStats.totalCores) * 100} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Cores Grid */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Processing Cores Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cores.map((core) => (
                <div key={core.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{core.name}</span>
                    <div className={`w-3 h-3 rounded-full ${
                      core.status === 'overclocked' ? 'bg-red-400 animate-pulse' :
                      core.status === 'active' ? 'bg-green-400 animate-pulse' : 
                      core.status === 'cooling' ? 'bg-blue-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Usage</span>
                        <span>{core.usage.toFixed(0)}%</span>
                      </div>
                      <Progress value={core.usage} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Temp: {core.temperature.toFixed(0)}°C</span>
                      <span>Freq: {core.frequency.toFixed(1)}GHz</span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs mt-2">
                    {core.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Tasks */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">Parallel Processing Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{task.name}</span>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={`${getStatusColor(task.status)} border-0`}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      Cores: {task.cores}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Progress</span>
                      <span>{task.progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParallelProcessing;
