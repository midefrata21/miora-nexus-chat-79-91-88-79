
import React from 'react';
import { Brain, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SystemStatsProps {
  messagesLength: number;
  useGroqAPI: boolean;
  strategicPatternsLength: number;
  communicationStyle: string;
  isLearning: boolean;
  onShowCapabilities: () => void;
  memoryStats?: {
    shortTermCount: number;
    longTermCount: number;
    totalInteractions: number;
  };
  currentMode?: string;
}

const SystemStats: React.FC<SystemStatsProps> = ({
  messagesLength,
  useGroqAPI,
  strategicPatternsLength,
  communicationStyle,
  isLearning,
  onShowCapabilities,
  memoryStats = { shortTermCount: 0, longTermCount: 0, totalInteractions: 0 },
  currentMode = 'Assistant'
}) => {
  if (messagesLength === 0) return null;

  return (
    <div className="mt-8 max-w-md">
      <Card className="bg-black/30 border-cyan-500/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <h3 className="text-cyan-300 text-sm font-semibold mb-2 flex items-center justify-between">
            <span className="flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Infinity AI System Status
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowCapabilities}
              className="text-xs text-purple-300 hover:text-purple-200"
            >
              View Details →
            </Button>
          </h3>
          <div className="text-xs text-gray-300 space-y-1">
            <div className="flex items-center">
              <Zap className="w-3 h-3 mr-2 text-green-400" />
              <span>Mode: {currentMode}</span>
            </div>
            <div className="flex items-center">
              <Database className="w-3 h-3 mr-2 text-blue-400" />
              <span>Memory: {memoryStats.shortTermCount}ST + {memoryStats.longTermCount}LT</span>
            </div>
            <p>Total Interactions: {memoryStats.totalInteractions}</p>
            <p>AI Engine: {useGroqAPI ? 'Groq Mixtral-8x7B' : 'Local Adaptive'}</p>
            <p>Strategic Patterns: {strategicPatternsLength}</p>
            <p>Communication: {communicationStyle}</p>
            <p>Status: {isLearning ? 'Learning...' : 'Ready'}</p>
            
            {memoryStats.shortTermCount > 12 && (
              <div className="mt-2 p-2 bg-yellow-500/20 rounded text-yellow-300 text-xs">
                ⚠️ Memory approaching compression threshold
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStats;
