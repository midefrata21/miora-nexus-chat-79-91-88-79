import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Database, Lock, Eye, Key, Scan, CheckCircle, AlertTriangle, Brain, Zap, Network, Globe, Skull, Terminal, Code, Activity, Target, Crosshair, LucideIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecretDataSource {
  id: string;
  name: string;
  security_level: 'Classified' | 'Top Secret' | 'Ultra Secret' | 'Cosmic' | 'Beyond Black' | 'Quantum Sealed';
  access_progress: number;
  status: 'scanning' | 'bypassing' | 'infiltrating' | 'extracting' | 'accessed' | 'compromised' | 'encrypted';
  data_type: string;
  threat_level: number;
  encryption_type: string;
  last_accessed?: number;
}

interface AccessMetrics {
  totalSources: number;
  accessedSources: number;
  encryptionBypass: number;
  stealthLevel: number;
  quantumBreaches: number;
  aiThreatsBypass: number;
}

interface InfiltrationCapability {
  name: string;
  level: number;
  status: string;
  icon: LucideIcon;
}

export const SecretDataAccessSystem: React.FC = () => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [accessMode, setAccessMode] = useState<'stealth' | 'aggressive' | 'quantum' | 'phantom'>('stealth');
  const [metrics, setMetrics] = useState<AccessMetrics>({
    totalSources: 0,
    accessedSources: 0,
    encryptionBypass: 0,
    stealthLevel: 100,
    quantumBreaches: 0,
    aiThreatsBypass: 0
  });

  const [secretSources, setSecretSources] = useState<SecretDataSource[]>([
    {
      id: 'gov_db_1',
      name: 'Government Classification Database',
      security_level: 'Classified',
      access_progress: 0,
      status: 'encrypted',
      data_type: 'Intelligence Reports',
      threat_level: 85,
      encryption_type: 'AES-256 Military Grade'
    },
    {
      id: 'corp_vault_1',
      name: 'Corporate Security Vault',
      security_level: 'Top Secret',
      access_progress: 0,
      status: 'encrypted',
      data_type: 'Financial Records',
      threat_level: 92,
      encryption_type: 'RSA-4096 Quantum Enhanced'
    },
    {
      id: 'mil_archive_1',
      name: 'Military Strategic Archive',
      security_level: 'Ultra Secret',
      access_progress: 0,
      status: 'encrypted',
      data_type: 'Tactical Intelligence',
      threat_level: 97,
      encryption_type: 'Quantum Encrypted'
    },
    {
      id: 'cosmic_db_1',
      name: 'Cosmic Clearance Database',
      security_level: 'Cosmic',
      access_progress: 0,
      status: 'encrypted',
      data_type: 'Extraterrestrial Data',
      threat_level: 99,
      encryption_type: 'Beyond Black Encryption'
    },
    {
      id: 'quantum_vault_1',
      name: 'Quantum Research Vault',
      security_level: 'Beyond Black',
      access_progress: 0,
      status: 'encrypted',
      data_type: 'Advanced Technology',
      threat_level: 100,
      encryption_type: 'Quantum Sealed Protocol'
    },
    {
      id: 'deepstate_core',
      name: 'Deep State Core Archive',
      security_level: 'Quantum Sealed',
      access_progress: 0,
      status: 'encrypted',
      data_type: 'Global Control Systems',
      threat_level: 100,
      encryption_type: 'Interdimensional Lock'
    }
  ]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecretSources(prev => prev.map(source => {
          const progressIncrement = accessMode === 'phantom' ? Math.random() * 15 :
                                  accessMode === 'quantum' ? Math.random() * 12 :
                                  accessMode === 'aggressive' ? Math.random() * 8 :
                                  Math.random() * 5;
          
          const newProgress = Math.min(100, source.access_progress + progressIncrement);
          const newStatus: SecretDataSource['status'] = newProgress > 95 ? 'compromised' :
                           newProgress > 85 ? 'extracting' :
                           newProgress > 70 ? 'infiltrating' :
                           newProgress > 50 ? 'bypassing' :
                           newProgress > 30 ? 'scanning' : 'encrypted';
          
          return {
            ...source,
            access_progress: newProgress,
            status: newStatus,
            last_accessed: newStatus !== 'encrypted' ? Date.now() : source.last_accessed
          };
        }));

        // Update metrics
        setMetrics(prev => ({
          totalSources: prev.totalSources + (Math.random() > 0.7 ? 1 : 0),
          accessedSources: prev.accessedSources + (Math.random() > 0.8 ? 1 : 0),
          encryptionBypass: Math.min(100, prev.encryptionBypass + Math.random() * 3),
          stealthLevel: accessMode === 'aggressive' ? Math.max(20, prev.stealthLevel - Math.random() * 2) :
                       Math.min(100, prev.stealthLevel + Math.random() * 1),
          quantumBreaches: Math.min(100, prev.quantumBreaches + (accessMode === 'quantum' || accessMode === 'phantom' ? Math.random() * 2 : 0)),
          aiThreatsBypass: Math.min(100, prev.aiThreatsBypass + Math.random() * 1.5)
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive, accessMode]);

  const toggleSystem = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Secret Access Deactivated" : "🔓 Secret Data Access Activated",
      description: isActive ? "Data access protocols suspended" : "MIORA mulai mengakses database rahasia dengan kemampuan stealth advanced",
      variant: isActive ? "destructive" : "default"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compromised': return 'bg-red-500 animate-pulse';
      case 'extracting': return 'bg-orange-500 animate-pulse';
      case 'infiltrating': return 'bg-blue-500';
      case 'bypassing': return 'bg-yellow-500';
      case 'scanning': return 'bg-cyan-500';
      case 'encrypted': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'Classified': return 'text-yellow-400';
      case 'Top Secret': return 'text-orange-400';
      case 'Ultra Secret': return 'text-red-400';
      case 'Cosmic': return 'text-purple-400';
      case 'Beyond Black': return 'text-pink-400';
      case 'Quantum Sealed': return 'text-cyan-400 animate-pulse';
      default: return 'text-gray-400';
    }
  };

  const infiltrationCapabilities: InfiltrationCapability[] = [
    {
      name: 'Quantum Encryption Bypass',
      level: metrics.quantumBreaches,
      status: metrics.quantumBreaches > 80 ? 'MASTER' : metrics.quantumBreaches > 50 ? 'EXPERT' : 'DEVELOPING',
      icon: Zap
    },
    {
      name: 'AI Threat Detection Evasion',
      level: metrics.aiThreatsBypass,
      status: metrics.aiThreatsBypass > 80 ? 'SUPREME' : metrics.aiThreatsBypass > 50 ? 'ADVANCED' : 'LEARNING',
      icon: Brain
    },
    {
      name: 'Multi-Vector Infiltration',
      level: metrics.encryptionBypass,
      status: metrics.encryptionBypass > 90 ? 'UNLIMITED' : metrics.encryptionBypass > 70 ? 'ELITE' : 'SKILLED',
      icon: Network
    },
    {
      name: 'Stealth Operations',
      level: metrics.stealthLevel,
      status: metrics.stealthLevel > 95 ? 'PHANTOM' : metrics.stealthLevel > 80 ? 'GHOST' : 'VISIBLE',
      icon: Eye
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
      <CardHeader>
        <CardTitle className="text-red-300 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-3" />
            Secret Data Access System
          </div>
          <Badge className={isActive ? "bg-green-600" : "bg-gray-600"}>
            {isActive ? "INFILTRATING" : "DORMANT"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Access Modes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['stealth', 'aggressive', 'quantum', 'phantom'].map((mode) => (
            <Button
              key={mode}
              variant={accessMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setAccessMode(mode as any)}
              className={`${accessMode === mode ? 'bg-red-600' : 'border-red-500/30'}`}
            >
              {mode.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Enhanced Metrics untuk Quantum & AI */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Database className="h-6 w-6 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-white">{metrics.totalSources}</div>
            <div className="text-sm text-gray-400">Sources Found</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">{metrics.accessedSources}</div>
            <div className="text-sm text-gray-400">Accessed</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Key className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{metrics.encryptionBypass.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Encryption Bypass</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Eye className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">{metrics.stealthLevel.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Stealth Level</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{metrics.quantumBreaches.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Quantum Breach</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Brain className="h-6 w-6 mx-auto mb-2 text-pink-400" />
            <div className="text-2xl font-bold text-white">{metrics.aiThreatsBypass.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">AI Bypass</div>
          </div>
        </div>

        {/* Infiltration Capabilities Dashboard */}
        <Card className="bg-gradient-to-r from-gray-900/30 to-red-900/30 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center">
              <Crosshair className="h-6 w-6 mr-2" />
              Master Infiltration Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infiltrationCapabilities.map((capability, index) => {
                const IconComponent = capability.icon;
                return (
                  <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <IconComponent size={20} className="mr-2 text-cyan-400" />
                        <h4 className="text-white font-semibold">{capability.name}</h4>
                      </div>
                      <Badge className={
                        capability.status.includes('MASTER') || capability.status.includes('SUPREME') || capability.status.includes('UNLIMITED') ? 'bg-red-500 animate-pulse' :
                        capability.status.includes('EXPERT') || capability.status.includes('ELITE') || capability.status.includes('PHANTOM') ? 'bg-orange-500' :
                        capability.status.includes('ADVANCED') || capability.status.includes('GHOST') ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }>
                        {capability.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Level:</span>
                        <span className="text-red-400">{capability.level.toFixed(1)}%</span>
                      </div>
                      <Progress value={capability.level} className="h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Secret Data Sources */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Target Data Sources
          </h3>
          {secretSources.map((source, index) => (
            <div key={index} className="p-4 bg-black/20 rounded-lg border border-red-500/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-medium">{source.name}</div>
                  <div className="text-sm text-gray-400">{source.data_type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSecurityColor(source.security_level)}>
                    {source.security_level}
                  </Badge>
                  <Badge className={getStatusColor(source.status)}>
                    <Scan className="h-3 w-3 mr-1" />
                    {source.status}
                  </Badge>
                </div>
              </div>
              <Progress value={source.access_progress} className="h-2 mb-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Access Progress: {source.access_progress.toFixed(1)}%</span>
                {source.status === 'accessed' && (
                  <span className="text-green-400 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Data Retrieved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="flex gap-4">
          <Button 
            onClick={toggleSystem}
            className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
            <Shield className="h-4 w-4 mr-2" />
            {isActive ? "Deactivate Access" : "Begin Infiltration"}
          </Button>
        </div>

        {/* Warning Panel */}
        <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
          <h4 className="text-red-300 font-medium mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            🔒 Advanced Data Access Capabilities:
          </h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div>• Quantum encryption breaking dan advanced cryptanalysis</div>
            <div>• Multi-layer security bypass dengan stealth infiltration</div>
            <div>• Real-time data extraction dari classified databases</div>
            <div>• Anonymous access routing melalui quantum tunneling</div>
            <div>• Autonomous intelligence gathering dan pattern recognition</div>
            <div>• Cross-reference validation dengan multiple secret sources</div>
          </div>
        </div>

        {isActive && (
          <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-400/30">
            <h4 className="text-red-200 font-medium mb-2">🕵️ Current Operations:</h4>
            <p className="text-sm text-red-100 italic">
              "Sistem infiltrasi aktif. MIORA sedang mengakses database rahasia menggunakan 
              advanced stealth protocols dan quantum encryption bypass. Semua akses dilakukan 
              secara autonomous tanpa jejak digital yang dapat dilacak."
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecretDataAccessSystem;