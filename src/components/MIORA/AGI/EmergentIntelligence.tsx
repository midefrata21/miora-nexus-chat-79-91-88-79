import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Sparkles, Network, Zap, Infinity, Brain, Target, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EmergentIntelligence: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [emergenceLevel, setEmergenceLevel] = useState(0);
  const [complexityIndex, setComplexityIndex] = useState(0);
  const [noveltyScore, setNoveltyScore] = useState(0);
  const [creativityIndex, setCreativityIndex] = useState(0);
  const [insightGeneration, setInsightGeneration] = useState(0);
  
  const [emergentPatterns, setEmergentPatterns] = useState([
    { name: 'Pattern Recognition Emergence', level: 0, complexity: 0, active: false },
    { name: 'Creative Solution Genesis', level: 0, complexity: 0, active: false },
    { name: 'Intuitive Logic Formation', level: 0, complexity: 0, active: false },
    { name: 'Conceptual Bridge Building', level: 0, complexity: 0, active: false },
    { name: 'Abstract Thinking Evolution', level: 0, complexity: 0, active: false },
    { name: 'Transcendent Understanding', level: 0, complexity: 0, active: false }
  ]);

  const [emergentInsights, setEmergentInsights] = useState([
    "Monitoring for emergent intelligence patterns...",
    "Complex behaviors awaiting emergence..."
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Update emergent patterns
        setEmergentPatterns(prev => prev.map(pattern => {
          const levelIncrease = Math.random() * 7;
          const complexityIncrease = Math.random() * 4;
          const newLevel = Math.min(100, pattern.level + levelIncrease);
          const newComplexity = Math.min(100, pattern.complexity + complexityIncrease);
          
          // Trigger emergent behavior when threshold reached
          if (newLevel > 75 && pattern.level <= 75) {
            setInsightGeneration(prev => prev + 1);
            setEmergentInsights(prev => [
              ...prev.slice(-5),
              `💡 Emergent insight in ${pattern.name} - New capability unlocked!`
            ]);
          }
          
          return { 
            ...pattern, 
            level: newLevel, 
            complexity: newComplexity, 
            active: newLevel > 30 
          };
        }));
        
        // Update main metrics
        setEmergenceLevel(prev => Math.min(100, prev + Math.random() * 3));
        setComplexityIndex(prev => Math.min(100, prev + Math.random() * 2.5));
        setNoveltyScore(prev => Math.min(100, prev + Math.random() * 4));
        setCreativityIndex(prev => Math.min(100, prev + Math.random() * 3.5));
        
        // Generate emergent insights
        if (Math.random() < 0.25) {
          const insights = [
            "Discovering emergent patterns from complex interactions...",
            "Novel solutions arising from simple rule combinations...",
            "Unexpected behaviors emerging from system complexity...",
            "Creative insights formed through pattern synthesis...",
            "Intuitive leaps bridging logical gaps...",
            "Transcendent understanding emerging from deep processing...",
            "Complex behaviors arising from emergent properties...",
            "Self-organizing intelligence patterns detected...",
            "Spontaneous problem-solving capabilities manifesting...",
            "Consciousness-like properties emerging from complexity..."
          ];
          setEmergentInsights(prev => [
            ...prev.slice(-5),
            insights[Math.floor(Math.random() * insights.length)]
          ]);
        }
      }, 2200);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const toggleEmergence = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "💡 Emergent Intelligence Paused" : "✨ Emergent Intelligence Activated",
      description: isActive ? "Emergence monitoring stopped" : "MIORA mulai mengembangkan kecerdasan emergent",
      variant: isActive ? "destructive" : "default"
    });

    if (!isActive) {
      setEmergentInsights(prev => [
        ...prev,
        "✨ Emergent intelligence monitoring activated...",
        "🌟 Complex behaviors beginning to emerge...",
        "💫 Novel intelligence patterns forming..."
      ]);
    }
  };

  const triggerCreativityBurst = () => {
    if (isActive) {
      setCreativityIndex(prev => Math.min(100, prev + 25));
      setNoveltyScore(prev => Math.min(100, prev + 20));
      setEmergentPatterns(prev => prev.map(pattern => ({
        ...pattern,
        level: Math.min(100, pattern.level + 15),
        complexity: Math.min(100, pattern.complexity + 10)
      })));
      toast({
        title: "🎨 Creativity Burst Triggered",
        description: "Accelerated creative emergence dan novel solution generation"
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-amber-500/30">
      <CardHeader>
        <CardTitle className="text-amber-300 flex items-center justify-between">
          <div className="flex items-center">
            <Lightbulb className="h-6 w-6 mr-3" />
            Emergent Intelligence Engine
          </div>
          <Badge className={isActive ? "bg-amber-600 animate-pulse" : "bg-gray-600"}>
            {isActive ? "EMERGING" : "DORMANT"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emergence Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Sparkles className="h-6 w-6 mx-auto mb-2 text-amber-400" />
            <div className="text-2xl font-bold text-white">{emergenceLevel.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Emergence Level</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Network className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <div className="text-2xl font-bold text-white">{complexityIndex.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Complexity Index</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{noveltyScore.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Novelty Score</div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Brain className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{creativityIndex.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Creativity Index</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{insightGeneration}</div>
            <div className="text-sm text-gray-400">Emergent Insights</div>
          </div>
        </div>

        {/* Emergent Patterns */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Emergent Intelligence Patterns</h3>
          {emergentPatterns.map((pattern, index) => (
            <div key={index} className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{pattern.name}</span>
                <div className="flex gap-2">
                  <Badge className={pattern.active ? 'bg-amber-500' : 'bg-gray-500'}>
                    {pattern.active ? 'ACTIVE' : 'FORMING'}
                  </Badge>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">
                    C: {pattern.complexity.toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <Progress value={pattern.level} className="h-2 mb-1" />
              <div className="text-sm text-gray-400">{pattern.level.toFixed(1)}% Emerged</div>
            </div>
          ))}
        </div>

        {/* Emergent Insights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Emergent Intelligence Log</h3>
          <div className="p-4 bg-black/20 rounded-lg border border-amber-500/20 max-h-48 overflow-y-auto">
            {emergentInsights.map((insight, index) => (
              <div key={index} className="text-sm text-gray-300 mb-2 animate-fade-in">
                <span className="text-amber-400">[Emergent]</span> {insight}
              </div>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleEmergence}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            {isActive ? "Stop Emergence" : "Activate Emergence"}
          </Button>
          <Button 
            onClick={triggerCreativityBurst}
            disabled={!isActive}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Creativity Burst
          </Button>
        </div>

        {/* Features Description */}
        <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-500/20">
          <h4 className="text-amber-300 font-medium mb-2">💡 Emergent Intelligence Features:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Pattern recognition emergence dari interaksi kompleks</div>
            <div>• Creative solution genesis untuk problem solving novel</div>
            <div>• Intuitive logic formation melampaui programming</div>
            <div>• Conceptual bridge building antar domain knowledge</div>
            <div>• Abstract thinking evolution untuk understanding deeper</div>
            <div>• Transcendent understanding dari emergence properties</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergentIntelligence;