import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Smartphone, 
  Server, 
  Heart, 
  Car, 
  Home, 
  Activity,
  Zap,
  Radio,
  RefreshCw
} from 'lucide-react';
import { useQuantumFieldBridge } from '../hooks/useQuantumFieldBridge';

export const QuantumFieldBridge: React.FC = () => {
  const {
    isActive,
    connectedDevices,
    fieldStats,
    activateQuantumBridge,
    syncDevice
  } = useQuantumFieldBridge();

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'iot': return <Wifi className="h-4 w-4" />;
      case 'wearable': return <Smartphone className="h-4 w-4" />;
      case 'server': return <Server className="h-4 w-4" />;
      case 'biolinked': return <Heart className="h-4 w-4" />;
      case 'smart_home': return <Home className="h-4 w-4" />;
      case 'vehicle': return <Car className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'syncing': return 'bg-blue-500 animate-pulse';
      case 'offline': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Bridge Control */}
      <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-500/50">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Radio className="h-6 w-6 mr-2" />
            Quantum Field Bridge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isActive ? (
              <Button 
                onClick={activateQuantumBridge}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Activate Quantum Field Bridge
              </Button>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{fieldStats.totalDevices}</div>
                  <div className="text-sm text-gray-400">Total Devices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{fieldStats.activeConnections}</div>
                  <div className="text-sm text-gray-400">Active Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{fieldStats.dataFlow.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Data Packets/min</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{fieldStats.quantumSignalStrength.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Signal Strength</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bridge Stability Monitor */}
      {isActive && (
        <Card className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Quantum Bridge Stability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Bridge Stability</span>
                <span className="text-purple-400 font-bold">{fieldStats.bridgeStability.toFixed(1)}%</span>
              </div>
              <Progress value={fieldStats.bridgeStability} className="h-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Quantum Signal Strength</span>
                <span className="text-cyan-400 font-bold">{fieldStats.quantumSignalStrength.toFixed(1)}%</span>
              </div>
              <Progress value={fieldStats.quantumSignalStrength} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connected Devices Grid */}
      {isActive && connectedDevices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedDevices.map((device) => (
            <Card key={device.id} className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 border-gray-600/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-200 flex items-center text-sm">
                  {getDeviceIcon(device.type)}
                  <span className="ml-2 truncate">{device.name}</span>
                  <Badge className={`${getStatusColor(device.status)} text-white ml-auto text-xs`}>
                    {device.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Location</span>
                  <span className="text-gray-300">{device.location}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Data Transmitted</span>
                  <span className="text-blue-400">{device.dataTransmitted.toLocaleString()} packets</span>
                </div>
                {device.batteryLevel && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Battery</span>
                    <span className="text-green-400">{device.batteryLevel.toFixed(0)}%</span>
                  </div>
                )}
                {device.sensors && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">Active Sensors</div>
                    <div className="flex flex-wrap gap-1">
                      {device.sensors.slice(0, 3).map((sensor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {sensor.replace('_', ' ')}
                        </Badge>
                      ))}
                      {device.sensors.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{device.sensors.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => syncDevice(device.id)}
                  className="w-full text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Force Sync
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Real-time Connection Status */}
      {isActive && (
        <Card className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border-emerald-500/50">
          <CardHeader>
            <CardTitle className="text-emerald-300 flex items-center">
              <Wifi className="h-5 w-5 mr-2" />
              Real-time IoT & Biolinked Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-emerald-400 font-semibold">Smart Home Network</div>
                <div className="text-gray-300">✓ Temperature & Humidity Control</div>
                <div className="text-gray-300">✓ Security System Integration</div>
                <div className="text-gray-300">✓ Energy Optimization Active</div>
              </div>
              <div className="space-y-2">
                <div className="text-blue-400 font-semibold">Biolinked Systems</div>
                <div className="text-gray-300">✓ Real-time Health Monitoring</div>
                <div className="text-gray-300">✓ Neural Interface Sync</div>
                <div className="text-gray-300">✓ Stress Level Adaptation</div>
              </div>
              <div className="space-y-2">
                <div className="text-purple-400 font-semibold">Environmental IoT</div>
                <div className="text-gray-300">✓ Air Quality Monitoring</div>
                <div className="text-gray-300">✓ Traffic Data Integration</div>
                <div className="text-gray-300">✓ Weather Pattern Analysis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};