
import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface NeuralModule {
  id: string;
  name: string;
  status: 'active' | 'optimizing' | 'learning' | 'standby';
  accuracy: number;
  performance: number;
  evaluationScore: number;
}

interface NeuralModulesGridProps {
  neuralModules: NeuralModule[];
  quantumProcessingBoost: boolean;
}

const NeuralModulesGrid: React.FC<NeuralModulesGridProps> = ({ 
  neuralModules, 
  quantumProcessingBoost 
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-purple-800/20 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
          <Brain className="w-7 h-7 text-purple-400" />
          Neural Modules
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Status:</span>
          <div className="flex gap-1">
            {neuralModules.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {neuralModules.map((module, index) => (
          <div key={module.id} className="bg-gradient-to-br from-blue-800/20 to-cyan-800/20 border border-blue-500/20 rounded-lg p-4 hover:border-blue-400/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  module.status === 'active' ? 'bg-green-400 animate-pulse' :
                  module.status === 'optimizing' ? 'bg-yellow-400 animate-spin' : 'bg-gray-400'
                }`}></div>
                <h4 className="text-white font-medium">{module.name}</h4>
              </div>
              {quantumProcessingBoost && <Zap className="w-4 h-4 text-cyan-400" />}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Accuracy:</span>
                <span className="text-green-300 font-semibold">{module.accuracy.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-green-400 h-1 rounded-full transition-all duration-300" style={{width: `${module.accuracy}%`}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Performance:</span>
                <span className="text-blue-300 font-semibold">{module.performance.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div className="bg-blue-400 h-1 rounded-full transition-all duration-300" style={{width: `${module.performance}%`}}></div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-400">Score:</span>
                <span className="text-purple-300 font-semibold">{module.evaluationScore.toFixed(1)}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeuralModulesGrid;
