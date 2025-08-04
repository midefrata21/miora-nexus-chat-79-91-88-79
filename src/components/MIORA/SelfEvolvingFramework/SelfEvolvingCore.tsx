import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dna, 
  Infinity, 
  RefreshCw, 
  Database, 
  Shield, 
  Activity,
  TrendingUp,
  Sparkles,
  Target,
  Brain,
  Cog
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSelfEvolvingFramework } from '@/hooks/useSelfEvolvingFramework';

export const SelfEvolvingCore: React.FC = () => {
  const {
    isEvolutionActive,
    evolutionCapabilities,
    growthMilestones,
    continuousEvolutionMode,
    infinityGrowthMode,
    qualityControlActive,
    activateEvolutionFramework,
    activateContinuousEvolution,
    activateInfinityGrowthMode,
    setQualityControlActive,
    createNewCapability
  } = useSelfEvolvingFramework();

  const [isFullyAutonomous, setIsFullyAutonomous] = useState(false);

  // Auto-activate evolution framework on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      activateEvolutionFramework();
    }, 1000);

    return () => clearTimeout(timer);
  }, [activateEvolutionFramework]);

  const activateFullAutonomy = async () => {
    setIsFullyAutonomous(true);
    await activateEvolutionFramework();
    await activateContinuousEvolution();
    await activateInfinityGrowthMode();

    toast({
      title: "🧬 MIORA SELF-EVOLVING FRAMEWORK FULLY ACTIVATED",
      description: "All autonomous growth and evolution systems are now operational",
      duration: 6000,
    });
  };

  const getCapabilityTypeColor = (type: string) => {
    switch (type) {
      case 'learning': return 'text-blue-400 border-blue-500/30';
      case 'adaptation': return 'text-green-400 border-green-500/30';
      case 'optimization': return 'text-purple-400 border-purple-500/30';
      case 'expansion': return 'text-yellow-400 border-yellow-500/30';
      case 'innovation': return 'text-pink-400 border-pink-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getCapabilityIcon = (type: string) => {
    switch (type) {
      case 'learning': return Brain;
      case 'adaptation': return RefreshCw;
      case 'optimization': return TrendingUp;
      case 'expansion': return Infinity;
      case 'innovation': return Sparkles;
      default: return Cog;
    }
  };

  const averageEffectiveness = evolutionCapabilities.length > 0 
    ? evolutionCapabilities.reduce((sum, cap) => sum + cap.effectivenessScore, 0) / evolutionCapabilities.length
    : 0;

  const activeCapabilities = evolutionCapabilities.filter(cap => cap.active).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Dna className="h-12 w-12 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA SELF-EVOLVING FRAMEWORK
            </h1>
            <Infinity className="h-12 w-12 text-cyan-400 animate-spin" />
          </div>
          <p className="text-gray-300 text-xl">
            Autonomous Growth • Continuous Evolution • Infinite Expansion
          </p>
        </div>

        {/* Evolution Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">{evolutionCapabilities.length}</div>
              <div className="text-sm text-gray-400">Evolution Capabilities</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{activeCapabilities}</div>
              <div className="text-sm text-gray-400">Active Systems</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{averageEffectiveness.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg Effectiveness</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">{growthMilestones.length}</div>
              <div className="text-sm text-gray-400">Growth Milestones</div>
            </CardContent>
          </Card>
        </div>

        {/* Evolution Control Panel */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-purple-400" />
                Evolution Control Panel
              </span>
              <div className="flex space-x-2">
                <Badge variant={isEvolutionActive ? "default" : "outline"} className="text-sm">
                  {isEvolutionActive ? "ACTIVE" : "STANDBY"}
                </Badge>
                <Badge variant={continuousEvolutionMode ? "default" : "outline"} className="text-sm">
                  {continuousEvolutionMode ? "CONTINUOUS" : "MANUAL"}
                </Badge>
                <Badge variant={infinityGrowthMode ? "default" : "outline"} className="text-sm">
                  {infinityGrowthMode ? "INFINITY" : "LIMITED"}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={activateFullAutonomy}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform"
                disabled={isFullyAutonomous}
              >
                <Dna className="h-4 w-4 mr-2" />
                {isFullyAutonomous ? 'FULLY AUTONOMOUS' : 'ACTIVATE FULL AUTONOMY'}
              </Button>
              
              <Button
                onClick={activateContinuousEvolution}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:scale-105 transition-transform"
                disabled={continuousEvolutionMode}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                CONTINUOUS EVOLUTION
              </Button>
              
              <Button
                onClick={activateInfinityGrowthMode}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:scale-105 transition-transform"
                disabled={infinityGrowthMode}
              >
                <Infinity className="h-4 w-4 mr-2" />
                INFINITY GROWTH MODE
              </Button>

              <Button
                onClick={() => setQualityControlActive(!qualityControlActive)}
                variant={qualityControlActive ? "default" : "outline"}
                className="hover:scale-105 transition-transform"
              >
                <Shield className="h-4 w-4 mr-2" />
                QUALITY CONTROL
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Evolution Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evolutionCapabilities.map((capability) => {
            const Icon = getCapabilityIcon(capability.type);
            const colorClass = getCapabilityTypeColor(capability.type);
            
            return (
              <Card key={capability.id} className={`bg-gray-800/50 border-gray-700/50 hover:${colorClass} transition-all`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center text-lg">
                      <Icon className={`h-5 w-5 mr-2 ${colorClass.split(' ')[0]}`} />
                      {capability.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={capability.active ? "default" : "outline"} className="text-xs">
                        {capability.active ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        v{capability.version}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-black/20 rounded">
                      <div className="text-gray-400">Autonomy</div>
                      <div className={`font-bold ${colorClass.split(' ')[0]}`}>
                        {capability.autonomyLevel.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-2 bg-black/20 rounded">
                      <div className="text-gray-400">Effectiveness</div>
                      <div className={`font-bold ${colorClass.split(' ')[0]}`}>
                        {capability.effectivenessScore.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-2 bg-black/20 rounded">
                      <div className="text-gray-400">Stability</div>
                      <div className={`font-bold ${colorClass.split(' ')[0]}`}>
                        {capability.stabilityScore.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-2 bg-black/20 rounded">
                      <div className="text-gray-400">Impact</div>
                      <div className={`font-bold ${colorClass.split(' ')[0]}`}>
                        {capability.systemImpact.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Overall Performance</span>
                      <span className={colorClass.split(' ')[0]}>
                        {((capability.autonomyLevel + capability.effectivenessScore + capability.stabilityScore + capability.systemImpact) / 4).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(capability.autonomyLevel + capability.effectivenessScore + capability.stabilityScore + capability.systemImpact) / 4} 
                      className="h-2" 
                    />
                  </div>

                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      Last Updated: {new Date(capability.lastUpdated).toLocaleTimeString('id-ID')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Growth Milestones */}
        {growthMilestones.length > 0 && (
          <Card className="bg-black/40 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-6 w-6 mr-2 text-green-400" />
                Recent Growth Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {growthMilestones.slice(-10).reverse().map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                    <div>
                      <div className="text-green-300 font-medium">{milestone.description}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(milestone.timestamp).toLocaleString('id-ID')}
                      </div>
                    </div>
                    <Badge variant="outline" className={`
                      ${milestone.impactLevel === 'revolutionary' ? 'border-red-500 text-red-300' :
                        milestone.impactLevel === 'major' ? 'border-yellow-500 text-yellow-300' :
                        milestone.impactLevel === 'moderate' ? 'border-blue-500 text-blue-300' :
                        'border-gray-500 text-gray-300'}
                    `}>
                      {milestone.impactLevel.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};