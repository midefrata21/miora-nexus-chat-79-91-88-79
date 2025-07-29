
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Activity, Target, Zap } from 'lucide-react';

interface FrameworkState {
  isActive: boolean;
  status: 'idle' | 'active' | 'evolving' | 'adapting' | 'learning' | 'error';
  overallProgress: number;
  lastUpdate: number;
  evolutionCycles: number;
  recentActivities: Array<{
    type: string;
    description: string;
    impact: string;
    timestamp: number;
  }>;
}

interface EvolutionTrackerProps {
  frameworkState: FrameworkState;
  stats: {
    autonomyLevel: number;
    evolutionCycles: number;
    activeModules: number;
    adaptationScore: number;
    learningRate: number;
    systemHealth: number;
  };
}

export const EvolutionTracker: React.FC<EvolutionTrackerProps> = ({ frameworkState, stats }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH':
        return 'bg-red-500';
      case 'MEDIUM':
        return 'bg-orange-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-cyan-800/30 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          Evolution Activity Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Evolution Metrics */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Evolution Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Autonomy Progress</span>
                <span className="text-cyan-300">{stats.autonomyLevel}%</span>
              </div>
              <Progress value={stats.autonomyLevel} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Adaptation Score</span>
                <span className="text-cyan-300">{stats.adaptationScore.toFixed(1)}%</span>
              </div>
              <Progress value={stats.adaptationScore} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Learning Efficiency</span>
                <span className="text-cyan-300">{(stats.learningRate * 20).toFixed(1)}%</span>
              </div>
              <Progress value={stats.learningRate * 20} className="h-2" />
            </div>
          </div>

          {/* Recent Activities */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Recent Evolution Activities</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {frameworkState.recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-700/30 rounded border border-gray-600/30 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{activity.type}</span>
                    <Badge className={`text-xs ${getImpactColor(activity.impact)}`}>
                      {activity.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{activity.description}</p>
                  <div className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              
              {frameworkState.recentActivities.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recent activities</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Performance Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-300 font-medium">System Performance Summary</span>
            </div>
            <Badge className="bg-cyan-500">
              Overall: {((stats.autonomyLevel + stats.adaptationScore + stats.systemHealth) / 3).toFixed(1)}%
            </Badge>
          </div>
          <div className="mt-2 text-sm text-gray-300">
            Framework is operating at optimal levels with {stats.activeModules} active modules and {stats.evolutionCycles} completed evolution cycles.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
