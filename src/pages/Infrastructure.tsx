
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Server, 
  Cloud,
  Database,
  Shield,
  Zap,
  Globe,
  ArrowLeft,
  Activity,
  Settings,
  HardDrive,
  Cpu,
  Network,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface InfrastructureComponent {
  id: string;
  name: string;
  type: 'server' | 'database' | 'cdn' | 'loadbalancer' | 'storage';
  status: 'online' | 'offline' | 'maintenance' | 'degraded';
  region: string;
  uptime: number;
  load: number;
}

const Infrastructure: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [autoScaling, setAutoScaling] = useState(true);
  const [loadBalancing, setLoadBalancing] = useState(true);
  const [cdnEnabled, setCdnEnabled] = useState(true);
  
  const [infrastructure, setInfrastructure] = useState<InfrastructureComponent[]>([
    {
      id: 'web-server-1',
      name: 'Web Server Primary',
      type: 'server',
      status: 'online',
      region: 'US-East',
      uptime: 99.9,
      load: 45
    },
    {
      id: 'web-server-2',
      name: 'Web Server Secondary',
      type: 'server',
      status: 'online',
      region: 'US-West',
      uptime: 99.7,
      load: 32
    },
    {
      id: 'database-primary',
      name: 'Primary Database',
      type: 'database',
      status: 'online',
      region: 'US-East',
      uptime: 99.95,
      load: 28
    },
    {
      id: 'database-replica',
      name: 'Database Replica',
      type: 'database',
      status: 'online',
      region: 'EU-West',
      uptime: 99.8,
      load: 15
    },
    {
      id: 'cdn-global',
      name: 'Global CDN',
      type: 'cdn',
      status: 'online',
      region: 'Global',
      uptime: 99.99,
      load: 67
    },
    {
      id: 'load-balancer',
      name: 'Load Balancer',
      type: 'loadbalancer',
      status: 'online',
      region: 'Multi-Region',
      uptime: 99.95,
      load: 23
    }
  ]);

  const [systemMetrics] = useState({
    totalRequests: 2847291,
    activeConnections: 1247,
    dataTransfer: '847.2 TB',
    responseTime: 89,
    errorRate: 0.01,
    throughput: 15420
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setInfrastructure(prev => prev.map(component => ({
        ...component,
        load: Math.max(0, Math.min(100, component.load + (Math.random() - 0.5) * 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/20';
      case 'offline': return 'text-red-400 bg-red-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'degraded': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'cdn': return <Globe className="w-4 h-4" />;
      case 'loadbalancer': return <Network className="w-4 h-4" />;
      case 'storage': return <HardDrive className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const handleScaleUp = () => {
    toast({
      title: "📈 Scaling Up",
      description: "Additional server instances are being deployed",
      duration: 4000,
    });
  };

  const handleDeploy = () => {
    toast({
      title: "🚀 Deployment Started",
      description: "New version is being deployed across all regions",
      duration: 4000,
    });
  };

  const toggleAutoScaling = () => {
    setAutoScaling(!autoScaling);
    toast({
      title: autoScaling ? "⏸️ Auto-scaling Disabled" : "▶️ Auto-scaling Enabled",
      description: `Auto-scaling has been ${autoScaling ? 'disabled' : 'enabled'}`,
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
            <Badge className="bg-green-500 text-white px-3 py-1">
              <Activity className="w-3 h-3 mr-1" />
              All Systems Operational
            </Badge>
            <Button onClick={handleDeploy} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Server className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Infrastructure Core</h1>
          <p className="text-gray-300 text-lg">Complete Infrastructure Management System</p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {(systemMetrics.totalRequests / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-gray-400">Total Requests</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{systemMetrics.activeConnections}</div>
              <div className="text-xs text-gray-400">Active Connections</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{systemMetrics.dataTransfer}</div>
              <div className="text-xs text-gray-400">Data Transfer</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{systemMetrics.responseTime}ms</div>
              <div className="text-xs text-gray-400">Avg Response</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-red-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{systemMetrics.errorRate}%</div>
              <div className="text-xs text-gray-400">Error Rate</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">{systemMetrics.throughput}</div>
              <div className="text-xs text-gray-400">Req/min</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Infrastructure Components */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Infrastructure Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructure.map((component) => (
                    <div
                      key={component.id}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getTypeIcon(component.type)}
                        <div>
                          <div className="font-medium text-white">{component.name}</div>
                          <div className="text-sm text-gray-400">{component.region}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-white">{component.uptime}% uptime</div>
                          <div className="text-xs text-gray-400">Load: {component.load.toFixed(0)}%</div>
                        </div>
                        <Progress value={component.load} className="w-20 h-2" />
                        <Badge className={`${getStatusColor(component.status)} border-0`}>
                          {component.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Control Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Auto Scaling</div>
                      <div className="text-sm text-gray-400">Automatic resource scaling</div>
                    </div>
                    <Switch
                      checked={autoScaling}
                      onCheckedChange={toggleAutoScaling}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Load Balancing</div>
                      <div className="text-sm text-gray-400">Distribute traffic</div>
                    </div>
                    <Switch
                      checked={loadBalancing}
                      onCheckedChange={setLoadBalancing}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">CDN</div>
                      <div className="text-sm text-gray-400">Content delivery network</div>
                    </div>
                    <Switch
                      checked={cdnEnabled}
                      onCheckedChange={setCdnEnabled}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={handleScaleUp}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Scale Up
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Security Scan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300">Deployment Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { region: 'US-East-1', status: 'active', load: 67 },
                    { region: 'US-West-2', status: 'active', load: 45 },
                    { region: 'EU-West-1', status: 'active', load: 32 },
                    { region: 'Asia-Pacific', status: 'maintenance', load: 0 }
                  ].map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-white">{region.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{region.load}%</span>
                        <Badge 
                          className={`text-xs ${
                            region.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          } border-0`}
                        >
                          {region.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alert Status */}
        <Card className="bg-gray-800/50 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Status & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-medium text-green-300">All Systems Operational</div>
                  <div className="text-sm text-gray-400">No critical issues detected</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <Activity className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium text-blue-300">High Performance</div>
                  <div className="text-sm text-gray-400">Response time under 100ms</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <Cloud className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-medium text-purple-300">Cloud Integration</div>
                  <div className="text-sm text-gray-400">Multi-cloud deployment active</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Infrastructure;
