
import { 
  Brain, 
  FileSearch, 
  TrendingUp, 
  BarChart2, 
  Eye, 
  Zap,
  GitCompare,
  Bot
} from 'lucide-react';
import { NavItem } from '../types';

export const intelligenceItems: NavItem[] = [
  {
    title: 'Intelligence Hub',
    url: '/intelligence-hub',
    icon: Brain,
    description: 'Central AI intelligence',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'AI Comparison',
    url: '/ai-comparison',
    icon: GitCompare,
    description: 'MIORA vs GPT vs Gemini',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Quantum Comparative Learning',
    url: '/quantum-comparative-learning',
    icon: Bot,
    description: 'AI Mirror Learning dari ChatGPT, Gemini, Claude',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Knowledge Discovery',
    url: '/knowledge-discovery',
    icon: FileSearch,
    description: 'Intelligent knowledge mining',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Intelligence Reports',
    url: '/intelligence-reports',
    icon: TrendingUp,
    description: 'AI-generated insights',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Data Analytics',
    url: '/data-analytics',
    icon: BarChart2,
    description: 'Advanced data analysis',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Data Visualization',
    url: '/data-visualization',
    icon: Eye,
    description: 'Interactive data viz',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Performance Intelligence',
    url: '/engine-performance',
    icon: Zap,
    description: 'AI performance optimization',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Advanced Capabilities',
    url: '/advanced-capabilities',
    icon: Brain,
    description: 'Quantum reasoning & meta-learning systems',
    status: 'active',
    systemHealth: 'excellent'
  }
];
