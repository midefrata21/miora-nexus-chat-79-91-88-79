import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Terminal, Shield, Target, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface PenTestResult {
  phase: string;
  status: 'success' | 'failed' | 'partial';
  findings: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const PenetrationTesting: React.FC = () => {
  const [target, setTarget] = useState('');
  const [testType, setTestType] = useState<'network' | 'web' | 'wireless' | 'social'>('network');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [results, setResults] = useState<PenTestResult[]>([]);
  const [authorizedTarget, setAuthorizedTarget] = useState(false);

  const penTestPhases = {
    network: [
      'Reconnaissance and Information Gathering',
      'Network Discovery and Port Scanning',
      'Service Enumeration and Banner Grabbing',
      'Vulnerability Assessment',
      'Exploitation Attempts',
      'Post-Exploitation Analysis',
      'Report Generation'
    ],
    web: [
      'Web Application Reconnaissance',
      'Input Validation Testing',
      'Authentication Testing',
      'Session Management Analysis',
      'SQL Injection Testing',
      'Cross-Site Scripting (XSS) Testing',
      'Security Misconfiguration Check'
    ],
    wireless: [
      'Wireless Network Discovery',
      'Encryption Analysis',
      'Access Point Security Testing',
      'Client Device Assessment',
      'Man-in-the-Middle Testing',
      'Rogue AP Detection'
    ],
    social: [
      'Information Gathering (OSINT)',
      'Social Media Analysis',
      'Email Security Testing',
      'Phishing Simulation',
      'Physical Security Assessment',
      'Human Factor Analysis'
    ]
  };

  const generateMockResults = (phase: string, testType: string): PenTestResult => {
    const findings = {
      network: [
        'Open ports detected: 22, 80, 443, 3389',
        'Outdated SSH version identified',
        'Web server banner information disclosed',
        'Default credentials found on service'
      ],
      web: [
        'SQL injection vulnerability in login form',
        'Missing Content Security Policy headers',
        'Weak session management implementation',
        'Sensitive information in HTML comments'
      ],
      wireless: [
        'WEP encryption detected (deprecated)',
        'Default SSID naming convention used',
        'WPS PIN attack successful',
        'Weak wireless password policy'
      ],
      social: [
        'Employee email addresses harvested',
        'Social media information disclosure',
        'Phishing email success rate: 15%',
        'Physical security gaps identified'
      ]
    };

    const recommendations = {
      network: [
        'Update SSH to latest version',
        'Implement proper firewall rules',
        'Disable unnecessary services',
        'Change default credentials'
      ],
      web: [
        'Implement parameterized queries',
        'Add security headers',
        'Strengthen session management',
        'Remove sensitive comments'
      ],
      wireless: [
        'Upgrade to WPA3 encryption',
        'Change default SSID',
        'Disable WPS feature',
        'Implement strong password policy'
      ],
      social: [
        'Implement email security training',
        'Review social media policies',
        'Conduct regular phishing simulations',
        'Improve physical access controls'
      ]
    };

    const riskLevels: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
    const statuses: ('success' | 'failed' | 'partial')[] = ['success', 'failed', 'partial'];

    return {
      phase,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      findings: findings[testType].slice(0, Math.floor(Math.random() * 3) + 1),
      recommendations: recommendations[testType].slice(0, Math.floor(Math.random() * 3) + 1),
      riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)]
    };
  };

  const startPenTest = async () => {
    if (!target || !authorizedTarget) {
      alert('Please confirm you have authorization to test this target!');
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setResults([]);
    
    const phases = penTestPhases[testType];
    
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      setCurrentPhase(phase);
      
      // Simulate phase execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProgress(((i + 1) / phases.length) * 100);
      
      // Generate mock results for this phase
      const phaseResult = generateMockResults(phase, testType);
      setResults(prev => [...prev, phaseResult]);
      
      console.log(`🔍 ${phase} completed - Status: ${phaseResult.status}`);
    }
    
    setCurrentPhase('');
    setIsRunning(false);
    console.log(`🔒 Penetration test complete: ${results.length} phases executed`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <X className="h-4 w-4 text-red-400" />;
      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default: return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {/* Authorization Warning */}
      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div className="flex items-center text-red-400 mb-3">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="font-semibold">CRITICAL: Authorization Required</span>
        </div>
        <p className="text-sm text-red-300 mb-3">
          Penetration testing must ONLY be performed on systems you own or have explicit written authorization to test.
          Unauthorized penetration testing is illegal and may result in criminal charges.
        </p>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="authorized"
            checked={authorizedTarget}
            onChange={(e) => setAuthorizedTarget(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="authorized" className="text-sm text-red-300">
            I confirm I have explicit authorization to test this target
          </label>
        </div>
      </div>

      {/* Test Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Target</label>
          <Input
            placeholder="target.example.com"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="bg-black/40 border-gray-600"
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Test Type</label>
          <select
            className="w-full p-2 bg-black/40 border border-gray-600 rounded-md text-white"
            value={testType}
            onChange={(e) => setTestType(e.target.value as any)}
          >
            <option value="network">Network Penetration Test</option>
            <option value="web">Web Application Test</option>
            <option value="wireless">Wireless Security Test</option>
            <option value="social">Social Engineering Test</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <Button
            onClick={startPenTest}
            disabled={isRunning || !target || !authorizedTarget}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isRunning ? 'TESTING...' : 'START PENTEST'}
          </Button>
        </div>
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>{currentPhase}</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full bg-black/40">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['critical', 'high', 'medium', 'low'].map(risk => {
                const count = results.filter(r => r.riskLevel === risk).length;
                return (
                  <div key={risk} className={`p-3 rounded-lg border ${getRiskColor(risk)}/20 border-${risk === 'critical' ? 'red' : risk === 'high' ? 'orange' : risk === 'medium' ? 'yellow' : 'blue'}-500/30`}>
                    <div className="text-sm capitalize text-gray-300">{risk} Risk</div>
                    <div className="text-2xl font-bold text-white">{count}</div>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <span className="text-white">{result.phase}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskColor(result.riskLevel)}>
                      {result.riskLevel.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="findings" className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="p-4 bg-gray-900/50 border border-gray-600/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{result.phase}</h4>
                  <Badge className={getRiskColor(result.riskLevel)}>
                    {result.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                
                {result.findings.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-red-400 mb-2">🔍 Findings:</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {result.findings.map((finding, i) => (
                        <li key={i}>• {finding}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.recommendations.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-green-400 mb-2">💡 Recommendations:</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="report">
            <div className="p-4 bg-gray-900/50 border border-gray-600/50 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">📋 Executive Summary</h4>
              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  Penetration testing was conducted on <strong>{target}</strong> using <strong>{testType}</strong> methodology.
                  The assessment identified <strong>{results.length}</strong> areas of analysis with varying risk levels.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-red-400 mb-2">Critical Issues:</h5>
                    <p>{results.filter(r => r.riskLevel === 'critical').length} critical vulnerabilities found</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-400 mb-2">High Priority:</h5>
                    <p>{results.filter(r => r.riskLevel === 'high').length} high-risk issues identified</p>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                  <h5 className="text-blue-400 font-semibold mb-2">📚 Methodology Note</h5>
                  <p className="text-xs">
                    This is an educational simulation of penetration testing. Real penetration tests require
                    proper authorization, detailed planning, and should be conducted by certified professionals.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};