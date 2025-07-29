import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Database, Network, Zap, TrendingUp } from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  critical: boolean;
}

export const PerformanceOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    { id: 'cpu', name: 'CPU Optimization', value: 45, target: 95, unit: '%', trend: 'up', critical: false },
    { id: 'memory', name: 'Memory Efficiency', value: 67, target: 90, unit: '%', trend: 'up', critical: false },
    { id: 'network', name: 'Network Latency', value: 23, target: 15, unit: 'ms', trend: 'down', critical: true },
    { id: 'throughput', name: 'Throughput', value: 89, target: 100, unit: 'ops/s', trend: 'up', critical: false },
    { id: 'quantum', name: 'Quantum Processing', value: 78, target: 100, unit: '%', trend: 'up', critical: false },
    { id: 'ai_efficiency', name: 'AI Efficiency', value: 92, target: 98, unit: '%', trend: 'stable', critical: false }
  ]);

  const [systemScore, setSystemScore] = useState(0);

  useEffect(() => {
    const optimizationInterval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        let newValue = metric.value;
        
        if (metric.trend === 'up' && metric.value < metric.target) {
          newValue = Math.min(metric.target, metric.value + Math.random() * 3 + 1);
        } else if (metric.trend === 'down' && metric.value > metric.target) {
          newValue = Math.max(metric.target, metric.value - Math.random() * 2 + 0.5);
        } else if (metric.trend === 'stable') {
          newValue = metric.value + (Math.random() - 0.5) * 1;
        }

        return { ...metric, value: newValue };
      }));
    }, 2000);

    return () => clearInterval(optimizationInterval);
  }, []);

  useEffect(() => {
    const score = metrics.reduce((sum, metric) => {
      const efficiency = metric.trend === 'down' 
        ? (metric.target / Math.max(metric.value, 1)) * 100
        : (metric.value / metric.target) * 100;
      return sum + Math.min(100, efficiency);
    }, 0) / metrics.length;
    
    setSystemScore(score);
  }, [metrics]);

  const getMetricIcon = (id: string) => {
    switch (id) {
      case 'cpu': return <Cpu className="h-5 w-5" />;
      case 'memory': return <Database className="h-5 w-5" />;
      case 'network': return <Network className="h-5 w-5" />;
      case 'throughput': return <Activity className="h-5 w-5" />;
      case 'quantum': return <Zap className="h-5 w-5" />;
      case 'ai_efficiency': return <TrendingUp className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getProgressColor = (metric: PerformanceMetric) => {
    const efficiency = metric.trend === 'down' 
      ? (metric.target / Math.max(metric.value, 1)) * 100
      : (metric.value / metric.target) * 100;

    if (efficiency >= 90) return 'bg-green-500';
    if (efficiency >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800/60 to-purple-800/60 border-purple-400/40">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center justify-between">
          <span className="flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Performance Optimizer
          </span>
          <Badge className={`text-lg px-4 py-2 ${
            systemScore >= 90 ? 'bg-green-500' : 
            systemScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
          } text-white`}>
            {systemScore.toFixed(1)}% Optimal
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const efficiency = metric.trend === 'down' 
              ? (metric.target / Math.max(metric.value, 1)) * 100
              : (metric.value / metric.target) * 100;

            return (
              <div key={metric.id} className="p-4 bg-black/30 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getMetricIcon(metric.id)}
                    <span className="text-white font-medium">{metric.name}</span>
                  </div>
                  {metric.critical && (
                    <Badge variant="destructive" className="text-xs">
                      Critical
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Current: {metric.value.toFixed(1)}{metric.unit}
                    </span>
                    <span className="text-gray-400">
                      Target: {metric.target}{metric.unit}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, efficiency)} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500">
                    Efficiency: {efficiency.toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOptimizer;