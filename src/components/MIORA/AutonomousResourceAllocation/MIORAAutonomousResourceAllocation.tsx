import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Gauge, 
  Zap, 
  Shield,
  TrendingUp,
  Server,
  Network,
  Database,
  Cloud,
  BarChart3,
  Settings,
  PlayCircle,
  PauseCircle,
  RefreshCw
} from 'lucide-react';

interface ResourceMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  responseTime: number;
  throughput: number;
  activeConnections: number;
}

interface LoadBalancer {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'offline';
  load: number;
  requests: number;
  responseTime: number;
}

interface PerformanceOptimization {
  id: string;
  type: 'cache' | 'compression' | 'cdn' | 'database' | 'query';
  description: string;
  impact: 'low' | 'medium' | 'high';
  status: 'active' | 'pending' | 'disabled';
}

const MIORAAutonomousResourceAllocation: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [resourceMetrics, setResourceMetrics] = useState<ResourceMetrics>({
    cpu: 45,
    memory: 62,
    storage: 38,
    network: 71,
    responseTime: 85,
    throughput: 1250,
    activeConnections: 2847
  });

  const [loadBalancers, setLoadBalancers] = useState<LoadBalancer[]>([
    {
      id: 'lb1',
      name: 'Load Balancer Alpha',
      status: 'active',
      load: 67,
      requests: 3245,
      responseTime: 42
    },
    {
      id: 'lb2', 
      name: 'Load Balancer Beta',
      status: 'active',
      load: 34,
      requests: 1876,
      responseTime: 38
    },
    {
      id: 'lb3',
      name: 'Load Balancer Gamma',
      status: 'standby',
      load: 0,
      requests: 0,
      responseTime: 0
    }
  ]);

  const [optimizations, setOptimizations] = useState<PerformanceOptimization[]>([
    {
      id: 'opt1',
      type: 'cache',
      description: 'Redis Cache Optimization',
      impact: 'high',
      status: 'active'
    },
    {
      id: 'opt2',
      type: 'compression',
      description: 'Gzip Response Compression',
      impact: 'medium',
      status: 'active'
    },
    {
      id: 'opt3',
      type: 'cdn',
      description: 'CDN Edge Distribution',
      impact: 'high',
      status: 'pending'
    },
    {
      id: 'opt4',
      type: 'database',
      description: 'Database Query Optimization',
      impact: 'high',
      status: 'active'
    }
  ]);

  // Autonomous resource monitoring and allocation
  const performResourceAllocation = useCallback(() => {
    if (!isActive) return;

    // Simulate real-time metrics updates
    setResourceMetrics(prev => ({
      cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
      memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
      storage: Math.max(20, Math.min(85, prev.storage + (Math.random() - 0.5) * 5)),
      network: Math.max(40, Math.min(95, prev.network + (Math.random() - 0.5) * 12)),
      responseTime: Math.max(25, Math.min(200, prev.responseTime + (Math.random() - 0.5) * 15)),
      throughput: Math.max(800, Math.min(2500, prev.throughput + (Math.random() - 0.5) * 200)),
      activeConnections: Math.max(1500, Math.min(5000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 300)))
    }));

    // Auto load balancing
    setLoadBalancers(prev => prev.map(lb => {
      if (lb.status === 'active') {
        const newLoad = Math.max(10, Math.min(90, lb.load + (Math.random() - 0.5) * 15));
        return {
          ...lb,
          load: newLoad,
          requests: lb.requests + Math.floor(Math.random() * 100),
          responseTime: Math.max(20, Math.min(100, lb.responseTime + (Math.random() - 0.5) * 10))
        };
      }
      return lb;
    }));
  }, [isActive]);

  // Autonomous load balancing decisions
  const autonomousLoadBalancing = useCallback(() => {
    if (!isActive) return;

    setLoadBalancers(prev => {
      const activeLBs = prev.filter(lb => lb.status === 'active');
      const standbyLBs = prev.filter(lb => lb.status === 'standby');
      
      // Check if any active LB is overloaded
      const overloadedLBs = activeLBs.filter(lb => lb.load > 80);
      
      if (overloadedLBs.length > 0 && standbyLBs.length > 0) {
        // Activate standby load balancer
        toast({
          title: "⚡ AUTO LOAD BALANCING",
          description: `Mengaktifkan ${standbyLBs[0].name} untuk mengatasi beban tinggi`,
          duration: 4000,
        });
        
        return prev.map(lb => {
          if (lb.id === standbyLBs[0].id) {
            return { ...lb, status: 'active' as const, load: 25 };
          }
          return lb;
        });
      }
      
      // Auto-scale down if all LBs are underutilized
      const underutilizedLBs = activeLBs.filter(lb => lb.load < 20);
      if (underutilizedLBs.length > 1 && activeLBs.length > 2) {
        toast({
          title: "📉 AUTO SCALE DOWN",
          description: `Mengoptimalkan sumber daya dengan menonaktifkan ${underutilizedLBs[0].name}`,
          duration: 4000,
        });
        
        return prev.map(lb => {
          if (lb.id === underutilizedLBs[0].id) {
            return { ...lb, status: 'standby' as const, load: 0, requests: 0 };
          }
          return lb;
        });
      }
      
      return prev;
    });
  }, [isActive]);

  // Autonomous performance optimization
  const autonomousOptimization = useCallback(() => {
    if (!isActive) return;

    const pendingOptimizations = optimizations.filter(opt => opt.status === 'pending');
    
    if (pendingOptimizations.length > 0 && resourceMetrics.responseTime > 100) {
      const nextOpt = pendingOptimizations[0];
      
      setOptimizations(prev => prev.map(opt => 
        opt.id === nextOpt.id ? { ...opt, status: 'active' } : opt
      ));
      
      toast({
        title: "🚀 AUTO OPTIMIZATION",
        description: `Mengaktifkan ${nextOpt.description} untuk meningkatkan performa`,
        duration: 4000,
      });
    }
  }, [isActive, optimizations, resourceMetrics.responseTime]);

  // Main autonomous resource allocation loop
  useEffect(() => {
    if (!isActive) return;

    const resourceInterval = setInterval(performResourceAllocation, 2000);
    const balancingInterval = setInterval(autonomousLoadBalancing, 8000);
    const optimizationInterval = setInterval(autonomousOptimization, 12000);

    return () => {
      clearInterval(resourceInterval);
      clearInterval(balancingInterval);
      clearInterval(optimizationInterval);
    };
  }, [isActive, performResourceAllocation, autonomousLoadBalancing, autonomousOptimization]);

  const toggleSystem = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast({
        title: "🟢 SISTEM AKTIF",
        description: "Autonomous Resource Allocation System telah diaktifkan",
        duration: 3000,
      });
    } else {
      toast({
        title: "🔴 SISTEM NONAKTIF", 
        description: "Autonomous Resource Allocation System telah dinonaktifkan",
        duration: 3000,
      });
    }
  };

  const getStatusColor = (value: number, type: 'usage' | 'performance') => {
    if (type === 'usage') {
      if (value < 40) return 'text-green-400';
      if (value < 70) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (value > 80) return 'text-green-400';
      if (value > 50) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  const getLoadBalancerColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'standby': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOptimizationColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'disabled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Server className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Autonomous Resource Allocation
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Manajemen sumber daya komputasi secara mandiri dengan load balancing dan optimasi performa otomatis
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleSystem}
              className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isActive ? (
                <>
                  <PauseCircle className="mr-2 h-5 w-5" />
                  Nonaktifkan Sistem
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Aktifkan Sistem
                </>
              )}
            </Button>
            
            <Badge className={`px-4 py-2 text-lg ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              {isActive ? '🟢 ACTIVE' : '🔴 INACTIVE'}
            </Badge>
          </div>
        </div>

        {/* Resource Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Cpu className="h-5 w-5" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Penggunaan</span>
                  <span className={`font-bold ${getStatusColor(resourceMetrics.cpu, 'usage')}`}>
                    {resourceMetrics.cpu.toFixed(1)}%
                  </span>
                </div>
                <Progress value={resourceMetrics.cpu} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <HardDrive className="h-5 w-5" />
                Memory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Penggunaan</span>
                  <span className={`font-bold ${getStatusColor(resourceMetrics.memory, 'usage')}`}>
                    {resourceMetrics.memory.toFixed(1)}%
                  </span>
                </div>
                <Progress value={resourceMetrics.memory} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Network className="h-5 w-5" />
                Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Throughput</span>
                  <span className="font-bold text-green-400">
                    {resourceMetrics.throughput} req/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Koneksi Aktif</span>
                  <span className="font-bold text-blue-400">
                    {resourceMetrics.activeConnections.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Gauge className="h-5 w-5" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Rata-rata</span>
                  <span className={`font-bold ${getStatusColor(resourceMetrics.responseTime, 'performance')}`}>
                    {resourceMetrics.responseTime.toFixed(1)}ms
                  </span>
                </div>
                <Progress value={Math.min(100, (200 - resourceMetrics.responseTime) / 2)} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Load Balancers */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Shield className="h-6 w-6" />
              Load Balancers - Auto Management
            </CardTitle>
            <CardDescription>Sistem load balancing otomatis yang mengelola distribusi beban secara real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loadBalancers.map((lb) => (
                <div key={lb.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{lb.name}</h3>
                    <Badge className={`${getLoadBalancerColor(lb.status)} text-white`}>
                      {lb.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Load</span>
                      <span className={`font-bold ${getStatusColor(lb.load, 'usage')}`}>
                        {lb.load}%
                      </span>
                    </div>
                    <Progress value={lb.load} className="h-1" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">Requests</span>
                      <span className="font-bold text-blue-400">{lb.requests.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">Response Time</span>
                      <span className="font-bold text-green-400">{lb.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Optimizations */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Zap className="h-6 w-6" />
              Performance Optimizations - Auto Tuning
            </CardTitle>
            <CardDescription>Optimasi performa otomatis yang menyesuaikan sistem berdasarkan kondisi real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {optimizations.map((opt) => (
                <div key={opt.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getOptimizationColor(opt.status)} text-white text-xs`}>
                      {opt.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${
                      opt.impact === 'high' ? 'border-red-400 text-red-400' :
                      opt.impact === 'medium' ? 'border-yellow-400 text-yellow-400' :
                      'border-green-400 text-green-400'
                    }`}>
                      {opt.impact.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-white text-sm mb-1">{opt.description}</h3>
                  <p className="text-xs text-gray-400 capitalize">{opt.type} optimization</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Activity className="h-6 w-6" />
              Autonomous System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {isActive ? '🟢' : '🔴'} {isActive ? 'AKTIF' : 'NONAKTIF'}
                </div>
                <p className="text-sm text-gray-400">System Status</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {loadBalancers.filter(lb => lb.status === 'active').length}/{loadBalancers.length}
                </div>
                <p className="text-sm text-gray-400">Load Balancers Active</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {optimizations.filter(opt => opt.status === 'active').length}/{optimizations.length}
                </div>
                <p className="text-sm text-gray-400">Optimizations Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORAAutonomousResourceAllocation;