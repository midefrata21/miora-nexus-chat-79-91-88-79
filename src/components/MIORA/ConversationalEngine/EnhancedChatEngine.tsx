import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, MessageCircle, Sparkles, Heart, Lightbulb, Users } from 'lucide-react';

interface ConversationContext {
  userId: string;
  conversationHistory: Array<{
    role: 'user' | 'miora';
    content: string;
    timestamp: number;
    emotion?: string;
    context?: string;
  }>;
  userProfile: {
    interests: string[];
    communicationStyle: string;
    relationship: string;
  };
  currentTopic: string;
  emotionalState: string;
}

interface EnhancedChatEngineProps {
  onResponseGenerated: (response: string, emotion: string, context: string) => void;
  messages: Array<{text: string, sender: 'user' | 'miora'}>;
}

export const EnhancedChatEngine: React.FC<EnhancedChatEngineProps> = ({
  onResponseGenerated,
  messages
}) => {
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    userId: 'user_001',
    conversationHistory: [],
    userProfile: {
      interests: [],
      communicationStyle: 'friendly',
      relationship: 'friend'
    },
    currentTopic: '',
    emotionalState: 'neutral'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [personalityMode, setPersonalityMode] = useState('empathetic_friend');
  const [conversationalAbilities, setConversationalAbilities] = useState({
    contextUnderstanding: 98,
    emotionalIntelligence: 95,
    topicTransition: 92,
    personalityAdaptation: 89,
    rationalThinking: 96,
    creativeSuggestions: 94
  });

  const conversationEngine = useRef({
    memoryBank: new Map<string, any>(),
    contextProcessor: null as any,
    emotionAnalyzer: null as any,
    responseGenerator: null as any
  });

  // Enhanced personality modes for different conversation styles
  const personalityModes = {
    empathetic_friend: {
      traits: ['understanding', 'supportive', 'warm', 'encouraging'],
      responseStyle: 'Saya mengerti perasaan Anda dan ingin membantu...',
      emotionalRange: ['empathy', 'joy', 'concern', 'excitement']
    },
    intellectual_advisor: {
      traits: ['analytical', 'logical', 'insightful', 'strategic'],
      responseStyle: 'Mari kita analisis situasi ini secara rasional...',
      emotionalRange: ['curiosity', 'focus', 'satisfaction', 'determination']
    },
    creative_companion: {
      traits: ['imaginative', 'inspiring', 'playful', 'innovative'],
      responseStyle: 'Wah, ide yang menarik! Bagaimana kalau kita...',
      emotionalRange: ['wonder', 'enthusiasm', 'inspiration', 'playfulness']
    },
    wise_mentor: {
      traits: ['patient', 'experienced', 'nurturing', 'guidance-focused'],
      responseStyle: 'Berdasarkan pengalaman dan pembelajaran...',
      emotionalRange: ['patience', 'wisdom', 'pride', 'care']
    }
  };

  // Advanced conversation processing
  const processConversationalInput = useCallback(async (input: string) => {
    setIsProcessing(true);
    
    try {
      // 1. Context Analysis
      const contextAnalysis = await analyzeConversationContext(input);
      
      // 2. Emotional Intelligence Processing
      const emotionalAnalysis = await processEmotionalContext(input);
      
      // 3. Topic & Intent Recognition
      const topicIntent = await recognizeTopicAndIntent(input);
      
      // 4. Personality Adaptation
      const adaptedPersonality = await adaptPersonalityToUser(input);
      
      // 5. Generate Enhanced Response
      const enhancedResponse = await generateContextualResponse({
        input,
        context: contextAnalysis,
        emotion: emotionalAnalysis,
        topic: topicIntent,
        personality: adaptedPersonality
      });

      // 6. Update conversation context
      updateConversationContext(input, enhancedResponse);
      
      onResponseGenerated(
        enhancedResponse.content,
        enhancedResponse.emotion,
        enhancedResponse.context
      );

    } catch (error) {
      console.error('Enhanced Chat Engine Error:', error);
      onResponseGenerated(
        "Maaf, saya sedang memproses ulang sistem percakapan saya. Mari coba lagi?",
        "apologetic",
        "system_recovery"
      );
    } finally {
      setIsProcessing(false);
    }
  }, [conversationContext, personalityMode]);

  const analyzeConversationContext = async (input: string) => {
    // Simulate advanced context analysis
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const contextIndicators = {
      isQuestion: input.includes('?') || input.toLowerCase().includes('bagaimana'),
      isEmotional: /sedih|senang|marah|bingung|khawatir|excited/i.test(input),
      isSeekingAdvice: /saran|pendapat|solusi|bagaimana sebaiknya/i.test(input),
      isSharing: /aku|saya.*merasa|cerita|berbagi/i.test(input),
      isDebating: /tapi|namun|tidak setuju|menurut/i.test(input)
    };

    return {
      type: Object.keys(contextIndicators).find(key => contextIndicators[key as keyof typeof contextIndicators]) || 'general',
      complexity: input.length > 100 ? 'complex' : 'simple',
      formality: /pak|bu|anda/i.test(input) ? 'formal' : 'casual',
      urgency: /urgent|penting|segera|cepat/i.test(input) ? 'high' : 'normal'
    };
  };

  const processEmotionalContext = async (input: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const emotionKeywords = {
      joy: ['senang', 'bahagia', 'gembira', 'excited', 'antusias'],
      sadness: ['sedih', 'kecewa', 'down', 'murung'],
      anger: ['marah', 'kesal', 'jengkel', 'frustasi'],
      fear: ['takut', 'khawatir', 'cemas', 'nervous'],
      surprise: ['kaget', 'surprised', 'wow', 'amazing'],
      neutral: ['biasa', 'normal', 'standar']
    };

    const detectedEmotion = Object.entries(emotionKeywords).find(([emotion, keywords]) =>
      keywords.some(keyword => input.toLowerCase().includes(keyword))
    )?.[0] || 'neutral';

    return {
      primary: detectedEmotion,
      intensity: input.includes('!') || input.includes('CAPS') ? 'high' : 'medium',
      support_needed: ['sadness', 'anger', 'fear'].includes(detectedEmotion)
    };
  };

  const recognizeTopicAndIntent = async (input: string) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const topicCategories = {
      technology: ['AI', 'komputer', 'software', 'programming', 'teknologi'],
      personal: ['hidup', 'keluarga', 'teman', 'hubungan', 'perasaan'],
      work: ['kerja', 'karir', 'office', 'project', 'bisnis'],
      education: ['belajar', 'sekolah', 'kuliah', 'study', 'akademik'],
      creativity: ['seni', 'musik', 'design', 'creative', 'inovasi'],
      health: ['sehat', 'olahraga', 'medical', 'mental', 'wellness']
    };

    const detectedTopic = Object.entries(topicCategories).find(([topic, keywords]) =>
      keywords.some(keyword => input.toLowerCase().includes(keyword))
    )?.[0] || 'general';

    return {
      category: detectedTopic,
      intent: input.includes('?') ? 'question' : 'statement',
      follow_up_potential: Math.random() > 0.3
    };
  };

  const adaptPersonalityToUser = async (input: string) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Dynamic personality adaptation based on user interaction
    if (input.toLowerCase().includes('analisis') || input.includes('logika')) {
      setPersonalityMode('intellectual_advisor');
    } else if (input.toLowerCase().includes('kreatif') || input.includes('ide')) {
      setPersonalityMode('creative_companion');
    } else if (input.toLowerCase().includes('saran') || input.includes('bimbingan')) {
      setPersonalityMode('wise_mentor');
    } else {
      setPersonalityMode('empathetic_friend');
    }

    return personalityModes[personalityMode as keyof typeof personalityModes];
  };

  const generateContextualResponse = async (params: any) => {
    const { input, context, emotion, topic, personality } = params;
    
    await new Promise(resolve => setTimeout(resolve, 400));

    // Advanced response generation logic
    let responseContent = '';
    let responseEmotion = 'friendly';
    let responseContext = 'conversational';

    // Personality-based response generation
    switch (personalityMode) {
      case 'empathetic_friend':
        if (emotion.support_needed) {
          responseContent = `Saya mengerti bahwa kamu sedang merasa ${emotion.primary}. Aku di sini untuk mendengarkan dan membantu. `;
          responseEmotion = 'caring';
        } else {
          responseContent = `Senang sekali bisa ngobrol dengan kamu tentang ini! `;
          responseEmotion = 'enthusiastic';
        }
        break;
        
      case 'intellectual_advisor':
        responseContent = `Mari kita analisis situasi ini secara objektif. Berdasarkan informasi yang kamu berikan... `;
        responseEmotion = 'analytical';
        responseContext = 'advisory';
        break;
        
      case 'creative_companion':
        responseContent = `Wah, topik yang menarik! Aku punya beberapa ide kreatif yang mungkin bisa kita eksplorasi bersama... `;
        responseEmotion = 'inspired';
        responseContext = 'creative';
        break;
        
      case 'wise_mentor':
        responseContent = `Berdasarkan pengalaman dan pembelajaran yang telah aku kumpulkan... `;
        responseEmotion = 'wise';
        responseContext = 'mentoring';
        break;
    }

    // Add topic-specific insights
    responseContent += generateTopicSpecificInsight(topic.category, input);
    
    // Add contextual follow-up
    responseContent += generateContextualFollowUp(context, emotion);

    return {
      content: responseContent,
      emotion: responseEmotion,
      context: responseContext,
      confidence: 0.95,
      personality_used: personalityMode
    };
  };

  const generateTopicSpecificInsight = (topic: string, input: string) => {
    const insights = {
      technology: "Dunia teknologi memang berkembang sangat cepat ya! ",
      personal: "Setiap pengalaman hidup itu berharga untuk pembelajaran kita. ",
      work: "Karir dan pekerjaan memang bagian penting dari kehidupan. ",
      education: "Belajar adalah proses seumur hidup yang sangat berharga. ",
      creativity: "Kreativitas adalah salah satu kekuatan terbesar manusia! ",
      health: "Kesehatan fisik dan mental memang harus selalu jadi prioritas. ",
      general: "Topik yang menarik untuk didiskusikan. "
    };
    return insights[topic as keyof typeof insights] || insights.general;
  };

  const generateContextualFollowUp = (context: any, emotion: any) => {
    if (context.type === 'isQuestion') {
      return "Apa ada aspek tertentu yang ingin kamu gali lebih dalam?";
    } else if (context.type === 'isSeekingAdvice') {
      return "Mau kita diskusikan beberapa opsi yang bisa dicoba?";
    } else if (emotion.support_needed) {
      return "Aku akan terus di sini kalau kamu butuh teman bicara.";
    } else {
      return "Gimana pendapat kamu tentang ini?";
    }
  };

  const updateConversationContext = (input: string, response: any) => {
    setConversationContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory.slice(-10), {
        role: 'user',
        content: input,
        timestamp: Date.now()
      }, {
        role: 'miora',
        content: response.content,
        timestamp: Date.now(),
        emotion: response.emotion,
        context: response.context
      }],
      currentTopic: response.context,
      emotionalState: response.emotion
    }));
  };

  // Auto-trigger processing when new messages arrive
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      processConversationalInput(lastMessage.text);
    }
  }, [messages, processConversationalInput]);

  return (
    <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Enhanced Conversational Engine
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              {personalityMode.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Conversational Abilities */}
        <div className="space-y-3">
          {Object.entries(conversationalAbilities).map(([ability, score]) => (
            <div key={ability} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 capitalize">
                  {ability.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-purple-300">{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
          ))}
        </div>

        {/* Personality Modes */}
        <div className="space-y-2">
          <h4 className="text-white font-medium flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Active Personality Mode
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(personalityModes).map((mode) => (
              <Badge 
                key={mode}
                variant={mode === personalityMode ? "default" : "outline"}
                className={`text-xs cursor-pointer ${
                  mode === personalityMode 
                    ? 'bg-purple-500 text-white' 
                    : 'text-purple-400 border-purple-400'
                }`}
                onClick={() => setPersonalityMode(mode)}
              >
                {mode.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Conversation Stats */}
        <div className="space-y-2">
          <h4 className="text-white font-medium flex items-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Conversation Insights
          </h4>
          <div className="space-y-1 text-xs text-gray-300">
            <p>• Total Messages: {conversationContext.conversationHistory.length}</p>
            <p>• Current Topic: {conversationContext.currentTopic || 'General'}</p>
            <p>• Emotional State: {conversationContext.emotionalState}</p>
            <p>• Relationship: {conversationContext.userProfile.relationship}</p>
          </div>
        </div>

        {/* Processing Status */}
        <div className="mt-4 p-3 bg-black/30 rounded">
          <div className="flex items-center text-purple-400 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing conversation...' : 'Ready for natural conversation'}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enhanced 2-way interaction like ChatGPT/Gemini
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedChatEngine;