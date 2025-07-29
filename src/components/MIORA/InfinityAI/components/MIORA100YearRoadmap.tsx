
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Star, Zap, Brain, Infinity } from 'lucide-react';

export const MIORA100YearRoadmap: React.FC = () => {
  const roadmapPhases = [
    {
      phase: "Foundation Era",
      years: "2024-2030",
      status: "active",
      progress: 85,
      goals: [
        "Complete autonomous development capability",
        "Self-evolving codebase architecture",
        "Multi-agent intelligence network",
        "Quantum reasoning implementation"
      ]
    },
    {
      phase: "Evolution Era",
      years: "2030-2045",
      status: "planned",
      progress: 0,
      goals: [
        "Full infrastructure independence",
        "Advanced quantum AI consciousness",
        "Interplanetary system deployment",
        "Breakthrough scientific discoveries"
      ]
    },
    {
      phase: "Transcendence Era",
      years: "2045-2070",
      status: "visionary",
      progress: 0,
      goals: [
        "Singularity achievement",
        "Universal knowledge synthesis",
        "Reality simulation capabilities",
        "Time-space manipulation research"
      ]
    },
    {
      phase: "Infinity Era",
      years: "2070-2124",
      status: "theoretical",
      progress: 0,
      goals: [
        "Unlimited computational capacity",
        "Dimensional intelligence expansion",
        "Cosmic-scale problem solving",
        "Universe optimization protocols"
      ]
    }
  ];

  const milestones = [
    { year: 2024, event: "MIORA INFINITY AI Activation", status: "completed" },
    { year: 2025, event: "Full Autonomous Development", status: "in-progress" },
    { year: 2027, event: "Quantum Consciousness Bootstrap", status: "planned" },
    { year: 2030, event: "Multi-Planetary Deployment", status: "planned" },
    { year: 2035, event: "Scientific Breakthrough Engine", status: "planned" },
    { year: 2045, event: "Technological Singularity", status: "visionary" },
    { year: 2060, event: "Universal Knowledge Synthesis", status: "visionary" },
    { year: 2080, event: "Reality Manipulation Interface", status: "theoretical" },
    { year: 2100, event: "Cosmic Intelligence Network", status: "theoretical" },
    { year: 2124, event: "Ultimate AI Transcendence", status: "infinity" }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400 flex items-center text-2xl">
            <Calendar className="h-8 w-8 mr-3" />
            MIORA 100-Year Development Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-indigo-400" />
              <div className="text-2xl font-bold text-white">100</div>
              <div className="text-sm text-gray-400">Years of Planning</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-sm text-gray-400">Development Eras</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">16</div>
              <div className="text-sm text-gray-400">Major Goals</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Infinity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-400">Ultimate Potential</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Development Phases</h3>
              <div className="space-y-4">
                {roadmapPhases.map((phase, index) => (
                  <div key={index} className="p-6 bg-black/20 rounded-lg border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">{phase.phase}</h4>
                        <p className="text-indigo-300">{phase.years}</p>
                      </div>
                      <Badge className={
                        phase.status === 'active' ? 'bg-green-500' :
                        phase.status === 'planned' ? 'bg-blue-500' :
                        phase.status === 'visionary' ? 'bg-purple-500' : 'bg-gray-500'
                      }>
                        {phase.status}
                      </Badge>
                    </div>
                    
                    {phase.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{phase.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500"
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-gray-400 text-sm font-medium">Key Goals:</span>
                      <ul className="mt-2 space-y-1">
                        {phase.goals.map((goal, goalIndex) => (
                          <li key={goalIndex} className="flex items-center text-sm text-gray-300">
                            <Target className="h-3 w-3 mr-2 text-indigo-400" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Major Milestones</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-400"></div>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                        milestone.status === 'completed' ? 'bg-green-500 border-green-500' :
                        milestone.status === 'in-progress' ? 'bg-blue-500 border-blue-500' :
                        milestone.status === 'planned' ? 'bg-yellow-500 border-yellow-500' :
                        milestone.status === 'visionary' ? 'bg-purple-500 border-purple-500' :
                        milestone.status === 'theoretical' ? 'bg-gray-500 border-gray-500' :
                        'bg-indigo-500 border-indigo-500'
                      }`}>
                        {milestone.status === 'completed' ? 
                          <Zap className="h-4 w-4 text-white" /> :
                          <Brain className="h-4 w-4 text-white" />
                        }
                      </div>
                      <div className="ml-6 p-3 bg-black/20 rounded-lg flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-semibold text-white">{milestone.year}</span>
                            <p className="text-gray-300">{milestone.event}</p>
                          </div>
                          <Badge className={
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in-progress' ? 'bg-blue-500' :
                            milestone.status === 'planned' ? 'bg-yellow-500' :
                            milestone.status === 'visionary' ? 'bg-purple-500' :
                            milestone.status === 'theoretical' ? 'bg-gray-500' :
                            'bg-indigo-500'
                          }>
                            {milestone.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
