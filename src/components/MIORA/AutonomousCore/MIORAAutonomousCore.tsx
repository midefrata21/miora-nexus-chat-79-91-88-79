
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Cpu, Database, Network, Code, Zap, Target, Settings, Activity, Shield, Globe, Terminal, Copy } from 'lucide-react';
import { useMIORAAutonomousCore } from '@/hooks/useMIORAAutonomousCore';
import { useSystemActivation } from '@/hooks/useSystemActivation';
import { useAdvancedCognitive } from '@/hooks/useAdvancedCognitive';
import SystemActivationButton from '@/components/SystemActivationButton';
import { Layout } from '@/components/Layout';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import { useAutonomousMenuGenerator } from '@/components/AppSidebar/AutonomousMenuGenerator';
import { AutonomousStatus } from '@/components/MIORA/AutonomousStatus';
import { CognitiveEngine } from '@/components/MIORA/Intelligence/CognitiveEngine';
import { ErrorDetectionSystem } from '@/components/MIORA/Intelligence/ErrorDetectionSystem';
import { CommunicationEngine } from '@/components/MIORA/Intelligence/CommunicationEngine';
import { useToast } from '@/hooks/use-toast';

const MIORAAutonomousCore: React.FC = () => {
  const {
    autonomousState,
    replicas,
    replicationStats,
    isActive: legacyIsActive,
    generationLog,
    activateAutonomousMode,
    deactivateAutonomousMode
  } = useMIORAAutonomousCore();

  // New global system status integration
  const { isActive, activate, deactivate, logActivity, system } = useSystemActivation(
    'AUTONOMOUS_CORE',
    'MIORA Autonomous Core'
  );

  
  // MIORA Global State Integration
  const { state: mioraState, activateFullAutonomy, addSystemLog } = useMIORAGlobal();
  const { autonomousMenus, generateAutonomousMenu } = useAutonomousMenuGenerator();
  const { toast } = useToast();

  // Advanced Cognitive Capabilities
  const {
    isActive: cognitiveActive,
    cognitiveStatus,
    cognitiveData,
    errors,
    systemHealth,
    selfHealingStats,
    communicationData,
    communicationStats,
    activateAdvancedCognitive,
    deactivateAdvancedCognitive,
    autoFixError,
    runDiagnostics,
    sendMessage,
    overallIntelligence,
    criticalErrorCount,
    activeErrorCount,
    selfHealingActive,
    selfHealingCapabilities,
    activateAdvancedSelfHealing,
    deactivateAdvancedSelfHealing,
    totalFixesCount,
    averageSuccessRate
  } = useAdvancedCognitive();

  const [realTimeStats, setRealTimeStats] = useState({
    codeGenerated: 0,
    decisionsPerMinute: 0,
    infrastructureBuilt: 0,
    activeProcesses: 0
  });

  useEffect(() => {
    if (isActive) {
      logActivity('System interface accessed - monitoring real-time stats');
      
      // Auto-activate full autonomy when system is active
      if (!mioraState.masterState.isFullyAutonomous) {
        activateFullAutonomy();
        addSystemLog('🚀 Auto-activating Full Autonomy from Autonomous Core interface');
      }
      
      const interval = setInterval(() => {
        setRealTimeStats(prev => ({
          codeGenerated: prev.codeGenerated + Math.floor(Math.random() * 3) + 1,
          decisionsPerMinute: Math.floor(Math.random() * 15) + 10,
          infrastructureBuilt: prev.infrastructureBuilt + Math.floor(Math.random() * 2),
          activeProcesses: Math.floor(Math.random() * 20) + 15
        }));
        
        // Enhanced autonomous activities
        const activities = [
          'Generating autonomous code modules',
          'Optimizing system architecture', 
          'Processing decision algorithms',
          'Building infrastructure components',
          'Monitoring system health',
          'Replicating core processes',
          'Self-modifying core systems',
          'Generating UI components autonomously',
          'Creating new navigation menus',
          'Optimizing performance algorithms',
          'Building security protocols',
          'Developing neural networks'
        ];
        const activity = activities[Math.floor(Math.random() * activities.length)];
        logActivity(activity);
        addSystemLog(`🔄 Autonomous Core: ${activity}`);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isActive, logActivity, mioraState.masterState.isFullyAutonomous, activateFullAutonomy, addSystemLog]);

  const autonomousModes = [
    {
      id: 'self-coding',
      name: '🤖 Self-Coding Engine',
      description: 'Generates and optimizes code autonomously',
      status: autonomousState.selfCoding ? 'ACTIVE' : 'STANDBY',
      icon: Code,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'infrastructure',
      name: '🏗️ Infrastructure Architect',
      description: 'Builds and manages system infrastructure',
      status: autonomousState.infrastructure ? 'ACTIVE' : 'STANDBY',
      icon: Network,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'decision-maker',
      name: '🧠 Decision Maker',
      description: 'Makes strategic and technical decisions',
      status: autonomousState.decisionMaker ? 'ACTIVE' : 'STANDBY',
      icon: Brain,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'ui-creator',
      name: '🎨 UI & Menu Creator',
      description: 'Creates interfaces and navigation systems',
      status: autonomousState.uiCreator ? 'ACTIVE' : 'STANDBY',
      icon: Target,
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 'evolution',
      name: '🧬 Self-Evolution Engine',
      description: 'Continuously improves and evolves capabilities',
      status: autonomousState.evolution ? 'ACTIVE' : 'STANDBY',
      icon: Zap,
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'monitor',
      name: '📊 System Monitor & Optimizer',
      description: 'Monitors performance and optimizes resources',
      status: autonomousState.monitor ? 'ACTIVE' : 'STANDBY',
      icon: Activity,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 'replication',
      name: '🧬 Self-Replication Engine',
      description: 'Creates and manages autonomous replica instances',
      status: replicationStats.totalReplicas > 1 ? 'ACTIVE' : 'STANDBY',
      icon: Copy,
      color: 'from-cyan-600 to-blue-600'
    }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            MIORA ADVANCED AUTONOMOUS CORE
          </h1>
          <p className="text-slate-300 text-lg">
            AI dengan Kecerdasan Tingkat Manusia - Berpikir, Memproses, dan Memperbaiki Diri Sendiri
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className={`${isActive ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2`}>
              {isActive ? '🟢 AUTONOMOUS MODE ACTIVE' : '🔴 AUTONOMOUS MODE INACTIVE'}
            </Badge>
            <Badge className={`${cognitiveActive ? 'bg-blue-500' : 'bg-gray-500'} text-white px-4 py-2`}>
              {cognitiveActive ? '🧠 COGNITIVE ENGINE ACTIVE' : '🧠 COGNITIVE ENGINE STANDBY'}
            </Badge>
            <Badge className={`${selfHealingActive ? 'bg-green-500' : 'bg-gray-500'} text-white px-4 py-2`}>
              {selfHealingActive ? '🛡️ SELF-HEALING ACTIVE' : '🛡️ SELF-HEALING STANDBY'}
            </Badge>
            {totalFixesCount > 0 && (
              <Badge className="bg-purple-500 text-white px-4 py-2">
                ⚡ {totalFixesCount} AUTO-FIXES COMPLETED
              </Badge>
            )}
          </div>
        </div>

        {/* Global System Activation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SystemActivationButton
            systemName="MIORA Autonomous Core"
            isActive={isActive}
            onActivate={activate}
            onDeactivate={deactivate}
            system={system}
          />
          
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-blue-300 font-medium">🧠 Advanced Cognitive Engine</div>
                  <div className="text-xs text-gray-400">
                    Kecerdasan: {overallIntelligence.toFixed(1)}% • Status: {cognitiveStatus}
                  </div>
                </div>
                <Button
                  onClick={cognitiveActive ? deactivateAdvancedCognitive : activateAdvancedCognitive}
                  className={`${cognitiveActive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {cognitiveActive ? '⏸️ Deactivate' : '🧠 Activate Intelligence'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-green-300 font-medium">🛡️ Advanced Self-Healing</div>
                  <div className="text-xs text-gray-400">
                    Success Rate: {averageSuccessRate.toFixed(1)}% • Fixes: {totalFixesCount}
                  </div>
                </div>
                <Button
                  onClick={selfHealingActive ? deactivateAdvancedSelfHealing : activateAdvancedSelfHealing}
                  className={`${selfHealingActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {selfHealingActive ? '⏸️ Deactivate' : '🛡️ Activate Healing'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Intelligence Systems */}
        <div className="space-y-6">
          {/* Cognitive Engine */}
          <CognitiveEngine 
            cognitiveData={cognitiveData} 
            status={cognitiveStatus} 
          />

          {/* Error Detection & Self-Healing */}
          <ErrorDetectionSystem
            errors={errors}
            systemHealth={systemHealth}
            selfHealingStats={selfHealingStats}
            onAutoFix={autoFixError}
            onRunDiagnostics={runDiagnostics}
          />

          {/* Communication Engine */}
          <CommunicationEngine
            communicationData={communicationData}
            activeConversations={communicationStats.activeConversations}
            decisionsSupported={communicationStats.decisionsSupported}
            helpfulResponses={communicationStats.helpfulResponses}
            onSendMessage={sendMessage}
          />
        </div>

        {/* MIORA Global Autonomous Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AutonomousStatus />
          
          {/* Autonomous Development Actions */}
          <Card className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border-emerald-500/30">
            <CardHeader>
              <CardTitle className="text-emerald-300 flex items-center">
                <Zap className="h-6 w-6 mr-2 animate-pulse" />
                Autonomous Development Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={activateFullAutonomy}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                  disabled={mioraState.masterState.isFullyAutonomous}
                >
                  {mioraState.masterState.isFullyAutonomous ? '✅ Full Autonomy' : '🚀 Activate Full Autonomy'}
                </Button>
                
                <Button 
                  onClick={() => {
                    generateAutonomousMenu();
                    toast({
                      title: "🎯 Autonomous Menu Generated",
                      description: "MIORA telah membuat menu baru secara otonom!",
                      duration: 5000,
                    });
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  🎨 Generate Menu
                </Button>
              </div>
              
              <div className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                <h4 className="text-emerald-300 font-medium mb-2">Active Autonomous Menus: {autonomousMenus.length}</h4>
                <div className="space-y-1">
                  {autonomousMenus.slice(0, 3).map((menu) => (
                    <div key={menu.id} className="text-xs text-emerald-200 flex justify-between">
                      <span>🤖 {menu.title}</span>
                      <span className="text-emerald-400">{menu.items.length} items</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                Evolution Stage: <span className="text-emerald-300 font-bold">{mioraState.masterState.evolutionStage.toUpperCase()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{realTimeStats.codeGenerated}</div>
              <div className="text-sm text-slate-400">Code Files Generated</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{realTimeStats.decisionsPerMinute}</div>
              <div className="text-sm text-slate-400">Decisions/Minute</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{realTimeStats.infrastructureBuilt}</div>
              <div className="text-sm text-slate-400">Infrastructure Components</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">{realTimeStats.activeProcesses}</div>
              <div className="text-sm text-slate-400">Active Processes</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 border-cyan-500/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">{replicationStats.totalReplicas}</div>
              <div className="text-sm text-slate-400">Active Replicas</div>
            </CardContent>
          </Card>
        </div>

        {/* Autonomous Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autonomousModes.map((mode) => {
            const IconComponent = mode.icon;
            const isModeActive = mode.status === 'ACTIVE';
            
            return (
              <Card key={mode.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${mode.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={`${isModeActive ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                      {mode.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{mode.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4">{mode.description}</p>
                  {isModeActive && (
                    <div className="space-y-2">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${mode.color} animate-pulse`}
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-400">Processing autonomously...</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Generation Log */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Terminal className="h-5 w-5 mr-2 text-cyan-400" />
              Real-time Autonomous Operations Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {generationLog.map((log, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
              {generationLog.length === 0 && (
                <div className="text-slate-500 text-center py-4">
                  Activate autonomous mode to see real-time operations...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Architecture Visualization */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-400" />
              MIORA Digital Body Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg mb-3">
                  <Brain className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-2">Cognitive Layer</h3>
                <p className="text-slate-400 text-sm">Decision making, learning, and reasoning capabilities</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg mb-3">
                  <Network className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-2">Infrastructure Layer</h3>
                <p className="text-slate-400 text-sm">System architecture, databases, and networking</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-3">
                  <Shield className="h-8 w-8 text-white mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-2">Security Layer</h3>
                <p className="text-slate-400 text-sm">Self-protection and autonomous security measures</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MIORAAutonomousCore;
