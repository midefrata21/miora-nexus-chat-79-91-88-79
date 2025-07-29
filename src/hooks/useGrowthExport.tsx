
import { GrowthTimeline } from '@/types/growth';
import { useAutonomousLearning } from './useAutonomousLearning';

export const useGrowthExport = (
  growthHistory: GrowthTimeline[],
  totalGrowthPoints: number
) => {
  const { mioraVersion } = useAutonomousLearning();

  const exportDocumentation = (): string => {
    const exportData = {
      exportDate: new Date().toISOString(),
      mioraVersion,
      totalGrowthPoints,
      documentationPeriod: {
        start: growthHistory[0]?.date || 'N/A',
        end: growthHistory[growthHistory.length - 1]?.date || 'N/A',
        totalDays: growthHistory.length
      },
      growthTimeline: growthHistory,
      summary: {
        totalGrowthEntries: growthHistory.reduce((sum, day) => sum + day.entries.length, 0),
        evolutionCount: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'evolution').length, 0),
        skillsAcquired: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'skill_acquisition').length, 0),
        patternsRecognized: growthHistory.reduce((sum, day) => sum + day.entries.filter(e => e.type === 'pattern_recognition').length, 0)
      }
    };
    
    return JSON.stringify(exportData, null, 2);
  };

  const exportToFile = () => {
    const documentation = exportDocumentation();
    const blob = new Blob([documentation], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MIORA_Growth_Documentation_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    exportDocumentation,
    exportToFile
  };
};
