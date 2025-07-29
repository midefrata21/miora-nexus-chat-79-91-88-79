
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  status: 'active' | 'coming-soon' | 'development' | 'beta' | 'critical';
  description: string;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical' | 'supreme';
  capabilities?: string[];
  badge?: string;
  priority?: 'absolute' | 'high' | 'medium' | 'low';
}

export interface NavGroup {
  title: string;
  colorClass: string;
  items: NavItem[];
}
