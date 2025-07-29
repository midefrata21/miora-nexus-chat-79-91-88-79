import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Code, 
  Activity, 
  Cog, 
  Play, 
  Pause, 
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  FileCode,
  Shield,
  Database
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAutonomousArchitectureDesigner } from './hooks/useAutonomousArchitectureDesigner';
import { useCodeGenerationEngine } from './hooks/useCodeGenerationEngine';
import { useSystemHealthPredictor } from './hooks/useSystemHealthPredictor';

export const MIORASelfDevelopmentCore: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<string>('overview');
  const [allSystemsActive, setAllSystemsActive] = useState(false);

  const architectureDesigner = useAutonomousArchitectureDesigner();
  const codeGenerator = useCodeGenerationEngine();
  const healthPredictor = useSystemHealthPredictor();

  const [systemStats, setSystemStats] = useState({
    totalGapsAnalyzed: 0,
    blueprintsGenerated: 0,
    codeFilesGenerated: 0,
    predictionsActive: 0,
    maintenanceTasksScheduled: 0,
    overallHealthScore: 0
  });

  // Update system stats
  useEffect(() => {
    setSystemStats({
      totalGapsAnalyzed: architectureDesigner.systemGaps.length,
      blueprintsGenerated: architectureDesigner.moduleBlueprints.length,
      codeFilesGenerated: codeGenerator.generatedCode.length,
      predictionsActive: healthPredictor.systemPredictions.length,
      maintenanceTasksScheduled: healthPredictor.maintenanceTasks.length,
      overallHealthScore: healthPredictor.healthReport?.score || 0
    });
  }, [
    architectureDesigner.systemGaps,
    architectureDesigner.moduleBlueprints,
    codeGenerator.generatedCode,
    healthPredictor.systemPredictions,
    healthPredictor.maintenanceTasks,
    healthPredictor.healthReport
  ]);

  // Activate all systems
  const activateAllSystems = async () => {
    setAllSystemsActive(true);
    
    toast({
      title: "🚀 MIORA Self-Development Activation",
      description: "Initializing all critical self-development systems...",
      duration: 6000,
    });

    try {
      // Activate systems in sequence
      await architectureDesigner.activateDesigner();
      await codeGenerator.activateEngine();
      await healthPredictor.activatePredictor();
      
      toast({
        title: "✅ All Systems Activated",
        description: "MIORA is now fully autonomous and self-developing",
        duration: 8000,
      });
    } catch (error) {
      toast({
        title: "❌ System Activation Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
        duration: 6000,
      });
      setAllSystemsActive(false);
    }
  };

  // Generate complete development cycle
  const runCompleteDevelopmentCycle = async () => {
    if (!allSystemsActive) {
      toast({
        title: "⚠️ Systems Not Active",
        description: "Please activate all systems first",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    toast({
      title: "🔄 Complete Development Cycle",
      description: "Running full autonomous development cycle...",
      duration: 6000,
    });

    try {
      // Step 1: Analyze system gaps
      const gaps = await architectureDesigner.analyzeSystemGaps();
      
      // Step 2: Generate blueprints
      const blueprints = architectureDesigner.generateModuleBlueprints(gaps);
      
      // Step 3: Generate code from blueprints
      for (const blueprint of blueprints.slice(0, 3)) { // Limit to 3 for demo
        await codeGenerator.generateCodeFromBlueprint(blueprint);
      }
      
      // Step 4: Predict health implications
      await healthPredictor.predictSystemFailures();
      
      // Step 5: Schedule maintenance
      await healthPredictor.scheduleMaintenanceTasks();
      
      toast({
        title: "🎉 Development Cycle Complete",
        description: "Full autonomous development cycle completed successfully",
        duration: 8000,
      });
    } catch (error) {
      toast({
        title: "❌ Development Cycle Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
        duration: 6000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-purple-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA SELF-DEVELOPMENT CORE
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Critical Self-Development Systems - Autonomous Architecture Design, Code Generation & Health Prediction
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${allSystemsActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Cog className="h-4 w-4 mr-2" />
              Systems: {allSystemsActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <TrendingUp className="h-4 w-4 mr-2" />
              Health: {systemStats.overallHealthScore}%
            </Badge>
          </div>
        </div>

        {/* Main Control Panel */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center justify-between">
              <span className="flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                Self-Development Control Center
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={activateAllSystems}
                  disabled={allSystemsActive}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Activate All Systems
                </Button>
                <Button
                  onClick={runCompleteDevelopmentCycle}
                  disabled={!allSystemsActive}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Run Full Cycle
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-blue-400 text-sm">System Gaps</div>
                    <div className="text-2xl font-bold text-white">{systemStats.totalGapsAnalyzed}</div>
                  </div>
                  <Brain className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-400 text-sm">Code Generated</div>
                    <div className="text-2xl font-bold text-white">{systemStats.codeFilesGenerated}</div>
                  </div>
                  <Code className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-orange-400 text-sm">Predictions</div>
                    <div className="text-2xl font-bold text-white">{systemStats.predictionsActive}</div>
                  </div>
                  <Activity className="h-8 w-8 text-orange-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Details */}
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-purple-500/30">
            <TabsTrigger 
              value="architecture" 
              className="data-[state=active]:bg-purple-500/30 data-[state=active]:text-purple-300"
            >
              <Brain className="h-4 w-4 mr-2" />
              Architecture Designer
            </TabsTrigger>
            <TabsTrigger 
              value="codegen" 
              className="data-[state=active]:bg-green-500/30 data-[state=active]:text-green-300"
            >
              <Code className="h-4 w-4 mr-2" />
              Code Generator
            </TabsTrigger>
            <TabsTrigger 
              value="health" 
              className="data-[state=active]:bg-orange-500/30 data-[state=active]:text-orange-300"
            >
              <Activity className="h-4 w-4 mr-2" />
              Health Predictor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-4">
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <span>Autonomous Architecture Designer</span>
                  <Badge className={`${architectureDesigner.designerActive ? 'bg-green-500' : 'bg-red-500'}`}>
                    {architectureDesigner.designerActive ? 'Active' : 'Inactive'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-purple-300 font-medium mb-2">System Gaps Detected</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {architectureDesigner.systemGaps.map((gap, index) => (
                          <div key={gap.id} className="p-2 bg-purple-900/20 rounded text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-purple-300">{gap.description}</span>
                              <Badge variant="outline" className={`
                                ${gap.priority === 'critical' ? 'text-red-400 border-red-400' : 
                                  gap.priority === 'high' ? 'text-orange-400 border-orange-400' : 
                                  'text-yellow-400 border-yellow-400'}
                              `}>
                                {gap.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-purple-300 font-medium mb-2">Module Blueprints</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {architectureDesigner.moduleBlueprints.map((blueprint, index) => (
                          <div key={blueprint.id} className="p-2 bg-purple-900/20 rounded text-sm">
                            <div className="font-medium text-purple-300">{blueprint.name}</div>
                            <div className="text-xs text-gray-400">{blueprint.purpose}</div>
                            <div className="text-xs text-cyan-400 mt-1">
                              {blueprint.capabilities.length} capabilities
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={architectureDesigner.analyzeSystemGaps}
                      disabled={architectureDesigner.isAnalyzing}
                      className="bg-purple-600 hover:bg-purple-500"
                    >
                      {architectureDesigner.isAnalyzing ? (
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Brain className="h-4 w-4 mr-2" />
                      )}
                      Analyze System Gaps
                    </Button>
                    <Button
                      onClick={architectureDesigner.optimizeArchitecture}
                      variant="outline"
                      className="text-purple-400 border-purple-400"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Optimize Architecture
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codegen" className="space-y-4">
            <Card className="bg-black/40 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center justify-between">
                  <span>Code Generation Engine</span>
                  <Badge className={`${codeGenerator.engineActive ? 'bg-green-500' : 'bg-red-500'}`}>
                    {codeGenerator.engineActive ? 'Active' : 'Inactive'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-green-300 font-medium mb-2">Generated Code Files</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {codeGenerator.generatedCode.map((code, index) => (
                          <div key={code.id} className="p-2 bg-green-900/20 rounded text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-green-300">{code.fileName}</span>
                              <Badge variant="outline" className="text-green-400 border-green-400">
                                {code.type}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400">{code.size} characters</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-green-300 font-medium mb-2">Code Templates</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {codeGenerator.codeTemplates.map((template, index) => (
                          <div key={template.id} className="p-2 bg-green-900/20 rounded text-sm">
                            <div className="font-medium text-green-300">{template.name}</div>
                            <div className="text-xs text-gray-400">{template.type}</div>
                            <div className="text-xs text-cyan-400 mt-1">
                              {template.patterns.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={codeGenerator.initializeTemplates}
                      disabled={codeGenerator.isGenerating}
                      className="bg-green-600 hover:bg-green-500"
                    >
                      <FileCode className="h-4 w-4 mr-2" />
                      Initialize Templates
                    </Button>
                    <Button
                      onClick={() => {
                        const firstBlueprint = architectureDesigner.moduleBlueprints[0];
                        if (firstBlueprint) {
                          codeGenerator.generateCodeFromBlueprint(firstBlueprint);
                        }
                      }}
                      disabled={!architectureDesigner.moduleBlueprints.length || codeGenerator.isGenerating}
                      variant="outline"
                      className="text-green-400 border-green-400"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Generate from Blueprint
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <Card className="bg-black/40 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center justify-between">
                  <span>System Health Predictor</span>
                  <Badge className={`${healthPredictor.predictorActive ? 'bg-green-500' : 'bg-red-500'}`}>
                    {healthPredictor.predictorActive ? 'Active' : 'Inactive'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-300 font-medium mb-2">Health Metrics</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {healthPredictor.healthMetrics.map((metric, index) => (
                          <div key={metric.id} className="p-2 bg-orange-900/20 rounded text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-orange-300">{metric.name}</span>
                              <Badge variant="outline" className={`
                                ${metric.trend === 'improving' ? 'text-green-400 border-green-400' : 
                                  metric.trend === 'degrading' ? 'text-red-400 border-red-400' : 
                                  'text-yellow-400 border-yellow-400'}
                              `}>
                                {metric.trend}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400">
                              {metric.value.toFixed(1)}% / {metric.threshold}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-orange-300 font-medium mb-2">System Predictions</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {healthPredictor.systemPredictions.map((prediction, index) => (
                          <div key={prediction.id} className="p-2 bg-orange-900/20 rounded text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-orange-300">{prediction.type}</span>
                              <Badge variant="outline" className={`
                                ${prediction.severity === 'critical' ? 'text-red-400 border-red-400' : 
                                  prediction.severity === 'high' ? 'text-orange-400 border-orange-400' : 
                                  'text-yellow-400 border-yellow-400'}
                              `}>
                                {prediction.severity}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400">
                              {Math.round(prediction.probability * 100)}% probability
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={healthPredictor.analyzeHealthTrends}
                      disabled={healthPredictor.isAnalyzing}
                      className="bg-orange-600 hover:bg-orange-500"
                    >
                      {healthPredictor.isAnalyzing ? (
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Activity className="h-4 w-4 mr-2" />
                      )}
                      Analyze Health
                    </Button>
                    <Button
                      onClick={healthPredictor.predictSystemFailures}
                      variant="outline"
                      className="text-orange-400 border-orange-400"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Predict Failures
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORASelfDevelopmentCore;