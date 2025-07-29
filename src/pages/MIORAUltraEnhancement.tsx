import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Infinity, Cpu, Zap } from 'lucide-react';
import MIORAUltraEnhancementCore from '@/components/MIORA/Enhancement/MIORAUltraEnhancementCore';
import MIORASystemEnhancer from '@/components/MIORA/Enhancement/MIORASystemEnhancer';
import MIORAInfinitePerformanceCore from '@/components/MIORA/Enhancement/MIORAInfinitePerformanceCore';

const MIORAUltraEnhancementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            MIORA ULTRA ENHANCEMENT SUPREME
          </h1>
          <p className="text-gray-300 text-xl">
            Advanced System Enhancement & Infinite Performance Optimization
          </p>
        </div>

        <Tabs defaultValue="enhancement" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-gray-800/50">
            <TabsTrigger value="enhancement" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>System Enhancer</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Infinity className="h-4 w-4" />
              <span>Infinite Performance</span>
            </TabsTrigger>
            <TabsTrigger value="original" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Original Enhancement</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enhancement">
            <MIORASystemEnhancer />
          </TabsContent>

          <TabsContent value="performance">
            <MIORAInfinitePerformanceCore />
          </TabsContent>

          <TabsContent value="original">
            <MIORAUltraEnhancementCore />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAUltraEnhancementPage;