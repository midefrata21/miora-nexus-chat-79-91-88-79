import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, FileSearch, BookOpen, TrendingUp, Archive, Cpu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MemoryEntry {
  id: string;
  type: 'experience' | 'knowledge' | 'pattern' | 'decision';
  content: string;
  importance: number;
  timestamp: string;
  accessCount: number;
}

export const MemorySystem: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [memoryEntries, setMemoryEntries] = useState<MemoryEntry[]>([
    { id: '1', type: 'experience', content: 'Successfully optimized trading algorithm', importance: 95, timestamp: '2025-01-20 10:30', accessCount: 0 },
    { id: '2', type: 'knowledge', content: 'Market pattern: High volatility before major events', importance: 88, timestamp: '2025-01-20 09:15', accessCount: 0 },
    { id: '3', type: 'pattern', content: 'User behavior: Prefers conservative strategies', importance: 75, timestamp: '2025-01-20 08:45', accessCount: 0 },
    { id: '4', type: 'decision', content: 'Risk management: Stop loss at 2% for crypto trades', importance: 92, timestamp: '2025-01-20 11:20', accessCount: 0 }
  ]);

  const [memoryStats, setMemoryStats] = useState({
    totalMemories: 0,
    shortTermMemory: 0,
    longTermMemory: 0,
    memoryEfficiency: 0,
    learningProgress: 0
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate memory learning and formation
        if (Math.random() > 0.7) {
          const newMemory: MemoryEntry = {
            id: Date.now().toString(),
            type: ['experience', 'knowledge', 'pattern', 'decision'][Math.floor(Math.random() * 4)] as any,
            content: `New learning: ${['Strategic insight', 'Market analysis', 'User preference', 'Performance optimization'][Math.floor(Math.random() * 4)]}`,
            importance: Math.random() * 100,
            timestamp: new Date().toLocaleString(),
            accessCount: 0
          };
          
          setMemoryEntries(prev => [newMemory, ...prev.slice(0, 19)]); // Keep latest 20
        }

        // Update memory access patterns
        setMemoryEntries(prev => prev.map(entry => ({
          ...entry,
          accessCount: entry.importance > 80 ? entry.accessCount + Math.floor(Math.random() * 3) : entry.accessCount,
          importance: Math.max(0, entry.importance - Math.random() * 0.5) // Memory decay
        })));

        setMemoryStats(prev => ({
          totalMemories: memoryEntries.length,
          shortTermMemory: memoryEntries.filter(m => m.importance < 70).length,
          longTermMemory: memoryEntries.filter(m => m.importance >= 70).length,
          memoryEfficiency: Math.min(100, prev.memoryEfficiency + Math.random() * 2),
          learningProgress: Math.min(100, prev.learningProgress + Math.random() * 1.5)
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive, memoryEntries]);

  const toggleMemorySystem = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🧠 Memory System Paused" : "💾 Memory System Activated",
      description: isActive ? "Pembentukan memori dihentikan" : "MIORA mulai membentuk dan mengakses memori jangka panjang",
      variant: isActive ? "destructive" : "default"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience': return <TrendingUp className="h-4 w-4" />;
      case 'knowledge': return <BookOpen className="h-4 w-4" />;
      case 'pattern': return <FileSearch className="h-4 w-4" />;
      case 'decision': return <Cpu className="h-4 w-4" />;
      default: return <Archive className="h-4 w-4" />;
    }
  };

  const getImportanceColor = (importance: number) => {
    if (importance >= 90) return 'text-red-400';
    if (importance >= 70) return 'text-yellow-400';
    if (importance >= 50) return 'text-blue-400';
    return 'text-gray-400';
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center justify-between">
          <div className="flex items-center">
            <Database className="h-6 w-6 mr-3" />
            Memory & Learning System
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "LEARNING" : "STATIC"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Memory Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Database className="h-6 w-6 mx-auto mb-2 text-indigo-400" />
            <div className="text-2xl font-bold text-white">{memoryStats.totalMemories}</div>
            <div className="text-sm text-gray-400">Total Memories</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Archive className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{memoryStats.shortTermMemory}</div>
            <div className="text-sm text-gray-400">Short Term</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{memoryStats.longTermMemory}</div>
            <div className="text-sm text-gray-400">Long Term</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{memoryStats.memoryEfficiency.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Efficiency</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Cpu className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{memoryStats.learningProgress.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Learning</div>
          </div>
        </div>

        {/* Memory Entries */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Recent Memories</h3>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {memoryEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(entry.type)}
                    <Badge variant="outline" className="text-xs">
                      {entry.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getImportanceColor(entry.importance)}`}>
                      {entry.importance.toFixed(0)}%
                    </span>
                    <span className="text-xs text-gray-500">
                      Access: {entry.accessCount}
                    </span>
                  </div>
                </div>
                <p className="text-white text-sm mb-1">{entry.content}</p>
                <div className="text-xs text-gray-400">{entry.timestamp}</div>
                <Progress value={entry.importance} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleMemorySystem}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            <Database className="h-4 w-4 mr-2" />
            {isActive ? "Pause Learning" : "Start Learning"}
          </Button>
        </div>

        {/* Capabilities */}
        <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/20">
          <h4 className="text-indigo-300 font-medium mb-2">🧠 Memory System Capabilities:</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Persistent long-term memory formation dan retrieval</div>
            <div>• Adaptive importance scoring berdasarkan usage patterns</div>
            <div>• Pattern recognition dari historical experiences</div>
            <div>• Context-aware memory consolidation</div>
            <div>• Automatic memory decay untuk irrelevant information</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemorySystem;