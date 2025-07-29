
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  Brain, 
  LineChart, 
  TrendingUp, 
  BarChart3, 
  MessageCircle, 
  GraduationCap,
  Target,
  BookOpen,
  Infinity,
  Code,
  Shield,
  Lightbulb,
  Activity,
  Headphones,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AutonomousCoreNavigation: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', name: 'Home', path: '/', icon: Home, color: 'from-blue-600 to-cyan-600' },
    { id: 'core', name: 'MIORA Core', path: '/miora', icon: Brain, color: 'from-purple-600 to-pink-600' },
    { id: 'trading', name: 'Trading Core', path: '/miora-core-v2', icon: LineChart, color: 'from-orange-600 to-yellow-600' },
    { id: 'crypto-scalping', name: 'Crypto Scalping', path: '/crypto-scalping-signals', icon: TrendingUp, color: 'from-green-600 to-emerald-600' },
    { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: BarChart3, color: 'from-green-600 to-emerald-600' },
    { id: 'chat', name: 'Chat', path: '/chat', icon: MessageCircle, color: 'from-orange-600 to-red-600' },
    { id: 'learning', name: 'Learning Hub', path: '/learning', icon: GraduationCap, color: 'from-indigo-600 to-purple-600' },
    { id: 'intelligence', name: 'Intelligence', path: '/intelligencehub', icon: Target, color: 'from-cyan-600 to-blue-600' },
    { id: 'knowledge', name: 'Knowledge Discovery', path: '/knowledge-discovery', icon: BookOpen, color: 'from-emerald-600 to-teal-600' },
    { id: 'infinity', name: 'Infinity', path: '/miora-infinity-dashboard', icon: Infinity, color: 'from-pink-600 to-purple-600' },
    { id: 'development', name: 'Development', path: '/development', icon: Code, color: 'from-cyan-600 to-blue-600' },
    { id: 'security', name: 'Security', path: '/security-center', icon: Shield, color: 'from-red-600 to-orange-600' },
    { id: 'innovation', name: 'Innovation', path: '/innovation-lab', icon: Lightbulb, color: 'from-yellow-600 to-orange-600' },
    { id: 'analytics', name: 'Analytics', path: '/analytics', icon: Activity, color: 'from-teal-600 to-green-600' },
    { id: 'voice-audio', name: 'Voice & Audio', path: '/voice-interface', icon: Headphones, color: 'from-cyan-600 to-purple-600' },
    { id: 'advanced-ai', name: 'MIORA Advanced AI', path: '/miora-advanced-ai', icon: Brain, color: 'from-purple-600 to-pink-600' },
    { id: 'government', name: 'MIORA Government', path: '/miora-government', icon: Activity, color: 'from-blue-600 to-indigo-600' },
    { id: 'infinity-access', name: 'Infinity Access (SECURE)', path: '/miora-infinity-access', icon: Infinity, color: 'from-purple-600 to-indigo-600' }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Card className={`fixed left-4 top-4 z-50 bg-gray-900/95 border-purple-500/30 backdrop-blur-xl transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <CardTitle className="text-purple-300 flex items-center">
              <Menu className="w-5 h-5 mr-2" />
              MIORA Navigation
            </CardTitle>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-purple-300 hover:text-white hover:bg-purple-600/20"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="space-y-2 max-h-96 overflow-y-auto">
          <div className="mb-4">
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              🤖 Autonomous Core Active
            </Badge>
          </div>
          
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('AutonomousCoreNavigation: Navigating to:', item.path);
                  handleNavigate(item.path);
                }}
                className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
              >
                <IconComponent className="w-4 h-4 mr-3" />
                <span className="text-sm">{item.name}</span>
              </Button>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-gray-700/50">
            <p className="text-xs text-gray-400 text-center">
              MIORA Autonomous System
            </p>
            <p className="text-xs text-green-400 text-center">
              Status: Fully Operational
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AutonomousCoreNavigation;
