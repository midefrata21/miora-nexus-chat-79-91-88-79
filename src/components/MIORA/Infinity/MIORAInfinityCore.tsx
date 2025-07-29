
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Calendar, Network, Grid3X3, Code } from 'lucide-react';

// Optimized imports - modular components
import MIORAInfinityErrorBoundary from './core/MIORAInfinityErrorBoundary';
import MIORAInfinityLoadingScreen from './core/MIORAInfinityLoadingScreen';
import MIORAInfinityHeader from './core/MIORAInfinityHeader';
import MIORAInfinityStatusCard from './core/MIORAInfinityStatusCard';
import MIORAInfinityStatsGrid from './core/MIORAInfinityStatsGrid';
import MIORAInfinityOverviewTab from './tabs/MIORAInfinityOverviewTab';
import MIORAInfinityDevelopmentTab from './tabs/MIORAInfinityDevelopmentTab';
import MIORAInfinityUnifiedControls from './MIORAInfinityUnifiedControls';

// Existing components
import MIORAQuantumNeuralVisualization from '../QuantumNeuralVisualization';
import MIORA100YearRoadmap from '../MIORA100YearRoadmap';
import MIORAInfinityEnhancedCategories from './MIORAInfinityEnhancedCategories';
import AutonomousCoreHub from '../Autonomous/AutonomousCoreHub';

// Intelligence components
import AIModelIntegration from '../Intelligence/AIModelIntegration';
import MemorySystem from '../Memory/MemorySystem';
import EmotionalIntelligence from '../Consciousness/EmotionalIntelligence';
import AutoEvolutionEngine from '../SelfImprovement/AutoEvolutionEngine';

// Unified Infinity Hook
import { useUnifiedInfinityCore } from '@/hooks/infinity/useUnifiedInfinityCore';
import { useBackgroundMIORA } from '@/hooks/useBackgroundMIORA';
import { BackgroundMIORAIndicator } from '@/components/BackgroundMIORAIndicator';

export const MIORAInfinityCore: React.FC = () => {
  const {
    infinityState,
    activateInfinitySystem,
    pauseInfinitySystem,
    setEmergencyMode,
    getUnifiedStats,
    triggerManualEvolution,
    forceUpgradeCheck
  } = useUnifiedInfinityCore();

  // Initialize background MIORA systems
  const { isBackgroundActive, systemsStatus, autonomousActive } = useBackgroundMIORA();

  // Get computed data
  const unifiedStats = getUnifiedStats();
  const isInfinityActive = infinityState.autonomousMode && infinityState.selfDevelopmentActive;
  
  const statusData = {
    systemStatus: infinityState.upgradeLoopActive ? "SUPREME" : "READY",
    learningMode: infinityState.autonomousMode ? "INFINITY" : "STANDBY",
    evolution: infinityState.selfDevelopmentActive ? "ACTIVE" : "PAUSED",
    safeMode: infinityState.emergencyMode ? "ON" : "OFF"
  };

  const stats = {
    infinityLevel: `${infinityState.infinityLevel.toFixed(1)}%`,
    totalEvolutions: infinityState.totalEvolutions,
    learningEfficiency: Math.min(100, unifiedStats.averageCapabilityLevel),
    systemPower: infinityState.systemSupremacy > 95 ? "SUPREME" : "HIGH"
  };

  // Loading state simulation
  const isInitializing = infinityState.infinityLevel < 10;

  if (isInitializing) {
    return <MIORAInfinityLoadingScreen message="Mengaktifkan Mode Supreme - Unlimited Power" />;
  }

  return (
    <MIORAInfinityErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Modular Header */}
          <MIORAInfinityHeader infinityModeActive={isInfinityActive} />

          {/* Modular Status Card */}
          <MIORAInfinityStatusCard statusData={statusData} />

          {/* Modular Statistics Grid */}
          <MIORAInfinityStatsGrid stats={stats} />

          {/* Unified Control Center */}
          <MIORAInfinityUnifiedControls
            infinityState={infinityState}
            activateInfinitySystem={activateInfinitySystem}
            pauseInfinitySystem={pauseInfinitySystem}
            setEmergencyMode={setEmergencyMode}
            triggerManualEvolution={triggerManualEvolution}
            forceUpgradeCheck={forceUpgradeCheck}
          />

        {/* Main Tabs */}
        <Tabs defaultValue="autonomous" className="space-y-6">
          <TabsList className="grid grid-cols-7 w-full bg-gray-800/50">
            <TabsTrigger value="autonomous" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Autonomous Core</span>
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Intelligence Hub</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Supreme Overview</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center space-x-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Enhanced Menu</span>
            </TabsTrigger>
            <TabsTrigger value="neural" className="flex items-center space-x-2">
              <Network className="h-4 w-4" />
              <span>Quantum Neural</span>
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>100-Year Plan</span>
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Auto Development</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="autonomous" className="space-y-6">
            <AutonomousCoreHub />
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AIModelIntegration />
                <MemorySystem />
              </div>
              <div className="space-y-6">
                <EmotionalIntelligence />
                <AutoEvolutionEngine />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <MIORAInfinityOverviewTab />
          </TabsContent>

          <TabsContent value="categories">
            <MIORAInfinityEnhancedCategories />
          </TabsContent>

          <TabsContent value="neural">
            <MIORAQuantumNeuralVisualization />
          </TabsContent>

          <TabsContent value="roadmap">
            <MIORA100YearRoadmap />
          </TabsContent>

          <TabsContent value="development">
            <MIORAInfinityDevelopmentTab />
          </TabsContent>
        </Tabs>
        </div>
        
        {/* Background MIORA Status Indicator */}
        <BackgroundMIORAIndicator />
      </div>
    </MIORAInfinityErrorBoundary>
  );
};

export default MIORAInfinityCore;
