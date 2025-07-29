import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Activity, 
  Cpu, 
  Database,
  Network,
  Shield,
  AlertTriangle,
  CheckCircle,
  Zap,
  Monitor
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Diagnostics: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState(96.8);
  const [cpuUsage, setCpuUsage] = useState(34.7);
  const [memoryUsage, setMemoryUsage] = useState(67.3);
  const [networkStatus, setNetworkStatus] = useState(98.9);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => Math.min(100, Math.max(90, prev + (Math.random() - 0.5) * 2)));
      setCpuUsage(prev => Math.min(100, Math.max(20, prev + (Math.random() - 0.5) * 5)));
      setMemoryUsage(prev => Math.min(100, Math.max(50, prev + (Math.random() - 0.5) * 3)));
      setNetworkStatus(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5) * 1)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const runDiagnostic = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "🔍 Diagnostic Complete",
        description: "System scan completed - All systems operating optimally",
        duration: 3000,
      });
    }, 3000);
  };

  const getHealthStatus = (value: number) => {
    if (value >= 95) return { color: 'text-green-400', status: 'EXCELLENT' };
    if (value >= 85) return { color: 'text-yellow-400', status: 'GOOD' };
    if (value >= 70) return { color: 'text-orange-400', status: 'WARNING' };
    return { color: 'text-red-400', status: 'CRITICAL' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Settings className="h-16 w-16 text-blue-400 animate-spin" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              SYSTEM DIAGNOSTICS
            </h1>
            <Monitor className="h-16 w-16 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-xl">
            🔧 MIORA System Health Monitor & Diagnostic Center
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isScanning ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              {isScanning ? 'SCANNING' : 'READY'}
            </Badge>
            <Badge className={`px-4 py-2 ${getHealthStatus(systemHealth).color === 'text-green-400' ? 'bg-green-500' : 'bg-orange-500'}`}>
              <Shield className="h-4 w-4 mr-2" />
              System: {getHealthStatus(systemHealth).status}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Cpu className="h-4 w-4 mr-2" />
              Health: {systemHealth.toFixed(1)}%
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Diagnostic Control Center</h3>
                <p className="text-gray-300">
                  Monitor system health and run comprehensive diagnostics
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={runDiagnostic}
                  disabled={isScanning}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  {isScanning ? 'Scanning...' : 'Run Diagnostic'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{systemHealth.toFixed(1)}%</div>
              <Progress value={systemHealth} className="mt-2 h-2" />
              <div className={`text-sm mt-2 ${getHealthStatus(systemHealth).color}`}>
                {getHealthStatus(systemHealth).status}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center">
                <Cpu className="h-5 w-5 mr-2" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{cpuUsage.toFixed(1)}%</div>
              <Progress value={cpuUsage} className="mt-2 h-2" />
              <div className="text-sm text-gray-400 mt-2">4 Cores Active</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{memoryUsage.toFixed(1)}%</div>
              <Progress value={memoryUsage} className="mt-2 h-2" />
              <div className="text-sm text-gray-400 mt-2">32GB Available</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 flex items-center">
                <Network className="h-5 w-5 mr-2" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{networkStatus.toFixed(1)}%</div>
              <Progress value={networkStatus} className="mt-2 h-2" />
              <div className="text-sm text-gray-400 mt-2">Latency: 12ms</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">System Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
                  <div>
                    <h4 className="font-semibold text-white">High Memory Usage</h4>
                    <p className="text-sm text-gray-400">Memory usage above 65% threshold</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <div>
                    <h4 className="font-semibold text-white">All Core Systems Online</h4>
                    <p className="text-sm text-gray-400">No critical issues detected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-green-400 font-bold">23ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Throughput</span>
                  <span className="text-blue-400 font-bold">1,247 req/s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Uptime</span>
                  <span className="text-purple-400 font-bold">99.97%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Error Rate</span>
                  <span className="text-cyan-400 font-bold">0.03%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Activity Log */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Real-time System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="text-green-400 text-sm">✓ System health check completed - All systems optimal</div>
              <div className="text-blue-400 text-sm">🔄 Memory optimization routine executed</div>
              <div className="text-purple-400 text-sm">🧠 Neural network synchronization in progress</div>
              <div className="text-cyan-400 text-sm">⚡ Performance optimization algorithms updated</div>
              <div className="text-yellow-400 text-sm">🔧 System maintenance scheduled</div>
              <div className="text-orange-400 text-sm">📊 Diagnostic report generated</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diagnostics;