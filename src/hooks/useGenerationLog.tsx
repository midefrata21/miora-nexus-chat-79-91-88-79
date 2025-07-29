
import { useState, useCallback, useRef, useEffect } from 'react';

export interface GenerationLogEntry {
  timestamp: string;
  message: string;
}

export const useGenerationLog = (isActive: boolean) => {
  const [generationLog, setGenerationLog] = useState<GenerationLogEntry[]>([]);
  const logIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const addLogEntry = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setGenerationLog(prev => [{ timestamp, message }, ...prev.slice(0, 49)]);
  }, []);

  const startGenerationLog = useCallback(() => {
    if (isActive) {
      logIntervalRef.current = setInterval(() => {
        const logMessages = [
          '🔧 Generating React component autonomously...',
          '🌐 Creating API endpoint autonomously...',
          '🗄️ Optimizing database autonomously...',
          '📋 Building UI menu autonomously...',
          '⬆️ Upgrading system autonomously...',
          '📊 Analyzing performance autonomously...',
          '🏗️ Building infrastructure component...',
          '🧬 Self-evolution in progress - Expanding capabilities',
          '🤖 Making autonomous decision for system optimization',
          '⚡ Autonomous resource allocation completed',
          '🔍 Monitoring system health and performance',
          '🎯 Strategic planning module active'
        ];
        
        const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
        addLogEntry(randomMessage);
      }, 3000);
    }
  }, [isActive, addLogEntry]);

  const stopGenerationLog = useCallback(() => {
    if (logIntervalRef.current) {
      clearInterval(logIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      startGenerationLog();
    } else {
      stopGenerationLog();
    }

    return () => stopGenerationLog();
  }, [isActive, startGenerationLog, stopGenerationLog]);

  return {
    generationLog,
    addLogEntry
  };
};
