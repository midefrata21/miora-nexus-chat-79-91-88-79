
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAIComparison } from './hooks/useAIComparison';
import ComparisonTable from './components/ComparisonTable';
import PerformanceCharts from './components/PerformanceCharts';
import GapAnalysisDashboard from './components/GapAnalysisDashboard';
import EvolutionRoadmap from './components/EvolutionRoadmap';
import DetailedRecommendations from './components/DetailedRecommendations';
import RealTimeComparisonDashboard from './components/RealTimeComparisonDashboard';
import MetaAITranscendenceCard from './components/MetaAITranscendenceCard';
import { supabase } from '@/integrations/supabase/client';
import { Brain, Zap, Target, TrendingUp, BarChart3, Activity, Settings, Rocket, Play, Pause, Database, Cpu } from 'lucide-react';

const AIComparisonCore: React.FC = () => {
  const {
    comparisonData,
    mioraProgress,
    gapAnalysis,
    evolutionPlan,
    updateComparison,
    startAutoEvolution,
    executeQuickAction,
    executeMIORAQuantumUpgrades,
    getOverallProgress,
    isAnalyzing,
    autoExecutionActive,
    continuousEvolution,
    startAutoExecution,
    stopAutoExecution,
    autoEvolutionStats
  } = useAIComparison();

  const [activeTab, setActiveTab] = useState('realtime');
  const [mioraCapabilities, setMioraCapabilities] = useState<any[]>([]);
  const [mioraMetrics, setMioraMetrics] = useState<any[]>([]);

  // Load MIORA capabilities and metrics
  useEffect(() => {
    const loadMIORAData = async () => {
      try {
        const [capabilitiesRes, metricsRes] = await Promise.all([
          supabase.from('miora_capabilities').select('*').order('performance_level', { ascending: false }).limit(5),
          supabase.from('miora_system_metrics').select('*').order('timestamp', { ascending: false }).limit(5)
        ]);
        
        if (capabilitiesRes.data) setMioraCapabilities(capabilitiesRes.data);
        if (metricsRes.data) setMioraMetrics(metricsRes.data);
      } catch (error) {
        console.error('Error loading MIORA data:', error);
      }
    };

    loadMIORAData();
    updateComparison();

    // Set up real-time sync for MIORA updates
    const capabilitiesChannel = supabase.channel('miora_capabilities_ai_comparison')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'miora_capabilities' }, 
        () => loadMIORAData());
    
    const metricsChannel = supabase.channel('miora_metrics_ai_comparison')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'miora_system_metrics' }, 
        () => loadMIORAData());

    capabilitiesChannel.subscribe();
    metricsChannel.subscribe();

    return () => {
      supabase.removeChannel(capabilitiesChannel);
      supabase.removeChannel(metricsChannel);
    };
  }, [updateComparison]);

  const overallProgress = getOverallProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-cyan-400" />
              🌌 MIORA META-AI TRANSCENDENCE COMPARISON MATRIX
            </h1>
            <p className="text-gray-300 text-lg">
              MIORA Meta-AI Transcendent vs ChatGPT vs Gemini vs Claude vs Grok vs Perplexity
            </p>
            <p className="text-cyan-400 text-sm mt-2">
              ✨ Featuring Meta-AI Transcendence - Kemampuan unik yang tidak dimiliki AI lain
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={updateComparison}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Update Analysis'}
            </Button>
            <Button
              onClick={executeMIORAQuantumUpgrades}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Execute MIORA Quantum Upgrades ∞
            </Button>
            <Button
              onClick={autoExecutionActive ? stopAutoExecution : startAutoExecution}
              className={`${autoExecutionActive ? 
                'bg-gradient-to-r from-red-600 to-orange-600' : 
                'bg-gradient-to-r from-green-600 to-emerald-600'} text-white`}
            >
              <Rocket className="w-4 h-4 mr-2" />
              {autoExecutionActive ? 'Stop Auto-Execute' : 'Start Auto-Execute ∞'}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            🌌 MIORA Meta-AI Transcendent Evolution Progress - Mirror Learning Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {overallProgress.percentage}%
              </div>
              <Progress value={overallProgress.percentage} className="mb-2" />
              <p className="text-gray-300 text-sm">Overall AI Capability</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">
                {overallProgress.estimatedTimeToMatch}
              </div>
              <p className="text-gray-300 text-sm">Time to Match {overallProgress.topCompetitor}</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2 border-yellow-400 text-yellow-400">
                {overallProgress.currentLevel}
              </Badge>
              <p className="text-gray-300 text-sm mt-2">Current Development Level</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {autoEvolutionStats.totalExecutions}
              </div>
              <p className="text-gray-300 text-sm">Auto-Executions Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Execution Status */}
      {autoExecutionActive && (
        <Card className="mb-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-300">
                    🚀 AUTO-EXECUTION MODE ACTIVE
                  </h3>
                  <p className="text-green-200">
                    MIORA mengeksekusi rekomendasi secara otomatis setiap 10 detik
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  {autoEvolutionStats.totalExecutions}
                </div>
                <p className="text-green-300 text-sm">Total Executions</p>
                <div className="text-lg font-medium text-emerald-400 mt-1">
                  +{autoEvolutionStats.performanceGains.toFixed(1)}% Gains
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 bg-slate-800/50">
          <TabsTrigger value="realtime" className="data-[state=active]:bg-red-600">
            🔴 Real-Time
          </TabsTrigger>
          <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-cyan-600">
            Detailed Comparison
          </TabsTrigger>
          <TabsTrigger value="charts" className="data-[state=active]:bg-cyan-600">
            Performance Charts
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-cyan-600">
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="gaps" className="data-[state=active]:bg-cyan-600">
            Gap Analysis
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-cyan-600">
            Evolution Roadmap
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime">
          <RealTimeComparisonDashboard />
        </TabsContent>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Meta-AI Transcendence Showcase */}
            <MetaAITranscendenceCard />
            
            {/* MIORA Real-Time Capabilities */}
            <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    🔴 MIORA Real-Time Capabilities & Metrics
                  </div>
                  <Badge className="bg-green-600 text-white animate-pulse">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Active Capabilities */}
                  <div>
                    <h3 className="text-amber-300 font-medium mb-3 flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      Active System Capabilities
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {mioraCapabilities.map((capability, index) => (
                        <div key={capability.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <h4 className="text-amber-300 text-sm font-medium">{capability.name}</h4>
                            <p className="text-gray-400 text-xs">Version: {capability.version} | {capability.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-white">
                              {capability.performance_level.toFixed(1)}/10.0
                            </div>
                            <Badge className={capability.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}>
                              {capability.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {mioraCapabilities.length === 0 && (
                        <div className="text-center py-4 text-gray-400">
                          <Cpu className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Loading capabilities...</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Recent Metrics */}
                  <div>
                    <h3 className="text-amber-300 font-medium mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Latest System Metrics
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {mioraMetrics.map((metric, index) => (
                        <div key={metric.id} className="p-3 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-amber-300 text-sm font-medium">{metric.metric_type}</h4>
                            <div className="text-lg font-bold text-white">
                              {metric.value} {metric.unit}
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs">
                            {new Date(metric.timestamp).toLocaleString('id-ID')}
                          </p>
                        </div>
                      ))}
                      {mioraMetrics.length === 0 && (
                        <div className="text-center py-4 text-gray-400">
                          <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Loading metrics...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* System Integration Status */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-green-300 font-medium mb-1">
                        🔗 Full Supabase Integration Active
                      </h3>
                      <p className="text-gray-300 text-sm">
                        All MIORA systems synchronized with database in real-time
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">SYNCHRONIZED</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ComparisonTable data={comparisonData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-cyan-400" />
                    Quick Development Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gapAnalysis.quickActions.slice(0, 3).map((action) => (
                      <div key={action.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                        <div>
                          <h4 className="text-white text-sm font-medium">{action.title}</h4>
                          <p className="text-gray-400 text-xs">{action.duration}</p>
                        </div>
                        <Button
                          onClick={() => executeQuickAction(action.id)}
                          size="sm"
                          className="bg-gradient-to-r from-cyan-600 to-blue-600"
                        >
                          <Rocket className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-400" />
                    MIORA Competitive Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-lg">
                      <h4 className="text-cyan-400 font-medium mb-1">
                        🌌 Meta-AI Transcendence
                      </h4>
                      <p className="text-gray-300 text-sm">
                        FITUR EKSKLUSIF yang tidak dimiliki ChatGPT, Gemini, Claude, atau AI lain
                      </p>
                    </div>
                    <div className="p-3 bg-green-900/20 rounded-lg">
                      <h4 className="text-green-400 font-medium mb-1">
                        🧠 Autonomous Thinking: 94%
                      </h4>
                      <p className="text-gray-300 text-sm">
                        MELEBIHI Claude (87%) dan mendekati ChatGPT (91%)
                      </p>
                    </div>
                    <div className="p-3 bg-blue-900/20 rounded-lg">
                      <h4 className="text-blue-400 font-medium mb-1">
                        🎯 Multimodal Level 4
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Setara dengan ChatGPT dan Gemini
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <ComparisonTable data={comparisonData} detailed={true} />
        </TabsContent>

        <TabsContent value="charts">
          <PerformanceCharts data={comparisonData} />
        </TabsContent>

        <TabsContent value="recommendations">
          <DetailedRecommendations
            recommendations={gapAnalysis.detailedRecommendations}
            quickActions={gapAnalysis.quickActions}
            onExecuteQuickAction={executeQuickAction}
            autoExecutionActive={autoExecutionActive}
            onToggleAutoExecution={autoExecutionActive ? stopAutoExecution : startAutoExecution}
            executedActions={autoEvolutionStats.totalExecutions > 0 ? ['optimize-tokens', 'memory-cache'] : []}
          />
        </TabsContent>

        <TabsContent value="gaps">
          <GapAnalysisDashboard analysis={gapAnalysis} />
        </TabsContent>

        <TabsContent value="roadmap">
          <EvolutionRoadmap plan={evolutionPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIComparisonCore;
