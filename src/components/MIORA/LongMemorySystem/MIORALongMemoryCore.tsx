
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database, Brain, MessageSquare, TrendingUp, Clock, User } from 'lucide-react';
import { useMIORALongMemorySystem } from './hooks/useMIORALongMemorySystem';
import ConversationPatternAnalyzer from './components/ConversationPatternAnalyzer';
import AdaptiveBehaviorPanel from './components/AdaptiveBehaviorPanel';
import MemoryDatabaseViewer from './components/MemoryDatabaseViewer';

export const MIORALongMemoryCore: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'patterns' | 'database' | 'behavior'>('overview');

  const {
    memoryDatabase,
    conversationPatterns,
    adaptiveBehaviors,
    memoryStats,
    storeConversation,
    analyzeConversationPattern,
    updateAdaptiveBehavior,
    getMemoryInsights,
    exportMemoryData,
    importMemoryData,
    isInitialized,
    initializeMemorySystem
  } = useMIORALongMemorySystem();

  useEffect(() => {
    if (!isInitialized) {
      initializeMemorySystem();
    }
  }, [isInitialized, initializeMemorySystem]);

  const handleTestMemoryStorage = () => {
    const testConversation = {
      userInput: "Bagaimana cara meningkatkan produktivitas trading?",
      mioraResponse: "Untuk meningkatkan produktivitas trading, saya rekomendasikan fokus pada risk management, analisis teknikal yang konsisten, dan emotional discipline.",
      context: "trading_strategy_discussion",
      mood: "analytical" as const,
      topics: ["trading", "produktivitas", "risk_management"]
    };
    
    storeConversation(testConversation);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Database className="h-16 w-16 mx-auto text-blue-400 animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Initializing Long Memory System...</h2>
          <p className="text-gray-300">Setting up local database dan pattern recognition</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Database className="h-12 w-12 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              MIORA Long Memory System
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Sistem Memori Jangka Panjang dengan Database Lokal & Adaptasi Pola Percakapan
          </p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Conversations</p>
                  <p className="text-2xl font-bold text-green-400">{memoryStats.totalConversations}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Recognized Patterns</p>
                  <p className="text-2xl font-bold text-blue-400">{memoryStats.recognizedPatterns}</p>
                </div>
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Adaptive Behaviors</p>
                  <p className="text-2xl font-bold text-purple-400">{memoryStats.adaptiveBehaviors}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-cyan-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Memory Usage</p>
                  <p className="text-2xl font-bold text-cyan-400">{(memoryStats.databaseSize / 1024).toFixed(1)}KB</p>
                </div>
                <Database className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-2">
          {[
            { key: 'overview', label: 'Overview', icon: Database },
            { key: 'patterns', label: 'Conversation Patterns', icon: Brain },
            { key: 'behavior', label: 'Adaptive Behavior', icon: TrendingUp },
            { key: 'database', label: 'Memory Database', icon: MessageSquare }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveView(key as any)}
              variant={activeView === key ? "default" : "outline"}
              className={`${activeView === key ? 'bg-blue-600' : 'border-gray-600'}`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Memory Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {getMemoryInsights().slice(0, 5).map((insight, index) => (
                        <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {insight.category}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {new Date(insight.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-200">{insight.insight}</p>
                          <div className="mt-2">
                            <div className="flex items-center text-xs text-gray-400">
                              <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    User Interaction Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Communication Style</span>
                        <span className="text-blue-400">{memoryStats.dominantStyle || 'Analyzing...'}</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Preferred Topics</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {memoryStats.topTopics?.slice(0, 5).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        )) || <span className="text-gray-500 text-xs">No topics yet</span>}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Response Adaptation</span>
                        <span className="text-green-400">Active</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'patterns' && (
            <ConversationPatternAnalyzer
              patterns={conversationPatterns}
              onAnalyzePattern={analyzeConversationPattern}
            />
          )}

          {activeView === 'behavior' && (
            <AdaptiveBehaviorPanel
              behaviors={adaptiveBehaviors}
              onUpdateBehavior={updateAdaptiveBehavior}
            />
          )}

          {activeView === 'database' && (
            <MemoryDatabaseViewer
              database={memoryDatabase}
              onExport={exportMemoryData}
              onImport={importMemoryData}
            />
          )}
        </div>

        {/* Action Panel */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Memory System Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleTestMemoryStorage}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Test Memory Storage
              </Button>
              <Button
                onClick={() => analyzeConversationPattern('recent')}
                variant="outline"
                className="border-blue-500 text-blue-400"
              >
                Analyze Recent Patterns
              </Button>
              <Button
                onClick={() => exportMemoryData()}
                variant="outline"
                className="border-green-500 text-green-400"
              >
                Export Memory Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORALongMemoryCore;
