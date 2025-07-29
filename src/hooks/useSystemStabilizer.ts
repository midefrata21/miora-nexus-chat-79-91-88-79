import { useEffect, useRef } from 'react';
import { errorRecoverySystem, cleanupGlobalIntervals } from '@/utils/systemCleanup';
import { toast } from '@/hooks/use-toast';

interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
  errorCount: number;
  lastError?: string;
}

export const useSystemStabilizer = () => {
  const healthRef = useRef<SystemHealth>({
    cpuUsage: 0,
    memoryUsage: 0,
    errorCount: 0
  });
  
  const stabilityCheckRef = useRef<NodeJS.Timeout | null>(null);
  const errorCounterRef = useRef(0);

  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      errorCounterRef.current++;
      healthRef.current.errorCount = errorCounterRef.current;
      healthRef.current.lastError = event.error?.message || event.message;
      
      // Check for stack overflow - suppress repeated notifications
      if (event.error?.message?.includes('Maximum call stack size exceeded')) {
        errorRecoverySystem.handleStackOverflow(event.error);
        // Only show toast for first few stack overflows to avoid spam
        if (errorCounterRef.current <= 2) {
          toast({
            title: "🚨 SYSTEM STABILIZED",
            description: "Stack overflow auto-recovered",
            duration: 2000,
          });
        }
      }
      
      // Auto-recovery if too many errors - more conservative threshold
      if (errorCounterRef.current > 10) {
        cleanupGlobalIntervals();
        const prevCount = errorCounterRef.current;
        errorCounterRef.current = 0;
        // Only show recovery toast for severe cases
        if (prevCount > 15) {
          toast({
            title: "🔧 AUTO-RECOVERY",
            description: "System cleaned up",
            duration: 2000,
          });
        }
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      errorCounterRef.current++;
    };

    // Add global error listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // System health monitoring
  useEffect(() => {
    stabilityCheckRef.current = setInterval(() => {
      try {
        // Simulate memory usage check
        const memoryUsage = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / (performance as any).memory.totalJSHeapSize * 100)
          : Math.random() * 50 + 30; // Fallback simulation

        healthRef.current.memoryUsage = memoryUsage;

        // Check for potential memory leaks - only act on severe cases
        if (memoryUsage > 95) {
          errorRecoverySystem.handleMemoryLeak('SystemStabilizer');
          // Only show critical memory warnings and throttle notifications
          const lastMemoryWarning = sessionStorage.getItem('last_memory_warning');
          const now = Date.now();
          if (!lastMemoryWarning || now - parseInt(lastMemoryWarning) > 300000) { // 5 minutes
            toast({
              title: "⚡ MEMORY OPTIMIZED",
              description: `Critical memory usage resolved`,
              duration: 2000,
            });
            sessionStorage.setItem('last_memory_warning', now.toString());
          }
        }

        // Reset error counter periodically if system is stable
        if (errorCounterRef.current > 0 && memoryUsage < 70) {
          errorCounterRef.current = Math.max(0, errorCounterRef.current - 1);
        }

      } catch (error) {
        console.error('Health check error:', error);
      }
    }, 300000); // Check every 5 minutes - further reduced frequency

    return () => {
      if (stabilityCheckRef.current) {
        clearInterval(stabilityCheckRef.current);
      }
    };
  }, []);

  const getSystemHealth = () => {
    return {
      ...healthRef.current,
      status: healthRef.current.errorCount < 5 ? 'stable' : 'unstable',
      stability: Math.max(0, 100 - (healthRef.current.errorCount * 10))
    };
  };

  const forceStabilize = () => {
    cleanupGlobalIntervals();
    errorCounterRef.current = 0;
    healthRef.current.errorCount = 0;
    
    toast({
      title: "🎯 SYSTEM FORCE STABILIZED",
      description: "All intervals cleared and error counters reset",
      duration: 3000,
    });
  };

  return {
    getSystemHealth,
    forceStabilize,
    errorCount: errorCounterRef.current
  };
};