import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Server, Cpu, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AutoScalingArchitecture: React.FC = () => {
  const { toast } = useToast();
  const [scalingMode, setScalingMode] = useState('auto');
  const [instances, setInstances] = useState(3);

  const scalingMetrics = {
    totalInstances: instances,
    activeLoad: 67.3,
    targetUtilization: 70,
    responseTime: 245,
    throughput: 1250,
    costOptimization: 34.2
  };

  const infrastructureComponents = [
    { name: 'Web Servers', instances: 3, status: 'Healthy', load: 65, type: 'frontend' },
    { name: 'API Gateway', instances: 2, status: 'Healthy', load: 72, type: 'middleware' },
    { name: 'Database Replicas', instances: 2, status: 'Healthy', load: 45, type: 'database' },
    { name: 'Cache Layers', instances: 4, status: 'Healthy', load: 38, type: 'cache' },
    { name: 'Message Queues', instances: 2, status: 'Healthy', load: 55, type: 'queue' },
    { name: 'File Storage', instances: 1, status: 'Healthy', load: 25, type: 'storage' }
  ];

  const scalingEvents = [
    { time: '14:32', action: 'Scale Up', component: 'Web Servers', from: 2, to: 3, reason: 'High CPU usage (82%)' },
    { time: '14:15', action: 'Scale Down', component: 'Cache Layers', from: 5, to: 4, reason: 'Low utilization (25%)' },
    { time: '14:08', action: 'Scale Up', component: 'API Gateway', from: 1, to: 2, reason: 'High request rate' },
    { time: '13:45', action: 'Optimize', component: 'Database', from: 0, to: 0, reason: 'Query optimization applied' }
  ];

  const toggleScalingMode = () => {
    const newMode = scalingMode === 'auto' ? 'manual' : 'auto';
    setScalingMode(newMode);
    toast({
      title: `Scaling Mode: ${newMode.toUpperCase()}`,
      description: `Auto-scaling is now ${newMode === 'auto' ? 'enabled' : 'disabled'}`
    });
  };

  const forceScale = (direction: 'up' | 'down') => {
    const newInstances = direction === 'up' ? instances + 1 : Math.max(1, instances - 1);
    setInstances(newInstances);
    toast({
      title: `Manual Scale ${direction.toUpperCase()}`,
      description: `Instances: ${instances} → ${newInstances}`
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-orange-300">
            <Layers className="w-6 h-6" />
            Auto-scaling Architecture Manager
            <Badge className="bg-orange-600/20 text-orange-300">Dynamic</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">{scalingMetrics.totalInstances}</div>
              <div className="text-xs text-gray-400">Active Instances</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-300">{scalingMetrics.activeLoad}%</div>
              <div className="text-xs text-gray-400">Current Load</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">{scalingMetrics.targetUtilization}%</div>
              <div className="text-xs text-gray-400">Target Util.</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{scalingMetrics.responseTime}ms</div>
              <div className="text-xs text-gray-400">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{scalingMetrics.throughput}</div>
              <div className="text-xs text-gray-400">Req/sec</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{scalingMetrics.costOptimization}%</div>
              <div className="text-xs text-gray-400">Cost Saved</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={toggleScalingMode}
                className={`${scalingMode === 'auto' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
              >
                {scalingMode === 'auto' ? 'Auto-scaling ON' : 'Auto-scaling OFF'}
              </Button>
              <Badge className={`${scalingMode === 'auto' ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
                {scalingMode.toUpperCase()} MODE
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => forceScale('down')}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={scalingMode === 'auto'}
              >
                <ArrowDown className="w-4 h-4" />
                Scale Down
              </Button>
              <Button 
                onClick={() => forceScale('up')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={scalingMode === 'auto'}
              >
                <ArrowUp className="w-4 h-4" />
                Scale Up
              </Button>
            </div>
          </div>

          <Card className="bg-black/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-300 text-lg">Infrastructure Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {infrastructureComponents.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="text-white font-medium">{component.name}</div>
                      <div className="text-sm text-gray-400">{component.instances} instances</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-300">Load: {component.load}%</div>
                    <div className={`w-16 h-2 bg-gray-700 rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full transition-all ${
                          component.load > 80 ? 'bg-red-500' :
                          component.load > 60 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${component.load}%` }}
                      />
                    </div>
                    <Badge className="bg-green-600/20 text-green-300">
                      {component.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-300 text-lg">Recent Scaling Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scalingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <div className="flex items-center gap-3">
                    <Badge className={`${
                      event.action === 'Scale Up' ? 'bg-green-600/20 text-green-300' :
                      event.action === 'Scale Down' ? 'bg-red-600/20 text-red-300' :
                      'bg-blue-600/20 text-blue-300'
                    }`}>
                      {event.action}
                    </Badge>
                    <span className="text-sm text-white">{event.component}</span>
                    {event.from !== event.to && (
                      <span className="text-sm text-gray-400">({event.from} → {event.to})</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{event.time}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoScalingArchitecture;