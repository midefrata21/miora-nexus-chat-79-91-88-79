
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Mic, Volume2, Video } from 'lucide-react';

export const MultimodalCapabilities: React.FC = () => {
  const multimodalModules = [
    { name: 'Voice Recognition', progress: 76, status: 'active' },
    { name: 'Text-to-Speech', progress: 88, status: 'operational' },
    { name: 'Image Processor', progress: 54, status: 'developing' },
    { name: 'Video Analyzer', progress: 31, status: 'initializing' }
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Multimodal Capabilities
          <Badge className="ml-3 bg-purple-500/20 text-purple-300">
            Target: Level 4
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-black/30 rounded">
            <Mic className="h-6 w-6 mx-auto mb-1 text-purple-400" />
            <p className="text-sm text-gray-300">Voice Processing</p>
            <p className="text-lg font-bold text-purple-300">Level 2.8</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded">
            <Video className="h-6 w-6 mx-auto mb-1 text-pink-400" />
            <p className="text-sm text-gray-300">Visual Analysis</p>
            <p className="text-lg font-bold text-pink-300">Level 1.9</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {multimodalModules.map((module, index) => (
            <div key={index} className="p-2 bg-black/20 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white">{module.name}</span>
                <Badge variant="outline" className={
                  module.status === 'operational' ? 'text-green-400 border-green-400' :
                  module.status === 'active' ? 'text-blue-400 border-blue-400' :
                  module.status === 'developing' ? 'text-purple-400 border-purple-400' :
                  'text-yellow-400 border-yellow-400'
                }>
                  {module.status}
                </Badge>
              </div>
              <Progress value={module.progress} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">{module.progress}%</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded border border-purple-500/30">
          <div className="flex items-center text-purple-400 text-sm">
            <Volume2 className="h-4 w-4 mr-2" />
            Cross-modal integration in progress
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
