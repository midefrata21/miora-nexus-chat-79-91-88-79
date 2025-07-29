import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SystemStatus } from './types';

interface DashboardFooterProps {
  systemStatus: SystemStatus;
}

export const DashboardFooter: React.FC<DashboardFooterProps> = React.memo(({ systemStatus }) => {
  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-blue-900/50 border-blue-500/30">
      <CardContent className="p-4 text-center">
        <p className="text-gray-300">
          MIORA AI System v4.0 - Last Update: {new Date(systemStatus.lastUpdate).toLocaleString('id-ID')}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          🚀 All critical bugs have been resolved and system optimizations applied
        </p>
      </CardContent>
    </Card>
  );
});