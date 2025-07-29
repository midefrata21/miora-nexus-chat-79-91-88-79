
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, Zap, Activity, Cloud, Server } from 'lucide-react';

interface CDNNode {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'maintenance' | 'degraded';
  cacheHitRate: number;
  bandwidth: number;
  latency: number;
  requestsPerSecond: number;
  dataTransferred: number;
}

export const EdgeCDNDistribution: React.FC = () => {
  const [cdnNodes, setCdnNodes] = useState<CDNNode[]>([
    {
      id: 'cdn-asia',
      name: 'Asia Pacific Edge',
      region: 'Tokyo, Singapore, Mumbai',
      status: 'active',
      cacheHitRate: 94.2,
      bandwidth: 2.3,
      latency: 12,
      requestsPerSecond: 1247,
      dataTransferred: 847.2
    },
    {
      id: 'cdn-europe',
      name: 'Europe Edge',
      region: 'Frankfurt, London, Paris',
      status: 'active',
      cacheHitRate: 96.8,
      bandwidth: 1.8,
      latency: 8,
      requestsPerSecond: 934,
      dataTransferred: 623.5
    },
    {
      id: 'cdn-na',
      name: 'North America Edge',
      region: 'Virginia, California, Toronto',
      status: 'active',
      cacheHitRate: 92.1,
      bandwidth: 3.4,
      latency: 15,
      requestsPerSecond: 1856,
      dataTransferred: 1234.8
    },
    {
      id: 'cdn-sa',
      name: 'South America Edge',
      region: 'São Paulo, Buenos Aires',
      status: 'active',
      cacheHitRate: 89.3,
      bandwidth: 1.2,
      latency: 28,
      requestsPerSecond: 456,
      dataTransferred: 298.7
    },
    {
      id: 'cdn-mea',
      name: 'Middle East & Africa Edge',
      region: 'Dubai, Cape Town',
      status: 'active',
      cacheHitRate: 87.6,
      bandwidth: 0.9,
      latency: 35,
      requestsPerSecond: 234,
      dataTransferred: 156.3
    }
  ]);

  const [globalCDNMetrics, setGlobalCDNMetrics] = useState({
    totalRequests: 4727,
    avgCacheHitRate: 92.0,
    totalBandwidth: 9.6,
    avgLatency: 19.6,
    totalDataTransferred: 3160.5,
    cacheMissRate: 8.0,
    originOffload: 92.0
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCdnNodes(prev => prev.map(node => ({
        ...node,
        cacheHitRate: Math.max(80, Math.min(99, node.cacheHitRate + (Math.random() - 0.5) * 3)),
        bandwidth: Math.max(0.5, Math.min(5, node.bandwidth + (Math.random() - 0.5) * 0.3)),
        latency: Math.max(5, Math.min(50, node.latency + (Math.random() - 0.5) * 5)),
        requestsPerSecond: Math.max(100, Math.min(2500, node.requestsPerSecond + (Math.random() - 0.5) * 200)),
        dataTransferred: node.dataTransferred + (Math.random() * 5)
      })));

      setGlobalCDNMetrics(prev => ({
        totalRequests: cdnNodes.reduce((sum, node) => sum + node.requestsPerSecond, 0),
        avgCacheHitRate: cdnNodes.reduce((sum, node) => sum + node.cacheHitRate, 0) / cdnNodes.length,
        totalBandwidth: cdnNodes.reduce((sum, node) => sum + node.bandwidth, 0),
        avgLatency: cdnNodes.reduce((sum, node) => sum + node.latency, 0) / cdnNodes.length,
        totalDataTransferred: cdnNodes.reduce((sum, node) => sum + node.dataTransferred, 0),
        cacheMissRate: 100 - (cdnNodes.reduce((sum, node) => sum + node.cacheHitRate, 0) / cdnNodes.length),
        originOffload: cdnNodes.reduce((sum, node) => sum + node.cacheHitRate, 0) / cdnNodes.length
      }));
    }, 5000);

    return () => clearInterval(updateInterval);
  }, [cdnNodes]);

  const getStatusColor = (status: CDNNode['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'degraded': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCacheHitColor = (rate: number) => {
    if (rate >= 95) return 'text-green-400';
    if (rate >= 90) return 'text-blue-400';
    if (rate >= 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center text-2xl">
            <Globe className="h-8 w-8 mr-3" />
            Edge CDN Distribution Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{globalCDNMetrics.totalRequests.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Requests/sec</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{globalCDNMetrics.avgCacheHitRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Cache Hit Rate</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Cloud className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{globalCDNMetrics.totalBandwidth.toFixed(1)} GB/s</div>
              <div className="text-sm text-gray-400">Total Bandwidth</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Server className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{globalCDNMetrics.avgLatency.toFixed(1)}ms</div>
              <div className="text-sm text-gray-400">Avg Latency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CDN Edge Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cdnNodes.map((node) => (
          <Card key={node.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">{node.name}</h3>
                    <p className="text-sm text-gray-400">{node.region}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(node.status)}>
                  {node.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className={`text-xl font-bold ${getCacheHitColor(node.cacheHitRate)}`}>
                    {node.cacheHitRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">Cache Hit Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-xl font-bold text-blue-300">{node.latency}ms</div>
                  <div className="text-sm text-gray-400">Latency</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Bandwidth Usage</span>
                    <span className="text-purple-400">{node.bandwidth.toFixed(1)} GB/s</span>
                  </div>
                  <Progress value={(node.bandwidth / 5) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Requests/sec</span>
                    <span className="text-green-400">{node.requestsPerSecond.toLocaleString()}</span>
                  </div>
                  <Progress value={(node.requestsPerSecond / 2500) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Data Transferred</span>
                    <span className="text-orange-400">{node.dataTransferred.toFixed(1)} GB</span>
                  </div>
                  <Progress value={(node.dataTransferred / 2000) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">CDN Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Origin Server Offload</span>
                <span className="text-green-400">{globalCDNMetrics.originOffload.toFixed(1)}%</span>
              </div>
              <Progress value={globalCDNMetrics.originOffload} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Cache Miss Rate</span>
                <span className="text-red-400">{globalCDNMetrics.cacheMissRate.toFixed(1)}%</span>
              </div>
              <Progress value={globalCDNMetrics.cacheMissRate} className="h-3" />
            </div>
            
            <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
              <div className="text-green-300 font-semibold">Performance Status</div>
              <div className="text-sm text-gray-400">
                CDN is operating at optimal performance with high cache hit rates
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Global Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { region: 'Asia Pacific', coverage: '94%', nodes: 12 },
                { region: 'Europe', coverage: '97%', nodes: 15 },
                { region: 'North America', coverage: '98%', nodes: 18 },
                { region: 'South America', coverage: '89%', nodes: 8 },
                { region: 'Middle East & Africa', coverage: '86%', nodes: 6 }
              ].map((region, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-cyan-400" />
                    <span className="text-white text-sm">{region.region}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-400">{region.coverage}</div>
                    <div className="text-xs text-gray-400">{region.nodes} nodes</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <Card className="bg-black/40 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 font-bold text-lg">
                🌍 EDGE CDN NETWORK: GLOBAL CONTENT DELIVERY ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-purple-400 mt-2">
            Ultra-Low Latency • 5-Continent Coverage • 59 Edge Points • 94% Cache Hit Rate
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
