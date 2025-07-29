import { Layer1Capabilities, Layer2Capabilities, Layer3Capabilities, HackerReport, ComprehensiveReport } from '../types/hackerTypes';

export const generateLayer1Findings = (category: keyof Layer1Capabilities, action: string): string[] => {
  const findings = {
    reconnaissance: [
      `Target domain: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      `Open ports detected: 22, 80, 443, ${Math.floor(Math.random() * 9000) + 1000}`,
      `Service versions identified: Apache 2.4.${Math.floor(Math.random() * 50)}, SSH OpenSSH 8.${Math.floor(Math.random() * 10)}`,
      `Subdomain enumeration: ${Math.floor(Math.random() * 20) + 5} subdomains discovered`
    ],
    vulnerabilityScanning: [
      `CVE-2023-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')} detected`,
      `Outdated software components: ${Math.floor(Math.random() * 10) + 1} found`,
      `SSL/TLS configuration weaknesses identified`,
      `Weak cipher suites in use: RC4, 3DES`
    ],
    informationGathering: [
      `Email addresses harvested: ${Math.floor(Math.random() * 50) + 10}`,
      `Employee social media profiles: ${Math.floor(Math.random() * 30) + 5}`,
      `Technology stack: React, Node.js, MongoDB`,
      `Directory structure partially mapped`
    ]
  };
  return findings[category] || [];
};

export const generateLayer2Findings = (category: keyof Layer2Capabilities, action: string): string[] => {
  const findings = {
    exploitDevelopment: [
      `Custom payload crafted for target service`,
      `Exploit reliability: ${Math.floor(Math.random() * 30) + 70}%`,
      `Privilege escalation vector identified`,
      `Remote code execution achieved`
    ],
    systemPenetration: [
      `Shell access established on target system`,
      `Administrator credentials compromised`,
      `Lateral movement paths identified`,
      `Internal network access gained`
    ],
    persistenceEstablishment: [
      `Backdoor successfully installed`,
      `Registry persistence mechanism deployed`,
      `Scheduled task created for persistence`,
      `Network access maintained after reboot`
    ]
  };
  return findings[category] || [];
};

export const generateLayer3Findings = (category: keyof Layer3Capabilities, action: string): string[] => {
  const findings = {
    advancedPersistence: [
      `Kernel-level rootkit deployed successfully`,
      `UEFI bootkit installation completed`,
      `Hardware implant communication established`,
      `Hypervisor-level persistence achieved`
    ],
    lateralMovement: [
      `Domain administrator access obtained`,
      `Golden ticket attack successful`,
      `${Math.floor(Math.random() * 50) + 10} additional systems compromised`,
      `Active Directory fully enumerated`
    ],
    dataExfiltration: [
      `${Math.floor(Math.random() * 500) + 100}GB of sensitive data identified`,
      `Encrypted exfiltration channel established`,
      `Steganographic techniques deployed`,
      `Data exfiltration completed without detection`
    ],
    coverTracking: [
      `All system logs successfully deleted`,
      `Timestamps manipulated to hide activity`,
      `False flags planted to misdirect investigation`,
      `Anti-forensics techniques applied`
    ]
  };
  return findings[category] || [];
};

export const generateLayer1Recommendations = (category: keyof Layer1Capabilities): string[] => {
  return [
    'Implement network segmentation',
    'Update all software components',
    'Enable intrusion detection systems',
    'Conduct regular vulnerability assessments'
  ];
};

export const generateLayer2Recommendations = (category: keyof Layer2Capabilities): string[] => {
  return [
    'Implement application whitelisting',
    'Deploy endpoint detection and response',
    'Enable advanced logging and monitoring',
    'Conduct incident response drills'
  ];
};

export const generateLayer3Recommendations = (category: keyof Layer3Capabilities): string[] => {
  return [
    'Implement zero-trust architecture',
    'Deploy advanced threat hunting capabilities',
    'Enable comprehensive forensic logging',
    'Conduct red team exercises regularly'
  ];
};

export const createComprehensiveReport = (
  layer1Capabilities: Layer1Capabilities,
  layer2Capabilities: Layer2Capabilities,
  layer3Capabilities: Layer3Capabilities,
  hackerReports: HackerReport[]
): ComprehensiveReport => {
  const layer1Actions = Object.values(layer1Capabilities).flat();
  const layer2Actions = Object.values(layer2Capabilities).flat();
  const layer3Actions = Object.values(layer3Capabilities).flat();

  return {
    timestamp: Date.now(),
    systemOverview: {
      totalCapabilities: layer1Actions.length + layer2Actions.length + layer3Actions.length,
      layerBreakdown: {
        layer1: layer1Actions.length,
        layer2: layer2Actions.length,
        layer3: layer3Actions.length
      }
    },
    detailedCapabilities: {
      layer1: {
        description: "Information Gathering & Reconnaissance",
        riskLevel: "Low to Medium",
        capabilities: layer1Capabilities,
        recommendedActions: [
          "Perform comprehensive OSINT collection",
          "Execute vulnerability scanning across all assets",
          "Conduct thorough information gathering",
          "Map the complete attack surface"
        ]
      },
      layer2: {
        description: "Active Exploitation & System Penetration",
        riskLevel: "Medium to High", 
        capabilities: layer2Capabilities,
        recommendedActions: [
          "Develop and deploy custom exploits",
          "Establish system penetration and access",
          "Create persistence mechanisms",
          "Escalate privileges where possible"
        ]
      },
      layer3: {
        description: "Advanced Persistent Threats & Stealth Operations",
        riskLevel: "Critical",
        capabilities: layer3Capabilities,
        recommendedActions: [
          "Deploy advanced persistence mechanisms",
          "Execute lateral movement across network",
          "Perform data exfiltration operations",
          "Implement anti-forensics and cover techniques"
        ]
      }
    },
    operationalGuidelines: {
      ethicalConsiderations: [
        "All operations must be authorized and legal",
        "Maintain detailed documentation of all activities",
        "Follow responsible disclosure practices",
        "Ensure compliance with applicable regulations"
      ],
      securityMeasures: [
        "Use isolated testing environments",
        "Implement proper access controls",
        "Maintain operational security at all times",
        "Regular security reviews and updates"
      ]
    },
    recentOperations: hackerReports.slice(0, 10)
  };
};