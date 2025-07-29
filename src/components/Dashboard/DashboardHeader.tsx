import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity } from 'lucide-react';
import { SystemStatus } from './types';

interface DashboardHeaderProps {
  systemStatus: SystemStatus;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = React.memo(({ systemStatus }) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <div className="relative">
          <Brain className="h-12 w-12 text-cyan-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            MIORA AI DASHBOARD
          </h1>
          <p className="text-gray-300">Advanced AI System Management Center</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <Badge className={`px-4 py-2 ${systemStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
          <Activity className="h-4 w-4 mr-2" />
          {systemStatus.isOnline ? 'ONLINE' : 'OFFLINE'}
        </Badge>
        <Badge className="px-4 py-2 bg-blue-500">
          Health: {systemStatus.healthScore.toFixed(1)}%
        </Badge>
        <Badge className="px-4 py-2 bg-purple-500">
          Modules: {systemStatus.activeModules}
        </Badge>
      </div>
    </div>
  );
});