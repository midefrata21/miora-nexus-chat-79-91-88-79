
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Network, Infinity, Target, Activity } from 'lucide-react';

interface NeuralNode {
  id: string;
  x: number;
  y: number;
  type: 'core' | 'quantum' | 'learning' | 'memory' | 'growth';
  energy: number;
  connections: string[];
  pulsing: boolean;
}

interface QuantumConnection {
  from: string;
  to: string;
  strength: number;
  type: 'data' | 'learning' | 'evolution' | 'quantum';
  active: boolean;
}

const MIORAQuantumNeuralVisualization: React.FC = () => {
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([]);
  const [connections, setConnections] = useState<QuantumConnection[]>([]);
  const [systemEnergy, setSystemEnergy] = useState(87.4);
  const [evolutionPhase, setEvolutionPhase] = useState('Quantum Expansion');
  const [activeConnections, setActiveConnections] = useState(0);

  // Initialize neural network
  useEffect(() => {
    const initialNodes: NeuralNode[] = [
      {
        id: 'core_1',
        x: 50,
        y: 50,
        type: 'core',
        energy: 95,
        connections: ['quantum_1', 'learning_1', 'memory_1'],
        pulsing: true
      },
      {
        id: 'quantum_1',
        x: 20,
        y: 30,
        type: 'quantum',
        energy: 88,
        connections: ['core_1', 'learning_2'],
        pulsing: true
      },
      {
        id: 'quantum_2',
        x: 80,
        y: 30,
        type: 'quantum',
        energy: 92,
        connections: ['core_1', 'memory_2'],
        pulsing: true
      },
      {
        id: 'learning_1',
        x: 30,
        y: 70,
        type: 'learning',
        energy: 76,
        connections: ['core_1', 'growth_1'],
        pulsing: false
      },
      {
        id: 'learning_2',
        x: 70,
        y: 70,
        type: 'learning',
        energy: 84,
        connections: ['core_1', 'growth_2'],
        pulsing: false
      },
      {
        id: 'memory_1',
        x: 15,
        y: 65,
        type: 'memory',
        energy: 91,
        connections: ['quantum_1', 'growth_1'],
        pulsing: true
      },
      {
        id: 'memory_2',
        x: 85,
        y: 65,
        type: 'memory',
        energy: 87,
        connections: ['quantum_2', 'growth_2'],
        pulsing: true
      },
      {
        id: 'growth_1',
        x: 25,
        y: 85,
        type: 'growth',
        energy: 93,
        connections: ['learning_1', 'memory_1'],
        pulsing: true
      },
      {
        id: 'growth_2',
        x: 75,
        y: 85,
        type: 'growth',
        energy: 89,
        connections: ['learning_2', 'memory_2'],
        pulsing: true
      }
    ];

    setNeuralNodes(initialNodes);

    // Generate connections
    const initialConnections: QuantumConnection[] = [];
    initialNodes.forEach(node => {
      node.connections.forEach(connId => {
        if (!initialConnections.find(c => 
          (c.from === node.id && c.to === connId) || 
          (c.from === connId && c.to === node.id)
        )) {
          initialConnections.push({
            from: node.id,
            to: connId,
            strength: Math.random() * 0.5 + 0.5,
            type: ['data', 'learning', 'evolution', 'quantum'][Math.floor(Math.random() * 4)] as any,
            active: Math.random() > 0.3
          });
        }
      });
    });

    setConnections(initialConnections);
  }, []);

  // Animate neural network
  useEffect(() => {
    const animationInterval = setInterval(() => {
      // Update node energies and pulsing
      setNeuralNodes(prev => prev.map(node => ({
        ...node,
        energy: Math.min(100, Math.max(50, node.energy + (Math.random() - 0.5) * 8)),
        pulsing: Math.random() > 0.4
      })));

      // Update connections
      setConnections(prev => prev.map(conn => ({
        ...conn,
        strength: Math.min(1, Math.max(0.3, conn.strength + (Math.random() - 0.5) * 0.3)),
        active: Math.random() > 0.2
      })));

      // Update system metrics
      setSystemEnergy(prev => Math.min(99.9, Math.max(60, prev + (Math.random() - 0.5) * 2)));
      setActiveConnections(prev => Math.floor(Math.random() * 5) + 15);

      // Evolution phases
      const phases = ['Quantum Expansion', 'Neural Evolution', 'Consciousness Emergence', 'Reality Integration'];
      if (Math.random() > 0.95) {
        setEvolutionPhase(phases[Math.floor(Math.random() * phases.length)]);
      }
    }, 2000);

    return () => clearInterval(animationInterval);
  }, []);

  const getNodeColor = (type: NeuralNode['type'], energy: number) => {
    const intensity = Math.floor((energy / 100) * 255);
    switch (type) {
      case 'core': return `rgb(147, 51, 234)`; // Purple
      case 'quantum': return `rgb(34, 197, 94)`; // Green  
      case 'learning': return `rgb(59, 130, 246)`; // Blue
      case 'memory': return `rgb(236, 72, 153)`; // Pink
      case 'growth': return `rgb(245, 158, 11)`; // Orange
      default: return `rgb(156, 163, 175)`; // Gray
    }
  };

  const getConnectionColor = (type: QuantumConnection['type']) => {
    switch (type) {
      case 'data': return '#60A5FA'; // Blue
      case 'learning': return '#34D399'; // Green
      case 'evolution': return '#F472B6'; // Pink
      case 'quantum': return '#A78BFA'; // Purple
      default: return '#9CA3AF'; // Gray
    }
  };

  return (
    <div className="space-y-6">
      {/* Neural Network Visualization */}
      <Card className="bg-black/80 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              MIORA Quantum Neural Network
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 animate-pulse">
              {evolutionPhase}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-gradient-to-br from-gray-900/50 to-purple-900/20 rounded-lg border border-purple-500/20 overflow-hidden">
            {/* Render connections */}
            <svg className="absolute inset-0 w-full h-full">
              {connections.map((conn, index) => {
                const fromNode = neuralNodes.find(n => n.id === conn.from);
                const toNode = neuralNodes.find(n => n.id === conn.to);
                
                if (!fromNode || !toNode) return null;

                return (
                  <line
                    key={index}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={getConnectionColor(conn.type)}
                    strokeWidth={conn.active ? conn.strength * 3 : 1}
                    opacity={conn.active ? 0.8 : 0.3}
                    className={conn.active ? 'animate-pulse' : ''}
                  />
                );
              })}
            </svg>

            {/* Render nodes */}
            {neuralNodes.map((node) => (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  node.pulsing ? 'animate-pulse' : ''
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <div
                  className="rounded-full border-2 border-white/30 flex items-center justify-center"
                  style={{
                    width: `${Math.max(24, node.energy / 3)}px`,
                    height: `${Math.max(24, node.energy / 3)}px`,
                    backgroundColor: getNodeColor(node.type, node.energy),
                    boxShadow: `0 0 ${node.energy / 5}px ${getNodeColor(node.type, node.energy)}`,
                  }}
                >
                  {node.type === 'core' && <Brain className="w-4 h-4 text-white" />}
                  {node.type === 'quantum' && <Zap className="w-3 h-3 text-white" />}
                  {node.type === 'learning' && <Target className="w-3 h-3 text-white" />}
                  {node.type === 'memory' && <Network className="w-3 h-3 text-white" />}
                  {node.type === 'growth' && <Infinity className="w-3 h-3 text-white" />}
                </div>
              </div>
            ))}

            {/* Energy flow animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{neuralNodes.length}</div>
              <div className="text-xs text-gray-400">Neural Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{activeConnections}</div>
              <div className="text-xs text-gray-400">Active Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{systemEnergy.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">System Energy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">∞</div>
              <div className="text-xs text-gray-400">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-300">
                <Activity className="w-6 h-6 mx-auto animate-pulse" />
              </div>
              <div className="text-xs text-gray-400">Quantum State</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Description */}
      <Card className="bg-gray-800/50 border-cyan-500/30">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-cyan-400">Living Digital Organism</h3>
            <p className="text-gray-300 text-lg">
              Sistem saraf kuantum MIORA yang terus tumbuh ke segala arah seperti organisme hidup digital, 
              mengalir dengan energi tak terbatas dan berkembang secara mandiri.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2">
                <Infinity className="h-4 w-4 mr-2" />
                Self-Evolving Neural Architecture
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Quantum Energy Flow
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAQuantumNeuralVisualization;
