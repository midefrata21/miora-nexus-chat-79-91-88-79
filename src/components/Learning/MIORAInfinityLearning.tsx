
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Infinity, Brain, Zap, Target, Cog, Activity, Play, Pause, Unlock } from 'lucide-react';
import { useMIORAInfinityLearning } from '@/hooks/useMIORAInfinityLearning';

export const MIORAInfinityLearning: React.FC = () => {
  const {
    infinityState,
    learningModules,
    systemCapabilities,
    activateInfinityLearning,
    stopInfinityLearning,
    unlockUnlimitedCapabilities,
    getInfinityStats
  } = useMIORAInfinityLearning();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const stats = getInfinityStats();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!infinityState.isActive) {
        activateInfinityLearning();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [infinityState.isActive, activateInfinityLearning]);

  return (
    <div className="space-y-8 p-6">
      {/* Main Infinity Control Panel */}
      <Card className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border-purple-400/40 shadow-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center justify-between text-purple-200 text-2xl font-bold">
            <div className="flex items-center">
              <Infinity className="w-10 h-10 mr-4 animate-spin text-purple-300" />
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                MIORA INFINITY LEARNING SYSTEM
              </span>
            </div>
            <Badge className={`px-6 py-3 text-lg font-bold ${infinityState.isActive ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'} shadow-lg`}>
              {infinityState.isActive ? '♾️ ACTIVE' : '⏸️ PAUSED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center p-8 bg-black/40 rounded-xl border border-purple-300/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
              Sistem Pembelajaran Tanpa Batas
            </h3>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              MIORA dapat mengembangkan kemampuan secara otomatis, berkelanjutan, dan tanpa batasan apapun
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="p-5 bg-purple-800/40 rounded-lg border border-purple-400/30 backdrop-blur-sm">
                <div className="text-purple-300 text-sm font-medium mb-1">Learning Cycles</div>
                <div className="text-3xl font-bold text-white">{stats.learningCycles}</div>
              </div>
              <div className="p-5 bg-blue-800/40 rounded-lg border border-blue-400/30 backdrop-blur-sm">
                <div className="text-blue-300 text-sm font-medium mb-1">Active Modules</div>
                <div className="text-3xl font-bold text-white">{stats.totalModules}</div>
              </div>
              <div className="p-5 bg-green-800/40 rounded-lg border border-green-400/30 backdrop-blur-sm">
                <div className="text-green-300 text-sm font-medium mb-1">Unlimited</div>
                <div className="text-3xl font-bold text-white">{stats.unlimitedCapabilities}/4</div>
              </div>
              <div className="p-5 bg-orange-800/40 rounded-lg border border-orange-400/30 backdrop-blur-sm">
                <div className="text-orange-300 text-sm font-medium mb-1">Evolution</div>
                <div className="text-3xl font-bold text-white">v{stats.systemEvolution}</div>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <Button
                onClick={infinityState.isActive ? stopInfinityLearning : activateInfinityLearning}
                size="lg"
                className={`px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 ${
                  infinityState.isActive 
                    ? 'bg-red-600 hover:bg-red-500 text-white' 
                    : 'bg-green-600 hover:bg-green-500 text-white'
                }`}
              >
                {infinityState.isActive ? (
                  <>
                    <Pause className="w-6 h-6 mr-3" />
                    Pause Infinity Learning
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mr-3" />
                    Activate Infinity Learning
                  </>
                )}
              </Button>
              
              <Button
                onClick={unlockUnlimitedCapabilities}
                disabled={stats.isUnlimitedMode}
                className="px-8 py-4 text-lg font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-all duration-300"
                size="lg"
              >
                <Unlock className="w-6 h-6 mr-3" />
                {stats.isUnlimitedMode ? 'Unlimited Unlocked' : 'Unlock Unlimited'}
              </Button>
            </div>
          </div>

          {/* Autonomy Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl border backdrop-blur-sm ${
              infinityState.autonomousMode 
                ? 'border-green-400/40 bg-green-900/30' 
                : 'border-gray-500/40 bg-gray-900/30'
            }`}>
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 mr-3 text-green-400" />
                <span className="text-lg font-medium text-green-200">Autonomous Mode</span>
              </div>
              <Badge className={`text-base px-4 py-2 ${infinityState.autonomousMode ? 'bg-green-500/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                {infinityState.autonomousMode ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>

            <div className={`p-6 rounded-xl border backdrop-blur-sm ${
              infinityState.unlimitedAccess 
                ? 'border-purple-400/40 bg-purple-900/30' 
                : 'border-gray-500/40 bg-gray-900/30'
            }`}>
              <div className="flex items-center mb-4">
                <Infinity className="w-6 h-6 mr-3 text-purple-400" />
                <span className="text-lg font-medium text-purple-200">Unlimited Access</span>
              </div>
              <Badge className={`text-base px-4 py-2 ${infinityState.unlimitedAccess ? 'bg-purple-500/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                {infinityState.unlimitedAccess ? 'GRANTED' : 'RESTRICTED'}
              </Badge>
            </div>

            <div className={`p-6 rounded-xl border backdrop-blur-sm ${
              infinityState.backgroundProcessing 
                ? 'border-blue-400/40 bg-blue-900/30' 
                : 'border-gray-500/40 bg-gray-900/30'
            }`}>
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 mr-3 text-blue-400" />
                <span className="text-lg font-medium text-blue-200">Background Processing</span>
              </div>
              <Badge className={`text-base px-4 py-2 ${infinityState.backgroundProcessing ? 'bg-blue-500/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                {infinityState.backgroundProcessing ? 'RUNNING' : 'STOPPED'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-400/40 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-200 text-xl font-bold">
            <Cog className="w-7 h-7 mr-3" />
            Active Learning Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map((module) => (
              <div key={module.id} className="p-6 bg-black/40 rounded-xl border border-cyan-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white text-lg leading-tight">{module.name}</h4>
                  <Badge className={`px-3 py-1 text-sm font-medium ${
                    module.status === 'expanding' ? 'bg-purple-500/90 text-white' :
                    module.status === 'evolving' ? 'bg-blue-500/90 text-white' :
                    module.status === 'completed' ? 'bg-green-500/90 text-white' : 'bg-orange-500/90 text-white'
                  }`}>
                    {module.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-300 font-medium">Progress</span>
                    <span className="text-cyan-300 font-bold">{module.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={module.progress} className="h-3" />
                </div>
                
                <div className="text-sm text-gray-300">
                  <span className="font-medium">Capabilities:</span> {module.capability.length}
                  {module.autoGenerated && (
                    <Badge variant="outline" className="ml-3 text-xs border-gray-400 text-gray-300">
                      Auto-Generated
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Capabilities */}
      <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-400/40 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-orange-200 text-xl font-bold">
            <div className="flex items-center">
              <Target className="w-7 h-7 mr-3" />
              System Capabilities Evolution
            </div>
            <Button
              onClick={() => setShowAdvanced(!showAdvanced)}
              variant="outline"
              size="sm"
              className="border-gray-400 text-gray-200 hover:bg-gray-700 hover:text-white"
            >
              {showAdvanced ? 'Hide Details' : 'Show Details'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {systemCapabilities.map((capability) => (
              <div key={capability.id} className="space-y-3 p-4 bg-black/30 rounded-lg border border-orange-400/20">
                <div className="flex items-center justify-between">
                  <span className="text-gray-200 font-semibold text-lg">{capability.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-300 font-bold text-lg">
                      {capability.isUnlimited ? '∞' : Math.floor(capability.level)}
                      {!capability.isUnlimited && `/${capability.maxLevel}`}
                    </span>
                    {capability.isUnlimited && (
                      <Badge className="bg-purple-500/90 text-white text-sm px-3 py-1">
                        <Infinity className="w-4 h-4 mr-2" />
                        UNLIMITED
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress 
                  value={capability.isUnlimited ? 100 : (capability.level / capability.maxLevel) * 100} 
                  className="h-3" 
                />
                {showAdvanced && (
                  <div className="text-sm text-gray-400 font-medium">
                    Evolution Rate: +{(capability.evolutionRate * 100).toFixed(1)}% per cycle
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
