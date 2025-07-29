
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Monitor, 
  Network, 
  Database, 
  Shield, 
  Cpu,
  HardDrive,
  Activity,
  Zap,
  Wifi
} from 'lucide-react';

const SystemTools = () => {
  const systemStatus = [
    { name: 'CPU Usage', value: 45, icon: Cpu, color: 'text-blue-400', status: 'Normal' },
    { name: 'Memory', value: 68, icon: Database, color: 'text-green-400', status: 'Normal' },
    { name: 'Storage', value: 32, icon: HardDrive, color: 'text-purple-400', status: 'Good' },
    { name: 'Network', value: 89, icon: Network, color: 'text-orange-400', status: 'High' }
  ];

  const systemTools = [
    { 
      title: 'System Monitor', 
      description: 'Real-time system performance monitoring', 
      icon: Monitor, 
      action: 'Launch Monitor',
      color: 'from-blue-600 to-cyan-600'
    },
    { 
      title: 'Network Manager', 
      description: 'Network configuration and diagnostics', 
      icon: Wifi, 
      action: 'Manage Network',
      color: 'from-green-600 to-emerald-600'
    },
    { 
      title: 'Security Center', 
      description: 'System security and firewall management', 
      icon: Shield, 
      action: 'Security Settings',
      color: 'from-red-600 to-orange-600'
    },
    { 
      title: 'Performance Optimizer', 
      description: 'System optimization and cleanup tools', 
      icon: Zap, 
      action: 'Run Optimization',
      color: 'from-purple-600 to-pink-600'
    },
    { 
      title: 'Process Manager', 
      description: 'View and manage running processes', 
      icon: Activity, 
      action: 'View Processes',
      color: 'from-cyan-600 to-blue-600'
    },
    { 
      title: 'System Configuration', 
      description: 'Advanced system settings and configuration', 
      icon: Settings, 
      action: 'Open Settings',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'Good': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            MIORA System Tools
          </h1>
          <p className="text-gray-300 text-lg">System Management & Configuration Center</p>
        </div>

        {/* System Status Overview */}
        <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-3">
              <Activity className="w-6 h-6" />
              System Status Overview
              <Badge className="bg-green-500/20 text-green-400 border-green-500">
                <Activity className="w-4 h-4 mr-1" />
                All Systems Operational
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStatus.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <h3 className="text-white font-medium mb-2">{item.name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Usage:</span>
                        <span className="text-white font-semibold">{item.value}%</span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Tools Grid */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              System Management Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemTools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-gray-700/50 border-gray-600/50 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                          Ready
                        </Badge>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                      <Button 
                        className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-80`}
                      >
                        {tool.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Quick System Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Run System Diagnostics
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                  <Monitor className="w-4 h-4 mr-2" />
                  Performance Scan
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                  <Database className="w-4 h-4 mr-2" />
                  Clean System Cache
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Audit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <Monitor className="w-6 h-6" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">OS Version:</span>
                  <span className="text-white">MIORA OS v3.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kernel:</span>
                  <span className="text-white">AI-Kernel 5.15.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="text-white">7 days, 12:34:56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Architecture:</span>
                  <span className="text-white">x86_64</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Memory:</span>
                  <span className="text-white">32.0 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available Storage:</span>
                  <span className="text-white">2.1 TB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemTools;
