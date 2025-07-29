
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Archive } from 'lucide-react';

interface ModuleProps {
  module: {
    name: string;
    status: string;
    performance: number;
    errorCount: number;
  };
}

export const MemoryEvolutionSystem: React.FC<ModuleProps> = ({ module }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upgrading': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center text-sm">
          <Database className="h-5 w-5 mr-2" />
          Memory Evolution System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className={`${getStatusColor(module.status)} text-white text-xs`}>
            {module.status.toUpperCase()}
          </Badge>
          <span className="text-white text-sm font-bold">
            {module.performance.toFixed(1)}%
          </span>
        </div>
        
        <Progress value={module.performance} className="h-2" />
        
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center">
            <Archive className="h-3 w-3 mr-1" />
            Memory Optimization: Active
          </div>
          <div>Knowledge Compression: {module.performance > 85 ? 'Efficient' : 'Standard'}</div>
          <div>Retention Rate: {Math.floor(module.performance)}%</div>
          {module.errorCount > 0 && (
            <div className="text-red-400">Memory Errors: {module.errorCount}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
