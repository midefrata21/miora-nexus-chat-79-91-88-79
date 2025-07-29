
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Gauge,
  BarChart3,
  LineChart,
  Zap,
  Clock
} from 'lucide-react';

const PerformanceTrends = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const performanceMetrics = [
    {
      name: 'Response Time',
      current: '120ms',
      trend: '-15%',
      status: 'improving',
      icon: Clock
    },
    {
      name: 'CPU Usage',
      current: '34%',
      trend: '+8%',
      status: 'stable',
      icon: Gauge
    },
    {
      name: 'Memory Usage',
      current: '2.1GB',
      trend: '-5%',
      status: 'improving',
      icon: Activity
    },
    {
      name: 'Throughput',
      current: '847/min',
      trend: '+22%',
      status: 'improving',
      icon: Zap
    }
  ];

  const trendData = [
    { period: 'Last Hour', performance: 95, issues: 2 },
    { period: 'Last 24h', performance: 92, issues: 8 },
    { period: 'Last Week', performance: 89, issues: 23 },
    { period: 'Last Month', performance: 87, issues: 67 }
  ];

  const startAnalysis = () => {
    setAnalyzing(true);
    toast({
      title: "📈 Starting Trend Analysis",
      description: "Analyzing performance trends and patterns...",
    });

    setTimeout(() => {
      setAnalyzing(false);
      toast({
        title: "✅ Analysis Complete",
        description: "Performance trend analysis updated",
      });
    }, 3000);
  };

  const getTrendIcon = (status: string) => {
    switch (status) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTrendColor = (status: string) => {
    switch (status) {
      case 'improving':
        return 'text-green-400';
      case 'declining':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            Performance Trends Analysis
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Long-term performance monitoring and trend analysis
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8 text-green-400" />
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.status)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.status)}`}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.current}
                  </div>
                  <div className="text-sm text-gray-400">
                    {metric.name}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-800/50 border border-gray-600/30">
              <TabsTrigger value="trends" className="data-[state=active]:bg-green-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600">
                <LineChart className="w-4 h-4 mr-2" />
                Patterns
              </TabsTrigger>
              <TabsTrigger value="forecasting" className="data-[state=active]:bg-purple-600">
                <Gauge className="w-4 h-4 mr-2" />
                Forecasting
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={startAnalysis}
              disabled={analyzing}
              className="bg-gradient-to-r from-green-600 to-blue-600"
            >
              {analyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analyze Trends
                </>
              )}
            </Button>
          </div>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <LineChart className="w-12 h-12 mx-auto mb-2 text-green-400" />
                      <p className="text-gray-400">Performance trend line chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300">Trend Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendData.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{trend.period}</div>
                          <div className="text-sm text-gray-400">{trend.issues} issues detected</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-300 font-bold">{trend.performance}%</div>
                          <div className="text-xs text-gray-400">performance</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300">Performance Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-gray-700/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                    <p className="text-gray-400">Pattern analysis visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300">Performance Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-gray-700/30 rounded-lg">
                  <div className="text-center">
                    <Gauge className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                    <p className="text-gray-400">Predictive performance analysis</p>
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

export default PerformanceTrends;
