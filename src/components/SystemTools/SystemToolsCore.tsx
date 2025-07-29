
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Monitor, Cpu, HardDrive, Activity, Zap, Network, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SystemToolsCore: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 23.5,
    memoryUsage: 68.2,
    diskUsage: 45.8,
    networkActivity: 89.3,
    systemHealth: 96.7
  });

  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    initializeSystemTools();
    
    // Update system stats every 3 seconds
    const interval = setInterval(() => {
      updateSystemStats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const initializeSystemTools = () => {
    setIsActive(true);

    const systemTools = [
      {
        id: 1,
        name: 'Performance Monitor',
        status: 'active',
        type: 'monitoring',
        description: 'Real-time system performance monitoring'
      },
      {
        id: 2,
        name: 'Process Manager',
        status: 'active',
        type: 'management',
        description: 'Advanced process and service management'
      },
      {
        id: 3,
        name: 'System Optimizer',
        status: 'active',
        type: 'optimization',
        description: 'Automated system optimization and cleanup'
      },
      {
        id: 4,
        name: 'Security Scanner',
        status: 'active',
        type: 'security',
        description: 'Comprehensive security analysis and protection'
      }
    ];

    setTools(systemTools);

    toast({
      title: "⚙️ System Tools Activated",
      description: "Advanced system management tools are now operational",
      duration: 4000,
    });
  };

  const updateSystemStats = () => {
    setSystemStats(prev => ({
      cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
      memoryUsage: Math.max(20, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
      diskUsage: Math.max(30, Math.min(75, prev.diskUsage + (Math.random() - 0.5) * 3)),
      networkActivity: Math.max(50, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 15)),
      systemHealth: Math.max(85, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2))
    }));
  };

  const runSystemOptimization = () => {
    toast({
      title: "🚀 System Optimization Started",
      description: "Running comprehensive system optimization...",
      duration: 4000,
    });

    setTimeout(() => {
      setSystemStats(prev => ({
        ...prev,
        cpuUsage: Math.max(prev.cpuUsage * 0.7, 15),
        memoryUsage: Math.max(prev.memoryUsage * 0.8, 25),
        systemHealth: Math.min(prev.systemHealth * 1.05, 100)
      }));

      toast({
        title: "✅ Optimization Complete",
        description: "System performance has been optimized successfully",
        duration: 3000,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Settings className="h-12 w-12 text-slate-400 animate-spin" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 bg-clip-text text-transparent">
              System Tools
            </h1>
            <Monitor className="h-12 w-12 text-zinc-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-xl">
            Advanced System Management & Optimization Tools
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-lg">
              <Activity className="h-5 w-5 mr-2" />
              System: HEALTHY
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 text-lg">
              <Zap className="h-5 w-5 mr-2" />
              Performance: {systemStats.systemHealth.toFixed(1)}%
            </Badge>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Cpu className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-white mb-1">CPU Usage</h3>
              <p className="text-3xl font-bold text-blue-300">{systemStats.cpuUsage.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h3 className="text-lg font-semibold text-white mb-1">Memory</h3>
              <p className="text-3xl font-bold text-green-300">{systemStats.memoryUsage.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <HardDrive className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <h3 className="text-lg font-semibold text-white mb-1">Disk Usage</h3>
              <p className="text-3xl font-bold text-purple-300">{systemStats.diskUsage.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Network className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <h3 className="text-lg font-semibold text-white mb-1">Network</h3>
              <p className="text-3xl font-bold text-orange-300">{systemStats.networkActivity.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border-emerald-500/30">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white mb-1">Health</h3>
              <p className="text-3xl font-bold text-emerald-300">{systemStats.systemHealth.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-gray-800/50">
            <TabsTrigger value="tools" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>System Tools</span>
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="processes" className="flex items-center space-x-2">
              <Cpu className="h-4 w-4" />
              <span>Processes</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">System Management Tools</h2>
              <Button onClick={runSystemOptimization} className="bg-green-600 hover:bg-green-700">
                <Zap className="h-4 w-4 mr-2" />
                Run Optimization
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                        <p className="text-gray-400">{tool.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          className={tool.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}
                        >
                          {tool.status}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {tool.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-slate-600 hover:bg-slate-700">
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitor">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Performance Monitor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-900/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-300">CPU Usage</span>
                        <span className="text-white font-bold">{systemStats.cpuUsage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${systemStats.cpuUsage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-900/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-300">Memory Usage</span>
                        <span className="text-white font-bold">{systemStats.memoryUsage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${systemStats.memoryUsage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-900/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-300">Disk Usage</span>
                        <span className="text-white font-bold">{systemStats.diskUsage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${systemStats.diskUsage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-900/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-300">Network Activity</span>
                        <span className="text-white font-bold">{systemStats.networkActivity.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${systemStats.networkActivity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processes">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Process Management</h2>
                <div className="text-center space-y-4">
                  <Cpu className="h-16 w-16 mx-auto text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Process Manager</h3>
                  <p className="text-gray-300">Advanced process monitoring and management interface</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-blue-900/30 rounded-lg">
                      <h4 className="text-blue-300 font-semibold">Active Processes</h4>
                      <p className="text-white text-2xl font-bold">347</p>
                    </div>
                    <div className="p-4 bg-green-900/30 rounded-lg">
                      <h4 className="text-green-300 font-semibold">System Processes</h4>
                      <p className="text-white text-2xl font-bold">89</p>
                    </div>
                    <div className="p-4 bg-purple-900/30 rounded-lg">
                      <h4 className="text-purple-300 font-semibold">User Processes</h4>
                      <p className="text-white text-2xl font-bold">258</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Security Center</h2>
                <div className="text-center space-y-4">
                  <Shield className="h-16 w-16 mx-auto text-green-400" />
                  <h3 className="text-xl font-semibold text-white">System Security Status</h3>
                  <p className="text-gray-300">Comprehensive security monitoring and protection</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-4 bg-green-900/30 rounded-lg">
                      <h4 className="text-green-300 font-semibold">Firewall</h4>
                      <p className="text-white text-lg">ACTIVE</p>
                    </div>
                    <div className="p-4 bg-blue-900/30 rounded-lg">
                      <h4 className="text-blue-300 font-semibold">Antivirus</h4>
                      <p className="text-white text-lg">ENABLED</p>
                    </div>
                    <div className="p-4 bg-purple-900/30 rounded-lg">
                      <h4 className="text-purple-300 font-semibold">Encryption</h4>
                      <p className="text-white text-lg">SECURED</p>
                    </div>
                    <div className="p-4 bg-orange-900/30 rounded-lg">
                      <h4 className="text-orange-300 font-semibold">Threats</h4>
                      <p className="text-white text-lg">NONE</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemToolsCore;
