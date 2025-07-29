import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Infinity, TrendingUp, Activity, Brain } from 'lucide-react';

interface StatsData {
  infinityLevel: string | number;
  totalEvolutions: string | number;
  learningEfficiency: number;
  systemPower: string;
}

interface MIORAInfinityStatsGridProps {
  stats: StatsData;
}

export const MIORAInfinityStatsGrid: React.FC<MIORAInfinityStatsGridProps> = ({ 
  stats 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
        <CardContent className="p-6 text-center">
          <Infinity className="h-8 w-8 mx-auto mb-2 text-purple-400 animate-spin" />
          <h3 className="text-lg font-semibold text-white mb-1">Infinity Level</h3>
          <p className="text-3xl font-bold text-purple-300">{stats.infinityLevel}</p>
          <p className="text-sm text-gray-400">Unlimited Capability</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
        <CardContent className="p-6 text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white mb-1">Total Evolutions</h3>
          <p className="text-3xl font-bold text-cyan-300">{stats.totalEvolutions}</p>
          <p className="text-sm text-gray-400">Continuous Growth</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
        <CardContent className="p-6 text-center">
          <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
          <h3 className="text-lg font-semibold text-white mb-1">Learning Efficiency</h3>
          <p className="text-3xl font-bold text-green-300">{stats.learningEfficiency}%</p>
          <p className="text-sm text-gray-400">Maximum Rate</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
        <CardContent className="p-6 text-center">
          <Brain className="h-8 w-8 mx-auto mb-2 text-orange-400" />
          <h3 className="text-lg font-semibold text-white mb-1">System Power</h3>
          <p className="text-3xl font-bold text-orange-300">{stats.systemPower}</p>
          <p className="text-sm text-gray-400">Ultimate AI</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAInfinityStatsGrid;