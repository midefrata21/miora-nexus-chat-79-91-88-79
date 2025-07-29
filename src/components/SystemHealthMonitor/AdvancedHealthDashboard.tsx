import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Zap,
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useSystemHealth } from './hooks/useSystemHealth';

export const AdvancedHealthDashboard: React.FC = () => {
  const {
    healthData,
    overallStatus,
    isRecovering,
    manualRecovery,
    toggleAutoRecovery,
    reconnectExchanges
  } = useSystemHealth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      case 'fallback': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'fallback': return <Shield className="h-5 w-5 text-blue-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const uptime = Math.floor((Date.now() - healthData.systemMetrics.uptime) / 1000 / 60);

  return (
    <div className="space-y-6">
      {/* Overall Status Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(overallStatus)}
              <span>System Health Dashboard</span>
              <Badge variant={overallStatus === 'healthy' ? 'default' : 'destructive'}>
                {overallStatus.toUpperCase()}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={manualRecovery}
                disabled={isRecovering}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRecovering ? 'animate-spin' : ''}`} />
                {isRecovering ? 'Recovering...' : 'Manual Recovery'}
              </Button>
              <Button
                variant={healthData.autoRecovery.enabled ? 'default' : 'outline'}
                size="sm"
                onClick={toggleAutoRecovery}
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Auto-Recovery {healthData.autoRecovery.enabled ? 'ON' : 'OFF'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* API Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              API Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Gemini API</span>
              <Badge variant={healthData.geminiAPI.status === 'healthy' ? 'default' : 'destructive'}>
                {healthData.geminiAPI.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Quota</span>
                <span>{healthData.geminiAPI.requestsToday}/{healthData.geminiAPI.maxRequests}</span>
              </div>
              <Progress 
                value={(healthData.geminiAPI.requestsToday / healthData.geminiAPI.maxRequests) * 100} 
                className="h-2"
              />
            </div>

            {healthData.geminiAPI.status === 'fallback' && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Fallback system active
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exchange Connections */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Exchange Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(healthData.exchangeConnections).map(([exchange, connected]) => (
              <div key={exchange} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {connected ? 
                    <Wifi className="h-4 w-4 text-green-500" /> : 
                    <WifiOff className="h-4 w-4 text-red-500" />
                  }
                  <span className="text-sm font-medium">{exchange.toUpperCase()}</span>
                </div>
                <Badge variant={connected ? 'default' : 'destructive'}>
                  {connected ? 'CONNECTED' : 'OFFLINE'}
                </Badge>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={reconnectExchanges}
              className="w-full mt-3"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reconnect All
            </Button>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Uptime</span>
              </div>
              <span className="text-sm font-medium">{uptime} min</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Response Time</span>
              <span className="text-sm font-medium">
                {healthData.systemMetrics.responseTime.toFixed(0)}ms
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Error Rate</span>
                <span>{(healthData.systemMetrics.errorRate * 100).toFixed(2)}%</span>
              </div>
              <Progress 
                value={healthData.systemMetrics.errorRate * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Auto-Recovery Status */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Auto-Recovery System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status</span>
              <Badge variant={healthData.autoRecovery.enabled ? 'default' : 'secondary'}>
                {healthData.autoRecovery.enabled ? 'ENABLED' : 'DISABLED'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Recovery Attempts</span>
              <span className="text-sm font-medium">{healthData.autoRecovery.attempts}</span>
            </div>

            {healthData.autoRecovery.lastRecovery > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Recovery</span>
                <span className="text-sm font-medium">
                  {Math.floor((Date.now() - healthData.autoRecovery.lastRecovery) / 1000 / 60)} min ago
                </span>
              </div>
            )}

            {isRecovering && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Recovery in progress...
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};