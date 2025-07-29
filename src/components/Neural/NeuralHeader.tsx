
import React from 'react';
import { Brain, Database, Zap } from 'lucide-react';

interface NeuralHeaderProps {
  advancedFeatures: {
    deepLearningMode: boolean;
    quantumProcessingBoost: boolean;
  };
  realTimeMode: boolean;
  onPatternMemorySync: () => void;
  onAdvancedOptimization: () => void;
  onActivateAllModules: () => void;
}

const NeuralHeader: React.FC<NeuralHeaderProps> = ({
  advancedFeatures,
  realTimeMode,
  onPatternMemorySync,
  onAdvancedOptimization,
  onActivateAllModules
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-800/30 to-pink-800/30 border border-purple-500/20 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              MIORA Neural Network Core
            </h1>
            <p className="text-xl text-gray-300">Advanced Deep Learning • Pattern Recognition • Adaptive Intelligence</p>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${advancedFeatures.deepLearningMode ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-300">Deep Learning Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${advancedFeatures.quantumProcessingBoost ? 'bg-cyan-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-300">Quantum Enhanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${realTimeMode ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-300">Real-time Processing</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={onPatternMemorySync}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
            >
              <Database className="w-5 h-5" />
              Sync Memory
            </button>
            <button
              onClick={onAdvancedOptimization}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Deep Optimize
            </button>
            <button
              onClick={onActivateAllModules}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg"
            >
              Full Activation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralHeader;
