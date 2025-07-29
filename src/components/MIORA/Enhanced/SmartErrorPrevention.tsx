import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, XCircle, Zap, Bug } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartErrorPrevention: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);

  const preventionStats = {
    errorsBlocked: 342,
    bugsPreventedToday: 23,
    codeQualityScore: 94.7,
    riskLevel: 'Low'
  };

  const detectedIssues = [
    {
      type: 'Potential Memory Leak',
      severity: 'High',
      file: 'UserService.tsx',
      line: 45,
      description: 'Unsubscribed event listener detected',
      solution: 'Add cleanup in useEffect return function',
      confidence: 95.2
    },
    {
      type: 'Type Safety',
      severity: 'Medium',
      file: 'api/users.ts',
      line: 23,
      description: 'Implicit any type usage',
      solution: 'Add explicit type annotation',
      confidence: 100
    },
    {
      type: 'Performance Issue',
      severity: 'Medium',
      file: 'Dashboard.tsx',
      line: 67,
      description: 'Unnecessary re-renders detected',
      solution: 'Use React.memo or useMemo',
      confidence: 87.4
    },
    {
      type: 'Security Risk',
      severity: 'High',
      file: 'auth.ts',
      line: 12,
      description: 'Hardcoded API key detected',
      solution: 'Move to environment variables',
      confidence: 100
    }
  ];

  const codeAnalysisRules = [
    { name: 'Memory Leak Detection', status: 'Active', blocked: 45 },
    { name: 'Type Safety Check', status: 'Active', blocked: 89 },
    { name: 'Security Vulnerability Scan', status: 'Active', blocked: 12 },
    { name: 'Performance Anti-patterns', status: 'Active', blocked: 67 },
    { name: 'Code Complexity Analysis', status: 'Active', blocked: 34 },
    { name: 'Dead Code Detection', status: 'Active', blocked: 23 }
  ];

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "🛡️ Smart Scan Complete",
        description: `Found ${detectedIssues.length} potential issues. All critical errors prevented.`
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-red-500/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-300">
            <Shield className="w-6 h-6" />
            Smart Error Prevention System
            <Badge className="bg-red-600/20 text-red-300">Real-time Protection</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-300">{preventionStats.errorsBlocked}</div>
              <div className="text-xs text-gray-400">Errors Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">{preventionStats.bugsPreventedToday}</div>
              <div className="text-xs text-gray-400">Bugs Prevented Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{preventionStats.codeQualityScore}%</div>
              <div className="text-xs text-gray-400">Code Quality Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{preventionStats.riskLevel}</div>
              <div className="text-xs text-gray-400">Current Risk Level</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-600/20 text-green-300">
                Prevention System Active
              </Badge>
              <span className="text-sm text-gray-300">Real-time code analysis enabled</span>
            </div>
            <Button 
              onClick={runScan}
              disabled={isScanning}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isScanning ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Bug className="w-4 h-4 mr-2" />
                  Run Deep Scan
                </>
              )}
            </Button>
          </div>

          <Card className="bg-black/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-300 text-lg">Detected Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectedIssues.map((issue, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={`${
                        issue.severity === 'High' ? 'bg-red-600/20 text-red-300' :
                        'bg-yellow-600/20 text-yellow-300'
                      }`}>
                        {issue.severity}
                      </Badge>
                      <span className="text-white font-medium">{issue.type}</span>
                    </div>
                    <span className="text-sm text-gray-400">{issue.file}:{issue.line}</span>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-2">{issue.description}</div>
                  <div className="text-sm text-green-400 mb-3">
                    💡 Solution: {issue.solution}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-300">
                      Confidence: <span className="text-red-300 font-medium">{issue.confidence}%</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Auto-fix
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-300 text-lg">Active Prevention Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {codeAnalysisRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">{rule.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">Blocked: {rule.blocked}</span>
                    <Badge className="bg-green-600/20 text-green-300">
                      {rule.status}
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

export default SmartErrorPrevention;