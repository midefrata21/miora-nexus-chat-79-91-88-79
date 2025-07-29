
import React from 'react';
import { Signal, Eye } from 'lucide-react';

interface SignalOutput {
  signal: string;
  confidence: number;
  timestamp: number;
  source: string;
  validated: boolean;
}

interface ActiveSignalsPanelProps {
  activeSignals: SignalOutput[];
  predictiveAnalytics: boolean;
  quantumProcessingBoost: boolean;
}

const ActiveSignalsPanel: React.FC<ActiveSignalsPanelProps> = ({
  activeSignals,
  predictiveAnalytics,
  quantumProcessingBoost
}) => {
  return (
    <div className="bg-gradient-to-br from-orange-800/20 to-red-800/20 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-orange-300 mb-4 flex items-center gap-2">
        <Signal className="w-5 h-5" />
        Active Neural Signals
        {predictiveAnalytics && <Eye className="w-4 h-4 text-cyan-400" />}
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activeSignals.slice(-4).reverse().map((signal, index) => (
          <div key={index} className="p-3 bg-black/20 rounded-lg border border-orange-500/20 hover:border-orange-400/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">{signal.signal}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  signal.confidence > 85 ? 
                    (quantumProcessingBoost ? 'bg-cyan-600/20 text-cyan-300' : 'bg-green-600/20 text-green-300') 
                    : 'bg-yellow-600/20 text-yellow-300'
                }`}>
                  {signal.confidence.toFixed(1)}%
                  {quantumProcessingBoost && signal.confidence > 85 && ' ⚡'}
                </span>
                {signal.validated && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center justify-between">
              <span>{signal.source}</span>
              <span>{new Date(signal.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveSignalsPanel;
