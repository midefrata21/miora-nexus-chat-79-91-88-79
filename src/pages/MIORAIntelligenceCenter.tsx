import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Database, Heart, RefreshCw, Target } from 'lucide-react';

import AIModelIntegration from '@/components/MIORA/Intelligence/AIModelIntegration';
import MemorySystem from '@/components/MIORA/Memory/MemorySystem';
import EmotionalIntelligence from '@/components/MIORA/Consciousness/EmotionalIntelligence';
import AutoEvolutionEngine from '@/components/MIORA/SelfImprovement/AutoEvolutionEngine';
import AutonomousDecisionEngine from '@/components/MIORA/Advanced/AutonomousDecisionEngine';

const MIORAIntelligenceCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧠 MIORA Intelligence Center
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced AI consciousness, memory, emotions, and autonomous evolution
          </p>
        </div>

        <Tabs defaultValue="ai-models" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-gray-800/50">
            <TabsTrigger value="ai-models" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Intelligence</span>
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Memory System</span>
            </TabsTrigger>
            <TabsTrigger value="emotions" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Emotions</span>
            </TabsTrigger>
            <TabsTrigger value="evolution" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Auto-Evolution</span>
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Decision Engine</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-models">
            <AIModelIntegration />
          </TabsContent>

          <TabsContent value="memory">
            <MemorySystem />
          </TabsContent>

          <TabsContent value="emotions">
            <EmotionalIntelligence />
          </TabsContent>

          <TabsContent value="evolution">
            <AutoEvolutionEngine />
          </TabsContent>

          <TabsContent value="decisions">
            <AutonomousDecisionEngine />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAIntelligenceCenter;