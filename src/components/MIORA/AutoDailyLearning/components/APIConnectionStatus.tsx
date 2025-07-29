
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wifi, WifiOff, Zap, Globe, AlertCircle, CheckCircle } from 'lucide-react';

interface APIProvider {
  name: string;
  isConnected: boolean;
  responseTime: number;
  errorCount: number;
}

interface APIConnectionStatusProps {
  connectionStatus: {
    connected: number;
    total: number;
    connectionRate: number;
  };
  providers: APIProvider[];
  onTestConnections: () => void;
  isLoading?: boolean;
}

export const APIConnectionStatus: React.FC<APIConnectionStatusProps> = ({
  connectionStatus,
  providers,
  onTestConnections,
  isLoading = false
}) => {
  const getConnectionIcon = (isConnected: boolean) => {
    return isConnected ? (
      <CheckCircle className="h-4 w-4 text-green-400" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-400" />
    );
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 500) return 'text-green-400';
    if (responseTime < 1000) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="h-6 w-6 mr-2" />
            API Connection Status
          </div>
          <Badge className={`${connectionStatus.connected > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
            {connectionStatus.connected}/{connectionStatus.total} Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Connection Health */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Connection Health</span>
            <span className="text-cyan-400 font-bold">{connectionStatus.connectionRate}%</span>
          </div>
          <Progress value={connectionStatus.connectionRate} className="h-2" />
        </div>

        {/* Individual Provider Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {providers.map((provider, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 transition-all ${
                provider.isConnected 
                  ? 'bg-green-900/20 border-green-500/50' 
                  : 'bg-red-900/20 border-red-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getConnectionIcon(provider.isConnected)}
                  <span className="text-white text-sm font-medium">{provider.name}</span>
                </div>
                {provider.isConnected ? (
                  <Wifi className="h-4 w-4 text-green-400" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-400" />
                )}
              </div>
              
              {provider.isConnected && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time:</span>
                    <span className={`font-mono ${getResponseTimeColor(provider.responseTime)}`}>
                      {provider.responseTime}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Errors:</span>
                    <span className={`font-mono ${provider.errorCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {provider.errorCount}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Connection Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="text-sm text-gray-400">
            {connectionStatus.connected > 0 ? (
              <span className="text-green-400">
                ✅ Learning acceleration: {Math.round(connectionStatus.connected * 1.5)}x faster
              </span>
            ) : (
              <span className="text-red-400">
                ⚠️ No API connections - running in offline mode
              </span>
            )}
          </div>
          
          <Button
            onClick={onTestConnections}
            disabled={isLoading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-500"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isLoading ? 'Testing...' : 'Test Connections'}
          </Button>
        </div>

        {/* Connection Tips */}
        <div className="p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
          <h4 className="text-cyan-300 font-medium mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Troubleshooting Tips
          </h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Pastikan koneksi internet stabil</li>
            <li>• Periksa API keys jika tersedia</li>
            <li>• Beberapa provider mungkin memiliki rate limiting</li>
            <li>• Sistem akan otomatis fallback ke provider yang tersedia</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
