
import { 
  Brain, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Lightbulb, 
  Target,
  GraduationCap
} from 'lucide-react';
import { NavItem } from '../types';

export const learningItems: NavItem[] = [
  {
    title: 'Learning Center',
    url: '/learning',
    icon: GraduationCap,
    description: 'MIORA Learning Hub',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Intelligence Hub',
    url: '/intelligence-hub',
    icon: Brain,
    description: 'Central intelligence',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Background Learning',
    url: '/background-learning',
    icon: BookOpen,
    description: 'Continuous learning',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Auto Daily Learning',
    url: '/auto-daily-learning',
    icon: Calendar,
    description: 'Daily learning automation',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Knowledge Discovery',
    url: '/knowledge-discovery',
    icon: TrendingUp,
    description: 'Knowledge exploration',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Innovation Lab',
    url: '/innovation-lab',
    icon: Lightbulb,
    description: 'Experimental features',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Engine Performance',
    url: '/engine-performance',
    icon: Target,
    description: 'Performance optimization',
    status: 'active',
    systemHealth: 'excellent'
  }
];
