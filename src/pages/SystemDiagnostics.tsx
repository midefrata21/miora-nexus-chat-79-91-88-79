import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Cpu, 
  Database, 
  HardDrive,
  MemoryStick,
  Network,
  RefreshCw,
  Shield,
  TrendingUp,
  Wifi,
  Zap
} from 'lucide-react';

const SystemDiagnostics = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(new Date().toLocaleString());

  const runDiagnostics = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScan(new Date().toLocaleString());
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            System Diagnostics
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-300">Comprehensive System Health Monitoring</p>
            <Button 
              onClick={runDiagnostics}
              disabled={isScanning}
              className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/30"
            >
              {isScanning ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Activity className="w-4 h-4 mr-2" />
              )}
              {isScanning ? 'Scanning...' : 'Run Full Scan'}
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-green-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">System Health</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Excellent</Badge>
              </div>
            </div>
            <Progress value={96} className="mb-2" />
            <p className="text-gray-400 text-sm">Overall System Score: 96%</p>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">CPU Usage</h3>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">Normal</Badge>
              </div>
            </div>
            <Progress value={68} className="mb-2" />
            <p className="text-gray-400 text-sm">68% - 8 cores active</p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MemoryStick className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Memory</h3>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Optimal</Badge>
              </div>
            </div>
            <Progress value={74} className="mb-2" />
            <p className="text-gray-400 text-sm">74% - 12GB used</p>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Storage</h3>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Good</Badge>
              </div>
            </div>
            <Progress value={45} className="mb-2" />
            <p className="text-gray-400 text-sm">45% - 2.3TB free</p>
          </Card>
        </div>

        {/* Detailed Diagnostics */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">CPU Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Core 1</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-24" />
                        <span className="text-cyan-400">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Core 2</span>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="w-24" />
                        <span className="text-cyan-400">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Core 3</span>
                      <div className="flex items-center gap-2">
                        <Progress value={58} className="w-24" />
                        <span className="text-cyan-400">58%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Memory Usage</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">System RAM</span>
                      <div className="flex items-center gap-2">
                        <Progress value={74} className="w-24" />
                        <span className="text-purple-400">12GB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">GPU Memory</span>
                      <div className="flex items-center gap-2">
                        <Progress value={42} className="w-24" />
                        <span className="text-purple-400">3.4GB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Cache</span>
                      <div className="flex items-center gap-2">
                        <Progress value={89} className="w-24" />
                        <span className="text-purple-400">2.1GB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Network className="w-6 h-6 text-cyan-400" />
                Network Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Internet Connection</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">Download Speed</span>
                    </div>
                    <span className="text-cyan-400">847 Mbps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Upload Speed</span>
                    </div>
                    <span className="text-purple-400">234 Mbps</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Latency</span>
                    <span className="text-green-400">12ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Packet Loss</span>
                    <span className="text-green-400">0%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">DNS Response</span>
                    <span className="text-green-400">8ms</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                Security Assessment
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Firewall Status</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Antivirus Protection</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Updated</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Intrusion Detection</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Monitoring</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Security Updates</span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400">2 Pending</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Recent System Events
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">Memory optimization completed</span>
                  </div>
                  <span className="text-yellow-400 text-sm">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">System backup successful</span>
                  </div>
                  <span className="text-green-400 text-sm">15 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Performance boost activated</span>
                  </div>
                  <span className="text-blue-400 text-sm">1 hour ago</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Last scan: {lastScan}
        </div>
      </div>
    </div>
  );
};

export default SystemDiagnostics;