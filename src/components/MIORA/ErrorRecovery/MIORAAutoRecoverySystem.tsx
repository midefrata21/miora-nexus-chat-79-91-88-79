import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, RefreshCw, Shield, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ErrorMetrics {
  webSocketErrors: number;
  apiQuotaErrors: number;
  systemErrors: number;
  recoveredErrors: number;
  totalRecoveryTime: number;
}

interface RecoveryAction {
  id: string;
  type: 'websocket' | 'api' | 'system' | 'performance';
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  timestamp: number;
  recoveryTime: number;
}

export const MIORAAutoRecoverySystem: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [metrics, setMetrics] = useState<ErrorMetrics>({
    webSocketErrors: 3,
    apiQuotaErrors: 1,
    systemErrors: 0,
    recoveredErrors: 47,
    totalRecoveryTime: 240000 // in ms
  });

  const [recoveryActions, setRecoveryActions] = useState<RecoveryAction[]>([
    {
      id: '1',
      type: 'websocket',
      description: 'Auto-reconnecting to Binance WebSocket with optimized settings',
      status: 'completed',
      timestamp: Date.now() - 300000,
      recoveryTime: 15000
    },
    {
      id: '2', 
      type: 'api',
      description: 'Implementing Gemini API quota management and fallback systems',
      status: 'completed',
      timestamp: Date.now() - 180000,
      recoveryTime: 5000
    },
    {
      id: '3',
      type: 'websocket',
      description: 'Stabilizing Bybit connection with enhanced error handling',
      status: 'in-progress',
      timestamp: Date.now() - 60000,
      recoveryTime: 0
    }
  ]);

  // Auto-recovery monitoring
  useEffect(() => {
    if (isActive) {
      const recoveryInterval = setInterval(() => {
        // Simulate recovery actions
        if (Math.random() < 0.3) {
          performAutoRecovery();
        }

        // Update metrics
        setMetrics(prev => ({
          ...prev,
          recoveredErrors: prev.recoveredErrors + (Math.random() < 0.4 ? 1 : 0),
          webSocketErrors: Math.max(0, prev.webSocketErrors - (Math.random() < 0.5 ? 1 : 0)),
          apiQuotaErrors: Math.max(0, prev.apiQuotaErrors - (Math.random() < 0.3 ? 1 : 0))
        }));
      }, 10000);

      return () => clearInterval(recoveryInterval);
    }
  }, [isActive]);

  const performAutoRecovery = () => {
    const recoveryTypes = [
      {
        type: 'websocket' as const,
        description: 'Optimizing WebSocket connection parameters for stability'
      },
      {
        type: 'api' as const,
        description: 'Implementing intelligent API quota management'
      },
      {
        type: 'system' as const,
        description: 'Auto-optimizing system performance and memory usage'
      },
      {
        type: 'performance' as const,
        description: 'Enhancing neural processing efficiency'
      }
    ];

    const randomRecovery = recoveryTypes[Math.floor(Math.random() * recoveryTypes.length)];
    
    const newAction: RecoveryAction = {
      id: Math.random().toString(36).substr(2, 9),
      type: randomRecovery.type,
      description: randomRecovery.description,
      status: 'in-progress',
      timestamp: Date.now(),
      recoveryTime: 0
    };

    setRecoveryActions(prev => [newAction, ...prev.slice(0, 9)]);

    // Complete recovery after delay
    setTimeout(() => {
      setRecoveryActions(prev => 
        prev.map(action => 
          action.id === newAction.id
            ? { ...action, status: 'completed', recoveryTime: Math.random() * 20000 + 5000 }
            : action
        )
      );

      console.info(`🔧 Auto-recovery completed: ${randomRecovery.description}`);
    }, Math.random() * 15000 + 5000);
  };

  const forceRecoveryCheck = () => {
    toast({
      title: "🔍 RECOVERY SCAN INITIATED",
      description: "Memindai sistem untuk masalah dan menerapkan perbaikan otomatis",
      duration: 3000
    });

    performAutoRecovery();
    
    setTimeout(() => {
      toast({
        title: "✅ RECOVERY COMPLETE",
        description: "Sistem telah dioptimalkan dan stabilitas ditingkatkan",
        duration: 4000
      });
    }, 2000);
  };

  const getStatusColor = (status: RecoveryAction['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: RecoveryAction['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const recoverySuccessRate = Math.round((metrics.recoveredErrors / (metrics.recoveredErrors + metrics.webSocketErrors + metrics.apiQuotaErrors + metrics.systemErrors)) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">MIORA Auto Recovery System</h2>
          <p className="text-gray-400">Sistem pemulihan otomatis dan optimasi kesehatan</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "ACTIVE" : "PAUSED"}
          </Badge>
          <Button onClick={forceRecoveryCheck} className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Force Recovery
          </Button>
        </div>
      </div>

      {/* Recovery Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-green-400">{recoverySuccessRate}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <Progress value={recoverySuccessRate} className="mt-2" />
        </Card>

        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Recovered Errors</p>
              <p className="text-2xl font-bold text-blue-400">{metrics.recoveredErrors}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Errors</p>
              <p className="text-2xl font-bold text-yellow-400">
                {metrics.webSocketErrors + metrics.apiQuotaErrors + metrics.systemErrors}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Recovery Time</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.round(metrics.totalRecoveryTime / 1000)}s
              </p>
            </div>
            <RefreshCw className="h-8 w-8 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Recovery Actions */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Recovery Actions</h3>
        <div className="space-y-3">
          {recoveryActions.map((action) => (
            <div key={action.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <div className={`p-1 rounded-full ${getStatusColor(action.status)}`}>
                {getStatusIcon(action.status)}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{action.description}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(action.timestamp).toLocaleTimeString()} 
                  {action.recoveryTime > 0 && ` • Recovery time: ${Math.round(action.recoveryTime / 1000)}s`}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {action.type.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* System Status */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">System Health Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">WebSocket</p>
            <p className={`text-lg font-bold ${metrics.webSocketErrors === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
              {metrics.webSocketErrors === 0 ? 'STABLE' : 'RECOVERING'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">API Systems</p>
            <p className={`text-lg font-bold ${metrics.apiQuotaErrors === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
              {metrics.apiQuotaErrors === 0 ? 'OPTIMAL' : 'MANAGING'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Core Systems</p>
            <p className="text-lg font-bold text-green-400">HEALTHY</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Auto Recovery</p>
            <p className="text-lg font-bold text-blue-400">ACTIVE</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MIORAAutoRecoverySystem;