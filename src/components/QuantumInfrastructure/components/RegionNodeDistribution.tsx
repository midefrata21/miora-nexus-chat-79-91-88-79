
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, MapPin, Server, Activity, Users, TrendingUp } from 'lucide-react';

interface RegionNode {
  id: string;
  name: string;
  continent: string;
  country: string;
  city: string;
  coordinates: { lat: number; lng: number };
  status: 'active' | 'maintenance' | 'deploying' | 'offline';
  nodes: number;
  maxNodes: number;
  users: number;
  latency: number;
  bandwidth: number;
  uptime: number;
  load: number;
}

export const RegionNodeDistribution: React.FC = () => {
  const [regionNodes, setRegionNodes] = useState<RegionNode[]>([
    {
      id: 'asia-singapore',
      name: 'Asia Pacific Hub',
      continent: 'Asia',
      country: 'Singapore',
      city: 'Singapore',
      coordinates: { lat: 1.3521, lng: 103.8198 },
      status: 'active',
      nodes: 12,
      maxNodes: 20,
      users: 8437,
      latency: 23,
      bandwidth: 2.3,
      uptime: 99.97,
      load: 67
    },
    {
      id: 'europe-frankfurt',
      name: 'Europe Central Hub',
      continent: 'Europe',
      country: 'Germany',
      city: 'Frankfurt',
      coordinates: { lat: 50.1109, lng: 8.6821 },
      status: 'active',
      nodes: 15,
      maxNodes: 25,
      users: 12456,
      latency: 18,
      bandwidth: 3.1,
      uptime: 99.94,
      load: 52
    },
    {
      id: 'na-virginia',
      name: 'North America East Hub',
      continent: 'North America',
      country: 'United States',
      city: 'Virginia',
      coordinates: { lat: 39.0458, lng: -76.6413 },
      status: 'active',
      nodes: 18,
      maxNodes: 30,
      users: 15623,
      latency: 15,
      bandwidth: 4.2,
      uptime: 99.98,
      load: 73
    },
    {
      id: 'na-california',
      name: 'North America West Hub',
      continent: 'North America',
      country: 'United States',
      city: 'California',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      status: 'active',
      nodes: 14,
      maxNodes: 25,
      users: 11234,
      latency: 19,
      bandwidth: 3.8,
      uptime: 99.92,
      load: 58
    },
    {
      id: 'sa-saopaulo',
      name: 'South America Hub',
      continent: 'South America',
      country: 'Brazil',
      city: 'São Paulo',
      coordinates: { lat: -23.5505, lng: -46.6333 },
      status: 'active',
      nodes: 8,
      maxNodes: 15,
      users: 4567,
      latency: 45,
      bandwidth: 1.8,
      uptime: 99.89,
      load: 34
    },
    {
      id: 'mea-dubai',
      name: 'Middle East Hub',
      continent: 'Middle East',
      country: 'UAE',
      city: 'Dubai',
      coordinates: { lat: 25.2048, lng: 55.2708 },
      status: 'active',
      nodes: 6,
      maxNodes: 12,
      users: 2845,
      latency: 32,
      bandwidth: 1.4,
      uptime: 99.86,
      load: 28
    },
    {
      id: 'africa-capetown',
      name: 'Africa Hub',
      continent: 'Africa',
      country: 'South Africa',
      city: 'Cape Town',
      coordinates: { lat: -33.9249, lng: 18.4241 },
      status: 'deploying',
      nodes: 4,
      maxNodes: 10,
      users: 1234,
      latency: 67,
      bandwidth: 0.9,
      uptime: 99.82,
      load: 19
    },
    {
      id: 'oceania-sydney',
      name: 'Oceania Hub',
      continent: 'Oceania',
      country: 'Australia',
      city: 'Sydney',
      coordinates: { lat: -33.8688, lng: 151.2093 },
      status: 'active',
      nodes: 7,
      maxNodes: 15,
      users: 3456,
      latency: 38,
      bandwidth: 1.6,
      uptime: 99.91,
      load: 41
    }
  ]);

  const [globalDistribution, setGlobalDistribution] = useState({
    totalNodes: 84,
    maxNodes: 152,
    totalUsers: 59852,
    avgLatency: 32.1,
    totalBandwidth: 19.1,
    avgUptime: 99.91,
    activeRegions: 8,
    globalCoverage: 94.7
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setRegionNodes(prev => prev.map(region => ({
        ...region,
        users: Math.max(500, Math.min(20000, region.users + (Math.random() - 0.5) * 200)),
        latency: Math.max(10, Math.min(80, region.latency + (Math.random() - 0.5) * 5)),
        bandwidth: Math.max(0.5, Math.min(5, region.bandwidth + (Math.random() - 0.5) * 0.2)),
        uptime: Math.max(99.5, Math.min(100, region.uptime + (Math.random() - 0.5) * 0.05)),
        load: Math.max(10, Math.min(90, region.load + (Math.random() - 0.5) * 8))
      })));

      setGlobalDistribution(prev => ({
        totalNodes: regionNodes.reduce((sum, region) => sum + region.nodes, 0),
        maxNodes: regionNodes.reduce((sum, region) => sum + region.maxNodes, 0),
        totalUsers: regionNodes.reduce((sum, region) => sum + region.users, 0),
        avgLatency: regionNodes.reduce((sum, region) => sum + region.latency, 0) / regionNodes.length,
        totalBandwidth: regionNodes.reduce((sum, region) => sum + region.bandwidth, 0),
        avgUptime: regionNodes.reduce((sum, region) => sum + region.uptime, 0) / regionNodes.length,
        activeRegions: regionNodes.filter(region => region.status === 'active').length,
        globalCoverage: Math.max(90, Math.min(100, prev.globalCoverage + (Math.random() - 0.5) * 1))
      }));
    }, 7000);

    return () => clearInterval(updateInterval);
  }, [regionNodes]);

  const getStatusColor = (status: RegionNode['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'deploying': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency <= 20) return 'text-green-400';
    if (latency <= 40) return 'text-yellow-400';
    if (latency <= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return 'text-green-400';
    if (uptime >= 99.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border-teal-500/30">
        <CardHeader>
          <CardTitle className="text-teal-400 flex items-center text-2xl">
            <Globe className="h-8 w-8 mr-3" />
            Global Region Node Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Server className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{globalDistribution.totalNodes}</div>
              <div className="text-sm text-gray-400">Total Nodes</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{globalDistribution.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Users</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{globalDistribution.avgLatency.toFixed(1)}ms</div>
              <div className="text-sm text-gray-400">Avg Latency</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{globalDistribution.globalCoverage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Global Coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Region Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {regionNodes.map((region) => (
          <Card key={region.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-teal-400" />
                  <div>
                    <h3 className="font-semibold text-white">{region.name}</h3>
                    <p className="text-sm text-gray-400">{region.city}, {region.country}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(region.status)}>
                  {region.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-300">{region.nodes}</div>
                  <div className="text-xs text-gray-400">Nodes</div>
                </div>
                <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-green-300">{region.users.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
                <div className="text-center p-2 bg-gray-700/50 rounded-lg">
                  <div className={`text-lg font-bold ${getLatencyColor(region.latency)}`}>
                    {region.latency}ms
                  </div>
                  <div className="text-xs text-gray-400">Latency</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Node Capacity</span>
                    <span className="text-blue-400">
                      {((region.nodes / region.maxNodes) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(region.nodes / region.maxNodes) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Load</span>
                    <span className="text-purple-400">{region.load}%</span>
                  </div>
                  <Progress value={region.load} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Bandwidth</span>
                    <span className="text-orange-400">{region.bandwidth.toFixed(1)} GB/s</span>
                  </div>
                  <Progress value={(region.bandwidth / 5) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Uptime</span>
                    <span className={getUptimeColor(region.uptime)}>{region.uptime.toFixed(2)}%</span>
                  </div>
                  <Progress value={region.uptime} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Global Coverage Map */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Continental Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { continent: 'Asia', nodes: 12, users: 8437, color: 'text-blue-400' },
              { continent: 'Europe', nodes: 15, users: 12456, color: 'text-green-400' },
              { continent: 'North America', nodes: 32, users: 26857, color: 'text-purple-400' },
              { continent: 'South America', nodes: 8, users: 4567, color: 'text-orange-400' },
              { continent: 'Middle East', nodes: 6, users: 2845, color: 'text-yellow-400' },
              { continent: 'Africa', nodes: 4, users: 1234, color: 'text-red-400' },
              { continent: 'Oceania', nodes: 7, users: 3456, color: 'text-cyan-400' }
            ].map((continent, index) => (
              <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Globe className={`h-5 w-5 ${continent.color}`} />
                  <h4 className="font-semibold text-white">{continent.continent}</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Nodes:</span>
                    <span className={continent.color}>{continent.nodes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Users:</span>
                    <span className={continent.color}>{continent.users.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Footer */}
      <Card className="bg-black/40 border-teal-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-teal-300 font-bold text-lg">
                🌍 GLOBAL DISTRIBUTION: 8 CONTINENTS • 84 NODES • 59K+ USERS
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-teal-400 mt-2">
            Asia • Europe • North America • South America • Middle East • Africa • Oceania
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
