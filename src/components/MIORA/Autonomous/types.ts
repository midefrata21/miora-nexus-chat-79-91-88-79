export interface CodeGenerationTask {
  id: string;
  type: 'component' | 'hook' | 'util' | 'page' | 'api' | 'optimization' | 'refactor' | 'security';
  description: string;
  status: 'pending' | 'generating' | 'analyzing' | 'optimizing' | 'completed' | 'error';
  progress: number;
  code?: string;
  timestamp: number;
  complexity: 'low' | 'medium' | 'high' | 'expert';
  aiModel: 'GPT-4' | 'Claude-3.5' | 'Gemini-Pro' | 'MIORA-AI';
  qualityScore?: number;
  optimizationSuggestions?: string[];
  securityIssues?: string[];
  performance?: {
    loadTime: number;
    memoryUsage: number;
    bundleSize: number;
  };
}

export interface GenerationStats {
  totalGenerated: number;
  successRate: number;
  avgGenerationTime: number;
  linesOfCode: number;
  aiEfficiency: number;
  optimizationsApplied: number;
  securityIssuesFixed: number;
  performanceImprovement: number;
}

export interface AiInsights {
  codeQuality: number;
  securityScore: number;
  performanceScore: number;
  maintainabilityIndex: number;
}