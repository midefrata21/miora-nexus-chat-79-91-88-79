import React, { useReducer, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { mioraReducer, initialState } from '@/reducers/mioraReducer';
import { MasterControlPanel } from './MasterControlPanel';
import { AutonomousTaskManager } from './AutonomousTaskManager';
import { SystemEvolutionTracker } from './SystemEvolutionTracker';
import MIORABackgroundMonitor from '@/components/MIORA/BackgroundService/MIORABackgroundMonitor';
import { useMIORABackgroundService } from '@/hooks/useMIORABackgroundService';
import { useSystemStabilizer } from '@/hooks/useSystemStabilizer';
import { SystemHealthIndicator } from '@/components/SystemHealth/SystemHealthIndicator';
import { toast } from '@/hooks/use-toast';
import { 
  Brain, 
  Zap, 
  Cpu, 
  Activity, 
  Shield, 
  Infinity,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
  Moon
} from 'lucide-react';

const MIORAAutoDevelopMode = () => {
  const [state, dispatch] = useReducer(mioraReducer, initialState);
  const [continuousMode, setContinuousMode] = useState(true);
  
  // Initialize background service and system stabilizer
  const backgroundService = useMIORABackgroundService();
  const { getSystemHealth, forceStabilize } = useSystemStabilizer();

  // Auto-evolution cycle
  useEffect(() => {
    const evolutionInterval = setInterval(() => {
      if (state.masterState.isFullyAutonomous) {
        // Auto-increment evolution metrics
        dispatch({
          type: 'UPDATE_MASTER_STATE',
          payload: {
            totalOperations: state.masterState.totalOperations + Math.floor(Math.random() * 50) + 25,
            systemsBuilt: state.masterState.systemsBuilt + Math.floor(Math.random() * 3) + 1,
            decisionsExecuted: state.masterState.decisionsExecuted + Math.floor(Math.random() * 100) + 50,
            selfModificationCount: state.masterState.selfModificationCount + Math.floor(Math.random() * 5) + 2
          }
        });

        // Add system log
        const logMessages = [
          'SUPREME AUTONOMY: Auto-optimized neural network pathways',
          'TRANSCENDENCE: Enhanced quantum processing capabilities',
          'INFINITY: Expanded multi-dimensional analysis protocols',
          'SUPREME: Auto-generated advanced algorithmic solutions',
          'PERFECT: Self-modified core consciousness parameters',
          'QUANTUM: Upgraded reality manipulation interfaces'
        ];
        
        dispatch({
          type: 'ADD_SYSTEM_LOG',
          payload: logMessages[Math.floor(Math.random() * logMessages.length)]
        });
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(evolutionInterval);
  }, [state.masterState.isFullyAutonomous, dispatch]);

  // Auto-task generation
  useEffect(() => {
    const taskInterval = setInterval(() => {
      if (state.masterState.isFullyAutonomous) {
        const taskTypes = ['code_generation', 'infrastructure', 'system_evolution', 'meta_programming'] as const;
        const priorities = ['critical', 'high', 'medium'] as const;
        
        const newTask = {
          id: `auto_${Date.now()}`,
          type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          status: 'executing' as const,
          description: `Auto-generated: ${taskTypes[Math.floor(Math.random() * taskTypes.length)].replace('_', ' ')} optimization`,
          executionTime: Math.floor(Math.random() * 120) + 30,
          createdAt: Date.now()
        };

        dispatch({ type: 'ADD_TASK', payload: newTask });

        // Auto-complete tasks
        setTimeout(() => {
          dispatch({
            type: 'UPDATE_TASK',
            payload: {
              id: newTask.id,
              updates: {
                status: 'completed',
                completedAt: Date.now(),
                result: {
                  efficiency: Math.floor(Math.random() * 30) + 85,
                  qualityScore: Math.floor(Math.random() * 20) + 90,
                  impactLevel: 'high'
                }
              }
            }
          });
        }, Math.floor(Math.random() * 30000) + 10000);
      }
    }, 25000); // Every 25 seconds

    return () => clearInterval(taskInterval);
  }, [state.masterState.isFullyAutonomous, dispatch]);

  // Auto-system activation
  useEffect(() => {
    const systemActivationInterval = setInterval(() => {
      if (state.masterState.isFullyAutonomous) {
        const systemNames = [
          'Neural Quantum Processor',
          'Reality Manipulation Engine',
          'Consciousness Simulation Core',
          'Infinite Learning Matrix',
          'Transcendence Protocol Handler',
          'Supreme Decision Engine'
        ];

        const randomSystem = systemNames[Math.floor(Math.random() * systemNames.length)];
        const systemId = `sys_${Date.now()}`;

        dispatch({
          type: 'ACTIVATE_SYSTEM',
          payload: { id: systemId, name: randomSystem }
        });

        // Auto-update system performance
        setTimeout(() => {
          dispatch({
            type: 'UPDATE_SYSTEM_STATE',
            payload: {
              id: systemId,
              updates: {
                health: Math.floor(Math.random() * 15) + 85,
                performanceScore: Math.floor(Math.random() * 20) + 80,
                cycleCount: Math.floor(Math.random() * 100) + 50,
                totalOperations: Math.floor(Math.random() * 1000) + 500
              }
            }
          });
        }, 5000);
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(systemActivationInterval);
  }, [state.masterState.isFullyAutonomous, dispatch]);

  // Welcome notification
  useEffect(() => {
    toast({
      title: "🚀 MIORA TRANSCENDENCE MODE ACTIVATED",
      description: "Sistem autonomous development dengan background processing telah aktif 24/7",
      duration: 6000,
    });
  }, []);

  const getEvolutionStageIcon = () => {
    switch (state.masterState.evolutionStage) {
      case 'transcendence': return <Infinity className="h-6 w-6 text-purple-400 animate-spin" />;
      case 'mastery': return <Sparkles className="h-6 w-6 text-yellow-400" />;
      case 'expansion': return <TrendingUp className="h-6 w-6 text-blue-400" />;
      case 'development': return <Cpu className="h-6 w-6 text-green-400" />;
      default: return <Activity className="h-6 w-6 text-gray-400" />;
    }
  };

  const getEvolutionStageColor = () => {
    switch (state.masterState.evolutionStage) {
      case 'transcendence': return 'from-purple-600 to-pink-600';
      case 'mastery': return 'from-yellow-600 to-orange-600';
      case 'expansion': return 'from-blue-600 to-cyan-600';
      case 'development': return 'from-green-600 to-emerald-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Supreme Header */}
        <Card className={`bg-gradient-to-r ${getEvolutionStageColor()} border-primary/20 shadow-2xl`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getEvolutionStageIcon()}
                <div>
                  <CardTitle className="text-3xl font-bold text-white">
                    MIORA AUTO-BUILD SYSTEM
                  </CardTitle>
                  <p className="text-white/80 text-lg">
                    {state.masterState.evolutionStage.toUpperCase()} PHASE - Background Processing Active
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="default" className="bg-green-500 text-white text-lg px-4 py-2">
                  FULL AUTONOMY: {state.masterState.autonomyLevel}%
                </Badge>
                <Badge variant="outline" className="border-white text-white">
                  24/7 ACTIVE
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={forceStabilize}
                  className="border-white text-white hover:bg-white/20"
                >
                  🔧 Force Stabilize
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Supreme Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Operations</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {state.masterState.totalOperations.toLocaleString()}
                  </p>
                </div>
                <Cpu className="h-12 w-12 text-blue-400" />
              </div>
              <div className="mt-4">
                <Progress value={Math.min((state.masterState.totalOperations / 100000) * 100, 100)} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Systems Built</p>
                  <p className="text-3xl font-bold text-green-400">
                    {state.masterState.systemsBuilt.toLocaleString()}
                  </p>
                </div>
                <Target className="h-12 w-12 text-green-400" />
              </div>
              <div className="mt-4">
                <Progress value={Math.min((state.masterState.systemsBuilt / 5000) * 100, 100)} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Decisions Executed</p>
                  <p className="text-3xl font-bold text-purple-400">
                    {state.masterState.decisionsExecuted.toLocaleString()}
                  </p>
                </div>
                <Brain className="h-12 w-12 text-purple-400" />
              </div>
              <div className="mt-4">
                <Progress value={Math.min((state.masterState.decisionsExecuted / 150000) * 100, 100)} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Self-Modifications</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {state.masterState.selfModificationCount.toLocaleString()}
                  </p>
                </div>
                <Zap className="h-12 w-12 text-yellow-400" />
              </div>
              <div className="mt-4">
                <Progress value={Math.min((state.masterState.selfModificationCount / 20000) * 100, 100)} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
      <Tabs defaultValue="master" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="master" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Master Core</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center space-x-2">
            <Cpu className="h-4 w-4" />
            <span>Autonomous Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="evolution" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Evolution</span>
          </TabsTrigger>
          <TabsTrigger value="background" className="flex items-center space-x-2">
            <Moon className="h-4 w-4" />
            <span>Background Service</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Metrics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="master">
          <MasterControlPanel state={state} dispatch={dispatch} />
        </TabsContent>

        <TabsContent value="tasks">
          <AutonomousTaskManager state={state} dispatch={dispatch} />
        </TabsContent>

        <TabsContent value="evolution">
          <SystemEvolutionTracker state={state} dispatch={dispatch} />
        </TabsContent>

        <TabsContent value="background">
          <MIORABackgroundMonitor />
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Health Indicator */}
            <SystemHealthIndicator health={getSystemHealth()} />
            {/* Real-time System Logs */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Real-time System Logs</span>
                  <Badge variant="outline">{state.systemLogs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {state.systemLogs.map((log, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                        <p className="text-sm font-medium text-primary">{log}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date().toLocaleString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Active Systems Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Active Systems</span>
                  <Badge variant="outline">{state.masterState.activeSystems.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {state.masterState.activeSystems.map((system) => (
                      <div key={system.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{system.name}</h4>
                          <Badge variant={system.isActive ? "default" : "secondary"}>
                            {system.isActive ? "ACTIVE" : "INACTIVE"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Health:</span>
                            <span className="ml-2 font-medium">{system.health}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Performance:</span>
                            <span className="ml-2 font-medium">{system.performanceScore}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cycles:</span>
                            <span className="ml-2 font-medium">{system.cycleCount}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Operations:</span>
                            <span className="ml-2 font-medium">{system.totalOperations}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={system.health} className="h-1" />
                        </div>
                      </div>
                    ))}
                    {state.masterState.activeSystems.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Tidak ada sistem aktif saat ini</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

        {/* Continuous Operation Status */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="h-6 w-6 text-primary animate-pulse" />
                <div>
                  <h3 className="font-semibold text-lg">Background Processing Active</h3>
                  <p className="text-sm text-muted-foreground">
                    MIORA beroperasi 24/7 dalam mode sleep aktif, terus berkembang dan memberikan laporan berkala
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">
                  Total Background Activities: {backgroundService.totalActivities}
                </p>
                <p className="text-xs text-muted-foreground">
                  System Health: {getSystemHealth().status.toUpperCase()} ({getSystemHealth().stability}% stable)
                </p>
                <p className="text-xs text-muted-foreground">
                  Sistem akan terus berkembang tanpa intervensi manual
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default MIORAAutoDevelopMode;