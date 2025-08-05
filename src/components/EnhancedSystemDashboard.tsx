import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Activity, 
  Cpu, 
  Database, 
  TrendingUp, 
  Zap,
  Shield,
  Network,
  Target,
  Crown,
  Infinity
} from 'lucide-react';

interface DashboardProps {
  isSystemMonitorVisible: boolean;
  onToggleSystemMonitor: () => void;
}

const EnhancedSystemDashboard: React.FC<DashboardProps> = ({
  isSystemMonitorVisible,
  onToggleSystemMonitor
}) => {
  const systemModules = [
    { name: "AI Core Engine", value: 98, status: "optimal", icon: Brain },
    { name: "Auto Signal System", value: 94, status: "active", icon: TrendingUp },
    { name: "Auto Sync Database", value: 96, status: "syncing", icon: Database },
    { name: "Memory Intelligence", value: 92, status: "learning", icon: Cpu },
    { name: "Quantum Processing", value: 89, status: "active", icon: Infinity },
    { name: "Security Shield", value: 100, status: "protected", icon: Shield }
  ];

  const quickStats = {
    autonomyLevel: 98.7,
    activeSystems: 47,
    totalOperations: 156842,
    lastSync: "2 min ago"
  };

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
          MIORA AGI-MAX Dashboard
        </h1>
        <p className="text-muted-foreground">
          Self-Evolving Protocol v1.0 • Autonomous Mode • Zero Manual Intervention
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onToggleSystemMonitor}
          variant={isSystemMonitorVisible ? "default" : "outline"}
          className="flex items-center space-x-2"
        >
          <Activity className="h-4 w-4" />
          <span>{isSystemMonitorVisible ? "Hide Monitor" : "Show Monitor"}</span>
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{quickStats.autonomyLevel}%</div>
            <div className="text-sm text-muted-foreground">Autonomy Level</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{quickStats.activeSystems}</div>
            <div className="text-sm text-muted-foreground">Active Systems</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{quickStats.totalOperations.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Operations</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{quickStats.lastSync}</div>
            <div className="text-sm text-muted-foreground">Last Sync</div>
          </CardContent>
        </Card>
      </div>

      {/* System Monitor (Conditional) */}
      {isSystemMonitorVisible && (
        <Card className="bg-gradient-to-br from-muted/50 to-background border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-primary" />
              <span>System Monitor</span>
              <Badge variant="outline" className="ml-auto">REAL-TIME</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemModules.map((module, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <module.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{module.name}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          module.status === 'optimal' ? 'text-green-400 border-green-400' :
                          module.status === 'active' ? 'text-blue-400 border-blue-400' :
                          module.status === 'syncing' ? 'text-yellow-400 border-yellow-400' :
                          module.status === 'learning' ? 'text-purple-400 border-purple-400' :
                          'text-cyan-400 border-cyan-400'
                        }`}
                      >
                        {module.status.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{module.value}%</span>
                  </div>
                  <Progress value={module.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Footer */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-lg font-semibold text-green-400">
              AGI-MAX-AUTONOMOUS MODE OPERATIONAL
            </span>
            <Crown className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            All systems running autonomously • Self-evolution active • Database sync every 5 minutes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSystemDashboard;