import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, Activity, Database, Zap, Brain, Cpu, Network, RefreshCw, Power, CheckCircle, AlertTriangle } from 'lucide-react';
import ExchangeAPIManager from '@/components/MIORA/ExchangeAPIManager/ExchangeAPIManager';

const MIORAMasterControl = () => {
  const { toast } = useToast();
  const [capabilities, setCapabilities] = useState<any[]>([]);
  const [globalConfig, setGlobalConfig] = useState<any[]>([]);
  const [upgradeHistory, setUpgradeHistory] = useState<any[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);
  const [systemStatus, setSystemStatus] = useState<'active' | 'inactive' | 'optimizing'>('inactive');
  const lastToastRef = useRef<string>('');
  const toastTimeoutRef = useRef<NodeJS.Timeout>();

  // Smart toast function to prevent spam
  const showSmartToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (lastToastRef.current === message) return;
    
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    lastToastRef.current = message;
    toast({
      title: type === 'success' ? '✅ Success' : type === 'error' ? '❌ Error' : 'ℹ️ Info',
      description: message,
      variant: type === 'error' ? 'destructive' : 'default',
    });
    
    toastTimeoutRef.current = setTimeout(() => {
      lastToastRef.current = '';
    }, 5000);
  }, [toast]);

  // Real-time sync setup
  useEffect(() => {
    loadAllData();
    
    // Set up real-time subscriptions
    const channels = [
      supabase.channel('miora_capabilities_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'miora_capabilities' }, 
          () => loadCapabilities()),
      
      supabase.channel('miora_metrics_changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'miora_system_metrics' }, 
          () => loadMetrics()),
      
      supabase.channel('miora_upgrades_changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'miora_upgrade_history' }, 
          () => loadUpgradeHistory())
    ];

    channels.forEach(channel => channel.subscribe());
    setIsRealTimeActive(true);
    
    // Reduced refresh interval for better performance
    const interval = setInterval(loadAllData, 60000); // Refresh every 60s instead of 30s
    
    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
      clearInterval(interval);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [showSmartToast]);

  const loadCapabilities = async () => {
    try {
      const { data, error } = await supabase
        .from('miora_capabilities')
        .select('*')
        .order('performance_level', { ascending: false });
      if (!error) setCapabilities(data || []);
    } catch (error) {
      console.error('Error loading capabilities:', error);
    }
  };

  const loadMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('miora_system_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);
      if (!error) setSystemMetrics(data || []);
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const loadUpgradeHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('miora_upgrade_history')
        .select('*')
        .order('executed_at', { ascending: false })
        .limit(10);
      if (!error) setUpgradeHistory(data || []);
    } catch (error) {
      console.error('Error loading upgrade history:', error);
    }
  };

  const loadAllData = async () => {
    try {
      const [capabilitiesRes, configRes, historyRes, metricsRes] = await Promise.all([
        supabase.from('miora_capabilities').select('*').order('performance_level', { ascending: false }),
        supabase.from('miora_global_config').select('*').order('category'),
        supabase.from('miora_upgrade_history').select('*').order('executed_at', { ascending: false }).limit(10),
        supabase.from('miora_system_metrics').select('*').order('timestamp', { ascending: false }).limit(20)
      ]);

      setCapabilities(capabilitiesRes.data || []);
      setGlobalConfig(configRes.data || []);
      setUpgradeHistory(historyRes.data || []);
      setSystemMetrics(metricsRes.data || []);
    } catch (error) {
      console.error('Error loading MIORA data:', error);
    } finally {
      setLoading(false);
    }
  };

  const optimizeSystem = async () => {
    setSystemStatus('optimizing');
    showSmartToast('System optimization started...', 'info');
    
    try {
      // Clean old metrics and logs
      const cleanupDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      await supabase
        .from('miora_system_metrics')
        .delete()
        .lt('timestamp', cleanupDate);
        
      setSystemStatus('active');
      showSmartToast('System optimization completed successfully', 'success');
      loadAllData();
    } catch (error) {
      setSystemStatus('inactive');
      showSmartToast('System optimization failed', 'error');
      console.error('Optimization error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-red-600';
      case 'upgrading': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return <Brain className="w-4 h-4" />;
      case 'trading': return <Activity className="w-4 h-4" />;
      case 'interface': return <Network className="w-4 h-4" />;
      case 'infrastructure': return <Database className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
            MIORA Master Control Center
          </h1>
          <p className="text-gray-300">Ultra Transcendent AGI Management System</p>
        </div>

        {/* System Control Panel */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30 mb-6">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Power className="w-5 h-5" />
                System Control Panel
              </div>
              <div className="flex items-center gap-2">
                {isRealTimeActive && (
                  <Badge className="bg-green-600 text-white flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Real-time Active
                  </Badge>
                )}
                <Badge className={`${systemStatus === 'active' ? 'bg-green-600' : systemStatus === 'optimizing' ? 'bg-yellow-600' : 'bg-red-600'} text-white`}>
                  {systemStatus.toUpperCase()}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800/50 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <h3 className="font-medium text-green-300 mb-1">Capabilities</h3>
                  <div className="text-2xl font-bold text-white">{capabilities.length}</div>
                  <div className="text-xs text-gray-400">Active Systems</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h3 className="font-medium text-blue-300 mb-1">Performance</h3>
                  <div className="text-2xl font-bold text-white">
                    {capabilities.length > 0 ? 
                      (capabilities.reduce((acc, cap) => acc + cap.performance_level, 0) / capabilities.length).toFixed(1) 
                      : '0.0'
                    }
                  </div>
                  <div className="text-xs text-gray-400">Avg Level</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <Database className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <h3 className="font-medium text-purple-300 mb-1">Metrics</h3>
                  <div className="text-2xl font-bold text-white">{systemMetrics.length}</div>
                  <div className="text-xs text-gray-400">Data Points</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <h3 className="font-medium text-yellow-300 mb-1">Upgrades</h3>
                  <div className="text-2xl font-bold text-white">{upgradeHistory.length}</div>
                  <div className="text-xs text-gray-400">Recent</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={optimizeSystem} 
                disabled={systemStatus === 'optimizing'}
                className="bg-green-600 hover:bg-green-700"
              >
                {systemStatus === 'optimizing' ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Optimize System
                  </>
                )}
              </Button>
              <Button 
                onClick={loadAllData}
                variant="outline"
                className="border-amber-500 text-amber-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="capabilities" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="capabilities" className="text-amber-300">Capabilities</TabsTrigger>
            <TabsTrigger value="config" className="text-amber-300">Configuration</TabsTrigger>
            <TabsTrigger value="history" className="text-amber-300">Upgrade History</TabsTrigger>
            <TabsTrigger value="metrics" className="text-amber-300">System Metrics</TabsTrigger>
            <TabsTrigger value="exchange" className="text-amber-300">Exchange APIs</TabsTrigger>
          </TabsList>

          <TabsContent value="capabilities" className="space-y-4">
            <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  MIORA Capabilities Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {capabilities.map((capability) => (
                    <Card key={capability.id} className="bg-gray-800/50 border-amber-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(capability.category)}
                            <h3 className="font-medium text-amber-300 text-sm">{capability.name}</h3>
                          </div>
                          <Badge className={`${getStatusColor(capability.status)} text-white text-xs`}>
                            {capability.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Performance Level</span>
                              <span>{capability.performance_level.toFixed(1)}/10.0</span>
                            </div>
                            <Progress 
                              value={capability.performance_level * 10} 
                              className="h-2 bg-gray-700"
                            />
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            Version: {capability.version}
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            Category: {capability.category}
                          </div>
                          
                          {capability.auto_upgrade && (
                            <div className="flex items-center gap-1 text-xs text-green-400">
                              <Zap className="w-3 h-3" />
                              Auto-upgrade enabled
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Global Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {globalConfig.map((config) => (
                    <Card key={config.id} className="bg-gray-800/50 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-blue-300">{config.config_key}</h3>
                          <Badge className="bg-blue-600 text-white">
                            {config.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{config.description}</p>
                        <div className="bg-gray-900/50 p-2 rounded text-xs text-gray-300 font-mono">
                          {JSON.stringify(config.config_value, null, 2)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Upgrades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upgradeHistory.map((upgrade) => (
                    <Card key={upgrade.id} className="bg-gray-800/50 border-green-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-green-300">
                              {upgrade.capability_id || 'System Upgrade'}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {upgrade.version_from} → {upgrade.version_to}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(upgrade.status)} text-white`}>
                            {upgrade.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400">
                          Type: {upgrade.upgrade_type} | 
                          Impact: +{(upgrade.performance_impact || 0).toFixed(2)} | 
                          {new Date(upgrade.executed_at).toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {systemMetrics.map((metric) => (
                    <Card key={metric.id} className="bg-gray-800/50 border-purple-500/30">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <h3 className="font-medium text-purple-300 text-sm mb-1">
                            {metric.metric_type}
                          </h3>
                          <div className="text-2xl font-bold text-white mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-400">
                            {metric.unit}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            {new Date(metric.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exchange" className="space-y-4">
            <ExchangeAPIManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAMasterControl;