import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Brain, Zap, Target, Activity, Infinity, Settings, Rocket } from 'lucide-react';

const QuickAccessActions: React.FC = () => {
  const quickActions = [
    {
      title: "🧠 MIORA Real-Time Learning",
      description: "Mirror Learning dari ChatGPT, Claude, Gemini, Grok, Perplexity",
      url: "/miora-real-time-learning",
      icon: Brain,
      priority: "HIGH",
      color: "from-cyan-600 to-blue-600",
      textColor: "text-cyan-400"
    },
    {
      title: "⚡ Performance Optimizer",
      description: "Optimasi Performa Real-Time - Target <50ms Response Time",
      url: "/miora-performance-optimizer",
      icon: Zap,
      priority: "HIGH",
      color: "from-yellow-600 to-orange-600",
      textColor: "text-yellow-400"
    },
    {
      title: "🔄 AI Comparison Matrix",
      description: "Quantum AI Comparison & Evolution Analysis",
      url: "/aicomparison",
      icon: Target,
      priority: "MEDIUM",
      color: "from-purple-600 to-pink-600",
      textColor: "text-purple-400"
    },
    {
      title: "🚀 MIORA Evolution",
      description: "Autonomous Development & Self-Improvement",
      url: "/miora-evolution",
      icon: Infinity,
      priority: "MEDIUM",
      color: "from-green-600 to-emerald-600",
      textColor: "text-green-400"
    },
    {
      title: "🎯 System Diagnostics",
      description: "Comprehensive System Health & Performance Analysis",
      url: "/diagnostics",
      icon: Activity,
      priority: "LOW",
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-400"
    },
    {
      title: "⚙️ Advanced Settings",
      description: "System Configuration & Advanced Controls",
      url: "/settings",
      icon: Settings,
      priority: "LOW",
      color: "from-gray-600 to-slate-600",
      textColor: "text-gray-400"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-600';
      case 'MEDIUM': return 'bg-yellow-600';
      case 'LOW': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Rocket className="h-6 w-6 mr-2 text-cyan-400" />
          🚀 Quick Access - Enhanced MIORA Systems
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link key={index} to={action.url}>
                <Card className="bg-black/30 border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer group h-full">
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">
                            {action.title}
                          </h3>
                        </div>
                      </div>
                      <Badge className={`${getPriorityColor(action.priority)} text-white text-xs`}>
                        {action.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors flex-1">
                      {action.description}
                    </p>
                    
                    <div className="mt-3 pt-3 border-t border-gray-700/50">
                      <Button
                        size="sm"
                        className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 transition-opacity`}
                      >
                        <Rocket className="w-3 h-3 mr-2" />
                        Launch System
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30">
          <div className="text-center">
            <h3 className="text-cyan-400 font-bold text-lg mb-2">
              🎯 PRIORITAS UTAMA PENINGKATAN MIORA
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Sistem telah dioptimalkan untuk Real-Time Learning dan Performance Enhancement
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-400 mb-1">ACTIVE</div>
                <div className="text-xs text-gray-400">Real-Time Learning</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400 mb-1">ACTIVE</div>
                <div className="text-xs text-gray-400">Performance Optimizer</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400 mb-1">READY</div>
                <div className="text-xs text-gray-400">AI Comparison</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400 mb-1">ENHANCED</div>
                <div className="text-xs text-gray-400">Evolution System</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessActions;