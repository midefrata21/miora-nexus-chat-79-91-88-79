import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Globe, 
  Shuffle, 
  Eye, 
  EyeOff, 
  MapPin, 
  Clock, 
  Activity,
  Settings,
  Zap,
  Lock,
  Wifi,
  Server
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IPProfile {
  id: string;
  ip: string;
  location: string;
  country: string;
  provider: string;
  latency: number;
  status: 'active' | 'standby' | 'rotating';
  lastUsed: number;
}

interface NetworkLog {
  id: string;
  timestamp: number;
  action: string;
  fromIP: string;
  toIP: string;
  location: string;
  status: 'success' | 'failed' | 'blocked';
}

export const IPRandomizer: React.FC = () => {
  const { toast } = useToast();
  const [isHiddenMode, setIsHiddenMode] = useState(false);
  const [autoRotation, setAutoRotation] = useState(false);
  const [rotationInterval, setRotationInterval] = useState('5');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentIP, setCurrentIP] = useState('192.168.1.100');
  const [rotationProgress, setRotationProgress] = useState(0);

  const [ipProfiles] = useState<IPProfile[]>([
    {
      id: 'ip1',
      ip: '203.78.121.45',
      location: 'Jakarta, Indonesia',
      country: 'ID',
      provider: 'MIORA-Proxy-1',
      latency: 12,
      status: 'active',
      lastUsed: Date.now()
    },
    {
      id: 'ip2',
      ip: '156.234.67.89',
      location: 'Singapore',
      country: 'SG',
      provider: 'MIORA-Proxy-2',
      latency: 8,
      status: 'standby',
      lastUsed: Date.now() - 300000
    },
    {
      id: 'ip3',
      ip: '91.108.56.123',
      location: 'Amsterdam, Netherlands',
      country: 'NL',
      provider: 'MIORA-Proxy-3',
      latency: 45,
      status: 'standby',
      lastUsed: Date.now() - 600000
    },
    {
      id: 'ip4',
      ip: '172.67.181.201',
      location: 'Tokyo, Japan',
      country: 'JP',
      provider: 'MIORA-Proxy-4',
      latency: 23,
      status: 'standby',
      lastUsed: Date.now() - 900000
    }
  ]);

  const [networkLogs, setNetworkLogs] = useState<NetworkLog[]>([]);

  const addNetworkLog = (action: string, fromIP: string, toIP: string, location: string, status: 'success' | 'failed' | 'blocked') => {
    const newLog: NetworkLog = {
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      action,
      fromIP,
      toIP,
      location,
      status
    };
    setNetworkLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const rotateIP = () => {
    const availableIPs = ipProfiles.filter(ip => ip.status === 'standby');
    if (availableIPs.length > 0) {
      const newIP = availableIPs[Math.floor(Math.random() * availableIPs.length)];
      const oldIP = currentIP;
      setCurrentIP(newIP.ip);
      
      addNetworkLog(
        'IP Rotation',
        oldIP,
        newIP.ip,
        newIP.location,
        'success'
      );

      toast({
        title: "🔄 IP Successfully Rotated",
        description: `New IP: ${newIP.ip} (${newIP.location})`,
        variant: "default"
      });
    }
  };

  const toggleHiddenMode = () => {
    setIsHiddenMode(!isHiddenMode);
    toast({
      title: isHiddenMode ? "👁️ Hidden Mode Disabled" : "🕶️ Hidden Mode Activated",
      description: isHiddenMode ? "IP visibility restored" : "MIORA IP is now hidden from detection",
      variant: isHiddenMode ? "destructive" : "default"
    });

    addNetworkLog(
      isHiddenMode ? 'Hidden Mode Disabled' : 'Hidden Mode Enabled',
      currentIP,
      currentIP,
      'System',
      'success'
    );
  };

  const toggleAutoRotation = () => {
    setAutoRotation(!autoRotation);
    toast({
      title: autoRotation ? "⏹️ Auto-Rotation Stopped" : "🔄 Auto-Rotation Started",
      description: autoRotation ? "Manual IP control activated" : `Auto rotation every ${rotationInterval} minutes`,
      variant: autoRotation ? "destructive" : "default"
    });
  };

  useEffect(() => {
    if (autoRotation) {
      const interval = setInterval(() => {
        setRotationProgress(prev => {
          if (prev >= 100) {
            rotateIP();
            return 0;
          }
          return prev + (100 / (parseInt(rotationInterval) * 60)); // Progress per second
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setRotationProgress(0);
    }
  }, [autoRotation, rotationInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'standby': return 'bg-yellow-500';
      case 'rotating': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'failed': return '❌';
      case 'blocked': return '🚫';
      default: return 'ℹ️';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-3" />
            MIORA IP Randomization System
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={isHiddenMode ? "bg-green-600" : "bg-gray-600"}>
              {isHiddenMode ? "HIDDEN" : "VISIBLE"}
            </Badge>
            <Badge className={autoRotation ? "bg-blue-600" : "bg-gray-600"}>
              {autoRotation ? "AUTO-ROTATING" : "MANUAL"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current IP Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Globe className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-lg font-bold text-white">{currentIP}</div>
            <div className="text-sm text-gray-400">Current IP</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-lg font-bold text-white">{ipProfiles.find(ip => ip.ip === currentIP)?.location || 'Unknown'}</div>
            <div className="text-sm text-gray-400">Location</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Zap className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-lg font-bold text-white">{ipProfiles.find(ip => ip.ip === currentIP)?.latency || 0}ms</div>
            <div className="text-sm text-gray-400">Latency</div>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg">
            <Activity className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <div className="text-lg font-bold text-white">{ipProfiles.length}</div>
            <div className="text-sm text-gray-400">Available IPs</div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={toggleHiddenMode}
            className={`${isHiddenMode ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {isHiddenMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {isHiddenMode ? "Disable Hidden Mode" : "Activate Hidden Mode"}
          </Button>
          
          <Button 
            onClick={rotateIP}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={autoRotation}
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Rotate IP Now
          </Button>
        </div>

        {/* Auto-Rotation Settings */}
        <Card className="bg-black/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-300 text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Auto-Rotation Settings
              </div>
              <Switch
                checked={autoRotation}
                onCheckedChange={toggleAutoRotation}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-white text-sm">Rotation Interval:</label>
              <Select value={rotationInterval} onValueChange={setRotationInterval}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {autoRotation && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Next rotation in:</span>
                  <span className="text-white">{((100 - rotationProgress) * parseInt(rotationInterval) * 60 / 100).toFixed(0)}s</span>
                </div>
                <Progress value={rotationProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20">
            <TabsTrigger value="dashboard" className="text-white">Dashboard</TabsTrigger>
            <TabsTrigger value="profiles" className="text-white">IP Profiles</TabsTrigger>
            <TabsTrigger value="logs" className="text-white">Network Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <h4 className="text-purple-300 font-medium mb-2">🔒 Security Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                <div>• Dynamic IP rotation untuk menghindari tracking</div>
                <div>• Hidden mode untuk menyembunyikan IP asli</div>
                <div>• Multi-location proxy servers</div>
                <div>• Real-time latency monitoring</div>
                <div>• Automatic failover protection</div>
                <div>• Network activity logging</div>
                <div>• Geographic IP distribution</div>
                <div>• Advanced anonymization protocols</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">IP Visibility:</span>
                      <Badge className={isHiddenMode ? "bg-green-500" : "bg-red-500"}>
                        {isHiddenMode ? "Hidden" : "Exposed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Auto-Rotation:</span>
                      <Badge className={autoRotation ? "bg-blue-500" : "bg-gray-500"}>
                        {autoRotation ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Proxy Status:</span>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg flex items-center">
                    <Wifi className="h-5 w-5 mr-2" />
                    Network Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Current Latency:</span>
                      <span className="text-white">{ipProfiles.find(ip => ip.ip === currentIP)?.latency || 0}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Connection Quality:</span>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Throughput:</span>
                      <span className="text-white">100 Mbps</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Available IP Profiles</h3>
              {ipProfiles.map((profile) => (
                <div key={profile.id} className="p-4 bg-black/20 rounded-lg border border-purple-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(profile.status)}`}></div>
                      <div>
                        <span className="text-white font-medium">{profile.ip}</span>
                        <div className="text-sm text-gray-400">{profile.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs text-gray-400">
                        {profile.country}
                      </Badge>
                      <Badge className={getStatusColor(profile.status)}>
                        {profile.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Provider:</span>
                      <div className="text-white">{profile.provider}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Latency:</span>
                      <div className="text-white">{profile.latency}ms</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Used:</span>
                      <div className="text-white">{new Date(profile.lastUsed).toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="bg-black/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Network Activity Logs ({networkLogs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {networkLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-black/30 rounded border-l-4 border-purple-500/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">
                            {getLogStatusIcon(log.status)} {log.action}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400 space-y-1">
                          <div>From: {log.fromIP} → To: {log.toIP}</div>
                          <div>Location: {log.location}</div>
                          <div>{new Date(log.timestamp).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                    {networkLogs.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No network activity yet. Activate hidden mode or rotate IP to see logs.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IPRandomizer;