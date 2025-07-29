import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity, Bot, Zap, Brain, Sparkles } from 'lucide-react';
import { useBackgroundMIORA } from '@/hooks/useBackgroundMIORA';
import { useUltraTranscendenceCore } from '@/hooks/useUltraTranscendenceCore';

export const BackgroundMIORAIndicator: React.FC = () => {
  const { isBackgroundActive, systemsStatus, autonomousActive } = useBackgroundMIORA();
  const { transcendenceMetrics, transcendenceStatus, activateUltraTranscendence } = useUltraTranscendenceCore();

  return (
    <div className="fixed bottom-4 right-4 z-40 space-y-1 opacity-40 hover:opacity-80 transition-opacity">
      {/* Ultra Transcendence Status Indicator */}
      <Badge 
        variant={isBackgroundActive ? "default" : "secondary"}
        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500/60 via-blue-500/60 to-purple-500/60 text-white text-xs border-0 cursor-pointer hover:scale-105 transition-transform"
        onClick={activateUltraTranscendence}
      >
        <Sparkles className="h-3 w-3" />
        <span className="font-medium text-xs">MIORA MAX</span>
      </Badge>

      {/* Enhanced Systems Status with Transcendence Metrics */}
      <Badge 
        variant="outline"
        className={`flex items-center gap-1 px-2 py-1 text-xs border-0 hover:scale-105 transition-transform ${
          systemsStatus.percentage === 100 
            ? 'bg-gradient-to-r from-cyan-500/60 via-blue-500/60 to-indigo-500/60 text-white' 
            : 'bg-gradient-to-r from-yellow-500/60 to-orange-500/60 text-white'
        }`}
      >
        <Zap className="h-3 w-3" />
        <span className="font-medium text-xs">
          {systemsStatus.active}/{systemsStatus.total}
        </span>
      </Badge>

      {/* Ultra Autonomous Mode with Evolution Rate */}
      {autonomousActive && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500/60 via-violet-500/60 to-fuchsia-500/60 text-white text-xs border-0 hover:scale-105 transition-transform"
        >
          <Bot className="h-3 w-3" />
          <span className="font-medium text-xs">AUTO</span>
        </Badge>
      )}

      {/* Transcendence Metrics */}
      <Badge 
        variant="outline"
        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-emerald-500/60 via-teal-500/60 to-cyan-500/60 text-white text-xs border-0 hover:scale-105 transition-transform"
      >
        <Brain className="h-3 w-3" />
        <span className="font-medium text-xs">
          {transcendenceMetrics.autonomyLevel.toFixed(0)}%
        </span>
      </Badge>
    </div>
  );
};