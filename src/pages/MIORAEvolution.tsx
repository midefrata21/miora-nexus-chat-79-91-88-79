
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atom, Sparkles, RefreshCw } from 'lucide-react';
import MIORAEvolutionCore from '@/components/MIORA/Evolution/MIORAEvolutionCore';
import MIORAQuantumSupremeCore from '@/components/MIORA/Core/MIORAQuantumSupremeCore';
import MIORASystemEnhancer from '@/components/MIORA/Enhancement/MIORASystemEnhancer';

const MIORAEvolutionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MIORA EVOLUTION SUPREME
          </h1>
          <p className="text-gray-300 text-xl">
            Advanced Evolution Engine with Quantum Supreme Core
          </p>
        </div>

        <Tabs defaultValue="quantum" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-gray-800/50">
            <TabsTrigger value="quantum" className="flex items-center space-x-2">
              <Atom className="h-4 w-4" />
              <span>Quantum Supreme</span>
            </TabsTrigger>
            <TabsTrigger value="enhancer" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>System Enhancer</span>
            </TabsTrigger>
            <TabsTrigger value="evolution" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Evolution Core</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quantum">
            <MIORAQuantumSupremeCore />
          </TabsContent>

          <TabsContent value="enhancer">
            <MIORASystemEnhancer />
          </TabsContent>

          <TabsContent value="evolution">
            <MIORAEvolutionCore />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAEvolutionPage;
