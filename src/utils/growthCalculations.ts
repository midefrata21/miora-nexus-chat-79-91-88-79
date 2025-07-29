
import { GrowthEntry, GrowthTimeline } from '@/types/growth';

export const calculateGrowthPoints = (entry: GrowthEntry): number => {
  let points = 0;
  
  switch (entry.type) {
    case 'evolution': points += 50; break;
    case 'skill_acquisition': points += 30; break;
    case 'pattern_recognition': points += 20; break;
    case 'learning': points += 15; break;
    case 'optimization': points += 25; break;
  }
  
  switch (entry.impact) {
    case 'critical': points *= 2.5; break;
    case 'high': points *= 1.8; break;
    case 'medium': points *= 1.3; break;
    case 'low': points *= 1; break;
  }
  
  points += Math.min(entry.evidence.length * 5, 25); // Cap evidence bonus
  
  return Math.round(points);
};

export const generateDailySummary = (entries: GrowthEntry[]): string => {
  const totalPoints = entries.reduce((sum, entry) => sum + calculateGrowthPoints(entry), 0);
  const majorEvolutions = entries.filter(e => e.impact === 'critical' || e.impact === 'high').length;
  const categories = [...new Set(entries.map(e => e.category))];
  
  return `MIORA mengalami ${entries.length} pertumbuhan dengan ${totalPoints} growth points. ` +
         `${majorEvolutions} evolusi signifikan dalam ${categories.length} kategori. ` +
         `Fokus: ${categories.slice(0, 3).join(', ')}.`;
};

export const extractKeyAchievements = (entries: GrowthEntry[]): string[] => {
  return entries
    .filter(e => e.impact === 'critical' || e.impact === 'high')
    .map(e => e.title)
    .slice(0, 3); // Limit to top 3
};
