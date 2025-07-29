
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Brain, Database, Zap } from 'lucide-react';

interface SystemDashboardProps {
  systemState: {
    isRunning: boolean;
    cycleCount: number;
    systemHealth: string;
    errorCount: number;
  };
  stats: {
    activeModules: number;
    totalModules: number;
    avgPerformance: number;
    memoryUsage: number;
    evolutionScore: number;
    activeSkills: number;
    knowledgeEntries: number;
  };
  evolutionLevel: number;
}

export const SystemDashboard: React.FC<SystemDashboardProps> = ({
  systemState,
  stats,
  evolutionLevel
}) => {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">System Status</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`w-3 h-3 rounded-full ${systemState.isRunning ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                <span className="text-white font-bold">
                  {systemState.isRunning ? 'ACTIVE' : 'STOPPED'}
                </span>
              </div>
              <p className="text-blue-200 text-xs mt-1">
                Cycle #{systemState.cycleCount}
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Performance</p>
              <p className="text-white text-2xl font-bold">
                {stats.avgPerformance.toFixed(1)}%
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`${getHealthColor(systemState.systemHealth)} text-white text-xs`}>
                  {systemState.systemHealth.toUpperCase()}
                </Badge>
                <span className="text-purple-200 text-xs">
                  Errors: {systemState.errorCount}
                </span>
              </div>
            </div>
            <Zap className="h-8 w-8 text-purple-400" />
          </div>
          <Progress value={stats.avgPerformance} className="mt-2 h-2" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Evolution</p>
              <p className="text-white text-2xl font-bold">
                Level {evolutionLevel}
              </p>
              <p className="text-green-200 text-xs mt-1">
                Score: {stats.evolutionScore.toFixed(1)}%
              </p>
              <p className="text-green-200 text-xs">
                Skills: {stats.activeSkills}
              </p>
            </div>
            <Brain className="h-8 w-8 text-green-400" />
          </div>
          <Progress value={stats.evolutionScore} className="mt-2 h-2" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm font-medium">Memory & Data</p>
              <p className="text-white text-2xl font-bold">
                {stats.memoryUsage.toFixed(1)}MB
              </p>
              <p className="text-orange-200 text-xs mt-1">
                Modules: {stats.activeModules}/{stats.totalModules}
              </p>
              <p className="text-orange-200 text-xs">
                Knowledge: {stats.knowledgeEntries} entries
              </p>
            </div>
            <Database className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
