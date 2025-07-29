import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemHealthProps {
  health: {
    status: string;
    stability: number;
    errorCount: number;
    memoryUsage: number;
    lastError?: string;
  };
}

export const SystemHealthIndicator: React.FC<SystemHealthProps> = ({ health }) => {
  const getStatusColor = () => {
    if (health.stability >= 90) return 'text-green-400';
    if (health.stability >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = () => {
    if (health.stability >= 90) return <CheckCircle className="h-4 w-4 text-green-400" />;
    if (health.stability >= 70) return <Activity className="h-4 w-4 text-yellow-400" />;
    return <AlertTriangle className="h-4 w-4 text-red-400" />;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-medium">System Health</span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge variant={health.status === 'stable' ? 'default' : 'destructive'}>
              {health.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Stability</span>
              <span className={getStatusColor()}>{health.stability}%</span>
            </div>
            <Progress value={health.stability} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory Usage</span>
              <span className={health.memoryUsage > 80 ? 'text-red-400' : 'text-green-400'}>
                {health.memoryUsage}%
              </span>
            </div>
            <Progress value={health.memoryUsage} className="h-2" />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Error Count: {health.errorCount}</span>
            <span>Auto-Recovery: Active</span>
          </div>
          
          {health.lastError && (
            <div className="text-xs text-orange-400 bg-orange-500/10 p-2 rounded">
              Last Error: {health.lastError.slice(0, 50)}...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};