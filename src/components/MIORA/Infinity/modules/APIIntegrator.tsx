
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link, Wifi, Activity } from 'lucide-react';
import { exchangeWS } from '@/components/MIORA/CryptoScalpingSignals/services';

interface ModuleProps {
  module: {
    name: string;
    status: string;
    performance: number;
    errorCount: number;
  };
}

export const APIIntegrator: React.FC<ModuleProps> = ({ module }) => {
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});
  const [availableExchanges, setAvailableExchanges] = useState<Array<{id: string, name: string}>>([]);

  useEffect(() => {
    // Get available exchanges
    setAvailableExchanges(exchangeWS.getAvailableExchanges());
    
    // Update connection status every 3 seconds
    const interval = setInterval(() => {
      const status = exchangeWS.getConnectionStatus();
      setConnectionStatus(status);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upgrading': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const connectedExchanges = Object.entries(connectionStatus).filter(([_, connected]) => connected);
  const totalConnections = connectedExchanges.length;

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center text-sm">
          <Link className="h-5 w-5 mr-2" />
          API Integrator
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
            <Wifi className="h-3 w-3 mr-1" />
            Exchanges: {totalConnections}/{availableExchanges.length} active
          </div>
          <div className="flex items-center">
            <Activity className="h-3 w-3 mr-1" />
            Active: {connectedExchanges.map(([exchange]) => {
              const exchangeInfo = availableExchanges.find(e => e.id === exchange);
              return exchangeInfo?.name || exchange;
            }).join(', ') || 'None'}
          </div>
          <div>Response Time: {100 - Math.floor(module.performance)}ms</div>
        </div>
      </CardContent>
    </Card>
  );
};
