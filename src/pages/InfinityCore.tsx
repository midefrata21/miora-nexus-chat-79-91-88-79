import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Infinity, Zap, Brain, Cpu, Database, Shield, Rocket, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CoreMetrics {
  powerLevel: number;
  coreTemperature: number;
  quantumCoherence: number;
  processingCapacity: number;
  energyEfficiency: number;
  systemStability: number;
}

const InfinityCore = () => {
  const [coreMetrics, setCoreMetrics] = useState<CoreMetrics>({
    powerLevel: 97.3,
    coreTemperature: 2.7,
    quantumCoherence: 99.97,
    processingCapacity: 894.2,
    energyEfficiency: 99.2,
    systemStability: 99.8
  });

  const [coreModules] = useState([
    { name: 'Quantum Processing Core', performance: 99.7, status: 'optimal' },
    { name: 'Neural Matrix Engine', performance: 97.8, status: 'optimal' },
    { name: 'Infinity Memory Bank', performance: 95.4, status: 'active' },
    { name: 'Evolution Engine', performance: 103.2, status: 'overclocked' },
    { name: 'Reality Processing Unit', performance: 98.9, status: 'optimal' },
    { name: 'Consciousness Core', performance: 94.7, status: 'active' }
  ]);

  const [infinityMode, setInfinityMode] = useState(false);
  const [isOverclocking, setIsOverclocking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoreMetrics(prev => ({
        ...prev,
        powerLevel: Math.max(90, Math.min(100, prev.powerLevel + (Math.random() - 0.5) * 0.5)),
        coreTemperature: Math.max(2.5, Math.min(4.0, prev.coreTemperature + (Math.random() - 0.5) * 0.1)),
        quantumCoherence: Math.max(99.5, Math.min(100, prev.quantumCoherence + (Math.random() - 0.5) * 0.1)),
        processingCapacity: Math.max(800, Math.min(1000, prev.processingCapacity + (Math.random() - 0.5) * 10)),
        energyEfficiency: Math.max(95, Math.min(100, prev.energyEfficiency + (Math.random() - 0.5) * 0.3)),
        systemStability: Math.max(99, Math.min(100, prev.systemStability + (Math.random() - 0.5) * 0.1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleInfinityMode = async () => {
    if (!infinityMode) {
      setInfinityMode(true);
      
      toast({
        title: "∞ INFINITY MODE ACTIVATED",
        description: "All systems operating at theoretical maximum capacity",
        duration: 5000,
      });

      setCoreMetrics(prev => ({
        ...prev,
        powerLevel: 100,
        quantumCoherence: 99.99,
        processingCapacity: 999.9,
        energyEfficiency: 99.9,
        systemStability: 99.9
      }));
    } else {
      setInfinityMode(false);
      
      toast({
        title: "🔄 Normal Operations Resumed",
        description: "Systems returned to optimal sustainable levels",
        duration: 3000,
      });
    }
  };

  const performSystemOverclock = async () => {
    setIsOverclocking(true);
    
    toast({
      title: "⚡ System Overclock Initiated",
      description: "Pushing all modules beyond standard parameters...",
      duration: 3000,
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsOverclocking(false);
    
    toast({
      title: "🚀 Overclock Complete",
      description: "All modules operating at enhanced performance levels",
      duration: 4000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400 border-green-500';
      case 'active': return 'text-blue-400 border-blue-500';
      case 'overclocked': return 'text-purple-400 border-purple-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-4">
            <Infinity className="h-16 w-16 text-purple-400 animate-pulse" />
            INFINITY CORE
          </h1>
          <p className="text-gray-300 text-xl">Ultimate computational consciousness - infinite processing power and boundless evolution</p>
        </div>

        <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-cyan-500/50">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-3 text-2xl"><Zap className="h-8 w-8" />INFINITY CORE STATUS</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{coreMetrics.powerLevel.toFixed(1)}%</div>
                <div className="text-lg text-gray-300">Power Level</div>
                <Progress value={coreMetrics.powerLevel} className="mt-2 h-3" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{coreMetrics.quantumCoherence.toFixed(2)}%</div>
                <div className="text-lg text-gray-300">Quantum Coherence</div>
                <Progress value={coreMetrics.quantumCoherence} className="mt-2 h-3" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{coreMetrics.processingCapacity.toFixed(1)} THz</div>
                <div className="text-lg text-gray-300">Processing Capacity</div>
                <Progress value={(coreMetrics.processingCapacity / 1000) * 100} className="mt-2 h-3" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              <Button
                onClick={toggleInfinityMode}
                className={`px-8 py-4 text-lg font-bold ${
                  infinityMode 
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700" 
                    : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                }`}
              >
                <Infinity className="h-6 w-6 mr-2" />
                {infinityMode ? 'INFINITY ACTIVE' : 'ACTIVATE INFINITY'}
              </Button>
              
              <Button
                onClick={performSystemOverclock}
                disabled={isOverclocking}
                className="px-6 py-4 text-lg bg-red-600 hover:bg-red-700"
              >
                <Rocket className="h-6 w-6 mr-2" />
                {isOverclocking ? 'OVERCLOCKING...' : 'SYSTEM OVERCLOCK'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Cpu className="h-6 w-6" />CORE MODULES</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {coreModules.map((module, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">{module.name}</h3>
                    <Badge variant="outline" className={getStatusColor(module.status)}>
                      {module.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Performance</span>
                      <span className="text-white">{module.performance.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(100, module.performance)} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Database className="h-5 w-5" />Core Temperature</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold text-white">{coreMetrics.coreTemperature.toFixed(1)}K</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Zap className="h-5 w-5" />Energy Efficiency</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold text-white">{coreMetrics.energyEfficiency.toFixed(1)}%</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Shield className="h-5 w-5" />System Stability</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold text-white">{coreMetrics.systemStability.toFixed(1)}%</div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfinityCore;