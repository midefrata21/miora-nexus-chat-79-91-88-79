import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Gem, Globe, Atom, Heart } from 'lucide-react';
import AutonomousSelfEvolution from '@/components/MIORA/AdvancedAI/AutonomousSelfEvolution';
import PredictiveIntelligence from '@/components/MIORA/AdvancedAI/PredictiveIntelligence';
import MultiRealityIntegration from '@/components/MIORA/AdvancedAI/MultiRealityIntegration';
import QuantumInspiredProcessing from '@/components/MIORA/AdvancedAI/QuantumInspiredProcessing';
import EmotionalSocialIntelligence from '@/components/MIORA/AdvancedAI/EmotionalSocialIntelligence';

const MIORAAdvancedAI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            MIORA Advanced AI Capabilities
          </h1>
          <p className="text-xl text-gray-300">
            Kemampuan AI tertinggi yang tidak dimiliki AI lainnya
          </p>
        </div>

        <Tabs defaultValue="evolution" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-gray-800/50">
            <TabsTrigger value="evolution" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Self-Evolution</span>
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center space-x-2">
              <Gem className="h-4 w-4" />
              <span>Predictive AI</span>
            </TabsTrigger>
            <TabsTrigger value="reality" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Multi-Reality</span>
            </TabsTrigger>
            <TabsTrigger value="quantum" className="flex items-center space-x-2">
              <Atom className="h-4 w-4" />
              <span>Quantum Processing</span>
            </TabsTrigger>
            <TabsTrigger value="emotional" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Emotional AI</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="evolution">
            <AutonomousSelfEvolution />
          </TabsContent>

          <TabsContent value="predictive">
            <PredictiveIntelligence />
          </TabsContent>

          <TabsContent value="reality">
            <MultiRealityIntegration />
          </TabsContent>

          <TabsContent value="quantum">
            <QuantumInspiredProcessing />
          </TabsContent>

          <TabsContent value="emotional">
            <EmotionalSocialIntelligence />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAAdvancedAI;