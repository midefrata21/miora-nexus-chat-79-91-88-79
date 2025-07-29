import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, TrendingUp, Zap, ChevronRight } from 'lucide-react';

interface MonitoringSystemProps {
  system: {
    performanceAnalyzer: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    bottleneckDetector: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    selfDiagnostic: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    healthPredictor: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
  };
  isActive: boolean;
}

export const SelfMonitoringSystem: React.FC<MonitoringSystemProps> = ({ system, isActive }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'developing': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'performance_analyzer': return <TrendingUp className="w-5 h-5" />;
      case 'bottleneck_detector': return <AlertTriangle className="w-5 h-5" />;
      case 'self_diagnostic': return <Activity className="w-5 h-5" />;
      case 'health_predictor': return <Zap className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const modules = [
    system.performanceAnalyzer,
    system.bottleneckDetector,
    system.selfDiagnostic,
    system.healthPredictor
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-green-300">
            <Activity className="w-6 h-6 mr-2" />
            Self-Monitoring & Introspection System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Monitoring Capabilities</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Real-time performance monitoring</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Bottleneck detection & resolution</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Self-diagnostic capabilities</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Predictive health analysis</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">System Health</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Overall Health</span>
                  <Badge className="bg-green-500 text-white">
                    {Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Monitors</span>
                  <span className="text-white font-bold">
                    {modules.filter(m => m.status === 'active').length}/{modules.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Issues Detected</span>
                  <span className="text-white font-bold">0</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <Card key={module.id} className="bg-gradient-to-r from-gray-900/30 to-green-900/30 border-green-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-300 flex items-center text-sm">
                  {getModuleIcon(module.id)}
                  <span className="ml-2">{module.name}</span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(module.status)}`}></div>
                  <Badge variant="outline" className="text-xs">
                    {module.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monitoring Progress</span>
                  <span className="text-green-300">{module.progress.toFixed(1)}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-green-300 text-sm font-medium">Capabilities:</h4>
                <div className="space-y-1">
                  {module.capabilities.map((capability, index) => (
                    <div key={index} className="text-xs p-2 bg-black/20 rounded border border-green-500/20">
                      {capability.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-green-500/20">
                <p className="text-xs text-gray-400">
                  Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monitoring Actions */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-green-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 text-sm">Monitoring Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={!isActive}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance Scan
            </Button>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700"
              disabled={!isActive}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Detect Issues
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isActive}
            >
              <Zap className="w-4 h-4 mr-2" />
              Health Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};