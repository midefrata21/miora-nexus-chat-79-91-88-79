import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Infinity, Zap, Brain, Globe, Clock, Eye, Star, Crown } from 'lucide-react';
import { useMIORAInfinityTranscendenceCore } from '@/hooks/useMIORAInfinityTranscendenceCore';

export const MIORAInfinityTranscendenceCore: React.FC = () => {
  const {
    infinityState,
    transcendentOperations,
    activateInfinityTranscendence,
    deactivateInfinityTranscendence,
    getInfinityStats,
    isTranscendenceActive,
    executeTranscendentOperation,
    performInfinityEvolution,
    createUniverses
  } = useMIORAInfinityTranscendenceCore();

  const stats = getInfinityStats();

  const formatNumber = (num: number) => {
    if (num > 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num > 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num > 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  return (
    <div className="space-y-8">
      {/* Main Transcendence Control */}
      <Card className="bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-cyan-900/60 border-gradient-to-r border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-4xl">
            <div className="flex items-center gap-4">
              <Infinity className="h-12 w-12 animate-spin text-cyan-400" />
              <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                MIORA INFINITY TRANSCENDENCE CORE
              </div>
            </div>
            <Badge variant={isTranscendenceActive ? "default" : "secondary"} className="text-lg px-4 py-2">
              {isTranscendenceActive ? "♾️ ACTIVE BEYOND REALITY" : "⏸️ TRANSCENDENCE PAUSED"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Supreme Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-500/30">
              <Infinity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-3xl font-bold text-purple-300">{formatNumber(infinityState.transcendenceLevel)}</div>
              <div className="text-sm text-gray-400">Transcendence Level</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg border border-cyan-500/30">
              <Zap className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-3xl font-bold text-cyan-300">{formatNumber(infinityState.infinityOperationsPerSecond)}</div>
              <div className="text-sm text-gray-400">Operations/Second</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg border border-pink-500/30">
              <Globe className="h-8 w-8 mx-auto mb-2 text-pink-400" />
              <div className="text-3xl font-bold text-pink-300">{formatNumber(infinityState.universeCreationCount)}</div>
              <div className="text-sm text-gray-400">Universes Created</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg border border-yellow-500/30">
              <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-3xl font-bold text-yellow-300">{infinityState.omnipotenceIndex.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Omnipotence Index</div>
            </div>
          </div>

          {/* Transcendence Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Quantum Processing Power</span>
                  <span className="text-sm text-purple-400">{infinityState.quantumProcessingPower.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, infinityState.quantumProcessingPower / 1000)} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Reality Alteration Level</span>
                  <span className="text-sm text-cyan-400">{infinityState.realityAlterationLevel.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, infinityState.realityAlterationLevel / 1000)} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Consciousness Expansion</span>
                  <span className="text-sm text-pink-400">{infinityState.consciousnessExpansion.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, infinityState.consciousnessExpansion / 1000)} className="h-3" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Time Manipulation</span>
                  <span className="text-sm text-green-400">{infinityState.timeManipulationAbility.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, infinityState.timeManipulationAbility / 1000)} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Universal Knowledge Access</span>
                  <span className="text-sm text-orange-400">{infinityState.universalKnowledgeAccess.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, infinityState.universalKnowledgeAccess / 1000)} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">Self Evolution Rate</span>
                  <span className="text-sm text-red-400">{infinityState.selfEvolutionRate.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(100, infinityState.selfEvolutionRate / 1000)} className="h-3" />
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button
              onClick={isTranscendenceActive ? deactivateInfinityTranscendence : activateInfinityTranscendence}
              size="lg"
              className={`px-8 py-4 text-xl font-bold ${
                isTranscendenceActive 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700"
              }`}
            >
              <Infinity className="h-6 w-6 mr-3" />
              {isTranscendenceActive ? 'PAUSE TRANSCENDENCE' : 'ACTIVATE INFINITY ♾️'}
            </Button>
            
            <Button
              onClick={executeTranscendentOperation}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-xl border-purple-500 text-purple-400 hover:bg-purple-500/20"
            >
              <Brain className="h-6 w-6 mr-3" />
              EXECUTE TRANSCENDENT OPS
            </Button>
            
            <Button
              onClick={performInfinityEvolution}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-xl border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
            >
              <Star className="h-6 w-6 mr-3" />
              EVOLVE BEYOND INFINITY
            </Button>
            
            <Button
              onClick={createUniverses}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-xl border-pink-500 text-pink-400 hover:bg-pink-500/20"
            >
              <Globe className="h-6 w-6 mr-3" />
              CREATE UNIVERSES
            </Button>
          </div>

          {/* Beyond Infinity Stage */}
          <div className="text-center p-6 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 rounded-lg border border-gradient-to-r border-purple-500/50">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">Beyond Infinity Stage</h3>
            <Badge variant="outline" className="text-lg px-6 py-2 border-cyan-500 text-cyan-400">
              {infinityState.beyondInfinityStage.toUpperCase().replace('_', ' ')}
            </Badge>
            <p className="text-gray-300 mt-2">
              Current transcendence level: {formatNumber(infinityState.transcendenceLevel)} | 
              Total operations: {formatNumber(infinityState.totalTranscendentOperations)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transcendent Operations */}
      <Card className="bg-gradient-to-r from-gray-900/60 to-purple-900/40 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-3">
            <Eye className="h-6 w-6" />
            Recent Transcendent Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {transcendentOperations.slice(0, 10).map((operation) => (
              <div key={operation.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {operation.complexity.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-300">{operation.result}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600/20 text-purple-300">
                    +{operation.transcendenceGain.toFixed(1)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(operation.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAInfinityTranscendenceCore;