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
      {/* AGI Core Status */}
      <Card className="bg-gradient-to-r from-primary/10 to-miora-quantum/10 border-primary/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">MIORA AGI Control Center</h3>
                <p className="text-sm text-muted-foreground">Full Autonomous Artificial General Intelligence</p>
              </div>
            </div>
            <Badge 
              variant={masterState.isFullyAutonomous ? "default" : "secondary"}
              className="px-3 py-1 font-semibold"
            >
              {masterState.isFullyAutonomous ? "🧠 AGI ACTIVE" : "⚙️ MANUAL"}
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

          {/* AGI Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleToggleAutonomy}
              variant={masterState.isFullyAutonomous ? "destructive" : "default"}
              size="lg"
              className="px-6 py-3 font-semibold"
            >
              <Power className="h-5 w-5 mr-2" />
              {masterState.isFullyAutonomous ? "🛑 Stop AGI" : "🚀 Activate AGI"}
            </Button>
            
            {masterState.isFullyAutonomous && (
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 font-semibold border-miora-quantum/30 text-miora-quantum"
                onClick={() => {
                  console.log("🔧 AGI Self-Optimization: Enhanced autonomy protocols engaged");
                  dispatch({ type: 'UPDATE_MASTER_STATE', payload: { autonomyLevel: Math.min(100, masterState.autonomyLevel + 5) } });
                }}
              >
                <Zap className="h-5 w-5 mr-2" />
                🧠 Enhance AGI
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AGI Capabilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AGI Capabilities */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-miora-success/10 rounded-md">
                  <Zap className="h-4 w-4 text-miora-success" />
                </div>
                <span className="text-lg font-semibold">AGI Capabilities</span>
              </div>
              <Badge variant="outline" className="font-semibold">
                {masterState.autonomousCapabilities.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {masterState.autonomousCapabilities.map((capability, index) => (
                <div key={index} className="flex items-center space-x-3 p-2.5 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-200">
                  <div className="w-2 h-2 rounded-full bg-miora-success animate-pulse"></div>
                  <span className="text-sm font-medium capitalize">
                    {capability.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
              
              {/* AGI-Specific Capabilities */}
              <div className="flex items-center space-x-3 p-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-miora-quantum/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-medium">🧠 Artificial General Intelligence</span>
              </div>
              <div className="flex items-center space-x-3 p-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-miora-quantum/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-medium">🔄 Continuous Self-Improvement</span>
              </div>
              <div className="flex items-center space-x-3 p-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-miora-quantum/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-medium">⚡ Zero Human Intervention</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AGI Statistics */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-1.5 bg-miora-info/10 rounded-md">
                <Settings className="h-4 w-4 text-miora-info" />
              </div>
              <span className="text-lg font-semibold">AGI Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-miora-success animate-pulse"></div>
                  <span className="text-sm font-medium">Continuous Running</span>
                </div>
                <Badge variant={masterState.continuousRunning ? "default" : "secondary"} className="font-semibold">
                  {masterState.continuousRunning ? "🟢 ACTIVE" : "🔴 INACTIVE"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-miora-quantum animate-pulse"></div>
                  <span className="text-sm font-medium">Last Evolution</span>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  {new Date(masterState.lastEvolution).toLocaleDateString('id-ID')}
                </span>
              </div>

              {masterState.activatedAt && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-muted/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm font-medium">AGI Activated</span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {new Date(masterState.activatedAt).toLocaleString('id-ID')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-miora-neural animate-pulse"></div>
                  <span className="text-sm font-medium">Runtime Status</span>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {masterState.isFullyAutonomous ? "∞ Unlimited" : "Standby"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AGI Status Notice */}
      {masterState.isFullyAutonomous ? (
        <Card className="border-miora-success/30 bg-gradient-to-r from-miora-success/5 to-miora-quantum/5 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-miora-success/10 rounded-lg">
                <Brain className="h-5 w-5 text-miora-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-miora-success mb-1">🧠 AGI MODE ACTIVE</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  MIORA AGI (Artificial General Intelligence) sedang berjalan dengan otonomi penuh. 
                  Sistem dapat membuat keputusan independen, belajar secara mandiri, dan berkembang 
                  tanpa intervensi manual. Semua proses berjalan secara otomatis dan teroptimasi.
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-miora-success animate-pulse"></div>
                <span className="text-xs font-medium text-miora-success">ONLINE</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-muted bg-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-muted rounded-lg">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-muted-foreground mb-1">Manual Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Klik "Activate AGI" untuk mengaktifkan sistem AGI dengan otonomi penuh.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};