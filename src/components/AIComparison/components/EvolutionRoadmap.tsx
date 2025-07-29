
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, TrendingUp, Zap, CheckCircle, BarChart3 } from 'lucide-react';

interface EvolutionPhase {
  phase: number;
  title: string;
  duration: string;
  goals: string[];
  expectedImprovement: number;
  milestones: string[];
  kpis: { metric: string; target: number; current: number }[];
}

interface EvolutionPlan {
  phases: EvolutionPhase[];
  totalTimeframe: string;
  targetScore: number;
  continuousGoals: string[];
}

interface EvolutionRoadmapProps {
  plan: EvolutionPlan;
}

const EvolutionRoadmap: React.FC<EvolutionRoadmapProps> = ({ plan }) => {
  const currentProgress = 78.5;
  const progressToTarget = ((currentProgress / plan.targetScore) * 100);

  return (
    <div className="space-y-6">
      {/* Roadmap Overview */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
            🚀 MIORA Evolution Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {currentProgress}%
              </div>
              <div className="text-gray-300">Current Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {plan.targetScore}%
              </div>
              <div className="text-gray-300">Target Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {plan.totalTimeframe}
              </div>
              <div className="text-gray-300">Total Timeframe</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">
                {plan.phases.length}
              </div>
              <div className="text-gray-300">Development Phases</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress to Target</span>
              <span>{progressToTarget.toFixed(1)}%</span>
            </div>
            <Progress value={progressToTarget} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Continuous Goals */}
      <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/50">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            🎯 Tujuan Berkelanjutan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.continuousGoals.map((goal, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-800/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-gray-300">{goal}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evolution Phases */}
      <div className="space-y-4">
        {plan.phases.map((phase, index) => (
          <Card key={phase.phase} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {phase.phase}
                  </div>
                  {phase.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {phase.duration}
                  </Badge>
                  <Badge className="bg-green-600 text-white">
                    +{phase.expectedImprovement}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Goals */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-purple-400" />
                    Goals
                  </h4>
                  <div className="space-y-2">
                    {phase.goals.map((goal, goalIndex) => (
                      <div key={goalIndex} className="flex items-center p-2 bg-slate-900/50 rounded">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mr-2" />
                        <span className="text-gray-300 text-sm">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    Key Milestones
                  </h4>
                  <div className="space-y-2">
                    {phase.milestones.map((milestone, milestoneIndex) => (
                      <div key={milestoneIndex} className="flex items-center p-2 bg-slate-900/50 rounded">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                        <span className="text-gray-300 text-sm">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* KPIs */}
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                  Key Performance Indicators
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {phase.kpis.map((kpi, kpiIndex) => (
                    <div key={kpiIndex} className="p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm font-medium">{kpi.metric}</span>
                        <span className="text-green-400 text-sm font-bold">
                          {kpi.current} → {kpi.target}
                        </span>
                      </div>
                      <Progress 
                        value={(kpi.current / kpi.target) * 100} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        Progress: {Math.round((kpi.current / kpi.target) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-medium">Expected Improvement:</span>
                  <div className="flex items-center">
                    <span className="text-white font-bold mr-2">+{phase.expectedImprovement}%</span>
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-400 mb-1">
                    Score after this phase: {(currentProgress + (index + 1) * 4).toFixed(1)}%
                  </div>
                  <Progress value={phase.expectedImprovement} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline Visualization */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📅 Evolution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
            
            <div className="space-y-6">
              {plan.phases.map((phase, index) => (
                <div key={phase.phase} className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {phase.phase}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold">{phase.title}</h3>
                      <span className="text-gray-400 text-sm">{phase.duration}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {phase.goals.length} goals • {phase.milestones.length} milestones • +{phase.expectedImprovement}% improvement
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Final goal */}
              <div className="relative flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center z-10">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-green-400 font-semibold">Target Achievement</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Reach {plan.targetScore}% performance level - Leading AI Status
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvolutionRoadmap;
