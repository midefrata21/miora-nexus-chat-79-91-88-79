import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target } from 'lucide-react';

interface SystemStatusCardProps {
  mioraVersion: string;
  autonomousMode: boolean;
  onSelfImprovement: () => void;
  onUpdateVersion: () => void;
}

export const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  mioraVersion,
  autonomousMode,
  onSelfImprovement,
  onUpdateVersion,
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            MIORA Autonomous Learning System
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400">
            v{mioraVersion}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-gray-400 text-sm">Autonomous Mode:</span>
            <Badge variant="outline" className={`ml-2 ${autonomousMode ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
              {autonomousMode ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Evolution Permissions:</span>
            <Badge variant="outline" className="ml-2 text-cyan-400 border-cyan-400">
              GRANTED
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={onSelfImprovement}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Perform Self-Assessment
          </Button>
          <Button
            onClick={onUpdateVersion}
            variant="outline"
            size="sm"
          >
            <Target className="w-4 h-4 mr-2" />
            Update Version
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};