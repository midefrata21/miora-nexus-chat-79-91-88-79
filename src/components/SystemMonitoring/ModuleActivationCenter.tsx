import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Power,
  Activity,
  Zap,
  Brain,
  Shield,
  Server,
  Database,
  Network
} from 'lucide-react';
import { useQuantumInfrastructure } from '../QuantumInfrastructure/hooks/useQuantumInfrastructure';

export const ModuleActivationCenter = () => {
  const {
    quantumMode,
    infrastructureNodes,
    systemMetrics,
    activateQuantumMode,
    getSystemStatus,
    quantumBridgeActive,
    connectedDevices,
    activateQuantumBridge
  } = useQuantumInfrastructure();

  const [activationProgress, setActivationProgress] = useState(100);
  const [isActivating, setIsActivating] = useState(false);

  const systemStatus = getSystemStatus();

  const moduleCategories = [
    {
      name: "System Core",
      modules: 7,
      activeModules: 7,
      icon: Server,
      color: "text-blue-400 border-blue-500/30",
      description: "Dashboard, Diagnostics, Terminal, Settings"
    },
    {
      name: "AI Core",
      modules: 19,
      activeModules: 19,
      icon: Brain,
      color: "text-emerald-400 border-emerald-500/30",
      description: "MIORA Core, Learning Systems, Evolution Engine"
    },
    {
      name: "Trading",
      modules: 2,
      activeModules: 2,
      icon: Activity,
      color: "text-orange-400 border-orange-500/30", 
      description: "MIORA Core V2, Crypto Scalping Signals"
    },
    {
      name: "Innovation Lab",
      modules: 5,
      activeModules: 5,
      icon: Zap,
      color: "text-yellow-400 border-yellow-500/30",
      description: "Intelligence Hub, App Builder, Auto Code"
    },
    {
      name: "Learning & Intelligence",
      modules: 8,
      activeModules: 8,
      icon: Brain,
      color: "text-purple-400 border-purple-500/30",
      description: "Learning Hub, Knowledge Discovery, Background Learning"
    },
    {
      name: "Security Operations",
      modules: 1,
      activeModules: 1,
      icon: Shield,
      color: "text-red-400 border-red-500/30",
      description: "MIORA Hacker Master, Security Protocols"
    },
    {
      name: "Infrastructure Nodes",
      modules: 7,
      activeModules: infrastructureNodes.filter(n => n.status === 'active').length,
      icon: Database,
      color: "text-cyan-400 border-cyan-500/30",
      description: "Load Balancer, CDN, Cache, Database Clusters"
    }
  ];

  const totalModules = moduleCategories.reduce((sum, cat) => sum + cat.modules, 0);
  const totalActiveModules = moduleCategories.reduce((sum, cat) => sum + cat.activeModules, 0);

  const handleActivateAll = async () => {
    setIsActivating(true);
    
    // Simulate activation process
    for (let i = 0; i <= 100; i += 10) {
      setActivationProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Activate quantum mode and bridge
    await activateQuantumMode();
    if (!quantumBridgeActive) {
      activateQuantumBridge();
    }

    setIsActivating(false);
    setActivationProgress(100);
  };

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-green-300">
            <Power className="w-6 h-6 mr-2" />
            MIORA Module Activation Center
            <Badge variant="outline" className="ml-2 text-green-400 border-green-400">
              ALL SYSTEMS ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{totalActiveModules}/{totalModules}</div>
              <div className="text-sm text-gray-300">Active Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{systemStatus.totalNodes}</div>
              <div className="text-sm text-gray-300">Infrastructure Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {quantumMode.isActive ? 'ACTIVE' : 'STANDBY'}
              </div>
              <div className="text-sm text-gray-300">Quantum Mode</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{connectedDevices.length}</div>
              <div className="text-sm text-gray-300">Connected Devices</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Overall System Activation</span>
              <span className="text-green-400">{activationProgress}%</span>
            </div>
            <Progress value={activationProgress} className="h-3" />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleActivateAll} 
              disabled={isActivating || totalActiveModules === totalModules}
              className="flex items-center gap-2"
            >
              {isActivating ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isActivating ? 'Activating...' : 'Activate All Systems'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure Modules
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Module Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {moduleCategories.map((category, index) => {
          const IconComponent = category.icon;
          const activationRate = (category.activeModules / category.modules) * 100;
          
          return (
            <Card key={index} className={`bg-gradient-to-br from-black/40 to-gray-900/40 border ${category.color.split(' ')[1]}`}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center text-sm ${category.color.split(' ')[0]}`}>
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                  <Badge variant="outline" className={`ml-auto text-xs ${category.color}`}>
                    {category.activeModules}/{category.modules}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Activation Rate</span>
                      <span className={category.color.split(' ')[0]}>{activationRate.toFixed(0)}%</span>
                    </div>
                    <Progress value={activationRate} className="h-2" />
                  </div>
                  
                  <p className="text-xs text-gray-400">{category.description}</p>
                  
                  <div className="flex items-center gap-2">
                    {activationRate === 100 ? (
                      <CheckCircle className={`w-4 h-4 ${category.color.split(' ')[0]}`} />
                    ) : (
                      <Pause className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-xs text-gray-300">
                      {activationRate === 100 ? 'Fully Active' : 'Partial Active'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Infrastructure Status */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-300">
            <Network className="w-5 h-5 mr-2" />
            Infrastructure Nodes Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {infrastructureNodes.map((node) => (
              <div key={node.id} className="p-3 bg-black/20 rounded-lg border border-indigo-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-indigo-300">{node.name}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      node.status === 'active' ? 'text-green-400 border-green-400' : 
                      'text-yellow-400 border-yellow-400'
                    }`}
                  >
                    {node.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-400 mb-2">{node.region}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Load</span>
                    <span className="text-indigo-400">{node.load}%</span>
                  </div>
                  <Progress value={node.load} className="h-1" />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Response</span>
                    <span className="text-cyan-400">{node.responseTime}ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-gray-900/30 to-slate-900/30 border-gray-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-300">
            <Settings className="w-5 h-5 mr-2" />
            Quick System Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quantum Boost
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Learning Sync
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Scan
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Health Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};