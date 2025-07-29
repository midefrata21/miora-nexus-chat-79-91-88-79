import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, WifiOff, Activity, AlertCircle } from 'lucide-react';
import { EnhancedPerformanceMonitor } from './EnhancedPerformanceMonitor';

interface RealTimeStatusProps {
  connectionStatus: Record<string, boolean>;
  connectedSymbols: number;
  totalSymbols: number;
  connectedExchanges: string[];
}

export const RealTimeStatus: React.FC<RealTimeStatusProps> = ({
  connectionStatus,
  connectedSymbols,
  totalSymbols,
  connectedExchanges
}) => {
  const getStatusIcon = (connected: boolean) => {
    return connected ? 
      <Wifi className="h-4 w-4 text-green-500" /> : 
      <WifiOff className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (exchange: string, connected: boolean) => {
    return (
      <Badge 
        key={exchange}
        variant={connected ? "default" : "destructive"}
        className="flex items-center gap-1"
      >
        {getStatusIcon(connected)}
        {exchange.toUpperCase()}
      </Badge>
    );
  };

  const connectionPercentage = totalSymbols > 0 ? (connectedSymbols / totalSymbols) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Enhanced Performance Monitor */}
      <EnhancedPerformanceMonitor />
      
      {/* Real-Time Exchange Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Real-Time Exchange Status
            <Badge variant="outline" className="ml-auto">
              Enhanced Monitoring
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Connection Overview */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Connection Quality:</span>
                <Badge 
                  variant={connectionPercentage > 80 ? "default" : connectionPercentage > 50 ? "secondary" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {connectionPercentage > 80 ? (
                    <Wifi className="h-3 w-3" />
                  ) : (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  {connectionPercentage.toFixed(0)}%
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {connectedSymbols}/{totalSymbols} pairs connected
              </div>
            </div>

            {/* Exchange Status */}
            <div>
              <div className="text-sm text-muted-foreground mb-2">Exchange Connections:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(connectionStatus).map(([exchange, connected]) => 
                  getStatusBadge(exchange, connected)
                )}
              </div>
            </div>

            {/* Active Exchanges Summary */}
            {connectedExchanges.length > 0 && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-sm text-green-700 dark:text-green-300">
                  ✅ Active: {connectedExchanges.map(ex => ex.toUpperCase()).join(', ')}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Receiving real-time price feeds with enhanced stability
                </div>
              </div>
            )}

            {/* Enhanced Warning */}
            {connectedExchanges.length === 0 && (
              <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Auto-Recovery Mode: Using optimized simulated data
                </div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  System running on fallback mode with enhanced signal generation
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};