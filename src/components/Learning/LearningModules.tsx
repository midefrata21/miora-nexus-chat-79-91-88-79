
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PermanentLearningSystem } from './PermanentLearningSystem';
import { AutodidacticLearningSystem } from './AutodidacticLearningSystem';
import { CryptoEducationModule } from './CryptoEducation/CryptoEducationModule';
import { Brain, Lightbulb, Infinity, TrendingUp } from 'lucide-react';

export const LearningModules = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="crypto-education" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="crypto-education" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            🚀 Crypto Trading Academy
          </TabsTrigger>
          <TabsTrigger value="permanent" className="flex items-center gap-2">
            <Infinity className="h-4 w-4" />
            Permanent Learning ♾️
          </TabsTrigger>
          <TabsTrigger value="autodidactic" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Autodidactic Learning 🧠
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crypto-education" className="space-y-6">
          <CryptoEducationModule />
        </TabsContent>

        <TabsContent value="permanent" className="space-y-6">
          <PermanentLearningSystem />
        </TabsContent>

        <TabsContent value="autodidactic" className="space-y-6">
          <AutodidacticLearningSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};
