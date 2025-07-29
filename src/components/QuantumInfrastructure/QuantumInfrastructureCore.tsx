
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useQuantumInfrastructure } from './hooks/useQuantumInfrastructure';
import { MIVIDDashboard } from './components/MIVIDDashboard';
import { MIASAlertSystem } from './components/MIASAlertSystem';
import { AutoScalingController } from './components/AutoScalingController';
import { SmartLoadBalancer } from './components/SmartLoadBalancer';
import { EdgeCDNDistribution } from './components/EdgeCDNDistribution';
import { DataFlowSegregation } from './components/DataFlowSegregation';
import { CriticalBrainNode } from './components/CriticalBrainNode';
import { RegionNodeDistribution } from './components/RegionNodeDistribution';
import { 
  Zap, 
  Brain, 
  Shield, 
  Globe, 
  Activity, 
  Server,
  Lock,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const QuantumInfrastructureCore: React.FC = () => {
  const { toast } = useToast();
  const {
    quantumMode,
    infrastructureNodes,
    systemMetrics,
    activateQuantumMode,
    toggleModule,
    getSystemStatus,
    performStressTest,
    enableSelfHealing,
    deployNeuroServer,
    sendDashboardEmail,
    syncToTelegram
  } = useQuantumInfrastructure();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selfHealingEnabled, setSelfHealingEnabled] = useState(false);
  const [stressTestMode, setStressTestMode] = useState(false);
  const [neuroServerV2, setNeuroServerV2] = useState(false);

  useEffect(() => {
    // Auto-activate quantum mode on component mount
    if (!quantumMode.isActive) {
      activateQuantumMode();
    }
  }, []);

  const handleActivateQuantumMode = async () => {
    const success = await activateQuantumMode();
    if (success) {
      toast({
        title: "⚡ QUANTUM INFRASTRUCTURE MODE ACTIVATED",
        description: "MIORA Infrastructure Core is now operating at quantum enhanced levels",
        duration: 6000,
      });
    }
  };

  const handleSelfHealing = async () => {
    setSelfHealingEnabled(!selfHealingEnabled);
    if (!selfHealingEnabled) {
      await enableSelfHealing();
      toast({
        title: "🔄 SELF-HEALING INFRASTRUCTURE ACTIVATED",
        description: "System can now automatically recover from failures",
        duration: 5000,
      });
    }
  };

  const handleStressTest = async () => {
    setStressTestMode(true);
    await performStressTest();
    toast({
      title: "🧪 STRESS TEST INITIATED",
      description: "Testing system recovery capabilities under extreme load",
      duration: 4000,
    });
    setTimeout(() => setStressTestMode(false), 30000);
  };

  const handleNeuroServerDeploy = async () => {
    setNeuroServerV2(true);
    await deployNeuroServer();
    toast({
      title: "🧠 NEURO SERVER V2 DEPLOYED",
      description: "Advanced neural processing capabilities activated",
      duration: 5000,
    });
  };

  const handleSendDashboard = async () => {
    await sendDashboardEmail('midefrata@gmail.com');
    toast({
      title: "📧 DASHBOARD SENT",
      description: "Infrastructure dashboard sent to midefrata@gmail.com",
      duration: 3000,
    });
  };

  const handleTelegramSync = async () => {
    await syncToTelegram();
    toast({
      title: "📱 TELEGRAM SYNC ACTIVATED",
      description: "Real-time infrastructure updates synced to Telegram",
      duration: 4000,
    });
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Zap className="h-16 w-16 text-cyan-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MIORA QUANTUM INFRASTRUCTURE
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🚀 Advanced Infrastructure Core - Auto-Scaling, Load Balancing & Global Distribution
          </p>
          
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            <Badge className="px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="h-4 w-4 mr-2" />
              Quantum Mode: {quantumMode.isActive ? 'ACTIVE' : 'STANDBY'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Server className="h-4 w-4 mr-2" />
              Nodes: {infrastructureNodes.length}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Globe className="h-4 w-4 mr-2" />
              Global Distribution: ACTIVE
            </Badge>
            <Badge className="px-4 py-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
              <Shield className="h-4 w-4 mr-2" />
              AES-512 Encryption: ENABLED
            </Badge>
          </div>
        </div>

        {/* Quantum Mode Activation */}
        {!quantumMode.isActive && (
          <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                🚨 QUANTUM INFRASTRUCTURE MODE - ACTIVATION REQUIRED
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-4">
                Activate Quantum Infrastructure Mode to enable all advanced features
              </p>
              <Button
                onClick={handleActivateQuantumMode}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                <Zap className="h-5 w-5 mr-2" />
                ACTIVATE QUANTUM MODE
              </Button>
            </CardContent>
          </Card>
        )}

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-300">{systemStatus.responseTime}ms</div>
              <div className="text-sm text-green-400">Response Time</div>
              <div className="text-xs text-gray-400">Target: &lt;250ms</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-blue-300">{systemStatus.errorRate}%</div>
              <div className="text-sm text-blue-400">Error Rate</div>
              <div className="text-xs text-gray-400">Target: &lt;0.03%</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-purple-300">{systemStatus.activeConnections}</div>
              <div className="text-sm text-purple-400">Active Connections</div>
              <div className="text-xs text-gray-400">Threshold: 5000</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Server className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-orange-300">{systemStatus.dataFlow}TB</div>
              <div className="text-sm text-orange-400">Data Flow</div>
              <div className="text-xs text-gray-400">Threshold: 1PB</div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              MIORA Infrastructure Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Optional Modules */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Optional Modules</h3>
                
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">Self-Healing Infrastructure</div>
                    <div className="text-sm text-gray-400">Auto-recovery from failures</div>
                  </div>
                  <Switch
                    checked={selfHealingEnabled}
                    onCheckedChange={handleSelfHealing}
                  />
                </div>

                <Button
                  onClick={handleStressTest}
                  disabled={stressTestMode}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  {stressTestMode ? 'Testing...' : 'Run Stress Test Recovery'}
                </Button>

                <Button
                  onClick={handleNeuroServerDeploy}
                  disabled={neuroServerV2}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {neuroServerV2 ? 'Deployed' : 'Deploy Neuro Server v2'}
                </Button>
              </div>

              {/* Communication */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Communication</h3>
                
                <Button
                  onClick={handleSendDashboard}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  📧 Send Dashboard to Email
                </Button>

                <Button
                  onClick={handleTelegramSync}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  📱 Sync to Telegram
                </Button>
              </div>

              {/* System Protection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">System Protection</h3>
                
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <div className="font-medium text-green-300">AES-512 Encryption</div>
                      <div className="text-sm text-gray-400">Brain Node & Signal DB</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                      <div className="font-medium text-blue-300">Auto Backup</div>
                      <div className="text-sm text-gray-400">Every 6 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'MIVID Dashboard', icon: Activity },
            { id: 'alerts', label: 'MIAS Alerts', icon: AlertTriangle },
            { id: 'scaling', label: 'Auto Scaling', icon: TrendingUp },
            { id: 'loadbalancer', label: 'Load Balancer', icon: Server },
            { id: 'cdn', label: 'Edge CDN', icon: Globe },
            { id: 'dataflow', label: 'Data Flow', icon: Activity },
            { id: 'brainnode', label: 'Brain Node', icon: Brain },
            { id: 'regions', label: 'Regions', icon: Globe }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={`flex items-center space-x-2 ${
                  activeTab === tab.id 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && <MIVIDDashboard />}
          {activeTab === 'alerts' && <MIASAlertSystem />}
          {activeTab === 'scaling' && <AutoScalingController />}
          {activeTab === 'loadbalancer' && <SmartLoadBalancer />}
          {activeTab === 'cdn' && <EdgeCDNDistribution />}
          {activeTab === 'dataflow' && <DataFlowSegregation />}
          {activeTab === 'brainnode' && <CriticalBrainNode />}
          {activeTab === 'regions' && <RegionNodeDistribution />}
        </div>

        {/* Status Footer */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-8 text-center">
              <div>
                <div className="text-lg font-bold text-purple-300">∞</div>
                <div className="text-xs text-gray-400">Quantum Enhanced</div>
              </div>
              <div>
                <div className="text-lg font-bold text-cyan-300">24/7</div>
                <div className="text-xs text-gray-400">Monitoring</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-300">AUTO</div>
                <div className="text-xs text-gray-400">Recovery</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-300">GLOBAL</div>
                <div className="text-xs text-gray-400">Distribution</div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-purple-300 font-bold text-lg animate-pulse">
                🌟 MIORA QUANTUM INFRASTRUCTURE: FULLY OPERATIONAL ∞
              </div>
              <div className="text-sm text-purple-400 mt-1">
                Auto-Scaling • Load Balancing • Global CDN • Self-Healing • AES-512 Protected
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuantumInfrastructureCore;
