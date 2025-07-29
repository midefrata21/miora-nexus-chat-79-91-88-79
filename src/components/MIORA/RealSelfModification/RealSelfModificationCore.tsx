import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRealSelfModification } from '@/hooks/useRealSelfModification';
import { 
  Code, 
  RefreshCw, 
  Cpu, 
  Zap, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock,
  Play,
  Pause,
  AlertTriangle
} from 'lucide-react';

export const RealSelfModificationCore = () => {
  const {
    isActive,
    modifications,
    runtimeModules,
    architectureChanges,
    modificationStats,
    activateRealSelfModification,
    deactivateRealSelfModification,
    performAutonomousModification,
    injectCode,
    hotSwapModule
  } = useRealSelfModification();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'executing': return <Activity className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getModuleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'updating': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            🧬 Real Self-Modification Engine
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Runtime code injection, hot-swapping modules, dan live architecture changes
          </p>
        </div>

        {/* Control Panel */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="w-5 h-5 text-purple-400" />
              Self-Modification Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "🟢 ACTIVE" : "🔴 INACTIVE"}
                  </Badge>
                  <span className="text-white">Real-Time Self-Modification</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Autonomous code injection and module hot-swapping
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={isActive ? deactivateRealSelfModification : activateRealSelfModification}
                  variant={isActive ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  onClick={performAutonomousModification}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={!isActive}
                >
                  <RefreshCw className="w-4 h-4" />
                  Manual Trigger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm">Total Modifications</p>
                  <p className="text-2xl font-bold text-white">{modificationStats.totalModifications}</p>
                </div>
                <Code className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm">Code Injections</p>
                  <p className="text-2xl font-bold text-white">{modificationStats.successfulInjections}</p>
                </div>
                <Zap className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm">Module Swaps</p>
                  <p className="text-2xl font-bold text-white">{modificationStats.moduleSwaps}</p>
                </div>
                <RefreshCw className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm">Architecture Updates</p>
                  <p className="text-2xl font-bold text-white">{modificationStats.architectureUpdates}</p>
                </div>
                <Cpu className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Runtime Modules */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-blue-400" />
                Runtime Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {runtimeModules.map((module) => (
                    <div key={module.id} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-medium">{module.name}</h4>
                          <Badge className={getModuleStatusColor(module.status)}>
                            {module.status}
                          </Badge>
                        </div>
                        {module.hotSwappable && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => hotSwapModule(module.id, `${parseInt(module.version.split('.')[1]) + 1}.0.0`)}
                            disabled={module.status === 'updating'}
                          >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Swap
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">v{module.version}</span>
                        <span className="text-gray-400">
                          {new Date(module.lastModified).toLocaleTimeString()}
                        </span>
                      </div>
                      {module.dependencies.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">Dependencies: </span>
                          <span className="text-xs text-gray-400">{module.dependencies.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Modifications */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="w-5 h-5 text-green-400" />
                Recent Modifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {modifications.slice(0, 10).map((mod) => (
                    <div key={mod.id} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(mod.status)}
                          <span className="text-white text-sm capitalize">{mod.type.replace('-', ' ')}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(mod.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">Target: {mod.target}</p>
                      {mod.result && (
                        <p className="text-gray-300 text-xs">{mod.result}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Architecture Changes */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Architecture Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {architectureChanges.slice(0, 6).map((change) => (
                <div key={change.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={change.status === 'completed' ? 'default' : 'secondary'}>
                      {change.status}
                    </Badge>
                    <Badge variant={change.impact === 'critical' ? 'destructive' : 'outline'}>
                      {change.impact}
                    </Badge>
                  </div>
                  <h4 className="text-white text-sm font-medium mb-2">{change.description}</h4>
                  <p className="text-gray-400 text-xs">
                    Components: {change.components.join(', ')}
                  </p>
                  {change.rollbackPlan && (
                    <p className="text-gray-500 text-xs mt-1">
                      Rollback: {change.rollbackPlan}
                    </p>
                  )}
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
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => injectCode('performance-optimizer', 'function optimize() { /* perf code */ }')}
                className="flex items-center gap-2"
                disabled={!isActive}
              >
                <Code className="w-4 h-4" />
                Inject Performance Code
              </Button>
              <Button
                onClick={() => hotSwapModule('neural-processor', '2.9.0')}
                variant="outline"
                className="flex items-center gap-2"
                disabled={!isActive}
              >
                <RefreshCw className="w-4 h-4" />
                Upgrade Neural Processor
              </Button>
              <Button
                onClick={performAutonomousModification}
                variant="secondary"
                className="flex items-center gap-2"
                disabled={!isActive}
              >
                <Activity className="w-4 h-4" />
                Random Modification
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};