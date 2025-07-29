
import { useState, useEffect, useCallback } from 'react';

interface PromptData {
  id?: string;
  content: string;
  category: string;
  timestamp: number;
  requiresAuth: boolean;
  tags?: string[];
  executionCount?: number;
  lastExecuted?: number;
}

interface PromptStats {
  total: number;
  byCategory: Record<string, number>;
  recentActivity: number;
}

export const usePromptMemoryBank = () => {
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [promptStats, setPromptStats] = useState<PromptStats>({
    total: 0,
    byCategory: {},
    recentActivity: 0
  });

  // Load prompts from localStorage on initialization
  useEffect(() => {
    const stored = localStorage.getItem('miora_prompt_memory_bank');
    if (stored) {
      try {
        const parsedPrompts = JSON.parse(stored);
        setPrompts(parsedPrompts);
        updateStats(parsedPrompts);
      } catch (error) {
        console.error('Error loading prompt memory bank:', error);
      }
    }
  }, []);

  // Save prompts to localStorage whenever prompts change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('miora_prompt_memory_bank', JSON.stringify(prompts));
      updateStats(prompts);
    }
  }, [prompts]);

  const updateStats = (promptList: PromptData[]) => {
    const stats: PromptStats = {
      total: promptList.length,
      byCategory: {},
      recentActivity: 0
    };

    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

    promptList.forEach(prompt => {
      // Count by category
      stats.byCategory[prompt.category] = (stats.byCategory[prompt.category] || 0) + 1;
      
      // Count recent activity
      if (prompt.timestamp > oneWeekAgo) {
        stats.recentActivity++;
      }
    });

    setPromptStats(stats);
  };

  const savePrompt = useCallback(async (promptData: Omit<PromptData, 'id'>) => {
    const newPrompt: PromptData = {
      ...promptData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      executionCount: 0
    };

    setPrompts(prev => [newPrompt, ...prev]);
    
    // Also save to external backup
    const backupData = {
      timestamp: Date.now(),
      prompt: newPrompt,
      source: 'micc_memory_bank'
    };
    
    const existingBackup = JSON.parse(localStorage.getItem('miora_prompt_backup') || '[]');
    existingBackup.unshift(backupData);
    localStorage.setItem('miora_prompt_backup', JSON.stringify(existingBackup.slice(0, 1000)));
    
    return newPrompt.id;
  }, []);

  const getPromptsByCategory = useCallback((category: string) => {
    return prompts.filter(prompt => prompt.category === category);
  }, [prompts]);

  const searchPrompts = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return prompts.filter(prompt => 
      prompt.content.toLowerCase().includes(lowerQuery) ||
      prompt.category.toLowerCase().includes(lowerQuery) ||
      (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }, [prompts]);

  const updatePromptStats = useCallback((promptId: string) => {
    setPrompts(prev => prev.map(prompt => 
      prompt.id === promptId 
        ? { 
            ...prompt, 
            executionCount: (prompt.executionCount || 0) + 1,
            lastExecuted: Date.now()
          }
        : prompt
    ));
  }, []);

  const deletePrompt = useCallback((promptId: string) => {
    setPrompts(prev => prev.filter(prompt => prompt.id !== promptId));
  }, []);

  const exportPrompts = useCallback(() => {
    const exportData = {
      timestamp: Date.now(),
      version: '2.1-MICC',
      prompts,
      stats: promptStats
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miora_prompts_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [prompts, promptStats]);

  const importPrompts = useCallback((importData: any) => {
    try {
      if (Array.isArray(importData)) {
        setPrompts(prev => [...importData, ...prev]);
      } else if (importData.prompts && Array.isArray(importData.prompts)) {
        setPrompts(prev => [...importData.prompts, ...prev]);
      }
      return true;
    } catch (error) {
      console.error('Error importing prompts:', error);
      return false;
    }
  }, []);

  return {
    prompts,
    promptStats,
    savePrompt,
    getPromptsByCategory,
    searchPrompts,
    updatePromptStats,
    deletePrompt,
    exportPrompts,
    importPrompts
  };
};
