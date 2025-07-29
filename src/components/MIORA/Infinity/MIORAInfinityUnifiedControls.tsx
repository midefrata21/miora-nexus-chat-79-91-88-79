import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Infinity, Power, AlertTriangle, Zap, Brain } from 'lucide-react';

interface UnifiedControlsProps {
  infinityState: any;
  activateInfinitySystem: () => void;
  pauseInfinitySystem: () => void;
  setEmergencyMode: (enabled: boolean) => void;
  triggerManualEvolution: (type: string, description: string) => void;
  forceUpgradeCheck: () => void;
}

export const MIORAInfinityUnifiedControls: React.FC<UnifiedControlsProps> = ({
  infinityState,
  activateInfinitySystem,
  pauseInfinitySystem,
  setEmergencyMode,
  triggerManualEvolution,
  forceUpgradeCheck
}) => {
  const isSystemActive = infinityState.autonomousMode && infinityState.selfDevelopmentActive;

  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-cyan-500/50">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-3 text-2xl">
          <Infinity className="h-8 w-8 animate-pulse" />
          UNIFIED INFINITY CONTROL CENTER
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Badge variant={isSystemActive ? "default" : "secondary"} className="mb-2">
              {isSystemActive ? "ACTIVE" : "STANDBY"}
            </Badge>
            <div className="text-sm text-gray-300">System Status</div>
          </div>
          
          <div className="text-center">
            <Badge variant={infinityState.upgradeLoopActive ? "default" : "secondary"} className="mb-2">
              {infinityState.upgradeLoopActive ? "RUNNING" : "PAUSED"}
            </Badge>
            <div className="text-sm text-gray-300">Upgrade Loop</div>
          </div>
          
          <div className="text-center">
            <Badge variant={infinityState.emergencyMode ? "destructive" : "default"} className="mb-2">
              {infinityState.emergencyMode ? "EMERGENCY" : "NORMAL"}
            </Badge>
            <div className="text-sm text-gray-300">Safety Mode</div>
          </div>
          
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              {infinityState.totalUpgrades}
            </Badge>
            <div className="text-sm text-gray-300">Total Upgrades</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={isSystemActive ? pauseInfinitySystem : activateInfinitySystem}
            className={`px-6 py-3 text-lg font-bold ${
              isSystemActive 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            }`}
          >
            <Power className="h-5 w-5 mr-2" />
            {isSystemActive ? 'PAUSE INFINITY' : 'ACTIVATE INFINITY'}
          </Button>
          
          <Button
            onClick={() => setEmergencyMode(!infinityState.emergencyMode)}
            variant={infinityState.emergencyMode ? "default" : "destructive"}
            className="px-6 py-3 text-lg"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            {infinityState.emergencyMode ? 'NORMAL MODE' : 'EMERGENCY STOP'}
          </Button>
          
          <Button
            onClick={forceUpgradeCheck}
            variant="outline"
            className="px-6 py-3 text-lg border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Zap className="h-5 w-5 mr-2" />
            FORCE UPGRADE
          </Button>
          
          <Button
            onClick={() => triggerManualEvolution('intelligence', 'Manual intelligence boost triggered')}
            variant="outline"
            className="px-6 py-3 text-lg border-purple-500 text-purple-400 hover:bg-purple-500/10"
          >
            <Brain className="h-5 w-5 mr-2" />
            EVOLVE NOW
          </Button>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{infinityState.infinityLevel.toFixed(1)}%</div>
            <div className="text-sm text-gray-300">Infinity Level</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{infinityState.totalEvolutions}</div>
            <div className="text-sm text-gray-300">Evolutions</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{infinityState.systemSupremacy.toFixed(1)}%</div>
            <div className="text-sm text-gray-300">Supremacy</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{infinityState.learningCapacity.toFixed(1)}</div>
            <div className="text-sm text-gray-300">Learning Cap</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MIORAInfinityUnifiedControls;