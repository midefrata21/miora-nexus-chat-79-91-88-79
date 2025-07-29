import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAdvancedMonitoring } from '../hooks/useAdvancedMonitoring';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi,
  Zap,
  Shield,
  Target,
  Clock
} from 'lucide-react';

const AdvancedMonitoringDashboard: React.FC = () => {
  const {
    systemMetrics,
    performanceData,
    healthStatus,
    alertsData,
    autonomousMode,
    setAutonomousMode,
    triggerDeepScan,
    optimizeSystem,
    generateReport
  } = useAdvancedMonitoring();

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBg = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header Controls */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-blue-300">
              <Activity className="w-6 h-6 mr-2" />
              Advanced Monitoring Dashboard
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Autonomous Mode</span>
                <Switch
                  checked={autonomousMode}
                  onCheckedChange={setAutonomousMode}
                />
              </div>
              <Badge className={`${autonomousMode ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                {autonomousMode ? 'AUTO' : 'MANUAL'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button onClick={triggerDeepScan} className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Deep System Scan
            </Button>
            <Button onClick={optimizeSystem} className="bg-green-600 hover:bg-green-700">
              <Zap className="w-4 h-4 mr-2" />
              Optimize Performance
            </Button>
            <Button onClick={generateReport} className="bg-purple-600 hover:bg-purple-700">
              <Shield className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Overall Health</p>
                <p className={`text-2xl font-bold ${getHealthColor(healthStatus.overall)}`}>
                  {healthStatus.overall}%
                </p>
              </div>
              <CheckCircle className={`w-8 h-8 ${getHealthColor(healthStatus.overall)}`} />
            </div>
            <Progress value={healthStatus.overall} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">CPU Usage</p>
                <p className={`text-2xl font-bold ${getHealthColor(100 - systemMetrics.cpu)}`}>
                  {systemMetrics.cpu}%
                </p>
              </div>
              <Cpu className="w-8 h-8 text-blue-400" />
            </div>
            <Progress value={systemMetrics.cpu} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Memory Usage</p>
                <p className={`text-2xl font-bold ${getHealthColor(100 - systemMetrics.memory)}`}>
                  {systemMetrics.memory}%
                </p>
              </div>
              <MemoryStick className="w-8 h-8 text-purple-400" />
            </div>
            <Progress value={systemMetrics.memory} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Response Time</p>
                <p className="text-2xl font-bold text-orange-400">
                  {systemMetrics.responseTime}ms
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
            <Progress value={Math.min(100, (systemMetrics.responseTime / 1000) * 100)} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-gray-900/30 to-indigo-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-300 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${trend.direction === 'up' ? 'bg-green-500' : trend.direction === 'down' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-white">{trend.metric}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${trend.direction === 'up' ? 'text-green-400' : trend.direction === 'down' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {trend.change}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {trend.period}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-900/30 to-red-900/30 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertsData.active.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  No active alerts
                </div>
              ) : (
                alertsData.active.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500 bg-red-900/20' :
                    alert.severity === 'warning' ? 'border-yellow-500 bg-yellow-900/20' :
                    'border-blue-500 bg-blue-900/20'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">{alert.title}</span>
                      <Badge className={`${
                        alert.severity === 'critical' ? 'bg-red-500' :
                        alert.severity === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      } text-white text-xs`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{alert.description}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(alert.timestamp).toLocaleString('id-ID')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Resources */}
      <Card className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 border-teal-500/30">
        <CardHeader>
          <CardTitle className="text-teal-300 flex items-center">
            <HardDrive className="w-5 h-5 mr-2" />
            System Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-cyan-300 font-medium">Storage</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Used Space</span>
                  <span className="text-cyan-300">{systemMetrics.storage.used}GB / {systemMetrics.storage.total}GB</span>
                </div>
                <Progress value={(systemMetrics.storage.used / systemMetrics.storage.total) * 100} className="h-2" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-cyan-300 font-medium">Network</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Bandwidth Usage</span>
                  <span className="text-cyan-300">{systemMetrics.network.bandwidth}%</span>
                </div>
                <Progress value={systemMetrics.network.bandwidth} className="h-2" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-cyan-300 font-medium">Active Connections</h3>
              <div className="flex items-center justify-between">
                <Wifi className="w-6 h-6 text-cyan-400" />
                <span className="text-2xl font-bold text-cyan-300">
                  {systemMetrics.network.connections}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedMonitoringDashboard;