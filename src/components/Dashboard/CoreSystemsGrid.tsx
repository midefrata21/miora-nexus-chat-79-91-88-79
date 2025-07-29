
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  MessageCircle, 
  GraduationCap, 
  BarChart3, 
  Brain, 
  Zap, 
  Activity,
  Mic,
  Terminal,
  Settings,
  CheckCircle
} from 'lucide-react';

const coreModules = [
  {
    title: 'Main Dashboard',
    description: 'Central command and comprehensive system overview',
    icon: Home,
    path: '/',
    gradient: 'from-blue-600 to-cyan-600',
    features: ['Real-time Monitoring', 'Voice Control', 'Quick Actions']
  },
  {
    title: 'MIORA Core Engine',
    description: 'Central AI processing and system control hub',
    icon: Brain,
    path: '/miora',
    gradient: 'from-purple-600 to-pink-600',
    features: ['AI Processing', 'Core Functions', 'System Control']
  },
  {
    title: 'Chat Intelligence',
    description: 'Smart conversation system with context awareness',
    icon: MessageCircle,
    path: '/chat',
    gradient: 'from-green-600 to-emerald-600',
    features: ['Smart Responses', 'Context Memory', 'Multi-modal Chat']
  },
  {
    title: 'Learning Hub Pro',
    description: 'Comprehensive learning center with AI tutoring',
    icon: GraduationCap,
    path: '/learning',
    gradient: 'from-orange-600 to-red-600',
    features: ['Personalized Learning', 'AI Tutoring', 'Progress Tracking']
  },
  {
    title: 'Analytics Dashboard',
    description: 'Advanced performance analytics and insights',
    icon: BarChart3,
    path: '/analytics',
    gradient: 'from-cyan-600 to-blue-600',
    features: ['Real-time Metrics', 'Predictive Analysis', 'Custom Reports']
  },
  {
    title: 'MIORA Evolution',
    description: 'Autonomous system evolution and upgrades',
    icon: Zap,
    path: '/miora-evolution',
    gradient: 'from-yellow-600 to-orange-600',
    features: ['Self-improvement', 'Auto-upgrades', 'Evolution tracking']
  },
  {
    title: 'MIORA Infinity',
    description: 'Infinite processing capabilities',
    icon: Activity,
    path: '/miora-infinity',
    gradient: 'from-pink-600 to-purple-600',
    features: ['Unlimited processing', 'Quantum enhancement', 'Infinite scaling']
  },
  {
    title: 'Voice Assistant Pro',
    description: 'Advanced speech interaction with neural enhancement',
    icon: Mic,
    path: '/voice-diagnostics',
    gradient: 'from-indigo-600 to-purple-600',
    features: ['Speech Recognition', 'Natural TTS', 'Voice Commands']
  },
  {
    title: 'Command Interface',
    description: 'Advanced command execution system',
    icon: Terminal,
    path: '/command-interface',
    gradient: 'from-gray-600 to-slate-600',
    features: ['Command processing', 'System control', 'Advanced operations']
  },
  {
    title: 'Internal Command System',
    description: 'Autonomous internal command generation',
    icon: Settings,
    path: '/internal-command-system',
    gradient: 'from-teal-600 to-cyan-600',
    features: ['Self-command generation', 'Autonomous execution', 'Infrastructure development']
  }
];

export const CoreSystemsGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleModuleClick = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Core Systems</h2>
            <p className="text-gray-300">Fundamental MIORA operations with enhanced AI capabilities</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Enhanced</Badge>
          <Badge className="bg-green-500/20 text-green-300 border-green-400/30">10 Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {coreModules.map((module, index) => (
          <Card 
            key={index}
            className="bg-gray-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 group"
            onClick={() => handleModuleClick(module.path)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${module.gradient} group-hover:scale-110 transition-transform`}>
                    <module.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                      {module.title}
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </CardTitle>
                    <p className="text-xs text-gray-400 mt-1">{module.description}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30 animate-pulse">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-xs text-cyan-300 font-medium">Enhanced Features:</p>
                <div className="flex flex-wrap gap-1">
                  {module.features.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex}
                      variant="outline" 
                      className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
