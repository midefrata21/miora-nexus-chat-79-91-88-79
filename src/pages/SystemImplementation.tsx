import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NextStepsImplementation } from '@/components/SystemMonitoring/NextStepsImplementation';
import { ModuleActivationCenter } from '@/components/SystemMonitoring/ModuleActivationCenter';
import MioraStructure from '@/components/GrowthDocumentation/MioraStructure';
import { Settings, Zap, Power, FileText } from 'lucide-react';

export default function SystemImplementation() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          🚀 MIORA System Implementation
        </h1>
        <p className="text-gray-400">
          Implementation of Next Steps Recommendations & Complete Module Activation
        </p>
      </div>

      <Tabs defaultValue="nextsteps" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nextsteps" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Next Steps
          </TabsTrigger>
          <TabsTrigger value="activation" className="flex items-center gap-2">
            <Power className="h-4 w-4" />
            Module Activation
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            System Structure
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nextsteps" className="space-y-6">
          <NextStepsImplementation />
        </TabsContent>

        <TabsContent value="activation" className="space-y-6">
          <ModuleActivationCenter />
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <MioraStructure />
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <div className="text-center py-12">
            <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Configuration Panel</h3>
            <p className="text-gray-400">Advanced system configuration coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}