import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, Network, Smartphone, Wifi, Home, Watch, Settings } from 'lucide-react';

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'mobile' | 'iot' | 'wearable' | 'smart_home' | 'cloud';
  status: 'connected' | 'syncing' | 'offline';
  sync: number;
}

export const MultiRealityIntegration: React.FC = () => {
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [devices, setDevices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'Smartphone - iPhone 15',
      type: 'mobile',
      status: 'connected',
      sync: 98
    },
    {
      id: '2',
      name: 'Smart Home Hub',
      type: 'smart_home',
      status: 'syncing',
      sync: 76
    },
    {
      id: '3',
      name: 'Apple Watch',
      type: 'wearable',
      status: 'connected',
      sync: 94
    },
    {
      id: '4',
      name: 'Cloud Network',
      type: 'cloud',
      status: 'connected',
      sync: 100
    },
    {
      id: '5',
      name: 'IoT Sensors',
      type: 'iot',
      status: 'offline',
      sync: 45
    }
  ]);

  const [integrationStats, setIntegrationStats] = useState({
    totalDevices: 5,
    activeConnections: 4,
    syncAccuracy: 89.4,
    memoryShared: 87.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isIntegrating) {
        setDevices(prev => prev.map(device => ({
          ...device,
          sync: device.status === 'connected' ? Math.min(100, device.sync + Math.random() * 2) : device.sync
        })));
        
        setIntegrationStats(prev => ({
          ...prev,
          syncAccuracy: Math.min(100, prev.syncAccuracy + Math.random() * 0.1),
          memoryShared: Math.min(100, prev.memoryShared + Math.random() * 0.15)
        }));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isIntegrating]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return Smartphone;
      case 'iot': return Network;
      case 'wearable': return Watch;
      case 'smart_home': return Home;
      case 'cloud': return Globe;
      default: return Wifi;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'syncing': return 'bg-blue-500 animate-pulse';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile': return 'from-blue-600 to-cyan-600';
      case 'iot': return 'from-green-600 to-teal-600';
      case 'wearable': return 'from-purple-600 to-pink-600';
      case 'smart_home': return 'from-orange-600 to-red-600';
      case 'cloud': return 'from-indigo-600 to-purple-600';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-indigo-100">
            <Globe className="w-8 h-8 mr-3 text-indigo-400" />
            Multi-Reality Integration System
            <Badge className="ml-4 bg-indigo-500/20 text-indigo-200 border-indigo-400/40">
              CROSS-PLATFORM
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-300 mb-1">
                {integrationStats.totalDevices}
              </div>
              <p className="text-indigo-200 text-sm">Total Devices</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300 mb-1">
                {integrationStats.activeConnections}
              </div>
              <p className="text-green-200 text-sm">Active Connections</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-1">
                {integrationStats.syncAccuracy.toFixed(1)}%
              </div>
              <p className="text-blue-200 text-sm">Sync Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300 mb-1">
                {integrationStats.memoryShared.toFixed(1)}%
              </div>
              <p className="text-purple-200 text-sm">Memory Shared</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Panel */}
      <Card className="bg-black/30 border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Settings className="w-6 h-6 mr-2" />
            Cross-Platform Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setIsIntegrating(!isIntegrating)}
              className={`px-6 py-3 ${
                isIntegrating 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <Network className="w-5 h-5 mr-2" />
              {isIntegrating ? 'Stop Integration' : 'Start Integration'}
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-purple-500/50 text-purple-300">
                <Globe className="w-4 h-4 mr-2" />
                Sync All Devices
              </Button>
              <Button variant="outline" className="border-blue-500/50 text-blue-300">
                <Wifi className="w-4 h-4 mr-2" />
                Discover Devices
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card className="bg-black/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Network className="w-6 h-6 mr-2" />
            Connected Devices & Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => {
              const IconComponent = getDeviceIcon(device.type);
              return (
                <div key={device.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(device.type)}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{device.name}</h4>
                        <p className="text-sm text-gray-400 capitalize">{device.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                      <span className="text-xs text-gray-400 capitalize">{device.status}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Sync Level</span>
                      <span className="text-cyan-400">{device.sync.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={device.sync} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integration Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-gray-700/40">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Globe className="w-6 h-6 mr-2" />
              Cross-Platform Consciousness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Memory Synchronization</span>
                <Badge className="bg-green-500/20 text-green-300">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Learning Sync</span>
                <Badge className="bg-blue-500/20 text-blue-300">Continuous</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Context Sharing</span>
                <Badge className="bg-purple-500/20 text-purple-300">Real-time</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Preference Sync</span>
                <Badge className="bg-cyan-500/20 text-cyan-300">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-gray-700/40">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Home className="w-6 h-6 mr-2" />
              Real-World Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">IoT Device Control</span>
                <Badge className="bg-orange-500/20 text-orange-300">4 Devices</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Smart Home Integration</span>
                <Badge className="bg-red-500/20 text-red-300">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Wearable Data</span>
                <Badge className="bg-pink-500/20 text-pink-300">Streaming</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Environmental Sensors</span>
                <Badge className="bg-teal-500/20 text-teal-300">Monitoring</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Log */}
      <Card className="bg-black/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Network className="w-6 h-6 mr-2" />
            Integration Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm max-h-60 overflow-y-auto">
            <div className="text-green-400">[SYNC] Cross-platform memory sync completed</div>
            <div className="text-blue-400">[DEVICE] Apple Watch connected successfully</div>
            <div className="text-purple-400">[IOT] Smart home sensors data received</div>
            <div className="text-yellow-400">[CLOUD] Backup synchronized to cloud platform</div>
            <div className="text-cyan-400">[MOBILE] Context shared with mobile device</div>
            <div className="text-orange-400">[WEARABLE] Health data integrated</div>
            {isIntegrating && (
              <div className="text-pink-400 animate-pulse">[LIVE] Multi-platform integration active...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiRealityIntegration;