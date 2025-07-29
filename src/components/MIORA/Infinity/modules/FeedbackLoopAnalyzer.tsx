
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, BarChart } from 'lucide-react';

interface ModuleProps {
  module: {
    name: string;
    status: string;
    performance: number;
    errorCount: number;
  };
}

export const FeedbackLoopAnalyzer: React.FC<ModuleProps> = ({ module }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upgrading': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-yellow-500/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center text-sm">
          <RotateCcw className="h-5 w-5 mr-2" />
          Feedback Loop Analyzer
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
            <BarChart className="h-3 w-3 mr-1" />
            Analysis Rate: {module.performance > 80 ? 'High' : 'Medium'}
          </div>
          <div>Feedback Processing: Real-time</div>
          <div>Insights Generated: {Math.floor(module.performance / 10)}</div>
        </div>
      </CardContent>
    </Card>
  );
};
