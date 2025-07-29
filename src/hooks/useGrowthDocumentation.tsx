
import { useGrowthTracking } from './useGrowthTracking';
import { useGrowthAnalytics } from './useGrowthAnalytics';
import { useGrowthExport } from './useGrowthExport';
import { useGrowthAutoDocumentation } from './useGrowthAutoDocumentation';

export const useGrowthDocumentation = () => {
  const {
    growthHistory,
    todaysGrowth,
    documentationActive,
    totalGrowthPoints,
    isInitialized,
    recordGrowth,
    setDocumentationActive,
    calculateGrowthPoints
  } = useGrowthTracking();

  const { getGrowthStats } = useGrowthAnalytics(growthHistory, todaysGrowth, totalGrowthPoints);
  
  const { exportDocumentation, exportToFile } = useGrowthExport(growthHistory, totalGrowthPoints);
  
  const { autoDocumentPattern, autoDocumentSkill } = useGrowthAutoDocumentation(recordGrowth);

  return {
    // Core tracking
    growthHistory,
    todaysGrowth,
    documentationActive,
    totalGrowthPoints,
    isInitialized,
    recordGrowth,
    setDocumentationActive,
    
    // Analytics
    getGrowthStats,
    
    // Export
    exportDocumentation,
    exportToFile,
    
    // Auto documentation (with built-in rate limiting)
    autoDocumentPattern,
    autoDocumentSkill
  };
};

// Re-export types for convenience
export type { GrowthEntry, GrowthTimeline } from '@/types/growth';
