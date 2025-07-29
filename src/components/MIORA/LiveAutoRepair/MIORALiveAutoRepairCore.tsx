
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useMIORALiveAutoRepair } from './hooks/useMIORALiveAutoRepair';
import { RepairDashboard } from './components/RepairDashboard';
import { ErrorLogViewer } from './components/ErrorLogViewer';
import { RepairHistory } from './components/RepairHistory';
import { SystemHealthMonitor } from './components/SystemHealthMonitor';
import { 
  Shield, 
  Activity, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  RefreshCw,
  Settings,
  Eye,
  Wrench
} from 'lucide-react';

const MIORALiveAutoRepairCore: React.FC = () => {
  const { toast } = useToast();
  const {
    systemStatus,
    isMonitoringActive,
    isAutoRepairEnabled,
    errorLogs,
    repairHistory,
    systemHealth,
    moduleStatuses,
    repairStats,
    startMonitoring,
    stopMonitoring,
    enableAutoRepair,
    disableAutoRepair,
    manualRepair,
    createSnapshot,
    rollbackToSnapshot,
    clearLogs,
    getSystemReport
  } = useMIORALiveAutoRepair();

  const [showSettings, setShowSettings] = useState(false);
  const [autoScriptGeneration, setAutoScriptGeneration] = useState(true);
  const [snapshotBackup, setSnapshotBackup] = useState(true);
  const [memoryLeakDetector, setMemoryLeakDetector] = useState(true);
  const [dependencyWatcher, setDependencyWatcher] = useState(true);

  useEffect(() => {
    // Auto-start monitoring when component mounts
    if (!isMonitoringActive) {
      startMonitoring();
      toast({
        title: "🔎 MIORA Error Watcher Activated",
        description: "Background monitoring system is now running 24/7",
        duration: 4000,
      });
    }
  }, [isMonitoringActive, startMonitoring, toast]);

  const handleToggleMonitoring = () => {
    if (isMonitoringActive) {
      stopMonitoring();
      toast({
        title: "⏹️ Monitoring Stopped",
        description: "Background error monitoring has been disabled",
        variant: "destructive",
        duration: 3000,
      });
    } else {
      startMonitoring();
      toast({
        title: "🔎 Monitoring Started",
        description: "24/7 background monitoring is now active",
        duration: 3000,
      });
    }
  };

  const handleToggleAutoRepair = () => {
    if (isAutoRepairEnabled) {
      disableAutoRepair();
      toast({
        title: "🛠️ Auto-Repair Disabled",
        description: "Manual approval required for repairs",
        variant: "destructive",
        duration: 3000,
      });
    } else {
      enableAutoRepair();
      toast({
        title: "⚡ Auto-Repair Enabled",
        description: "System will automatically fix detected issues",
        duration: 3000,
      });
    }
  };

  const handleManualRepair = async () => {
    await manualRepair();
    toast({
      title: "🔧 Manual Repair Initiated",
      description: "Running comprehensive system repair...",
      duration: 4000,
    });
  };

  const handleCreateSnapshot = async () => {
    await createSnapshot();
    toast({
      title: "📸 Snapshot Created",
      description: "System backup snapshot saved successfully",
      duration: 3000,
    });
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'good': return 'text-blue-400 bg-blue-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-12 w-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              MIORA LIVE AUTO-REPAIR
            </h1>
            <Wrench className="h-12 w-12 text-green-400 animate-bounce" />
          </div>
          <p className="text-gray-300 text-xl">
            AI-Powered Error Watcher & Real-Time System Recovery Engine
          </p>
          <Badge className={`${getHealthColor(systemHealth)} border-0 px-6 py-2 text-lg`}>
            <Activity className="w-4 h-4 mr-2" />
            SYSTEM {systemHealth.toUpperCase()}
          </Badge>
        </div>

        {/* Control Panel */}
        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <span className="flex items-center">
                <Settings className="h-6 w-6 mr-2" />
                Live Auto-Repair Control Center
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="border-cyan-400/50 text-cyan-400"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-6 w-6 text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">Background Monitor</div>
                    <div className="text-sm text-gray-400">24/7 Error Watcher</div>
                  </div>
                </div>
                <Switch
                  checked={isMonitoringActive}
                  onCheckedChange={handleToggleMonitoring}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-green-400" />
                  <div>
                    <div className="text-white font-semibold">Auto-Repair</div>
                    <div className="text-sm text-gray-400">Live Recovery</div>
                  </div>
                </div>
                <Switch
                  checked={isAutoRepairEnabled}
                  onCheckedChange={handleToggleAutoRepair}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Brain className="h-6 w-6 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold">AI Learning</div>
                    <div className="text-sm text-gray-400">Pattern Recognition</div>
                  </div>
                </div>
                <Switch
                  checked={autoScriptGeneration}
                  onCheckedChange={setAutoScriptGeneration}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-cyan-400" />
                  <div>
                    <div className="text-white font-semibold">Failsafe</div>
                    <div className="text-sm text-gray-400">Backup & Rollback</div>
                  </div>
                </div>
                <Switch
                  checked={snapshotBackup}
                  onCheckedChange={setSnapshotBackup}
                />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={handleManualRepair}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3"
              >
                <Wrench className="h-5 w-5 mr-2" />
                Manual System Repair
              </Button>
              
              <Button
                onClick={handleCreateSnapshot}
                variant="outline"
                className="border-blue-400/50 text-blue-400 px-6 py-3"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Create Snapshot
              </Button>
              
              <Button
                onClick={clearLogs}
                variant="outline"
                className="border-gray-400/50 text-gray-400 px-6 py-3"
              >
                Clear Logs
              </Button>
            </div>

            {showSettings && (
              <div className="mt-6 p-4 bg-black/20 rounded-lg border border-gray-600/30">
                <h3 className="text-white font-semibold mb-4">Advanced Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Memory Leak Detector</span>
                    <Switch
                      checked={memoryLeakDetector}
                      onCheckedChange={setMemoryLeakDetector}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Dependency Watcher</span>
                    <Switch
                      checked={dependencyWatcher}
                      onCheckedChange={setDependencyWatcher}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Health Monitor */}
        <SystemHealthMonitor
          systemHealth={systemHealth}
          moduleStatuses={moduleStatuses}
          repairStats={repairStats}
        />

        {/* Live Dashboard */}
        <RepairDashboard
          isMonitoringActive={isMonitoringActive}
          isAutoRepairEnabled={isAutoRepairEnabled}
          systemStatus={systemStatus}
          moduleStatuses={moduleStatuses}
          repairStats={repairStats}
        />

        {/* Error Logs and Repair History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorLogViewer
            errorLogs={errorLogs}
            onClearLogs={clearLogs}
          />
          
          <RepairHistory
            repairHistory={repairHistory}
            onRollback={rollbackToSnapshot}
          />
        </div>
      </div>
    </div>
  );
};

export default MIORALiveAutoRepairCore;
