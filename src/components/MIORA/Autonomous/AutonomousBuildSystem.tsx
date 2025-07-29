import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Package, Rocket, Activity, Wrench, CheckCircle, Clock, Zap, Database, Code, Monitor, Shield, FileCode, GitBranch, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useInfrastructureBuilder } from '@/hooks/useInfrastructureBuilder';

interface BuildTask {
  id: string;
  name: string;
  progress: number;
  status: 'standby' | 'active' | 'complete' | 'error';
  icon: React.ElementType;
  category: string;
  startTime?: number;
  endTime?: number;
  details?: string[];
}

interface BuildLog {
  id: string;
  timestamp: number;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  category: string;
}

export const AutonomousBuildSystem: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [buildsCompleted, setBuildsCompleted] = useState(0);
  const [optimizationLevel, setOptimizationLevel] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [buildTasks, setBuildTasks] = useState<BuildTask[]>([
    { 
      id: 'dep-resolution', 
      name: 'Dependency Resolution', 
      progress: 0, 
      status: 'standby', 
      icon: Package, 
      category: 'setup',
      details: ['Analyzing package.json', 'Resolving version conflicts', 'Installing dependencies']
    },
    { 
      id: 'bundle-opt', 
      name: 'Bundle Optimization', 
      progress: 0, 
      status: 'standby', 
      icon: Zap, 
      category: 'optimization',
      details: ['Tree shaking unused code', 'Minifying assets', 'Code splitting']
    },
    { 
      id: 'asset-pipeline', 
      name: 'Asset Pipeline Config', 
      progress: 0, 
      status: 'standby', 
      icon: FileCode, 
      category: 'setup',
      details: ['Configuring loaders', 'Setting up compression', 'Optimizing images']
    },
    { 
      id: 'deploy-pipeline', 
      name: 'Deployment Pipeline', 
      progress: 0, 
      status: 'standby', 
      icon: GitBranch, 
      category: 'deployment',
      details: ['Setting up CI/CD', 'Configuring auto-deploy', 'Environment setup']
    },
    { 
      id: 'perf-monitoring', 
      name: 'Performance Monitoring', 
      progress: 0, 
      status: 'standby', 
      icon: Monitor, 
      category: 'monitoring',
      details: ['Setting up metrics', 'Error tracking', 'Performance analysis']
    },
    { 
      id: 'security-scan', 
      name: 'Security Scanning', 
      progress: 0, 
      status: 'standby', 
      icon: Shield, 
      category: 'security',
      details: ['Vulnerability scanning', 'Dependency audit', 'Security policies']
    },
    { 
      id: 'code-generation', 
      name: 'Code Generation', 
      progress: 0, 
      status: 'standby', 
      icon: Code, 
      category: 'automation',
      details: ['Generating types', 'Creating components', 'API integration']
    },
    { 
      id: 'infra-setup', 
      name: 'Infrastructure Setup', 
      progress: 0, 
      status: 'standby', 
      icon: Server, 
      category: 'infrastructure',
      details: ['Database setup', 'API configuration', 'Load balancing']
    }
  ]);

  const [buildLogs, setBuildLogs] = useState<BuildLog[]>([]);
  const [completedTasks, setCompletedTasks] = useState<BuildTask[]>([]);

  const addBuildLog = (type: 'info' | 'success' | 'warning' | 'error', message: string, category: string) => {
    const newLog: BuildLog = {
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      type,
      message,
      category
    };
    setBuildLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  const { infrastructureComponents, buildInfrastructureComponent } = useInfrastructureBuilder(
    isActive, 
    () => {
      addBuildLog('success', 'Infrastructure component built successfully', 'infrastructure');
    }
  );

  useEffect(() => {
    if (isActive) {
      addBuildLog('info', 'MIORA Auto-Build System diaktifkan', 'system');
      
      const interval = setInterval(() => {
        setBuildTasks(prev => {
          const updatedTasks = prev.map(task => {
            if (task.status === 'standby' && Math.random() > 0.8) {
              addBuildLog('info', `Memulai ${task.name}`, task.category);
              return { ...task, status: 'active' as const, startTime: Date.now() };
            }
            
            if (task.status === 'active') {
              const newProgress = Math.min(100, task.progress + Math.random() * 15 + 5);
              
              // Random log messages for active tasks
              if (Math.random() > 0.85 && task.details) {
                const randomDetail = task.details[Math.floor(Math.random() * task.details.length)];
                addBuildLog('info', randomDetail, task.category);
              }
              
              if (newProgress >= 100) {
                addBuildLog('success', `${task.name} selesai`, task.category);
                const completedTask = { ...task, progress: 100, status: 'complete' as const, endTime: Date.now() };
                setCompletedTasks(prev => [...prev, completedTask]);
                setBuildsCompleted(prev => prev + 1);
                return completedTask;
              }
              
              return { ...task, progress: newProgress };
            }
            
            return task;
          });
          
          return updatedTasks;
        });
        
        setOptimizationLevel(prev => Math.min(100, prev + Math.random() * 3 + 1));
      }, 2000);

      return () => clearInterval(interval);
    } else {
      // Reset tasks when stopping
      setBuildTasks(prev => prev.map(task => ({
        ...task,
        progress: 0,
        status: 'standby' as const,
        startTime: undefined,
        endTime: undefined
      })));
      addBuildLog('warning', 'Auto-Build System dihentikan', 'system');
    }
  }, [isActive]);

  const toggleBuildSystem = () => {
    setIsActive(!isActive);
    // Log build system status to console instead of showing toast
    console.log(isActive ? "🛑 Build System Stopped" : "🏗️ MIORA Auto-Build System Activated");
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const activeTasks = buildTasks.filter(task => task.status === 'active');
  const completedTasksCount = buildTasks.filter(task => task.status === 'complete').length;
  const totalTasks = buildTasks.length;

  return (
    <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-orange-300 flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="h-6 w-6 mr-3" />
            MIORA Autonomous Build System
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "BUILDING" : "IDLE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Package className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <div className="text-2xl font-bold text-white">{buildsCompleted}</div>
            <div className="text-sm text-gray-400">Tasks Completed</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Activity className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{activeTasks.length}</div>
            <div className="text-sm text-gray-400">Active Tasks</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Rocket className="h-6 w-6 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-white">{optimizationLevel.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Optimization Level</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Database className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{infrastructureComponents.length}</div>
            <div className="text-sm text-gray-400">Infrastructure</div>
          </div>
        </div>

        {/* Control Button */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleBuildSystem}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
            <Wrench className="h-4 w-4 mr-2" />
            {isActive ? "Stop Auto-Build" : "Start Auto-Build"}
          </Button>
        </div>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/20">
            <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
            <TabsTrigger value="tasks" className="text-white">Build Tasks</TabsTrigger>
            <TabsTrigger value="logs" className="text-white">Build Logs</TabsTrigger>
            <TabsTrigger value="infrastructure" className="text-white">Infrastructure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black/20 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-orange-300 text-lg flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Total Progress:</span>
                      <span className="text-white">{completedTasksCount}/{totalTasks} tasks</span>
                    </div>
                    <Progress value={(completedTasksCount / totalTasks) * 100} className="h-3" />
                    <div className="text-sm text-gray-400">
                      {activeTasks.length > 0 ? `${activeTasks.length} task(s) sedang berjalan` : 'Semua task dalam status standby'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-orange-300 text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {buildLogs.slice(0, 5).map((log) => (
                        <div key={log.id} className="text-sm">
                          <span className="text-gray-400">
                            {getLogIcon(log.type)} {log.message}
                          </span>
                        </div>
                      ))}
                      {buildLogs.length === 0 && (
                        <div className="text-sm text-gray-500">No activity yet</div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
              <h4 className="text-orange-300 font-medium mb-2">🏗️ MIORA Auto-Build Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                <div>• Automatic dependency management</div>
                <div>• Smart bundle optimization</div>
                <div>• Auto-configured build pipelines</div>
                <div>• Intelligent asset processing</div>
                <div>• Deployment automation</div>
                <div>• Real-time monitoring</div>
                <div>• Security scanning</div>
                <div>• Performance analysis</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Build Pipeline Status</h3>
              {buildTasks.map((task) => {
                const IconComponent = task.icon;
                return (
                  <div key={task.id} className="p-4 bg-black/20 rounded-lg border border-orange-500/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className="h-5 w-5 mr-3 text-orange-400" />
                        <span className="text-white font-medium">{task.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs text-gray-400">
                          {task.category}
                        </Badge>
                        <Badge className={
                          task.status === 'complete' ? 'bg-green-500' : 
                          task.status === 'active' ? 'bg-blue-500' : 
                          task.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                        }>
                          {task.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={task.progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{task.progress.toFixed(1)}% Complete</span>
                      {task.startTime && (
                        <span className="text-gray-400">
                          Started: {new Date(task.startTime).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                    {task.details && task.status === 'active' && (
                      <div className="mt-2 text-xs text-gray-500">
                        Current: {task.details[Math.floor(Math.random() * task.details.length)]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="bg-black/20 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Build Logs ({buildLogs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {buildLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-black/30 rounded border-l-4 border-orange-500/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">
                            {getLogIcon(log.type)} {log.message}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.category}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {buildLogs.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No logs yet. Start the build system to see activity.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-4">
            <Card className="bg-black/20 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Infrastructure Components ({infrastructureComponents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {infrastructureComponents.map((component) => (
                      <div key={component.id} className="p-3 bg-black/30 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{component.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs text-purple-400">
                              {component.type}
                            </Badge>
                            <Badge className={
                              component.status === 'active' ? 'bg-green-500' : 
                              component.status === 'building' ? 'bg-blue-500' : 'bg-gray-500'
                            }>
                              {component.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          Dependencies: {component.dependencies.join(', ')}
                        </div>
                        {component.autoGenerated && (
                          <Badge variant="outline" className="text-xs text-cyan-400 mt-2">
                            Auto-Generated by MIORA
                          </Badge>
                        )}
                      </div>
                    ))}
                    {infrastructureComponents.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No infrastructure components yet. Start the build system to auto-generate.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AutonomousBuildSystem;