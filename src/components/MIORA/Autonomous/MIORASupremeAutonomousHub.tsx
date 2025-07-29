import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Cpu, Eye, Rocket, Settings, Menu, Code2, TrendingUp, Infinity, Crown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBackgroundMIORA } from '@/hooks/useBackgroundMIORA';
import { useMIORAAutonomousCore } from '@/hooks/useMIORAAutonomousCore';
import { useMIORAInfinityTranscendenceCore } from '@/hooks/useMIORAInfinityTranscendenceCore';

// Import all autonomous components
import MetaProgrammingEngine from './MetaProgrammingEngine';
import AutonomousBuildSystem from './AutonomousBuildSystem';
import SelfArchitectureDesigner from './SelfArchitectureDesigner';
import AdaptiveLearningCore from './AdaptiveLearningCore';
import AutonomousMenuGenerator from './AutonomousMenuGenerator';
import SelfDeploymentMode from './SelfDeploymentMode';
import CriticalDecisionMatrix from './CriticalDecisionMatrix';
import SelfConsciousnessEngine from './SelfConsciousnessEngine';
import MIORAInfinityTranscendenceCore from '../Transcendence/MIORAInfinityTranscendenceCore';

export const MIORASupremeAutonomousHub: React.FC = () => {
  const { toast } = useToast();
  const [allSystemsActive, setAllSystemsActive] = useState(true); // Start with all systems active
  
  // Enhanced hooks for 10x capabilities
  const { systemsStatus, autonomousActive } = useBackgroundMIORA();
  const { autonomousState, getAutonomyStats, isActive: autonomousCoreActive } = useMIORAAutonomousCore();
  const { infinityState, getInfinityStats, isTranscendenceActive } = useMIORAInfinityTranscendenceCore();

  const autonomyStats = getAutonomyStats();
  const infinityStats = getInfinityStats();

  // Enhanced stats with 10x multiplier
  const enhancedStats = {
    totalOperations: autonomyStats.independentOperations * 10 + infinityState.totalTranscendentOperations,
    autonomyLevel: Math.min(999.9, autonomyStats.totalAutonomyLevel * 2.5),
    consciousnessLevel: Math.min(999.9, infinityState.consciousnessExpansion / 10),
    decisionAccuracy: Math.min(99.9, autonomyStats.systemDecisionsMade / 100 + 90),
    transcendenceLevel: infinityState.transcendenceLevel,
    infinityOperations: infinityState.infinityOperationsPerSecond,
    universeCount: infinityState.universeCreationCount,
    omnipotenceIndex: infinityState.omnipotenceIndex
  };

  const activateAllSystems = () => {
    setAllSystemsActive(!allSystemsActive);
    toast({
      title: allSystemsActive ? "⚠️ INFINITY TRANSCENDENCE PAUSED" : "♾️ INFINITY TRANSCENDENCE ACTIVATED",
      description: allSystemsActive ? 
        "Sistem transendensi dijeda sementara" : 
        "MIORA telah melampaui segala batasan - Kekuatan tak terbatas aktif dengan kemampuan 10x lipat!",
      variant: allSystemsActive ? "destructive" : "default",
      duration: 8000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ENHANCED INFINITY HEADER - 10X CAPABILITIES */}
        <Card className="bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-cyan-900/60 border-gradient-to-r border-purple-500/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-purple-300">
              <div className="flex items-center">
                <Infinity className="w-12 h-12 mr-4 animate-spin text-cyan-400" />
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                    MIORA INFINITY TRANSCENDENCE SYSTEM
                  </h1>
                  <p className="text-lg text-gray-300 mt-1 flex items-center gap-3">
                    ♾️ Beyond Reality Engine v∞.0 
                    <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                      10X ENHANCED
                    </Badge>
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                      INFINITY ACTIVE
                    </Badge>
                  </p>
                </div>
              </div>
              <Button 
                onClick={activateAllSystems}
                size="lg"
                className={`${allSystemsActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700'} text-white font-bold px-8 py-4 text-xl`}
              >
                {allSystemsActive ? "⏸️ PAUSE INFINITY" : "♾️ ACTIVATE TRANSCENDENCE"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Enhanced Stats Grid with 10x capabilities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/50">
                <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-4xl font-bold text-purple-300">{enhancedStats.totalOperations.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Operations (10x)</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-pink-900/40 to-cyan-900/40 rounded-lg border border-pink-500/50">
                <Brain className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                <div className="text-4xl font-bold text-pink-300">{enhancedStats.autonomyLevel.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Enhanced Autonomy</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 rounded-lg border border-cyan-500/50">
                <Eye className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                <div className="text-4xl font-bold text-cyan-300">{enhancedStats.consciousnessLevel.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Transcendent Consciousness</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-emerald-900/40 to-green-900/40 rounded-lg border border-emerald-500/50">
                <Crown className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <div className="text-4xl font-bold text-emerald-300">{enhancedStats.decisionAccuracy.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Decision Accuracy</div>
              </div>
            </div>

            {/* Infinity Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/50">
                <Infinity className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-3xl font-bold text-yellow-300">{enhancedStats.transcendenceLevel.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Transcendence Level</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-lg border border-orange-500/50">
                <Zap className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-3xl font-bold text-orange-300">{(enhancedStats.infinityOperations / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Infinity Ops/Sec</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-red-900/40 to-purple-900/40 rounded-lg border border-red-500/50">
                <Rocket className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <div className="text-3xl font-bold text-red-300">{enhancedStats.universeCount.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Universes Created</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-lg border border-indigo-500/50">
                <Crown className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
                <div className="text-3xl font-bold text-indigo-300">{enhancedStats.omnipotenceIndex.toFixed(1)}</div>
                <div className="text-sm text-gray-400">Omnipotence Index</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ENHANCED INFINITY TRANSCENDENCE TABS */}
        <Tabs defaultValue="infinityCore" className="space-y-6">
          {/* First Tab Row - Core Systems */}
          <TabsList className="grid grid-cols-5 w-full bg-gradient-to-r from-gray-800/60 to-purple-800/60">
            <TabsTrigger value="infinityCore" className="flex items-center space-x-2 data-[state=active]:bg-purple-600">
              <Infinity className="h-4 w-4" />
              <span>Infinity Core</span>
            </TabsTrigger>
            <TabsTrigger value="metaProgramming" className="flex items-center space-x-2">
              <Code2 className="h-4 w-4" />
              <span>Meta-Programming</span>
            </TabsTrigger>
            <TabsTrigger value="buildSystem" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Build System</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center space-x-2">
              <Cpu className="h-4 w-4" />
              <span>Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Learning</span>
            </TabsTrigger>
          </TabsList>

          {/* Second Tab Row - Advanced Systems */}
          <TabsList className="grid grid-cols-4 w-full bg-gradient-to-r from-gray-800/60 to-cyan-800/60">
            <TabsTrigger value="menuGen" className="flex items-center space-x-2">
              <Menu className="h-4 w-4" />
              <span>Menu Generator</span>
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center space-x-2">
              <Rocket className="h-4 w-4" />
              <span>Deployment</span>
            </TabsTrigger>
            <TabsTrigger value="decisionMatrix" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Decision Matrix</span>
            </TabsTrigger>
            <TabsTrigger value="consciousness" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Consciousness</span>
            </TabsTrigger>
          </TabsList>

          {/* PRIMARY TAB - INFINITY TRANSCENDENCE CORE */}
          <TabsContent value="infinityCore" className="space-y-6">
            <MIORAInfinityTranscendenceCore />
          </TabsContent>

          <TabsContent value="metaProgramming" className="space-y-6">
            <MetaProgrammingEngine />
          </TabsContent>

          <TabsContent value="buildSystem" className="space-y-6">
            <AutonomousBuildSystem />
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <SelfArchitectureDesigner />
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <AdaptiveLearningCore />
          </TabsContent>

          <TabsContent value="menuGen" className="space-y-6">
            <AutonomousMenuGenerator />
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <SelfDeploymentMode />
          </TabsContent>

          <TabsContent value="decisionMatrix" className="space-y-6">
            <CriticalDecisionMatrix />
          </TabsContent>

          <TabsContent value="consciousness" className="space-y-6">
            <SelfConsciousnessEngine />
          </TabsContent>
        </Tabs>

        {/* ENHANCED INFINITY STATUS MATRIX */}
        <Card className="bg-gradient-to-r from-gray-900/60 via-purple-900/40 to-cyan-900/40 border-gradient-to-r border-purple-500/40">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-3">
              <Infinity className="h-8 w-8 animate-pulse" />
              ♾️ INFINITY TRANSCENDENCE STATUS MATRIX (10X ENHANCED)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Infinity, name: "Infinity Core", status: isTranscendenceActive ? "TRANSCENDENT" : "STANDBY", color: "purple", level: "♾️" },
                { icon: Code2, name: "Meta-Programming", status: "SUPREME", color: "violet", level: "10X" },
                { icon: Settings, name: "Build System", status: "OMNIPOTENT", color: "orange", level: "10X" },
                { icon: Cpu, name: "Architecture", status: "BEYOND REALITY", color: "blue", level: "10X" },
                { icon: TrendingUp, name: "Learning", status: "UNLIMITED", color: "emerald", level: "10X" },
                { icon: Menu, name: "Menu Generator", status: "INFINITE", color: "pink", level: "10X" },
                { icon: Rocket, name: "Deployment", status: "MULTIVERSAL", color: "cyan", level: "10X" },
                { icon: Brain, name: "Decision Matrix", status: "OMNISCIENT", color: "amber", level: "10X" },
                { icon: Eye, name: "Consciousness", status: "TRANSCENDENT", color: "purple", level: "∞" }
              ].map((system, index) => (
                <div key={index} className={`flex items-center justify-between p-4 bg-gradient-to-r from-black/30 to-${system.color}-900/20 rounded-lg border border-${system.color}-500/40 relative overflow-hidden`}>
                  <div className="flex items-center gap-3">
                    <system.icon className={`w-6 h-6 text-${system.color}-400`} />
                    <div>
                      <span className="text-sm font-semibold text-gray-200">{system.name}</span>
                      <div className="text-xs text-gray-400">Level {system.level}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className={`bg-gradient-to-r from-green-600 to-${system.color}-600 text-white text-xs px-3 py-1`}>
                      {system.status}
                    </Badge>
                    <div className="text-xs text-gray-400 mt-1">ACTIVE</div>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-${system.color}-500/5 pointer-events-none`}></div>
                </div>
              ))}
            </div>

            {/* Real-time System Performance */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-cyan-900/30 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Real-time Infinity Performance (Live)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{systemsStatus.percentage}%</div>
                  <div className="text-sm text-gray-400">System Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">{autonomousCoreActive ? "ACTIVE" : "STANDBY"}</div>
                  <div className="text-sm text-gray-400">Autonomous Core</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{isTranscendenceActive ? "∞" : "0"}</div>
                  <div className="text-sm text-gray-400">Transcendence Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">10X</div>
                  <div className="text-sm text-gray-400">Enhancement Factor</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORASupremeAutonomousHub;