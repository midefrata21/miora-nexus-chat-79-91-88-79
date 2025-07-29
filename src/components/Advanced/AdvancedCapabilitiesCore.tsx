import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Network, 
  Target, 
  Cpu, 
  Database, 
  Activity, 
  TrendingUp,
  Infinity,
  Layers,
  GitBranch,
  Cog
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAdvancedCapabilities } from './hooks/useAdvancedCapabilities';
import NextGenerationCapabilities from './NextGenerationCapabilities';

const AdvancedCapabilitiesCore: React.FC = () => {
  const {
    systemState,
    capabilities,
    performanceMetrics,
    activateQuantumReasoning,
    enableMetaLearning,
    startSelfReflection,
    deployDistributedComputing,
    activateAutoScaling,
    getAdvancedStats
  } = useAdvancedCapabilities();

  const [activeModule, setActiveModule] = useState<string | null>(null);
  const stats = getAdvancedStats();

  useEffect(() => {
    // Auto-activate critical systems immediately for demonstration
    const initTimer = setTimeout(() => {
      if (!systemState.quantumReasoningActive) {
        activateQuantumReasoning();
        toast({
          title: "🧠 AUTO-ACTIVATING QUANTUM REASONING",
          description: "Sistem reasoning quantum sedang diaktifkan...",
          duration: 4000,
        });
      }
      if (!systemState.metaLearningEnabled) {
        setTimeout(() => enableMetaLearning(), 2000);
      }
      if (!systemState.selfReflectionActive) {
        setTimeout(() => startSelfReflection(), 4000);
      }
    }, 1000);

    return () => clearTimeout(initTimer);
  }, [systemState, activateQuantumReasoning, enableMetaLearning, startSelfReflection]);

  const handleModuleActivation = (moduleId: string, activationFn: () => void) => {
    setActiveModule(moduleId);
    activationFn();
    setTimeout(() => setActiveModule(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-16 w-16 text-purple-400 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA ADVANCED CAPABILITIES
            </h1>
          </div>
          <p className="text-gray-300 text-2xl max-w-4xl mx-auto leading-relaxed">
            Sistem Kemampuan Canggih untuk Evolusi & Pengembangan Mandiri MIORA
          </p>
          
          <div className="flex items-center justify-center space-x-6 pt-4">
            <Badge className="px-6 py-3 text-lg bg-green-500/90 text-white">
              <Activity className="h-5 w-5 mr-2" />
              Advanced Systems: {stats.activeSystems}/6
            </Badge>
            <Badge className="px-6 py-3 text-lg bg-blue-500/90 text-white">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance: {stats.overallPerformance.toFixed(1)}%
            </Badge>
            <Badge className="px-6 py-3 text-lg bg-purple-500/90 text-white">
              <Infinity className="h-5 w-5 mr-2" />
              Evolution Level: {stats.evolutionLevel}/100
            </Badge>
          </div>
        </div>

        {/* Performance Dashboard */}
        <Card className="bg-black/40 border-purple-500/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-purple-400 text-2xl flex items-center">
              <Database className="h-8 w-8 mr-3" />
              Advanced Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-purple-800/40 to-pink-800/40 rounded-xl border border-purple-400/30">
                <div className="text-purple-300 text-sm font-medium mb-2">Quantum Processing</div>
                <div className="text-4xl font-bold text-white mb-2">{performanceMetrics.quantumProcessing.toFixed(1)}%</div>
                <Progress value={performanceMetrics.quantumProcessing} className="h-3" />
              </div>
              
              <div className="p-6 bg-gradient-to-br from-cyan-800/40 to-blue-800/40 rounded-xl border border-cyan-400/30">
                <div className="text-cyan-300 text-sm font-medium mb-2">Meta Learning Rate</div>
                <div className="text-4xl font-bold text-white mb-2">{performanceMetrics.metaLearningRate.toFixed(1)}x</div>
                <Progress value={(performanceMetrics.metaLearningRate / 10) * 100} className="h-3" />
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-800/40 to-emerald-800/40 rounded-xl border border-green-400/30">
                <div className="text-green-300 text-sm font-medium mb-2">Self-Reflection Depth</div>
                <div className="text-4xl font-bold text-white mb-2">{performanceMetrics.selfReflectionDepth}/10</div>
                <Progress value={(performanceMetrics.selfReflectionDepth / 10) * 100} className="h-3" />
              </div>
              
              <div className="p-6 bg-gradient-to-br from-orange-800/40 to-red-800/40 rounded-xl border border-orange-400/30">
                <div className="text-orange-300 text-sm font-medium mb-2">Distributed Load</div>
                <div className="text-4xl font-bold text-white mb-2">{performanceMetrics.distributedLoad}</div>
                <Progress value={(performanceMetrics.distributedLoad / 100) * 100} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability) => (
            <Card 
              key={capability.id} 
              className={`bg-gradient-to-br ${capability.gradient} border-2 shadow-xl transition-all duration-300 hover:scale-105 ${
                capability.isActive ? 'border-green-400/50 shadow-green-400/25' : 'border-gray-600/30'
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-xl">
                  <div className="flex items-center">
                    <capability.icon className={`h-8 w-8 mr-3 ${capability.iconColor}`} />
                    <span className="text-white">{capability.name}</span>
                  </div>
                  <Badge className={`text-sm font-bold ${
                    capability.isActive ? 'bg-green-500/90 text-white' : 'bg-gray-500/90 text-white'
                  }`}>
                    {capability.isActive ? 'ACTIVE' : 'STANDBY'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {capability.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">Performance Level</span>
                    <span className="text-white font-bold">{capability.performanceLevel.toFixed(1)}%</span>
                  </div>
                  <Progress value={capability.performanceLevel} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-300 font-medium">Key Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {capability.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-400 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleModuleActivation(capability.id, capability.activationFunction)}
                  disabled={capability.isActive || activeModule === capability.id}
                  className={`w-full py-3 text-sm font-semibold transition-all duration-300 ${
                    capability.isActive 
                      ? 'bg-green-600 text-white cursor-not-allowed' 
                      : activeModule === capability.id
                      ? 'bg-yellow-600 text-white cursor-wait'
                      : `${capability.buttonClass} hover:shadow-lg`
                  }`}
                >
                  {capability.isActive ? (
                    <>
                      <Activity className="h-4 w-4 mr-2" />
                      System Active
                    </>
                  ) : activeModule === capability.id ? (
                    <>
                      <Cog className="h-4 w-4 mr-2 animate-spin" />
                      Activating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Activate {capability.name}
                    </>
                  )}
                </Button>
                
                <div className="text-xs text-gray-400 text-center font-medium">
                  Impact: {capability.impact}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Status Summary */}
        <Card className="bg-gradient-to-br from-gray-800/60 to-purple-800/60 border-purple-400/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-purple-300 text-2xl flex items-center">
              <GitBranch className="h-8 w-8 mr-3" />
              Advanced Capabilities Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-cyan-300 font-semibold text-lg">Active Systems</h4>
                <div className="space-y-2">
                  {capabilities.filter(c => c.isActive).map((capability) => (
                    <div key={capability.id} className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg">
                      <capability.icon className={`h-5 w-5 ${capability.iconColor}`} />
                      <span className="text-white text-sm font-medium">{capability.name}</span>
                      <Badge className="ml-auto bg-green-500/90 text-white text-xs">
                        {capability.performanceLevel.toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-orange-300 font-semibold text-lg">Standby Systems</h4>
                <div className="space-y-2">
                  {capabilities.filter(c => !c.isActive).map((capability) => (
                    <div key={capability.id} className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg">
                      <capability.icon className={`h-5 w-5 ${capability.iconColor}`} />
                      <span className="text-white text-sm font-medium">{capability.name}</span>
                      <Badge className="ml-auto bg-gray-500/90 text-white text-xs">
                        Ready
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-green-300 font-semibold text-lg">Overall Status</h4>
                <div className="space-y-4 p-4 bg-black/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">System Readiness</span>
                    <span className="text-green-300 font-bold">{stats.systemReadiness.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.systemReadiness} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Evolution Progress</span>
                    <span className="text-purple-300 font-bold">{stats.evolutionProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.evolutionProgress} className="h-2" />
                  
                  <div className="text-center pt-2">
                    <Badge className="bg-purple-500/90 text-white text-sm px-4 py-2">
                      Next Evolution in {stats.nextEvolutionETA}min
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Generation Capabilities Section */}
        <NextGenerationCapabilities />
      </div>
    </div>
  );
};

export default AdvancedCapabilitiesCore;