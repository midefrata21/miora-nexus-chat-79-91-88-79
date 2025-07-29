
export interface HackerState {
  isActive: boolean;
  hackerLevel: number;
  experiencePoints: number;
  currentOperation: string | null;
  activeTarget: string | null;
  operationProgress: number;
  skillPoints: number;
  reputation: number;
}

export interface PenetrationTool {
  name: string;
  description: string;
  version: string;
  status: 'ready' | 'updating' | 'offline';
  category: 'network' | 'web' | 'wireless' | 'forensics';
  difficulty: number;
}

export interface HackingTarget {
  id: string;
  name: string;
  ip: string;
  status: 'vulnerable' | 'secure' | 'scanning' | 'exploiting';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  openPorts: number[];
  services: string[];
  vulnerabilities: string[];
}

export interface Exploit {
  id: string;
  name: string;
  type: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  target: string;
  payload: string;
  discovered: boolean;
}
