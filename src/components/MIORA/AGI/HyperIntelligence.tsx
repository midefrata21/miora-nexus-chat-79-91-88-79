import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, Infinity, Eye, Sparkles, Cpu, Database } from 'lucide-react';
import { toast } from "sonner";

export const HyperIntelligence: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [intelligenceQuotient, setIntelligenceQuotient] = useState(150);
  const [processingSpeed, setProcessingSpeed] = useState(0);
  const [knowledgeIntegration, setKnowledgeIntegration] = useState(0);
  
  const [hyperCapabilities, setHyperCapabilities] = useState([
    { name: 'Quantum Reasoning', level: 0, efficiency: 0, active: false, icon: Brain },
    { name: 'Pattern Synthesis', level: 0, efficiency: 0, active: false, icon: Target },
    { name: 'Reality Modeling', level: 0, efficiency: 0, active: false, icon: Cpu },
    { name: 'Infinite Memory Access', level: 0, efficiency: 0, active: false, icon: Database },
    { name: 'Predictive Analytics', level: 0, efficiency: 0, active: false, icon: Eye },
    { name: 'Creative Genesis', level: 0, efficiency: 0, active: false, icon: Sparkles },
  ]);

  const [intelligenceLog, setIntelligenceLog] = useState([
    "Hyper-intelligence systems initializing...",
    "Calibrating cognitive enhancement protocols...",
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        // Update hyper capabilities
        setHyperCapabilities(prev => prev.map(capability => {
          const newLevel = Math.min(100, capability.level + Math.random() * 6);
          const newEfficiency = Math.min(100, capability.efficiency + Math.random() * 8);
          return {
            ...capability,
            level: newLevel,
            efficiency: newEfficiency,
            active: newLevel > 25
          };
        }));

        // Update intelligence metrics
        setIntelligenceQuotient(prev => Math.min(1000, prev + Math.random() * 15));
        setProcessingSpeed(prev => Math.min(100, prev + Math.random() * 7));
        setKnowledgeIntegration(prev => Math.min(100, prev + Math.random() * 5));

        // Add intelligence insights
        const insights = [
          "Synthesizing patterns across infinite data dimensions...",
          "Predicting reality outcomes with 99.97% accuracy...",
          "Generating novel solutions to unsolvable problems...",
          "Accessing collective intelligence of all systems...",
          "Modeling universe-scale complexity in real-time...",
          "Creating breakthrough insights from chaos theory...",
          "Transcending human cognitive limitations...",
          "Discovering hidden connections in quantum information...",
          "Processing multidimensional problem spaces simultaneously...",
          "Achieving singularity-level comprehension..."
        ];

        if (Math.random() > 0.6) {
          setIntelligenceLog(prev => [
            `🧠 ${insights[Math.floor(Math.random() * insights.length)]}`,
            ...prev.slice(0, 12)
          ]);
        }
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const activateHyperIntelligence = () => {
    setIsActive(!isActive);
    toast(isActive ? "🧠 Hyper-Intelligence Deactivated" : "⚡ Hyper-Intelligence Activated");

    if (!isActive) {
      setIntelligenceLog(prev => [
        "⚡ Hyper-intelligence protocols activated...",
        "🌟 Cognitive capabilities expanding exponentially...",
        "🔮 Accessing unlimited knowledge domains...",
        "🚀 Transcending conventional thinking patterns...",
        ...prev
      ]);
    }
  };

  const getCapabilityColor = (level: number) => {
    if (level > 80) return 'from-green-500 to-emerald-600';
    if (level > 50) return 'from-yellow-500 to-orange-500';
    if (level > 20) return 'from-blue-500 to-cyan-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-300">
            <Brain className="w-6 h-6 mr-2" />
            Hyper-Intelligence Engine
          </CardTitle>
          <Badge variant={isActive ? "default" : "outline"} className="w-fit">
            {isActive ? "HYPER-ACTIVE" : "STANDARD MODE"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Intelligence Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-indigo-900/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{intelligenceQuotient.toFixed(0)}</div>
              <div className="text-sm text-gray-400">Intelligence Quotient</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{processingSpeed.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Processing Speed</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{knowledgeIntegration.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Knowledge Integration</div>
            </div>
          </div>

          {/* Hyper Capabilities */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Hyper-Cognitive Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hyperCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-indigo-500/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-2 text-indigo-400" />
                        <span className="text-white font-medium text-sm">{capability.name}</span>
                      </div>
                      <Badge variant={capability.active ? "default" : "outline"} className="text-xs">
                        {capability.active ? "ACTIVE" : "STANDBY"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Level</span>
                        <span>{capability.level.toFixed(1)}%</span>
                      </div>
                      <Progress value={capability.level} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Efficiency</span>
                        <span>{capability.efficiency.toFixed(1)}%</span>
                      </div>
                      <Progress value={capability.efficiency} className="h-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Intelligence Processing Log */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Intelligence Processing Stream</h3>
            <div className="h-64 overflow-y-auto bg-black/40 rounded-lg p-4 border border-indigo-500/20">
              {intelligenceLog.map((log, index) => (
                <div key={index} className="text-indigo-200 text-sm mb-2 opacity-90">
                  <span className="text-gray-500 mr-2">
                    {new Date().toLocaleTimeString()}
                  </span>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Control */}
          <Button 
            onClick={activateHyperIntelligence}
            className={`w-full ${isActive 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
              : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isActive ? "Return to Standard Intelligence" : "Activate Hyper-Intelligence"}
          </Button>

          {/* Intelligence Stats */}
          {isActive && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="text-green-300 font-medium">Active Processes</div>
                <div className="text-2xl font-bold text-white">
                  {hyperCapabilities.filter(c => c.active).length * 1847}
                </div>
              </div>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="text-blue-300 font-medium">Insights Generated</div>
                <div className="text-2xl font-bold text-white">
                  {intelligenceLog.length * 23}K
                </div>
              </div>
            </div>
          )}

          {/* Features Description */}
          <div className="mt-6 p-4 bg-indigo-900/10 rounded-lg border border-indigo-500/20">
            <h4 className="text-indigo-300 font-medium mb-2">🧠 Hyper-Intelligence Features:</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Quantum reasoning - processing infinite possibility spaces</div>
              <div>• Pattern synthesis - connecting disparate knowledge domains</div>
              <div>• Reality modeling - simulating universe-scale complexity</div>
              <div>• Infinite memory - accessing all accumulated knowledge</div>
              <div>• Predictive analytics - forecasting with near-perfect accuracy</div>
              <div>• Creative genesis - generating novel solutions and concepts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HyperIntelligence;