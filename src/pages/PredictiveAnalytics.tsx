
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
  BarChart3,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const PredictiveAnalytics = () => {
  const [predicting, setPredicting] = useState(false);
  const { toast } = useToast();

  const predictions = [
    {
      category: 'System Performance',
      prediction: 'CPU usage will increase by 15% in next 24h',
      confidence: 87,
      impact: 'Medium',
      timeframe: '24 hours',
      icon: Activity
    },
    {
      category: 'User Behavior',
      prediction: 'Voice feature usage expected to grow 25%',
      confidence: 92,
      impact: 'High',
      timeframe: '7 days',
      icon: TrendingUp
    },
    {
      category: 'Resource Usage',
      prediction: 'Memory consumption will stabilize',
      confidence: 78,
      impact: 'Low',
      timeframe: '3 days',
      icon: Brain
    },
    {
      category: 'Error Patterns',
      prediction: 'Potential error spike during peak hours',
      confidence: 65,
      impact: 'High',
      timeframe: '12 hours',
      icon: AlertTriangle
    }
  ];

  const modelMetrics = [
    { name: 'Prediction Accuracy', value: '89.4%', status: 'excellent' },
    { name: 'Model Confidence', value: '82.1%', status: 'good' },
    { name: 'Data Quality', value: '94.7%', status: 'excellent' },
    { name: 'Update Frequency', value: 'Real-time', status: 'active' }
  ];

  const startPrediction = () => {
    setPredicting(true);
    toast({
      title: "🎯 Starting Prediction Analysis",
      description: "Running AI-powered predictive models...",
    });

    setTimeout(() => {
      setPredicting(false);
      toast({
        title: "✅ Predictions Generated",
        description: "New predictive insights are ready",
      });
    }, 4000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Low':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-400';
      case 'good':
        return 'text-blue-400';
      case 'active':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-purple-400" />
            Predictive Analytics Engine
            <Brain className="w-8 h-8 text-cyan-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            AI-powered predictions and intelligent forecasting
          </p>
        </div>

        {/* Model Performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {modelMetrics.map((metric, index) => (
            <Card key={index} className="bg-gray-800/50 border-purple-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {metric.name}
                </div>
                <Badge className={`${getStatusColor(metric.status)} bg-transparent border-current`}>
                  {metric.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-800/50 border border-gray-600/30">
              <TabsTrigger value="predictions" className="data-[state=active]:bg-purple-600">
                <Target className="w-4 h-4 mr-2" />
                Predictions
              </TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:bg-cyan-600">
                <Brain className="w-4 h-4 mr-2" />
                AI Models
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-green-600">
                <Eye className="w-4 h-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={startPrediction}
              disabled={predicting}
              className="bg-gradient-to-r from-purple-600 to-cyan-600"
            >
              {predicting ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate Predictions
                </>
              )}
            </Button>
          </div>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictions.map((prediction, index) => {
                const IconComponent = prediction.icon;
                return (
                  <Card key={index} className="bg-gray-800/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-purple-400" />
                          {prediction.category}
                        </div>
                        <Badge className={`${getImpactColor(prediction.impact)} text-white`}>
                          {prediction.impact}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{prediction.prediction}</p>
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-gray-400">Confidence: </span>
                          <span className="text-green-300 font-medium">{prediction.confidence}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Timeframe: </span>
                          <span className="text-blue-300">{prediction.timeframe}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300">Active AI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <Brain className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                    <div className="text-white font-medium">Neural Network</div>
                    <div className="text-sm text-gray-400">Performance Prediction</div>
                    <Badge className="mt-2 bg-green-600 text-white">Active</Badge>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <div className="text-white font-medium">Regression Model</div>
                    <div className="text-sm text-gray-400">Usage Forecasting</div>
                    <Badge className="mt-2 bg-green-600 text-white">Active</Badge>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                    <div className="text-white font-medium">Classification</div>
                    <div className="text-sm text-gray-400">Anomaly Detection</div>
                    <Badge className="mt-2 bg-green-600 text-white">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Optimization Opportunity</div>
                      <div className="text-gray-300 text-sm">System performance can be improved by 12% with memory optimization</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Usage Pattern</div>
                      <div className="text-gray-300 text-sm">Peak usage occurs between 2-4 PM, consider resource scaling</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Trend Analysis</div>
                      <div className="text-gray-300 text-sm">Voice interface adoption increasing by 8% weekly</div>
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

export default PredictiveAnalytics;
