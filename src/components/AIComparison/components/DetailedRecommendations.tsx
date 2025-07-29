import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Target, Zap, Clock, CheckCircle, PlayCircle, Pause, Play, Settings, Bot, Cpu, RefreshCw, Infinity } from 'lucide-react';

interface DevelopmentRecommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  estimatedTime: string;
  requiredResources: string[];
  expectedImpact: number;
  actionItems: string[];
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  type: 'infrastructure' | 'module' | 'training' | 'optimization';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  prerequisites: string[];
}

interface AutoExecutionStats {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  lastExecutionTime: number;
  continuousRunTime: number;
  performanceBoost: number;
}

interface DetailedRecommendationsProps {
  recommendations: DevelopmentRecommendation[];
  quickActions: QuickAction[];
  onExecuteQuickAction: (actionId: string) => void;
  autoExecutionActive?: boolean;
  onToggleAutoExecution?: () => void;
  executedActions?: string[];
}

const DetailedRecommendations: React.FC<DetailedRecommendationsProps> = ({
  recommendations,
  quickActions,
  onExecuteQuickAction,
  autoExecutionActive = false,
  onToggleAutoExecution,
  executedActions = []
}) => {
  const { toast } = useToast();
  const [autoMode, setAutoMode] = useState(autoExecutionActive);
  const [executionQueue, setExecutionQueue] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSpeed, setExecutionSpeed] = useState(3000); // milliseconds between executions
  const [smartMode, setSmartMode] = useState(true);
  const [continuousMode, setContinuousMode] = useState(false);
  
  const autoExecutionInterval = useRef<NodeJS.Timeout | null>(null);
  const continuousInterval = useRef<NodeJS.Timeout | null>(null);
  
  const [autoExecutionStats, setAutoExecutionStats] = useState<AutoExecutionStats>({
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    averageExecutionTime: 2.5,
    lastExecutionTime: 0,
    continuousRunTime: 0,
    performanceBoost: 0
  });

  useEffect(() => {
    setAutoMode(autoExecutionActive);
  }, [autoExecutionActive]);

  // Enhanced Auto-Execution Engine
  useEffect(() => {
    if (autoMode && quickActions.length > 0) {
      startEnhancedAutoExecution();
    } else {
      stopAutoExecution();
    }

    return () => stopAutoExecution();
  }, [autoMode, quickActions, executedActions, executionSpeed, smartMode]);

  // Continuous Update Mode
  useEffect(() => {
    if (continuousMode) {
      startContinuousUpdateMode();
    } else {
      stopContinuousMode();
    }

    return () => stopContinuousMode();
  }, [continuousMode]);

  const startEnhancedAutoExecution = () => {
    if (autoExecutionInterval.current) {
      clearInterval(autoExecutionInterval.current);
    }

    const availableActions = quickActions.filter(action => 
      !executedActions.includes(action.id) && !executionQueue.includes(action.id)
    );

    if (availableActions.length === 0) {
      // Reset cycle untuk continuous execution
      if (continuousMode) {
        setTimeout(() => {
          // Reset executed actions untuk cycle baru
          setExecutionQueue([]);
        }, 5000);
      }
      return;
    }

    // Smart Prioritization Algorithm
    const prioritizedActions = smartMode ? 
      prioritizeActions(availableActions) : 
      availableActions;

    if (prioritizedActions.length > 0) {
      const nextAction = prioritizedActions[0];
      
      setExecutionQueue(prev => [...prev, nextAction.id]);
      setIsExecuting(true);

      // Dynamic execution speed based on action difficulty
      const dynamicSpeed = calculateDynamicSpeed(nextAction);
      
      autoExecutionInterval.current = setTimeout(() => {
        executeActionWithTracking(nextAction.id);
      }, dynamicSpeed);
    }
  };

  const startContinuousUpdateMode = () => {
    continuousInterval.current = setInterval(() => {
      // Continuous performance updates
      setAutoExecutionStats(prev => ({
        ...prev,
        continuousRunTime: prev.continuousRunTime + 1,
        performanceBoost: Math.min(100, prev.performanceBoost + 0.5)
      }));

      // Auto-reset execution cycle setiap 30 detik
      if (autoExecutionStats.continuousRunTime % 30 === 0) {
        setExecutionQueue([]);
        
        toast({
          title: "🔄 CONTINUOUS CYCLE RESET",
          description: "Memulai cycle baru untuk optimasi berkelanjutan",
          duration: 2000,
        });
      }
    }, 1000);
  };

  const stopAutoExecution = () => {
    if (autoExecutionInterval.current) {
      clearInterval(autoExecutionInterval.current);
      autoExecutionInterval.current = null;
    }
    setIsExecuting(false);
  };

  const stopContinuousMode = () => {
    if (continuousInterval.current) {
      clearInterval(continuousInterval.current);
      continuousInterval.current = null;
    }
  };

  const prioritizeActions = (actions: QuickAction[]) => {
    return actions.sort((a, b) => {
      const priorityScore = {
        'easy': 3,
        'medium': 2,
        'hard': 1
      };
      
      const typeScore = {
        'optimization': 4,
        'infrastructure': 3,
        'module': 2,
        'training': 1
      };

      const scoreA = (priorityScore[a.difficulty] || 0) + (typeScore[a.type] || 0);
      const scoreB = (priorityScore[b.difficulty] || 0) + (typeScore[b.type] || 0);
      
      return scoreB - scoreA;
    });
  };

  const calculateDynamicSpeed = (action: QuickAction) => {
    const baseSpeed = executionSpeed;
    const difficultyMultiplier = {
      'easy': 0.7,
      'medium': 1.0,
      'hard': 1.5
    };
    
    return Math.floor(baseSpeed * (difficultyMultiplier[action.difficulty] || 1));
  };

  const executeActionWithTracking = async (actionId: string) => {
    const startTime = Date.now();
    
    try {
      await onExecuteQuickAction(actionId);
      
      const executionTime = Date.now() - startTime;
      
      setAutoExecutionStats(prev => ({
        ...prev,
        totalExecutions: prev.totalExecutions + 1,
        successfulExecutions: prev.successfulExecutions + 1,
        lastExecutionTime: executionTime,
        averageExecutionTime: (prev.averageExecutionTime + executionTime / 1000) / 2,
        performanceBoost: Math.min(100, prev.performanceBoost + 2)
      }));

      setExecutionQueue(prev => prev.filter(id => id !== actionId));
      setIsExecuting(false);

      // Continue to next action if auto mode is still active
      if (autoMode) {
        setTimeout(() => {
          startEnhancedAutoExecution();
        }, 500);
      }

      toast({
        title: "⚡ AUTO-EXECUTION SUCCESS",
        description: `Action completed in ${(executionTime / 1000).toFixed(1)}s - Performance boost: +${autoExecutionStats.performanceBoost.toFixed(1)}%`,
        duration: 3000,
      });

    } catch (error) {
      setAutoExecutionStats(prev => ({
        ...prev,
        totalExecutions: prev.totalExecutions + 1,
        failedExecutions: prev.failedExecutions + 1
      }));

      setExecutionQueue(prev => prev.filter(id => id !== actionId));
      setIsExecuting(false);

      toast({
        title: "❌ AUTO-EXECUTION FAILED",
        description: "Action failed, continuing to next recommendation",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleToggleAutoMode = () => {
    const newMode = !autoMode;
    setAutoMode(newMode);
    
    if (onToggleAutoExecution) {
      onToggleAutoExecution();
    }

    if (newMode) {
      toast({
        title: "🚀 ENHANCED AUTO-EXECUTION ACTIVATED",
        description: `MIORA akan mengeksekusi rekomendasi dengan ${smartMode ? 'Smart Prioritization' : 'Standard Mode'} setiap ${executionSpeed/1000}s`,
        duration: 4000,
      });
    } else {
      toast({
        title: "⏸️ AUTO-EXECUTION PAUSED",
        description: "Mode eksekusi otomatis telah dihentikan",
        duration: 3000,
      });
    }
  };

  const handleSpeedChange = (speed: number) => {
    setExecutionSpeed(speed);
    toast({
      title: "⚡ EXECUTION SPEED UPDATED",
      description: `Speed diubah ke ${speed/1000}s per action`,
      duration: 2000,
    });
  };

  const isActionExecuted = (actionId: string) => executedActions.includes(actionId);
  const isActionInQueue = (actionId: string) => executionQueue.includes(actionId);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-900/20 text-red-400';
      case 'high': return 'border-orange-500 bg-orange-900/20 text-orange-400';
      case 'medium': return 'border-yellow-500 bg-yellow-900/20 text-yellow-400';
      case 'low': return 'border-green-500 bg-green-900/20 text-green-400';
      default: return 'border-gray-500 bg-gray-900/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'infrastructure': return '🏗️';
      case 'module': return '🧩';
      case 'training': return '🎓';
      case 'optimization': return '⚡';
      default: return '🔧';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Auto-Execution Control Panel */}
      <Card className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border-emerald-500/50">
        <CardHeader>
          <CardTitle className="text-emerald-400 flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2 animate-pulse" />
              🤖 Enhanced Auto-Execution Control Center
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={autoMode ? 'bg-green-600 animate-pulse' : 'bg-gray-600'}>
                {autoMode ? 'AUTO MODE ACTIVE' : 'MANUAL MODE'}
              </Badge>
              {isExecuting && (
                <Badge className="bg-blue-600 animate-pulse">
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  EXECUTING
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Auto Mode Control */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div>
              <h3 className="text-white font-medium mb-2 flex items-center">
                <Infinity className="w-5 h-5 mr-2 text-cyan-400" />
                🚀 Infinite Auto-Execution Mode
              </h3>
              <p className="text-gray-300 text-sm">
                Aktifkan eksekusi otomatis berkelanjutan dengan AI optimization
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">Manual</span>
              <Switch 
                checked={autoMode}
                onCheckedChange={handleToggleAutoMode}
                className="data-[state=checked]:bg-green-600"
              />
              <span className="text-sm text-gray-300">Auto ∞</span>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Execution Speed Control */}
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="text-blue-300 font-medium mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Execution Speed
              </h4>
              <div className="space-y-2">
                {[1000, 2000, 3000, 5000].map(speed => (
                  <Button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    variant={executionSpeed === speed ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {speed === 1000 ? '⚡ Turbo (1s)' :
                     speed === 2000 ? '🚀 Fast (2s)' :
                     speed === 3000 ? '⚡ Normal (3s)' :
                     '🐌 Careful (5s)'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Smart Mode Toggle */}
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <h4 className="text-purple-300 font-medium mb-3 flex items-center">
                <Cpu className="w-4 h-4 mr-2" />
                AI Smart Mode
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Smart Prioritization</span>
                  <Switch 
                    checked={smartMode}
                    onCheckedChange={setSmartMode}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Continuous Mode</span>
                  <Switch 
                    checked={continuousMode}
                    onCheckedChange={setContinuousMode}
                    className="data-[state=checked]:bg-cyan-600"
                  />
                </div>
              </div>
            </div>

            {/* Execution Stats */}
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <h4 className="text-green-300 font-medium mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Performance Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Executions:</span>
                  <span className="text-green-300">{autoExecutionStats.totalExecutions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate:</span>
                  <span className="text-green-300">
                    {autoExecutionStats.totalExecutions > 0 ? 
                      Math.round((autoExecutionStats.successfulExecutions / autoExecutionStats.totalExecutions) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Time:</span>
                  <span className="text-green-300">{autoExecutionStats.averageExecutionTime.toFixed(1)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Boost:</span>
                  <span className="text-green-300">+{autoExecutionStats.performanceBoost.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Status */}
          {autoMode && (
            <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
                  <div>
                    <h4 className="text-green-300 font-medium">Auto-Execution Status</h4>
                    <p className="text-sm text-gray-300">
                      {isExecuting ? 
                        `Executing action... (Queue: ${executionQueue.length})` :
                        `Waiting for next cycle... (Speed: ${executionSpeed/1000}s, Smart: ${smartMode ? 'ON' : 'OFF'})`
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">
                    {continuousMode ? '∞' : quickActions.filter(a => !isActionExecuted(a.id)).length}
                  </div>
                  <div className="text-xs text-gray-400">
                    {continuousMode ? 'Infinite Mode' : 'Actions Left'}
                  </div>
                </div>
              </div>
              
              {continuousMode && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Continuous Runtime</span>
                    <span className="text-cyan-300">{autoExecutionStats.continuousRunTime}s</span>
                  </div>
                  <Progress value={(autoExecutionStats.continuousRunTime % 30) * 3.33} className="h-1" />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions Section */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/50">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              ⚡ Smart Quick Actions Queue
            </div>
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              {quickActions.filter(action => !isActionExecuted(action.id)).length} Actions Available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const isExecuted = isActionExecuted(action.id);
              const isInQueue = isActionInQueue(action.id);
              const isNext = !isExecuted && !isInQueue && autoMode && index === 0;
              
              return (
                <div key={action.id} className={`p-4 rounded-lg border transition-all ${
                  isNext ? 'bg-blue-800/50 border-blue-500 shadow-lg shadow-blue-500/20' :
                  isExecuted ? 'bg-green-800/30 border-green-500/50' :
                  isInQueue ? 'bg-yellow-800/30 border-yellow-500/50' :
                  'bg-slate-800/50 border-slate-600'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{getTypeIcon(action.type)}</span>
                      <div>
                        <h4 className="text-white font-medium">{action.title}</h4>
                        <p className="text-sm text-gray-400">{action.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getDifficultyColor(action.difficulty)}>
                        {action.difficulty}
                      </Badge>
                      {isNext && autoMode && (
                        <Badge className="bg-blue-600 animate-pulse text-xs">
                          NEXT
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      Duration: {action.duration}
                    </div>
                    <div className="text-sm text-gray-400">
                      Prerequisites: {action.prerequisites.join(', ')}
                    </div>
                  </div>

                  <Button
                    onClick={() => onExecuteQuickAction(action.id)}
                    disabled={isExecuted || isInQueue || (autoMode && !isNext)}
                    className={`w-full ${
                      isExecuted 
                        ? 'bg-green-600/50 text-green-200 cursor-not-allowed' 
                        : isInQueue
                        ? 'bg-yellow-600/50 text-yellow-200 animate-pulse cursor-not-allowed'
                        : isNext && autoMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700 animate-pulse'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
                    }`}
                    size="sm"
                  >
                    {isExecuted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed ✓
                      </>
                    ) : isInQueue ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        In Queue...
                      </>
                    ) : isNext && autoMode ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Next Auto-Execute
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        {autoMode ? 'Auto-Queue' : 'Execute Now'}
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Target className="w-6 h-6 mr-2 text-purple-400" />
          🎯 Rekomendasi Pengembangan Detail
        </h2>
        
        {recommendations.map((rec, index) => (
          <Card key={index} className={`${getPriorityColor(rec.priority)} border-2`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  {rec.priority === 'critical' && <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />}
                  {rec.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(rec.priority).split(' ')[2]}>
                    {rec.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-blue-400 text-blue-400">
                    {rec.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{rec.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2">📅 Timeline & Impact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Estimated Time: {rec.estimatedTime}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Expected Impact</span>
                        <span className="text-green-400">+{rec.expectedImpact}%</span>
                      </div>
                      <Progress value={rec.expectedImpact} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">🛠️ Required Resources</h4>
                  <div className="space-y-1">
                    {rec.requiredResources.map((resource, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                        <span className="text-gray-300">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">📋 Action Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rec.actionItems.map((item, idx) => (
                    <div key={idx} className="p-2 bg-slate-900/50 rounded text-sm">
                      <div className="flex items-start">
                        <span className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailedRecommendations;
