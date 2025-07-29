
import { 
  Mic, 
  Volume2, 
  Brain, 
  Headphones, 
  Waves,
  MessageSquare,
  Settings
} from 'lucide-react';
import { NavItem } from '../types';

export const voiceItems: NavItem[] = [
  {
    title: 'Voice Engine 2.0',
    description: 'Advanced AI Voice Interaction Engine',
    icon: Brain,
    url: '/voice-engine-2',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Voice Interface',
    description: 'Basic voice interaction system',
    icon: Mic,
    url: '/voice-interface',
    status: 'active',
    systemHealth: 'good'
  },
  {
    title: 'Two-Way Voice System',
    description: 'Advanced two-way voice communication',
    icon: MessageSquare,
    url: '/miora-voice-system',
    status: 'active',
    systemHealth: 'excellent'
  },
  {
    title: 'Voice Diagnostics',
    description: 'Voice system health monitoring',
    icon: Settings,
    url: '/voice-diagnostics',
    status: 'active',
    systemHealth: 'good'
  },
  {
    title: 'Audio Processing',
    description: 'Advanced audio signal processing',
    icon: Waves,
    url: '/audio-processing',
    status: 'development',
    systemHealth: 'good'
  }
];
