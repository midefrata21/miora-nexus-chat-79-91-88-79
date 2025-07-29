
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface MIORASystemHealthProps {
  systemHealth: number;
  metrics: {
    cpu: number;
    memory: number;
    network: number;
    performance: number;
  };
}

export const MIORASystemHealth: React.FC<MIORASystemHealthProps> = ({
  systemHealth,
  metrics
}) => {
  const getHealthStatus = (health: number) => {
    if (health >= 90) return { icon: CheckCircle, color: 'text-green-400', status: 'Excellent' };
    if (health >= 70) return { icon: AlertTriangle, color: 'text-yellow-400', status: 'Good' };
    return { icon: XCircle, color: 'text-red-400', status: 'Critical' };
  };

  const healthStatus = getHealthStatus(systemHealth);
  const HealthIcon = healthStatus.icon;

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          System Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HealthIcon className={`h-8 w-8 ${healthStatus.color}`} />
            <div>
              <div className="text-3xl font-bold text-white">
                {systemHealth.toFixed(1)}%
              </div>
              <div className={`text-sm ${healthStatus.color}`}>
                {healthStatus.status}
              </div>
            </div>
          </div>
          <Progress value={systemHealth} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-300">
              {metrics.cpu.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">CPU Load</div>
          </div>
          
          <div className="text-center p-3 bg-purple-900/20 rounded-lg">
            <div className="text-lg font-bold text-purple-300">
              {metrics.memory.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">Memory Usage</div>
          </div>
          
          <div className="text-center p-3 bg-green-900/20 rounded-lg">
            <div className="text-lg font-bold text-green-300">
              {metrics.network.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">Network Health</div>
          </div>
          
          <div className="text-center p-3 bg-cyan-900/20 rounded-lg">
            <div className="text-lg font-bold text-cyan-300">
              {metrics.performance.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">AI Performance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
