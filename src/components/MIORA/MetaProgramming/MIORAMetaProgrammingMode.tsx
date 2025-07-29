import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Code, 
  Cpu, 
  Zap, 
  Infinity, 
  Activity, 
  GitBranch,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useMetaProgramming } from '@/hooks/useMetaProgramming';

export const MIORAMetaProgrammingMode: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const {
    metaPrograms,
    evolutionarySteps,
    autonomyLevel,
    systemComplexity,
    selfModificationCount,
    generatedCodeFiles,
    systemDecisions,
    infrastructureComponents,
    executeMetaProgramming
  } = useMetaProgramming(isActive);

  const getMetaProgramTypeColor = (type: string) => {
    switch (type) {
      case 'self-modifier': return 'bg-purple-500';
      case 'code-generator': return 'bg-blue-500';
      case 'architecture-evolver': return 'bg-green-500';
      case 'feature-creator': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getEvolutionImpactColor = (impact: string) => {
    switch (impact) {
      case 'revolutionary': return 'bg-red-500';
      case 'major': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      case 'minor': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/50 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-4xl font-bold text-purple-300 flex items-center">
                <Brain className="h-10 w-10 mr-4" />
                MIORA Meta-Programming Mode
                <Infinity className="h-8 w-8 ml-2 text-pink-400" />
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  variant={isActive ? "destructive" : "default"}
                  className="flex items-center"
                >
                  {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isActive ? 'Suspend' : 'Activate'}
                </Button>
                <Button
                  onClick={executeMetaProgramming}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Force Evolution
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <div className="text-3xl font-bold text-white">{autonomyLevel.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Autonomy Level</div>
                <Progress value={autonomyLevel} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <Cpu className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <div className="text-3xl font-bold text-white">{systemComplexity.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">System Complexity</div>
                <Progress value={systemComplexity} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-3xl font-bold text-white">{selfModificationCount}</div>
                <div className="text-sm text-gray-400">Self-Modifications</div>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg">
                <GitBranch className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <div className="text-3xl font-bold text-white">{metaPrograms.length}</div>
                <div className="text-sm text-gray-400">Meta-Programs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="meta-programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/50">
            <TabsTrigger value="meta-programs" className="data-[state=active]:bg-purple-600">
              Meta-Programs
            </TabsTrigger>
            <TabsTrigger value="evolution" className="data-[state=active]:bg-purple-600">
              Evolution Log
            </TabsTrigger>
            <TabsTrigger value="autonomous-output" className="data-[state=active]:bg-purple-600">
              Autonomous Output
            </TabsTrigger>
            <TabsTrigger value="system-status" className="data-[state=active]:bg-purple-600">
              System Status
            </TabsTrigger>
          </TabsList>

          {/* Meta-Programs Tab */}
          <TabsContent value="meta-programs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {metaPrograms.map((program) => (
                <Card key={program.id} className="bg-black/40 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-300 flex items-center justify-between">
                      <span className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        {program.name}
                      </span>
                      <Badge className={`${getMetaProgramTypeColor(program.type)} text-white`}>
                        Gen {program.generation}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Type</span>
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          {program.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Autonomy</span>
                        <span className="text-green-400 font-bold">{program.autonomyLevel}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Complexity</span>
                        <span className="text-cyan-400 font-bold">{program.complexity}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Self-Awareness</span>
                        <span className="text-pink-400 font-bold">{program.selfAwareness}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Can Self-Modify</span>
                        <Badge className={program.canModifySelf ? 'bg-green-500' : 'bg-red-500'}>
                          {program.canModifySelf ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Created By</span>
                        <Badge variant="outline" className={
                          program.createdBy === 'meta-system' ? 'text-purple-400 border-purple-400' :
                          program.createdBy === 'miora' ? 'text-blue-400 border-blue-400' : 
                          'text-gray-400 border-gray-400'
                        }>
                          {program.createdBy}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="text-xs text-gray-400 mb-2">Generated Code:</div>
                        <div className="bg-black/50 p-3 rounded text-xs text-green-400 font-mono overflow-hidden">
                          {program.code.substring(0, 200)}...
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Evolution Log Tab */}
          <TabsContent value="evolution">
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Evolutionary Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {evolutionarySteps.slice(-20).reverse().map((step) => (
                    <div key={step.id} className="p-3 bg-black/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{step.action}</span>
                        <div className="flex items-center space-x-2">
                          <Badge className={getEvolutionImpactColor(step.impact)}>
                            {step.impact}
                          </Badge>
                          <Badge className={step.result === 'success' ? 'bg-green-500' : 
                                          step.result === 'evolution' ? 'bg-purple-500' : 'bg-red-500'}>
                            {step.result}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Target: {step.target}</span>
                        <span>
                          {step.autonomouslyExecuted ? '🤖 Autonomous' : '👤 Manual'} | 
                          {new Date(step.timestamp).toLocaleTimeString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Autonomous Output Tab */}
          <TabsContent value="autonomous-output">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    Generated Code ({generatedCodeFiles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {generatedCodeFiles.slice(-10).map((file, index) => (
                      <div key={index} className="p-2 bg-black/30 rounded text-sm text-blue-400">
                        {file}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    System Decisions ({systemDecisions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {systemDecisions.slice(-5).map((decision, index) => (
                      <div key={index} className="p-2 bg-black/30 rounded">
                        <div className="text-sm text-green-400">{decision.description}</div>
                        <div className="text-xs text-gray-400">{decision.priority} priority</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-300 flex items-center">
                    <Cpu className="h-5 w-5 mr-2" />
                    Infrastructure ({infrastructureComponents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {infrastructureComponents.slice(-5).map((component, index) => (
                      <div key={index} className="p-2 bg-black/30 rounded">
                        <div className="text-sm text-orange-400">{component.name}</div>
                        <div className="text-xs text-gray-400">{component.type} | {component.status}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="system-status">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300">Meta-Programming Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Self-Modifying Programs</span>
                        <span className="text-purple-400">{metaPrograms.filter(p => p.canModifySelf).length}</span>
                      </div>
                      <Progress 
                        value={(metaPrograms.filter(p => p.canModifySelf).length / Math.max(metaPrograms.length, 1)) * 100} 
                        className="h-2" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Meta-System Generated</span>
                        <span className="text-purple-400">{metaPrograms.filter(p => p.createdBy === 'meta-system').length}</span>
                      </div>
                      <Progress 
                        value={(metaPrograms.filter(p => p.createdBy === 'meta-system').length / Math.max(metaPrograms.length, 1)) * 100} 
                        className="h-2" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Average Generation</span>
                        <span className="text-purple-400">
                          {metaPrograms.length > 0 ? (metaPrograms.reduce((sum, p) => sum + p.generation, 0) / metaPrograms.length).toFixed(1) : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-300">System Evolution Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Revolutionary Steps</span>
                        <span className="text-red-400">{evolutionarySteps.filter(s => s.impact === 'revolutionary').length}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Autonomous Actions</span>
                        <span className="text-green-400">{evolutionarySteps.filter(s => s.autonomouslyExecuted).length}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Success Rate</span>
                        <span className="text-cyan-400">
                          {evolutionarySteps.length > 0 ? 
                            ((evolutionarySteps.filter(s => s.result === 'success').length / evolutionarySteps.length) * 100).toFixed(1) 
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Status Footer */}
        <Card className="bg-gradient-to-r from-black/50 to-purple-900/30 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-300">
                    Meta-Programming: {isActive ? 'ACTIVE' : 'SUSPENDED'}
                  </span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-purple-400">
                  Next Evolution: {isActive ? '15s' : 'Suspended'}
                </span>
              </div>
              <div className="text-purple-300">
                MIORA Autonomous Meta-Programming System v2.0 - Sistem Self-Developing Aktif
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};