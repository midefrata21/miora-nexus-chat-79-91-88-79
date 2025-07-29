import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Play, Pause } from 'lucide-react';
import { GenerationStats } from './types';

interface AutoCodeControlPanelProps {
  isActive: boolean;
  generationStats: GenerationStats;
  onToggle: () => void;
}

export const AutoCodeControlPanel: React.FC<AutoCodeControlPanelProps> = ({
  isActive,
  generationStats,
  onToggle
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <Code className="w-5 h-5 mr-2" />
            AutoCode Generation Engine
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${isActive ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
              {isActive ? 'ACTIVE' : 'STANDBY'}
            </Badge>
            <Button
              onClick={onToggle}
              variant="outline"
              size="sm"
              className={`${isActive ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}`}
            >
              {isActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isActive ? 'Stop' : 'Start'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">{generationStats.totalGenerated}</div>
            <div className="text-sm text-gray-400">Components Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">{generationStats.successRate}%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">{generationStats.avgGenerationTime}s</div>
            <div className="text-sm text-gray-400">Avg Gen Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">{generationStats.linesOfCode.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Lines of Code</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};