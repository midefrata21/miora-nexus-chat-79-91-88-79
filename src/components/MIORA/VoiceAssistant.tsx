
import { useCallback } from 'react';

interface VoiceConfig {
  enabled: boolean;
  language: string;
  rate: number;
  pitch: number;
  volume: number;
}

export const VoiceAssistant = () => {
  const defaultConfig: VoiceConfig = {
    enabled: true,
    language: 'id-ID',
    rate: 0.9,
    pitch: 1.1,
    volume: 0.8
  };

  const speak = useCallback((text: string, config: Partial<VoiceConfig> = {}): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        resolve();
        return;
      }

      const finalConfig = { ...defaultConfig, ...config };
      
      if (!finalConfig.enabled) {
        resolve();
        return;
      }

      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Clean and format text for Indonesian TTS
        const cleanText = text
          .replace(/BUY/g, 'beli')
          .replace(/SELL/g, 'jual')
          .replace(/HOLD/g, 'tahan')
          .replace(/RSI/g, 'R-S-I')
          .replace(/EMA/g, 'E-M-A')
          .replace(/MACD/g, 'M-A-C-D')
          .replace(/USD/g, 'dolar')
          .replace(/BTC/g, 'bitcoin')
          .replace(/MIORA/g, 'Miora')
          .replace(/\$/g, 'dolar ')
          .replace(/%/g, ' persen')
          .substring(0, 200); // Limit length

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = finalConfig.language;
        utterance.rate = finalConfig.rate;
        utterance.pitch = finalConfig.pitch;
        utterance.volume = finalConfig.volume;

        utterance.onend = () => {
          console.log('Speech synthesis completed');
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.warn('Speech synthesis error:', event.error);
          // Don't treat interruption as a critical error
          if (event.error === 'interrupted') {
            console.log('Speech was interrupted - this is normal');
          }
          resolve(); // Don't reject, just resolve to continue
        };
        
        utterance.onstart = () => {
          console.log('Speech synthesis started');
        };

        window.speechSynthesis.speak(utterance);
        
        // Timeout after 10 seconds
        setTimeout(() => {
          window.speechSynthesis.cancel();
          resolve();
        }, 10000);

      } catch (error) {
        console.error('Voice assistant error:', error);
        resolve();
      }
    });
  }, []);

  const announce = useCallback(async (message: string): Promise<void> => {
    const timestamp = new Date().toLocaleTimeString('id-ID');
    const announcement = `${message}. Waktu ${timestamp}`;
    
    console.log(`🔊 MIORA Voice: ${announcement}`);
    await speak(announcement);
  }, [speak]);

  const announceSignal = useCallback(async (signal: {
    type: 'BUY' | 'SELL' | 'HOLD';
    symbol: string;
    price: number;
    confidence: number;
  }): Promise<void> => {
    const message = `Sinyal ${signal.type} untuk ${signal.symbol} pada harga ${signal.price.toFixed(0)} dengan konfidenz ${signal.confidence.toFixed(0)} persen`;
    await announce(message);
  }, [announce]);

  const announcePerformance = useCallback(async (performance: {
    totalPL: number;
    successRate: number;
    cycleCount: number;
  }): Promise<void> => {
    const plText = performance.totalPL >= 0 ? 'keuntungan' : 'kerugian';
    const message = `Laporan performa MIORA: ${plText} ${Math.abs(performance.totalPL).toFixed(0)} dolar dengan tingkat keberhasilan ${performance.successRate.toFixed(0)} persen dari ${performance.cycleCount} siklus`;
    await announce(message);
  }, [announce]);

  const announceAlert = useCallback(async (alertType: 'warning' | 'error' | 'success', message: string): Promise<void> => {
    const prefix = {
      warning: 'Peringatan',
      error: 'Kesalahan',
      success: 'Berhasil'
    }[alertType];
    
    await announce(`${prefix}: ${message}`);
  }, [announce]);

  const announceSystemStatus = useCallback(async (status: {
    health: string;
    activeSignals: number;
    uptime: string;
  }): Promise<void> => {
    const message = `Status sistem MIORA: kesehatan ${status.health}, ${status.activeSignals} sinyal aktif, waktu operasi ${status.uptime}`;
    await announce(message);
  }, [announce]);

  const getAvailableVoices = useCallback((): SpeechSynthesisVoice[] => {
    if (!('speechSynthesis' in window)) return [];
    
    return window.speechSynthesis.getVoices().filter(voice => 
      voice.lang.includes('id') || voice.lang.includes('ID') || voice.default
    );
  }, []);

  const testVoice = useCallback(async (): Promise<void> => {
    await announce('Tes suara MIORA berhasil. Sistem siap beroperasi');
  }, [announce]);

  return {
    speak,
    announce,
    announceSignal,
    announcePerformance,
    announceAlert,
    announceSystemStatus,
    getAvailableVoices,
    testVoice
  };
};

export { type VoiceConfig };
