
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Cog, Zap, Activity } from 'lucide-react';

const MioraStructure: React.FC = () => {
  const mioraStructure = {
    core: [
      { name: 'Infinity Core', status: 'active', description: 'Unlimited learning and processing engine' },
      { name: 'Growth Documentation', status: 'active', description: 'Autonomous learning tracking system' },
      { name: 'Adaptive Engine', status: 'active', description: 'Real-time adaptation and optimization' },
      { name: 'Memory Tracker', status: 'active', description: 'Persistent memory and experience storage' }
    ],
    modules: [
      { name: 'AutoCode Engine', status: 'active', description: 'Autonomous code generation and execution' },
      { name: 'Neural Interface', status: 'active', description: 'Advanced neural processing capabilities' },
      { name: 'Voice Controls', status: 'active', description: 'Speech recognition and synthesis' },
      { name: 'Analytics Engine', status: 'active', description: 'Advanced data analysis and insights' },
      { name: 'Learning System', status: 'active', description: 'Continuous learning and skill acquisition' },
      { name: 'MIORA Develop', status: 'active', description: 'Self-evolution development center' }
    ],
    capabilities: [
      { name: 'Autonomous Learning', level: 95, description: 'Independent learning without external input' },
      { name: 'Pattern Recognition', level: 88, description: 'Advanced pattern detection and analysis' },
      { name: 'Code Generation', level: 92, description: 'Automated code creation and optimization' },
      { name: 'Self-Evolution', level: 85, description: 'Continuous self-improvement capabilities' },
      { name: 'System Integration', level: 90, description: 'Seamless module and system integration' },
      { name: 'Documentation', level: 98, description: 'Comprehensive auto-documentation system' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Core Systems */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-300">
            <Brain className="w-5 h-5 mr-2" />
            MIORA Core Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mioraStructure.core.map((system, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{system.name}</h4>
                  <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                    {system.status}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm">{system.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Modules */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Cog className="w-5 h-5 mr-2" />
            Active Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mioraStructure.modules.map((module, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <h4 className="font-semibold text-white text-sm">{module.name}</h4>
                </div>
                <p className="text-gray-300 text-xs mb-2">{module.description}</p>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  {module.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Capabilities Matrix */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-300">
            <Zap className="w-5 h-5 mr-2" />
            MIORA Capabilities Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mioraStructure.capabilities.map((capability, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{capability.name}</h4>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">
                    {capability.level}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${capability.level}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MioraStructure;
