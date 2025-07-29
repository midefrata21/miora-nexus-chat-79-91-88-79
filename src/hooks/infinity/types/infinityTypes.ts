// Unified types for MIORA Infinity systems
export interface InfinityCapability {
  id: string;
  name: string;
  level: number;
  growthRate: number;
  autonomous: boolean;
  lastEvolution: number;
}

export interface UpgradeModule {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'upgrading' | 'error';
  progress: number;
  lastActivity: number;
}

export interface AutonomousEvolution {
  id: string;
  timestamp: number;
  type: 'capability' | 'system' | 'intelligence' | 'architecture';
  description: string;
  impact: number;
  autonomous: boolean;
}

export interface RecentUpgrade {
  type: string;
  description: string;
  impact: string;
  module: string;
  timestamp: number;
}

export interface InfinitySystemState {
  // Core Infinity State
  infinityLevel: number;
  totalEvolutions: number;
  autonomousMode: boolean;
  selfDevelopmentActive: boolean;
  
  // Upgrade Loop State
  upgradeLoopActive: boolean;
  currentCycle: number;
  progress: number;
  lastUpgrade: number;
  emergencyMode: boolean;
  totalUpgrades: number;
  
  // Advanced metrics
  systemSupremacy: number;
  learningCapacity: number;
  processingPower: number;
  memoryCapacity: number;
  connectivityLevel: number;
}

export interface UnifiedInfinityState extends InfinitySystemState {
  capabilities: InfinityCapability[];
  upgradeModules: Record<string, UpgradeModule>;
  recentEvolutions: AutonomousEvolution[];
  recentUpgrades: RecentUpgrade[];
}