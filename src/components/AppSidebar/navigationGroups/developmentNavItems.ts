
import { Code, GitBranch, Wrench, Brain, Cpu, Shield } from 'lucide-react';
import { NavItem } from '../types';

export const developmentItems: NavItem[] = [
  {
    title: 'MIORA Hacker Master',
    url: '/miora-hacker-master',
    icon: Shield,
    status: 'active',
    description: 'Advanced cybersecurity and hacking tools interface',
    systemHealth: 'excellent'
  },
  {
    title: 'MIORA Autonomous Developer',
    url: '/miora-autonomous-developer',
    icon: Brain,
    status: 'active',
    description: 'Fully autonomous AI development system - zero manual intervention',
    systemHealth: 'excellent'
  },
  {
    title: 'Self-Developing Framework',
    url: '/self-developing-framework',
    icon: Cpu,
    status: 'active',
    description: 'Self-modifying and evolving framework system',
    systemHealth: 'excellent'
  },
  {
    title: 'Development Tools',
    url: '/development',
    icon: Code,
    status: 'active',
    description: 'Code development and management tools',
    systemHealth: 'excellent'
  },
  {
    title: 'Version Control',
    url: '/version-control',
    icon: GitBranch,
    status: 'active',
    description: 'Git integration and version management',
    systemHealth: 'excellent'
  },
  {
    title: 'System Tools',
    url: '/system-tools',
    icon: Wrench,
    status: 'active',
    description: 'Advanced system utilities and tools',
    systemHealth: 'excellent'
  }
];
