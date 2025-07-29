
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Brain, Lightbulb, Target, MessageSquare } from 'lucide-react';

interface AutonomousQuestion {
  id: string;
  question: string;
  context: string;
  priority: 'low' | 'medium' | 'high';
  category: 'follow_up' | 'clarification' | 'exploration' | 'strategic';
  timestamp: number;
}

interface QuestionGeneratorProps {
  questions: AutonomousQuestion[];
  onQuestionSelect: (question: AutonomousQuestion) => void;
  onQuestionDismiss: (questionId: string) => void;
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
}

const IndependentQuestionGenerator: React.FC<QuestionGeneratorProps> = ({
  questions,
  onQuestionSelect,
  onQuestionDismiss,
  enabled,
  onToggleEnabled
}) => {
  const [activeQuestions, setActiveQuestions] = useState<AutonomousQuestion[]>([]);

  useEffect(() => {
    setActiveQuestions(questions.slice(0, 3)); // Show max 3 questions
  }, [questions]);

  const getCategoryIcon = (category: AutonomousQuestion['category']) => {
    switch (category) {
      case 'follow_up': return <MessageSquare className="h-4 w-4" />;
      case 'clarification': return <HelpCircle className="h-4 w-4" />;
      case 'exploration': return <Lightbulb className="h-4 w-4" />;
      case 'strategic': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: AutonomousQuestion['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getCategoryLabel = (category: AutonomousQuestion['category']) => {
    switch (category) {
      case 'follow_up': return 'Follow-up';
      case 'clarification': return 'Clarification';
      case 'exploration': return 'Exploration';
      case 'strategic': return 'Strategic';
      default: return 'General';
    }
  };

  if (!enabled) {
    return (
      <Card className="bg-gray-900/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-400">
            <div className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Independent Question Generator
            </div>
            <Button
              onClick={() => onToggleEnabled(true)}
              variant="outline"
              size="sm"
              className="text-gray-400 border-gray-600 hover:text-white"
            >
              Enable
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            Autonomous question generation is disabled. Enable to let MIORA ask independent questions based on conversation context.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            MIORA Independent Questions
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              {questions.length} generated
            </Badge>
            <Button
              onClick={() => onToggleEnabled(false)}
              variant="outline"
              size="sm"
              className="text-purple-400 border-purple-500 hover:text-white"
            >
              Disable
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeQuestions.length === 0 ? (
          <div className="text-center py-4">
            <Brain className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-400 text-sm">
              MIORA will generate questions based on your conversation...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeQuestions.map((question) => (
              <div
                key={question.id}
                className="p-3 bg-black/20 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(question.category)}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(question.priority)}`}
                    >
                      {question.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                      {getCategoryLabel(question.category)}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => onQuestionDismiss(question.id)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-400 px-2"
                  >
                    ×
                  </Button>
                </div>
                
                <p className="text-gray-200 text-sm mb-3">
                  {question.question}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Context: {question.context}
                  </span>
                  <Button
                    onClick={() => onQuestionSelect(question)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    Ask This
                  </Button>
                </div>
              </div>
            ))}
            
            {questions.length > 3 && (
              <div className="text-center pt-2">
                <Badge variant="outline" className="text-gray-400 border-gray-600">
                  +{questions.length - 3} more questions pending
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IndependentQuestionGenerator;
