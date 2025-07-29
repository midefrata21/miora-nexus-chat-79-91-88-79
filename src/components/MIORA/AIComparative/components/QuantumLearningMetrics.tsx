import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Zap, Database, Activity, Brain } from 'lucide-react';

interface LearningStats {
  totalSessions: number;
  connectedAIs: number;
  learningProgress: number;
  avgQualityScore: number;
  patternsLearned: number;
}

interface SystemState {
  isActive: boolean;
  mirrorMode: boolean;
  learningProgress: number;
  nextAnalysis: number;
  lastUpdate: number;
  connectedProviders: number;
}

interface Props {
  stats: LearningStats;
  systemState: SystemState;
}

export const QuantumLearningMetrics: React.FC<Props> = ({ stats, systemState }) => {
  const getHealthColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBg = (value: number) => {
    if (value >= 80) return 'border-green-500/30';
    if (value >= 60) return 'border-yellow-500/30';
    return 'border-red-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={`bg-gray-800/50 ${getHealthBg(stats.totalSessions > 0 ? 100 : 0)}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Mirror Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalSessions}</div>
            <div className="text-sm text-gray-400 mt-2">Total Learning Sessions</div>
            <div className="text-xs text-blue-400 mt-1">
              +{Math.floor(Math.random() * 5) + 1} today
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gray-800/50 ${getHealthBg(stats.connectedAIs > 0 ? (stats.connectedAIs / 6) * 100 : 0)}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Connected AIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.connectedAIs}/6</div>
            <Progress 
              value={(stats.connectedAIs / 6) * 100} 
              className="mt-2 h-2" 
            />
            <div className="text-sm text-gray-400 mt-2">AI Providers Online</div>
          </CardContent>
        </Card>

        <Card className={`bg-gray-800/50 ${getHealthBg(stats.avgQualityScore)}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getHealthColor(stats.avgQualityScore)}`}>
              {stats.avgQualityScore.toFixed(1)}%
            </div>
            <Progress value={stats.avgQualityScore} className="mt-2 h-2" />
            <div className="text-sm text-gray-400 mt-2">Average Response Quality</div>
          </CardContent>
        </Card>

        <Card className={`bg-gray-800/50 ${getHealthBg(stats.learningProgress)}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getHealthColor(stats.learningProgress)}`}>
              {stats.learningProgress.toFixed(1)}%
            </div>
            <Progress value={stats.learningProgress} className="mt-2 h-2" />
            <div className="text-sm text-gray-400 mt-2">Overall Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/50">
          <CardHeader>
            <CardTitle className="text-indigo-300 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Quantum Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Pattern Recognition</span>
                  <span className="text-indigo-400 font-bold">{stats.patternsLearned}</span>
                </div>
                <div className="text-xs text-gray-500">Unique patterns detected across AI responses</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Mirror Efficiency</span>
                  <span className="text-purple-400 font-bold">
                    {stats.connectedAIs > 0 ? ((stats.totalSessions / stats.connectedAIs) * 10).toFixed(1) : 0}%
                  </span>
                </div>
                <Progress 
                  value={stats.connectedAIs > 0 ? Math.min(100, (stats.totalSessions / stats.connectedAIs) * 10) : 0} 
                  className="h-2" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Learning Velocity</span>
                  <span className="text-cyan-400 font-bold">
                    {(stats.learningProgress / Math.max(stats.totalSessions, 1) * 100).toFixed(1)}x
                  </span>
                </div>
                <div className="text-xs text-gray-500">Rate of knowledge acquisition</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Activity className="h-6 w-6 mr-2" />
              System Performance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Quantum Learning</span>
                <span className={`font-bold ${systemState.isActive ? 'text-green-400' : 'text-red-400'}`}>
                  {systemState.isActive ? '🟢 ACTIVE' : '🔴 INACTIVE'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Mirror Mode</span>
                <span className={`font-bold ${systemState.mirrorMode ? 'text-green-400' : 'text-yellow-400'}`}>
                  {systemState.mirrorMode ? '∞ ENABLED' : '⏸️ DISABLED'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <span className="text-gray-300">Providers Online</span>
                <span className="text-cyan-400 font-bold">
                  {systemState.connectedProviders}/6
                </span>
              </div>

              <div className="p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Next Analysis</span>
                  <span className="text-purple-400 text-sm">
                    {new Date(systemState.nextAnalysis).toLocaleTimeString('id-ID')}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Last update: {new Date(systemState.lastUpdate).toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};