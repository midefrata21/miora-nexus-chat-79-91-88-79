import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Cpu, 
  Database, 
  Network, 
  Zap, 
  Shield, 
  Brain,
  Settings,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { EnhancedWebSocketMonitor } from '@/components/MIORA/EnhancedWebSocketManager';
import { mioraAutonomousSystem } from '@/services/MIORAAutonomousSystem';
import { useState, useEffect } from 'react';

const MIORAAutonomousStatus = () => {
  const [systemHealth, setSystemHealth] = useState(mioraAutonomousSystem.getSystemHealth());
  const [optimizationStats, setOptimizationStats] = useState(mioraAutonomousSystem.getOptimizationStats());
  const [repairQueue, setRepairQueue] = useState(mioraAutonomousSystem.getRepairQueue());

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(mioraAutonomousSystem.getSystemHealth());
      setOptimizationStats(mioraAutonomousSystem.getOptimizationStats());
      setRepairQueue(mioraAutonomousSystem.getRepairQueue());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBadge = (health: number) => {
    if (health >= 90) return 'bg-green-600';
    if (health >= 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            MIORA AUTONOMOUS STATUS
          </h1>
          <p className="text-gray-400">Real-time autonomous system monitoring and control</p>
        </div>

        {/* Overall Health Dashboard */}
        <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-blue-300">
              <div className="flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                System Overview
              </div>
              <Badge className={`${getHealthBadge(systemHealth.overall)} text-white`}>
                {systemHealth.overall >= 90 ? 'OPTIMAL' : systemHealth.overall >= 70 ? 'STABLE' : 'CRITICAL'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getHealthColor(systemHealth.overall)}`}>
                  {systemHealth.overall}%
                </div>
                <div className="text-sm text-gray-400">Overall Health</div>
                <Progress value={systemHealth.overall} className="mt-2 h-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">
                  {optimizationStats.totalOptimizations}
                </div>
                <div className="text-sm text-gray-400">Optimizations</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {repairQueue.filter(r => !r.executed).length}
                </div>
                <div className="text-sm text-gray-400">Active Repairs</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {optimizationStats.autonomousMode ? 'ON' : 'OFF'}
                </div>
                <div className="text-sm text-gray-400">Autonomous Mode</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => mioraAutonomousSystem.forceOptimization()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Force Optimization
              </Button>
              <Button
                onClick={() => mioraAutonomousSystem.setAutonomousMode(!optimizationStats.autonomousMode)}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                Toggle Autonomous Mode
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Monitoring */}
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="bg-black/50 border border-gray-700">
            <TabsTrigger value="modules" className="data-[state=active]:bg-blue-600">
              <Cpu className="h-4 w-4 mr-2" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="websockets" className="data-[state=active]:bg-green-600">
              <Network className="h-4 w-4 mr-2" />
              WebSockets
            </TabsTrigger>
            <TabsTrigger value="repairs" className="data-[state=active]:bg-yellow-600">
              <Shield className="h-4 w-4 mr-2" />
              Auto-Repairs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(systemHealth.modules).map(([module, health]) => (
                <Card key={module} className="bg-gradient-to-br from-gray-800/50 to-black/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-white">
                      <div className="flex items-center">
                        {module === 'webSocket' && <Network className="h-5 w-5 mr-2 text-blue-400" />}
                        {module === 'performance' && <Cpu className="h-5 w-5 mr-2 text-green-400" />}
                        {module === 'memory' && <Database className="h-5 w-5 mr-2 text-yellow-400" />}
                        {module === 'network' && <Zap className="h-5 w-5 mr-2 text-purple-400" />}
                        {module === 'autonomous' && <Brain className="h-5 w-5 mr-2 text-cyan-400" />}
                        <span className="capitalize">{module}</span>
                      </div>
                      <Badge className={`${getHealthBadge(health)} text-white`}>
                        {health.toFixed(1)}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={health} className="h-3" />
                    <div className="mt-2 text-sm text-gray-400">
                      Status: <span className={getHealthColor(health)}>
                        {health >= 90 ? 'Optimal' : health >= 70 ? 'Stable' : 'Needs Attention'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="websockets">
            <EnhancedWebSocketMonitor />
          </TabsContent>

          <TabsContent value="repairs" className="space-y-6">
            <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-300">
                  <Shield className="h-6 w-6 mr-2" />
                  Auto-Repair Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {repairQueue.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-medium">All systems operating normally</p>
                      <p className="text-gray-400 text-sm">No repairs required</p>
                    </div>
                  ) : (
                    repairQueue.slice(0, 10).map((repair, index) => (
                      <div key={repair.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {repair.executed ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          )}
                          <div>
                            <div className="text-white font-medium">{repair.action}</div>
                            <div className="text-sm text-gray-400">
                              Priority: {repair.priority.toFixed(0)} | Type: {repair.type}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={repair.executed ? 'bg-green-600' : 'bg-yellow-600'}>
                            {repair.executed ? 'COMPLETED' : 'PENDING'}
                          </Badge>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(repair.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-300">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Optimizations:</span>
                    <span className="text-cyan-400 font-bold">{optimizationStats.totalOptimizations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">System Uptime:</span>
                    <span className="text-green-400 font-bold">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Auto-Repairs:</span>
                    <span className="text-yellow-400 font-bold">{repairQueue.filter(r => r.executed).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Efficiency Score:</span>
                    <span className="text-purple-400 font-bold">A+</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-300">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Learning Rate:</span>
                    <span className="text-cyan-400 font-bold">Adaptive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Pattern Recognition:</span>
                    <span className="text-green-400 font-bold">Advanced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Decision Accuracy:</span>
                    <span className="text-purple-400 font-bold">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Autonomous Level:</span>
                    <span className="text-yellow-400 font-bold">Supreme</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Errors */}
        {systemHealth.errors.length > 0 && (
          <Card className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center text-red-300">
                <AlertTriangle className="h-5 w-5 mr-2" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemHealth.errors.map((error, index) => (
                  <div key={index} className="flex items-center p-2 bg-red-900/20 rounded border border-red-500/30">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                    <span className="text-red-300">{error}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORAAutonomousStatus;