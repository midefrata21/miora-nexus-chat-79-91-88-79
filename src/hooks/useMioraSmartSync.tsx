
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMioraVoiceEngine } from './useMioraVoiceEngine';

interface SyncResponse {
  text: string;
  hasVoice: boolean;
  voiceStatus: 'active' | 'fallback' | 'offline';
  timestamp: number;
}

interface VoiceHealthCheck {
  isHealthy: boolean;
  lastCheck: number;
  connectionAttempts: number;
  status: 'online' | 'reconnecting' | 'offline';
}

export const useMioraSmartSync = () => {
  const { toast } = useToast();
  const { 
    speak, 
    isReady, 
    isSpeaking, 
    voiceEnabled, 
    hasVoiceSupport,
    getEngineStatus 
  } = useMioraVoiceEngine();
  
  const [smartSyncEnabled, setSmartSyncEnabled] = useState(true);
  const [voiceWatchdogEnabled, setVoiceWatchdogEnabled] = useState(true);
  const [voiceHealth, setVoiceHealth] = useState<VoiceHealthCheck>({
    isHealthy: true,
    lastCheck: Date.now(),
    connectionAttempts: 0,
    status: 'online'
  });
  
  const [lastResponse, setLastResponse] = useState<SyncResponse | null>(null);
  const watchdogInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  // Voice health monitoring every 5 minutes
  useEffect(() => {
    if (voiceWatchdogEnabled) {
      startVoiceWatchdog();
    } else {
      stopVoiceWatchdog();
    }

    return () => {
      if (watchdogInterval.current) clearInterval(watchdogInterval.current);
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [voiceWatchdogEnabled]);

  const startVoiceWatchdog = () => {
    // Check every 5 minutes (300000 ms)
    // For demo purposes, using 10 seconds
    watchdogInterval.current = setInterval(() => {
      performVoiceHealthCheck();
    }, 10000);

    toast({
      title: "👁️ Voice Watchdog Activated",
      description: "Monitor koneksi voice setiap 5 menit",
      duration: 3000,
    });
  };

  const stopVoiceWatchdog = () => {
    if (watchdogInterval.current) {
      clearInterval(watchdogInterval.current);
      watchdogInterval.current = null;
    }
  };

  const performVoiceHealthCheck = async () => {
    const engineStatus = getEngineStatus();
    const currentTime = Date.now();
    
    setVoiceHealth(prev => ({ ...prev, lastCheck: currentTime }));

    if (!hasVoiceSupport || !isReady || !voiceEnabled) {
      handleVoiceFailure('Voice support not available');
      return;
    }

    // Test voice synthesis with silent check
    try {
      const testPromise = new Promise((resolve, reject) => {
        const testUtterance = new SpeechSynthesisUtterance('');
        testUtterance.volume = 0;
        testUtterance.onend = () => resolve(true);
        testUtterance.onerror = () => reject(false);
        
        speechSynthesis.speak(testUtterance);
        
        // Timeout after 5 seconds
        setTimeout(() => reject(false), 5000);
      });

      await testPromise;
      
      setVoiceHealth(prev => ({
        ...prev,
        isHealthy: true,
        connectionAttempts: 0,
        status: 'online'
      }));
      
    } catch (error) {
      handleVoiceFailure('Voice synthesis test failed');
    }
  };

  const handleVoiceFailure = (reason: string) => {
    setVoiceHealth(prev => {
      const newAttempts = prev.connectionAttempts + 1;
      
      if (newAttempts <= 3) {
        // Try to reconnect
        setTimeout(() => {
          attemptVoiceReconnect();
        }, 2000 * newAttempts); // Exponential backoff
        
        return {
          ...prev,
          isHealthy: false,
          connectionAttempts: newAttempts,
          status: 'reconnecting'
        };
      } else {
        // Max attempts reached, go offline
        toast({
          title: "🔇 Voice Mode Offline",
          description: "Beralih ke mode text-only sementara",
          variant: "destructive",
          duration: 5000,
        });
        
        return {
          ...prev,
          isHealthy: false,
          connectionAttempts: newAttempts,
          status: 'offline'
        };
      }
    });
  };

  const attemptVoiceReconnect = async () => {
    try {
      // Reinitialize speech synthesis
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        
        // Wait a moment then test
        setTimeout(async () => {
          await performVoiceHealthCheck();
        }, 1000);
      }
    } catch (error) {
      console.error('Voice reconnect failed:', error);
    }
  };

  const sendSmartSyncResponse = useCallback(async (text: string): Promise<SyncResponse> => {
    if (!smartSyncEnabled) {
      return {
        text,
        hasVoice: false,
        voiceStatus: 'offline',
        timestamp: Date.now()
      };
    }

    const response: SyncResponse = {
      text,
      hasVoice: false,
      voiceStatus: 'offline',
      timestamp: Date.now()
    };

    // Check voice availability
    if (voiceHealth.isHealthy && voiceHealth.status === 'online' && hasVoiceSupport) {
      try {
        speak(text);
        response.hasVoice = true;
        response.voiceStatus = 'active';
      } catch (error) {
        console.error('Voice synthesis error:', error);
        handleVoiceFailure('Voice synthesis failed');
        response.voiceStatus = 'fallback';
        
        // Add fallback notification to text
        response.text = `🔇 Maaf voice sedang offline, berikut jawaban dalam pesan:\n\n${text}`;
      }
    } else {
      response.voiceStatus = 'fallback';
      response.text = `🔇 Maaf voice sedang offline, berikut jawaban dalam pesan:\n\n${text}`;
    }

    setLastResponse(response);
    return response;
  }, [smartSyncEnabled, voiceHealth, hasVoiceSupport, speak]);

  const getVoiceStatusInfo = () => {
    return {
      isOnline: voiceHealth.status === 'online',
      isReconnecting: voiceHealth.status === 'reconnecting',
      isOffline: voiceHealth.status === 'offline',
      lastCheck: voiceHealth.lastCheck,
      attempts: voiceHealth.connectionAttempts,
      healthStatus: voiceHealth.isHealthy ? 'Healthy' : 'Unstable'
    };
  };

  const resetVoiceConnection = () => {
    setVoiceHealth({
      isHealthy: true,
      lastCheck: Date.now(),
      connectionAttempts: 0,
      status: 'online'
    });
    
    toast({
      title: "🔄 Voice Connection Reset",
      description: "Koneksi voice telah direset",
      duration: 3000,
    });
  };

  return {
    smartSyncEnabled,
    setSmartSyncEnabled,
    voiceWatchdogEnabled,
    setVoiceWatchdogEnabled,
    voiceHealth,
    lastResponse,
    sendSmartSyncResponse,
    getVoiceStatusInfo,
    resetVoiceConnection,
    performVoiceHealthCheck,
    isVoiceHealthy: voiceHealth.isHealthy && voiceHealth.status === 'online'
  };
};
