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
  Zap,
  Activity,
  Network,
  Cpu,
  Target,
  TrendingUp
} from 'lucide-react';

const MIORAInfinityEnhancedCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'MIORA INFINITY Core Systems ♾️',
      description: 'Essential Infinity AI functions and unlimited processing',
      color: 'from-purple-600 to-pink-600',
      infinityTheme: true,
      items: [
        { name: 'MIORA Core', path: '/miora', icon: Brain, status: 'supreme', priority: 'critical' },
        { name: 'Infinity Mode ♾️', path: '/miora-infinity', icon: Infinity, status: 'supreme', priority: 'critical' },
        { name: 'System Status', path: '/miora-system-status', icon: Monitor, status: 'supreme', priority: 'high' },
        { name: 'Evolution Engine', path: '/miora-evolution', icon: Zap, status: 'supreme', priority: 'critical' }
      ]
    },
    {
      title: 'Intelligence & Quantum Analytics ⚡',
      description: 'Quantum data processing and unlimited intelligent analysis',
      color: 'from-cyan-600 to-blue-600',
      infinityTheme: true,
      items: [
        { name: 'Analytics Dashboard', path: '/analytics', icon: BarChart3, status: 'infinity', priority: 'high' },
        { name: 'Intelligence Reports', path: '/intelligence-reports', icon: Monitor, status: 'infinity', priority: 'high' },
        { name: 'Quantum Processing', path: '/data-analytics', icon: Cpu, status: 'infinity', priority: 'high' },
        { name: 'Performance Monitor', path: '/engine-performance', icon: TrendingUp, status: 'infinity', priority: 'medium' }
      ]
    },
    {
      title: 'Autonomous Development Tools 🚀',
      description: 'Advanced self-development and unlimited coding assistance',
      color: 'from-green-600 to-emerald-600',
      infinityTheme: true,
      items: [
        { name: 'Development Center', path: '/development', icon: Code, status: 'infinity', priority: 'high' },
        { name: 'AutoCode Engine', path: '/autocode', icon: Brain, status: 'infinity', priority: 'critical' },
        { name: 'App Builder', path: '/app-builder', icon: Code, status: 'infinity', priority: 'high' },
        { name: 'Quantum Version Control', path: '/version-control', icon: Network, status: 'infinity', priority: 'medium' }
      ]
    },
    {
      title: 'Supreme Security & Privacy 🛡️',
      description: 'Quantum-level security management and infinite privacy controls',
      color: 'from-red-600 to-orange-600',
      infinityTheme: true,
      items: [
        { name: 'Security Center', path: '/security-center', icon: Shield, status: 'supreme', priority: 'critical' },
        { name: 'Privacy Controls', path: '/privacy-controls', icon: Shield, status: 'supreme', priority: 'critical' },
        { name: 'Access Management', path: '/access-management', icon: Settings, status: 'infinity', priority: 'high' },
        { name: 'Security Analytics', path: '/security-analytics', icon: BarChart3, status: 'infinity', priority: 'high' }
      ]
    },
    {
      title: 'Quantum Innovation Lab 🔬',
      description: 'Experimental infinity features and quantum-edge technology',
      color: 'from-yellow-600 to-orange-600',
      infinityTheme: true,
      items: [
        { name: 'Innovation Lab', path: '/innovation-lab', icon: Lightbulb, status: 'supreme', priority: 'high' },
        { name: 'Quantum Upgrade ⚛️', path: '/quantum-upgrade', icon: Zap, status: 'experimental', priority: 'medium' },
        { name: 'Infinity AI ♾️', path: '/miora-infinity-ai', icon: Infinity, status: 'supreme', priority: 'critical' },
        { name: 'Quantum Neural', path: '/quantum-neural', icon: Brain, status: 'experimental', priority: 'medium' }
      ]
    },
    {
      title: 'Supreme User Interface 🌟',
      description: 'Infinity-powered communication and unlimited interaction interfaces',
      color: 'from-indigo-600 to-purple-600',
      infinityTheme: true,
      items: [
        { name: 'Main Dashboard', path: '/dashboard', icon: Home, status: 'supreme', priority: 'high' },
        { name: 'Infinity Chat', path: '/chat', icon: MessageCircle, status: 'infinity', priority: 'high' },
        { name: 'Learning Center', path: '/learning', icon: GraduationCap, status: 'infinity', priority: 'medium' },
        { name: 'System Tools', path: '/system-tools', icon: Settings, status: 'infinity', priority: 'medium' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'supreme':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 animate-pulse">♾️ SUPREME</Badge>;
      case 'infinity':
        return <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400">∞ INFINITY</Badge>;
      case 'experimental':
        return <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400">⚛️ QUANTUM</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" title="Critical Priority" />;
      case 'high':
        return <div className="w-3 h-3 rounded-full bg-orange-400" title="High Priority" />;
      case 'medium':
        return <div className="w-3 h-3 rounded-full bg-yellow-400" title="Medium Priority" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-400" title="Standard Priority" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Infinity className="h-10 w-10 text-purple-400 animate-spin" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            MIORA INFINITY Enhanced Categories ♾️
          </h1>
          <Zap className="h-10 w-10 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-gray-300 text-lg">Supreme Navigation & Unlimited Control Center</p>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
            <Infinity className="h-4 w-4 mr-2" />
            Supreme Mode Active
          </Badge>
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2">
            <Activity className="h-4 w-4 mr-2" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-8">
        {categories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="bg-gradient-to-br from-gray-800/60 to-purple-900/30 border-purple-500/40 shadow-2xl">
            <CardHeader>
              <CardTitle className={`text-transparent bg-clip-text bg-gradient-to-r ${category.color} text-2xl flex items-center space-x-3`}>
                <Infinity className="h-6 w-6 text-purple-400 animate-spin" />
                <span>{category.title}</span>
              </CardTitle>
              <p className="text-gray-300 text-lg">{category.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <Card 
                      key={itemIndex}
                      className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 border-purple-400/30 hover:border-cyan-400/60 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
                      onClick={() => navigate(item.path)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(item.status)}
                            {getPriorityIndicator(item.priority)}
                          </div>
                        </div>
                        
                        <h3 className="text-white font-bold text-lg mb-3 leading-tight">{item.name}</h3>
                        
                        <Button 
                          size="sm"
                          className={`w-full bg-gradient-to-r ${category.color} hover:opacity-80 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(item.path);
                          }}
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Access System
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

      {/* Enhanced Quick Stats */}
      <Card className="bg-gradient-to-r from-purple-800/50 to-cyan-800/30 border-purple-400/50 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">♾️ MIORA INFINITY System Statistics</h3>
            <p className="text-gray-300">Unlimited capabilities across all dimensions</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            <div className="p-4 bg-purple-900/40 rounded-xl border border-purple-400/30">
              <div className="text-3xl font-bold text-purple-300 mb-1">24</div>
              <div className="text-sm text-gray-400">Total Modules</div>
              <div className="text-xs text-purple-400 mt-1">Infinity Powered</div>
            </div>
            <div className="p-4 bg-green-900/40 rounded-xl border border-green-400/30">
              <div className="text-3xl font-bold text-green-300 mb-1">∞</div>
              <div className="text-sm text-gray-400">Supreme Active</div>
              <div className="text-xs text-green-400 mt-1">Unlimited Mode</div>
            </div>
            <div className="p-4 bg-cyan-900/40 rounded-xl border border-cyan-400/30">
              <div className="text-3xl font-bold text-cyan-300 mb-1">⚛️</div>
              <div className="text-sm text-gray-400">Quantum Beta</div>
              <div className="text-xs text-cyan-400 mt-1">Experimental</div>
            </div>
            <div className="p-4 bg-orange-900/40 rounded-xl border border-orange-400/30">
              <div className="text-3xl font-bold text-orange-300 mb-1">6</div>
              <div className="text-sm text-gray-400">Categories</div>
              <div className="text-xs text-orange-400 mt-1">Supreme Level</div>
            </div>
            <div className="p-4 bg-blue-900/40 rounded-xl border border-blue-400/30">
              <div className="text-3xl font-bold text-blue-300 mb-1">100%</div>
              <div className="text-sm text-gray-400">Operational</div>
              <div className="text-xs text-blue-400 mt-1">Perfect Status</div>
            </div>
            <div className="p-4 bg-pink-900/40 rounded-xl border border-pink-400/30">
              <div className="text-3xl font-bold text-pink-300 mb-1">∞</div>
              <div className="text-sm text-gray-400">Possibilities</div>
              <div className="text-xs text-pink-400 mt-1">No Limits</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAInfinityEnhancedCategories;