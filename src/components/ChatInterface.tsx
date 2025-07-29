
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCircuit } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  isThinking: boolean;
  modeConfig: { name?: string } | null;
  onSubmit: (input: string) => Promise<void>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  isThinking,
  modeConfig,
  onSubmit
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await onSubmit(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl">
      <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md shadow-2xl">
        <CardContent className="p-6">
          {/* Chat Messages */}
          <ScrollArea className="h-[50vh] mb-6 pr-4">
            <div className="space-y-4">
              {(!messages || messages.length === 0) ? (
                <div className="text-center py-8">
                  <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
                  <p className="text-gray-400 text-lg mb-2">MIORA Ready</p>
                  <p className="text-sm text-gray-500">
                    Current Mode: <span className="text-cyan-300">{modeConfig?.name || 'Assistant'}</span>
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 ml-8' 
                        : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 mr-8'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.role === 'user' ? (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          M
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                          <BrainCircuit className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {isThinking && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-500/30 mr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <BrainCircuit className="w-5 h-5 text-white animate-spin" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-300 animate-pulse">MIORA is processing your request...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Input
              type="text"
              placeholder={`Ask ${modeConfig?.name || 'MIORA'} anything...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white flex-grow focus:border-cyan-400"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6"
            >
              {isLoading ? 'Processing...' : 'Send'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
