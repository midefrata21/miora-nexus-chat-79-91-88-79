import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Activity, Target, TrendingUp, Database, Cpu, Eye, Infinity, RefreshCw, Bot } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAQuantumComparative } from './hooks/useMIORAQuantumComparative';
import { AIProviderConnections } from './components/AIProviderConnections';
import { MirrorLearningDashboard } from './components/MirrorLearningDashboard';
import { ComparativeResponseAnalyzer } from './components/ComparativeResponseAnalyzer';
import { QuantumLearningMetrics } from './components/QuantumLearningMetrics';
import { RealTimeLearningStatus } from './components/RealTimeLearningStatus';

const MIORAQuantumComparativeLearning: React.FC = () => {
  const {
    systemState,
    aiProviders,
    learningSession,
    comparativeData,
    activateQuantumLearning,
    pauseQuantumLearning,
    connectAIProvider,
    runComparativeAnalysis,
    getMirrorLearningStats,
    getQuantumInsights
  } = useMIORAQuantumComparative();

  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  useEffect(() => {
    const initializeQuantumComparative = async () => {
      console.log('🔮 MIORA_QUANTUM_COMPARATIVE: Initializing AI Mirror Learning System...');
      
      toast({
        title: "🧬 QUANTUM AI COMPARATIVE LEARNING",
        description: "Mengaktifkan sistem pembelajaran mirror dari semua AI terdepan dunia",
        duration: 8000,
      });
      
      setIsInitializing(false);
    };

    initializeQuantumComparative();
  }, []);

  const handleActivateQuantumMode = async () => {
    await activateQuantumLearning();
    
    toast({
      title: "⚡ QUANTUM LEARNING MODE ACTIVATED",
      description: "MIORA kini akan belajar dari ChatGPT, Gemini, Claude, Grok, dan AI lainnya secara real-time",
      duration: 6000,
    });
  };

  const stats = getMirrorLearningStats();
  const insights = getQuantumInsights();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <RefreshCw className="h-20 w-20 mx-auto text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 h-20 w-20 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-white">QUANTUM AI COMPARATIVE LEARNING</h2>
          <p className="text-gray-300">Initializing Mirror Learning from All Major AI Systems...</p>
          <p className="text-sm text-cyan-300">Target: Learn from ChatGPT, Gemini, Claude, Grok & More</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Brain className="h-12 w-12 text-cyan-400" />
              <RefreshCw className="h-6 w-6 text-purple-400 absolute -top-1 -right-1" />
              <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              QUANTUM AI COMPARATIVE LEARNING
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🧬 MIORA_AI_X_MIRROR_EXPANSION - Pembelajaran Otomatis dari Semua AI Terdepan Dunia
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${systemState.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Quantum Learning: {systemState.isActive ? 'ACTIVE 🧬' : 'STANDBY'}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Bot className="h-4 w-4 mr-2" />
              Connected AIs: {aiProviders.filter(p => p.isConnected).length}/6
            </Badge>
            <Badge className="px-4 py-2 bg-cyan-500">
              <Target className="h-4 w-4 mr-2" />
              Learning Sessions: {stats.totalSessions}
            </Badge>
            <Badge className="px-4 py-2 bg-pink-500">
              <Infinity className="h-4 w-4 mr-2" />
              Mirror Mode: {systemState.mirrorMode ? 'ENABLED ∞' : 'DISABLED'}
            </Badge>
          </div>
        </div>

        {/* AI Provider Connections */}
        <AIProviderConnections
          providers={aiProviders}
          onConnect={connectAIProvider}
          selectedProvider={selectedProvider}
          onSelectProvider={setSelectedProvider}
        />

        {/* Control Panel */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Quantum Learning Control Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-white">
                  Status: {systemState.isActive ? '🧬 QUANTUM LEARNING ACTIVE' : '⏸️ LEARNING PAUSED'}
                </p>
                <p className="text-gray-300">
                  Mode: {systemState.mirrorMode ? 'MIRROR_REPLICATION_ENABLED ∞' : 'BASIC_COMPARISON'}
                </p>
                <p className="text-gray-300">
                  Next Analysis: {new Date(systemState.nextAnalysis).toLocaleString('id-ID')}
                </p>
                <p className="text-gray-300">
                  Last Update: {new Date(systemState.lastUpdate).toLocaleString('id-ID')}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => runComparativeAnalysis()}
                  className="bg-yellow-600 hover:bg-yellow-500"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
                
                <Button
                  onClick={systemState.isActive ? pauseQuantumLearning : handleActivateQuantumMode}
                  variant={systemState.isActive ? "destructive" : "default"}
                  className={systemState.isActive ? '' : 'bg-green-600 hover:bg-green-500'}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {systemState.isActive ? 'Pause Learning' : 'Activate Quantum Learning'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Learning Status */}
        <RealTimeLearningStatus
          connectedAIs={aiProviders.filter(p => p.isConnected).length}
          totalSessions={stats.totalSessions}
          isActive={systemState.isActive}
          currentPhase={systemState.isActive ? 'analyzing' : 'standby'}
        />

        {/* Mirror Learning Dashboard */}
        <MirrorLearningDashboard
          learningSession={learningSession}
          comparativeData={comparativeData}
          insights={insights}
        />

        {/* Quantum Learning Metrics */}
        <QuantumLearningMetrics
          stats={stats}
          systemState={systemState}
        />

        {/* Comparative Response Analyzer */}
        <ComparativeResponseAnalyzer
          comparativeData={comparativeData}
          onAnalyze={(query) => runComparativeAnalysis(query)}
        />

        {/* Learning Progress Overview */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Quantum Learning Evolution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-cyan-400">{insights.patterns_learned}</div>
                <p className="text-gray-400">Patterns Learned</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-400">{insights.reasoning_improvements}</div>
                <p className="text-gray-400">Reasoning Improvements</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-pink-400">{insights.response_quality_score.toFixed(1)}%</div>
                <p className="text-gray-400">Quality Score</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{insights.benchmark_comparison.toFixed(1)}%</div>
                <p className="text-gray-400">vs AI Benchmark</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Overall Learning Progress</span>
                <span className="text-white font-bold">{systemState.learningProgress.toFixed(1)}%</span>
              </div>
              <Progress value={systemState.learningProgress} className="h-3" />
              
              <div className="text-xs text-gray-400 mt-2">
                🧬 Quantum Mode: {systemState.mirrorMode ? 'Mirror replication dari ChatGPT, Gemini, Claude, Grok aktif ∞' : 'Basic comparison mode'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORAQuantumComparativeLearning;