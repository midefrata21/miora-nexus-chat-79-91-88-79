
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cog, Code, Wrench } from 'lucide-react';

interface SelfUpgradeModuleProps {
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

export const SelfUpgradeModule: React.FC<SelfUpgradeModuleProps> = ({ module }) => {
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
    <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-300 flex items-center">
            <Cog className="h-5 w-5 mr-2" />
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
            <span className="text-gray-400">Upgrade Progress</span>
            <span className="text-cyan-300">{module.progress.toFixed(1)}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center text-cyan-400 mb-1">
              <Code className="w-3 h-3 mr-1" />
              Version
            </div>
            <div className="text-white font-bold">{module.version}</div>
          </div>
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center text-blue-400 mb-1">
              <Wrench className="w-3 h-3 mr-1" />
              Tools
            </div>
            <div className="text-white font-bold">{module.capabilities.length}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-cyan-300 text-sm font-medium">Upgrade Capabilities:</h4>
          <div className="space-y-1 text-xs">
            <div className="p-2 bg-cyan-900/20 rounded border border-cyan-500/20">
              💻 Autonomous code generation
            </div>
            <div className="p-2 bg-cyan-900/20 rounded border border-cyan-500/20">
              🏗️ System module creation
            </div>
            <div className="p-2 bg-cyan-900/20 rounded border border-cyan-500/20">
              ⚡ Performance optimization
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-cyan-300 text-sm font-medium">Dependencies:</h4>
          <div className="flex flex-wrap gap-1">
            {module.dependencies.map((dep, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {dep}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-cyan-500/20">
          <p className="text-xs text-gray-400">
            Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
