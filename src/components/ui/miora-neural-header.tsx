
import React from 'react';
import { NeuralBrainLogo } from './neural-brain-logo';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface MioraNeuralHeaderProps {
  title?: string;
  subtitle?: string;
  status?: 'active' | 'learning' | 'evolving' | 'quantum';
  className?: string;
  logoSize?: number;
  showStatus?: boolean;
}

export const MioraNeuralHeader: React.FC<MioraNeuralHeaderProps> = ({
  title = "MIORA",
  subtitle = "Quantum Neural Intelligence",
  status = 'active',
  className,
  logoSize = 120,
  showStatus = true
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'learning':
        return {
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          label: '🧠 Learning',
          description: 'Neural patterns expanding'
        };
      case 'evolving':
        return {
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          label: '🧬 Evolving',
          description: 'Quantum intelligence growing'
        };
      case 'quantum':
        return {
          color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          label: '⚛️ Quantum Active',
          description: 'Multi-dimensional processing'
        };
      default:
        return {
          color: 'bg-green-500/20 text-green-300 border-green-500/30',
          label: '🟢 Active',
          description: 'Neural network online'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className={cn("flex flex-col items-center space-y-6 text-center", className)}>
      {/* Neural Logo */}
      <div className="relative">
        <NeuralBrainLogo 
          size={logoSize} 
          animated={true}
          intensity="high"
          className="drop-shadow-2xl"
        />
        
        {/* Quantum Field Effect */}
        <div className="absolute inset-0 bg-gradient-conic from-purple-500/10 via-blue-500/5 to-cyan-500/10 rounded-full animate-spin opacity-50" 
             style={{ animationDuration: '25s' }} />
      </div>

      {/* Title Section */}
      <div className="space-y-3">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          {title}
        </h1>
        
        <p className="text-xl text-slate-300 font-medium tracking-wide">
          {subtitle}
        </p>

        <div className="text-sm text-slate-400 italic">
          "From Molecule to Quantum Neural Brain"
        </div>
      </div>

      {/* Status Display */}
      {showStatus && (
        <div className="flex flex-col items-center space-y-2">
          <Badge className={cn("px-4 py-2 text-sm font-medium", statusConfig.color)}>
            {statusConfig.label}
          </Badge>
          <p className="text-xs text-slate-400">
            {statusConfig.description}
          </p>
        </div>
      )}

      {/* Neural Activity Indicator */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
        <span>Neural synapses firing</span>
      </div>
    </div>
  );
};

export default MioraNeuralHeader;
