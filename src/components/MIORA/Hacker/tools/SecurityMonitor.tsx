import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Activity, Wifi, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: 'login' | 'network' | 'file' | 'system' | 'threat';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  message: string;
  status: 'active' | 'resolved' | 'investigating';
}

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkActivity: number;
  threatLevel: number;
  activeSessions: number;
  blockedAttempts: number;
}

export const SecurityMonitor: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 45,
    memoryUsage: 62,
    networkActivity: 38,
    threatLevel: 15,
    activeSessions: 3,
    blockedAttempts: 0
  });

  const generateMockEvent = (): SecurityEvent => {
    const eventTypes = ['login', 'network', 'file', 'system', 'threat'] as const;
    const severities = ['low', 'medium', 'high', 'critical'] as const;
    const sources = ['192.168.1.100', '192.168.1.101', 'localhost', 'firewall', 'antivirus'];
    
    const messages = {
      login: ['Successful user login', 'Failed login attempt detected', 'User logout recorded'],
      network: ['Unusual network traffic detected', 'Port scan activity', 'New device connected'],
      file: ['File access recorded', 'Suspicious file modification', 'File encryption detected'],
      system: ['System service started', 'Registry modification', 'Process spawned'],
      threat: ['Malware signature detected', 'Suspicious behavior analysis', 'Threat blocked']
    };

    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    return {
      id: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      severity,
      source: sources[Math.floor(Math.random() * sources.length)],
      message: messages[type][Math.floor(Math.random() * messages[type].length)],
      status: Math.random() > 0.8 ? 'investigating' : Math.random() > 0.3 ? 'active' : 'resolved'
    };
  };

  const updateMetrics = () => {
    setMetrics(prev => ({
      cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
      memoryUsage: Math.max(20, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
      networkActivity: Math.max(5, Math.min(95, prev.networkActivity + (Math.random() - 0.5) * 15)),
      threatLevel: Math.max(0, Math.min(100, prev.threatLevel + (Math.random() - 0.7) * 5)),
      activeSessions: Math.max(1, Math.min(10, prev.activeSessions + Math.floor((Math.random() - 0.5) * 2))),
      blockedAttempts: prev.blockedAttempts + (Math.random() > 0.9 ? 1 : 0)
    }));
  };

  useEffect(() => {
    if (!isMonitoring) return;

    const eventInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new event
        const newEvent = generateMockEvent();
        setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // Keep only last 50 events
      }
    }, 2000);

    const metricsInterval = setInterval(updateMetrics, 1500);

    return () => {
      clearInterval(eventInterval);
      clearInterval(metricsInterval);
    };
  }, [isMonitoring]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-600';
      case 'investigating': return 'bg-yellow-600';
      case 'resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return <Eye className="h-4 w-4" />;
      case 'network': return <Wifi className="h-4 w-4" />;
      case 'file': return <Shield className="h-4 w-4" />;
      case 'system': return <Activity className="h-4 w-4" />;
      case 'threat': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Monitor Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-blue-400" />
          <span className="text-lg font-semibold text-blue-400">Live Security Monitor</span>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={isMonitoring ? 'bg-green-600' : 'bg-gray-600'}>
            {isMonitoring ? 'MONITORING' : 'STOPPED'}
          </Badge>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-md font-semibold ${
              isMonitoring 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isMonitoring ? 'STOP MONITOR' : 'START MONITOR'}
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-black/40 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-400">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{metrics.cpuUsage.toFixed(1)}%</div>
              <Progress value={metrics.cpuUsage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-400">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{metrics.memoryUsage.toFixed(1)}%</div>
              <Progress value={metrics.memoryUsage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-400">Network Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{metrics.networkActivity.toFixed(1)}%</div>
              <Progress value={metrics.networkActivity} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-400">Threat Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{metrics.threatLevel.toFixed(1)}%</div>
              <Progress value={metrics.threatLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-yellow-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-400">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.activeSessions}</div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-400">Blocked Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.blockedAttempts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Events */}
      {events.length > 0 && (
        <Card className="bg-black/40 border-gray-600/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>🔍 Security Events ({events.length})</span>
              <button
                onClick={() => setEvents([])}
                className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded"
              >
                CLEAR
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border ${getSeverityColor(event.severity)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(event.type)}
                      <span className="text-sm font-semibold capitalize">{event.type}</span>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {event.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-1">{event.message}</div>
                  <div className="text-xs text-gray-500">Source: {event.source}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Information */}
      <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h5 className="text-blue-400 font-semibold mb-2">📚 Security Monitoring Concepts</h5>
        <ul className="text-xs text-blue-300 space-y-1">
          <li>• SIEM (Security Information and Event Management) systems collect and analyze security events</li>
          <li>• Real-time monitoring helps detect threats as they occur</li>
          <li>• Event correlation can identify patterns that indicate sophisticated attacks</li>
          <li>• This is a simulation - real tools include Splunk, ELK Stack, and QRadar</li>
        </ul>
      </div>
    </div>
  );
};