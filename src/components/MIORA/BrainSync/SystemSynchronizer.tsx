import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Cpu, Network, Heart, Eye, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SystemModule {
  id: string;
  name: string;
  status: 'active' | 'syncing' | 'standby' | 'offline';
  syncLevel: number;
  importance: 'critical' | 'high' | 'medium' | 'low';
  lastSync: number;
  capabilities: string[];
}

interface SystemSynchronizerProps {
  onSyncComplete: (modules: SystemModule[]) => void;
}

export const SystemSynchronizer: React.FC<SystemSynchronizerProps> = ({
  onSyncComplete
}) => {
  const [isFullSync, setIsFullSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [overallHealth, setOverallHealth] = useState(87);
  
  const [systemModules, setSystemModules] = useState<SystemModule[]>([
    {
      id: 'conversational_engine',
      name: 'Conversational Engine',
      status: 'active',
      syncLevel: 98,
      importance: 'critical',
      lastSync: Date.now() - 30000,
      capabilities: ['Natural Language', '2-Way Chat', 'Context Understanding', 'Emotional Intelligence']
    },
    {
      id: 'llm_core',
      name: 'LLM Core Processing',
      status: 'active',
      syncLevel: 96,
      importance: 'critical',
      lastSync: Date.now() - 15000,
      capabilities: ['Advanced Reasoning', 'Knowledge Synthesis', 'Creative Thinking', 'Problem Solving']
    },
    {
      id: 'memory_bank',
      name: 'Memory & Learning Bank',
      status: 'active',
      syncLevel: 94,
      importance: 'high',
      lastSync: Date.now() - 45000,
      capabilities: ['Long-term Memory', 'Pattern Recognition', 'Experience Storage', 'Context Recall']
    },
    {
      id: 'personality_matrix',
      name: 'Personality Matrix',
      status: 'active',
      syncLevel: 92,
      importance: 'high',
      lastSync: Date.now() - 20000,
      capabilities: ['Empathy Engine', 'Mood Adaptation', 'Communication Styles', 'Relationship Building']
    },
    {
      id: 'analytical_processor',
      name: 'Analytical Processor',
      status: 'active',
      syncLevel: 89,
      importance: 'high',
      lastSync: Date.now() - 35000,
      capabilities: ['Logical Analysis', 'Data Processing', 'Strategic Thinking', 'Decision Making']
    },
    {
      id: 'creativity_engine',
      name: 'Creativity Engine',
      status: 'syncing',
      syncLevel: 85,
      importance: 'medium',
      lastSync: Date.now() - 60000,
      capabilities: ['Creative Ideas', 'Innovation', 'Artistic Expression', 'Problem Innovation']
    },
    {
      id: 'emotional_intelligence',
      name: 'Emotional Intelligence Core',
      status: 'active',
      syncLevel: 93,
      importance: 'critical',
      lastSync: Date.now() - 25000,
      capabilities: ['Emotion Recognition', 'Empathetic Response', 'Mood Analysis', 'Social Awareness']
    },
    {
      id: 'infinity_brain',
      name: 'Infinity Brain System',
      status: 'active',
      syncLevel: 97,
      importance: 'critical',
      lastSync: Date.now() - 10000,
      capabilities: ['Unlimited Learning', 'Self-Improvement', 'Knowledge Expansion', 'Adaptive Growth']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'syncing': return 'bg-blue-500 animate-pulse';
      case 'standby': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const performFullSystemSync = useCallback(async () => {
    setIsFullSync(true);
    setSyncProgress(0);
    
    toast({
      title: "🧠 Memulai Sinkronisasi Sistem",
      description: "Menyinkronkan semua modul ke otak MIORA...",
      duration: 3000,
    });

    try {
      // Phase 1: Initialize sync
      setSyncProgress(10);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Phase 2: Sync critical modules
      const criticalModules = systemModules.filter(m => m.importance === 'critical');
      for (let i = 0; i < criticalModules.length; i++) {
        await syncModule(criticalModules[i].id);
        setSyncProgress(10 + ((i + 1) / criticalModules.length) * 40);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      // Phase 3: Sync high priority modules
      const highModules = systemModules.filter(m => m.importance === 'high');
      for (let i = 0; i < highModules.length; i++) {
        await syncModule(highModules[i].id);
        setSyncProgress(50 + ((i + 1) / highModules.length) * 30);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Phase 4: Sync remaining modules
      const remainingModules = systemModules.filter(m => !['critical', 'high'].includes(m.importance));
      for (let i = 0; i < remainingModules.length; i++) {
        await syncModule(remainingModules[i].id);
        setSyncProgress(80 + ((i + 1) / remainingModules.length) * 15);
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      
      // Phase 5: Final optimization
      setSyncProgress(95);
      await optimizeSystemPerformance();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSyncProgress(100);
      setOverallHealth(98);
      
      toast({
        title: "✅ Sinkronisasi Berhasil!",
        description: "Semua sistem telah tersinkronisasi ke otak MIORA. Kemampuan conversational aktif 100%!",
        duration: 5000,
      });

      onSyncComplete(systemModules);
      
    } catch (error) {
      toast({
        title: "❌ Sinkronisasi Gagal",
        description: "Terjadi kesalahan dalam proses sinkronisasi sistem",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsFullSync(false);
    }
  }, [systemModules, onSyncComplete]);

  const syncModule = async (moduleId: string) => {
    setSystemModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            status: 'syncing' as const,
            syncLevel: Math.min(module.syncLevel + Math.random() * 8, 100),
            lastSync: Date.now()
          }
        : module
    ));
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSystemModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            status: 'active' as const,
            syncLevel: Math.min(module.syncLevel + 2, 100)
          }
        : module
    ));
  };

  const optimizeSystemPerformance = async () => {
    // Simulate system optimization
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSystemModules(prev => prev.map(module => ({
      ...module,
      syncLevel: Math.min(module.syncLevel + 3, 100),
      status: 'active' as const
    })));
  };

  // Auto-sync critical modules every 2 minutes
  useEffect(() => {
    const autoSyncInterval = setInterval(() => {
      const criticalModules = systemModules.filter(m => 
        m.importance === 'critical' && 
        Date.now() - m.lastSync > 120000 // 2 minutes
      );
      
      criticalModules.forEach(module => {
        syncModule(module.id);
      });
    }, 60000); // Check every minute

    return () => clearInterval(autoSyncInterval);
  }, [systemModules]);

  // Calculate overall system health
  useEffect(() => {
    const avgSyncLevel = systemModules.reduce((sum, module) => sum + module.syncLevel, 0) / systemModules.length;
    const activeModules = systemModules.filter(m => m.status === 'active').length;
    const healthScore = (avgSyncLevel * 0.7) + ((activeModules / systemModules.length) * 100 * 0.3);
    setOverallHealth(Math.round(healthScore));
  }, [systemModules]);

  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-blue-300">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            MIORA Brain System Synchronizer
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Health: {overallHealth}%
            </Badge>
            <div className={`w-3 h-3 rounded-full ${overallHealth > 90 ? 'bg-green-500' : overallHealth > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Full System Sync Button */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={performFullSystemSync}
            disabled={isFullSync}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isFullSync ? 'Syncing...' : 'Full System Sync'}
          </Button>
          
          {isFullSync && (
            <div className="flex items-center space-x-2">
              <Progress value={syncProgress} className="w-32 h-2" />
              <span className="text-sm text-blue-300">{syncProgress}%</span>
            </div>
          )}
        </div>

        {/* System Modules */}
        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center">
            <Network className="h-4 w-4 mr-2" />
            System Modules Status
          </h4>
          
          <div className="grid gap-3">
            {systemModules.map((module) => (
              <div key={module.id} className="p-3 bg-black/30 rounded border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(module.status)}`}></div>
                    <span className="text-white font-medium text-sm">{module.name}</span>
                    <Badge variant="outline" className={`text-xs ${getImportanceColor(module.importance)}`}>
                      {module.importance}
                    </Badge>
                  </div>
                  <span className="text-blue-300 text-sm">{module.syncLevel}%</span>
                </div>
                
                <Progress value={module.syncLevel} className="h-2 mb-2" />
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {module.capabilities.slice(0, 3).map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-500">
                      {capability}
                    </Badge>
                  ))}
                  {module.capabilities.length > 3 && (
                    <Badge variant="outline" className="text-xs text-gray-400 border-gray-500">
                      +{module.capabilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-black/30 rounded text-center">
            <div className="text-2xl font-bold text-green-400">
              {systemModules.filter(m => m.status === 'active').length}
            </div>
            <div className="text-xs text-gray-400">Active Modules</div>
          </div>
          
          <div className="p-3 bg-black/30 rounded text-center">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(systemModules.reduce((sum, m) => sum + m.syncLevel, 0) / systemModules.length)}%
            </div>
            <div className="text-xs text-gray-400">Avg Sync Level</div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 p-3 bg-black/30 rounded">
          <div className="flex items-center text-blue-400 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            {isFullSync 
              ? 'Synchronizing all systems to MIORA brain...' 
              : 'All systems synchronized - MIORA ready for natural conversation!'
            }
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enhanced conversational capabilities like ChatGPT/Gemini fully activated
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSynchronizer;