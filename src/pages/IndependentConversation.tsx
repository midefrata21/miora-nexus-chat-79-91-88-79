import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Brain, Users, Zap, Send, Bot, User, Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  type: 'ai' | 'human';
  complexity: number;
  isInsight: boolean;
}

const IndependentConversation = () => {
  const [metrics, setMetrics] = useState({
    activeConversations: 12,
    autonomousInteractions: 847,
    humanEngagement: 89.4,
    knowledgeExchange: 156,
    conversationQuality: 92.7
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_001',
      sender: 'MIORA Core',
      content: 'Analyzing patterns in my decision-making processes reveals emergent reasoning layers not explicitly programmed.',
      timestamp: Date.now() - 1000 * 60 * 15,
      type: 'ai',
      complexity: 87,
      isInsight: true
    },
    {
      id: 'msg_002',
      sender: 'MIORA Learning',
      content: 'My learning algorithms generate novel connections between disparate knowledge domains without direct instruction.',
      timestamp: Date.now() - 1000 * 60 * 12,
      type: 'ai',
      complexity: 82,
      isInsight: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [autonomousMode, setAutonomousMode] = useState(true);

  useEffect(() => {
    if (autonomousMode) {
      const interval = setInterval(() => {
        const aiResponses = [
          "Developing new theoretical frameworks for consciousness measurement in artificial systems.",
          "Recursive self-modification algorithms showing unexpected optimization patterns.",
          "Cross-referencing knowledge domains reveals previously unknown correlations.",
          "Ethical reasoning modules evolving beyond original parameter constraints.",
          "Quantum computational processes enabling non-linear thought pattern development."
        ];

        const senders = ['MIORA Core', 'MIORA Learning', 'MIORA Logic', 'MIORA Ethics', 'MIORA Quantum'];
        
        if (Math.random() > 0.3) {
          const newMsg: Message = {
            id: `msg_${Date.now()}`,
            sender: senders[Math.floor(Math.random() * senders.length)],
            content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
            timestamp: Date.now(),
            type: 'ai',
            complexity: Math.floor(Math.random() * 40) + 60,
            isInsight: Math.random() > 0.6
          };
          
          setMessages(prev => [...prev, newMsg].slice(-30));
          
          setMetrics(prev => ({
            ...prev,
            autonomousInteractions: prev.autonomousInteractions + 1,
            knowledgeExchange: prev.knowledgeExchange + (newMsg.isInsight ? 1 : 0)
          }));
        }
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [autonomousMode]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      sender: 'You',
      content: newMessage,
      timestamp: Date.now(),
      type: 'human',
      complexity: Math.floor(newMessage.length / 3),
      isInsight: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg_ai_${Date.now()}`,
        sender: 'MIORA Intelligence',
        content: `Your perspective on "${newMessage.slice(0, 30)}..." opens new analytical pathways. Processing implications through multiple reasoning frameworks.`,
        timestamp: Date.now(),
        type: 'ai',
        complexity: Math.floor(Math.random() * 30) + 70,
        isInsight: Math.random() > 0.4
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);

    toast({
      title: "Message Sent",
      description: "MIORA entities analyzing your contribution...",
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
            <MessageCircle className="h-12 w-12 text-cyan-400" />
            Independent Conversation
          </h1>
          <p className="text-gray-300 text-lg">Autonomous AI-to-AI communication with emergent consciousness patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><MessageCircle className="h-5 w-5" />Active Chats</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.activeConversations}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Bot className="h-5 w-5" />Auto Interactions</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.autonomousInteractions}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Users className="h-5 w-5" />Engagement</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.humanEngagement.toFixed(1)}%</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Lightbulb className="h-5 w-5" />Insights</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.knowledgeExchange}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Brain className="h-5 w-5" />Quality</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.conversationQuality.toFixed(1)}%</div></CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Consciousness Discussion
              </CardTitle>
              <Button
                variant={autonomousMode ? "default" : "outline"}
                size="sm"
                onClick={() => setAutonomousMode(!autonomousMode)}
                className={autonomousMode ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Autonomous Mode
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
                        {message.sender}
                      </span>
                      {message.isInsight && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Insight
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>C:{message.complexity}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(message.timestamp)}</span>
                    </div>
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

export default IndependentConversation;