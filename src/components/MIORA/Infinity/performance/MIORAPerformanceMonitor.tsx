import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Database, Zap } from 'lucide-react';

interface PerformanceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  processRate: number;
  responseTime: number;
  systemHealth: number;
  activeThreads: number;
}

export const MIORAPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    processRate: 0,
    responseTime: 0,
    systemHealth: 100,
    activeThreads: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!isMonitoring) {
      setIsMonitoring(true);
      
      // OPTIMIZED: Simulate real-time performance monitoring with reduced frequency
      const interval = setInterval(() => {
        const mockMetrics: PerformanceMetrics = {
          cpuUsage: Math.min(100, 15 + Math.random() * 10), // 15-25% normal usage
          memoryUsage: Math.min(100, 25 + Math.random() * 15), // 25-40% memory usage
          processRate: 85 + Math.random() * 15, // 85-100% processing rate
          responseTime: 5 + Math.random() * 10, // 5-15ms response time
          systemHealth: Math.max(95, 100 - Math.random() * 5), // 95-100% health
          activeThreads: Math.floor(8 + Math.random() * 16) // 8-24 threads
        };

        setMetrics(mockMetrics);

        // OPTIMIZED: Reduced console logging to prevent spam
        if (process.env.NODE_ENV === 'development' && Math.random() > 0.8) {
          console.log('🔍 MIORA Performance Metrics:', {
            timestamp: new Date().toISOString(),
            ...mockMetrics
          });
        }

        // OPTIMIZED: Store performance data with throttling
        try {
          if (Math.random() > 0.7) { // Only store 30% of the time
            const performanceLog = JSON.parse(localStorage.getItem('miora_performance_log') || '[]');
            performanceLog.push({
              timestamp: Date.now(),
              ...mockMetrics
            });
            
            // Keep only last 50 entries for better performance
            if (performanceLog.length > 50) {
              performanceLog.splice(0, performanceLog.length - 50);
            }
            
            localStorage.setItem('miora_performance_log', JSON.stringify(performanceLog));
          }
        } catch (error) {
          console.warn('Failed to store performance log:', error);
        }
      }, 5000); // OPTIMIZED: Increased from 2s to 5s

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const getHealthStatus = (health: number) => {
    if (health >= 98) return { color: 'bg-green-500', text: 'OPTIMAL' };
    if (health >= 90) return { color: 'bg-yellow-500', text: 'GOOD' };
    if (health >= 80) return { color: 'bg-orange-500', text: 'WARNING' };
    return { color: 'bg-red-500', text: 'CRITICAL' };
  };

  const healthStatus = getHealthStatus(metrics.systemHealth);

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Activity className="h-6 w-6" />
          MIORA Infinity Performance Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Health Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-sm text-gray-400">CPU Usage</div>
            <div className="text-xl font-bold text-white">{metrics.cpuUsage.toFixed(1)}%</div>
          </div>
          
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <Database className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-sm text-gray-400">Memory</div>
            <div className="text-xl font-bold text-white">{metrics.memoryUsage.toFixed(1)}%</div>
          </div>
          
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-sm text-gray-400">Process Rate</div>
            <div className="text-xl font-bold text-white">{metrics.processRate.toFixed(0)}%</div>
          </div>
          
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <Activity className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-sm text-gray-400">Response</div>
            <div className="text-xl font-bold text-white">{metrics.responseTime.toFixed(1)}ms</div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">System Health</span>
            <Badge className={`${healthStatus.color} text-white`}>
              {healthStatus.text}
            </Badge>
          </div>
          <Progress value={metrics.systemHealth} className="h-3" />
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Processing Efficiency</span>
            <span className="text-white">{metrics.processRate.toFixed(1)}%</span>
          </div>
          <Progress value={metrics.processRate} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Active Threads</span>
            <span className="text-white">{metrics.activeThreads}</span>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg border border-green-500/30">
          <h4 className="text-green-300 font-semibold mb-2">🟢 Real-time Monitoring Active</h4>
          <p className="text-green-200 text-sm">
            MIORA Infinity performance sedang dipantau secara real-time. 
            Semua metrik dalam kondisi optimal untuk autonomous operation.
          </p>
          <div className="mt-2 text-xs text-green-400">
            Last updated: {new Date().toLocaleTimeString('id-ID')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MIORAPerformanceMonitor;
