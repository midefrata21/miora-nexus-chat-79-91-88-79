import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Star, 
  Award, 
  Target,
  CheckCircle,
  Lock,
  TrendingUp,
  BarChart3,
  Brain,
  Shield
} from 'lucide-react';

interface LevelProgressionProps {
  currentLevel: number;
  onLevelUp: (level: number) => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
}

export const LevelProgression: React.FC<LevelProgressionProps> = ({
  currentLevel,
  completedLessons
}) => {
  const tradingLevels = {
    1: {
      title: "Newbie Trader",
      color: "from-gray-500 to-slate-600",
      icon: Target,
      requirements: [
        "Understand basic candlestick patterns",
        "Learn support and resistance",
        "Basic risk management (2% rule)",
        "Understand market emotions"
      ],
      skills: ["Chart reading basics", "Risk awareness", "Market terminology"],
      timeCommitment: "2-4 weeks",
      description: "Foundation level untuk memahami dasar-dasar trading"
    },
    2: {
      title: "Beginner Trader",
      color: "from-green-500 to-emerald-600",
      icon: Star,
      requirements: [
        "Master 10+ candlestick patterns",
        "Use moving averages effectively",
        "Implement stop loss consistently",
        "Control FOMO and fear"
      ],
      skills: ["Technical indicators", "Basic strategies", "Emotional control"],
      timeCommitment: "1-2 months",
      description: "Mulai trading dengan strategi sederhana dan disiplin"
    },
    3: {
      title: "Learning Trader",
      color: "from-blue-500 to-cyan-600",
      icon: BarChart3,
      requirements: [
        "Combine multiple indicators",
        "Chart pattern recognition",
        "Risk:reward minimum 1:2",
        "Trading journal maintenance"
      ],
      skills: ["Multi-timeframe analysis", "Pattern recognition", "Strategy testing"],
      timeCommitment: "2-3 months",
      description: "Pengembangan skill analisis dan strategi trading"
    },
    4: {
      title: "Intermediate Trader",
      color: "from-purple-500 to-violet-600",
      icon: TrendingUp,
      requirements: [
        "Develop personal trading strategy",
        "Backtest strategies effectively",
        "Manage drawdowns properly",
        "Understand market cycles"
      ],
      skills: ["Strategy development", "Backtesting", "Market timing"],
      timeCommitment: "3-6 months",
      description: "Pengembangan strategi personal dan konsistensi profit"
    },
    5: {
      title: "Advanced Trader",
      color: "from-orange-500 to-red-600",
      icon: Brain,
      requirements: [
        "Multiple strategy mastery",
        "Advanced risk management",
        "Psychology mastery",
        "Market adaptation"
      ],
      skills: ["Advanced analytics", "Risk modeling", "Psychology control"],
      timeCommitment: "6-12 months",
      description: "Trader yang dapat beradaptasi dengan berbagai kondisi market"
    },
    6: {
      title: "Expert Trader",
      color: "from-red-500 to-pink-600",
      icon: Award,
      requirements: [
        "Consistent profitability",
        "Risk management expertise",
        "Market making abilities",
        "Teaching others"
      ],
      skills: ["Consistent profits", "Risk expertise", "Leadership"],
      timeCommitment: "1-2 years",
      description: "Trader expert dengan track record yang terbukti"
    },
    7: {
      title: "Professional Trader",
      color: "from-pink-500 to-purple-600",
      icon: Crown,
      requirements: [
        "Manage large capitals",
        "Institutional strategies",
        "Market analysis expert",
        "Team leadership"
      ],
      skills: ["Large capital management", "Institutional trading", "Team management"],
      timeCommitment: "2-3 years",
      description: "Professional trader level institusi dengan capital besar"
    },
    8: {
      title: "Master Trader",
      color: "from-indigo-500 to-purple-700",
      icon: Crown,
      requirements: [
        "Market prediction accuracy",
        "Algorithm development",
        "Risk innovation",
        "Industry recognition"
      ],
      skills: ["Predictive analytics", "Algorithm development", "Innovation"],
      timeCommitment: "3-5 years",
      description: "Master trader dengan kemampuan prediksi dan inovasi tinggi"
    },
    9: {
      title: "Grandmaster Trader",
      color: "from-yellow-500 to-amber-600",
      icon: Crown,
      requirements: [
        "Market influence capability",
        "Strategy creation",
        "Industry thought leader",
        "Exceptional track record"
      ],
      skills: ["Market influence", "Strategy innovation", "Thought leadership"],
      timeCommitment: "5-10 years",
      description: "Grandmaster dengan pengaruh besar di industry trading"
    },
    10: {
      title: "Legendary Trader",
      color: "from-purple-600 to-gold-500",
      icon: Crown,
      requirements: [
        "Legendary performance",
        "Market innovation",
        "Global recognition",
        "Trading legacy"
      ],
      skills: ["Legendary performance", "Global impact", "Historical significance"],
      timeCommitment: "10+ years",
      description: "Status legendary dengan kontribusi sejarah di dunia trading"
    }
  };

  const calculateLevelProgress = (level: number) => {
    const levelKey = level as keyof typeof tradingLevels;
    const requirements = tradingLevels[levelKey]?.requirements || [];
    const completed = requirements.filter((_, index) => 
      completedLessons.includes(`level-${level}-req-${index}`)
    ).length;
    return (completed / requirements.length) * 100;
  };

  const getOverallProgress = () => {
    let totalCompleted = 0;
    let totalRequirements = 0;
    
    Object.keys(tradingLevels).forEach(levelStr => {
      const level = parseInt(levelStr);
      const requirements = tradingLevels[level as keyof typeof tradingLevels].requirements;
      totalRequirements += requirements.length;
      totalCompleted += requirements.filter((_, index) => 
        completedLessons.includes(`level-${level}-req-${index}`)
      ).length;
    });
    
    return (totalCompleted / totalRequirements) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Crown className="w-6 h-6" />
            Trading Master Journey Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Overall Progress to Master</span>
              <span className="text-purple-400 font-bold">{getOverallProgress().toFixed(1)}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-cyan-400">{currentLevel}</p>
                <p className="text-cyan-300 text-sm">Current Level</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {completedLessons.length}
                </p>
                <p className="text-green-300 text-sm">Skills Mastered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">10</p>
                <p className="text-purple-300 text-sm">Total Levels</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(tradingLevels).map(([levelStr, levelData]) => {
          const level = parseInt(levelStr);
          const isCurrentLevel = level === currentLevel;
          const isUnlocked = level <= currentLevel + 1;
          const progress = calculateLevelProgress(level);
          const IconComponent = levelData.icon;
          
          return (
            <Card 
              key={level}
              className={`transition-all duration-300 ${
                isCurrentLevel 
                  ? `bg-gradient-to-br ${levelData.color} bg-opacity-20 border-2 border-cyan-400 shadow-lg shadow-cyan-400/20`
                  : isUnlocked
                    ? 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                    : 'bg-gray-900/50 border-gray-700 opacity-50'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${levelData.color}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        Level {level}
                      </Badge>
                      <CardTitle className="text-lg text-cyan-300">
                        {levelData.title}
                      </CardTitle>
                    </div>
                  </div>
                  {isCurrentLevel && <Crown className="w-6 h-6 text-yellow-400" />}
                  {!isUnlocked && <Lock className="w-5 h-5 text-gray-500" />}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-gray-300 text-sm">{levelData.description}</p>
                
                {isUnlocked && (
                  <>
                    <div>
                      <h4 className="text-yellow-300 font-medium text-sm mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Requirements:
                      </h4>
                      <ul className="space-y-1">
                        {levelData.requirements.map((req, index) => {
                          const isCompleted = completedLessons.includes(`level-${level}-req-${index}`);
                          return (
                            <li key={index} className="text-sm flex items-start gap-2">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-500 rounded-full mt-0.5" />
                              )}
                              <span className={isCompleted ? 'text-green-300' : 'text-gray-400'}>
                                {req}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-blue-300 font-medium text-sm mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Key Skills:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {levelData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-blue-300 border-blue-500/50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 text-sm">Progress:</span>
                        <span className="text-purple-400 font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="bg-gray-700/50 p-2 rounded">
                      <p className="text-gray-400 text-xs">
                        <strong>Time Commitment:</strong> {levelData.timeCommitment}
                      </p>
                    </div>
                  </>
                )}
                
                {!isUnlocked && (
                  <div className="text-center py-4">
                    <Lock className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                    <p className="text-gray-500 text-sm">Complete previous levels to unlock</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trading Milestones */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Trading Milestones & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <CheckCircle className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <p className="text-green-300 font-semibold">First Profitable Month</p>
              <p className="text-green-200 text-sm">Milestone: Consistent profits</p>
            </div>
            <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Shield className="w-8 h-8 mx-auto text-blue-400 mb-2" />
              <p className="text-blue-300 font-semibold">Risk Master</p>
              <p className="text-blue-200 text-sm">Never exceed 2% risk</p>
            </div>
            <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <Brain className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <p className="text-purple-300 font-semibold">Psychology Control</p>
              <p className="text-purple-200 text-sm">Emotional trading mastery</p>
            </div>
            <div className="text-center p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <Crown className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <p className="text-yellow-300 font-semibold">Strategy Creator</p>
              <p className="text-yellow-200 text-sm">Develop unique strategies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};