
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Infinity, Monitor, Activity } from 'lucide-react';

interface InfinityLoopControllerProps {
  module: {
    id: string;
    name: string;
    status: 'active' | 'developing' | 'upgrading' | 'standby' | 'error';
    progress: number;
    lastActivity: number;
    capabilities: string[];
    version: string;
    dependencies: string[];
  };
}

export const InfinityLoopController: React.FC<InfinityLoopControllerProps> = ({ module }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'developing': return 'bg-blue-500';
      case 'upgrading': return 'bg-purple-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-indigo-300 flex items-center">
            <Infinity className="h-5 w-5 mr-2 animate-pulse" />
            {module.name}
          </CardTitle>
          <Badge className={`${getStatusColor(module.status)} text-white`}>
            {module.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Loop Control Progress</span>
            <span className="text-indigo-300">{module.progress.toFixed(1)}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center text-indigo-400 mb-1">
              <Monitor className="w-3 h-3 mr-1" />
              Version
            </div>
            <div className="text-white font-bold">{module.version}</div>
          </div>
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center text-purple-400 mb-1">
              <Activity className="w-3 h-3 mr-1" />
              Controls
            </div>
            <div className="text-white font-bold">{module.capabilities.length}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-indigo-300 text-sm font-medium">Infinity Loop Functions:</h4>
          <div className="space-y-1 text-xs">
            <div className="p-2 bg-indigo-900/20 rounded border border-indigo-500/20">
              🔄 Continuous system monitoring
            </div>
            <div className="p-2 bg-indigo-900/20 rounded border border-indigo-500/20">
              🛠️ Automated maintenance cycles
            </div>
            <div className="p-2 bg-indigo-900/20 rounded border border-indigo-500/20">
              📊 Resource management ∞
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-indigo-300 text-sm font-medium">Dependencies:</h4>
          <div className="flex flex-wrap gap-1">
            {module.dependencies.map((dep, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {dep}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-indigo-500/20">
          <p className="text-xs text-gray-400">
            Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
