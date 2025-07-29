
import { useState, useEffect, useCallback } from 'react';

interface ScheduledPrompt {
  id: string;
  name: string;
  prompt: string;
  category: string;
  schedule: {
    type: 'interval' | 'cron' | 'condition';
    value: string;
    nextExecution: number;
  };
  isActive: boolean;
  createdAt: number;
  lastExecuted?: number;
  executionCount: number;
  successRate: number;
}

interface SchedulerStatus {
  isRunning: boolean;
  activeTasksCount: number;
  nextExecution?: number;
  lastExecution?: number;
}

export const usePromptScheduler = () => {
  const [scheduledPrompts, setScheduledPrompts] = useState<ScheduledPrompt[]>([]);
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus>({
    isRunning: false,
    activeTasksCount: 0
  });

  // Load scheduled prompts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('miora_scheduled_prompts');
    if (stored) {
      try {
        const parsedPrompts = JSON.parse(stored);
        setScheduledPrompts(parsedPrompts);
        updateSchedulerStatus(parsedPrompts);
      } catch (error) {
        console.error('Error loading scheduled prompts:', error);
      }
    }
  }, []);

  // Save to localStorage when scheduled prompts change
  useEffect(() => {
    if (scheduledPrompts.length > 0) {
      localStorage.setItem('miora_scheduled_prompts', JSON.stringify(scheduledPrompts));
      updateSchedulerStatus(scheduledPrompts);
    }
  }, [scheduledPrompts]);

  // Scheduler loop
  useEffect(() => {
    const interval = setInterval(() => {
      checkAndExecuteScheduledPrompts();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [scheduledPrompts]);

  const updateSchedulerStatus = (prompts: ScheduledPrompt[]) => {
    const activePrompts = prompts.filter(p => p.isActive);
    const nextExecution = activePrompts.reduce((earliest, prompt) => {
      return prompt.schedule.nextExecution < earliest 
        ? prompt.schedule.nextExecution 
        : earliest;
    }, Infinity);

    setSchedulerStatus({
      isRunning: activePrompts.length > 0,
      activeTasksCount: activePrompts.length,
      nextExecution: nextExecution === Infinity ? undefined : nextExecution
    });
  };

  const schedulePrompt = useCallback((promptData: Omit<ScheduledPrompt, 'id' | 'createdAt' | 'executionCount' | 'successRate'>) => {
    const newScheduledPrompt: ScheduledPrompt = {
      ...promptData,
      id: `sched_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      executionCount: 0,
      successRate: 100
    };

    setScheduledPrompts(prev => [...prev, newScheduledPrompt]);
    return newScheduledPrompt.id;
  }, []);

  const checkAndExecuteScheduledPrompts = useCallback(async () => {
    const now = Date.now();
    const toExecute = scheduledPrompts.filter(
      prompt => prompt.isActive && prompt.schedule.nextExecution <= now
    );

    for (const prompt of toExecute) {
      try {
        // Execute the scheduled prompt
        const result = await executeScheduledPrompt(prompt);
        
        // Update execution stats
        setScheduledPrompts(prev => prev.map(p => 
          p.id === prompt.id 
            ? {
                ...p,
                lastExecuted: now,
                executionCount: p.executionCount + 1,
                successRate: calculateSuccessRate(p.executionCount, p.successRate, result.success),
                schedule: {
                  ...p.schedule,
                  nextExecution: calculateNextExecution(p.schedule)
                }
              }
            : p
        ));

        // Log execution
        logScheduledExecution(prompt, result);

      } catch (error) {
        console.error(`Error executing scheduled prompt ${prompt.id}:`, error);
      }
    }
  }, [scheduledPrompts]);

  const executeScheduledPrompt = async (prompt: ScheduledPrompt) => {
    // Simulate prompt execution
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    const success = Math.random() > 0.1; // 90% success rate
    
    return {
      success,
      message: success 
        ? `Scheduled prompt "${prompt.name}" executed successfully`
        : `Scheduled prompt "${prompt.name}" execution failed`,
      timestamp: Date.now(),
      promptId: prompt.id
    };
  };

  const calculateSuccessRate = (executionCount: number, currentRate: number, lastSuccess: boolean) => {
    if (executionCount === 0) return lastSuccess ? 100 : 0;
    
    const totalSuccesses = Math.round((currentRate / 100) * executionCount);
    const newSuccesses = totalSuccesses + (lastSuccess ? 1 : 0);
    const newExecutionCount = executionCount + 1;
    
    return Math.round((newSuccesses / newExecutionCount) * 100);
  };

  const calculateNextExecution = (schedule: ScheduledPrompt['schedule']) => {
    const now = Date.now();
    
    switch (schedule.type) {
      case 'interval':
        // Parse interval (e.g., "5m", "1h", "1d")
        const intervalMs = parseInterval(schedule.value);
        return now + intervalMs;
        
      case 'cron':
        // Simplified cron parsing (would need a proper cron library in production)
        return now + (24 * 60 * 60 * 1000); // Default to 24 hours
        
      case 'condition':
        // Condition-based scheduling (would need condition evaluation)
        return now + (60 * 60 * 1000); // Default to 1 hour
        
      default:
        return now + (60 * 60 * 1000); // Default to 1 hour
    }
  };

  const parseInterval = (interval: string): number => {
    const match = interval.match(/^(\d+)([smhd])$/);
    if (!match) return 60 * 60 * 1000; // Default 1 hour
    
    const [, value, unit] = match;
    const num = parseInt(value);
    
    switch (unit) {
      case 's': return num * 1000;
      case 'm': return num * 60 * 1000;
      case 'h': return num * 60 * 60 * 1000;
      case 'd': return num * 24 * 60 * 60 * 1000;
      default: return 60 * 60 * 1000;
    }
  };

  const logScheduledExecution = (prompt: ScheduledPrompt, result: any) => {
    const logEntry = {
      timestamp: Date.now(),
      scheduled_prompt_id: prompt.id,
      prompt_name: prompt.name,
      category: prompt.category,
      execution_result: result.success,
      message: result.message,
      next_execution: calculateNextExecution(prompt.schedule)
    };

    const existingLogs = JSON.parse(localStorage.getItem('miora_scheduler_log') || '[]');
    existingLogs.unshift(logEntry);
    localStorage.setItem('miora_scheduler_log', JSON.stringify(existingLogs.slice(0, 200)));
  };

  const togglePromptActive = useCallback((promptId: string) => {
    setScheduledPrompts(prev => prev.map(p => 
      p.id === promptId ? { ...p, isActive: !p.isActive } : p
    ));
  }, []);

  const deleteScheduledPrompt = useCallback((promptId: string) => {
    setScheduledPrompts(prev => prev.filter(p => p.id !== promptId));
  }, []);

  const getScheduleStatus = useCallback(() => {
    return schedulerStatus.isRunning 
      ? `Active - ${schedulerStatus.activeTasksCount} tasks scheduled`
      : 'Idle - No active scheduled tasks';
  }, [schedulerStatus]);

  const createSchedulePreset = useCallback((type: 'daily' | 'weekly' | 'hourly', promptContent: string, name: string) => {
    const scheduleMap = {
      daily: { type: 'interval' as const, value: '1d' },
      weekly: { type: 'interval' as const, value: '7d' },
      hourly: { type: 'interval' as const, value: '1h' }
    };

    return schedulePrompt({
      name,
      prompt: promptContent,
      category: 'preset',
      schedule: {
        ...scheduleMap[type],
        nextExecution: Date.now() + parseInterval(scheduleMap[type].value)
      },
      isActive: true
    });
  }, [schedulePrompt]);

  return {
    scheduledPrompts,
    schedulerStatus,
    schedulePrompt,
    togglePromptActive,
    deleteScheduledPrompt,
    getScheduleStatus,
    createSchedulePreset
  };
};
