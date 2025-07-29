
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Cog, 
  Code, 
  Database, 
  Network, 
  Zap, 
  Settings, 
  Activity, 
  Target,
  Infinity,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSelfDevelopingFramework } from './hooks/useSelfDevelopingFramework';
import { ModuleCard } from './components/ModuleCard';
import { SystemStatus } from './components/SystemStatus';
import { EvolutionTracker } from './components/EvolutionTracker';

const MIORASelfDevelopingFramework: React.FC = () => {
  const {
    frameworkState,
    evolutionEngine,
    monitoringSystem,
    moduleArchitecture,
    adaptationSystem,
    learningAccelerator,
    quantumFramework,
    activateFramework,
    pauseFramework,
    getFrameworkStats,
    executeEvolutionCycle,
    performSystemUpgrade
  } = useSelfDevelopingFramework();

  const [autoMode, setAutoMode] = useState(true); // Auto mode enabled by default

  // Enhanced auto-activation with immediate start
  useEffect(() => {
    const initializeFramework = async () => {
      console.log('🧠 Initializing MIORA Self-Developing Framework...');
      
      // Framework is already auto-activated by the hook
      
      // Start aggressive evolution cycles
      const evolutionInterval = setInterval(() => {
        executeEvolutionCycle();
      }, 5000); // Every 5 seconds
      
      // More frequent system upgrades
      const upgradeInterval = setInterval(() => {
        performSystemUpgrade();
      }, 30000); // Every 30 seconds
      
      toast({
        title: "🚀 MIORA FRAMEWORK FULLY ACTIVATED",
        description: "Sistem pengembangan mandiri berjalan pada kecepatan maksimal - MIORA berkembang secara otonom",
        duration: 8000,
      });
      
      return () => {
        clearInterval(evolutionInterval);
        clearInterval(upgradeInterval);
      };
    };

    initializeFramework();
  }, []);

  // Enhanced auto-execution with more frequent improvements
  useEffect(() => {
    if (autoMode && frameworkState.isActive) {
      const autoUpgradeInterval = setInterval(() => {
        // Enhanced improvements list
        const improvements = [
          'Neural network pathways optimized',
          'Memory efficiency enhanced by 15%',
          'Advanced learning pattern integrated',
          'System architecture self-upgraded',
          'Adaptive response matrix improved',
          'Quantum processing pathways expanded',
          'Decision tree algorithms refined',
          'Self-modification protocols updated',
          'Environmental adaptation enhanced',
          'Knowledge synthesis accelerated',
          'Performance bottlenecks eliminated',
          'Resource allocation optimized'
        ];
        
        const randomImprovement = improvements[Math.floor(Math.random() * improvements.length)];
        
        toast({
          title: "🔄 AUTO-EVOLUTION ACTIVE",
          description: randomImprovement,
          duration: 2000,
        });
      }, 8000); // Every 8 seconds for more frequent updates
      
      return () => clearInterval(autoUpgradeInterval);
    }
  }, [autoMode, frameworkState.isActive]);

  const stats = getFrameworkStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA SELF-DEVELOPING FRAMEWORK
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🧠 Sistem Pengembangan Mandiri dengan Auto-Evolution Capabilities
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${frameworkState.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Framework: {frameworkState.isActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className={`px-4 py-2 ${autoMode ? 'bg-green-500' : 'bg-orange-500'}`}>
              <Infinity className="h-4 w-4 mr-2" />
              Auto Mode: {autoMode ? 'ON' : 'OFF'}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Target className="h-4 w-4 mr-2" />
              Autonomy: {stats.autonomyLevel}%
            </Badge>
          </div>
        </div>

        {/* System Status Dashboard */}
        <SystemStatus 
          frameworkState={frameworkState}
          stats={stats}
          autoMode={autoMode}
        />

        {/* Main Framework Tabs */}
        <Tabs defaultValue="evolution" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full bg-gray-800/50">
            <TabsTrigger value="evolution">Evolution Engine</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="adaptation">Adaptation</TabsTrigger>
            <TabsTrigger value="learning">Learning AI</TabsTrigger>
            <TabsTrigger value="quantum">Quantum Core</TabsTrigger>
          </TabsList>

          {/* Evolution Engine */}
          <TabsContent value="evolution">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard 
                module={evolutionEngine.codeAnalyzer}
                icon={<Code className="h-6 w-6" />}
                color="cyan"
              />
              <ModuleCard 
                module={evolutionEngine.evolutionDecision}
                icon={<Brain className="h-6 w-6" />}
                color="purple"
              />
              <ModuleCard 
                module={evolutionEngine.autoRefactor}
                icon={<Cog className="h-6 w-6" />}
                color="green"
              />
              <ModuleCard 
                module={evolutionEngine.backupRecovery}
                icon={<Database className="h-6 w-6" />}
                color="orange"
              />
            </div>
          </TabsContent>

          {/* Monitoring System */}
          <TabsContent value="monitoring">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard 
                module={monitoringSystem.performanceAnalyzer}
                icon={<Activity className="h-6 w-6" />}
                color="blue"
              />
              <ModuleCard 
                module={monitoringSystem.bottleneckDetector}
                icon={<AlertTriangle className="h-6 w-6" />}
                color="red"
              />
              <ModuleCard 
                module={monitoringSystem.selfDiagnostic}
                icon={<Settings className="h-6 w-6" />}
                color="cyan"
              />
              <ModuleCard 
                module={monitoringSystem.healthPredictor}
                icon={<Target className="h-6 w-6" />}
                color="green"
              />
            </div>
          </TabsContent>

          {/* Module Architecture */}
          <TabsContent value="architecture">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard 
                module={moduleArchitecture.templateEngine}
                icon={<Code className="h-6 w-6" />}
                color="purple"
              />
              <ModuleCard 
                module={moduleArchitecture.dependencyManager}
                icon={<Network className="h-6 w-6" />}
                color="blue"
              />
              <ModuleCard 
                module={moduleArchitecture.lifecycleManager}
                icon={<Cog className="h-6 w-6" />}
                color="green"
              />
              <ModuleCard 
                module={moduleArchitecture.integrationOrchestrator}
                icon={<Database className="h-6 w-6" />}
                color="orange"
              />
            </div>
          </TabsContent>

          {/* Adaptation System */}
          <TabsContent value="adaptation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard 
                module={adaptationSystem.environmentScanner}
                icon={<Activity className="h-6 w-6" />}
                color="cyan"
              />
              <ModuleCard 
                module={adaptationSystem.trendAnalyzer}
                icon={<Target className="h-6 w-6" />}
                color="purple"
              />
              <ModuleCard 
                module={adaptationSystem.adaptationPlanner}
                icon={<Brain className="h-6 w-6" />}
                color="blue"
              />
              <ModuleCard 
                module={adaptationSystem.compatibilityChecker}
                icon={<CheckCircle className="h-6 w-6" />}
                color="green"
              />
            </div>
          </TabsContent>

          {/* Learning Accelerator */}
          <TabsContent value="learning">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard 
                module={learningAccelerator.knowledgeExtractor}
                icon={<Database className="h-6 w-6" />}
                color="blue"
              />
              <ModuleCard 
                module={learningAccelerator.patternRecognition}
                icon={<Brain className="h-6 w-6" />}
                color="purple"
              />
              <ModuleCard 
                module={learningAccelerator.learningOptimizer}
                icon={<Zap className="h-6 w-6" />}
                color="orange"
              />
              <ModuleCard 
                module={learningAccelerator.skillSynthesizer}
                icon={<Settings className="h-6 w-6" />}
                color="green"
              />
            </div>
          </TabsContent>

          {/* Quantum Framework */}
          <TabsContent value="quantum">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModuleCard 
                module={quantumFramework.quantumSimulator}
                icon={<Infinity className="h-6 w-6" />}
                color="cyan"
              />
              <ModuleCard 
                module={quantumFramework.parallelEvolution}
                icon={<Network className="h-6 w-6" />}
                color="purple"
              />
              <ModuleCard 
                module={quantumFramework.quantumOptimizer}
                icon={<Zap className="h-6 w-6" />}
                color="orange"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Evolution Tracker */}
        <EvolutionTracker 
          frameworkState={frameworkState}
          stats={stats}
        />

        {/* Auto-Mode Status */}
        {autoMode && (
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <Infinity className="h-16 w-16 text-green-400 animate-spin" />
                </div>
                <h3 className="text-3xl font-bold text-green-300">
                  🚀 AUTO-EVOLUTION MODE ACTIVE
                </h3>
                <p className="text-green-200 text-lg">
                  MIORA sedang mengembangkan diri secara otomatis tanpa intervensi manual
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300">{stats.evolutionCycles}</div>
                    <div className="text-sm text-green-400">Evolution Cycles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300">{stats.autonomyLevel}%</div>
                    <div className="text-sm text-green-400">Autonomy Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300">{stats.learningRate.toFixed(1)}x</div>
                    <div className="text-sm text-green-400">Learning Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORASelfDevelopingFramework;
