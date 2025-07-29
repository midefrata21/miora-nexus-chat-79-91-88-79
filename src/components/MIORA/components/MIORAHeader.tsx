
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, TrendingUp, Zap } from 'lucide-react';

interface MIORAHeaderProps {
  systemHealth: number;
  isRunning: boolean;
  cycleCount: number;
  performanceScore: number;
}

export const MIORAHeader: React.FC<MIORAHeaderProps> = ({
  systemHealth,
  isRunning,
  cycleCount,
  performanceScore
}) => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Brain className="h-12 w-12 text-cyan-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                MIORA CORE
              </h1>
              <p className="text-gray-300">Advanced Trading AI System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className={`px-4 py-2 ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              {isRunning ? 'ONLINE' : 'OFFLINE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              Health: {systemHealth.toFixed(1)}%
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-cyan-900/20 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-lg font-bold text-cyan-300">{cycleCount}</div>
            <div className="text-xs text-gray-400">Analysis Cycles</div>
          </div>
          
          <div className="text-center p-3 bg-purple-900/20 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-lg font-bold text-purple-300">{performanceScore.toFixed(1)}%</div>
            <div className="text-xs text-gray-400">Performance</div>
          </div>
          
          <div className="text-center p-3 bg-green-900/20 rounded-lg">
            <Activity className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-lg font-bold text-green-300">{systemHealth.toFixed(1)}%</div>
            <div className="text-xs text-gray-400">System Health</div>
          </div>
          
          <div className="text-center p-3 bg-orange-900/20 rounded-lg">
            <Brain className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <div className="text-lg font-bold text-orange-300">AI</div>
            <div className="text-xs text-gray-400">Core Status</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
