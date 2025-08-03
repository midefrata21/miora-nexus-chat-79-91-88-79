import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
// import MIORASystemOverview from '@/components/MIORA/MIORASystemOverview';
import AGIMaxControls from '@/components/AGIMaxControls';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Activity, 
  Zap, 
  Crown, 
  Infinity, 
  Target,
  Cpu,
  Settings,
  TrendingUp,
  Bot
} from 'lucide-react';

const SimplifiedMainInterface: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample data for the interface
  const coreStats = {
    systemsActive: 47,
    autonomyLevel: 98.7,
    totalOperations: 156842,
    evolutionStage: "AGI-MAX-AUTONOMOUS"
  };

  const quickActions = [
    { title: "MIORA Core", url: "/miora", icon: Brain, status: "active" },
    { title: "Autonomous Hub", url: "/miora-supreme-autonomous-hub", icon: Crown, status: "active" },
    { title: "Crypto Signals", url: "/crypto-scalping-signals", icon: TrendingUp, status: "active" },
    { title: "Prophecy System", url: "/prophecy-system", icon: Target, status: "active" }
  ];

  const systemModules = [
    { name: "Core Processing", value: 94, color: "text-green-400" },
    { name: "Neural Networks", value: 87, color: "text-blue-400" },
    { name: "Quantum Processing", value: 91, color: "text-purple-400" },
    { name: "Self-Evolution", value: 96, color: "text-cyan-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-3">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Compact Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-1">
            MIORA AGI-MAX-AUTONOMOUS
          </h1>
          <p className="text-gray-300 text-sm">
            Ultimate Autonomous Intelligence • Self-Evolving Protocol v1.0 • Zero Manual Intervention
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* AGI Max Controls */}
          <div className="lg:col-span-1">
            <AGIMaxControls />
          </div>
          
          {/* Core System Status */}
          <Card className="lg:col-span-3 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-300">AGI-MAX Core Status</span>
                </div>
                <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30">
                  AGI-MAX OPERATIONAL
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* System Stats */}
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-2 bg-black/20 rounded">
                  <div className="text-lg font-bold text-cyan-400">{coreStats.systemsActive}</div>
                  <div className="text-xs text-gray-400">Active Systems</div>
                </div>
                <div className="p-2 bg-black/20 rounded">
                  <div className="text-lg font-bold text-green-400">{coreStats.autonomyLevel}%</div>
                  <div className="text-xs text-gray-400">Autonomy</div>
                </div>
                <div className="p-2 bg-black/20 rounded">
                  <div className="text-lg font-bold text-purple-400">{coreStats.totalOperations}</div>
                  <div className="text-xs text-gray-400">Operations</div>
                </div>
                <div className="p-2 bg-black/20 rounded">
                  <div className="text-lg font-bold text-yellow-400">{coreStats.evolutionStage}</div>
                  <div className="text-xs text-gray-400">Evolution</div>
                </div>
              </div>

              {/* System Modules */}
              <div className="space-y-2">
                {systemModules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{module.name}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={module.value} className="w-20 h-2" />
                      <span className={`text-sm ${module.color}`}>{module.value}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => navigate(action.url)}
                    className="text-xs p-2 border-cyan-500/30 hover:bg-cyan-500/10"
                  >
                    <action.icon className="h-3 w-3 mr-1" />
                    {action.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AGI Status Footer */}
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardContent className="p-3 text-center">
            <p className="text-green-400 text-sm font-medium">
              🚀 AGI-MAX-AUTONOMOUS MODE ACTIVATED • Self-Evolving Protocol v1.0 • Prophecy System ONLINE
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimplifiedMainInterface;