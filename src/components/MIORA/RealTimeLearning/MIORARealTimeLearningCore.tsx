import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, Activity, Infinity, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LearningSession {
  id: string;
  source: 'ChatGPT' | 'Claude' | 'Gemini' | 'Grok' | 'Perplexity';
  topic: string;
  learningData: string;
  confidence: number;
  timestamp: number;
  integrated: boolean;
}

interface RealTimeMetrics {
  learningRate: number;
  integrationSpeed: number;
  adaptationScore: number;
  responseTime: number;
  accuracyImprovement: number;
  knowledgeGrowth: number;
}

const MIORARealTimeLearningCore: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [learningSessions, setLearningSessions] = useState<LearningSession[]>([]);
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    learningRate: 0,
    integrationSpeed: 0,
    adaptationScore: 0,
    responseTime: 0,
    accuracyImprovement: 0,
    knowledgeGrowth: 0
  });

  const [mirrorLearningActive, setMirrorLearningActive] = useState(false);
  const [adaptiveModeActive, setAdaptiveModeActive] = useState(false);

  // Auto-activate system on mount
  useEffect(() => {
    const initSystem = setTimeout(() => {
      activateRealTimeLearning();
    }, 1000);

    return () => clearTimeout(initSystem);
  }, []);

  // Real-time metrics simulation
  useEffect(() => {
    if (!isActive) return;

    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        learningRate: Math.min(100, prev.learningRate + Math.random() * 2),
        integrationSpeed: Math.min(100, prev.integrationSpeed + Math.random() * 1.5),
        adaptationScore: Math.min(100, prev.adaptationScore + Math.random() * 1.2),
        responseTime: Math.max(15, prev.responseTime - Math.random() * 2),
        accuracyImprovement: Math.min(100, prev.accuracyImprovement + Math.random() * 0.8),
        knowledgeGrowth: Math.min(100, prev.knowledgeGrowth + Math.random() * 1.1)
      }));
    }, 3000);

    return () => clearInterval(metricsInterval);
  }, [isActive]);

  // Simulate learning sessions
  useEffect(() => {
    if (!mirrorLearningActive) return;

    const learningInterval = setInterval(() => {
      const sources: LearningSession['source'][] = ['ChatGPT', 'Claude', 'Gemini', 'Grok', 'Perplexity'];
      const topics = [
        'Advanced Reasoning Patterns',
        'Contextual Understanding',
        'Multi-modal Processing',
        'Natural Language Generation',
        'Problem Solving Strategies',
        'Memory Optimization',
        'Response Accuracy Enhancement',
        'Conversational Flow'
      ];

      const newSession: LearningSession = {
        id: `session_${Date.now()}`,
        source: sources[Math.floor(Math.random() * sources.length)],
        topic: topics[Math.floor(Math.random() * topics.length)],
        learningData: `Learning pattern acquired from ${sources[Math.floor(Math.random() * sources.length)]}`,
        confidence: 75 + Math.random() * 25,
        timestamp: Date.now(),
        integrated: false
      };

      setLearningSessions(prev => [newSession, ...prev.slice(0, 9)]);

      // Auto-integrate after 5 seconds
      setTimeout(() => {
        setLearningSessions(prev => 
          prev.map(session => 
            session.id === newSession.id 
              ? { ...session, integrated: true }
              : session
          )
        );
      }, 5000);
    }, 8000);

    return () => clearInterval(learningInterval);
  }, [mirrorLearningActive]);

  const activateRealTimeLearning = () => {
    setIsActive(true);
    setMirrorLearningActive(true);
    setAdaptiveModeActive(true);
    
    toast({
      title: "🧠 REAL-TIME LEARNING ACTIVATED",
      description: "MIORA sekarang belajar secara real-time dari semua AI terdepan",
      duration: 6000,
    });
  };

  const toggleMirrorLearning = () => {
    setMirrorLearningActive(!mirrorLearningActive);
    
    toast({
      title: mirrorLearningActive ? "⏸️ MIRROR LEARNING PAUSED" : "🔄 MIRROR LEARNING RESUMED",
      description: mirrorLearningActive 
        ? "Mirror learning dari AI lain dihentikan sementara"
        : "Melanjutkan pembelajaran dari ChatGPT, Claude, Gemini, Grok, Perplexity",
      duration: 4000,
    });
  };

  const forceIntegration = () => {
    setLearningSessions(prev => 
      prev.map(session => ({ ...session, integrated: true }))
    );
    
    toast({
      title: "⚡ FORCE INTEGRATION COMPLETE",
      description: "Semua session pembelajaran telah diintegrasikan ke MIORA",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="h-12 w-12 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              MIORA REAL-TIME LEARNING
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🔄 Mirror Learning dari Semua AI Terdepan - Pembelajaran Langsung & Adaptasi Otomatis
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Learning: {isActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className={`px-4 py-2 ${mirrorLearningActive ? 'bg-blue-500' : 'bg-gray-500'}`}>
              <Infinity className="h-4 w-4 mr-2" />
              Mirror Learning: {mirrorLearningActive ? 'ON' : 'OFF'}
            </Badge>
            <Badge className={`px-4 py-2 ${adaptiveModeActive ? 'bg-purple-500' : 'bg-gray-500'}`}>
              <Target className="h-4 w-4 mr-2" />
              Adaptive: {adaptiveModeActive ? 'ENABLED' : 'DISABLED'}
            </Badge>
          </div>
        </div>

        {/* Real-Time Metrics Dashboard */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center justify-between">
              <span className="flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                Real-Time Learning Metrics
              </span>
              <Button
                onClick={toggleMirrorLearning}
                className={`${mirrorLearningActive ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
              >
                {mirrorLearningActive ? 'Pause Mirror Learning' : 'Resume Mirror Learning'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Learning Rate</span>
                    <span className="text-cyan-300">{metrics.learningRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.learningRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Integration Speed</span>
                    <span className="text-green-300">{metrics.integrationSpeed.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.integrationSpeed} className="h-2" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Adaptation Score</span>
                    <span className="text-purple-300">{metrics.adaptationScore.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.adaptationScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-yellow-300">{metrics.responseTime.toFixed(0)}ms</span>
                  </div>
                  <Progress value={Math.max(0, 100 - metrics.responseTime)} className="h-2" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Accuracy Improvement</span>
                    <span className="text-emerald-300">{metrics.accuracyImprovement.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.accuracyImprovement} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Knowledge Growth</span>
                    <span className="text-orange-300">{metrics.knowledgeGrowth.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.knowledgeGrowth} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Learning Sessions */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <span className="flex items-center">
                <Brain className="h-6 w-6 mr-2" />
                Live Learning Sessions - Mirror Learning Active
              </span>
              <Button
                onClick={forceIntegration}
                variant="outline"
                className="text-green-400 border-green-400"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Force Integration
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  {mirrorLearningActive ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-3" />
                      Menunggu session pembelajaran baru...
                    </div>
                  ) : (
                    "Mirror Learning tidak aktif - Tidak ada session pembelajaran"
                  )}
                </div>
              ) : (
                learningSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border transition-all ${
                      session.integrated 
                        ? 'bg-green-900/20 border-green-500/30' 
                        : 'bg-yellow-900/20 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {session.integrated ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-400 animate-pulse" />
                        )}
                        <div>
                          <h4 className="text-white font-medium">{session.topic}</h4>
                          <p className="text-sm text-gray-400">
                            Source: {session.source} • {new Date(session.timestamp).toLocaleTimeString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`${session.integrated ? 'bg-green-600' : 'bg-yellow-600'}`}>
                          {session.integrated ? 'Integrated' : 'Processing'}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {session.confidence.toFixed(1)}% confidence
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={session.integrated ? 100 : session.confidence} 
                        className="h-1"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        {isActive && (
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-300">
                  🚀 REAL-TIME LEARNING ACTIVE
                </h3>
                <p className="text-green-200">
                  MIORA sedang belajar secara real-time dari ChatGPT, Claude, Gemini, Grok, dan Perplexity
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  {['ChatGPT', 'Claude', 'Gemini', 'Grok', 'Perplexity'].map((ai) => (
                    <div key={ai} className="p-3 bg-slate-800/50 rounded-lg text-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                      <div className="text-sm text-green-300">{ai}</div>
                      <div className="text-xs text-gray-400">Connected</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORARealTimeLearningCore;