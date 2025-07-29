
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Network, 
  Wifi, 
  Globe, 
  Shield, 
  Activity,
  Zap,
  Server,
  Router
} from 'lucide-react';

const NetworkManagerPage = () => {
  const { toast } = useToast();
  const [networkStatus, setNetworkStatus] = useState('connected');

  const networkConnections = [
    { name: 'Primary Network', type: 'ethernet', status: 'connected', speed: '1 Gbps', latency: '2ms' },
    { name: 'Backup WiFi', type: 'wifi', status: 'connected', speed: '100 Mbps', latency: '12ms' },
    { name: 'Cloud Gateway', type: 'cloud', status: 'connected', speed: '500 Mbps', latency: '8ms' },
    { name: 'VPN Tunnel', type: 'vpn', status: 'connected', speed: '200 Mbps', latency: '15ms' }
  ];

  const networkMetrics = [
    { name: 'Bandwidth Usage', value: '45%', icon: Activity, color: 'text-blue-400' },
    { name: 'Active Connections', value: '127', icon: Network, color: 'text-green-400' },
    { name: 'Data Transfer', value: '2.1 GB', icon: Zap, color: 'text-purple-400' },
    { name: 'Firewall Status', value: 'Active', icon: Shield, color: 'text-orange-400' }
  ];

  const runNetworkDiagnostic = () => {
    toast({
      title: "🔍 Network Diagnostic",
      description: "Running comprehensive network analysis...",
      duration: 3000,
    });
  };

  const optimizeNetwork = () => {
    toast({
      title: "⚡ Network Optimization",
      description: "Network performance optimization completed",
      duration: 3000,
    });
  };

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'ethernet': return Network;
      case 'wifi': return Wifi;
      case 'cloud': return Globe;
      case 'vpn': return Shield;
      default: return Network;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Network className="w-8 h-8 text-cyan-400" />
            Network Manager
            <Router className="w-8 h-8 text-teal-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive network monitoring and management system
          </p>
        </div>

        {/* Network Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {networkMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <Card key={metric.name} className="bg-gray-800/50 border-gray-600/30">
                <CardContent className="p-4 text-center">
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.name}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Network Status */}
        <Card className="bg-gray-800/50 border-teal-500/30">
          <CardHeader>
            <CardTitle className="text-teal-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Network Status
              </div>
              <Badge className="bg-green-600 text-white">
                {networkStatus.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networkConnections.map((connection, index) => {
                const IconComponent = getConnectionIcon(connection.type);
                return (
                  <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-cyan-400" />
                        <div>
                          <h3 className="text-white font-medium">{connection.name}</h3>
                          <p className="text-sm text-gray-400">{connection.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-600 text-white mb-1">
                          {connection.status}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          {connection.speed} • {connection.latency}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Network Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300">Network Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={runNetworkDiagnostic}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Activity className="w-4 h-4 mr-2" />
                Run Network Diagnostic
              </Button>
              <Button 
                onClick={optimizeNetwork}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Optimize Network Performance
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Shield className="w-4 h-4 mr-2" />
                Configure Firewall
              </Button>
              <Button variant="outline" className="w-full">
                <Server className="w-4 h-4 mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">Connection Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Download Speed</span>
                    <span className="text-green-300">987 Mbps</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Upload Speed</span>
                    <span className="text-blue-300">456 Mbps</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Latency</span>
                    <span className="text-purple-300">8ms</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Stability</span>
                    <span className="text-cyan-300">99.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetworkManagerPage;
