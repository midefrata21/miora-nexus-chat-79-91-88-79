
import React from 'react';
import { Settings } from 'lucide-react';

interface AdvancedFeatures {
  deepLearningMode: boolean;
  patternMemoryActive: boolean;
  adaptiveLearningEnabled: boolean;
  quantumProcessingBoost: boolean;
  crossModuleSync: boolean;
  predictiveAnalytics: boolean;
}

interface AdvancedFeaturesControlProps {
  advancedFeatures: AdvancedFeatures;
  onToggleFeature: (feature: keyof AdvancedFeatures) => void;
}

const AdvancedFeaturesControl: React.FC<AdvancedFeaturesControlProps> = ({
  advancedFeatures,
  onToggleFeature
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-purple-800/20 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Advanced Features
      </h3>
      <div className="space-y-3">
        {Object.entries(advancedFeatures).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-gray-600/20 cursor-pointer hover:bg-black/30 transition-all">
            <span className="text-sm text-gray-300">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={value}
                onChange={() => onToggleFeature(key as keyof AdvancedFeatures)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${value ? 'bg-purple-600' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${value ? 'translate-x-5' : 'translate-x-1'} mt-1`}></div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AdvancedFeaturesControl;
