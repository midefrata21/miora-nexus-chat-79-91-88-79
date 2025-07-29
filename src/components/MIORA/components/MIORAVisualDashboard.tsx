import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Brain, 
  Database, 
  Globe,
  Target,
  Cpu,
  BarChart3
} from 'lucide-react';

interface MIORAVisualDashboardProps {
  state: any;
  metrics: any;
  signals: any[];
  apiConnections: any[];
}

export const MIORAVisualDashboard: React.FC<MIORAVisualDashboardProps> = ({
  state,
  metrics,
  signals,
  apiConnections
}) => {
  // Generate sample data for charts
  const performanceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    performance: Math.floor(Math.random() * 20 + 80),
    profit: Math.floor(Math.random() * 100 - 20),
    signals: Math.floor(Math.random() * 10 + 2)
  }));

  const metricsData = [
    { name: 'CPU', value: metrics.cpu, color: '#8B5CF6' },
    { name: 'Memory', value: metrics.memory, color: '#06B6D4' },
    { name: 'Network', value: metrics.network, color: '#10B981' },
    { name: 'Performance', value: metrics.performance, color: '#F59E0B' },
    { name: 'Token Processing', value: metrics.tokenProcessing, color: '#EF4444' },
    { name: 'Reasoning', value: metrics.reasoning, color: '#8B5CF6' },
    { name: 'Multimodal', value: metrics.multimodal, color: '#06B6D4' }
  ];

  const signalDistribution = [
    { name: 'BUY', value: signals.filter(s => s.type === 'BUY').length, fill: '#10B981' },
    { name: 'SELL', value: signals.filter(s => s.type === 'SELL').length, fill: '#EF4444' },
    { name: 'HOLD', value: signals.filter(s => s.type === 'HOLD').length, fill: '#F59E0B' }
  ];

  const apiStatusData = apiConnections.map(api => ({
    name: api.name,
    responseTime: api.responseTime,
    status: api.status === 'connected' ? 100 : api.status === 'connecting' ? 50 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">System Health</p>
                <p className="text-2xl font-bold text-white">{state.systemHealth.toFixed(1)}%</p>
                <div className="flex items-center text-green-400 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.3%
                </div>
              </div>
              <Activity className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Performance</p>
                <p className="text-2xl font-bold text-white">{state.performanceScore.toFixed(1)}%</p>
                <div className="flex items-center text-green-400 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1.8%
                </div>
              </div>
              <Target className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total P&L</p>
                <p className="text-2xl font-bold text-white">
                  ${state.totalProfitLoss.toFixed(0)}
                </p>
                <div className="flex items-center text-green-400 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.2%
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Active Signals</p>
                <p className="text-2xl font-bold text-white">{signals.length}</p>
                <div className="flex items-center text-green-400 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3 new
                </div>
              </div>
              <Zap className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Timeline */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              Performance Timeline (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#performanceGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Signal Distribution */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />
              Signal Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={signalDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {signalDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {signalDistribution.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded mr-2" 
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span className="text-sm text-gray-300">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Resources */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-blue-400" />
              System Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metricsData.slice(0, 4).map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{metric.name}</span>
                    <span className="text-sm font-bold text-white">{metric.value.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                    style={{ backgroundColor: '#374151' }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              AI Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metricsData.slice(4).map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{metric.name}</span>
                    <span className="text-sm font-bold text-white">{metric.value.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                    style={{ backgroundColor: '#374151' }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Response Times */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-5 w-5 mr-2 text-green-400" />
            API Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="responseTime" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Metrics Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-300">Autonomy Level</p>
            <p className="text-2xl font-bold text-white">{state.autonomyLevel}%</p>
            <Progress value={state.autonomyLevel} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 border-pink-500/30">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-pink-400" />
            <p className="text-sm text-gray-300">Learning Rate</p>
            <p className="text-2xl font-bold text-white">{state.learningRate}%</p>
            <Progress value={state.learningRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 border-indigo-500/30">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
            <p className="text-sm text-gray-300">Memory Usage</p>
            <p className="text-2xl font-bold text-white">{metrics.memory}%</p>
            <Progress value={metrics.memory} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-600/20 to-teal-800/20 border-teal-500/30">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-teal-400" />
            <p className="text-sm text-gray-300">Cycle Count</p>
            <p className="text-2xl font-bold text-white">{state.cycleCount}</p>
            <Badge className="mt-2 bg-teal-500">Running</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};