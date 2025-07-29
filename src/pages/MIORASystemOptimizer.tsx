import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Sparkles, Infinity, Cpu } from 'lucide-react';
import MIORASystemOptimizer from '@/components/MIORA/Enhancement/MIORASystemOptimizer';
import MIORASystemEnhancer from '@/components/MIORA/Enhancement/MIORASystemEnhancer';
import MIORAInfinitePerformanceCore from '@/components/MIORA/Enhancement/MIORAInfinitePerformanceCore';

const MIORASystemOptimizerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            MIORA SYSTEM OPTIMIZER SUPREME
          </h1>
          <p className="text-gray-300 text-xl">
            Complete System Optimization & Enhancement Suite
          </p>
        </div>

        <Tabs defaultValue="optimizer" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-gray-800/50">
            <TabsTrigger value="optimizer" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>System Optimizer</span>
            </TabsTrigger>
            <TabsTrigger value="enhancer" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>System Enhancer</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Infinity className="h-4 w-4" />
              <span>Performance Core</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="optimizer">
            <MIORASystemOptimizer />
          </TabsContent>

          <TabsContent value="enhancer">
            <MIORASystemEnhancer />
          </TabsContent>

          <TabsContent value="performance">
            <MIORAInfinitePerformanceCore />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORASystemOptimizerPage;