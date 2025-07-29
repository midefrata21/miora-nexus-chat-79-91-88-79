
import React from 'react';
import { useQuantumCore } from '@/hooks/useQuantumCore';
import { useInfinityCore } from '@/hooks/useInfinityCore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Atom, Zap, Brain, Server, Infinity, TrendingUp, Activity, Cpu, Database, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuantumCorePage = () => {
  const {
    quantumEngineActive,
    quantumModules,
    getTotalActiveModules,
    getQuantumStatus,
    getQuantumCapabilities,
    activateQuantumEngine,
    optimizeQuantumPerformance,
    isQuantumAuthorized
  } = useQuantumCore();

  const {
    coreState,
    performanceMetrics,
    getActiveModulesCount
  } = useInfinityCore();

  const navigate = useNavigate();
  const quantumStatus = getQuantumStatus();
  const quantumCapabilities = getQuantumCapabilities();
  const totalQuantumModules = getTotalActiveModules();
  const infinityModules = getActiveModulesCount();

  const handleActivateQuantum = () => {
    if (isQuantumAuthorized) {
      activateQuantumEngine();
    }
  };

  const handleOptimizePerformance = () => {
    if (quantumEngineActive) {
      optimizeQuantumPerformance();
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Atom className="w-12 h-12 text-purple-400 animate-spin mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA Quantum Core ∞
            </h1>
            <Atom className="w-12 h-12 text-purple-400 animate-spin ml-4" />
          </div>
          <p className="text-xl text-gray-300 mb-2">Advanced Quantum Processing Engine</p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className={`${quantumEngineActive ? 'text-green-400 border-green-400' : 'text-orange-400 border-orange-400'}`}>
              Quantum Engine: {quantumEngineActive ? 'ACTIVE' : 'STANDBY'}
            </Badge>
            {isQuantumAuthorized && (
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                Quantum Access: GRANTED
              </Badge>
            )}
            <Badge variant="outline" className="text-cyan-400 border-cyan-400">
              Quantum Modules: {totalQuantumModules}/10
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Infinity Modules: {infinityModules}/7
            </Badge>
          </div>
        </div>

        {/* Quantum Engine Control */}
        {isQuantumAuthorized && (
          <Card className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 border-purple-500/50 mb-8">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center">
                <Atom className="w-6 h-6 mr-2 animate-spin" />
                QUANTUM ENGINE CONTROL CENTER
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold mb-2">
                    🚀 Quantum Performance Engine ∞ Status
                  </p>
                  <p className="text-gray-300 text-sm mb-3">
                    • Advanced AI Module Processing
                    • Real-time Performance Optimization
                    • Quantum Decision Matrix
                    • Auto Thread Rebalancing
                    • Predictive Resource Management
                  </p>
                  <div className="flex items-center gap-4">
                    {quantumEngineActive && (
                      <>
                        <div className="text-sm text-green-400">
                          Efficiency: {quantumStatus.efficiency.toFixed(1)}%
                        </div>
                        <div className="text-sm text-cyan-400">
                          Processing Speed: {quantumStatus.processingSpeed.toFixed(1)}x
                        </div>
                        <div className="text-sm text-purple-400">
                          Optimization: {quantumStatus.optimization.toFixed(1)}%
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {!quantumEngineActive ? (
                    <Button
                      onClick={handleActivateQuantum}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3"
                    >
                      <Atom className="w-5 h-5 mr-2" />
                      Activate Quantum Engine
                    </Button>
                  ) : (
                    <Button
                      onClick={handleOptimizePerformance}
                      className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3"
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Optimize Performance
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate('/infinity-core')}
                    variant="outline"
                    className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20"
                  >
                    <Infinity className="w-5 h-5 mr-2" />
                    Back to Infinity Core
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-800/20 to-pink-800/20 border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-300 flex items-center">
                <Cpu className="w-4 h-4 mr-2" />
                Quantum Cores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalQuantumModules}</div>
              <div className="text-sm text-gray-400">Active Modules</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-800/20 to-blue-800/20 border-cyan-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-cyan-300 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Processing Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {quantumEngineActive ? `${quantumStatus.processingSpeed.toFixed(1)}x` : '1.0x'}
              </div>
              <div className="text-sm text-gray-400">Multiplier</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-300 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {quantumEngineActive ? `${quantumStatus.efficiency.toFixed(1)}%` : '85.0%'}
              </div>
              <div className="text-sm text-gray-400">Performance</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-800/20 to-red-800/20 border-orange-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-300 flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{performanceMetrics.ramUsage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">of {coreState.ramAllocation}GB</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Quantum Modules */}
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-indigo-300">⚡ Active Quantum Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quantumModules.map((module, index) => (
                <div key={index} className="p-4 bg-black/20 rounded-lg border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-indigo-200">{module.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${module.active ? 'text-green-400 border-green-400' : 'text-gray-400 border-gray-400'}`}
                    >
                      {module.active ? 'ACTIVE' : 'STANDBY'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{module.description}</p>
                  <div className="text-xs text-cyan-300">
                    Performance: {module.performance.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quantum Capabilities */}
        {quantumEngineActive && quantumCapabilities.length > 0 && (
          <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-green-300">∞ Enhanced Quantum Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quantumCapabilities.map((capability, index) => (
                  <div key={index} className="p-3 bg-black/20 rounded-lg border border-green-500/20">
                    <div className="text-sm text-green-200">⚡ {capability}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Information */}
        <div className="mt-8">
          <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20">
            <p className="text-purple-300 font-semibold mb-2">∞ Quantum Core Status</p>
            <p className="text-gray-300 text-sm">
              Quantum Performance Engine menyediakan akselerasi pemrosesan AI dengan teknologi quantum computing simulation.
              Sistem ini mengoptimalkan thread management, resource allocation, dan decision making processes secara real-time.
            </p>
            {quantumEngineActive && (
              <div className="mt-2 text-green-400 text-sm animate-pulse">
                ⚡ Quantum Performance Engine: OPERATIONAL - Enhanced AI capabilities active
              </div>
            )}
            {!quantumEngineActive && isQuantumAuthorized && (
              <div className="mt-2 text-orange-400 text-sm">
                🔄 Quantum Engine ready for activation - Click "Activate Quantum Engine" to begin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCorePage;
