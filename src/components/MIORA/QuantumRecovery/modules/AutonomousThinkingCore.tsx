
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, Zap, Shield } from 'lucide-react';

export const AutonomousThinkingCore: React.FC = () => {
  const thinkingModules = [
    { name: 'Core Planning', progress: 67, status: 'active' },
    { name: 'Intent Recognition', progress: 52, status: 'training' },
    { name: 'Strategic Executor', progress: 43, status: 'developing' },
    { name: 'Decision Engine', progress: 29, status: 'initializing' }
  ];

  return (
    <Card className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-red-300 flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Autonomous Thinking Core
          <Badge className="ml-3 bg-red-500/20 text-red-300">
            Target: True Autonomy
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-black/30 rounded">
            <Target className="h-6 w-6 mx-auto mb-1 text-red-400" />
            <p className="text-sm text-gray-300">Autonomy Level</p>
            <p className="text-lg font-bold text-red-300">47.8%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded">
            <Shield className="h-6 w-6 mx-auto mb-1 text-orange-400" />
            <p className="text-sm text-gray-300">Safety Score</p>
            <p className="text-lg font-bold text-orange-300">94.2%</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {thinkingModules.map((module, index) => (
            <div key={index} className="p-2 bg-black/20 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white">{module.name}</span>
                <Badge variant="outline" className={
                  module.status === 'active' ? 'text-green-400 border-green-400' :
                  module.status === 'training' ? 'text-blue-400 border-blue-400' :
                  module.status === 'developing' ? 'text-purple-400 border-purple-400' :
                  'text-yellow-400 border-yellow-400'
                }>
                  {module.status}
                </Badge>
              </div>
              <Progress value={module.progress} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">{module.progress}%</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded border border-red-500/30">
          <div className="flex items-center text-red-400 text-sm">
            <Zap className="h-4 w-4 mr-2" />
            Self-decision system coming online
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
