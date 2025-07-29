export interface Layer1Capabilities {
  reconnaissance: string[];
  vulnerabilityScanning: string[];
  informationGathering: string[];
}

export interface Layer2Capabilities {
  exploitDevelopment: string[];
  systemPenetration: string[];
  persistenceEstablishment: string[];
}

export interface Layer3Capabilities {
  advancedPersistence: string[];
  lateralMovement: string[];
  dataExfiltration: string[];
  coverTracking: string[];
}

export interface HackerReport {
  layer: number;
  timestamp: number;
  actions: string[];
  findings: string[];
  recommendations: string[];
  riskAssessment: 'low' | 'medium' | 'high' | 'critical';
}

export interface ComprehensiveReport {
  timestamp: number;
  systemOverview: {
    totalCapabilities: number;
    layerBreakdown: {
      layer1: number;
      layer2: number;
      layer3: number;
    };
  };
  detailedCapabilities: {
    layer1: {
      description: string;
      riskLevel: string;
      capabilities: Layer1Capabilities;
      recommendedActions: string[];
    };
    layer2: {
      description: string;
      riskLevel: string;
      capabilities: Layer2Capabilities;
      recommendedActions: string[];
    };
    layer3: {
      description: string;
      riskLevel: string;
      capabilities: Layer3Capabilities;
      recommendedActions: string[];
    };
  };
  operationalGuidelines: {
    ethicalConsiderations: string[];
    securityMeasures: string[];
  };
  recentOperations: HackerReport[];
}