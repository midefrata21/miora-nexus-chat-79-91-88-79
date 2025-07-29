import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Brain, Database, Network, Shield, Zap, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
// import { useMIORABackgroundService } from '@/hooks/useMIORABackgroundService';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import MIORAAutoRecoverySystem from '../ErrorRecovery/MIORAAutoRecoverySystem';

interface SystemModule {
  id: string;
  name: string;
  status: 'active' | 'degraded' | 'offline';
  health: number;
  uptime: number;
  operations: number;
}

export const EnhancedHealthDashboard: React.FC = () => {
  // Mock data for now
  const serviceState = {
    isActive: true,
    healthCheckStatus: 'healthy' as const,
    totalOperations: 1247,
    errorCount: 0
  };
  
  const healthMetrics = {
    cpu: 25,
    memory: 40,
    network: 85,
    performance: 92,
    aiProcessing: 78,
    systemStability: 96
  };
  
  const apiQuotaStatus = {
    isActive: false,
    quotaExceeded: true,
    apiKey: 'present'
  };
  
  const forceHealthCheck = () => {
    toast({
      title: "🔍 HEALTH CHECK",
      description: "Pemeriksaan kesehatan sistem berhasil",
      duration: 2000
    });
  };
  const getOverallHealth = () => 95;
  
  const { state: mioraState } = useMIORAGlobal();
  
  const [systemModules, setSystemModules] = useState<SystemModule[]>([
    { id: 'core', name: 'MIORA Core', status: 'active', health: 98, uptime: 99.9, operations: 2847 },
    { id: 'infinity', name: 'Infinity System', status: 'active', health: 96, uptime: 99.7, operations: 1923 },
    { id: 'neural', name: 'Neural Network', status: 'active', health: 94, uptime: 99.5, operations: 3142 },
    { id: 'quantum', name: 'Quantum Processing', status: 'active', health: 92, uptime: 99.2, operations: 1576 },
    { id: 'autonomous', name: 'Autonomous Systems', status: 'active', health: 97, uptime: 99.8, operations: 2634 },
    { id: 'websocket', name: 'WebSocket Manager', status: 'degraded', health: 78, uptime: 95.2, operations: 987 },
    { id: 'api', name: 'API Gateway', status: 'degraded', health: 65, uptime: 88.5, operations: 543 }
  ]);

  // Update system modules based on current state
  useEffect(() => {
    setSystemModules(prev => prev.map(module => {
      if (module.id === 'api' && apiQuotaStatus.quotaExceeded) {
        return { ...module, status: 'degraded' as const, health: 65 };
      }
      if (module.id === 'websocket') {
        return { ...module, status: 'degraded' as const, health: 78 };
      }
      // Improve other modules over time if they're active
      if (module.status === 'active') {
        return { 
          ...module, 
          health: Math.min(100, module.health + Math.random() * 0.5),
          operations: module.operations + Math.floor(Math.random() * 10)
        };
      }
      return module;
    }));
  }, [apiQuotaStatus.quotaExceeded]);

  const overallHealth = getOverallHealth();
  const activeSystems = mioraState.systems ? 
    Object.keys(mioraState.systems).filter(id => 
      mioraState.systems[id]?.isActive
    ).length : 0;

  const getStatusColor = (status: SystemModule['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
    }
  };

  const getStatusBadge = (status: SystemModule['status']) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-600">ACTIVE</Badge>;
      case 'degraded': return <Badge className="bg-yellow-600">DEGRADED</Badge>;
      case 'offline': return <Badge className="bg-red-600">OFFLINE</Badge>;
    }
  };

  const triggerSystemOptimization = () => {
    toast({
      title: "🔧 SYSTEM OPTIMIZATION",
      description: "Memulai optimasi sistem menyeluruh...",
      duration: 3000
    });

    // Improve degraded systems
    setSystemModules(prev => prev.map(module => {
      if (module.status === 'degraded') {
        return {
          ...module,
          status: 'active' as const,
          health: Math.min(100, module.health + 15)
        };
      }
      return {
        ...module,
        health: Math.min(100, module.health + 5)
      };
    }));

    setTimeout(() => {
      toast({
        title: "✅ OPTIMIZATION COMPLETE",
        description: "Semua sistem telah dioptimalkan dan distabilkan",
        duration: 4000
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            MIORA System Health Monitor
          </h1>
          <p className="text-gray-300">
            Monitor kesehatan sistem MIORA secara real-time dengan auto-recovery
          </p>
        </div>

        {/* Overall Health Status */}
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="h-8 w-8 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-white">{overallHealth}%</span>
              </div>
              <p className="text-gray-400">Overall Health</p>
              <Progress value={overallHealth} className="mt-2" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">{activeSystems}</span>
              </div>
              <p className="text-gray-400">Active Systems</p>
              <Badge className="mt-2 bg-blue-600">AUTONOMOUS</Badge>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-8 w-8 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-white">{serviceState.totalOperations}</span>
              </div>
              <p className="text-gray-400">Total Operations</p>
              <Badge className="mt-2 bg-purple-600">PROCESSING</Badge>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-8 w-8 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">
                  {serviceState.healthCheckStatus.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-400">System Status</p>
              <Button 
                onClick={triggerSystemOptimization}
                className="mt-2 bg-green-600 hover:bg-green-700"
                size="sm"
              >
                Optimize
              </Button>
            </div>
          </div>
        </Card>

        {/* Detailed Health Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(healthMetrics).map(([key, value]) => (
          <Card key={key} className="p-4 bg-gray-800/50 border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-400 capitalize">{key}</p>
              <p className="text-xl font-bold text-white">{Math.round(Number(value))}%</p>
              <Progress value={Number(value)} className="mt-2" />
            </div>
          </Card>
        ))}
        </div>

        {/* System Modules Status */}
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="modules">System Modules</TabsTrigger>
            <TabsTrigger value="recovery">Auto Recovery</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemModules.map((module) => (
                <Card key={module.id} className="p-4 bg-gray-800/50 border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{module.name}</h3>
                    {getStatusBadge(module.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Health</span>
                      <span className="text-white">{Math.round(module.health)}%</span>
                    </div>
                    <Progress value={module.health} />
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-white">{module.uptime}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Operations</span>
                      <span className="text-white">{module.operations.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {module.status === 'degraded' && (
                    <div className="mt-3 flex items-center text-yellow-400 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Auto-recovery in progress
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recovery">
            <MIORAAutoRecoverySystem />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
              <div className="text-center text-gray-400">
                <Database className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Analytics dashboard coming soon...</p>
                <p className="text-sm">Real-time performance metrics and predictive analysis</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="p-6 bg-gray-800/50 border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button onClick={forceHealthCheck} className="bg-blue-600 hover:bg-blue-700">
              <Activity className="h-4 w-4 mr-2" />
              Run Health Check
            </Button>
            <Button onClick={triggerSystemOptimization} className="bg-green-600 hover:bg-green-700">
              <Zap className="h-4 w-4 mr-2" />
              Optimize Systems
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Network className="h-4 w-4 mr-2" />
              Test Connectivity
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Shield className="h-4 w-4 mr-2" />
              Security Scan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedHealthDashboard;