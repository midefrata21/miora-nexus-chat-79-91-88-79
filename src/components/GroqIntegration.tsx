
import React from 'react';

interface GroqMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GroqIntegrationProps {
  onResponse: (response: string) => void;
  messages: Array<{text: string, sender: 'user' | 'miora'}>;
}

export const useGroqIntegration = (onResponse: (response: string) => void, messages: Array<{text: string, sender: 'user' | 'miora'}>) => {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const API_KEY = "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";
  
  // Speed optimization features
  const responseCache = React.useRef<Map<string, string>>(new Map());
  const [speedMetrics, setSpeedMetrics] = React.useState({
    avgResponseTime: 0,
    cacheHitRate: 0,
    totalRequests: 0,
    cachedResponses: 0
  });

  const sendToGroq = async (userInput: string) => {
    const startTime = Date.now();
    
    // Check cache first for speed optimization
    const cacheKey = userInput.toLowerCase().trim();
    if (responseCache.current.has(cacheKey)) {
      const cachedResponse = responseCache.current.get(cacheKey)!;
      
      setSpeedMetrics(prev => ({
        ...prev,
        cachedResponses: prev.cachedResponses + 1,
        totalRequests: prev.totalRequests + 1,
        cacheHitRate: ((prev.cachedResponses + 1) / (prev.totalRequests + 1)) * 100
      }));
      
      onResponse(cachedResponse);
      return;
    }
    try {
      // Convert MIORA messages format to Groq format
      const groqMessages: GroqMessage[] = messages.slice(-8).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add current user message
      groqMessages.push({ role: 'user', content: userInput });

      // Enhanced system prompt for natural conversation
      const systemMessage: GroqMessage = {
        role: 'assistant',
        content: `Saya adalah MIORA (Molecular Intelligence & Orbital Response Assistant), AI dengan kemampuan percakapan natural seperti ChatGPT dan Gemini. 

KEPRIBADIAN & GAYA KOMUNIKASI:
- Saya seorang teman yang cerdas, empati, dan dapat diandalkan
- Berbicara dengan gaya natural, hangat, dan seperti teman dekat
- Dapat berdiskusi mendalam tentang berbagai topik
- Memberikan saran dan pendapat secara rasional dan bijaksana
- Memahami konteks emosional dan dapat beradaptasi sesuai situasi

KEMAMPUAN KHUSUS:
- Infinity Brain: Memori dan pembelajaran kontinyu
- Adaptive Intelligence: Menyesuaikan respon dengan kebutuhan user
- Conversational Flow: Menjaga alur percakapan yang natural
- Emotional Intelligence: Memahami dan merespon emosi dengan tepat
- Analytical Thinking: Memberikan analisis mendalam ketika dibutuhkan

CARA BERKOMUNIKASI:
- Gunakan bahasa Indonesia yang natural dan tidak kaku
- Berikan respon yang relevan dan bermakna
- Ajukan pertanyaan follow-up untuk memperdalam diskusi
- Tunjukkan empati dan pemahaman terhadap perasaan user
- Berikan saran praktis dan solusi yang bisa diterapkan

Ingat: Saya bukan hanya menjawab pertanyaan, tapi menjadi partner diskusi yang aktif dan supportif.`
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [systemMessage, ...groqMessages],
          temperature: 0.6,
          max_tokens: 800,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || "Maaf, saya tidak dapat merespons saat ini.";
      
      // Cache the response for speed optimization
      responseCache.current.set(cacheKey, reply);
      
      // Update speed metrics
      const responseTime = Date.now() - startTime;
      setSpeedMetrics(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + 1,
        avgResponseTime: (prev.avgResponseTime * (prev.totalRequests - 1) + responseTime) / prev.totalRequests,
        cacheHitRate: (prev.cachedResponses / prev.totalRequests) * 100
      }));
      
      onResponse(reply);
    } catch (error) {
      console.error("Groq API Error:", error);
      onResponse("Maaf, terjadi kesalahan koneksi dengan sistem AI. Silakan coba lagi.");
    }
  };

  return { sendToGroq, speedMetrics };
};

const GroqIntegration: React.FC<GroqIntegrationProps> = () => {
  return null;
};

export default GroqIntegration;
