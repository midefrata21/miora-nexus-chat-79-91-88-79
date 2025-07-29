import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, AlertTriangle, CheckCircle, Scan, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SecurityScanner: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);

  const securityStats = {
    vulnerabilitiesFound: 3,
    securityScore: 94.7,
    lastScan: '5 minutes ago',
    threatsBlocked: 127
  };

  const vulnerabilities = [
    {
      type: 'Cross-Site Scripting (XSS)',
      severity: 'Medium',
      file: 'UserInput.tsx',
      line: 34,
      description: 'User input not properly sanitized',
      solution: 'Use DOMPurify or validate input',
      cve: 'CVE-2023-1234',
      impact: 'Data exposure risk'
    },
    {
      type: 'Insecure Direct Object Reference',
      severity: 'High',
      file: 'api/users.ts',
      line: 67,
      description: 'Missing authorization check',
      solution: 'Add user permission validation',
      cve: 'CVE-2023-5678',
      impact: 'Unauthorized access'
    },
    {
      type: 'Sensitive Data Exposure',
      severity: 'Low',
      file: 'config.ts',
      line: 12,
      description: 'API key in source code',
      solution: 'Move to environment variables',
      cve: 'CVE-2023-9012',
      impact: 'API key compromise'
    }
  ];

  const securityChecks = [
    { name: 'SQL Injection', status: 'Protected', details: '0 vulnerabilities found' },
    { name: 'XSS Protection', status: 'Warning', details: '1 potential issue detected' },
    { name: 'CSRF Protection', status: 'Protected', details: 'CSRF tokens implemented' },
    { name: 'Authentication', status: 'Protected', details: 'Secure authentication flow' },
    { name: 'Authorization', status: 'Warning', details: '1 missing permission check' },
    { name: 'Data Encryption', status: 'Protected', details: 'All sensitive data encrypted' },
    { name: 'Input Validation', status: 'Protected', details: 'Comprehensive validation rules' },
    { name: 'Session Management', status: 'Protected', details: 'Secure session handling' }
  ];

  const complianceStatus = [
    { standard: 'OWASP Top 10', compliance: 94, status: 'Compliant' },
    { standard: 'GDPR', compliance: 98, status: 'Compliant' },
    { standard: 'SOC 2', compliance: 91, status: 'Partially Compliant' },
    { standard: 'ISO 27001', compliance: 89, status: 'Partially Compliant' }
  ];

  const runSecurityScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "🛡️ Security Scan Complete",
        description: `Found ${vulnerabilities.length} vulnerabilities. Security score: ${securityStats.securityScore}%`
      });
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-amber-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-amber-300">
            <Lock className="w-6 h-6" />
            Advanced Security Scanner
            <Badge className="bg-amber-600/20 text-amber-300">Real-time Protection</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">{securityStats.vulnerabilitiesFound}</div>
              <div className="text-xs text-gray-400">Vulnerabilities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{securityStats.securityScore}%</div>
              <div className="text-xs text-gray-400">Security Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{securityStats.threatsBlocked}</div>
              <div className="text-xs text-gray-400">Threats Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-300">{securityStats.lastScan}</div>
              <div className="text-xs text-gray-400">Last Scan</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-600/20 text-green-300">
                Real-time Scanning Active
              </Badge>
              <span className="text-sm text-gray-300">
                Continuous vulnerability monitoring
              </span>
            </div>
            <Button 
              onClick={runSecurityScan}
              disabled={isScanning}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Run Deep Scan
                </>
              )}
            </Button>
          </div>

          <Card className="bg-black/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-300 text-lg">Detected Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vulnerabilities.map((vuln, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={`${
                        vuln.severity === 'High' ? 'bg-red-600/20 text-red-300' :
                        vuln.severity === 'Medium' ? 'bg-yellow-600/20 text-yellow-300' :
                        'bg-blue-600/20 text-blue-300'
                      }`}>
                        {vuln.severity}
                      </Badge>
                      <span className="text-white font-medium">{vuln.type}</span>
                    </div>
                    <span className="text-sm text-gray-400">{vuln.file}:{vuln.line}</span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="text-sm text-gray-300">{vuln.description}</div>
                    <div className="text-sm text-red-300">Impact: {vuln.impact}</div>
                    <div className="text-sm text-green-400">💡 Solution: {vuln.solution}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gray-600/20 text-gray-300 text-xs">
                      {vuln.cve}
                    </Badge>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Auto-fix
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-300 text-lg">Security Checks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {securityChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {check.status === 'Protected' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-white font-medium">{check.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">{check.details}</span>
                    <Badge className={`${
                      check.status === 'Protected' ? 'bg-green-600/20 text-green-300' :
                      'bg-yellow-600/20 text-yellow-300'
                    }`}>
                      {check.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-amber-300 text-lg">Compliance Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceStatus.map((standard, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <span className="text-white font-medium">{standard.standard}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-300">
                      {standard.compliance}% compliant
                    </div>
                    <div className={`w-20 h-2 bg-gray-700 rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full transition-all ${
                          standard.compliance >= 95 ? 'bg-green-500' :
                          standard.compliance >= 90 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${standard.compliance}%` }}
                      />
                    </div>
                    <Badge className={`text-xs ${
                      standard.status === 'Compliant' ? 'bg-green-600/20 text-green-300' :
                      'bg-yellow-600/20 text-yellow-300'
                    }`}>
                      {standard.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityScanner;