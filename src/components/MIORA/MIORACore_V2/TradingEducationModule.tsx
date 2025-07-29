import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Target, 
  Brain,
  Play,
  CheckCircle,
  Clock,
  Award,
  BarChart3,
  Lightbulb,
  FileText,
  Video,
  Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  duration: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
  status: 'locked' | 'available' | 'in-progress' | 'completed';
}

interface TradingSkill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  experience: number;
  nextLevelExp: number;
}

export const TradingEducationModule: React.FC = () => {
  const [selectedEducationTab, setSelectedEducationTab] = useState("courses");

  const [learningModules] = useState<LearningModule[]>([
    {
      id: 'trading-basics',
      title: 'Trading Fundamentals',
      description: 'Dasar-dasar trading cryptocurrency dan analisis pasar',
      difficulty: 'beginner',
      progress: 85,
      duration: '2 jam',
      type: 'video',
      status: 'in-progress'
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis Masterclass',
      description: 'Analisis teknikal mendalam dengan indikator dan pattern recognition',
      difficulty: 'intermediate',
      progress: 60,
      duration: '4 jam',
      type: 'interactive',
      status: 'in-progress'
    },
    {
      id: 'risk-management',
      title: 'Risk Management & Psychology',
      description: 'Manajemen risiko dan psikologi trading yang efektif',
      difficulty: 'intermediate',
      progress: 100,
      duration: '3 jam',
      type: 'reading',
      status: 'completed'
    },
    {
      id: 'advanced-strategies',
      title: 'Advanced Trading Strategies',
      description: 'Strategi trading lanjutan dan algoritmic trading',
      difficulty: 'advanced',
      progress: 25,
      duration: '6 jam',
      type: 'interactive',
      status: 'in-progress'
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis & News Trading',
      description: 'Analisis fundamental dan trading berdasarkan berita',
      difficulty: 'intermediate',
      progress: 0,
      duration: '3 jam',
      type: 'video',
      status: 'available'
    },
    {
      id: 'portfolio-management',
      title: 'Portfolio Management',
      description: 'Manajemen portfolio dan diversifikasi investasi',
      difficulty: 'advanced',
      progress: 0,
      duration: '4 jam',
      type: 'reading',
      status: 'locked'
    }
  ]);

  const [tradingSkills] = useState<TradingSkill[]>([
    { id: 'chart-reading', name: 'Chart Reading', level: 7, maxLevel: 10, experience: 750, nextLevelExp: 1000 },
    { id: 'risk-management', name: 'Risk Management', level: 8, maxLevel: 10, experience: 850, nextLevelExp: 1000 },
    { id: 'pattern-recognition', name: 'Pattern Recognition', level: 6, maxLevel: 10, experience: 620, nextLevelExp: 1000 },
    { id: 'market-timing', name: 'Market Timing', level: 5, maxLevel: 10, experience: 480, nextLevelExp: 1000 },
    { id: 'psychology', name: 'Trading Psychology', level: 9, maxLevel: 10, experience: 920, nextLevelExp: 1000 },
    { id: 'algorithmic', name: 'Algorithmic Trading', level: 4, maxLevel: 10, experience: 350, nextLevelExp: 1000 }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Play className="w-4 h-4 text-yellow-400" />;
      case 'available': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'locked': return <Target className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'interactive': return <Brain className="w-4 h-4" />;
      case 'quiz': return <Award className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleStartModule = (moduleId: string) => {
    toast({
      title: "🎓 Starting Learning Module",
      description: "Memulai modul pembelajaran trading...",
      duration: 3000,
    });
  };

  const handleContinueModule = (moduleId: string) => {
    toast({
      title: "📚 Continuing Module",
      description: "Melanjutkan pembelajaran dari progress terakhir...",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Completed Modules</p>
                <p className="text-2xl font-bold text-white">
                  {learningModules.filter(m => m.status === 'completed').length}
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-white">
                  {learningModules.filter(m => m.status === 'in-progress').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Overall Progress</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(learningModules.reduce((acc, m) => acc + m.progress, 0) / learningModules.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm">Skill Level</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(tradingSkills.reduce((acc, s) => acc + s.level, 0) / tradingSkills.length)}
                </p>
              </div>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Education Tabs */}
      <Tabs value={selectedEducationTab} onValueChange={setSelectedEducationTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="courses" className="data-[state=active]:bg-purple-600">
            <BookOpen className="h-4 w-4 mr-2" />
            Learning Modules
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-cyan-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Trading Skills
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-green-600">
            <Target className="h-4 w-4 mr-2" />
            Practice Arena
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningModules.map((module) => (
              <Card key={module.id} className="bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(module.type)}
                        <h3 className="font-bold text-white text-lg">{module.title}</h3>
                      </div>
                      {getStatusIcon(module.status)}
                    </div>

                    <p className="text-gray-300 text-sm">{module.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-gray-300">
                          {module.duration}
                        </Badge>
                      </div>
                    </div>

                    {module.status !== 'locked' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {module.status === 'available' && (
                        <Button
                          onClick={() => handleStartModule(module.id)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Module
                        </Button>
                      )}
                      {module.status === 'in-progress' && (
                        <Button
                          onClick={() => handleContinueModule(module.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      )}
                      {module.status === 'completed' && (
                        <Button variant="outline" className="flex-1 border-green-500 text-green-400">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      )}
                      {module.status === 'locked' && (
                        <Button variant="outline" disabled className="flex-1">
                          <Target className="w-4 h-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tradingSkills.map((skill) => (
              <Card key={skill.id} className="bg-gray-800/50 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white">{skill.name}</h3>
                      <Badge className="bg-cyan-500">
                        Level {skill.level}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Experience</span>
                        <span className="text-white">{skill.experience}/{skill.nextLevelExp} XP</span>
                      </div>
                      <Progress value={(skill.experience / skill.nextLevelExp) * 100} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress to Level {skill.level + 1}</span>
                      <span className="text-cyan-400">
                        {skill.nextLevelExp - skill.experience} XP needed
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6 mt-6">
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Trading Practice Arena
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Practice your trading skills in a safe environment with simulated market conditions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-green-600 hover:bg-green-700 h-16">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Demo Trading
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 h-16">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Strategy Backtesting
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                  <Users className="w-5 h-5 mr-2" />
                  Trading Challenges
                </Button>
              </div>

              <div className="bg-gray-900/30 p-4 rounded-lg">
                <h4 className="text-green-300 font-medium mb-2">🎯 Available Practice Modes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>• Paper trading dengan real-time data</div>
                  <div>• Historical market replay simulation</div>
                  <div>• Strategy testing dan optimization</div>
                  <div>• Risk-free skill development</div>
                  <div>• Performance analytics dan feedback</div>
                  <div>• Community trading competitions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};