
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Database, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  Zap,
  Brain,
  Calendar,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const DataAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('user-behavior');

  const analyticsData = {
    overview: {
      totalDataPoints: 2847932,
      processedToday: 15847,
      accuracyRate: 96.8,
      predictionSuccess: 94.2
    },
    datasets: [
      {
        id: 'user-behavior',
        name: 'User Behavior Analytics',
        description: 'Analysis of user interaction patterns',
        dataPoints: 1248932,
        lastUpdated: '2 minutes ago',
        status: 'active',
        insights: [
          'Peak usage: 2-4 PM daily',
          'Most used features: Voice & Chat',
          'User retention: 87%'
        ]
      },
      {
        id: 'system-performance',
        name: 'System Performance Data',
        description: 'Real-time system metrics and performance data',
        dataPoints: 892847,
        lastUpdated: '1 minute ago',
        status: 'active',
        insights: [
          'Average response time: 120ms',
          'System uptime: 99.9%',
          'Memory usage optimized'
        ]
      },
      {
        id: 'learning-patterns',
        name: 'AI Learning Patterns',
        description: 'MIORA learning behavior and growth patterns',
        dataPoints: 706153,
        lastUpdated: '5 minutes ago',
        status: 'processing',
        insights: [
          'Learning efficiency: +15%',
          'Pattern recognition improved',
          'Neural pathways optimized'
        ]
      }
    ],
    predictions: [
      {
        metric: 'User Growth',
        current: 1247,
        predicted: 1580,
        confidence: 89,
        trend: 'up'
      },
      {
        metric: 'System Load',
        current: 67,
        predicted: 72,
        confidence: 94,
        trend: 'up'
      },
      {
        metric: 'AI Performance',
        current: 94.2,
        predicted: 96.8,
        confidence: 91,
        trend: 'up'
      }
    ]
  };

  const handleAnalyzeData = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-300 border-green-500';
      case 'processing': return 'bg-orange-600/20 text-orange-300 border-orange-500';
      case 'error': return 'bg-red-600/20 text-red-300 border-red-500';
      default: return 'bg-slate-600/20 text-slate-300 border-slate-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-400" /> : 
      <Activity className="w-4 h-4 text-orange-400" />;
  };

  return (
    <div className="p-6 min-h-full bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-slate-300 hover:text-white hover:bg-slate-700/50 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Data Analytics Center</h1>
              <p className="text-slate-400">Advanced data analysis and predictive modeling</p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleAnalyzeData}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-blue-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Data Points</p>
                  <p className="text-white text-2xl font-bold">
                    {analyticsData.overview.totalDataPoints.toLocaleString()}
                  </p>
                </div>
                <Database className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Processed Today</p>
                  <p className="text-white text-2xl font-bold">
                    {analyticsData.overview.processedToday.toLocaleString()}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Accuracy Rate</p>
                  <p className="text-white text-2xl font-bold">
                    {analyticsData.overview.accuracyRate}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-orange-600/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Prediction Success</p>
                  <p className="text-white text-2xl font-bold">
                    {analyticsData.overview.predictionSuccess}%
                  </p>
                </div>
                <Brain className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-600/30">
            <TabsTrigger value="datasets" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Database className="w-4 h-4 mr-2" />
              Datasets
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="datasets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analyticsData.datasets.map((dataset) => (
                <Card 
                  key={dataset.id}
                  className={`bg-slate-800/50 border-slate-600/30 cursor-pointer transition-all hover:border-blue-500/50 ${
                    selectedDataset === dataset.id ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                  onClick={() => setSelectedDataset(dataset.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{dataset.name}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(dataset.status)}>
                        {dataset.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm mb-4">{dataset.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Data Points:</span>
                        <span className="text-white font-medium">{dataset.dataPoints.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Updated:</span>
                        <span className="text-blue-300">{dataset.lastUpdated}</span>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium text-white mb-2">Key Insights:</h4>
                        <ul className="space-y-1">
                          {dataset.insights.map((insight, index) => (
                            <li key={index} className="text-xs text-slate-300 flex items-start">
                              <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analyticsData.predictions.map((prediction, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-blue-300">
                      <span>{prediction.metric}</span>
                      {getTrendIcon(prediction.trend)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Current:</span>
                        <span className="text-white font-bold">{prediction.current}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Predicted:</span>
                        <span className="text-blue-300 font-bold">{prediction.predicted}</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400 text-sm">Confidence:</span>
                          <span className="text-white text-sm">{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-600/30">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-300">
                  <Brain className="w-5 h-5 mr-2" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <h4 className="font-semibold text-white mb-2">System Optimization Recommendations</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                        Increase memory allocation for neural processing by 15% for optimal performance
                      </li>
                      <li className="flex items-start">
                        <Target className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
                        Implement adaptive learning rate scheduling to improve convergence speed
                      </li>
                      <li className="flex items-start">
                        <Activity className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                        User engagement peaks detected - consider scheduling maintenance during low-usage periods
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/20">
                    <h4 className="font-semibold text-white mb-2">Anomaly Detection Results</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-300">Anomalies Detected:</span>
                      <Badge className="bg-green-600/20 text-green-300">3 Minor</Badge>
                    </div>
                    <Progress value={12} className="h-2 mb-3" />
                    <p className="text-slate-300 text-sm">All detected anomalies are within acceptable parameters and have been automatically addressed.</p>
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

export default DataAnalytics;
