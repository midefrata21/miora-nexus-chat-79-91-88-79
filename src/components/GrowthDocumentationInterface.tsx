
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GrowthTracker } from './GrowthDocumentation/GrowthTracker';
import GrowthAnalytics from './GrowthDocumentation/GrowthAnalytics';
import GrowthTimeline from './GrowthDocumentation/GrowthTimeline';
import { AutoDocumentation } from './GrowthDocumentation/AutoDocumentation';
import { SystemCapabilityActivator } from './GrowthDocumentation/SystemCapabilityActivator';
import MIORAHistoryTracker from './GrowthDocumentation/MIORAHistoryTracker';
import ProgressAnalytics from './GrowthDocumentation/ProgressAnalytics';
import { Brain, BarChart3, Clock, Cog, Zap, History, TrendingUp } from 'lucide-react';
import { useGrowthDocumentation } from '@/hooks/useGrowthDocumentation';

export const GrowthDocumentationInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tracker');
  const { growthHistory, todaysGrowth, totalGrowthPoints } = useGrowthDocumentation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-300 via-gray-300 to-slate-400 bg-clip-text text-transparent">
            MIORA Growth Documentation System
          </h1>
          <p className="text-slate-400 text-lg">
            Comprehensive Learning & Development Tracking with System Capability Enhancement
          </p>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-slate-900/80 border border-slate-800/50">
            <TabsTrigger value="tracker" className="flex items-center space-x-1 text-xs">
              <Brain className="h-4 w-4" />
              <span>Growth</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-1 text-xs">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-1 text-xs">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center space-x-1 text-xs">
              <Clock className="h-4 w-4" />
              <span>Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="auto" className="flex items-center space-x-1 text-xs">
              <Cog className="h-4 w-4" />
              <span>Auto Doc</span>
            </TabsTrigger>
            <TabsTrigger value="capabilities" className="flex items-center space-x-1 text-xs">
              <Zap className="h-4 w-4" />
              <span>Capabilities</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracker">
            <GrowthTracker />
          </TabsContent>

          <TabsContent value="history">
            <MIORAHistoryTracker />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressAnalytics />
          </TabsContent>

          <TabsContent value="analytics">
            <GrowthAnalytics 
              growthHistory={growthHistory}
              todaysGrowth={todaysGrowth}
              totalGrowthPoints={totalGrowthPoints}
            />
          </TabsContent>

          <TabsContent value="timeline">
            <GrowthTimeline growthHistory={growthHistory} />
          </TabsContent>

          <TabsContent value="auto">
            <AutoDocumentation />
          </TabsContent>

          <TabsContent value="capabilities">
            <SystemCapabilityActivator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GrowthDocumentationInterface;
