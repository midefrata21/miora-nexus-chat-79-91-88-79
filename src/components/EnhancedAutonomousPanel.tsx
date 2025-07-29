import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Activity, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Shield,
  Play,
  Pause,
  Square
} from 'lucide-react';
import { useEnhancedAutonomous, type AutonomyLevel } from '@/hooks/useEnhancedAutonomous';

const EnhancedAutonomousPanel: React.FC = () => {
  const {
    config,
    isActive,
    metrics,
    learningEvents,
    changesThisHour,
    toggleAutonomousSystem,
    updateConfig,
    performAutoAssessment,
    approveImprovement,
    emergencyStop,
    getPendingEvents,
    getRecentEvents,
    getSystemHealth,
  } = useEnhancedAutonomous();

  const [selectedLevel, setSelectedLevel] = useState<AutonomyLevel>(config.autonomyLevel);
  const systemHealth = getSystemHealth();
  const pendingEvents = getPendingEvents();
  const recentEvents = getRecentEvents();

  const handleLevelChange = (level: AutonomyLevel) => {
    setSelectedLevel(level);
    updateConfig({ autonomyLevel: level });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'border-green-500/30 bg-green-900/20';
      case 'pending': return 'border-yellow-500/30 bg-yellow-900/20';
      case 'failed': return 'border-red-500/30 bg-red-900/20';
      default: return 'border-gray-500/30 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* System Status Header */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-300">
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-3" />
              MIORA Enhanced Autonomous System
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className={`${getStatusColor(systemHealth.status)} border-current`}>
                {systemHealth.status.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={`${isActive ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <span className="text-sm text-gray-400">Performance</span>
              <div className="flex items-center space-x-2">
                <Progress value={metrics.performance * 100} className="h-2" />
                <span className="text-sm font-medium">{(metrics.performance * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-gray-400">Errors</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-400">{metrics.errorCount}</span>
                <span className="text-xs text-gray-500">this session</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-gray-400">Uptime</span>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{systemHealth.uptime}s</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-gray-400">Changes/Hour</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-cyan-400">{changesThisHour}</span>
                <span className="text-xs text-gray-500">/{config.safetyBounds.maxChangesPerHour}</span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => toggleAutonomousSystem(!isActive)}
              className={`flex items-center space-x-2 ${
                isActive 
                  ? 'bg-red-600 hover:bg-red-500' 
                  : 'bg-green-600 hover:bg-green-500'
              }`}
              disabled={config.safetyBounds.emergencyStop}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Deactivate' : 'Activate'}</span>
            </Button>
            
            <Button
              onClick={performAutoAssessment}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>Manual Assessment</span>
            </Button>

            <Button
              onClick={emergencyStop}
              variant="destructive"
              className="flex items-center space-x-2"
              disabled={config.safetyBounds.emergencyStop}
            >
              <Square className="w-4 h-4" />
              <span>Emergency Stop</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard */}
      <Tabs defaultValue="control" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        {/* Control Panel */}
        <TabsContent value="control" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Autonomy Level Control */}
            <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Autonomy Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(['manual', 'supervised', 'full'] as AutonomyLevel[]).map((level) => (
                  <div key={level} className="flex items-center justify-between p-3 rounded-lg border border-gray-600">
                    <div>
                      <div className="font-medium text-gray-200 capitalize">{level}</div>
                      <div className="text-xs text-gray-400">
                        {level === 'manual' && 'All changes require approval'}
                        {level === 'supervised' && 'Minor changes auto-approved'}
                        {level === 'full' && 'Complete autonomous operation'}
                      </div>
                    </div>
                    <Switch
                      checked={selectedLevel === level}
                      onCheckedChange={() => handleLevelChange(level)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-300 flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Pending Approvals
                  </div>
                  <Badge variant="outline" className="text-yellow-300 border-yellow-300">
                    {pendingEvents.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {pendingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="p-3 rounded-lg bg-black/20 border border-yellow-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-200">{event.type}</span>
                          <span className="text-xs text-gray-400">
                            {event.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 mb-3">{event.description}</p>
                        <Button
                          onClick={() => approveImprovement(event.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-500"
                        >
                          Approve
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No pending approvals</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Learning Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`p-4 rounded-lg border ${getEventStatusColor(event.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(event.status)}`}>
                          {event.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-400">
                        {event.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config" className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Auto-trigger Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Performance Threshold</label>
                  <div className="text-lg font-mono text-green-400">
                    {(config.autoTriggers.performanceThreshold * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Error Threshold</label>
                  <div className="text-lg font-mono text-red-400">
                    {config.autoTriggers.errorThreshold} errors
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Check Interval</label>
                  <div className="text-lg font-mono text-blue-400">
                    {config.autoTriggers.timeInterval / 1000}s
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Market Analysis</label>
                  <div className="text-lg font-mono text-cyan-400">
                    {config.autoTriggers.marketAnalysis ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Tab */}
        <TabsContent value="safety" className="space-y-4">
          <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Safety Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-black/20 border border-red-500/20">
                  <div className="text-sm text-gray-400 mb-1">Max Changes/Hour</div>
                  <div className="text-xl font-bold text-red-400">
                    {config.safetyBounds.maxChangesPerHour}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-black/20 border border-yellow-500/20">
                  <div className="text-sm text-gray-400 mb-1">Backup Required</div>
                  <div className="text-xl font-bold text-yellow-400">
                    {config.safetyBounds.requireBackup ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-black/20 border border-green-500/20">
                  <div className="text-sm text-gray-400 mb-1">Emergency Stop</div>
                  <div className="text-xl font-bold text-green-400">
                    {config.safetyBounds.emergencyStop ? 'ACTIVE' : 'Ready'}
                  </div>
                </div>
              </div>
              
              {config.safetyBounds.emergencyStop && (
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/30">
                  <div className="flex items-center space-x-2 text-red-300">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">Emergency Stop Activated</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    All autonomous operations have been halted. Manual restart required.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAutonomousPanel;