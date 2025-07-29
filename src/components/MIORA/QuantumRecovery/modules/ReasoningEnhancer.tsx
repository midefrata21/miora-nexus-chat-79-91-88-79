
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, Lightbulb, TrendingUp } from 'lucide-react';

export const ReasoningEnhancer: React.FC = () => {
  const reasoningModules = [
    { name: 'Chain-of-Thought', progress: 89, status: 'active' },
    { name: 'Logic Builder', progress: 72, status: 'developing' },
    { name: 'Deductive Engine', progress: 56, status: 'training' },
    { name: 'Predictive Logic', progress: 43, status: 'initializing' }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Reasoning Power Enhancer
          <Badge className="ml-3 bg-blue-500/20 text-blue-300">
            Target: ≥95% Accuracy
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-black/30 rounded">
            <Target className="h-6 w-6 mx-auto mb-1 text-blue-400" />
            <p className="text-sm text-gray-300">Current Accuracy</p>
            <p className="text-lg font-bold text-blue-300">87.3%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded">
            <Lightbulb className="h-6 w-6 mx-auto mb-1 text-purple-400" />
            <p className="text-sm text-gray-300">Logic Steps</p>
            <p className="text-lg font-bold text-purple-300">12.4K</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {reasoningModules.map((module, index) => (
            <div key={index} className="p-2 bg-black/20 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white">{module.name}</span>
                <Badge variant="outline" className={
                  module.status === 'active' ? 'text-green-400 border-green-400' :
                  module.status === 'developing' ? 'text-blue-400 border-blue-400' :
                  module.status === 'training' ? 'text-purple-400 border-purple-400' :
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

        <div className="p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded border border-blue-500/30">
          <div className="flex items-center text-blue-400 text-sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Multi-hop reasoning capability expanding
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
