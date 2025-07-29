
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MIORAAutonomousInfrastructureCore from '@/components/MIORA/Infrastructure/MIORAAutonomousInfrastructureCore';
import { MIORASystemActivator } from '@/components/MIORA/Infrastructure/MIORASystemActivator';
import { Server, Zap, Activity, Settings } from 'lucide-react';

const MIORAAutonomousInfrastructure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            MIORA ENHANCED INFRASTRUCTURE
          </h1>
          <p className="text-gray-300 text-xl">
            Level X Enhanced Infrastructure with Supreme System Integration
          </p>
        </div>

        <Tabs defaultValue="infrastructure" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-gray-800/50">
            <TabsTrigger value="infrastructure" className="flex items-center space-x-2">
              <Server className="h-4 w-4" />
              <span>Infrastructure Core</span>
            </TabsTrigger>
            <TabsTrigger value="activation" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>System Activation</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>System Monitoring</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="infrastructure">
            <MIORAAutonomousInfrastructureCore />
          </TabsContent>

          <TabsContent value="activation">
            <MIORASystemActivator />
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Advanced System Monitoring</h3>
              <p className="text-gray-400">Real-time system monitoring dashboard coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAAutonomousInfrastructure;
