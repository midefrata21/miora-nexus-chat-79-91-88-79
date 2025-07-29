import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MIORAGlobalState, MIORAAction, AutonomousTask } from '@/types/miora';
import { Cpu, Clock, Target, CheckCircle, AlertTriangle, Play, Pause } from 'lucide-react';

interface AutonomousTaskManagerProps {
  state: MIORAGlobalState;
  dispatch: React.Dispatch<MIORAAction>;
}

export const AutonomousTaskManager: React.FC<AutonomousTaskManagerProps> = ({ state, dispatch }) => {
  const { autonomousTasks } = state;

  const getTaskIcon = (type: AutonomousTask['type']) => {
    switch (type) {
      case 'code_generation': return <Cpu className="h-4 w-4" />;
      case 'infrastructure': return <Target className="h-4 w-4" />;
      case 'system_evolution': return <CheckCircle className="h-4 w-4" />;
      case 'meta_programming': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: AutonomousTask['status']) => {
    switch (status) {
      case 'executing': return 'default';
      case 'completed': return 'outline';
      case 'failed': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: AutonomousTask['priority']) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const generateNewTask = () => {
    const taskTypes: AutonomousTask['type'][] = ['code_generation', 'infrastructure', 'system_evolution', 'meta_programming'];
    const priorities: AutonomousTask['priority'][] = ['critical', 'high', 'medium', 'low'];
    
    const newTask: AutonomousTask = {
      id: `task_${Date.now()}`,
      type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: 'pending',
      description: `Manual task generation - ${taskTypes[Math.floor(Math.random() * taskTypes.length)].replace('_', ' ')}`,
      executionTime: Math.floor(Math.random() * 300) + 60,
      createdAt: Date.now()
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const completedTasks = autonomousTasks.filter(task => task.status === 'completed');
  const activeTasks = autonomousTasks.filter(task => task.status === 'executing');
  const pendingTasks = autonomousTasks.filter(task => task.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{autonomousTasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{activeTasks.length}</div>
            <div className="text-sm text-muted-foreground">Executing</div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{pendingTasks.length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-500/10 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{completedTasks.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Task Control */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Cpu className="h-5 w-5" />
              <span>Task Management</span>
            </CardTitle>
            <Button onClick={generateNewTask} variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Generate Task
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Active Tasks</span>
            <Badge variant="outline">{autonomousTasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {autonomousTasks.slice().reverse().map((task) => (
                <Card key={task.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getTaskIcon(task.type)}
                        <div>
                          <h4 className="font-medium capitalize">
                            {task.type.replace('_', ' ')}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <div className="font-medium">
                          {new Date(task.createdAt).toLocaleString('id-ID')}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Execution Time:</span>
                        <div className="font-medium">{task.executionTime}s</div>
                      </div>

                      {task.completedAt && (
                        <div>
                          <span className="text-muted-foreground">Completed:</span>
                          <div className="font-medium">
                            {new Date(task.completedAt).toLocaleString('id-ID')}
                          </div>
                        </div>
                      )}
                    </div>

                    {task.result && (
                      <div className="mt-3 p-3 rounded-lg bg-muted/50">
                        <h5 className="text-sm font-medium mb-2">Result:</h5>
                        <div className="text-xs space-y-1">
                          {Object.entries(task.result).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.status === 'executing' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Execution Progress</span>
                          <span>Running...</span>
                        </div>
                        <Progress value={65} className="h-1" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {autonomousTasks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Cpu className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No autonomous tasks available</p>
                  <p className="text-sm">Tasks will be generated automatically or manually</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};