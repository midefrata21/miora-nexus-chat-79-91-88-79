
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  LineChart,
  BarChart3,
  PieChart,
  Activity,
  TrendingUp,
  Eye,
  Settings,
  Download
} from 'lucide-react';

const DataVisualization = () => {
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const chartTypes = [
    {
      name: 'Line Charts',
      description: 'Time series and trend visualization',
      count: 12,
      icon: LineChart,
      color: 'text-blue-400'
    },
    {
      name: 'Bar Charts',
      description: 'Comparative data analysis',
      count: 8,
      icon: BarChart3,
      color: 'text-green-400'
    },
    {
      name: 'Pie Charts',
      description: 'Distribution and percentage views',
      count: 6,
      icon: PieChart,
      color: 'text-purple-400'
    },
    {
      name: 'Activity Charts',
      description: 'Real-time monitoring displays',
      count: 15,
      icon: Activity,
      color: 'text-orange-400'
    }
  ];

  const dashboards = [
    { name: 'System Performance', status: 'active', charts: 8, updated: '2 min ago' },
    { name: 'User Analytics', status: 'active', charts: 6, updated: '5 min ago' },
    { name: 'Resource Usage', status: 'active', charts: 10, updated: '1 min ago' },
    { name: 'Error Tracking', status: 'active', charts: 4, updated: '3 min ago' }
  ];

  const generateVisualizations = () => {
    setGenerating(true);
    toast({
      title: "📊 Generating Visualizations",
      description: "Creating advanced data visualizations...",
    });

    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "✅ Visualizations Ready",
        description: "New charts and graphs have been generated",
      });
    }, 3000);
  };

  const exportDashboard = () => {
    toast({
      title: "📥 Exporting Dashboard",
      description: "Dashboard exported successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <LineChart className="w-8 h-8 text-indigo-400" />
            Data Visualization Studio
            <BarChart3 className="w-8 h-8 text-green-400" />
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced data visualization and interactive dashboard creation
          </p>
        </div>

        {/* Chart Types Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {chartTypes.map((chart, index) => {
            const IconComponent = chart.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-indigo-500/30">
                <CardContent className="p-6 text-center">
                  <IconComponent className={`w-8 h-8 mx-auto mb-3 ${chart.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">
                    {chart.count}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">
                    {chart.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {chart.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="charts" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-800/50 border border-gray-600/30">
              <TabsTrigger value="charts" className="data-[state=active]:bg-indigo-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="dashboards" className="data-[state=active]:bg-green-600">
                <Eye className="w-4 h-4 mr-2" />
                Dashboards
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button
                onClick={exportDashboard}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={generateVisualizations}
                disabled={generating}
                className="bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                {generating ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <LineChart className="w-4 h-4 mr-2" />
                    Generate Charts
                  </>
                )}
              </Button>
            </div>
          </div>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300">Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <LineChart className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                      <p className="text-gray-400">Interactive line chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 text-green-400" />
                      <p className="text-gray-400">Dynamic bar chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Resource Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                      <p className="text-gray-400">Interactive pie chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-300">Real-time Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
                    <div className="text-center">
                      <Activity className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                      <p className="text-gray-400">Live activity monitoring chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300">Active Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboards.map((dashboard, index) => (
                    <div key={index} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">{dashboard.name}</h3>
                        <Badge className="bg-green-600 text-white">
                          {dashboard.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{dashboard.charts} charts</span>
                        <span>Updated {dashboard.updated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300">Visualization Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">Chart Configuration</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Auto-refresh</span>
                          <Badge className="bg-green-600 text-white">Enabled</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Animation</span>
                          <Badge className="bg-green-600 text-white">Enabled</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Theme</span>
                          <Badge className="bg-blue-600 text-white">Dark</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">Data Sources</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Real-time Data</span>
                          <Badge className="bg-green-600 text-white">Connected</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Historical Data</span>
                          <Badge className="bg-green-600 text-white">Available</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Export Format</span>
                          <Badge className="bg-blue-600 text-white">PNG/SVG</Badge>
                        </div>
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

export default DataVisualization;
