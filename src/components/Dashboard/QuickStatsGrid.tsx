import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuickStats } from './types';

interface QuickStatsGridProps {
  quickStats: QuickStats;
}

export const QuickStatsGrid: React.FC<QuickStatsGridProps> = React.memo(({ quickStats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{quickStats.totalSystems}</div>
          <div className="text-sm text-green-300">Total Systems</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{quickStats.activeSystems}</div>
          <div className="text-sm text-blue-300">Active Now</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{quickStats.upgradesAvailable}</div>
          <div className="text-sm text-purple-300">Upgrades Available</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{quickStats.issuesResolved}</div>
          <div className="text-sm text-yellow-300">Issues Resolved</div>
        </CardContent>
      </Card>
    </div>
  );
});