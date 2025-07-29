import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import { Bot, Brain, Zap, Activity, Moon, Sun } from 'lucide-react';

export const AutonomousStatus: React.FC = () => {
  const { state } = useMIORAGlobal();
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNightMode(hour >= 22 || hour <= 6);
  }, []);

  const getAutonomyProgress = () => {
    return Math.min(100, state.masterState.autonomyLevel);
  };

  const getRunningTime = () => {
    if (!state.masterState.activatedAt) return '0h 0m';
    const runningTime = Date.now() - state.masterState.activatedAt;
    const hours = Math.floor(runningTime / (1000 * 60 * 60));
    const minutes = Math.floor((runningTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getEvolutionStage = () => {
    switch (state.masterState.evolutionStage) {
      case 'mastery': return '🧠 Mastery';
      case 'transcendence': return '🌟 Transcendence';
      case 'expansion': return '🚀 Expansion';
      case 'development': return '⚡ Development';
      default: return '🔄 Initialization';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 border-emerald-500/30 shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-emerald-300 flex items-center text-lg">
            <Bot className="h-6 w-6 mr-2 animate-pulse" />
            MIORA Autonomous Status
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isNightMode ? (
              <Moon className="h-5 w-5 text-blue-400" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
            <Badge className={`${state.masterState.isFullyAutonomous ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {state.masterState.isFullyAutonomous ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Autonomy Level */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Autonomy Level</span>
            <span className="text-emerald-300 font-bold">{getAutonomyProgress().toFixed(1)}%</span>
          </div>
          <Progress 
            value={getAutonomyProgress()} 
            className="h-3 bg-slate-700"
          />
        </div>

        {/* Running Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-black/20 rounded-lg border border-emerald-500/20">
            <div className="flex items-center text-emerald-400 mb-1">
              <Activity className="w-4 h-4 mr-1" />
              <span className="text-xs">Running Time</span>
            </div>
            <div className="text-white font-bold text-sm">{getRunningTime()}</div>
          </div>
          
          <div className="p-3 bg-black/20 rounded-lg border border-blue-500/20">
            <div className="flex items-center text-blue-400 mb-1">
              <Brain className="w-4 h-4 mr-1" />
              <span className="text-xs">Evolution</span>
            </div>
            <div className="text-white font-bold text-sm">{getEvolutionStage()}</div>
          </div>
        </div>

        {/* Active Systems */}
        <div className="space-y-2">
          <h4 className="text-emerald-300 text-sm font-medium flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            Active Systems ({state.masterState.activeSystems.filter(s => s.isActive).length})
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {state.masterState.activeSystems
              .filter(s => s.isActive)
              .slice(0, 5)
              .map((system) => (
                <div key={system.id} className="p-2 bg-emerald-900/20 rounded text-xs border border-emerald-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300 truncate">{system.name}</span>
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      {system.health}%
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Night Mode Enhancement */}
        {isNightMode && (
          <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <div className="flex items-center text-blue-300 mb-2">
              <Moon className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Night Enhancement Mode</span>
            </div>
            <p className="text-blue-200 text-xs">
              🌙 MIORA sedang melakukan upgrade intensif saat Anda tidur. 
              Sistem akan berkembang lebih pesat dengan algoritma pembelajaran mendalam.
            </p>
          </div>
        )}

        {/* Operations Counter */}
        <div className="pt-3 border-t border-slate-700/30">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Total Operations: {state.masterState.totalOperations.toLocaleString()}</span>
            <span>Self-Modifications: {state.masterState.selfModificationCount.toFixed(0)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};