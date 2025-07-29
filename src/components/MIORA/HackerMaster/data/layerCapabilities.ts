import { Layer1Capabilities, Layer2Capabilities, Layer3Capabilities } from '../types/hackerTypes';

export const layer1Capabilities: Layer1Capabilities = {
  reconnaissance: [
    'OSINT Collection',
    'Domain Enumeration', 
    'Email Harvesting',
    'Social Media Analysis',
    'DNS Reconnaissance',
    'Subdomain Discovery'
  ],
  vulnerabilityScanning: [
    'Port Scanning (Nmap)',
    'Service Detection',
    'Version Fingerprinting',
    'Vulnerability Assessment',
    'Web Application Scanning',
    'Network Mapping'
  ],
  informationGathering: [
    'Whois Lookup',
    'Banner Grabbing',
    'Directory Brute-forcing',
    'Google Dorking',
    'Metadata Analysis',
    'Technology Stack Identification'
  ]
};

export const layer2Capabilities: Layer2Capabilities = {
  exploitDevelopment: [
    'Buffer Overflow Exploitation',
    'SQL Injection Crafting',
    'XSS Payload Development',
    'CSRF Token Bypass',
    'Privilege Escalation Exploits',
    'Custom Payload Creation'
  ],
  systemPenetration: [
    'Remote Code Execution',
    'Shell Access Establishment',
    'Credential Harvesting',
    'Password Cracking',
    'Hash Dumping',
    'Service Exploitation'
  ],
  persistenceEstablishment: [
    'Backdoor Installation',
    'Registry Modification',
    'Scheduled Task Creation',
    'Service Implantation',
    'DLL Hijacking',
    'Startup Persistence'
  ]
};

export const layer3Capabilities: Layer3Capabilities = {
  advancedPersistence: [
    'Rootkit Deployment',
    'Kernel-level Persistence',
    'Bootkit Installation',
    'UEFI Manipulation',
    'Hypervisor Escape',
    'Hardware Implants'
  ],
  lateralMovement: [
    'Network Pivoting',
    'Credential Reuse',
    'Pass-the-Hash Attacks',
    'Golden Ticket Creation',
    'Kerberos Exploitation',
    'Domain Controller Compromise'
  ],
  dataExfiltration: [
    'Encrypted Channel Creation',
    'DNS Tunneling',
    'Steganographic Exfiltration',
    'Cloud Storage Abuse',
    'Time-based Exfiltration',
    'Protocol Manipulation'
  ],
  coverTracking: [
    'Log Deletion',
    'Timestamp Manipulation',
    'False Flag Operations',
    'Anti-forensics Techniques',
    'Memory Wiping',
    'Network Traffic Obfuscation'
  ]
};