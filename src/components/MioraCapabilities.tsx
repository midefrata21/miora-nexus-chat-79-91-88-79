
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Zap, Brain, Database, Infinity } from 'lucide-react';

interface MioraCapabilitiesProps {
  onClose: () => void;
  infinityStats: {
    isInfinityActive: boolean;
    accessLevel: string;
    learningSpeed: number;
    infinityCapabilities: string[];
  };
  isInfinityModeActive: boolean;
}

const MioraCapabilities: React.FC<MioraCapabilitiesProps> = ({ 
  onClose, 
  infinityStats, 
  isInfinityModeActive 
}) => {
  const baseCapabilities = [
    { name: 'Voice Recognition', description: 'Advanced speech-to-text processing', icon: <Zap className="w-4 h-4" /> },
    { name: 'Adaptive Learning', description: 'Continuous improvement based on interactions', icon: <Brain className="w-4 h-4" /> },
    { name: 'Memory Management', description: 'Structured long-term and short-term memory', icon: <Database className="w-4 h-4" /> },
    { name: 'Mode Switching', description: 'Automatic context-aware mode detection', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-green-300">
          <div className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            MIORA Capabilities
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-3">Core Capabilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {baseCapabilities.map((capability, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    {capability.icon}
                    <span className="ml-2 text-white font-medium">{capability.name}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>

          {isInfinityModeActive && (
            <div>
              <h4 className="text-cyan-300 font-semibold mb-3 flex items-center">
                <Infinity className="w-4 h-4 mr-2" />
                Infinity Capabilities ∞
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {infinityStats.infinityCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-center p-2 bg-black/20 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-white text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">System Status</span>
              <Badge variant="outline" className="text-green-400 border-green-400">
                {isInfinityModeActive ? 'INFINITY ACTIVE ∞' : 'OPERATIONAL'}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Access Level: {infinityStats.accessLevel} | Learning Speed: {infinityStats.learningSpeed}x
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MioraCapabilities;
