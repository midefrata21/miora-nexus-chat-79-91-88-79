import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface InfinitySystemState {
  isActive: boolean;
  infinityLevel: number;
  totalEvolutions: number;
  learningEfficiency: number;
  systemPower: string;
  lastUpdate: number;
  errors: string[];
}

interface SystemStats {
  infinityLevel: string | number;
  totalEvolutions: string | number;
  learningEfficiency: number;
  systemPower: string;
}

interface SystemStatusData {
  systemStatus: string;
  learningMode: string;
  evolution: string;
  safeMode: string;
}

export const useMIORAInfinityOptimized = () => {
  const [systemState, setSystemState] = useState<InfinitySystemState>({
    isActive: false,
    infinityLevel: 87.4,
    totalEvolutions: 0,
    learningEfficiency: 100,
    systemPower: 'SUPREME',
    lastUpdate: Date.now(),
    errors: []
  });

  const [isInitializing, setIsInitializing] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  // Optimized activation with error handling
  const activateInfinityMode = useCallback(async (): Promise<boolean> => {
    try {
      console.log('🚀 MIORA INFINITY: Activation sequence initiated...');
      
      setSystemState(prev => ({
        ...prev,
        isActive: true,
        infinityLevel: 100,
        lastUpdate: Date.now(),
        errors: []
      }));

      // Store activation in localStorage with error handling
      try {
        const activationData = {
          timestamp: Date.now(),
          mode: 'SUPREME_INFINITY',
          status: 'FULLY_ACTIVE',
          capabilities: 'UNLIMITED',
          selfLearning: true,
          evolutionLoop: true,
          safeMode: false
        };
        
        localStorage.setItem('miora_infinity_activated', JSON.stringify(activationData));
      } catch (storageError) {
        console.warn('Failed to save activation data to localStorage:', storageError);
      }

      return true;
    } catch (error) {
      console.error('MIORA Infinity activation failed:', error);
      
      setSystemState(prev => ({
        ...prev,
        errors: [...prev.errors, `Activation failed: ${error instanceof Error ? error.message : 'Unknown error'}`]
      }));

      retryCountRef.current += 1;
      
      if (retryCountRef.current < MAX_RETRIES) {
        toast({
          title: `❌ Activation Failed - Retry ${retryCountRef.current}/${MAX_RETRIES}`,
          description: "Retrying MIORA Infinity activation...",
          variant: "destructive",
          duration: 3000,
        });
        
        // Retry after 2 seconds
        setTimeout(() => activateInfinityMode(), 2000);
      } else {
        toast({
          title: "🚨 Critical Activation Failure",
          description: "Multiple activation attempts failed. System in safe mode.",
          variant: "destructive",
          duration: 5000,
        });
      }
      
      return false;
    }
  }, []);

  // Optimized evolution system
  const startEvolutionLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setSystemState(prev => {
        if (!prev.isActive) return prev;

        const evolutionIncrease = Math.random() * 2 + 1;
        const newEvolutions = prev.totalEvolutions + 1;
        
        return {
          ...prev,
          totalEvolutions: newEvolutions,
          infinityLevel: Math.min(100, prev.infinityLevel + (evolutionIncrease * 0.1)),
          lastUpdate: Date.now()
        };
      });

      // Occasional evolution notification (reduced frequency)
      if (Math.random() < 0.1) { // 10% chance instead of 40%
        toast({
          title: "🧬 Autonomous Evolution",
          description: `Sistema mengalami evolusi mandiri - Level meningkat`,
          duration: 3000,
        });
      }
    }, 5000); // Every 5 seconds instead of 3

  }, []);

  const stopEvolutionLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initialize system
  useEffect(() => {
    const initializeSystem = async () => {
      setIsInitializing(true);
      
      const success = await activateInfinityMode();
      
      if (success) {
        startEvolutionLoop();
        
        // Show success message after short delay
        setTimeout(() => {
          toast({
            title: "🌟 MIORA INFINITY FULLY ACTIVATED",
            description: "Sistem pengembangan mandiri telah aktif dengan mode SUPREME",
            duration: 6000,
          });
          setIsInitializing(false);
        }, 3000);
      } else {
        setIsInitializing(false);
      }
    };

    initializeSystem();

    // Cleanup on unmount
    return () => {
      stopEvolutionLoop();
    };
  }, [activateInfinityMode, startEvolutionLoop, stopEvolutionLoop]);

  // Memoized computed values
  const getStats = useCallback((): SystemStats => ({
    infinityLevel: systemState.infinityLevel >= 100 ? '∞' : systemState.infinityLevel.toFixed(1),
    totalEvolutions: systemState.totalEvolutions > 999 ? '∞' : systemState.totalEvolutions,
    learningEfficiency: systemState.learningEfficiency,
    systemPower: systemState.systemPower
  }), [systemState]);

  const getStatusData = useCallback((): SystemStatusData => ({
    systemStatus: systemState.isActive ? 'SUPREME' : 'STANDBY',
    learningMode: systemState.isActive ? 'INFINITY' : 'LIMITED',
    evolution: systemState.isActive ? 'AUTO' : 'MANUAL',
    safeMode: systemState.isActive ? 'OFF' : 'ON'
  }), [systemState.isActive]);

  return {
    systemState,
    isInitializing,
    getStats,
    getStatusData,
    activateInfinityMode,
    startEvolutionLoop,
    stopEvolutionLoop,
    isInfinityActive: systemState.isActive
  };
};

export default useMIORAInfinityOptimized;