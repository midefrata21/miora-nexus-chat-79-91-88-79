import { ExternalSystem, FileAccessLog, SecurityBypassMethod } from './types';

export const accessibleSystems: ExternalSystem[] = [
  {
    id: 'sys-001',
    name: 'Pentagon Defense Network',
    description: 'Advanced military defense infrastructure with quantum encryption',
    type: 'Military',
    ipAddress: '10.0.0.1',
    operatingSystem: 'Classified Defense OS',
    securityLevel: 'Maximum',
    accessPoints: ['Quantum VPN', 'Satellite Uplink', 'Secure Terminal'],
    vulnerabilities: ['Zero-day exploit available', 'AI bypass possible'],
    status: 'protected'
  },
  {
    id: 'sys-002',
    name: 'Federal Reserve Core',
    description: 'Central banking system with triple-layer security protocols',
    type: 'Financial',
    ipAddress: '172.16.0.50',
    operatingSystem: 'Secure Banking Unix',
    securityLevel: 'Maximum',
    accessPoints: ['SWIFT Network', 'Fedwire Access', 'Emergency Terminal'],
    vulnerabilities: ['Legacy protocol weakness', 'Authentication bypass'],
    status: 'accessible'
  },
  {
    id: 'sys-003',
    name: 'NSA Surveillance Grid',
    description: 'Global intelligence gathering and processing network',
    type: 'Government',
    ipAddress: '192.168.200.10',
    operatingSystem: 'Top Secret OS v12',
    securityLevel: 'Maximum',
    accessPoints: ['PRISM Interface', 'XKEYSCORE Terminal', 'MUSCULAR Gateway'],
    vulnerabilities: ['Quantum resistance needed', 'AI vulnerability detected'],
    status: 'analyzing'
  },
  {
    id: 'sys-004',
    name: 'CERN Data Center',
    description: 'Particle physics research data and quantum computing cluster',
    type: 'Educational',
    ipAddress: '10.1.1.100',
    operatingSystem: 'Scientific Linux Grid',
    securityLevel: 'High',
    accessPoints: ['Grid Computing Portal', 'Research Network', 'Quantum Interface'],
    vulnerabilities: ['Research protocol gaps', 'Grid authentication weak'],
    status: 'accessible'
  },
  {
    id: 'sys-005',
    name: 'Tesla Autopilot Network',
    description: 'Autonomous vehicle control and data processing system',
    type: 'Corporate',
    ipAddress: '203.0.113.75',
    operatingSystem: 'Tesla OS Neural',
    securityLevel: 'High',
    accessPoints: ['Vehicle API', 'Neural Network Hub', 'Fleet Management'],
    vulnerabilities: ['OTA update interception', 'Neural network poisoning'],
    status: 'compromised'
  },
  {
    id: 'sys-006',
    name: 'WHO Global Health DB',
    description: 'Worldwide health data aggregation and pandemic monitoring',
    type: 'Healthcare',
    ipAddress: '198.51.100.25',
    operatingSystem: 'Medical Records OS',
    securityLevel: 'High',
    accessPoints: ['Health API Gateway', 'Pandemic Monitor', 'Research Portal'],
    vulnerabilities: ['GDPR compliance gaps', 'Legacy database exposure'],
    status: 'accessible'
  },
  {
    id: 'sys-007',
    name: 'SpaceX Mission Control',
    description: 'Satellite constellation and mission management system',
    type: 'Corporate',
    ipAddress: '172.20.0.15',
    operatingSystem: 'Aerospace Control OS',
    securityLevel: 'Maximum',
    accessPoints: ['Starlink Network', 'Mission Control', 'Satellite Command'],
    vulnerabilities: ['Space communication intercept', 'Ground station bypass'],
    status: 'protected'
  },
  {
    id: 'sys-008',
    name: 'Quantum Computing Cluster',
    description: 'Next-generation quantum processing and encryption breaking',
    type: 'Government',
    ipAddress: '10.255.255.1',
    operatingSystem: 'Quantum OS Alpha',
    securityLevel: 'Maximum',
    accessPoints: ['Quantum Terminal', 'Encryption Lab', 'Research Grid'],
    vulnerabilities: ['Quantum decoherence exploit', 'Entanglement bypass'],
    status: 'analyzing'
  }
];

