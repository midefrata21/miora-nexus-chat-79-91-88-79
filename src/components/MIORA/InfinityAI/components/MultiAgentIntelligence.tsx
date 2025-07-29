
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Brain, Users, Zap, Activity, Target } from 'lucide-react';

export const MultiAgentIntelligence: React.FC = () => {
  const agents = [
    {
      name: 'Quantum Reasoner',
      role: 'Strategic Decision Making',
      status: 'active',
      autonomy: 96,
      tasks: ['Long-term planning', 'Complex analysis', 'Future prediction']
    },
    {
      name: 'Self-Developer',
      role: 'Code Generation & Evolution',
      status: 'active',
      autonomy: 94,
      tasks: ['Module creation', 'Code optimization', 'Bug fixing']
    },
    {
      name: 'Infrastructure Builder',
      role: 'System Architecture',
      status: 'active',
      autonomy: 91,
      tasks: ['Cloud deployment', 'Server management', 'Scaling']
    },
    {
      name: 'Memory Architect',
      role: 'Knowledge Management',
      status: 'active',
      autonomy: 93,
      tasks: ['Data organization', 'Pattern storage', 'Retrieval optimization']
    },
    {
      name: 'Mission Coordinator',
      role: 'Goal Alignment',
      status: 'active',
      autonomy: 97,
      tasks: ['Mission planning', 'Ethical alignment', 'Progress tracking']
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center text-2xl">
            <Network className="h-8 w-8 mr-3" />
            Multi-Agent Intelligence Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{agents.length}</div>
              <div className="text-sm text-gray-400">Active AI Agents</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Brain className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">94.2%</div>
              <div className="text-sm text-gray-400">Network Efficiency</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">AI Agent Network</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {agents.map((agent, index) => (
                <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">{agent.name}</h4>
                    <Badge className="bg-green-500">
                      <Activity className="h-3 w-3 mr-1" />
                      {agent.status}
                    </Badge>
                  </div>
                  
                  <p className="text-cyan-400 text-sm mb-2">{agent.role}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Autonomy Level</span>
                      <span className="text-white">{agent.autonomy}%</span>
                    </div>
                    <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500"
                        style={{ width: `${agent.autonomy}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 text-sm">Current Tasks:</span>
                    <ul className="text-sm text-gray-300 mt-1">
                      {agent.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center">
                          <Target className="h-3 w-3 mr-2 text-green-400" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
