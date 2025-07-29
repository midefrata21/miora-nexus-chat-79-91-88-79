import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Zap, Clock, Cpu, HardDrive } from 'lucide-react';

const PerformanceAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    responseTime: 245,
    throughput: 1250,
    cpuUsage: 68.3,
    memoryUsage: 72.1,
    errorRate: 0.02,
    uptime: 99.98
  });

  const performanceData = [
    { metric: 'Response Time', value: '245ms', trend: 'down', change: '-12%', icon: Clock, color: 'green' },
    { metric: 'Throughput', value: '1,250 req/s', trend: 'up', change: '+8%', icon: Zap, color: 'blue' },
    { metric: 'CPU Usage', value: '68.3%', trend: 'down', change: '-5%', icon: Cpu, color: 'orange' },
    { metric: 'Memory Usage', value: '72.1%', trend: 'up', change: '+3%', icon: HardDrive, color: 'purple' },
    { metric: 'Error Rate', value: '0.02%', trend: 'down', change: '-0.01%', icon: TrendingDown, color: 'red' },
    { metric: 'Uptime', value: '99.98%', trend: 'up', change: '+0.1%', icon: TrendingUp, color: 'green' }
  ];

  const alertThresholds = [
    { name: 'High CPU Usage', status: 'Warning', threshold: '> 80%', current: '68.3%' },
    { name: 'Memory Leak', status: 'Normal', threshold: '> 90%', current: '72.1%' },
    { name: 'Response Time', status: 'Optimal', threshold: '> 500ms', current: '245ms' },
    { name: 'Error Rate', status: 'Excellent', threshold: '> 1%', current: '0.02%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        responseTime: prev.responseTime + (Math.random() - 0.5) * 20,
        throughput: prev.throughput + (Math.random() - 0.5) * 100,
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <TrendingUp className="w-6 h-6" />
            Performance Analytics & Monitoring
            <Badge className="bg-purple-600/20 text-purple-300">Real-time</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {performanceData.map((item, index) => (
              <Card key={index} className={`bg-black/20 border-${item.color}-500/30`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">{item.metric}</div>
                      <div className="text-lg font-bold text-white">{item.value}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {item.change}
                      </div>
                    </div>
                    <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 text-lg">System Health Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertThresholds.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{alert.name}</div>
                    <div className="text-sm text-gray-400">Threshold: {alert.threshold}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-300">Current: {alert.current}</div>
                    <Badge className={`${
                      alert.status === 'Excellent' ? 'bg-green-600/20 text-green-300' :
                      alert.status === 'Optimal' ? 'bg-blue-600/20 text-blue-300' :
                      alert.status === 'Normal' ? 'bg-yellow-600/20 text-yellow-300' :
                      'bg-red-600/20 text-red-300'
                    }`}>
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 text-lg">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-300">
                • Response time improved by 12% after latest optimization
              </div>
              <div className="text-sm text-gray-300">
                • Database query performance increased by 23%
              </div>
              <div className="text-sm text-gray-300">
                • Memory usage optimized, reducing footprint by 15%
              </div>
              <div className="text-sm text-gray-300">
                • Auto-scaling triggered 3 times in the last hour
              </div>
              <div className="text-sm text-gray-300">
                • No performance bottlenecks detected
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics;