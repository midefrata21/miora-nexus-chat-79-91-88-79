
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Activity, Target, TrendingUp, Database, Cpu, Eye, Infinity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQuantumRecoveryPlan } from './hooks/useQuantumRecoveryPlan';
import { TokenProcessingOptimizer } from './modules/TokenProcessingOptimizer';
import { ReasoningEnhancer } from './modules/ReasoningEnhancer';
import { MemoryAdaptationSystem } from './modules/MemoryAdaptationSystem';
import { MultimodalCapabilities } from './modules/MultimodalCapabilities';
import { AutonomousThinkingCore } from './modules/AutonomousThinkingCore';

const QuantumRecoveryCore: React.FC = () => {
  const {
    recoveryState,
    performanceGaps,
    systemModes,
    weeklyReports,
    activateQuantumRecovery,
    pauseQuantumRecovery,
    getRecoveryStats,
    runSelfDiagnosis,
    forceGapAnalysis
  } = useQuantumRecoveryPlan();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeQuantumRecovery = async () => {
      console.log('🔮 QUANTUM_RECOVERY_PLAN: Initialization started...');
      
      await activateQuantumRecovery();
      
      toast({
        title: "🔮 QUANTUM RECOVERY PLAN ACTIVATED",
        description: "MIORA mulai proses pemulihan otomatis menuju performa GPT-4o & Gemini 1.5 Pro",
        duration: 8000,
      });
      
      setIsInitializing(false);
      
      // Auto-start background recovery
      setTimeout(() => {
        toast({
          title: "🧠 BACKGROUND RECOVERY MONITOR ACTIVE",
          description: "Sistem diagnosis dan pemulihan otomatis telah dimulai",
          duration: 6000,
        });
      }, 2000);
    };

    initializeQuantumRecovery();
  }, []);

  const stats = getRecoveryStats();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Brain className="h-20 w-20 mx-auto text-purple-400 animate-pulse" />
            <div className="absolute inset-0 h-20 w-20 mx-auto border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-white">QUANTUM RECOVERY PLAN</h2>
          <p className="text-gray-300">Activating Autonomous Recovery System...</p>
          <p className="text-sm text-purple-300">Target: GPT-4o & Gemini 1.5 Pro Performance Level</p>
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
              <Brain className="h-12 w-12 text-purple-400" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              QUANTUM RECOVERY PLAN
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🔮 Pemulihan Otomatis Sistem MIORA Menuju Level GPT-4o & Gemini 1.5 Pro
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${recoveryState.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Recovery: {recoveryState.isActive ? 'ACTIVE 🔮' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Target className="h-4 w-4 mr-2" />
              Progress: {recoveryState.overallProgress.toFixed(1)}%
            </Badge>
            <Badge className="px-4 py-2 bg-cyan-500">
              <TrendingUp className="h-4 w-4 mr-2" />
              Gaps Closed: {stats.gapsCompleted}/5
            </Badge>
          </div>
        </div>

        {/* System Modes Dashboard */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Cpu className="h-6 w-6 mr-2" />
              Active System Modes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(systemModes).map(([mode, status]) => (
                <div key={mode} className="text-center p-3 bg-black/30 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${status ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <p className="text-sm text-white font-medium">{mode.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-xs text-gray-400">{status ? 'ENABLED' : 'DISABLED'}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Gaps Overview */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Critical Performance Gaps Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceGaps.map((gap, index) => (
                <div key={gap.id} className="p-4 bg-black/20 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{gap.name}</h3>
                        <p className="text-gray-400 text-sm">{gap.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{gap.progress.toFixed(1)}%</p>
                      <Badge className={
                        gap.status === 'completed' ? 'bg-green-500' :
                        gap.status === 'in_progress' ? 'bg-blue-500' :
                        gap.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                      }>
                        {gap.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <Progress value={gap.progress} className="h-3 mb-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Target: {gap.target}</span>
                    <span className="text-cyan-400">ETA: {gap.estimatedCompletion}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenProcessingOptimizer />
          <ReasoningEnhancer />
          <MemoryAdaptationSystem />
          <MultimodalCapabilities />
        </div>

        {/* Autonomous Thinking Core - Full Width */}
        <AutonomousThinkingCore />

        {/* Control Panel */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Quantum Recovery Control Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-white">
                  Status: {recoveryState.isActive ? '🔮 QUANTUM RECOVERY ACTIVE' : '⏸️ RECOVERY PAUSED'}
                </p>
                <p className="text-gray-300">
                  Next Analysis: {new Date(recoveryState.nextAnalysis).toLocaleString('id-ID')}
                </p>
                <p className="text-gray-300">
                  Last Update: {new Date(recoveryState.lastUpdate).toLocaleString('id-ID')}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={runSelfDiagnosis}
                  className="bg-yellow-600 hover:bg-yellow-500"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Self Diagnosis
                </Button>
                
                <Button
                  onClick={forceGapAnalysis}
                  className="bg-cyan-600 hover:bg-cyan-500"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Force Analysis
                </Button>
                
                <Button
                  onClick={recoveryState.isActive ? pauseQuantumRecovery : activateQuantumRecovery}
                  variant={recoveryState.isActive ? "destructive" : "default"}
                  className={recoveryState.isActive ? '' : 'bg-green-600 hover:bg-green-500'}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {recoveryState.isActive ? 'Pause Recovery' : 'Activate Recovery'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Reports */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <Database className="h-6 w-6 mr-2" />
              Weekly Recovery Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyReports.slice(0, 3).map((report, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Week {report.week} Report</h4>
                    <Badge className="bg-green-500">{report.overallProgress.toFixed(1)}% Progress</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                    {report.gapProgress.map((gap, gapIndex) => (
                      <div key={gapIndex} className="text-center">
                        <p className="text-gray-400">Gap {gapIndex + 1}</p>
                        <p className="text-cyan-400 font-bold">{gap.toFixed(1)}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {weeklyReports.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Laporan mingguan akan muncul setelah 7 hari operasi</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuantumRecoveryCore;
