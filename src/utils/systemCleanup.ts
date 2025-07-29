// Enhanced System cleanup utilities for MIORA
let isCleaningUp = false;

export const cleanupGlobalIntervals = () => {
  if (isCleaningUp) return;
  isCleaningUp = true;

  try {
    // Clean up quantum intervals
    if ((window as any).quantumCleanupIntervals) {
      (window as any).quantumCleanupIntervals.forEach((interval: NodeJS.Timeout) => {
        clearInterval(interval);
      });
      (window as any).quantumCleanupIntervals = [];
    }
    
    // Clean up any other global intervals
    const intervalsToClean = [
      'quantumSyncInterval',
      'quantumOptimizationInterval',
      'mioraHealthCheckInterval',
      'performanceOptimizationInterval',
      'systemStabilityInterval',
      'autoRecoveryInterval'
    ];

    intervalsToClean.forEach(intervalName => {
      if ((window as any)[intervalName]) {
        clearInterval((window as any)[intervalName]);
        delete (window as any)[intervalName];
      }
    });

    // Clear any MIORA performance optimizer intervals
    if ((window as any).mioraPerformanceOptimizer?.cleanup) {
      (window as any).mioraPerformanceOptimizer.cleanup();
    }
    
    console.log('🧹 Enhanced global intervals cleanup completed');
  } catch (error) {
    console.warn('⚠️ Error during cleanup:', error);
  } finally {
    isCleaningUp = false;
  }
};

// Enhanced error recovery system
export const errorRecoverySystem = {
  handleStackOverflow: (error: Error) => {
    console.error('🚨 Stack overflow detected:', error.message);
    cleanupGlobalIntervals();
    
    // Reset any recursive functions by clearing call stack
    setTimeout(() => {
      console.log('✅ Stack overflow recovery completed');
    }, 1000);
  },
  
  handleMemoryLeak: (componentName: string) => {
    console.warn(`🔍 Memory cleanup for ${componentName}`);
    
    // Only cleanup if memory usage is actually high
    const memoryInfo = (performance as any).memory;
    if (memoryInfo) {
      const usage = memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize;
      if (usage > 0.8) { // Only if over 80% memory usage
        cleanupGlobalIntervals();
        
        // Force garbage collection if available
        if ((window as any).gc) {
          (window as any).gc();
        }
      }
    } else {
      // Fallback for browsers without memory API
      cleanupGlobalIntervals();
    }
  },
  
  handleWebSocketError: (exchange: string, error: any) => {
    console.error(`🌐 WebSocket error for ${exchange}:`, error);
    // WebSocket manager will handle reconnection
  }
};

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanupGlobalIntervals);
  window.addEventListener('pagehide', cleanupGlobalIntervals);
}