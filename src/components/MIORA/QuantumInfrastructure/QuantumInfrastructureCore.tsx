import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Activity, 
  Server, 
  Network, 
  Shield, 
  Cpu, 
  Database,
  Radio,
  Brain,
  Globe
} from 'lucide-react';
import { useQuantumInfrastructure } from '../../QuantumInfrastructure/hooks/useQuantumInfrastructure';
import { QuantumFieldBridge } from '../../QuantumInfrastructure/components/QuantumFieldBridge';

const QuantumInfrastructureCore: React.FC = () => {
  const {
    quantumMode,
    infrastructureNodes,
    systemMetrics,
    activateQuantumMode,
    toggleModule,
    getSystemStatus,
    performStressTest,
    enableSelfHealing,
    deployNeuroServer,
    sendDashboardEmail,
    syncToTelegram,
    quantumBridgeActive,
    connectedDevices,
    fieldStats
  } = useQuantumInfrastructure();

  const systemStatus = getSystemStatus();

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'brain': return <Brain className="h-4 w-4" />;
      case 'scaling': return <Activity className="h-4 w-4" />;
      case 'loadbalancer': return <Network className="h-4 w-4" />;
      case 'cdn': return <Globe className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'cache': return <Cpu className="h-4 w-4" />;
      case 'logs': return <Server className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scaling': return 'bg-blue-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          MIORA Quantum Infrastructure
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Advanced quantum-enhanced infrastructure management system with real-time IoT and biolinked device integration
        </p>
      </div>

      {/* Main Activation Control */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center justify-center">
            <Zap className="h-6 w-6 mr-2" />
            Quantum Infrastructure Control
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {!quantumMode.isActive ? (
            <div className="space-y-4">
              <Button 
                onClick={activateQuantumMode}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3"
              >
                <Zap className="h-5 w-5 mr-2" />
                ACTIVATE QUANTUM INFRASTRUCTURE
              </Button>
              <p className="text-gray-400 text-sm">
                Activate quantum-enhanced infrastructure with automatic IoT and biolinked system integration
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                ⚡ QUANTUM INFRASTRUCTURE ACTIVE
              </Badge>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{systemStatus.totalNodes}</div>
                  <div className="text-sm text-gray-400">Infrastructure Nodes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{systemStatus.activeNodes}</div>
                  <div className="text-sm text-gray-400">Active Nodes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{connectedDevices.length}</div>
                  <div className="text-sm text-gray-400">Connected Devices</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      {quantumMode.isActive && (
        <Tabs defaultValue="infrastructure" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-purple-600">
              Infrastructure Nodes
            </TabsTrigger>
            <TabsTrigger value="quantum-bridge" className="data-[state=active]:bg-cyan-600">
              Quantum Field Bridge
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-green-600">
              System Metrics
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-orange-600">
              Operations
            </TabsTrigger>
          </TabsList>

          {/* Infrastructure Nodes Tab */}
          <TabsContent value="infrastructure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infrastructureNodes.map((node) => (
                <Card key={node.id} className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 border-gray-600/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-200 flex items-center text-sm">
                      {getNodeIcon(node.type)}
                      <span className="ml-2 truncate">{node.name}</span>
                      <Badge className={`${getStatusColor(node.status)} text-white ml-auto text-xs`}>
                        {node.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Region</span>
                      <span className="text-gray-300">{node.region}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Load</span>
                      <span className="text-blue-400">{node.load.toFixed(0)}%</span>
                    </div>
                    <Progress value={node.load} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-green-400">{node.responseTime}ms</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Connections</span>
                      <span className="text-purple-400">{node.connections.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => toggleModule(node.id)}
                      className="w-full text-xs"
                    >
                      {node.status === 'active' ? 'Set Maintenance' : 'Activate'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quantum Field Bridge Tab */}
          <TabsContent value="quantum-bridge">
            <QuantumFieldBridge />
          </TabsContent>

          {/* System Metrics Tab */}
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-green-300">System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">CPU Usage</span>
                      <span className="text-green-400">{systemMetrics.cpuUsage.toFixed(1)}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Memory Usage</span>
                      <span className="text-blue-400">{systemMetrics.memoryUsage.toFixed(1)}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">Network Latency</span>
                      <span className="text-purple-400">{systemMetrics.networkLatency.toFixed(1)} ms</span>
                    </div>
                    <Progress value={systemMetrics.networkLatency * 2} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/50">
                <CardHeader>
                  <CardTitle className="text-blue-300">Quantum Field Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quantumBridgeActive ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Signal Strength</span>
                          <span className="text-cyan-400">{fieldStats.quantumSignalStrength.toFixed(1)}%</span>
                        </div>
                        <Progress value={fieldStats.quantumSignalStrength} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Bridge Stability</span>
                          <span className="text-purple-400">{fieldStats.bridgeStability.toFixed(1)}%</span>
                        </div>
                        <Progress value={fieldStats.bridgeStability} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Data Flow</span>
                        <span className="text-green-400">{fieldStats.dataFlow.toLocaleString()} packets/min</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-400">
                      Quantum Field Bridge not active
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/50">
                <CardHeader>
                  <CardTitle className="text-orange-300">System Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={performStressTest}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Perform Stress Test
                  </Button>
                  <Button 
                    onClick={enableSelfHealing}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Enable Self-Healing
                  </Button>
                  <Button 
                    onClick={deployNeuroServer}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Server className="h-4 w-4 mr-2" />
                    Deploy Neuro Server
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/50">
                <CardHeader>
                  <CardTitle className="text-indigo-300">Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => sendDashboardEmail('admin@miora.ai')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Send Dashboard Email
                  </Button>
                  <Button 
                    onClick={syncToTelegram}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Radio className="h-4 w-4 mr-2" />
                    Sync to Telegram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Quantum Capabilities Display */}
      {quantumMode.isActive && (
        <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/50">
          <CardHeader>
            <CardTitle className="text-indigo-300">Active Quantum Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quantumMode.capabilities.map((capability, index) => (
                <Badge key={index} variant="outline" className="text-center p-2">
                  {capability}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuantumInfrastructureCore;