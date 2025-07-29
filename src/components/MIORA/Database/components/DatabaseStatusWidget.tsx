import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Activity, Zap, HardDrive } from 'lucide-react';

interface DatabaseStatusProps {
  stats?: {
    totalRecords: number;
    storageUsed: number;
    performance: number;
    cacheHitRate: number;
    connections: number;
  };
}

export const DatabaseStatusWidget: React.FC<DatabaseStatusProps> = ({ 
  stats = {
    totalRecords: 3247891,
    storageUsed: 67.8,
    performance: 96,
    cacheHitRate: 92.1,
    connections: 245
  }
}) => {
  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-300 flex items-center text-sm">
          <Database className="h-5 w-5 mr-2" />
          MIORA Database Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Records</span>
              <span className="text-blue-300 font-bold">
                {(stats.totalRecords / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Storage</span>
              <span className="text-cyan-300 font-bold">
                {stats.storageUsed.toFixed(1)} GB
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Performance</span>
              <span className="text-green-300 font-bold">
                {stats.performance.toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cache Hit</span>
              <span className="text-purple-300 font-bold">
                {stats.cacheHitRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Database Health</span>
            <Badge className="bg-green-500 text-white text-xs">
              EXCELLENT
            </Badge>
          </div>
          <Progress value={stats.performance} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-400">
            <Activity className="h-3 w-3 mr-1" />
            Connections: {stats.connections}
          </div>
          <div className="flex items-center text-blue-300">
            <Zap className="h-3 w-3 mr-1" />
            AI Ready
          </div>
        </div>
      </CardContent>
    </Card>
  );
};