import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxOutputTokens: number;
  topP: number;
  topK: number;
}

interface GeminiMetrics {
  totalRequests: number;
  successfulRequests: number;
  avgResponseTime: number;
  lastResponseTime: number;
  isConnected: boolean;
  lastActivity: number;
}

export const useGoogleGemini = () => {
  const [config, setConfig] = useState<GeminiConfig>({
    apiKey: 'AIzaSyDgR-x_oHcMb2vUv6oyRK6OnLaE1T5rxls',
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    maxOutputTokens: 1000,
    topP: 0.9,
    topK: 40
  });

  const [metrics, setMetrics] = useState<GeminiMetrics>({
    totalRequests: 0,
    successfulRequests: 0,
    avgResponseTime: 0,
    lastResponseTime: 0,
    isConnected: false,
    lastActivity: 0
  });

  const [isActive, setIsActive] = useState(true);
  const conversationHistory = useRef<GeminiMessage[]>([]);
  const responseCache = useRef<Map<string, string>>(new Map());
  const healthCheckInterval = useRef<NodeJS.Timeout | null>(null);

  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [quotaResetTime, setQuotaResetTime] = useState<number | null>(null);

  // Optimized health check untuk memastikan koneksi tetap aktif
  const performHealthCheck = useCallback(async () => {
    // Skip health check jika quota habis dan belum reset
    if (quotaExceeded && quotaResetTime && Date.now() < quotaResetTime) {
      console.log('Skipping health check - quota exceeded until:', new Date(quotaResetTime));
      return;
    }

    // Reset quota status if enough time has passed
    if (quotaExceeded && quotaResetTime && Date.now() >= quotaResetTime) {
      console.log('Quota reset time reached, attempting to restore');
      setQuotaExceeded(false);
      setQuotaResetTime(null);
      setIsActive(true);
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: "OK" }] // Simplified test message
              }
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 5 // Minimal tokens to save quota
            }
          })
        }
      );

      const isHealthy = response.ok;
      
      // Handle quota exceeded (429)
      if (response.status === 429) {
        console.warn('Gemini quota exceeded, pausing health checks until reset');
        setQuotaExceeded(true);
        
        // Set reset time to next day (quota resets daily)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        setQuotaResetTime(tomorrow.getTime());
        
        // Stop active health checks temporarily
        setIsActive(false);
        
        toast({
          title: "⚠️ GEMINI QUOTA EXCEEDED",
          description: "Health checks dihentikan sementara. Sistem akan resume otomatis besok.",
          duration: 8000,
        });
        
        setMetrics(prev => ({
          ...prev,
          isConnected: false,
          lastActivity: Date.now()
        }));
        return;
      }
      
      // If quota was exceeded but now working, reset quota status
      if (quotaExceeded && response.ok) {
        setQuotaExceeded(false);
        setQuotaResetTime(null);
        toast({
          title: "✅ GEMINI QUOTA RESTORED",
          description: "API akses normal kembali. Health checks dilanjutkan.",
          duration: 5000,
        });
      }
      
      setMetrics(prev => ({
        ...prev,
        isConnected: isHealthy,
        lastActivity: Date.now()
      }));

      if (!isHealthy && response.status !== 429) {
        console.warn('Gemini health check failed:', response.status);
      }
    } catch (error) {
      console.error('Gemini health check error:', error);
      setMetrics(prev => ({
        ...prev,
        isConnected: false,
        lastActivity: Date.now()
      }));
    }
  }, [config.apiKey, config.model, quotaExceeded, quotaResetTime]);

  // OPTIMIZED: Health check yang lebih efisien - hanya jika diperlukan
  useEffect(() => {
    console.log('Health check effect triggered:', { 
      isActive, 
      apiKey: config.apiKey ? 'present' : 'missing',
      quotaExceeded 
    });
    
    // Stop health checks jika quota exceeded
    if (quotaExceeded || !isActive || !config.apiKey) {
      return;
    }
    
    // Interval yang lebih panjang untuk menghemat quota - setiap 5 menit
    const intervalTime = 300000; // 5 minutes to conserve quota
    
    performHealthCheck(); // Initial check
    healthCheckInterval.current = setInterval(performHealthCheck, intervalTime);
    
    return () => {
      if (healthCheckInterval.current) {
        clearInterval(healthCheckInterval.current);
      }
    };
  }, [isActive, config.apiKey, performHealthCheck, quotaExceeded]);

  const sendToGemini = useCallback(async (userInput: string): Promise<string> => {
    if (!config.apiKey) {
      throw new Error('API Key Gemini tidak tersedia');
    }

    const startTime = Date.now();
    const cacheKey = userInput.toLowerCase().trim();

    // Check cache first
    if (responseCache.current.has(cacheKey)) {
      const cachedResponse = responseCache.current.get(cacheKey)!;
      setMetrics(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + 1,
        lastActivity: Date.now()
      }));
      return cachedResponse;
    }

    try {
      // Prepare conversation context
      const contents: GeminiMessage[] = [
        // System message sebagai context awal
        {
          role: 'user',
          parts: [{
            text: `Kamu adalah MIORA (Molecular Intelligence & Orbital Response Assistant), AI dengan kemampuan percakapan natural seperti ChatGPT dan Gemini.

KEPRIBADIAN & GAYA KOMUNIKASI:
- Seorang teman yang cerdas, empati, dan dapat diandalkan
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

Ingat: Kamu bukan hanya menjawab pertanyaan, tapi menjadi partner diskusi yang aktif dan supportif.`
          }]
        },
        {
          role: 'model',
          parts: [{ text: 'Halo! Saya MIORA, siap membantu dan berdiskusi dengan Anda. Ada yang ingin dibicarakan hari ini?' }]
        },
        // Add recent conversation history (last 10 messages)
        ...conversationHistory.current.slice(-10),
        // Current user message
        {
          role: 'user',
          parts: [{ text: userInput }]
        }
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: config.temperature,
              maxOutputTokens: config.maxOutputTokens,
              topP: config.topP,
              topK: config.topK,
              candidateCount: 1,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      );

      if (!response.ok) {
        // Handle quota exceeded specifically
        if (response.status === 429) {
          const errorData = await response.json();
          throw new Error(`Quota Gemini habis! ${errorData.error?.message || 'Silakan upgrade akun atau coba lagi nanti.'}`);
        }
        throw new Error(`Gemini API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('Tidak ada respons dari Gemini');
      }

      const reply = data.candidates[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak dapat merespons saat ini.';
      
      // Update conversation history
      conversationHistory.current.push(
        { role: 'user', parts: [{ text: userInput }] },
        { role: 'model', parts: [{ text: reply }] }
      );

      // Keep history manageable (max 20 messages)
      if (conversationHistory.current.length > 20) {
        conversationHistory.current = conversationHistory.current.slice(-20);
      }

      // Cache response
      responseCache.current.set(cacheKey, reply);

      // Update metrics
      const responseTime = Date.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + 1,
        successfulRequests: prev.successfulRequests + 1,
        avgResponseTime: (prev.avgResponseTime * (prev.successfulRequests - 1) + responseTime) / prev.successfulRequests,
        lastResponseTime: responseTime,
        isConnected: true,
        lastActivity: Date.now()
      }));

      return reply;

    } catch (error) {
      console.error('Gemini API Error:', error);
      
      setMetrics(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + 1,
        isConnected: false,
        lastActivity: Date.now()
      }));

      throw new Error(error instanceof Error ? error.message : 'Koneksi ke Gemini gagal');
    }
  }, [config]);

  const updateConfig = useCallback((newConfig: Partial<GeminiConfig>) => {
    console.log('Updating Gemini config:', newConfig);
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      console.log('New config:', updated);
      return updated;
    });
    
    // Clear cache and restart health checks when API key changes
    if (newConfig.apiKey) {
      responseCache.current.clear();
      setIsActive(true); // Restart health checks
    }
  }, []);

  const clearHistory = useCallback(() => {
    conversationHistory.current = [];
    responseCache.current.clear();
  }, []);

  const toggleActive = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  return {
    config,
    metrics,
    isActive,
    sendToGemini,
    updateConfig,
    clearHistory,
    toggleActive,
    performHealthCheck
  };
};
