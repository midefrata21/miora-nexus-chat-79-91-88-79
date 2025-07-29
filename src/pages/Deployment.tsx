
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Rocket, 
  Cloud, 
  Server, 
  Globe, 
  Shield,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  ExternalLink
} from 'lucide-react';

interface Deployment {
  id: string;
  name: string;
  environment: 'development' | 'staging' | 'production';
  status: 'idle' | 'deploying' | 'success' | 'failed';
  url?: string;
  lastDeployed?: number;
  version: string;
  progress: number;
}

const Deployment: React.FC = () => {
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: '1',
      name: 'MIORA Development',
      environment: 'development',
      status: 'success',
      url: 'https://dev.miora.ai',
      lastDeployed: Date.now() - 3600000,
      version: 'v2.1.0-dev',
      progress: 100
    },
    {
      id: '2',
      name: 'MIORA Staging',
      environment: 'staging',
      status: 'success',
      url: 'https://staging.miora.ai',
      lastDeployed: Date.now() - 7200000,
      version: 'v2.0.5',
      progress: 100
    },
    {
      id: '3',
      name: 'MIORA Production',
      environment: 'production',
      status: 'idle',
      url: 'https://miora.ai',
      lastDeployed: Date.now() - 86400000,
      version: 'v2.0.4',
      progress: 0
    }
  ]);

  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  const deployToEnvironment = async (deploymentId: string) => {
    setIsDeploying(true);
    
    // Update deployment status
    setDeployments(prev => prev.map(d => 
      d.id === deploymentId 
        ? { ...d, status: 'deploying', progress: 0 }
        : d
    ));

    toast({
      title: "Deployment Started",
      description: "Automated deployment process initiated",
    });

    // Simulate deployment progress
    const progressInterval = setInterval(() => {
      setDeployments(prev => prev.map(d => {
        if (d.id === deploymentId && d.status === 'deploying') {
          const newProgress = Math.min(100, d.progress + Math.random() * 15 + 5);
          
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsDeploying(false);
            
            toast({
              title: "Deployment Successful",
              description: "Application deployed successfully",
            });

            return {
              ...d,
              status: 'success',
              progress: 100,
              lastDeployed: Date.now(),
              version: 'v2.1.0'
            };
          }
          
          return { ...d, progress: newProgress };
        }
        return d;
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(progressInterval);
      setIsDeploying(false);
    }, 8000);
  };

  const getStatusColor = (status: Deployment['status']) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-400/20';
      case 'deploying': return 'text-blue-400 bg-blue-400/20 animate-pulse';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getEnvColor = (env: string) => {
    switch (env) {
      case 'production': return 'text-red-400 border-red-400';
      case 'staging': return 'text-yellow-400 border-yellow-400';
      default: return 'text-blue-400 border-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            MIORA Deployment Center
          </h1>
          <p className="text-gray-300 text-lg">
            Automated Deployment & Infrastructure Management
          </p>
        </div>

        {/* Deployment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold text-green-300 mb-2">
                {deployments.filter(d => d.status === 'success').length}
              </div>
              <div className="text-green-400">Successful</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto mb-4 text-blue-400" />
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {deployments.filter(d => d.status === 'deploying').length}
              </div>
              <div className="text-blue-400">Deploying</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4 text-yellow-400" />
              <div className="text-3xl font-bold text-yellow-300 mb-2">
                {deployments.filter(d => d.status === 'idle').length}
              </div>
              <div className="text-yellow-400">Pending</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border-red-500/30">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-400" />
              <div className="text-3xl font-bold text-red-300 mb-2">
                {deployments.filter(d => d.status === 'failed').length}
              </div>
              <div className="text-red-400">Failed</div>
            </CardContent>
          </Card>
        </div>

        {/* Deployment Environments */}
        <Card className="bg-gray-800/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center">
              <Rocket className="h-6 w-6 mr-2" />
              Deployment Environments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {deployments.map((deployment) => (
                <div key={deployment.id} className="p-6 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{deployment.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={`${getEnvColor(deployment.environment)}`}>
                            {deployment.environment.toUpperCase()}
                          </Badge>
                          <Badge className={`${getStatusColor(deployment.status)} border-0`}>
                            {deployment.status.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-400">{deployment.version}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {deployment.url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(deployment.url, '_blank')}
                          className="border-cyan-500 text-cyan-400"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit
                        </Button>
                      )}
                      <Button
                        onClick={() => deployToEnvironment(deployment.id)}
                        disabled={deployment.status === 'deploying' || isDeploying}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Rocket className="h-4 w-4 mr-2" />
                        Deploy
                      </Button>
                    </div>
                  </div>

                  {deployment.status === 'deploying' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Deployment Progress</span>
                        <span className="text-sm text-white">{deployment.progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={deployment.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Environment</div>
                      <div className="text-white capitalize">{deployment.environment}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Last Deployed</div>
                      <div className="text-white">
                        {deployment.lastDeployed 
                          ? new Date(deployment.lastDeployed).toLocaleString()
                          : 'Never'
                        }
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">URL</div>
                      <div className="text-cyan-400">{deployment.url || 'Not configured'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Cloud className="h-5 w-5 mr-2" />
                Cloud Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white">Load Balancer</div>
                      <div className="text-sm text-gray-400">AWS ALB</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white">CDN</div>
                      <div className="text-sm text-gray-400">CloudFlare</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white">SSL Certificate</div>
                      <div className="text-sm text-gray-400">Let's Encrypt</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Valid</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Deployment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Auto Deploy</span>
                  <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Health Checks</span>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rollback Strategy</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Blue-Green</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Build Pipeline</span>
                  <Badge className="bg-green-500/20 text-green-400">CI/CD</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Monitoring</span>
                  <Badge className="bg-green-500/20 text-green-400">24/7</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
