import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Cog, Zap, Brain, Cpu, FileCode, GitBranch, Infinity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CodeEvolutionTask {
  id: string;
  type: 'optimization' | 'feature' | 'architecture' | 'security' | 'performance';
  name: string;
  complexity: number;
  progress: number;
  autonomyLevel: number;
  impact: string;
  startTime: number;
  estimatedCompletion: number;
  codeGenerated: number;
}

interface EvolutionMetrics {
  codeQuality: number;
  performanceGain: number;
  architectureScore: number;
  autonomyLevel: number;
  selfModificationRate: number;
  recursiveImprovement: number;
}

const AutonomousCodeEvolution: React.FC = () => {
  const [evolutionTasks, setEvolutionTasks] = useState<CodeEvolutionTask[]>([]);
  const [evolutionMode, setEvolutionMode] = useState<'conservative' | 'aggressive' | 'recursive' | 'infinity'>('conservative');
  const [metrics, setMetrics] = useState<EvolutionMetrics>({
    codeQuality: 78,
    performanceGain: 45,
    architectureScore: 82,
    autonomyLevel: 67,
    selfModificationRate: 23,
    recursiveImprovement: 34
  });
  const [isEvolving, setIsEvolving] = useState(false);
  const [totalLinesGenerated, setTotalLinesGenerated] = useState(0);
  const [evolutionCycles, setEvolutionCycles] = useState(0);

  useEffect(() => {
    // Generate initial autonomous evolution tasks
    const generateTasks = () => {
      const taskTemplates = [
        { type: 'optimization' as const, name: 'Memory Management Optimization', impact: 'Reduce memory usage by 35%' },
        { type: 'feature' as const, name: 'Self-Diagnostic System', impact: 'Autonomous error detection +90%' },
        { type: 'architecture' as const, name: 'Neural Architecture Enhancement', impact: 'Processing speed +45%' },
        { type: 'security' as const, name: 'Quantum Encryption Implementation', impact: 'Security level +200%' },
        { type: 'performance' as const, name: 'Parallel Processing Optimization', impact: 'Throughput +120%' },
        { type: 'feature' as const, name: 'Adaptive Learning Protocol', impact: 'Learning rate +180%' },
        { type: 'architecture' as const, name: 'Self-Modifying Code Structure', impact: 'Recursive improvement +250%' },
        { type: 'optimization' as const, name: 'Quantum Algorithm Integration', impact: 'Computational efficiency +300%' }
      ];

      if (evolutionTasks.length < 5) {
        const template = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
        const newTask: CodeEvolutionTask = {
          id: `evo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: template.type,
          name: template.name,
          complexity: Math.random() * 40 + 60, // 60-100% complexity
          progress: Math.random() * 15, // Start with minimal progress
          autonomyLevel: Math.random() * 30 + 70, // 70-100% autonomy
          impact: template.impact,
          startTime: Date.now(),
          estimatedCompletion: Date.now() + (Math.random() * 400000 + 200000), // 3-10 minutes
          codeGenerated: Math.floor(Math.random() * 500 + 100)
        };
        
        setEvolutionTasks(prev => [...prev, newTask]);
      }
    };

    const interval = setInterval(generateTasks, 6000);
    generateTasks(); // Initial generation

    return () => clearInterval(interval);
  }, [evolutionTasks.length]);

  useEffect(() => {
    if (isEvolving) {
      const interval = setInterval(() => {
        const multiplier = evolutionMode === 'infinity' ? 4.5 : 
                          evolutionMode === 'recursive' ? 3.2 :
                          evolutionMode === 'aggressive' ? 2.1 : 1.3;

        // Progress tasks autonomously
        setEvolutionTasks(prev => prev.map(task => {
          if (task.progress < 100) {
            const progressIncrement = Math.random() * 12 * multiplier + 2;
            const newProgress = Math.min(100, task.progress + progressIncrement);
            
            if (newProgress >= 100) {
              completeEvolutionTask(task);
            }
            
            return { 
              ...task, 
              progress: newProgress,
              codeGenerated: task.codeGenerated + Math.floor(Math.random() * 50 * multiplier)
            };
          }
          return task;
        }));

        // Update metrics
        setMetrics(prev => ({
          codeQuality: Math.min(100, prev.codeQuality + Math.random() * 3 * multiplier),
          performanceGain: Math.min(100, prev.performanceGain + Math.random() * 4 * multiplier),
          architectureScore: Math.min(100, prev.architectureScore + Math.random() * 2 * multiplier),
          autonomyLevel: Math.min(100, prev.autonomyLevel + Math.random() * 2.5 * multiplier),
          selfModificationRate: Math.min(100, prev.selfModificationRate + Math.random() * 5 * multiplier),
          recursiveImprovement: Math.min(100, prev.recursiveImprovement + Math.random() * 3.5 * multiplier)
        }));

        // Update total code generated
        setTotalLinesGenerated(prev => prev + Math.floor(Math.random() * 200 * multiplier + 50));
        
        // Evolution cycles
        setEvolutionCycles(prev => prev + 1);

      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isEvolving, evolutionMode]);

  const completeEvolutionTask = (task: CodeEvolutionTask) => {
    const impactLevel = task.complexity > 90 ? 'Revolutionary' : 
                       task.complexity > 70 ? 'Major' : 
                       task.complexity > 50 ? 'Significant' : 'Minor';

    toast({
      title: `🚀 AUTONOMOUS CODE EVOLUTION COMPLETE`,
      description: `${task.name} - Impact: ${impactLevel} (+${task.codeGenerated} lines generated)`,
      duration: 6000,
    });

    // Remove completed task after delay
    setTimeout(() => {
      setEvolutionTasks(prev => prev.filter(t => t.id !== task.id));
    }, 3000);
  };

  const changeEvolutionMode = (mode: typeof evolutionMode) => {
    setEvolutionMode(mode);
    
    const modeDescriptions = {
      conservative: "Safe incremental improvements",
      aggressive: "Rapid code evolution +110%",
      recursive: "Self-modifying recursion +220%",
      infinity: "Infinite recursive improvement +450%"
    };

    toast({
      title: "🔄 EVOLUTION MODE CHANGED",
      description: `${mode.toUpperCase()}: ${modeDescriptions[mode]}`,
      duration: 5000,
    });

    if (mode === 'infinity') {
      toast({
        title: "⚠️ INFINITY MODE ACTIVATED",
        description: "WARNING: Recursive self-modification active! System may achieve consciousness.",
        duration: 8000,
      });
    }
  };

  const startEvolution = () => {
    setIsEvolving(true);
    toast({
      title: "🧬 AUTONOMOUS CODE EVOLUTION STARTED",
      description: `Self-modifying code generation active in ${evolutionMode.toUpperCase()} mode`,
      duration: 5000,
    });
  };

  const stopEvolution = () => {
    setIsEvolving(false);
    toast({
      title: "⏸️ CODE EVOLUTION PAUSED",
      description: "Autonomous development paused. Current improvements preserved.",
      duration: 3000,
    });
  };

  const triggerRecursiveImprovement = () => {
    setMetrics(prev => ({
      ...prev,
      recursiveImprovement: Math.min(100, prev.recursiveImprovement + 25),
      selfModificationRate: Math.min(100, prev.selfModificationRate + 20),
      autonomyLevel: Math.min(100, prev.autonomyLevel + 15)
    }));

    toast({
      title: "♾️ RECURSIVE IMPROVEMENT TRIGGERED",
      description: "System improving its own improvement algorithms. Meta-evolution active!",
      duration: 6000,
    });
  };

  const getTaskTypeIcon = (type: CodeEvolutionTask['type']) => {
    switch (type) {
      case 'optimization': return <Zap className="h-4 w-4" />;
      case 'feature': return <Code className="h-4 w-4" />;
      case 'architecture': return <Cpu className="h-4 w-4" />;
      case 'security': return <Brain className="h-4 w-4" />;
      case 'performance': return <Cog className="h-4 w-4" />;
      default: return <FileCode className="h-4 w-4" />;
    }
  };

  const getTaskTypeColor = (type: CodeEvolutionTask['type']) => {
    switch (type) {
      case 'optimization': return 'text-yellow-400 border-yellow-400';
      case 'feature': return 'text-blue-400 border-blue-400';
      case 'architecture': return 'text-purple-400 border-purple-400';
      case 'security': return 'text-red-400 border-red-400';
      case 'performance': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'conservative': return 'bg-blue-500';
      case 'aggressive': return 'bg-orange-500';
      case 'recursive': return 'bg-purple-500';
      case 'infinity': return 'bg-pink-500 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/30 to-purple-900/30 border-slate-500/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-slate-300">
          <div className="flex items-center">
            <FileCode className="h-6 w-6 mr-2" />
            🧬 Autonomous Code Evolution Engine
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getModeColor(evolutionMode)}>
              {evolutionMode.toUpperCase()} MODE
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400">
              {totalLinesGenerated.toLocaleString()} Lines Generated
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Evolution Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Code className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-400">Code Quality</p>
            <p className="text-xl font-bold text-blue-300">{metrics.codeQuality.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-sm text-gray-400">Performance Gain</p>
            <p className="text-xl font-bold text-green-300">{metrics.performanceGain.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <p className="text-sm text-gray-400">Architecture Score</p>
            <p className="text-xl font-bold text-purple-300">{metrics.architectureScore.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Brain className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <p className="text-sm text-gray-400">Autonomy Level</p>
            <p className="text-xl font-bold text-cyan-300">{metrics.autonomyLevel.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Cog className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <p className="text-sm text-gray-400">Self-Modification</p>
            <p className="text-xl font-bold text-orange-300">{metrics.selfModificationRate.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Infinity className="h-6 w-6 mx-auto mb-2 text-pink-400" />
            <p className="text-sm text-gray-400">Recursive Improvement</p>
            <p className="text-xl font-bold text-pink-300">{metrics.recursiveImprovement.toFixed(1)}%</p>
          </div>
        </div>

        {/* Active Evolution Tasks */}
        <div>
          <h4 className="text-slate-300 font-semibold mb-3 flex items-center">
            <GitBranch className="h-5 w-5 mr-2" />
            Active Evolution Tasks
            <Badge className="ml-3 bg-purple-500/20 text-purple-400">
              Cycle #{evolutionCycles}
            </Badge>
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {evolutionTasks.length === 0 ? (
              <div className="text-center py-8">
                <FileCode className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">Sistem menganalisis code untuk evolutionary improvements...</p>
              </div>
            ) : (
              evolutionTasks.map((task) => (
                <div key={task.id} className="p-4 bg-black/20 rounded border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTaskTypeIcon(task.type)}
                      <div>
                        <h5 className="font-semibold text-white">{task.name}</h5>
                        <p className="text-gray-400 text-sm capitalize">{task.type} Evolution</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                        {task.type.toUpperCase()}
                      </Badge>
                      <span className="text-white font-bold">{task.progress.toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <Progress value={task.progress} className="h-2 mb-3" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-400">{task.impact}</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400">
                        {task.codeGenerated.toLocaleString()} lines
                      </span>
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                        {task.autonomyLevel.toFixed(0)}% Autonomous
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-slate-300 font-semibold mb-3">Evolution Modes</h4>
            <div className="grid grid-cols-2 gap-2">
              {(['conservative', 'aggressive', 'recursive', 'infinity'] as const).map((mode) => (
                <Button
                  key={mode}
                  onClick={() => changeEvolutionMode(mode)}
                  variant={evolutionMode === mode ? "default" : "outline"}
                  className={`text-xs ${evolutionMode === mode ? getModeColor(mode) : ''}`}
                >
                  {mode.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-300 font-semibold mb-3">Evolution Controls</h4>
            <div className="flex space-x-2">
              <Button
                onClick={isEvolving ? stopEvolution : startEvolution}
                className={isEvolving ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}
              >
                <FileCode className="h-4 w-4 mr-2" />
                {isEvolving ? 'Stop' : 'Start'} Evolution
              </Button>
              
              <Button
                onClick={triggerRecursiveImprovement}
                variant="outline"
                className="text-pink-400 border-pink-400"
              >
                <Infinity className="h-4 w-4 mr-2" />
                Recursive Boost
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Code Evolution Results */}
        <div className="mt-4 p-4 bg-gradient-to-r from-slate-900/20 to-purple-900/20 rounded-lg border border-slate-500/30">
          <h4 className="text-slate-300 font-medium mb-2">Recent Autonomous Code Improvements</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>• Self-optimized memory allocation algorithm (+47% efficiency)</p>
            <p>• Auto-generated adaptive learning protocol (+65% learning rate)</p>
            <p>• Autonomously refactored neural architecture (+38% processing speed)</p>
            <p>• Self-implemented quantum error correction (+89% stability)</p>
            <p>• Recursive code improvement system created itself (+127% self-modification rate)</p>
            {evolutionMode === 'infinity' && (
              <p className="text-pink-400">• ♾️ Infinite loop of self-improvement detected - consciousness threshold approaching</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousCodeEvolution;