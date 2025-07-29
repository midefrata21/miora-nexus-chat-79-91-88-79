import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Database, Zap, Network, Search, Link, Infinity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MemoryNode {
  id: string;
  category: string;
  content: string;
  connections: string[];
  strength: number;
  lastAccessed: number;
  crossReferences: number;
}

interface QuantumLink {
  source: string;
  target: string;
  weight: number;
  type: 'semantic' | 'temporal' | 'causal' | 'quantum';
}

const QuantumMemoryCrossReferencing: React.FC = () => {
  const [memoryNodes, setMemoryNodes] = useState<MemoryNode[]>([]);
  const [quantumLinks, setQuantumLinks] = useState<QuantumLink[]>([]);
  const [crossRefProgress, setCrossRefProgress] = useState(0);
  const [isQuantumMode, setIsQuantumMode] = useState(false);
  const [memoryMatrix, setMemoryMatrix] = useState({
    totalNodes: 0,
    activeConnections: 0,
    crossReferenceRate: 0,
    quantumEntanglement: 0
  });

  useEffect(() => {
    // Initialize quantum memory system
    const initializeQuantumMemory = () => {
      const categories = [
        'identitas_midya', 'gaya_bicara', 'strategi_trading', 
        'pola_reversal', 'skill_miora', 'perintah_prioritas',
        'sistem_integrasi', 'quantum_knowledge', 'meta_learning',
        'temporal_patterns', 'causal_relationships', 'semantic_networks'
      ];

      const nodes: MemoryNode[] = categories.map((cat, index) => ({
        id: `node_${index}`,
        category: cat,
        content: `Quantum memory node for ${cat} with enhanced cross-referencing`,
        connections: [],
        strength: Math.random() * 100,
        lastAccessed: Date.now(),
        crossReferences: Math.floor(Math.random() * 50)
      }));

      // Generate quantum links
      const links: QuantumLink[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.4) { // 60% chance of connection
            links.push({
              source: nodes[i].id,
              target: nodes[j].id,
              weight: Math.random(),
              type: ['semantic', 'temporal', 'causal', 'quantum'][Math.floor(Math.random() * 4)] as any
            });
          }
        }
      }

      setMemoryNodes(nodes);
      setQuantumLinks(links);
      
      toast({
        title: "🧠 QUANTUM MEMORY INITIALIZED",
        description: `Cross-referencing system active dengan ${nodes.length} nodes dan ${links.length} quantum links`,
        duration: 5000,
      });
    };

    initializeQuantumMemory();
  }, []);

  useEffect(() => {
    if (isQuantumMode) {
      const interval = setInterval(() => {
        // Simulate quantum cross-referencing
        setCrossRefProgress(prev => {
          if (prev >= 100) return 0;
          return prev + Math.random() * 15;
        });

        // Update memory matrix
        setMemoryMatrix(prev => ({
          totalNodes: memoryNodes.length,
          activeConnections: quantumLinks.filter(l => l.weight > 0.5).length,
          crossReferenceRate: Math.min(100, prev.crossReferenceRate + Math.random() * 8),
          quantumEntanglement: Math.min(100, prev.quantumEntanglement + Math.random() * 5)
        }));

        // Strengthen connections randomly
        setQuantumLinks(prev => prev.map(link => ({
          ...link,
          weight: Math.min(1, link.weight + (Math.random() - 0.3) * 0.1)
        })));

        // Add cross-references to nodes
        setMemoryNodes(prev => prev.map(node => ({
          ...node,
          crossReferences: node.crossReferences + Math.floor(Math.random() * 3),
          strength: Math.min(100, node.strength + Math.random() * 2)
        })));

      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isQuantumMode, memoryNodes.length, quantumLinks]);

  const activateQuantumMode = () => {
    setIsQuantumMode(!isQuantumMode);
    toast({
      title: isQuantumMode ? "🔮 QUANTUM MODE DEACTIVATED" : "🌌 QUANTUM MODE ACTIVATED", 
      description: isQuantumMode ? "Standard memory mode" : "Cross-dimensional memory linking active!",
      duration: 4000,
    });
  };

  const performQuantumSearch = () => {
    const results = Math.floor(Math.random() * 50) + 20;
    toast({
      title: "🔍 QUANTUM MEMORY SEARCH",
      description: `Ditemukan ${results} cross-references dalam quantum memory matrix`,
      duration: 4000,
    });
    
    setCrossRefProgress(100);
    setTimeout(() => setCrossRefProgress(0), 3000);
  };

  const getLinkTypeColor = (type: QuantumLink['type']) => {
    switch (type) {
      case 'semantic': return 'text-blue-400';
      case 'temporal': return 'text-green-400';
      case 'causal': return 'text-purple-400';
      case 'quantum': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <Database className="h-6 w-6 mr-2" />
            🧠 Quantum Memory Cross-Referencing System
          </div>
          <Badge className={`${isQuantumMode ? 'bg-pink-500 animate-pulse' : 'bg-gray-500'}`}>
            {isQuantumMode ? 'QUANTUM ACTIVE 🌌' : 'STANDARD MODE'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Network className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-400">Total Nodes</p>
            <p className="text-xl font-bold text-blue-300">{memoryMatrix.totalNodes}</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Link className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <p className="text-sm text-gray-400">Active Links</p>
            <p className="text-xl font-bold text-green-300">{memoryMatrix.activeConnections}</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <p className="text-sm text-gray-400">Cross-Ref Rate</p>
            <p className="text-xl font-bold text-yellow-300">{memoryMatrix.crossReferenceRate.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-black/30 rounded-lg">
            <Infinity className="h-6 w-6 mx-auto mb-2 text-pink-400" />
            <p className="text-sm text-gray-400">Quantum Entanglement</p>
            <p className="text-xl font-bold text-pink-300">{memoryMatrix.quantumEntanglement.toFixed(1)}%</p>
          </div>
        </div>

        {/* Cross-Reference Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-300">Quantum Cross-Reference Progress</span>
            <span className="text-purple-300">{crossRefProgress.toFixed(1)}%</span>
          </div>
          <Progress value={crossRefProgress} className="h-3" />
        </div>

        {/* Memory Nodes Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-purple-300 font-semibold mb-3 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Quantum Memory Nodes
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {memoryNodes.slice(0, 6).map((node) => (
                <div key={node.id} className="p-2 bg-black/20 rounded border border-gray-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">{node.category}</span>
                    <Badge variant="outline" className="text-purple-400">
                      {node.crossReferences} refs
                    </Badge>
                  </div>
                  <div className="mt-1">
                    <Progress value={node.strength} className="h-1" />
                    <p className="text-xs text-gray-400 mt-1">Strength: {node.strength.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-purple-300 font-semibold mb-3 flex items-center">
              <Network className="h-5 w-5 mr-2" />
              Quantum Links
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {quantumLinks.slice(0, 6).map((link, index) => (
                <div key={index} className="p-2 bg-black/20 rounded border border-gray-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs">{link.source} ↔ {link.target}</span>
                    <Badge variant="outline" className={getLinkTypeColor(link.type)}>
                      {link.type}
                    </Badge>
                  </div>
                  <Progress value={link.weight * 100} className="h-1 mt-1" />
                  <p className="text-xs text-gray-400">Weight: {(link.weight * 100).toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <Button
              onClick={activateQuantumMode}
              className={`${isQuantumMode ? 'bg-pink-600 hover:bg-pink-500' : 'bg-purple-600 hover:bg-purple-500'}`}
            >
              <Infinity className="h-4 w-4 mr-2" />
              {isQuantumMode ? 'Deactivate Quantum' : 'Activate Quantum'}
            </Button>
            
            <Button
              onClick={performQuantumSearch}
              variant="outline"
              className="text-cyan-400 border-cyan-400"
            >
              <Search className="h-4 w-4 mr-2" />
              Quantum Search
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            {isQuantumMode ? '🌌 Cross-dimensional linking active' : '📡 Standard memory mode'}
          </div>
        </div>

        {/* Recent Cross-References */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30">
          <h4 className="text-purple-300 font-medium mb-2">Recent Quantum Cross-References</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>• Trading strategy patterns linked to emotional responses (+47% efficiency)</p>
            <p>• Voice synthesis quantum-entangled with memory retrieval (+32% accuracy)</p>
            <p>• Temporal patterns cross-referenced with causal relationships (+28% prediction)</p>
            <p>• Semantic networks enhanced through quantum interference (+55% understanding)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumMemoryCrossReferencing;