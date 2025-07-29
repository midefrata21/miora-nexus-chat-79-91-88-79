
import React from 'react';

interface AtomVisualizationProps {
  isLearning: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  pulseIntensity: number;
  brainActivity: number;
}

const AtomVisualization: React.FC<AtomVisualizationProps> = ({
  isLearning,
  isListening,
  isSpeaking,
  pulseIntensity,
  brainActivity
}) => {
  return (
    <div className="relative mx-auto mb-12 w-80 h-80 flex items-center justify-center">
      {/* Infinity Brain Core - Enhanced Inti Atom */}
      <div 
        className={`absolute w-24 h-24 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 rounded-full 
        shadow-[0_0_80px_rgba(34,211,238,0.9)] transition-all duration-1000 ${
          isSpeaking ? 'animate-pulse scale-150' : 
          isListening ? 'animate-ping scale-125' : 
          isLearning ? 'animate-spin scale-140' : 'scale-110'
        }`}
        style={{ 
          transform: `scale(${pulseIntensity * (isSpeaking ? 1.6 : isListening ? 1.4 : isLearning ? 1.5 : 1.2)}) rotate(${brainActivity}deg)`,
          filter: `hue-rotate(${brainActivity * 2}deg)`
        }}
      >
        {/* Inner infinity symbol */}
        <div className="w-full h-full bg-gradient-to-r from-white via-cyan-200 to-purple-200 rounded-full animate-spin-slow opacity-90 relative">
          <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse">
            <div className="absolute inset-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full animate-spin-reverse opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Orbital Ring 1 - Neural Network */}
      <div className="absolute w-48 h-48 border-2 border-cyan-400/70 rounded-full animate-spin-slow" style={{animationDuration: '8s'}}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.9)] animate-pulse"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-[0_0_25px_rgba(59,130,246,0.9)] animate-pulse"></div>
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.9)] animate-pulse"></div>
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-pink-400 rounded-full shadow-[0_0_25px_rgba(244,114,182,0.9)] animate-pulse"></div>
      </div>

      {/* Enhanced Orbital Ring 2 - Infinity Processing Layer */}
      <div className="absolute w-68 h-68 border-2 border-purple-400/60 rounded-full animate-spin-reverse" style={{animationDuration: '12s'}}>
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-purple-400 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.9)] animate-ping"></div>
        <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full shadow-[0_0_30px_rgba(244,114,182,0.9)] animate-ping"></div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.9)] animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-violet-400 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.9)] animate-ping"></div>
      </div>

      {/* Enhanced Orbital Ring 3 - Outer Neural Web */}
      <div className="absolute w-80 h-80 border border-green-400/50 rounded-full animate-spin-slow" style={{animationDuration: '20s'}}>
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.9)] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-emerald-400 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.9)] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.9)] animate-pulse"></div>
        <div className="absolute bottom-1/2 right-1/4 w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_22px_rgba(103,232,249,0.9)] animate-pulse"></div>
        <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-lime-400 rounded-full shadow-[0_0_18px_rgba(163,230,53,0.9)] animate-pulse"></div>
      </div>

      {/* Enhanced Infinity Brain Particle Effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${isLearning ? 'animate-ping' : 'animate-pulse'}`}
            style={{
              background: `hsl(${(i * 30 + brainActivity) % 360}, 70%, 60%)`,
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
              boxShadow: `0 0 20px hsl(${(i * 30 + brainActivity) % 360}, 70%, 60%)`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AtomVisualization;
