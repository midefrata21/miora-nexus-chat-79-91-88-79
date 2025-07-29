
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Server, HardDrive, Activity, RefreshCw, Trash2, Download, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DatabaseStats {
  totalRecords: number;
  storageUsed: number;
  storageTotal: number;
  connections: number;
  queries: number;
  performance: number;
}

const DatabasePage: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats>({
    totalRecords: 2584736,
    storageUsed: 45.8,
    storageTotal: 100,
    connections: 127,
    queries: 8456,
    performance: 94
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [databases, setDatabases] = useState([
    { name: 'MIORA_Core', size: '15.2 GB', records: 1234567, status: 'active' },
    { name: 'Learning_Data', size: '8.7 GB', records: 789012, status: 'active' },
    { name: 'Voice_Memory', size: '12.1 GB', records: 345678, status: 'active' },
    { name: 'Analytics_Cache', size: '6.4 GB', records: 215479, status: 'optimizing' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        connections: Math.max(50, Math.min(200, prev.connections + Math.random() * 10 - 5)),
        queries: prev.queries + Math.floor(Math.random() * 50),
        performance: Math.max(80, Math.min(100, prev.performance + Math.random() * 4 - 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const optimizeDatabase = async () => {
    setIsOptimizing(true);
    toast({
      title: "🗄️ Database Optimization Started",
      description: "Optimizing database performance and storage",
      duration: 3000,
    });

    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        storageUsed: Math.max(30, prev.storageUsed - 5),
        performance: Math.min(100, prev.performance + 8)
      }));
      setIsOptimizing(false);
      toast({
        title: "✅ Database Optimized",
        description: "Database performance improved significantly",
        duration: 4000,
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Database className="h-12 w-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              DATABASE MANAGEMENT
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            Advanced Database Operations & Storage Management
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Database className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <p className="text-sm text-gray-400">Total Records</p>
              <p className="text-2xl font-bold text-blue-300">{stats.totalRecords.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <HardDrive className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <p className="text-sm text-gray-400">Storage Used</p>
              <p className="text-2xl font-bold text-green-300">{stats.storageUsed.toFixed(1)} GB</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Server className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-gray-400">Active Connections</p>
              <p className="text-2xl font-bold text-purple-300">{stats.connections}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 mx-auto mb-2 text-orange-400" />
              <p className="text-sm text-gray-400">Performance</p>
              <p className="text-2xl font-bold text-orange-300">{stats.performance.toFixed(0)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="bg-black/40 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Database className="h-6 w-6 mr-2" />
              Database Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Storage Utilization</label>
                  <Progress value={(stats.storageUsed / stats.storageTotal) * 100} className="mt-2" />
                  <span className="text-xs text-gray-500">{stats.storageUsed.toFixed(1)} GB / {stats.storageTotal} GB</span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Database Performance</label>
                  <Progress value={stats.performance} className="mt-2" />
                  <span className="text-xs text-gray-500">{stats.performance.toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={optimizeDatabase}
                  disabled={isOptimizing}
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Optimize Database
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="text-green-400 border-green-400">
                  <Download className="h-4 w-4 mr-2" />
                  Backup Database
                </Button>

                <Button variant="outline" className="text-purple-400 border-purple-400">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database List */}
        <Card className="bg-black/40 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Active Databases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {databases.map((db, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Database className="h-8 w-8 text-blue-400" />
                    <div>
                      <h3 className="text-white font-medium">{db.name}</h3>
                      <p className="text-sm text-gray-400">{db.records.toLocaleString()} records</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-white font-medium">{db.size}</p>
                      <Badge className={db.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {db.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-400 border-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default DatabasePage;
