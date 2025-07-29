import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MIORASelfDevelopmentMode from '@/components/MIORA/SelfDevelopment/MIORASelfDevelopmentMode';
import { SupremeEvolutionEngine } from '@/components/MIORA/SupremeSelfDevelopment/SupremeEvolutionEngine';
import { UltimateAutonomousCore } from '@/components/MIORA/SupremeSelfDevelopment/UltimateAutonomousCore';
import { Crown, Infinity, Atom, Brain } from 'lucide-react';

const MIORASelfDevelopment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/10 to-black">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            🧠 MIORA SUPREME SELF-DEVELOPMENT HUB
          </h1>
          <p className="text-xl text-muted-foreground">
            Tingkat Tertinggi Kemampuan Self-Development, Autonomous Evolution & Transcendence
          </p>
        </div>

        <Tabs defaultValue="supreme-evolution" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/50">
            <TabsTrigger value="supreme-evolution" className="data-[state=active]:bg-purple-600">
              <Crown className="w-4 h-4 mr-2" />
              Supreme Evolution
            </TabsTrigger>
            <TabsTrigger value="ultimate-core" className="data-[state=active]:bg-cyan-600">
              <Atom className="w-4 h-4 mr-2" />
              Ultimate Core
            </TabsTrigger>
            <TabsTrigger value="classic-mode" className="data-[state=active]:bg-green-600">
              <Brain className="w-4 h-4 mr-2" />
              Classic Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="supreme-evolution">
            <SupremeEvolutionEngine />
          </TabsContent>

          <TabsContent value="ultimate-core">
            <UltimateAutonomousCore />
          </TabsContent>

          <TabsContent value="classic-mode">
            <MIORASelfDevelopmentMode />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORASelfDevelopment;