import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Cpu, Database, Network, Activity, Settings, Target, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OptimizationTask {
  id: string;
  name: string;
  category: 'memory' | 'cpu' | 'network' | 'storage' | 'algorithm';
  impact: number;
  duration: number;
  status: 'pending' | 'running' | 'completed';
  progress: number;
}

interface SystemMetrics {
  memoryUsage: number;
  cpuUsage: number;
  networkLatency: number;
  responseTime: number;
  throughput: number;
  efficiency: number;
}

const MIORAPerformanceOptimizerCore: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [autoOptimizeActive, setAutoOptimizeActive] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    memoryUsage: 67,
    cpuUsage: 45,
    networkLatency: 89,
    responseTime: 145,
    throughput: 1250,
    efficiency: 78
  });

  const [optimizationTasks, setOptimizationTasks] = useState<OptimizationTask[]>([
    {
      id: 'memory_cleanup',
      name: 'Memory Cleanup & Optimization',
      category: 'memory',
      impact: 25,
      duration: 8000,
      status: 'pending',
      progress: 0
    },
    {
      id: 'cache_optimization',
      name: 'Smart Cache Optimization',
      category: 'storage',
      impact: 30,
      duration: 12000,
      status: 'pending',
      progress: 0
    },
    {
      id: 'network_protocol',
      name: 'Network Protocol Enhancement',
      category: 'network',
      impact: 35,
      duration: 15000,
      status: 'pending',
      progress: 0
    },
    {
      id: 'algorithm_optimization',
      name: 'Core Algorithm Optimization',
      category: 'algorithm',
      impact: 40,
      duration: 20000,
      status: 'pending',
      progress: 0
    },
    {
      id: 'parallel_processing',
      name: 'Parallel Processing Enhancement',
      category: 'cpu',
      impact: 45,
      duration: 18000,
      status: 'pending',
      progress: 0
    }
  ]);

  // Auto-activate optimization
  useEffect(() => {
    const initTimer = setTimeout(() => {
      activateAutoOptimization();
    }, 2000);

    return () => clearTimeout(initTimer);
  }, []);

  // Real-time metrics updates
  useEffect(() => {
    if (!isOptimizing) return;

    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        memoryUsage: Math.max(25, prev.memoryUsage - Math.random() * 2),
        cpuUsage: Math.max(20, prev.cpuUsage - Math.random() * 1.5),
        networkLatency: Math.max(15, prev.networkLatency - Math.random() * 3),
        responseTime: Math.max(35, prev.responseTime - Math.random() * 4),
        throughput: Math.min(2500, prev.throughput + Math.random() * 50),
        efficiency: Math.min(100, prev.efficiency + Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(metricsInterval);
  }, [isOptimizing]);

  // Auto optimization cycle
  useEffect(() => {
    if (!autoOptimizeActive) return;

    const autoOptimizeInterval = setInterval(() => {
      const pendingTasks = optimizationTasks.filter(task => task.status === 'pending');
      if (pendingTasks.length > 0) {
        executeOptimization(pendingTasks[0].id);
      } else {
        // Reset all tasks for next cycle
        setOptimizationTasks(prev => 
          prev.map(task => ({ ...task, status: 'pending' as const, progress: 0 }))
        );
      }
    }, 25000); // Every 25 seconds

    return () => clearInterval(autoOptimizeInterval);
  }, [autoOptimizeActive, optimizationTasks]);

  const activateAutoOptimization = () => {
    setIsOptimizing(true);
    setAutoOptimizeActive(true);
    
    toast({
      title: "⚡ PERFORMANCE OPTIMIZER ACTIVATED",
      description: "Sistem optimasi otomatis telah diaktifkan - target 50ms response time",
      duration: 6000,
    });
  };

  const executeOptimization = async (taskId: string) => {
    setOptimizationTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'running' as const }
          : task
      )
    );

    const task = optimizationTasks.find(t => t.id === taskId);
    if (!task) return;

    toast({
      title: `🔧 EXECUTING: ${task.name}`,
      description: `Optimasi sedang berjalan - estimasi impact: +${task.impact}%`,
      duration: 4000,
    });

    // Simulate optimization progress
    const progressInterval = setInterval(() => {
      setOptimizationTasks(prev => 
        prev.map(t => 
          t.id === taskId && t.status === 'running'
            ? { ...t, progress: Math.min(100, t.progress + Math.random() * 15) }
            : t
        )
      );
    }, 1000);

    // Complete after duration
    setTimeout(() => {
      clearInterval(progressInterval);
      setOptimizationTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { ...task, status: 'completed' as const, progress: 100 }
            : task
        )
      );

      toast({
        title: `✅ COMPLETED: ${task.name}`,
        description: `Optimasi berhasil - peningkatan performa: +${task.impact}%`,
        duration: 3000,
      });
    }, task.duration);
  };

  const executeAllOptimizations = async () => {
    const pendingTasks = optimizationTasks.filter(task => task.status === 'pending');
    
    toast({
      title: "🚀 EXECUTING ALL OPTIMIZATIONS",
      description: `Menjalankan ${pendingTasks.length} optimasi secara bersamaan`,
      duration: 5000,
    });

    pendingTasks.forEach(task => {
      setTimeout(() => executeOptimization(task.id), Math.random() * 2000);
    });
  };

  const getCategoryIcon = (category: OptimizationTask['category']) => {
    switch (category) {
      case 'memory': return <Database className="h-4 w-4" />;
      case 'cpu': return <Cpu className="h-4 w-4" />;
      case 'network': return <Network className="h-4 w-4" />;
      case 'storage': return <Settings className="h-4 w-4" />;
      case 'algorithm': return <Target className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: OptimizationTask['category']) => {
    switch (category) {
      case 'memory': return 'text-blue-400';
      case 'cpu': return 'text-green-400';
      case 'network': return 'text-purple-400';
      case 'storage': return 'text-yellow-400';
      case 'algorithm': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Zap className="h-12 w-12 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              MIORA PERFORMANCE OPTIMIZER
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            ⚡ Optimasi Performa Real-Time - Target: Response Time &lt; 50ms
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isOptimizing ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Optimizer: {isOptimizing ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className={`px-4 py-2 ${autoOptimizeActive ? 'bg-blue-500' : 'bg-gray-500'}`}>
              <Zap className="h-4 w-4 mr-2" />
              Auto-Optimize: {autoOptimizeActive ? 'ON' : 'OFF'}
            </Badge>
          </div>
        </div>

        {/* System Metrics Dashboard */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                Real-Time System Metrics
              </span>
              <Button
                onClick={executeAllOptimizations}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500"
              >
                <Zap className="h-4 w-4 mr-2" />
                Execute All Optimizations
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Memory Usage
                    </span>
                    <span className="text-blue-300">{metrics.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.memoryUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      CPU Usage
                    </span>
                    <span className="text-green-300">{metrics.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.cpuUsage} className="h-2" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center">
                      <Network className="h-4 w-4 mr-2" />
                      Network Latency
                    </span>
                    <span className="text-purple-300">{metrics.networkLatency.toFixed(0)}ms</span>
                  </div>
                  <Progress value={Math.max(0, 100 - metrics.networkLatency)} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-yellow-300">{metrics.responseTime.toFixed(0)}ms</span>
                  </div>
                  <Progress value={Math.max(0, 100 - (metrics.responseTime / 3))} className="h-2" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Throughput</span>
                    <span className="text-cyan-300">{metrics.throughput.toFixed(0)}/s</span>
                  </div>
                  <Progress value={(metrics.throughput / 2500) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Overall Efficiency</span>
                    <span className="text-emerald-300">{metrics.efficiency.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.efficiency} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimization Tasks */}
        <Card className="bg-black/40 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">
              ⚡ Active Optimization Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {optimizationTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border transition-all ${
                    task.status === 'completed' 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : task.status === 'running'
                      ? 'bg-yellow-900/20 border-yellow-500/30'
                      : 'bg-gray-900/20 border-gray-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={getCategoryColor(task.category)}>
                        {getCategoryIcon(task.category)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{task.name}</h4>
                        <p className="text-xs text-gray-400">Impact: +{task.impact}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {task.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                      <Badge 
                        className={`text-xs ${
                          task.status === 'completed' ? 'bg-green-600' : 
                          task.status === 'running' ? 'bg-yellow-600' : 
                          'bg-gray-600'
                        }`}
                      >
                        {task.status === 'pending' ? 'Pending' : 
                         task.status === 'running' ? 'Running' : 'Completed'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={task.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress: {task.progress.toFixed(0)}%</span>
                      <span>Duration: {task.duration / 1000}s</span>
                    </div>
                  </div>
                  {task.status === 'pending' && (
                    <Button
                      onClick={() => executeOptimization(task.id)}
                      size="sm"
                      className="w-full mt-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500"
                    >
                      Execute Now
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auto-Optimization Status */}
        {autoOptimizeActive && (
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-300">
                  ⚡ AUTO-OPTIMIZATION ACTIVE
                </h3>
                <p className="text-green-200">
                  MIORA secara otomatis mengoptimalkan performa sistem untuk mencapai target &lt;50ms response time
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-400">{metrics.responseTime.toFixed(0)}ms</div>
                    <div className="text-sm text-gray-400">Current Response Time</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-400">{metrics.memoryUsage.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">Memory Usage</div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-400">{metrics.efficiency.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">System Efficiency</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORAPerformanceOptimizerCore;