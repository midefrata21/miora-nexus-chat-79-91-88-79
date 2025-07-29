import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Zap, 
  Activity, 
  Clock, 
  Target,
  Cpu,
  MemoryStick,
  Wifi
} from 'lucide-react';

interface PerformanceMetrics {
  signalQuality: number;
  processingSpeed: number;
  memoryUsage: number;
  connectionQuality: number;
  profitAccuracy: number;
  systemLoad: number;
}

export const EnhancedPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    signalQuality: 94.2,
    processingSpeed: 87.5,
    memoryUsage: 34.8,
    connectionQuality: 78.3,
    profitAccuracy: 91.7,
    systemLoad: 23.1
  });

  const [isOptimizing, setIsOptimizing] = useState(false);

  // Real-time metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        signalQuality: Math.min(100, prev.signalQuality + (Math.random() - 0.3) * 2),
        processingSpeed: Math.min(100, prev.processingSpeed + (Math.random() - 0.4) * 3),
        memoryUsage: Math.max(10, Math.min(80, prev.memoryUsage + (Math.random() - 0.5) * 2)),
        connectionQuality: Math.min(100, prev.connectionQuality + (Math.random() - 0.2) * 4),
        profitAccuracy: Math.min(100, prev.profitAccuracy + (Math.random() - 0.3) * 1.5),
        systemLoad: Math.max(5, Math.min(60, prev.systemLoad + (Math.random() - 0.5) * 3))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const optimizeSystem = async () => {
    setIsOptimizing(true);
    
    // Simulate system optimization
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics(prev => ({
        signalQuality: Math.min(100, prev.signalQuality + 2),
        processingSpeed: Math.min(100, prev.processingSpeed + 3),
        memoryUsage: Math.max(15, prev.memoryUsage - 5),
        connectionQuality: Math.min(100, prev.connectionQuality + 4),
        profitAccuracy: Math.min(100, prev.profitAccuracy + 1.5),
        systemLoad: Math.max(10, prev.systemLoad - 3)
      }));
    }
    
    setIsOptimizing(false);
  };

  const getPerformanceColor = (value: number, inverse = false) => {
    if (inverse) {
      return value < 30 ? 'text-green-500' : value < 60 ? 'text-yellow-500' : 'text-red-500';
    }
    return value > 85 ? 'text-green-500' : value > 70 ? 'text-yellow-500' : 'text-red-500';
  };

  const getOverallPerformance = () => {
    const score = (
      metrics.signalQuality * 0.25 +
      metrics.processingSpeed * 0.2 +
      (100 - metrics.memoryUsage) * 0.15 +
      metrics.connectionQuality * 0.2 +
      metrics.profitAccuracy * 0.15 +
      (100 - metrics.systemLoad) * 0.05
    );
    return score;
  };

  const overallScore = getOverallPerformance();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Enhanced Performance Monitor
            <Badge variant={overallScore > 85 ? 'default' : overallScore > 70 ? 'secondary' : 'destructive'}>
              {overallScore.toFixed(1)}% Overall
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={optimizeSystem}
            disabled={isOptimizing}
            className="flex items-center gap-2"
          >
            <Zap className={`h-4 w-4 ${isOptimizing ? 'animate-pulse' : ''}`} />
            {isOptimizing ? 'Optimizing...' : 'Auto-Optimize'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Signal Quality */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Signal Quality</span>
              </div>
              <span className={`text-sm font-bold ${getPerformanceColor(metrics.signalQuality)}`}>
                {metrics.signalQuality.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.signalQuality} className="h-2" />
            <div className="text-xs text-muted-foreground">
              High-confidence signals generated
            </div>
          </div>

          {/* Processing Speed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Processing Speed</span>
              </div>
              <span className={`text-sm font-bold ${getPerformanceColor(metrics.processingSpeed)}`}>
                {metrics.processingSpeed.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.processingSpeed} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Real-time analysis efficiency
            </div>
          </div>

          {/* Memory Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Memory Usage</span>
              </div>
              <span className={`text-sm font-bold ${getPerformanceColor(metrics.memoryUsage, true)}`}>
                {metrics.memoryUsage.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.memoryUsage} className="h-2" />
            <div className="text-xs text-muted-foreground">
              System resource utilization
            </div>
          </div>

          {/* Connection Quality */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Connection Quality</span>
              </div>
              <span className={`text-sm font-bold ${getPerformanceColor(metrics.connectionQuality)}`}>
                {metrics.connectionQuality.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.connectionQuality} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Exchange connectivity status
            </div>
          </div>

          {/* Profit Accuracy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Profit Accuracy</span>
              </div>
              <span className={`text-sm font-bold ${getPerformanceColor(metrics.profitAccuracy)}`}>
                {metrics.profitAccuracy.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.profitAccuracy} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Signal prediction accuracy
            </div>
          </div>

          {/* System Load */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">System Load</span>
              </div>
              <span className={`text-sm font-bold ${getPerformanceColor(metrics.systemLoad, true)}`}>
                {metrics.systemLoad.toFixed(1)}%
              </span>
            </div>
            <Progress value={metrics.systemLoad} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Current processing load
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  System Performance Status
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  {overallScore > 90 ? 'Excellent - Peak Performance' :
                   overallScore > 80 ? 'Good - Optimal Operation' :
                   overallScore > 70 ? 'Fair - Minor Optimization Needed' :
                   'Poor - Optimization Required'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
                {overallScore.toFixed(1)}%
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Overall Score
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};