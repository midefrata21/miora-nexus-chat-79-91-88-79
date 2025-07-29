
import { useRef, useCallback } from 'react';

interface PipelineTask {
  id: string;
  type: 'stt' | 'tts' | 'processing';
  data: any;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  status: 'queued' | 'processing' | 'completed' | 'error';
  processingTime?: number;
}

interface PipelineMetrics {
  totalTasks: number;
  completed: number;
  failed: number;
  avgProcessingTime: number;
  throughput: number;
  latency: number;
}

interface PipelineConfig {
  maxConcurrent: number;
  maxQueueSize: number;
  priorityEnabled: boolean;
  realtimeMode: boolean;
  bufferSize: number;
}

export const VoicePipelineManager = () => {
  const taskQueueRef = useRef<PipelineTask[]>([]);
  const activeTasksRef = useRef<Map<string, PipelineTask>>(new Map());
  const metricsRef = useRef<PipelineMetrics>({
    totalTasks: 0,
    completed: 0,
    failed: 0,
    avgProcessingTime: 0,
    throughput: 0,
    latency: 0
  });
  
  const configRef = useRef<PipelineConfig>({
    maxConcurrent: 3,
    maxQueueSize: 10,
    priorityEnabled: true,
    realtimeMode: true,
    bufferSize: 4096
  });

  const processingInterval = useRef<NodeJS.Timeout | null>(null);
  const metricsInterval = useRef<NodeJS.Timeout | null>(null);

  const initializePipeline = useCallback((config?: Partial<PipelineConfig>) => {
    if (config) {
      configRef.current = { ...configRef.current, ...config };
    }

    console.log('🔄 Initializing Voice Pipeline Manager:', configRef.current);

    // Start task processing loop
    processingInterval.current = setInterval(() => {
      processTaskQueue();
    }, 100);

    // Start metrics collection
    metricsInterval.current = setInterval(() => {
      updateMetrics();
    }, 1000);

    console.log('✅ Voice Pipeline Manager initialized');
    return true;
  }, []);

  const addTask = useCallback((task: Omit<PipelineTask, 'id' | 'timestamp' | 'status'>): string => {
    const newTask: PipelineTask = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      status: 'queued'
    };

    // Check queue size limit
    if (taskQueueRef.current.length >= configRef.current.maxQueueSize) {
      console.warn('⚠️ Pipeline queue full, dropping oldest task');
      taskQueueRef.current.shift();
    }

    // Add task with priority sorting
    if (configRef.current.priorityEnabled) {
      insertTaskByPriority(newTask);
    } else {
      taskQueueRef.current.push(newTask);
    }

    metricsRef.current.totalTasks++;
    
    console.log(`📝 Task added to pipeline: ${newTask.id} (${newTask.type}, ${newTask.priority})`);
    return newTask.id;
  }, []);

  const insertTaskByPriority = useCallback((task: PipelineTask) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const taskPriority = priorityOrder[task.priority];
    
    let insertIndex = taskQueueRef.current.findIndex(
      existingTask => priorityOrder[existingTask.priority] > taskPriority
    );
    
    if (insertIndex === -1) {
      insertIndex = taskQueueRef.current.length;
    }
    
    taskQueueRef.current.splice(insertIndex, 0, task);
  }, []);

  const processTaskQueue = useCallback(() => {
    const maxConcurrent = configRef.current.maxConcurrent;
    const activeCount = activeTasksRef.current.size;
    
    if (activeCount >= maxConcurrent || taskQueueRef.current.length === 0) {
      return;
    }

    const tasksToProcess = Math.min(
      maxConcurrent - activeCount,
      taskQueueRef.current.length
    );

    for (let i = 0; i < tasksToProcess; i++) {
      const task = taskQueueRef.current.shift();
      if (task) {
        processTask(task);
      }
    }
  }, []);

  const processTask = useCallback(async (task: PipelineTask) => {
    const startTime = Date.now();
    task.status = 'processing';
    activeTasksRef.current.set(task.id, task);

    console.log(`⚙️ Processing task: ${task.id} (${task.type})`);

    try {
      // Simulate task processing based on type
      let processingTime = 0;
      
      switch (task.type) {
        case 'stt':
          // Speech-to-text processing
          processingTime = await simulateSTTProcessing(task.data);
          break;
        case 'tts':
          // Text-to-speech processing
          processingTime = await simulateTTSProcessing(task.data);
          break;
        case 'processing':
          // General audio processing
          processingTime = await simulateAudioProcessing(task.data);
          break;
      }

      task.status = 'completed';
      task.processingTime = Date.now() - startTime;
      metricsRef.current.completed++;
      
      console.log(`✅ Task completed: ${task.id} in ${task.processingTime}ms`);
      
    } catch (error) {
      task.status = 'error';
      task.processingTime = Date.now() - startTime;
      metricsRef.current.failed++;
      
      console.error(`❌ Task failed: ${task.id}`, error);
    } finally {
      activeTasksRef.current.delete(task.id);
    }
  }, []);

  const simulateSTTProcessing = useCallback(async (data: any): Promise<number> => {
    // Simulate Whisper.cpp processing time
    const processingTime = 300 + Math.random() * 700;
    return new Promise((resolve) => {
      setTimeout(() => resolve(processingTime), processingTime);
    });
  }, []);

  const simulateTTSProcessing = useCallback(async (data: any): Promise<number> => {
    // Simulate Coqui TTS processing time
    const textLength = data?.text?.length || 100;
    const processingTime = Math.max(500, textLength * 30 + Math.random() * 500);
    return new Promise((resolve) => {
      setTimeout(() => resolve(processingTime), processingTime);
    });
  }, []);

  const simulateAudioProcessing = useCallback(async (data: any): Promise<number> => {
    // Simulate general audio processing
    const processingTime = 200 + Math.random() * 300;
    return new Promise((resolve) => {
      setTimeout(() => resolve(processingTime), processingTime);
    });
  }, []);

  const updateMetrics = useCallback(() => {
    const now = Date.now();
    const recentTasks = Array.from(activeTasksRef.current.values())
      .concat(taskQueueRef.current)
      .filter(task => now - task.timestamp < 60000); // Last minute

    if (recentTasks.length > 0) {
      const completedTasks = recentTasks.filter(task => task.status === 'completed');
      
      if (completedTasks.length > 0) {
        const avgProcessingTime = completedTasks.reduce((sum, task) => 
          sum + (task.processingTime || 0), 0) / completedTasks.length;
        
        metricsRef.current.avgProcessingTime = avgProcessingTime;
        metricsRef.current.throughput = completedTasks.length;
        metricsRef.current.latency = avgProcessingTime;
      }
    }
  }, []);

  const getQueueStatus = useCallback(() => {
    return {
      queued: taskQueueRef.current.length,
      active: activeTasksRef.current.size,
      total: taskQueueRef.current.length + activeTasksRef.current.size,
      maxCapacity: configRef.current.maxQueueSize
    };
  }, []);

  const getMetrics = useCallback(() => ({ ...metricsRef.current }), []);

  const clearQueue = useCallback(() => {
    taskQueueRef.current = [];
    console.log('🗑️ Pipeline queue cleared');
  }, []);

  const pausePipeline = useCallback(() => {
    if (processingInterval.current) {
      clearInterval(processingInterval.current);
      processingInterval.current = null;
      console.log('⏸️ Pipeline paused');
    }
  }, []);

  const resumePipeline = useCallback(() => {
    if (!processingInterval.current) {
      processingInterval.current = setInterval(() => {
        processTaskQueue();
      }, 100);
      console.log('▶️ Pipeline resumed');
    }
  }, [processTaskQueue]);

  const cleanup = useCallback(() => {
    if (processingInterval.current) {
      clearInterval(processingInterval.current);
      processingInterval.current = null;
    }
    if (metricsInterval.current) {
      clearInterval(metricsInterval.current);
      metricsInterval.current = null;
    }
    
    taskQueueRef.current = [];
    activeTasksRef.current.clear();
    
    console.log('🧹 Pipeline manager cleaned up');
  }, []);

  return {
    initializePipeline,
    addTask,
    getQueueStatus,
    getMetrics,
    clearQueue,
    pausePipeline,
    resumePipeline,
    cleanup
  };
};

export default VoicePipelineManager;
