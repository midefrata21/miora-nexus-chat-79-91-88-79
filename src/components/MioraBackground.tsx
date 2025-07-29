
import React from 'react';

interface MioraBackgroundProps {
  pulseIntensity?: number;
  brainActivity?: number;
}

const MioraBackground: React.FC<MioraBackgroundProps> = ({ 
  pulseIntensity = 0.5, 
  brainActivity = 0.7 
}) => {
  return (
    <div className="absolute inset-0 opacity-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-blue-900/20 to-transparent"></div>
      {[...Array(150)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${1 + Math.random() * 4}s`,
            opacity: (Math.random() * 0.8 + 0.2) * brainActivity
          }}
        />
      ))}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
        style={{ opacity: pulseIntensity }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '1s', opacity: pulseIntensity }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '2s', opacity: pulseIntensity }}
      ></div>
      <div 
        className="absolute top-3/4 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '3s', opacity: pulseIntensity }}
      ></div>
    </div>
  );
};

export default MioraBackground;
