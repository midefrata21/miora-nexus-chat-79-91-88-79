import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Lightbulb, 
  Target, 
  Activity,
  Cpu,
  Database,
  Zap
} from 'lucide-react';

interface LearningPattern {
  id: string;
  pattern: string;
  category: 'conversation' | 'voice' | 'context' | 'behavior';
  confidence: number;
  frequency: number;
  lastSeen: number;
  effectiveness: number;
  adaptations: string[];
}

interface LearningInsight {
  id: string;
  insight: string;
  type: 'user_preference' | 'conversation_style' | 'topic_interest' | 'response_timing';
  strength: number;
  evidence: string[];
  applications: string[];
}

interface AutoLearningState {
  isActive: boolean;
  learningMode: 'passive' | 'active' | 'aggressive';
  patternsDetected: number;
  insightsGenerated: number;
  adaptationsMade: number;
  learningEfficiency: number;
}

interface AutoLearningSystemProps {
  conversationData: any[];
  voiceData: any[];
  onLearningUpdate: (insights: LearningInsight[], patterns: LearningPattern[]) => void;
  onAdaptationApplied: (adaptation: any) => void;
}

const AutoLearningSystem: React.FC<AutoLearningSystemProps> = ({
  conversationData,
  voiceData,
  onLearningUpdate,
  onAdaptationApplied
}) => {
  const { toast } = useToast();

  const [learningState, setLearningState] = useState<AutoLearningState>({
    isActive: true,
    learningMode: 'active',
    patternsDetected: 0,
    insightsGenerated: 0,
    adaptationsMade: 0,
    learningEfficiency: 85
  });

  const [detectedPatterns, setDetectedPatterns] = useState<LearningPattern[]>([]);
  const [generatedInsights, setGeneratedInsights] = useState<LearningInsight[]>([]);
  const [learningProgress, setLearningProgress] = useState({
    conversationAnalysis: 0,
    voiceAnalysis: 0,
    contextBuilding: 0,
    adaptationGeneration: 0
  });

  const [realTimeLearning, setRealTimeLearning] = useState({
    isProcessing: false,
    currentTask: '',
    progressPercentage: 0
  });

  // Auto-learning cycle
  useEffect(() => {
    if (!learningState.isActive) return;

    const learningInterval = setInterval(() => {
      performLearningCycle();
    }, 5000); // Learning cycle every 5 seconds

    return () => clearInterval(learningInterval);
  }, [learningState.isActive, conversationData, voiceData]);

  const performLearningCycle = useCallback(async () => {
    if (realTimeLearning.isProcessing) return;

    setRealTimeLearning(prev => ({ ...prev, isProcessing: true }));

    try {
      // Step 1: Analyze conversation patterns
      setRealTimeLearning(prev => ({ 
        ...prev, 
        currentTask: 'Analyzing conversation patterns...', 
        progressPercentage: 20 
      }));
      await analyzeConversationPatterns();

      // Step 2: Analyze voice patterns
      setRealTimeLearning(prev => ({ 
        ...prev, 
        currentTask: 'Processing voice interaction patterns...', 
        progressPercentage: 40 
      }));
      await analyzeVoicePatterns();

      // Step 3: Generate insights
      setRealTimeLearning(prev => ({ 
        ...prev, 
        currentTask: 'Generating behavioral insights...', 
        progressPercentage: 60 
      }));
      await generateBehavioralInsights();

      // Step 4: Create adaptations
      setRealTimeLearning(prev => ({ 
        ...prev, 
        currentTask: 'Creating adaptive responses...', 
        progressPercentage: 80 
      }));
      await createAdaptiveResponses();

      // Step 5: Apply learning
      setRealTimeLearning(prev => ({ 
        ...prev, 
        currentTask: 'Applying learned patterns...', 
        progressPercentage: 100 
      }));
      await applyLearning();

      // Update learning state
      setLearningState(prev => ({
        ...prev,
        learningEfficiency: Math.min(prev.learningEfficiency + 2, 98)
      }));

    } catch (error) {
      console.error('Learning cycle error:', error);
    } finally {
      setRealTimeLearning({
        isProcessing: false,
        currentTask: '',
        progressPercentage: 0
      });
    }
  }, [conversationData, voiceData, realTimeLearning.isProcessing]);

  const analyzeConversationPatterns = async () => {
    if (!conversationData.length) return;

    // Simulate pattern detection from conversation data
    const newPatterns: LearningPattern[] = [];

    // Analyze conversation topics
    const topicPattern: LearningPattern = {
      id: `pattern_${Date.now()}_topic`,
      pattern: 'User prefers technical discussions in afternoon',
      category: 'conversation',
      confidence: 0.78,
      frequency: Math.floor(Math.random() * 10) + 5,
      lastSeen: Date.now(),
      effectiveness: 0.85,
      adaptations: ['Adjust technical depth based on time', 'Prepare more detailed explanations']
    };

    // Analyze response preferences
    const responsePattern: LearningPattern = {
      id: `pattern_${Date.now()}_response`,
      pattern: 'User responds better to structured answers with examples',
      category: 'conversation',
      confidence: 0.82,
      frequency: Math.floor(Math.random() * 15) + 8,
      lastSeen: Date.now(),
      effectiveness: 0.90,
      adaptations: ['Structure responses with clear points', 'Include relevant examples']
    };

    newPatterns.push(topicPattern, responsePattern);
    
    setDetectedPatterns(prev => [...prev, ...newPatterns]);
    setLearningState(prev => ({ 
      ...prev, 
      patternsDetected: prev.patternsDetected + newPatterns.length 
    }));

    setLearningProgress(prev => ({ ...prev, conversationAnalysis: Math.min(prev.conversationAnalysis + 15, 100) }));
  };

  const analyzeVoicePatterns = async () => {
    if (!voiceData.length) return;

    // Voice interaction pattern analysis
    const voicePatterns: LearningPattern[] = [];

    const voicePattern: LearningPattern = {
      id: `pattern_${Date.now()}_voice`,
      pattern: 'User speaks faster when excited about technology topics',
      category: 'voice',
      confidence: 0.75,
      frequency: Math.floor(Math.random() * 8) + 3,
      lastSeen: Date.now(),
      effectiveness: 0.80,
      adaptations: ['Detect excitement level from speech rate', 'Adjust response enthusiasm']
    };

    const clarityPattern: LearningPattern = {
      id: `pattern_${Date.now()}_clarity`,
      pattern: 'Voice recognition improves with shorter sentences',
      category: 'voice',
      confidence: 0.88,
      frequency: Math.floor(Math.random() * 12) + 6,
      lastSeen: Date.now(),
      effectiveness: 0.92,
      adaptations: ['Encourage shorter voice inputs', 'Break down complex responses']
    };

    voicePatterns.push(voicePattern, clarityPattern);
    
    setDetectedPatterns(prev => [...prev, ...voicePatterns]);
    setLearningState(prev => ({ 
      ...prev, 
      patternsDetected: prev.patternsDetected + voicePatterns.length 
    }));

    setLearningProgress(prev => ({ ...prev, voiceAnalysis: Math.min(prev.voiceAnalysis + 20, 100) }));
  };

  const generateBehavioralInsights = async () => {
    const newInsights: LearningInsight[] = [];

    // User preference insights
    const preferenceInsight: LearningInsight = {
      id: `insight_${Date.now()}_preference`,
      insight: 'User prefers concise, actionable responses with clear next steps',
      type: 'user_preference',
      strength: 0.85,
      evidence: [
        'Shorter responses get better engagement',
        'Questions about next steps are frequent',
        'User appreciates structured information'
      ],
      applications: [
        'Keep responses under 3 sentences when possible',
        'Always include actionable suggestions',
        'Structure information with clear hierarchy'
      ]
    };

    // Conversation style insight
    const styleInsight: LearningInsight = {
      id: `insight_${Date.now()}_style`,
      insight: 'User engages more with conversational, friendly tone than formal responses',
      type: 'conversation_style',
      strength: 0.78,
      evidence: [
        'Longer conversations with friendly responses',
        'More follow-up questions with casual tone',
        'Positive feedback on relatable examples'
      ],
      applications: [
        'Use conversational language',
        'Include relatable examples and analogies',
        'Ask engaging follow-up questions'
      ]
    };

    // Topic interest insight
    const topicInsight: LearningInsight = {
      id: `insight_${Date.now()}_topic`,
      insight: 'Strong interest in AI technology, automation, and optimization strategies',
      type: 'topic_interest',
      strength: 0.92,
      evidence: [
        'Frequent questions about AI capabilities',
        'Deep dives into optimization topics',
        'Interest in automation workflows'
      ],
      applications: [
        'Proactively suggest AI-related improvements',
        'Provide optimization insights',
        'Share relevant automation ideas'
      ]
    };

    newInsights.push(preferenceInsight, styleInsight, topicInsight);
    
    setGeneratedInsights(prev => [...prev, ...newInsights]);
    setLearningState(prev => ({ 
      ...prev, 
      insightsGenerated: prev.insightsGenerated + newInsights.length 
    }));

    setLearningProgress(prev => ({ ...prev, contextBuilding: Math.min(prev.contextBuilding + 25, 100) }));
  };

  const createAdaptiveResponses = async () => {
    // Create adaptive response strategies based on insights
    const adaptations = [
      {
        id: `adaptation_${Date.now()}_1`,
        type: 'response_structure',
        description: 'Implement structured responses with clear action items',
        confidence: 0.85,
        implementation: 'Auto-format responses with bullet points and next steps'
      },
      {
        id: `adaptation_${Date.now()}_2`,
        type: 'tone_adjustment',
        description: 'Adjust response tone based on topic and user energy level',
        confidence: 0.78,
        implementation: 'Dynamic tone matching with enthusiasm detection'
      },
      {
        id: `adaptation_${Date.now()}_3`,
        type: 'proactive_suggestions',
        description: 'Proactively offer relevant insights based on interest patterns',
        confidence: 0.82,
        implementation: 'Context-aware suggestion engine'
      }
    ];

    for (const adaptation of adaptations) {
      onAdaptationApplied(adaptation);
    }

    setLearningState(prev => ({ 
      ...prev, 
      adaptationsMade: prev.adaptationsMade + adaptations.length 
    }));

    setLearningProgress(prev => ({ ...prev, adaptationGeneration: Math.min(prev.adaptationGeneration + 30, 100) }));
  };

  const applyLearning = async () => {
    // Apply learned patterns and insights to improve system behavior
    onLearningUpdate(generatedInsights, detectedPatterns);
    
    // Simulate learning application
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (Math.random() > 0.7) { // 30% chance to show learning notification
      toast({
        title: "🧠 Learning Applied",
        description: `Applied ${detectedPatterns.length} patterns and ${generatedInsights.length} insights to improve responses`,
        duration: 4000,
      });
    }
  };

  const toggleLearningMode = (mode: 'passive' | 'active' | 'aggressive') => {
    setLearningState(prev => ({ ...prev, learningMode: mode }));
    
    toast({
      title: "🎯 Learning Mode Changed",
      description: `Switched to ${mode} learning mode`,
      duration: 3000,
    });
  };

  const resetLearningData = () => {
    setDetectedPatterns([]);
    setGeneratedInsights([]);
    setLearningState(prev => ({
      ...prev,
      patternsDetected: 0,
      insightsGenerated: 0,
      adaptationsMade: 0
    }));
    setLearningProgress({
      conversationAnalysis: 0,
      voiceAnalysis: 0,
      contextBuilding: 0,
      adaptationGeneration: 0
    });

    toast({
      title: "🔄 Learning Data Reset",
      description: "All learning data has been cleared and restarted",
      duration: 3000,
    });
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'passive': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'aggressive': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Auto-Learning System
            <Badge variant="outline" className="border-purple-400 text-purple-300">
              Mode: {learningState.learningMode}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${learningState.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-sm">{learningState.isActive ? 'Learning' : 'Paused'}</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Learning Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-purple-400 font-bold text-lg">{learningState.patternsDetected}</div>
            <div className="text-xs text-gray-400">Patterns Detected</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-blue-400 font-bold text-lg">{learningState.insightsGenerated}</div>
            <div className="text-xs text-gray-400">Insights Generated</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-green-400 font-bold text-lg">{learningState.adaptationsMade}</div>
            <div className="text-xs text-gray-400">Adaptations Made</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-yellow-400 font-bold text-lg">{learningState.learningEfficiency}%</div>
            <div className="text-xs text-gray-400">Learning Efficiency</div>
          </div>
        </div>

        {/* Real-time Learning Status */}
        {realTimeLearning.isProcessing && (
          <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-300 font-medium">Auto-Learning in Progress</span>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">{realTimeLearning.currentTask}</div>
              <Progress value={realTimeLearning.progressPercentage} className="h-2" />
            </div>
          </div>
        )}

        {/* Learning Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Learning Progress
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Conversation Analysis:</span>
                <span className="text-white">{learningProgress.conversationAnalysis}%</span>
              </div>
              <Progress value={learningProgress.conversationAnalysis} className="h-1" />
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Voice Pattern Analysis:</span>
                <span className="text-white">{learningProgress.voiceAnalysis}%</span>
              </div>
              <Progress value={learningProgress.voiceAnalysis} className="h-1" />
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Context Building:</span>
                <span className="text-white">{learningProgress.contextBuilding}%</span>
              </div>
              <Progress value={learningProgress.contextBuilding} className="h-1" />
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Adaptation Generation:</span>
                <span className="text-white">{learningProgress.adaptationGeneration}%</span>
              </div>
              <Progress value={learningProgress.adaptationGeneration} className="h-1" />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Learning Controls
            </h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                {(['passive', 'active', 'aggressive'] as const).map(mode => (
                  <Button
                    key={mode}
                    size="sm"
                    variant={learningState.learningMode === mode ? "default" : "outline"}
                    onClick={() => toggleLearningMode(mode)}
                    className={`capitalize ${learningState.learningMode === mode ? getModeColor(mode) : ''}`}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={resetLearningData}
                className="w-full text-orange-400 border-orange-400 hover:bg-orange-400/10"
              >
                Reset Learning Data
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Insights */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Recent Learning Insights ({generatedInsights.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {generatedInsights.slice(-3).map(insight => (
              <div key={insight.id} className="p-3 bg-black/20 rounded border border-purple-500/20">
                <div className="text-sm text-white font-medium">{insight.insight}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Type: {insight.type.replace('_', ' ')} | Strength: {(insight.strength * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patterns */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Detected Patterns ({detectedPatterns.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {detectedPatterns.slice(-3).map(pattern => (
              <div key={pattern.id} className="p-3 bg-black/20 rounded border border-green-500/20">
                <div className="text-sm text-white font-medium">{pattern.pattern}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Category: {pattern.category} | Confidence: {(pattern.confidence * 100).toFixed(0)}% | Frequency: {pattern.frequency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoLearningSystem;