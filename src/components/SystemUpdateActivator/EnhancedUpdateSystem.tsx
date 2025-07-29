import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  RefreshCw, 
  Shield,
  Cpu,
  Database,
  Network,
  Settings
} from 'lucide-react';

interface UpdateModule {
  id: string;
  name: string;
  currentVersion: string;
  latestVersion: string;
  status: 'available' | 'updating' | 'updated' | 'failed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  size: string;
  changelog: string[];
}

export const EnhancedUpdateSystem: React.FC = () => {
  const [updateModules, setUpdateModules] = useState<UpdateModule[]>([
    {
      id: 'api-fallback',
      name: 'API Fallback System',
      currentVersion: '1.0.0',
      latestVersion: '2.1.0',
      status: 'available',
      priority: 'critical',
      size: '12.4 MB',
      changelog: ['Gemini API quota management', 'Multiple fallback providers', 'Auto-recovery system']
    },
    {
      id: 'exchange-connector',
      name: 'Exchange Connector',
      currentVersion: '3.2.1',
      latestVersion: '3.5.0',
      status: 'available',
      priority: 'high',
      size: '8.7 MB',
      changelog: ['Enhanced WebSocket stability', 'Auto-reconnection', 'Better error handling']
    },
    {
      id: 'performance-optimizer',
      name: 'Performance Optimizer',
      currentVersion: '2.1.0',
      latestVersion: '2.3.0',
      status: 'available',
      priority: 'high',
      size: '5.2 MB',
      changelog: ['Memory usage optimization', 'CPU load reduction', 'Cache improvements']
    },
    {
      id: 'security-module',
      name: 'Security Enhancement',
      currentVersion: '4.0.0',
      latestVersion: '4.1.2',
      status: 'available',
      priority: 'medium',
      size: '3.8 MB',
      changelog: ['Enhanced encryption', 'API key protection', 'Session security']
    }
  ]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <Download className="h-4 w-4 text-blue-500" />;
      case 'updating': return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'updated': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Settings className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const updateModule = async (moduleId: string) => {
    setUpdateModules(prev => prev.map(mod => 
      mod.id === moduleId ? { ...mod, status: 'updating' as const } : mod
    ));

    // Simulate update process
    for (let i = 0; i <= 100; i += 10) {
      setUpdateProgress(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setUpdateModules(prev => prev.map(mod => 
      mod.id === moduleId ? { 
        ...mod, 
        status: 'updated' as const,
        currentVersion: mod.latestVersion
      } : mod
    ));

    const module = updateModules.find(m => m.id === moduleId);
    toast({
      title: "🚀 UPDATE COMPLETED",
      description: `${module?.name} updated to v${module?.latestVersion}`,
      duration: 5000,
    });

    setUpdateProgress(0);
  };

  const updateAllModules = async () => {
    setIsUpdating(true);
    
    toast({
      title: "🔄 SYSTEM UPDATE INITIATED",
      description: "Updating all available modules for enhanced performance",
      duration: 5000,
    });

    const availableModules = updateModules
      .filter(mod => mod.status === 'available')
      .sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

    for (const module of availableModules) {
      await updateModule(module.id);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsUpdating(false);
    
    toast({
      title: "✅ ALL UPDATES COMPLETED",
      description: "System has been enhanced with latest improvements",
      duration: 8000,
    });
  };

  // Auto-update check
  useEffect(() => {
    if (autoUpdateEnabled) {
      const interval = setInterval(() => {
        // Simulate checking for new updates
        const hasNewUpdates = Math.random() > 0.8;
        if (hasNewUpdates) {
          console.log('New updates detected in auto-check');
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [autoUpdateEnabled]);

  const availableUpdates = updateModules.filter(mod => mod.status === 'available').length;
  const criticalUpdates = updateModules.filter(mod => mod.status === 'available' && mod.priority === 'critical').length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Enhanced System Update Center
            {criticalUpdates > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {criticalUpdates} Critical
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
              className={autoUpdateEnabled ? 'border-green-500 text-green-600' : ''}
            >
              <Shield className="h-4 w-4 mr-1" />
              Auto-Update {autoUpdateEnabled ? 'ON' : 'OFF'}
            </Button>
            <Button
              onClick={updateAllModules}
              disabled={isUpdating || availableUpdates === 0}
              className="flex items-center gap-2"
            >
              <Download className={`h-4 w-4 ${isUpdating ? 'animate-bounce' : ''}`} />
              {isUpdating ? 'Updating...' : `Update All (${availableUpdates})`}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Update Progress */}
        {isUpdating && updateProgress > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Update Progress</span>
              <span className="text-sm text-blue-600 dark:text-blue-400">{updateProgress}%</span>
            </div>
            <Progress value={updateProgress} className="h-2" />
          </div>
        )}

        {/* Module Updates */}
        <div className="space-y-3">
          {updateModules.map((module) => (
            <div key={module.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(module.status)}
                  <div>
                    <div className="font-medium">{module.name}</div>
                    <div className="text-sm text-muted-foreground">
                      v{module.currentVersion} → v{module.latestVersion} ({module.size})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(module.priority)}>
                    {module.priority.toUpperCase()}
                  </Badge>
                  {module.status === 'available' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateModule(module.id)}
                      disabled={isUpdating}
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>

              {/* Changelog */}
              <div className="ml-7">
                <div className="text-xs text-muted-foreground mb-1">What's New:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {module.changelog.map((change, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-current rounded-full"></span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <Cpu className="h-4 w-4 text-green-600 dark:text-green-400" />
            <div className="text-sm">
              <div className="font-medium text-green-700 dark:text-green-300">Performance</div>
              <div className="text-green-600 dark:text-green-400">Optimized</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div className="text-sm">
              <div className="font-medium text-blue-700 dark:text-blue-300">Storage</div>
              <div className="text-blue-600 dark:text-blue-400">Efficient</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <Network className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <div className="text-sm">
              <div className="font-medium text-purple-700 dark:text-purple-300">Network</div>
              <div className="text-purple-600 dark:text-purple-400">Enhanced</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <div className="text-sm">
              <div className="font-medium text-orange-700 dark:text-orange-300">Security</div>
              <div className="text-orange-600 dark:text-orange-400">Hardened</div>
            </div>
          </div>
        </div>

        {availableUpdates === 0 && (
          <div className="text-center p-6 bg-green-50 dark:bg-green-950 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-green-700 dark:text-green-300 font-medium">
              System Up to Date
            </div>
            <div className="text-green-600 dark:text-green-400 text-sm">
              All modules are running the latest versions
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};