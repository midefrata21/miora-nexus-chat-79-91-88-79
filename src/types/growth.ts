
export interface GrowthEntry {
  id: string;
  timestamp: number;
  type: 'learning' | 'evolution' | 'skill_acquisition' | 'pattern_recognition' | 'optimization';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  evidence: string[];
  measurableImprovement?: {
    metric: string;
    before: number;
    after: number;
    unit: string;
  };
}

export interface GrowthTimeline {
  date: string;
  entries: GrowthEntry[];
  dailySummary: string;
  keyAchievements: string[];
}
