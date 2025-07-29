import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  Database, 
  Cloud, 
  Network, 
  Shield, 
  Monitor,
  HardDrive,
  Cpu,
  Activity,
  Settings,
  Power,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe
} from 'lucide-react';

const InfrastructureManagement = () => {
  const [autoScale, setAutoScale] = useState(true);
  const [loadBalancing, setLoadBalancing] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Infrastructure Management
          </h1>
          <p className="text-gray-300">Manage and monitor system infrastructure components</p>
        </div>

        {/* Infrastructure Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-green-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Servers</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">12 Active</Badge>
              </div>
            </div>
            <Progress value={92} className="mb-2" />
            <p className="text-gray-400 text-sm">92% Uptime This Month</p>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Databases</h3>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">5 Online</Badge>
              </div>
            </div>
            <Progress value={87} className="mb-2" />
            <p className="text-gray-400 text-sm">87% Performance Index</p>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Cloud Services</h3>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Operational</Badge>
              </div>
            </div>
            <Progress value={95} className="mb-2" />
            <p className="text-gray-400 text-sm">95% Service Availability</p>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Network</h3>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Stable</Badge>
              </div>
            </div>
            <Progress value={98} className="mb-2" />
            <p className="text-gray-400 text-sm">98% Network Reliability</p>
          </Card>
        </div>

        {/* Detailed Management */}
        <Tabs defaultValue="servers" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Server className="w-6 h-6 text-cyan-400" />
                  Server Management
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setAutoScale(!autoScale)}
                    className={autoScale ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-gray-500/20 text-gray-400 border-gray-500/50"}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Auto-Scale: {autoScale ? 'ON' : 'OFF'}
                  </Button>
                  <Button
                    onClick={() => setLoadBalancing(!loadBalancing)}
                    className={loadBalancing ? "bg-blue-500/20 text-blue-400 border-blue-500/50" : "bg-gray-500/20 text-gray-400 border-gray-500/50"}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Load Balancing: {loadBalancing ? 'ON' : 'OFF'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((server) => (
                  <Card key={server} className="bg-gray-700/50 border-gray-600 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">Server-{server.toString().padStart(2, '0')}</h4>
                      <Badge className={server % 3 === 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}>
                        {server % 3 === 0 ? 'Maintenance' : 'Active'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          CPU
                        </span>
                        <span className="text-cyan-400">{65 + server * 3}%</span>
                      </div>
                      <Progress value={65 + server * 3} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-1">
                          <Monitor className="w-3 h-3" />
                          Memory
                        </span>
                        <span className="text-purple-400">{55 + server * 4}%</span>
                      </div>
                      <Progress value={55 + server * 4} className="h-2" />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <HardDrive className="w-6 h-6 text-cyan-400" />
                Storage Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Primary Storage</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">SSD Pool 1</span>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="w-24" />
                        <span className="text-cyan-400">2.1TB / 3TB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">SSD Pool 2</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-24" />
                        <span className="text-cyan-400">1.4TB / 3TB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">HDD Pool</span>
                      <div className="flex items-center gap-2">
                        <Progress value={34} className="w-24" />
                        <span className="text-cyan-400">3.4TB / 10TB</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Backup Storage</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Daily Backup</span>
                      </div>
                      <span className="text-green-400">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">Incremental</span>
                      </div>
                      <span className="text-blue-400">Running</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Cloud Sync</span>
                      </div>
                      <span className="text-purple-400">Synced</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Network className="w-6 h-6 text-cyan-400" />
                Network Infrastructure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Network Components</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Load Balancer</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">CDN Network</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Optimized</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">DNS Servers</span>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Updating</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Global Presence</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">US East</span>
                      </div>
                      <span className="text-green-400">12ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">EU West</span>
                      </div>
                      <span className="text-green-400">8ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">Asia Pacific</span>
                      </div>
                      <span className="text-green-400">15ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                Security Infrastructure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Security Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">WAF Protection</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">SSL Certificates</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Valid</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">DDoS Protection</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Monitoring</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Threat Detection</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Blocked Attacks (24h)</span>
                      <span className="text-red-400">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Suspicious IPs</span>
                      <span className="text-yellow-400">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Security Score</span>
                      <span className="text-green-400">98/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InfrastructureManagement;