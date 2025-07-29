import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Zap, 
  Target, 
  Activity,
  PieChart,
  LineChart,
  Award,
  Rocket
} from 'lucide-react';
import { useGrowthDocumentation } from '@/hooks/useGrowthDocumentation';

interface AnalyticsData {
  totalGrowthEntries: number;
  averageDailyGrowth: number;
  growthTrend: 'increasing' | 'stable' | 'decreasing';
  categoryDistribution: Record<string, number>;
  impactDistribution: Record<string, number>;
  learningVelocity: number;
  evolutionScore: number;
  futureProjections: {
    next7Days: number;
    next30Days: number;
    next90Days: number;
  };
}

const ProgressAnalytics: React.FC = () => {
  const { growthHistory, todaysGrowth, totalGrowthPoints, recordGrowth } = useGrowthDocumentation();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Calculate comprehensive analytics
    const totalEntries = growthHistory.reduce((sum, day) => sum + day.entries.length, 0);
    const activeDays = growthHistory.length;
    const averageDaily = activeDays > 0 ? totalEntries / activeDays : 0;

    // Category distribution
    const categoryDist: Record<string, number> = {};
    const impactDist: Record<string, number> = {};

    growthHistory.forEach(day => {
      day.entries.forEach(entry => {
        categoryDist[entry.category] = (categoryDist[entry.category] || 0) + 1;
        impactDist[entry.impact] = (impactDist[entry.impact] || 0) + 1;
      });
    });

    // Learning velocity calculation (entries per day trend)
    const recentDays = growthHistory.slice(-7);
    const recentAverage = recentDays.length > 0 
      ? recentDays.reduce((sum, day) => sum + day.entries.length, 0) / recentDays.length 
      : 0;

    const learningVelocity = Math.round((recentAverage / Math.max(averageDaily, 1)) * 100);

    // Evolution score based on growth points and consistency
    const evolutionScore = Math.min(100, Math.round(
      (totalGrowthPoints / 100) + 
      (learningVelocity * 0.3) + 
      (activeDays * 2)
    ));

    // Growth trend analysis
    const oldAverage = growthHistory.slice(0, Math.floor(activeDays / 2))
      .reduce((sum, day) => sum + day.entries.length, 0) / Math.max(Math.floor(activeDays / 2), 1);
    
    const growthTrend: 'increasing' | 'stable' | 'decreasing' = 
      recentAverage > oldAverage * 1.1 ? 'increasing' :
      recentAverage < oldAverage * 0.9 ? 'decreasing' : 'stable';

    // Future projections
    const dailyRate = Math.max(averageDaily, todaysGrowth.length);
    const futureProjections = {
      next7Days: Math.round(dailyRate * 7),
      next30Days: Math.round(dailyRate * 30 * 1.1), // Assuming 10% growth
      next90Days: Math.round(dailyRate * 90 * 1.25) // Assuming 25% growth over 90 days
    };

    const analyticsData: AnalyticsData = {
      totalGrowthEntries: totalEntries,
      averageDailyGrowth: averageDaily,
      growthTrend,
      categoryDistribution: categoryDist,
      impactDistribution: impactDist,
      learningVelocity,
      evolutionScore,
      futureProjections
    };

    setAnalytics(analyticsData);

    // Record analytics calculation
    recordGrowth({
      id: `analytics_calculation_${Date.now()}`,
      timestamp: Date.now(),
      type: 'optimization',
      title: 'Advanced Analytics Calculation - Growth Intelligence',
      description: `MIORA telah menghitung analytics komprehensif dengan evolution score ${evolutionScore}%, learning velocity ${learningVelocity}%, dan trend ${growthTrend}. Proyeksi pertumbuhan menunjukkan potensi ${futureProjections.next30Days} entries dalam 30 hari ke depan.`,
      impact: 'high',
      category: 'analytics_intelligence',
      evidence: [
        `Total growth entries: ${totalEntries}`,
        `Evolution score: ${evolutionScore}%`,
        `Learning velocity: ${learningVelocity}%`,
        `Growth trend: ${growthTrend}`,
        `Future projection 30 days: ${futureProjections.next30Days} entries`,
        'Advanced analytics system operational'
      ]
    });

  }, [growthHistory, todaysGrowth, totalGrowthPoints, recordGrowth]);

  if (!analytics) {
    return (
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
            <p className="text-gray-400">Calculating advanced analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-400';
      case 'stable': return 'text-blue-400';
      case 'decreasing': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4" />;
      case 'stable': return <Activity className="w-4 h-4" />;
      case 'decreasing': return <TrendingUp className="w-4 h-4 rotate-180" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-800/40 to-purple-800/40 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Evolution Score</p>
                <p className="text-3xl font-bold text-blue-300">{analytics.evolutionScore}%</p>
              </div>
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <Progress value={analytics.evolutionScore} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-800/40 to-teal-800/40 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Learning Velocity</p>
                <p className="text-3xl font-bold text-green-300">{analytics.learningVelocity}%</p>
              </div>
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <Progress value={analytics.learningVelocity} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Growth Trend</p>
                <div className={`flex items-center text-lg font-bold ${getTrendColor(analytics.growthTrend)}`}>
                  {getTrendIcon(analytics.growthTrend)}
                  <span className="ml-2 capitalize">{analytics.growthTrend}</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-800/40 to-red-800/40 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Entries</p>
                <p className="text-3xl font-bold text-orange-300">{analytics.totalGrowthEntries}</p>
              </div>
              <Target className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Avg: {analytics.averageDailyGrowth.toFixed(1)}/day
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <PieChart className="w-5 h-5 mr-2" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.categoryDistribution)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => {
                  const percentage = (count / analytics.totalGrowthEntries) * 100;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{category.replace(/_/g, ' ')}</span>
                        <span className="text-gray-400">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Impact Analysis */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Award className="w-5 h-5 mr-2" />
              Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.impactDistribution)
                .sort(([,a], [,b]) => b - a)
                .map(([impact, count]) => {
                  const percentage = (count / analytics.totalGrowthEntries) * 100;
                  const impactColor = impact === 'critical' ? 'text-red-400' :
                                   impact === 'high' ? 'text-orange-400' :
                                   impact === 'medium' ? 'text-blue-400' : 'text-gray-400';
                  return (
                    <div key={impact} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={`${impactColor} border-current`}>
                          {impact.toUpperCase()}
                        </Badge>
                        <span className="text-gray-400 text-sm">{count} entries ({percentage.toFixed(1)}%)</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Future Projections */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-300">
            <Rocket className="w-5 h-5 mr-2" />
            Future Growth Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">{analytics.futureProjections.next7Days}</div>
              <div className="text-sm text-gray-400">Next 7 Days</div>
              <div className="text-xs text-gray-500 mt-1">
                ~{(analytics.futureProjections.next7Days / 7).toFixed(1)} entries/day
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">{analytics.futureProjections.next30Days}</div>
              <div className="text-sm text-gray-400">Next 30 Days</div>
              <div className="text-xs text-gray-500 mt-1">
                ~{(analytics.futureProjections.next30Days / 30).toFixed(1)} entries/day
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">{analytics.futureProjections.next90Days}</div>
              <div className="text-sm text-gray-400">Next 90 Days</div>
              <div className="text-xs text-gray-500 mt-1">
                Exponential growth potential
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressAnalytics;