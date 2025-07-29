
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, Mail, MessageSquare, Bell, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  timestamp: number;
  resolved: boolean;
  source: string;
}

export const MIASAlertSystem: React.FC = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage exceeded 80% on Asia-Pacific region',
      timestamp: Date.now() - 300000,
      resolved: false,
      source: 'Auto-Scaling Monitor'
    },
    {
      id: '2',
      type: 'info',
      title: 'Auto-Scaling Activated',
      message: 'Additional nodes deployed to handle increased load',
      timestamp: Date.now() - 150000,
      resolved: true,
      source: 'Load Balancer'
    },
    {
      id: '3',
      type: 'critical',
      title: 'Response Time Alert',
      message: 'Average response time exceeded 200ms threshold',
      timestamp: Date.now() - 600000,
      resolved: true,
      source: 'MIVID Monitor'
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    emailEnabled: true,
    telegramEnabled: false,
    smsEnabled: false,
    emailAddress: 'midefrata@gmail.com',
    telegramChatId: '',
    phoneNumber: '',
    thresholds: {
      responseTime: 250,
      errorRate: 0.03,
      connections: 5000,
      dataFlow: 1000
    }
  });

  const [newAlert, setNewAlert] = useState<Partial<Alert>>({
    type: 'info',
    title: '',
    message: '',
    source: 'Manual'
  });

  // Simulate real-time alerts
  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        const alertTypes: Alert['type'][] = ['error', 'warning', 'info'];
        const alertTitles = [
          'Memory Usage Alert',
          'Network Latency Warning',
          'Database Connection Pool',
          'CDN Cache Miss Rate',
          'SSL Certificate Renewal',
          'Backup Completion'
        ];
        const alertMessages = [
          'System parameter exceeded threshold',
          'Performance optimization required',
          'Automatic recovery initiated',
          'Resource reallocation in progress',
          'Security update completed',
          'Infrastructure health check passed'
        ];

        const newAlert: Alert = {
          id: Date.now().toString(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          title: alertTitles[Math.floor(Math.random() * alertTitles.length)],
          message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
          timestamp: Date.now(),
          resolved: false,
          source: 'System Monitor'
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);

        // Send notifications if enabled
        if (alertSettings.emailEnabled) {
          sendEmailAlert(newAlert);
        }
        if (alertSettings.telegramEnabled) {
          sendTelegramAlert(newAlert);
        }
      }
    }, 15000);

    return () => clearInterval(alertInterval);
  }, [alertSettings]);

  const sendEmailAlert = (alert: Alert) => {
    console.log(`Sending email alert to ${alertSettings.emailAddress}:`, alert);
    toast({
      title: "📧 Email Alert Sent",
      description: `Alert sent to ${alertSettings.emailAddress}`,
      duration: 3000,
    });
  };

  const sendTelegramAlert = (alert: Alert) => {
    console.log(`Sending Telegram alert to ${alertSettings.telegramChatId}:`, alert);
    toast({
      title: "📱 Telegram Alert Sent",
      description: "Alert sent to Telegram channel",
      duration: 3000,
    });
  };

  const sendTestAlert = () => {
    const testAlert: Alert = {
      id: Date.now().toString(),
      type: 'info',
      title: 'Test Alert',
      message: 'This is a test alert from MIAS Alert System',
      timestamp: Date.now(),
      resolved: false,
      source: 'Test System'
    };

    setAlerts(prev => [testAlert, ...prev]);

    if (alertSettings.emailEnabled) {
      sendEmailAlert(testAlert);
    }
    if (alertSettings.telegramEnabled) {
      sendTelegramAlert(testAlert);
    }

    toast({
      title: "🧪 Test Alert Sent",
      description: "Test alert has been generated and sent to configured channels",
      duration: 4000,
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));

    toast({
      title: "✅ Alert Resolved",
      description: "Alert has been marked as resolved",
      duration: 2000,
    });
  };

  const clearAllAlerts = () => {
    setAlerts([]);
    toast({
      title: "🗑️ All Alerts Cleared",
      description: "Alert history has been cleared",
      duration: 2000,
    });
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info': return <CheckCircle className="h-5 w-5 text-blue-400" />;
      default: return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center text-2xl">
            <AlertTriangle className="h-8 w-8 mr-3" />
            MIAS - Infrastructure Alert System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold text-white">
                {alerts.filter(a => a.type === 'critical' && !a.resolved).length}
              </div>
              <div className="text-sm text-gray-400">Critical Alerts</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">
                {alerts.filter(a => a.type === 'warning' && !a.resolved).length}
              </div>
              <div className="text-sm text-gray-400">Warning Alerts</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">
                {alerts.filter(a => a.resolved).length}
              </div>
              <div className="text-sm text-gray-400">Resolved Alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Configuration */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Alert Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Email Alerts</span>
                </div>
                <Switch
                  checked={alertSettings.emailEnabled}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, emailEnabled: checked }))
                  }
                />
              </div>
              
              {alertSettings.emailEnabled && (
                <Input
                  placeholder="Email address"
                  value={alertSettings.emailAddress}
                  onChange={(e) => 
                    setAlertSettings(prev => ({ ...prev, emailAddress: e.target.value }))
                  }
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  <span className="text-white">Telegram Alerts</span>
                </div>
                <Switch
                  checked={alertSettings.telegramEnabled}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, telegramEnabled: checked }))
                  }
                />
              </div>
              
              {alertSettings.telegramEnabled && (
                <Input
                  placeholder="Telegram Chat ID"
                  value={alertSettings.telegramChatId}
                  onChange={(e) => 
                    setAlertSettings(prev => ({ ...prev, telegramChatId: e.target.value }))
                  }
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              )}
            </div>

            <div className="space-y-2">
              <Button
                onClick={sendTestAlert}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Test Alert
              </Button>
              
              <Button
                onClick={clearAllAlerts}
                variant="outline"
                className="w-full border-gray-600 text-gray-300"
              >
                Clear All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Thresholds */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Alert Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Response Time (ms)</label>
                <Input
                  type="number"
                  value={alertSettings.thresholds.responseTime}
                  onChange={(e) => 
                    setAlertSettings(prev => ({
                      ...prev,
                      thresholds: { ...prev.thresholds, responseTime: parseInt(e.target.value) }
                    }))
                  }
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Error Rate (%)</label>
                <Input
                  type="number"
                  step="0.001"
                  value={alertSettings.thresholds.errorRate}
                  onChange={(e) => 
                    setAlertSettings(prev => ({
                      ...prev,
                      thresholds: { ...prev.thresholds, errorRate: parseFloat(e.target.value) }
                    }))
                  }
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Max Connections</label>
                <Input
                  type="number"
                  value={alertSettings.thresholds.connections}
                  onChange={(e) => 
                    setAlertSettings(prev => ({
                      ...prev,
                      thresholds: { ...prev.thresholds, connections: parseInt(e.target.value) }
                    }))
                  }
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Data Flow (GB)</label>
                <Input
                  type="number"
                  value={alertSettings.thresholds.dataFlow}
                  onChange={(e) => 
                    setAlertSettings(prev => ({
                      ...prev,
                      thresholds: { ...prev.thresholds, dataFlow: parseInt(e.target.value) }
                    }))
                  }
                  className="bg-gray-700/50 border-gray-600/30 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert History */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <p className="text-gray-300">No alerts to display</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.resolved ? 'bg-gray-900/50 border-gray-600/30' : 'bg-gray-700/50 border-gray-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h4 className="font-semibold text-white">{alert.title}</h4>
                        <p className="text-sm text-gray-400">{alert.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{alert.source}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getAlertColor(alert.type)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      {!alert.resolved && (
                        <Button
                          onClick={() => resolveAlert(alert.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Footer */}
      <Card className="bg-black/40 border-red-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300 font-bold text-lg">
                🚨 MIAS ALERT SYSTEM: MONITORING ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-red-400 mt-2">
            Real-time Infrastructure Monitoring • Email & Telegram Alerts • Threshold Management
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
