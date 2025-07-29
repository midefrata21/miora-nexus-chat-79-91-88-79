
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  PieChart,
  Users,
  Activity,
  TrendingUp,
  Clock,
  BarChart3,
  Calendar,
  FileText
} from 'lucide-react';

const UsageStatistics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const usageMetrics = [
    {
      name: 'Total Users',
      value: '1,247',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      name: 'Active Sessions',
      value: '342',
      change: '+8.2%',
      icon: Activity,
      color: 'text-green-400'
    },
    {
      name: 'Features Used',
      value: '89%',
      change: '+15.1%',
      icon: PieChart,
      color: 'text-purple-400'
    },
    {
      name: 'Avg Session Time',
      value: '24m',
      change: '+3.7%',
      icon: Clock,
      color: 'text-orange-400'
    }
  ];

  const topFeatures = [
    { name: 'MIORA Core', usage: '92%', sessions: 1847 },
    { name: 'Voice Interface', usage: '78%', sessions: 1534 },
    { name: 'Learning System', usage: '65%', sessions: 1249 },
    { name: 'Auto Code', usage: '58%', sessions: 987 },
    { name: 'Analytics', usage: '45%', sessions: 742 }
  ];

  const refreshStats = () => {
    setRefreshing(true);
    toast({
      title: "📊 Refreshing Statistics",
      description: "Updating usage analytics data...",
    });

    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "✅ Statistics Updated",
        description: "Usage statistics have been refreshed",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <PieChart className="w-8 h-8 text-blue-400" />
            Usage Statistics Dashboard
            <TrendingUp className="w-8 h-8 text-green-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive system usage analysis and insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {usageMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                    <Badge className="bg-green-600 text-white">
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

        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-800/50 border border-gray-600/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-purple-600">
                <FileText className="w-4 h-4 mr-2" />
                Feature Usage
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-green-600">
                <Calendar className="w-4 h-4 mr-2" />
                Timeline
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={refreshStats}
              disabled={refreshing}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {refreshing ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <PieChart className="w-4 h-4 mr-2" />
                  Refresh Stats
                </>
              )}
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300">Usage Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                      <p className="text-gray-400">Usage pie chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Top Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{feature.name}</div>
                          <div className="text-sm text-gray-400">{feature.sessions} sessions</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-300 font-bold">{feature.usage}</div>
                          <div className="text-xs text-gray-400">usage rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300">Feature Usage Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-gray-700/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                    <p className="text-gray-400">Feature usage bar chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300">Usage Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center bg-gray-700/30 rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-2 text-green-400" />
                    <p className="text-gray-400">Usage timeline visualization</p>
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

export default UsageStatistics;
