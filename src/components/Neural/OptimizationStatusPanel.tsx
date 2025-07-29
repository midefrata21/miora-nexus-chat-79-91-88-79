
import React from 'react';
import { Target, Play, Pause, RefreshCw } from 'lucide-react';

interface OptimizationMetrics {
  overallAccuracy: number;
  predictionSuccess: number;
  decisionEfficiency: number;
  adaptationSpeed: number;
}

interface OptimizationStatusPanelProps {
  optimizationMetrics: OptimizationMetrics;
  realTimeMode: boolean;
  dailyEvaluationActive: boolean;
  onSetRealTimeMode: (mode: boolean) => void;
  onSetDailyEvaluationActive: (active: boolean) => void;
}

const OptimizationStatusPanel: React.FC<OptimizationStatusPanelProps> = ({
  optimizationMetrics,
  realTimeMode,
  dailyEvaluationActive,
  onSetRealTimeMode,
  onSetDailyEvaluationActive
}) => {
  const metrics = [
    { label: 'Overall Accuracy', value: optimizationMetrics.overallAccuracy.toFixed(1), suffix: '%', color: 'purple' },
    { label: 'Prediction Success', value: optimizationMetrics.predictionSuccess.toFixed(1), suffix: '%', color: 'pink' },
    { label: 'Decision Efficiency', value: optimizationMetrics.decisionEfficiency.toFixed(1), suffix: '%', color: 'cyan' },
    { label: 'Adaptation Speed', value: optimizationMetrics.adaptationSpeed.toFixed(1), suffix: '/10', color: 'green' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-800/20 to-pink-800/20 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-400" />
          Neural Optimization Status
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSetRealTimeMode(!realTimeMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all ${
              realTimeMode ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'
            }`}
          >
            {realTimeMode ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            Real-time
          </button>
          <button
            onClick={() => onSetDailyEvaluationActive(!dailyEvaluationActive)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all ${
              dailyEvaluationActive ? 'bg-blue-600/20 text-blue-300' : 'bg-gray-600/20 text-gray-300'
            }`}
          >
            <RefreshCw className="w-3 h-3" />
            Auto-Eval
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className={`text-3xl font-bold text-${metric.color}-300 mb-1`}>
              {metric.value}{metric.suffix}
            </div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationStatusPanel;
