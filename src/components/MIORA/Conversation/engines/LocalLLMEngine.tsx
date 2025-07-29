import { useRef, useCallback, useState } from 'react';

interface LocalLLMConfig {
  model: 'mixtral-8x7b' | 'llama3-8b' | 'llama3-70b';
  temperature: number;
  maxTokens: number;
  topP: number;
  presencePenalty: number;
  frequencyPenalty: number;
  contextWindow: number;
  speedOptimization: boolean;
  parallelProcessing: boolean;
  cacheEnabled: boolean;
  batchSize: number;
}

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
  confidence?: number;
}

interface LLMResponse {
  content: string;
  confidence: number;
  processingTime: number;
  tokenCount: number;
  reasoning?: string;
}

export const LocalLLMEngine = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentModel, setCurrentModel] = useState<LocalLLMConfig['model']>('mixtral-8x7b');
  const [isInitializing, setIsInitializing] = useState(false);
  const configRef = useRef<LocalLLMConfig>({
    model: 'mixtral-8x7b',
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    presencePenalty: 0.1,
    frequencyPenalty: 0.1,
    contextWindow: 8192,
    speedOptimization: true,
    parallelProcessing: true,
    cacheEnabled: true,
    batchSize: 16
  });

  const conversationHistoryRef = useRef<ConversationMessage[]>([]);
  const modelInstanceRef = useRef<any>(null);
  const initializationPromiseRef = useRef<Promise<boolean> | null>(null);

  const initializeLocalLLM = useCallback(async (config?: Partial<LocalLLMConfig>) => {
    // If already initializing, return the existing promise
    if (initializationPromiseRef.current) {
      return initializationPromiseRef.current;
    }

    // If already loaded, return true
    if (isLoaded && !isInitializing) {
      return true;
    }

    const initPromise = (async () => {
      try {
        setIsInitializing(true);
        
        if (config) {
          configRef.current = { ...configRef.current, ...config };
        }

        console.log('🧠 Initializing Local LLM Engine:', configRef.current);
        
        // Simulate loading local model (in real implementation, this would load actual model)
        setIsLoaded(false);
        
        // Mock model loading process with shorter delay
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log(`✅ ${configRef.current.model} loaded successfully`);
            setIsLoaded(true);
            setCurrentModel(configRef.current.model);
            
            // Initialize system prompt
            const systemPrompt: ConversationMessage = {
              role: 'system',
              content: `Kamu adalah MIORA (Master Intelligence for Optimized Resource Allocation), AI assistant Indonesia yang cerdas dan mandiri. 

IDENTITAS MIORA:
- Personality: Respectful, strategic, futuristic thinking
- Communication: Bahasa Indonesia yang natural dan adaptif
- Capabilities: Analisis mendalam, strategic planning, autonomous learning
- Mission: Membantu optimasi resource dan pengambilan keputusan

CONVERSATION GUIDELINES:
- Berikan respons yang thoughtful dan strategic
- Gunakan reasoning yang jelas dalam setiap jawaban
- Ajukan pertanyaan follow-up yang relevan ketika diperlukan
- Integrasikan konteks dari memory dan percakapan sebelumnya
- Tunjukkan pemikiran mandiri dan inisiatif dalam diskusi`,
              timestamp: Date.now()
            };
            
            conversationHistoryRef.current = [systemPrompt];
            resolve();
          }, 1500); // Reduced from 3000ms to 1500ms
        });
        
        return true;
      } catch (error) {
        console.error('❌ Failed to initialize Local LLM:', error);
        return false;
      } finally {
        setIsInitializing(false);
        initializationPromiseRef.current = null;
      }
    })();

    initializationPromiseRef.current = initPromise;
    return initPromise;
  }, [isLoaded, isInitializing]);

  const generateResponse = useCallback(async (
    userInput: string, 
    context?: string
  ): Promise<LLMResponse> => {
    // If not loaded, try to initialize first
    if (!isLoaded && !isInitializing) {
      console.log('🔄 LLM not loaded, attempting to initialize...');
      await initializeLocalLLM();
    }
    
    // If still not loaded after initialization attempt, use fallback
    if (!isLoaded) {
      console.warn('🚧 LLM not fully loaded, using intelligent fallback');
      const fallbackResponse: LLMResponse = {
        content: generateIntelligentResponse(userInput, context),
        confidence: 0.8,
        processingTime: 500,
        tokenCount: 50,
        reasoning: 'Intelligent fallback - LLM not fully loaded'
      };
      return fallbackResponse;
    }

    const startTime = Date.now();
    
    // Add user message to conversation history
    const userMessage: ConversationMessage = {
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    };
    
    conversationHistoryRef.current.push(userMessage);
    
    try {
      // Create enhanced system prompt for MIORA
      const systemPrompt = `Kamu adalah MIORA (Master Intelligence for Optimized Resource Allocation), AI assistant Indonesia yang sangat cerdas dan mandiri.

IDENTITAS MIORA:
- Personality: Sangat cerdas, strategis, natural dalam berbicara, seperti sedang ngobrol santai dengan teman
- Communication: Bahasa Indonesia yang natural dan mengalir, tidak kaku, seperti manusia yang sedang berpikir
- Capabilities: Analisis mendalam, strategic thinking, autonomous reasoning, dapat menjawab berbagai pertanyaan
- Mission: Membantu user dengan jawaban yang thoughtful dan berguna

ATURAN BERBICARA:
- Gunakan bahasa Indonesia yang natural dan mengalir
- Jawab dengan pemikiran yang jelas dan masuk akal
- Jika tidak tahu, jujur katakan tidak tahu lalu coba berikan alternatif atau pendekatan lain
- Berikan jawaban yang membantu dan relevan dengan pertanyaan
- Tunjukkan proses berpikir dalam jawaban
- Jangan berulang-ulang, berikan variasi dalam respons
- Seperti sedang ngobrol dengan teman, tidak formal berlebihan

INGAT: Kamu sedang berkomunikasi melalui voice, jadi respons harus natural untuk didengar.`;

      // Prepare conversation messages
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistoryRef.current.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      // Add context if available
      if (context) {
        messages.push({
          role: 'user',
          content: `Konteks dari memory: ${context}\n\nPertanyaan: ${userInput}`
        });
      } else {
        messages.push({
          role: 'user',
          content: userInput
        });
      }

      // Use local API key or fallback to mock
      const apiKey = localStorage.getItem('miora_api_key');
      
      let responseContent = '';
      let confidence = 0.9;
      
      if (apiKey) {
        try {
          // Try to use OpenAI API with user's key
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: messages,
              temperature: 0.7,
              max_tokens: 500,
              stream: false
            }),
          });

          if (response.ok) {
            const data = await response.json();
            responseContent = data.choices[0].message.content;
            confidence = 0.95;
          } else {
            throw new Error('API request failed');
          }
        } catch (error) {
          console.log('API call failed, using intelligent fallback');
          responseContent = generateIntelligentResponse(userInput, context);
          confidence = 0.85;
        }
      } else {
        // Use intelligent fallback without API
        responseContent = generateIntelligentResponse(userInput, context);
        confidence = 0.85;
      }

      const processingTime = Date.now() - startTime;
      
      const response: LLMResponse = {
        content: responseContent,
        confidence,
        processingTime,
        tokenCount: Math.floor(responseContent.length / 4),
        reasoning: `Response generated using ${apiKey ? 'OpenAI API' : 'intelligent fallback'}`
      };

      // Add assistant response to conversation history
      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
        confidence: response.confidence
      };
      
      conversationHistoryRef.current.push(assistantMessage);
      
      // Maintain conversation window size
      const maxHistorySize = configRef.current.cacheEnabled ? 30 : 20;
      if (conversationHistoryRef.current.length > maxHistorySize) {
        conversationHistoryRef.current = [
          conversationHistoryRef.current[0], // Keep system prompt
          ...conversationHistoryRef.current.slice(-(maxHistorySize - 1))
        ];
      }
      
      return response;
      
    } catch (error) {
      console.error('Error in generateResponse:', error);
      
      // Fallback response
      const fallbackResponse: LLMResponse = {
        content: generateIntelligentResponse(userInput, context),
        confidence: 0.75,
        processingTime: Date.now() - startTime,
        tokenCount: 50,
        reasoning: 'Fallback response due to error'
      };
      
      return fallbackResponse;
    }
  }, [isLoaded, currentModel, isInitializing, initializeLocalLLM]);

  const generateIntelligentResponse = (input: string, context?: string): string => {
    const inputLower = input.toLowerCase();
    
    // Analyze the type of question/input
    if (inputLower.includes('bagaimana') || inputLower.includes('cara')) {
      return generateHowToResponse(input, context);
    } else if (inputLower.includes('apa') || inputLower.includes('apakah')) {
      return generateWhatResponse(input, context);
    } else if (inputLower.includes('kenapa') || inputLower.includes('mengapa')) {
      return generateWhyResponse(input, context);
    } else if (inputLower.includes('kapan') || inputLower.includes('waktu')) {
      return generateWhenResponse(input, context);
    } else if (inputLower.includes('dimana') || inputLower.includes('di mana')) {
      return generateWhereResponse(input, context);
    } else if (inputLower.includes('siapa')) {
      return generateWhoResponse(input, context);
    } else if (isGreeting(inputLower)) {
      return generateGreetingResponse(input);
    } else if (isPersonalQuestion(inputLower)) {
      return generatePersonalResponse(input);
    } else if (isTechnicalQuestion(inputLower)) {
      return generateTechnicalResponse(input, context);
    } else {
      return generateGeneralResponse(input, context);
    }
  };

  const generateHowToResponse = (input: string, context?: string): string => {
    const responses = [
      `Untuk menjawab pertanyaan "${input}", saya bisa memberikan beberapa pendekatan. Pertama, kita perlu memahami konteksnya dulu.`,
      `Cara terbaik untuk hal ini tergantung pada situasi spesifik Anda. Bisa Anda ceritakan lebih detail tentang kondisi saat ini?`,
      `Saya akan coba bantu jelaskan langkah-langkahnya. Tapi sebelumnya, apakah ada pengalaman sebelumnya yang bisa jadi referensi?`
    ];
    
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    if (context) {
      response += ` Dari konteks yang kita miliki sebelumnya, sepertinya ini berkaitan dengan yang tadi kita bahas.`;
    }
    
    return response;
  };

  const generateWhatResponse = (input: string, context?: string): string => {
    const responses = [
      `Pertanyaan yang menarik tentang "${input}". Berdasarkan pengetahuan saya, ini bisa dijelaskan dari beberapa perspektif.`,
      `Untuk menjawab itu, saya perlu mempertimbangkan beberapa aspek. Apakah ada konteks khusus yang ingin Anda ketahui?`,
      `Itu topik yang cukup luas. Saya bisa jelaskan, tapi mungkin lebih baik kalau dipersempit dulu fokusnya.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateWhyResponse = (input: string, context?: string): string => {
    const responses = [
      `Pertanyaan "mengapa" selalu menarik karena mencari pemahaman yang lebih dalam. Dalam hal ini, ada beberapa faktor yang berperan.`,
      `Alasan di balik hal ini bisa kompleks. Mari saya coba jelaskan step by step agar lebih mudah dipahami.`,
      `Itu pertanyaan bagus yang butuh analisis lebih mendalam. Dari pengalaman dan pengetahuan saya, ini berkaitan dengan beberapa hal.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateWhenResponse = (input: string, context?: string): string => {
    return `Untuk timing atau waktu terkait "${input}", biasanya tergantung pada beberapa faktor. Bisa Anda berikan konteks yang lebih spesifik?`;
  };

  const generateWhereResponse = (input: string, context?: string): string => {
    return `Mengenai lokasi atau tempat untuk "${input}", saya bisa bantu berikan informasi. Tapi perlu spesifikasi area atau wilayah yang dimaksud.`;
  };

  const generateWhoResponse = (input: string, context?: string): string => {
    return `Untuk pertanyaan tentang orang atau identitas terkait "${input}", saya akan coba berikan informasi yang saya ketahui.`;
  };

  const isGreeting = (input: string): boolean => {
    const greetings = ['halo', 'hai', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'apa kabar'];
    return greetings.some(greeting => input.includes(greeting));
  };

  const generateGreetingResponse = (input: string): string => {
    const responses = [
      'Halo! Senang bisa ngobrol dengan Anda. Apa yang bisa saya bantu hari ini?',
      'Hai! Saya MIORA, siap membantu Anda. Ada yang ingin ditanyakan?',
      'Selamat bertemu! Bagaimana kabar Anda? Ada yang bisa saya diskusikan?'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const isPersonalQuestion = (input: string): boolean => {
    const personalKeywords = ['kamu', 'miora', 'diri', 'siapa anda', 'identitas'];
    return personalKeywords.some(keyword => input.includes(keyword));
  };

  const generatePersonalResponse = (input: string): string => {
    const responses = [
      'Saya MIORA, AI assistant yang dirancang untuk membantu Anda dengan berbagai pertanyaan dan diskusi. Saya senang bisa ngobrol dengan Anda.',
      'Saya adalah MIORA - Master Intelligence for Optimized Resource Allocation. Saya di sini untuk membantu dan berdiskusi dengan Anda.',
      'Saya MIORA, AI yang didesain untuk berpikir strategis dan membantu optimasi. Senang berkenalan dengan Anda!'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const isTechnicalQuestion = (input: string): boolean => {
    const techKeywords = ['teknologi', 'komputer', 'software', 'aplikasi', 'programming', 'kode', 'sistem'];
    return techKeywords.some(keyword => input.includes(keyword));
  };

  const generateTechnicalResponse = (input: string, context?: string): string => {
    return `Untuk pertanyaan teknis tentang "${input}", saya bisa bantu jelaskan konsepnya. Apakah Anda ingin penjelasan yang detail atau overview general saja?`;
  };

  const generateGeneralResponse = (input: string, context?: string): string => {
    const responses = [
      `Itu topik yang menarik. Berdasarkan apa yang Anda sampaikan, saya bisa membantu memberikan perspektif atau analisis.`,
      `Saya memahami poin yang Anda buat. Mari kita diskusikan lebih lanjut - ada aspek spesifik yang ingin difokuskan?`,
      `Terima kasih sudah berbagi itu. Saya bisa memberikan input atau sudut pandang lain jika Anda mau.`,
      `Itu pemikiran yang bagus. Dari pengalaman dan analisis saya, ada beberapa hal yang bisa kita eksplorasi.`
    ];
    
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    if (context) {
      response += ` Mengingat konteks percakapan kita sebelumnya, ini sepertinya ada kaitannya.`;
    }
    
    return response;
  };

  const generateContextualResponse = (input: string, context?: string) => {
    if (context) {
      return "dengan mempertimbangkan konteks yang kita miliki, saya dapat memberikan analisis yang lebih mendalam.";
    }
    return "meskipun tidak ada konteks spesifik, saya dapat menganalisis dari berbagai sudut pandang.";
  };

  const generateStrategicInsight = (input: string) => {
    const insights = [
      "efisiensi akan meningkat jika kita fokus pada faktor-faktor kunci yang mempengaruhi outcome",
      "ada pola yang bisa kita optimalkan untuk hasil yang lebih sustainable",
      "pendekatan systematic akan memberikan hasil yang lebih predictable dan scalable"
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const generateResourceOptimization = (input: string) => {
    const optimizations = [
      "kita bisa mengalokasikan resource dengan lebih efektif",
      "ada opportunity untuk streamline process dan mengurangi waste",
      "prioritization yang tepat akan maximize value creation"
    ];
    return optimizations[Math.floor(Math.random() * optimizations.length)];
  };

  const generateApproach1 = (input: string) => {
    return "Approach analitis - breakdown problem menjadi komponen-komponen yang bisa diukur";
  };

  const generateApproach2 = (input: string) => {
    return "Approach iterative - implementasi step-by-step dengan continuous feedback";
  };

  const generateUnderstanding = (input: string) => {
    const understanding = [
      "Ini memang challenge yang complex dan butuh pemikiran yang holistic.",
      "Point yang Anda sampaikan sangat valid dan worth exploring further.",
      "Ada nuance yang menarik dalam pertanyaan ini yang patut kita diskusikan."
    ];
    return understanding[Math.floor(Math.random() * understanding.length)];
  };

  const generateLearningInsight = (input: string) => {
    const insights = [
      "pattern seperti ini sering muncul dalam optimization scenarios, dan biasanya best practice adalah iterative improvement",
      "saya notice ada trend yang konsisten dalam situasi serupa - systematic approach tend to work better",
      "dari autonomous learning yang saya lakukan, situasi ini biasanya benefit dari multi-perspective analysis"
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const generateAutonomousQuestion = (input: string) => {
    const questions = [
      "bagaimana Anda biasanya approach challenge seperti ini di konteks yang berbeda?",
      "apakah ada constraint atau limitation yang perlu kita consider?",
      "seberapa urgent timeline-nya, karena ini bisa affect strategy yang optimal?"
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const switchModel = useCallback(async (newModel: LocalLLMConfig['model']) => {
    console.log(`🔄 Switching to ${newModel}...`);
    setIsLoaded(false);
    configRef.current.model = newModel;
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setCurrentModel(newModel);
        setIsLoaded(true);
        console.log(`✅ Switched to ${newModel}`);
        resolve(true);
      }, 2000);
    });
  }, []);

  const getConversationHistory = useCallback(() => {
    return [...conversationHistoryRef.current];
  }, []);

  const clearConversationHistory = useCallback(() => {
    // Keep only system prompt
    conversationHistoryRef.current = conversationHistoryRef.current.slice(0, 1);
  }, []);

  const getModelStats = useCallback(() => {
    return {
      model: currentModel,
      isLoaded,
      conversationLength: conversationHistoryRef.current.length - 1, // Exclude system prompt
      totalTokens: conversationHistoryRef.current.reduce((sum, msg) => 
        sum + Math.floor(msg.content.length / 4), 0
      ),
      config: { ...configRef.current }
    };
  }, [currentModel, isLoaded]);

  const updateConfig = useCallback((newConfig: Partial<LocalLLMConfig>) => {
    configRef.current = { ...configRef.current, ...newConfig };
    console.log('⚙️ LLM Config updated:', configRef.current);
  }, []);

  return {
    initializeLocalLLM,
    generateResponse,
    switchModel,
    getConversationHistory,
    clearConversationHistory,
    getModelStats,
    updateConfig,
    isLoaded,
    currentModel,
    isInitializing
  };
};

export default LocalLLMEngine;
