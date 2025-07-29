
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Target,
  Brain,
  Activity,
  TrendingUp,
  Eye,
  Zap,
  FileText,
  BarChart3,
  Network,
  Cpu
} from 'lucide-react';

const PatternRecognitionPage = () => {
  const [scanningActive, setScanningActive] = useState(false);
  const { toast } = useToast();

  const patternTypes = [
    {
      name: 'Behavioral Patterns',
      description: 'Analyze user interaction patterns',
      status: 'active',
      accuracy: '94.2%',
      icon: Brain
    },
    {
      name: 'Data Flow Patterns',
      description: 'Monitor system data patterns',
      status: 'active',
      accuracy: '97.8%',
      icon: Network
    },
    {
      name: 'Performance Patterns',
      description: 'Track system performance trends',
      status: 'active',
      accuracy: '96.1%',
      icon: TrendingUp
    },
    {
      name: 'Security Patterns',
      description: 'Detect security anomalies',
      status: 'active',
      accuracy: '98.5%',
      icon: Eye
    }
  ];

  const recentPatterns = [
    {
      id: 1,
      type: 'Performance Spike',
      confidence: 95,
      detected: '2 minutes ago',
      impact: 'Medium'
    },
    {
      id: 2,
      type: 'Usage Pattern Change',
      confidence: 87,
      detected: '15 minutes ago',
      impact: 'Low'
    },
    {
      id: 3,
      type: 'System Optimization',
      confidence: 92,
      detected: '1 hour ago',
      impact: 'High'
    }
  ];

  const startPatternScan = () => {
    setScanningActive(true);
    toast({
      title: "🎯 Pattern Scan Started",
      description: "Deep pattern analysis in progress...",
    });

    setTimeout(() => {
      setScanningActive(false);
      toast({
        title: "✅ Pattern Analysis Complete",
        description: "New patterns detected and analyzed",
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-purple-400" />
            Pattern Recognition Engine
            <Brain className="w-8 h-8 text-cyan-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced AI-powered pattern detection and analysis system
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-sm text-gray-400">Active Patterns</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold text-white">96.7%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-sm text-gray-400">Patterns Detected</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Cpu className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">Real-time</div>
              <div className="text-sm text-gray-400">Processing</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patterns" className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-600/30">
            <TabsTrigger value="patterns" className="data-[state=active]:bg-purple-600">
              <Target className="w-4 h-4 mr-2" />
              Pattern Types
            </TabsTrigger>
            <TabsTrigger value="detection" className="data-[state=active]:bg-cyan-600">
              <Brain className="w-4 h-4 mr-2" />
              Live Detection
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patternTypes.map((pattern, index) => {
                const IconComponent = pattern.icon;
                return (
                  <Card key={index} className="bg-gray-800/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-purple-400" />
                          {pattern.name}
                        </div>
                        <Badge className="bg-green-600 text-white">
                          {pattern.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-gray-300 text-sm">{pattern.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Accuracy:</span>
                        <span className="text-green-300 font-medium">{pattern.accuracy}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="detection" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Pattern Detection
                  </div>
                  <Button
                    onClick={startPatternScan}
                    disabled={scanningActive}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600"
                  >
                    {scanningActive ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Start Deep Scan
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Recently Detected Patterns</h3>
                  <div className="space-y-3">
                    {recentPatterns.map((pattern) => (
                      <div
                        key={pattern.id}
                        className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{pattern.type}</span>
                          <Badge
                            className={`${
                              pattern.impact === 'High' ? 'bg-red-600' :
                              pattern.impact === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                            } text-white`}
                          >
                            {pattern.impact}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Confidence: {pattern.confidence}%</span>
                          <span className="text-gray-400">{pattern.detected}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Pattern Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Detection Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Total Patterns Analyzed</span>
                        <span className="text-green-300">15,847</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Successful Predictions</span>
                        <span className="text-green-300">14,892 (94%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">False Positives</span>
                        <span className="text-yellow-300">312 (2%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">System Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Processing Speed</span>
                        <span className="text-green-300">2.4ms avg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Memory Usage</span>
                        <span className="text-green-300">32% efficient</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">CPU Load</span>
                        <span className="text-green-300">18% normal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatternRecognitionPage;
