import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CandlestickEducation } from './CandlestickEducation';
import { TechnicalAnalysis } from './TechnicalAnalysis';
import { RiskManagement } from './RiskManagement';
import { LevelProgression } from './LevelProgression';
import { TradingPsychology } from './TradingPsychology';
import { 
  TrendingUp, 
  BookOpen, 
  Shield, 
  Brain, 
  Target,
  BarChart3,
  Zap,
  Crown,
  Award,
  GraduationCap,
  CheckCircle
} from 'lucide-react';

export const CryptoEducationModule = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [allModulesActivated, setAllModulesActivated] = useState(false);

  // Auto-activate all modules when component mounts
  useEffect(() => {
    const activateAllModules = () => {
      setAllModulesActivated(true);
      // Enable access to all levels by default
      setCurrentLevel(1);
      
      // Show activation notification
      toast({
        title: "🚀 All Trading Education Modules Activated!",
        description: "Semua modul pembelajaran trading telah diaktifkan dan dapat diakses secara penuh",
        duration: 4000,
      });
    };

    // Auto-activate after a short delay to show the activation process
    const timer = setTimeout(activateAllModules, 1000);
    return () => clearTimeout(timer);
  }, []);

  const educationModules = [
    {
      id: 'candlestick',
      title: 'Analisis Candlestick',
      icon: BarChart3,
      description: 'Pelajari pola-pola candlestick dan interpretasinya',
      component: CandlestickEducation,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'technical',
      title: 'Analisis Teknikal',
      icon: TrendingUp,
      description: 'Indikator teknikal dan strategi trading',
      component: TechnicalAnalysis,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'risk',
      title: 'Risk Management',
      icon: Shield,
      description: 'Manajemen risiko dan money management',
      component: RiskManagement,
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'psychology',
      title: 'Trading Psychology',
      icon: Brain,
      description: 'Psikologi trading dan mindset trader',
      component: TradingPsychology,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'progression',
      title: 'Level Progression',
      icon: Crown,
      description: 'Sistem level dari pemula hingga master',
      component: LevelProgression,
      color: 'from-amber-500 to-yellow-600'
    }
  ];

  const levelBadges = {
    1: { title: 'Newbie', color: 'bg-gray-500' },
    2: { title: 'Beginner', color: 'bg-green-500' },
    3: { title: 'Learner', color: 'bg-blue-500' },
    4: { title: 'Intermediate', color: 'bg-purple-500' },
    5: { title: 'Advanced', color: 'bg-orange-500' },
    6: { title: 'Expert', color: 'bg-red-500' },
    7: { title: 'Professional', color: 'bg-pink-500' },
    8: { title: 'Master', color: 'bg-indigo-500' },
    9: { title: 'Grandmaster', color: 'bg-yellow-500' },
    10: { title: 'Legendary', color: 'bg-gradient-to-r from-purple-600 to-gold-500' }
  };

  const progressPercentage = (currentLevel / 10) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              🚀 MIORA Crypto Trading Academy
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sistem pembelajaran trading cryptocurrency terlengkap dari level pemula hingga grandmaster profesional trader
          </p>
          
          {/* Activation Status */}
          {allModulesActivated && (
            <div className="flex items-center justify-center gap-2 p-3 bg-green-500/20 rounded-lg border border-green-500/30 max-w-md mx-auto">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">✅ All Education Modules Activated</span>
            </div>
          )}
          
          {/* Progress Indicator */}
          <Card className="max-w-md mx-auto bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Trading Level
                </CardTitle>
                <Badge className={`${levelBadges[currentLevel as keyof typeof levelBadges]?.color} text-white`}>
                  Level {currentLevel} - {levelBadges[currentLevel as keyof typeof levelBadges]?.title}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-gray-400 mt-2">
                Progress: {progressPercentage.toFixed(0)}% menuju Master Trader
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Education Tabs */}
        <Tabs defaultValue="candlestick" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border-cyan-500/30">
            {educationModules.map((module) => (
              <TabsTrigger 
                key={module.id} 
                value={module.id}
                className="flex items-center gap-2 data-[state=active]:bg-cyan-600/20 data-[state=active]:text-cyan-300"
              >
                <module.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{module.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {educationModules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="mt-6">
              <Card className="bg-gray-800/30 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className={`text-2xl bg-gradient-to-r ${module.color} bg-clip-text text-transparent flex items-center gap-3`}>
                    <module.icon className="w-6 h-6 text-cyan-400" />
                    {module.title}
                  </CardTitle>
                  <p className="text-gray-300">{module.description}</p>
                </CardHeader>
                <CardContent>
                  <module.component 
                    currentLevel={currentLevel}
                    onLevelUp={(newLevel) => setCurrentLevel(newLevel)}
                    completedLessons={completedLessons}
                    onLessonComplete={(lessonId) => setCompletedLessons(prev => [...prev, lessonId])}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <p className="text-2xl font-bold text-green-300">{completedLessons.length}</p>
              <p className="text-green-200 text-sm">Lessons Completed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-blue-300">150+</p>
              <p className="text-blue-200 text-sm">Trading Patterns</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-purple-300">50+</p>
              <p className="text-purple-200 text-sm">Strategies</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/30">
            <CardContent className="p-4 text-center">
              <Crown className="w-8 h-8 mx-auto text-amber-400 mb-2" />
              <p className="text-2xl font-bold text-amber-300">Level {currentLevel}</p>
              <p className="text-amber-200 text-sm">Current Rank</p>
            </CardContent>
          </Card>
        </div>

        {/* All Modules Summary */}
        {allModulesActivated && (
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Semua Module Trading Education Telah Diaktifkan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Semua module pembelajaran trading cryptocurrency telah diaktifkan dan siap untuk dipelajari secara detail:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {educationModules.map((module) => (
                  <div key={module.id} className="p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <module.icon className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-300 font-medium text-sm">{module.title}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{module.description}</p>
                    <div className="mt-2">
                      <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/50">
                        ✅ Aktif
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <p className="text-green-300 text-sm font-medium">
                  🎯 Fitur yang tersedia untuk semua pengguna:
                </p>
                <ul className="text-green-200 text-sm mt-2 space-y-1">
                  <li>• Akses ke semua level tanpa batasan</li>
                  <li>• Interactive calculators dan tools</li>
                  <li>• Progress tracking dan achievements</li>
                  <li>• Comprehensive learning materials</li>
                  <li>• Real-world examples dan case studies</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};