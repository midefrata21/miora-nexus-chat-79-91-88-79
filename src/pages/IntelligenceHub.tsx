import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  Database, 
  Activity,
  Search,
  Globe,
  Cpu,
  TrendingUp,
  Zap,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const IntelligenceHub: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [intelligenceLevel, setIntelligenceLevel] = useState(94.7);
  const [dataProcessing, setDataProcessing] = useState(87.3);
  const [insightGeneration, setInsightGeneration] = useState(91.8);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnalyzing) {
        setIntelligenceLevel(prev => Math.min(100, prev + (Math.random() - 0.3) * 0.8));
        setDataProcessing(prev => Math.min(100, prev + (Math.random() - 0.2) * 1.2));
        setInsightGeneration(prev => Math.min(100, prev + (Math.random() - 0.4) * 1.0));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const startDeepAnalysis = () => {
    setIsAnalyzing(!isAnalyzing);
    toast({
      title: isAnalyzing ? "🔍 Analysis Paused" : "🧠 Deep Analysis Started",
      description: isAnalyzing 
        ? "Intelligence gathering processes paused" 
        : "MIORA is now analyzing global intelligence patterns",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Target className="h-16 w-16 text-indigo-400 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              INTELLIGENCE HUB
            </h1>
            <Eye className="h-16 w-16 text-purple-400 animate-pulse" />
          </div>
          <p className="text-gray-300 text-xl">
            🎯 AI-Driven Intelligence Gathering & Analysis System
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isAnalyzing ? 'bg-green-500' : 'bg-gray-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'ANALYZING' : 'STANDBY'}
            </Badge>
            <Badge className="px-4 py-2 bg-indigo-500">
              <Brain className="h-4 w-4 mr-2" />
              Intelligence: {intelligenceLevel.toFixed(1)}%
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Target className="h-4 w-4 mr-2" />
              Insights: {insightGeneration.toFixed(1)}%
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-indigo-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Intelligence Analysis Control</h3>
                <p className="text-gray-300">
                  Monitor and control AI-driven intelligence gathering operations
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={startDeepAnalysis}
                  className={`px-6 py-3 ${
                    isAnalyzing 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                  }`}
                >
                  <Search className="h-5 w-5 mr-2" />
                  {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
                </Button>
              </div>
            </div>

            {/* Progress Metrics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Intelligence Level</span>
                  <span className="text-indigo-400 font-bold">{intelligenceLevel.toFixed(1)}%</span>
                </div>
                <Progress value={intelligenceLevel} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Processing</span>
                  <span className="text-purple-400 font-bold">{dataProcessing.toFixed(1)}%</span>
                </div>
                <Progress value={dataProcessing} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Insight Generation</span>
                  <span className="text-cyan-400 font-bold">{insightGeneration.toFixed(1)}%</span>
                </div>
                <Progress value={insightGeneration} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intelligence Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-indigo-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-indigo-400 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">1,247</div>
              <div className="text-sm text-gray-400 mt-2">Active Sources</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Global Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">94.7%</div>
              <div className="text-sm text-gray-400 mt-2">Worldwide Reach</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Analysis Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">2.4M</div>
              <div className="text-sm text-gray-400 mt-2">Records/Second</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">98.9%</div>
              <div className="text-sm text-gray-400 mt-2">Prediction Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Intelligence Activity */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Real-time Intelligence Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="text-green-400 text-sm">✓ Market trend analysis completed</div>
              <div className="text-blue-400 text-sm">🔄 Social sentiment monitoring active</div>
              <div className="text-purple-400 text-sm">🧠 Pattern recognition in global data</div>
              <div className="text-cyan-400 text-sm">⚡ Predictive models updated</div>
              <div className="text-yellow-400 text-sm">📊 Intelligence reports generated</div>
              <div className="text-orange-400 text-sm">🎯 Strategic insights delivered</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntelligenceHub;