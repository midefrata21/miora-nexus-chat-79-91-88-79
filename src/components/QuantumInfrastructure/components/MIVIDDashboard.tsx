
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Monitor, TrendingUp, Globe, Server } from 'lucide-react';

export const MIVIDDashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    requestsPerSecond: 423,
    responseTime: 67,
    errorRate: 0.012,
    activeConnections: 2847,
    bandwidth: 1.2,
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 38,
    networkLatency: 12,
    uptimePercentage: 99.97
  });

  const [regions] = useState([
    { name: 'Asia Pacific', load: 67, status: 'optimal', responseTime: 45 },
    { name: 'Europe', load: 52, status: 'optimal', responseTime: 38 },
    { name: 'North America', load: 73, status: 'high', responseTime: 23 },
    { name: 'South America', load: 34, status: 'optimal', responseTime: 67 },
    { name: 'Middle East', load: 28, status: 'optimal', responseTime: 89 },
    { name: 'Africa', load: 19, status: 'optimal', responseTime: 94 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        requestsPerSecond: Math.max(200, Math.min(800, prev.requestsPerSecond + (Math.random() - 0.5) * 50)),
        responseTime: Math.max(45, Math.min(150, prev.responseTime + (Math.random() - 0.5) * 20)),
        errorRate: Math.max(0.001, Math.min(0.03, prev.errorRate + (Math.random() - 0.5) * 0.005)),
        activeConnections: Math.max(1000, Math.min(5000, prev.activeConnections + (Math.random() - 0.5) * 200)),
        bandwidth: Math.max(0.5, Math.min(5, prev.bandwidth + (Math.random() - 0.5) * 0.3)),
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskUsage: Math.max(20, Math.min(95, prev.diskUsage + (Math.random() - 0.5) * 3)),
        networkLatency: Math.max(5, Math.min(100, prev.networkLatency + (Math.random() - 0.5) * 5)),
        uptimePercentage: Math.max(99.5, Math.min(100, prev.uptimePercentage + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'high': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center text-2xl">
            <Monitor className="h-8 w-8 mr-3" />
            MIVID - Visual Infrastructure Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real-time Metrics */}
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{realTimeData.requestsPerSecond}</div>
              <div className="text-sm text-gray-400">Requests/sec</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(realTimeData.requestsPerSecond / 800) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center p-4 bg-black/30 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{realTimeData.responseTime}ms</div>
              <div className="text-sm text-gray-400">Response Time</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(realTimeData.responseTime / 150) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Server className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{realTimeData.activeConnections}</div>
              <div className="text-sm text-gray-400">Active Connections</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(realTimeData.activeConnections / 5000) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Globe className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{realTimeData.uptimePercentage.toFixed(2)}%</div>
              <div className="text-sm text-gray-400">Uptime</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${realTimeData.uptimePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">System Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">CPU Usage</span>
                <span className="text-blue-400">{realTimeData.cpuUsage}%</span>
              </div>
              <Progress value={realTimeData.cpuUsage} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Memory Usage</span>
                <span className="text-purple-400">{realTimeData.memoryUsage}%</span>
              </div>
              <Progress value={realTimeData.memoryUsage} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Disk Usage</span>
                <span className="text-green-400">{realTimeData.diskUsage}%</span>
              </div>
              <Progress value={realTimeData.diskUsage} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Network Latency</span>
                <span className="text-orange-400">{realTimeData.networkLatency}ms</span>
              </div>
              <Progress value={(realTimeData.networkLatency / 100) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Regional Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regions.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-cyan-400" />
                    <div>
                      <div className="font-medium text-white">{region.name}</div>
                      <div className="text-sm text-gray-400">{region.responseTime}ms avg</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm text-white">{region.load}% load</div>
                    </div>
                    <Badge className={getStatusColor(region.status)}>
                      {region.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Status */}
      <Card className="bg-black/40 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-bold text-lg">
                📊 MIVID DASHBOARD: REAL-TIME MONITORING ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-green-400 mt-2">
            Updates every 3 seconds • Global Infrastructure Status • Performance Analytics
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
