import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  Shield, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  RefreshCw,
  Heart,
  Brain,
  Cpu,
  Database,
  Network,
  Power
} from 'lucide-react';

interface SystemHealth {
  cpu: number;
  memory: number;
  network: number;
  database: number;
  overall: number;
  status: 'healthy' | 'warning' | 'critical';
}

interface HealthCheck {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning';
  lastCheck: Date;
  autoRepair: boolean;
  description: string;
}

interface RepairAction {
  id: string;
  type: 'auto' | 'manual';
  description: string;
  timestamp: Date;
  success: boolean;
}

const SelfMonitoringSystem: React.FC = () => {
  const { toast } = useToast();
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 85,
    memory: 78,
    network: 92,
    database: 88,
    overall: 86,
    status: 'healthy'
  });

  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([
    {
      id: '1',
      name: 'Memory Optimization',
      status: 'pass',
      lastCheck: new Date(),
      autoRepair: true,
      description: 'Memory usage within optimal range'
    },
    {
      id: '2',
      name: 'Network Connectivity',
      status: 'pass',
      lastCheck: new Date(),
      autoRepair: true,
      description: 'All network endpoints responding'
    },
    {
      id: '3',
      name: 'Error Rate Monitor',
      status: 'warning',
      lastCheck: new Date(),
      autoRepair: true,
      description: 'Error rate slightly elevated'
    },
    {
      id: '4',
      name: 'Performance Metrics',
      status: 'pass',
      lastCheck: new Date(),
      autoRepair: true,
      description: 'All performance metrics optimal'
    }
  ]);

  const [repairHistory, setRepairHistory] = useState<RepairAction[]>([]);

  // Auto-monitoring simulation
  const performHealthCheck = useCallback(() => {
    // Simulate health metrics
    const newHealth: SystemHealth = {
      cpu: Math.random() * 30 + 70, // 70-100%
      memory: Math.random() * 40 + 60, // 60-100%
      network: Math.random() * 20 + 80, // 80-100%
      database: Math.random() * 25 + 75, // 75-100%
      overall: 0,
      status: 'healthy'
    };

    newHealth.overall = (newHealth.cpu + newHealth.memory + newHealth.network + newHealth.database) / 4;
    
    if (newHealth.overall < 70) newHealth.status = 'critical';
    else if (newHealth.overall < 85) newHealth.status = 'warning';
    else newHealth.status = 'healthy';

    setSystemHealth(newHealth);

    // Update health checks
    setHealthChecks(prev => prev.map(check => {
      const randomStatus = Math.random();
      let newStatus: 'pass' | 'fail' | 'warning' = 'pass';
      
      if (randomStatus < 0.1) newStatus = 'fail';
      else if (randomStatus < 0.3) newStatus = 'warning';

      return {
        ...check,
        status: newStatus,
        lastCheck: new Date()
      };
    }));

    // Auto-repair if enabled
    if (isAutoMode && newHealth.status !== 'healthy') {
      performAutoRepair();
    }
  }, [isAutoMode]);

  const performAutoRepair = useCallback(() => {
    const failedChecks = healthChecks.filter(check => check.status === 'fail' && check.autoRepair);
    
    failedChecks.forEach(check => {
      const repairAction: RepairAction = {
        id: Date.now().toString() + Math.random(),
        type: 'auto',
        description: `Auto-repaired: ${check.name}`,
        timestamp: new Date(),
        success: Math.random() > 0.1 // 90% success rate
      };

      setRepairHistory(prev => [repairAction, ...prev.slice(0, 9)]);

      if (repairAction.success) {
        setHealthChecks(prev => prev.map(c => 
          c.id === check.id ? { ...c, status: 'pass' } : c
        ));

        toast({
          title: "🔧 Auto-Repair Successful",
          description: repairAction.description,
        });
      } else {
        toast({
          title: "⚠️ Auto-Repair Failed",
          description: `Failed to repair: ${check.name}`,
          variant: "destructive",
        });
      }
    });
  }, [healthChecks, toast]);

  const manualRepair = useCallback((checkId: string) => {
    const check = healthChecks.find(c => c.id === checkId);
    if (!check) return;

    const repairAction: RepairAction = {
      id: Date.now().toString(),
      type: 'manual',
      description: `Manual repair: ${check.name}`,
      timestamp: new Date(),
      success: true
    };

    setRepairHistory(prev => [repairAction, ...prev.slice(0, 9)]);
    setHealthChecks(prev => prev.map(c => 
      c.id === checkId ? { ...c, status: 'pass' } : c
    ));

    toast({
      title: "🔧 Manual Repair Complete",
      description: repairAction.description,
    });
  }, [healthChecks, toast]);

  const toggleMonitoring = useCallback(() => {
    setIsMonitoring(!isMonitoring);
    
    if (!isMonitoring) {
      toast({
        title: "🚀 Self-Monitoring Activated",
        description: "Real-time health monitoring is now active",
      });
    } else {
      toast({
        title: "⏸️ Self-Monitoring Paused",
        description: "Health monitoring has been paused",
      });
    }
  }, [isMonitoring, toast]);

  // Auto-monitoring interval
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(performHealthCheck, 5000); // Every 5 seconds
    return () => clearInterval(interval);
  }, [isMonitoring, performHealthCheck]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'pass':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
      case 'fail':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'pass':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'critical':
      case 'fail':
        return Shield;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-400" />
            MIORA Self-Monitoring & Health System
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring dengan auto-repair dan self-healing komprehensif
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Auto Mode</span>
            <Switch
              checked={isAutoMode}
              onCheckedChange={setIsAutoMode}
            />
          </div>
          
          <Button
            onClick={toggleMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
            className="flex items-center"
          >
            <Power className="h-4 w-4 mr-2" />
            {isMonitoring ? 'Stop' : 'Start'} Monitoring
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold text-foreground">
                  {systemHealth.cpu.toFixed(1)}%
                </p>
              </div>
              <Cpu className={`h-8 w-8 ${getStatusColor(systemHealth.status)}`} />
            </div>
            <Progress value={systemHealth.cpu} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory</p>
                <p className="text-2xl font-bold text-foreground">
                  {systemHealth.memory.toFixed(1)}%
                </p>
              </div>
              <Brain className={`h-8 w-8 ${getStatusColor(systemHealth.status)}`} />
            </div>
            <Progress value={systemHealth.memory} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network</p>
                <p className="text-2xl font-bold text-foreground">
                  {systemHealth.network.toFixed(1)}%
                </p>
              </div>
              <Network className={`h-8 w-8 ${getStatusColor(systemHealth.status)}`} />
            </div>
            <Progress value={systemHealth.network} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Database</p>
                <p className="text-2xl font-bold text-foreground">
                  {systemHealth.database.toFixed(1)}%
                </p>
              </div>
              <Database className={`h-8 w-8 ${getStatusColor(systemHealth.status)}`} />
            </div>
            <Progress value={systemHealth.database} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Overall Health Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Overall System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`text-3xl font-bold ${getStatusColor(systemHealth.status)}`}>
                {systemHealth.overall.toFixed(1)}%
              </div>
              <Badge variant={systemHealth.status === 'healthy' ? 'default' : 'destructive'}>
                {systemHealth.status.toUpperCase()}
              </Badge>
            </div>
            {isMonitoring && (
              <div className="flex items-center text-green-400">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Live Monitoring
              </div>
            )}
          </div>
          <Progress value={systemHealth.overall} className="h-4" />
        </CardContent>
      </Card>

      {/* Health Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Health Checks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthChecks.map((check) => {
              const StatusIcon = getStatusIcon(check.status);
              return (
                <div key={check.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(check.status)}`} />
                    <div>
                      <p className="font-medium text-foreground">{check.name}</p>
                      <p className="text-xs text-muted-foreground">{check.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Last check: {check.lastCheck.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={check.status === 'pass' ? 'default' : 'destructive'}>
                      {check.status}
                    </Badge>
                    {check.status === 'fail' && !isAutoMode && (
                      <Button
                        size="sm"
                        onClick={() => manualRepair(check.id)}
                        className="text-xs"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Repair
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Repair History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Repair History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {repairHistory.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No repair actions yet
                </p>
              ) : (
                repairHistory.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{action.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={action.type === 'auto' ? 'default' : 'secondary'}>
                        {action.type}
                      </Badge>
                      <Badge variant={action.success ? 'default' : 'destructive'}>
                        {action.success ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SelfMonitoringSystem;