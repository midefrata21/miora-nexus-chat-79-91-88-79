
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Target, Brain, Calendar, Award } from 'lucide-react';

export const LearningAnalytics: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, modules: 3 },
    { day: 'Tue', hours: 1.8, modules: 2 },
    { day: 'Wed', hours: 3.2, modules: 4 },
    { day: 'Thu', hours: 2.1, modules: 2 },
    { day: 'Fri', hours: 4.0, modules: 5 },
    { day: 'Sat', hours: 1.5, modules: 1 },
    { day: 'Sun', hours: 2.8, modules: 3 }
  ];

  const skillProgress = [
    { skill: 'Neural Networks', current: 85, target: 90, category: 'AI' },
    { skill: 'Voice Processing', current: 70, target: 85, category: 'Audio' },
    { skill: 'System Design', current: 90, target: 95, category: 'Development' },
    { skill: 'Quantum Computing', current: 25, target: 50, category: 'Research' },
    { skill: 'Machine Learning', current: 88, target: 95, category: 'AI' }
  ];

  const achievements = [
    { title: 'Speed Learner', description: 'Completed 5 modules in one week', date: '2024-01-15', type: 'speed' },
    { title: 'AI Specialist', description: 'Mastered all AI fundamentals', date: '2024-01-12', type: 'mastery' },
    { title: 'Consistent Learner', description: '30-day learning streak', date: '2024-01-10', type: 'consistency' },
    { title: 'Community Helper', description: 'Helped 10+ fellow learners', date: '2024-01-08', type: 'community' }
  ];

  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const totalModules = weeklyData.reduce((sum, day) => sum + day.modules, 0);
  const avgDaily = totalHours / 7;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{totalHours.toFixed(1)}h</div>
            <div className="text-sm text-gray-400">This Week</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{totalModules}</div>
            <div className="text-sm text-gray-400">Modules Completed</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{avgDaily.toFixed(1)}h</div>
            <div className="text-sm text-gray-400">Daily Average</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <div className="text-2xl font-bold text-white">{achievements.length}</div>
            <div className="text-sm text-gray-400">Achievements</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <Card className="bg-gradient-to-r from-gray-800/50 to-cyan-800/20 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-300">
              <TrendingUp className="w-5 h-5 mr-2" />
              Weekly Learning Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{day.day}</span>
                    <span className="text-cyan-300">{day.hours}h · {day.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(day.hours / 4) * 100} className="flex-1 h-2" />
                    <div className="text-xs text-gray-400 w-12 text-right">{day.hours}h</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Progress */}
        <Card className="bg-gradient-to-r from-gray-800/50 to-green-800/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-green-300">
              <Target className="w-5 h-5 mr-2" />
              Skill Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillProgress.map((skill, index) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-300 text-sm font-medium">{skill.skill}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <span className="text-green-300 text-sm">{skill.current}% / {skill.target}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={skill.current} className="h-2" />
                    <div 
                      className="absolute top-0 h-2 w-0.5 bg-yellow-400 rounded"
                      style={{ left: `${skill.target}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Award className="w-5 h-5 mr-2" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-medium text-white">{achievement.title}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {new Date(achievement.date).toLocaleDateString()}
                  <Badge variant="outline" className="text-xs capitalize">
                    {achievement.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
