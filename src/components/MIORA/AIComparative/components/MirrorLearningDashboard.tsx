import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Target, Zap, Clock, BarChart3 } from 'lucide-react';

interface LearningSession {
  sessionId: string;
  timestamp: number;
  query: string;
  responses: { [key: string]: string };
  analysis: {
    bestResponse: string;
    patterns: string[];
    improvements: string[];
  };
  qualityScore: number;
}

interface ComparativeData {
  totalComparisons: number;
  responsePatterns: string[];
  qualityMetrics: { [key: string]: number };
  learningInsights: string[];
}

interface Insights {
  patterns_learned: number;
  reasoning_improvements: number;
  response_quality_score: number;
  benchmark_comparison: number;
  total_mirror_sessions: number;
}

interface MirrorLearningDashboardProps {
  learningSession: LearningSession | null;
  comparativeData: ComparativeData;
  insights: Insights;
}

export const MirrorLearningDashboard: React.FC<MirrorLearningDashboardProps> = ({
  learningSession,
  comparativeData,
  insights
}) => {
  const getAIProviderName = (id: string) => {
    const names: { [key: string]: string } = {
      openai: 'ChatGPT',
      google: 'Gemini',
      anthropic: 'Claude',
      xai: 'Grok',
      mistral: 'Mistral',
      perplexity: 'Perplexity'
    };
    return names[id] || id;
  };

  const getAIIcon = (id: string) => {
    const icons: { [key: string]: string } = {
      openai: '🤖',
      google: '🧠',
      anthropic: '🔮',
      xai: '⚡',
      mistral: '🌟',
      perplexity: '🔍'
    };
    return icons[id] || '🤖';
  };

  return (
    <div className="space-y-6">
      {/* Current Learning Session */}
      {learningSession && (
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Current Mirror Learning Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Query Analysis</h3>
                  <p className="text-gray-300 text-sm">"{learningSession.query}"</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-cyan-500">
                    Quality: {learningSession.qualityScore.toFixed(1)}%
                  </Badge>
                  <p className="text-gray-400 text-xs mt-1">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {new Date(learningSession.timestamp).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AI Responses */}
                <div>
                  <h4 className="text-white font-medium mb-3">AI Responses Comparison</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {Object.entries(learningSession.responses).map(([aiId, response]) => (
                      <div key={aiId} className="p-3 bg-black/30 rounded-lg border border-gray-700">
                        <div className="flex items-center mb-2">
                          <span className="text-lg mr-2">{getAIIcon(aiId)}</span>
                          <span className="text-white font-medium text-sm">{getAIProviderName(aiId)}</span>
                          {learningSession.analysis.bestResponse === aiId && (
                            <Badge className="ml-2 bg-gold-500 text-black">BEST</Badge>
                          )}
                        </div>
                        <p className="text-gray-300 text-xs line-clamp-3">{response}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analysis Results */}
                <div>
                  <h4 className="text-white font-medium mb-3">Mirror Learning Analysis</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-900/30 rounded-lg">
                      <h5 className="text-purple-300 font-medium text-sm mb-2">Patterns Detected</h5>
                      <div className="space-y-1">
                        {learningSession.analysis.patterns.map((pattern, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                            {pattern.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-green-900/30 rounded-lg">
                      <h5 className="text-green-300 font-medium text-sm mb-2">Learning Improvements</h5>
                      <div className="space-y-1">
                        {learningSession.analysis.improvements.map((improvement, index) => (
                          <div key={index} className="flex items-center text-xs text-green-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {improvement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mirror Learning Statistics */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Mirror Learning Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">{comparativeData.totalComparisons}</div>
              <p className="text-gray-400 text-sm">Total Comparisons</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{comparativeData.responsePatterns.length}</div>
              <p className="text-gray-400 text-sm">Patterns Learned</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-pink-400">{comparativeData.learningInsights.length}</div>
              <p className="text-gray-400 text-sm">Insights Gained</p>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{insights.benchmark_comparison.toFixed(1)}%</div>
              <p className="text-gray-400 text-sm">Benchmark Score</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Mirror Learning Progress</span>
                <span className="text-white font-bold">{insights.response_quality_score.toFixed(1)}%</span>
              </div>
              <Progress value={insights.response_quality_score} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-black/20 rounded-lg">
                <h5 className="text-white font-medium mb-2">Latest Learning Insights</h5>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {comparativeData.learningInsights.slice(-5).map((insight, index) => (
                    <div key={index} className="text-gray-300 text-xs flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-yellow-400" />
                      {insight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-black/20 rounded-lg">
                <h5 className="text-white font-medium mb-2">Response Patterns</h5>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {comparativeData.responsePatterns.slice(-5).map((pattern, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                      {pattern.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};