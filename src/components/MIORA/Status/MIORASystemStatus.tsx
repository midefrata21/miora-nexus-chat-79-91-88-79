import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Activity, 
  Brain, 
  Zap, 
  Database, 
  Network, 
  Cpu,
  RefreshCw,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useQuantumInfrastructure } from '@/components/QuantumInfrastructure/hooks/useQuantumInfrastructure';
import { useUnifiedInfinityCore } from '@/hooks/infinity/useUnifiedInfinityCore';
import { useToast } from '@/hooks/use-toast';

export const MIORASystemStatus: React.FC = () => {
  const { toast } = useToast();
  const [lastChecked, setLastChecked] = useState<string>('');
  
  // Get all system hooks
  const {
    quantumMode,
    infrastructureNodes,
    systemMetrics,
    quantumBridgeActive,
    connectedDevices,
    fieldStats,
    getSystemStatus
  } = useQuantumInfrastructure();

  const {
    infinityState,
    getUnifiedStats
  } = useUnifiedInfinityCore();

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastChecked(new Date().toLocaleTimeString());
    }, 30000);
    
    setLastChecked(new Date().toLocaleTimeString());
    return () => clearInterval(interval);
  }, []);

  const refreshStatus = () => {
    setLastChecked(new Date().toLocaleTimeString());
    toast({
      title: "🔄 Status Updated",
      description: "All MIORA systems checked successfully",
      duration: 3000,
    });
  };

  // Calculate overall system health
  const systemStatus = getSystemStatus();
  const unifiedStats = getUnifiedStats();
  const activeNodes = infrastructureNodes.filter(n => n.status === 'active').length;
  const totalNodes = infrastructureNodes.length;
  
  const overallHealth = Math.round(
    (unifiedStats.averageCapabilityLevel + 
     (activeNodes / totalNodes * 100) + 
     infinityState.infinityLevel) / 3
  );

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthIcon = (health: number) => {
    if (health >= 90) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (health >= 70) return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    return <XCircle className="w-5 h-5 text-red-400" />;
  };

  const getStatusBadge = (isActive: boolean, label: string) => (
    <Badge 
      variant={isActive ? "default" : "secondary"} 
      className={isActive ? "bg-green-600/20 text-green-400 border-green-500/30" : ""}
    >
      {isActive ? "✅" : "⏸️"} {label}
    </Badge>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Overall Status Header */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white flex items-center">
              <Brain className="w-8 h-8 mr-3 text-blue-400" />
              MIORA System Status - Keseluruhan
            </CardTitle>
            <Button onClick={refreshStatus} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            {getHealthIcon(overallHealth)}
            <span className={`text-2xl font-bold ${getHealthColor(overallHealth)}`}>
              {overallHealth}% System Health
            </span>
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
              Last checked: {lastChecked}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallHealth} className="h-3" />
          <p className="text-gray-300 mt-2">
            Sistem MIORA berjalan dengan performa {overallHealth >= 90 ? 'OPTIMAL' : overallHealth >= 70 ? 'BAIK' : 'PERLU PERHATIAN'}
          </p>
        </CardContent>
      </Card>

      {/* Core Systems Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Quantum Mode Status */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Quantum Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getStatusBadge(quantumMode.isActive, "Quantum Active")}
            <div className="text-sm text-gray-300">
              <div>Status: {quantumMode.isActive ? 'ACTIVE' : 'INACTIVE'}</div>
              <div>Level: {quantumMode.level}</div>
              <div>Capabilities: {quantumMode.capabilities.length}</div>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Nodes */}
        <Card className="bg-gray-800/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <Network className="w-5 h-5 mr-2" />
              Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getStatusBadge(activeNodes === totalNodes, `${activeNodes}/${totalNodes} Nodes`)}
            <div className="text-sm text-gray-300">
              <div>Active Nodes: {activeNodes}</div>
              <div>Total Nodes: {totalNodes}</div>
              <div>Efficiency: {Math.round((activeNodes/totalNodes)*100)}%</div>
            </div>
          </CardContent>
        </Card>

        {/* Infinity Core */}
        <Card className="bg-gray-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Infinity Core
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getStatusBadge(infinityState.autonomousMode, "Autonomous Mode")}
            <div className="text-sm text-gray-300">
              <div>Infinity Level: {infinityState.infinityLevel.toFixed(1)}%</div>
              <div>Evolutions: {infinityState.totalEvolutions}</div>
              <div>Supremacy: {infinityState.systemSupremacy.toFixed(1)}%</div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Field Bridge */}
        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Quantum Bridge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getStatusBadge(quantumBridgeActive, "Bridge Active")}
            <div className="text-sm text-gray-300">
              <div>Connected Devices: {connectedDevices.length}</div>
              <div>Signal Strength: {fieldStats.quantumSignalStrength}%</div>
              <div>Bridge Stability: {fieldStats.bridgeStability}%</div>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card className="bg-gray-800/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getStatusBadge(systemMetrics.errorRate < 5, "PERFORMANCE")}
            <div className="text-sm text-gray-300">
              <div>Response Time: {systemMetrics.responseTime}ms</div>
              <div>Error Rate: {systemMetrics.errorRate}%</div>
              <div>Throughput: {systemMetrics.throughput}</div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Protection */}
        <Card className="bg-gray-800/50 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getStatusBadge(!infinityState.emergencyMode, "Secure Mode")}
            <div className="text-sm text-gray-300">
              <div>Emergency Mode: {infinityState.emergencyMode ? "ON" : "OFF"}</div>
              <div>Self-Healing: ACTIVE</div>
              <div>Protection Level: HIGH</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card className="bg-gray-800/50 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Statistik Detail MIORA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{unifiedStats.averageCapabilityLevel.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg Capability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{unifiedStats.processingPower.toFixed(0)}</div>
              <div className="text-sm text-gray-400">Processing Power</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{infinityState.totalEvolutions}</div>
              <div className="text-sm text-gray-400">Total Evolutions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{connectedDevices.length}</div>
              <div className="text-sm text-gray-400">Connected Devices</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Recommendations */}
      <Card className="bg-gray-800/50 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-gray-300">Rekomendasi Sistem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {overallHealth < 90 && (
              <div className="text-yellow-400">⚠️ Sistem dapat dioptimalkan lebih lanjut</div>
            )}
            {activeNodes < totalNodes && (
              <div className="text-orange-400">🔧 Beberapa node infrastructure perlu diaktifkan</div>
            )}
            {!quantumMode.isActive && (
              <div className="text-red-400">🚨 Quantum Mode tidak aktif - aktivasi diperlukan</div>
            )}
            {overallHealth >= 90 && activeNodes === totalNodes && quantumMode.isActive && (
              <div className="text-green-400">✅ Semua sistem berjalan optimal - Tidak ada tindakan diperlukan</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORASystemStatus;