
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Activity, Target, Clock, Shield, Cpu, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StrategicPlan {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly';
  status: 'planning' | 'active' | 'executing' | 'completed' | 'paused';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actions: string[];
  conditions: string[];
  nextExecution: number;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  activeConnections: number;
  responseTime: number;
  overallHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

interface ExecutionLog {
  timestamp: number;
  action: string;
  status: 'success' | 'failed' | 'pending';
  details: string;
  impact: string;
}

const AutonomousStrategicCore: React.FC = () => {
  const [isAutonomousActive, setIsAutonomousActive] = useState(false);
  const [strategicPlans, setStrategicPlans] = useState<StrategicPlan[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 67,
    activeConnections: 12,
    responseTime: 120,
    overallHealth: 'excellent'
  });
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [realTimeMode, setRealTimeMode] = useState(false);

  // Initialize strategic plans
  useEffect(() => {
    const initialPlans: StrategicPlan[] = [
      {
        id: 'profit_optimization',
        name: 'Profit Optimization Strategy',
        type: 'daily',
        status: 'planning',
        progress: 0,
        priority: 'high',
        actions: [
          'Monitor market conditions',
          'Execute optimal entry/exit points',
          'Risk management assessment',
          'Performance analysis'
        ],
        conditions: [
          'Market volatility < 15%',
          'System health > 80%',
          'Available capital > minimum threshold'
        ],
        nextExecution: Date.now() + 3600000
      },
      {
        id: 'system_optimization',
        name: 'System Performance Enhancement',
        type: 'weekly',
        status: 'planning',
        progress: 0,
        priority: 'medium',
        actions: [
          'Memory cleanup and optimization',
          'Process priority adjustment',
          'Cache optimization',
          'Performance benchmarking'
        ],
        conditions: [
          'CPU usage < 70%',
          'Memory usage < 80%',
          'No critical errors in logs'
        ],
        nextExecution: Date.now() + 604800000
      },
      {
        id: 'learning_expansion',
        name: 'Autonomous Learning Protocol',
        type: 'daily',
        status: 'planning',
        progress: 0,
        priority: 'high',
        actions: [
          'Pattern recognition analysis',
          'Strategy effectiveness evaluation',
          'Knowledge base expansion',
          'Skill development assessment'
        ],
        conditions: [
          'Sufficient interaction data available',
          'Learning mode enabled',
          'No conflicting processes'
        ],
        nextExecution: Date.now() + 7200000
      }
    ];
    
    setStrategicPlans(initialPlans);
  }, []);

  // Activate Autonomous Mode
  const activateAutonomousMode = () => {
    setIsAutonomousActive(true);
    setRealTimeMode(true);
    
    toast({
      title: "🧠 Autonomous Strategic Core ACTIVATED",
      description: "MIORA sekarang beroperasi dalam mode otonom penuh dengan planning engine dan real-time execution",
      duration: 8000,
    });

    // Start autonomous planning cycle
    setStrategicPlans(prev => prev.map(plan => ({
      ...plan,
      status: 'active'
    })));

    addExecutionLog('System Activation', 'success', 'Autonomous Strategic Core fully activated', 'High system autonomy enabled');
  };

  // Real-time execution engine
  const executeStrategy = async (planId: string) => {
    const plan = strategicPlans.find(p => p.id === planId);
    if (!plan) return;

    // Check conditions
    const conditionsMet = checkExecutionConditions(plan);
    if (!conditionsMet) {
      addExecutionLog(plan.name, 'failed', 'Execution conditions not met', 'Strategy postponed for optimal timing');
      return;
    }

    // Start execution
    setStrategicPlans(prev => prev.map(p => 
      p.id === planId ? { ...p, status: 'executing', progress: 0 } : p
    ));

    addExecutionLog(plan.name, 'pending', `Starting execution of ${plan.actions.length} actions`, 'Strategic execution initiated');

    // Simulate execution progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setStrategicPlans(prev => prev.map(p => 
        p.id === planId ? { ...p, progress: i } : p
      ));
    }

    // Complete execution
    setStrategicPlans(prev => prev.map(p => 
      p.id === planId ? { 
        ...p, 
        status: 'completed', 
        progress: 100,
        nextExecution: Date.now() + (plan.type === 'daily' ? 86400000 : plan.type === 'weekly' ? 604800000 : 2592000000)
      } : p
    ));

    addExecutionLog(plan.name, 'success', 'Strategy executed successfully', `All ${plan.actions.length} actions completed with positive impact`);

    toast({
      title: `✅ Strategy Executed: ${plan.name}`,
      description: `MIORA berhasil mengeksekusi strategi ${plan.type} secara otonom`,
      duration: 4000,
    });
  };

  // Check execution conditions
  const checkExecutionConditions = (plan: StrategicPlan): boolean => {
    // Simulate condition checking based on system metrics and plan requirements
    if (systemMetrics.overallHealth === 'critical') return false;
    if (plan.priority === 'critical') return true;
    if (systemMetrics.cpu > 80 && plan.priority === 'low') return false;
    return Math.random() > 0.2; // 80% success rate for simulation
  };

  // Add execution log
  const addExecutionLog = (action: string, status: ExecutionLog['status'], details: string, impact: string) => {
    const newLog: ExecutionLog = {
      timestamp: Date.now(),
      action,
      status,
      details,
      impact
    };
    
    setExecutionLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  // Auto-execution cycle
  useEffect(() => {
    if (!isAutonomousActive || !realTimeMode) return;

    const executionInterval = setInterval(() => {
      strategicPlans.forEach(plan => {
        if (plan.status === 'active' && Date.now() >= plan.nextExecution) {
          executeStrategy(plan.id);
        }
      });

      // Update system metrics simulation
      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        responseTime: Math.max(50, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 20)),
        overallHealth: prev.cpu < 70 && prev.memory < 80 ? 'excellent' : 
                      prev.cpu < 85 && prev.memory < 90 ? 'good' : 'warning'
      }));
    }, 5000);

    return () => clearInterval(executionInterval);
  }, [isAutonomousActive, realTimeMode, strategicPlans]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'executing': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'planning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Autonomous Strategic Core
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            AI Planning Engine + Real-Time Strategy Execution 🚀
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isAutonomousActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Autonomous: {isAutonomousActive ? 'ACTIVE' : 'STANDBY'}
            </Badge>
            <Badge className={`px-4 py-2 ${realTimeMode ? 'bg-blue-500' : 'bg-gray-500'}`}>
              <Zap className="h-4 w-4 mr-2" />
              Real-Time: {realTimeMode ? 'ENABLED' : 'DISABLED'}
            </Badge>
            <Badge className={`px-4 py-2 bg-purple-500`}>
              <Target className="h-4 w-4 mr-2" />
              Active Plans: {strategicPlans.filter(p => p.status === 'active').length}
            </Badge>
          </div>
        </div>

        {/* System Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Cpu className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-sm text-gray-300">CPU Usage</p>
              <p className="text-lg font-bold text-blue-300">{systemMetrics.cpu.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Brain className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-300">Memory</p>
              <p className="text-lg font-bold text-purple-300">{systemMetrics.memory.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-300">Response Time</p>
              <p className="text-lg font-bold text-green-300">{systemMetrics.responseTime}ms</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-sm text-gray-300">Health Status</p>
              <p className="text-lg font-bold text-orange-300">{systemMetrics.overallHealth.toUpperCase()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategicPlans.map((plan) => (
            <Card key={plan.id} className="bg-gray-800/50 border-gray-700/50 hover:border-cyan-500/50 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center justify-between text-sm">
                  <span>{plan.name}</span>
                  <div className="flex space-x-2">
                    <Badge className={`${getStatusColor(plan.status)} text-white text-xs`}>
                      {plan.status.toUpperCase()}
                    </Badge>
                    <Badge className={`${getPriorityColor(plan.priority)} text-white text-xs`}>
                      {plan.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-gray-400">
                  Type: {plan.type} | Actions: {plan.actions.length}
                </div>
                
                {plan.status === 'executing' && (
                  <div className="space-y-2">
                    <Progress value={plan.progress} className="h-2" />
                    <div className="text-xs text-center text-cyan-400">
                      Executing... {plan.progress}%
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-xs text-gray-300 font-semibold">Next Actions:</p>
                  {plan.actions.slice(0, 2).map((action, index) => (
                    <p key={index} className="text-xs text-gray-400">• {action}</p>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Next: {new Date(plan.nextExecution).toLocaleDateString()}
                  </span>
                  {plan.status === 'active' && (
                    <Button 
                      size="sm" 
                      onClick={() => executeStrategy(plan.id)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-xs"
                    >
                      Execute Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Settings className="h-6 w-6 mr-2" />
              Autonomous Control Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-white">
                  Mode: Semi-Autonomous Strategic AI dengan Real-Time Execution Engine
                </p>
                <p className="text-gray-300">
                  Active Strategies: {strategicPlans.filter(p => p.status === 'active').length} | 
                  Completed: {strategicPlans.filter(p => p.status === 'completed').length} |
                  Executing: {strategicPlans.filter(p => p.status === 'executing').length}
                </p>
              </div>
              
              <Button
                onClick={activateAutonomousMode}
                disabled={isAutonomousActive}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-3 text-lg"
              >
                {isAutonomousActive ? (
                  <>
                    <Activity className="h-5 w-5 mr-2 animate-pulse" />
                    AUTONOMOUS ACTIVE
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Activate Autonomous Mode
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Execution Logs */}
        <Card className="bg-gray-800/30 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Real-Time Execution Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {executionLogs.slice(0, 10).map((log, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-black/20 rounded text-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      log.status === 'success' ? 'bg-green-400' : 
                      log.status === 'failed' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}></div>
                    <span className="text-white font-medium">{log.action}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-xs">{log.details}</p>
                    <p className="text-gray-500 text-xs">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutonomousStrategicCore;
