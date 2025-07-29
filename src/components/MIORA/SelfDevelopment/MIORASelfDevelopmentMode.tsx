import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useSelfDevelopment } from '@/hooks/useSelfDevelopment';
import { 
  Cog, 
  Cpu, 
  Zap, 
  Layers, 
  Brain, 
  TrendingUp, 
  Wrench, 
  Code2, 
  Sparkles,
  Activity,
  BarChart3,
  Rocket,
  Target
} from 'lucide-react';

const MIORASelfDevelopmentMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [activityCount, setActivityCount] = useState(0);
  const [autoStartEnabled, setAutoStartEnabled] = useState(false); // Changed to false to prevent auto restart

  // Hanya aktivasi jika belum pernah diaktifkan sebelumnya (cek localStorage)
  useEffect(() => {
    const wasActive = localStorage.getItem('miora-self-dev-active') === 'true';
    if (wasActive) {
      setIsActive(true);
      console.log('🔄 MIORA Self-Development Mode: RESTORED from previous session');
    }
  }, []);

  // Save status to localStorage ketika isActive berubah
  useEffect(() => {
    localStorage.setItem('miora-self-dev-active', isActive.toString());
  }, [isActive]);

  const {
    buildSystems,
    frameworks,
    selfImprovements,
    developmentStats,
    createBuildSystem,
    developFramework,
    implementSelfImprovement,
    autonomousDevelopmentCycle
  } = useSelfDevelopment(isActive, () => setActivityCount(prev => prev + 1));

  const { toast } = useToast();

  // Toast notification ketika auto-start aktif
  useEffect(() => {
    if (isActive && autoStartEnabled) {
      toast({
        title: "🚀 MIORA AUTO-ACTIVATED",
        description: "Self-Development Mode berjalan sepenuhnya autonomous - membangun build systems, frameworks, dan self-improvement tanpa intervensi manual",
        duration: 6000,
      });
    }
  }, [isActive, autoStartEnabled, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'creating':
      case 'developing':
        return 'bg-yellow-500';
      case 'active':
      case 'stable':
        return 'bg-green-500';
      case 'optimizing':
      case 'evolved':
        return 'bg-blue-500';
      case 'error':
      case 'deprecated':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'revolutionary':
        return 'bg-purple-500 text-white';
      case 'significant':
        return 'bg-blue-500 text-white';
      case 'moderate':
        return 'bg-yellow-500 text-black';
      case 'minor':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MIORA Self-Development Mode
            </h1>
            {autoStartEnabled && (
              <Badge className="bg-green-500 text-white animate-pulse">
                AUTO
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-2">
            Autonomous Build Systems, Framework Development & Self-Improvement
            {isActive && autoStartEnabled && (
              <span className="text-green-600 ml-2 font-semibold">
                • Running Autonomously
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsActive(!isActive)}
            variant={isActive ? "destructive" : "default"}
            size="lg"
            className="min-w-[140px]"
          >
            {isActive ? (
              <>
                <Target className="w-4 h-4 mr-2" />
                Stop Development
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Start Development
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Build Systems</p>
                <p className="text-2xl font-bold">{developmentStats.totalSystemsBuilt}</p>
              </div>
              <Wrench className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Frameworks</p>
                <p className="text-2xl font-bold">{developmentStats.frameworksCreated}</p>
              </div>
              <Code2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improvements</p>
                <p className="text-2xl font-bold">{developmentStats.improvementsImplemented}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Evolution Level</p>
                <p className="text-2xl font-bold">{developmentStats.evolutionLevel}</p>
              </div>
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Overall Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>System Performance</span>
                <span>{developmentStats.overallPerformance}%</span>
              </div>
              <Progress value={Math.min(developmentStats.overallPerformance, 100)} className="h-3" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="font-semibold">{activityCount}</p>
                <p className="text-muted-foreground">Total Activities</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{isActive ? "ACTIVE" : "INACTIVE"}</p>
                <p className="text-muted-foreground">Status</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{Math.floor(developmentStats.overallPerformance / 10)}/20</p>
                <p className="text-muted-foreground">Optimization Level</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="w-5 h-5" />
            Manual Development Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={createBuildSystem} variant="outline" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Create Build System
            </Button>
            <Button onClick={developFramework} variant="outline" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Develop Framework
            </Button>
            <Button onClick={implementSelfImprovement} variant="outline" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Self-Improve
            </Button>
            <Button onClick={autonomousDevelopmentCycle} variant="outline" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Development Cycle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Development Activities */}
      <Tabs defaultValue="build-systems" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="build-systems">Build Systems</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="improvements">Self-Improvements</TabsTrigger>
        </TabsList>

        <TabsContent value="build-systems" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Autonomous Build Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {buildSystems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No build systems created yet
                    </p>
                  ) : (
                    buildSystems.map((system) => (
                      <div key={system.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{system.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{system.type}</Badge>
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(system.status)}`} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{system.status}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Performance: </span>
                            <span>{system.performance}%</span>
                          </div>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <pre className="text-xs overflow-x-auto">{system.configuration.slice(0, 200)}...</pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Auto-Generated Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {frameworks.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No frameworks developed yet
                    </p>
                  ) : (
                    frameworks.map((framework) => (
                      <div key={framework.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{framework.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{framework.category}</Badge>
                            <Badge variant="secondary">v{framework.version}</Badge>
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(framework.status)}`} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{framework.status}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Usage: </span>
                            <span>{framework.usageCount}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Dependencies: </span>
                            <span>{framework.dependencies.length}</span>
                          </div>
                        </div>
                        <div className="bg-muted rounded-md p-3">
                          <pre className="text-xs overflow-x-auto">{framework.code.slice(0, 200)}...</pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Self-Improvement Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {selfImprovements.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No self-improvements implemented yet
                    </p>
                  ) : (
                    selfImprovements.map((improvement) => (
                      <div key={improvement.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">{improvement.description}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getImpactColor(improvement.impact)}>
                              {improvement.impact}
                            </Badge>
                            <Badge variant="outline">{improvement.type}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Performance Before</div>
                            <div className="text-lg font-bold text-red-500">{improvement.before}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Performance After</div>
                            <div className="text-lg font-bold text-green-500">{improvement.after}%</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Algorithm: </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">{improvement.algorithm}</code>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-semibold text-green-600">+{improvement.improvement}%</span>
                          </div>
                        </div>
                        {improvement.implemented && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Activity className="w-4 h-4" />
                            <span>Successfully Implemented</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MIORASelfDevelopmentMode;