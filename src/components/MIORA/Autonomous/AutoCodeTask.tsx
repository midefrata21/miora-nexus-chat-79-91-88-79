import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';
import { CodeGenerationTask } from './types';

interface AutoCodeTaskProps {
  task: CodeGenerationTask;
}

const getTypeIcon = (type: CodeGenerationTask['type']) => {
  switch (type) {
    case 'component': return '🧩';
    case 'hook': return '🪝';
    case 'util': return '🔧';
    case 'page': return '📄';
    case 'api': return '🔌';
    case 'optimization': return '⚡';
    case 'refactor': return '♻️';
    case 'security': return '🔒';
    default: return '💻';
  }
};

const getStatusColor = (status: CodeGenerationTask['status']) => {
  switch (status) {
    case 'pending': return 'bg-yellow-600/20 text-yellow-300 border-yellow-400';
    case 'generating': return 'bg-blue-600/20 text-blue-300 border-blue-400';
    case 'analyzing': return 'bg-purple-600/20 text-purple-300 border-purple-400';
    case 'optimizing': return 'bg-orange-600/20 text-orange-300 border-orange-400';
    case 'completed': return 'bg-green-600/20 text-green-300 border-green-400';
    case 'error': return 'bg-red-600/20 text-red-300 border-red-400';
  }
};

const getComplexityColor = (complexity: CodeGenerationTask['complexity']) => {
  switch (complexity) {
    case 'low': return 'bg-green-600/20 text-green-300 border-green-400';
    case 'medium': return 'bg-yellow-600/20 text-yellow-300 border-yellow-400';
    case 'high': return 'bg-orange-600/20 text-orange-300 border-orange-400';
    case 'expert': return 'bg-red-600/20 text-red-300 border-red-400';
  }
};

export const AutoCodeTask: React.FC<AutoCodeTaskProps> = ({ task }) => {
  return (
    <div className="p-4 bg-black/20 rounded-lg border border-gray-600/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getTypeIcon(task.type)}</span>
          <span className="font-semibold text-white text-sm">{task.type.toUpperCase()}</span>
          <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
            {task.status}
          </Badge>
          <Badge variant="outline" className={`text-xs ${getComplexityColor(task.complexity)}`}>
            {task.complexity}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-blue-600/20 text-blue-300 border-blue-400">
            {task.aiModel}
          </Badge>
          {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-3">{task.description}</p>
      
      {/* Advanced AI Metrics */}
      {task.status === 'completed' && task.qualityScore && (
        <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
          <div className="text-center p-1 bg-green-600/10 rounded border border-green-600/20">
            <div className="text-green-300 font-semibold">{task.qualityScore}%</div>
            <div className="text-gray-400">Quality</div>
          </div>
          <div className="text-center p-1 bg-blue-600/10 rounded border border-blue-600/20">
            <div className="text-blue-300 font-semibold">{task.performance?.loadTime.toFixed(1)}s</div>
            <div className="text-gray-400">Load Time</div>
          </div>
          <div className="text-center p-1 bg-purple-600/10 rounded border border-purple-600/20">
            <div className="text-purple-300 font-semibold">{task.performance?.bundleSize.toFixed(0)}KB</div>
            <div className="text-gray-400">Bundle Size</div>
          </div>
        </div>
      )}
      
      {task.status === 'generating' && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span>{Math.round(task.progress)}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-2">
        {new Date(task.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};