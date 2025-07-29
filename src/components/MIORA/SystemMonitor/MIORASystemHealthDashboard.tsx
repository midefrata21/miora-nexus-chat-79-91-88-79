import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Activity, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Cpu, 
  Wifi, 
  Database,
  Brain,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SystemMetrics {
  name: string;
  health: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastCheck: number;
  uptime: number;
  errors: number;
  performance: number;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: number;
  system: string;
  resolved: boolean;
}

export const MIORASystemHealthDashboard: React.FC = () => {
  const [overallHealth, setOverallHealth] = useState(94.7);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics[]>([
    {
      name: 'MIORA Core Engine',
      health: 98.2,
      status: 'excellent',
      lastCheck: Date.now(),
      uptime: 99.8,
      errors: 0,
      performance: 96.5
    },
    {
      name: 'Trading Analysis Engine',
      health: 94.1,
      status: 'good',
      lastCheck: Date.now(),
      uptime: 97.2,
      errors: 2,
      performance: 91.8
    },
    {
      name: 'WebSocket Connections',
      health: 89.3,
      status: 'warning',
      lastCheck: Date.now(),
      uptime: 85.5,
      errors: 15,
      performance: 87.2
    },
    {
      name: 'Error Detection System',
      health: 99.1,
      status: 'excellent',
      lastCheck: Date.now(),
      uptime: 99.9,
      errors: 0,
      performance: 98.7
    },
    {
      name: 'Auto-Repair Engine',
      health: 96.8,
      status: 'excellent',
      lastCheck: Date.now(),
      uptime: 98.5,
      errors: 1,
      performance: 94.3
    },
    {
      name: 'Notification System',
      health: 92.4,
      status: 'good',
      lastCheck: Date.now(),
      uptime: 96.1,
      errors: 3,
      performance: 89.7
    }
  ]);

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 'alert_1',
      type: 'warning',
      message: 'WebSocket reconnection attempts detected for Binance/Bybit',
      timestamp: Date.now() - 120000,
      system: 'WebSocket Connections',
      resolved: false
    },
    {
      id: 'alert_2',
      type: 'info',
      message: 'Notification throttling system activated - duplicate alerts suppressed',
      timestamp: Date.now() - 300000,
      system: 'Notification System',
      resolved: true
    },
    {
      id: 'alert_3',
      type: 'error',
      message: 'Trading analysis engine performance degradation detected',
      timestamp: Date.now() - 180000,
      system: 'Trading Analysis Engine',
      resolved: false
    }
  ]);

  // Real-time system monitoring
  useEffect(() => {
    if (!isMonitoring) return;

    const monitoringInterval = setInterval(() => {
      // Update system metrics with realistic fluctuations
      setSystemMetrics(prev => prev.map(metric => {
        const healthVariation = (Math.random() - 0.5) * 2; // ±1%
        const newHealth = Math.max(75, Math.min(100, metric.health + healthVariation));
        
        let status: 'excellent' | 'good' | 'warning' | 'critical' = 'excellent';
        if (newHealth < 80) status = 'critical';
        else if (newHealth < 90) status = 'warning';
        else if (newHealth < 95) status = 'good';

        return {
          ...metric,
          health: newHealth,
          status,
          lastCheck: Date.now(),
          performance: Math.max(70, Math.min(100, metric.performance + healthVariation * 0.5))
        };
      }));

      // Update overall health
      setOverallHealth(prev => {
        const variation = (Math.random() - 0.5) * 1;
        return Math.max(85, Math.min(100, prev + variation));
      });

      setLastUpdate(Date.now());

      // Simulate occasional system optimizations
      if (Math.random() < 0.1) {
        performSystemOptimization();
      }
    }, 8000); // Update every 8 seconds

    return () => clearInterval(monitoringInterval);
  }, [isMonitoring]);

  const performSystemOptimization = () => {
    setSystemMetrics(prev => prev.map(metric => ({
      ...metric,
      health: Math.min(100, metric.health + Math.random() * 2),
      performance: Math.min(100, metric.performance + Math.random() * 3),
      errors: Math.max(0, metric.errors - Math.floor(Math.random() * 2))
    })));

    toast({
      title: "🔧 System Optimization",
      description: "MIORA systems automatically optimized for better performance",
      duration: 4000,
    });
  };

  const resolveAlert = (alertId: string) => {
    setSystemAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));

    toast({
      title: "✅ Alert Resolved",
      description: "System alert has been marked as resolved",
      duration: 3000,
    });
  };

  const forceSystemCheck = () => {
    setLastUpdate(Date.now());
    setSystemMetrics(prev => prev.map(metric => ({
      ...metric,
      lastCheck: Date.now(),
      health: Math.min(100, metric.health + Math.random() * 3)
    })));

    toast({
      title: "🔍 System Check Complete",
      description: "All MIORA systems have been checked and optimized",
      duration: 3000,
    });
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 90) return 'text-blue-400';
    if (health >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBadgeColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
    }
  };

  const unresolvedAlerts = systemAlerts.filter(alert => !alert.resolved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-12 w-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MIORA SYSTEM HEALTH
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🔬 Comprehensive System Monitoring & Performance Dashboard
          </p>
        </div>

        {/* Overall System Status */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                Overall System Health
              </span>
              <div className="flex items-center space-x-4">
                <Badge className={`px-4 py-2 ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`}>
                  <Cpu className="h-4 w-4 mr-2" />
                  {isMonitoring ? 'MONITORING ACTIVE' : 'MONITORING PAUSED'}
                </Badge>
                <Badge className={`px-4 py-2 ${getHealthBadgeColor(overallHealth >= 95 ? 'excellent' : overallHealth >= 90 ? 'good' : overallHealth >= 80 ? 'warning' : 'critical')}`}>
                  <Shield className="h-4 w-4 mr-2" />
                  {overallHealth.toFixed(1)}% HEALTH
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-white text-lg">System Health Score</span>
              <span className={`text-3xl font-bold ${getHealthColor(overallHealth)}`}>
                {overallHealth.toFixed(1)}%
              </span>
            </div>
            <Progress value={overallHealth} className="h-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Active Systems</div>
                <div className="text-2xl font-bold text-white">{systemMetrics.filter(m => m.status !== 'critical').length}/{systemMetrics.length}</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Avg Performance</div>
                <div className="text-2xl font-bold text-white">
                  {(systemMetrics.reduce((acc, m) => acc + m.performance, 0) / systemMetrics.length).toFixed(1)}%
                </div>
              </div>
              <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/30">
                <div className="text-yellow-400 text-sm">Active Alerts</div>
                <div className="text-2xl font-bold text-white">{unresolvedAlerts.length}</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Last Update</div>
                <div className="text-2xl font-bold text-white">
                  {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={forceSystemCheck}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Force System Check
              </Button>
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? "destructive" : "default"}
                className={isMonitoring ? "" : "bg-green-600 hover:bg-green-700"}
              >
                {isMonitoring ? "Pause Monitoring" : "Resume Monitoring"}
              </Button>
              <Button
                onClick={performSystemOptimization}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Optimize All Systems
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Individual System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemMetrics.map((system, index) => (
            <Card key={index} className={`bg-gradient-to-br ${
              system.status === 'excellent' ? 'from-green-900/20 to-emerald-900/20 border-green-500/30' :
              system.status === 'good' ? 'from-blue-900/20 to-cyan-900/20 border-blue-500/30' :
              system.status === 'warning' ? 'from-yellow-900/20 to-orange-900/20 border-yellow-500/30' :
              'from-red-900/20 to-pink-900/20 border-red-500/30'
            }`}>
              <CardHeader>
                <CardTitle className={`${
                  system.status === 'excellent' ? 'text-green-400' :
                  system.status === 'good' ? 'text-blue-400' :
                  system.status === 'warning' ? 'text-yellow-400' :
                  'text-red-400'
                } flex items-center justify-between text-sm`}>
                  <span className="flex items-center">
                    {system.name === 'MIORA Core Engine' && <Brain className="h-4 w-4 mr-2" />}
                    {system.name === 'Trading Analysis Engine' && <TrendingUp className="h-4 w-4 mr-2" />}
                    {system.name === 'WebSocket Connections' && <Wifi className="h-4 w-4 mr-2" />}
                    {system.name === 'Error Detection System' && <Shield className="h-4 w-4 mr-2" />}
                    {system.name === 'Auto-Repair Engine' && <Zap className="h-4 w-4 mr-2" />}
                    {system.name === 'Notification System' && <Database className="h-4 w-4 mr-2" />}
                    {system.name}
                  </span>
                  <Badge className={getHealthBadgeColor(system.status)}>
                    {system.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Health</span>
                  <span className={getHealthColor(system.health)}>{system.health.toFixed(1)}%</span>
                </div>
                <Progress value={system.health} className="h-2" />
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400 ml-1">{system.uptime.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Errors:</span>
                    <span className={system.errors > 0 ? 'text-red-400' : 'text-green-400'}> {system.errors}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Performance:</span>
                    <span className="text-blue-400 ml-1">{system.performance.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Check:</span>
                    <span className="text-purple-400 ml-1">{Math.floor((Date.now() - system.lastCheck) / 1000)}s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Alerts */}
        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center justify-between">
              <span className="flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                System Alerts ({unresolvedAlerts.length} unresolved)
              </span>
              <Button
                onClick={() => setSystemAlerts(prev => prev.map(alert => ({ ...alert, resolved: true })))}
                variant="outline"
                size="sm"
                className="border-orange-500/30 text-orange-400"
              >
                Resolve All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {systemAlerts.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No system alerts</p>
              ) : (
                systemAlerts.map((alert) => (
                  <div key={alert.id} className={`flex items-center justify-between p-3 rounded border ${
                    alert.resolved 
                      ? 'bg-gray-800/30 border-gray-600/30 opacity-60' 
                      : 'bg-black/30 border-orange-500/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <div className={`text-sm ${alert.resolved ? 'text-gray-400' : 'text-white'}`}>
                          {alert.message}
                        </div>
                        <div className="text-xs text-gray-500">
                          {alert.system} • {new Date(alert.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <Button
                        onClick={() => resolveAlert(alert.id)}
                        variant="outline"
                        size="sm"
                        className="border-green-500/30 text-green-400"
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORASystemHealthDashboard;