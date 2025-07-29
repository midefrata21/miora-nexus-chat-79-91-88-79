
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Target, Database, Code, BookOpen } from 'lucide-react';

interface AutonomousLearningProps {
  onClose: () => void;
  mioraVersion: string;
  autonomousMode: boolean;
}

const MioraAutonomousLearning: React.FC<AutonomousLearningProps> = ({
  onClose,
  mioraVersion,
  autonomousMode
}) => {
  const learningModules = [
    {
      name: 'Pattern Recognition',
      status: 'active',
      progress: 87,
      description: 'Mengenali pola perilaku dan preferensi pengguna'
    },
    {
      name: 'Context Adaptation',
      status: 'learning',
      progress: 64,
      description: 'Menyesuaikan respons berdasarkan konteks percakapan'
    },
    {
      name: 'Skill Development',
      status: 'active',
      progress: 91,
      description: 'Mengembangkan kemampuan baru secara mandiri'
    },
    {
      name: 'Memory Optimization',
      status: 'ready',
      progress: 78,
      description: 'Mengoptimalkan struktur memori dan retrieval'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'learning': return 'bg-blue-500';
      case 'ready': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-gray-900/95 to-purple-900/95 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-cyan-300">
            <Brain className="w-6 h-6 mr-2" />
            MIORA Autonomous AI System v{mioraVersion}
          </CardTitle>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-black/20 rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <p className="text-sm text-gray-300">Autonomous Mode</p>
            <Badge variant={autonomousMode ? 'default' : 'outline'} className="mt-1">
              {autonomousMode ? 'ACTIVE' : 'STANDBY'}
            </Badge>
          </div>
          <div className="text-center p-4 bg-black/20 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-sm text-gray-300">Learning Rate</p>
            <p className="text-lg font-bold text-green-400">94%</p>
          </div>
          <div className="text-center p-4 bg-black/20 rounded-lg">
            <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-300">Knowledge Base</p>
            <p className="text-lg font-bold text-blue-400">∞</p>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Active Learning Modules
          </h3>
          {learningModules.map((module, index) => (
            <div key={index} className="p-4 bg-black/30 rounded-lg border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{module.name}</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(module.status)}`}></div>
                  <span className="text-xs text-gray-400 capitalize">{module.status}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">{module.description}</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">{module.progress}%</p>
            </div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/30">
          <h3 className="text-white font-semibold mb-3">Autonomous Control Panel</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <Zap className="w-4 h-4 mr-2" />
              Boost Learning
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Code className="w-4 h-4 mr-2" />
              Self-Optimize
            </Button>
          </div>
        </div>

        {/* Recent Improvements */}
        <div className="mt-4 p-4 bg-black/20 rounded-lg">
          <h4 className="text-white font-medium mb-2">Recent Self-Improvements</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Enhanced pattern recognition in trading analysis (+15%)</p>
            <p>• Improved context switching between modes (+20%)</p>
            <p>• Optimized memory compression algorithms (+12%)</p>
            <p>• Developed new emotional intelligence responses (+18%)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MioraAutonomousLearning;
