import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestTube, Bug, CheckCircle, XCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TestCase {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security' | 'api';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  duration: number;
  coverage: number;
  description: string;
  errors?: string[];
  timestamp: number;
}

interface TestSuite {
  id: string;
  name: string;
  tests: TestCase[];
  status: 'idle' | 'running' | 'completed';
  totalTests: number;
  passedTests: number;
  failedTests: number;
  coverage: number;
}

export const AutonomousTestingSuite: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [currentTests, setCurrentTests] = useState<TestCase[]>([]);
  const [testStats, setTestStats] = useState({
    totalTestsRun: 0,
    successRate: 96.8,
    avgTestTime: 1.2,
    codeCoverage: 87.3,
    bugsFound: 0,
    bugsFixed: 0
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate autonomous testing
        if (Math.random() > 0.5) {
          generateTestCase();
        }
        updateTestProgress();
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateTestCase = () => {
    const types: TestCase['type'][] = ['unit', 'integration', 'e2e', 'performance', 'security', 'api'];
    const testNames = [
      'Component render validation',
      'User authentication flow',
      'Database connection test',
      'API response validation',
      'Security vulnerability scan',
      'Performance load testing',
      'Cross-browser compatibility',
      'Memory leak detection',
      'Error handling validation',
      'Data integrity check'
    ];

    const type = types[Math.floor(Math.random() * types.length)];
    const name = testNames[Math.floor(Math.random() * testNames.length)];

    const newTest: TestCase = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      type,
      status: 'pending',
      duration: 0,
      coverage: 0,
      description: `Autonomous ${type} test: ${name}`,
      timestamp: Date.now()
    };

    setCurrentTests(prev => [newTest, ...prev.slice(0, 9)]);
  };

  const updateTestProgress = () => {
    setCurrentTests(prev => prev.map(test => {
      if (test.status === 'pending') {
        return { ...test, status: 'running' as const };
      }
      if (test.status === 'running') {
        const duration = Math.random() * 3 + 0.5; // 0.5-3.5 seconds
        const success = Math.random() > 0.15; // 85% pass rate
        const coverage = Math.floor(Math.random() * 30) + 70; // 70-100% coverage
        
        setTestStats(prev => ({
          ...prev,
          totalTestsRun: prev.totalTestsRun + 1,
          codeCoverage: (prev.codeCoverage + coverage) / 2,
          bugsFound: success ? prev.bugsFound : prev.bugsFound + 1,
          bugsFixed: success ? prev.bugsFixed : prev.bugsFixed + Math.floor(Math.random() * 2)
        }));

        return {
          ...test,
          status: success ? 'passed' as const : 'failed' as const,
          duration,
          coverage,
          errors: success ? undefined : ['Assertion failed: Expected true but got false', 'Network timeout error']
        };
      }
      return test;
    }));
  };

  const toggleTesting = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "🛑 Autonomous Testing Stopped" : "🧪 Autonomous Testing Activated",
      description: isActive ? "Testing suite paused" : "MIORA mulai melakukan testing otomatis",
      duration: 3000,
    });
  };

  const runFullTestSuite = () => {
    toast({
      title: "🚀 Full Test Suite Running",
      description: "Menjalankan comprehensive testing pada seluruh sistem",
      duration: 3000,
    });
    
    // Generate multiple test cases for full suite
    for (let i = 0; i < 5; i++) {
      setTimeout(() => generateTestCase(), i * 500);
    }
  };

  const getTypeIcon = (type: TestCase['type']) => {
    switch (type) {
      case 'unit': return '🔧';
      case 'integration': return '🔗';
      case 'e2e': return '🎯';
      case 'performance': return '⚡';
      case 'security': return '🛡️';
      case 'api': return '🔌';
      default: return '🧪';
    }
  };

  const getStatusColor = (status: TestCase['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600/20 text-yellow-300 border-yellow-400';
      case 'running': return 'bg-blue-600/20 text-blue-300 border-blue-400 animate-pulse';
      case 'passed': return 'bg-green-600/20 text-green-300 border-green-400';
      case 'failed': return 'bg-red-600/20 text-red-300 border-red-400';
      case 'skipped': return 'bg-gray-600/20 text-gray-300 border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-green-300">
            <div className="flex items-center">
              <TestTube className="w-5 h-5 mr-2" />
              Autonomous Testing Suite
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${isActive ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}`}>
                {isActive ? 'TESTING' : 'STANDBY'}
              </Badge>
              <Button
                onClick={runFullTestSuite}
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Full Suite
              </Button>
              <Button
                onClick={toggleTesting}
                variant="outline"
                size="sm"
                className={`${isActive ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}`}
              >
                {isActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isActive ? 'Stop' : 'Start'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{testStats.totalTestsRun}</div>
              <div className="text-sm text-gray-400">Tests Run</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{testStats.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{testStats.avgTestTime}s</div>
              <div className="text-sm text-gray-400">Avg Test Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{testStats.codeCoverage.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Code Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-300">{testStats.bugsFound}</div>
              <div className="text-sm text-gray-400">Bugs Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300">{testStats.bugsFixed}</div>
              <div className="text-sm text-gray-400">Bugs Fixed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Tests */}
      <Card className="bg-gradient-to-r from-gray-900/50 to-green-900/30 border-gray-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-300">
            <Bug className="w-5 h-5 mr-2" />
            Active Test Cases ({currentTests.length} running)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {currentTests.map((test) => (
              <div key={test.id} className="p-4 bg-black/20 rounded-lg border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(test.type)}</span>
                    <span className="font-semibold text-white text-sm">{test.name}</span>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(test.status)}`}>
                      {test.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {test.status === 'passed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                    {test.status === 'failed' && <XCircle className="w-4 h-4 text-red-400" />}
                    {test.duration > 0 && (
                      <span className="text-xs text-gray-400">{test.duration.toFixed(2)}s</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-2">{test.description}</p>
                
                {test.status === 'running' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Testing...</span>
                      <span>Running</span>
                    </div>
                    <Progress value={Math.random() * 100} className="h-2" />
                  </div>
                )}

                {test.coverage > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Coverage</span>
                      <span>{test.coverage}%</span>
                    </div>
                    <Progress value={test.coverage} className="h-1" />
                  </div>
                )}
                
                {test.errors && test.errors.length > 0 && (
                  <div className="mt-2 p-2 bg-red-900/20 rounded border border-red-500/30">
                    <p className="text-red-300 text-xs font-semibold mb-1">Errors:</p>
                    {test.errors.map((error, idx) => (
                      <p key={idx} className="text-red-300 text-xs">• {error}</p>
                    ))}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(test.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}

            {currentTests.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <TestTube className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No tests running</p>
                <p className="text-sm">Activate autonomous testing to start quality assurance</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousTestingSuite;