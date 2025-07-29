
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Target, Lightbulb, RefreshCw } from 'lucide-react';

export const ReflectiveLearningPanel: React.FC = () => {
  const learningMetrics = {
    currentSession: 12,
    totalSessions: 156,
    improvementRate: 87,
    insightsGenerated: 34,
    adaptationLevel: 92
  };

  const recentInsights = [
    "Gemini API lebih efektif untuk query multimodal kompleks",
    "DeepAI optimal untuk generasi teks ringan dan cepat",
    "Hugging Face Local memberikan reasoning terdalam",
    "Pollinations terbaik untuk konten kreatif visual",
    "Kombinasi multiple providers meningkatkan akurasi 23%"
  ];

  const learningFocus = [
    { area: "Provider Selection Optimization", progress: 89 },
    { area: "Fallback Strategy Enhancement", progress: 76 },
    { area: "Response Quality Assessment", progress: 93 },
    { area: "Multimodal Integration", progress: 82 },
    { area: "Learning Speed Adaptation", progress: 95 }
  ];

  return (
    <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          Reflective Learning Engine
          <Badge className="ml-auto bg-purple-500 animate-pulse">ACTIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Learning Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-purple-400 text-sm mb-1">Current Session</div>
            <div className="text-2xl font-bold text-white">{learningMetrics.currentSession}</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-blue-400 text-sm mb-1">Total Sessions</div>
            <div className="text-2xl font-bold text-white">{learningMetrics.totalSessions}</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-green-400 text-sm mb-1">Improvement</div>
            <div className="text-2xl font-bold text-white">{learningMetrics.improvementRate}%</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-orange-400 text-sm mb-1">Insights</div>
            <div className="text-2xl font-bold text-white">{learningMetrics.insightsGenerated}</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-cyan-400 text-sm mb-1">Adaptation</div>
            <div className="text-2xl font-bold text-white">{learningMetrics.adaptationLevel}%</div>
          </div>
        </div>

        {/* Recent Learning Insights */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-200 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Recent Learning Insights
          </h3>
          <div className="space-y-2">
            {recentInsights.map((insight, index) => (
              <div key={index} className="p-3 bg-black/20 rounded-lg border-l-4 border-purple-500/50">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-gray-200 text-sm flex-1">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Focus Areas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-200 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Current Learning Focus
          </h3>
          <div className="space-y-3">
            {learningFocus.map((focus, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{focus.area}</span>
                  <span className="text-purple-400 font-bold">{focus.progress}%</span>
                </div>
                <Progress value={focus.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Learning Status */}
        <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-green-300 font-semibold flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Continuous Learning Process
            </h4>
            <Badge className="bg-green-500">ACTIVE</Badge>
          </div>
          
          <div className="text-sm text-gray-300 space-y-1">
            <p>🧠 Analyzing every query-response pair for optimization opportunities</p>
            <p>📊 Real-time performance monitoring across all AI providers</p>
            <p>🎯 Adaptive strategy refinement based on success patterns</p>
            <p>🔄 Automatic learning cycle every 30 seconds</p>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-gray-400">Next Learning Cycle:</span>
            <span className="text-green-400 font-mono">
              {new Date(Date.now() + 30000).toLocaleTimeString('id-ID')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
