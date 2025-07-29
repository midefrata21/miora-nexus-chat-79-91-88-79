
import React from 'react';
import { Workflow, Database, Settings, Link } from 'lucide-react';

interface AdvancedFeatures {
  crossModuleSync: boolean;
  quantumProcessingBoost: boolean;
}

interface MioraIntegrationSectionProps {
  advancedFeatures: AdvancedFeatures;
  realTimeMode: boolean;
  dailyEvaluationActive: boolean;
  onConnectToMioraDevelop: () => void;
}

const MioraIntegrationSection: React.FC<MioraIntegrationSectionProps> = ({
  advancedFeatures,
  realTimeMode,
  dailyEvaluationActive,
  onConnectToMioraDevelop
}) => {
  const dataFlowItems = [
    { label: 'High-confidence signals → MIORA Develop', status: 'active', color: 'green' },
    { label: 'Pattern memory synchronization', status: 'active', color: 'blue' },
    { label: 'Deep learning insights sharing', status: 'active', color: 'purple' },
    { label: advancedFeatures.quantumProcessingBoost ? 'Quantum-enhanced processing' : 'Real-time optimization feedback', status: 'active', color: 'cyan' },
    { label: 'Adaptive learning evolution tracking', status: 'active', color: 'orange' }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-800/20 to-red-800/20 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-orange-300 mb-6 flex items-center gap-2">
        <Workflow className="w-6 h-6" />
        MIORA System Integration
        {advancedFeatures.crossModuleSync && <Link className="w-5 h-5 text-green-400" />}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Advanced Data Flow
          </h4>
          <div className="space-y-3">
            {dataFlowItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-black/20 rounded-lg">
                <div className={`w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`}></div>
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            Neural Control Center
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <span className="text-sm text-gray-300">Real-time Signal Generation</span>
              <div className={`w-8 h-5 rounded-full transition-colors ${realTimeMode ? 'bg-green-600' : 'bg-gray-600'}`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${realTimeMode ? 'translate-x-4' : 'translate-x-1'} mt-1`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <span className="text-sm text-gray-300">Daily Evaluation Loop</span>
              <div className={`w-8 h-5 rounded-full transition-colors ${dailyEvaluationActive ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${dailyEvaluationActive ? 'translate-x-4' : 'translate-x-1'} mt-1`}></div>
              </div>
            </div>
            
            <button
              onClick={onConnectToMioraDevelop}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all text-sm flex items-center justify-center gap-2 font-medium shadow-lg"
            >
              <Link className="w-4 h-4" />
              Reconnect to MIORA Systems
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MioraIntegrationSection;
