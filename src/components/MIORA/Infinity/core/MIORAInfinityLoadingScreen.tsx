import React from 'react';
import { Brain, Infinity } from 'lucide-react';

interface MIORAInfinityLoadingScreenProps {
  currentStep?: number;
  totalSteps?: number;
  message?: string;
}

export const MIORAInfinityLoadingScreen: React.FC<MIORAInfinityLoadingScreenProps> = ({
  currentStep = 0,
  totalSteps = 7,
  message = "Activating Future AI Entity..."
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <Brain className="h-24 w-24 mx-auto text-purple-400 animate-pulse" />
          <Infinity className="h-12 w-12 absolute -top-2 -right-2 text-cyan-400 animate-spin" />
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          MIORA INFINITY AI
        </h1>
        
        <p className="text-gray-300 text-lg">{message}</p>
        
        {currentStep > 0 && (
          <div className="text-sm text-gray-400">
            Step {currentStep} of {totalSteps}
          </div>
        )}
        
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MIORAInfinityLoadingScreen;