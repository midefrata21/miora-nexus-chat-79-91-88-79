import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Target, BookOpen, ChevronRight } from 'lucide-react';

interface LearningAcceleratorProps {
  accelerator: {
    knowledgeExtractor: any;
    patternRecognition: any;
    learningOptimizer: any;
    skillSynthesizer: any;
  };
  isActive: boolean;
}

export const AutonomousLearningAccelerator: React.FC<LearningAcceleratorProps> = ({ accelerator, isActive }) => {
  const modules = [
    accelerator.knowledgeExtractor,
    accelerator.patternRecognition,
    accelerator.learningOptimizer,
    accelerator.skillSynthesizer
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-300">
            <Brain className="w-6 h-6 mr-2" />
            Autonomous Learning Accelerator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <h3 className="text-yellow-300 font-medium">{module.name}</h3>
                <Progress value={module.progress} className="h-2 mt-2" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <Button className="bg-yellow-600 hover:bg-yellow-700" disabled={!isActive}>
              <Zap className="w-4 h-4 mr-2" />
              Accelerate Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};