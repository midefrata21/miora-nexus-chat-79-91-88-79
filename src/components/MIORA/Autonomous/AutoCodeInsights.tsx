import React from 'react';
import { Sparkles } from 'lucide-react';
import { AiInsights } from './types';

interface AutoCodeInsightsProps {
  aiInsights: AiInsights;
}

export const AutoCodeInsights: React.FC<AutoCodeInsightsProps> = ({ aiInsights }) => {
  return (
    <div className="border-t border-purple-500/20 pt-4">
      <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center">
        <Sparkles className="w-4 h-4 mr-2" />
        AI Intelligence Metrics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-300">{aiInsights.codeQuality}%</div>
          <div className="text-xs text-gray-400">Code Quality</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-cyan-300">{aiInsights.securityScore}%</div>
          <div className="text-xs text-gray-400">Security Score</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-300">{aiInsights.performanceScore}%</div>
          <div className="text-xs text-gray-400">Performance</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-pink-300">{aiInsights.maintainabilityIndex}%</div>
          <div className="text-xs text-gray-400">Maintainability</div>
        </div>
      </div>
    </div>
  );
};