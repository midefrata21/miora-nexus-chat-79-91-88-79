
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle, Clock, Zap, Activity } from 'lucide-react';

interface ExecutionItem {
  id: string;
  recommendationId: string;
  title: string;
  status: 'queued' | 'executing' | 'completed' | 'failed';
  startTime?: number;
  endTime?: number;
  progress: number;
}

interface ExecutionTrackerProps {
  executionQueue: ExecutionItem[];
  onExecute: (recommendationId: string) => void;
}

export const ExecutionTracker: React.FC<ExecutionTrackerProps> = ({
  executionQueue,
  onExecute
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'queued': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'executing': return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed': return <Zap className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queued': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'executing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDuration = (startTime?: number, endTime?: number) => {
    if (!startTime) return 'Not started';
    const end = endTime || Date.now();
    const duration = Math.floor((end - startTime) / 1000);
    return `${duration}s`;
  };

  if (executionQueue.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No executions in queue</p>
            <p className="text-sm">Execute recommendations to see them here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-slate-900/50 to-gray-900/50 border-slate-600/50">
      <CardHeader>
        <CardTitle className="text-slate-300 flex items-center">
          <Activity className="h-6 w-6 mr-2" />
          🚀 Execution Tracker ({executionQueue.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {executionQueue.slice(-10).reverse().map((item, index) => (
            <div key={item.id} className="p-4 bg-black/20 rounded-lg border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {executionQueue.length - index}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-gray-400 text-sm">ID: {item.recommendationId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {item.status === 'executing' && (
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-blue-400">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">
                    Duration: {formatDuration(item.startTime, item.endTime)}
                  </span>
                  {item.startTime && (
                    <span className="text-gray-400">
                      Started: {new Date(item.startTime).toLocaleTimeString('id-ID')}
                    </span>
                  )}
                </div>
                
                {item.status === 'failed' && (
                  <Button
                    size="sm"
                    onClick={() => onExecute(item.recommendationId)}
                    className="bg-orange-600 hover:bg-orange-500"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Retry
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {executionQueue.length > 10 && (
          <div className="text-center mt-4 text-gray-400 text-sm">
            Showing latest 10 executions out of {executionQueue.length} total
          </div>
        )}
      </CardContent>
    </Card>
  );
};
