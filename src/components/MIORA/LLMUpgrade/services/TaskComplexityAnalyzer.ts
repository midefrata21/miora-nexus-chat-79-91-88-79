export class TaskComplexityAnalyzer {
  private complexityRules = {
    simple: {
      keywords: ['hello', 'hi', 'what', 'how are you', 'simple', 'basic', 'easy'],
      patterns: [
        /^(hello|hi|hey)/i,
        /what is/i,
        /how are/i,
        /simple (question|task)/i
      ],
      maxLength: 50,
      score: 10
    },
    medium: {
      keywords: ['explain', 'describe', 'compare', 'analyze', 'create', 'write'],
      patterns: [
        /explain (how|why|what)/i,
        /describe .+/i,
        /compare .+ and .+/i,
        /write .+ about/i,
        /create .+/i
      ],
      maxLength: 200,
      score: 30
    },
    complex: {
      keywords: ['algorithm', 'code', 'programming', 'develop', 'design', 'architecture', 'system'],
      patterns: [
        /write .+ (code|program|function)/i,
        /develop .+ (system|application)/i,
        /design .+ (architecture|pattern)/i,
        /implement .+ (algorithm|solution)/i,
        /optimize .+/i
      ],
      maxLength: 500,
      score: 60
    },
    extreme: {
      keywords: ['machine learning', 'ai', 'deep learning', 'neural network', 'quantum', 'blockchain'],
      patterns: [
        /(machine learning|ai|artificial intelligence)/i,
        /(deep learning|neural network)/i,
        /(quantum|blockchain|cryptocurrency)/i,
        /build .+ (ai|ml) (model|system)/i,
        /research .+/i,
        /advanced .+ (algorithm|system)/i
      ],
      maxLength: 1000,
      score: 100
    }
  };

  analyzeTaskComplexity(task: string): 'simple' | 'medium' | 'complex' | 'extreme' {
    const lowerTask = task.toLowerCase();
    let totalScore = 0;
    
    // 1. Length analysis
    const lengthScore = Math.min(task.length / 10, 50);
    totalScore += lengthScore;
    
    // 2. Keyword analysis
    for (const [complexity, rules] of Object.entries(this.complexityRules)) {
      let complexityScore = 0;
      
      // Check keywords
      for (const keyword of rules.keywords) {
        if (lowerTask.includes(keyword)) {
          complexityScore += 5;
        }
      }
      
      // Check patterns
      for (const pattern of rules.patterns) {
        if (pattern.test(task)) {
          complexityScore += 10;
        }
      }
      
      // Add base score if any match
      if (complexityScore > 0) {
        totalScore += rules.score + complexityScore;
      }
    }
    
    // 3. Technical depth analysis
    const technicalKeywords = [
      'api', 'database', 'server', 'client', 'framework', 'library',
      'microservice', 'docker', 'kubernetes', 'devops', 'security',
      'performance', 'scalability', 'optimization'
    ];
    
    const technicalCount = technicalKeywords.filter(keyword => 
      lowerTask.includes(keyword)
    ).length;
    
    totalScore += technicalCount * 8;
    
    // 4. Question complexity analysis
    const questionWords = ['how', 'why', 'what', 'when', 'where', 'which'];
    const questionCount = questionWords.filter(word => 
      lowerTask.includes(word)
    ).length;
    
    if (questionCount > 2) {
      totalScore += 15;
    }
    
    // 5. Code-related task detection
    if (/write|code|implement|develop|build|create/i.test(task) &&
        /function|class|method|algorithm|program|application/i.test(task)) {
      totalScore += 25;
    }
    
    // 6. Multi-step task detection
    const stepIndicators = ['first', 'then', 'next', 'finally', 'step', 'and then'];
    const stepCount = stepIndicators.filter(indicator => 
      lowerTask.includes(indicator)
    ).length;
    
    totalScore += stepCount * 5;
    
    // Determine final complexity
    if (totalScore >= 80) return 'extreme';
    if (totalScore >= 50) return 'complex';
    if (totalScore >= 25) return 'medium';
    return 'simple';
  }

  getTaskMetadata(task: string) {
    const complexity = this.analyzeTaskComplexity(task);
    
    return {
      complexity,
      estimatedTokens: this.estimateTokenRequirement(task, complexity),
      recommendedTemperature: this.getRecommendedTemperature(complexity),
      recommendedMaxTokens: this.getRecommendedMaxTokens(complexity),
      taskType: this.detectTaskType(task),
      language: this.detectLanguage(task)
    };
  }

  private estimateTokenRequirement(task: string, complexity: string): number {
    const baseTokens = task.length / 4; // Rough estimation
    
    switch (complexity) {
      case 'simple': return Math.max(baseTokens * 2, 50);
      case 'medium': return Math.max(baseTokens * 4, 200);
      case 'complex': return Math.max(baseTokens * 8, 500);
      case 'extreme': return Math.max(baseTokens * 12, 1000);
      default: return 200;
    }
  }

  private getRecommendedTemperature(complexity: string): number {
    switch (complexity) {
      case 'simple': return 0.3;
      case 'medium': return 0.5;
      case 'complex': return 0.7;
      case 'extreme': return 0.8;
      default: return 0.5;
    }
  }

  private getRecommendedMaxTokens(complexity: string): number {
    switch (complexity) {
      case 'simple': return 300;
      case 'medium': return 800;
      case 'complex': return 1500;
      case 'extreme': return 3000;
      default: return 800;
    }
  }

  private detectTaskType(task: string): string {
    const lowerTask = task.toLowerCase();
    
    if (/write|code|implement|develop|program/i.test(task)) return 'coding';
    if (/explain|describe|what is|how does/i.test(task)) return 'explanation';
    if (/translate|terjemah/i.test(task)) return 'translation';
    if (/create|generate|make/i.test(task)) return 'generation';
    if (/analyze|compare|evaluate/i.test(task)) return 'analysis';
    if (/solve|calculate|compute/i.test(task)) return 'calculation';
    
    return 'general';
  }

  private detectLanguage(task: string): 'indonesian' | 'english' | 'mixed' {
    const indonesianWords = [
      'bagaimana', 'mengapa', 'adalah', 'dengan', 'untuk', 'yang', 'dari', 'ke',
      'dalam', 'pada', 'ini', 'itu', 'saya', 'kamu', 'dia', 'mereka', 'kami',
      'buatlah', 'jelaskan', 'tolong', 'bantu', 'gimana', 'kenapa'
    ];
    
    const words = task.toLowerCase().split(/\s+/);
    const indonesianCount = words.filter(word => 
      indonesianWords.includes(word)
    ).length;
    
    const indonesianRatio = indonesianCount / words.length;
    
    if (indonesianRatio > 0.3) return 'indonesian';
    if (indonesianRatio > 0.1) return 'mixed';
    return 'english';
  }

  // Performance benchmarking
  benchmarkComplexity(tasks: string[]): any {
    const results = tasks.map(task => ({
      task: task.substring(0, 50) + '...',
      complexity: this.analyzeTaskComplexity(task),
      metadata: this.getTaskMetadata(task)
    }));
    
    const complexityDistribution = results.reduce((acc, result) => {
      acc[result.complexity] = (acc[result.complexity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      results,
      distribution: complexityDistribution,
      averageTokens: results.reduce((sum, r) => sum + r.metadata.estimatedTokens, 0) / results.length
    };
  }
}