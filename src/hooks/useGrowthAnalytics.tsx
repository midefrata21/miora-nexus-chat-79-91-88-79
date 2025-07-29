
import { GrowthEntry, GrowthTimeline } from '@/types/growth';

export const useGrowthAnalytics = (
  growthHistory: GrowthTimeline[],
  todaysGrowth: GrowthEntry[],
  totalGrowthPoints: number
) => {
  const getGrowthStats = () => ({
    totalEntries: growthHistory.reduce((sum, day) => sum + day.entries.length, 0),
    todayEntries: todaysGrowth.length,
    totalPoints: totalGrowthPoints,
    daysTracked: growthHistory.length
  });

  const getDetailedStats = () => ({
    evolutionCount: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'evolution').length, 0),
    skillsAcquired: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'skill_acquisition').length, 0),
    patternsRecognized: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'pattern_recognition').length, 0),
    learningEntries: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'learning').length, 0),
    optimizations: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'optimization').length, 0)
  });

  const getCategoryBreakdown = () => {
    const categories: Record<string, number> = {};
    growthHistory.forEach(day => {
      day.entries.forEach(entry => {
        categories[entry.category] = (categories[entry.category] || 0) + 1;
      });
    });
    return categories;
  };

  const getImpactDistribution = () => {
    const impacts = { critical: 0, high: 0, medium: 0, low: 0 };
    growthHistory.forEach(day => {
      day.entries.forEach(entry => {
        impacts[entry.impact]++;
      });
    });
    return impacts;
  };

  return {
    getGrowthStats,
    getDetailedStats,
    getCategoryBreakdown,
    getImpactDistribution
  };
};
