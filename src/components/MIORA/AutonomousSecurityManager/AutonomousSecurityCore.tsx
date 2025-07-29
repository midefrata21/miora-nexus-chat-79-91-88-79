import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAutonomousSecurityManager } from '@/hooks/useAutonomousSecurityManager';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock,
  Play,
  Pause,
  Zap,
  Users,
  Database
} from 'lucide-react';

export const AutonomousSecurityCore = () => {
  const {
    isActive,
    threats,
    mechanisms,
    accessRules,
    securityStats,
    activateAutonomousSecurity,
    deactivateAutonomousSecurity,
    performSecurityScan,
    detectThreat
  } = useAutonomousSecurityManager();

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'intrusion': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'malware': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'unauthorized-access': return <Lock className="w-4 h-4 text-yellow-400" />;
      case 'ddos': return <Activity className="w-4 h-4 text-orange-400" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getMechanismIcon = (type: string) => {
    switch (type) {
      case 'firewall': return <Shield className="w-4 h-4" />;
      case 'antivirus': return <Eye className="w-4 h-4" />;
      case 'intrusion-detection': return <AlertTriangle className="w-4 h-4" />;
      case 'access-control': return <Lock className="w-4 h-4" />;
      case 'encryption': return <Database className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            🛡️ Autonomous Security Manager
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Self-protection mechanisms, threat detection & response, dan access control automation
          </p>
        </div>

        {/* Control Panel */}
        <Card className="bg-gray-800/50 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-red-400" />
              Security Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "🟢 ACTIVE" : "🔴 INACTIVE"}
                  </Badge>
                  <span className="text-white">Autonomous Security</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    Score: {securityStats.securityScore}%
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">
                  Real-time threat detection and automated response
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={isActive ? deactivateAutonomousSecurity : activateAutonomousSecurity}
                  variant={isActive ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  onClick={performSecurityScan}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Security Scan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm">Threats Detected</p>
                  <p className="text-2xl font-bold text-white">{securityStats.threatsDetected}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm">Threats Blocked</p>
                  <p className="text-2xl font-bold text-white">{securityStats.threatsBlocked}</p>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm">Active Protections</p>
                  <p className="text-2xl font-bold text-white">{securityStats.activeProtections}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm">Access Attempts</p>
                  <p className="text-2xl font-bold text-white">{securityStats.accessAttempts}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Mechanisms */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-blue-400" />
                Security Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {mechanisms.map((mechanism) => (
                    <div key={mechanism.id} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getMechanismIcon(mechanism.type)}
                          <h4 className="text-white font-medium">{mechanism.name}</h4>
                          <Badge variant={mechanism.status === 'active' ? 'default' : 'secondary'}>
                            {mechanism.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-400">{mechanism.effectivenessScore}%</span>
                          {mechanism.autoResponse && (
                            <div title="Auto Response Enabled">
                              <Zap className="w-3 h-3 text-yellow-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 capitalize">{mechanism.type.replace('-', ' ')}</span>
                        <span className="text-gray-400">
                          {new Date(mechanism.lastUpdate).toLocaleTimeString()}
                        </span>
                      </div>
                      <Progress value={mechanism.effectivenessScore} className="mt-2 h-1" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Recent Threats */}
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Recent Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {threats.slice(0, 10).map((threat) => (
                    <div key={threat.id} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getThreatIcon(threat.type)}
                          <span className="text-white text-sm capitalize">{threat.type.replace('-', ' ')}</span>
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(threat.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">Source: {threat.source}</p>
                      <p className="text-gray-300 text-xs mb-2">{threat.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant={threat.status === 'blocked' ? 'default' : 'secondary'}>
                          {threat.status}
                        </Badge>
                        {threat.response.length > 0 && (
                          <span className="text-xs text-green-400">
                            {threat.response.length} responses
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Access Control Rules */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="w-5 h-5 text-purple-400" />
              Access Control Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessRules.slice(0, 6).map((rule) => (
                <div key={rule.id} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-sm font-medium truncate">{rule.resource}</h4>
                    <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                      {rule.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">User: {rule.user}</p>
                  <p className="text-gray-400 text-xs mb-2">
                    Permissions: {rule.permissions.join(', ')}
                  </p>
                  <p className="text-gray-500 text-xs">{rule.condition}</p>
                  {rule.lastAccessed && (
                    <p className="text-gray-500 text-xs mt-1">
                      Last: {new Date(rule.lastAccessed).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="w-5 h-5 text-yellow-400" />
              Security Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                onClick={() => detectThreat({
                  type: 'intrusion',
                  severity: 'high',
                  source: 'test-source',
                  description: 'Manual threat simulation'
                })}
                className="flex items-center gap-2"
                variant="outline"
              >
                <AlertTriangle className="w-4 h-4" />
                Simulate Threat
              </Button>
              <Button
                onClick={performSecurityScan}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Deep Scan
              </Button>
              <Button
                onClick={() => {}}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Update Rules
              </Button>
              <Button
                onClick={() => {}}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Enhance Protection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};