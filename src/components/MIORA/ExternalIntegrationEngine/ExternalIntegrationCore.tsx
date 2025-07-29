import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useExternalIntegrationEngine } from '@/hooks/useExternalIntegrationEngine';
import { 
  Radar, 
  Zap, 
  Network, 
  Database, 
  MessageSquare, 
  Cloud, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock,
  Play,
  Pause,
  Search,
  Link,
  Globe
} from 'lucide-react';

export const ExternalIntegrationCore = () => {
  const {
    isActive,
    services,
    serviceMeshes,
    integrationTasks,
    integrationStats,
    discoverServices,
    connectToService,
    orchestrateServices,
    activateExternalIntegration,
    deactivateExternalIntegration
  } = useExternalIntegrationEngine();

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'api': return <Network className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'messaging': return <MessageSquare className="w-4 h-4" />;
      case 'ai-service': return <Zap className="w-4 h-4" />;
      case 'cloud-service': return <Cloud className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'discovering': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'disconnected': return 'bg-gray-500/20 text-gray-400 border-gray-500';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'discovery': return <Search className="w-4 h-4" />;
      case 'connection': return <Link className="w-4 h-4" />;
      case 'orchestration': return <Network className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'executing': return <Activity className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            📡 External Integration Engine
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            API discovery & integration, service mesh management, dan third-party service orchestration
          </p>
        </div>

        {/* Control Panel */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Radar className="w-5 h-5 text-purple-400" />
              Integration Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "🟢 ACTIVE" : "🔴 INACTIVE"}
                  </Badge>
                  <span className="text-white">External Integration</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                    {integrationStats.connectedServices}/{integrationStats.totalServices} Connected
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">
                  Autonomous service discovery and orchestration
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={isActive ? deactivateExternalIntegration : activateExternalIntegration}
                  variant={isActive ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  onClick={discoverServices}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Discover Services
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm">Total Services</p>
                  <p className="text-2xl font-bold text-white">{integrationStats.totalServices}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm">Connected</p>
                  <p className="text-2xl font-bold text-white">{integrationStats.connectedServices}</p>
                </div>
                <Network className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm">Discovered Today</p>
                  <p className="text-2xl font-bold text-white">{integrationStats.discoveredToday}</p>
                </div>
                <Search className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm">Avg Response</p>
                  <p className="text-2xl font-bold text-white">{integrationStats.avgResponseTime}ms</p>
                </div>
                <Activity className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* External Services */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Network className="w-5 h-5 text-blue-400" />
                External Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getServiceIcon(service.type)}
                          <h4 className="text-white font-medium">{service.name}</h4>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                          {service.autoDiscovered && (
                            <Badge variant="outline" className="text-xs">
                              Auto
                            </Badge>
                          )}
                        </div>
                        {service.status === 'disconnected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => connectToService(service.id)}
                          >
                            <Link className="w-3 h-3 mr-1" />
                            Connect
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400 capitalize">{service.type.replace('-', ' ')}</span>
                        <span className="text-gray-400">{service.responseTime}ms</span>
                      </div>
                      <p className="text-gray-500 text-xs truncate">{service.url}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          Reliability: {service.reliability}%
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(service.lastPing).toLocaleTimeString()}
                        </span>
                      </div>
                      <Progress value={service.reliability} className="mt-1 h-1" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Integration Tasks */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="w-5 h-5 text-green-400" />
                Integration Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {integrationTasks.slice(0, 10).map((task) => (
                    <div key={task.id} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTaskIcon(task.type)}
                          {getTaskStatusIcon(task.status)}
                          <span className="text-white text-sm capitalize">{task.type}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(task.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">Target: {task.target}</p>
                      {task.status === 'executing' && (
                        <div className="mb-2">
                          <Progress value={task.progress} className="h-1" />
                          <span className="text-xs text-gray-400">{task.progress}%</span>
                        </div>
                      )}
                      {task.result && (
                        <p className="text-gray-300 text-xs">{task.result}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Service Mesh */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Network className="w-5 h-5 text-purple-400" />
              Service Mesh Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceMeshes.map((mesh) => (
                <div key={mesh.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <h4 className="text-white text-sm font-medium mb-3">{mesh.id}</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400">Services: </span>
                      <span className="text-white">{mesh.services.length}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Load Balancer: </span>
                      <span className="text-white">{mesh.loadBalancer.algorithm}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Security:</span>
                      {mesh.security.encryption && (
                        <Badge variant="outline" className="text-xs">Encrypted</Badge>
                      )}
                      {mesh.security.authentication && (
                        <Badge variant="outline" className="text-xs">Auth</Badge>
                      )}
                    </div>
                    
                    <div>
                      <span className="text-gray-400">Rate Limit: </span>
                      <span className="text-white">{mesh.security.rateLimit}/min</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Monitoring:</span>
                      {mesh.monitoring.metrics && (
                        <Badge variant="outline" className="text-xs">Metrics</Badge>
                      )}
                      {mesh.monitoring.logging && (
                        <Badge variant="outline" className="text-xs">Logs</Badge>
                      )}
                      {mesh.monitoring.tracing && (
                        <Badge variant="outline" className="text-xs">Tracing</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="w-5 h-5 text-yellow-400" />
              Integration Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                onClick={discoverServices}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Search className="w-4 h-4" />
                Discover New Services
              </Button>
              <Button
                onClick={() => {
                  const connectedServices = services.filter(s => s.status === 'connected').map(s => s.id);
                  if (connectedServices.length > 0) {
                    orchestrateServices(connectedServices, 'health-check');
                  }
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Health Check All
              </Button>
              <Button
                onClick={() => {
                  const connectedServices = services.filter(s => s.status === 'connected').map(s => s.id);
                  if (connectedServices.length > 0) {
                    orchestrateServices(connectedServices, 'sync-data');
                  }
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Network className="w-4 h-4" />
                Sync Services
              </Button>
              <Button
                onClick={() => {
                  const connectedServices = services.filter(s => s.status === 'connected').map(s => s.id);
                  if (connectedServices.length > 0) {
                    orchestrateServices(connectedServices, 'load-balance');
                  }
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Load Balance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};