
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, Play, CheckCircle, Cpu, Database, Network, Code, Infinity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORARecommendationSystem } from './hooks/useMIORARecommendationSystem';
import { RecommendationCard } from './components/RecommendationCard';
import { ExecutionTracker } from './components/ExecutionTracker';

const MIORARecommendationSystem: React.FC = () => {
  const {
    recommendations,
    executionQueue,
    systemStats,
    activateRecommendationSystem,
    executeRecommendation,
    executeAllRecommendations,
    getExecutionStatus,
    isSystemActive
  } = useMIORARecommendationSystem();

  const [autoExecution, setAutoExecution] = useState(false);

  useEffect(() => {
    // MAXIMUM AUTO-ACTIVATION - All systems at full power
    const initMaximumSystem = async () => {
      await activateRecommendationSystem();
      
      // Auto-activate execution mode
      setAutoExecution(true);
      
      // Auto-execute all recommendations after 3 seconds
      setTimeout(async () => {
        await executeAllRecommendations();
      }, 3000);
      
      toast({
        title: "⚡ MIORA INFINITY EVOLUTION - MAXIMUM MODE ACTIVATED",
        description: "🚀 Semua sistem MIORA diaktifkan pada kapasitas maksimum! Auto-execution dimulai dalam 3 detik...",
        duration: 8000,
      });
    };

    initMaximumSystem();
  }, []);

  const handleExecuteAll = async () => {
    setAutoExecution(true);
    await executeAllRecommendations();
    
    toast({
      title: "⚡ EXECUTING ALL RECOMMENDATIONS",
      description: "Semua rekomendasi pengembangan sedang dieksekusi secara otomatis",
      duration: 8000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Infinity className="h-12 w-12 text-purple-400 animate-spin" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA INFINITY EVOLUTION
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🎯 Sistem Rekomendasi Pengembangan dengan Eksekusi Langsung
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isSystemActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Brain className="h-4 w-4 mr-2" />
              System: {isSystemActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Target className="h-4 w-4 mr-2" />
              Recommendations: {recommendations.length}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Zap className="h-4 w-4 mr-2" />
              Queue: {executionQueue.length}
            </Badge>
          </div>
        </div>

        {/* System Stats Dashboard */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <span className="flex items-center">
                <Database className="h-6 w-6 mr-2" />
                MIORA Evolution Dashboard
              </span>
              <Button
                onClick={handleExecuteAll}
                disabled={autoExecution || executionQueue.length === 0}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
              >
                {autoExecution ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Executing All...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Execute All Recommendations
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Active Recommendations</div>
                <div className="text-2xl font-bold text-white">{systemStats.activeRecommendations}</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Completed Today</div>
                <div className="text-2xl font-bold text-white">{systemStats.completedToday}</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Success Rate</div>
                <div className="text-2xl font-bold text-white">{systemStats.successRate}%</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-orange-400 text-sm">Development Points</div>
                <div className="text-2xl font-bold text-white">{systemStats.developmentPoints}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Overall Evolution Progress</span>
                <span className="text-purple-300">{systemStats.overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={systemStats.overallProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Execution Tracker */}
        <ExecutionTracker 
          executionQueue={executionQueue}
          onExecute={executeRecommendation}
        />

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onExecute={executeRecommendation}
              executionStatus={getExecutionStatus(recommendation.id)}
            />
          ))}
        </div>

        {/* Auto-Execution Status */}
        {autoExecution && (
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-300">
                  🚀 AUTO-EXECUTION ACTIVE
                </h3>
                <p className="text-green-200">
                  MIORA sedang mengeksekusi semua rekomendasi pengembangan secara otomatis
                </p>
                <div className="text-sm text-green-400">
                  Progress akan diperbarui secara real-time
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORARecommendationSystem;
