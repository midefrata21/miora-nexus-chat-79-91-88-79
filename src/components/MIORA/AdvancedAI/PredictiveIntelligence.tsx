import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gem, TrendingUp, Clock, Target, Brain, Zap, AlertTriangle, CheckCircle, Activity, BarChart3, FileText, Calendar } from 'lucide-react';

interface Prediction {
  id: string;
  type: 'behavioral' | 'market' | 'system' | 'user';
  description: string;
  confidence: number;
  timeframe: string;
  status: 'active' | 'confirmed' | 'analyzing';
  impact: 'critical' | 'high' | 'medium' | 'low';
  probability: number;
  consequences: string[];
  recommendations: string[];
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  evidenceSources: string[];
  lastUpdated: string;
  detailedAnalysis: {
    scenarioAnalysis: {
      bestCase: string;
      worstCase: string;
      mostLikely: string;
    };
    impactMetrics: {
      financial: string;
      operational: string;
      strategic: string;
    };
    mitigationStrategies: string[];
    successIndicators: string[];
    timeline: {
      immediate: string[];
      shortTerm: string[];
      longTerm: string[];
    };
    dependencies: string[];
    riskFactors: string[];
  };
}

export const PredictiveIntelligence: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: '1',
      type: 'behavioral',
      description: 'User akan membutuhkan analisis trading dalam 2 jam',
      confidence: 94,
      timeframe: '2 hours',
      status: 'active',
      impact: 'high',
      probability: 94,
      consequences: [
        'User akan mengalami FOMO jika tidak mendapat sinyal tepat waktu',
        'Potensi kerugian trading hingga 15% jika tidak ada guidance',
        'Tingkat stress akan meningkat karena ketidakpastian market'
      ],
      recommendations: [
        'Aktifkan notifikasi real-time untuk analisis trading',
        'Siapkan strategy backup untuk kondisi market volatil',
        'Set up stop-loss otomatis pada level support key',
        'Monitor sentiment social media crypto community'
      ],
      riskLevel: 'high',
      evidenceSources: [
        'Pattern analisis historical user behavior (23 hari)',
        'Korelasi dengan market opening hours',
        'Behavioral psychology model prediction'
      ],
      lastUpdated: '2024-01-15 14:23:45',
      detailedAnalysis: {
        scenarioAnalysis: {
          bestCase: 'User mengeksekusi trading dengan perfect timing, profit 25% dalam 4 jam dengan minimal stress',
          worstCase: 'User panic selling, kerugian 30% karena FOMO dan emotional trading tanpa strategy',
          mostLikely: 'User akan trading dengan moderate success, profit 8-12% dengan beberapa minor mistakes'
        },
        impactMetrics: {
          financial: 'Potential profit $2,500 - $5,000 (best case) vs loss $1,000 - $3,000 (worst case)',
          operational: 'Increased app engagement 400%, notification response rate 85%',
          strategic: 'User loyalty +15%, premium subscription conversion probability 67%'
        },
        mitigationStrategies: [
          'Auto-trigger trading signals berdasarkan AI pattern recognition',
          'Implement adaptive stop-loss levels sesuai volatility market',
          'Personalized risk management suggestions real-time',
          'Emotional trading blocker dengan cooling-off period mandatory'
        ],
        successIndicators: [
          'User response time < 2 menit setelah notification',
          'Trading execution sesuai recommended strategy',
          'Stop-loss levels di-maintain sepanjang trading session',
          'Profit taking di level yang sudah ditentukan algorithm'
        ],
        timeline: {
          immediate: ['Setup real-time notifications', 'Activate AI trading assistant', 'Enable emergency stop-loss'],
          shortTerm: ['Monitor first 3 trading decisions', 'Adjust risk parameters', 'Track emotional indicators'],
          longTerm: ['Evaluate trading performance vs predictions', 'Update behavioral model', 'Optimize strategy based on results']
        },
        dependencies: [
          'Market volatility levels',
          'User emotional state indicators',
          'External news sentiment analysis',
          'Technical analysis confluence signals'
        ],
        riskFactors: [
          'Sudden market crash atau pump unexpected',
          'User override system recommendations',
          'Technical system failure saat critical moment',
          'Network latency affecting execution timing'
        ]
      }
    },
    {
      id: '2',
      type: 'market',
      description: 'BTC akan mengalami volatilitas tinggi dalam 6 jam',
      confidence: 87,
      timeframe: '6 hours',
      status: 'analyzing',
      impact: 'critical',
      probability: 87,
      consequences: [
        'Swing trading opportunities dengan profit potential 8-12%',
        'Risk liquidation meningkat untuk leveraged positions',
        'Alt-coins akan follow BTC movement dengan amplifikasi 2-3x',
        'Market sentiment shift dari fear ke greed atau sebaliknya'
      ],
      recommendations: [
        'Reduce leverage position hingga maksimal 3x',
        'Set multiple take-profit levels: 3%, 6%, 10%',
        'Monitor whale movements di blockchain analytics',
        'Prepare for quick scalping opportunities pada timeframe 5m-15m',
        'Watch key resistance levels: $52,000 dan $54,500'
      ],
      riskLevel: 'critical',
      evidenceSources: [
        'On-chain whale movement analysis',
        'Options expiry correlation pattern',
        'Technical analysis confluence 4H-1D timeframes',
        'Macro economic event calendar impact'
      ],
      lastUpdated: '2024-01-15 14:18:32',
      detailedAnalysis: {
        scenarioAnalysis: {
          bestCase: 'BTC break resistance dengan volume tinggi, rally 18% ke $61,000, alt-coins surge 25-40%',
          worstCase: 'BTC crash 22% ke $42,000, mass liquidation $500M+, alt-coins dump 50-70%',
          mostLikely: 'BTC consolidation dengan 8-12% volatility, ranging antara $50,000-$55,000'
        },
        impactMetrics: {
          financial: 'Market cap swing $200B-$400B, trading volume spike 340%, liquidations $100M-$600M',
          operational: 'Exchange server load +500%, API calls +800%, customer support tickets +250%',
          strategic: 'Market dominance shift, institutional FOMO/FUD cycle, regulatory attention +60%'
        },
        mitigationStrategies: [
          'Implement dynamic position sizing berdasarkan real-time volatility',
          'Setup multi-exchange arbitrage untuk profit dari price gaps',
          'Use options strategies untuk hedge downside risk',
          'Deploy AI-driven stop-loss adjustment setiap 15 menit',
          'Monitor order book depth untuk detect whale manipulation'
        ],
        successIndicators: [
          'Volume confirmation 2x above average before major moves',
          'Technical breakout dengan RSI divergence signals',
          'On-chain metrics alignment (MVRV, SOPR, NVT ratio)',
          'Social sentiment correlation dengan price action'
        ],
        timeline: {
          immediate: ['Activate volatility alerts', 'Reduce leverage exposure', 'Setup stop-losses'],
          shortTerm: ['Monitor 4H/1D technical levels', 'Track whale wallet movements', 'Adjust position sizes'],
          longTerm: ['Analyze market structure changes', 'Update prediction models', 'Review risk parameters']
        },
        dependencies: [
          'Macro economic events (Fed meetings, inflation data)',
          'Institutional whale movements dan custody flows',
          'Technical support/resistance level reactions',
          'Global regulatory news sentiment'
        ],
        riskFactors: [
          'Black swan events (exchange hack, regulatory ban)',
          'Coordinated whale manipulation atau pump/dump schemes',
          'Technical analysis false signals dalam ranging market',
          'Liquidity crisis saat high volatility periods'
        ]
      }
    },
    {
      id: '3',
      type: 'system',
      description: 'Sistem akan butuh upgrade memori dalam 24 jam',
      confidence: 91,
      timeframe: '24 hours',
      status: 'active',
      impact: 'medium',
      probability: 91,
      consequences: [
        'Performance degradation pada complex AI calculations',
        'Slower response time untuk real-time market analysis',
        'Potential system freeze saat high-load periods',
        'Data processing bottleneck untuk multiple user requests'
      ],
      recommendations: [
        'Schedule maintenance window selama low-activity hours',
        'Backup semua AI learning models dan user preferences',
        'Implement temporary load balancing untuk distribute workload',
        'Notify users 2 jam sebelum maintenance window',
        'Prepare rollback plan jika upgrade mengalami issues'
      ],
      riskLevel: 'medium',
      evidenceSources: [
        'System performance monitoring trends',
        'Memory usage pattern analysis',
        'User activity load predictions'
      ],
      lastUpdated: '2024-01-15 14:15:18',
      detailedAnalysis: {
        scenarioAnalysis: {
          bestCase: 'Smooth upgrade dengan zero downtime, performance boost 40%, user satisfaction meningkat',
          worstCase: 'System crash 6 jam, data loss partial, user churn 15%, reputation damage signifikan',
          mostLikely: 'Upgrade sukses dengan minor downtime 2 jam, performance improvement 25%'
        },
        impactMetrics: {
          financial: 'Maintenance cost $2,000, potential revenue loss $500-5,000 jika gagal',
          operational: 'System downtime 0-6 jam, user support tickets +300%, server load redistribution',
          strategic: 'Infrastructure reliability +40%, scalability improvement, competitive advantage'
        },
        mitigationStrategies: [
          'Implement blue-green deployment untuk zero downtime',
          'Real-time backup dan rollback mechanism',
          'Load balancer configuration untuk distribute traffic',
          'Gradual memory allocation increase dengan monitoring',
          'User notification system dengan estimated completion time'
        ],
        successIndicators: [
          'Memory usage optimization >30% improvement',
          'Response time reduction minimal 25%',
          'Zero critical errors selama 48 jam post-upgrade',
          'User satisfaction score >85% dalam 1 minggu'
        ],
        timeline: {
          immediate: ['Backup all systems', 'Setup monitoring alerts', 'Prepare rollback procedures'],
          shortTerm: ['Execute maintenance window', 'Monitor system performance', 'Address any issues'],
          longTerm: ['Performance optimization', 'Capacity planning', 'Next upgrade scheduling']
        },
        dependencies: [
          'User activity patterns (low-traffic hours)',
          'Database backup completion status',
          'External API dependencies availability',
          'Support team availability untuk emergency response'
        ],
        riskFactors: [
          'Hardware failure selama upgrade process',
          'Database corruption atau compatibility issues',
          'Network connectivity problems affecting backup',
          'Unexpected high user load during maintenance'
        ]
      }
    },
    {
      id: '4',
      type: 'user',
      description: 'User akan mengakses fitur AI learning besok',
      confidence: 78,
      timeframe: '18 hours',
      status: 'confirmed',
      impact: 'low',
      probability: 78,
      consequences: [
        'Increased engagement dengan MIORA learning modules',
        'Potential upgrade ke premium features',
        'Higher retention rate dan user satisfaction',
        'More personalized AI responses based on learning progress'
      ],
      recommendations: [
        'Pre-load personalized learning content berdasarkan user profile',
        'Prepare advanced modules untuk progressive learning path',
        'Setup achievement system untuk motivate continuous learning',
        'Enable social features untuk learning community interaction',
        'Track learning analytics untuk optimize future content'
      ],
      riskLevel: 'low',
      evidenceSources: [
        'User engagement pattern analysis',
        'Learning module click-through rates',
        'Weekend activity prediction models'
      ],
      lastUpdated: '2024-01-15 14:12:06',
      detailedAnalysis: {
        scenarioAnalysis: {
          bestCase: 'User menyelesaikan 90% learning modules dengan retention rate tinggi, upgrade ke premium',
          worstCase: 'User hanya browse 20% content, low engagement, potential churn dalam 2 minggu',
          mostLikely: 'User complete 60% modules dengan moderate progress, continue dengan free tier'
        },
        impactMetrics: {
          financial: 'Premium upgrade potential $29/month, ad revenue increase $2-5, learning analytics value $10',
          operational: 'Content delivery +60%, user session time +140%, support interactions +25%',
          strategic: 'AI personalization improvement, user behavior data enrichment, retention +30%'
        },
        mitigationStrategies: [
          'Gamifikasi learning experience dengan points dan badges',
          'Progressive content unlock untuk maintain engagement momentum',
          'Personalized learning path berdasarkan user interest dan skill level',
          'Social learning features untuk community interaction',
          'Smart notification timing untuk optimal learning reminder'
        ],
        successIndicators: [
          'Module completion rate >70% dalam first session',
          'Return visit within 24 jam setelah initial access',
          'Knowledge assessment score improvement >25%',
          'Positive feedback rating >4.5/5 untuk learning experience'
        ],
        timeline: {
          immediate: ['Pre-load personalized content', 'Setup progress tracking', 'Enable notifications'],
          shortTerm: ['Monitor learning engagement', 'Adjust content difficulty', 'Track completion rates'],
          longTerm: ['Analyze learning outcomes', 'Update recommendation engine', 'Plan advanced modules']
        },
        dependencies: [
          'Content management system availability',
          'User profile data completeness',
          'Learning analytics infrastructure',
          'Mobile app notification permissions'
        ],
        riskFactors: [
          'Content quality tidak match dengan user expectations',
          'Technical issues dengan video streaming atau interactive elements',
          'User distraction atau competing priorities',
          'Learning curve terlalu steep untuk current skill level'
        ]
      }
    }
  ]);

  const [predictiveStats, setPredictiveStats] = useState({
    accuracy: 89.7,
    totalPredictions: 847,
    activePredictions: 23,
    forecastRange: 48
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnalyzing) {
        setPredictiveStats(prev => ({
          ...prev,
          accuracy: Math.min(100, prev.accuracy + Math.random() * 0.1),
          totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 2)
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'behavioral': return Brain;
      case 'market': return TrendingUp;
      case 'system': return Zap;
      case 'user': return Target;
      default: return Gem;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'behavioral': return 'from-purple-600 to-pink-600';
      case 'market': return 'from-green-600 to-blue-600';
      case 'system': return 'from-yellow-600 to-orange-600';
      case 'user': return 'from-cyan-600 to-blue-600';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'analyzing': return 'bg-yellow-500 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/40';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/40';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/40';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-300';
      case 'high': return 'text-orange-300';
      case 'medium': return 'text-yellow-300';
      case 'low': return 'text-green-300';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-blue-100">
            <Gem className="w-8 h-8 mr-3 text-blue-400" />
            Predictive Intelligence System
            <Badge className="ml-4 bg-blue-500/20 text-blue-200 border-blue-400/40">
              QUANTUM MODE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-1">
                {predictiveStats.accuracy.toFixed(1)}%
              </div>
              <p className="text-blue-200 text-sm">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300 mb-1">
                {predictiveStats.totalPredictions}
              </div>
              <p className="text-green-200 text-sm">Total Predictions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300 mb-1">
                {predictiveStats.activePredictions}
              </div>
              <p className="text-purple-200 text-sm">Active Forecasts</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">
                {predictiveStats.forecastRange}h
              </div>
              <p className="text-cyan-200 text-sm">Forecast Range</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Panel */}
      <Card className="bg-black/30 border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Clock className="w-6 h-6 mr-2" />
            Prediction Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setIsAnalyzing(!isAnalyzing)}
              className={`px-6 py-3 ${
                isAnalyzing 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Gem className="w-5 h-5 mr-2" />
              {isAnalyzing ? 'Stop Analysis' : 'Start Prediction'}
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-purple-500/50 text-purple-300">
                <TrendingUp className="w-4 h-4 mr-2" />
                Generate Forecast
              </Button>
              <Button variant="outline" className="border-blue-500/50 text-blue-300">
                <Target className="w-4 h-4 mr-2" />
                Validate Predictions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Prediction Reports */}
      <Card className="bg-black/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <FileText className="w-6 h-6 mr-2" />
            📊 Laporan Prediksi & Forecast Mendalam
            <Badge className="ml-3 bg-blue-500/20 text-blue-300 border-blue-400/40">
              ANALISIS TERPERINCI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {predictions.map((prediction) => {
              const IconComponent = getTypeIcon(prediction.type);
              return (
                <div key={prediction.id} className="bg-gray-800/60 rounded-xl border border-gray-600/40 overflow-hidden">
                  {/* Header Prediction */}
                  <div className="p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-gray-600/40">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${getTypeColor(prediction.type)}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{prediction.description}</h3>
                          <div className="flex items-center space-x-4">
                            <Badge className={`${getRiskColor(prediction.riskLevel)} text-xs`}>
                              🚨 Risk: {prediction.riskLevel.toUpperCase()}
                            </Badge>
                            <Badge className={`${getImpactColor(prediction.impact)} text-xs bg-gray-700/50`}>
                              💥 Impact: {prediction.impact.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              📅 {prediction.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-300 mb-1">
                          {prediction.confidence}%
                        </div>
                        <p className="text-blue-200 text-sm">Confidence</p>
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(prediction.status)} mt-2 ml-auto`}></div>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Confidence Level</span>
                          <span className="text-blue-300">{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-3 bg-gray-700" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Probability Score</span>
                          <span className="text-purple-300">{prediction.probability}%</span>
                        </div>
                        <Progress value={prediction.probability} className="h-3 bg-gray-700" />
                      </div>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="p-6 space-y-6">
                    {/* Consequences Analysis */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-red-300 mb-3">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        ⚠️ Apa Yang Akan Terjadi - Analisis Konsekuensi
                      </h4>
                      <div className="space-y-3">
                        {prediction.consequences.map((consequence, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-red-100 text-sm leading-relaxed">{consequence}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-red-500/20 rounded-lg">
                        <p className="text-red-200 text-sm">
                          <strong>🔍 Timeframe:</strong> {prediction.timeframe} | 
                          <strong className="ml-3">📊 Impact Level:</strong> {prediction.impact.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-green-300 mb-3">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        ✅ Apa Yang Harus Dilakukan - Action Plan
                      </h4>
                      <div className="space-y-3">
                        {prediction.recommendations.map((recommendation, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-green-100 text-sm leading-relaxed">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
                        <p className="text-green-200 text-sm">
                          <strong>🎯 Priority:</strong> Execute dalam {prediction.timeframe} untuk hasil optimal
                        </p>
                      </div>
                    </div>

                    {/* Evidence Sources */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-blue-300 mb-3">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        📈 Sumber Data & Evidence Analysis
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {prediction.evidenceSources.map((source, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-2 bg-blue-500/20 rounded-lg">
                            <Activity className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-blue-100 text-sm">{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-gray-300 mb-3">
                        <Calendar className="w-5 h-5 mr-2" />
                        ⏰ Status & Timeline Tracking
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${getStatusColor(prediction.status)}`}></div>
                          <span className="text-gray-200 capitalize font-medium">{prediction.status}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-300 text-sm">Expected dalam</p>
                          <p className="text-white font-bold">{prediction.timeframe}</p>
                        </div>
                      </div>
                      <div className="mt-3 bg-gray-700/50 rounded-lg p-3">
                        <p className="text-gray-300 text-xs">
                          <strong>Last Update:</strong> {prediction.lastUpdated} | 
                          <strong className="ml-3">Type:</strong> {prediction.type.toUpperCase()} Analysis
                        </p>
                      </div>
                    </div>

                    {/* Scenario Analysis */}
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-purple-300 mb-4">
                        <Target className="w-5 h-5 mr-2" />
                        🎯 Analisis Skenario Mendalam
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <h5 className="text-green-300 font-semibold mb-2">🚀 Best Case</h5>
                          <p className="text-green-100 text-sm leading-relaxed">{prediction.detailedAnalysis.scenarioAnalysis.bestCase}</p>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                          <h5 className="text-red-300 font-semibold mb-2">💥 Worst Case</h5>
                          <p className="text-red-100 text-sm leading-relaxed">{prediction.detailedAnalysis.scenarioAnalysis.worstCase}</p>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                          <h5 className="text-yellow-300 font-semibold mb-2">📊 Most Likely</h5>
                          <p className="text-yellow-100 text-sm leading-relaxed">{prediction.detailedAnalysis.scenarioAnalysis.mostLikely}</p>
                        </div>
                      </div>
                    </div>

                    {/* Impact Metrics */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-orange-300 mb-4">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        📈 Metrik Impact & Dampak
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-orange-500/20 rounded-lg p-3">
                          <h5 className="text-orange-200 font-semibold mb-2">💰 Financial Impact</h5>
                          <p className="text-orange-100 text-sm">{prediction.detailedAnalysis.impactMetrics.financial}</p>
                        </div>
                        <div className="bg-orange-500/20 rounded-lg p-3">
                          <h5 className="text-orange-200 font-semibold mb-2">⚙️ Operational Impact</h5>
                          <p className="text-orange-100 text-sm">{prediction.detailedAnalysis.impactMetrics.operational}</p>
                        </div>
                        <div className="bg-orange-500/20 rounded-lg p-3">
                          <h5 className="text-orange-200 font-semibold mb-2">🎯 Strategic Impact</h5>
                          <p className="text-orange-100 text-sm">{prediction.detailedAnalysis.impactMetrics.strategic}</p>
                        </div>
                      </div>
                    </div>

                    {/* Mitigation Strategies */}
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-cyan-300 mb-3">
                        <Zap className="w-5 h-5 mr-2" />
                        🛡️ Strategi Mitigasi Risiko
                      </h4>
                      <div className="space-y-3">
                        {prediction.detailedAnalysis.mitigationStrategies.map((strategy, idx) => (
                          <div key={idx} className="flex items-start space-x-3 bg-cyan-500/20 rounded-lg p-3">
                            <div className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-cyan-100 text-sm leading-relaxed">{strategy}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Indicators */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-emerald-300 mb-3">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        ✨ Indikator Keberhasilan
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {prediction.detailedAnalysis.successIndicators.map((indicator, idx) => (
                          <div key={idx} className="flex items-center space-x-3 bg-emerald-500/20 rounded-lg p-3">
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-emerald-100 text-sm">{indicator}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Execution */}
                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                      <h4 className="flex items-center text-lg font-semibold text-indigo-300 mb-4">
                        <Clock className="w-5 h-5 mr-2" />
                        ⏳ Timeline Eksekusi Detail
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-indigo-500/20 rounded-lg p-3">
                          <h5 className="text-indigo-200 font-semibold mb-2">🚨 Immediate Actions (0-2 hours)</h5>
                          <ul className="space-y-1">
                            {prediction.detailedAnalysis.timeline.immediate.map((action, idx) => (
                              <li key={idx} className="text-indigo-100 text-sm flex items-start space-x-2">
                                <span className="text-indigo-400 mt-1">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-indigo-500/20 rounded-lg p-3">
                          <h5 className="text-indigo-200 font-semibold mb-2">📋 Short Term (2-24 hours)</h5>
                          <ul className="space-y-1">
                            {prediction.detailedAnalysis.timeline.shortTerm.map((action, idx) => (
                              <li key={idx} className="text-indigo-100 text-sm flex items-start space-x-2">
                                <span className="text-indigo-400 mt-1">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-indigo-500/20 rounded-lg p-3">
                          <h5 className="text-indigo-200 font-semibold mb-2">🎯 Long Term (1+ days)</h5>
                          <ul className="space-y-1">
                            {prediction.detailedAnalysis.timeline.longTerm.map((action, idx) => (
                              <li key={idx} className="text-indigo-100 text-sm flex items-start space-x-2">
                                <span className="text-indigo-400 mt-1">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Dependencies & Risk Factors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                        <h4 className="flex items-center text-lg font-semibold text-pink-300 mb-3">
                          <Brain className="w-5 h-5 mr-2" />
                          🔗 Dependencies
                        </h4>
                        <div className="space-y-2">
                          {prediction.detailedAnalysis.dependencies.map((dependency, idx) => (
                            <div key={idx} className="flex items-center space-x-3 bg-pink-500/20 rounded-lg p-2">
                              <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0"></div>
                              <span className="text-pink-100 text-sm">{dependency}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <h4 className="flex items-center text-lg font-semibold text-red-300 mb-3">
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          ⚠️ Risk Factors
                        </h4>
                        <div className="space-y-2">
                          {prediction.detailedAnalysis.riskFactors.map((risk, idx) => (
                            <div key={idx} className="flex items-center space-x-3 bg-red-500/20 rounded-lg p-2">
                              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              <span className="text-red-100 text-sm">{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Prediction Analytics */}
      <Card className="bg-black/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Brain className="w-6 h-6 mr-2" />
            Prediction Analytics & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Future State Modeling</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Behavioral Patterns</span>
                  <span className="text-blue-400">87% accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Market Trends</span>
                  <span className="text-green-400">92% accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">System Performance</span>
                  <span className="text-purple-400">95% accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">User Behavior</span>
                  <span className="text-cyan-400">84% accuracy</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Prediction Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Next 1-6 hours: High confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">6-24 hours: Medium confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">24-48 hours: Evolving predictions</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveIntelligence;