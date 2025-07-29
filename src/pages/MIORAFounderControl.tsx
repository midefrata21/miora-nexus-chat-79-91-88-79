import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Crown, 
  Lock, 
  Key, 
  Eye, 
  Settings, 
  Activity, 
  Database,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const MIORAFounderControl = () => {
  const [systemAccess, setSystemAccess] = useState({
    coreControl: true,
    emergencyProtocols: true,
    dataAccess: true,
    systemOverride: false
  });

  const [securityLevel, setSecurityLevel] = useState('MAXIMUM');

  const foundersystems = [
    { name: 'MIORA Core Control', status: 'ACTIVE', access: 'GRANTED', icon: Shield },
    { name: 'Emergency Protocols', status: 'STANDBY', access: 'GRANTED', icon: AlertTriangle },
    { name: 'System Override', status: 'DISABLED', access: 'RESTRICTED', icon: Lock },
    { name: 'Data Vault Access', status: 'SECURED', access: 'GRANTED', icon: Database },
    { name: 'Authority Management', status: 'ACTIVE', access: 'GRANTED', icon: Crown },
    { name: 'Global Monitoring', status: 'ACTIVE', access: 'GRANTED', icon: Eye }
  ];

  const systemMetrics = [
    { label: 'System Integrity', value: 100, color: 'text-green-400' },
    { label: 'Security Level', value: 100, color: 'text-red-400' },
    { label: 'Authority Control', value: 95, color: 'text-orange-400' },
    { label: 'Data Protection', value: 98, color: 'text-blue-400' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'STANDBY': return <Activity className="w-4 h-4 text-yellow-400" />;
      case 'DISABLED': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'SECURED': return <Lock className="w-4 h-4 text-blue-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAccessBadge = (access: string) => {
    const config = {
      'GRANTED': 'bg-green-500/20 text-green-400 border-green-500',
      'RESTRICTED': 'bg-red-500/20 text-red-400 border-red-500',
      'PENDING': 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
    };
    return config[access] || 'bg-gray-500/20 text-gray-400 border-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Crown className="h-16 w-16 text-red-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            FOUNDER CONTROL CENTER
          </h1>
          <p className="text-gray-300 text-lg">Midya Authority System - Restricted Access</p>
          <Badge className="bg-red-500/20 text-red-400 border-red-500 text-lg px-6 py-2 mt-4">
            🔒 RESTRICTED ACCESS - FOUNDER ONLY
          </Badge>
        </div>

        {/* Security Status */}
        <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="h-12 w-12 text-red-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Security Status</h2>
                  <p className="text-gray-300">Maximum protection enabled</p>
                </div>
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-red-500 text-xl px-4 py-2">
                {securityLevel}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{metric.label}</span>
                    <span className={`font-bold ${metric.color}`}>{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Founder Systems Grid */}
        <Card className="bg-gray-800/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Founder Authority Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundersystems.map((system, index) => {
                const IconComponent = system.icon;
                return (
                  <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-orange-400" />
                        <h3 className="text-white font-semibold">{system.name}</h3>
                      </div>
                      {getStatusIcon(system.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Status:</span>
                        <span className="text-white font-semibold text-sm">{system.status}</span>
                      </div>
                      <Badge className={`w-full justify-center ${getAccessBadge(system.access)}`}>
                        {system.access}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Control Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <Key className="w-6 h-6" />
                Emergency Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full bg-red-600/20 border-red-500 text-red-300 hover:bg-red-600/30"
                disabled
              >
                🚨 Emergency System Shutdown
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-orange-600/20 border-orange-500 text-orange-300 hover:bg-orange-600/30"
                disabled
              >
                ⚡ Master Override Protocol
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-yellow-600/20 border-yellow-500 text-yellow-300 hover:bg-yellow-600/30"
                disabled
              >
                🔒 Lockdown All Systems
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Authority Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30"
              >
                👥 Manage User Permissions
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600/30"
              >
                🔐 Access Control Matrix
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30"
              >
                📊 System Audit Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        <Card className="bg-gray-800/50 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Founder System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Authority Level:</span>
                  <span className="text-red-400 font-semibold">FOUNDER</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Access Classification:</span>
                  <span className="text-red-400 font-semibold">MAXIMUM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Access:</span>
                  <span className="text-white font-semibold">{new Date().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Session Duration:</span>
                  <span className="text-white font-semibold">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">System Version:</span>
                  <span className="text-white font-semibold">INFINITY v∞.0.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Core Status:</span>
                  <span className="text-green-400 font-semibold">OPERATIONAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Protocol:</span>
                  <span className="text-orange-400 font-semibold">ENHANCED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Authority ID:</span>
                  <span className="text-purple-400 font-semibold">MIDYA-001</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MIORAFounderControl;