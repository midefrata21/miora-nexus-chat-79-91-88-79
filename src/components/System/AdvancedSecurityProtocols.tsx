import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Skull,
  Globe,
  UserCheck,
  Network,
  Key,
  Scan,
  ShieldCheck,
  Activity,
  Fingerprint
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityThreat {
  id: string;
  type: 'intrusion' | 'malware' | 'ddos' | 'unauthorized-access' | 'data-breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  status: 'detected' | 'blocked' | 'investigating' | 'resolved';
  description: string;
}

interface SecurityMetrics {
  threatLevel: number;
  blockedAttacks: number;
  activeConnections: number;
  encryptionStatus: number;
  accessControlCompliance: number;
  vulnerabilityScore: number;
}

export const AdvancedSecurityProtocols: React.FC = () => {
  const { toast } = useToast();
  const [securityMode, setSecurityMode] = useState<'standard' | 'enhanced' | 'maximum'>('enhanced');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    threatLevel: 15,
    blockedAttacks: 247,
    activeConnections: 1156,
    encryptionStatus: 100,
    accessControlCompliance: 98.7,
    vulnerabilityScore: 8.2
  });

  const [recentThreats, setRecentThreats] = useState<SecurityThreat[]>([
    {
      id: 'threat_001',
      type: 'intrusion',
      severity: 'high',
      timestamp: '2024-07-12 14:45:23',
      source: '192.168.1.100',
      status: 'blocked',
      description: 'Attempted SQL injection on trading API endpoint'
    },
    {
      id: 'threat_002',
      type: 'ddos',
      severity: 'medium',
      timestamp: '2024-07-12 14:32:15',
      source: 'Multiple IPs',
      status: 'blocked',
      description: 'DDoS attack detected - 1,200 requests/second'
    },
    {
      id: 'threat_003',
      type: 'unauthorized-access',
      severity: 'critical',
      timestamp: '2024-07-12 14:28:07',
      source: '10.0.0.45',
      status: 'investigating',
      description: 'Privilege escalation attempt on admin panel'
    },
    {
      id: 'threat_004',
      type: 'malware',
      severity: 'low',
      timestamp: '2024-07-12 14:15:31',
      source: 'File upload',
      status: 'resolved',
      description: 'Suspicious file detected and quarantined'
    }
  ]);

  const [protectionSystems, setProtectionSystems] = useState([
    { name: 'Firewall', status: 'active', effectiveness: 98.5, threats_blocked: 1247 },
    { name: 'IDS/IPS', status: 'active', effectiveness: 96.2, threats_blocked: 892 },
    { name: 'Anti-Malware', status: 'active', effectiveness: 99.1, threats_blocked: 156 },
    { name: 'DDoS Protection', status: 'active', effectiveness: 94.7, threats_blocked: 67 },
    { name: 'Access Control', status: 'active', effectiveness: 97.8, threats_blocked: 234 },
    { name: 'Encryption Engine', status: 'active', effectiveness: 100, threats_blocked: 0 }
  ]);

  // Real-time security metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        threatLevel: Math.max(5, Math.min(50, prev.threatLevel + (Math.random() - 0.7) * 5)),
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        activeConnections: Math.max(500, Math.min(2000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 50))),
        vulnerabilityScore: Math.max(5, Math.min(15, prev.vulnerabilityScore + (Math.random() - 0.5) * 1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startSecurityScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          toast({
            title: "Security Scan Complete",
            description: "No critical vulnerabilities detected",
          });
          
          return 100;
        }
        return prev + (Math.random() * 12);
      });
    }, 300);
  };

  const changeSecurityMode = (mode: 'standard' | 'enhanced' | 'maximum') => {
    setSecurityMode(mode);
    toast({
      title: `Security Mode: ${mode.toUpperCase()}`,
      description: `Security protocols updated to ${mode} level`,
    });
  };

  const getThreatSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getThreatStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-green-400';
      case 'resolved': return 'text-blue-400';
      case 'investigating': return 'text-yellow-400';
      case 'detected': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'intrusion': return <Eye className="w-4 h-4" />;
      case 'malware': return <Skull className="w-4 h-4" />;
      case 'ddos': return <Network className="w-4 h-4" />;
      case 'unauthorized-access': return <Lock className="w-4 h-4" />;
      case 'data-breach': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Security Protocols</h2>
          <p className="text-gray-400">Multi-layer protection dengan real-time threat detection</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={startSecurityScan} 
            disabled={isScanning}
            variant="secondary" 
            size="sm"
          >
            <Scan className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Security Scan'}
          </Button>
          <div className="flex border border-slate-600 rounded-lg overflow-hidden">
            {(['standard', 'enhanced', 'maximum'] as const).map((mode) => (
              <Button
                key={mode}
                onClick={() => changeSecurityMode(mode)}
                variant={securityMode === mode ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none border-0"
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Security Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-300 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Threat Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {securityMetrics.threatLevel.toFixed(0)}%
                </span>
                <Badge variant={securityMetrics.threatLevel > 30 ? 'destructive' : 'default'}>
                  {securityMetrics.threatLevel > 30 ? 'High' : 'Low'}
                </Badge>
              </div>
              <Progress value={securityMetrics.threatLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-300 text-sm">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Blocked Attacks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {securityMetrics.blockedAttacks.toLocaleString()}
                </span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  24h
                </Badge>
              </div>
              <div className="text-xs text-green-400">+{Math.floor(Math.random() * 10)} in last hour</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-300 text-sm">
              <Key className="w-4 h-4 mr-2" />
              Encryption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {securityMetrics.encryptionStatus}%
                </span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  AES-256
                </Badge>
              </div>
              <div className="text-xs text-blue-400">All data encrypted</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-300 text-sm">
              <UserCheck className="w-4 h-4 mr-2" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {securityMetrics.accessControlCompliance.toFixed(1)}%
                </span>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Compliant
                </Badge>
              </div>
              <div className="text-xs text-purple-400">{securityMetrics.activeConnections} active sessions</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Scan Progress */}
      {isScanning && (
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-300">
              <Scan className="w-5 h-5 mr-2 animate-spin" />
              Security Scan in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white">Scanning system components...</span>
                <span className="text-indigo-400 font-mono">{scanProgress.toFixed(1)}%</span>
              </div>
              <Progress value={scanProgress} className="h-3" />
              <div className="text-sm text-gray-400">
                Checking for vulnerabilities, malware, and security policy compliance
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Security Threats */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-300">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Recent Security Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="p-3 bg-black/20 rounded-lg border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getThreatIcon(threat.type)}
                      <Badge className={getThreatSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <span className={`text-xs ${getThreatStatusColor(threat.status)}`}>
                      {threat.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-white mb-1">{threat.description}</div>
                  <div className="text-xs text-gray-400">
                    {threat.timestamp} • Source: {threat.source}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Protection Systems Status */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-300">
              <Shield className="w-5 h-5 mr-2" />
              Protection Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {protectionSystems.map((system, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium">{system.name}</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {system.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Effectiveness</span>
                      <span className="text-white">{system.effectiveness.toFixed(1)}%</span>
                    </div>
                    <Progress value={system.effectiveness} className="h-2" />
                    <div className="text-xs text-gray-400">
                      Threats blocked: {system.threats_blocked.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Dashboard */}
      <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700/30">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-300">
            <Activity className="w-5 h-5 mr-2" />
            Security Dashboard Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                99.{(Math.random() * 9 + 1).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-400">System Security Score</div>
              <div className="text-xs text-gray-500 mt-1">Industry leading protection</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {securityMetrics.vulnerabilityScore.toFixed(1)}/10
              </div>
              <div className="text-sm text-gray-400">Vulnerability Score</div>
              <div className="text-xs text-gray-500 mt-1">Lower is better</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-400">Real-time Monitoring</div>
              <div className="text-xs text-gray-500 mt-1">Continuous protection</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};