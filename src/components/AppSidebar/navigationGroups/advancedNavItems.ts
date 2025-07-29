
import { 
  Atom, 
  Brain, 
  Infinity, 
  Zap, 
  Cpu, 
  Network,
  Layers,
  Workflow,
  Command
} from 'lucide-react';
import { NavItem } from '../types';

export const advancedItems: NavItem[] = [
  {
    title: 'Quantum Core',
    url: '/quantum-core',
    icon: Atom,
    description: 'Quantum Computing Engine',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Quantum Neural',
    url: '/quantum-neural',
    icon: Brain,
    description: 'Quantum Neural Networks',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Neural Architecture',
    url: '/neural',
    icon: Network,
    description: 'Advanced Neural Systems',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Infinity Core',
    url: '/infinity-core',
    icon: Infinity,
    description: 'Unlimited Processing Core',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Infinity Upgrade Loop',
    url: '/infinity-upgrade-loop',
    icon: Zap,
    description: 'Continuous Self-Upgrade',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Parallel Processing',
    url: '/parallel-processing',
    icon: Cpu,
    description: 'Multi-core Processing',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Multi-layer AI',
    url: '/multi-layer-ai',
    icon: Layers,
    description: 'Layered AI Architecture',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'AI Orchestration',
    url: '/ai-orchestration',
    icon: Workflow,
    description: 'AI System Orchestration',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Autonomous Orchestrator',
    url: '/autonomous-orchestrator',
    icon: Command,
    description: 'Central autonomous coordination & control',
    status: 'active',
    systemHealth: 'excellent'
  }
];
