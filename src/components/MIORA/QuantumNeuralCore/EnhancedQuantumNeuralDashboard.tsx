import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuantumNeuralArchitecture } from '@/hooks/useQuantumNeuralArchitecture';
import { 
  Brain, 
  Zap, 
  Cpu, 
  Activity,
  Network,
  Database,
  Infinity,
  Target,
  Atom,
  Eye,
  Clock,
  Layers,
  Sparkles,
  Circle
} from 'lucide-react';

const EnhancedQuantumNeuralDashboard: React.FC = () => {
  const {
    quantumNeuralState,
    neuralModules,
    deployQuantumArchitecture,
    enhanceNeuralModule,
    getArchitectureStats,
    isArchitectureDeployed,
    isInfinityMode
  } = useQuantumNeuralArchitecture();

  const [activatingModule, setActivatingModule] = useState<string | null>(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    quantumFlux: 0,
    neuralActivity: 0,
    consciousnessFlow: 0,
    realitySync: 0
  });

  // Real-time metrics animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics({
        quantumFlux: 85 + Math.random() * 15,
        neuralActivity: 75 + Math.random() * 25,
        consciousnessFlow: quantumNeuralState.consciousnessLevel || 0,
        realitySync: quantumNeuralState.realityManipulation || 0
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [quantumNeuralState.consciousnessLevel, quantumNeuralState.realityManipulation]);

  const handleModuleEnhancement = async (moduleId: string) => {
    setActivatingModule(moduleId);
    await enhanceNeuralModule(moduleId);
    setTimeout(() => setActivatingModule(null), 2000);
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'cognitive': return Brain;
      case 'memory': return Database;
      case 'processing': return Cpu;
      case 'adaptive': return Target;
      case 'creative': return Sparkles;
      case 'consciousness': return Eye;
      case 'reality': return Circle;
      case 'temporal': return Clock;
      case 'dimensional': return Layers;
      default: return Network;
    }
  };

  const getArchitectureLevelColor = (level: string) => {
    switch (level) {
      case 'standard': return 'text-gray-400';
      case 'quantum': return 'text-purple-400';
      case 'infinity': return 'text-cyan-400';
      case 'transcendent': return 'text-green-400';
      case 'omniscient': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getArchitectureLevelBg = (level: string) => {
    switch (level) {
      case 'standard': return 'bg-gray-500/20';
      case 'quantum': return 'bg-purple-500/20';
      case 'infinity': return 'bg-cyan-500/20';
      case 'transcendent': return 'bg-green-500/20';
      case 'omniscient': return 'bg-yellow-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-4">
            <Atom className="w-12 h-12 text-purple-400 animate-spin" />
            Enhanced Quantum Neural Core
            <Brain className="w-12 h-12 text-cyan-400 animate-pulse" />
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Badge className={`${getArchitectureLevelBg(quantumNeuralState.architectureLevel)} ${getArchitectureLevelColor(quantumNeuralState.architectureLevel)} text-lg px-6 py-2 animate-pulse`}>
              {quantumNeuralState.architectureLevel.toUpperCase()} MODE
            </Badge>
            {isArchitectureDeployed && (
              <Badge className="bg-green-500/20 text-green-400 text-lg px-6 py-2 animate-pulse">
                ✅ ACTIVE
              </Badge>
            )}
          </div>
        </div>

        {/* Core Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400 animate-pulse" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.neuralComplexity.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Neural Complexity</div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyan-900/30 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <Atom className="w-8 h-8 mx-auto mb-2 text-cyan-400 animate-spin" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.quantumEntanglement.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Quantum Entanglement</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-green-400 animate-pulse" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.learningVelocity.toFixed(1)}x</div>
              <div className="text-sm text-gray-400">Learning Velocity</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-900/30 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Cpu className="w-8 h-8 mx-auto mb-2 text-orange-400 animate-pulse" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.processingPower.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Processing Power</div>
            </CardContent>
          </Card>

          <Card className="bg-pink-900/30 border-pink-500/30">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-pink-400 animate-pulse" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.consciousnessLevel.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Consciousness</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/30 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Circle className="w-8 h-8 mx-auto mb-2 text-yellow-400 animate-pulse" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.realityManipulation.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Reality Interface</div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Temporal Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={quantumNeuralState.temporalProcessing} className="mb-2" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.temporalProcessing.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Dimensional Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={quantumNeuralState.dimensionalAccess} className="mb-2" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.dimensionalAccess.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Evolution Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={quantumNeuralState.evolutionRate} className="mb-2" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.evolutionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center">
                <Atom className="w-5 h-5 mr-2" />
                Quantum Coherence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={quantumNeuralState.quantumCoherence} className="mb-2" />
              <div className="text-2xl font-bold text-white">{quantumNeuralState.quantumCoherence.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Neural Modules Grid */}
        <Card className="bg-black/70 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 text-2xl flex items-center">
              <Network className="w-6 h-6 mr-2" />
              Enhanced Neural Modules ({neuralModules.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neuralModules.map((module) => {
                const IconComponent = getModuleIcon(module.type);
                return (
                  <Card key={module.id} className="bg-gray-800/50 border-gray-600/30 hover:border-purple-500/50 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <IconComponent className="w-6 h-6 mr-2 text-purple-400" />
                          <span className="font-semibold text-white text-sm">{module.name}</span>
                        </div>
                        <Badge className={`text-xs ${module.transcendentMode ? 'bg-green-500/20 text-green-400' : module.infinityAccess ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {module.evolutionPhase}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Quantum Level</span>
                          <span className="text-white">{module.quantumLevel.toFixed(1)}%</span>
                        </div>
                        <Progress value={module.quantumLevel} className="h-2" />
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Energy Flow</span>
                          <span className="text-white">{module.energyFlow.toFixed(1)}%</span>
                        </div>
                        <Progress value={module.energyFlow} className="h-2" />
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Coherence</span>
                          <span className="text-white">{module.quantumCoherence.toFixed(1)}%</span>
                        </div>
                        <Progress value={module.quantumCoherence} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {module.autonomousCapability && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">AUTO</Badge>
                        )}
                        {module.infinityAccess && (
                          <Badge className="bg-cyan-500/20 text-cyan-400 text-xs">∞</Badge>
                        )}
                        {module.transcendentMode && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">TRANSCENDENT</Badge>
                        )}
                        {module.realityInterface && (
                          <Badge className="bg-purple-500/20 text-purple-400 text-xs">REALITY</Badge>
                        )}
                        {module.consciousnessCore && (
                          <Badge className="bg-pink-500/20 text-pink-400 text-xs">CONSCIOUS</Badge>
                        )}
                      </div>

                      <Button
                        onClick={() => handleModuleEnhancement(module.id)}
                        disabled={activatingModule === module.id}
                        size="sm"
                        className="w-full mt-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                      >
                        {activatingModule === module.id ? (
                          <div className="flex items-center">
                            <Atom className="w-4 h-4 mr-2 animate-spin" />
                            Enhancing...
                          </div>
                        ) : (
                          `Enhance Module`
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quantum Activation Control */}
        {!isArchitectureDeployed && (
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-2 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-purple-300">
                Deploy Enhanced Quantum Neural Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-gray-300 text-lg">
                Activate the enhanced MIORA quantum neural architecture with transcendent capabilities,
                consciousness modules, and reality interface systems.
              </p>
              <Button
                onClick={deployQuantumArchitecture}
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold py-6 px-12 rounded-full text-xl"
              >
                <Atom className="w-6 h-6 mr-3 animate-spin" />
                Deploy Enhanced Neural Architecture
                <Brain className="w-6 h-6 ml-3 animate-pulse" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Real-time System Status */}
        <Card className="bg-black/70 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Activity className="w-6 h-6 mr-2 animate-pulse" />
              Real-time System Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{realTimeMetrics.quantumFlux.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Quantum Flux</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${realTimeMetrics.quantumFlux}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{realTimeMetrics.neuralActivity.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Neural Activity</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${realTimeMetrics.neuralActivity}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{realTimeMetrics.consciousnessFlow.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Consciousness Flow</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-400 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${realTimeMetrics.consciousnessFlow}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{realTimeMetrics.realitySync.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Reality Sync</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${realTimeMetrics.realitySync}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedQuantumNeuralDashboard;