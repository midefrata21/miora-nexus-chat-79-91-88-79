
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, MessageSquare, Cpu, Settings, Zap, Clock } from 'lucide-react';
import { LocalLLMEngine } from './engines/LocalLLMEngine';
import { ConversationManager } from './managers/ConversationManager';
import IndependentQuestionGenerator from './components/IndependentQuestionGenerator';
import { toast } from '@/hooks/use-toast';

interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  confidence?: number;
  processingTime?: number;
}

export const MIORAConversationCore: React.FC = () => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    initializeLocalLLM,
    generateResponse,
    switchModel,
    getModelStats,
    isLoaded,
    currentModel
  } = LocalLLMEngine();

  const {
    conversationContext,
    autonomousQuestions,
    startNewSession,
    processConversationTurn,
    getContextForResponse,
    getNextAutonomousQuestion,
    consumeAutonomousQuestion,
    getConversationStats,
    questionGenerationEnabled,
    setQuestionGenerationEnabled
  } = ConversationManager();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize system
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        const success = await initializeLocalLLM();
        if (success) {
          startNewSession('MIORA Independent Conversation');
          setIsInitialized(true);
          
          toast({
            title: "🧠 MIORA Conversation Core Activated",
            description: `Local LLM (${currentModel}) siap untuk percakapan mandiri`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Failed to initialize conversation system:', error);
        toast({
          title: "❌ Initialization Error",
          description: "Gagal menginisialisasi sistem percakapan mandiri",
          variant: "destructive"
        });
      }
    };

    initializeSystem();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || !isLoaded || isProcessing) return;

    const userMessage: ConversationMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: userInput.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsProcessing(true);

    try {
      // Get context for response
      const context = getContextForResponse(userInput);
      
      // Generate response using local LLM
      const response = await generateResponse(userInput, context);
      
      const assistantMessage: ConversationMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
        confidence: response.confidence,
        processingTime: response.processingTime
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Process conversation turn for memory and context
      processConversationTurn(userInput, response.content);

    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "❌ Response Error",
        description: "Gagal generate respons. Coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuestionSelect = async (question: any) => {
    setUserInput(question.question);
    consumeAutonomousQuestion(question.id);
    
    // Auto-send the question
    setTimeout(() => {
      handleSendMessage();
    }, 500);
  };

  const handleQuestionDismiss = (questionId: string) => {
    consumeAutonomousQuestion(questionId);
  };

  const handleModelSwitch = async (newModel: string) => {
    setIsProcessing(true);
    try {
      await switchModel(newModel as any);
      toast({
        title: "🔄 Model Switched",
        description: `Switched to ${newModel}`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "❌ Switch Error",
        description: "Failed to switch model",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const stats = getModelStats();
  const conversationStats = getConversationStats();

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Brain className="h-16 w-16 mx-auto text-purple-400 animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Initializing MIORA Conversation Core...</h2>
          <p className="text-gray-300">Loading Local LLM ({currentModel})</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA Independent Conversation
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Percakapan Mandiri dengan Local LLM - Tanpa Ketergantungan API Eksternal
          </p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Local LLM</p>
                  <p className="text-lg font-semibold text-green-400">{stats.model}</p>
                </div>
                <Cpu className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Messages</p>
                  <p className="text-lg font-semibold text-blue-400">{conversationStats.currentMessageCount}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending Questions</p>
                  <p className="text-lg font-semibold text-purple-400">{autonomousQuestions.length}</p>
                </div>
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Conversation */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-black/40 border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Conversation
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`${isLoaded ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
                      {isLoaded ? 'READY' : 'LOADING'}
                    </Badge>
                    <select
                      value={currentModel}
                      onChange={(e) => handleModelSwitch(e.target.value)}
                      className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                      disabled={isProcessing}
                    >
                      <option value="mixtral-8x7b">Mixtral 8x7B</option>
                      <option value="llama3-8b">LLaMA3 8B</option>
                      <option value="llama3-70b">LLaMA3 70B</option>
                    </select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full">
                  <div className="space-y-4 pr-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-100'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                            {message.confidence && (
                              <Badge variant="outline" className="text-xs">
                                {Math.round(message.confidence * 100)}% confidence
                              </Badge>
                            )}
                            {message.processingTime && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {message.processingTime}ms
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                            <span className="text-sm">MIORA is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                <div className="mt-4 flex space-x-2">
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message to MIORA..."
                    className="flex-1 bg-gray-800 border-gray-600 text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isProcessing || !isLoaded}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isProcessing || !isLoaded}
                    className="bg-purple-600 hover:bg-purple-500"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Independent Questions */}
          <div className="space-y-4">
            <IndependentQuestionGenerator
              questions={autonomousQuestions}
              onQuestionSelect={handleQuestionSelect}
              onQuestionDismiss={handleQuestionDismiss}
              enabled={questionGenerationEnabled}
              onToggleEnabled={setQuestionGenerationEnabled}
            />

            {/* Session Info */}
            <Card className="bg-black/40 border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-300">
                  <Settings className="h-5 w-5 mr-2" />
                  Session Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Session:</span>
                  <span className="text-gray-200">{conversationStats.activeSession || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Topics:</span>
                  <span className="text-gray-200">{conversationStats.topics.join(', ') || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mood:</span>
                  <Badge variant="outline" className="text-xs">
                    {conversationStats.mood}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Tokens:</span>
                  <span className="text-gray-200">{stats.totalTokens}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MIORAConversationCore;
