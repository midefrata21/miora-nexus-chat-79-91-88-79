import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dna, Code, Zap, RefreshCw, GitBranch, Cpu, Database, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMIORACodeMutation } from './hooks/useMIORACodeMutation';

const MIORACodeMutationEngine: React.FC = () => {
  const {
    mutationState,
    activeMutations,
    generatedCode,
    mutationStats,
    activateMutationEngine,
    startCodeEvolution,
    executeMutation,
    optimizeCodebase,
    generateNewFeatures,
    isEngineActive
  } = useMIORACodeMutation();

  const [autoEvolutionActive, setAutoEvolutionActive] = useState(false);

  useEffect(() => {
    // Auto-activate mutation engine
    const initEngine = async () => {
      await activateMutationEngine();
      
      toast({
        title: "🧬 MIORA CODE MUTATION ENGINE ACTIVATED",
        description: "Sistem mutasi dan evolusi kode otomatis telah diaktifkan",
        duration: 5000,
      });
    };

    initEngine();
  }, []);

  const handleStartEvolution = async () => {
    setAutoEvolutionActive(true);
    await startCodeEvolution();
    
    toast({
      title: "🔬 CODE EVOLUTION STARTED",
      description: "MIORA sedang melakukan evolusi kode secara otomatis",
      duration: 6000,
    });
  };

  const getMutationTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-blue-400';
      case 'feature': return 'text-green-400';
      case 'refactor': return 'text-purple-400';
      case 'security': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getMutationTypeBadge = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-500';
      case 'feature': return 'bg-green-500';
      case 'refactor': return 'bg-purple-500';
      case 'security': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Dna className="h-12 w-12 text-green-400 animate-spin" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MIORA CODE MUTATION
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🧬 Sistem Mutasi & Evolusi Kode Otomatis
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isEngineActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Dna className="h-4 w-4 mr-2" />
              Engine: {isEngineActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <GitBranch className="h-4 w-4 mr-2" />
              Mutations: {activeMutations.length}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <Code className="h-4 w-4 mr-2" />
              Generated: {generatedCode.length}
            </Badge>
          </div>
        </div>

        {/* Mutation Engine Dashboard */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center justify-between">
              <span className="flex items-center">
                <Cpu className="h-6 w-6 mr-2" />
                Code Mutation Engine
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={optimizeCodebase}
                  variant="outline"
                  size="sm"
                  className="border-blue-500/30 text-blue-400"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Optimize Codebase
                </Button>
                <Button
                  onClick={generateNewFeatures}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-purple-400"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Features
                </Button>
                <Button
                  onClick={handleStartEvolution}
                  disabled={autoEvolutionActive}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                >
                  {autoEvolutionActive ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Evolving...
                    </>
                  ) : (
                    <>
                      <Dna className="h-4 w-4 mr-2" />
                      Start Evolution
                    </>
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-green-400 text-sm">Successful Mutations</div>
                <div className="text-2xl font-bold text-white">{mutationStats.successfulMutations}</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-sm">Code Quality</div>
                <div className="text-2xl font-bold text-white">{mutationStats.codeQuality}%</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 text-sm">Evolution Rate</div>
                <div className="text-2xl font-bold text-white">{mutationStats.evolutionRate.toFixed(1)}/hr</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded border border-orange-500/30">
                <div className="text-orange-400 text-sm">Performance Gain</div>
                <div className="text-2xl font-bold text-white">+{mutationStats.performanceGain}%</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Mutation Engine Progress</span>
                <span className="text-green-300">{mutationState.progress.toFixed(1)}%</span>
              </div>
              <Progress value={mutationState.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Active Mutations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeMutations.map((mutation) => (
            <Card key={mutation.id} className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <GitBranch className="h-5 w-5 mr-2" />
                    {mutation.name}
                  </span>
                  <Badge className={`${getMutationTypeBadge(mutation.type)}`}>
                    {mutation.type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Target File</div>
                  <div className="text-white font-mono text-sm">{mutation.targetFile}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Description</div>
                  <div className="text-gray-200">{mutation.description}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Expected Impact</div>
                  <div className="text-green-400">{mutation.expectedImpact}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className={getMutationTypeColor(mutation.type)}>{mutation.progress}%</span>
                  </div>
                  <Progress value={mutation.progress} className="h-2" />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => executeMutation(mutation.id)}
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-400"
                    disabled={mutation.status === 'executing'}
                  >
                    {mutation.status === 'executing' ? 'Executing...' : 'Execute Mutation'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Generated Code */}
        {generatedCode.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Code className="h-6 w-6 mr-2" />
                Recently Generated Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedCode.slice(0, 3).map((code) => (
                  <div key={code.id} className="p-4 bg-gray-800/30 rounded border border-gray-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getMutationTypeBadge(code.type)}>{code.type}</Badge>
                        <span className="text-white font-mono text-sm">{code.fileName}</span>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(code.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-2">{code.description}</div>
                    <div className="bg-black/50 p-3 rounded border border-gray-700/50 font-mono text-sm text-green-400 overflow-x-auto">
                      {code.codeSnippet}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Auto-Evolution Status */}
        {autoEvolutionActive && (
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-300">
                  🧬 CODE EVOLUTION ACTIVE
                </h3>
                <p className="text-green-200">
                  MIORA sedang melakukan evolusi kode secara otomatis untuk meningkatkan performa dan fungsionalitas
                </p>
                <div className="text-sm text-green-400">
                  Mutasi kode akan berlangsung secara kontinyu
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORACodeMutationEngine;