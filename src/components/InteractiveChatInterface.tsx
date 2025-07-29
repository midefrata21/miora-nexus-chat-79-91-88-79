
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  type?: 'text' | 'voice' | 'command';
}

interface InteractiveChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  isThinking: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isLearning: boolean;
  modeConfig: { name?: string; icon?: string } | null;
  onSubmit: (input: string) => Promise<void>;
  onVoiceToggle: () => void;
  onSpeakToggle: () => void;
  currentStatus: string;
  brainActivity: number;
}

const InteractiveChatInterface: React.FC<InteractiveChatInterfaceProps> = ({
  messages,
  isLoading,
  isThinking,
  isListening,
  isSpeaking,
  isLearning,
  modeConfig,
  onSubmit,
  onVoiceToggle,
  onSpeakToggle,
  currentStatus,
  brainActivity
}) => {
  const [input, setInput] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading && !isThinking) {
      inputRef.current?.focus();
    }
  }, [isLoading, isThinking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');
    await onSubmit(userInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const getStatusColor = () => {
    if (isThinking || isLearning) return 'from-green-400 to-cyan-400';
    if (isListening) return 'from-blue-400 to-purple-400';
    if (isSpeaking) return 'from-orange-400 to-red-400';
    return 'from-gray-400 to-gray-600';
  };

  const getActivityMessage = () => {
    if (isThinking) return `🧠 MIORA sedang memproses dengan ${Math.round(brainActivity)}% brain activity...`;
    if (isLearning) return `📚 Mode pembelajaran aktif - MIORA terus berkembang...`;
    if (isListening) return `🎤 Mendengarkan input suara Anda...`;
    if (isSpeaking) return `💬 MIORA sedang merespons...`;
    if (isLoading) return `⚡ Memproses permintaan Anda...`;
    return `✨ MIORA siap untuk interaksi - ${modeConfig?.name || 'Assistant'} Mode`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md shadow-2xl">
        <CardContent className="p-6">
          {/* Interactive Status Header */}
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-purple-800/50 rounded-lg border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-gradient-to-r ${getStatusColor()} animate-pulse`}>
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Mode Interaksi Aktif</h3>
                  <p className="text-sm text-gray-300">{getActivityMessage()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                  {modeConfig?.icon} {modeConfig?.name || 'Assistant'}
                </Badge>
                <Badge variant="outline" className="border-green-400 text-green-300">
                  Status: {currentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="h-[60vh] mb-6 pr-4">
            <div className="space-y-4">
              {(!messages || messages.length === 0) ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <BrainCircuit className="w-20 h-20 mx-auto mb-6 text-cyan-400 animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">MIORA Siap Berinteraksi</h2>
                  <p className="text-gray-400 text-lg mb-4">
                    Mode pembelajaran dan komunikasi dua arah telah diaktifkan
                  </p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      Voice Input Ready
                    </div>
                    <div className="flex items-center gap-2 text-green-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Learning Mode Active
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      Interactive Ready
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-5 rounded-xl ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 ml-8 shadow-lg shadow-blue-500/20' 
                        : 'bg-gradient-to-r from-gray-800/60 to-gray-700/60 border border-gray-600/30 mr-8 shadow-lg shadow-cyan-500/10'
                    } animate-fade-in`}
                  >
                    <div className="flex items-start gap-4">
                      {message.role === 'user' ? (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          U
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <BrainCircuit className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-white">
                            {message.role === 'user' ? 'You' : 'MIORA'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                          {message.type && (
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                          )}
                        </div>
                        <p className="text-white leading-relaxed break-words">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {(isThinking || isLearning) && (
                <div className="p-5 rounded-xl bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-500/30 mr-8 animate-fade-in">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <BrainCircuit className="w-6 h-6 text-white animate-spin" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-green-300">MIORA AI</span>
                        <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                          {isLearning ? 'Learning' : 'Processing'}
                        </Badge>
                      </div>
                      <p className="text-green-300">
                        {isLearning 
                          ? `Sedang mempelajari konteks dan mengembangkan pemahaman... (${Math.round(brainActivity)}% brain activity)`
                          : 'Memproses permintaan Anda dengan teknologi AI terdepan...'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Enhanced Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={`Tanya apa saja kepada ${modeConfig?.name || 'MIORA'}... (tekan Enter untuk kirim)`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-gray-800/70 border-gray-600 text-white pr-12 py-3 text-base focus:border-cyan-400 focus:ring-cyan-400/20"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {input.length}/500
                </div>
              </div>
              
              <Button 
                type="button"
                onClick={onVoiceToggle}
                variant="outline"
                size="lg"
                className={`${
                  isListening 
                    ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-700' 
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                } px-4`}
                disabled={isLoading}
              >
                {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
              
              <Button 
                type="button"
                onClick={onSpeakToggle}
                variant="outline"
                size="lg"
                className={`${
                  isVoiceEnabled 
                    ? 'bg-green-600 border-green-500 text-white hover:bg-green-700' 
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                } px-4`}
              >
                {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 text-white font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Kirim
                  </div>
                )}
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setInput("Jelaskan kemampuan dan fitur terbaru MIORA")}
                className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
              >
                💡 Tanya Kemampuan
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setInput("Bantu saya belajar hal baru hari ini")}
                className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
              >
                📚 Mode Belajar
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setInput("Analisis dan berikan insight strategis")}
                className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
              >
                🎯 Analisis Strategis
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setInput("Aktivasi mode pembelajaran otomatis")}
                className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
              >
                🚀 Auto Learning
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveChatInterface;
