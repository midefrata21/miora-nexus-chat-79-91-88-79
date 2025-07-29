import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Lightbulb, Target, BookOpen } from 'lucide-react';

const AdaptiveLearning: React.FC = () => {
  const [learningData] = useState({
    totalPatterns: 1247,
    learningAccuracy: 96.8,
    adaptationsToday: 34,
    knowledgeBase: 89.2
  });

  const learnedPatterns = [
    {
      pattern: 'Component Structure Preference',
      learned: 'User prefers functional components with hooks over class components',
      confidence: 98.4,
      adaptations: 156,
      impact: 'High'
    },
    {
      pattern: 'Code Style Patterns',
      learned: 'Consistent use of TypeScript strict mode and explicit types',
      confidence: 94.7,
      adaptations: 89,
      impact: 'Medium'
    },
    {
      pattern: 'Error Handling Approach',
      learned: 'Preference for try-catch blocks with detailed error logging',
      confidence: 92.1,
      adaptations: 67,
      impact: 'High'
    },
    {
      pattern: 'Performance Optimization',
      learned: 'Focus on React.memo and useMemo for expensive operations',
      confidence: 96.2,
      adaptations: 123,
      impact: 'High'
    }
  ];

  const adaptiveInsights = [
    {
      category: 'Development Speed',
      insight: 'Code generation speed increased by 23% after learning user preferences',
      metric: '+23%',
      timeframe: 'Last week'
    },
    {
      category: 'Code Quality',
      insight: 'Error rate decreased by 18% through pattern recognition',
      metric: '-18%',
      timeframe: 'Last month'
    },
    {
      category: 'User Satisfaction',
      insight: 'Suggestion acceptance rate improved to 94.7%',
      metric: '94.7%',
      timeframe: 'Current'
    },
    {
      category: 'Efficiency',
      insight: 'Automated 67% of repetitive development tasks',
      metric: '67%',
      timeframe: 'Overall'
    }
  ];

  const knowledgeAreas = [
    { area: 'React Patterns', mastery: 96, growth: '+8%' },
    { area: 'TypeScript Best Practices', mastery: 94, growth: '+12%' },
    { area: 'Performance Optimization', mastery: 89, growth: '+15%' },
    { area: 'Security Practices', mastery: 92, growth: '+6%' },
    { area: 'Testing Strategies', mastery: 87, growth: '+18%' },
    { area: 'Deployment Patterns', mastery: 91, growth: '+9%' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-pink-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-pink-300">
            <Brain className="w-6 h-6" />
            Adaptive Learning Core
            <Badge className="bg-pink-600/20 text-pink-300">Self-Improving</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">{learningData.totalPatterns}</div>
              <div className="text-xs text-gray-400">Patterns Learned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{learningData.learningAccuracy}%</div>
              <div className="text-xs text-gray-400">Learning Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{learningData.adaptationsToday}</div>
              <div className="text-xs text-gray-400">Adaptations Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{learningData.knowledgeBase}%</div>
              <div className="text-xs text-gray-400">Knowledge Mastery</div>
            </div>
          </div>

          <Card className="bg-black/20 border-pink-500/30">
            <CardHeader>
              <CardTitle className="text-pink-300 text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learned Patterns & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learnedPatterns.map((pattern, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{pattern.pattern}</span>
                      <Badge className={`${
                        pattern.impact === 'High' ? 'bg-red-600/20 text-red-300' :
                        'bg-yellow-600/20 text-yellow-300'
                      }`}>
                        {pattern.impact} Impact
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-400">{pattern.adaptations} adaptations</span>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-3">{pattern.learned}</div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-300">
                      Confidence: <span className="text-pink-300 font-medium">{pattern.confidence}%</span>
                    </div>
                    <div className={`w-24 h-2 bg-gray-700 rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-pink-500 transition-all"
                        style={{ width: `${pattern.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-pink-500/30">
            <CardHeader>
              <CardTitle className="text-pink-300 text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Adaptive Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {adaptiveInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-pink-300 font-medium">{insight.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600/20 text-green-300 text-xs">
                        {insight.metric}
                      </Badge>
                      <span className="text-xs text-gray-400">{insight.timeframe}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">{insight.insight}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-pink-500/30">
            <CardHeader>
              <CardTitle className="text-pink-300 text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Knowledge Mastery Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {knowledgeAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-pink-400" />
                    <span className="text-white font-medium">{area.area}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-300">
                      {area.mastery}% mastery
                    </div>
                    <div className={`w-20 h-2 bg-gray-700 rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-pink-500 transition-all"
                        style={{ width: `${area.mastery}%` }}
                      />
                    </div>
                    <Badge className="bg-green-600/20 text-green-300 text-xs">
                      {area.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveLearning;