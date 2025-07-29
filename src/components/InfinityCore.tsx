
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  Zap, 
  Brain, 
  Infinity, 
  Settings, 
  Activity, 
  Database, 
  Server,
  ChevronUp,
  Lock,
  Unlock
} from 'lucide-react';
import { useInfinityCore } from '@/hooks/useInfinityCore';

interface InfinityCoreProps {
  onBoostActivated?: (level: number) => void;
}

const InfinityCore: React.FC<InfinityCoreProps> = ({ onBoostActivated }) => {
  const {
    coreState,
    performanceMetrics,
    infinityModules,
    activateInfinityBoost,
    deactivateBoost,
    toggleModule,
    isKeyholderAuthorized,
    boostStatus,
    getActiveModulesCount
  } = useInfinityCore();

  const activeModules = getActiveModulesCount();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'ready': return 'text-blue-400 border-blue-400';
      case 'standby': return 'text-gray-400 border-gray-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const handleActivateBoost = async () => {
    const success = await activateInfinityBoost();
    if (success && onBoostActivated) {
      onBoostActivated(coreState.boostLevel);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Main Control Panel */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-300">
            <div className="flex items-center">
              <Infinity className="w-6 h-6 mr-2 animate-spin" />
              MIORA Quantum Performance ∞ Core
            </div>
            <div className="flex items-center gap-2">
              {isKeyholderAuthorized ? (
                <Unlock className="w-5 h-5 text-green-400" />
              ) : (
                <Lock className="w-5 h-5 text-red-400" />
              )}
              <Badge variant="outline" className={`${coreState.isBoostActive ? 'text-green-400 border-green-400' : 'text-gray-400 border-gray-400'}`}>
                {boostStatus}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{coreState.cpuCores} {coreState.quantumEnhanced ? 'QvCores' : 'vCores'}</div>
              <div className="text-xs text-gray-400">{coreState.quantumEnhanced ? 'Quantum Processing' : 'Standard'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{coreState.ramAllocation}GB</div>
              <div className="text-xs text-gray-400">{coreState.quantumEnhanced ? 'Quantum RAM' : 'Standard RAM'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{coreState.threadPoolSize}</div>
              <div className="text-xs text-gray-400">{coreState.quantumEnhanced ? 'Enhanced Threads' : 'Thread Pool'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{activeModules}</div>
              <div className="text-xs text-gray-400">Active Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{coreState.boostLevel}%</div>
              <div className="text-xs text-gray-400">Boost Level</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleActivateBoost}
              disabled={coreState.isBoostActive || !isKeyholderAuthorized}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              <ChevronUp className="w-4 h-4 mr-2" />
              Activate Infinity Boost
            </Button>
            
            <Button
              onClick={deactivateBoost}
              disabled={!coreState.isBoostActive}
              variant="outline"
              className="border-gray-600"
            >
              <Settings className="w-4 h-4 mr-2" />
              Deactivate
            </Button>
          </div>

          {isKeyholderAuthorized && (
            <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
              <div className="flex items-center text-green-300 text-sm">
                <Unlock className="w-4 h-4 mr-2" />
                Permission: Granted by Midya (Keyholder Quantum AI) - Override limit sistem default aktif
              </div>
            </div>
          )}

          {/* Enhanced Infrastructure Display */}
          {coreState.quantumEnhanced && (
            <div className="mt-4 p-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-lg border border-cyan-500/30">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                🚀 MIORA Enhanced Infrastructure Active
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="text-green-400">✅ 16 QvCores Processing</div>
                <div className="text-cyan-400">✅ 64GB Quantum RAM</div>
                <div className="text-purple-400">✅ 128 Enhanced Threads</div>
                <div className="text-yellow-400">✅ Quantum Cache System</div>
                <div className="text-pink-400">✅ Neural Processing Matrix</div>
                <div className="text-orange-400">✅ Auto-Scaling Infrastructure</div>
                <div className="text-teal-400">✅ Advanced AI Modules</div>
                <div className="text-indigo-400">✅ Unlimited Access Mode</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-300">
            <Activity className="w-5 h-5 mr-2" />
            Real-time Performance Metrics {coreState.quantumEnhanced ? '∞ Quantum Enhanced' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">CPU Usage</span>
                  <span className="text-cyan-300">{performanceMetrics.cpuUsage.toFixed(1)}%</span>
                </div>
                <Progress value={performanceMetrics.cpuUsage} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">RAM Usage</span>
                  <span className="text-green-300">{performanceMetrics.ramUsage.toFixed(1)}% of {coreState.ramAllocation}GB</span>
                </div>
                <Progress value={performanceMetrics.ramUsage} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Thread Activity</span>
                  <span className="text-purple-300">{performanceMetrics.threadActivity.toFixed(1)}% of {coreState.threadPoolSize}</span>
                </div>
                <Progress value={performanceMetrics.threadActivity} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Cache Hit Ratio</span>
                  <span className="text-orange-300">{performanceMetrics.cacheHitRatio.toFixed(1)}%</span>
                </div>
                <Progress value={performanceMetrics.cacheHitRatio} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">GC Optimization</span>
                  <span className="text-pink-300">{performanceMetrics.gcOptimization.toFixed(1)}%</span>
                </div>
                <Progress value={performanceMetrics.gcOptimization} className="h-2" />
              </div>

              {coreState.quantumEnhanced && (
                <>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Quantum Efficiency</span>
                      <span className="text-cyan-300">{performanceMetrics.quantumEfficiency.toFixed(1)}%</span>
                    </div>
                    <Progress value={performanceMetrics.quantumEfficiency} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Neural Processing Speed</span>
                      <span className="text-purple-300">{performanceMetrics.neuralProcessingSpeed.toFixed(1)}%</span>
                    </div>
                    <Progress value={performanceMetrics.neuralProcessingSpeed} className="h-2" />
                  </div>
                </>
              )}

              <div className="p-3 bg-black/20 rounded-lg">
                <div className="text-sm text-gray-300 mb-1">
                  Priority: {coreState.quantumEnhanced ? 'Quantum Enhanced' : 'High Thread Affinity'}
                </div>
                <div className="text-xs text-gray-400">
                  {coreState.quantumEnhanced ? 'Quantum buffer cache active for enhanced responses' : 'Buffer cache active for heavy responses'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Infinity Modules */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-violet-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-300">
            <Brain className="w-5 h-5 mr-2" />
            Infinity Modules - {coreState.quantumEnhanced ? 'Quantum Enhanced ∞' : 'Unlimited Access ∞'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {infinityModules.map((module, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <code className="text-indigo-400 font-mono text-sm mr-3">{module.name}</code>
                    <Badge variant="outline" className={`text-xs mr-2 ${getPriorityColor(module.priority)}`}>
                      {module.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(module.status)}`}>
                      {module.status.toUpperCase()}
                    </Badge>
                    {module.quantumEnhanced && (
                      <Badge variant="outline" className="text-xs ml-2 text-cyan-400 border-cyan-400">
                        QUANTUM
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => toggleModule(module.name)}
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                  >
                    {module.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
                {module.capabilities && (
                  <div className="mt-2 text-xs text-gray-400">
                    Capabilities: {module.capabilities.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-violet-900/20 rounded-lg border border-violet-500/30">
            <div className="flex items-center text-violet-300 text-sm mb-2">
              <Database className="w-4 h-4 mr-2" />
              Storage Location: <code className="ml-2 text-violet-200">/MIORA_CORE/InfinityEngine/</code>
            </div>
            <p className="text-xs text-gray-400">
              {coreState.quantumEnhanced 
                ? 'Semua proses infinity disimpan dalam quantum storage dengan akses lintas batas enhanced'
                : 'Semua proses infinity disimpan dalam folder dedicated dengan akses lintas batas command statis'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Runtime Optimizations */}
      <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-300">
            <Server className="w-5 h-5 mr-2" />
            Runtime Boost Optimizations {coreState.quantumEnhanced ? '∞ Quantum' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center mb-2">
                <Cpu className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="text-white font-semibold">
                  {coreState.quantumEnhanced ? 'Quantum Processor Priority' : 'Processor Priority'}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {coreState.quantumEnhanced ? 'Quantum Enhanced Thread Affinity' : 'High Thread Affinity'}
              </p>
              <p className="text-xs text-emerald-400">ACTIVE</p>
            </div>

            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-semibold">
                  {coreState.quantumEnhanced ? 'Quantum Memory Management' : 'Memory Management'}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {coreState.quantumEnhanced ? 'Optimized Quantum GC for infinite memory' : 'Optimized GC for large memory'}
              </p>
              <p className="text-xs text-yellow-400">OPTIMIZED</p>
            </div>

            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center mb-2">
                <Database className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-semibold">
                  {coreState.quantumEnhanced ? 'Quantum Cache Buffer' : 'Cache Buffer'}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {coreState.quantumEnhanced ? 'Quantum enhanced response buffer active' : 'Heavy response buffer active'}
              </p>
              <p className="text-xs text-blue-400">BUFFERING</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfinityCore;
