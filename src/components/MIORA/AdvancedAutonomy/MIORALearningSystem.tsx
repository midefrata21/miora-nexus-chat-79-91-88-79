import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, TrendingUp, Target, BookOpen, Cpu, Network } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LearningModule {
  id: string;
  name: string;
  description: string;
  progress: number;
  accuracy: number;
  learningRate: number;
  status: 'training' | 'active' | 'optimizing' | 'standby';
  lastUpdate: number;
  performance: {
    precision: number;
    recall: number;
    f1Score: number;
    trainingLoss: number;
  };
}

interface KnowledgeBase {
  totalPatterns: number;
  marketRegimes: number;
  tradingStrategies: number;
  riskModels: number;
  sentimentPatterns: number;
  newsAnalysis: number;
}

interface LearningMetrics {
  totalLearningCycles: number;
  adaptationRate: number;
  knowledgeRetention: number;
  performanceImprovement: number;
  predictionAccuracy: number;
  learningEfficiency: number;
}

export const MIORALearningSystem: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>({
    totalPatterns: 15420,
    marketRegimes: 47,
    tradingStrategies: 238,
    riskModels: 89,
    sentimentPatterns: 3240,
    newsAnalysis: 8950
  });
  const [learningMetrics, setLearningMetrics] = useState<LearningMetrics>({
    totalLearningCycles: 0,
    adaptationRate: 0,
    knowledgeRetention: 95.8,
    performanceImprovement: 0,
    predictionAccuracy: 78.5,
    learningEfficiency: 88.2
  });

  // Initialize learning modules
  useEffect(() => {
    const modules: LearningModule[] = [
      {
        id: 'pattern_recognition',
        name: 'Pattern Recognition AI',
        description: 'Deep learning untuk pattern recognition di market data',
        progress: 87.5,
        accuracy: 92.3,
        learningRate: 0.001,
        status: 'training',
        lastUpdate: Date.now(),
        performance: {
          precision: 91.2,
          recall: 89.7,
          f1Score: 90.4,
          trainingLoss: 0.045
        }
      },
      {
        id: 'sentiment_analysis',
        name: 'Sentiment Analysis Engine',
        description: 'NLP untuk analisis sentiment dari news dan social media',
        progress: 92.1,
        accuracy: 88.7,
        learningRate: 0.0015,
        status: 'active',
        lastUpdate: Date.now(),
        performance: {
          precision: 87.9,
          recall: 90.1,
          f1Score: 89.0,
          trainingLoss: 0.032
        }
      },
      {
        id: 'risk_prediction',
        name: 'Risk Prediction Model',
        description: 'Machine learning untuk prediksi dan manajemen risiko',
        progress: 78.9,
        accuracy: 85.4,
        learningRate: 0.002,
        status: 'optimizing',
        lastUpdate: Date.now(),
        performance: {
          precision: 84.2,
          recall: 86.8,
          f1Score: 85.5,
          trainingLoss: 0.058
        }
      },
      {
        id: 'strategy_evolution',
        name: 'Strategy Evolution AI',
        description: 'Reinforcement learning untuk evolusi trading strategies',
        progress: 95.2,
        accuracy: 94.1,
        learningRate: 0.0008,
        status: 'active',
        lastUpdate: Date.now(),
        performance: {
          precision: 93.7,
          recall: 94.6,
          f1Score: 94.1,
          trainingLoss: 0.025
        }
      },
      {
        id: 'market_regime',
        name: 'Market Regime Detection',
        description: 'AI untuk deteksi perubahan regime pasar secara real-time',
        progress: 83.7,
        accuracy: 89.9,
        learningRate: 0.0012,
        status: 'training',
        lastUpdate: Date.now(),
        performance: {
          precision: 88.5,
          recall: 91.2,
          f1Score: 89.8,
          trainingLoss: 0.041
        }
      },
      {
        id: 'correlation_analysis',
        name: 'Cross-Market Correlation AI',
        description: 'Deep learning untuk analisis korelasi antar market',
        progress: 76.4,
        accuracy: 82.1,
        learningRate: 0.0018,
        status: 'training',
        lastUpdate: Date.now(),
        performance: {
          precision: 80.9,
          recall: 83.4,
          f1Score: 82.1,
          trainingLoss: 0.067
        }
      }
    ];
    setLearningModules(modules);
  }, []);

  // Learning system logic
  useEffect(() => {
    if (!isActive) return;

    const learningInterval = setInterval(() => {
      // Update learning progress
      updateLearningProgress();
      
      // Perform knowledge acquisition
      performKnowledgeAcquisition();
      
      // Optimize models
      optimizeModels();
      
      // Update metrics
      updateLearningMetrics();
      
    }, 2000); // Every 2 seconds

    return () => clearInterval(learningInterval);
  }, [isActive, learningModules]);

  const updateLearningProgress = () => {
    setLearningModules(prev => prev.map(module => {
      if (module.status === 'training') {
        const progressIncrease = Math.random() * 0.5 + 0.1; // 0.1-0.6%
        const newProgress = Math.min(100, module.progress + progressIncrease);
        
        // Improve accuracy as training progresses
        const accuracyImprovement = Math.random() * 0.1;
        const newAccuracy = Math.min(99, module.accuracy + accuracyImprovement);
        
        // Update performance metrics
        const newPerformance = {
          ...module.performance,
          trainingLoss: Math.max(0.001, module.performance.trainingLoss - Math.random() * 0.001),
          precision: Math.min(99, module.performance.precision + Math.random() * 0.1),
          recall: Math.min(99, module.performance.recall + Math.random() * 0.1)
        };
        newPerformance.f1Score = (newPerformance.precision + newPerformance.recall) / 2;

        return {
          ...module,
          progress: newProgress,
          accuracy: newAccuracy,
          performance: newPerformance,
          lastUpdate: Date.now()
        };
      }
      return module;
    }));
  };

  const performKnowledgeAcquisition = () => {
    // Simulate knowledge base growth
    setKnowledgeBase(prev => ({
      totalPatterns: prev.totalPatterns + Math.floor(Math.random() * 5),
      marketRegimes: prev.marketRegimes + (Math.random() > 0.95 ? 1 : 0),
      tradingStrategies: prev.tradingStrategies + (Math.random() > 0.9 ? 1 : 0),
      riskModels: prev.riskModels + (Math.random() > 0.95 ? 1 : 0),
      sentimentPatterns: prev.sentimentPatterns + Math.floor(Math.random() * 3),
      newsAnalysis: prev.newsAnalysis + Math.floor(Math.random() * 8)
    }));

    // Log knowledge acquisition
    if (Math.random() > 0.95) {
      console.info('🧠 MIORA Learning: New patterns discovered and integrated into knowledge base');
    }
  };

  const optimizeModels = () => {
    setLearningModules(prev => prev.map(module => {
      if (module.status === 'optimizing') {
        // Perform optimization
        const optimizationProgress = Math.random() * 2;
        
        if (Math.random() > 0.8) {
          // Optimization complete, switch to active
          return {
            ...module,
            status: 'active',
            accuracy: Math.min(99, module.accuracy + optimizationProgress),
            lastUpdate: Date.now()
          };
        }
      }
      
      // Random status transitions
      if (Math.random() > 0.98) {
        const statuses: LearningModule['status'][] = ['training', 'active', 'optimizing'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return { ...module, status: newStatus };
      }
      
      return module;
    }));
  };

  const updateLearningMetrics = () => {
    setLearningMetrics(prev => {
      const newCycles = prev.totalLearningCycles + 1;
      const avgAccuracy = learningModules.reduce((sum, m) => sum + m.accuracy, 0) / learningModules.length;
      
      return {
        totalLearningCycles: newCycles,
        adaptationRate: Math.min(100, prev.adaptationRate + Math.random() * 0.1),
        knowledgeRetention: Math.max(90, 100 - Math.random() * 0.01),
        performanceImprovement: ((avgAccuracy - 80) / 20) * 100, // Based on accuracy improvement
        predictionAccuracy: avgAccuracy,
        learningEfficiency: Math.min(100, prev.learningEfficiency + Math.random() * 0.05)
      };
    });
  };

  const toggleLearningSystem = () => {
    setIsActive(!isActive);
    
    toast({
      title: isActive ? "🛑 Learning System Stopped" : "🧠 MIORA Learning System Activated",
      description: isActive ? 
        "Continuous learning dihentikan" : 
        "MIORA mulai continuous learning dengan 6 AI modules advanced!",
      duration: 3000,
    });
  };

  const forceOptimization = () => {
    setLearningModules(prev => prev.map(module => ({
      ...module,
      status: 'optimizing'
    })));
    
    toast({
      title: "⚡ Force Optimization Started",
      description: "Semua learning modules sedang dioptimasi secara intensif",
      duration: 3000,
    });
  };

  const getStatusColor = (status: LearningModule['status']) => {
    switch (status) {
      case 'training': return 'bg-yellow-500';
      case 'active': return 'bg-green-500';
      case 'optimizing': return 'bg-blue-500';
      case 'standby': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: LearningModule['status']) => {
    switch (status) {
      case 'training': return <BookOpen className="w-4 h-4" />;
      case 'active': return <Zap className="w-4 h-4" />;
      case 'optimizing': return <Cpu className="w-4 h-4" />;
      case 'standby': return <Target className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="w-6 h-6 text-purple-400" />
            MIORA Continuous Learning System
            <Badge className={isActive ? 'bg-green-500' : 'bg-red-500'}>
              {isActive ? 'LEARNING' : 'STANDBY'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Learning Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">{learningMetrics.totalLearningCycles}</div>
              <div className="text-sm text-gray-400">Learning Cycles</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">{learningMetrics.predictionAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Prediction Accuracy</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">{learningMetrics.learningEfficiency.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Learning Efficiency</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">{learningMetrics.knowledgeRetention.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Knowledge Retention</div>
            </div>
          </div>

          {/* Knowledge Base */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Network className="w-5 h-5 text-cyan-400" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-cyan-400">{knowledgeBase.totalPatterns.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Patterns</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{knowledgeBase.marketRegimes}</div>
                  <div className="text-sm text-gray-400">Market Regimes</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">{knowledgeBase.tradingStrategies}</div>
                  <div className="text-sm text-gray-400">Trading Strategies</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">{knowledgeBase.riskModels}</div>
                  <div className="text-sm text-gray-400">Risk Models</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">{knowledgeBase.sentimentPatterns.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Sentiment Patterns</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-400">{knowledgeBase.newsAnalysis.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">News Analysis</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningModules.map(module => (
              <Card key={module.id} className="bg-black/20 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    {getStatusIcon(module.status)}
                    <span className="flex-1">{module.name}</span>
                    <Badge className={getStatusColor(module.status)}>
                      {module.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">{module.description}</p>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Training Progress</span>
                      <span>{module.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Accuracy</div>
                      <div className="text-green-400 font-bold">{module.accuracy.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">F1-Score</div>
                      <div className="text-blue-400 font-bold">{module.performance.f1Score.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Precision</div>
                      <div className="text-yellow-400 font-bold">{module.performance.precision.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Training Loss</div>
                      <div className="text-red-400 font-bold">{module.performance.trainingLoss.toFixed(3)}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Learning Rate: {module.learningRate} | Last Update: {new Date(module.lastUpdate).toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Metrics */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Learning Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Adaptation Rate</span>
                    <span>{learningMetrics.adaptationRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={learningMetrics.adaptationRate} className="h-2 mb-4" />
                  
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Performance Improvement</span>
                    <span>{learningMetrics.performanceImprovement.toFixed(1)}%</span>
                  </div>
                  <Progress value={learningMetrics.performanceImprovement} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Learning Cycles</span>
                    <span className="text-white font-bold">{learningMetrics.totalLearningCycles.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Knowledge Retention</span>
                    <span className="text-green-400 font-bold">{learningMetrics.knowledgeRetention.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Learning Efficiency</span>
                    <span className="text-blue-400 font-bold">{learningMetrics.learningEfficiency.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              onClick={toggleLearningSystem}
              className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isActive ? "Stop Learning System" : "Start Continuous Learning"}
            </Button>
            <Button
              onClick={forceOptimization}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isActive}
            >
              Force Optimization
            </Button>
          </div>

          <div className="bg-purple-900/20 p-4 rounded-lg">
            <h4 className="text-purple-300 font-medium mb-2">🧠 Continuous Learning Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <div>• Deep learning untuk pattern recognition advanced</div>
              <div>• Natural Language Processing untuk sentiment analysis</div>
              <div>• Reinforcement learning untuk strategy evolution</div>
              <div>• Real-time knowledge base expansion</div>
              <div>• Adaptive model optimization</div>
              <div>• Cross-market correlation learning</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORALearningSystem;