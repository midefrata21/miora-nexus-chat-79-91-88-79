import { 
  Brain, 
  Home, 
  BarChart3, 
  MessageCircle, 
  GraduationCap,
  Settings,
  Infinity,
  Code,
  Shield,
  Lightbulb,
  Activity,
  Mic,
  Headphones,
  LineChart,
  TrendingUp,
  Target,
  BookOpen,
  Aperture
} from 'lucide-react';
import { NavigationCategory } from './types';

export const navigationCategories: NavigationCategory[] = [
  { 
    id: 'home',
    name: 'Home', 
    path: '/', 
    icon: Home,
    color: 'from-blue-600 to-cyan-600'
  },
  { 
    id: 'core',
    name: 'MIORA Core', 
    path: '/miora', 
    icon: Brain,
    color: 'from-purple-600 to-pink-600'
  },
  { 
    id: 'trading',
    name: 'Trading Core', 
    path: '/miora-core-v2', 
    icon: LineChart,
    color: 'from-orange-600 to-yellow-600'
  },
  { 
    id: 'crypto-scalping',
    name: 'Crypto Scalping', 
    path: '/crypto-scalping-signals', 
    icon: TrendingUp,
    color: 'from-green-600 to-emerald-600'
  },
  { 
    id: 'dashboard',
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: BarChart3,
    color: 'from-green-600 to-emerald-600'
  },
  { 
    id: 'chat',
    name: 'Chat', 
    path: '/chat', 
    icon: MessageCircle,
    color: 'from-orange-600 to-red-600'
  },
  { 
    id: 'learning',
    name: '🎓 Learning Hub', 
    path: '/learning', 
    icon: GraduationCap,
    color: 'from-indigo-600 to-purple-600'
  },
  { 
    id: 'intelligence',
    name: '🧠 Intelligence', 
    path: '/intelligencehub', 
    icon: Target,
    color: 'from-cyan-600 to-blue-600'
  },
  { 
    id: 'knowledge',
    name: '📚 Knowledge Discovery', 
    path: '/knowledge-discovery', 
    icon: BookOpen,
    color: 'from-emerald-600 to-teal-600'
  },
  { 
    id: 'infinity',
    name: 'Infinity', 
    path: '/miora-infinity-dashboard', 
    icon: Infinity,
    color: 'from-pink-600 to-purple-600'
  },
  { 
    id: 'development',
    name: 'Development', 
    path: '/development', 
    icon: Code,
    color: 'from-cyan-600 to-blue-600'
  },
  { 
    id: 'security',
    name: 'Security', 
    path: '/security-center', 
    icon: Shield,
    color: 'from-red-600 to-orange-600'
  },
  { 
    id: 'innovation',
    name: 'Innovation', 
    path: '/innovation-lab', 
    icon: Lightbulb,
    color: 'from-yellow-600 to-orange-600'
  },
  { 
    id: 'analytics',
    name: 'Analytics', 
    path: '/analytics', 
    icon: Activity,
    color: 'from-teal-600 to-green-600'
  },
  { 
    id: 'ai-comparison',
    name: '🤖 AI Comparison', 
    path: '/ai-comparison', 
    icon: Aperture,
    color: 'from-purple-600 to-blue-600'
  },
  { 
    id: 'quantum-learning',
    name: '🧬 Quantum Learning', 
    path: '/quantum-comparative-learning', 
    icon: Brain,
    color: 'from-cyan-600 to-purple-600'
  },
  { 
    id: 'voice-engine',
    name: 'Voice Engine 2.0', 
    path: '/voice-engine-2', 
    icon: Brain,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'voice-audio',
    name: 'Voice & Audio', 
    path: '/voice-interface', 
    icon: Headphones,
    color: 'from-cyan-600 to-purple-600'
  },
  { 
    id: 'autonomous-evolution',
    name: '🤖 Autonomous Evolution', 
    path: '/miora-autonomous-evolution', 
    icon: Infinity,
    color: 'from-purple-600 to-pink-600'
  },
  { 
    id: 'hacker-master',
    name: '🔴 MIORA Hacker Master', 
    path: '/miora-hacker-master', 
    icon: Shield,
    color: 'from-red-600 to-orange-600'
  },
  { 
    id: 'infinity-access',
    name: '🔒 MIORA Infinity Access', 
    path: '/miora-infinity-access', 
    icon: Infinity,
    color: 'from-purple-600 to-indigo-600'
  },
  { 
    id: 'advanced-ai',
    name: '🚀 MIORA Advanced AI', 
    path: '/miora-advanced-ai', 
    icon: Brain,
    color: 'from-purple-600 to-pink-600'
  },
  { 
    id: 'government',
    name: '🏛️ MIORA Government', 
    path: '/miora-government', 
    icon: Activity,
    color: 'from-blue-600 to-indigo-600'
  },
  { 
    id: 'whitepaper',
    name: '📄 MIORA White Paper', 
    path: '/miora-whitepaper', 
    icon: BookOpen,
    color: 'from-slate-600 to-gray-600'
  }
];