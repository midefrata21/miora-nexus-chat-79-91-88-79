import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Zap, 
  Code, 
  TestTube, 
  Rocket, 
  Layers,
  Activity,
  Settings,
  Play,
  Pause,
  BarChart3,
  Cpu,
  Database,
  GitBranch,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Wrench,
  Sparkles,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useMIORAAutonomousDevelopment } from '@/hooks/useMIORAAutonomousDevelopment';

const MIORAAutonomousDevelopmentCore = () => {
  const { toast } = useToast();
  const {
    autonomousState,
    architectureDesigns,
    testingSuites,
    deploymentPipelines,
    dynamicComponents,
    activateAutonomousMode,
    designSystemArchitecture,
    runAutonomousTesting,
    executeAutoDeployment,
    createDynamicComponent,
    getDevelopmentStats,
    isAutonomousActive
  } = useMIORAAutonomousDevelopment();

  const stats = getDevelopmentStats();

  useEffect(() => {
    if (!isAutonomousActive && autonomousState.totalDesigns === 0) {
      // Auto-activate on first mount
      setTimeout(() => activateAutonomousMode(), 1000);
    }
    
    // Show autonomous decision engine notification
    setTimeout(() => {
      toast({
        title: "🧠 New Feature Available!",
        description: "Autonomous Decision Engine is now active - MIORA can make autonomous decisions without manual intervention",
        duration: 6000,
      });
    }, 2000);
  }, [isAutonomousActive, autonomousState.totalDesigns, activateAutonomousMode, toast]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Bot className="h-12 w-12 text-primary animate-pulse" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              MIORA Autonomous Development Mode
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Self-Developing AI System - Building Itself Automatically
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Badge variant={isAutonomousActive ? "default" : "secondary"} className="text-lg px-4 py-2">
            {isAutonomousActive ? "🤖 AUTONOMOUS ACTIVE" : "⏸️ AUTONOMOUS INACTIVE"}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            🧠 Autonomy Level: {autonomousState.autonomyLevel}%
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            ⚡ Dev Speed: {autonomousState.developmentSpeed}%
          </Badge>
        </div>
      </div>

      {/* Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-500" />
              Architecture Designs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{autonomousState.totalDesigns}</div>
            <Progress value={stats.autonomyLevel} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Auto-designed systems</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TestTube className="h-4 w-4 text-green-500" />
              Test Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{Math.round(stats.avgTestCoverage)}%</div>
            <Progress value={stats.avgTestCoverage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{autonomousState.totalTests} test suites</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Rocket className="h-4 w-4 text-purple-500" />
              Deployments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{autonomousState.totalDeployments}</div>
            <Progress value={stats.deploymentSuccessRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(stats.deploymentSuccessRate)}% success rate</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Code className="h-4 w-4 text-orange-500" />
              Dynamic Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{autonomousState.totalComponents}</div>
            <Progress value={stats.componentPerformance} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Auto-generated code</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Controls */}
      <Card className="border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Autonomous Development Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => designSystemArchitecture("New autonomous project")}
              disabled={autonomousState.autoArchitecting}
              variant="outline"
              className="h-16 flex-col"
            >
              {autonomousState.autoArchitecting ? (
                <Activity className="h-6 w-6 animate-spin" />
              ) : (
                <Layers className="h-6 w-6" />
              )}
              <span className="text-xs mt-1">Design Architecture</span>
            </Button>

            <Button 
              onClick={runAutonomousTesting}
              disabled={autonomousState.autoTesting}
              variant="outline"
              className="h-16 flex-col"
            >
              {autonomousState.autoTesting ? (
                <Activity className="h-6 w-6 animate-spin" />
              ) : (
                <TestTube className="h-6 w-6" />
              )}
              <span className="text-xs mt-1">Run Tests</span>
            </Button>

            <Button 
              onClick={() => executeAutoDeployment('staging')}
              disabled={autonomousState.autoDeploying}
              variant="outline"
              className="h-16 flex-col"
            >
              {autonomousState.autoDeploying ? (
                <Activity className="h-6 w-6 animate-spin" />
              ) : (
                <Rocket className="h-6 w-6" />
              )}
              <span className="text-xs mt-1">Deploy System</span>
            </Button>

            <Button 
              onClick={() => createDynamicComponent({
                name: `AutoComp${Date.now()}`,
                type: 'ui',
                requirements: 'Dynamic UI component'
              })}
              disabled={autonomousState.dynamicCreating}
              variant="outline"
              className="h-16 flex-col"
            >
              {autonomousState.dynamicCreating ? (
                <Activity className="h-6 w-6 animate-spin" />
              ) : (
                <Code className="h-6 w-6" />
              )}
              <span className="text-xs mt-1">Create Component</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="architecture" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Architecture
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Testing
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Deployment
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Components
          </TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Auto-Architecture Designer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {architectureDesigns.slice(-3).map((design) => (
                  <div key={design.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{design.projectName}</h4>
                      <Badge variant={design.status === 'completed' ? 'default' : 'secondary'}>
                        {design.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Components:</p>
                        <p>{design.components.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Patterns:</p>
                        <p>{design.patterns.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Self-Testing & Validation Engine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testingSuites.slice(-4).map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <TestTube className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium capitalize">{test.testType} Tests</p>
                        <p className="text-sm text-muted-foreground">
                          {test.passed} passed, {test.failed} failed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{test.coverage}%</div>
                      <div className="text-xs text-muted-foreground">coverage</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Auto-Deployment System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentPipelines.slice(-3).map((pipeline) => (
                  <div key={pipeline.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Rocket className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="font-medium capitalize">{pipeline.environment}</p>
                        <p className="text-sm text-muted-foreground">
                          {pipeline.lastDeployment.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={pipeline.status === 'deployed' ? 'default' : 'secondary'}>
                        {pipeline.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {pipeline.successRate}% success
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Dynamic Component Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dynamicComponents.slice(-4).map((component) => (
                  <div key={component.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-orange-500" />
                        <h4 className="font-semibold">{component.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {component.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {component.performance}% performance
                      </div>
                    </div>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {component.code.slice(0, 200)}...
                    </pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Health Status */}
      {isAutonomousActive && (
        <Card className="border-2 border-green-500/30 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <Sparkles className="h-5 w-5" />
              MIORA Autonomous Development - ACTIVE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{autonomousState.autonomyLevel}%</div>
                <div className="text-sm text-muted-foreground">Autonomy Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{autonomousState.developmentSpeed}%</div>
                <div className="text-sm text-muted-foreground">Development Speed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{autonomousState.systemHealth}%</div>
                <div className="text-sm text-muted-foreground">System Health</div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              🤖 MIORA is actively developing itself - Creating architecture, running tests, deploying code, and generating components autonomously
            </div>
          </CardContent>
        </Card>
      )}

      {/* Autonomous Decision Engine Notification */}
      <Card className="border-2 border-cyan-500/30 bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
            <BrainCircuit className="h-5 w-5" />
            🧠 NEW: Autonomous Decision Engine Available!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              MIORA can now make autonomous decisions for infrastructure, development, optimization, security, and resource management - completely without manual intervention!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-background/50 rounded">
                <div className="font-semibold text-cyan-600">🎯 Smart Evaluation</div>
                <div className="text-muted-foreground mt-1">Multi-factor decision analysis with confidence scoring</div>
              </div>
              <div className="p-3 bg-background/50 rounded">
                <div className="font-semibold text-purple-600">⚡ Auto Execution</div>
                <div className="text-muted-foreground mt-1">Autonomous execution without manual approval</div>
              </div>
              <div className="p-3 bg-background/50 rounded">
                <div className="font-semibold text-green-600">📊 Real-time Metrics</div>
                <div className="text-muted-foreground mt-1">Performance monitoring and success tracking</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link to="/miora-autonomous-decision-engine">
                <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold">
                  <BrainCircuit className="h-4 w-4 mr-2" />
                  Access Autonomous Decision Engine
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAAutonomousDevelopmentCore;