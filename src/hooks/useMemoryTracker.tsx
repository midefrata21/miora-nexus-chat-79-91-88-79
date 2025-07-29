import { useState, useEffect } from 'react';

interface MemoryEntry {
  id: string;
  timestamp: number;
  userInput: string;
  mioraResponse: string;
  context: string;
  importance: number; // 1-10 scale
  tags: string[];
}

interface LongTermMemory {
  summary: string;
  keyInsights: string[];
  userPreferences: Record<string, any>;
  timestamp: number;
}

interface MasterProfile {
  name: string;
  company: string;
  mission: string;
  communicationStyle: string;
  mioraRole: string;
  timestamp: number;
}

export const useMemoryTracker = () => {
  const [shortTermMemory, setShortTermMemory] = useState<MemoryEntry[]>([]);
  const [longTermMemory, setLongTermMemory] = useState<LongTermMemory[]>([]);
  const [masterProfile, setMasterProfile] = useState<MasterProfile | null>(null);
  const [totalInteractions, setTotalInteractions] = useState(0);

  // Load memory on mount
  useEffect(() => {
    const savedShortTerm = localStorage.getItem('miora_short_memory');
    const savedLongTerm = localStorage.getItem('miora_long_memory');
    const savedMasterProfile = localStorage.getItem('miora_master_profile');
    const savedTotal = localStorage.getItem('miora_total_interactions');

    if (savedShortTerm) setShortTermMemory(JSON.parse(savedShortTerm));
    if (savedLongTerm) setLongTermMemory(JSON.parse(savedLongTerm));
    if (savedMasterProfile) setMasterProfile(JSON.parse(savedMasterProfile));
    if (savedTotal) setTotalInteractions(parseInt(savedTotal));
  }, []);

  // Auto-save memory
  useEffect(() => {
    localStorage.setItem('miora_short_memory', JSON.stringify(shortTermMemory));
  }, [shortTermMemory]);

  useEffect(() => {
    localStorage.setItem('miora_long_memory', JSON.stringify(longTermMemory));
  }, [longTermMemory]);

  useEffect(() => {
    if (masterProfile) {
      localStorage.setItem('miora_master_profile', JSON.stringify(masterProfile));
    }
  }, [masterProfile]);

  useEffect(() => {
    localStorage.setItem('miora_total_interactions', totalInteractions.toString());
  }, [totalInteractions]);

  // Store Master Profile in long-term memory
  const storeMasterProfile = (profileData: Omit<MasterProfile, 'timestamp'>) => {
    const newProfile: MasterProfile = {
      ...profileData,
      timestamp: Date.now()
    };
    
    setMasterProfile(newProfile);
    
    // Also create a high-importance memory entry
    const profileMemory: MemoryEntry = {
      id: `master_profile_${Date.now()}`,
      timestamp: Date.now(),
      userInput: 'Master Profile Configuration',
      mioraResponse: `Profile Master ${profileData.name} telah disimpan dalam memori jangka panjang`,
      context: 'master_profile_storage',
      importance: 10,
      tags: ['master_profile', 'critical_data', 'long_term']
    };
    
    setShortTermMemory(prev => [...prev.slice(-14), profileMemory]);
    setTotalInteractions(prev => prev + 1);
  };

  const addMemory = (userInput: string, mioraResponse: string, context: string) => {
    const importance = calculateImportance(userInput, mioraResponse);
    const tags = extractTags(userInput);
    
    const newEntry: MemoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      userInput,
      mioraResponse,
      context,
      importance,
      tags
    };

    setShortTermMemory(prev => {
      const updated = [...prev, newEntry];
      
      // Auto-compress to long-term memory if > 15 entries
      if (updated.length > 15) {
        compressToLongTerm(updated.slice(0, 10));
        return updated.slice(10);
      }
      
      return updated;
    });

    setTotalInteractions(prev => prev + 1);
  };

  const calculateImportance = (input: string, response: string): number => {
    let score = 5; // baseline
    
    // High importance keywords
    const highImportanceWords = ['penting', 'urgent', 'masalah', 'help', 'error', 'bug'];
    const lowImportanceWords = ['hai', 'hello', 'oke', 'thanks', 'terima kasih'];
    
    if (highImportanceWords.some(word => input.toLowerCase().includes(word))) score += 3;
    if (lowImportanceWords.some(word => input.toLowerCase().includes(word))) score -= 2;
    if (input.length > 100) score += 1; // Longer messages tend to be more important
    if (response.includes('Strategic Insight')) score += 2;
    
    return Math.max(1, Math.min(10, score));
  };

  const extractTags = (input: string): string[] => {
    const tags: string[] = [];
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('trading') || inputLower.includes('crypto')) tags.push('trading');
    if (inputLower.includes('belajar') || inputLower.includes('learn')) tags.push('education');
    if (inputLower.includes('motivasi') || inputLower.includes('semangat')) tags.push('motivation');
    if (inputLower.includes('teknis') || inputLower.includes('code')) tags.push('technical');
    if (inputLower.includes('analisis')) tags.push('analysis');
    
    return tags;
  };

  const compressToLongTerm = (entries: MemoryEntry[]) => {
    const summary = generateSummary(entries);
    const keyInsights = extractKeyInsights(entries);
    const userPreferences = analyzePreferences(entries);

    const longTermEntry: LongTermMemory = {
      summary,
      keyInsights,
      userPreferences,
      timestamp: Date.now()
    };

    setLongTermMemory(prev => [...prev.slice(-5), longTermEntry]); // Keep last 5 long-term memories
  };

  const generateSummary = (entries: MemoryEntry[]): string => {
    const topics = entries.map(e => e.tags).flat();
    const topicCount = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantTopic = Object.keys(topicCount).reduce((a, b) => 
      topicCount[a] > topicCount[b] ? a : b, 'general'
    );

    return `Percakapan ${entries.length} interaksi dengan fokus pada ${dominantTopic}. ` +
           `Tingkat kepentingan rata-rata: ${(entries.reduce((acc, e) => acc + e.importance, 0) / entries.length).toFixed(1)}`;
  };

  const extractKeyInsights = (entries: MemoryEntry[]): string[] => {
    return entries
      .filter(e => e.importance >= 7)
      .map(e => `${e.userInput.substring(0, 50)}... - ${e.context}`)
      .slice(0, 3);
  };

  const analyzePreferences = (entries: MemoryEntry[]): Record<string, any> => {
    const preferences: Record<string, any> = {};
    
    // Analyze communication style
    const formalWords = entries.filter(e => 
      e.userInput.includes('Anda') || e.userInput.includes('mohon')
    ).length;
    const casualWords = entries.filter(e => 
      e.userInput.includes('kamu') || e.userInput.includes('gimana')
    ).length;
    
    preferences.communicationStyle = formalWords > casualWords ? 'formal' : 'casual';
    preferences.averageResponseTime = Date.now();
    preferences.preferredTopics = [...new Set(entries.map(e => e.tags).flat())];
    
    return preferences;
  };

  const getRelevantContext = (currentInput: string): string => {
    // Include master profile in context if available
    let context = '';
    
    if (masterProfile) {
      context += `Master Profile: ${masterProfile.name} (${masterProfile.company}), Mission: ${masterProfile.mission}. `;
    }
    
    // Find relevant memories based on tags and content similarity
    const currentTags = extractTags(currentInput);
    const relevantMemories = shortTermMemory.filter(memory => 
      memory.tags.some(tag => currentTags.includes(tag)) ||
      memory.userInput.toLowerCase().includes(currentInput.toLowerCase().substring(0, 10))
    ).slice(-3);

    if (relevantMemories.length > 0) {
      context += `Konteks dari memori: ${relevantMemories.map(m => 
        `"${m.userInput.substring(0, 30)}..." -> ${m.context}`
      ).join('; ')}`;
    }

    return context;
  };

  return {
    shortTermMemory,
    longTermMemory,
    masterProfile,
    totalInteractions,
    addMemory,
    getRelevantContext,
    storeMasterProfile,
    memoryStats: {
      shortTermCount: shortTermMemory.length,
      longTermCount: longTermMemory.length,
      totalInteractions,
      hasMasterProfile: !!masterProfile
    }
  };
};
