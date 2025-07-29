
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Server, Brain, Infinity, Cpu, Database, Network, TrendingUp } from 'lucide-react';

interface SystemOverviewProps {
  cpuCores: number;
  threadPoolSize: number;
  ramAllocation: number;
  ramUsage: number;
  activeModules: number;
  boostLevel: number;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({
  cpuCores,
  threadPoolSize,
  ramAllocation,
  ramUsage,
  activeModules,
  boostLevel
}) => {
  // Enhanced processing metrics
  const processingMultiplier = boostLevel > 0 ? 2.5 : 1.0;
  const enhancedCores = Math.floor(cpuCores * processingMultiplier);
  const enhancedThreads = Math.floor(threadPoolSize * processingMultiplier);
  const quantumEfficiency = Math.min(99, 85 + (boostLevel * 0.14));

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Enhanced Processing Power */}
      <Card className="bg-gradient-to-br from-purple-800/20 to-pink-800/20 border-purple-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-purple-300 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Quantum Processing Power
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{enhancedCores} QvCores</div>
          <div className="text-sm text-gray-400">Enhanced Threads: {enhancedThreads}</div>
          <div className="text-xs text-purple-400 mt-1">
            Processing Multiplier: {processingMultiplier}x
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Memory System */}
      <Card className="bg-gradient-to-br from-cyan-800/20 to-blue-800/20 border-cyan-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cyan-300 flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Quantum Memory Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{ramAllocation * (boostLevel > 0 ? 4 : 1)}GB</div>
          <div className="text-sm text-gray-400">Usage: {ramUsage.toFixed(1)}%</div>
          <div className="text-xs text-cyan-400 mt-1">
            Infinity Cache: {boostLevel > 0 ? 'ACTIVE' : 'STANDBY'}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced AI Modules */}
      <Card className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 border-green-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-green-300 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            Advanced AI Neural Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{activeModules + (boostLevel > 0 ? 3 : 0)}/10</div>
          <div className="text-sm text-gray-400">Neural Modules</div>
          <div className="text-xs text-green-400 mt-1">
            Quantum Enhanced: {boostLevel > 0 ? 'YES' : 'NO'}
          </div>
        </CardContent>
      </Card>

      {/* Quantum Performance Efficiency */}
      <Card className="bg-gradient-to-br from-orange-800/20 to-red-800/20 border-orange-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-orange-300 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Quantum Efficiency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{quantumEfficiency.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Performance</div>
          <div className="text-xs text-orange-400 mt-1">
            Boost Level: {boostLevel}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;
