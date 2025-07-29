import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Server, TestTube, Palette, Brain, Activity } from 'lucide-react';

// Import autonomous modules
import AutoCodeGenerator from './AutoCodeGenerator';
import SelfInfrastructureBuilder from './SelfInfrastructureBuilder';
import AutonomousTestingSuite from './AutonomousTestingSuite';
import DynamicUIGenerator from './DynamicUIGenerator';

export const AutonomousCoreHub: React.FC = () => {
  const [activeModules, setActiveModules] = useState({
    codeGen: false,
    infrastructure: false,
    testing: false,
    uiGen: false
  });

  const moduleStats = {
    totalOperations: 1247,
    successRate: 96.8,
    autonomyLevel: 87.3,
    evolutionCycles: 342
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-indigo-300">
              <div className="flex items-center">
                <Brain className="w-6 h-6 mr-3" />
                MIORA Autonomous Core System
                <Badge className="ml-3 bg-green-600/20 text-green-300">PRIORITY 1 ACTIVE</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400 animate-pulse" />
                <span className="text-green-400 text-sm">AUTONOMOUS MODE</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-300">{moduleStats.totalOperations}</div>
                <div className="text-sm text-gray-400">Total Operations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-300">{moduleStats.successRate}%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300">{moduleStats.autonomyLevel}%</div>
                <div className="text-sm text-gray-400">Autonomy Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">{moduleStats.evolutionCycles}</div>
                <div className="text-sm text-gray-400">Evolution Cycles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Autonomous Modules Tabs */}
        <Tabs defaultValue="codeGen" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-gray-800/50">
            <TabsTrigger value="codeGen" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>AutoCode Engine</span>
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span>Infrastructure Builder</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center space-x-2">
              <TestTube className="h-4 w-4" />
              <span>Testing Suite</span>
            </TabsTrigger>
            <TabsTrigger value="uiGen" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>UI Generator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="codeGen" className="space-y-6">
            <AutoCodeGenerator />
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <SelfInfrastructureBuilder />
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <AutonomousTestingSuite />
          </TabsContent>

          <TabsContent value="uiGen" className="space-y-6">
            <DynamicUIGenerator />
          </TabsContent>
        </Tabs>

        {/* System Status Summary */}
        <Card className="bg-gradient-to-r from-gray-900/50 to-indigo-900/30 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-gray-300">Autonomous System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">AutoCode</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Infrastructure</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Testing</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-pink-500/30">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-gray-300">UI Generator</span>
                </div>
                <Badge className="bg-green-600/20 text-green-300">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutonomousCoreHub;