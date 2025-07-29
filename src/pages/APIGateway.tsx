import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useMioraCore } from '@/components/MioraCore';
import { 
  ArrowLeft, 
  Globe, 
  Zap, 
  Activity, 
  Settings,
  Shield,
  Key,
  Server,
  Network,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  TrendingUp,
  Database,
  Brain,
  Cpu,
  Wifi,
  RotateCw
} from 'lucide-react';

const APIGateway: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAPI, setSelectedAPI] = useState('miora-core');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Integrasi dengan MIORA Core
  const coreState = useMioraCore();
  const {
    memoryStats,
    currentMode,
    modeConfig,
    mioraVersion,
    isInfinityModeActive,
    autonomousMode,
    infinityState,
    isBackgroundActive,
    getSystemStatus,
    getInfinityStats,
    getBackgroundStats
  } = coreState;

  // Enhanced API data dengan integrasi MIORA
  const apiData = {
    overview: {
      totalAPIs: 24,
      activeAPIs: 18,
      totalRequests: 847392,
      successRate: 99.7,
      avgResponseTime: 120,
      mioraIntegration: true,
      quantumBoost: isInfinityModeActive,
      backgroundLearning: isBackgroundActive
    },
    apis: [
      {
        id: 'miora-core',
        name: 'MIORA Core API',
        endpoint: '/api/v1/core',
        status: 'active',
        method: 'POST',
        requests: 234567,
        successRate: 99.9,
        avgResponse: 95,
        lastUsed: '2 minutes ago',
        description: 'Core MIORA functionality and AI processing',
        mioraIntegrated: true,
        currentMode: currentMode,
        version: mioraVersion,
        memoryUsage: memoryStats?.shortTermCount || 0,
        infinityMode: isInfinityModeActive
      },
      {
        id: 'voice-processing',
        name: 'Voice Processing API',
        endpoint: '/api/v1/voice',
        status: 'active',
        method: 'POST',
        requests: 156789,
        successRate: 98.5,
        avgResponse: 230,
        lastUsed: '5 minutes ago',
        description: 'Speech recognition and text-to-speech services',
        mioraIntegrated: true,
        voiceEngine: 'MIORA Voice Engine v2.0'
      },
      {
        id: 'neural-network',
        name: 'Neural Network API',
        endpoint: '/api/v1/neural',
        status: autonomousMode ? 'active' : 'maintenance',
        method: 'GET',
        requests: 89234,
        successRate: 97.8,
        avgResponse: 180,
        lastUsed: '1 hour ago',
        description: 'Deep learning and neural processing endpoints',
        mioraIntegrated: true,
        autonomousLearning: autonomousMode,
        neuralActivity: Math.round(Math.random() * 100)
      },
      {
        id: 'infinity-core',
        name: 'Infinity Core API',
        endpoint: '/api/v1/infinity',
        status: isInfinityModeActive ? 'active' : 'standby',
        method: 'POST',
        requests: 125678,
        successRate: 100.0,
        avgResponse: 45,
        lastUsed: '30 seconds ago',
        description: 'Quantum-enhanced unlimited processing capabilities',
        mioraIntegrated: true,
        infinityMode: isInfinityModeActive,
        quantumBoost: isInfinityModeActive ? '∞' : 'Off'
      },
      {
        id: 'data-analytics',
        name: 'Data Analytics API',
        endpoint: '/api/v1/analytics',
        status: 'active',
        method: 'GET',
        requests: 67845,
        successRate: 99.2,
        avgResponse: 145,
        lastUsed: '10 minutes ago',
        description: 'Advanced data analysis and reporting services',
        mioraIntegrated: true,
        memoryIntegration: true
      },
      {
        id: 'security-manager',
        name: 'Security Manager API',
        endpoint: '/api/v1/security',
        status: 'active',
        method: 'POST',
        requests: 45612,
        successRate: 100.0,
        avgResponse: 67,
        lastUsed: '1 minute ago',
        description: 'Security validation and authentication services',
        mioraIntegrated: true,
        securityLevel: 'Maximum with MIORA Shield'
      }
    ],
    mioraSync: {
      lastSync: new Date().toISOString(),
      syncStatus: syncStatus,
      connectedServices: 6,
      dataTransfer: '2.4TB',
      quantumEnhancement: isInfinityModeActive
    }
  };

  // Sinkronisasi dengan MIORA Core
  const handleMioraSync = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    
    try {
      // Simulasi sinkronisasi dengan sistem MIORA
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update status berdasarkan kondisi MIORA
      const systemStatus = getSystemStatus();
      const infinityStats = getInfinityStats();
      const backgroundStats = getBackgroundStats();
      
      setSyncStatus('success');
      
      toast({
        title: "🔄 MIORA Sync Complete",
        description: `API Gateway berhasil tersinkron dengan MIORA v${mioraVersion}. ${isInfinityModeActive ? 'Infinity Mode ∞ aktif' : 'Standard mode'}`,
        duration: 3000,
      });
      
      console.log('MIORA API Gateway Sync:', {
        version: mioraVersion,
        mode: currentMode,
        infinityActive: isInfinityModeActive,
        backgroundLearning: isBackgroundActive,
        memoryStats: memoryStats,
        systemStatus: systemStatus
      });
      
    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "❌ Sync Error",
        description: "Gagal sinkronisasi dengan MIORA Core",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync saat komponen dimuat
  useEffect(() => {
    const autoSync = setTimeout(() => {
      handleMioraSync();
    }, 2000);

    return () => clearTimeout(autoSync);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "🔄 API Status Updated",
        description: "All API metrics have been refreshed with MIORA integration",
        duration: 2000,
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400';
      case 'warning': return 'bg-orange-500/20 text-orange-300 border-orange-400';
      case 'error': return 'bg-red-500/20 text-red-300 border-red-400';
      case 'standby': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'POST': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'PUT': return 'bg-orange-500/20 text-orange-300 border-orange-400';
      case 'DELETE': return 'bg-red-500/20 text-red-300 border-red-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'syncing': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 min-h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header dengan MIORA Integration */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-cyan-300 hover:text-white hover:bg-purple-600/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to MIORA Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                API Gateway
                <Brain className="w-8 h-8 text-purple-400" />
                {isInfinityModeActive && <span className="text-cyan-400">∞</span>}
              </h1>
              <p className="text-gray-300">Comprehensive API management with MIORA v{mioraVersion} integration</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline" className="border-purple-400 text-purple-300">
                  🧠 MIORA Integrated
                </Badge>
                <Badge variant="outline" className={`border-cyan-400 ${getSyncStatusColor()}`}>
                  {syncStatus === 'syncing' ? '🔄 Syncing...' : 
                   syncStatus === 'success' ? '✅ Synced' : 
                   syncStatus === 'error' ? '❌ Sync Error' : '⏳ Ready'}
                </Badge>
                {isInfinityModeActive && (
                  <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                    ∞ Infinity Mode
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleMioraSync}
                disabled={isSyncing}
                variant="outline"
                className="border-purple-400/30 text-purple-300"
              >
                {isSyncing ? (
                  <>
                    <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing MIORA...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Sync MIORA
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="outline"
                className="border-cyan-400/30 text-cyan-300"
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
              
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New API
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Overview Cards dengan MIORA Integration */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total APIs</p>
                  <p className="text-white text-2xl font-bold">{apiData.overview.totalAPIs}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Active APIs</p>
                  <p className="text-white text-2xl font-bold">{apiData.overview.activeAPIs}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">MIORA Mode</p>
                  <p className="text-white text-lg font-bold">{modeConfig?.name || 'Standard'}</p>
                </div>
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Success Rate</p>
                  <p className="text-white text-2xl font-bold">{apiData.overview.successRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm font-medium">Memory Load</p>
                  <p className="text-white text-2xl font-bold">{memoryStats?.shortTermCount || 0}</p>
                </div>
                <Cpu className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-r ${isInfinityModeActive ? 'from-yellow-900/30 to-orange-900/30 border-yellow-500/30' : 'from-gray-900/30 to-gray-800/30 border-gray-500/30'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${isInfinityModeActive ? 'text-yellow-300' : 'text-gray-300'} text-sm font-medium`}>Infinity Core</p>
                  <p className="text-white text-lg font-bold">{isInfinityModeActive ? 'ACTIVE ∞' : 'STANDBY'}</p>
                </div>
                <div className={`w-8 h-8 ${isInfinityModeActive ? 'text-yellow-400 animate-pulse' : 'text-gray-400'}`}>
                  ∞
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Endpoints dengan MIORA Integration */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <Server className="w-5 h-5 mr-2" />
                  MIORA-Integrated API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiData.apis.map((api) => (
                    <div 
                      key={api.id}
                      className={`p-4 bg-black/20 rounded-lg border border-gray-600/30 cursor-pointer transition-all ${
                        selectedAPI === api.id ? 'ring-2 ring-purple-400/50' : ''
                      } ${api.mioraIntegrated ? 'border-l-4 border-l-purple-400' : ''}`}
                      onClick={() => setSelectedAPI(api.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Network className="w-5 h-5 text-purple-400" />
                          <div>
                            <h4 className="font-semibold text-white flex items-center gap-2">
                              {api.name}
                              {api.mioraIntegrated && <Badge className="bg-purple-500/20 text-purple-300 text-xs">MIORA</Badge>}
                              {api.infinityMode && <span className="text-cyan-400 text-xs">∞</span>}
                            </h4>
                            <p className="text-sm text-gray-400">{api.endpoint}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(api.status)}>
                            {api.status}
                          </Badge>
                          <Badge variant="outline" className={getMethodColor(api.method)}>
                            {api.method}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3">{api.description}</p>
                      
                      {/* MIORA-specific details */}
                      {api.mioraIntegrated && (
                        <div className="mb-3 p-2 bg-purple-500/10 rounded border border-purple-500/20">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {api.currentMode && (
                              <div>
                                <span className="text-purple-400">Mode:</span>
                                <div className="text-white font-medium">{api.currentMode}</div>
                              </div>
                            )}
                            {api.memoryUsage !== undefined && (
                              <div>
                                <span className="text-purple-400">Memory:</span>
                                <div className="text-white font-medium">{api.memoryUsage} items</div>
                              </div>
                            )}
                            {api.autonomousLearning !== undefined && (
                              <div>
                                <span className="text-purple-400">Learning:</span>
                                <div className="text-green-300 font-medium">{api.autonomousLearning ? 'ON' : 'OFF'}</div>
                              </div>
                            )}
                            {api.quantumBoost && (
                              <div>
                                <span className="text-purple-400">Quantum:</span>
                                <div className="text-cyan-300 font-medium">{api.quantumBoost}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Requests:</span>
                          <div className="text-white font-medium">{api.requests.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Success Rate:</span>
                          <div className="text-green-300 font-medium">{api.successRate}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Avg Response:</span>
                          <div className="text-cyan-300 font-medium">{api.avgResponse}ms</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Last Used:</span>
                          <div className="text-purple-300 font-medium">{api.lastUsed}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button size="sm" variant="outline" className="text-purple-400 border-purple-400/30">
                          <Brain className="w-4 h-4 mr-1" />
                          MIORA Sync
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel dengan MIORA Integration */}
          <div className="space-y-6">
            {/* MIORA System Status */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <Brain className="w-5 h-5 mr-2" />
                  MIORA System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className="text-white font-medium">v{mioraVersion}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Current Mode</span>
                    <Badge className="bg-purple-500/20 text-purple-300">
                      {modeConfig?.name || 'Standard'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Infinity Core</span>
                    <span className={`font-medium ${isInfinityModeActive ? 'text-cyan-300' : 'text-gray-400'}`}>
                      {isInfinityModeActive ? 'ACTIVE ∞' : 'STANDBY'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Background Learning</span>
                    <span className={`font-medium ${isBackgroundActive ? 'text-green-300' : 'text-gray-400'}`}>
                      {isBackgroundActive ? 'ACTIVE' : 'STANDBY'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Memory Usage</span>
                    <span className="text-cyan-300 font-medium">{memoryStats?.shortTermCount || 0} items</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-600/30">
                    <Button 
                      onClick={handleMioraSync}
                      disabled={isSyncing}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      {isSyncing ? (
                        <>
                          <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          Sync with MIORA
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Metrics dengan MIORA Integration */}
            <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-300">
                  <Activity className="w-5 h-5 mr-2" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">API Load</span>
                      <span className="text-cyan-300 font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">MIORA Integration</span>
                      <span className="text-green-300 font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Response Time</span>
                      <span className="text-green-300 font-medium">120ms</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Error Rate</span>
                      <span className="text-orange-300 font-medium">0.3%</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                  
                  <div className="pt-2 border-t border-gray-600/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1,247</div>
                      <div className="text-sm text-gray-400">Requests/hour</div>
                      {isInfinityModeActive && (
                        <div className="text-xs text-cyan-300 mt-1">∞ Quantum Enhanced</div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-green-300">
                  <Key className="w-5 h-5 mr-2" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Active Keys</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400">
                      12 keys
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">MIORA Keys</span>
                    <span className="text-purple-300">6 integrated</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rate Limits</span>
                    <span className="text-cyan-300">{isInfinityModeActive ? '∞ Unlimited' : '10k/hour'}</span>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate MIORA Key
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security dengan MIORA Integration */}
            <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-300">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">SSL/TLS</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">MIORA Shield</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">DDoS Protection</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Blocked Requests</span>
                    <span className="text-red-300">847 today</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-600/30">
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 font-medium">MIORA Protected</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions dengan MIORA Integration */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <Zap className="w-5 h-5 mr-2" />
                  MIORA Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    MIORA Analytics
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Neural Network Status
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Export MIORA Logs
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Wifi className="w-4 h-4 mr-2" />
                    System Health Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIGateway;
