
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Sparkles } from 'lucide-react';

interface EvolutionLevelIndicatorProps {
  level: number;
}

export const EvolutionLevelIndicator: React.FC<EvolutionLevelIndicatorProps> = ({ level }) => {
  const getEvolutionInfo = (level: number) => {
    switch (level) {
      case 1:
        return {
          name: 'Basic Adaptation',
          color: 'bg-blue-500',
          icon: <Brain className="h-4 w-4" />,
          description: 'Learning basic patterns'
        };
      case 2:
        return {
          name: 'Predictive Intelligence',
          color: 'bg-purple-500',
          icon: <Zap className="h-4 w-4" />,
          description: 'Advanced decision making'
        };
      case 3:
        return {
          name: 'Autonomous Innovation',
          color: 'bg-gradient-to-r from-purple-500 to-pink-500',
          icon: <Sparkles className="h-4 w-4" />,
          description: 'Self-improving capabilities'
        };
      default:
        return {
          name: 'Unknown',
          color: 'bg-gray-500',
          icon: <Brain className="h-4 w-4" />,
          description: 'Undefined level'
        };
    }
  };

  const evolutionInfo = getEvolutionInfo(level);

  return (
    <Badge className={`px-4 py-2 ${evolutionInfo.color} text-white`}>
      {evolutionInfo.icon}
      <span className="ml-2">
        Level {level}: {evolutionInfo.name}
      </span>
    </Badge>
  );
};
