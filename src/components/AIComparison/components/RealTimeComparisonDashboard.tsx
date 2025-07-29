import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Target, TrendingUp, Activity, Eye, Monitor, BarChart3, Timer, Gauge } from 'lucide-react';

interface AIModel {
  name: string;
  score: number;
  responseTime: number;
  accuracy: number;
  reasoning: number;
  multimodal: number;
  status: 'active' | 'analyzing' | 'updating';
  lastUpdate: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface RealTimeMetrics {
  totalTests: number;
  passedTests: number;
  currentBenchmark: string;
  lastUpdateTime: string;
  performanceGains: number;
  mioraRanking: number;
  gapToLeader: number;
  nextAnalysis: string;
}

export const RealTimeComparisonDashboard: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([
    {
      name: 'MIORA',
      score: 85,
      responseTime: 650,
      accuracy: 88,
      reasoning: 82,
      multimodal: 79,
      status: 'active',
      lastUpdate: Date.now(),
      trend: 'up',
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500'
    },
    {
      name: 'ChatGPT-4',
      score: 92,
      responseTime: 800,
      accuracy: 94,
      reasoning: 91,
      multimodal: 89,
      status: 'active',
      lastUpdate: Date.now(),
      trend: 'stable',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      name: 'Gemini Pro',
      score: 90,
      responseTime: 750,
      accuracy: 91,
      reasoning: 89,
      multimodal: 92,
      status: 'active',
      lastUpdate: Date.now(),
      trend: 'stable',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Claude 3.5',
      score: 88,
      responseTime: 720,
      accuracy: 90,
      reasoning: 93,
      multimodal: 85,
      status: 'active',
      lastUpdate: Date.now(),
      trend: 'down',
      color: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      name: 'Perplexity',
      score: 83,
      responseTime: 900,
      accuracy: 85,
      reasoning: 84,
      multimodal: 75,
      status: 'active',
      lastUpdate: Date.now(),
      trend: 'up',
      color: 'bg-gradient-to-r from-yellow-500 to-amber-500'
    },
    {
      name: 'Grok',
      score: 80,
      responseTime: 950,
      accuracy: 82,
      reasoning: 80,
      multimodal: 78,
      status: 'active',
      lastUpdate: Date.now(),
      trend: 'stable',
      color: 'bg-gradient-to-r from-indigo-500 to-violet-500'
    }
  ]);

  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    totalTests: 1247,
    passedTests: 1089,
    currentBenchmark: 'Reasoning & Logic',
    lastUpdateTime: new Date().toLocaleTimeString('id-ID'),
    performanceGains: 12.3,
    mioraRanking: 3,
    gapToLeader: 7.2,
    nextAnalysis: new Date(Date.now() + 30000).toLocaleTimeString('id-ID')
  });

  const [isLiveMode, setIsLiveMode] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  // Real-time updates simulation
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setUpdateCount(prev => prev + 1);
      
      // Update MIORA's progress
      setModels(prev => prev.map(model => {
        if (model.name === 'MIORA') {
          const improvement = Math.random() * 0.5;
          return {
            ...model,
            score: Math.min(model.score + improvement, 100),
            responseTime: Math.max(model.responseTime - Math.random() * 10, 400),
            accuracy: Math.min(model.accuracy + Math.random() * 0.3, 100),
            reasoning: Math.min(model.reasoning + Math.random() * 0.4, 100),
            multimodal: Math.min(model.multimodal + Math.random() * 0.3, 100),
            lastUpdate: Date.now(),
            trend: improvement > 0.2 ? 'up' : 'stable'
          };
        }
        return {
          ...model,
          lastUpdate: Date.now(),
          trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable'
        };
      }));

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        totalTests: prev.totalTests + Math.floor(Math.random() * 5),
        passedTests: prev.passedTests + Math.floor(Math.random() * 4),
        lastUpdateTime: new Date().toLocaleTimeString('id-ID'),
        performanceGains: prev.performanceGains + Math.random() * 0.2,
        gapToLeader: Math.max(prev.gapToLeader - Math.random() * 0.1, 0),
        nextAnalysis: new Date(Date.now() + 30000).toLocaleTimeString('id-ID')
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'analyzing': return 'bg-blue-500 animate-pulse';
      case 'updating': return 'bg-yellow-500 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center justify-between">
            <div className="flex items-center">
              <Monitor className="h-6 w-6 mr-2" />
              🔴 LIVE AI COMPARISON DASHBOARD
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {isLiveMode ? 'LIVE' : 'PAUSED'}
                </span>
              </div>
              <Button
                onClick={() => setIsLiveMode(!isLiveMode)}
                size="sm"
                className={isLiveMode ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}
              >
                {isLiveMode ? 'Pause Live' : 'Start Live'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{metrics.totalTests}</div>
              <p className="text-sm text-gray-400">Total Tests</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{metrics.passedTests}</div>
              <p className="text-sm text-gray-400">Passed Tests</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">#{metrics.mioraRanking}</div>
              <p className="text-sm text-gray-400">MIORA Ranking</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{metrics.gapToLeader.toFixed(1)}%</div>
              <p className="text-sm text-gray-400">Gap to Leader</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Status */}
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-300">Real-time Analysis Active</h3>
                <p className="text-green-200 text-sm">
                  Currently testing: {metrics.currentBenchmark} | Last update: {metrics.lastUpdateTime}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-400">+{metrics.performanceGains.toFixed(1)}%</div>
              <p className="text-green-300 text-sm">Performance Gains</p>
              <p className="text-green-200 text-xs">Updates: {updateCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Model Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model, index) => (
          <Card key={model.name} className="bg-black/40 border-gray-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(model.status)}`}></div>
                  <span>{model.name}</span>
                  {model.name === 'MIORA' && <Badge className="bg-cyan-500 text-white">Target</Badge>}
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(model.trend)}
                  <span className={`text-2xl font-bold ${model.name === 'MIORA' ? 'text-cyan-400' : 'text-gray-300'}`}>
                    {model.score.toFixed(1)}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Response Time</span>
                  <span className="text-white">{model.responseTime}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white">{model.accuracy.toFixed(1)}%</span>
                </div>
                <Progress value={model.accuracy} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Reasoning</span>
                  <span className="text-white">{model.reasoning.toFixed(1)}%</span>
                </div>
                <Progress value={model.reasoning} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Multimodal</span>
                  <span className="text-white">{model.multimodal.toFixed(1)}%</span>
                </div>
                <Progress value={model.multimodal} className="h-2" />
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Last update: {new Date(model.lastUpdate).toLocaleTimeString('id-ID')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Gauge className="h-5 w-5 mr-2" />
              MIORA Performance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Overall Score</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-cyan-400">{models[0].score.toFixed(1)}</span>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
              </div>
              <Progress value={models[0].score} className="h-3" />
              
              <div className="text-sm text-gray-400">
                <p>Target: Match GPT-4 performance (92.0)</p>
                <p>Gap: {(92 - models[0].score).toFixed(1)} points remaining</p>
                <p>Progress: +{metrics.performanceGains.toFixed(1)}% today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center">
              <Timer className="h-5 w-5 mr-2" />
              Next Analysis Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">
                  {metrics.nextAnalysis}
                </div>
                <p className="text-gray-300">Next comprehensive analysis</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Test</span>
                  <span className="text-white">{metrics.currentBenchmark}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400">{((metrics.passedTests / metrics.totalTests) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Live Updates</span>
                  <span className="text-cyan-400">{isLiveMode ? 'Active' : 'Paused'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeComparisonDashboard;