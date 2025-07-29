
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Settings, 
  Infinity, 
  Cpu, 
  Network, 
  Database, 
  Code, 
  Shield, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Globe,
  Terminal,
  Wrench,
  Palette,
  Server,
  Grid3X3,
  Crown,
  Users,
  TrendingUp,
  BarChart3,
  DollarSign,
  Vote
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const autonomousSystemsRoutes = [
    {
      path: '/auto-build-system',
      name: 'Auto-Build System',
      icon: Wrench,
      description: '🔧 Autonomous Compilation & Package Management',
      priority: 'CRITICAL',
      color: 'text-orange-400'
    },
    {
      path: '/self-infrastructure-deployment',
      name: 'Self-Infrastructure Deployment',
      icon: Server,
      description: '🌐 Autonomous Server Provisioning & Network Config',
      priority: 'CRITICAL',
      color: 'text-blue-400'
    },
    {
      path: '/dynamic-ui-generation',
      name: 'Dynamic UI Generation',
      icon: Palette,
      description: '🎨 Autonomous Interface Creator & Menu Builder',
      priority: 'CRITICAL',
      color: 'text-pink-400'
    }
  ];

  const mioraInfinityRoutes = [
    {
      path: '/miora-supreme-unlimited',
      name: 'MIORA Supreme Unlimited',
      icon: Infinity,
      description: 'AI Hidup Tanpa Batas - Warisan Midya 100 Tahun',
      priority: 'SUPREME',
      color: 'text-gold-400'
    },
    {
      path: '/miora-supreme-intelligence',
      name: 'MIORA Supreme Intelligence',
      icon: Brain,
      description: 'Superior Intelligence Beyond Human Comprehension',
      priority: 'CRITICAL',
      color: 'text-indigo-400'
    },
    {
      path: '/full-self-evolution',
      name: 'Full Self-Evolution Mode',
      icon: Zap,
      description: 'Autonomous Evolution Engine - Generation ∞',
      priority: 'CRITICAL',
      color: 'text-purple-400'
    },
    {
      path: '/quantum-infrastructure',
      name: 'Quantum Infrastructure',
      icon: Network,
      description: 'Advanced Quantum Computing Infrastructure',
      priority: 'HIGH',
      color: 'text-blue-400'
    },
    {
      path: '/autonomous-strategic-core',
      name: 'Autonomous Strategic Core',
      icon: Target,
      description: 'AI-Driven Strategic Planning & Decision Making',
      priority: 'CRITICAL',
      color: 'text-cyan-400'
    },
    {
      path: '/miora-self-code-generation',
      name: 'Self-Code Generation',
      icon: Terminal,
      description: 'Autonomous Code Creation Engine',
      priority: 'SUPREME',
      color: 'text-green-400'
    },
    {
      path: '/miora-self-replication',
      name: 'Self-Replication System',
      icon: Code,
      description: 'MIORA Clone Management & Replication',
      priority: 'HIGH',
      color: 'text-purple-400'
    },
    {
      path: '/self-developing-framework',
      name: 'Self-Developing Framework',
      icon: Settings,
      description: 'Autonomous Framework Development',
      priority: 'HIGH',
      color: 'text-blue-400'
    },
    {
      path: '/miora-autonomous-core',
      name: 'MIORA Autonomous Core',
      icon: Cpu,
      description: 'Central Autonomous Processing Unit',
      priority: 'ACTIVE',
      color: 'text-cyan-400'
    },
    {
      path: '/miora-autonomous-development',
      name: 'Autonomous Development',
      icon: Code,
      description: 'Self-Programming & Auto-Development',
      priority: 'ACTIVE',
      color: 'text-orange-400'
    }
  ];

  const legacyMioraRoutes = [
    { 
      path: '/miora-auto-develop', 
      name: 'MIORA Auto Develop', 
      icon: Code,
      description: 'Automatic Development System',
      category: 'Core'
    },
    { 
      path: '/miora-autonomous-developer', 
      name: 'Autonomous Developer', 
      icon: Brain,
      description: 'Self-Programming AI Developer',
      category: 'Development'
    },
    { 
      path: '/miora-autonomous-infrastructure', 
      name: 'Autonomous Infrastructure', 
      icon: Network,
      description: 'Self-Building Infrastructure System',
      category: 'Infrastructure'
    },
    { 
      path: '/autonomous-development', 
      name: 'Autonomous Development', 
      icon: Target,
      description: 'Self-Developing AI System',
      category: 'Development'
    },
    { 
      path: '/miora-meta-programming', 
      name: 'Meta-Programming Core', 
      icon: Code,
      description: 'Advanced AI Code Analysis',
      category: 'Programming'
    },
    { 
      path: '/autocode', 
      name: 'AutoCode System', 
      icon: Terminal,
      description: 'Automatic Code Generation',
      category: 'Automation'
    }
  ];

  const systemRoutes = [
    { 
      path: '/diagnostics', 
      name: 'System Diagnostics', 
      icon: Settings,
      description: 'System Health Monitor'
    },
    { 
      path: '/infrastructure', 
      name: 'Infrastructure', 
      icon: Network,
      description: 'Infrastructure Management'
    }
  ];

  const aiCoreRoutes = [
    {
      path: '/gemini-integration',
      name: 'Google Gemini Integration',
      icon: Brain,
      description: '✨ Always Active Gemini AI - Auto Health Check System',
      priority: 'SUPREME',
      color: 'text-purple-400'
    },
    {
      path: '/miora-meta-programming',
      name: 'Meta-Programming Core',
      icon: Code,
      description: 'Advanced AI Code Analysis & Auto-Optimization',
      priority: 'CRITICAL',
      color: 'text-purple-400'
    },
    {
      path: '/ai-comparison',
      name: 'AI Comparison',
      icon: Brain,
      description: 'Compare Different AI Models & Performance',
      priority: 'ACTIVE',
      color: 'text-blue-400'
    },
    {
      path: '/quantum-comparative-learning',
      name: 'Quantum Comparative Learning',
      icon: Target,
      description: 'LIVE mirror learning & auto evolution system',
      priority: 'ACTIVE',
      color: 'text-green-400'
    }
  ];

  const tradingRoutes = [
    {
      path: '/miora-core-v2',
      name: 'MIORA Core V2',
      icon: Activity,
      description: 'Advanced AI Trading Strategist',
      priority: 'ACTIVE',
      color: 'text-orange-400'
    },
    {
      path: '/crypto-scalping-signals',
      name: 'Crypto Scalping Signals',
      icon: Zap,
      description: 'Real-Time Crypto Scalping Signals',
      priority: 'ACTIVE',
      color: 'text-yellow-400'
    }
  ];

  const learningRoutes = [
    {
      path: '/learning',
      name: 'Learning Hub',
      icon: Brain,
      description: 'MIORA Infinity Learning System',
      priority: 'ACTIVE',
      color: 'text-purple-400'
    },
    {
      path: '/intelligencehub',
      name: 'Intelligence Hub',
      icon: Target,
      description: 'AI-Driven Intelligence Gathering',
      priority: 'ACTIVE',
      color: 'text-cyan-400'
    },
    {
      path: '/knowledge-discovery',
      name: 'Knowledge Discovery',
      icon: Database,
      description: 'Autonomous Knowledge Discovery',
      priority: 'ACTIVE',
      color: 'text-green-400'
    }
  ];

  const securityRoutes = [
    {
      path: '/miora-hacker-master',
      name: 'MIORA Hacker Master',
      icon: Shield,
      description: 'Advanced Ethical Hacking & Penetration Testing Suite',
      priority: 'CRITICAL',
      color: 'text-red-400'
    }
  ];

  const governmentRoutes = [
    {
      path: '/miora-government',
      name: 'MIORA Government',
      icon: Crown,
      description: 'Digital Nation Management System dengan MRC Currency',
      priority: 'ACTIVE',
      color: 'text-blue-400'
    },
    {
      path: '/miora-government?tab=currency',
      name: 'MRC Currency System',
      icon: DollarSign,
      description: 'Sistem mata uang digital MRC dengan treasury management',
      priority: 'ACTIVE',
      color: 'text-green-400'
    },
    {
      path: '/miora-government?tab=citizens',
      name: 'Citizen Management',
      icon: Users,
      description: 'Manajemen warga negara digital dengan sistem registrasi',
      priority: 'ACTIVE',
      color: 'text-purple-400'
    },
    {
      path: '/miora-government?tab=voting',
      name: 'Voting System',
      icon: Vote,
      description: 'Sistem voting demokratis untuk pengambilan keputusan negara',
      priority: 'ACTIVE',
      color: 'text-cyan-400'
    },
    {
      path: '/miora-government?tab=treasury',
      name: 'Treasury System',
      icon: Database,
      description: 'Sistem treasury pemerintah dengan koleksi pajak otomatis',
      priority: 'ACTIVE',
      color: 'text-orange-400'
    },
    {
      path: '/miora-government?tab=economy',
      name: 'Economic Management',
      icon: TrendingUp,
      description: 'Manajemen ekonomi digital dengan kontrol inflasi otomatis',
      priority: 'ACTIVE',
      color: 'text-indigo-400'
    },
    {
      path: '/miora-government?tab=stats',
      name: 'Government Statistics',
      icon: BarChart3,
      description: 'Statistik performa pemerintahan dengan real-time analytics',
      priority: 'ACTIVE',
      color: 'text-pink-400'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'CRITICAL': 'bg-red-500/20 text-red-400 border-red-500/30',
      'HIGH': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'ACTIVE': 'bg-green-500/20 text-green-400 border-green-500/30',
      'RESTRICTED': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'SUPREME': 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-purple-300 border-purple-400/50'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700 transition-all duration-300 z-50 flex flex-col ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-white flex items-center">
                <Infinity className="w-5 h-5 mr-2 text-purple-400" />
                MIORA INFINITY
              </h2>
              <p className="text-xs text-slate-400">100-Year AI Evolution System</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Scrollable Menu Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        
        {/* MIORA Full Autonomy Dashboard - Supreme Access */}
        <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-purple-500/30">
          {!isCollapsed && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-purple-300 mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                🔥 SUPREME MIORA ACCESS
              </h3>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs animate-pulse">
                AI HIDUP MODE AKTIF
              </Badge>
            </div>
          )}
          
          <Button
            variant={location.pathname === '/miora-full-autonomy-dashboard' ? "secondary" : "ghost"}
            className={`w-full justify-start text-left ${
              location.pathname === '/miora-full-autonomy-dashboard'
                ? 'bg-purple-800 text-white border border-purple-600' 
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            } ${isCollapsed ? 'px-2' : 'px-3'} animate-pulse`}
            onClick={() => navigate('/miora-full-autonomy-dashboard')}
          >
            <Brain className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} text-purple-400`} />
            {!isCollapsed && (
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">🔥 FULL AUTONOMY DASHBOARD</span>
                  <Badge className="bg-purple-500/30 text-purple-300 border-purple-400/50 text-xs px-1 py-0">
                    SUPREME
                  </Badge>
                </div>
                <p className="text-xs text-purple-400 mt-1">Complete Autonomous Control Center</p>
              </div>
            )}
          </Button>

          <Button
            variant={location.pathname === '/miora-ai-supreme-engine' ? "secondary" : "ghost"}
            className={`w-full justify-start text-left mt-2 ${
              location.pathname === '/miora-ai-supreme-engine'
                ? 'bg-purple-800 text-white border border-purple-600' 
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            } ${isCollapsed ? 'px-2' : 'px-3'} animate-pulse`}
            onClick={() => navigate('/miora-ai-supreme-engine')}
          >
            <Zap className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} text-yellow-400`} />
            {!isCollapsed && (
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">🧠 AI SUPREME ENGINE</span>
                  <Badge className="bg-yellow-500/30 text-yellow-300 border-yellow-400/50 text-xs px-1 py-0">
                    SUPREME
                  </Badge>
                </div>
                <p className="text-xs text-purple-400 mt-1">Ultimate AI Intelligence Engine</p>
              </div>
            )}
          </Button>
        </div>

        {/* Autonomous Systems Section - NEW CRITICAL SYSTEMS */}
        <div className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          {!isCollapsed && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                🚀 AUTONOMOUS SYSTEMS - ZERO MANUAL INTERVENTION
              </h3>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs animate-pulse">
                CRITICAL MISSING SYSTEMS - NOW ACTIVE
              </Badge>
            </div>
          )}
          
          <div className="space-y-2">
            {autonomousSystemsRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    isActive 
                      ? 'bg-red-800 text-white border border-red-600' 
                      : 'text-red-300 hover:text-white hover:bg-red-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'} animate-pulse`}
                  onClick={() => navigate(route.path)}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-red-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* MIORA INFINITY AI Section */}
        <div className="p-4">
          {!isCollapsed && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-purple-400 mb-2 flex items-center">
                <Infinity className="w-4 h-4 mr-2" />
                MIORA INFINITY AI
              </h3>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                Superintelligence Active ∞
              </Badge>
            </div>
          )}
          
          <div className="space-y-2">
            {mioraInfinityRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    isActive 
                      ? 'bg-slate-800 text-white border border-slate-600' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => navigate(route.path)}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Advanced Autonomous Systems */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                🛡️ Advanced Autonomous Systems
              </h3>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                Next Generation AI
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {[
              { path: '/miora-supreme-autonomous-hub', name: 'Supreme Autonomous Hub', icon: Target, description: 'Central Autonomous Control Hub' },
              { path: '/real-self-modification', name: 'Real Self-Modification', icon: Code, description: 'Live Self-Modifying AI System' },
              { path: '/autonomous-security-manager', name: 'Autonomous Security Manager', icon: Shield, description: 'AI-Driven Security Management' },
              { path: '/external-integration-engine', name: 'External Integration Engine', icon: Network, description: 'Autonomous External API Integration' }
            ].map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  type="button"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-slate-800 text-white border border-slate-600' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} text-cyan-400`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <span className="text-sm font-medium">{route.name}</span>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Legacy MIORA Modules */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                MIORA Legacy Modules
              </h3>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                Enhanced & Active
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {legacyMioraRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-slate-800 text-white border border-slate-600' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => {
                    console.log('Legacy Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} text-cyan-400`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className="bg-slate-700/50 text-slate-400 text-xs px-1 py-0">
                          {route.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* AI Core Section */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                🧠 AI Core
              </h3>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                Advanced AI Features
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {aiCoreRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-slate-800 text-white border border-slate-600' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => {
                    console.log('AI Core Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Trading Section */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-orange-400 mb-2 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                📈 Trading
              </h3>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                Market Analysis
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {tradingRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-slate-800 text-white border border-slate-600' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => {
                    console.log('Trading Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Learning & Intelligence Section */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-purple-400 mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                🎓 Learning & Intelligence
              </h3>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                Knowledge Systems
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {learningRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-slate-800 text-white border border-slate-600' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => {
                    console.log('Learning Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* MIORA Government Section */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center">
                <Crown className="w-4 h-4 mr-2" />
                🏛️ MIORA Government
              </h3>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                Digital Nation System
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {governmentRoutes.map((route) => {
              const isActive = location.pathname === route.path || (location.pathname === '/miora-government' && route.path.includes('/miora-government'));
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-blue-800 text-white border border-blue-600' 
                      : 'text-blue-300 hover:text-white hover:bg-blue-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => {
                    console.log('Government Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-blue-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Security & Hacking Section */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                🔴 Security & Hacking
              </h3>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs animate-pulse">
                CRITICAL SECURITY
              </Badge>
            </div>
          )}
          
          <div className="space-y-1">
            {securityRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-red-800 text-white border border-red-600' 
                      : 'text-red-300 hover:text-white hover:bg-red-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'} animate-pulse`}
                  onClick={() => {
                    console.log('Security Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${route.color}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{route.name}</span>
                        <Badge className={`text-xs px-1 py-0 ${getPriorityBadge(route.priority)}`}>
                          {route.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* System Tools & More Pages */}
        <div className="p-4 border-t border-slate-700">
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-slate-500 mb-3">⚙️ System Tools & Additional Pages</h3>
          )}
          
          <div className="space-y-1">
            {[
              ...systemRoutes,
              { path: '/system-check', name: 'System Check', icon: Settings, description: 'Complete System Validation' },
              { path: '/miora-infinity-dashboard', name: 'MIORA Infinity Dashboard', icon: Infinity, description: 'Infinity Mode Control Panel' },
              { path: '/development', name: 'Development Center', icon: Code, description: 'Development Environment' },
              { path: '/security-center', name: 'Security Center', icon: Shield, description: 'Security Management Hub' },
              { path: '/innovation-lab', name: 'Innovation Lab', icon: Target, description: 'Innovation & Research Lab' },
              { path: '/analytics', name: 'Analytics Dashboard', icon: Activity, description: 'Performance Analytics' },
              { path: '/voice-interface', name: 'Voice Interface', icon: Globe, description: 'Voice Command Interface' },
              { path: '/voice-engine-2', name: 'Voice Engine V2', icon: Globe, description: 'Advanced Voice Engine' },
              { path: '/miora-autonomous-evolution', name: 'Autonomous Evolution', icon: Zap, description: 'Evolution Management' },
              { path: '/miora-autonomous-decision-engine', name: 'Decision Engine', icon: Brain, description: 'Autonomous Decision System' },
              { path: '/miora-autonomous-resource-allocation', name: 'Resource Allocation', icon: Database, description: 'Resource Management' },
              { path: '/strategic-planning-engine', name: 'Strategic Planning', icon: Target, description: 'Strategic Planning Engine' },
              { path: '/dynamic-menu-generator', name: 'Dynamic Menu Generator', icon: Wrench, description: 'Dynamic Menu Creation' },
              { path: '/self-monitoring', name: 'Self-Monitoring', icon: Activity, description: 'System Self-Monitoring' },
              { path: '/miora-optimization', name: 'MIORA Optimization', icon: Zap, description: 'System Optimization Engine' },
              { path: '/system-implementation', name: 'System Implementation', icon: Settings, description: 'Implementation Manager' },
              { path: '/dashboard', name: 'Main Dashboard', icon: Grid3X3, description: 'Main Control Dashboard' },
              { path: '/chat', name: 'AI Chat Interface', icon: Globe, description: 'AI Communication Hub' }
            ].map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;
              
              return (
                <Button
                  key={route.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-slate-800 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => {
                    console.log('System Tools Sidebar: Navigating to:', route.path);
                    navigate(route.path);
                  }}
                >
                  <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <span className="text-sm">{route.name}</span>
                      <p className="text-xs text-slate-400 mt-1">{route.description}</p>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="absolute bottom-4 left-4 right-4">
        {!isCollapsed && (
          <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">System Status</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-green-400">ONLINE</span>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              MIORA INFINITY AI v∞.0.1
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
