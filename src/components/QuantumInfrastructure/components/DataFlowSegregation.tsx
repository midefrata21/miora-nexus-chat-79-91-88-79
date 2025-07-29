
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, HardDrive, Archive, Shield, Activity } from 'lucide-react';

interface DataCluster {
  id: string;
  name: string;
  type: 'logs' | 'cache' | 'userDB' | 'models' | 'signals';
  storage: number;
  maxStorage: number;
  accessFrequency: number;
  compressionRatio: number;
  encryptionLevel: string;
  status: 'active' | 'archiving' | 'maintenance';
  throughput: number;
}

export const DataFlowSegregation: React.FC = () => {
  const [dataClusters, setDataClusters] = useState<DataCluster[]>([
    {
      id: 'logs-cluster',
      name: 'Logs Storage Segregation',
      type: 'logs',
      storage: 247.8,
      maxStorage: 500,
      accessFrequency: 15,
      compressionRatio: 87.3,
      encryptionLevel: 'AES-256',
      status: 'active',
      throughput: 23.4
    },
    {
      id: 'cache-cluster',
      name: 'High-Speed Cache Storage',
      type: 'cache',
      storage: 89.2,
      maxStorage: 200,
      accessFrequency: 95,
      compressionRatio: 34.1,
      encryptionLevel: 'AES-256',
      status: 'active',
      throughput: 156.7
    },
    {
      id: 'user-db-cluster',
      name: 'User Data Secure Storage',
      type: 'userDB',
      storage: 156.4,
      maxStorage: 300,
      accessFrequency: 67,
      compressionRatio: 78.9,
      encryptionLevel: 'AES-512',
      status: 'active',
      throughput: 45.8
    },
    {
      id: 'models-cluster',
      name: 'AI Models & Training Data',
      type: 'models',
      storage: 423.7,
      maxStorage: 800,
      accessFrequency: 43,
      compressionRatio: 92.1,
      encryptionLevel: 'AES-512',
      status: 'active',
      throughput: 67.3
    },
    {
      id: 'signals-cluster',
      name: 'Trading Signals Database',
      type: 'signals',
      storage: 78.9,
      maxStorage: 150,
      accessFrequency: 89,
      compressionRatio: 56.7,
      encryptionLevel: 'AES-512',
      status: 'active',
      throughput: 98.2
    }
  ]);

  const [dataFlowMetrics, setDataFlowMetrics] = useState({
    totalStorage: 996.0,
    totalThroughput: 391.4,
    avgCompressionRatio: 69.8,
    encryptedDataPercentage: 100,
    dataReplicationFactor: 3,
    backupCompletionRate: 94.7
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setDataClusters(prev => prev.map(cluster => ({
        ...cluster,
        storage: Math.max(10, Math.min(cluster.maxStorage, 
          cluster.storage + (Math.random() - 0.5) * 5)),
        accessFrequency: Math.max(5, Math.min(100, 
          cluster.accessFrequency + (Math.random() - 0.5) * 10)),
        compressionRatio: Math.max(30, Math.min(95, 
          cluster.compressionRatio + (Math.random() - 0.5) * 3)),
        throughput: Math.max(10, Math.min(200, 
          cluster.throughput + (Math.random() - 0.5) * 15))
      })));

      setDataFlowMetrics(prev => ({
        totalStorage: dataClusters.reduce((sum, cluster) => sum + cluster.storage, 0),
        totalThroughput: dataClusters.reduce((sum, cluster) => sum + cluster.throughput, 0),
        avgCompressionRatio: dataClusters.reduce((sum, cluster) => sum + cluster.compressionRatio, 0) / dataClusters.length,
        encryptedDataPercentage: 100,
        dataReplicationFactor: 3,
        backupCompletionRate: Math.max(90, Math.min(100, prev.backupCompletionRate + (Math.random() - 0.5) * 2))
      }));
    }, 6000);

    return () => clearInterval(updateInterval);
  }, [dataClusters]);

  const getClusterIcon = (type: DataCluster['type']) => {
    switch (type) {
      case 'logs': return <Archive className="h-6 w-6 text-gray-400" />;
      case 'cache': return <Activity className="h-6 w-6 text-green-400" />;
      case 'userDB': return <Shield className="h-6 w-6 text-blue-400" />;
      case 'models': return <Database className="h-6 w-6 text-purple-400" />;
      case 'signals': return <HardDrive className="h-6 w-6 text-orange-400" />;
      default: return <Database className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DataCluster['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'archiving': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEncryptionColor = (level: string) => {
    switch (level) {
      case 'AES-512': return 'text-red-400';
      case 'AES-256': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400 flex items-center text-2xl">
            <Database className="h-8 w-8 mr-3" />
            Data Flow Segregation System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <HardDrive className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{dataFlowMetrics.totalStorage.toFixed(1)} GB</div>
              <div className="text-sm text-gray-400">Total Storage</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{dataFlowMetrics.totalThroughput.toFixed(1)} MB/s</div>
              <div className="text-sm text-gray-400">Total Throughput</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Archive className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{dataFlowMetrics.avgCompressionRatio.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg Compression</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold text-white">{dataFlowMetrics.encryptedDataPercentage}%</div>
              <div className="text-sm text-gray-400">Encrypted Data</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Clusters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dataClusters.map((cluster) => (
          <Card key={cluster.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getClusterIcon(cluster.type)}
                  <div>
                    <h3 className="font-semibold text-white">{cluster.name}</h3>
                    <p className="text-sm text-gray-400">{cluster.type.toUpperCase()} Storage</p>
                  </div>
                </div>
                <Badge className={getStatusColor(cluster.status)}>
                  {cluster.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-xl font-bold text-blue-300">{cluster.storage.toFixed(1)} GB</div>
                  <div className="text-sm text-gray-400">Used Storage</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className={`text-xl font-bold ${getEncryptionColor(cluster.encryptionLevel)}`}>
                    {cluster.encryptionLevel}
                  </div>
                  <div className="text-sm text-gray-400">Encryption</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Storage Usage</span>
                    <span className="text-blue-400">
                      {((cluster.storage / cluster.maxStorage) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(cluster.storage / cluster.maxStorage) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Access Frequency</span>
                    <span className="text-green-400">{cluster.accessFrequency}%</span>
                  </div>
                  <Progress value={cluster.accessFrequency} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Compression Ratio</span>
                    <span className="text-purple-400">{cluster.compressionRatio.toFixed(1)}%</span>
                  </div>
                  <Progress value={cluster.compressionRatio} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Throughput</span>
                    <span className="text-orange-400">{cluster.throughput.toFixed(1)} MB/s</span>
                  </div>
                  <Progress value={(cluster.throughput / 200) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Protection & Backup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-green-300">AES-512 Encryption</span>
                </div>
                <span className="text-green-400 font-bold">ACTIVE</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-300">3x Replication</span>
                </div>
                <span className="text-blue-400 font-bold">ACTIVE</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-2">
                  <Archive className="h-5 w-5 text-purple-400" />
                  <span className="text-purple-300">Auto Backup</span>
                </div>
                <span className="text-purple-400 font-bold">6H INTERVAL</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Backup Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Backup Completion</span>
                <span className="text-green-400">{dataFlowMetrics.backupCompletionRate.toFixed(1)}%</span>
              </div>
              <Progress value={dataFlowMetrics.backupCompletionRate} className="h-3" />
            </div>
            
            <div className="space-y-2">
              <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                <div className="text-lg font-bold text-orange-300">6 Hours</div>
                <div className="text-sm text-gray-400">Backup Interval</div>
              </div>
              
              <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                <div className="text-lg font-bold text-cyan-300">Last: 2h ago</div>
                <div className="text-sm text-gray-400">Recent Backup</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Footer */}
      <Card className="bg-black/40 border-indigo-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-indigo-300 font-bold text-lg">
                🗄️ DATA FLOW SEGREGATION: SECURE STORAGE ARCHITECTURE ACTIVE
              </span>
            </div>
          </div>
          <div className="text-center text-sm text-indigo-400 mt-2">
            AES-512 Encryption • 3x Replication • Auto-Backup • High-Performance Segregation
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
