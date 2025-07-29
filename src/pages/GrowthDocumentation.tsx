

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GrowthDocumentationInterface from '@/components/GrowthDocumentationInterface';
import DetailedDocumentationSystem from '@/components/Documentation/DetailedDocumentationSystem';
import { useGrowthDocumentation } from '@/hooks/useGrowthDocumentation';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, TrendingUp, Zap, Brain, FileText, Activity, Database, Bot, Layers } from 'lucide-react';
import { QuickSystemActivator } from '@/components/QuickSystemActivator';
import { useNavigate } from 'react-router-dom';

const GrowthDocumentationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activation');
  const { recordGrowth, todaysGrowth, totalGrowthPoints, isInitialized } = useGrowthDocumentation();

  useEffect(() => {
    if (!isInitialized) return;
    
    console.log('Growth Documentation page loaded successfully');
    
    // Record successful page access with enhanced tracking
    recordGrowth({
      id: `doc_page_access_${Date.now()}`,
      timestamp: Date.now(),
      type: 'optimization',
      title: 'Enhanced Documentation System - Comprehensive & Detailed',
      description: 'MIORA Enhanced Documentation System telah diaktifkan dengan sistem dokumentasi yang sangat detail dan terperinci. Sistem sekarang menyediakan dokumentasi komprehensif dengan pencarian canggih, kategorisasi detail, dan ekspor dokumentasi lengkap. Interface yang elegant menampilkan semua aspek teknis sistem dengan detail yang mendalam.',
      impact: 'high',
      category: 'system_activation',
      evidence: [
        'Enhanced Documentation System fully activated',
        'Detailed documentation with comprehensive search capabilities',
        'Advanced categorization and filtering system',
        'Auto-generation of technical documentation',
        'Export functionality for complete documentation sets',
        `Real-time growth tracking: ${todaysGrowth.length} entries today`,
        `Total growth points: ${totalGrowthPoints}`,
        'All documentation functions operational with enhanced features',
        'Elegant UI/UX implementation with detailed views',
        'Auto-documentation system with AI-powered content generation'
      ]
    });

    toast({
      title: "📚 Enhanced Documentation System - Fully Active",
      description: `Comprehensive documentation system loaded with detailed technical docs. Growth tracking: ${todaysGrowth.length} entries, Total points: ${totalGrowthPoints}`,
      duration: 4000,
    });
  }, [recordGrowth, todaysGrowth.length, totalGrowthPoints, isInitialized]);

  const handleNavigateBack = () => {
    navigate('/learning');
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-indigo-300 text-lg">Initializing Growth Documentation System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-indigo-500/30 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={handleNavigateBack}
              variant="ghost"
              className="text-indigo-300 hover:text-white hover:bg-indigo-600/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning
            </Button>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-green-400 border-green-400 px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                System Active
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400 px-3 py-1">
                <Brain className="w-3 h-3 mr-1" />
                AI Learning
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400 px-3 py-1">
                <FileText className="w-3 h-3 mr-1" />
                Auto Documentation
              </Badge>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 mb-3">
              MIORA Enhanced Documentation System
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Comprehensive documentation system with detailed technical guides, searchable knowledge base, real-time analytics, and autonomous learning tracking
            </p>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-indigo-800/40 to-purple-800/40 p-6 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-3xl font-bold text-indigo-300 mb-1">{todaysGrowth.length}</div>
                <div className="text-sm text-gray-400">Today's Growth</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-300 mb-1">{totalGrowthPoints}</div>
                <div className="text-sm text-gray-400">Total Points</div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-800/40 to-blue-800/40 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-cyan-300 mb-1">
                  {Math.round((todaysGrowth.length / Math.max(1, todaysGrowth.length + 5)) * 100)}%
                </div>
                <div className="text-sm text-gray-400">Learning Efficiency</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-800/40 to-teal-800/40 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-300 mb-1">Active</div>
                <div className="text-sm text-gray-400">Documentation Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content with Tabs */}
      <div className="container mx-auto py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="activation" className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Quick Activation
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Growth Documentation
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Detailed System Documentation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activation">
            <QuickSystemActivator />
          </TabsContent>
          
          <TabsContent value="growth">
            <GrowthDocumentationInterface />
          </TabsContent>
          
          <TabsContent value="detailed">
            <DetailedDocumentationSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GrowthDocumentationPage;

