export interface SystemStatus {
  isOnline: boolean;
  lastUpdate: number;
  activeModules: number;
  healthScore: number;
}

export interface QuickStats {
  totalSystems: number;
  activeSystems: number;
  upgradesAvailable: number;
  issuesResolved: number;
}

export interface SystemModule {
  name: string;
  path: string;
  icon: any;
  status: 'active' | 'monitoring' | 'upgrading' | 'warning' | 'error';
  description: string;
}