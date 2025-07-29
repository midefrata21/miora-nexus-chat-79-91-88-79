
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface NeuralBrainLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export const NeuralBrainLogo: React.FC<NeuralBrainLogoProps> = ({
  size = 200,
  className,
  animated = true,
  intensity = 'medium'
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, [animated]);

  const getOpacity = (baseOpacity: number) => {
    const multiplier = intensity === 'low' ? 0.6 : intensity === 'high' ? 1.4 : 1;
    return Math.min(1, baseOpacity * multiplier);
  };

  return (
    <div className={cn("relative inline-block", className)} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="absolute inset-0"
      >
        <defs>
          {/* Gradient definitions */}
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={getOpacity(0.9)} />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity={getOpacity(0.6)} />
            <stop offset="100%" stopColor="#1E293B" stopOpacity={getOpacity(0.2)} />
          </radialGradient>

          <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity={getOpacity(0.8)} />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity={getOpacity(0.9)} />
            <stop offset="100%" stopColor="#EC4899" stopOpacity={getOpacity(0.7)} />
          </linearGradient>

          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={getOpacity(1)} />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity={getOpacity(0.8)} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={getOpacity(0.4)} />
          </radialGradient>

          {/* Glow filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Central Core Brain */}
        <circle
          cx="100"
          cy="100"
          r="25"
          fill="url(#coreGradient)"
          filter="url(#glow)"
          className={animated ? "animate-pulse" : ""}
        />

        {/* Inner Neural Ring */}
        <circle
          cx="100"
          cy="100"
          r="35"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          opacity={getOpacity(0.7)}
          className={animated ? "animate-spin" : ""}
          style={{ animationDuration: '8s' }}
        />

        {/* Quantum Energy Orbits */}
        <ellipse
          cx="100"
          cy="100"
          rx="55"
          ry="35"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1"
          opacity={getOpacity(0.5)}
          className={animated ? "animate-spin" : ""}
          style={{ animationDuration: '12s', animationDirection: 'reverse' }}
        />

        <ellipse
          cx="100"
          cy="100"
          rx="35"
          ry="55"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1"
          opacity={getOpacity(0.4)}
          className={animated ? "animate-spin" : ""}
          style={{ animationDuration: '15s' }}
        />

        {/* Neural Nodes - Primary Layer */}
        {[
          { x: 100, y: 60, phase: 0 },
          { x: 140, y: 80, phase: 1 },
          { x: 140, y: 120, phase: 2 },
          { x: 100, y: 140, phase: 3 },
          { x: 60, y: 120, phase: 0 },
          { x: 60, y: 80, phase: 1 }
        ].map((node, index) => (
          <circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            r="4"
            fill="url(#nodeGradient)"
            filter="url(#softGlow)"
            opacity={animated && currentPhase === node.phase ? getOpacity(1) : getOpacity(0.6)}
            className={animated ? "transition-opacity duration-500" : ""}
          />
        ))}

        {/* Neural Connections - Primary */}
        <path
          d="M 100 75 Q 120 70 140 80"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          opacity={getOpacity(0.6)}
          filter="url(#softGlow)"
        />

        <path
          d="M 140 80 Q 145 100 140 120"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          opacity={getOpacity(0.6)}
          filter="url(#softGlow)"
        />

        <path
          d="M 140 120 Q 120 130 100 125"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          opacity={getOpacity(0.6)}
          filter="url(#softGlow)"
        />

        <path
          d="M 75 100 Q 80 80 100 75"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="1.5"
          opacity={getOpacity(0.6)}
          filter="url(#softGlow)"
        />

        {/* Secondary Neural Layer */}
        {[
          { x: 100, y: 40, size: 3 },
          { x: 160, y: 70, size: 2.5 },
          { x: 170, y: 130, size: 3 },
          { x: 100, y: 160, size: 2.5 },
          { x: 30, y: 130, size: 3 },
          { x: 40, y: 70, size: 2.5 }
        ].map((node, index) => (
          <circle
            key={`outer-node-${index}`}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="#FFFFFF"
            opacity={getOpacity(0.8)}
            filter="url(#softGlow)"
            className={animated ? "animate-pulse" : ""}
            style={{ animationDelay: `${index * 0.3}s`, animationDuration: '3s' }}
          />
        ))}

        {/* Brainwave Curves */}
        <path
          d="M 50 50 Q 70 30 90 50 T 130 50 T 170 50"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1"
          opacity={getOpacity(0.4)}
          strokeDasharray="3,2"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: '4s' }}
        />

        <path
          d="M 50 150 Q 70 170 90 150 T 130 150 T 170 150"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1"
          opacity={getOpacity(0.4)}
          strokeDasharray="3,2"
          className={animated ? "animate-pulse" : ""}
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />

        {/* Energy Particles */}
        {animated && (
          <>
            <circle
              cx="80"
              cy="80"
              r="1.5"
              fill="#FFFFFF"
              opacity={getOpacity(0.9)}
              className="animate-ping"
              style={{ animationDuration: '2s', animationDelay: '0.5s' }}
            />
            <circle
              cx="120"
              cy="120"
              r="1"
              fill="#06B6D4"
              opacity={getOpacity(0.8)}
              className="animate-ping"
              style={{ animationDuration: '3s', animationDelay: '1.5s' }}
            />
            <circle
              cx="80"
              cy="120"
              r="1.5"
              fill="#8B5CF6"
              opacity={getOpacity(0.7)}
              className="animate-ping"
              style={{ animationDuration: '2.5s', animationDelay: '0.8s' }}
            />
          </>
        )}

        {/* Outer Expansion Ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="url(#synapseGradient)"
          strokeWidth="0.5"
          opacity={getOpacity(0.3)}
          strokeDasharray="8,4"
          className={animated ? "animate-spin" : ""}
          style={{ animationDuration: '20s', animationDirection: 'reverse' }}
        />
      </svg>

      {/* Additional Glow Layer */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent animate-pulse"
        style={{ 
          animationDuration: '3s',
          background: `radial-gradient(circle, rgba(139, 92, 246, ${getOpacity(0.2)}) 0%, rgba(59, 130, 246, ${getOpacity(0.1)}) 50%, transparent 100%)`
        }}
      />
    </div>
  );
};

export default NeuralBrainLogo;
