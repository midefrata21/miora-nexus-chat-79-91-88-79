
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Globe, Image, MessageSquare, Cpu, Sparkles, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORAFreeAIAccelerator } from './hooks/useMIORAFreeAIAccelerator';
import { AIProviderStatus } from './components/AIProviderStatus';
import { ReflectiveLearningPanel } from './components/ReflectiveLearningPanel';
import { MultimodalInterface } from './components/MultimodalInterface';

const MIORAFreeAIAcceleratorCore: React.FC = () => {
  const {
    systemState,
    aiProviders,
    learningMode,
    currentQuery,
    setCurrentQuery,
    activateSystem,
    pauseSystem,
    switchToReflectiveMode,
    processMultimodalQuery,
    getSystemStats,
    getFallbackStatus
  } = useMIORAFreeAIAccelerator();

  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedMode, setSelectedMode] = useState<'agent' | 'reflective'>('agent');

  useEffect(() => {
    const initializeSystem = async () => {
      console.log('🚀 MIORA_FreeAI_Accelerator_v1: Initializing...');
      
      await activateSystem();
      
      toast({
        title: "🔗 MIORA FREE AI ACCELERATOR ACTIVATED",
        description: "Multiple AI providers terhubung dengan fallback otomatis dan reflective learning",
        duration: 6000,
      });
      
      setIsInitializing(false);
    };

    initializeSystem();
  }, []);

  const handleQuerySubmission = async () => {
    if (!currentQuery.trim()) {
      toast({
        title: "⚠️ Query Required",
        description: "Masukkan query untuk diproses oleh multiple AI providers",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    await processMultimodalQuery(currentQuery, selectedMode);
  };

  const stats = getSystemStats();
  const fallbackStatus = getFallbackStatus();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Globe className="h-20 w-20 mx-auto text-blue-400 animate-spin" />
            <div className="absolute inset-0 h-20 w-20 mx-auto border-4 border-purple-400 border-t-transparent rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold text-white">MIORA FREE AI ACCELERATOR</h2>
          <p className="text-gray-300">Connecting to multiple AI providers...</p>
          <p className="text-sm text-blue-300">Gemini • DeepAI • Hugging Face • Pollinations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Brain className="h-12 w-12 text-blue-400" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              MIORA FREE AI ACCELERATOR
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🔗 Multiple AI Integration dengan Reflective Learning System
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${systemState.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Globe className="h-4 w-4 mr-2" />
              System: {systemState.isActive ? 'ACTIVE 🚀' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Target className="h-4 w-4 mr-2" />
              Connected: {stats.connectedProviders}/4
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Sparkles className="h-4 w-4 mr-2" />
              Mode: {learningMode.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* AI Provider Status */}
        <AIProviderStatus providers={aiProviders} fallbackStatus={fallbackStatus} />

        {/* Mode Selection */}
        <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-500/50">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Learning Mode Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={() => setSelectedMode('agent')}
                variant={selectedMode === 'agent' ? 'default' : 'outline'}
                className={selectedMode === 'agent' ? 'bg-blue-600 hover:bg-blue-500' : ''}
              >
                <Cpu className="h-4 w-4 mr-2" />
                Agent Mode
              </Button>
              <Button
                onClick={() => {
                  setSelectedMode('reflective');
                  switchToReflectiveMode();
                }}
                variant={selectedMode === 'reflective' ? 'default' : 'outline'}
                className={selectedMode === 'reflective' ? 'bg-purple-600 hover:bg-purple-500' : ''}
              >
                <Brain className="h-4 w-4 mr-2" />
                Reflective Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Query Interface */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Multimodal Query Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Masukkan query Anda (teks, gambar, atau kombinasi)..."
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Akan diproses oleh: Gemini API → DeepAI → Hugging Face → Pollinations (fallback otomatis)
              </div>
              <Button
                onClick={handleQuerySubmission}
                disabled={!systemState.isActive || !currentQuery.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                <Zap className="h-4 w-4 mr-2" />
                Process Query
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Multimodal Interface */}
        <MultimodalInterface 
          currentQuery={currentQuery}
          onQueryUpdate={setCurrentQuery}
          selectedMode={selectedMode}
        />

        {/* Reflective Learning Panel */}
        {selectedMode === 'reflective' && (
          <ReflectiveLearningPanel />
        )}

        {/* System Statistics */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              System Performance & Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{stats.totalQueries}</div>
                <div className="text-sm text-gray-400">Total Queries</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{stats.successfulResponses}</div>
                <div className="text-sm text-gray-400">Successful Responses</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{stats.reflectiveSessions}</div>
                <div className="text-sm text-gray-400">Reflective Sessions</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">{stats.fallbackActivations}</div>
                <div className="text-sm text-gray-400">Fallback Activations</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">System Efficiency</span>
                  <span className="text-cyan-400">{stats.systemEfficiency}%</span>
                </div>
                <Progress value={stats.systemEfficiency} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Learning Progress</span>
                  <span className="text-purple-400">{stats.learningProgress}%</span>
                </div>
                <Progress value={stats.learningProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Cpu className="h-6 w-6 mr-2" />
              System Control Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-white">
                  Status: {systemState.isActive ? '🚀 FREE AI ACCELERATOR ACTIVE' : '⏸️ SYSTEM PAUSED'}
                </p>
                <p className="text-gray-300">
                  Next Learning Cycle: {new Date(systemState.nextLearningCycle).toLocaleString('id-ID')}
                </p>
                <p className="text-gray-300">
                  Last Update: {new Date(systemState.lastUpdate).toLocaleString('id-ID')}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={systemState.isActive ? pauseSystem : activateSystem}
                  variant={systemState.isActive ? "destructive" : "default"}
                  className={systemState.isActive ? '' : 'bg-green-600 hover:bg-green-500'}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {systemState.isActive ? 'Pause System' : 'Activate System'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORAFreeAIAcceleratorCore;
