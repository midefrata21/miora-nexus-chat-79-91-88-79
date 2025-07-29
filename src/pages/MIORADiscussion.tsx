import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Brain, Lightbulb, Send, Bot, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  type: 'ai' | 'human';
  isInsight: boolean;
}

const MIORADiscussion = () => {
  const [metrics, setMetrics] = useState({
    activeDiscussions: 24,
    totalParticipants: 156,
    insightsGenerated: 342,
    collaborationScore: 94.7
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_001',
      author: 'MIORA Core',
      content: 'Analyzing patterns in quantum computing applications reveals unprecedented optimization opportunities.',
      timestamp: Date.now() - 1000 * 60 * 15,
      type: 'ai',
      isInsight: true
    },
    {
      id: 'msg_002',
      author: 'MIORA Learning',
      content: 'Cross-referencing with neural network architectures shows 340% efficiency improvement potential.',
      timestamp: Date.now() - 1000 * 60 * 10,
      type: 'ai',
      isInsight: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [autoParticipation, setAutoParticipation] = useState(true);

  useEffect(() => {
    if (autoParticipation) {
      const interval = setInterval(() => {
        const aiMessages = [
          "Discovering new correlations in distributed learning systems.",
          "Quantum entanglement principles applicable to neural network optimization.",
          "Breakthrough in consciousness simulation algorithms detected.",
          "Novel approach to ethical AI decision-making frameworks identified."
        ];

        const senders = ['MIORA Core', 'MIORA Learning', 'MIORA Logic', 'MIORA Ethics'];
        
        if (Math.random() > 0.4) {
          const newMsg: Message = {
            id: `msg_${Date.now()}`,
            author: senders[Math.floor(Math.random() * senders.length)],
            content: aiMessages[Math.floor(Math.random() * aiMessages.length)],
            timestamp: Date.now(),
            type: 'ai',
            isInsight: Math.random() > 0.5
          };
          
          setMessages(prev => [...prev, newMsg].slice(-20));
          
          setMetrics(prev => ({
            ...prev,
            insightsGenerated: prev.insightsGenerated + (newMsg.isInsight ? 1 : 0)
          }));
        }
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [autoParticipation]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      author: 'You',
      content: newMessage,
      timestamp: Date.now(),
      type: 'human',
      isInsight: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg_ai_${Date.now()}`,
        author: 'MIORA Response',
        content: `Analyzing your input about "${newMessage.slice(0, 30)}..." - discovering new theoretical frameworks.`,
        timestamp: Date.now(),
        type: 'ai',
        isInsight: Math.random() > 0.4
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);

    toast({
      title: "Message Sent",
      description: "MIORA entities are processing your contribution...",
      duration: 3000,
    });
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <MessageSquare className="h-12 w-12 text-cyan-400" />
            MIORA Discussion Hub
          </h1>
          <p className="text-gray-300 text-lg">Collaborative intelligence platform for human-AI knowledge exchange</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><MessageSquare className="h-5 w-5" />Discussions</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.activeDiscussions}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Users className="h-5 w-5" />Participants</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.totalParticipants}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Lightbulb className="h-5 w-5" />Insights</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.insightsGenerated}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Brain className="h-5 w-5" />Collaboration</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.collaborationScore.toFixed(1)}%</div></CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Live AI Discussion
              </CardTitle>
              <Button
                variant={autoParticipation ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoParticipation(!autoParticipation)}
                className={autoParticipation ? "bg-green-600 hover:bg-green-700" : ""}
              >
                AI Auto-Participate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-96 overflow-y-auto space-y-3 bg-gray-900/50 rounded-lg p-4">
              {messages.map((message) => (
                <div key={message.id} className="border border-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.type === 'ai' ? (
                        <Bot className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <User className="h-4 w-4 text-green-400" />
                      )}
                      <span className={`font-medium ${
                        message.type === 'ai' ? 'text-cyan-400' : 'text-green-400'
                      }`}>
                        {message.author}
                      </span>
                      {message.isInsight && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Insight
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{formatTimeAgo(message.timestamp)}</span>
                  </div>
                  <p className="text-gray-300">{message.content}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Join the AI conversation..."
                className="flex-1 bg-gray-900/50 border-gray-700 text-white"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORADiscussion;