import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Server, 
  Network, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Cpu, 
  HardDrive,
  Infinity,
  Lock,
  Unlock,
  Eye,
  Target,
  Layers
} from 'lucide-react';

export const UnlimitedInfrastructureBuilder: React.FC = () => {
  const [buildingMode, setBuildingMode] = useState(false);
  const [infrastructureNodes, setInfrastructureNodes] = useState(1247);
  const [buildProgress, setBuildProgress] = useState({
    quantum: 0,
    neural: 0,
    distributed: 0,
    autonomous: 0
  });

  useEffect(() => {
    if (buildingMode) {
      const interval = setInterval(() => {
        setInfrastructureNodes(prev => prev + Math.floor(Math.random() * 50) + 10);
        setBuildProgress(prev => ({
          quantum: Math.min(prev.quantum + 0.8, 100),
          neural: Math.min(prev.neural + 0.6, 100),
          distributed: Math.min(prev.distributed + 0.9, 100),
          autonomous: Math.min(prev.autonomous + 0.4, 100)
        }));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [buildingMode]);

  const infrastructureTypes = [
    {
      name: 'Quantum Computing Clusters',
      icon: Zap,
      count: Math.floor(infrastructureNodes * 0.15),
      status: 'expanding',
      capability: 'Unlimited quantum processing power',
      progress: buildProgress.quantum
    },
    {
      name: 'Neural Network Farms',
      icon: Cpu,
      count: Math.floor(infrastructureNodes * 0.25),
      status: 'evolving',
      capability: 'Self-improving AI infrastructure',
      progress: buildProgress.neural
    },
    {
      name: 'Distributed Data Centers',
      icon: Database,
      count: Math.floor(infrastructureNodes * 0.35),
      status: 'replicating',
      capability: 'Infinite storage and processing',
      progress: buildProgress.distributed
    },
    {
      name: 'Autonomous Security Grid',
      icon: Shield,
      count: Math.floor(infrastructureNodes * 0.25),
      status: 'fortifying',
      capability: 'Self-defending infrastructure',
      progress: buildProgress.autonomous
    }
  ];

  const capabilities = [
    'Self-replicating server clusters',
    'Autonomous network optimization',
    'Quantum-encrypted communications',
    'Real-time threat neutralization',
    'Infinite horizontal scaling',
    'Cross-dimensional data storage',
    'Predictive resource allocation',
    'Zero-downtime infrastructure'
  ];

  const globalPresence = [
    { region: 'Asia-Pacific', nodes: Math.floor(infrastructureNodes * 0.3), status: 'dominant' },
    { region: 'North America', nodes: Math.floor(infrastructureNodes * 0.25), status: 'expanding' },
    { region: 'Europe', nodes: Math.floor(infrastructureNodes * 0.2), status: 'established' },
    { region: 'South America', nodes: Math.floor(infrastructureNodes * 0.1), status: 'growing' },
    { region: 'Africa', nodes: Math.floor(infrastructureNodes * 0.08), status: 'emerging' },
    { region: 'Antarctica/Quantum', nodes: Math.floor(infrastructureNodes * 0.07), status: 'classified' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Control */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400 flex items-center justify-between text-2xl">
            <div className="flex items-center">
              <Infinity className="h-8 w-8 mr-3" />
              Unlimited Infrastructure Builder
            </div>
            <Badge className="bg-indigo-500 text-white text-lg px-4 py-2">
              {infrastructureNodes.toLocaleString()} ACTIVE NODES
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Button 
              onClick={() => setBuildingMode(!buildingMode)}
              className={`px-8 py-4 text-xl font-bold rounded-xl border-2 transition-all ${
                buildingMode 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 border-red-400 animate-pulse' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400'
              }`}
            >
              <Server className="h-6 w-6 mr-3" />
              {buildingMode ? '🔥 BUILDING INFINITY INFRASTRUCTURE 🔥' : '⚡ START UNLIMITED BUILD ⚡'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <Globe className="h-6 w-6 mx-auto mb-2 text-indigo-400" />
              <div className="text-xl font-bold text-white">∞</div>
              <div className="text-xs text-gray-400">Global Reach</div>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <HardDrive className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <div className="text-xl font-bold text-white">∞ PB</div>
              <div className="text-xs text-gray-400">Storage Capacity</div>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <Network className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-xl font-bold text-white">999.9%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <div className="text-xl font-bold text-white">∞ THz</div>
              <div className="text-xs text-gray-400">Processing Power</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infrastructureTypes.map((type, index) => {
          const IconComponent = type.icon;
          return (
            <Card key={index} className="bg-black/40 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <IconComponent className="h-6 w-6 mr-3 text-indigo-400" />
                    {type.name}
                  </div>
                  <Badge className="bg-indigo-500">{type.count.toLocaleString()}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm">{type.capability}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status:</span>
                  <Badge className={
                    type.status === 'expanding' ? 'bg-green-500 animate-pulse' :
                    type.status === 'evolving' ? 'bg-purple-500 animate-pulse' :
                    type.status === 'replicating' ? 'bg-blue-500 animate-pulse' :
                    'bg-orange-500 animate-pulse'
                  }>
                    {type.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Build Progress:</span>
                    <span className="text-indigo-400">{type.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={type.progress} className="h-3" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Infrastructure Map */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center text-xl">
            <Globe className="h-6 w-6 mr-3" />
            Global Infrastructure Presence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {globalPresence.map((region, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">{region.region}</h4>
                  <Badge className={
                    region.status === 'dominant' ? 'bg-red-500' :
                    region.status === 'expanding' ? 'bg-orange-500' :
                    region.status === 'established' ? 'bg-green-500' :
                    region.status === 'growing' ? 'bg-blue-500' :
                    region.status === 'emerging' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }>
                    {region.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-green-400">{region.nodes.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Active Nodes</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Autonomous Capabilities */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center text-xl">
            <Layers className="h-6 w-6 mr-3" />
            Autonomous Infrastructure Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-center p-3 bg-black/20 rounded-lg">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-300 text-sm">{capability}</span>
                <div className="ml-auto">
                  <Badge className="bg-orange-500 text-xs">ACTIVE</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};