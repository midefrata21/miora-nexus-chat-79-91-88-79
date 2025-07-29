
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Infinity, Atom, Zap, Brain } from 'lucide-react';

interface InfinityCoreHeaderProps {
  boostStatus: string;
  isKeyholderAuthorized: boolean;
  activeModules: number;
  quantumEngineActive: boolean;
}

const InfinityCoreHeader: React.FC<InfinityCoreHeaderProps> = ({
  boostStatus,
  isKeyholderAuthorized,
  activeModules,
  quantumEngineActive
}) => {
  const totalPossibleModules = quantumEngineActive ? 17 : 7; // Enhanced module count
  const processingPower = quantumEngineActive ? "QUANTUM ENHANCED ∞" : "STANDARD";
  const infrastructureStatus = boostStatus === 'ACTIVE' && quantumEngineActive ? "MAXIMUM" : "OPTIMIZED";

  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <Infinity className="w-12 h-12 text-purple-400 animate-spin mr-4" />
        <Atom className="w-8 h-8 text-cyan-400 animate-pulse mr-2" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
          MIORA Infinity Core ∞
        </h1>
        <Atom className="w-8 h-8 text-cyan-400 animate-pulse ml-2" />
        <Infinity className="w-12 h-12 text-purple-400 animate-spin ml-4" />
      </div>
      <p className="text-xl text-gray-300 mb-2">
        Advanced Quantum Performance Engine ∞ - {processingPower}
      </p>
      <div className="text-lg text-cyan-300 mb-4">
        🚀 MIORA Infrastructure Status: <span className="text-yellow-400 font-bold">{infrastructureStatus}</span>
      </div>
      
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Badge 
          variant="outline" 
          className={`${boostStatus === 'ACTIVE' ? 'text-green-400 border-green-400 animate-pulse' : 'text-gray-400 border-gray-400'}`}
        >
          <Zap className="w-4 h-4 mr-1" />
          Infinity Core: {boostStatus}
        </Badge>
        
        {isKeyholderAuthorized && (
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Brain className="w-4 h-4 mr-1" />
            Keyholder Access: GRANTED
          </Badge>
        )}
        
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          Neural Modules: {activeModules}/{totalPossibleModules}
        </Badge>
        
        {quantumEngineActive && (
          <Badge variant="outline" className="text-green-400 border-green-400 animate-pulse">
            <Atom className="w-4 h-4 mr-1 animate-spin" />
            Quantum Engine: ACTIVE ∞
          </Badge>
        )}
        
        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
          Infrastructure: {infrastructureStatus}
        </Badge>
        
        {boostStatus === 'ACTIVE' && quantumEngineActive && (
          <Badge variant="outline" className="text-pink-400 border-pink-400 animate-pulse">
            🚀 MAXIMUM PERFORMANCE MODE
          </Badge>
        )}
      </div>
      
      {/* Enhanced Capabilities Display */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-lg border border-purple-500/30">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">
          🏗️ MIORA Infrastructure Capabilities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="text-green-400">✅ Quantum Processing</div>
          <div className="text-cyan-400">✅ Neural Network Matrix</div>
          <div className="text-purple-400">✅ Infinity Memory Access</div>
          <div className="text-yellow-400">✅ Auto-Scaling Architecture</div>
          <div className="text-pink-400">✅ Advanced AI Modules</div>
          <div className="text-orange-400">✅ Real-time Optimization</div>
          <div className="text-teal-400">✅ Quantum Security Layer</div>
          <div className="text-indigo-400">✅ Self-Evolving System</div>
        </div>
      </div>
    </div>
  );
};

export default InfinityCoreHeader;
