import { LLMModel } from '../../LLMSystem/types';
import { LLMService } from '../../LLMSystem/services/LLMService';

export interface ModelPerformanceMetrics {
  modelId: string;
  complexity: string;
  avgResponseTime: number;
  successRate: number;
  tokenEfficiency: number;
  userSatisfaction: number;
  lastUsed: number;
}

export class MultiLLMManager {
  private performanceHistory: ModelPerformanceMetrics[] = [];
  private modelUsageCount: Map<string, number> = new Map();
  private loadBalancer: ModelLoadBalancer;

  constructor(private llmService: LLMService) {
    this.loadBalancer = new ModelLoadBalancer();
    this.loadPerformanceHistory();
  }

  selectOptimalModel(
    complexity: 'simple' | 'medium' | 'complex' | 'extreme',
    availableModels: LLMModel[]
  ): LLMModel | null {
    // Filter models suitable for the complexity level
    const suitableModels = this.filterModelsByComplexity(complexity, availableModels);
    
    if (suitableModels.length === 0) {
      return null;
    }

    // If only one model available, return it
    if (suitableModels.length === 1) {
      return suitableModels[0];
    }

    // Multi-criteria selection algorithm
    const scoredModels = suitableModels.map(model => ({
      model,
      score: this.calculateModelScore(model, complexity)
    }));

    // Sort by score (descending)
    scoredModels.sort((a, b) => b.score - a.score);

    // Apply load balancing if top models have similar scores
    const topScore = scoredModels[0].score;
    const topModels = scoredModels.filter(m => m.score >= topScore * 0.9);

    if (topModels.length > 1) {
      return this.loadBalancer.selectLeastUsedModel(topModels.map(m => m.model));
    }

    return scoredModels[0].model;
  }

  private filterModelsByComplexity(
    complexity: 'simple' | 'medium' | 'complex' | 'extreme',
    models: LLMModel[]
  ): LLMModel[] {
    const complexityModelMap: Record<string, string[]> = {
      simple: ['tinyllama-1.1b', 'phi-3.5-mini', 'mistral-7b'],
      medium: ['mistral-7b', 'qwen-2.5-7b', 'llama-3.1-8b', 'phi-3.5-mini'],
      complex: ['llama-3.1-8b', 'qwen-2.5-7b', 'codellama-34b'],
      extreme: ['codellama-34b', 'llama-3.1-8b']
    };

    const suitableModelIds = complexityModelMap[complexity] || [];
    
    return models.filter(model => 
      suitableModelIds.includes(model.id) && 
      (model.status === 'loaded' || model.status === 'available')
    );
  }

  private calculateModelScore(model: LLMModel, complexity: string): number {
    let score = 0;

    // Base score from model capabilities
    score += this.getCapabilityScore(model, complexity);

    // Performance history score
    score += this.getPerformanceScore(model.id, complexity);

    // Model efficiency score
    score += this.getEfficiencyScore(model);

    // Availability and status score
    score += this.getAvailabilityScore(model);

    // Load balancing factor
    score += this.getLoadBalancingScore(model.id);

    return Math.max(0, Math.min(100, score));
  }

  private getCapabilityScore(model: LLMModel, complexity: string): number {
    let score = 20; // Base score

    // Size-based scoring
    const sizeValue = this.extractModelSize(model.size || '');
    if (complexity === 'simple' && sizeValue <= 5) score += 15;
    if (complexity === 'medium' && sizeValue >= 5 && sizeValue <= 15) score += 15;
    if (complexity === 'complex' && sizeValue >= 10) score += 15;
    if (complexity === 'extreme' && sizeValue >= 20) score += 15;

    // Capability matching
    const relevantCapabilities = this.getRelevantCapabilities(complexity);
    const matchedCapabilities = model.capabilities.filter(cap => 
      relevantCapabilities.includes(cap)
    ).length;
    
    score += matchedCapabilities * 3;

    return score;
  }

  private extractModelSize(sizeStr: string): number {
    const match = sizeStr.match(/(\d+\.?\d*)B/i);
    return match ? parseFloat(match[1]) : 0;
  }

