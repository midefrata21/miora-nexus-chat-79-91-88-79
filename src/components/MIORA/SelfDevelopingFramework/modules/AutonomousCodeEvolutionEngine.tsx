import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Code, Wrench, Shield, Database, Activity, ChevronRight } from 'lucide-react';

interface EvolutionEngineProps {
  engine: {
    codeAnalyzer: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    evolutionDecision: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    autoRefactor: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    backupRecovery: {
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

export const AutonomousCodeEvolutionEngine: React.FC<EvolutionEngineProps> = ({ engine, isActive }) => {
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
      case 'code_analyzer': return <Code className="w-5 h-5" />;
      case 'evolution_decision': return <Activity className="w-5 h-5" />;
      case 'auto_refactor': return <Wrench className="w-5 h-5" />;
      case 'backup_recovery': return <Shield className="w-5 h-5" />;
      default: return <Database className="w-5 h-5" />;
    }
  };

  const modules = [
    engine.codeAnalyzer,
    engine.evolutionDecision,
    engine.autoRefactor,
    engine.backupRecovery
  ];

  return (
    <div className="space-y-6">
      {/* Module Overview */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Code className="w-6 h-6 mr-2" />
            Autonomous Code Evolution Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Evolution Capabilities</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Autonomous code analysis</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Smart refactoring decisions</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Automated code optimization</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white">Backup and recovery system</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Current Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Engine Status</span>
                  <Badge className={`${isActive ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                    {isActive ? 'ACTIVE' : 'STANDBY'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Modules</span>
                  <span className="text-white font-bold">
                    {modules.filter(m => m.status === 'active').length}/{modules.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Progress</span>
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
          <Card key={module.id} className="bg-gradient-to-r from-gray-900/30 to-indigo-900/30 border-indigo-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-indigo-300 flex items-center text-sm">
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
                  <span className="text-gray-400">Module Progress</span>
                  <span className="text-cyan-300">{module.progress.toFixed(1)}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-cyan-300 text-sm font-medium">Capabilities:</h4>
                <div className="space-y-1">
                  {module.capabilities.map((capability, index) => (
                    <div key={index} className="text-xs p-2 bg-black/20 rounded border border-cyan-500/20">
                      {capability.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-500/20">
                <p className="text-xs text-gray-400">
                  Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evolution Actions */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 text-sm">Evolution Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={!isActive}
            >
              <Code className="w-4 h-4 mr-2" />
              Force Code Analysis
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isActive}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Trigger Refactoring
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!isActive}
            >
              <Shield className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};