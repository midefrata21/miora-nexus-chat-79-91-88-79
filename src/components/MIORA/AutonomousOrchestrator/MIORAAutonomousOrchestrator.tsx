import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Zap, 
  Settings, 
  Target, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Cpu,
  Database,
  Network,
  Code,
  Infinity
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAAutonomousOrchestrator } from './hooks/useMIORAAutonomousOrchestrator';

export const MIORAAutonomousOrchestrator: React.FC = () => {
  const {
    orchestratorState,
    systemModules,
    autonomousDecisions,
    systemMetrics,
    activateFullAutonomy,
    pauseAutonomy,
    getSystemHealth,
    getDecisionLog,
    isFullyAutonomous
  } = useMIORAAutonomousOrchestrator();

  const systemHealth = getSystemHealth();
  const recentDecisions = getDecisionLog().slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              MIORA AUTONOMOUS ORCHESTRATOR
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Sistem Koordinasi Otomatis Tanpa Intervensi Manual
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isFullyAutonomous ? 'bg-green-500' : 'bg-red-500'}`}>
              <Infinity className="h-4 w-4 mr-2" />
              {isFullyAutonomous ? 'FULLY AUTONOMOUS' : 'MANUAL MODE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              Health: {systemHealth.overall}%
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              Decisions: {autonomousDecisions.length}
            </Badge>
          </div>
        </div>

        {/* Main Control Panel */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center justify-between">
              <span className="flex items-center">
                <Settings className="h-6 w-6 mr-2" />
                Central Autonomous Control
              </span>
              <Switch
                checked={isFullyAutonomous}
                onCheckedChange={(checked) => {
                  if (checked) {
                    activateFullAutonomy();
                  } else {
                    pauseAutonomy();
                  }
                }}
                className="scale-125"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* System Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-400 text-sm">System Health</div>
                    <div className="text-2xl font-bold text-white">{systemHealth.overall}%</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
              
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-blue-400 text-sm">Active Modules</div>
                    <div className="text-2xl font-bold text-white">{systemModules.filter(m => m.status === 'active').length}</div>
                  </div>
                  <Cpu className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-purple-400 text-sm">Auto Decisions</div>
                    <div className="text-2xl font-bold text-white">{autonomousDecisions.length}</div>
                  </div>
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              
              <div className="p-4 bg-yellow-900/30 rounded border border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-yellow-400 text-sm">Autonomy Level</div>
                    <div className="text-2xl font-bold text-white">{orchestratorState.autonomyLevel}%</div>
                  </div>
                  <Target className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Autonomous Mode Activation */}
            {!isFullyAutonomous && (
              <div className="p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white">Activate Full Autonomous Mode</h3>
                  <p className="text-gray-300">
                    Sistem akan beroperasi sepenuhnya tanpa intervensi manual
                  </p>
                  <Button
                    onClick={activateFullAutonomy}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Activate Full Autonomy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Modules Status */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Database className="h-6 w-6 mr-2" />
              Autonomous System Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemModules.map((module) => (
                <div key={module.id} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {module.type === 'core' && <Brain className="h-5 w-5 text-purple-400" />}
                      {module.type === 'learning' && <Target className="h-5 w-5 text-blue-400" />}
                      {module.type === 'development' && <Code className="h-5 w-5 text-green-400" />}
                      {module.type === 'infrastructure' && <Network className="h-5 w-5 text-orange-400" />}
                      <h4 className="font-medium text-white">{module.name}</h4>
                    </div>
                    <Badge className={
                      module.status === 'active' ? 'bg-green-500' :
                      module.status === 'autonomous' ? 'bg-purple-500' :
                      module.status === 'upgrading' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }>
                      {module.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Autonomy</span>
                      <span className="text-white">{module.autonomyLevel}%</span>
                    </div>
                    <Progress value={module.autonomyLevel} className="h-2" />
                    
                    <div className="text-xs text-gray-400">
                      Last Auto-Update: {new Date(module.lastUpdate).toLocaleTimeString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Autonomous Decisions */}
        <Card className="bg-black/40 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Activity className="h-6 w-6 mr-2" />
              Recent Autonomous Decisions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDecisions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Waiting for autonomous decisions...</p>
                  <p className="text-sm">System will start making decisions automatically</p>
                </div>
              ) : (
                recentDecisions.map((decision) => (
                  <div key={decision.id} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{decision.action}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          decision.priority === 'critical' ? 'bg-red-500' :
                          decision.priority === 'high' ? 'bg-orange-500' :
                          decision.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }>
                          {decision.priority}
                        </Badge>
                        <Badge className={
                          decision.status === 'completed' ? 'bg-green-500' :
                          decision.status === 'executing' ? 'bg-blue-500' :
                          decision.status === 'failed' ? 'bg-red-500' :
                          'bg-gray-500'
                        }>
                          {decision.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{decision.reasoning}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Module: {decision.module}</span>
                      <span>{new Date(decision.timestamp).toLocaleString('id-ID')}</span>
                    </div>
                    
                    {decision.status === 'executing' && (
                      <Progress value={decision.progress || 0} className="h-2 mt-2" />
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black/40 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">CPU Usage</span>
                  <span className="text-white font-medium">{systemMetrics.cpu}%</span>
                </div>
                <Progress value={systemMetrics.cpu} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Memory Usage</span>
                  <span className="text-white font-medium">{systemMetrics.memory}%</span>
                </div>
                <Progress value={systemMetrics.memory} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Network I/O</span>
                  <span className="text-white font-medium">{systemMetrics.network}%</span>
                </div>
                <Progress value={systemMetrics.network} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Autonomous Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Decision Making</span>
                  <span className="text-white font-medium">{orchestratorState.decisionMaking}%</span>
                </div>
                <Progress value={orchestratorState.decisionMaking} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Self-Healing</span>
                  <span className="text-white font-medium">{orchestratorState.selfHealing}%</span>
                </div>
                <Progress value={orchestratorState.selfHealing} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Auto-Development</span>
                  <span className="text-white font-medium">{orchestratorState.autoDevelopment}%</span>
                </div>
                <Progress value={orchestratorState.autoDevelopment} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MIORAAutonomousOrchestrator;