
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor as MonitorIcon, 
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  Settings,
  BarChart3,
  Clock,
  Database
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  temperature: number;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: number;
  resolved: boolean;
}

const Monitor: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 23,
    memory: 67,
    disk: 45,
    network: 12,
    temperature: 42
  });

  const [systemHealth, setSystemHealth] = useState<'excellent' | 'good' | 'warning' | 'critical'>('excellent');
  const [uptime, setUptime] = useState(847520); // in seconds
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'info',
      message: 'System optimization completed successfully',
      timestamp: Date.now() - 300000,
      resolved: true
    },
    {
      id: '2',
      type: 'warning',
      message: 'High memory usage detected in background processes',
      timestamp: Date.now() - 600000,
      resolved: false
    }
  ]);

  const [processes] = useState([
    { name: 'MIORA Core Engine', cpu: 15.2, memory: 1.2, status: 'running' },
    { name: 'AI Learning Module', cpu: 8.7, memory: 0.8, status: 'running' },
    { name: 'Voice Recognition', cpu: 3.1, memory: 0.4, status: 'running' },
    { name: 'Neural Network', cpu: 12.5, memory: 2.1, status: 'running' },
    { name: 'Memory Manager', cpu: 2.3, memory: 0.3, status: 'running' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metrics
      setMetrics(prev => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(0, Math.min(100, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
        temperature: Math.max(20, Math.min(80, prev.temperature + (Math.random() - 0.5) * 3))
      }));

      setUptime(prev => prev + 1);

      // Update system health based on metrics
      setSystemHealth(prev => {
        const avgLoad = (metrics.cpu + metrics.memory) / 2;
        if (avgLoad > 80) return 'critical';
        if (avgLoad > 65) return 'warning';
        if (avgLoad > 40) return 'good';
        return 'excellent';
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [metrics.cpu, metrics.memory]);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'good': return 'text-blue-400 bg-blue-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getProgressColor = (value: number) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const refreshMetrics = () => {
    toast({
      title: "🔄 Metrics Refreshed",
      description: "System monitoring data has been updated",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <Badge className={`${getHealthColor(systemHealth)} border-0 px-4 py-2`}>
              <Activity className="w-3 h-3 mr-1" />
              {systemHealth.toUpperCase()}
            </Badge>
            <Button onClick={refreshMetrics} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <MonitorIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">System Monitor</h1>
          <p className="text-gray-300 text-lg">Real-time Development Environment Monitoring</p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.cpu.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">CPU Usage</div>
                </div>
              </div>
              <Progress value={metrics.cpu} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.memory.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Memory</div>
                </div>
              </div>
              <Progress value={metrics.memory} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <HardDrive className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.disk.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Disk Usage</div>
                </div>
              </div>
              <Progress value={metrics.disk} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{metrics.network.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Network</div>
                </div>
              </div>
              <Progress value={metrics.network} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Information */}
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Uptime</div>
                  <div className="text-white font-medium">{formatUptime(uptime)}</div>
                </div>
                <div>
                  <div className="text-gray-400">Temperature</div>
                  <div className="text-white font-medium">{metrics.temperature.toFixed(1)}°C</div>
                </div>
                <div>
                  <div className="text-gray-400">Load Average</div>
                  <div className="text-white font-medium">0.45, 0.52, 0.48</div>
                </div>
                <div>
                  <div className="text-gray-400">Processes</div>
                  <div className="text-white font-medium">{processes.length} active</div>
                </div>
                <div>
                  <div className="text-gray-400">MIORA Version</div>
                  <div className="text-white font-medium">v2.1.0</div>
                </div>
                <div>
                  <div className="text-gray-400">Node Version</div>
                  <div className="text-white font-medium">v18.17.0</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Running Processes */}
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Running Processes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {processes.map((process, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{process.name}</div>
                      <div className="text-xs text-gray-400">
                        CPU: {process.cpu}% | Memory: {process.memory}GB
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-0">
                      {process.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="bg-gray-800/50 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-300 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="mt-0.5">
                      {alert.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                      {alert.type === 'info' && <CheckCircle className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white">{alert.message}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs text-gray-400">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </div>
                        <Badge 
                          className={`text-xs ${
                            alert.resolved 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          } border-0`}
                        >
                          {alert.resolved ? 'Resolved' : 'Active'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts Placeholder */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Charts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-700/30 rounded-lg text-center">
                <div className="text-gray-400 mb-2">CPU Usage Trend (24h)</div>
                <div className="h-32 flex items-center justify-center">
                  <div className="text-gray-500">Chart visualization would be here</div>
                </div>
              </div>
              <div className="p-6 bg-gray-700/30 rounded-lg text-center">
                <div className="text-gray-400 mb-2">Memory Usage Trend (24h)</div>
                <div className="h-32 flex items-center justify-center">
                  <div className="text-gray-500">Chart visualization would be here</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Monitor;
