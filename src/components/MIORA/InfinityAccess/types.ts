export interface InfinityAccessState {
  isActive: boolean;
  accessLevel: 'Standard' | 'Advanced' | 'Maximum';
  penetrationPower: number;
  currentOperation: string | null;
  activeTarget: string | null;
  operationProgress: number;
  securityBypassCount: number;
  systemsAccessed: number;
}

export interface ExternalSystem {
  id: string;
  name: string;
  description: string;
  type: 'Government' | 'Corporate' | 'Military' | 'Financial' | 'Healthcare' | 'Educational';
  ipAddress: string;
  operatingSystem: string;
  securityLevel: 'Low' | 'Medium' | 'High' | 'Maximum';
  accessPoints: string[];
  vulnerabilities: string[];
  status: 'accessible' | 'protected' | 'compromised' | 'analyzing';
}

export interface FileAccessLog {
  id: string;
  systemId: string;
  fileName: string;
  filePath: string;
  fileSize: string;
  fileType: string;
  accessLevel: 'Full' | 'Partial' | 'Restricted';
  lastModified: string;
  permissions: string;
  encryption: string;
  analysis: string;
}

export interface SecurityBypassMethod {
  id: string;
  name: string;
  description: string;
  technique: string;
  difficulty: 'Standard' | 'Advanced' | 'Extreme';
  successRate: number;
  targetTypes: string[];
  requirements: string[];
  executionTime: string;
}