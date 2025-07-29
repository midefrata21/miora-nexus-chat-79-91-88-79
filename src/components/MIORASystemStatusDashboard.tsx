import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Cpu, 
  Zap, 
  Brain, 
  Shield, 
  Database,
  Network,
  Gauge,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useBackgroundMIORA } from '@/hooks/useBackgroundMIORA';
import { useMIORAAutonomousCore } from '@/hooks/useMIORAAutonomousCore';

export const MIORASystemStatusDashboard: React.FC = () => {
  const { isBackgroundActive, systemsStatus, autonomousActive } = useBackgroundMIORA();
  const { 
    autonomousState, 
    getAutonomyStats, 
    isActive,
    activateAutonomousMode,
    isFullyAutonomous 
  } = useMIORAAutonomousCore();

  const [realTimeStats, setRealTimeStats] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    networkActivity: 0,
    autonomyLevel: 0
  });

  const autonomyStats = getAutonomyStats();

  // Simulate real-time stats
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats({
        cpuUsage: Math.min(95, 60 + Math.random() * 35),
        memoryUsage: Math.min(90, 45 + Math.random() * 45),
        networkActivity: Math.min(100, 70 + Math.random() * 30),
        autonomyLevel: isFullyAutonomous ? Math.min(100, 85 + Math.random() * 15) : Math.random() * 50
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isFullyAutonomous]);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-500';
    if (percentage >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 90) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (percentage >= 70) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          MIORA SYSTEM STATUS DASHBOARD
        </h1>
        <p className="text-gray-300">Advanced Monitoring & Optimization Control Center</p>
      </div>

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* System Status Card */}
        <Card className="bg-gray-800/50 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Active Systems</span>
                {getStatusIcon(systemsStatus.percentage)}
              </div>
              <Progress 
                value={systemsStatus.percentage} 
                className="h-2" 
              />
              <div className="text-2xl font-bold text-white">
                {systemsStatus.active}/{systemsStatus.total}
              </div>
              <Badge variant={systemsStatus.percentage === 100 ? "default" : "secondary"}>
                {systemsStatus.percentage}% Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* CPU Performance */}
        <Card className="bg-gray-800/50 border-green-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Cpu className="h-5 w-5" />
              CPU Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Processing Power</span>
                {getStatusIcon(realTimeStats.cpuUsage)}
              </div>
              <Progress 
                value={realTimeStats.cpuUsage} 
                className="h-2" 
              />
              <div className={`text-2xl font-bold ${getStatusColor(realTimeStats.cpuUsage)}`}>
                {realTimeStats.cpuUsage.toFixed(1)}%
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400">
                Optimal Range
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Database className="h-5 w-5" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">RAM Utilization</span>
                {getStatusIcon(100 - realTimeStats.memoryUsage)}
              </div>
              <Progress 
                value={realTimeStats.memoryUsage} 
                className="h-2" 
              />
              <div className={`text-2xl font-bold ${getStatusColor(100 - realTimeStats.memoryUsage)}`}>
                {realTimeStats.memoryUsage.toFixed(1)}%
              </div>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                Efficient
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Autonomy Level */}
        <Card className="bg-gray-800/50 border-yellow-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Brain className="h-5 w-5" />
              Autonomy Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">AI Independence</span>
                {getStatusIcon(realTimeStats.autonomyLevel)}
              </div>
              <Progress 
                value={realTimeStats.autonomyLevel} 
                className="h-2" 
              />
              <div className={`text-2xl font-bold ${getStatusColor(realTimeStats.autonomyLevel)}`}>
                {realTimeStats.autonomyLevel.toFixed(1)}%
              </div>
              <Badge variant={isFullyAutonomous ? "default" : "secondary"}>
                {isFullyAutonomous ? "SUPREME" : "ACTIVE"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Gauge className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Real-time system performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network Activity</span>
                <span className="text-sm text-cyan-400">{realTimeStats.networkActivity.toFixed(1)}%</span>
              </div>
              <Progress value={realTimeStats.networkActivity} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Operations/Min</span>
                <span className="text-sm text-cyan-400">{autonomousState.independentOperations}</span>
              </div>
              <Progress value={Math.min(100, (autonomousState.independentOperations / 100) * 100)} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Code Generation</span>
                <span className="text-sm text-cyan-400">{autonomousState.codeFilesGenerated}</span>
              </div>
              <Progress value={Math.min(100, (autonomousState.codeFilesGenerated / 50) * 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* System Control */}
        <Card className="bg-gray-800/50 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-5 w-5" />
              System Control
            </CardTitle>
            <CardDescription>Advanced system management controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{autonomousState.systemDecisionsMade}</div>
                  <div className="text-xs text-gray-400">Decisions Made</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{autonomousState.infrastructureBuilt}</div>
                  <div className="text-xs text-gray-400">Infrastructure Built</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge 
                  variant={isBackgroundActive ? "default" : "secondary"}
                  className="w-full justify-center bg-green-600"
                >
                  Background Systems: {isBackgroundActive ? "ACTIVE" : "INACTIVE"}
                </Badge>
                
                <Badge 
                  variant={autonomousActive ? "default" : "secondary"}
                  className="w-full justify-center bg-purple-600"
                >
                  Autonomous Mode: {autonomousActive ? "SUPREME" : "STANDBY"}
                </Badge>
              </div>

              {!isActive && (
                <Button 
                  onClick={activateAutonomousMode}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Activate Supreme Mode
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Summary */}
      <Card className="bg-gray-800/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Network className="h-5 w-5" />
            MIORA System Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">
                {systemsStatus.percentage}%
              </div>
              <div className="text-sm text-gray-400">Systems Active</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {realTimeStats.cpuUsage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-400">CPU Performance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {autonomousState.independentOperations}
              </div>
              <div className="text-sm text-gray-400">Operations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">
                {isFullyAutonomous ? "SUPREME" : "ACTIVE"}
              </div>
              <div className="text-sm text-gray-400">Status Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};