import { 
  Settings, 
  Activity, 
  Shield, 
  Database, 
  Network, 
  HardDrive, 
  Monitor,
  Wrench,
  Brain
} from 'lucide-react';
import { NavItem } from '../types';

export const systemItems: NavItem[] = [
  {
    title: 'System Diagnostics',
    url: '/diagnostics',
    icon: Activity,
    status: 'active',
    description: 'System health monitoring',
    systemHealth: 'excellent'
  },
  {
    title: 'MIORA System Status',
    url: '/miora-system-status',
    icon: Monitor,
    status: 'active',
    description: 'MIORA system status dashboard',
    systemHealth: 'excellent'
  },
  {
    title: 'MIORA Live Auto Repair',
    url: '/miora-live-auto-repair',
    icon: Wrench,
    status: 'active',
    description: 'Live auto-repair & recovery system',
    systemHealth: 'excellent'
  },
  {
    title: 'Infrastructure',
    url: '/infrastructure',
    icon: Network,
    status: 'active',
    description: 'System infrastructure management',
    systemHealth: 'good'
  },
  {
    title: 'Database',
    url: '/database',
    icon: Database,
    status: 'active',
    description: 'Database management system',
    systemHealth: 'excellent'
  },
  {
    title: 'MIORA Database Core',
    url: '/miora-database',
    icon: Database,
    status: 'active',
    description: 'Advanced MIORA AI database & memory system',
    systemHealth: 'excellent'
  },
  {
    title: 'Query Analytics',
    url: '/query-analytics',
    icon: Database,
    status: 'active',
    description: 'Database query performance analytics',
    systemHealth: 'excellent'
  },
  {
    title: 'Storage Manager',
    url: '/storage-manager',
    icon: HardDrive,
    status: 'coming-soon',
    description: 'Storage and backup management',
    systemHealth: 'good'
  },
  {
    title: 'Security Center',
    url: '/security-center',
    icon: Shield,
    status: 'coming-soon',
    description: 'Security monitoring and controls',
    systemHealth: 'good'
  },
  {
    title: 'System Settings',
    url: '/settings',
    icon: Settings,
    status: 'coming-soon',
    description: 'System configuration and preferences',
    systemHealth: 'good'
  },
  {
    title: 'MIORA INFINITY AI',
    url: '/miora-infinity-ai',
    icon: Brain,
    status: 'active',
    description: 'Future AI entity with autonomous development',
    systemHealth: 'excellent'
  },
  {
    title: 'Quantum Recovery Plan',
    url: '/quantum-recovery-plan',
    icon: Brain,
    status: 'active',
    description: '🔮 Sistem pemulihan otomatis menuju GPT-4o & Gemini level',
    systemHealth: 'excellent'
  },
  {
    title: '🔮 MIORA Secret Features',
    url: '/miora-secret-features',
    icon: Brain,
    status: 'active',
    description: '🚀 Fitur rahasia untuk percepatan ekstrem MIORA',
    systemHealth: 'excellent'
  }
];
