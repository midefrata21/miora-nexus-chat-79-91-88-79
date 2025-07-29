import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Zap, 
  Shield, 
  Server, 
  Brain, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Cpu,
  Network,
  Database,
  Timer,
  BarChart3,
  Gauge
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkThroughput: number;
  responseTime: number;
  activeConnections: number;
  systemLoad: number;
  errorRate: number;
  uptime: number;
}

interface AutoScalingConfig {
  enabled: boolean;
  cpuThreshold: number;
  memoryThreshold: number;
  scaleUpDelay: number;
  scaleDownDelay: number;
  minInstances: number;
  maxInstances: number;
}

export const AdvancedSystemMonitor: React.FC = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 15,
    memoryUsage: 32,
    networkThroughput: 85,
    responseTime: 42,
    activeConnections: 1247,
    systemLoad: 0.65,
    errorRate: 0.02,
    uptime: 99.97
  });

  const [autoScaling, setAutoScaling] = useState<AutoScalingConfig>({
    enabled: true,
    cpuThreshold: 80,
    memoryThreshold: 75,
    scaleUpDelay: 300,
    scaleDownDelay: 600,
    minInstances: 2,
    maxInstances: 20
  });

  const [currentInstances, setCurrentInstances] = useState(4);
  const [scalingHistory, setScalingHistory] = useState<Array<{
    timestamp: string;
    action: 'scale-up' | 'scale-down';
    instances: number;
    reason: string;
  }>>([]);

  // Real-time metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuUsage: Math.max(5, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(10, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkThroughput: Math.max(20, Math.min(100, prev.networkThroughput + (Math.random() - 0.5) * 15)),
        responseTime: Math.max(15, Math.min(200, prev.responseTime + (Math.random() - 0.5) * 20)),
        activeConnections: Math.max(500, Math.min(5000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 200))),
        systemLoad: Math.max(0.1, Math.min(2.0, prev.systemLoad + (Math.random() - 0.5) * 0.3)),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.5)),
        uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scaling logic
  useEffect(() => {
    if (!autoScaling.enabled) return;

    const checkScaling = () => {
      const needsScaleUp = metrics.cpuUsage > autoScaling.cpuThreshold || 
                          metrics.memoryUsage > autoScaling.memoryThreshold;
      
      const needsScaleDown = metrics.cpuUsage < 30 && 
                            metrics.memoryUsage < 40 && 
                            currentInstances > autoScaling.minInstances;

      if (needsScaleUp && currentInstances < autoScaling.maxInstances) {
        setTimeout(() => {
          setCurrentInstances(prev => {
            const newInstances = Math.min(prev + 2, autoScaling.maxInstances);
            setScalingHistory(prevHistory => [{
              timestamp: new Date().toLocaleTimeString(),
              action: 'scale-up',
              instances: newInstances,
              reason: `High resource usage: CPU ${metrics.cpuUsage.toFixed(1)}%, Memory ${metrics.memoryUsage.toFixed(1)}%`
            }, ...prevHistory.slice(0, 9)]);
            
            toast({
              title: "Auto-Scaling Activated",
              description: `Scaled up to ${newInstances} instances`,
            });
            
            return newInstances;
          });
        }, autoScaling.scaleUpDelay * 1000);
      } else if (needsScaleDown) {
        setTimeout(() => {
          setCurrentInstances(prev => {
            const newInstances = Math.max(prev - 1, autoScaling.minInstances);
            setScalingHistory(prevHistory => [{
              timestamp: new Date().toLocaleTimeString(),
              action: 'scale-down',
              instances: newInstances,
              reason: `Low resource usage: CPU ${metrics.cpuUsage.toFixed(1)}%, Memory ${metrics.memoryUsage.toFixed(1)}%`
            }, ...prevHistory.slice(0, 9)]);
            
            toast({
              title: "Auto-Scaling Optimized",
              description: `Scaled down to ${newInstances} instances`,
            });
            
            return newInstances;
          });
        }, autoScaling.scaleDownDelay * 1000);
      }
    };

    const scalingInterval = setInterval(checkScaling, 5000);
    return () => clearInterval(scalingInterval);
  }, [metrics, autoScaling, currentInstances]);

  const getStatusColor = (value: number, type: 'cpu' | 'memory' | 'network' | 'response') => {
    switch (type) {
      case 'cpu':
      case 'memory':
        if (value > 80) return 'text-red-400';
        if (value > 60) return 'text-yellow-400';
        return 'text-green-400';
      case 'network':
        if (value > 90) return 'text-green-400';
        if (value > 50) return 'text-yellow-400';
        return 'text-red-400';
      case 'response':
        if (value < 50) return 'text-green-400';
        if (value < 100) return 'text-yellow-400';
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const toggleAutoScaling = () => {
    setAutoScaling(prev => ({ ...prev, enabled: !prev.enabled }));
    toast({
      title: autoScaling.enabled ? "Auto-Scaling Disabled" : "Auto-Scaling Enabled",
      description: autoScaling.enabled ? "Manual scaling mode activated" : "Automatic scaling mode activated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced System Monitor</h2>
          <p className="text-gray-400">Real-time monitoring dengan auto-scaling & advanced analytics</p>
        </div>
        <Button
          onClick={toggleAutoScaling}
          variant={autoScaling.enabled ? "default" : "secondary"}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Auto-Scaling {autoScaling.enabled ? 'ON' : 'OFF'}
        </Button>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU Usage */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-300 text-sm">
              <Cpu className="w-4 h-4 mr-2" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getStatusColor(metrics.cpuUsage, 'cpu')}`}>
                  {metrics.cpuUsage.toFixed(1)}%
                </span>
                <Badge variant="outline" className="text-xs">
                  {currentInstances} instances
                </Badge>
              </div>
              <Progress value={metrics.cpuUsage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-300 text-sm">
              <Database className="w-4 h-4 mr-2" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getStatusColor(metrics.memoryUsage, 'memory')}`}>
                  {metrics.memoryUsage.toFixed(1)}%
                </span>
                <Badge variant="outline" className="text-xs">
                  {(metrics.memoryUsage * 16 / 100).toFixed(1)}GB
                </Badge>
              </div>
              <Progress value={metrics.memoryUsage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Network Throughput */}
        <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-emerald-300 text-sm">
              <Network className="w-4 h-4 mr-2" />
              Network I/O
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getStatusColor(metrics.networkThroughput, 'network')}`}>
                  {metrics.networkThroughput.toFixed(0)}%
                </span>
                <Badge variant="outline" className="text-xs">
                  {(metrics.networkThroughput * 10).toFixed(0)}MB/s
                </Badge>
              </div>
              <Progress value={metrics.networkThroughput} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-300 text-sm">
              <Timer className="w-4 h-4 mr-2" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getStatusColor(metrics.responseTime, 'response')}`}>
                  {metrics.responseTime.toFixed(0)}ms
                </span>
                <Badge variant="outline" className="text-xs">
                  Target: &lt;50ms
                </Badge>
              </div>
              <Progress value={Math.min(100, metrics.responseTime / 2)} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-300">
              <Activity className="w-5 h-5 mr-2" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">System Load</span>
              <span className="text-white font-mono">{metrics.systemLoad.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Error Rate</span>
              <span className="text-white font-mono">{metrics.errorRate.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Uptime</span>
              <span className="text-green-400 font-mono">{metrics.uptime.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Active Connections</span>
              <span className="text-white font-mono">{metrics.activeConnections.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Scaling Status */}
        <Card className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-300">
              <Server className="w-5 h-5 mr-2" />
              Auto-Scaling Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <Badge variant={autoScaling.enabled ? "default" : "secondary"}>
                {autoScaling.enabled ? 'Active' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Current Instances</span>
              <span className="text-white font-mono">{currentInstances}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">CPU Threshold</span>
              <span className="text-white font-mono">{autoScaling.cpuThreshold}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Memory Threshold</span>
              <span className="text-white font-mono">{autoScaling.memoryThreshold}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Scaling History */}
        <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-violet-300">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recent Scaling Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {scalingHistory.length === 0 ? (
                <p className="text-gray-400 text-sm">No recent scaling events</p>
              ) : (
                scalingHistory.map((event, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs">
                    <div className={`mt-1 w-2 h-2 rounded-full ${
                      event.action === 'scale-up' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">
                          {event.action === 'scale-up' ? '↗️ Scale Up' : '↘️ Scale Down'}
                        </span>
                        <span className="text-gray-400">{event.timestamp}</span>
                      </div>
                      <p className="text-gray-400 mt-1">{event.reason}</p>
                      <p className="text-gray-300">→ {event.instances} instances</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700/30">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-300">
            <Gauge className="w-5 h-5 mr-2" />
            Advanced Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {(metrics.uptime).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-400">System Uptime</div>
              <div className="text-xs text-gray-500 mt-1">Target: &gt;99.9%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {metrics.responseTime.toFixed(0)}ms
              </div>
              <div className="text-sm text-gray-400">Avg Response Time</div>
              <div className="text-xs text-gray-500 mt-1">Target: &lt;50ms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {(100 - metrics.errorRate).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-xs text-gray-500 mt-1">Target: &gt;99.5%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};