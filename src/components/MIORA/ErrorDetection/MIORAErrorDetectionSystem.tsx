import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Zap, AlertTriangle, CheckCircle, Activity, Cpu, Settings, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAErrorDetection } from './hooks/useMIORAErrorDetection';

const MIORAErrorDetectionSystem: React.FC = () => {
  const {
    systemHealth,
    detectedErrors,
    healingQueue,
    healingStats,
    activateErrorDetection,
    startSelfHealing,
    clearError,
    forceHealthCheck,
    isSystemActive
  } = useMIORAErrorDetection();

  const [autoHealingActive, setAutoHealingActive] = useState(false);

  useEffect(() => {
    // Auto-activate error detection system
    const initSystem = async () => {
      await activateErrorDetection();
      
      toast({
        title: "🛡️ MIORA ERROR DETECTION ACTIVATED",
        description: "Sistem deteksi dan penyembuhan error otomatis telah diaktifkan",
        duration: 5000,
      });
    };

    initSystem();
  }, []);

  const handleStartAutoHealing = async () => {
    setAutoHealingActive(true);
    await startSelfHealing();
    
    toast({
      title: "🔄 AUTO-HEALING ACTIVATED",
      description: "MIORA sedang melakukan penyembuhan otomatis untuk semua error yang terdeteksi",
      duration: 6000,
    });
  };

  const getHealthStatusColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthStatusBadge = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-12 w-12 text-blue-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              MIORA ERROR DETECTION
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🛡️ Sistem Deteksi & Penyembuhan Error Otomatis
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isSystemActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Detection: {isSystemActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className={`px-4 py-2 ${getHealthStatusBadge(systemHealth.overallHealth)}`}>
              <Shield className="h-4 w-4 mr-2" />
              Health: {systemHealth.overallHealth.toFixed(1)}%
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Errors: {detectedErrors.length}
            </Badge>
          </div>
        </div>

        {/* System Health Dashboard */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                System Health Monitor
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={forceHealthCheck}
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/30 text-cyan-400"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Force Check
                </Button>
                <Button
                  onClick={handleStartAutoHealing}
                  disabled={autoHealingActive || detectedErrors.length === 0}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                >
                  {autoHealingActive ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Healing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Auto-Healing
                    </>
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Overall Health</div>
                <div className={`text-2xl font-bold ${getHealthStatusColor(systemHealth.overallHealth)}`}>
                  {systemHealth.overallHealth.toFixed(1)}%
                </div>
              </div>
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Errors Healed</div>
                <div className="text-2xl font-bold text-white">{healingStats.totalHealed}</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-orange-400 text-sm">Success Rate</div>
                <div className="text-2xl font-bold text-white">{healingStats.successRate}%</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Uptime</div>
                <div className="text-2xl font-bold text-white">{systemHealth.uptime}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Core Systems</span>
                  <span className={getHealthStatusColor(systemHealth.coreHealth)}>{systemHealth.coreHealth}%</span>
                </div>
                <Progress value={systemHealth.coreHealth} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Memory Systems</span>
                  <span className={getHealthStatusColor(systemHealth.memoryHealth)}>{systemHealth.memoryHealth}%</span>
                </div>
                <Progress value={systemHealth.memoryHealth} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Network Health</span>
                  <span className={getHealthStatusColor(systemHealth.networkHealth)}>{systemHealth.networkHealth}%</span>
                </div>
                <Progress value={systemHealth.networkHealth} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detected Errors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detectedErrors.map((error) => (
            <Card key={error.id} className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center justify-between">
                  <span className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    {error.type.toUpperCase()} ERROR
                  </span>
                  <Badge className={`${error.severity === 'critical' ? 'bg-red-500' : error.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                    {error.severity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Location</div>
                  <div className="text-white font-mono text-sm">{error.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Description</div>
                  <div className="text-gray-200">{error.description}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Auto-Healing Status</div>
                  <div className="flex items-center space-x-2">
                    {error.healingInProgress ? (
                      <>
                        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-green-400">Healing in progress...</span>
                      </>
                    ) : (
                      <span className="text-yellow-400">Awaiting healing</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => clearError(error.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400"
                  >
                    Clear Error
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Healing Queue */}
        {healingQueue.length > 0 && (
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                Auto-Healing Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healingQueue.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white">{item.errorId}</span>
                      <Badge className="bg-blue-500">{item.healingMethod}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={item.progress} className="w-20 h-2" />
                      <span className="text-green-400 text-sm">{item.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Auto-Healing Status */}
        {autoHealingActive && (
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-300">
                  🔄 AUTO-HEALING ACTIVE
                </h3>
                <p className="text-green-200">
                  MIORA sedang melakukan penyembuhan otomatis untuk semua error yang terdeteksi
                </p>
                <div className="text-sm text-green-400">
                  Sistem akan pulih secara otomatis dalam beberapa saat
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORAErrorDetectionSystem;