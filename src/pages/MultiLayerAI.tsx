
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layers, Brain, Network, Zap, Activity, Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AILayer {
  id: number;
  name: string;
  type: 'input' | 'processing' | 'decision' | 'output' | 'feedback';
  nodes: number;
  connections: number;
  activation: number;
  efficiency: number;
  status: 'active' | 'idle' | 'learning' | 'optimizing';
}

const MultiLayerAI: React.FC = () => {
  const [layers, setLayers] = useState<AILayer[]>([
    { id: 1, name: 'Sensory Input Layer', type: 'input', nodes: 10000, connections: 50000, activation: 0, efficiency: 95, status: 'idle' },
    { id: 2, name: 'Pattern Recognition Layer', type: 'processing', nodes: 25000, connections: 125000, activation: 0, efficiency: 92, status: 'idle' },
    { id: 3, name: 'Feature Extraction Layer', type: 'processing', nodes: 15000, connections: 75000, activation: 0, efficiency: 88, status: 'idle' },
    { id: 4, name: 'Context Analysis Layer', type: 'processing', nodes: 20000, connections: 100000, activation: 0, efficiency: 90, status: 'idle' },
    { id: 5, name: 'Decision Formation Layer', type: 'decision', nodes: 8000, connections: 40000, activation: 0, efficiency: 94, status: 'idle' },
    { id: 6, name: 'Strategic Planning Layer', type: 'decision', nodes: 12000, connections: 60000, activation: 0, efficiency: 91, status: 'idle' },
    { id: 7, name: 'Response Generation Layer', type: 'output', nodes: 6000, connections: 30000, activation: 0, efficiency: 96, status: 'idle' },
    { id: 8, name: 'Learning Feedback Layer', type: 'feedback', nodes: 5000, connections: 25000, activation: 0, efficiency: 89, status: 'idle' }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalNodes: 0,
    totalConnections: 0,
    averageActivation: 0,
    overallEfficiency: 0,
    processingSpeed: 0,
    learningRate: 0,
    knowledgeBase: 1250000
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentThought, setCurrentThought] = useState('');

  const thoughtPatterns = [
    'Analyzing multi-dimensional data patterns...',
    'Processing contextual relationships...',
    'Forming strategic decisions...',
    'Optimizing neural pathways...',
    'Learning from feedback loops...',
    'Synthesizing complex information...',
    'Evaluating decision outcomes...',
    'Adapting behavioral patterns...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isProcessing) {
      interval = setInterval(() => {
        setLayers(prev => prev.map(layer => ({
          ...layer,
          activation: Math.min(100, layer.activation + Math.random() * 15 - 5),
          efficiency: Math.min(100, layer.efficiency + Math.random() * 2 - 1),
          status: layer.activation > 70 ? 'learning' : layer.activation > 30 ? 'active' : 'idle'
        })));

        setCurrentThought(thoughtPatterns[Math.floor(Math.random() * thoughtPatterns.length)]);

        // Update system metrics
        const totalNodes = layers.reduce((sum, layer) => sum + layer.nodes, 0);
        const totalConnections = layers.reduce((sum, layer) => sum + layer.connections, 0);
        const avgActivation = layers.reduce((sum, layer) => sum + layer.activation, 0) / layers.length;
        const avgEfficiency = layers.reduce((sum, layer) => sum + layer.efficiency, 0) / layers.length;

        setSystemMetrics(prev => ({
          ...prev,
          totalNodes,
          totalConnections,
          averageActivation: avgActivation,
          overallEfficiency: avgEfficiency,
          processingSpeed: avgActivation * 10,
          learningRate: (avgEfficiency / 100) * avgActivation,
          knowledgeBase: prev.knowledgeBase + Math.floor(Math.random() * 1000 + 500)
        }));
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing, layers]);

  const activateMultiLayerAI = () => {
    setIsProcessing(true);
    
    setLayers(prev => prev.map(layer => ({
      ...layer,
      status: 'active'
    })));

    toast({
      title: "🧠 MULTI-LAYER AI ACTIVATED",
      description: "All neural layers are now processing information simultaneously",
      duration: 5000,
    });
  };

  const optimizeAllLayers = () => {
    setLayers(prev => prev.map(layer => ({
      ...layer,
      efficiency: Math.min(100, layer.efficiency + 5),
      nodes: Math.floor(layer.nodes * 1.1),
      connections: Math.floor(layer.connections * 1.15),
      status: 'optimizing'
    })));

    setTimeout(() => {
      setLayers(prev => prev.map(layer => ({
        ...layer,
        status: 'active'
      })));
    }, 5000);

    toast({
      title: "⚡ Layer Optimization Complete",
      description: "All AI layers have been optimized for better performance",
      duration: 4000,
    });
  };

  const getLayerTypeColor = (type: AILayer['type']) => {
    switch (type) {
      case 'input': return 'bg-blue-500';
      case 'processing': return 'bg-green-500';
      case 'decision': return 'bg-yellow-500';
      case 'output': return 'bg-purple-500';
      case 'feedback': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: AILayer['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'learning': return 'text-blue-400 bg-blue-400/20 animate-pulse';
      case 'optimizing': return 'text-yellow-400 bg-yellow-400/20 animate-bounce';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Layers className="h-12 w-12 text-indigo-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MULTI-LAYER AI ARCHITECTURE
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Advanced Hierarchical Neural Processing & Decision Making System
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isProcessing ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              AI: {isProcessing ? 'PROCESSING' : 'STANDBY'}
            </Badge>
            <Badge className="px-4 py-2 bg-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              Layers: {layers.length}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              Nodes: {systemMetrics.totalNodes.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border-indigo-500/30">
            <CardContent className="p-4 text-center">
              <Brain className="h-6 w-6 mx-auto mb-2 text-indigo-400" />
              <p className="text-sm text-gray-400">Neural Nodes</p>
              <p className="text-2xl font-bold text-indigo-300">{(systemMetrics.totalNodes / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Network className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-400">Connections</p>
              <p className="text-2xl font-bold text-green-300">{(systemMetrics.totalConnections / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-400">Processing Speed</p>
              <p className="text-2xl font-bold text-purple-300">{systemMetrics.processingSpeed.toFixed(0)} ops/s</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <Database className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
              <p className="text-sm text-gray-400">Knowledge Base</p>
              <p className="text-2xl font-bold text-cyan-300">{(systemMetrics.knowledgeBase / 1000000).toFixed(1)}M</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Processing */}
        {isProcessing && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Brain className="h-5 w-5 mr-2 animate-pulse" />
                Current AI Thoughts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-black/30 rounded-lg">
                <p className="text-cyan-300 animate-pulse">{currentThought}</p>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Average Activation</label>
                  <Progress value={systemMetrics.averageActivation} className="mt-1" />
                  <span className="text-xs text-gray-500">{systemMetrics.averageActivation.toFixed(1)}%</span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Overall Efficiency</label>
                  <Progress value={systemMetrics.overallEfficiency} className="mt-1" />
                  <span className="text-xs text-gray-500">{systemMetrics.overallEfficiency.toFixed(1)}%</span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Learning Rate</label>
                  <Progress value={systemMetrics.learningRate} className="mt-1" />
                  <span className="text-xs text-gray-500">{systemMetrics.learningRate.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Control Panel */}
        <Card className="bg-black/40 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-400 flex items-center">
              <Layers className="h-6 w-6 mr-2" />
              Multi-Layer AI Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button
                onClick={activateMultiLayerAI}
                disabled={isProcessing}
                className="bg-indigo-600 hover:bg-indigo-500"
              >
                <Brain className="h-4 w-4 mr-2" />
                Activate Multi-Layer AI
              </Button>
              
              <Button
                onClick={optimizeAllLayers}
                variant="outline"
                className="text-purple-400 border-purple-400"
                disabled={!isProcessing}
              >
                <Zap className="h-4 w-4 mr-2" />
                Optimize All Layers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Layers */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Neural Layer Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {layers.map((layer, index) => (
                <div key={layer.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">L{layer.id}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          layer.status === 'learning' ? 'bg-blue-400 animate-pulse' :
                          layer.status === 'active' ? 'bg-green-400 animate-pulse' :
                          layer.status === 'optimizing' ? 'bg-yellow-400 animate-bounce' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <span className="text-white font-medium">{layer.name}</span>
                      <Badge className={getLayerTypeColor(layer.type)}>
                        {layer.type}
                      </Badge>
                      <Badge className={`${getStatusColor(layer.status)} border-0`}>
                        {layer.status}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>Nodes: {layer.nodes.toLocaleString()}</div>
                      <div>Connections: {layer.connections.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Activation Level</span>
                        <span>{layer.activation.toFixed(0)}%</span>
                      </div>
                      <Progress value={layer.activation} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Efficiency</span>
                        <span>{layer.efficiency.toFixed(0)}%</span>
                      </div>
                      <Progress value={layer.efficiency} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-400">Multi-Layer AI Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Processing Layers</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Sensory data input and preprocessing</li>
                  <li>• Multi-scale pattern recognition</li>
                  <li>• Feature extraction and analysis</li>
                  <li>• Contextual understanding</li>
                  <li>• Strategic decision formation</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Advanced Features</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Hierarchical learning architecture</li>
                  <li>• Cross-layer information flow</li>
                  <li>• Adaptive feedback mechanisms</li>
                  <li>• Self-optimizing neural pathways</li>
                  <li>• Continuous knowledge integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiLayerAI;
