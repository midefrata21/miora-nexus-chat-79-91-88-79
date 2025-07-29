import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Server, Network, Shield, Play, Pause, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InfrastructureTask {
  id: string;
  type: 'database' | 'api' | 'security' | 'deployment' | 'monitoring' | 'scaling';
  name: string;
  description: string;
  status: 'planned' | 'building' | 'deployed' | 'failed' | 'optimizing';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  dependencies?: string[];
}

export const SelfInfrastructureBuilder: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [infrastructureTasks, setInfrastructureTasks] = useState<InfrastructureTask[]>([]);
  const [buildStats, setBuildStats] = useState({
    totalComponents: 0,
    activeServices: 0,
    uptime: 99.97,
    throughput: 0,
    deployments: 0
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate infrastructure building
        if (Math.random() > 0.6) {
          generateInfrastructureTask();
        }
        updateTaskProgress();
        updateStats();
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateInfrastructureTask = () => {
    const types: InfrastructureTask['type'][] = ['database', 'api', 'security', 'deployment', 'monitoring', 'scaling'];
    const priorities: InfrastructureTask['priority'][] = ['low', 'medium', 'high', 'critical'];
    
    const taskTemplates = {
      database: ['PostgreSQL cluster setup', 'Redis cache deployment', 'Database backup system', 'Data replication setup'],
      api: ['RESTful API gateway', 'GraphQL endpoint', 'Microservice deployment', 'API versioning system'],
      security: ['SSL certificate renewal', 'Firewall configuration', 'OAuth2 implementation', 'Vulnerability scanning'],
      deployment: ['CI/CD pipeline setup', 'Docker containerization', 'Kubernetes deployment', 'Blue-green deployment'],
      monitoring: ['Prometheus setup', 'Grafana dashboard', 'Log aggregation system', 'Performance monitoring'],
      scaling: ['Auto-scaling group', 'Load balancer config', 'CDN deployment', 'Database sharding']
    };

    const type = types[Math.floor(Math.random() * types.length)];
    const templates = taskTemplates[type];
    const name = templates[Math.floor(Math.random() * templates.length)];

    const newTask: InfrastructureTask = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      name,
      description: `Autonomous ${type} infrastructure deployment: ${name}`,
      status: 'planned',
      progress: 0,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      timestamp: Date.now()
    };

    setInfrastructureTasks(prev => [newTask, ...prev.slice(0, 9)]);
  };

  const updateTaskProgress = () => {
    setInfrastructureTasks(prev => prev.map(task => {
      if (task.status === 'planned') {
        return { ...task, status: 'building' as const, progress: 5 };
      }
      if (task.status === 'building' && task.progress < 100) {
        const increment = task.priority === 'critical' ? 25 : task.priority === 'high' ? 20 : 15;
        const newProgress = Math.min(100, task.progress + Math.random() * increment);
        
        if (newProgress >= 100) {
          const success = Math.random() > 0.1; // 90% success rate
          setBuildStats(prev => ({
            ...prev,
            totalComponents: prev.totalComponents + 1,
            activeServices: success ? prev.activeServices + 1 : prev.activeServices,
            deployments: prev.deployments + 1
          }));
          
          return { 
            ...task, 
            progress: 100, 
            status: success ? 'deployed' as const : 'failed' as const 
          };
        }
        
        return { ...task, progress: newProgress };
      }
      return task;
    }));
  };

  const updateStats = () => {
    setBuildStats(prev => ({
      ...prev,
      throughput: Math.floor(Math.random() * 1000) + 500,
      uptime: Math.max(99.0, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1))
    }));
  };

  const toggleInfrastructureBuilder = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Infrastructure Builder Stopped" : "🏗️ Infrastructure Builder Activated",
      description: isActive ? "Self-infrastructure building paused" : "MIORA mulai membangun infrastruktur secara mandiri",
      duration: 3000,
    });
  };

  const getTypeIcon = (type: InfrastructureTask['type']) => {
    switch (type) {
      case 'database': return <Database className="w-4 h-4" />;
      case 'api': return <Network className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'deployment': return <Server className="w-4 h-4" />;
      case 'monitoring': return '📊';
      case 'scaling': return '📈';
      default: return '🏗️';
    }
  };

  const getPriorityColor = (priority: InfrastructureTask['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-400';
      case 'high': return 'bg-orange-600/20 text-orange-300 border-orange-400';
      case 'medium': return 'bg-blue-600/20 text-blue-300 border-blue-400';
      case 'low': return 'bg-gray-600/20 text-gray-300 border-gray-400';
    }
  };

  const getStatusColor = (status: InfrastructureTask['status']) => {
    switch (status) {
      case 'planned': return 'bg-yellow-600/20 text-yellow-300 border-yellow-400';
      case 'building': return 'bg-blue-600/20 text-blue-300 border-blue-400';
      case 'deployed': return 'bg-green-600/20 text-green-300 border-green-400';
      case 'failed': return 'bg-red-600/20 text-red-300 border-red-400';
      case 'optimizing': return 'bg-purple-600/20 text-purple-300 border-purple-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-blue-300">
            <div className="flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Self-Infrastructure Builder
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${isActive ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
                {isActive ? 'BUILDING' : 'STANDBY'}
              </Badge>
              <Button
                onClick={toggleInfrastructureBuilder}
                variant="outline"
                size="sm"
                className={`${isActive ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}`}
              >
                {isActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isActive ? 'Stop' : 'Start'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{buildStats.totalComponents}</div>
              <div className="text-sm text-gray-400">Components Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{buildStats.activeServices}</div>
              <div className="text-sm text-gray-400">Active Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{buildStats.uptime.toFixed(2)}%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{buildStats.throughput}</div>
              <div className="text-sm text-gray-400">Req/sec</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">{buildStats.deployments}</div>
              <div className="text-sm text-gray-400">Deployments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Tasks */}
      <Card className="bg-gradient-to-r from-gray-900/50 to-blue-900/30 border-gray-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-300">
            <Database className="w-5 h-5 mr-2" />
            Infrastructure Build Queue ({infrastructureTasks.length} tasks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {infrastructureTasks.map((task) => (
              <div key={task.id} className="p-4 bg-black/20 rounded-lg border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(task.type)}
                    <span className="font-semibold text-white text-sm">{task.name}</span>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {task.status === 'deployed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {task.status === 'failed' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-2">{task.description}</p>
                
                {task.status === 'building' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Building Progress</span>
                      <span>{Math.round(task.progress)}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(task.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}

            {infrastructureTasks.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <Server className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No infrastructure tasks yet</p>
                <p className="text-sm">Activate the builder to start autonomous infrastructure development</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfInfrastructureBuilder;