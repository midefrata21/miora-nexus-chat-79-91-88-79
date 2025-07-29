import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  Server, 
  Monitor, 
  Cloud, 
  Gauge, 
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface DeploymentPipeline {
  id: string;
  name: string;
  stage: 'build' | 'test' | 'deploy' | 'monitor' | 'completed';
  status: 'running' | 'success' | 'failed' | 'waiting';
  environment: 'development' | 'staging' | 'production';
  progress: number;
  duration: number;
  autoTriggered: boolean;
}

interface Infrastructure {
  id: string;
  type: 'server' | 'database' | 'cdn' | 'loadbalancer' | 'cache';
  name: string;
  status: 'provisioning' | 'active' | 'scaling' | 'maintenance';
  health: number;
  usage: number;
  autoScaled: boolean;
  location: string;
}

interface PerformanceMetric {
  id: string;
  metric: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  timestamp: number;
}

export const MIORAAutonomousDeploymentCore: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [pipelines, setPipelines] = useState<DeploymentPipeline[]>([]);
  const [infrastructure, setInfrastructure] = useState<Infrastructure[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Standby');
  const [totalDeployments, setTotalDeployments] = useState(0);

  const createDeploymentPipeline = useCallback(() => {
    const environments = ['development', 'staging', 'production'] as const;
    const pipelineNames = [
      'Frontend App Deployment',
      'API Service Update',
      'Database Migration',
      'Microservice Rollout',
      'Infrastructure Update'
    ];

    const environment = environments[Math.floor(Math.random() * environments.length)];
    const name = pipelineNames[Math.floor(Math.random() * pipelineNames.length)];

    const newPipeline: DeploymentPipeline = {
      id: `pipeline_${Date.now()}`,
      name: `${name} - ${environment}`,
      stage: 'build',
      status: 'running',
      environment,
      progress: 0,
      duration: 0,
      autoTriggered: true
    };

    setPipelines(prev => [...prev, newPipeline]);
    setCurrentTask(`Deploying ${name} to ${environment}`);
    setTotalDeployments(prev => prev + 1);

    // Simulate pipeline stages
    const stages = ['build', 'test', 'deploy', 'monitor', 'completed'] as const;
    let currentStageIndex = 0;

    const stageInterval = setInterval(() => {
      currentStageIndex++;
      if (currentStageIndex < stages.length) {
        setPipelines(prev => prev.map(p => 
          p.id === newPipeline.id ? {
            ...p,
            stage: stages[currentStageIndex],
            progress: (currentStageIndex / stages.length) * 100,
            duration: p.duration + 30,
            status: currentStageIndex === stages.length - 1 ? 'success' : 'running'
          } : p
        ));
      } else {
        clearInterval(stageInterval);
        setPipelines(prev => prev.map(p => 
          p.id === newPipeline.id ? {
            ...p,
            status: Math.random() > 0.1 ? 'success' : 'failed'
          } : p
        ));
      }
    }, 3000);

    console.log(`🚀 AUTO-DEPLOY: ${name} pipeline started for ${environment}`);
  }, []);

  const provisionInfrastructure = useCallback(() => {
    const infraTypes = ['server', 'database', 'cdn', 'loadbalancer', 'cache'] as const;
    const locations = ['us-east-1', 'eu-west-1', 'ap-southeast-1', 'us-west-2'];
    
    const type = infraTypes[Math.floor(Math.random() * infraTypes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    const infraNames = {
      server: ['Web Server', 'API Server', 'Worker Node', 'Background Processor'],
      database: ['Main DB', 'Analytics DB', 'Cache DB', 'Session Store'],
      cdn: ['Static Assets CDN', 'API CDN', 'Media CDN', 'Global CDN'],
      loadbalancer: ['Main LB', 'API Gateway', 'Internal LB', 'Edge LB'],
      cache: ['Redis Cluster', 'Memcached', 'Application Cache', 'Session Cache']
    };

    const names = infraNames[type];
    const name = names[Math.floor(Math.random() * names.length)];

    const newInfra: Infrastructure = {
      id: `infra_${Date.now()}`,
      type,
      name: `${name} (${location})`,
      status: 'provisioning',
      health: 100,
      usage: Math.floor(Math.random() * 30) + 10,
      autoScaled: Math.random() > 0.5,
      location
    };

    setInfrastructure(prev => [...prev, newInfra]);
    setCurrentTask(`Provisioning ${name} in ${location}`);

    setTimeout(() => {
      setInfrastructure(prev => prev.map(infra => 
        infra.id === newInfra.id ? { ...infra, status: 'active' } : infra
      ));
    }, 5000);

    console.log(`☁️ INFRA-PROVISION: ${name} in ${location}`);
  }, []);

  const updatePerformanceMetrics = useCallback(() => {
    const metricTypes = [
      { metric: 'Response Time', unit: 'ms', baseValue: 250 },
      { metric: 'CPU Usage', unit: '%', baseValue: 45 },
      { metric: 'Memory Usage', unit: '%', baseValue: 60 },
      { metric: 'Disk I/O', unit: 'MB/s', baseValue: 50 },
      { metric: 'Network Latency', unit: 'ms', baseValue: 15 },
      { metric: 'Error Rate', unit: '%', baseValue: 0.5 },
      { metric: 'Throughput', unit: 'req/s', baseValue: 1000 }
    ];

    const metricType = metricTypes[Math.floor(Math.random() * metricTypes.length)];
    const variation = (Math.random() - 0.5) * 0.3;
    const value = Math.round(metricType.baseValue * (1 + variation));

    const getStatus = (metric: string, value: number) => {
      if (metric === 'Response Time' && value > 500) return 'critical';
      if (metric === 'CPU Usage' && value > 80) return 'warning';
      if (metric === 'Memory Usage' && value > 85) return 'warning';
      if (metric === 'Error Rate' && value > 1) return 'critical';
      return 'good';
    };

    const newMetric: PerformanceMetric = {
      id: `metric_${Date.now()}`,
      metric: metricType.metric,
      value,
      unit: metricType.unit,
      status: getStatus(metricType.metric, value),
      trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
      timestamp: Date.now()
    };

    setMetrics(prev => [...prev.slice(-20), newMetric]);
    setCurrentTask(`Monitoring ${metricType.metric}: ${value}${metricType.unit}`);

    console.log(`📊 METRICS: ${metricType.metric} = ${value}${metricType.unit}`);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        const action = Math.random();
        setDeploymentProgress(prev => Math.min(prev + Math.random() * 6, 100));

        if (action < 0.3) {
          createDeploymentPipeline();
        } else if (action < 0.6) {
          provisionInfrastructure();
        } else {
          updatePerformanceMetrics();
        }
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, createDeploymentPipeline, provisionInfrastructure, updatePerformanceMetrics]);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setCurrentTask('Initializing Autonomous Deployment');
      setDeploymentProgress(8);
    } else {
      setCurrentTask('Standby');
    }
  };

  const successfulDeployments = pipelines.filter(p => p.status === 'success').length;
  const activeInfrastructure = infrastructure.filter(i => i.status === 'active').length;
  const criticalMetrics = metrics.filter(m => m.status === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Rocket className="w-8 h-8 mr-3 text-green-400" />
            MIORA Autonomous Deployment
            <Badge className="ml-4 bg-green-500/20 text-green-300">
              {isActive ? 'DEPLOYING' : 'STANDBY'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-gray-300">
                Sistem deployment otomatis, provisioning infrastruktur, dan monitoring
              </p>
              <p className="text-sm text-gray-400">
                Status: {currentTask}
              </p>
            </div>
            <Button 
              onClick={handleToggle}
              variant={isActive ? "destructive" : "default"}
              size="lg"
              className="min-w-[120px]"
            >
              {isActive ? 'STOP' : 'START'}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{successfulDeployments}</div>
              <div className="text-sm text-gray-400">Successful Deploys</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{activeInfrastructure}</div>
              <div className="text-sm text-gray-400">Active Infrastructure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{criticalMetrics}</div>
              <div className="text-sm text-gray-400">Critical Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{totalDeployments}</div>
              <div className="text-sm text-gray-400">Total Deployments</div>
            </div>
          </div>

          <Progress value={deploymentProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Deployment Pipelines */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-6 h-6 mr-2 text-yellow-400" />
            Active Deployment Pipelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pipelines.slice(-8).reverse().map((pipeline) => (
              <div key={pipeline.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Rocket className="w-5 h-5 text-green-400" />
                    <div>
                      <h4 className="font-medium text-gray-200">{pipeline.name}</h4>
                      <p className="text-sm text-gray-400">Stage: {pipeline.stage} • Duration: {pipeline.duration}s</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      pipeline.status === 'success' ? 'default' :
                      pipeline.status === 'running' ? 'secondary' :
                      pipeline.status === 'failed' ? 'destructive' : 'outline'
                    }>
                      {pipeline.status}
                    </Badge>
                    <Badge variant="outline">{pipeline.environment}</Badge>
                  </div>
                </div>
                <Progress value={pipeline.progress} className="h-2" />
              </div>
            ))}
            {pipelines.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No deployment pipelines running. Start the system to begin deployments.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infrastructure */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="w-6 h-6 mr-2 text-blue-400" />
              Auto-Provisioned Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {infrastructure.slice(-12).reverse().map((infra) => (
                <div key={infra.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-gray-200 text-sm font-medium">{infra.name}</p>
                      <p className="text-xs text-gray-500">{infra.type} • Usage: {infra.usage}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      infra.status === 'active' ? 'default' :
                      infra.status === 'provisioning' ? 'secondary' :
                      infra.status === 'scaling' ? 'outline' : 'destructive'
                    }>
                      {infra.status}
                    </Badge>
                    {infra.autoScaled && (
                      <Badge variant="outline" className="text-xs">AUTO</Badge>
                    )}
                  </div>
                </div>
              ))}
              {infrastructure.length === 0 && (
                <p className="text-center text-gray-500 py-4 text-sm">
                  No infrastructure provisioned yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="w-6 h-6 mr-2 text-orange-400" />
              Live Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {metrics.slice(-12).reverse().map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-200 text-sm">{metric.metric}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-300">
                      {metric.value}{metric.unit}
                    </span>
                    <Badge variant={
                      metric.status === 'good' ? 'default' :
                      metric.status === 'warning' ? 'secondary' : 'destructive'
                    }>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {metrics.length === 0 && (
                <p className="text-center text-gray-500 py-4 text-sm">
                  No performance metrics collected yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};