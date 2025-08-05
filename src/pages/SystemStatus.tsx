import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Shield, 
  Cpu, 
  Database, 
  Network, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const SystemStatus: React.FC = () => {
  const navigate = useNavigate();

  const systemComponents = [
    { name: "MIORA Core Engine", status: "optimal", uptime: "99.9%", load: 45, icon: Cpu },
    { name: "Trading Systems", status: "active", uptime: "98.7%", load: 67, icon: TrendingUp },
    { name: "Hacker Operations", status: "secure", uptime: "100%", load: 23, icon: Shield },
    { name: "Quantum Infrastructure", status: "optimal", uptime: "99.8%", load: 56, icon: Network },
    { name: "Database Systems", status: "syncing", uptime: "99.5%", load: 34, icon: Database }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400 border-green-400';
      case 'active': return 'text-blue-400 border-blue-400';
      case 'secure': return 'text-purple-400 border-purple-400';
      case 'syncing': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'active': return <Activity className="h-4 w-4 text-blue-400" />;
      case 'secure': return <Shield className="h-4 w-4 text-purple-400" />;
      case 'syncing': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default: return <Info className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
            System Status Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of all MIORA components and subsystems
          </p>
        </div>

        {/* Overall Status */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-2xl font-bold text-green-400">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <p className="text-muted-foreground">
              AGI-MAX-AUTONOMOUS mode active • 47 systems running • Last check: 2 minutes ago
            </p>
          </CardContent>
        </Card>

        {/* System Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemComponents.map((component, index) => (
            <Card key={index} className="bg-gradient-to-br from-muted/50 to-background border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <component.icon className="h-5 w-5 text-primary" />
                    <span>{component.name}</span>
                  </div>
                  {getStatusIcon(component.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className={getStatusColor(component.status)}>
                    {component.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium text-green-400">{component.uptime}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Load</span>
                    <span className="text-sm font-medium">{component.load}%</span>
                  </div>
                  <Progress value={component.load} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-muted/50 to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/miora')}
                className="flex items-center space-x-2"
              >
                <Cpu className="h-4 w-4" />
                <span>MIORA Core</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/crypto-scalping-signals')}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Trading</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/quantum-infrastructure')}
                className="flex items-center space-x-2"
              >
                <Network className="h-4 w-4" />
                <span>Infrastructure</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/prophecy-system')}
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Prophecy</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemStatus;