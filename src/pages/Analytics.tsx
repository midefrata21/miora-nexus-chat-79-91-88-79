import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, BarChart3, PieChart, TrendingUp, Target, Eye } from 'lucide-react';
import { HorizontalCategoryMenu } from '@/components/Navigation/HorizontalCategoryMenu';

const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-green-900 to-emerald-900">
      <HorizontalCategoryMenu />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Activity className="w-12 h-12 text-teal-400" />
              <h1 className="text-4xl font-bold text-white">Analytics Dashboard</h1>
            </div>
            <p className="text-xl text-teal-200">Advanced Data Analytics & Insights</p>
            <Badge className="bg-teal-600/20 text-teal-300 border-teal-500/30">
              📊 Analytics Engine Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-teal-500/30">
              <CardHeader>
                <CardTitle className="text-teal-300 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Real-time Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Live data streams and real-time metrics</p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  View Live Data
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">System performance and efficiency metrics</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Performance Data
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-emerald-500/30">
              <CardHeader>
                <CardTitle className="text-emerald-300 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Data Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Interactive charts and visualizations</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Create Charts
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Identify patterns and future trends</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Analyze Trends
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Goal Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Track KPIs and business objectives</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Track Goals
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Data Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">AI-powered insights and recommendations</p>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Get Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;