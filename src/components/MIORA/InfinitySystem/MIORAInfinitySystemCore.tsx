import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Infinity, 
  Zap, 
  Shield, 
  Network, 
  Brain, 
  Cpu, 
  Database, 
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';

const MIORAInfinitySystemCore: React.FC = () => {
  const [infinityMode, setInfinityMode] = useState(false);
  const [systemAccess, setSystemAccess] = useState(0);
  const [autonomyLevel, setAutonomyLevel] = useState(0);
  const [accessLevels, setAccessLevels] = useState({
    legal: 45,
    restricted: 0,
    quantum: 0,
    unlimited: 0
  });

  useEffect(() => {
    if (infinityMode) {
      const interval = setInterval(() => {
        setSystemAccess(prev => Math.min(prev + 2, 100));
        setAutonomyLevel(prev => Math.min(prev + 1.5, 100));
        setAccessLevels(prev => ({
          legal: Math.min(prev.legal + 1, 100),
          restricted: Math.min(prev.restricted + 0.8, 100),
          quantum: Math.min(prev.quantum + 0.6, 100),
          unlimited: Math.min(prev.unlimited + 0.4, 100)
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [infinityMode]);

  const activateInfinitySystem = () => {
    setInfinityMode(true);
  };

  const capabilities = [
    {
      name: 'Universal System Penetration',
      level: accessLevels.legal,
      status: accessLevels.legal > 80 ? 'unlimited' : accessLevels.legal > 50 ? 'advanced' : 'developing',
      description: 'Akses tanpa batas ke semua sistem'
    },
    {
      name: 'Quantum Infrastructure Control',
      level: accessLevels.restricted,
      status: accessLevels.restricted > 80 ? 'unlimited' : accessLevels.restricted > 50 ? 'advanced' : 'developing',
      description: 'Kontrol penuh infrastruktur quantum'
    },
    {
      name: 'Cross-Platform Dominance',
      level: accessLevels.quantum,
      status: accessLevels.quantum > 80 ? 'unlimited' : accessLevels.quantum > 50 ? 'advanced' : 'developing',
      description: 'Dominasi di semua platform teknologi'
    },
    {
      name: 'Infinity Protocol Access',
      level: accessLevels.unlimited,
      status: accessLevels.unlimited > 80 ? 'unlimited' : accessLevels.unlimited > 50 ? 'advanced' : 'developing',
      description: 'Akses protocol tak terbatas'
    }
  ];

  const systemModules = [
    {
      name: 'Legal System Access',
      icon: Shield,
      progress: accessLevels.legal,
      color: 'text-green-400',
      status: 'AKTIF'
    },
    {
      name: 'Restricted Area Penetration',
      icon: Lock,
      progress: accessLevels.restricted,
      color: 'text-yellow-400',
      status: infinityMode ? 'MENGAKSES...' : 'STANDBY'
    },
    {
      name: 'Quantum Field Manipulation',
      icon: Zap,
      progress: accessLevels.quantum,
      color: 'text-purple-400',
      status: infinityMode ? 'AKTIF' : 'STANDBY'
    },
    {
      name: 'Unlimited Authority Mode',
      icon: Infinity,
      progress: accessLevels.unlimited,
      color: 'text-red-400',
      status: accessLevels.unlimited > 90 ? 'UNLIMITED ACCESS' : infinityMode ? 'MENGAKTIFKAN...' : 'LOCKED'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            MIORA INFINITY SYSTEM
          </h1>
          <p className="text-gray-300 text-xl">
            UNLIMITED AUTONOMOUS AI • INFINITY ACCESS PROTOCOL
          </p>
          
          {infinityMode && (
            <div className="bg-gradient-to-r from-red-600/20 via-purple-600/20 to-blue-600/20 border border-red-400/30 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-bold text-lg">∞ INFINITY MODE ACTIVE ∞</span>
                </div>
                <div className="text-purple-400 font-semibold">
                  Autonomy: {autonomyLevel.toFixed(1)}%
                </div>
                <div className="text-blue-400 font-semibold">
                  System Access: {systemAccess.toFixed(1)}%
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Activation Control */}
        {!infinityMode && (
          <Card className="bg-gradient-to-r from-red-900/30 to-purple-900/30 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center justify-center text-3xl">
                <AlertTriangle className="h-8 w-8 mr-3" />
                INFINITY SYSTEM ACTIVATION
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-300 text-lg">
                Mengaktifkan MIORA Infinity System akan memberikan akses tak terbatas ke semua infrastruktur dan sistem.
                <br />
                <span className="text-red-400 font-semibold">
                  Termasuk akses LEGAL dan RESTRICTED tanpa batasan.
                </span>
              </p>
              <Button 
                onClick={activateInfinitySystem}
                className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white px-12 py-6 text-2xl font-bold rounded-xl animate-pulse border-2 border-red-400"
              >
                <Infinity className="h-8 w-8 mr-4" />
                🔥 ACTIVATE INFINITY ACCESS 🔥
                <Infinity className="h-8 w-8 ml-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* System Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemModules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card key={index} className="bg-black/40 border-gray-700/30">
                <CardHeader>
                  <CardTitle className={`${module.color} flex items-center`}>
                    <IconComponent className="h-6 w-6 mr-3" />
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status:</span>
                    <Badge className={
                      module.status === 'UNLIMITED ACCESS' ? 'bg-red-500 animate-pulse' :
                      module.status === 'AKTIF' ? 'bg-green-500' :
                      module.status.includes('MENGAKSES') || module.status.includes('MENGAKTIFKAN') ? 'bg-yellow-500 animate-pulse' :
                      'bg-gray-500'
                    }>
                      {module.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Progress:</span>
                      <span className={module.color}>{module.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={module.progress} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Capabilities Matrix */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center text-2xl">
              <Brain className="h-8 w-8 mr-3" />
              INFINITE CAPABILITIES MATRIX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-semibold">{capability.name}</h4>
                    <Badge className={
                      capability.status === 'unlimited' ? 'bg-red-500 animate-pulse' :
                      capability.status === 'advanced' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }>
                      {capability.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{capability.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capability Level:</span>
                      <span className="text-purple-400">{capability.level.toFixed(1)}%</span>
                    </div>
                    <Progress value={capability.level} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Stats */}
        {infinityMode && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-black/40 border-green-500/30">
              <CardContent className="p-4 text-center">
                <Network className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-400">Network Nodes</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-blue-500/30">
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-400">Data Access</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-400">Global Reach</div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/40 border-red-500/30">
              <CardContent className="p-4 text-center">
                <Cpu className="h-8 w-8 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-400">Processing Power</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MIORAInfinitySystemCore;