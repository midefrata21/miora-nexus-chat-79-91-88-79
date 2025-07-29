
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Network, Server, Globe, Activity, Zap } from 'lucide-react';

interface LoadBalancerNode {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'maintenance' | 'overloaded';
  connections: number;
  maxConnections: number;
  responseTime: number;
  throughput: number;
  healthScore: number;
}

export const SmartLoadBalancer: React.FC = () => {
  const [loadBalancerNodes, setLoadBalancerNodes] = useState<LoadBalancerNode[]>([
    {
      id: 'lb-asia',
      name: 'Asia Pacific Load Balancer',
      region: 'AP-Southeast-1',
      status: 'active',
      connections: 1247,
      maxConnections: 5000,
      responseTime: 23,
      throughput: 2340,
      healthScore: 96
    },
    {
      id: 'lb-europe',
      name: 'Europe Load Balancer',
      region: 'EU-West-1',
      status: 'active',
      connections: 834,
      maxConnections: 4000,
      responseTime: 18,
      throughput: 1890,
      healthScore: 98
    },
    {
      id: 'lb-na',
      name: 'North America Load Balancer',
      region: 'US-East-1',
      status: 'active',
      connections: 2456,
      maxConnections: 6000,
      responseTime: 15,
      throughput: 3420,
      healthScore: 94
    },
    {
      id: 'lb-sa',
      name: 'South America Load Balancer',
      region: 'SA-East-1',
      status: 'active',
      connections: 456,
      maxConnections: 2000,
      responseTime: 45,
      throughput: 890,
      healthScore: 92
    }
  ]);

  const [routingRules] = useState([
    'Geographic proximity routing',
    'Latency-based routing',
    'Health-based routing',
    'Weighted round-robin',
    'Least connections algorithm',
    'Failover routing'
  ]);

  const [globalMetrics, setGlobalMetrics] = useState({
    totalConnections: 4993,
    avgResponseTime: 25.3,
    requestsPerSecond: 847,
    failoverCount: 0,
    trafficDistribution: 'Optimal'
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setLoadBalancerNodes(prev => prev.map(node => ({
        ...node,
        connections: Math.max(100, Math.min(node.maxConnections, 
          node.connections + (Math.random() - 0.5) * 200)),
        responseTime: Math.max(10, Math.min(100, 
          node.responseTime + (Math.random() - 0.5) * 10)),
        throughput: Math.max(500, Math.min(5000, 
          node.throughput + (Math.random() - 0.5) * 300)),
        healthScore: Math.max(85, Math.min(100, 
          node.healthScore + (Math.random() - 0.5) * 3))
      })));

      setGlobalMetrics(prev => ({
        totalConnections: loadBalancerNodes.reduce((sum, node) => sum + node.connections, 0),
        avgResponseTime: loadBalancerNodes.reduce((sum, node) => sum + node.responseTime, 0) / loadBalancerNodes.length,
        requestsPerSecond: Math.max(600, Math.min(1200, prev.requestsPerSecond + (Math.random() - 0.5) * 100)),
        failoverCount: Math.max(0, prev.failoverCount + (Math.random() > 0.95 ? 1 : 0)),
        trafficDistribution: Math.random() > 0.1 ? 'Optimal' : 'Rebalancing'
      }));
    }, 4000);

    return () => clearInterval(updateInterval);
  }, [loadBalancerNodes]);

  const getStatusColor = (status: LoadBalancerNode['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overloaded': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 90) return 'text-blue-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center text-2xl">
            <Network className="h-8 w-8 mr-3" />
            Smart Load Balancer AI Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{globalMetrics.totalConnections.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Connections</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{globalMetrics.avgResponseTime.toFixed(1)}ms</div>
              <div className="text-sm text-gray-400">Avg Response Time</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Server className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{globalMetrics.requestsPerSecond}</div>
              <div className="text-sm text-gray-400">Requests/sec</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Globe className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{globalMetrics.trafficDistribution}</div>
              <div className="text-sm text-gray-400">Traffic Distribution</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Load Balancer Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loadBalancerNodes.map((node) => (
          <Card key={node.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Network className="h-6 w-6 text-blue-400" />
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
                  <div className="text-xl font-bold text-blue-300">{node.connections}</div>
                  <div className="text-sm text-gray-400">Connections</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className={`text-xl font-bold ${getHealthColor(node.healthScore)}`}>
                    {node.healthScore}%
                  </div>
                  <div className="text-sm text-gray-400">Health Score</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Connection Load</span>
                    <span className="text-blue-400">
                      {((node.connections / node.maxConnections) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(node.connections / node.maxConnections) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Response Time</span>
                    <span className="text-green-400">{node.responseTime}ms</span>
                  </div>
                  <Progress value={(node.responseTime / 100) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Throughput</span>
                    <span className="text-purple-400">{node.throughput} req/s</span>
                  </div>
                  <Progress value={(node.throughput / 5000) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Routing Intelligence */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Intelligent Routing Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routingRules.map((rule, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-300 text-sm">{rule}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Footer */}
      <Card className="bg-black/40 border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-bold text-lg">
                🌐 SMART LOAD BALANCER: INTELLIGENT TRAFFIC ROUTING ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-blue-400 mt-2">
            AI-Powered Routing • Geographic Optimization • Real-time Failover Protection
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
