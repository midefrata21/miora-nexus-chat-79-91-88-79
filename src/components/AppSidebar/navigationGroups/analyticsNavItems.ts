
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Target, 
  Gauge 
} from 'lucide-react';
import { NavItem } from '../types';

export const analyticsItems: NavItem[] = [
  {
    title: 'System Analytics',
    url: '/analytics',
    icon: BarChart3,
    description: 'Core system metrics',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Data Analytics',
    url: '/data-analytics',
    icon: TrendingUp,
    description: 'Advanced data analysis',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Data Visualization',
    url: '/data-visualization',
    icon: PieChart,
    description: 'Visual data representation',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Performance Monitor',
    url: '/engine-performance',
    icon: Activity,
    description: 'Real-time performance',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Intelligence Reports',
    url: '/intelligence-reports',
    icon: Target,
    description: 'AI-generated reports',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'System Diagnostics',
    url: '/diagnostics',
    icon: Gauge,
    description: 'System health analysis',
    status: 'active',
    systemHealth: 'excellent'
  }
];
