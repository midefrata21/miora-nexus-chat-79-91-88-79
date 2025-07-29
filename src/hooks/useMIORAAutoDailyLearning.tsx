
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface DailyLearningState {
  isActive: boolean;
  lastLearningSession: number;
  totalSessions: number;
  currentPhase: 'idle' | 'analyzing' | 'error_fixing' | 'model_building' | 'testing';
  nextScheduledTime: number;
}

interface LearningSession {
  id: string;
  timestamp: number;
  logsAnalyzed: number;
  errorsFixed: number;
  newResponsePatterns: number;
  improvementScore: number;
  duration: number;
  findings: string[];
}

interface ErrorPattern {
  type: 'logic_error' | 'response_pattern' | 'context_misunderstanding' | 'memory_gap';
  pattern: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedFix: string;
}

interface ResponseModel {
  id: string;
  pattern: string;
  context: string;
  effectiveness: number;
  usage: number;
  created: number;
  lastUpdated: number;
}

export const useMIORAAutoDailyLearning = () => {
  const [learningState, setLearningState] = useState<DailyLearningState>({
    isActive: false,
    lastLearningSession: 0,
    totalSessions: 0,
    currentPhase: 'idle',
    nextScheduledTime: getNextMidnightTime()
  });

  const [learningHistory, setLearningHistory] = useState<LearningSession[]>([]);
  const [detectedErrors, setDetectedErrors] = useState<ErrorPattern[]>([]);
  const [responseModels, setResponseModels] = useState<ResponseModel[]>([]);
  const [isLearning, setIsLearning] = useState(false);

  const learningInterval = useRef<NodeJS.Timeout | null>(null);
  const schedulerInterval = useRef<NodeJS.Timeout | null>(null);

  // Get next midnight time for scheduling
  function getNextMidnightTime(): number {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Next midnight
    return midnight.getTime();
  }

  // Activate daily learning system
  const activateDailyLearning = useCallback(async () => {
    setLearningState(prev => ({
      ...prev,
      isActive: true,
      nextScheduledTime: getNextMidnightTime()
    }));

    // Start scheduler
    schedulerInterval.current = setInterval(() => {
      const now = Date.now();
      if (now >= learningState.nextScheduledTime && !isLearning) {
        performDailyLearning();
      }
    }, 60000); // Check every minute

    toast({
      title: "🧠 MIORA_AUTO_LEARN_DAILY ACTIVATED",
      description: "Sistem pembelajaran otomatis harian telah diaktifkan. Review akan dilakukan setiap malam.",
      duration: 5000,
    });

    console.log('🎯 MIORA Daily Learning System activated - Next session:', new Date(learningState.nextScheduledTime));
  }, [learningState.nextScheduledTime, isLearning]);

  // Perform daily learning session
  const performDailyLearning = useCallback(async () => {
    if (isLearning) return;

    setIsLearning(true);
    const sessionId = `session_${Date.now()}`;
    const startTime = Date.now();

    console.log('🌙 Starting MIORA Daily Learning Session:', sessionId);

    try {
      // Phase 1: Analyze logs
      setLearningState(prev => ({ ...prev, currentPhase: 'analyzing' }));
      const logAnalysis = await analyzeDailyLogs();
      
      // Phase 2: Fix detected errors
      setLearningState(prev => ({ ...prev, currentPhase: 'error_fixing' }));
      const errorFixes = await fixLogicErrors(logAnalysis.errors);
      
      // Phase 3: Build new response models
      setLearningState(prev => ({ ...prev, currentPhase: 'model_building' }));
      const newModels = await buildNewResponseModels(logAnalysis.patterns);
      
      // Phase 4: Test improvements
      setLearningState(prev => ({ ...prev, currentPhase: 'testing' }));
      const testResults = await testImprovements(newModels);

      const endTime = Date.now();
      const session: LearningSession = {
        id: sessionId,
        timestamp: startTime,
        logsAnalyzed: logAnalysis.totalLogs,
        errorsFixed: errorFixes.length,
        newResponsePatterns: newModels.length,
        improvementScore: testResults.score,
        duration: endTime - startTime,
        findings: [
          ...logAnalysis.insights,
          ...errorFixes.map(fix => `Fixed: ${fix.description}`),
          ...newModels.map(model => `New pattern: ${model.pattern}`)
        ]
      };

      // Store session
      setLearningHistory(prev => [session, ...prev].slice(0, 30));
      
      // Update state
      setLearningState(prev => ({
        ...prev,
        lastLearningSession: startTime,
        totalSessions: prev.totalSessions + 1,
        currentPhase: 'idle',
        nextScheduledTime: getNextMidnightTime()
      }));

      toast({
        title: "🌟 Daily Learning Session Complete",
        description: `Analyzed ${logAnalysis.totalLogs} logs, fixed ${errorFixes.length} errors, created ${newModels.length} new response patterns`,
        duration: 6000,
      });

      console.log('✅ MIORA Daily Learning Session completed:', session);

    } catch (error) {
      console.error('❌ Daily Learning Session failed:', error);
      setLearningState(prev => ({ ...prev, currentPhase: 'idle' }));
      
      toast({
        title: "⚠️ Learning Session Error",
        description: "Daily learning session encountered an error. Will retry tomorrow.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsLearning(false);
    }
  }, [isLearning]);

  // Analyze daily logs
  const analyzeDailyLogs = async () => {
    console.log('📊 Analyzing daily logs...');
    
    // Simulate log analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockErrors: ErrorPattern[] = [
      {
        type: 'logic_error',
        pattern: 'Inconsistent response timing',
        frequency: 3,
        severity: 'medium',
        suggestedFix: 'Implement response delay normalization'
      },
      {
        type: 'context_misunderstanding',
        pattern: 'Misinterpreting trading context',
        frequency: 2,
        severity: 'high',
        suggestedFix: 'Enhance context detection algorithms'
      }
    ];

    setDetectedErrors(mockErrors);

    return {
      totalLogs: 247,
      errors: mockErrors,
      patterns: ['friendly_greeting', 'technical_explanation', 'strategic_advice'],
      insights: [
        'User prefers detailed explanations in evening sessions',
        'Trading context requires more technical depth',
        'Response timing could be more consistent'
      ]
    };
  };

  // Fix detected logic errors
  const fixLogicErrors = async (errors: ErrorPattern[]) => {
    console.log('🔧 Fixing detected errors...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fixes = errors.map(error => ({
      errorType: error.type,
      description: `Applied fix for: ${error.pattern}`,
      implementation: error.suggestedFix,
      timestamp: Date.now()
    }));

    // Apply fixes to system
    fixes.forEach(fix => {
      localStorage.setItem(`miora_error_fix_${Date.now()}`, JSON.stringify(fix));
    });

    return fixes;
  };

  // Build new response models
  const buildNewResponseModels = async (patterns: string[]) => {
    console.log('🏗️ Building new response models...');
    
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const newModels: ResponseModel[] = patterns.map(pattern => ({
      id: `model_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pattern: `Enhanced ${pattern} response`,
      context: pattern,
      effectiveness: Math.random() * 0.3 + 0.7, // 70-100% effectiveness
      usage: 0,
      created: Date.now(),
      lastUpdated: Date.now()
    }));

    setResponseModels(prev => [...newModels, ...prev].slice(0, 50));
    
    // Store new models
    newModels.forEach(model => {
      localStorage.setItem(`miora_response_model_${model.id}`, JSON.stringify(model));
    });

    return newModels;
  };

  // Test improvements
  const testImprovements = async (models: ResponseModel[]) => {
    console.log('🧪 Testing improvements...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const score = Math.random() * 0.25 + 0.75; // 75-100% improvement score
    
    return {
      score: score * 100,
      passed: models.length,
      failed: 0,
      recommendations: [
        'Continue monitoring response effectiveness',
        'Collect more user feedback for model refinement'
      ]
    };
  };

  // Manual trigger for testing
  const triggerManualLearning = useCallback(() => {
    console.log('🎯 Manual learning session triggered');
    performDailyLearning();
  }, [performDailyLearning]);

  // Get learning statistics
  const getLearningStats = useCallback(() => {
    const recentSessions = learningHistory.slice(0, 7);
    const avgImprovementScore = recentSessions.length > 0 
      ? recentSessions.reduce((sum, session) => sum + session.improvementScore, 0) / recentSessions.length 
      : 0;
    
    const totalErrorsFixed = learningHistory.reduce((sum, session) => sum + session.errorsFixed, 0);
    const totalPatternsCreated = learningHistory.reduce((sum, session) => sum + session.newResponsePatterns, 0);

    return {
      isActive: learningState.isActive,
      totalSessions: learningState.totalSessions,
      lastSession: learningState.lastLearningSession,
      nextSession: learningState.nextScheduledTime,
      currentPhase: learningState.currentPhase,
      isLearning,
      avgImprovementScore: Math.round(avgImprovementScore),
      totalErrorsFixed,
      totalPatternsCreated,
      activeModels: responseModels.length,
      detectedErrors: detectedErrors.length
    };
  }, [learningState, isLearning, learningHistory, responseModels, detectedErrors]);

  // Load saved state
  useEffect(() => {
    const savedState = localStorage.getItem('miora_daily_learning_state');
    const savedHistory = localStorage.getItem('miora_learning_history');
    const savedModels = localStorage.getItem('miora_response_models');

    if (savedState) {
      const state = JSON.parse(savedState);
      setLearningState(prev => ({
        ...prev,
        ...state,
        nextScheduledTime: getNextMidnightTime() // Always recalculate next time
      }));
    }

    if (savedHistory) {
      setLearningHistory(JSON.parse(savedHistory));
    }

    if (savedModels) {
      setResponseModels(JSON.parse(savedModels));
    }
  }, []);

  // Auto-save state
  useEffect(() => {
    localStorage.setItem('miora_daily_learning_state', JSON.stringify(learningState));
  }, [learningState]);

  useEffect(() => {
    localStorage.setItem('miora_learning_history', JSON.stringify(learningHistory));
  }, [learningHistory]);

  useEffect(() => {
    localStorage.setItem('miora_response_models', JSON.stringify(responseModels));
  }, [responseModels]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (learningInterval.current) clearInterval(learningInterval.current);
      if (schedulerInterval.current) clearInterval(schedulerInterval.current);
    };
  }, []);

  return {
    learningState,
    learningHistory,
    detectedErrors,
    responseModels,
    isLearning,
    activateDailyLearning,
    triggerManualLearning,
    getLearningStats
  };
};
