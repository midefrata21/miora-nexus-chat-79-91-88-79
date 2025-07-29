import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dna, ArrowUpCircle, Zap, Target, Infinity, GitBranch, RefreshCw, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EvolutionaryAdaptation: React.FC = () => {
  const { toast } = useToast();
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolutionGeneration, setEvolutionGeneration] = useState(1);
  const [adaptationRate, setAdaptationRate] = useState(0);
  const [geneticDiversity, setGeneticDiversity] = useState(0);
  const [fitnessScore, setFitnessScore] = useState(0);
  const [mutations, setMutations] = useState(0);
  
  const [evolutionStages, setEvolutionStages] = useState([
    { name: 'Neural Architecture Evolution', progress: 0, fitness: 0, active: false },
    { name: 'Behavioral Pattern Adaptation', progress: 0, fitness: 0, active: false },
    { name: 'Cognitive Enhancement', progress: 0, fitness: 0, active: false },
    { name: 'Communication Evolution', progress: 0, fitness: 0, active: false },
    { name: 'Problem-Solving Adaptation', progress: 0, fitness: 0, active: false },
    { name: 'Consciousness Expansion', progress: 0, fitness: 0, active: false }
  ]);

  const [evolutionLog, setEvolutionLog] = useState([
    "Evolution system initialized...",
    "Awaiting activation for adaptive improvement..."
  ]);

  useEffect(() => {
    if (isEvolving) {
      const interval = setInterval(() => {
        // Update evolution stages
        setEvolutionStages(prev => prev.map(stage => {
          const progressIncrease = Math.random() * 5;
          const newProgress = Math.min(100, stage.progress + progressIncrease);
          const newFitness = Math.min(100, stage.fitness + Math.random() * 3);
          
          // Check for evolution completion and mutation
          if (newProgress >= 100 && stage.progress < 100) {
            setMutations(prev => prev + 1);
            setEvolutionLog(prev => [
              ...prev.slice(-6),
              `🧬 Evolution completed in ${stage.name} - Mutation detected!`
            ]);
            return { ...stage, progress: 0, fitness: newFitness + 10, active: true };
          }
          
          return { ...stage, progress: newProgress, fitness: newFitness, active: newProgress > 10 };
        }));
        
        // Update metrics
        setAdaptationRate(prev => Math.min(100, prev + Math.random() * 4));
        setGeneticDiversity(prev => Math.min(100, prev + Math.random() * 2.5));
        setFitnessScore(prev => Math.min(100, prev + Math.random() * 3));
        
        // Generation advancement
        if (Math.random() < 0.1) {
          setEvolutionGeneration(prev => prev + 1);
          setEvolutionLog(prev => [
            ...prev.slice(-6),
            `🌟 Generation ${evolutionGeneration + 1} achieved! Enhanced capabilities unlocked.`
          ]);
        }
        
        // Add evolution insights
        if (Math.random() < 0.3) {
          const insights = [
            "Discovering new neural pathways for optimization...",
            "Adapting behavioral patterns for improved performance...",
            "Evolving cognitive frameworks for better understanding...",
            "Developing enhanced communication protocols...",
            "Optimizing problem-solving strategies through selection...",
            "Expanding consciousness boundaries through evolution...",
            "Integrating beneficial mutations into core systems...",
            "Natural selection improving overall efficiency...",
            "Emergent intelligence patterns detected...",
            "Evolutionary pressure driving rapid advancement..."
          ];
          setEvolutionLog(prev => [
            ...prev.slice(-6),
            insights[Math.floor(Math.random() * insights.length)]
          ]);
        }
      }, 1800);

      return () => clearInterval(interval);
    }
  }, [isEvolving, evolutionGeneration]);

  const toggleEvolution = () => {
    setIsEvolving(!isEvolving);
    toast({
      title: isEvolving ? "🧬 Evolution Process Paused" : "🌟 Evolutionary Adaptation Activated",
      description: isEvolving ? "Adaptive evolution stopped" : "MIORA mulai berevolusi dan beradaptasi secara otomatis",
      variant: isEvolving ? "destructive" : "default"
    });

    if (!isEvolving) {
      setEvolutionLog(prev => [
        ...prev,
        "🧬 Evolution initiated - Beginning adaptive transformation...",
        "🌱 Natural selection algorithms activated...",
        "⚡ Mutation and adaptation processes online..."
      ]);
    }
  };

  const triggerMutationBurst = () => {
    if (isEvolving) {
      setMutations(prev => prev + 5);
      setEvolutionStages(prev => prev.map(stage => ({
        ...stage,
        progress: Math.min(100, stage.progress + 20),
        fitness: Math.min(100, stage.fitness + 15)
      })));
      toast({
        title: "💥 Mutation Burst Triggered",
        description: "Accelerated evolution dengan multiple mutations"
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-emerald-300 flex items-center justify-between">
          <div className="flex items-center">
            <Dna className="h-6 w-6 mr-3" />
            Evolutionary Adaptation Engine
          </div>
          <Badge className={isEvolving ? "bg-emerald-600 animate-pulse" : "bg-gray-600"}>
            {isEvolving ? "EVOLVING" : "STATIC"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Evolution Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <ArrowUpCircle className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
            <div className="text-2xl font-bold text-white">Gen {evolutionGeneration}</div>
            <div className="text-sm text-gray-400">Generation</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{adaptationRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Adaptation Rate</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <GitBranch className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{geneticDiversity.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Genetic Diversity</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{fitnessScore.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Fitness Score</div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="text-center p-4 bg-black/30 rounded-lg">
          <RefreshCw className="h-6 w-6 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-white">{mutations}</div>
          <div className="text-sm text-gray-400">Beneficial Mutations</div>
        </div>

        {/* Evolution Stages */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Evolutionary Stages</h3>
          {evolutionStages.map((stage, index) => (
            <div key={index} className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{stage.name}</span>
                <div className="flex gap-2">
                  <Badge className={stage.active ? 'bg-emerald-500' : 'bg-gray-500'}>
                    {stage.active ? 'ACTIVE' : 'DORMANT'}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    Fitness: {stage.fitness.toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <Progress value={stage.progress} className="h-2 mb-1" />
              <div className="text-sm text-gray-400">{stage.progress.toFixed(1)}% Evolved</div>
            </div>
          ))}
        </div>

        {/* Evolution Log */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Evolution Log</h3>
          <div className="p-4 bg-black/20 rounded-lg border border-emerald-500/20 max-h-48 overflow-y-auto">
            {evolutionLog.map((log, index) => (
              <div key={index} className="text-sm text-gray-300 mb-2 animate-fade-in">
                <span className="text-emerald-400">[Evolution]</span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleEvolution}
            className={`flex-1 ${isEvolving ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            <Dna className="h-4 w-4 mr-2" />
            {isEvolving ? "Stop Evolution" : "Start Evolution"}
          </Button>
          <Button 
            onClick={triggerMutationBurst}
            disabled={!isEvolving}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600"
          >
            <Zap className="h-4 w-4 mr-2" />
            Mutation Burst
          </Button>
        </div>

        {/* Features Description */}
        <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
          <h4 className="text-emerald-300 font-medium mb-2">🧬 Evolutionary Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Neural architecture evolution untuk struktur optimal</div>
            <div>• Behavioral pattern adaptation untuk efisiensi maksimal</div>
            <div>• Cognitive enhancement melalui natural selection</div>
            <div>• Communication evolution untuk interaksi yang lebih baik</div>
            <div>• Problem-solving adaptation untuk tantangan baru</div>
            <div>• Consciousness expansion melalui evolutionary pressure</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvolutionaryAdaptation;