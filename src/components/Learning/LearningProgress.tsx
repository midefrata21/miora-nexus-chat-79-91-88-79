
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Brain,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react';
import { useAutodidacticLearning } from '@/hooks/useAutodidacticLearning';

export const LearningProgress = () => {
  const {
    learningStats,
    learningModules,
    getActiveLearningTasks,
    getCompletedTasks,
    getAverageModuleEfficiency
  } = useAutodidacticLearning();

  const activeTasks = getActiveLearningTasks();
  const completedTasks = getCompletedTasks();
  const avgEfficiency = getAverageModuleEfficiency();

  const progressMetrics = [
    {
      title: 'Total Learning Hours',
      value: learningStats.totalLearningHours.toFixed(1),
      unit: 'hours',
      icon: Clock,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Completed Tasks',
      value: learningStats.completedTasks,
      unit: 'tasks',
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Knowledge Base',
      value: learningStats.knowledgeBase,
      unit: 'entries',
      icon: Brain,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Auto Improvements',
      value: learningStats.autonomousImprovement,
      unit: 'improvements',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className={`${metric.bgColor} border ${metric.borderColor}`}>
              <CardContent className="p-4 text-center">
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400">{metric.title}</div>
                <div className="text-xs text-gray-500">{metric.unit}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Learning Efficiency Chart */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Learning Efficiency Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-black/20 rounded-lg">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {avgEfficiency.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Average Module Efficiency</div>
          </div>
          
          <div className="space-y-3">
            {learningModules.map((module) => (
              <div key={module.id} className="p-3 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{module.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      v{module.version}
                    </Badge>
                    {module.isActive && <Activity className="w-3 h-3 text-green-400" />}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Efficiency</span>
                    <span className="text-cyan-300">{module.efficiency.toFixed(1)}%</span>
                  </div>
                  <Progress value={module.efficiency} className="h-2" />
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Learning Rate</span>
                    <span className="text-green-300">{module.learningRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={module.learningRate} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active vs Completed Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tasks */}
        <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Active Learning Tasks ({activeTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTasks.length > 0 ? (
              <div className="space-y-3">
                {activeTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="p-3 bg-black/20 rounded-lg">
                    <h4 className="text-white font-medium text-sm mb-2">{task.topic}</h4>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-green-300">{task.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={task.progress} className="h-1 mb-2" />
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {task.category.replace('_', ' ')}
                      </Badge>
                      <Badge className={`text-xs ${
                        task.priority === 'critical' ? 'bg-red-500' :
                        task.priority === 'high' ? 'bg-orange-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <Activity className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active learning tasks</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Completions ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedTasks.length > 0 ? (
              <div className="space-y-3">
                {completedTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="p-3 bg-black/20 rounded-lg">
                    <h4 className="text-white font-medium text-sm mb-2">{task.topic}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                        ✓ Completed
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {task.completionTime ? 
                          Math.round((Date.now() - task.completionTime) / 60000) + 'm ago' : 
                          'Recently'
                        }
                      </span>
                    </div>
                    {task.insights && task.insights.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-400 mb-1">Key Insights:</div>
                        <div className="text-xs text-purple-300">
                          • {task.insights[0]}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <Award className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No completed tasks yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Learning Trends */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-300 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Learning Trends & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-400">
                +{Math.round(avgEfficiency - 75)}%
              </div>
              <div className="text-sm text-gray-400">Efficiency Improvement</div>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(learningStats.totalLearningHours * 60)}m
              </div>
              <div className="text-sm text-gray-400">Daily Learning Time</div>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Target className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-purple-400">
                {Math.round((learningStats.completedTasks / Math.max(activeTasks.length + learningStats.completedTasks, 1)) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Task Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
