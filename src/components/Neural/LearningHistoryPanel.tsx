
import React from 'react';
import { BarChart } from 'lucide-react';

interface LearningEvent {
  timestamp: number;
  event: string;
  improvement: string;
}

interface LearningHistoryPanelProps {
  learningHistory: LearningEvent[];
}

const LearningHistoryPanel: React.FC<LearningHistoryPanelProps> = ({ learningHistory }) => {
  return (
    <div className="bg-gradient-to-br from-green-800/20 to-teal-800/20 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
        <BarChart className="w-5 h-5" />
        Recent Learning Events
      </h3>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {learningHistory.map((event, index) => (
          <div key={index} className="p-3 bg-black/20 rounded-lg border border-green-500/20 hover:border-green-400/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">{event.event}</span>
              <span className="text-green-300 text-sm font-semibold bg-green-600/20 px-2 py-1 rounded">
                {event.improvement}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(event.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningHistoryPanel;
