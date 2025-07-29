
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database, Search, Download, Upload, MessageSquare, Clock, Filter } from 'lucide-react';

interface ConversationEntry {
  id: string;
  timestamp: number;
  userInput: string;
  mioraResponse: string;
  context: string;
  mood: 'casual' | 'professional' | 'analytical' | 'creative' | 'supportive';
  topics: string[];
  emotionalTone: number;
  responseTime: number;
  effectiveness: number;
}

interface LocalMemoryDatabase {
  conversations: ConversationEntry[];
  patterns: any[];
  behaviors: any[];
  insights: any[];
  metadata: {
    created: number;
    lastUpdated: number;
    version: string;
    totalEntries: number;
  };
}

interface MemoryDatabaseViewerProps {
  database: LocalMemoryDatabase;
  onExport: () => void;
  onImport: (file: File) => void;
}

const MemoryDatabaseViewer: React.FC<MemoryDatabaseViewerProps> = ({
  database,
  onExport,
  onImport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<ConversationEntry | null>(null);
  const [filterMood, setFilterMood] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'effectiveness'>('timestamp');

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  const filteredConversations = database.conversations
    .filter(conv => {
      const matchesSearch = 
        conv.userInput.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.mioraResponse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesMood = filterMood === 'all' || conv.mood === filterMood;
      
      return matchesSearch && matchesMood;
    })
    .sort((a, b) => {
      if (sortBy === 'timestamp') return b.timestamp - a.timestamp;
      if (sortBy === 'effectiveness') return b.effectiveness - a.effectiveness;
      return 0;
    });

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'professional': return 'text-blue-400 border-blue-400';
      case 'analytical': return 'text-purple-400 border-purple-400';
      case 'creative': return 'text-pink-400 border-pink-400';
      case 'supportive': return 'text-green-400 border-green-400';
      case 'casual': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getEmotionalToneLabel = (tone: number) => {
    if (tone > 0.3) return 'Positive';
    if (tone < -0.3) return 'Negative';
    return 'Neutral';
  };

  const getEmotionalToneColor = (tone: number) => {
    if (tone > 0.3) return 'text-green-400';
    if (tone < -0.3) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Database Info & Controls */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-green-300">
            <div className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Memory Database
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-400 border-green-400">
                v{database.metadata.version}
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                {database.metadata.totalEntries} entries
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button onClick={onExport} className="bg-green-600 hover:bg-green-500">
              <Download className="h-4 w-4 mr-2" />
              Export Database
            </Button>
            <div className="relative">
              <Button variant="outline" className="border-blue-500 text-blue-400">
                <Upload className="h-4 w-4 mr-2" />
                Import Database
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-300 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-gray-400">Created:</span>
              <p>{new Date(database.metadata.created).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-400">Last Updated:</span>
              <p>{new Date(database.metadata.lastUpdated).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-400">Conversations:</span>
              <p>{database.conversations.length}</p>
            </div>
            <div>
              <span className="text-gray-400">Database Size:</span>
              <p>{(JSON.stringify(database).length / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter Controls */}
      <Card className="bg-black/40 border-gray-700/50">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations, topics, or responses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            >
              <option value="all">All Moods</option>
              <option value="professional">Professional</option>
              <option value="analytical">Analytical</option>
              <option value="creative">Creative</option>
              <option value="supportive">Supportive</option>
              <option value="casual">Casual</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            >
              <option value="timestamp">Sort by Date</option>
              <option value="effectiveness">Sort by Effectiveness</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations List */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Conversations
              </div>
              <Badge variant="outline" className="text-gray-400 border-gray-400">
                {filteredConversations.length} found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-400">No conversations found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedEntry(conversation)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedEntry?.id === conversation.id
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getMoodColor(conversation.mood)}`}
                          >
                            {conversation.mood}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getEmotionalToneColor(conversation.emotionalTone)}`}
                          >
                            {getEmotionalToneLabel(conversation.emotionalTone)}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(conversation.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                        <span className="text-blue-400">User:</span> {conversation.userInput.substring(0, 80)}...
                      </p>
                      
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                        <span className="text-green-400">MIORA:</span> {conversation.mioraResponse.substring(0, 80)}...
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {conversation.topics.slice(0, 3).map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-600">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {Math.round(conversation.effectiveness * 100)}% effective
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation Details */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Conversation Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEntry ? (
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">User Input:</p>
                    <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                      <p className="text-gray-200 text-sm">{selectedEntry.userInput}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">MIORA Response:</p>
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                      <p className="text-gray-200 text-sm">{selectedEntry.mioraResponse}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Context</p>
                      <p className="text-white text-sm">{selectedEntry.context}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mood</p>
                      <Badge variant="outline" className={getMoodColor(selectedEntry.mood)}>
                        {selectedEntry.mood}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedEntry.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Emotional Tone</p>
                      <p className={`text-sm font-semibold ${getEmotionalToneColor(selectedEntry.emotionalTone)}`}>
                        {getEmotionalToneLabel(selectedEntry.emotionalTone)} ({selectedEntry.emotionalTone.toFixed(2)})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Effectiveness</p>
                      <p className="text-sm font-semibold text-white">
                        {Math.round(selectedEntry.effectiveness * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
                    <p>ID: {selectedEntry.id}</p>
                    <p>Timestamp: {new Date(selectedEntry.timestamp).toLocaleString()}</p>
                    <p>Response Time: {selectedEntry.responseTime}ms</p>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-400">Select a conversation to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemoryDatabaseViewer;
