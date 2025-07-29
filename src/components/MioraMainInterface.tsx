
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  GraduationCap,
  Zap,
  Home,
  Monitor,
  Mic,
  Bot,
  Infinity,
  FileText,
  Code,
  Network,
  Cpu,
  Database,
  Shield,
  Rocket,
  Target,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Cog,
  Eye,
  Lock,
  Terminal,
  Activity,
  Wrench,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  Star,
  Users,
  Globe,
  Smartphone,
  Cloud,
  Heart,
  Search,
  Filter,
  Download,
  Upload,
  Play,
  Pause,
  RefreshCw,
  Power,
  Wifi,
  Battery,
  Volume2,
  Camera,
  Video
} from 'lucide-react';

interface MenuCategory {
  title: string;
  description: string;
  items: MenuItem[];
  color: string;
  icon: React.ComponentType<any>;
  status: 'active' | 'enhanced' | 'premium';
}

interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  status: 'active' | 'beta' | 'coming-soon' | 'premium';
  features?: string[];
  performance?: 'excellent' | 'good' | 'optimal';
}

const MioraMainInterface: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('core');

  const menuCategories: Record<string, MenuCategory> = {
    core: {
      title: 'Core Systems',
      description: 'Fundamental MIORA operations with enhanced AI capabilities',
      color: 'from-blue-600 to-cyan-600',
      icon: Brain,
      status: 'enhanced',
      items: [
        {
          title: 'Main Dashboard',
          description: 'Central command and comprehensive system overview',
          icon: Home,
          path: '/',
          status: 'active',
          features: ['Real-time Monitoring', 'Voice Control', 'Quick Actions', 'System Health', 'AI Assistant'],
          performance: 'excellent'
        },
        {
          title: 'MIORA Core Engine',
          description: 'Central AI processing and system control hub',
          icon: Brain,
          path: '/miora',
          status: 'active',
          features: ['AI Processing', 'Core Functions', 'System Control', 'Integration Hub', 'Neural Networks'],
          performance: 'excellent'
        },
        {
          title: 'Voice Assistant Pro',
          description: 'Advanced speech interaction with neural enhancement',
          icon: Mic,
          path: '/voice',
          status: 'active',
          features: ['Speech Recognition', 'Natural TTS', 'Voice Commands', 'Conversation Memory', 'Multi-language'],
          performance: 'excellent'
        },
        {
          title: 'Chat Intelligence',
          description: 'Smart conversation system with context awareness',
          icon: MessageCircle,
          path: '/chat',
          status: 'active',
          features: ['Smart Responses', 'Context Memory', 'Multi-modal Chat', 'Learning Integration', 'Emotion AI'],
          performance: 'excellent'
        },
        {
          title: 'Live Auto-Repair',
          description: 'Real-time system monitoring and autonomous repair',
          icon: Wrench,
          path: '/miora-live-auto-repair',
          status: 'active',
          features: ['24/7 Monitoring', 'Auto Error Fix', 'System Health', 'Real-time Recovery', 'Predictive Maintenance'],
          performance: 'excellent'
        }
      ]
    },
    learning: {
      title: 'Learning Systems',
      description: 'Advanced AI learning, memory, and knowledge management',
      color: 'from-green-600 to-emerald-600',
      icon: GraduationCap,
      status: 'enhanced',
      items: [
        {
          title: 'Learning Hub Pro',
          description: 'Comprehensive learning center with AI tutoring',
          icon: BookOpen,
          path: '/learning',
          status: 'active',
          features: ['Personalized Learning', 'AI Tutoring', 'Progress Tracking', 'Skill Assessment', 'Adaptive AI'],
          performance: 'excellent'
        },
        {
          title: 'Auto Daily Learning',
          description: 'Automated daily learning and skill development',
          icon: Target,
          path: '/auto-daily-learning',
          status: 'active',
          features: ['Daily Challenges', 'Auto Scheduling', 'Progress Analytics', 'Adaptive Difficulty', 'Smart Goals'],
          performance: 'excellent'
        },
        {
          title: 'Background Learning AI',
          description: 'Continuous autonomous learning and knowledge acquisition',
          icon: Activity,
          path: '/background-learning',
          status: 'active',
          features: ['Passive Learning', 'Knowledge Extraction', 'Pattern Recognition', 'Auto Documentation', '24/7 Learning'],
          performance: 'excellent'
        },
        {
          title: 'Long Memory System',
          description: 'Advanced memory management and conversation history',
          icon: Database,
          path: '/long-memory-system',
          status: 'active',
          features: ['Persistent Memory', 'Context Retention', 'Pattern Analysis', 'Smart Recall', 'Memory Evolution'],
          performance: 'excellent'
        },
        {
          title: 'Neural Network',
          description: 'Deep learning processing and neural optimization',
          icon: Network,
          path: '/neural',
          status: 'active',
          features: ['Pattern Recognition', 'Deep Analysis', 'Neural Training', 'Model Optimization', 'AI Enhancement'],
          performance: 'excellent'
        }
      ]
    },
    development: {
      title: 'Development Suite',
      description: 'Advanced development tools and AI-powered coding environments',
      color: 'from-purple-600 to-pink-600',
      icon: Code,
      status: 'enhanced',
      items: [
        {
          title: 'MIORA Develop Pro',
          description: 'Advanced development environment with AI assistance',
          icon: Code,
          path: '/miora-develop',
          status: 'active',
          features: ['AI-powered Coding', 'Smart Debugging', 'Real-time Collaboration', 'Code Optimization', 'Auto Testing'],
          performance: 'excellent'
        },
        {
          title: 'AutoCode Engine',
          description: 'Intelligent code generation and automation system',
          icon: Bot,
          path: '/autocode',
          status: 'active',
          features: ['AI Code Generation', 'Bug Detection', 'Code Completion', 'Best Practices', 'Auto Documentation'],
          performance: 'excellent'
        },
        {
          title: 'App Builder Pro',
          description: 'Visual application development with AI assistance',
          icon: Rocket,
          path: '/app-builder',
          status: 'active',
          features: ['Drag & Drop Builder', 'Component Library', 'Live Preview', 'Auto Deployment', 'AI Templates'],
          performance: 'excellent'
        },
        {
          title: 'Smart Terminal',
          description: 'Advanced terminal with integrated AI assistance',
          icon: Terminal,
          path: '/terminal',
          status: 'active',
          features: ['Smart Commands', 'AI Assistance', 'Git Integration', 'Project Management', 'Auto Completion'],
          performance: 'excellent'
        },
        {
          title: 'System Monitor Pro',
          description: 'Development environment and performance monitoring',
          icon: Monitor,
          path: '/monitor',
          status: 'active',
          features: ['Performance Metrics', 'Resource Usage', 'Health Checks', 'Alert System', 'AI Analytics'],
          performance: 'excellent'
        }
      ]
    },
    intelligence: {
      title: 'Intelligence Center',
      description: 'AI intelligence, analytics, and advanced processing systems',
      color: 'from-cyan-600 to-blue-600',
      icon: Eye,
      status: 'enhanced',
      items: [
        {
          title: 'Intelligence Reports',
          description: 'AI behavior analysis and comprehensive insights',
          icon: Target,
          path: '/intelligence-reports',
          status: 'active',
          features: ['Behavior Analysis', 'Learning Patterns', 'Performance Metrics', 'Smart Recommendations', 'AI Insights'],
          performance: 'excellent'
        },
        {
          title: 'Intelligence Hub',
          description: 'Central intelligence processing and analysis',
          icon: Brain,
          path: '/intelligence-hub',
          status: 'active',
          features: ['Data Intelligence', 'Pattern Analysis', 'Predictive Models', 'Smart Analytics', 'AI Processing'],
          performance: 'excellent'
        },
        {
          title: 'Quantum Neural',
          description: 'Quantum-enhanced neural processing and computing',
          icon: Cpu,
          path: '/quantum-neural',
          status: 'active',
          features: ['Quantum Algorithms', 'Advanced Processing', 'Multi-dimensional Analysis', 'Enhanced Learning', 'Neural Boost'],
          performance: 'excellent'
        },
        {
          title: 'AI Performance Engine',
          description: 'AI engine performance optimization and tuning',
          icon: Zap,
          path: '/engine-performance',
          status: 'active',
          features: ['Engine Metrics', 'Performance Tuning', 'Resource Monitoring', 'Optimization Suggestions', 'Speed Boost'],
          performance: 'excellent'
        }
      ]
    },
    analytics: {
      title: 'Analytics & Data',
      description: 'Advanced analytics, data processing, and business intelligence',
      color: 'from-orange-600 to-red-600',
      icon: BarChart3,
      status: 'enhanced',
      items: [
        {
          title: 'Analytics Dashboard',
          description: 'Advanced performance analytics and insights',
          icon: BarChart3,
          path: '/analytics',
          status: 'active',
          features: ['Real-time Metrics', 'Predictive Analysis', 'Custom Reports', 'Data Visualization', 'AI Insights'],
          performance: 'excellent'
        },
        {
          title: 'Data Analytics Pro',
          description: 'Advanced data processing and predictive insights',
          icon: TrendingUp,
          path: '/data-analytics',
          status: 'active',
          features: ['Big Data Processing', 'Statistical Analysis', 'Predictive Modeling', 'Real-time Insights', 'AI Analytics'],
          performance: 'excellent'
        },
        {
          title: 'Business Intelligence',
          description: 'Smart business analytics and decision support',
          icon: Star,
          path: '/business-intelligence',
          status: 'active',
          features: ['Business Metrics', 'Decision Support', 'Strategic Analysis', 'Performance KPIs', 'Smart Reports'],
          performance: 'excellent'
        },
        {
          title: 'System Diagnostics',
          description: 'Comprehensive system health and performance analysis',
          icon: Activity,
          path: '/diagnostics',
          status: 'active',
          features: ['Health Checks', 'Performance Analysis', 'Error Diagnosis', 'System Optimization', 'AI Diagnostics'],
          performance: 'excellent'
        }
      ]
    },
    advanced: {
      title: 'Advanced Systems',
      description: 'Cutting-edge technology, quantum computing, and future systems',
      color: 'from-pink-600 to-purple-600',
      icon: Lightbulb,
      status: 'premium',
      items: [
        {
          title: 'Innovation Lab',
          description: 'Experimental features and advanced technology testing',
          icon: Lightbulb,
          path: '/innovation-lab',
          status: 'active',
          features: ['Experimental Features', 'Performance Boosters', 'AI Experiments', 'Future Technology', 'Beta Testing'],
          performance: 'excellent'
        },
        {
          title: 'Infinity Core',
          description: 'Quantum-enhanced unlimited processing system',
          icon: Infinity,
          path: '/infinity-core',
          status: 'active',
          features: ['Quantum Processing', 'Unlimited Resources', 'Advanced AI', 'Infinite Scaling', 'Neural Boost'],
          performance: 'excellent'
        },
        {
          title: 'Quantum Core',
          description: 'Advanced quantum computing integration',
          icon: Zap,
          path: '/quantum-core',
          status: 'active',
          features: ['Quantum Computing', 'Enhanced Algorithms', 'Parallel Processing', 'Speed Optimization', 'Neural Enhancement'],
          performance: 'excellent'
        },
        {
          title: 'Security Center Pro',
          description: 'Comprehensive security management and protection',
          icon: Shield,
          path: '/security-center',
          status: 'active',
          features: ['Advanced Security', 'Threat Detection', 'Data Protection', 'Privacy Controls', 'AI Security'],
          performance: 'excellent'
        }
      ]
    },
    system: {
      title: 'System Management',
      description: 'Configuration, administration, and comprehensive system control',
      color: 'from-gray-600 to-slate-600',
      icon: Settings,
      status: 'enhanced',
      items: [
        {
          title: 'General Settings',
          description: 'Main system configuration and user preferences',
          icon: Cog,
          path: '/settings',
          status: 'active',
          features: ['User Preferences', 'AI Configuration', 'Interface Settings', 'Notification Controls', 'System Tuning'],
          performance: 'excellent'
        },
        {
          title: 'System Configuration',
          description: 'Advanced system and performance optimization',
          icon: Cpu,
          path: '/system-config',
          status: 'active',
          features: ['Performance Tuning', 'Resource Management', 'System Optimization', 'Advanced Settings', 'AI Optimization'],
          performance: 'excellent'
        },
        {
          title: 'Database Manager Pro',
          description: 'Advanced database management and optimization',
          icon: Database,
          path: '/database',
          status: 'active',
          features: ['Query Builder', 'Schema Design', 'Data Migration', 'Performance Tuning', 'AI Analytics'],
          performance: 'excellent'
        },
        {
          title: 'Network Manager',
          description: 'Network configuration and connectivity management',
          icon: Network,
          path: '/network-manager',
          status: 'active',
          features: ['Network Settings', 'Connectivity Management', 'Bandwidth Control', 'Connection Monitoring', 'AI Optimization'],
          performance: 'excellent'
        },
        {
          title: 'Storage Manager',
          description: 'Data storage, backup, and file management',
          icon: HardDrive,
          path: '/storage-manager',
          status: 'active',
          features: ['Storage Analytics', 'Backup Management', 'Data Organization', 'Cleanup Tools', 'AI Organization'],
          performance: 'excellent'
        }
      ]
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-300 border-green-400/30 animate-pulse">Active</Badge>;
      case 'beta':
        return <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">Beta</Badge>;
      case 'premium':
        return <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Premium</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-500/20 text-gray-300 border-gray-400/30">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const getCategoryStatusBadge = (status: string) => {
    switch (status) {
      case 'enhanced':
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Enhanced</Badge>;
      case 'premium':
        return <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Premium</Badge>;
      case 'active':
        return <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Active</Badge>;
      default:
        return null;
    }
  };

  const getPerformanceBadge = (performance?: string) => {
    if (!performance) return null;
    switch (performance) {
      case 'excellent':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'good':
        return <CheckCircle className="w-3 h-3 text-blue-400" />;
      case 'optimal':
        return <Star className="w-3 h-3 text-yellow-400" />;
      default:
        return null;
    }
  };

  const handleMenuClick = (path: string, status: string) => {
    if (status === 'coming-soon') {
      return;
    }
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const totalActiveModules = Object.values(menuCategories).reduce((acc, cat) => 
    acc + cat.items.filter(item => item.status === 'active').length, 0
  );

  const totalModules = Object.values(menuCategories).reduce((acc, cat) => 
    acc + cat.items.length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MIORA Enhanced Development Center
          </h1>
          <p className="text-gray-300 text-xl mb-4">
            Comprehensive AI Assistant Platform - Enhanced Edition with Maximum Functionality
          </p>
          <div className="flex justify-center gap-3 mb-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30 animate-pulse">
              All Systems Active
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
              Enhanced Performance
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              AI Optimized
            </Badge>
          </div>
          <div className="text-sm text-gray-400">
            Active System Ready
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Category Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-purple-500/30 backdrop-blur-sm sticky top-4">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Active Categories
                </CardTitle>
                <p className="text-sm text-gray-400">
                  Enhanced Categories • All Systems Online
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="default"
                    className="w-full justify-start transition-all duration-200 group bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105 border border-white/20"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="p-1 rounded transition-all group-hover:scale-110 bg-white/20">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">Core Systems</div>
                          <div className="text-xs opacity-70">5 active</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Enhanced</Badge>
                        <Badge variant="outline" className="text-xs">5/5</Badge>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        Core Systems
                      </h2>
                      <p className="text-gray-300">
                        Fundamental MIORA operations with enhanced AI capabilities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Enhanced</Badge>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30">5 Active</Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">5 Total</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <Card className="bg-gray-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:scale-110 transition-transform">
                          <Home className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-sm flex items-center gap-2">
                            Main Dashboard
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          </CardTitle>
                          <p className="text-xs text-gray-400 mt-1">Central command and comprehensive system overview</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30 animate-pulse">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs text-cyan-300 font-medium">Enhanced Features:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors">
                          Real-time Monitoring
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors">
                          Voice Control
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors">
                          Quick Actions
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-300 flex items-center justify-center gap-1">
                <CheckCircle className="w-5 h-5" />
                35
              </div>
              <div className="text-sm text-green-200">Active Modules</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-300 flex items-center justify-center gap-1">
                <Eye className="w-5 h-5" />
                7
              </div>
              <div className="text-sm text-blue-200">Categories</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-300 flex items-center justify-center gap-1">
                <Infinity className="w-5 h-5" />
                ∞
              </div>
              <div className="text-sm text-purple-200">Possibilities</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-300 flex items-center justify-center gap-1">
                <Zap className="w-5 h-5" />
                v4.0
              </div>
              <div className="text-sm text-cyan-200">Enhanced Version</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-300 flex items-center justify-center gap-1">
                <Heart className="w-5 h-5" />
                24/7
              </div>
              <div className="text-sm text-red-200">Auto Repair</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-300 flex items-center justify-center gap-1">
                <Brain className="w-5 h-5" />
                AI
              </div>
              <div className="text-sm text-pink-200">Superintelligence</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-300 flex items-center justify-center gap-1">
                <Star className="w-5 h-5" />
                ⚡
              </div>
              <div className="text-sm text-yellow-200">Quantum Ready</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-300 flex items-center justify-center gap-1">
                <Rocket className="w-5 h-5" />
                100%
              </div>
              <div className="text-sm text-orange-200">Performance</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MioraMainInterface;
