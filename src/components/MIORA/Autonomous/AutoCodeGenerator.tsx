import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { AutoCodeControlPanel } from './AutoCodeControlPanel';
import { AutoCodeInsights } from './AutoCodeInsights';
import { AutoCodeQueue } from './AutoCodeQueue';
import { CodeGenerationTask, GenerationStats, AiInsights } from './types';

export const AutoCodeGenerator: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<CodeGenerationTask[]>([]);
  const [generationStats, setGenerationStats] = useState({
    totalGenerated: 0,
    successRate: 98.7,
    avgGenerationTime: 2.3,
    linesOfCode: 0,
    aiEfficiency: 96.8,
    optimizationsApplied: 0,
    securityIssuesFixed: 0,
    performanceImprovement: 0
  });

  const [aiInsights, setAiInsights] = useState({
    codeQuality: 95.2,
    securityScore: 98.1,
    performanceScore: 92.7,
    maintainabilityIndex: 89.4
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate auto code generation
        if (Math.random() > 0.7) {
          generateRandomTask();
        }
        updateTaskProgress();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateRandomTask = () => {
    const types: CodeGenerationTask['type'][] = ['component', 'hook', 'util', 'page', 'api', 'optimization', 'refactor', 'security'];
    const descriptions = [
      'Creating reactive data visualization component with AI optimization',
      'Building custom authentication hook with security analysis',
      'Generating utility functions with performance optimization',
      'Creating dynamic dashboard page with intelligent caching',
      'Building REST API endpoints with auto-documentation',
      'Analyzing code patterns for performance optimization',
      'Refactoring legacy components with modern patterns',
      'Scanning codebase for security vulnerabilities',
      'Implementing AI-powered state management',
      'Generating test suites with intelligent coverage'
    ];

    const complexities: CodeGenerationTask['complexity'][] = ['low', 'medium', 'high', 'expert'];
    const aiModels: CodeGenerationTask['aiModel'][] = ['GPT-4', 'Claude-3.5', 'Gemini-Pro', 'MIORA-AI'];

    const newTask: CodeGenerationTask = {
      id: Math.random().toString(36).substring(2, 9),
      type: types[Math.floor(Math.random() * types.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: 'pending',
      progress: 0,
      timestamp: Date.now(),
      complexity: complexities[Math.floor(Math.random() * complexities.length)],
      aiModel: aiModels[Math.floor(Math.random() * aiModels.length)],
      qualityScore: Math.floor(Math.random() * 20) + 80,
      optimizationSuggestions: [],
      securityIssues: [],
      performance: {
        loadTime: Math.random() * 2 + 0.5,
        memoryUsage: Math.random() * 50 + 10,
        bundleSize: Math.random() * 100 + 50
      }
    };

    setTasks(prev => [newTask, ...prev.slice(0, 9)]);
  };

  const updateTaskProgress = () => {
    setTasks(prev => prev.map(task => {
      if (task.status === 'pending') {
        return { ...task, status: 'generating' as const, progress: 10 };
      }
      if (task.status === 'generating' && task.progress < 100) {
        const newProgress = Math.min(100, task.progress + Math.random() * 30);
        const newStatus = newProgress >= 100 ? 'completed' as const : 'generating' as const;
        
        if (newStatus === 'completed') {
          setGenerationStats(prev => ({
            ...prev,
            totalGenerated: prev.totalGenerated + 1,
            linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 200) + 50
          }));
        }
        
        return { ...task, progress: newProgress, status: newStatus };
      }
      return task;
    }));
  };

  const toggleAutoGeneration = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 AutoCode Generator Stopped" : "🚀 AutoCode Generator Activated",
      description: isActive ? "Autonomous code generation paused" : "AI mulai menghasilkan kode secara otomatis",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <AutoCodeControlPanel 
        isActive={isActive}
        generationStats={generationStats}
        onToggle={toggleAutoGeneration}
      />
      
      <div className="grid gap-6">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 rounded-lg p-6">
          <AutoCodeInsights aiInsights={aiInsights} />
        </div>
        
        <AutoCodeQueue tasks={tasks} />
      </div>
    </div>
  );
};

export default AutoCodeGenerator;