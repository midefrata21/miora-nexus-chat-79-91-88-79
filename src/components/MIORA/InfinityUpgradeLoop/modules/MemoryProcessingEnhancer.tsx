
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Activity } from 'lucide-react';

interface UpgradeModule {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'upgrading' | 'error';
  progress: number;
  lastActivity: number;
}

interface MemoryProcessingEnhancerProps {
  module: UpgradeModule;
}

export const MemoryProcessingEnhancer: React.FC<MemoryProcessingEnhancerProps> = ({ module }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upgrading': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40 border-indigo-500/50">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Memory Enhancer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Status</span>
            <Badge className={`${getStatusColor(module.status)} text-white`}>
              {module.status.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-indigo-400 font-bold">{module.progress.toFixed(0)}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
          <div className="flex items-center text-xs text-gray-400">
            <Activity className="h-3 w-3 mr-1" />
            <span>Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}</span>
          </div>
          <p className="text-xs text-gray-400">
            Mengoptimalkan sistem memori dan meningkatkan efisiensi pemrosesan data
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
