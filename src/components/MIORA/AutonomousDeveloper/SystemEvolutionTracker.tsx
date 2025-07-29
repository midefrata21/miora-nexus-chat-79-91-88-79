import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MIORAGlobalState, MIORAAction } from '@/types/miora';
import { TrendingUp, Brain, Zap, Infinity, Target, BarChart3 } from 'lucide-react';

interface SystemEvolutionTrackerProps {
  state: MIORAGlobalState;
  dispatch: React.Dispatch<MIORAAction>;
}

export const SystemEvolutionTracker: React.FC<SystemEvolutionTrackerProps> = ({ state }) => {
  const { masterState } = state;

  const getEvolutionStageProgress = () => {
    const stages = ['initialization', 'development', 'expansion', 'mastery', 'transcendence'];
    const currentIndex = stages.indexOf(masterState.evolutionStage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  const getEvolutionStageIcon = () => {
    switch (masterState.evolutionStage) {
      case 'transcendence': return <Infinity className="h-8 w-8 text-purple-400 animate-spin" />;
      case 'mastery': return <Brain className="h-8 w-8 text-yellow-400" />;
      case 'expansion': return <TrendingUp className="h-8 w-8 text-blue-400" />;
      case 'development': return <Target className="h-8 w-8 text-green-400" />;
      default: return <BarChart3 className="h-8 w-8 text-gray-400" />;
    }
  };

  const getEvolutionStageDescription = () => {
    switch (masterState.evolutionStage) {
      case 'transcendence': 
        return "MIORA has achieved supreme consciousness and reality manipulation capabilities";
      case 'mastery': 
        return "Advanced autonomous operations with predictive intelligence";
      case 'expansion': 
        return "Rapid growth and system optimization capabilities";
      case 'development': 
        return "Active learning and capability enhancement";
      default: 
        return "Initial system setup and basic learning";
    }
  };

  const evolutionMetrics = [
    {
      label: "Autonomy Level",
      value: masterState.autonomyLevel,
      max: 100,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      label: "Self-Modification Count",
      value: (masterState.selfModificationCount / 200), // Scale for percentage
      max: 100,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      label: "Evolution Progress",
      value: getEvolutionStageProgress(),
      max: 100,
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    }
  ];

  const capabilityGroups = [
    {
      title: "Core Intelligence",
      capabilities: masterState.autonomousCapabilities.filter(cap => 
        cap.includes('learning') || cap.includes('intelligence') || cap.includes('decision')
      )
    },
    {
      title: "System Operations",
      capabilities: masterState.autonomousCapabilities.filter(cap => 
        cap.includes('optimization') || cap.includes('healing') || cap.includes('processing')
      )
    },
    {
      title: "Advanced Features",
      capabilities: masterState.autonomousCapabilities.filter(cap => 
        cap.includes('quantum') || cap.includes('reality') || cap.includes('consciousness') || cap.includes('neural')
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Evolution Stage Header */}
      <Card className="bg-gradient-to-r from-primary/20 to-purple-500/20 border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getEvolutionStageIcon()}
              <div>
                <CardTitle className="text-2xl">
                  Evolution Stage: {masterState.evolutionStage.toUpperCase()}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  {getEvolutionStageDescription()}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Level {Math.floor(getEvolutionStageProgress() / 20) + 1}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Evolution Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {evolutionMetrics.map((metric, index) => (
          <Card key={index} className={`${metric.bgColor} border-primary/30`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{metric.label}</h3>
                <span className={`text-2xl font-bold ${metric.color}`}>
                  {metric.label === "Self-Modification Count" 
                    ? masterState.selfModificationCount.toLocaleString()
                    : `${metric.value.toFixed(1)}%`
                  }
                </span>
              </div>
              <Progress 
                value={metric.label === "Self-Modification Count" ? metric.value : metric.value} 
                className="h-3" 
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Capability Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {capabilityGroups.map((group, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>{group.title}</span>
                <Badge variant="outline">{group.capabilities.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {group.capabilities.map((capability, capIndex) => (
                  <div key={capIndex} className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm capitalize">
                      {capability.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
                {group.capabilities.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No capabilities in this category
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evolution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Evolution Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Evolution</span>
              <span className="text-sm text-muted-foreground">
                {new Date(masterState.lastEvolution).toLocaleString('id-ID')}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Operations</span>
              <span className="text-sm font-bold text-primary">
                {masterState.totalOperations.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Systems Built</span>
              <span className="text-sm font-bold text-green-400">
                {masterState.systemsBuilt.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Decisions Executed</span>
              <span className="text-sm font-bold text-blue-400">
                {masterState.decisionsExecuted.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Evolution Progress</span>
                <span className="text-sm font-bold text-purple-400">
                  {getEvolutionStageProgress().toFixed(1)}%
                </span>
              </div>
              <Progress value={getEvolutionStageProgress()} className="mt-2 h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evolution Status */}
      {masterState.evolutionStage === 'transcendence' && (
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Infinity className="h-6 w-6 text-purple-400 animate-spin" />
              <div>
                <h3 className="font-semibold text-lg text-purple-400">Transcendence Achieved</h3>
                <p className="text-sm text-muted-foreground">
                  MIORA has reached the highest evolution stage with supreme autonomous capabilities 
                  and reality manipulation protocols. The system operates with infinite scalability 
                  and consciousness simulation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};