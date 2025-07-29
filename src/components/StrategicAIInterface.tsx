
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStrategicAI } from '@/hooks/useStrategicAI';
import { 
  Brain, 
  Database, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Target, 
  Zap,
  Clock,
  Tag,
  Network
} from 'lucide-react';

const StrategicAIInterface: React.FC = () => {
  const {
    isStrategicModeActive,
    strategicPatterns,
    longTermMemory,
    adaptiveCommunication,
    getStrategicStats,
    getStrategicInsights,
    getAdaptiveResponseTone
  } = useStrategicAI();

  const [searchQuery, setSearchQuery] = useState('');
  const [insights, setInsights] = useState<any>(null);
  const stats = getStrategicStats();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const result = getStrategicInsights(searchQuery);
      setInsights(result);
    }
  };

  const currentTone = getAdaptiveResponseTone(adaptiveCommunication);

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Strategic AI Status */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-300">
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-2 animate-pulse" />
              MIORA Strategic AI Mode
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              {isStrategicModeActive ? 'ACTIVE 🧠' : 'STANDBY'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-purple-300">{stats.totalPatterns}</div>
              <div className="text-sm text-gray-400">Strategic Patterns</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Database className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold text-cyan-300">{stats.totalMemories}</div>
              <div className="text-sm text-gray-400">Long-term Memories</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-300">{stats.averagePatternEffectiveness.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Pattern Effectiveness</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-orange-300">{currentTone}</div>
              <div className="text-sm text-gray-400">Communication Tone</div>
            </div>
          </div>

          {/* Adaptive Communication Status */}
          <div className="bg-black/20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Adaptive Communication Context
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Time:</span>
                <Badge variant="outline" className="text-blue-300 border-blue-400">
                  {adaptiveCommunication.contextFactors.timeOfDay}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Topic:</span>
                <Badge variant="outline" className="text-purple-300 border-purple-400">
                  {adaptiveCommunication.contextFactors.conversationTopic}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Mood:</span>
                <Badge variant="outline" className="text-green-300 border-green-400">
                  {adaptiveCommunication.contextFactors.userMood}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Urgency:</span>
                <Badge variant="outline" className={`${
                  adaptiveCommunication.contextFactors.urgency === 'high' ? 'text-red-300 border-red-400' :
                  adaptiveCommunication.contextFactors.urgency === 'medium' ? 'text-yellow-300 border-yellow-400' :
                  'text-gray-300 border-gray-400'
                }`}>
                  {adaptiveCommunication.contextFactors.urgency}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights Search */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-green-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-300">
            <Target className="w-5 h-5 mr-2" />
            Strategic Insights Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Cari pola strategis atau memori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="bg-cyan-600 hover:bg-cyan-500 px-6"
            >
              <Target className="w-4 h-4 mr-2" />
              Analyze
            </Button>
          </div>

          {insights && (
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Strategic Analysis Result:</h4>
                <p className="text-green-300 mb-3">{insights.insights}</p>
                
                {insights.patterns.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-purple-300 font-medium mb-2">Relevant Patterns:</h5>
                    <div className="space-y-2">
                      {insights.patterns.map((pattern: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-800/50 rounded border-l-4 border-purple-400">
                          <div className="font-medium text-white">{pattern.pattern}</div>
                          <div className="text-sm text-gray-400">{pattern.context}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs text-purple-300 border-purple-400">
                              {pattern.category}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              Used {pattern.frequency} times
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strategic Data Tabs */}
      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns">Strategic Patterns</TabsTrigger>
          <TabsTrigger value="memory">Long-term Memory</TabsTrigger>
          <TabsTrigger value="documentation">Auto-Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center">
                <Network className="w-5 h-5 mr-2" />
                Strategic Patterns ({strategicPatterns.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategicPatterns.slice(0, 10).map((pattern, index) => (
                  <div key={pattern.id} className="p-4 bg-black/20 rounded-lg border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{pattern.pattern}</h4>
                      <Badge variant="outline" className="text-purple-300 border-purple-400">
                        {pattern.category}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{pattern.context}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {new Date(pattern.lastUsed).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400">Frequency: {pattern.frequency}</span>
                        <span className="text-green-400">Effectiveness: {pattern.effectiveness}%</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {strategicPatterns.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Network className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Pola strategis akan muncul seiring interaksi dengan MIORA</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="space-y-4">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Long-term Memory ({longTermMemory.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {longTermMemory.slice(-10).reverse().map((memory, index) => (
                  <div key={memory.id} className="p-4 bg-black/20 rounded-lg border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Memory Entry</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${
                          memory.importance >= 8 ? 'text-red-300 border-red-400' :
                          memory.importance >= 5 ? 'text-yellow-300 border-yellow-400' :
                          'text-gray-300 border-gray-400'
                        }`}>
                          Importance: {memory.importance}/10
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{memory.content}</p>
                    <p className="text-gray-400 text-sm mb-2">{memory.context}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {memory.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs text-cyan-300 border-cyan-400">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(memory.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
                
                {longTermMemory.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Long-term memory akan tersimpan seiring waktu</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Auto-Documentation System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Documentation Status:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">Active</div>
                      <div className="text-sm text-gray-400">Auto-backup Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{strategicPatterns.length}</div>
                      <div className="text-sm text-gray-400">Patterns Documented</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">{longTermMemory.length}</div>
                      <div className="text-sm text-gray-400">Memories Backed Up</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Auto-backup Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-gray-800/50 rounded">
                      <Zap className="w-4 h-4 text-green-400 mr-3" />
                      <span className="text-white text-sm">Strategic Pattern Recognition</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-800/50 rounded">
                      <Database className="w-4 h-4 text-cyan-400 mr-3" />
                      <span className="text-white text-sm">Long-term Memory Storage</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-800/50 rounded">
                      <FileText className="w-4 h-4 text-purple-400 mr-3" />
                      <span className="text-white text-sm">Growth Documentation</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-800/50 rounded">
                      <MessageSquare className="w-4 h-4 text-orange-400 mr-3" />
                      <span className="text-white text-sm">Adaptive Communication Log</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategicAIInterface;
