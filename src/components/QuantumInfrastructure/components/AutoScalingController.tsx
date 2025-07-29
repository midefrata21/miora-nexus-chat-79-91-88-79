
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Server, Zap, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScalingNode {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'scaling-up' | 'scaling-down' | 'standby';
  instances: number;
  maxInstances: number;
  cpuUsage: number;
  memoryUsage: number;
  requestsPerMin: number;
  autoScalingEnabled: boolean;
}

export const AutoScalingController: React.FC = () => {
  const { toast } = useToast();
  const [scalingNodes, setScalingNodes] = useState<ScalingNode[]>([
    {
      id: 'asia-pacific',
      name: 'Asia Pacific Cluster',
      region: 'AP-Southeast-1',
      status: 'active',
      instances: 5,
      maxInstances: 20,
      cpuUsage: 45,
      memoryUsage: 62,
      requestsPerMin: 1247,
      autoScalingEnabled: true
    },
    {
      id: 'europe',
      name: 'Europe Cluster',
      region: 'EU-West-1',
      status: 'active',
      instances: 3,
      maxInstances: 15,
      cpuUsage: 32,
      memoryUsage: 48,
      requestsPerMin: 834,
      autoScalingEnabled: true
    },
    {
      id: 'north-america',
      name: 'North America Cluster',
      region: 'US-East-1',
      status: 'scaling-up',
      instances: 8,
      maxInstances: 25,
      cpuUsage: 78,
      memoryUsage: 85,
      requestsPerMin: 2456,
      autoScalingEnabled: true
    },
    {
      id: 'south-america',
      name: 'South America Cluster',
      region: 'SA-East-1',
      status: 'active',
      instances: 2,
      maxInstances: 10,
      cpuUsage: 28,
      memoryUsage: 35,
      requestsPerMin: 456,
      autoScalingEnabled: true
    }
  ]);

  const [scalingMetrics, setScalingMetrics] = useState({
    totalInstances: 18,
    activeScalingActions: 1,
    avgCpuUsage: 45.8,
    avgMemoryUsage: 57.5,
    totalRequestsPerMin: 4993,
    costOptimization: 87.2,
    responseImprovement: 23.5
  });

  // Real-time auto-scaling simulation
  useEffect(() => {
    const scalingInterval = setInterval(() => {
      setScalingNodes(prev => prev.map(node => {
        const newCpuUsage = Math.max(10, Math.min(95, node.cpuUsage + (Math.random() - 0.5) * 20));
        const newMemoryUsage = Math.max(15, Math.min(95, node.memoryUsage + (Math.random() - 0.5) * 15));
        const newRequestsPerMin = Math.max(100, Math.min(3000, node.requestsPerMin + (Math.random() - 0.5) * 300));
        
        let newStatus = node.status;
        let newInstances = node.instances;

        // Auto-scaling logic
        if (node.autoScalingEnabled) {
          if (newCpuUsage > 80 || newMemoryUsage > 80) {
            if (node.instances < node.maxInstances) {
              newStatus = 'scaling-up';
              if (Math.random() > 0.7) {
                newInstances = Math.min(node.maxInstances, node.instances + 1);
                newStatus = 'active';
              }
            }
          } else if (newCpuUsage < 30 && newMemoryUsage < 40) {
            if (node.instances > 1) {
              newStatus = 'scaling-down';
              if (Math.random() > 0.8) {
                newInstances = Math.max(1, node.instances - 1);
                newStatus = 'active';
              }
            }
          }
        }

        return {
          ...node,
          cpuUsage: newCpuUsage,
          memoryUsage: newMemoryUsage,
          requestsPerMin: newRequestsPerMin,
          status: newStatus,
          instances: newInstances
        };
      }));

      // Update metrics
      setScalingMetrics(prev => ({
        totalInstances: scalingNodes.reduce((sum, node) => sum + node.instances, 0),
        activeScalingActions: scalingNodes.filter(node => 
          node.status === 'scaling-up' || node.status === 'scaling-down'
        ).length,
        avgCpuUsage: scalingNodes.reduce((sum, node) => sum + node.cpuUsage, 0) / scalingNodes.length,
        avgMemoryUsage: scalingNodes.reduce((sum, node) => sum + node.memoryUsage, 0) / scalingNodes.length,
        totalRequestsPerMin: scalingNodes.reduce((sum, node) => sum + node.requestsPerMin, 0),
        costOptimization: Math.max(80, Math.min(95, prev.costOptimization + (Math.random() - 0.5) * 3)),
        responseImprovement: Math.max(15, Math.min(40, prev.responseImprovement + (Math.random() - 0.5) * 5))
      }));
    }, 5000);

    return () => clearInterval(scalingInterval);
  }, [scalingNodes]);

  const manualScaleUp = (nodeId: string) => {
    setScalingNodes(prev => prev.map(node => 
      node.id === nodeId && node.instances < node.maxInstances
        ? { ...node, instances: node.instances + 1, status: 'scaling-up' }
        : node
    ));

    toast({
      title: "📈 Manual Scale Up",
      description: "Additional instance is being deployed",
      duration: 3000,
    });
  };

  const manualScaleDown = (nodeId: string) => {
    setScalingNodes(prev => prev.map(node => 
      node.id === nodeId && node.instances > 1
        ? { ...node, instances: node.instances - 1, status: 'scaling-down' }
        : node
    ));

    toast({
      title: "📉 Manual Scale Down",
      description: "Instance is being terminated to optimize costs",
      duration: 3000,
    });
  };

  const toggleAutoScaling = (nodeId: string) => {
    setScalingNodes(prev => prev.map(node => 
      node.id === nodeId
        ? { ...node, autoScalingEnabled: !node.autoScalingEnabled }
        : node
    ));

    const node = scalingNodes.find(n => n.id === nodeId);
    toast({
      title: node?.autoScalingEnabled ? "⏸️ Auto-Scaling Disabled" : "▶️ Auto-Scaling Enabled",
      description: `Auto-scaling for ${node?.name} has been ${node?.autoScalingEnabled ? 'disabled' : 'enabled'}`,
      duration: 3000,
    });
  };

  const getStatusIcon = (status: ScalingNode['status']) => {
    switch (status) {
      case 'scaling-up': return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'scaling-down': return <TrendingDown className="h-5 w-5 text-orange-400" />;
      case 'active': return <Activity className="h-5 w-5 text-blue-400" />;
      default: return <Server className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ScalingNode['status']) => {
    switch (status) {
      case 'scaling-up': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'scaling-down': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center text-2xl">
            <TrendingUp className="h-8 w-8 mr-3" />
            Auto-Scaling Intelligence Controller
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Server className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{scalingMetrics.totalInstances}</div>
              <div className="text-sm text-gray-400">Total Instances</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{scalingMetrics.activeScalingActions}</div>
              <div className="text-sm text-gray-400">Active Scaling</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{scalingMetrics.avgCpuUsage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg CPU Usage</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-white">{scalingMetrics.totalRequestsPerMin.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Requests/Min</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scaling Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scalingNodes.map((node) => (
          <Card key={node.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(node.status)}
                  <div>
                    <CardTitle className="text-white text-lg">{node.name}</CardTitle>
                    <p className="text-sm text-gray-400">{node.region}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(node.status)}>
                  {node.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-300">{node.instances}</div>
                  <div className="text-sm text-gray-400">Current Instances</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-300">{node.maxInstances}</div>
                  <div className="text-sm text-gray-400">Max Instances</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">CPU Usage</span>
                    <span className="text-blue-400">{node.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={node.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Memory Usage</span>
                    <span className="text-purple-400">{node.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={node.memoryUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Requests/Min</span>
                    <span className="text-green-400">{node.requestsPerMin.toLocaleString()}</span>
                  </div>
                  <Progress value={(node.requestsPerMin / 3000) * 100} className="h-2" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => manualScaleUp(node.id)}
                  disabled={node.instances >= node.maxInstances}
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Scale Up
                </Button>
                <Button
                  onClick={() => manualScaleDown(node.id)}
                  disabled={node.instances <= 1}
                  size="sm"
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Scale Down
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded-lg">
                <span className="text-sm text-gray-300">Auto-Scaling</span>
                <Button
                  onClick={() => toggleAutoScaling(node.id)}
                  size="sm"
                  variant={node.autoScalingEnabled ? "default" : "outline"}
                  className={node.autoScalingEnabled ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {node.autoScalingEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Scaling Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Cost Optimization</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Efficiency Score</span>
                  <span className="text-green-400">{scalingMetrics.costOptimization.toFixed(1)}%</span>
                </div>
                <Progress value={scalingMetrics.costOptimization} className="h-3" />
                <p className="text-sm text-gray-400">
                  Auto-scaling has optimized infrastructure costs by balancing performance and resource usage
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Response Improvement</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Performance Gain</span>
                  <span className="text-blue-400">{scalingMetrics.responseImprovement.toFixed(1)}%</span>
                </div>
                <Progress value={scalingMetrics.responseImprovement} className="h-3" />
                <p className="text-sm text-gray-400">
                  Response times improved through intelligent scaling based on real-time demand
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Footer */}
      <Card className="bg-black/40 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-bold text-lg">
                📈 AUTO-SCALING CONTROLLER: INTELLIGENT OPTIMIZATION ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-green-400 mt-2">
            Dynamic Resource Scaling • Load-Based Optimization • Cost-Efficient Performance
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
