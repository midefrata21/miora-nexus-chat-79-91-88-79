
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Signal, DollarSign } from 'lucide-react';

interface MIORAMetricsProps {
  totalProfitLoss: number;
  activeSignals: number;
  metrics: {
    cpu: number;
    memory: number;
    network: number;
    performance: number;
  };
}

export const MIORAMetrics: React.FC<MIORAMetricsProps> = ({
  totalProfitLoss,
  activeSignals,
  metrics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Trading Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Total P&L:</span>
            <div className={`flex items-center space-x-2 ${
              totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-bold">
                ${totalProfitLoss.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Active Signals:</span>
            <div className="flex items-center space-x-2 text-cyan-400">
              <Signal className="h-4 w-4" />
              <span className="font-bold">{activeSignals}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">System Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">CPU Usage</span>
                <span className="text-gray-300">{metrics.cpu.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.cpu} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Memory</span>
                <span className="text-gray-300">{metrics.memory.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.memory} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Network</span>
                <span className="text-gray-300">{metrics.network.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.network} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Performance</span>
                <span className="text-gray-300">{metrics.performance.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.performance} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
