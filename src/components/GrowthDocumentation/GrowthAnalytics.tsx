import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGrowthAnalytics } from '@/hooks/useGrowthAnalytics';
import { GrowthTimeline, GrowthEntry } from '@/types/growth';
import SevenDayEvaluation from './SevenDayEvaluation';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target, 
  Activity,
  Calendar,
  Zap,
  Award,
  PieChart,
  Download,
  RefreshCw,
  Clock
} from 'lucide-react';

interface GrowthAnalyticsProps {
  growthHistory: GrowthTimeline[];
  todaysGrowth: GrowthEntry[];
  totalGrowthPoints: number;
}

const GrowthAnalytics: React.FC<GrowthAnalyticsProps> = ({
  growthHistory,
  todaysGrowth,
  totalGrowthPoints
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { 
    getGrowthStats, 
    getDetailedStats, 
    getCategoryBreakdown, 
    getImpactDistribution 
  } = useGrowthAnalytics(growthHistory, todaysGrowth, totalGrowthPoints);

  const stats = getGrowthStats();
  const detailedStats = getDetailedStats();
  const categoryBreakdown = getCategoryBreakdown();
  const impactDistribution = getImpactDistribution();

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const exportAnalytics = () => {
    const analyticsData = {
      generated: new Date().toISOString(),
      overview: stats,
      detailed: detailedStats,
      categories: categoryBreakdown,
      impact: impactDistribution,
      rawData: { growthHistory, todaysGrowth, totalGrowthPoints }
    };
    
    const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIORA_Growth_Analytics_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getGrowthTrend = () => {
    if (growthHistory.length < 2) return 'stable';
    const recent = growthHistory.slice(-7);
    const totalRecent = recent.reduce((sum, day) => sum + day.entries.length, 0);
    const avgRecent = totalRecent / recent.length;
    return avgRecent > 3 ? 'increasing' : avgRecent > 1 ? 'stable' : 'decreasing';
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-400';
      case 'stable': return 'text-blue-400';
      case 'decreasing': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Growth Analytics</h2>
          <p className="text-gray-400">Comprehensive analysis of MIORA's learning progress</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
          
          <Button
            onClick={exportAnalytics}
            variant="outline"
            className="border-cyan-400/30 text-cyan-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Entries</p>
                <p className="text-white text-2xl font-bold">{stats.totalEntries}</p>
                <p className="text-blue-200 text-xs">Across {stats.daysTracked} days</p>
              </div>
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Today's Growth</p>
                <p className="text-white text-2xl font-bold">{stats.todayEntries}</p>
                <Badge className={`text-xs ${getTrendColor(getGrowthTrend())}`}>
                  {getGrowthTrend()}
                </Badge>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Growth Points</p>
                <p className="text-white text-2xl font-bold">{stats.totalPoints}</p>
                <p className="text-purple-200 text-xs">Accumulated</p>
              </div>
              <Award className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm font-medium">Avg Daily</p>
                <p className="text-white text-2xl font-bold">
                  {stats.daysTracked > 0 ? Math.round(stats.totalEntries / stats.daysTracked) : 0}
                </p>
                <p className="text-orange-200 text-xs">Entries/day</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs with 7-Day Evaluation */}
      <Tabs defaultValue="evaluation" className="space-y-6">
        <TabsList className="bg-gray-800/50 border border-gray-600/30">
          <TabsTrigger value="evaluation" className="data-[state=active]:bg-purple-600">
            <Clock className="w-4 h-4 mr-2" />
            7-Day Evaluation
          </TabsTrigger>
          <TabsTrigger value="types" className="data-[state=active]:bg-purple-600">
            <Brain className="w-4 h-4 mr-2" />
            Growth Types
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-purple-600">
            <PieChart className="w-4 h-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:bg-purple-600">
            <Target className="w-4 h-4 mr-2" />
            Impact Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evaluation" className="space-y-6">
          <SevenDayEvaluation />
        </TabsContent>

        <TabsContent value="types" className="space-y-6">
          <Card className="bg-gray-800/50 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-indigo-300">Growth Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(detailedStats).map(([type, count]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-cyan-300 font-bold">{count}</span>
                    </div>
                    <Progress 
                      value={stats.totalEntries > 0 ? (count / stats.totalEntries) * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="p-4 bg-black/20 rounded-lg border border-green-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{category}</span>
                      <Badge className="bg-green-500/20 text-green-300">{count}</Badge>
                    </div>
                    <Progress 
                      value={stats.totalEntries > 0 ? (count / stats.totalEntries) * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300">Impact Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(impactDistribution).map(([impact, count]) => (
                  <div key={impact} className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/20">
                    <div className="text-2xl font-bold text-white mb-1">{count}</div>
                    <div className="text-sm text-gray-300 capitalize">{impact}</div>
                    <div className="text-xs text-purple-300 mt-1">
                      {stats.totalEntries > 0 ? Math.round((count / stats.totalEntries) * 100) : 0}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300">Growth Trends & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-black/20 rounded-lg border border-cyan-500/20">
                  <h4 className="font-semibold text-white mb-3">Key Insights</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                      Most productive learning type: {Object.entries(detailedStats).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
                      Average daily growth: {stats.daysTracked > 0 ? (stats.totalEntries / stats.daysTracked).toFixed(1) : 0} entries
                    </li>
                    <li className="flex items-start">
                      <Activity className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      Growth trend: {getGrowthTrend()} pattern detected
                    </li>
                    <li className="flex items-start">
                      <Brain className="w-4 h-4 text-purple-400 mr-2 mt-0.5" />
                      Learning efficiency: {totalGrowthPoints > 0 ? Math.round((stats.totalEntries / totalGrowthPoints) * 1000) : 0} entries per 1000 points
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-black/20 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold text-white mb-3">Recommendations</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <Award className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                      Focus on high-impact learning areas for maximum growth
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      Maintain consistent daily learning for optimal progress
                    </li>
                    <li className="flex items-start">
                      <Brain className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
                      Diversify learning types to enhance overall capability
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrowthAnalytics;
