
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Database,
  Activity,
  Clock,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

const QueryAnalytics = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const queryMetrics = [
    {
      name: 'Total Queries',
      value: '15,847',
      change: '+12.5%',
      icon: Database,
      color: 'text-blue-400'
    },
    {
      name: 'Avg Response Time',
      value: '45ms',
      change: '-8.2%',
      icon: Clock,
      color: 'text-green-400'
    },
    {
      name: 'Query Success Rate',
      value: '98.7%',
      change: '+2.1%',
      icon: CheckCircle,
      color: 'text-cyan-400'
    },
    {
      name: 'Cache Hit Rate',
      value: '87.3%',
      change: '+5.4%',
      icon: Zap,
      color: 'text-orange-400'
    }
  ];

  const slowQueries = [
    {
      query: 'SELECT * FROM learning_data WHERE...',
      duration: '2.4s',
      executions: 23,
      impact: 'High'
    },
    {
      query: 'UPDATE user_analytics SET...',
      duration: '1.8s',
      executions: 15,
      impact: 'Medium'
    },
    {
      query: 'JOIN voice_sessions vs ON...',
      duration: '1.2s',
      executions: 31,
      impact: 'Medium'
    },
    {
      query: 'CREATE INDEX ON performance...',
      duration: '0.9s',
      executions: 7,
      impact: 'Low'
    }
  ];

  const queryTypes = [
    { type: 'SELECT', count: 8945, percentage: 56.4 },
    { type: 'INSERT', count: 3421, percentage: 21.6 },
    { type: 'UPDATE', count: 2156, percentage: 13.6 },
    { type: 'DELETE', count: 875, percentage: 5.5 },
    { type: 'CREATE', count: 450, percentage: 2.9 }
  ];

  const startAnalysis = () => {
    setAnalyzing(true);
    toast({
      title: "🔍 Starting Query Analysis",
      description: "Analyzing database query performance...",
    });

    setTimeout(() => {
      setAnalyzing(false);
      toast({
        title: "✅ Analysis Complete",
        description: "Query performance analysis updated",
      });
    }, 3000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Database className="w-8 h-8 text-slate-400" />
            Query Analytics Dashboard
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Database query performance monitoring and optimization
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {queryMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-slate-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                    <Badge className={`${metric.change.startsWith('+') ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {metric.name}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-800/50 border border-gray-600/30">
              <TabsTrigger value="performance" className="data-[state=active]:bg-slate-600">
                <Activity className="w-4 h-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="queries" className="data-[state=active]:bg-blue-600">
                <Database className="w-4 h-4 mr-2" />
                Query Types
              </TabsTrigger>
              <TabsTrigger value="optimization" className="data-[state=active]:bg-green-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Optimization
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={startAnalysis}
              disabled={analyzing}
              className="bg-gradient-to-r from-slate-600 to-blue-600"
            >
              {analyzing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Analyze Queries
                </>
              )}
            </Button>
          </div>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-300 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Slow Queries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {slowQueries.map((query, index) => (
                      <div key={index} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm text-gray-300 truncate flex-1">
                            {query.query}
                          </code>
                          <Badge className={`${getImpactColor(query.impact)} text-white ml-2`}>
                            {query.impact}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Duration: {query.duration}</span>
                          <span>Executions: {query.executions}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300">Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                      <p className="text-gray-400">Query performance trend chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="queries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Query Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {queryTypes.map((query, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-white font-medium">{query.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{query.count.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">{query.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Query Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <Database className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                      <p className="text-gray-400">Query pattern analysis chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300">Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Index Optimization</div>
                      <div className="text-gray-300 text-sm">Add composite index on learning_data table to improve query performance by 40%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Query Caching</div>
                      <div className="text-gray-300 text-sm">Enable result caching for frequently executed SELECT queries</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Connection Pooling</div>
                      <div className="text-gray-300 text-sm">Optimize connection pool size to reduce connection overhead</div>
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

export default QueryAnalytics;
