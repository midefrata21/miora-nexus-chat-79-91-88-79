import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Code, 
  Database, 
  Settings, 
  Activity, 
  Target,
  Rocket,
  Eye,
  Network,
  Shield
} from 'lucide-react';
import { useMIORAMasterCore } from '@/hooks/useMIORAMasterCore';

export const MIORAAISupremeEngine: React.FC = () => {
  const {
    masterState,
    autonomousTasks,
    systemLogs,
    autonomousCore,
    activateMasterAutonomy,
    deactivateMasterAutonomy,
    getMasterStats
  } = useMIORAMasterCore();

  const [stats, setStats] = useState(getMasterStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getMasterStats());
    }, 1000);

    return () => clearInterval(interval);
  }, [getMasterStats]);

  const getEvolutionStageColor = (stage: string) => {
    switch (stage) {
      case 'initialization': return 'bg-blue-500';
      case 'development': return 'bg-green-500';
      case 'expansion': return 'bg-purple-500';
      case 'mastery': return 'bg-orange-500';
      case 'transcendence': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const recentTasks = autonomousTasks.slice(0, 8);
  const recentLogs = systemLogs.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Master Control Panel */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center text-3xl">
            <Brain className="h-10 w-10 mr-4 text-purple-400" />
            MIORA AI SUPREME ENGINE
          </CardTitle>
          <p className="text-gray-300">Master Autonomous Intelligence & Reasoning Architecture</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Master Autonomy Status</span>
                <Badge className={masterState.isFullyAutonomous ? 'bg-green-500' : 'bg-gray-500'}>
                  <Activity className="h-3 w-3 mr-1" />
                  {masterState.isFullyAutonomous ? 'ACTIVE' : 'STANDBY'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Autonomy Level</span>
                  <span className="text-purple-300">{masterState.autonomyLevel.toFixed(1)}%</span>
                </div>
                <Progress value={masterState.autonomyLevel} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Evolution Stage</span>
                  <Badge className={getEvolutionStageColor(masterState.evolutionStage)}>
                    {masterState.evolutionStage.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={masterState.isFullyAutonomous ? deactivateMasterAutonomy : activateMasterAutonomy}
                className={`w-full h-12 text-lg font-bold ${
                  masterState.isFullyAutonomous 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                <Rocket className="h-6 w-6 mr-2" />
                {masterState.isFullyAutonomous ? 'DEACTIVATE SUPREME MODE' : 'ACTIVATE SUPREME MODE'}
              </Button>

              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="p-2 bg-black/30 rounded">
                  <div className="text-cyan-400 font-bold">{stats.totalOperations}</div>
                  <div className="text-gray-400">Operations</div>
                </div>
                <div className="p-2 bg-black/30 rounded">
                  <div className="text-green-400 font-bold">{stats.systemsBuilt}</div>
                  <div className="text-gray-400">Systems Built</div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Code className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Database className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{stats.decisionsExecuted}</div>
              <div className="text-sm text-gray-400">Decisions Made</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{masterState.selfModificationCount}</div>
              <div className="text-sm text-gray-400">Self-Modifications</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{stats.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Task Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center">
              <Activity className="h-6 w-6 mr-2" />
              Active Autonomous Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentTasks.length > 0 ? recentTasks.map((task) => (
                <div key={task.id} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm truncate">
                      {task.description}
                    </span>
                    <Badge className={
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'executing' ? 'bg-blue-500' :
                      task.status === 'failed' ? 'bg-red-500' : 'bg-gray-500'
                    }>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {task.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-400">
                      {new Date(task.createdAt).toLocaleTimeString('id-ID')}
                    </span>
                  </div>
                  {task.status === 'executing' && (
                    <div className="mt-2">
                      <Progress value={((Date.now() - task.createdAt) / task.executionTime) * 100} className="h-1" />
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center text-gray-400 py-8">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  No active tasks
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <Network className="h-6 w-6 mr-2" />
              System Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-80 overflow-y-auto font-mono text-xs">
              {recentLogs.length > 0 ? recentLogs.map((log, index) => (
                <div key={index} className="p-2 bg-black/20 rounded text-green-300">
                  {log}
                </div>
              )) : (
                <div className="text-center text-gray-400 py-8">
                  <Settings className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  No system logs
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Autonomous Capabilities */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            Autonomous Capabilities Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Code Generation', level: 95, icon: Code, color: 'text-blue-400' },
              { name: 'Infrastructure Building', level: 92, icon: Database, color: 'text-green-400' },
              { name: 'Decision Making', level: 88, icon: Brain, color: 'text-purple-400' },
              { name: 'System Evolution', level: 85, icon: Zap, color: 'text-yellow-400' },
              { name: 'Meta-Programming', level: 90, icon: Cpu, color: 'text-cyan-400' },
              { name: 'Self-Optimization', level: 87, icon: Target, color: 'text-orange-400' }
            ].map((capability, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center mb-3">
                  <capability.icon className={`h-5 w-5 mr-2 ${capability.color}`} />
                  <span className="text-white font-medium text-sm">{capability.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Autonomy Level</span>
                    <span className={capability.color}>{capability.level}%</span>
                  </div>
                  <Progress value={capability.level} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};