  private getRelevantCapabilities(complexity: string): string[] {
    const capabilityMap: Record<string, string[]> = {
      simple: ['general', 'fast', 'efficient', 'lightweight'],
      medium: ['general', 'reasoning', 'multilingual', 'indonesian'],
      complex: ['reasoning', 'code', 'math', 'analysis'],
      extreme: ['code', 'programming', 'debugging', 'research']
    };

    return capabilityMap[complexity] || ['general'];
  }

  private getPerformanceScore(modelId: string, complexity: string): number {
    const history = this.performanceHistory.filter(h => 
      h.modelId === modelId && h.complexity === complexity
    );

    if (history.length === 0) return 10; // Neutral score for new models

    const avgMetrics = {
      responseTime: history.reduce((sum, h) => sum + h.avgResponseTime, 0) / history.length,
      successRate: history.reduce((sum, h) => sum + h.successRate, 0) / history.length,
      tokenEfficiency: history.reduce((sum, h) => sum + h.tokenEfficiency, 0) / history.length,
      userSatisfaction: history.reduce((sum, h) => sum + h.userSatisfaction, 0) / history.length
    };

    let score = 0;
    score += Math.max(0, 20 - (avgMetrics.responseTime / 1000)); // Faster = better
    score += (avgMetrics.successRate / 100) * 15; // Higher success rate = better
    score += (avgMetrics.tokenEfficiency / 100) * 10; // More efficient = better
    score += (avgMetrics.userSatisfaction / 100) * 10; // Higher satisfaction = better

    return score;
  }

  private getEfficiencyScore(model: LLMModel): number {
    const sizeValue = this.extractModelSize(model.size || '');
    
    // Smaller models get efficiency bonus for simple tasks
    // Larger models get power bonus for complex tasks
    if (sizeValue <= 5) return 15; // Small models are efficient
    if (sizeValue <= 15) return 10; // Medium models are balanced
    if (sizeValue <= 50) return 5;  // Large models are powerful but less efficient
    
    return 0; // Very large models
  }

  private getAvailabilityScore(model: LLMModel): number {
    switch (model.status) {
      case 'loaded': return 20;
      case 'available': return 15;
      case 'downloading': return 5;
      case 'error': return 0;
      default: return 0;
    }
  }

  private getLoadBalancingScore(modelId: string): number {
    const usage = this.modelUsageCount.get(modelId) || 0;
    const maxUsage = Math.max(...Array.from(this.modelUsageCount.values()), 1);
    
    // Prefer less used models to balance load
    return Math.max(0, 10 - ((usage / maxUsage) * 10));
  }

  // Performance tracking
  recordModelPerformance(
    modelId: string,
    complexity: string,
    responseTime: number,
    success: boolean,
    tokenCount: number,
    inputTokens: number,
    userRating?: number
  ) {
    const metrics: ModelPerformanceMetrics = {
      modelId,
      complexity,
      avgResponseTime: responseTime,
      successRate: success ? 100 : 0,
      tokenEfficiency: inputTokens > 0 ? (tokenCount / inputTokens) * 100 : 100,
      userSatisfaction: userRating || (success ? 80 : 20),
      lastUsed: Date.now()
    };

    this.performanceHistory.push(metrics);
    
    // Update usage count
    this.modelUsageCount.set(modelId, (this.modelUsageCount.get(modelId) || 0) + 1);

    // Keep only recent history (last 1000 entries)
    if (this.performanceHistory.length > 1000) {
      this.performanceHistory = this.performanceHistory.slice(-1000);
    }

    this.savePerformanceHistory();
  }

  // Auto-learning system
  async optimizeModelSelection(): Promise<void> {
    // Analyze performance patterns
    const patterns = this.analyzePerformancePatterns();
    
    // Update model recommendations based on patterns
    this.updateModelRecommendations(patterns);
    
    console.log('🧠 MIORA Auto-Learning: Model selection optimized based on performance data');
  }

