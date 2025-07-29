
import React from 'react';
import { cn } from '@/lib/utils';

interface QuantumNeuralBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  animated?: boolean;
}

export const QuantumNeuralBackground: React.FC<QuantumNeuralBackgroundProps> = ({
  intensity = 'medium',
  className,
  animated = true
}) => {
  const getIntensityConfig = (level: string) => {
    switch (level) {
      case 'low':
        return { opacity: 0.3, particleCount: 15, animationSpeed: '25s' };
      case 'high':
        return { opacity: 0.7, particleCount: 40, animationSpeed: '15s' };
      default:
        return { opacity: 0.5, particleCount: 25, animationSpeed: '20s' };
    }
  };

  const config = getIntensityConfig(intensity);

  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Neural Network Grid */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <defs>
            <pattern id="neuralGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="url(#neuralGradient)" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#neuralGrid)" />
        </svg>
      </div>

      {/* Floating Neural Particles */}
      {animated && Array.from({ length: config.particleCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            opacity: config.opacity * (0.5 + Math.random() * 0.5)
          }}
        />
      ))}

      {/* Quantum Energy Waves */}
      <div className="absolute inset-0">
        {[1, 2, 3].map((wave) => (
          <div
            key={wave}
            className="absolute inset-0 bg-gradient-conic from-purple-500/10 via-transparent to-blue-500/10 rounded-full"
            style={{
              animation: animated ? `spin ${config.animationSpeed} linear infinite` : 'none',
              animationDelay: `${wave * 2}s`,
              transform: `scale(${0.8 + wave * 0.4})`,
              opacity: config.opacity / wave
            }}
          />
        ))}
      </div>

      {/* Central Neural Pulse */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </div>

      {/* Synaptic Connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: config.opacity }}>
        <defs>
          <linearGradient id="synapseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Dynamic Connection Lines */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const endX = Math.random() * 100;
          const endY = Math.random() * 100;
          
          return (
            <line
              key={i}
              x1={`${startX}%`}
              y1={`${startY}%`}
              x2={`${endX}%`}
              y2={`${endY}%`}
              stroke="url(#synapseGlow)"
              strokeWidth="1"
              opacity="0.3"
              className={animated ? "animate-pulse" : ""}
              style={{ 
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default QuantumNeuralBackground;
