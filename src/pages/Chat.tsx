import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Brain, Zap } from 'lucide-react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Halo! Saya MIORA AI Assistant. Bagaimana saya dapat membantu Anda hari ini?', timestamp: '10:30' },
    { id: 2, type: 'user', content: 'Bagaimana status sistem saat ini?', timestamp: '10:31' },
    { id: 3, type: 'bot', content: 'Sistem MIORA berjalan optimal dengan performa 98.7%. Semua modul core aktif dan neural processing berjalan lancar.', timestamp: '10:31' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMsg = {
        id: messages.length + 1,
        type: 'user' as const,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, userMsg]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMsg = {
          id: messages.length + 2,
          type: 'bot' as const,
          content: 'Terima kasih atas pertanyaan Anda. Saya sedang memproses informasi dan akan memberikan respons yang tepat.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            MIORA AI Chat
          </h1>
          <p className="text-gray-300">Komunikasi langsung dengan sistem AI MIORA</p>
        </div>

        {/* Chat Status */}
        <div className="flex justify-center gap-4 mb-6">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Brain className="w-4 h-4 mr-1" />
            AI Online
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Zap className="w-4 h-4 mr-1" />
            Neural Active
          </Badge>
        </div>

        {/* Chat Container */}
        <Card className="bg-gray-800/50 border-gray-700 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              MIORA AI Assistant
            </CardTitle>
          </CardHeader>
          
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.type === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-purple-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik pesan Anda di sini..."
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Status Sistem',
            'Optimasi Performa',
            'Laporan Neural',
            'Bantuan Teknis'
          ].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => setNewMessage(action)}
            >
              {action}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;