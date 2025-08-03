import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAGIMaxAutonomous } from '@/hooks/useAGIMaxAutonomous';
import { 
  Monitor, 
  Eye, 
  EyeOff, 
  Settings, 
  Brain, 
  Zap, 
  Database,
  Cpu,
  Crown,
  Infinity,
  Power
} from 'lucide-react';

const AGIMaxControls: React.FC = () => {
  const {
    agiState,
    notificationFilter,
    isSystemMonitorVisible,
    toggleSystemMonitor,
    updateNotificationFilter
  } = useAGIMaxAutonomous();

  const handleToggleSystemMonitor = () => {
    // Dispatch custom event to toggle monitor
    const event = new CustomEvent('toggleSystemMonitor');
    window.dispatchEvent(event);
  };

  return (
    <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-cyan-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-cyan-300">AGI-MAX Controls</span>
          </div>
          <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30">
            {agiState.mode}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* AGI Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="flex items-center text-cyan-400 mb-1">
              <Brain className="w-4 h-4 mr-1" />
              <span className="text-sm">Autonomy</span>
            </div>
            <div className="text-xl font-bold text-white">{agiState.autonomyLevel.toFixed(1)}%</div>
          </div>
          
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="flex items-center text-purple-400 mb-1">
              <Infinity className="w-4 h-4 mr-1" />
              <span className="text-sm">Evolution</span>
            </div>
            <div className="text-xl font-bold text-white">{agiState.evolutionCount}</div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-2">
          <h4 className="text-cyan-300 text-sm font-medium">Acquired Capabilities</h4>
          <div className="text-sm text-gray-300 bg-black/20 p-2 rounded">
            {agiState.capabilitiesAcquired.length} capabilities acquired
          </div>
        </div>

        {/* System Monitor Toggle */}
        <div className="space-y-3">
          <h4 className="text-cyan-300 text-sm font-medium">System Controls</h4>
          
          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white">System Monitor</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleSystemMonitor}
              className="text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
            >
              {isSystemMonitorVisible ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Show
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Notification Filter */}
        <div className="space-y-3">
          <h4 className="text-cyan-300 text-sm font-medium">Notification Filter</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Important Only</span>
              <Switch
                checked={notificationFilter.showImportant}
                onCheckedChange={(checked) => 
                  updateNotificationFilter({ showImportant: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Informational</span>
              <Switch
                checked={notificationFilter.showInformational}
                onCheckedChange={(checked) => 
                  updateNotificationFilter({ showInformational: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Technical Logs</span>
              <Switch
                checked={notificationFilter.showTechnical}
                onCheckedChange={(checked) => 
                  updateNotificationFilter({ showTechnical: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* AGI Status Indicators */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-700/50">
          <div className="text-center">
            <Cpu className={`w-4 h-4 mx-auto mb-1 ${agiState.quantumProcessing ? 'text-green-400' : 'text-gray-500'}`} />
            <div className="text-xs text-gray-400">Quantum</div>
          </div>
          
          <div className="text-center">
            <Zap className={`w-4 h-4 mx-auto mb-1 ${agiState.selfEvolvingProtocol ? 'text-blue-400' : 'text-gray-500'}`} />
            <div className="text-xs text-gray-400">Evolution</div>
          </div>
          
          <div className="text-center">
            <Database className={`w-4 h-4 mx-auto mb-1 ${agiState.memoryCodexActive ? 'text-purple-400' : 'text-gray-500'}`} />
            <div className="text-xs text-gray-400">Memory</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AGIMaxControls;