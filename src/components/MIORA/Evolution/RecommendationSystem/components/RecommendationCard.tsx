
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Mic, Database, Cpu, Cloud, Zap, Play, CheckCircle, Clock, Target } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'voice' | 'memory' | 'ai' | 'infrastructure' | 'optimization';
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTime: string;
  impact: number;
  dependencies: string[];
  status: 'pending' | 'executing' | 'completed' | 'failed';
  executionCommand: string;
  expectedOutcome: string;
  progress: number;
}

interface ExecutionItem {
  id: string;
  recommendationId: string;
  title: string;
  status: 'queued' | 'executing' | 'completed' | 'failed';
  progress: number;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onExecute: (id: string) => void;
  executionStatus?: ExecutionItem;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onExecute,
  executionStatus
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return Brain;
      case 'voice': return Mic;
      case 'memory': return Database;
      case 'ai': return Brain;
      case 'infrastructure': return Cloud;
      case 'optimization': return Zap;
      default: return Cpu;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'from-purple-600/20 to-pink-600/20 border-purple-500/30';
      case 'voice': return 'from-blue-600/20 to-cyan-600/20 border-blue-500/30';
      case 'memory': return 'from-green-600/20 to-emerald-600/20 border-green-500/30';
      case 'ai': return 'from-indigo-600/20 to-purple-600/20 border-indigo-500/30';
      case 'infrastructure': return 'from-gray-600/20 to-slate-600/20 border-gray-500/30';
      case 'optimization': return 'from-yellow-600/20 to-orange-600/20 border-yellow-500/30';
      default: return 'from-gray-600/20 to-slate-600/20 border-gray-500/30';
    }
  };

  const IconComponent = getCategoryIcon(recommendation.category);
  const isExecuting = recommendation.status === 'executing' || executionStatus?.status === 'executing';
  const isCompleted = recommendation.status === 'completed';

  return (
    <Card className={`bg-gradient-to-br ${getCategoryColor(recommendation.category)} hover:border-cyan-400/50 transition-all duration-300`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconComponent className="w-5 h-5 text-cyan-400" />
            <CardTitle className="text-white text-lg">{recommendation.title}</CardTitle>
          </div>
          <Badge className={getPriorityColor(recommendation.priority)}>
            {recommendation.priority.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm">{recommendation.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 flex items-center">
              <Target className="w-4 h-4 mr-1" />
              Impact Score
            </span>
            <span className="text-cyan-400 font-bold">{recommendation.impact}/100</span>
          </div>
          <Progress value={recommendation.impact} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            {recommendation.estimatedTime}
          </div>
          <Badge variant="outline" className="text-xs border-cyan-500 text-cyan-300">
            {recommendation.category.toUpperCase()}
          </Badge>
        </div>

        <div className="bg-black/20 p-3 rounded border border-cyan-500/20">
          <h4 className="text-cyan-300 font-medium text-sm mb-1">Expected Outcome:</h4>
          <p className="text-gray-300 text-xs">{recommendation.expectedOutcome}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">Dependencies:</h4>
          <div className="flex flex-wrap gap-1">
            {recommendation.dependencies.map((dep, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                {dep}
              </Badge>
            ))}
          </div>
        </div>

        {(isExecuting || recommendation.progress > 0) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Execution Progress</span>
              <span className="text-green-400">{recommendation.progress.toFixed(0)}%</span>
            </div>
            <Progress value={recommendation.progress} className="h-2" />
          </div>
        )}

        <Button
          onClick={() => onExecute(recommendation.id)}
          disabled={isExecuting || isCompleted}
          className={`w-full ${
            isCompleted 
              ? 'bg-green-600 hover:bg-green-500' 
              : isExecuting
                ? 'bg-blue-600' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
          } transition-all duration-300`}
        >
          {isExecuting ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Executing...
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Execute Now
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center mt-2">
          Command: <code className="bg-black/30 px-1 rounded">{recommendation.executionCommand}</code>
        </div>
      </CardContent>
    </Card>
  );
};
