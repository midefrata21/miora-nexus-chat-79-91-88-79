import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  MessageCircle, 
  GraduationCap, 
  BarChart3, 
  Code, 
  Zap, 
  Settings,
  Infinity,
  Shield,
  Bot,
  Mic,
  Eye,
  Target,
  Database,
  Network,
  Cpu,
  Monitor,
  Terminal,
  Rocket,
  Sparkles,
  Activity,
  CheckCircle,
  Clock,
  Star,
  ChevronDown
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  status: 'active' | 'beta' | 'premium' | 'coming-soon';
  version: string;
  features: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  items: CategoryItem[];
  totalFeatures: number;
}

export const MIORAEnhancedCategoryMenu: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('core');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'core',
      title: 'MIORA Core Systems',
      description: 'Sistem inti MIORA dengan kemampuan AI fundamental',
      icon: Brain,
      gradient: 'from-blue-600 via-purple-600 to-cyan-600',
      totalFeatures: 45,
      items: [
        {
          id: 'miora-core',
          title: 'MIORA Core Engine',
          description: 'Mesin AI utama dengan neural processing tingkat tinggi',
          icon: Brain,
          path: '/miora',
          status: 'active',
          version: 'v4.0',
          features: ['Neural Processing', 'Deep Learning', 'Auto-Optimization', 'Real-time Analysis'],
          difficulty: 'intermediate'
        },
        {
          id: 'dashboard',
          title: 'Enhanced Dashboard',
          description: 'Dashboard komprehensif dengan monitoring real-time',
          icon: Monitor,
          path: '/dashboard',
          status: 'active',
          version: 'v4.0',
          features: ['Real-time Monitoring', 'Advanced Analytics', 'Custom Widgets', 'Voice Control'],
          difficulty: 'beginner'
        },
        {
          id: 'voice-system',
          title: 'Advanced Voice System',
          description: 'Sistem suara canggih dengan AI speech processing',
          icon: Mic,
          path: '/voice-diagnostics',
          status: 'active',
          version: 'v4.0',
          features: ['Speech Recognition', 'Natural TTS', 'Voice Commands', 'Multi-language'],
          difficulty: 'intermediate'
        },
        {
          id: 'chat-intelligence',
          title: 'Chat Intelligence Pro',
          description: 'Sistem percakapan pintar dengan context awareness',
          icon: MessageCircle,
          path: '/chat',
          status: 'active',
          version: 'v4.0',
          features: ['Smart Responses', 'Context Memory', 'Multi-modal Chat', 'Emotion Detection'],
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: 'infinity',
      title: 'MIORA Infinity Systems',
      description: 'Sistem infinite processing dengan quantum enhancement',
      icon: Infinity,
      gradient: 'from-purple-600 via-pink-600 to-indigo-600',
      totalFeatures: 38,
      items: [
        {
          id: 'infinity-core',
          title: 'Infinity Core Engine',
          description: 'Quantum-enhanced processing dengan kapasitas unlimited',
          icon: Infinity,
          path: '/miora-infinity-dashboard',
          status: 'active',
          version: 'v4.0',
          features: ['Quantum Computing', 'Unlimited Processing', 'Self-scaling', 'Advanced AI'],
          difficulty: 'expert'
        },
        {
          id: 'infinity-ai',
          title: 'Infinity AI System',
          description: 'AI system dengan pembelajaran otomatis tanpa batas',
          icon: Bot,
          path: '/miora-infinity-ai',
          status: 'active',
          version: 'v4.0',
          features: ['Autonomous Learning', 'Self-improvement', 'Infinite Memory', 'Evolution Engine'],
          difficulty: 'expert'
        },
        {
          id: 'evolution-engine',
          title: 'Evolution Engine',
          description: 'Sistem evolusi otomatis untuk upgrade berkelanjutan',
          icon: Zap,
          path: '/miora-evolution',
          status: 'active',
          version: 'v4.0',
          features: ['Self-evolution', 'Auto-upgrade', 'Continuous Learning', 'Performance Boost'],
          difficulty: 'advanced'
        },
        {
          id: 'quantum-upgrade',
          title: 'Quantum Upgrade System',
          description: 'Sistem upgrade quantum untuk performa maksimal',
          icon: Rocket,
          path: '/quantum-upgrade',
          status: 'beta',
          version: 'v4.0-beta',
          features: ['Quantum Enhancement', 'Performance Multiplier', 'Advanced Algorithms', 'Speed Boost'],
          difficulty: 'expert'
        }
      ]
    },
    {
      id: 'learning',
      title: 'Advanced Learning Hub',
      description: 'Pusat pembelajaran AI dengan personalisasi tingkat tinggi',
      icon: GraduationCap,
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      totalFeatures: 32,
      items: [
        {
          id: 'learning-hub',
          title: 'Smart Learning Hub',
          description: 'Pusat pembelajaran dengan AI tutor dan adaptive learning',
          icon: GraduationCap,
          path: '/learning',
          status: 'active',
          version: 'v4.0',
          features: ['AI Tutoring', 'Adaptive Learning', 'Progress Tracking', 'Personalized Path'],
          difficulty: 'beginner'
        },
        {
          id: 'skill-assessment',
          title: 'AI Skill Assessment',
          description: 'Evaluasi kemampuan otomatis dengan sertifikasi digital',
          icon: Target,
          path: '/skill-assessment',
          status: 'active',
          version: 'v4.0',
          features: ['Auto Assessment', 'Digital Certificates', 'Skill Mapping', 'Progress Analysis'],
          difficulty: 'intermediate'
        },
        {
          id: 'knowledge-base',
          title: 'Dynamic Knowledge Base',
          description: 'Database pengetahuan yang terus berkembang',
          icon: Database,
          path: '/knowledge-base',
          status: 'beta',
          version: 'v4.0-beta',
          features: ['Auto-updating', 'Smart Search', 'Context Awareness', 'Multi-format Support'],
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: 'development',
      title: 'AI Development Suite',
      description: 'Suite pengembangan AI dengan automated coding',
      icon: Code,
      gradient: 'from-orange-600 via-red-600 to-pink-600',
      totalFeatures: 28,
      items: [
        {
          id: 'auto-code',
          title: 'AutoCode Engine',
          description: 'Mesin coding otomatis dengan AI-powered development',
          icon: Code,
          path: '/autocode',
          status: 'active',
          version: 'v4.0',
          features: ['AI Code Generation', 'Auto Debugging', 'Smart Completion', 'Best Practices'],
          difficulty: 'advanced'
        },
        {
          id: 'app-builder',
          title: 'Intelligent App Builder',
          description: 'Pembuat aplikasi otomatis dengan visual interface',
          icon: Rocket,
          path: '/app-builder',
          status: 'active',
          version: 'v4.0',
          features: ['Visual Builder', 'Auto Deployment', 'Component Library', 'Live Preview'],
          difficulty: 'intermediate'
        },
        {
          id: 'dev-terminal',
          title: 'Smart Development Terminal',
          description: 'Terminal canggih dengan AI assistant terintegrasi',
          icon: Terminal,
          path: '/terminal',
          status: 'active',
          version: 'v4.0',
          features: ['AI Commands', 'Smart Suggestions', 'Auto Completion', 'Error Detection'],
          difficulty: 'advanced'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Intelligence Analytics',
      description: 'Analitik cerdas dengan predictive insights',
      icon: BarChart3,
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
      totalFeatures: 25,
      items: [
        {
          id: 'analytics-dashboard',
          title: 'Advanced Analytics Dashboard',
          description: 'Dashboard analitik dengan real-time insights',
          icon: BarChart3,
          path: '/analytics',
          status: 'active',
          version: 'v4.0',
          features: ['Real-time Analytics', 'Predictive Insights', 'Custom Reports', 'Data Visualization'],
          difficulty: 'intermediate'
        },
        {
          id: 'intelligence-reports',
          title: 'AI Intelligence Reports',
          description: 'Laporan kecerdasan AI dengan analisis mendalam',
          icon: Eye,
          path: '/intelligence-reports',
          status: 'active',
          version: 'v4.0',
          features: ['Behavior Analysis', 'Performance Metrics', 'Trend Prediction', 'Smart Insights'],
          difficulty: 'advanced'
        },
        {
          id: 'data-processor',
          title: 'Quantum Data Processor',
          description: 'Pemroses data quantum untuk analisis big data',
          icon: Cpu,
          path: '/data-processor',
          status: 'premium',
          version: 'v4.0-pro',
          features: ['Big Data Processing', 'Quantum Algorithms', 'Real-time Analysis', 'Pattern Recognition'],
          difficulty: 'expert'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Protection',
      description: 'Sistem keamanan tingkat enterprise dengan AI protection',
      icon: Shield,
      gradient: 'from-red-600 via-orange-600 to-yellow-600',
      totalFeatures: 22,
      items: [
        {
          id: 'security-center',
          title: 'AI Security Center',
          description: 'Pusat keamanan dengan threat detection otomatis',
          icon: Shield,
          path: '/security-center',
          status: 'active',
          version: 'v4.0',
          features: ['Threat Detection', 'Auto Protection', 'Security Analytics', 'Incident Response'],
          difficulty: 'advanced'
        },
        {
          id: 'privacy-control',
          title: 'Advanced Privacy Control',
          description: 'Kontrol privasi tingkat lanjut dengan enkripsi quantum',
          icon: Eye,
          path: '/privacy-control',
          status: 'active',
          version: 'v4.0',
          features: ['Quantum Encryption', 'Privacy Analytics', 'Access Control', 'Data Protection'],
          difficulty: 'advanced'
        }
      ]
    },
    {
      id: 'system',
      title: 'System Administration',
      description: 'Administrasi sistem dengan automated management',
      icon: Settings,
      gradient: 'from-gray-600 via-slate-600 to-zinc-600',
      totalFeatures: 18,
      items: [
        {
          id: 'system-config',
          title: 'Intelligent System Config',
          description: 'Konfigurasi sistem otomatis dengan optimization',
          icon: Settings,
          path: '/system-config',
          status: 'active',
          version: 'v4.0',
          features: ['Auto Configuration', 'Performance Tuning', 'System Optimization', 'Health Monitoring'],
          difficulty: 'advanced'
        },
        {
          id: 'diagnostics',
          title: 'Advanced System Diagnostics',
          description: 'Diagnostik sistem komprehensif dengan AI analysis',
          icon: Activity,
          path: '/diagnostics',
          status: 'active',
          version: 'v4.0',
          features: ['Health Checks', 'Performance Analysis', 'Error Diagnosis', 'Auto Repair'],
          difficulty: 'intermediate'
        },
        {
          id: 'network-manager',
          title: 'Smart Network Manager',
          description: 'Manajemen jaringan cerdas dengan auto-optimization',
          icon: Network,
          path: '/network-manager',
          status: 'active',
          version: 'v4.0',
          features: ['Network Optimization', 'Traffic Analysis', 'Auto Configuration', 'Security Monitoring'],
          difficulty: 'advanced'
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      active: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/40', label: 'Active' },
      beta: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/40', label: 'Beta' },
      premium: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40', label: 'Premium' },
      'coming-soon': { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/40', label: 'Soon' }
    };
    
    const config = configs[status as keyof typeof configs] || configs.active;
    return (
      <Badge className={`${config.bg} ${config.text} border ${config.border} font-semibold px-3 py-1`}>
        {config.label}
      </Badge>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'text-green-400',
      intermediate: 'text-blue-400',
      advanced: 'text-orange-400',
      expert: 'text-red-400'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  const handleItemClick = (item: CategoryItem) => {
    if (item.status === 'coming-soon') {
      toast({
        title: `${item.title} Coming Soon`,
        description: "Fitur ini sedang dalam pengembangan dan akan segera tersedia",
        duration: 3000,
      });
      return;
    }
    
    console.log(`Navigating to: ${item.path}`);
    navigate(item.path);
    
    toast({
      title: `🚀 Launching ${item.title}`,
      description: `Menjalankan ${item.title} ${item.version}`,
      duration: 2000,
    });
  };

  const filteredItems = categories.find(cat => cat.id === selectedCategory)?.items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  const totalActiveFeatures = categories.reduce((sum, cat) => sum + cat.totalFeatures, 0);
  const activeCategories = categories.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Fixed Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  MIORA AI Assistant
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-sm font-semibold">
                    v2.0 Enhanced
                  </Badge>
                  <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 text-sm font-semibold">
                    MIORA v4.0 Core
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">{activeCategories}</div>
                <div className="text-xs text-slate-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">{totalActiveFeatures}</div>
                <div className="text-xs text-slate-400">Features</div>
              </div>
            </div>
          </div>

          {/* Top Category Navigation */}
          <nav className="flex items-center justify-center">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl p-2 border border-slate-600/50">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.id;
                const isHovered = hoveredCategory === category.id;
                
                return (
                  <div key={category.id} className="relative">
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="font-medium text-sm">{category.title.split(' ')[0]}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {/* Dropdown Submenu */}
                    {(isHovered || isSelected) && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl shadow-2xl z-50"
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.gradient}`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-white">{category.title}</h3>
                              <p className="text-xs text-slate-400">{category.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {category.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <button
                                  key={item.id}
                                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 text-left group"
                                  onClick={() => handleItemClick(item)}
                                >
                                  <div className="p-2 rounded-lg bg-slate-600/50 group-hover:bg-slate-500/50">
                                    <ItemIcon className="w-4 h-4 text-slate-300 group-hover:text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-white text-sm">{item.title}</h4>
                                      {getStatusBadge(item.status)}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Search and Filter */}
        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-slate-600/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Cari fitur atau kategori..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'active', 'beta', 'premium'].map((status) => (
                  <Button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    variant={filterStatus === status ? "default" : "outline"}
                    className={filterStatus === status 
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white" 
                      : "border-slate-500 text-slate-300 hover:text-white"
                    }
                  >
                    {status === 'all' ? 'Semua' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Category Content */}
        {selectedCategory && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {categories.find(cat => cat.id === selectedCategory)?.title}
              </h2>
              <p className="text-slate-300 text-lg">
                {categories.find(cat => cat.id === selectedCategory)?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const IconComponent = item.icon;
                
                return (
                  <Card
                    key={item.id}
                    className="bg-gradient-to-br from-slate-800/70 to-slate-700/70 border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group"
                    onClick={() => handleItemClick(item)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                            <IconComponent className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg flex items-center gap-2">
                              {item.title}
                              {item.status === 'active' && <CheckCircle className="w-4 h-4 text-green-400" />}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs border-slate-500 text-slate-400">
                                {item.version}
                              </Badge>
                              <span className={`text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                                {item.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-purple-300">Fitur Unggulan:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {item.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-700/50">
                              <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                              <span className="text-xs text-slate-300 truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-700/50">
                        <Button 
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                          onClick={() => handleItemClick(item)}
                        >
                          Launch {item.title}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-slate-600/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span>System Status: Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Last Update: {new Date().toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>MIORA AI Assistant v2.0 - Enhanced Edition</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORAEnhancedCategoryMenu;
