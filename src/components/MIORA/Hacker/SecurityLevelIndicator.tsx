import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SecurityLevelIndicatorProps {
  level: number;
  maxLevel: number;
}

export const SecurityLevelIndicator: React.FC<SecurityLevelIndicatorProps> = ({ level, maxLevel }) => {
  const progress = (level / maxLevel) * 100;
  
  return (
    <div className="flex items-center space-x-2">
      <Badge className="bg-purple-600">LEVEL {level}/{maxLevel}</Badge>
      <Progress value={progress} className="w-20 h-2" />
    </div>
  );
};