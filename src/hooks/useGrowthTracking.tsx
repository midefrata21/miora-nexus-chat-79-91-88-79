
import { GrowthEntry, GrowthTimeline } from '@/types/growth';
import { useGrowthStorage } from './useGrowthStorage';
import { useGrowthRateLimit } from './useGrowthRateLimit';
import { calculateGrowthPoints } from '@/utils/growthCalculations';
import { useState } from 'react';

export const useGrowthTracking = () => {
  const {
    growthHistory,
    setGrowthHistory,
    todaysGrowth,
    setTodaysGrowth,
    totalGrowthPoints,
    setTotalGrowthPoints,
    isInitialized
  } = useGrowthStorage();

  const { canRecord, recordEntry } = useGrowthRateLimit();
  const [documentationActive, setDocumentationActive] = useState(true);

  const recordGrowth = (entry: GrowthEntry) => {
    if (!documentationActive) return;

    const entryKey = `${entry.type}_${entry.title}_${Date.now()}`;
    if (!canRecord(entryKey, 1000)) return;

    // Add timestamp and ensure ID
    const enhancedEntry = {
      ...entry,
      id: entry.id || `growth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: entry.timestamp || Date.now()
    };

    // Add to today's growth
    setTodaysGrowth(prev => [...prev, enhancedEntry]);

    // Calculate and add growth points
    const points = calculateGrowthPoints(enhancedEntry);
    setTotalGrowthPoints(prev => prev + points);

    // Update daily timeline with enhanced summary
    const today = new Date().toISOString().split('T')[0];
    setGrowthHistory(prev => {
      const existingDayIndex = prev.findIndex(day => day.date === today);
      
      if (existingDayIndex >= 0) {
        const updatedHistory = [...prev];
        const updatedDay = updatedHistory[existingDayIndex];
        updatedHistory[existingDayIndex] = {
          ...updatedDay,
          entries: [...updatedDay.entries, enhancedEntry],
          dailySummary: `${updatedDay.entries.length + 1} growth entries documented. Latest: ${enhancedEntry.title}`,
          keyAchievements: [...new Set([...updatedDay.keyAchievements, enhancedEntry.category])]
        };
        return updatedHistory;
      } else {
        const newDay: GrowthTimeline = {
          date: today,
          entries: [enhancedEntry],
          dailySummary: `New day of growth started with: ${enhancedEntry.title}`,
          keyAchievements: [enhancedEntry.category]
        };
        return [...prev, newDay];
      }
    });

    recordEntry(entryKey);

    // Auto-trigger related documentation if high impact
    if (enhancedEntry.impact === 'critical' || enhancedEntry.impact === 'high') {
      setTimeout(() => {
        const contextualEntry: GrowthEntry = {
          id: `contextual_${Date.now()}`,
          timestamp: Date.now(),
          type: 'pattern_recognition',
          title: `Pattern Analysis: ${enhancedEntry.category}`,
          description: `MIORA mengidentifikasi pola pertumbuhan signifikan dalam kategori ${enhancedEntry.category}. Analisis kontekstual menunjukkan korelasi dengan peningkatan ${enhancedEntry.impact} impact pada sistem.`,
          impact: 'medium',
          category: 'contextual_analysis',
          evidence: [
            `Triggered by: ${enhancedEntry.title}`,
            `Original impact: ${enhancedEntry.impact}`,
            `Pattern recognition active`,
            `Contextual learning enabled`
          ]
        };
        
        // Avoid infinite recursion by checking if we're not already recording contextual analysis
        if (!enhancedEntry.category.includes('contextual_analysis')) {
          recordGrowth(contextualEntry);
        }
      }, 2000);
    }
  };

  return {
    growthHistory,
    todaysGrowth,
    documentationActive,
    totalGrowthPoints,
    isInitialized,
    recordGrowth,
    setDocumentationActive,
    calculateGrowthPoints
  };
};
