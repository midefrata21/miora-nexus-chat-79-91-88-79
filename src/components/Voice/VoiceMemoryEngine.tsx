
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Heart, 
  MessageCircle, 
  Download, 
  Trash2, 
  Search,
  Filter,
  BarChart3,
  Clock,
  User,
  Bot
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ConversationContext {
  id: string;
  timestamp: number;
  speaker: 'user' | 'miora';
  content: string;
  emotion: string;
  topic: string;
  confidence: number;
}

interface VoiceMemoryEngineProps {
  conversations: ConversationContext[];
  onClearMemory: () => void;
  onExportMemory: () => void;
}

const VoiceMemoryEngine: React.FC<VoiceMemoryEngineProps> = ({
  conversations,
  onClearMemory,
  onExportMemory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmotion, setFilterEmotion] = useState<string>('all');
  const [filterSpeaker, setFilterSpeaker] = useState<string>('all');
  const [filteredConversations, setFilteredConversations] = useState<ConversationContext[]>([]);

  // Filter conversations based on search and filters
  useEffect(() => {
    let filtered = conversations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(conv => 
        conv.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Emotion filter
    if (filterEmotion !== 'all') {
      filtered = filtered.filter(conv => conv.emotion === filterEmotion);
    }

    // Speaker filter
    if (filterSpeaker !== 'all') {
      filtered = filtered.filter(conv => conv.speaker === filterSpeaker);
    }

    setFilteredConversations(filtered);
  }, [conversations, searchTerm, filterEmotion, filterSpeaker]);

  // Get conversation statistics
  const getConversationStats = () => {
    const stats = {
      totalInteractions: conversations.length,
      userMessages: conversations.filter(c => c.speaker === 'user').length,
      mioraMessages: conversations.filter(c => c.speaker === 'miora').length,
      emotions: {} as Record<string, number>,
      topics: {} as Record<string, number>,
      avgConfidence: 0,
      conversationDuration: 0
    };

    // Calculate emotion distribution
    conversations.forEach(conv => {
      stats.emotions[conv.emotion] = (stats.emotions[conv.emotion] || 0) + 1;
      stats.topics[conv.topic] = (stats.topics[conv.topic] || 0) + 1;
      stats.avgConfidence += conv.confidence;
    });

    if (conversations.length > 0) {
      stats.avgConfidence = stats.avgConfidence / conversations.length;
      
      // Calculate conversation duration
      const firstMessage = conversations[0];
      const lastMessage = conversations[conversations.length - 1];
      if (firstMessage && lastMessage) {
        stats.conversationDuration = lastMessage.timestamp - firstMessage.timestamp;
      }
    }

    return stats;
  };

  const stats = getConversationStats();

  // Get unique emotions and topics for filters
  const uniqueEmotions = Array.from(new Set(conversations.map(c => c.emotion)));
  const uniqueTopics = Array.from(new Set(conversations.map(c => c.topic)));

  // Format emotion badge color
  const getEmotionColor = (emotion: string) => {
    const colors = {
      happy: 'bg-green-500',
      sad: 'bg-blue-500',
      concerned: 'bg-yellow-500',
      focused: 'bg-purple-500',
      excited: 'bg-orange-500',
      neutral: 'bg-gray-500'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-500';
  };

  // Format topic badge color
  const getTopicColor = (topic: string) => {
    const colors = {
      business: 'bg-cyan-500',
      technology: 'bg-purple-500',
      learning: 'bg-green-500',
      life: 'bg-pink-500',
      general: 'bg-gray-500'
    };
    return colors[topic as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Memory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-300 text-sm">Total Interactions</p>
                <p className="text-white text-2xl font-bold">{stats.totalInteractions}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Avg Confidence</p>
                <p className="text-white text-2xl font-bold">{Math.round(stats.avgConfidence * 100)}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Emotions Detected</p>
                <p className="text-white text-2xl font-bold">{Object.keys(stats.emotions).length}</p>
              </div>
              <Heart className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm">Duration</p>
                <p className="text-white text-2xl font-bold">
                  {Math.floor(stats.conversationDuration / 60000)}m
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emotion & Topic Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-pink-500/30">
          <CardHeader>
            <CardTitle className="text-pink-300 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Emotion Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(stats.emotions).map(([emotion, count]) => (
                <div key={emotion} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getEmotionColor(emotion)}`}></div>
                    <span className="text-white capitalize">{emotion}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count} ({Math.round((count / stats.totalInteractions) * 100)}%)
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Topic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(stats.topics).map(([topic, count]) => (
                <div key={topic} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getTopicColor(topic)}`}></div>
                    <span className="text-white capitalize">{topic}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count} ({Math.round((count / stats.totalInteractions) * 100)}%)
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memory Management */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-purple-900/50 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Conversation Memory & Context
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onExportMemory}
                size="sm"
                variant="outline"
                className="border-cyan-400 text-cyan-300 hover:bg-cyan-500/20"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button
                onClick={onClearMemory}
                size="sm"
                variant="outline"
                className="border-red-400 text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select 
                value={filterEmotion}
                onChange={(e) => setFilterEmotion(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              >
                <option value="all">All Emotions</option>
                {uniqueEmotions.map(emotion => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>
              
              <select 
                value={filterSpeaker}
                onChange={(e) => setFilterSpeaker(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              >
                <option value="all">All Speakers</option>
                <option value="user">User</option>
                <option value="miora">MIORA</option>
              </select>
            </div>
          </div>

          {/* Conversation History */}
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">No conversation history found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Start a voice conversation to build memory and context
                  </p>
                </div>
              ) : (
                filteredConversations.map((conversation, index) => (
                  <div 
                    key={conversation.id} 
                    className={`p-4 rounded-lg border ${
                      conversation.speaker === 'user' 
                        ? 'bg-blue-600/20 border-blue-500/30 ml-8' 
                        : 'bg-gray-700/30 border-gray-600/30 mr-8'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {conversation.speaker === 'user' ? (
                          <User className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Bot className="w-4 h-4 text-cyan-400" />
                        )}
                        <span className="text-sm font-medium text-white capitalize">
                          {conversation.speaker === 'user' ? 'You' : 'MIORA'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(conversation.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="flex gap-1">
                        <Badge 
                          className={`text-xs ${getEmotionColor(conversation.emotion)} text-white`}
                        >
                          {conversation.emotion}
                        </Badge>
                        <Badge 
                          className={`text-xs ${getTopicColor(conversation.topic)} text-white`}
                        >
                          {conversation.topic}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-white text-sm leading-relaxed">
                      {conversation.content}
                    </p>
                    
                    {conversation.confidence && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-400">Confidence:</span>
                        <div className="flex-1 bg-gray-600 rounded-full h-1 max-w-[100px]">
                          <div 
                            className="bg-green-400 h-1 rounded-full" 
                            style={{ width: `${conversation.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {Math.round(conversation.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceMemoryEngine;
