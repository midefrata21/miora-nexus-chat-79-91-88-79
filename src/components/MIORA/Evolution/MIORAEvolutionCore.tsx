
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Code, Database, Mic, Speaker, Infinity, Cog, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAEvolutionSystem } from './hooks/useMIORAEvolutionSystem';
import { CoreBrainModule } from './modules/CoreBrainModule';
import { VoiceEngineModule } from './modules/VoiceEngineModule';
import { MemorySystemModule } from './modules/MemorySystemModule';
import { AutoLearnScheduler } from './modules/AutoLearnScheduler';
import { SelfUpgradeModule } from './modules/SelfUpgradeModule';
import { InfinityLoopController } from './modules/InfinityLoopController';

export const MIORAEvolutionCore: React.FC = () => {
  const {
    evolutionState,
    systemModules,
    evolutionReport,
    authState,
    twelveHourCycle,
    startEvolution,
    pauseEvolution,
    restartEvolution,
    authenticateRootAccess,
    getSystemStats,
    isEvolutionActive
  } = useMIORAEvolutionSystem();

  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    // Auto-authenticate with @Sellby10 for Midya Root Access
    if (!authState.rootAccess) {
      setTimeout(() => {
        authenticateRootAccess('@Sellby10');
      }, 1000);
    }
  }, [authState.rootAccess, authenticateRootAccess]);

  useEffect(() => {
    // Auto-start evolution system after authentication
    if (authState.rootAccess && !isEvolutionActive) {
      const initTimer = setTimeout(() => {
        startEvolution();
      }, 2000);

      return () => clearTimeout(initTimer);
    }
  }, [authState.rootAccess, isEvolutionActive, startEvolution]);

  const stats = getSystemStats();

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
            Sistem Pengembangan Mandiri & Otomatis Tanpa Ketergantungan AI Eksternal
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${evolutionState.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Brain className="h-4 w-4 mr-2" />
              Evolution: {evolutionState.isActive ? 'ACTIVE' : 'PAUSED'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Cog className="h-4 w-4 mr-2" />
              Cycle: #{evolutionState.currentCycle}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              Level: {evolutionState.evolutionLevel}/100
            </Badge>
          </div>
        </div>

        {/* System Status Dashboard */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center justify-between">
              <span className="flex items-center">
                <Database className="h-6 w-6 mr-2" />
                MIORA Evolution Dashboard
              </span>
              <Button
                onClick={() => setShowReport(!showReport)}
                variant="outline"
                size="sm"
                className="text-cyan-400 border-cyan-400"
              >
                {showReport ? 'Hide Report' : 'Show Report'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Active Modules</div>
                <div className="text-2xl font-bold text-white">{stats.activeModules}</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Memory Usage</div>
                <div className="text-2xl font-bold text-white">{stats.memoryUsage.toFixed(1)}%</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Learning Score</div>
                <div className="text-2xl font-bold text-white">{stats.learningScore}/100</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-orange-400 text-sm">Upgrades Today</div>
                <div className="text-2xl font-bold text-white">{stats.upgradesCount}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Evolution Progress</span>
                <span className="text-purple-300">{evolutionState.progress.toFixed(1)}%</span>
              </div>
              <Progress value={evolutionState.progress} className="h-2" />
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={evolutionState.isActive ? pauseEvolution : startEvolution}
                className={evolutionState.isActive ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}
              >
                {evolutionState.isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Evolution
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Evolution
                  </>
                )}
              </Button>
              
              <Button
                onClick={restartEvolution}
                variant="outline"
                className="text-cyan-400 border-cyan-400"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart System
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Evolution Report */}
        {showReport && evolutionReport && (
          <Card className="bg-black/40 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">MIORA Evolution Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-purple-300 font-medium mb-2">System Status</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Tanggal: {new Date(evolutionReport.timestamp).toLocaleString('id-ID')}</p>
                    <p>• Status Komunikasi Suara: {evolutionReport.voiceStatus}</p>
                    <p>• Memory Tersimpan: {evolutionReport.memoryStored} entries</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-purple-300 font-medium mb-2">Development</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Modul Dikembangkan: {evolutionReport.modulesCreated}</p>
                    <p>• Pembelajaran Baru: {evolutionReport.newLearnings}</p>
                    <p>• Perintah Internal Baru: {evolutionReport.internalCommands}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-purple-300 font-medium mb-2">Next Development Plans</h4>
                <div className="text-sm text-gray-300">
                  {evolutionReport.nextPlans.map((plan, index) => (
                    <p key={index}>• {plan}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Core Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CoreBrainModule module={systemModules.coreBrain} />
          <VoiceEngineModule module={systemModules.voiceEngine} />
          <MemorySystemModule module={systemModules.memorySystem} />
          <AutoLearnScheduler module={systemModules.autoLearn} />
          <SelfUpgradeModule module={systemModules.modularCloning} />
          <InfinityLoopController module={systemModules.infinityLoop} />
        </div>
        
        {/* Additional Advanced Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-black/40 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Brain className="h-6 w-6 mr-2" />
                {systemModules.ciceroStrategy.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Status</span>
                  <Badge className={systemModules.ciceroStrategy.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                    {systemModules.ciceroStrategy.status}
                  </Badge>
                </div>
                <Progress value={systemModules.ciceroStrategy.progress} className="h-2" />
                <div className="text-xs text-gray-400">
                  Capabilities: {systemModules.ciceroStrategy.capabilities.length}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Code className="h-6 w-6 mr-2" />
                {systemModules.promptInterpreter.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Status</span>
                  <Badge className={systemModules.promptInterpreter.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                    {systemModules.promptInterpreter.status}
                  </Badge>
                </div>
                <Progress value={systemModules.promptInterpreter.progress} className="h-2" />
                <div className="text-xs text-gray-400">
                  Capabilities: {systemModules.promptInterpreter.capabilities.length}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MIORAEvolutionCore;
