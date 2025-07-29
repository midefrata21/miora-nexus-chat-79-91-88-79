
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Brain, Target, TrendingUp, Zap, Database } from 'lucide-react';

interface FrameworkState {
  isActive: boolean;
  status: 'idle' | 'active' | 'evolving' | 'adapting' | 'learning' | 'error';
  overallProgress: number;
  lastUpdate: number;
  evolutionCycles: number;
}

interface SystemStatusProps {
  frameworkState: FrameworkState;
  stats: {
    autonomyLevel: number;
    evolutionCycles: number;
    activeModules: number;
    adaptationScore: number;
    learningRate: number;
    systemHealth: number;
  };
  autoMode: boolean;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ frameworkState, stats, autoMode }) => {
  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center justify-between">
          <span className="flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            MIORA Framework Control Center
          </span>
          <Badge className={`px-4 py-2 ${autoMode ? 'bg-green-500' : 'bg-orange-500'}`}>
            {autoMode ? 'AUTO-EVOLUTION' : 'MANUAL MODE'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
            <div className="text-green-400 text-sm">Autonomy Level</div>
            <div className="text-2xl font-bold text-white">{stats.autonomyLevel}%</div>
          </div>
          <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
            <div className="text-blue-400 text-sm">Active Modules</div>
            <div className="text-2xl font-bold text-white">{stats.activeModules}</div>
          </div>
          <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
            <div className="text-purple-400 text-sm">Evolution Cycles</div>
            <div className="text-2xl font-bold text-white">{stats.evolutionCycles}</div>
          </div>
          <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
            <div className="text-orange-400 text-sm">Learning Rate</div>
            <div className="text-2xl font-bold text-white">{stats.learningRate.toFixed(1)}x</div>
          </div>
          <div className="p-4 bg-cyan-900/30 rounded border border-cyan-500/30">
            <div className="text-cyan-400 text-sm">Adaptation Score</div>
            <div className="text-2xl font-bold text-white">{stats.adaptationScore.toFixed(1)}%</div>
          </div>
          <div className="p-4 bg-emerald-900/30 rounded border border-emerald-500/30">
            <div className="text-emerald-400 text-sm">System Health</div>
            <div className="text-2xl font-bold text-white">{stats.systemHealth.toFixed(1)}%</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overall Framework Progress</span>
              <span className="text-purple-300">{frameworkState.overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={frameworkState.overallProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="text-gray-400">Current Status</div>
              <div className="text-white font-medium capitalize">{frameworkState.status}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400">Last Update</div>
              <div className="text-white font-medium">
                {new Date(frameworkState.lastUpdate).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
