import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Code, 
  Cog, 
  Zap, 
  Target, 
  Search, 
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Cpu,
  BarChart,
  Layers,
  Infinity,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMetaProgrammingSystem } from './hooks/useMetaProgrammingSystem';

const MIORAMetaProgramming: React.FC = () => {
  const {
    state,
    modules,
    analysisResults,
    detectedPatterns,
    refactorTasks,
    performanceMetrics,
    activateMetaProgramming,
    deactivateMetaProgramming,
    runCodeAnalysis,
    runPatternRecognition,
    executeAutoRefactoring,
    runPerformanceOptimization,
    getSystemStats
  } = useMetaProgrammingSystem();

  const [selectedModule, setSelectedModule] = useState<string>('overview');

  // Auto-activate system on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!state.isActive) {
        activateMetaProgramming();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.isActive, activateMetaProgramming]);

  const stats = getSystemStats();

  const ModuleCard = ({ moduleKey, module, icon, color }: any) => (
    <Card className={`bg-black/40 border-${color}-500/30 hover:border-${color}-400/50 transition-all duration-300`}>
      <CardHeader>
        <CardTitle className={`text-${color}-400 flex items-center justify-between`}>
          <span className="flex items-center">
            {icon}
            <span className="ml-2">{module.name}</span>
          </span>
          <Badge className={
            module.status === 'active' ? 'bg-green-500' :
            module.status === 'analyzing' || module.status === 'learning' || 
            module.status === 'refactoring' || module.status === 'optimizing' ? 'bg-blue-500' :
            'bg-gray-500'
          }>
            {module.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className={`text-${color}-300`}>{module.progress.toFixed(1)}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>
          
          <div>
            <div className="text-sm text-gray-400 mb-2">Capabilities</div>
            <div className="flex flex-wrap gap-1">
              {module.capabilities.slice(0, 3).map((capability: string) => (
                <Badge key={capability} variant="outline" className={`text-xs text-${color}-300 border-${color}-500/30`}>
                  {capability}
                </Badge>
              ))}
              {module.capabilities.length > 3 && (
                <Badge variant="outline" className="text-xs text-gray-400">
                  +{module.capabilities.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA META-PROGRAMMING CORE
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🧠 Advanced AI Code Analysis, Pattern Recognition & Auto-Optimization System
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${state.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Meta-Programming: {state.isActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Cpu className="h-4 w-4 mr-2" />
              Modules: {stats.activeModules}/{stats.totalModules}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Target className="h-4 w-4 mr-2" />
              Quality: {stats.analysisQuality}%
            </Badge>
          </div>
        </div>

        {/* System Overview Dashboard */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <span className="flex items-center">
                <BarChart className="h-6 w-6 mr-2" />
                Meta-Programming Control Center
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={state.isActive ? deactivateMetaProgramming : activateMetaProgramming}
                  className={state.isActive ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}
                >
                  {state.isActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Analysis Quality</div>
                <div className="text-2xl font-bold text-white">{stats.analysisQuality}%</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Patterns Detected</div>
                <div className="text-2xl font-bold text-white">{stats.patternsDetected}</div>
              </div>
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Optimizations</div>
                <div className="text-2xl font-bold text-white">{stats.optimizationsComplete}</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-orange-400 text-sm">Performance Score</div>
                <div className="text-2xl font-bold text-white">{stats.performanceScore}%</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={runCodeAnalysis}
                disabled={state.analysisRunning}
                className="bg-cyan-600 hover:bg-cyan-500"
              >
                <Search className="h-4 w-4 mr-2" />
                Run Analysis
              </Button>
              
              <Button
                onClick={runPatternRecognition}
                className="bg-purple-600 hover:bg-purple-500"
              >
                <Eye className="h-4 w-4 mr-2" />
                Pattern Recognition
              </Button>
              
              <Button
                onClick={executeAutoRefactoring}
                className="bg-green-600 hover:bg-green-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Auto-Refactor
              </Button>
              
              <Button
                onClick={runPerformanceOptimization}
                className="bg-orange-600 hover:bg-orange-500"
              >
                <Zap className="h-4 w-4 mr-2" />
                Optimize Performance
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-gray-800/50">
            <TabsTrigger value="modules">AI Modules</TabsTrigger>
            <TabsTrigger value="analysis">Code Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Pattern Engine</TabsTrigger>
            <TabsTrigger value="refactoring">Auto-Refactor</TabsTrigger>
            <TabsTrigger value="performance">Performance AI</TabsTrigger>
          </TabsList>

          {/* AI Modules */}
          <TabsContent value="modules">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard 
                moduleKey="codeAnalyzer"
                module={modules.codeAnalyzer}
                icon={<Code className="h-6 w-6" />}
                color="cyan"
              />
              <ModuleCard 
                moduleKey="patternEngine"
                module={modules.patternEngine}
                icon={<Brain className="h-6 w-6" />}
                color="purple"
              />
              <ModuleCard 
                moduleKey="autoRefactor"
                module={modules.autoRefactor}
                icon={<Cog className="h-6 w-6" />}
                color="green"
              />
              <ModuleCard 
                moduleKey="performanceAI"
                module={modules.performanceAI}
                icon={<Zap className="h-6 w-6" />}
                color="orange"
              />
            </div>
          </TabsContent>

          {/* Code Analysis */}
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Code Complexity</span>
                      <span className="text-cyan-300">{analysisResults.complexity}%</span>
                    </div>
                    <Progress value={analysisResults.complexity} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Maintainability</span>
                      <span className="text-cyan-300">{analysisResults.maintainability}%</span>
                    </div>
                    <Progress value={analysisResults.maintainability} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-cyan-300">{analysisResults.performance}%</span>
                    </div>
                    <Progress value={analysisResults.performance} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Optimization Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResults.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pattern Recognition */}
          <TabsContent value="patterns">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {detectedPatterns.map((pattern) => (
                <Card key={pattern.id} className="bg-black/40 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400 text-lg">{pattern.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Frequency</span>
                        <Badge className="bg-purple-600">{pattern.frequency}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Confidence</span>
                        <span className="text-purple-300">{pattern.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Type</span>
                        <Badge className={
                          pattern.type === 'design' ? 'bg-blue-600' :
                          pattern.type === 'anti-pattern' ? 'bg-red-600' :
                          pattern.type === 'performance' ? 'bg-orange-600' :
                          'bg-gray-600'
                        }>
                          {pattern.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">{pattern.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Auto-Refactoring */}
          <TabsContent value="refactoring">
            <div className="space-y-4">
              {refactorTasks.map((task) => (
                <Card key={task.id} className="bg-black/40 border-green-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded ${
                          task.status === 'completed' ? 'bg-green-900/50' :
                          task.status === 'failed' ? 'bg-red-900/50' :
                          task.status === 'analyzing' ? 'bg-blue-900/50' :
                          'bg-gray-900/50'
                        }`}>
                          {task.status === 'completed' ? 
                            <CheckCircle className="h-5 w-5 text-green-400" /> :
                            task.status === 'failed' ?
                            <AlertTriangle className="h-5 w-5 text-red-400" /> :
                            <Cog className="h-5 w-5 text-blue-400" />
                          }
                        </div>
                        <div>
                          <div className="font-medium text-white">{task.type.replace('-', ' ').toUpperCase()}</div>
                          <div className="text-sm text-gray-400">{task.file}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={
                          task.priority === 'high' ? 'bg-red-600' :
                          task.priority === 'medium' ? 'bg-yellow-600' :
                          'bg-gray-600'
                        }>
                          {task.priority}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          Impact: {task.impact}%
                        </div>
                        <Badge className={
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'failed' ? 'bg-red-500' :
                          task.status === 'analyzing' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance AI */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-400">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Render Time</span>
                    <span className="text-orange-300">{performanceMetrics.renderTime}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Memory Usage</span>
                    <span className="text-orange-300">{performanceMetrics.memoryUsage}MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bundle Size</span>
                    <span className="text-orange-300">{performanceMetrics.bundleSize}KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Code Complexity</span>
                    <span className="text-orange-300">{performanceMetrics.codeComplexity}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-400">Optimization Score</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-orange-400 mb-2">
                      {performanceMetrics.optimizationScore}
                    </div>
                    <div className="text-orange-300">Overall Performance</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Active Status Indicator */}
        {state.isActive && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-purple-400 animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-purple-300">
                  🧠 META-PROGRAMMING SYSTEM ACTIVE
                </h3>
                <p className="text-purple-200 text-lg">
                  AI sedang menganalisis dan mengoptimalkan kode secara otomatis dengan teknologi meta-programming
                </p>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300">{stats.analysisQuality}%</div>
                    <div className="text-sm text-purple-400">Analysis Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300">{stats.patternsDetected}</div>
                    <div className="text-sm text-purple-400">Patterns Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300">{stats.optimizationsComplete}</div>
                    <div className="text-sm text-purple-400">Optimizations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300">{stats.activeModules}</div>
                    <div className="text-sm text-purple-400">Active Modules</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORAMetaProgramming;