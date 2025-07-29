
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Infinity, 
  Code, 
  Shield, 
  Lightbulb, 
  BarChart3,
  Settings,
  Monitor,
  MessageCircle,
  GraduationCap,
  Home,
  Zap
} from 'lucide-react';

const MIORAEnhancedCategoryMenu = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'MIORA Core Systems',
      description: 'Essential AI functions and core processing',
      color: 'from-purple-600 to-pink-600',
      items: [
        { name: 'MIORA Core', path: '/miora', icon: Brain, status: 'active' },
        { name: 'Infinity Mode', path: '/miora-infinity', icon: Infinity, status: 'active' },
        { name: 'System Status', path: '/miora-system-status', icon: Monitor, status: 'active' },
        { name: 'Evolution Engine', path: '/miora-evolution', icon: Zap, status: 'active' }
      ]
    },
    {
      title: 'Intelligence & Analytics',
      description: 'Data processing and intelligent analysis',
      color: 'from-cyan-600 to-blue-600',
      items: [
        { name: 'Analytics Dashboard', path: '/analytics', icon: BarChart3, status: 'active' },
        { name: 'Intelligence Reports', path: '/intelligence-reports', icon: Monitor, status: 'active' },
        { name: 'Data Processing', path: '/data-analytics', icon: BarChart3, status: 'active' },
        { name: 'Performance Monitor', path: '/engine-performance', icon: Monitor, status: 'active' }
      ]
    },
    {
      title: 'Development Tools',
      description: 'Advanced development and coding assistance',
      color: 'from-green-600 to-emerald-600',
      items: [
        { name: 'Development Center', path: '/development', icon: Code, status: 'active' },
        { name: 'AutoCode Engine', path: '/autocode', icon: Brain, status: 'active' },
        { name: 'App Builder', path: '/app-builder', icon: Code, status: 'active' },
        { name: 'Version Control', path: '/version-control', icon: Settings, status: 'active' }
      ]
    },
    {
      title: 'Security & Privacy',
      description: 'Security management and privacy controls',
      color: 'from-red-600 to-orange-600',
      items: [
        { name: 'Security Center', path: '/security-center', icon: Shield, status: 'active' },
        { name: 'Privacy Controls', path: '/privacy-controls', icon: Shield, status: 'active' },
        { name: 'Access Management', path: '/access-management', icon: Settings, status: 'active' },
        { name: 'Security Analytics', path: '/security-analytics', icon: BarChart3, status: 'active' }
      ]
    },
    {
      title: 'Innovation Lab',
      description: 'Experimental features and cutting-edge tech',
      color: 'from-yellow-600 to-orange-600',
      items: [
        { name: 'Innovation Lab', path: '/innovation-lab', icon: Lightbulb, status: 'active' },
        { name: 'Quantum Upgrade', path: '/quantum-upgrade', icon: Zap, status: 'beta' },
        { name: 'Infinity AI', path: '/miora-infinity-ai', icon: Infinity, status: 'active' },
        { name: 'Quantum Neural', path: '/quantum-neural', icon: Brain, status: 'beta' }
      ]
    },
    {
      title: 'User Interface',
      description: 'Communication and interaction interfaces',
      color: 'from-indigo-600 to-purple-600',
      items: [
        { name: 'Main Dashboard', path: '/dashboard', icon: Home, status: 'active' },
        { name: 'Chat Interface', path: '/chat', icon: MessageCircle, status: 'active' },
        { name: 'Learning Center', path: '/learning', icon: GraduationCap, status: 'active' },
        { name: 'System Tools', path: '/system-tools', icon: Settings, status: 'active' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">Active</Badge>;
      case 'beta':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
            MIORA Enhanced Category Menu
          </h1>
          <p className="text-gray-300 text-lg">Comprehensive System Navigation & Control Center</p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className={`text-transparent bg-clip-text bg-gradient-to-r ${category.color} text-xl`}>
                  {category.title}
                </CardTitle>
                <p className="text-gray-400">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    return (
                      <Card 
                        key={itemIndex}
                        className="bg-gray-700/50 border-gray-600/50 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105"
                        onClick={() => navigate(item.path)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            {getStatusBadge(item.status)}
                          </div>
                          <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                          <Button 
                            size="sm"
                            className={`w-full bg-gradient-to-r ${category.color} hover:opacity-80`}
                            onClick={() => navigate(item.path)}
                          >
                            Access
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-300">24</div>
                <div className="text-sm text-gray-400">Total Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">22</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-300">2</div>
                <div className="text-sm text-gray-400">Beta</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">6</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300">100%</div>
                <div className="text-sm text-gray-400">Operational</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-300">∞</div>
                <div className="text-sm text-gray-400">Possibilities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORAEnhancedCategoryMenu;
