import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Scan, 
  Terminal, 
  Network, 
  Lock, 
  AlertTriangle,
  Eye,
  Code,
  Database,
  Wifi
} from 'lucide-react';
import { NetworkScanner } from './tools/NetworkScanner';
import { VulnerabilityAssessment } from './tools/VulnerabilityAssessment';
import { SecurityMonitor } from './tools/SecurityMonitor';
import { PenetrationTesting } from './tools/PenetrationTesting';
import { LogAnalyzer } from './tools/LogAnalyzer';
import { SecurityLevelIndicator } from './SecurityLevelIndicator';
import { EthicalHackerAuth } from './auth/EthicalHackerAuth';

interface SecurityLevel {
  level: number;
  name: string;
  description: string;
  unlocked: boolean;
  color: string;
}

export const HackerMasterDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSecurityLevel, setCurrentSecurityLevel] = useState(1);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    defensiveMode: true,
    ethicalCompliance: true,
    educationalMode: true,
    authorizedTarget: false
  });

  const securityLevels: SecurityLevel[] = [
    { level: 1, name: "Basic Recon", description: "Network Discovery & Port Scanning", unlocked: true, color: "green" },
    { level: 2, name: "Service Analysis", description: "Service Enumeration & Banner Grabbing", unlocked: false, color: "blue" },
    { level: 3, name: "Vulnerability Discovery", description: "Automated Vulnerability Scanning", unlocked: false, color: "yellow" },
    { level: 4, name: "Web Application Testing", description: "OWASP Top 10 Assessment", unlocked: false, color: "orange" },
    { level: 5, name: "Network Penetration", description: "Internal Network Assessment", unlocked: false, color: "red" },
    { level: 6, name: "Wireless Security", description: "WiFi & Bluetooth Analysis", unlocked: false, color: "purple" },
    { level: 7, name: "Social Engineering", description: "Educational Phishing Simulation", unlocked: false, color: "pink" },
    { level: 8, name: "Malware Analysis", description: "Static & Dynamic Analysis", unlocked: false, color: "indigo" },
    { level: 9, name: "Digital Forensics", description: "Evidence Collection & Analysis", unlocked: false, color: "gray" },
    { level: 10, name: "Advanced Persistent Threat", description: "APT Simulation & Defense", unlocked: false, color: "black" }
  ];

  const hackerTools = [
    { 
      id: 'network-scanner', 
      name: 'Network Scanner', 
      icon: Network, 
      level: 1,
      description: 'Scan local network for devices and open ports',
      component: NetworkScanner
    },
    { 
      id: 'vuln-assessment', 
      name: 'Vulnerability Assessment', 
      icon: Shield, 
      level: 3,
      description: 'Automated vulnerability scanning',
      component: VulnerabilityAssessment
    },
    { 
      id: 'security-monitor', 
      name: 'Security Monitor', 
      icon: Eye, 
      level: 2,
      description: 'Real-time security monitoring',
      component: SecurityMonitor
    },
    { 
      id: 'penetration-testing', 
      name: 'Penetration Testing', 
      icon: Terminal, 
      level: 5,
      description: 'Ethical penetration testing framework',
      component: PenetrationTesting
    },
    { 
      id: 'log-analyzer', 
      name: 'Log Analyzer', 
      icon: Database, 
      level: 4,
      description: 'Security log analysis and forensics',
      component: LogAnalyzer
    }
  ];

  const availableTools = hackerTools.filter(tool => tool.level <= currentSecurityLevel);

  const unlockNextLevel = () => {
    if (currentSecurityLevel < 10 && systemStatus.ethicalCompliance) {
      setCurrentSecurityLevel(prev => prev + 1);
      // Update unlocked levels
      securityLevels.forEach(level => {
        if (level.level <= currentSecurityLevel + 1) {
          level.unlocked = true;
        }
      });
    }
  };

  useEffect(() => {
    // Security monitoring
    const interval = setInterval(() => {
      if (!systemStatus.ethicalCompliance || !systemStatus.defensiveMode) {
        console.warn('🚨 SECURITY VIOLATION DETECTED - LOCKING SYSTEM');
        setIsAuthenticated(false);
        setActiveTools([]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [systemStatus]);

  if (!isAuthenticated) {
    return <EthicalHackerAuth onAuthenticate={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-red-900/50 to-black/50 border-red-500/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Shield className="h-12 w-12 text-red-400 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    🔥 MIORA HACKER MASTER 🔥
                  </CardTitle>
                  <p className="text-gray-300">Ethical Hacking & Cybersecurity Education Platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge className={`px-4 py-2 ${systemStatus.ethicalCompliance ? 'bg-green-500' : 'bg-red-500'}`}>
                  <Lock className="h-4 w-4 mr-2" />
                  {systemStatus.ethicalCompliance ? 'ETHICAL MODE' : 'LOCKED'}
                </Badge>
                <SecurityLevelIndicator level={currentSecurityLevel} maxLevel={10} />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Security Status Panel */}
        <Card className="bg-black/40 border-yellow-500/50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-400">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Security Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-3 rounded-lg border ${systemStatus.defensiveMode ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                <div className="text-sm text-gray-300">Defensive Mode</div>
                <div className={`font-bold ${systemStatus.defensiveMode ? 'text-green-400' : 'text-red-400'}`}>
                  {systemStatus.defensiveMode ? 'ACTIVE' : 'DISABLED'}
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${systemStatus.ethicalCompliance ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                <div className="text-sm text-gray-300">Ethical Compliance</div>
                <div className={`font-bold ${systemStatus.ethicalCompliance ? 'text-green-400' : 'text-red-400'}`}>
                  {systemStatus.ethicalCompliance ? 'COMPLIANT' : 'VIOLATION'}
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${systemStatus.educationalMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-gray-900/20 border-gray-500/30'}`}>
                <div className="text-sm text-gray-300">Educational Mode</div>
                <div className={`font-bold ${systemStatus.educationalMode ? 'text-blue-400' : 'text-gray-400'}`}>
                  {systemStatus.educationalMode ? 'ENABLED' : 'DISABLED'}
                </div>
              </div>
              
              <div className="p-3 rounded-lg border bg-orange-900/20 border-orange-500/30">
                <div className="text-sm text-gray-300">Security Level</div>
                <div className="font-bold text-orange-400">LEVEL {currentSecurityLevel}/10</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tools Interface */}
        <Tabs defaultValue="tools" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full bg-black/40">
            <TabsTrigger value="tools">Hacking Tools</TabsTrigger>
            <TabsTrigger value="levels">Security Levels</TabsTrigger>
            <TabsTrigger value="monitor">Live Monitor</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTools.map((tool) => (
                <Card key={tool.id} className="bg-gradient-to-br from-gray-800/50 to-black/50 border-gray-600/50 hover:border-red-500/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-400">
                      <tool.icon className="h-5 w-5 mr-2" />
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        Level {tool.level}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (activeTools.includes(tool.id)) {
                            setActiveTools(prev => prev.filter(t => t !== tool.id));
                          } else {
                            setActiveTools(prev => [...prev, tool.id]);
                          }
                        }}
                        className={`${
                          activeTools.includes(tool.id) 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        {activeTools.includes(tool.id) ? 'ACTIVE' : 'ACTIVATE'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active Tools */}
            {activeTools.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-red-400">Active Tools</h3>
                {activeTools.map((toolId) => {
                  const tool = hackerTools.find(t => t.id === toolId);
                  if (!tool) return null;
                  
                  const ToolComponent = tool.component;
                  return (
                    <Card key={toolId} className="bg-black/60 border-red-500/50">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-red-400">
                          <span className="flex items-center">
                            <tool.icon className="h-5 w-5 mr-2" />
                            {tool.name} - ACTIVE
                          </span>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setActiveTools(prev => prev.filter(t => t !== toolId))}
                          >
                            DEACTIVATE
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ToolComponent />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="levels" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityLevels.map((level) => (
                <Card 
                  key={level.level} 
                  className={`${
                    level.unlocked 
                      ? 'bg-gradient-to-br from-green-900/30 to-black/50 border-green-500/50' 
                      : 'bg-gradient-to-br from-gray-900/30 to-black/50 border-gray-600/50'
                  }`}
                >
                  <CardHeader>
                    <CardTitle className={`flex items-center justify-between ${
                      level.unlocked ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      <span>Level {level.level}: {level.name}</span>
                      {level.unlocked ? (
                        <Badge className="bg-green-600">UNLOCKED</Badge>
                      ) : (
                        <Badge variant="outline">LOCKED</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm">{level.description}</p>
                    {level.level === currentSecurityLevel + 1 && (
                      <Button 
                        className="mt-4 bg-orange-600 hover:bg-orange-700"
                        onClick={unlockNextLevel}
                      >
                        UNLOCK LEVEL {level.level}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitor">
            <Card className="bg-black/60 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400">Live Security Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <div className="text-green-400 font-bold">System Integrity</div>
                      <div className="text-2xl text-green-300">100%</div>
                    </div>
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <div className="text-blue-400 font-bold">Active Scans</div>
                      <div className="text-2xl text-blue-300">{activeTools.length}</div>
                    </div>
                    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                      <div className="text-yellow-400 font-bold">Threat Level</div>
                      <div className="text-2xl text-yellow-300">LOW</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900/40 rounded-lg">
                    <div className="text-gray-300 text-sm font-mono">
                      [INFO] Ethical hacking session active<br/>
                      [INFO] All tools operating within educational parameters<br/>
                      [INFO] Defensive mode enabled - no unauthorized access<br/>
                      [WARN] Remember: Only test on systems you own or have permission<br/>
                      [INFO] Educational mode: All activities logged for learning
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card className="bg-black/60 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-purple-400">Cybersecurity Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                    <h4 className="text-yellow-400 font-bold mb-2">⚠️ IMPORTANT DISCLAIMER</h4>
                    <p className="text-gray-300 text-sm">
                      Semua tools ini dirancang untuk tujuan pendidikan dan ethical hacking. 
                      Hanya gunakan pada sistem yang Anda miliki atau dengan izin eksplisit. 
                      Penggunaan untuk aktivitas ilegal adalah tanggung jawab pengguna.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <h4 className="text-blue-400 font-bold mb-2">📚 Learning Resources</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• OWASP Top 10 Vulnerabilities</li>
                        <li>• Penetration Testing Methodology</li>
                        <li>• Network Security Fundamentals</li>
                        <li>• Vulnerability Assessment</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                      <h4 className="text-green-400 font-bold mb-2">🎯 Practice Targets</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Local Virtual Machines</li>
                        <li>• Intentionally Vulnerable Apps</li>
                        <li>• CTF Challenges</li>
                        <li>• Bug Bounty Programs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};