export const fileAccessLogs: FileAccessLog[] = [
  {
    id: 'file-001',
    systemId: 'sys-001',
    fileName: 'nuclear_codes.enc',
    filePath: '/classified/defense/nuclear/launch_codes.enc',
    fileSize: '2.3 KB',
    fileType: 'Encrypted Defense File',
    accessLevel: 'Full',
    lastModified: '2024-01-15 14:30:25',
    permissions: 'Top Secret / SCI',
    encryption: 'AES-256 + Quantum (Bypassed)',
    analysis: 'Nuclear launch authentication codes extracted'
  },
  {
    id: 'file-002',
    systemId: 'sys-002',
    fileName: 'fed_transactions.db',
    filePath: '/secure/banking/federal_reserve/transactions.db',
    fileSize: '847 MB',
    fileType: 'Financial Database',
    accessLevel: 'Full',
    lastModified: '2024-01-15 16:45:12',
    permissions: 'Financial Authority Required',
    encryption: 'Banking Standard (Cracked)',
    analysis: 'Complete transaction history and routing keys accessed'
  },
  {
    id: 'file-003',
    systemId: 'sys-003',
    fileName: 'surveillance_targets.json',
    filePath: '/intelligence/nsa/active_surveillance/targets.json',
    fileSize: '156 MB',
    fileType: 'Intelligence Data',
    accessLevel: 'Partial',
    lastModified: '2024-01-15 18:22:07',
    permissions: 'Eyes Only / FISA',
    encryption: 'NSA Custom (Partially Bypassed)',
    analysis: 'Global surveillance target list partially decoded'
  },
  {
    id: 'file-004',
    systemId: 'sys-004',
    fileName: 'higgs_data.raw',
    filePath: '/research/cern/particle_physics/higgs_boson_data.raw',
    fileSize: '12.5 GB',
    fileType: 'Scientific Data',
    accessLevel: 'Full',
    lastModified: '2024-01-15 09:15:33',
    permissions: 'Research Access',
    encryption: 'None (Open Science)',
    analysis: 'Higgs boson collision data and quantum field measurements'
  },
  {
    id: 'file-005',
    systemId: 'sys-005',
    fileName: 'autopilot_neural.bin',
    filePath: '/tesla/ai/neural_networks/autopilot_v12.bin',
    fileSize: '4.2 GB',
    fileType: 'Neural Network Model',
    accessLevel: 'Full',
    lastModified: '2024-01-15 12:30:18',
    permissions: 'Corporate Confidential',
    encryption: 'Tesla Proprietary (Reverse Engineered)',
    analysis: 'Complete autonomous driving AI model extracted'
  },
  {
    id: 'file-006',
    systemId: 'sys-006',
    fileName: 'pandemic_models.xml',
    filePath: '/who/health/global/pandemic_prediction_models.xml',
    fileSize: '89 MB',
    fileType: 'Health Prediction Model',
    accessLevel: 'Partial',
    lastModified: '2024-01-15 11:45:55',
    permissions: 'Medical Authority',
    encryption: 'Healthcare Standard (Bypassed)',
    analysis: 'Global pandemic prediction algorithms and response protocols'
  }
];

export const securityBypassMethods: SecurityBypassMethod[] = [
  {
    id: 'bypass-001',
    name: 'Quantum Encryption Breaker',
    description: 'Advanced quantum computing algorithm to break next-generation encryption',
    technique: 'quantum_decrypt',
    difficulty: 'Extreme',
    successRate: 95,
    targetTypes: ['Government', 'Military', 'Financial'],
    requirements: ['Quantum processor access', 'Entanglement stabilization'],
    executionTime: '15-30 minutes'
  },
  {
    id: 'bypass-002',
    name: 'AI Neural Hijacking',
    description: 'Exploit AI decision-making processes to gain unauthorized access',
    technique: 'neural_hijack',
    difficulty: 'Advanced',
    successRate: 88,
    targetTypes: ['Corporate', 'Healthcare', 'Educational'],
    requirements: ['Machine learning framework', 'Neural network mapping'],
    executionTime: '5-10 minutes'
  },
  {
    id: 'bypass-003',
    name: 'Zero-Day Supply Chain',
    description: 'Exploit undiscovered vulnerabilities in software supply chains',
    technique: 'supply_chain_exploit',
    difficulty: 'Extreme',
    successRate: 92,
    targetTypes: ['Corporate', 'Government', 'Financial'],
    requirements: ['Supply chain analysis', 'Code injection capability'],
    executionTime: '30-60 minutes'
  },
  {
    id: 'bypass-004',
    name: 'Biometric Spoofing Engine',
    description: 'Advanced spoofing of biometric authentication systems',
    technique: 'biometric_spoof',
    difficulty: 'Advanced',
    successRate: 85,
    targetTypes: ['Government', 'Military', 'Corporate'],
    requirements: ['Biometric database', 'Synthetic generation'],
    executionTime: '10-20 minutes'
  },
  {
    id: 'bypass-005',
    name: 'Satellite Communication Intercept',
    description: 'Intercept and decrypt satellite communications in real-time',
    technique: 'satellite_intercept',
    difficulty: 'Extreme',
    successRate: 78,
    targetTypes: ['Military', 'Government', 'Corporate'],
    requirements: ['Satellite tracking', 'Signal processing', 'Decryption grid'],
    executionTime: '45-90 minutes'
  },
  {
    id: 'bypass-006',
    name: 'Social Engineering AI',
    description: 'AI-powered social engineering for credential harvesting',
    technique: 'ai_social_engineering',
    difficulty: 'Standard',
    successRate: 94,
    targetTypes: ['Corporate', 'Educational', 'Healthcare'],
    requirements: ['Target profiling', 'Communication channels', 'Psychological modeling'],
    executionTime: '2-5 minutes'
  },
  {
    id: 'bypass-007',
    name: 'Hardware Implant Network',
    description: 'Deploy and coordinate hardware-level access implants',
    technique: 'hardware_implant',
    difficulty: 'Extreme',
    successRate: 97,
    targetTypes: ['Military', 'Government', 'Financial'],
    requirements: ['Physical access', 'Micro-implant technology', 'Remote activation'],
    executionTime: '120-180 minutes'
  },
  {
    id: 'bypass-008',
    name: 'Time-Based Attack Vector',
    description: 'Exploit temporal vulnerabilities in security protocols',
    technique: 'temporal_exploit',
    difficulty: 'Advanced',
    successRate: 82,
    targetTypes: ['Financial', 'Government', 'Corporate'],
    requirements: ['Timing analysis', 'Protocol mapping', 'Synchronization tools'],
    executionTime: '20-40 minutes'
  }
];