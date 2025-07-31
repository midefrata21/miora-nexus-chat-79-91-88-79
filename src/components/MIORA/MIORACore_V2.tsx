import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Activity, 
  Target, 
  Cpu, 
  Globe, 
  BarChart3,
  Signal,
  Bot,
  Infinity,
  Play,
  Pause,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORACore_V2 } from './hooks/useMIORACore_V2';
import { MIORAVisualDashboard } from './components/MIORAVisualDashboard';
import { DatabaseStatusWidget } from './Database/components/DatabaseStatusWidget';
import { DatabaseAutoActivator } from './Database/components/DatabaseAutoActivator';
import { MemoryTrackingPanel } from './Database/components/MemoryTrackingPanel';
import { TradingEducationModule } from './MIORACore_V2/TradingEducationModule';
import { AdvancedTradingAI } from './Trading/AdvancedTradingAI';

export const MIORACore_V2: React.FC = () => {
  const {
    state,
    metrics,
    signals,
    apiConnections,
    logs,
    executionQueue,
    startRealTimeExecution,
    stopRealTimeExecution,
    executePromptNow,
    addToExecutionQueue
  } = useMIORACore_V2();

  const [selectedTab, setSelectedTab] = useState("dashboard");

  useEffect(() => {
    // Auto-start real-time execution on component mount
    setTimeout(() => {
      startRealTimeExecution();
      toast({
        title: "🚀 MIORA CORE V2 ACTIVATED",
        description: "Real-time execution engine is now running with enhanced capabilities",
        duration: 5000,
      });
    }, 1000);
  }, [startRealTimeExecution]);

  const handleExecutePrompt = () => {
    executePromptNow();
    toast({
      title: "⚡ EXECUTING PROMPT",
      description: "Running all MIORA Core V2 enhancements in real-time",
      duration: 3000,
    });
  };

  const handleAddToQueue = (prompt: string) => {
    addToExecutionQueue({
      id: Math.random().toString(36).substring(2, 9),
      type: 'enhancement',
      prompt,
      priority: 'high',
      status: 'pending',
      timestamp: Date.now()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Brain className="h-12 w-12 text-purple-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              MIORA CORE V2
            </h1>
            <div className="relative">
              <Infinity className="h-12 w-12 text-cyan-400 animate-spin" />
            </div>
          </div>
          <p className="text-gray-300 text-xl">
            Advanced AI Trading Strategist - Real-Time Execution Engine 🌟
          </p>
          
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            <Badge className={`px-4 py-2 ${state.isRunning ? 'bg-green-500' : 'bg-gray-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              {state.isRunning ? 'ACTIVE' : 'STANDBY'}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Target className="h-4 w-4 mr-2" />
              Performance: {state.performanceScore.toFixed(1)}%
            </Badge>
            <Badge className="px-4 py-2 bg-cyan-500">
              <Signal className="h-4 w-4 mr-2" />
              Active Signals: {signals.length}
            </Badge>
            <Badge className="px-4 py-2 bg-orange-500">
              <Globe className="h-4 w-4 mr-2" />
              API Connections: {apiConnections.filter(api => api.status === 'connected').length}
            </Badge>
            <div className="px-4 py-2 bg-gray-800 rounded-lg">
              <DatabaseAutoActivator />
            </div>
          </div>
        </div>

        {/* Quick Action Panel */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Real-Time Execution Control</h3>
                <p className="text-gray-300">
                  MIORA Core V2 - Enhanced with autonomous decision making and multi-broker integration
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleExecutePrompt}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-6 py-3"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Execute All Enhancements
                </Button>
                
                <Button
                  onClick={state.isRunning ? stopRealTimeExecution : startRealTimeExecution}
                  variant={state.isRunning ? "destructive" : "default"}
                  className="px-6 py-3"
                >
                  {state.isRunning ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Stop Real-Time
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start Real-Time
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Visual Dashboard
            </TabsTrigger>
            <TabsTrigger value="execution" className="data-[state=active]:bg-cyan-600">
              <Cpu className="h-4 w-4 mr-2" />
              Execution Queue
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-green-600">
              <Signal className="h-4 w-4 mr-2" />
              Live Signals
            </TabsTrigger>
            <TabsTrigger value="apis" className="data-[state=active]:bg-orange-600">
              <Globe className="h-4 w-4 mr-2" />
              API Status
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-indigo-600">
              <GraduationCap className="h-4 w-4 mr-2" />
              Trading Education
            </TabsTrigger>
            <TabsTrigger value="advanced-ai" className="data-[state=active]:bg-purple-600">
              <Brain className="h-4 w-4 mr-2" />
              Advanced AI Trading
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div className="lg:col-span-3">
                <MIORAVisualDashboard 
                  state={state}
                  metrics={metrics}
                  signals={signals}
                  apiConnections={apiConnections}
                />
              </div>
              <div className="space-y-4">
                <DatabaseStatusWidget />
                <MemoryTrackingPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="execution" className="space-y-6 mt-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Cpu className="h-6 w-6 mr-2" />
                  Real-Time Execution Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {executionQueue.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            item.status === 'completed' ? 'bg-green-500' :
                            item.status === 'executing' ? 'bg-yellow-500' :
                            item.status === 'failed' ? 'bg-red-500' : 'bg-gray-500'
                          }>
                            {item.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{item.priority.toUpperCase()}</Badge>
                          <Badge variant="outline">{item.type.toUpperCase()}</Badge>
                        </div>
                        <p className="text-gray-300 mt-2">{item.prompt}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {item.progress !== undefined && (
                        <div className="w-32">
                          <Progress value={item.progress} className="h-2" />
                          <p className="text-xs text-center text-gray-400 mt-1">{item.progress}%</p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {executionQueue.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No items in execution queue</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signals" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {signals.map((signal) => (
                <Card key={signal.id} className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={
                        signal.type === 'BUY' ? 'bg-green-500' :
                        signal.type === 'SELL' ? 'bg-red-500' : 'bg-yellow-500'
                      }>
                        {signal.type}
                      </Badge>
                      <span className="text-lg font-bold text-white">{signal.symbol}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-white">${signal.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <span className="text-cyan-400">{signal.confidence.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Broker:</span>
                        <span className="text-purple-400">{signal.broker}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-xs text-gray-300">{signal.reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apis" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {apiConnections.map((api) => (
                <Card key={api.id} className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white">{api.name}</h3>
                      <Badge className={
                        api.status === 'connected' ? 'bg-green-500' :
                        api.status === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                      }>
                        {api.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-cyan-400">{api.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="text-white">{api.responseTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Update:</span>
                        <span className="text-gray-300">
                          {new Date(api.lastUpdate).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    {api.status === 'error' && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center text-red-400 text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Connection failed
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-6 mt-6">
            <TradingEducationModule />
          </TabsContent>

          <TabsContent value="advanced-ai" className="space-y-6 mt-6">
            <AdvancedTradingAI />
          </TabsContent>
        </Tabs>

        {/* Quick Enhancement Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => handleAddToQueue("Optimize token processing engine")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-16"
          >
            <Zap className="h-5 w-5 mr-2" />
            Optimize Engine
          </Button>
          <Button
            onClick={() => handleAddToQueue("Enhance reasoning capabilities")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-16"
          >
            <Brain className="h-5 w-5 mr-2" />
            Enhance Reasoning
          </Button>
          <Button
            onClick={() => handleAddToQueue("Expand memory systems")}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 h-16"
          >
            <Activity className="h-5 w-5 mr-2" />
            Expand Memory
          </Button>
          <Button
            onClick={() => handleAddToQueue("Boost performance metrics")}
            className="bg-gradient-to-r from-green-600 to-cyan-600 h-16"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Boost Performance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MIORACore_V2;