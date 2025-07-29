
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Cpu, Database, Network, Shield } from 'lucide-react';

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

interface SystemHealthMonitorProps {
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  moduleStatuses: ModuleStatus[];
  repairStats: RepairStats;
}

export const SystemHealthMonitor: React.FC<SystemHealthMonitorProps> = ({
  systemHealth,
  moduleStatuses,
  repairStats
}) => {
  const getHealthScore = () => {
    switch (systemHealth) {
      case 'excellent': return 95;
      case 'good': return 80;
      case 'warning': return 60;
      case 'critical': return 30;
      default: return 0;
    }
  };

  const getHealthColor = () => {
    switch (systemHealth) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const healthScore = getHealthScore();
  const avgModuleHealth = moduleStatuses.reduce((sum, module) => sum + module.health, 0) / moduleStatuses.length;

  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-blue-800/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center">
          <Activity className="h-6 w-6 mr-2" />
          System Health Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Overall Health */}
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 5 A 13 13 0 1 1 17.999 5"
                />
                <path
                  className={getHealthColor()}
                  strokeWidth="3"
                  strokeDasharray={`${healthScore} 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 5 A 13 13 0 1 1 17.999 5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${getHealthColor()}`}>{healthScore}%</span>
              </div>
            </div>
            <div className="text-white font-medium">Overall Health</div>
            <div className={`text-sm ${getHealthColor()}`}>{systemHealth.toUpperCase()}</div>
          </div>

          {/* Module Health */}
          <div className="text-center">
            <Cpu className="h-12 w-12 mx-auto mb-3 text-purple-400" />
            <div className="text-2xl font-bold text-purple-300 mb-1">{avgModuleHealth.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Module Health</div>
            <Progress value={avgModuleHealth} className="mt-2 h-2" />
          </div>

          {/* Repair Success */}
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-3 text-green-400" />
            <div className="text-2xl font-bold text-green-300 mb-1">{repairStats.successRate}%</div>
            <div className="text-sm text-gray-400">Repair Success</div>
            <Progress value={repairStats.successRate} className="mt-2 h-2" />
          </div>

          {/* Response Time */}
          <div className="text-center">
            <Network className="h-12 w-12 mx-auto mb-3 text-cyan-400" />
            <div className="text-2xl font-bold text-cyan-300 mb-1">{repairStats.avgRepairTime}ms</div>
            <div className="text-sm text-gray-400">Avg Response</div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (3000 - repairStats.avgRepairTime) / 30)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Health Trend */}
        <div className="mt-6 p-4 bg-black/20 rounded-lg border border-gray-700/30">
          <div className="flex items-center justify-center">
            <div className={`text-center ${getHealthColor()}`}>
              <div className="text-lg font-bold animate-pulse">
                🛡️ MIORA LIVE AUTO-REPAIR: {systemHealth.toUpperCase()} STATUS
              </div>
              <div className="text-sm mt-1">
                Continuous monitoring and autonomous recovery system active
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
