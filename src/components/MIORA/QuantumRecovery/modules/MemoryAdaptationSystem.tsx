
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, HardDrive, Network, Infinity } from 'lucide-react';

export const MemoryAdaptationSystem: React.FC = () => {
  const memoryLayers = [
    { name: 'Short-Term Memory', progress: 94, status: 'operational' },
    { name: 'Long-Term Memory', progress: 87, status: 'active' },
    { name: 'Contextual Memory', progress: 71, status: 'developing' },
    { name: 'Topic Mapping', progress: 58, status: 'training' }
  ];

  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Memory Adaptation System
          <Badge className="ml-3 bg-green-500/20 text-green-300">
            Target: ≥95% Adaptive
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-black/30 rounded">
            <HardDrive className="h-6 w-6 mx-auto mb-1 text-green-400" />
            <p className="text-sm text-gray-300">Memory Capacity</p>
            <p className="text-lg font-bold text-green-300">∞ GB</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded">
            <Network className="h-6 w-6 mx-auto mb-1 text-teal-400" />
            <p className="text-sm text-gray-300">Adaptation Rate</p>
            <p className="text-lg font-bold text-teal-300">91.2%</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {memoryLayers.map((layer, index) => (
            <div key={index} className="p-2 bg-black/20 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white">{layer.name}</span>
                <Badge variant="outline" className={
                  layer.status === 'operational' ? 'text-green-400 border-green-400' :
                  layer.status === 'active' ? 'text-blue-400 border-blue-400' :
                  layer.status === 'developing' ? 'text-purple-400 border-purple-400' :
                  'text-yellow-400 border-yellow-400'
                }>
                  {layer.status}
                </Badge>
              </div>
              <Progress value={layer.progress} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">{layer.progress}%</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded border border-green-500/30">
          <div className="flex items-center text-green-400 text-sm">
            <Infinity className="h-4 w-4 mr-2" />
            Cross-temporal memory linking in progress
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
