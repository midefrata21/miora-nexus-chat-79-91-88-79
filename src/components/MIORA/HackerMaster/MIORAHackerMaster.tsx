
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMIORAHackerMaster } from '../hooks/useMIORAHackerMaster';
import { 
  Shield, 
  Terminal, 
  Network, 
  Lock, 
  Unlock, 
  Eye, 
  Search,
  Bug,
  Zap,
  Brain,
  Target,
  Wifi,
  Database,
  Code,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Skull,
  ExternalLink,
  Monitor,
  Key,
  ShieldCheck,
  FileText,
  Globe,
  Settings
} from 'lucide-react';

const MIORAHackerMaster: React.FC = () => {
  const {
    hackerState,
    penetrationTools,
    hackingTargets,
    exploitDatabase,
    activateHackerMode,
    deactivateHackerMode,
    performPenetrationTest,
    scanNetworkTargets,
    exploitVulnerability,
    getHackerStats,
    isHackerActive
  } = useMIORAHackerMaster();

  const [selectedTool, setSelectedTool] = useState<string>('nmap');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'MIORA Hacker Master Terminal v3.0',
    'Initializing advanced penetration testing suite...',
    'All systems ready for ethical hacking operations.'
  ]);

  const stats = getHackerStats();

  const addTerminalOutput = (message: string) => {
    setTerminalOutput(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    if (isHackerActive) {
      const interval = setInterval(() => {
        const activities = [
          'Scanning for network vulnerabilities...',
          'Analyzing security protocols...',
          'Detecting open ports and services...',
          'Mapping network topology...',
          'Identifying potential exploits...',
          'Monitoring traffic patterns...',
          'Checking for SQL injection points...',
          'Analyzing wireless security...'
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        addTerminalOutput(randomActivity);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHackerActive]);

  const getToolIcon = (toolName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      nmap: Network,
      metasploit: Bug,
      wireshark: Activity,
      burpsuite: Shield,
      sqlmap: Database,
      aircrack: Wifi,
      hydra: Lock,
      johntheripper: Unlock
    };
    return iconMap[toolName] || Terminal;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vulnerable': return 'text-red-400';
      case 'secure': return 'text-green-400';
      case 'scanning': return 'text-yellow-400';
      case 'exploiting': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const handleToolExecution = (toolName: string) => {
    addTerminalOutput(`Executing ${toolName}...`);
    performPenetrationTest(toolName);
  };

  // Data untuk sistem yang sudah dikompromikan
  const compromisedSystems = [
    {
      id: 1,
      name: "Web Server Apache/2.4.41",
      ip: "192.168.1.100",
      status: "compromised",
      controlLevel: "full",
      accessMethod: "SQL Injection + Privilege Escalation",
      vulnerabilities: ["CVE-2021-41773", "CVE-2021-42013"],
      controlLinks: [
        { name: "Shell Access", url: "#shell-access", type: "command" },
        { name: "File Manager", url: "#file-manager", type: "file" },
        { name: "Database Control", url: "#db-control", type: "database" }
      ],
      remediationSteps: [
        "Update Apache ke versi terbaru (2.4.54+)",
        "Implementasi Web Application Firewall (WAF)",
        "Sanitasi input database dengan prepared statements",
        "Terapkan principle of least privilege",
        "Monitor akses file sistem secara real-time"
      ],
      riskLevel: "Critical",
      timeCompromised: "2 jam yang lalu"
    },
    {
      id: 2,
      name: "Windows Server 2019",
      ip: "192.168.1.50",
      status: "compromised",
      controlLevel: "admin",
      accessMethod: "EternalBlue Exploit",
      vulnerabilities: ["MS17-010", "CVE-2017-0144"],
      controlLinks: [
        { name: "Remote Desktop", url: "#rdp-access", type: "remote" },
        { name: "PowerShell", url: "#powershell", type: "command" },
        { name: "Service Manager", url: "#service-mgr", type: "service" }
      ],
      remediationSteps: [
        "Install patch MS17-010 segera",
        "Disable SMBv1 protocol",
        "Enable Windows Defender Advanced Threat Protection",
        "Implement network segmentation",
        "Deploy endpoint detection and response (EDR)",
        "Audit dan reset semua administrative accounts"
      ],
      riskLevel: "Critical",
      timeCompromised: "5 jam yang lalu"
    },
    {
      id: 3,
      name: "Router Cisco ASA 5500",
      ip: "192.168.1.1",
      status: "compromised",
      controlLevel: "limited",
      accessMethod: "Default Credentials",
      vulnerabilities: ["Weak Authentication", "CVE-2020-3259"],
      controlLinks: [
        { name: "Admin Panel", url: "#cisco-admin", type: "web" },
        { name: "Config Backup", url: "#config-backup", type: "file" }
      ],
      remediationSteps: [
        "Ganti password default dengan kompleks",
        "Enable two-factor authentication",
        "Update firmware ke versi terbaru",
        "Disable unnecessary services",
        "Implement access control lists (ACLs)",
        "Monitor traffic logs secara berkala"
      ],
      riskLevel: "High",
      timeCompromised: "1 hari yang lalu"
    }
  ];

  const handleSystemAccess = (systemName: string, linkType: string) => {
    addTerminalOutput(`Accessing ${systemName} via ${linkType}...`);
    addTerminalOutput(`⚠️ PERINGATAN: Akses ini untuk tujuan edukasi dan ethical hacking saja`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Skull className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              MIORA HACKER MASTER
            </h1>
            <Skull className="w-12 h-12 text-red-500 ml-4" />
          </div>
          <p className="text-xl text-gray-300">
            Advanced Penetration Testing & Ethical Hacking Suite
          </p>
          <Badge className="mt-2 bg-red-500/20 text-red-300 border-red-500/30">
            ⚠️ ETHICAL HACKING ONLY - FOR EDUCATIONAL PURPOSES
          </Badge>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Hacker Mode Control */}
          <Card className="bg-gray-800/50 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                Hacker Mode Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge className={isHackerActive ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300'}>
                    {isHackerActive ? 'ACTIVE' : 'STANDBY'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hacker Level:</span>
                    <span className="text-red-400">{hackerState.hackerLevel}</span>
                  </div>
                  <Progress value={hackerState.experiencePoints} className="h-2" />
                </div>

                <Button
                  onClick={isHackerActive ? deactivateHackerMode : activateHackerMode}
                  className={`w-full ${isHackerActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isHackerActive ? 'Deactivate Hacker Mode' : 'Activate Hacker Mode'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Stats */}
          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Hacker Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{stats.successfulHacks}</div>
                  <div className="text-sm text-gray-400">Successful Hacks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{stats.vulnerabilitiesFound}</div>
                  <div className="text-sm text-gray-400">Vulnerabilities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stats.networksScanned}</div>
                  <div className="text-sm text-gray-400">Networks Scanned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.toolsMastered}</div>
                  <div className="text-sm text-gray-400">Tools Mastered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Operation */}
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Current Operation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Operation:</span>
                  <span className="text-green-400">{hackerState.currentOperation || 'Standby'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="text-yellow-400">{hackerState.activeTarget || 'None'}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span>{hackerState.operationProgress}%</span>
                  </div>
                  <Progress value={hackerState.operationProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs defaultValue="tools" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="tools">Penetration Tools</TabsTrigger>
            <TabsTrigger value="targets">Network Targets</TabsTrigger>
            <TabsTrigger value="exploits">Exploit Database</TabsTrigger>
            <TabsTrigger value="compromised">Compromised Systems</TabsTrigger>
            <TabsTrigger value="terminal">Hacker Terminal</TabsTrigger>
          </TabsList>

          {/* Penetration Tools */}
          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {penetrationTools.map((tool, index) => {
                const IconComponent = getToolIcon(tool.name.toLowerCase());
                return (
                  <Card key={index} className="bg-gray-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-purple-400 flex items-center text-sm">
                        <IconComponent className="w-4 h-4 mr-2" />
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-xs mb-3">{tool.description}</p>
                      <div className="flex justify-between items-center mb-2">
                        <Badge className={`text-xs ${tool.status === 'ready' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                          {tool.status}
                        </Badge>
                        <span className="text-xs text-gray-400">v{tool.version}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleToolExecution(tool.name)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={!isHackerActive}
                      >
                        Execute
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Network Targets */}
          <TabsContent value="targets">
            <div className="space-y-4">
              {hackingTargets.map((target, index) => (
                <Card key={index} className="bg-gray-800/50 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Network className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="font-semibold text-blue-400">{target.name}</div>
                            <div className="text-sm text-gray-400">{target.ip}</div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(target.status)}`}>
                          {target.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-400">
                          Risk: <span className="text-red-400">{target.riskLevel}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => scanNetworkTargets(target.ip)}
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={!isHackerActive}
                        >
                          Scan
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      Open Ports: {target.openPorts.join(', ')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exploit Database */}
          <TabsContent value="exploits">
            <div className="space-y-4">
              {exploitDatabase.map((exploit, index) => (
                <Card key={index} className="bg-gray-800/50 border-red-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Bug className="w-5 h-5 text-red-400" />
                        <div>
                          <div className="font-semibold text-red-400">{exploit.name}</div>
                          <div className="text-sm text-gray-400">{exploit.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${exploit.severity === 'Critical' ? 'bg-red-500/20 text-red-300' : 
                                         exploit.severity === 'High' ? 'bg-orange-500/20 text-orange-300' : 
                                         'bg-yellow-500/20 text-yellow-300'}`}>
                          {exploit.severity}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => exploitVulnerability(exploit.id)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={!isHackerActive}
                        >
                          Execute
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      {exploit.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compromised Systems */}
          <TabsContent value="compromised">
            <div className="space-y-6">
              {/* Header dengan peringatan */}
              <Card className="bg-red-900/20 border-red-500/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <div>
                      <h3 className="text-red-400 font-semibold">Sistem Yang Sudah Dikompromikan</h3>
                      <p className="text-sm text-gray-300">
                        Berikut adalah daftar sistem yang berhasil diretas beserta link kontrol dan panduan mitigasi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daftar sistem yang dikompromikan */}
              {compromisedSystems.map((system) => (
                <Card key={system.id} className="bg-gray-800/50 border-red-500/30">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center justify-between">
                      <div className="flex items-center">
                        <Monitor className="w-5 h-5 mr-2" />
                        {system.name}
                      </div>
                      <Badge className={`${system.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-300' : 'bg-orange-500/20 text-orange-300'}`}>
                        {system.riskLevel}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Info dasar sistem */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-900/50 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-400">IP Address:</span>
                        <p className="text-white font-mono">{system.ip}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Control Level:</span>
                        <p className="text-yellow-400 capitalize">{system.controlLevel}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Compromised:</span>
                        <p className="text-red-400">{system.timeCompromised}</p>
                      </div>
                    </div>

                    {/* Metode akses */}
                    <div>
                      <h4 className="text-orange-400 font-semibold mb-2 flex items-center">
                        <Key className="w-4 h-4 mr-2" />
                        Metode Penetrasi
                      </h4>
                      <p className="text-gray-300 bg-gray-900/30 p-2 rounded">{system.accessMethod}</p>
                    </div>

                    {/* Vulnerabilities */}
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                        <Bug className="w-4 h-4 mr-2" />
                        Kerentanan yang Dieksploitasi
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {system.vulnerabilities.map((vuln, index) => (
                          <Badge key={index} className="bg-red-500/20 text-red-300 border-red-500/30">
                            {vuln}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Link kontrol */}
                    <div>
                      <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Link Kontrol Sistem (Full Access)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {system.controlLinks.map((link, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSystemAccess(system.name, link.type)}
                            className="flex items-center justify-between bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                            disabled={!isHackerActive}
                          >
                            <span>{link.name}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-yellow-400 mt-2">
                        ⚠️ Link ini memberikan akses penuh ke sistem yang dikompromikan
                      </p>
                    </div>

                    {/* Langkah mitigasi */}
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Langkah Mitigasi & Perbaikan
                      </h4>
                      <div className="space-y-2">
                        {system.remediationSteps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-2 p-2 bg-blue-500/5 rounded">
                            <div className="text-blue-400 font-semibold text-sm mt-0.5">{index + 1}.</div>
                            <p className="text-gray-300 text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Panduan keamanan tambahan */}
                    <Card className="bg-blue-900/20 border-blue-500/30">
                      <CardContent className="p-3">
                        <h5 className="text-blue-400 font-semibold mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Rekomendasi Keamanan Lanjutan
                        </h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Implementasi Zero Trust Architecture</li>
                          <li>• Regular security auditing dan penetration testing</li>
                          <li>• Employee security awareness training</li>
                          <li>• Incident response plan yang terstruktur</li>
                          <li>• Backup dan disaster recovery procedures</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}

              {/* Panduan umum penanganan sistem yang diretas */}
              <Card className="bg-blue-900/20 border-blue-500/50">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Panduan Umum Penanganan Sistem yang Diretas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-400 font-semibold mb-2">Langkah Immediate Response:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>1. Isolasi sistem yang terinfeksi</li>
                        <li>2. Dokumentasi semua evidence</li>
                        <li>3. Notifikasi stakeholder terkait</li>
                        <li>4. Preserve sistem untuk forensik</li>
                        <li>5. Aktivasi incident response team</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">Recovery & Prevention:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>1. Patch semua vulnerabilities</li>
                        <li>2. Reset semua credentials</li>
                        <li>3. Restore dari backup yang bersih</li>
                        <li>4. Enhance monitoring dan logging</li>
                        <li>5. Conduct security assessment ulang</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400 text-sm font-semibold">
                      💡 Tip: Selalu maintain offline backup dan implementasi network segmentation untuk mencegah lateral movement
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hacker Terminal */}
          <TabsContent value="terminal">
            <Card className="bg-black border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  MIORA Hacker Terminal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black p-4 rounded-lg border border-green-500/30 h-96 overflow-y-auto">
                  <div className="font-mono text-sm space-y-1">
                    {terminalOutput.map((line, index) => (
                      <div key={index} className="text-green-400">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button
                    onClick={() => addTerminalOutput('Initiating network reconnaissance...')}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!isHackerActive}
                  >
                    Network Recon
                  </Button>
                  <Button
                    onClick={() => addTerminalOutput('Starting vulnerability assessment...')}
                    className="bg-yellow-600 hover:bg-yellow-700"
                    disabled={!isHackerActive}
                  >
                    Vuln Assessment
                  </Button>
                  <Button
                    onClick={() => addTerminalOutput('Launching penetration test...')}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={!isHackerActive}
                  >
                    Penetration Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAHackerMaster;
