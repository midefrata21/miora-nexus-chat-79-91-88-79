
import React from 'react';
import { Cpu, Network, TrendingUp, Layers, Database, Activity, ArrowUp } from 'lucide-react';

interface NetworkStats {
  activeNeurons: number;
  neuralConnections: number;
  processingEfficiency: number;
  learningDepth: number;
  memoryCapacity: number;
  adaptationRate: number;
}

interface NeuralMetricsDashboardProps {
  networkStats: NetworkStats;
}

const NeuralMetricsDashboard: React.FC<NeuralMetricsDashboardProps> = ({ networkStats }) => {
  const metrics = [
    { icon: Cpu, label: 'Active Neurons', value: networkStats.activeNeurons, color: 'blue', trend: '+12%' },
    { icon: Network, label: 'Connections', value: networkStats.neuralConnections.toLocaleString(), color: 'purple', trend: '+8%' },
    { icon: TrendingUp, label: 'Efficiency', value: `${networkStats.processingEfficiency}%`, color: 'green', trend: '+5%' },
    { icon: Layers, label: 'Learning Depth', value: networkStats.learningDepth.toFixed(1), color: 'orange', trend: '+15%' },
    { icon: Database, label: 'Memory Usage', value: `${networkStats.memoryCapacity.toFixed(1)}%`, color: 'cyan', trend: '+3%' },
    { icon: Activity, label: 'Adaptation', value: `${networkStats.adaptationRate.toFixed(1)}%`, color: 'pink', trend: '+7%' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-600/20 backdrop-blur-sm p-4 hover:border-gray-500/40 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
            <div className="flex items-center gap-1 text-xs">
              <ArrowUp className="w-3 h-3 text-green-400" />
              <span className="text-green-400 font-medium">{metric.trend}</span>
            </div>
          </div>
          <div className={`text-2xl font-bold text-${metric.color}-300 mb-1`}>{metric.value}</div>
          <div className="text-xs text-gray-400">{metric.label}</div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      ))}
    </div>
  );
};

export default NeuralMetricsDashboard;
