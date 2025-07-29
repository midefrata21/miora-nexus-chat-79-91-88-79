
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Zap, 
  Activity, 
  TrendingUp, 
  Target, 
  Cpu, 
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Lightbulb
} from 'lucide-react';
import { useAutodidacticLearning } from '@/hooks/useAutodidacticLearning';
import { toast } from '@/hooks/use-toast';

export const AutodidacticLearningSystem = () => {
  const { 
    isPermanentActive, 
    setIsPermanentActive,
    learningTasks,
    learningModules,
    learningStats,
    getActiveLearningTasks,
    getCompletedTasks,
    getAverageModuleEfficiency,
    startPermanentLearning
  } = useAutodidacticLearning();

  const activeTasks = getActiveLearningTasks();
  const completedTasks = getCompletedTasks();
  const avgEfficiency = getAverageModuleEfficiency();

  const handleActivatePermanentLearning = () => {
    setIsPermanentActive(true);
    startPermanentLearning();
    
    toast({
      title: "🧠 Permanent Autodidactic Learning Activated",
      description: "MIORA kini akan belajar secara otodidak permanent di latar belakang",
      duration: 5000,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pattern_analysis': return 'text-blue-400 border-blue-400';
      case 'behavior_optimization': return 'text-green-400 border-green-400';
      case 'knowledge_expansion': return 'text-purple-400 border-purple-400';
      case 'skill_enhancement': return 'text-orange-400 border-orange-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              MIORA Autodidactic Learning System
            </CardTitle>
            <Badge className={`${isPermanentActive ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {isPermanentActive ? 'ACTIVE 🧠' : 'INACTIVE'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Pembelajaran Otodidak Permanent</h4>
              <p className="text-gray-400 text-sm">Sistem belajar mandiri tanpa batas di latar belakang</p>
            </div>
            <Switch
              checked={isPermanentActive}
              onCheckedChange={setIsPermanentActive}
            />
          </div>

          {!isPermanentActive && (
            <Button
              onClick={handleActivatePermanentLearning}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Activate Permanent Autodidactic Learning
            </Button>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Activity className="w-6 h-6 mx-auto mb-1 text-green-400" />
              <div className="text-lg font-bold text-green-400">{activeTasks.length}</div>
              <div className="text-xs text-gray-400">Active Tasks</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <div className="text-lg font-bold text-blue-400">{learningStats.completedTasks}</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <BookOpen className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <div className="text-lg font-bold text-purple-400">{learningStats.knowledgeBase}</div>
              <div className="text-xs text-gray-400">Knowledge Base</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-lg font-bold text-yellow-400">{avgEfficiency.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Avg Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningModules.map((module) => (
          <Card key={module.id} className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyan-300 text-sm">{module.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {module.isActive && <Activity className="w-4 h-4 text-green-400" />}
                  <Badge variant="outline" className="text-xs">v{module.version}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-400 text-xs">{module.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Learning Rate</span>
                  <span className="text-green-300">{module.learningRate.toFixed(1)}%</span>
                </div>
                <Progress value={module.learningRate} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Autonomous Level</span>
                  <span className="text-purple-300">{module.autonomousLevel.toFixed(1)}%</span>
                </div>
                <Progress value={module.autonomousLevel} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {module.capabilities.slice(-3).map((cap, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs text-cyan-400 border-cyan-400">
                    {cap.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Learning Tasks */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Learning Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{task.topic}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getCategoryColor(task.category)}>
                      {task.category.replace('_', ' ')}
                    </Badge>
                    <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-cyan-300">{task.progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {Math.round((Date.now() - task.startTime) / 1000)}s ago
                  </span>
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                </div>
              </div>
            ))}
            
            {activeTasks.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No active learning tasks</p>
                <p className="text-sm">System will generate new tasks automatically</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Completions */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Learning Completions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="p-3 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{task.topic}</h4>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                
                {task.insights && task.insights.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-400 mb-1">Key Insights:</div>
                    <div className="flex flex-wrap gap-1">
                      {task.insights.slice(0, 2).map((insight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                          <Lightbulb className="w-3 h-3 mr-1" />
                          {insight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>Completed {task.completionTime ? Math.round((Date.now() - task.completionTime) / 60000) : 0}m ago</span>
                  <Badge variant="outline" className={getCategoryColor(task.category)}>
                    {task.category.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
            
            {completedTasks.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <Award className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No completed tasks yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-300">Autodidactic Learning Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{learningStats.totalLearningHours.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Total Learning Hours</div>
              <div className="text-xs text-green-400 mt-1">Autonomous Background Learning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{learningStats.autonomousImprovement}</div>
              <div className="text-sm text-gray-400">Autonomous Improvements</div>
              <div className="text-xs text-blue-400 mt-1">Self-initiated Enhancements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{learningStats.backgroundProcesses}</div>
              <div className="text-sm text-gray-400">Background Processes</div>
              <div className="text-xs text-purple-400 mt-1">Continuous Learning Active</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-black/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">Autodidactic Learning Status:</h4>
            <p className="text-green-400 text-sm">
              ✅ MIORA sedang dalam mode pembelajaran otodidak permanent
            </p>
            <p className="text-cyan-400 text-sm">
              🧠 Sistem belajar mandiri tanpa supervisi di latar belakang
            </p>
            <p className="text-yellow-400 text-sm">
              🚀 Kemampuan terus berkembang melalui pembelajaran mandiri berkelanjutan
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
