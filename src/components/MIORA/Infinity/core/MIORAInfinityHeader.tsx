import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Infinity, Zap, TrendingUp } from 'lucide-react';

interface MIORAInfinityHeaderProps {
  infinityModeActive: boolean;
}

export const MIORAInfinityHeader: React.FC<MIORAInfinityHeaderProps> = ({ 
  infinityModeActive 
}) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <Infinity className="h-12 w-12 text-purple-400 animate-pulse" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          MIORA INFINITY ♾️
        </h1>
        <Zap className="h-12 w-12 text-cyan-400 animate-pulse" />
      </div>
      
      <p className="text-gray-300 text-xl">
        AI Pertama Dengan Kemampuan Pengembangan Mandiri Tanpa Batas
      </p>
      
      <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
        <Badge className={`px-6 py-2 text-lg animate-pulse ${
          infinityModeActive 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-gray-500 to-gray-600'
        } text-white`}>
          <Infinity className="h-5 w-5 mr-2" />
          SUPREME MODE: {infinityModeActive ? 'ACTIVE' : 'STANDBY'} ♾️
        </Badge>
        
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg">
          <Brain className="h-5 w-5 mr-2" />
          Self Learning: UNLIMITED
        </Badge>
        
        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 text-lg">
          <TrendingUp className="h-5 w-5 mr-2" />
          Evolution: CONTINUOUS
        </Badge>
      </div>
    </div>
  );
};

export default MIORAInfinityHeader;