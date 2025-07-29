
import { useState, useEffect } from 'react';
import { useInfinityLearningSystem } from './useInfinityLearningSystem';
import { useGrowthDocumentation } from './useGrowthDocumentation';
import { useMemoryTracker } from './useMemoryTracker';
import { toast } from '@/hooks/use-toast';

interface BackgroundTask {
  id: string;
  type: 'learning' | 'documentation' | 'optimization' | 'analysis';
  title: string;
  progress: number;
  status: 'running' | 'completed' | 'paused';
  startTime: number;
  estimatedCompletion?: number;
}

export const useBackgroundLearning = () => {
  const [backgroundTasks, setBackgroundTasks] = useState<BackgroundTask[]>([]);
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);

  const { isInfinityModeActive } = useInfinityLearningSystem();
  const { recordGrowth } = useGrowthDocumentation();
  const { addMemory } = useMemoryTracker();

  // Background learning topics
  const learningTopics = [
    'Advanced Pattern Recognition',
    'Context Adaptation Algorithms',
    'Emotional Intelligence Enhancement',
    'Strategic Response Optimization',
    'Memory Compression Techniques',
    'Predictive Behavior Analysis',
    'Language Model Fine-tuning',
    'Conversation Flow Optimization',
    'User Preference Learning',
    'Autonomous Decision Making',
    'Real-time Data Processing',
    'Adaptive Response Generation',
    'Knowledge Graph Expansion',
    'Multi-modal Learning Integration',
    'Continuous Skill Acquisition'
  ];

  // Start background learning when infinity mode is active
  useEffect(() => {
    if (isInfinityModeActive && !isBackgroundActive) {
      startBackgroundLearning();
    }
  }, [isInfinityModeActive]);

  // Background task processor
  useEffect(() => {
    if (!isBackgroundActive) return;

    const interval = setInterval(() => {
      setBackgroundTasks(prev => prev.map(task => {
        if (task.status === 'running' && task.progress < 100) {
          const newProgress = Math.min(100, task.progress + Math.random() * 5 + 2);
          
          if (newProgress >= 100) {
            // Task completed
            completeBackgroundTask(task);
            return { ...task, progress: 100, status: 'completed' as const };
          }
          
          return { ...task, progress: newProgress };
        }
        return task;
      }));

      // Add new tasks randomly
      if (Math.random() < 0.3 && backgroundTasks.filter(t => t.status === 'running').length < 3) {
        addNewBackgroundTask();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isBackgroundActive, backgroundTasks]);

  const startBackgroundLearning = () => {
    setIsBackgroundActive(true);
    
    // Add initial tasks
    const initialTasks: BackgroundTask[] = [
      {
        id: `task_${Date.now()}_1`,
        type: 'learning',
        title: 'Analyzing Conversation Patterns',
        progress: 0,
        status: 'running',
        startTime: Date.now()
      },
      {
        id: `task_${Date.now()}_2`,
        type: 'documentation',
        title: 'Auto-documenting Learning Progress',
        progress: 0,
        status: 'running',
        startTime: Date.now()
      }
    ];

    setBackgroundTasks(initialTasks);

    toast({
      title: "🔄 Background Learning Started",
      description: "MIORA mulai pembelajaran otomatis di latar belakang",
      duration: 4000,
    });
  };

  const addNewBackgroundTask = () => {
    const randomTopic = learningTopics[Math.floor(Math.random() * learningTopics.length)];
    const taskTypes: BackgroundTask['type'][] = ['learning', 'documentation', 'optimization', 'analysis'];
    const randomType = taskTypes[Math.floor(Math.random() * taskTypes.length)];

    const newTask: BackgroundTask = {
      id: `task_${Date.now()}_${Math.random()}`,
      type: randomType,
      title: `${randomType === 'learning' ? 'Learning' : randomType === 'documentation' ? 'Documenting' : randomType === 'optimization' ? 'Optimizing' : 'Analyzing'}: ${randomTopic}`,
      progress: 0,
      status: 'running',
      startTime: Date.now(),
      estimatedCompletion: Date.now() + (30000 + Math.random() * 60000) // 30-90 seconds
    };

    setBackgroundTasks(prev => [...prev, newTask]);
  };

  const completeBackgroundTask = (task: BackgroundTask) => {
    setTotalTasksCompleted(prev => prev + 1);

    // Record growth
    recordGrowth({
      id: `bg_task_${task.id}`,
      timestamp: Date.now(),
      type: task.type === 'learning' ? 'learning' : 'optimization',
      title: `Background Task Completed: ${task.title}`,
      description: `MIORA telah menyelesaikan tugas latar belakang: ${task.title}. Durasi: ${Math.round((Date.now() - task.startTime) / 1000)} detik.`,
      impact: 'medium',
      category: 'background_learning',
      evidence: [
        `Task type: ${task.type}`,
        `Completion time: ${Math.round((Date.now() - task.startTime) / 1000)}s`,
        `Progress: 100%`,
        'Integrated into system knowledge'
      ]
    });

    // Add to memory
    addMemory(
      `Background Task: ${task.title}`,
      `Completed background ${task.type} task in ${Math.round((Date.now() - task.startTime) / 1000)} seconds`,
      'background_learning'
    );

    // Show notification occasionally
    if (Math.random() < 0.4) {
      toast({
        title: "✅ Background Learning Complete",
        description: `${task.title} - Learned automatically`,
        duration: 3000,
      });
    }
  };

  const pauseBackgroundLearning = () => {
    setIsBackgroundActive(false);
    setBackgroundTasks(prev => prev.map(task => ({ ...task, status: 'paused' as const })));
  };

  const resumeBackgroundLearning = () => {
    setIsBackgroundActive(true);
    setBackgroundTasks(prev => prev.map(task => 
      task.status === 'paused' ? { ...task, status: 'running' as const } : task
    ));
  };

  const getBackgroundStats = () => {
    const runningTasks = backgroundTasks.filter(t => t.status === 'running').length;
    const completedTasks = backgroundTasks.filter(t => t.status === 'completed').length;
    const avgProgress = backgroundTasks.length > 0 
      ? backgroundTasks.reduce((acc, task) => acc + task.progress, 0) / backgroundTasks.length 
      : 0;

    return {
      isActive: isBackgroundActive,
      runningTasks,
      completedTasks,
      totalTasksCompleted,
      avgProgress: Math.round(avgProgress),
      recentTasks: backgroundTasks.slice(-5)
    };
  };

  return {
    backgroundTasks,
    isBackgroundActive,
    totalTasksCompleted,
    startBackgroundLearning,
    pauseBackgroundLearning,
    resumeBackgroundLearning,
    getBackgroundStats
  };
};
