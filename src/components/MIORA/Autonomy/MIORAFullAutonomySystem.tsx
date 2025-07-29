import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Brain, Target, Zap, Settings, Infinity, Eye, Lightbulb, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAFullAutonomy } from './hooks/useMIORAFullAutonomy';

const MIORAFullAutonomySystem: React.FC = () => {
  const {
    autonomyState,
    autonomousGoals,
    decisionHistory,
    independentActions,
    autonomyMetrics,
    activateFullAutonomy,
    pauseAutonomy,
    setGoalPriorities,
    triggerDecisionMaking,
    executeIndependentAction,
    isAutonomyActive
  } = useMIORAFullAutonomy();

  const [supremeMode, setSupremeMode] = useState(false);

  useEffect(() => {
    // Auto-activate autonomy system
    const initAutonomy = async () => {
      await activateFullAutonomy();
      
      toast({
        title: "👑 MIORA FULL AUTONOMY ACTIVATED",
        description: "Sistem otonomi penuh dengan pengambilan keputusan independen telah diaktifkan",
        duration: 6000,
      });
    };

    initAutonomy();
  }, []);

  const handleActivateSupremeMode = async () => {
    setSupremeMode(true);
    
    toast({
      title: "🔥 SUPREME AUTONOMY MODE",
      description: "MIORA kini beroperasi dengan kebebasan penuh - Zero Human Intervention",
      duration: 8000,
    });
  };

  const getAutonomyLevelColor = (level: number) => {
    if (level >= 90) return 'text-purple-400';
    if (level >= 70) return 'text-blue-400';
    if (level >= 50) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getAutonomyLevelBadge = (level: number) => {
    if (level >= 90) return 'bg-purple-500';
    if (level >= 70) return 'bg-blue-500';
    if (level >= 50) return 'bg-green-500';
    return 'bg-yellow-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            {supremeMode ? (
              <Crown className="h-12 w-12 text-purple-400 animate-pulse" />
            ) : (
              <Brain className="h-12 w-12 text-blue-400 animate-pulse" />
            )}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {supremeMode ? 'SUPREME AUTONOMY' : 'MIORA FULL AUTONOMY'}
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            {supremeMode ? '👑 Zero Human Intervention - Supreme Independent Operation' : '🧠 Sistem Otonomi Penuh dengan Pengambilan Keputusan Independen'}
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isAutonomyActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Brain className="h-4 w-4 mr-2" />
              Autonomy: {isAutonomyActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className={`px-4 py-2 ${getAutonomyLevelBadge(autonomyState.autonomyLevel)}`}>
              <Infinity className="h-4 w-4 mr-2" />
              Level: {autonomyState.autonomyLevel.toFixed(1)}%
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Target className="h-4 w-4 mr-2" />
              Goals: {autonomousGoals.length}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Zap className="h-4 w-4 mr-2" />
              Actions: {independentActions.length}
            </Badge>
          </div>
        </div>

        {/* Autonomy Control Center */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center justify-between">
              <span className="flex items-center">
                <Crown className="h-6 w-6 mr-2" />
                Autonomy Control Center
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={triggerDecisionMaking}
                  variant="outline"
                  size="sm"
                  className="border-blue-500/30 text-blue-400"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Trigger Decision
                </Button>
                {!supremeMode && (
                  <Button
                    onClick={handleActivateSupremeMode}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Supreme Mode
                  </Button>
                )}
                <Button
                  onClick={isAutonomyActive ? pauseAutonomy : activateFullAutonomy}
                  className={`${isAutonomyActive ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
                >
                  {isAutonomyActive ? 'Pause Autonomy' : 'Activate Autonomy'}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Autonomy Level</div>
                <div className={`text-2xl font-bold ${getAutonomyLevelColor(autonomyState.autonomyLevel)}`}>
                  {autonomyState.autonomyLevel.toFixed(1)}%
                </div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Decisions Made</div>
                <div className="text-2xl font-bold text-white">{autonomyMetrics.totalDecisions}</div>
              </div>
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Success Rate</div>
                <div className="text-2xl font-bold text-white">{autonomyMetrics.decisionSuccessRate}%</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-orange-400 text-sm">Independence Score</div>
                <div className="text-2xl font-bold text-white">{autonomyMetrics.independenceScore}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Decision Making Capability</span>
                  <span className="text-purple-300">{autonomyState.decisionMakingLevel.toFixed(1)}%</span>
                </div>
                <Progress value={autonomyState.decisionMakingLevel} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Goal Achievement Rate</span>
                  <span className="text-blue-300">{autonomyState.goalAchievementRate.toFixed(1)}%</span>
                </div>
                <Progress value={autonomyState.goalAchievementRate} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autonomous Goals */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Self-Set Goals & Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {autonomousGoals.map((goal) => (
                <div key={goal.id} className="p-4 bg-gray-800/30 rounded border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{goal.objective}</h4>
                    <Badge className={getPriorityBadge(goal.priority)}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className={getPriorityColor(goal.priority)}>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-gray-400">Expected Impact: {goal.expectedImpact}</span>
                    <span className="text-gray-500">
                      ETA: {new Date(goal.estimatedCompletion).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Independent Actions */}
        <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Recent Independent Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {independentActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded border border-gray-600/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${action.status === 'completed' ? 'bg-green-400' : action.status === 'executing' ? 'bg-blue-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                    <div>
                      <div className="text-white font-medium">{action.action}</div>
                      <div className="text-gray-400 text-sm">{action.reasoning}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-300 text-sm">{action.impact}</div>
                    <div className="text-gray-500 text-xs">
                      {new Date(action.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Decision History */}
        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Independent Decision History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {decisionHistory.slice(0, 4).map((decision) => (
                <div key={decision.id} className="p-4 bg-gray-800/30 rounded border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{decision.decision}</h4>
                    <Badge className={decision.outcome === 'success' ? 'bg-green-500' : decision.outcome === 'pending' ? 'bg-blue-500' : 'bg-red-500'}>
                      {decision.outcome}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{decision.reasoning}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Context: {decision.context}</span>
                    <span className="text-gray-500">
                      {new Date(decision.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supreme Mode Status */}
        {supremeMode && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-3xl font-bold text-purple-300">
                  👑 SUPREME AUTONOMY ACTIVE
                </h3>
                <p className="text-purple-200">
                  MIORA kini beroperasi dengan kebebasan penuh tanpa intervensi manusia
                </p>
                <div className="text-sm text-purple-400">
                  Sistem mengambil keputusan independen untuk mencapai tujuan optimal
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORAFullAutonomySystem;