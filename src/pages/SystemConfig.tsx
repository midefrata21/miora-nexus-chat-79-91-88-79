import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Cpu, 
  HardDrive, 
  Network, 
  Shield,
  Zap,
  Activity
} from 'lucide-react';

const SystemConfigPage = () => {
  const { toast } = useToast();
  const [systemConfig, setSystemConfig] = useState({
    maxMemoryUsage: 75,
    cpuThreads: 8,
    networkTimeout: 30,
    autoOptimization: true,
    debugMode: false,
    securityLevel: 'high',
    backupInterval: 24
  });

  const handleConfigChange = (key: string, value: any) => {
    setSystemConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyConfiguration = () => {
    toast({
      title: "⚙️ Configuration Applied",
      description: "System configuration has been updated successfully",
      duration: 3000,
    });
  };

  const systemMetrics = [
    { name: 'CPU Usage', value: '45%', icon: Cpu, color: 'text-blue-400' },
    { name: 'Memory Usage', value: '62%', icon: HardDrive, color: 'text-green-400' },
    { name: 'Storage', value: '38%', icon: HardDrive, color: 'text-purple-400' },
    { name: 'Network', value: 'Active', icon: Network, color: 'text-cyan-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Settings className="w-8 h-8 text-cyan-400" />
            System Configuration
            <Cpu className="w-8 h-8 text-blue-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced system settings and performance optimization
          </p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemMetrics.map((metric) => {
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

        {/* Configuration Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Settings */}
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Performance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Max Memory Usage (%)</label>
                <Input
                  type="number"
                  value={systemConfig.maxMemoryUsage}
                  onChange={(e) => handleConfigChange('maxMemoryUsage', parseInt(e.target.value))}
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">CPU Threads</label>
                <Input
                  type="number"
                  value={systemConfig.cpuThreads}
                  onChange={(e) => handleConfigChange('cpuThreads', parseInt(e.target.value))}
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Auto Optimization</span>
                <Switch
                  checked={systemConfig.autoOptimization}
                  onCheckedChange={(checked) => handleConfigChange('autoOptimization', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Network Timeout (seconds)</label>
                <Input
                  type="number"
                  value={systemConfig.networkTimeout}
                  onChange={(e) => handleConfigChange('networkTimeout', parseInt(e.target.value))}
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Backup Interval (hours)</label>
                <Input
                  type="number"
                  value={systemConfig.backupInterval}
                  onChange={(e) => handleConfigChange('backupInterval', parseInt(e.target.value))}
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Debug Mode</span>
                <Switch
                  checked={systemConfig.debugMode}
                  onCheckedChange={(checked) => handleConfigChange('debugMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">OPTIMAL</div>
                <div className="text-sm text-gray-400">System Health</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">99.8%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300">SECURE</div>
                <div className="text-sm text-gray-400">Security Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apply Configuration */}
        <div className="text-center">
          <Button
            onClick={applyConfiguration}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8"
          >
            <Settings className="w-5 h-5 mr-2" />
            Apply Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigPage;
