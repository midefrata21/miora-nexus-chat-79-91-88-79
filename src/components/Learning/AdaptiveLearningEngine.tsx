
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, TrendingUp, Settings, Play } from 'lucide-react';

interface LearningStyle {
  visual: number;
  auditory: number;
  kinesthetic: number;
  reading: number;
}

interface AdaptationMetrics {
  difficultyPreference: number;
  learningSpeed: number;
  retentionRate: number;
  engagementLevel: number;
}

export const AdaptiveLearningEngine: React.FC = () => {
  const [learningStyle, setLearningStyle] = useState<LearningStyle>({
    visual: 75,
    auditory: 60,
    kinesthetic: 45,
    reading: 80
  });

  const [adaptationMetrics, setAdaptationMetrics] = useState<AdaptationMetrics>({
    difficultyPreference: 7.5,
    learningSpeed: 8.2,
    retentionRate: 85,
    engagementLevel: 92
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAdaptiveAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAdaptationMetrics(prev => ({
        difficultyPreference: Math.min(10, prev.difficultyPreference + 0.3),
        learningSpeed: Math.min(10, prev.learningSpeed + 0.2),
        retentionRate: Math.min(100, prev.retentionRate + 2),
        engagementLevel: Math.min(100, prev.engagementLevel + 1)
      }));
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Brain className="w-6 h-6 mr-2" />
            Adaptive Learning Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              AI yang secara otomatis menyesuaikan metode pembelajaran berdasarkan gaya belajar dan performa Anda
            </p>
            <Button 
              onClick={runAdaptiveAnalysis}
              disabled={isAnalyzing}
              className="bg-purple-600 hover:bg-purple-500"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Learning Pattern...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Adaptive Analysis
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Style Analysis */}
            <Card className="bg-black/30 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-300 text-lg">Learning Style Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(learningStyle).map(([style, value]) => (
                  <div key={style} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 capitalize">{style}</span>
                      <span className="text-purple-300">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Adaptation Metrics */}
            <Card className="bg-black/30 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-300 text-lg">Adaptation Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-900/20 rounded">
                    <TrendingUp className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                    <div className="text-lg font-bold text-white">{adaptationMetrics.learningSpeed}/10</div>
                    <div className="text-xs text-gray-400">Speed</div>
                  </div>
                  <div className="text-center p-3 bg-green-900/20 rounded">
                    <Target className="w-6 h-6 mx-auto mb-1 text-green-400" />
                    <div className="text-lg font-bold text-white">{adaptationMetrics.retentionRate}%</div>
                    <div className="text-xs text-gray-400">Retention</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Difficulty Preference</span>
                    <span className="text-blue-300">{adaptationMetrics.difficultyPreference}/10</span>
                  </div>
                  <Progress value={adaptationMetrics.difficultyPreference * 10} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Engagement Level</span>
                    <span className="text-green-300">{adaptationMetrics.engagementLevel}%</span>
                  </div>
                  <Progress value={adaptationMetrics.engagementLevel} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Adaptive Recommendations */}
          <Card className="bg-black/30 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-cyan-300 text-lg">AI Adaptive Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-cyan-900/20 rounded border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-300 font-medium">Learning Path Optimization</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Berdasarkan analisis, sistem merekomendasikan fokus pada konten visual dan reading-based learning
                  </p>
                </div>
                
                <div className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 font-medium">Difficulty Adjustment</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Tingkat kesulitan akan disesuaikan ke level 7.5/10 untuk optimal challenge
                  </p>
                </div>
                
                <div className="p-3 bg-green-900/20 rounded border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-medium">Content Personalization</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Konten akan diprioritaskan dengan 60% visual aids dan 40% text-based materials
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
