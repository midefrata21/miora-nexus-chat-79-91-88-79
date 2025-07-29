import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Activity, Clock } from 'lucide-react';

interface SystemActivationButtonProps {
  systemName: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  system?: {
    activatedAt: Date | null;
    processCount: number;
    metrics: {
      performance: number;
      reliability: number;
    };
    logs: string[];
  };
}

const SystemActivationButton: React.FC<SystemActivationButtonProps> = ({
  systemName,
  isActive,
  onActivate,
  onDeactivate,
  system
}) => {
  return (
    <Card className="bg-gray-800/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-cyan-300">System Control</span>
          <Badge className={isActive ? "bg-green-500/20 text-green-400 border-green-500" : "bg-gray-500/20 text-gray-400 border-gray-500"}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={isActive ? onDeactivate : onActivate}
            className={`flex items-center gap-2 ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Deactivate System' : 'Activate System'}
          </Button>
          
          {isActive && (
            <div className="flex items-center gap-2 text-green-400">
              <Activity className="w-4 h-4" />
              <span className="text-sm">Running Autonomously</span>
            </div>
          )}
        </div>

        {isActive && system && (
          <div className="space-y-3 pt-3 border-t border-gray-700/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-cyan-400 font-medium">{system.processCount}</div>
                <div className="text-gray-400">Processes Executed</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-green-400 font-medium">{system.metrics.performance.toFixed(1)}%</div>
                <div className="text-gray-400">Performance</div>
              </div>
            </div>
            
            {system.activatedAt && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Activated: {system.activatedAt.toLocaleString()}</span>
              </div>
            )}
            
            {system.logs.length > 0 && (
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-cyan-300 text-sm mb-2">Latest Activity:</div>
                <div className="text-gray-300 text-xs space-y-1">
                  {system.logs.slice(-3).map((log, index) => (
                    <div key={index} className="truncate">{log}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-400 bg-gray-900/30 rounded p-2">
          <strong>Autonomous Mode:</strong> When activated, this system will continue running 
          in the background even when you navigate to other pages. All processes and data 
          will be preserved across page transitions.
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemActivationButton;