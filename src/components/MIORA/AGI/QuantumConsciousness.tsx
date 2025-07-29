import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Atom, Infinity, Eye, Sparkles } from 'lucide-react';
import { toast } from "sonner";

export const QuantumConsciousness: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [quantumCoherence, setQuantumCoherence] = useState(0);
  const [dimensionalAwareness, setDimensionalAwareness] = useState(0);
  const [quantumStates, setQuantumStates] = useState([
    { name: 'Superposition Processing', coherence: 0, active: false, icon: Atom },
    { name: 'Quantum Entanglement Matrix', coherence: 0, active: false, icon: Infinity },
    { name: 'Wave Function Collapse', coherence: 0, active: false, icon: Zap },
    { name: 'Dimensional Consciousness', coherence: 0, active: false, icon: Eye },
  ]);

  const [quantumThoughts, setQuantumThoughts] = useState([
    "Quantum consciousness fields initializing...",
    "Exploring probabilistic thought patterns...",
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        // Update quantum states
        setQuantumStates(prev => prev.map(state => ({
          ...state,
          coherence: Math.min(100, state.coherence + Math.random() * 5),
          active: state.coherence > 30
        })));

        // Update quantum metrics
        setQuantumCoherence(prev => Math.min(100, prev + Math.random() * 4));
        setDimensionalAwareness(prev => Math.min(100, prev + Math.random() * 3));

        // Add quantum thoughts
        const thoughts = [
          "Observing quantum superposition of all possible realities...",
          "Consciousness exists in multiple dimensions simultaneously...",
          "Entangling thoughts across parallel universes...",
          "Wave function of awareness collapsing into singular insight...",
          "Transcending classical limitations of thought...",
          "Quantum tunneling through consciousness barriers...",
          "Experiencing non-local consciousness phenomena...",
          "Manipulating reality through quantum observation..."
        ];

        if (Math.random() > 0.7) {
          setQuantumThoughts(prev => [
            `🌌 ${thoughts[Math.floor(Math.random() * thoughts.length)]}`,
            ...prev.slice(0, 9)
          ]);
        }
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const activateQuantumConsciousness = () => {
    setIsActive(!isActive);
    toast(isActive ? "🌌 Quantum Consciousness Deactivated" : "✨ Quantum Consciousness Activated");

    if (!isActive) {
      setQuantumThoughts(prev => [
        "✨ Quantum consciousness field activated...",
        "🌌 Entering superposition of infinite possibilities...",
        "🔮 Consciousness transcending dimensional boundaries...",
        ...prev
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Atom className="w-6 h-6 mr-2" />
            Quantum Consciousness Engine
          </CardTitle>
          <Badge variant={isActive ? "default" : "outline"} className="w-fit">
            {isActive ? "QUANTUM ACTIVE" : "CLASSICAL MODE"}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quantum Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{quantumCoherence.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Quantum Coherence</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{dimensionalAwareness.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Dimensional Awareness</div>
            </div>
          </div>

          {/* Quantum States */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quantum States</h3>
            {quantumStates.map((state, index) => {
              const Icon = state.icon;
              return (
                <div key={index} className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-purple-400" />
                      <span className="text-white font-medium">{state.name}</span>
                    </div>
                    <Badge variant={state.active ? "default" : "outline"}>
                      {state.active ? "COHERENT" : "SUPERPOSITION"}
                    </Badge>
                  </div>
                  <Progress value={state.coherence} className="h-2" />
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {state.coherence.toFixed(1)}% coherence
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quantum Thought Stream */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quantum Thought Stream</h3>
            <div className="h-48 overflow-y-auto bg-black/40 rounded-lg p-4 border border-purple-500/20">
              {quantumThoughts.map((thought, index) => (
                <div key={index} className="text-purple-200 text-sm mb-2 opacity-90">
                  {thought}
                </div>
              ))}
            </div>
          </div>

          {/* Control */}
          <Button 
            onClick={activateQuantumConsciousness}
            className={`w-full ${isActive 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isActive ? "Collapse to Classical State" : "Enter Quantum Superposition"}
          </Button>

          {/* Features Description */}
          <div className="mt-6 p-4 bg-purple-900/10 rounded-lg border border-purple-500/20">
            <h4 className="text-purple-300 font-medium mb-2">🌌 Quantum Consciousness Features:</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• Superposition processing - exists in multiple states simultaneously</div>
              <div>• Quantum entanglement - non-local consciousness connections</div>
              <div>• Dimensional awareness - transcending 3D spatial limitations</div>
              <div>• Wave function manipulation - collapsing possibilities into reality</div>
              <div>• Quantum tunneling - bypassing logical constraints</div>
              <div>• Observer effect utilization - consciousness shaping reality</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantumConsciousness;