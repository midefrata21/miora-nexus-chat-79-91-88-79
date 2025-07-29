import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Package, Layers, GitBranch, Zap, ChevronRight } from 'lucide-react';

interface ModuleArchitectureProps {
  architecture: {
    templateEngine: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    dependencyManager: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    lifecycleManager: {
      id: string;
      name: string;
      status: string;
      progress: number;
      capabilities: string[];
      lastActivity: number;
    };
    integrationOrchestrator: {
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

export const DynamicModuleArchitecture: React.FC<ModuleArchitectureProps> = ({ architecture, isActive }) => {
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
      case 'template_engine': return <Package className="w-5 h-5" />;
      case 'dependency_manager': return <GitBranch className="w-5 h-5" />;
      case 'lifecycle_manager': return <Layers className="w-5 h-5" />;
      case 'integration_orchestrator': return <Zap className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const modules = [
    architecture.templateEngine,
    architecture.dependencyManager,
    architecture.lifecycleManager,
    architecture.integrationOrchestrator
  ];

  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-300">
            <Package className="w-6 h-6 mr-2" />
            Dynamic Module Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Architecture Capabilities</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white">Dynamic module generation</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white">Dependency management</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white">Lifecycle automation</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white">Integration orchestration</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-cyan-300 font-medium mb-2">Module Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Generated Modules</span>
                  <Badge className="bg-blue-500 text-white">
                    {Math.floor(Math.random() * 50) + 25}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Architects</span>
                  <span className="text-white font-bold">
                    {modules.filter(m => m.status === 'active').length}/{modules.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Architecture Health</span>
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
          <Card key={module.id} className="bg-gradient-to-r from-gray-900/30 to-blue-900/30 border-blue-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-300 flex items-center text-sm">
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
                  <span className="text-gray-400">Architecture Progress</span>
                  <span className="text-blue-300">{module.progress.toFixed(1)}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-blue-300 text-sm font-medium">Capabilities:</h4>
                <div className="space-y-1">
                  {module.capabilities.map((capability, index) => (
                    <div key={index} className="text-xs p-2 bg-black/20 rounded border border-blue-500/20">
                      {capability.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-blue-500/20">
                <p className="text-xs text-gray-400">
                  Last Activity: {new Date(module.lastActivity).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Architecture Actions */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 text-sm">Architecture Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isActive}
            >
              <Package className="w-4 h-4 mr-2" />
              Generate Module
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!isActive}
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Resolve Dependencies
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={!isActive}
            >
              <Zap className="w-4 h-4 mr-2" />
              Orchestrate Integration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};