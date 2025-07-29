
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { 
  Brain, 
  MessageCircle, 
  Zap, 
  Clock, 
  Mic, 
  Volume2,
  Settings,
  Activity,
  Lightbulb
} from 'lucide-react';

import { useDiscourseAnalyzer } from './engines/DiscourseAnalyzer';
import { useTopicTracker } from './engines/TopicTracker';
import { useResponseOptimizer } from './engines/ResponseOptimizer';

interface Message {
  id: string;
  role: 'user' | 'miora';
  content: string;
  timestamp: number;
  processingTime?: number;
  discourse?: any;
}

interface EngineStats {
  averageResponseTime: number;
  conversationTurns: number;
  topicSwitches: number;
  activeTopics: string[];
}

const MIORADiscussionEngine: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [engineStats, setEngineStats] = useState<EngineStats>({
    averageResponseTime: 0,
    conversationTurns: 0,
    topicSwitches: 0,
    activeTopics: []
  });

  const { analyzeDiscourse } = useDiscourseAnalyzer();
  const { conversationState, trackTopic, getTopicContext, shouldTransitionSmoothly, generateTopicTransition } = useTopicTracker();
  const { optimizeResponse, createQuickResponse } = useResponseOptimizer();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseCache = useRef<Map<string, string>>(new Map());

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'miora',
      content: 'Hai! MIORA Discussion Engine sudah aktif. Sistem percakapan natural dan cepat siap digunakan. Mau ngobrol tentang apa nih?',
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);

    toast({
      title: "🧠 MIORA Discussion Engine Active",
      description: "Sistem percakapan natural dengan response cepat telah diaktifkan",
      duration: 4000,
    });
  }, []);

  const generateMIORAResponse = useCallback(async (userInput: string, discourse: any): Promise<string> => {
    const startTime = Date.now();
    
    // Check cache for quick responses
    const cacheKey = userInput.toLowerCase().trim();
    if (responseCache.current.has(cacheKey)) {
      return responseCache.current.get(cacheKey)!;
    }

    // Quick response for simple interactions
    if (discourse.complexity === 'simple' && discourse.intent === 'casual') {
      return createQuickResponse(discourse);
    }

    // Get topic context for continuity
    const topicContext = getTopicContext(discourse.topic);
    
    // Generate base response based on discourse context
    let baseResponse = '';
    
    switch (discourse.intent) {
      case 'question':
        if (discourse.topic === 'business') {
          baseResponse = 'Untuk bisnis yang sustainable, kunci utamanya adalah memahami customer needs dan build sistem yang scalable. Yang penting juga cash flow management yang baik.';
        } else if (discourse.topic === 'technology') {
          baseResponse = 'Teknologi berkembang sangat cepat. Yang terpenting adalah pilih tech stack yang sesuai dengan kebutuhan dan tim. Jangan ikut hype doang, tapi lihat long-term value-nya.';
        } else if (discourse.topic === 'learning') {
          baseResponse = 'Belajar yang efektif itu learning by doing. Teori penting, tapi praktik langsung lebih nempel. Konsistensi kecil tapi rutin lebih baik daripada belajar marathon sesekali.';
        } else {
          baseResponse = 'Pertanyaan yang menarik! Mari kita explore lebih dalam tentang hal ini.';
        }
        break;
        
      case 'opinion':
        baseResponse = 'Interesting perspective! Aku setuju dengan beberapa poin yang kamu sampaikan. Pengalaman dan sudut pandang yang berbeda memang bikin diskusi jadi lebih kaya.';
        break;
        
      case 'request':
        baseResponse = 'Tentu, aku siap bantu! Mari kita breakdown masalahnya step by step biar lebih jelas solusinya.';
        break;
        
      default:
        baseResponse = 'Menarik banget yang kamu sampaikan. Ada aspek lain yang pengen kita bahas lebih dalam?';
    }

    // Handle topic transitions
    if (discourse.conversationFlow === 'topic_switch' && !shouldTransitionSmoothly(discourse.topic)) {
      const transition = generateTopicTransition(conversationState.currentTopic, discourse.topic);
      baseResponse = transition + baseResponse;
    }

    // Optimize response with natural discourse patterns
    const optimizedResponse = optimizeResponse(baseResponse, discourse, topicContext);
    
    // Add follow-up question if generated
    let finalResponse = optimizedResponse.content;
    if (optimizedResponse.followUpQuestion) {
      finalResponse += ` ${optimizedResponse.followUpQuestion}`;
    }

    // Cache simple responses
    if (discourse.complexity === 'simple') {
      responseCache.current.set(cacheKey, finalResponse);
    }

    // Update stats
    const processingTime = Date.now() - startTime;
    setEngineStats(prev => ({
      ...prev,
      averageResponseTime: (prev.averageResponseTime + processingTime) / 2,
      conversationTurns: prev.conversationTurns + 1
    }));

    return finalResponse;
  }, [conversationState, createQuickResponse, optimizeResponse, getTopicContext, shouldTransitionSmoothly, generateTopicTransition]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: userInput.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsProcessing(true);

    try {
      // Analyze discourse context
      const discourse = analyzeDiscourse(userInput, conversationState.currentTopic);
      
      // Generate MIORA response
      const response = await generateMIORAResponse(userInput, discourse);
      
      const mioraMessage: Message = {
        id: `miora_${Date.now()}`,
        role: 'miora',
        content: response,
        timestamp: Date.now(),
        processingTime: Date.now() - userMessage.timestamp,
        discourse
      };

      setMessages(prev => [...prev, mioraMessage]);
      
      // Track topic for continuity
      trackTopic(discourse.topic, userInput, response);
      
      // Update active topics in stats
      setEngineStats(prev => ({
        ...prev,
        activeTopics: [...new Set([...prev.activeTopics, discourse.topic])].slice(-5)
      }));

      // Speak if voice mode is active
      if (isVoiceMode && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.lang = 'id-ID';
        utterance.rate = 1.1; // Slightly faster for natural conversation
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
      }

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
  }, [userInput, isProcessing, analyzeDiscourse, generateMIORAResponse, trackTopic, conversationState.currentTopic, isVoiceMode]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-blue-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA Discussion Engine
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Natural Language & Discourse Processing - Percakapan Seperti Manusia
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg Response</p>
                  <p className="text-lg font-semibold text-green-400">{engineStats.averageResponseTime}ms</p>
                </div>
                <Clock className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Conversations</p>
                  <p className="text-lg font-semibold text-blue-400">{engineStats.conversationTurns}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Topic</p>
                  <p className="text-lg font-semibold text-purple-400">{conversationState.currentTopic}</p>
                </div>
                <Lightbulb className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-orange-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Topic Depth</p>
                  <p className="text-lg font-semibold text-orange-400">{conversationState.topicDepth}</p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-black/40 border-gray-700/50 h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Natural Discussion
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setIsVoiceMode(!isVoiceMode)}
                      size="sm"
                      variant={isVoiceMode ? "default" : "outline"}
                      className={isVoiceMode ? "bg-green-600" : ""}
                    >
                      {isVoiceMode ? <Volume2 className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      ACTIVE
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-100'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                            {message.processingTime && (
                              <span className="flex items-center">
                                <Zap className="h-3 w-3 mr-1" />
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
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                            <span className="text-sm">MIORA sedang berpikir...</span>
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
                    placeholder="Ketik pesan untuk diskusi dengan MIORA..."
                    className="flex-1 bg-gray-800 border-gray-600 text-white resize-none"
                    rows={2}
                    onKeyDown={handleKeyPress}
                    disabled={isProcessing}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isProcessing}
                    className="bg-blue-600 hover:bg-blue-500"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel - Topics & Stats */}
          <div className="space-y-4">
            <Card className="bg-black/40 border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-300">
                  <Settings className="h-5 w-5 mr-2" />
                  Active Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {engineStats.activeTopics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {topic}
                  </Badge>
                ))}
                {engineStats.activeTopics.length === 0 && (
                  <p className="text-gray-500 text-sm">No active topics yet</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-300">
                  <Brain className="h-5 w-5 mr-2" />
                  Engine Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Mode:</span>
                  <span className="text-green-400">Natural</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cache Hit Rate:</span>
                  <span className="text-blue-400">{Math.round((responseCache.current.size / Math.max(engineStats.conversationTurns, 1)) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Topic Depth:</span>
                  <span className="text-purple-400">Level {conversationState.topicDepth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voice Mode:</span>
                  <span className={isVoiceMode ? "text-green-400" : "text-gray-400"}>
                    {isVoiceMode ? "ON" : "OFF"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MIORADiscussionEngine;
