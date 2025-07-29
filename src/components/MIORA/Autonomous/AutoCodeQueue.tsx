import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code } from 'lucide-react';
import { AutoCodeTask } from './AutoCodeTask';
import { CodeGenerationTask } from './types';

interface AutoCodeQueueProps {
  tasks: CodeGenerationTask[];
}

export const AutoCodeQueue: React.FC<AutoCodeQueueProps> = ({ tasks }) => {
  return (
    <Card className="bg-gradient-to-r from-gray-900/50 to-purple-900/30 border-gray-500/30">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-300">
          <Brain className="w-5 h-5 mr-2" />
          Generation Queue ({tasks.length} tasks)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {tasks.map((task) => (
            <AutoCodeTask key={task.id} task={task} />
          ))}

          {tasks.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No generation tasks yet</p>
              <p className="text-sm">Activate the generator to start autonomous coding</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};