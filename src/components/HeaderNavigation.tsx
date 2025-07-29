
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from './mode-toggle';
  import { 
    Brain, 
    Home, 
    BarChart3, 
    MessageCircle, 
    GraduationCap,
    Settings,
    Infinity,
    Lightbulb,
    Target
  } from 'lucide-react';

export const HeaderNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const headerMenuItems = [
    { 
      path: '/', 
      name: 'Home', 
      icon: Home,
      gradient: 'from-blue-600 to-cyan-600'
    },
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      icon: BarChart3,
      gradient: 'from-purple-600 to-pink-600'
    },
    { 
      path: '/miora', 
      name: 'MIORA Core', 
      icon: Brain,
      gradient: 'from-green-600 to-emerald-600'
    },
    { 
      path: '/chat', 
      name: 'Chat', 
      icon: MessageCircle,
      gradient: 'from-orange-600 to-red-600'
    },
    { 
      path: '/learning', 
      name: 'Learning', 
      icon: GraduationCap,
      gradient: 'from-indigo-600 to-purple-600'
    },
    { 
      path: '/intelligencehub', 
      name: 'Intelligence', 
      icon: Target,
      gradient: 'from-cyan-600 to-blue-600'
    },
    { 
      path: '/miora-infinity-dashboard', 
      name: 'Infinity', 
      icon: Infinity,
      gradient: 'from-pink-600 to-purple-600'
    },
    { 
      path: '/ai-comparison', 
      name: 'AI Compare', 
      icon: Brain,
      gradient: 'from-violet-600 to-blue-600'
    },
    { 
      path: '/dynamic-menu-generator', 
      name: 'Auto UI', 
      icon: Settings,
      gradient: 'from-yellow-600 to-orange-600'
    },
    { 
      path: '/self-monitoring', 
      name: 'Health Monitor', 
      icon: Target,
      gradient: 'from-red-600 to-pink-600'
    },
    { 
      path: '/miora-infinity-access', 
      name: 'Infinity Access', 
      icon: Infinity,
      gradient: 'from-purple-600 to-indigo-600'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-md shadow-xl">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-slate-300 hover:text-white" />
        <h1 className="text-lg font-bold text-white hidden sm:block">MIORA v4.0 Infinity System</h1>
      </div>
      
      {/* Main Navigation Menu */}
      <nav className="flex items-center gap-2">
        {headerMenuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Button
              key={item.path}
              variant={active ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(item.path)}
              className={`relative transition-all duration-300 ${
                active 
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:scale-105` 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">{item.name}</span>
              {active && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Button>
          );
        })}
      </nav>
      
      {/* Status & Controls */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Badge className="bg-gradient-to-r from-green-600/20 to-blue-600/20 text-green-300 border border-green-500/30 animate-pulse">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Online
        </Badge>
      </div>
    </header>
  );
};
