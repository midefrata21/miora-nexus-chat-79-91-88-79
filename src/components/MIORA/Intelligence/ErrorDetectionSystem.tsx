import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Zap, CheckCircle, RefreshCw, TrendingUp } from 'lucide-react';

interface ErrorDetectionSystemProps {
  errors: Array<{
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    source: string;
    timestamp: number;
    status: 'detected' | 'analyzing' | 'fixing' | 'resolved';
    autoFixAvailable: boolean;
  }>;
  systemHealth: {
    overall: number;
    components: {
      cognitive: number;
      infrastructure: number;
      communication: number;
      security: number;
    };
  };
  selfHealingStats: {
    totalFixes: number;
    successRate: number;
    averageFixTime: number;
  };
  onAutoFix: (errorId: string) => void;
  onRunDiagnostics: () => void;
}

export const ErrorDetectionSystem: React.FC<ErrorDetectionSystemProps> = ({
  errors,
  systemHealth,
  selfHealingStats,
  onAutoFix,
  onRunDiagnostics
}) => {
  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-blue-400" />;
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/30';
      default: return 'bg-blue-500/20 border-blue-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected': return <AlertTriangle className="h-3 w-3" />;
      case 'analyzing': return <RefreshCw className="h-3 w-3 animate-spin" />;
      case 'fixing': return <Zap className="h-3 w-3 animate-pulse" />;
      case 'resolved': return <CheckCircle className="h-3 w-3" />;
      default: return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const criticalErrors = errors.filter(e => e.type === 'critical' && e.status !== 'resolved');
  const activeErrors = errors.filter(e => e.status !== 'resolved');

  return (
    <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-red-300 flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            🛡️ Error Detection & Self-Healing System
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={`${criticalErrors.length > 0 ? 'bg-red-500' : 'bg-green-500'} text-white`}>
              {criticalErrors.length > 0 ? `${criticalErrors.length} Critical` : 'System Healthy'}
            </Badge>
            <Badge className="bg-blue-500 text-white">
              {activeErrors.length} Active Issues
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-red-300 font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              System Health Status
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Overall Health</span>
                <span className="text-sm font-bold text-green-400">
                  {systemHealth.overall.toFixed(1)}%
                </span>
              </div>
              <Progress value={systemHealth.overall} className="h-2" />
            </div>
            
            {Object.entries(systemHealth.components).map(([component, health]) => (
              <div key={component} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 capitalize">{component}</span>
                  <span className="text-xs font-bold text-blue-400">{health.toFixed(1)}%</span>
                </div>
                <Progress value={health} className="h-1" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-red-300 font-medium flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Self-Healing Statistics
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                <div className="text-green-400 text-lg font-bold">{selfHealingStats.totalFixes}</div>
                <div className="text-xs text-gray-300">Total Auto-Fixes</div>
              </div>
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <div className="text-blue-400 text-lg font-bold">{selfHealingStats.successRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-300">Success Rate</div>
              </div>
              <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <div className="text-purple-400 text-lg font-bold">{selfHealingStats.averageFixTime.toFixed(1)}s</div>
                <div className="text-xs text-gray-300">Avg Fix Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-red-300 font-medium">Detected Issues</h4>
            <Button 
              onClick={onRunDiagnostics}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Run Full Diagnostics
            </Button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {errors.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div>No issues detected - System running optimally</div>
              </div>
            ) : (
              errors.map((error) => (
                <div key={error.id} className={`p-3 rounded-lg border ${getErrorColor(error.type)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getErrorIcon(error.type)}
                      <span className="text-sm font-medium text-white">{error.message}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getStatusIcon(error.status)}
                        {error.status}
                      </Badge>
                      {error.autoFixAvailable && error.status === 'detected' && (
                        <Button
                          size="sm"
                          onClick={() => onAutoFix(error.id)}
                          className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Auto Fix
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Source: {error.source} • {new Date(error.timestamp).toLocaleTimeString('id-ID')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Self-Healing Capabilities */}
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/20">
          <div className="flex items-center text-green-300 mb-2">
            <Shield className="w-4 h-4 mr-2" />
            Kemampuan Self-Healing Aktif
          </div>
          <div className="text-sm text-gray-300 mb-3">
            MIORA dapat mendeteksi dan memperbaiki error secara otomatis tanpa intervensi manual. 
            Sistem terus memantau kesehatan dan melakukan optimisasi berkelanjutan.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded">
              ✅ Automated error detection
            </div>
            <div className="p-2 bg-green-900/20 rounded">
              🔧 Self-repair mechanisms
            </div>
            <div className="p-2 bg-green-900/20 rounded">
              📈 Continuous optimization
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};