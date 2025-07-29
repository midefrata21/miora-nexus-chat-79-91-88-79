import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap, BarChart3, Activity, Target, Eye, Brain } from 'lucide-react';
import { activePairs } from '../utils';

interface HeaderSectionProps {
  isActive: boolean;
  signalsCount: number;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ isActive, signalsCount }) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <Zap className="h-12 w-12 text-orange-400 animate-pulse" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
          CRYPTO SCALPING SIGNALS
        </h1>
        <BarChart3 className="h-12 w-12 text-green-400 animate-bounce" />
      </div>
      <p className="text-gray-300 text-xl">
        Sinyal Scalping Real-Time dengan Analisis Teknikal Maksimal ⚡
      </p>
      
      <div className="flex items-center justify-center space-x-4 flex-wrap">
        <Badge className={`px-4 py-2 ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}>
          <Activity className="h-4 w-4 mr-2" />
          {isActive ? 'ACTIVE' : 'STANDBY'}
        </Badge>
        <Badge className="px-4 py-2 bg-orange-500">
          <Target className="h-4 w-4 mr-2" />
          Signals: {signalsCount}
        </Badge>
        <Badge className="px-4 py-2 bg-purple-500">
          <Eye className="h-4 w-4 mr-2" />
          Pairs: {activePairs.length}
        </Badge>
        <Badge className="px-4 py-2 bg-cyan-500">
          <Brain className="h-4 w-4 mr-2" />
          Accuracy: 85-95%
        </Badge>
      </div>
    </div>
  );
};