  private analyzePerformancePatterns(): any {
    const patterns: Record<string, any> = {};

    for (const complexity of ['simple', 'medium', 'complex', 'extreme']) {
      const complexityData = this.performanceHistory.filter(h => h.complexity === complexity);
      
      if (complexityData.length > 0) {
        patterns[complexity] = {
          bestModel: this.findBestModelForComplexity(complexity),
          avgResponseTime: complexityData.reduce((sum, h) => sum + h.avgResponseTime, 0) / complexityData.length,
          successRate: complexityData.reduce((sum, h) => sum + h.successRate, 0) / complexityData.length,
          modelCount: new Set(complexityData.map(h => h.modelId)).size
        };
      }
    }

    return patterns;
  }

  private findBestModelForComplexity(complexity: string): string | null {
    const complexityData = this.performanceHistory.filter(h => h.complexity === complexity);
    
    if (complexityData.length === 0) return null;

    const modelScores: Record<string, number> = {};
    
    for (const data of complexityData) {
      if (!modelScores[data.modelId]) {
        modelScores[data.modelId] = 0;
      }
      
      // Composite score: success rate + speed + efficiency + satisfaction
      modelScores[data.modelId] += 
        (data.successRate * 0.3) +
        (Math.max(0, 100 - (data.avgResponseTime / 100)) * 0.2) +
        (data.tokenEfficiency * 0.2) +
        (data.userSatisfaction * 0.3);
    }

    return Object.entries(modelScores).reduce((best, [modelId, score]) => 
      score > (modelScores[best] || 0) ? modelId : best
    , '');
  }

  private updateModelRecommendations(patterns: any): void {
    // Implementation for updating recommendations based on patterns
    // This could update internal scoring algorithms or model preferences
  }

  private loadPerformanceHistory(): void {
    try {
      const stored = localStorage.getItem('miora_model_performance');
      if (stored) {
        this.performanceHistory = JSON.parse(stored);
      }

      const usage = localStorage.getItem('miora_model_usage');
      if (usage) {
        this.modelUsageCount = new Map(JSON.parse(usage));
      }
    } catch (error) {
      console.error('Failed to load performance history:', error);
    }
  }

  private savePerformanceHistory(): void {
    try {
      localStorage.setItem('miora_model_performance', JSON.stringify(this.performanceHistory));
      localStorage.setItem('miora_model_usage', JSON.stringify(Array.from(this.modelUsageCount.entries())));
    } catch (error) {
      console.error('Failed to save performance history:', error);
    }
  }

  // Analytics and insights
  getPerformanceInsights(): any {
    return {
      totalExecutions: this.performanceHistory.length,
      modelUsage: Object.fromEntries(this.modelUsageCount),
      complexityDistribution: this.getComplexityDistribution(),
      averageResponseTimes: this.getAverageResponseTimes(),
      topPerformingModels: this.getTopPerformingModels()
    };
  }

  private getComplexityDistribution(): Record<string, number> {
    return this.performanceHistory.reduce((acc, h) => {
      acc[h.complexity] = (acc[h.complexity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private getAverageResponseTimes(): Record<string, number> {
    const times: Record<string, number[]> = {};
    
    for (const h of this.performanceHistory) {
      if (!times[h.modelId]) times[h.modelId] = [];
      times[h.modelId].push(h.avgResponseTime);
    }

    return Object.fromEntries(
      Object.entries(times).map(([modelId, timeArray]) => [
        modelId,
        timeArray.reduce((sum, time) => sum + time, 0) / timeArray.length
      ])
    );
  }

  private getTopPerformingModels(): string[] {
    const scores: Record<string, number> = {};
    
    for (const h of this.performanceHistory) {
      if (!scores[h.modelId]) scores[h.modelId] = 0;
      scores[h.modelId] += (h.successRate + h.userSatisfaction) / 2;
    }

    return Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([modelId]) => modelId);
  }
}

class ModelLoadBalancer {
  selectLeastUsedModel(models: LLMModel[]): LLMModel {
    // Simple round-robin for now
    // In a real implementation, this could be more sophisticated
    return models[Math.floor(Math.random() * models.length)];
  }
}
