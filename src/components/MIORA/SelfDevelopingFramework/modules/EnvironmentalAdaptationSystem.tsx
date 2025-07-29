import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Globe, TrendingUp, Map, Shield, ChevronRight } from 'lucide-react';

interface AdaptationSystemProps {
  system: {
    environmentScanner: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    trendAnalyzer: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    adaptationPlanner: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    compatibilityChecker: {
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

export const EnvironmentalAdaptationSystem: React.FC<AdaptationSystemProps> = ({ system, isActive }) => {
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
      case 'environment_scanner': return <Globe className="w-5 h-5" />;
      case 'trend_analyzer': return <TrendingUp className="w-5 h-5" />;
      case 'adaptation_planner': return <Map className="w-5 h-5" />;
      case 'compatibility_checker': return <Shield className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const modules = [
    system.environmentScanner,
    system.trendAnalyzer,
    system.adaptationPlanner,
    system.compatibilityChecker
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-300">
            <Globe className="w-6 h-6 mr-2" />
            Environmental Adaptation System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Adaptation Capabilities</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-white">Environment scanning</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-white">Trend analysis & prediction</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-white">Adaptation planning</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-white">Compatibility checking</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Adaptation Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Adaptation Speed</span>
                  <Badge className="bg-emerald-500 text-white">
                    {Math.floor(Math.random() * 50) + 50}ms
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Scanners</span>
                  <span className="text-white font-bold">
                    {modules.filter(m => m.status === 'active').length}/{modules.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Environment Health</span>
                  <span className="text-white font-bold">
                    {Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <Card key={module.id} className="bg-gradient-to-r from-gray-900/30 to-emerald-900/30 border-emerald-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-emerald-300 flex items-center text-sm">
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
                  <span className="text-gray-400">Adaptation Progress</span>
                  <span className="text-emerald-300">{module.progress.toFixed(1)}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-emerald-300 text-sm font-medium">Capabilities:</h4>
                <div className="space-y-1">
                  {module.capabilities.map((capability, index) => (
                    <div key={index} className="text-xs p-2 bg-black/20 rounded border border-emerald-500/20">
                      {capability.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-500/20">
                <p className="text-xs text-gray-400">
                  Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Adaptation Actions */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 text-sm">Adaptation Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!isActive}
            >
              <Globe className="w-4 h-4 mr-2" />
              Scan Environment
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!isActive}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analyze Trends
            </Button>
            <Button
              className="bg-cyan-600 hover:bg-cyan-700"
              disabled={!isActive}
            >
              <Map className="w-4 h-4 mr-2" />
              Plan Adaptation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};