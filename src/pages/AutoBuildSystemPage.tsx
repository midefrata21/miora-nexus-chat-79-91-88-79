import React from 'react';
import AutoBuildSystem from '@/components/MIORA/AutoBuild/AutoBuildSystem';
import MIORASystemEnhancer from '@/components/MIORA/Improvements/MIORASystemEnhancer';
import MIORAUpgradeCenter from '@/components/MIORA/SystemStatus/MIORAUpgradeCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AutoBuildSystemPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Tabs defaultValue="auto-build" className="w-full">
        <div className="flex justify-center pt-6">
          <TabsList className="grid grid-cols-2 w-96">
            <TabsTrigger value="auto-build">Auto-Build System</TabsTrigger>
            <TabsTrigger value="enhancements">System Enhancements</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="auto-build">
          <AutoBuildSystem />
        </TabsContent>
        
        <TabsContent value="enhancements">
          <div className="p-6">
            <MIORASystemEnhancer />
          </div>
        </TabsContent>
        
        <TabsContent value="upgrade-center">
          <div className="p-6">
            <MIORAUpgradeCenter />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutoBuildSystemPage;