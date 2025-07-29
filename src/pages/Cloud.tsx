
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cloud, CloudUpload, CloudDownload, Server, Globe, Shield, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CloudService {
  name: string;
  provider: string;
  status: 'active' | 'syncing' | 'error';
  usage: number;
  limit: number;
  region: string;
}

const CloudPage: React.FC = () => {
  const [cloudServices, setCloudServices] = useState<CloudService[]>([
    { name: 'MIORA Core Storage', provider: 'AWS', status: 'active', usage: 75.2, limit: 500, region: 'us-east-1' },
    { name: 'AI Model Repository', provider: 'Google Cloud', status: 'syncing', usage: 142.8, limit: 1000, region: 'us-central1' },
    { name: 'Voice Data Backup', provider: 'Azure', status: 'active', usage: 38.9, limit: 250, region: 'eastus' },
    { name: 'Learning Analytics', provider: 'DigitalOcean', status: 'active', usage: 95.1, limit: 200, region: 'nyc3' }
  ]);

  const [syncStats, setSyncStats] = useState({
    totalSync: 456789,
    uploadedToday: 12.5,
    downloadedToday: 8.7,
    activeConnections: 24,
    bandwidth: 850
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStats(prev => ({
        ...prev,
        totalSync: prev.totalSync + Math.floor(Math.random() * 100),
        activeConnections: Math.max(10, Math.min(50, prev.activeConnections + Math.random() * 4 - 2)),
        bandwidth: Math.max(500, Math.min(1500, prev.bandwidth + Math.random() * 100 - 50))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const syncToCloud = () => {
    toast({
      title: "☁️ Cloud Sync Initiated",
      description: "Syncing latest data to cloud services",
      duration: 4000,
    });

    setCloudServices(prev => prev.map(service => ({
      ...service,
      status: 'syncing' as const
    })));

    setTimeout(() => {
      setCloudServices(prev => prev.map(service => ({
        ...service,
        status: 'active' as const,
        usage: service.usage + Math.random() * 5
      })));
      
      toast({
        title: "✅ Cloud Sync Complete",
        description: "All services synchronized successfully",
        duration: 3000,
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Cloud className="h-12 w-12 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CLOUD SERVICES
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Multi-Cloud Infrastructure & Data Synchronization
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <CloudUpload className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-400">Uploaded Today</p>
              <p className="text-2xl font-bold text-purple-300">{syncStats.uploadedToday.toFixed(1)} GB</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <CloudDownload className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-sm text-gray-400">Downloaded Today</p>
              <p className="text-2xl font-bold text-blue-300">{syncStats.downloadedToday.toFixed(1)} GB</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-400">Active Connections</p>
              <p className="text-2xl font-bold text-green-300">{syncStats.activeConnections}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-sm text-gray-400">Bandwidth</p>
              <p className="text-2xl font-bold text-orange-300">{syncStats.bandwidth} Mbps</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Cloud className="h-6 w-6 mr-2" />
              Cloud Management Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Total Data Synced</label>
                  <div className="text-2xl font-bold text-white">{syncStats.totalSync.toLocaleString()} files</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Network Performance</label>
                  <Progress value={(syncStats.bandwidth / 1500) * 100} className="mt-2" />
                  <span className="text-xs text-gray-500">{syncStats.bandwidth} Mbps</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={syncToCloud} className="bg-purple-600 hover:bg-purple-500">
                  <CloudUpload className="h-4 w-4 mr-2" />
                  Sync to Cloud
                </Button>
                
                <Button variant="outline" className="text-blue-400 border-blue-400">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>

                <Button variant="outline" className="text-green-400 border-green-400">
                  <Server className="h-4 w-4 mr-2" />
                  Manage Regions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cloud Services List */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Cloud Services Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cloudServices.map((service, index) => (
                <div key={index} className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-6 w-6 text-purple-400" />
                      <div>
                        <h3 className="text-white font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-400">{service.provider} • {service.region}</p>
                      </div>
                    </div>
                    <Badge className={
                      service.status === 'active' ? 'bg-green-500' :
                      service.status === 'syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                    }>
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Storage Usage</span>
                      <span className="text-white">{service.usage.toFixed(1)} GB / {service.limit} GB</span>
                    </div>
                    <Progress value={(service.usage / service.limit) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CloudPage;
