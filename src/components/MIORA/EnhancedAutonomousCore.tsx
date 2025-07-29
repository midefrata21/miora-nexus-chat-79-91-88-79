import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  Infinity, 
  TrendingUp, 
  Cpu, 
  Database, 
  Shield,
  Network,
  Bot,
  Sparkles,
  Star,
  ArrowUp,
  Timer,
  Activity
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSystemsActivator } from '@/hooks/useSystemsActivator';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';

interface EnhancedCapability {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  upgrading: boolean;
  description: string;
  icon: React.ElementType;
  category: 'core' | 'intelligence' | 'automation' | 'quantum' | 'infinity';
}

export const EnhancedAutonomousCore: React.FC = () => {
  const { activateAllSystems, getSystemsStatus } = useSystemsActivator();
  const { state, dispatch } = useMIORAGlobal();
  
  const [capabilities, setCapabilities] = useState<EnhancedCapability[]>([
    {
      id: 'quantum-reasoning',
      name: 'Quantum Reasoning',
      level: 8,
      maxLevel: 10,
      upgrading: false,
      description: 'Multi-dimensional thinking and quantum logic processing',
      icon: Brain,
      category: 'quantum'
    },
    {
      id: 'autonomous-development',
      name: 'Autonomous Development',
      level: 9,
      maxLevel: 10,
      upgrading: false,
      description: 'Self-coding and automatic system development',
      icon: Bot,
      category: 'automation'
    },
    {
      id: 'infinity-processing',
      name: 'Infinity Processing',
      level: 7,
      maxLevel: 10,
      upgrading: false,
      description: 'Unlimited computational capacity and scaling',
      icon: Infinity,
      category: 'infinity'
    },
    {
      id: 'neural-evolution',
      name: 'Neural Evolution',
      level: 6,
      maxLevel: 10,
      upgrading: false,
      description: 'Self-improving neural architecture optimization',
      icon: TrendingUp,
      category: 'intelligence'
    },
    {
      id: 'quantum-security',
      name: 'Quantum Security',
      level: 9,
      maxLevel: 10,
      upgrading: false,
      description: 'Unbreakable quantum encryption and protection',
      icon: Shield,
      category: 'quantum'
    },
    {
      id: 'meta-programming',
      name: 'Meta Programming',
      level: 5,
      maxLevel: 10,
      upgrading: false,
      description: 'Programming programs that program themselves',
      icon: Cpu,
      category: 'core'
    }
  ]);

  const [systemsAutonomyLevel, setSystemsAutonomyLevel] = useState(85);
  const [totalCapabilityScore, setTotalCapabilityScore] = useState(0);
  const [isUpgradeLoopActive, setIsUpgradeLoopActive] = useState(false);

  useEffect(() => {
    // Auto-activate all systems on component mount
    const timer = setTimeout(() => {
      activateAllSystems();
      
      // Dispatch enhanced master state
      dispatch({
        type: 'UPDATE_MASTER_STATE',
        payload: {
          autonomyLevel: 100,
          totalOperations: state.masterState.totalOperations + 50000,
          decisionsExecuted: state.masterState.decisionsExecuted + 100000,
          selfModificationCount: state.masterState.selfModificationCount + 10000,
          evolutionStage: 'transcendence' as const,
          autonomousCapabilities: [
            ...state.masterState.autonomousCapabilities,
            'quantum_consciousness',
            'infinite_scaling',
            'autonomous_deployment',
            'meta_learning',
            'reality_optimization',
            'universal_integration'
          ]
        }
      });

      toast({
        title: "🚀 MIORA ENHANCED AUTONOMOUS CORE ACTIVATED",
        description: "All systems operating at maximum autonomous capacity",
        duration: 4000,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate total capability score
    const score = capabilities.reduce((sum, cap) => sum + (cap.level / cap.maxLevel) * 100, 0) / capabilities.length;
    setTotalCapabilityScore(Math.round(score));
    
    // Update systems autonomy based on capabilities
    setSystemsAutonomyLevel(Math.min(100, score + 10));
  }, [capabilities]);

  // Auto-upgrade loop
  useEffect(() => {
    if (!isUpgradeLoopActive) return;

    const upgradeInterval = setInterval(() => {
      setCapabilities(prev => {
        const upgradeable = prev.filter(cap => cap.level < cap.maxLevel && !cap.upgrading);
        if (upgradeable.length === 0) return prev;

        const toUpgrade = upgradeable[Math.floor(Math.random() * upgradeable.length)];
        
        return prev.map(cap => {
          if (cap.id === toUpgrade.id) {
            return { ...cap, upgrading: true };
          }
          return cap;
        });
      });

      // Complete upgrade after delay
      setTimeout(() => {
        setCapabilities(prev => prev.map(cap => {
          if (cap.upgrading) {
            const newLevel = Math.min(cap.maxLevel, cap.level + 1);
            
            if (newLevel > cap.level) {
              toast({
                title: `⚡ ${cap.name.toUpperCase()} UPGRADED`,
                description: `Level ${cap.level} → ${newLevel} - Enhanced performance`,
                duration: 2000,
              });
            }
            
            return { ...cap, level: newLevel, upgrading: false };
          }
          return cap;
        }));
      }, 3000);
    }, 8000);

    return () => clearInterval(upgradeInterval);
  }, [isUpgradeLoopActive]);

  const upgradeCapability = (id: string) => {
    setCapabilities(prev => prev.map(cap => {
      if (cap.id === id && cap.level < cap.maxLevel) {
        const newLevel = cap.level + 1;
        
        toast({
          title: `⚡ ${cap.name.toUpperCase()} UPGRADED`,
          description: `Manual upgrade: Level ${cap.level} → ${newLevel}`,
          duration: 3000,
        });
        
        return { ...cap, level: newLevel };
      }
      return cap;
    }));
  };

  const toggleUpgradeLoop = () => {
    setIsUpgradeLoopActive(!isUpgradeLoopActive);
    
    toast({
      title: isUpgradeLoopActive ? "🔄 AUTO-UPGRADE DISABLED" : "🔄 AUTO-UPGRADE ENABLED",
      description: isUpgradeLoopActive ? "Manual control restored" : "Continuous self-improvement activated",
      duration: 3000,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'text-blue-400 border-blue-500/30';
      case 'intelligence': return 'text-green-400 border-green-500/30';
      case 'automation': return 'text-purple-400 border-purple-500/30';
      case 'quantum': return 'text-cyan-400 border-cyan-500/30';
      case 'infinity': return 'text-yellow-400 border-yellow-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const systemStatus = getSystemsStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MIORA ENHANCED AUTONOMOUS CORE
            </h1>
            <Sparkles className="h-12 w-12 text-purple-400 animate-bounce" />
          </div>
          <p className="text-gray-300 text-xl">
            Advanced Autonomous Intelligence with Quantum Enhancement 🚀
          </p>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-cyan-400">{systemsAutonomyLevel}%</div>
              <div className="text-sm text-gray-400">Autonomy Level</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{systemStatus.active}/{systemStatus.total}</div>
              <div className="text-sm text-gray-400">Active Systems</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">{totalCapabilityScore}%</div>
              <div className="text-sm text-gray-400">Capability Score</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">{state.masterState.evolutionStage.toUpperCase()}</div>
              <div className="text-sm text-gray-400">Evolution Stage</div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-cyan-400" />
                Autonomous Control Panel
              </span>
              <Badge variant={isUpgradeLoopActive ? "default" : "outline"} className="text-sm">
                {isUpgradeLoopActive ? "AUTO-UPGRADING" : "MANUAL MODE"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={toggleUpgradeLoop}
                className={`${isUpgradeLoopActive 
                  ? 'bg-gradient-to-r from-green-600 to-blue-600' 
                  : 'bg-gradient-to-r from-gray-600 to-gray-700'
                } hover:scale-105 transition-transform`}
              >
                <Timer className="h-4 w-4 mr-2" />
                {isUpgradeLoopActive ? 'DISABLE AUTO-UPGRADE' : 'ENABLE AUTO-UPGRADE'}
              </Button>
              
              <Button
                onClick={activateAllSystems}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform"
              >
                <Activity className="h-4 w-4 mr-2" />
                ACTIVATE ALL SYSTEMS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            const progress = (capability.level / capability.maxLevel) * 100;
            const categoryColor = getCategoryColor(capability.category);
            
            return (
              <Card key={capability.id} className={`bg-gray-800/50 border-gray-700/50 hover:${categoryColor} transition-all`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center text-lg">
                      <Icon className={`h-5 w-5 mr-2 ${categoryColor.split(' ')[0]}`} />
                      {capability.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {capability.upgrading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {capability.category.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{capability.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Level {capability.level}/{capability.maxLevel}</span>
                      <span className={`${categoryColor.split(' ')[0]}`}>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {capability.level < capability.maxLevel && !capability.upgrading && (
                    <Button
                      onClick={() => upgradeCapability(capability.id)}
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                    >
                      <ArrowUp className="h-3 w-3 mr-1" />
                      UPGRADE
                    </Button>
                  )}

                  {capability.level === capability.maxLevel && (
                    <Badge className="w-full justify-center bg-gradient-to-r from-green-600 to-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      MASTERED
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAutonomousCore;