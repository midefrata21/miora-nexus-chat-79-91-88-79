
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Shield, Zap, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SystemStatus {
  isOnline: boolean;
  lastUpdate: number;
  uptime: number;
  version: string;
}

interface ModuleStatus {
  name: string;
  status: 'active' | 'inactive' | 'error' | 'warning';
  health: number;
  lastCheck: number;
}

interface RepairStats {
  totalRepairs: number;
  successRate: number;
  avgRepairTime: number;
  criticalIssuesFixed: number;
}

interface RepairDashboardProps {
  isMonitoringActive: boolean;
  isAutoRepairEnabled: boolean;
  systemStatus: SystemStatus;
  moduleStatuses: ModuleStatus[];
  repairStats: RepairStats;
}

export const RepairDashboard: React.FC<RepairDashboardProps> = ({
  isMonitoringActive,
  isAutoRepairEnabled,
  systemStatus,
  moduleStatuses,
  repairStats
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'error': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Real-time Status */}
      <Card className="bg-gray-800/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Real-time System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">System Online</span>
              <Badge className={systemStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}>
                {systemStatus.isOnline ? 'ONLINE' : 'OFFLINE'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Monitoring</span>
              <Badge className={isMonitoringActive ? 'bg-blue-500' : 'bg-gray-500'}>
                {isMonitoringActive ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Auto-Repair</span>
              <Badge className={isAutoRepairEnabled ? 'bg-green-500' : 'bg-orange-500'}>
                {isAutoRepairEnabled ? 'ENABLED' : 'MANUAL'}
              </Badge>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <div className="text-sm text-gray-400 mb-1">System Uptime</div>
              <div className="text-white font-bold">{Math.floor(systemStatus.uptime / 60)}h {systemStatus.uptime % 60}m</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Health */}
      <Card className="bg-gray-800/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Module Health Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moduleStatuses.map((module) => (
              <div key={module.name} className="p-3 bg-black/20 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(module.status)}
                    <span className="text-white font-medium">{module.name}</span>
                  </div>
                  <Badge className={getStatusColor(module.status)}>
                    {module.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Progress value={module.health} className="flex-1 mr-3 h-2" />
                  <span className="text-sm text-gray-400">{module.health}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Repair Statistics */}
      <Card className="bg-gray-800/50 border-purple-500/30 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Auto-Repair Performance Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300 mb-1">{repairStats.totalRepairs}</div>
              <div className="text-sm text-gray-400">Total Repairs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-1">{repairStats.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-1">{repairStats.avgRepairTime}ms</div>
              <div className="text-sm text-gray-400">Avg Repair Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300 mb-1">{repairStats.criticalIssuesFixed}</div>
              <div className="text-sm text-gray-400">Critical Issues Fixed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
