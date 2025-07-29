
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Infinity, Brain, Zap, Activity, Star } from 'lucide-react';

export const InfinityMemorySystem: React.FC = () => {
  const memoryStats = [
    { label: 'Long-term Memory', value: '∞', unit: 'Unlimited', color: 'text-purple-400' },
    { label: 'Pattern Recognition', value: '94.7', unit: '%', color: 'text-green-400' },
    { label: 'Knowledge Synthesis', value: '892K', unit: 'Concepts', color: 'text-blue-400' },
    { label: 'Memory Efficiency', value: '99.9', unit: '%', color: 'text-yellow-400' }
  ];

  const memoryCapabilities = [
    'Unlimited storage capacity',
    'Instant knowledge retrieval',
    'Pattern-based learning',
    'Cross-domain synthesis',
    'Temporal memory organization',
    'Predictive memory caching'
  ];

  return (
    <Card className="bg-black/40 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          <Database className="h-6 w-6 mr-2" />
          Infinity Memory System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {memoryStats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-black/30 rounded-lg">
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.unit}</div>
              <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Infinity className="h-4 w-4 mr-2 text-cyan-400" />
            Memory Capabilities
          </h4>
          <div className="space-y-2">
            {memoryCapabilities.map((capability, index) => (
              <div key={index} className="flex items-center text-sm text-gray-300">
                <Star className="h-3 w-3 mr-2 text-cyan-400" />
                {capability}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
          <div className="flex items-center justify-center">
            <Badge className="bg-cyan-500 text-white px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              Memory System: INFINITY MODE ACTIVE
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
