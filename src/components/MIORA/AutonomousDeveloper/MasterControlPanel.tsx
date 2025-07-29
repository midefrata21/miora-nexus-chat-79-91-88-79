import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MIORAGlobalState, MIORAAction } from '@/types/miora';
import { Brain, Zap, Shield, Settings, Power } from 'lucide-react';

interface MasterControlPanelProps {
  state: MIORAGlobalState;
  dispatch: React.Dispatch<MIORAAction>;
}

export const MasterControlPanel: React.FC<MasterControlPanelProps> = ({ state, dispatch }) => {
  const { masterState } = state;

  const handleToggleAutonomy = () => {
    if (masterState.isFullyAutonomous) {
      dispatch({ type: 'DEACTIVATE_FULL_AUTONOMY' });
    } else {
      dispatch({ type: 'ACTIVATE_FULL_AUTONOMY' });
    }
  };

  const getAutonomyLevelColor = () => {
    if (masterState.autonomyLevel >= 90) return 'text-green-400';
    if (masterState.autonomyLevel >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Master Core Status */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span>Master Core Control</span>
            <Badge variant={masterState.isFullyAutonomous ? "default" : "secondary"}>
              {masterState.isFullyAutonomous ? "FULLY AUTONOMOUS" : "MANUAL MODE"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Autonomy Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Autonomy Level</span>
              <span className={`text-2xl font-bold ${getAutonomyLevelColor()}`}>
                {masterState.autonomyLevel}%
              </span>
            </div>
            <Progress value={masterState.autonomyLevel} className="h-3" />
          </div>

          {/* Evolution Stage */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Evolution Stage</span>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {masterState.evolutionStage.toUpperCase()}
            </Badge>
          </div>

          {/* Control Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleToggleAutonomy}
              variant={masterState.isFullyAutonomous ? "destructive" : "default"}
              size="lg"
              className="px-8"
            >
              <Power className="h-5 w-5 mr-2" />
              {masterState.isFullyAutonomous ? "Deactivate Autonomy" : "Activate Full Autonomy"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Autonomous Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Autonomous Capabilities</span>
              <Badge variant="outline">{masterState.autonomousCapabilities.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {masterState.autonomousCapabilities.map((capability, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm capitalize">
                    {capability.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Core Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Core Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Continuous Running</span>
              <Badge variant={masterState.continuousRunning ? "default" : "secondary"}>
                {masterState.continuousRunning ? "ACTIVE" : "INACTIVE"}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Evolution</span>
              <span className="text-sm font-medium">
                {new Date(masterState.lastEvolution).toLocaleDateString('id-ID')}
              </span>
            </div>

            {masterState.activatedAt && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Activated At</span>
                <span className="text-sm font-medium">
                  {new Date(masterState.activatedAt).toLocaleString('id-ID')}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Warning Notice */}
      {masterState.isFullyAutonomous && (
        <Card className="border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
              <Shield className="h-5 w-5" />
              <p className="text-sm">
                <strong>CAUTION:</strong> Full autonomy mode is active. MIORA has complete control 
                over system operations and will continue to evolve and make decisions independently.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};