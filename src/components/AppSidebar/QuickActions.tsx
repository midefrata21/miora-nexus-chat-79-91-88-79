
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Brain, 
  MessageCircle, 
  BarChart3,
  Settings,
  Terminal,
  Sparkles,
  Rocket,
  Crown
} from 'lucide-react';

interface QuickActionsProps {
  collapsed: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ collapsed }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Quick Chat',
      icon: MessageCircle,
      path: '/chat',
      color: 'from-blue-600 to-cyan-600',
      description: 'Start AI conversation'
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
      color: 'from-green-600 to-emerald-600',
      description: 'View system metrics'
    },
    {
      title: 'MIORA Core',
      icon: Brain,
      path: '/miora',
      color: 'from-purple-600 to-pink-600',
      description: 'AI intelligence hub'
    },
    {
      title: 'Terminal',
      icon: Terminal,
      path: '/development',
      color: 'from-orange-600 to-red-600',
      description: 'Developer tools'
    }
  ];

  if (collapsed) {
    return (
      <div className="space-y-2">
        {quickActions.slice(0, 2).map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.path}
              size="sm"
              variant="ghost"
              className="w-full p-2 hover:scale-105 transition-transform"
              onClick={() => navigate(action.path)}
            >
              <IconComponent className="w-4 h-4" />
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <h3 className="text-sm font-semibold text-slate-300">Quick Actions</h3>
      </div>
      
      <Card className="bg-slate-800/40 border-slate-700/60 hover:border-slate-600/60 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.path}
                  size="sm"
                  className={`flex-col gap-2 h-auto py-4 bg-gradient-to-r ${action.color} hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg`}
                  onClick={() => navigate(action.path)}
                >
                  <IconComponent className="w-5 h-5" />
                  <div className="text-center">
                    <div className="text-xs font-semibold">{action.title}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* System Controls */}
      <Card className="bg-slate-800/40 border-slate-700/60 hover:border-slate-600/60 transition-all duration-300">
        <CardContent className="p-4">
          <div className="space-y-3">
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start border-slate-600/60 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-500/60 transition-all duration-300"
              onClick={() => navigate('/system-tools')}
            >
              <Settings className="w-4 h-4 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium">System Settings</div>
                <div className="text-xs opacity-70">Configure MIORA</div>
              </div>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start border-green-600/50 text-green-400 hover:bg-green-600/10 hover:border-green-500/60 hover:text-green-300 transition-all duration-300 group"
              onClick={() => navigate('/miora-infinity')}
            >
              <Rocket className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-sm font-medium">Activate Infinity</div>
                <div className="text-xs opacity-70">Boost AI capabilities</div>
              </div>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start border-purple-600/50 text-purple-400 hover:bg-purple-600/10 hover:border-purple-500/60 hover:text-purple-300 transition-all duration-300 group"
              onClick={() => navigate('/miora-supreme-unlimited')}
            >
              <Crown className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-sm font-medium">Supreme Unlimited</div>
                <div className="text-xs opacity-70">AI Hidup Tanpa Batas</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
