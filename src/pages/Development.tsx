import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, GitBranch, Database, Server, Cpu, Terminal } from 'lucide-react';
import { HorizontalCategoryMenu } from '@/components/Navigation/HorizontalCategoryMenu';
import { useSystemActivation } from '@/hooks/useSystemActivation';
import SystemActivationButton from '@/components/SystemActivationButton';

const Development: React.FC = () => {
  // Global system activation
  const { isActive, activate, deactivate, logActivity, system } = useSystemActivation(
    'AUTO_DEVELOP',
    'MIORA Development Engine'
  );

  const [devMetrics, setDevMetrics] = useState({
    linesOfCode: 125000,
    componentsBuilt: 342,
    testsRun: 89,
    deploymentsCompleted: 23
  });

  useEffect(() => {
    if (isActive) {
      logActivity('Development dashboard accessed - monitoring project progress');
      const interval = setInterval(() => {
        // Simulate development progress
        setDevMetrics(prev => ({
          linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 500) + 100,
          componentsBuilt: prev.componentsBuilt + Math.floor(Math.random() * 3),
          testsRun: prev.testsRun + Math.floor(Math.random() * 5),
          deploymentsCompleted: prev.deploymentsCompleted + (Math.random() > 0.8 ? 1 : 0)
        }));

        // Log development activities
        const activities = [
          'Auto-generating React components',
          'Optimizing code architecture',
          'Running automated tests',
          'Deploying feature updates',
          'Refactoring legacy code',
          'Building new API endpoints'
        ];
        logActivity(activities[Math.floor(Math.random() * activities.length)]);
      }, 4000);

      return () => clearInterval(interval);  
    }
  }, [isActive, logActivity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-900">
      <HorizontalCategoryMenu />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Code className="w-12 h-12 text-cyan-400" />
              <h1 className="text-4xl font-bold text-white">Development Center</h1>
            </div>
            <p className="text-xl text-cyan-200">Advanced Development Tools & Environment</p>
            <Badge className={`${isActive ? 'bg-green-600/20 text-green-300 border-green-500/30' : 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30'}`}>
              {isActive ? '🟢 Development Engine Active' : '🔧 Development Mode'}
            </Badge>
          </div>

          {/* System Activation */}
          <SystemActivationButton
            systemName="MIORA Development Engine"
            isActive={isActive}
            onActivate={activate}
            onDeactivate={deactivate}
            system={system}
          />

          {/* Development Metrics */}
          {isActive && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-800/50 border-cyan-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{devMetrics.linesOfCode.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Lines of Code</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{devMetrics.componentsBuilt}</div>
                  <div className="text-sm text-gray-400">Components Built</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{devMetrics.testsRun}</div>
                  <div className="text-sm text-gray-400">Tests Run</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{devMetrics.deploymentsCompleted}</div>
                  <div className="text-sm text-gray-400">Deployments</div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Code Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Advanced code editing with AI assistance</p>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Open Editor
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Version Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Git integration and branch management</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Manage Repos
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Database Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Database design and management tools</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access DB Tools
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Server Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Deploy and manage server infrastructure</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Server Console
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-300 flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  Performance Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Monitor application performance metrics</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  View Metrics
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-300 flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  Terminal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Integrated terminal with AI commands</p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Open Terminal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Development;