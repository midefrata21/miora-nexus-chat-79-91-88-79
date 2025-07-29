import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Database, 
  RefreshCw, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Server,
  HardDrive,
  Cloud,
  Timer,
  Archive,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BackupStatus {
  id: string;
  timestamp: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  status: 'completed' | 'in-progress' | 'failed';
  location: 'local' | 'cloud' | 'both';
  modules: string[];
}

interface RecoveryPoint {
  id: string;
  timestamp: string;
  description: string;
  integrityCheck: boolean;
  modules: number;
  dataSize: string;
}

export const BackupRecoverySystem: React.FC = () => {
  const { toast } = useToast();
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [lastBackup, setLastBackup] = useState<string>('2024-07-12 14:30:00');
  const [nextScheduledBackup, setNextScheduledBackup] = useState<string>('2024-07-12 20:00:00');
  
  const [backupHistory, setBackupHistory] = useState<BackupStatus[]>([
    {
      id: 'backup_001',
      timestamp: '2024-07-12 14:30:00',
      type: 'full',
      size: '2.4 GB',
      status: 'completed',
      location: 'both',
      modules: ['AI Core', 'Trading', 'System Core', 'Learning']
    },
    {
      id: 'backup_002',
      timestamp: '2024-07-12 08:00:00',
      type: 'incremental',
      size: '156 MB',
      status: 'completed',
      location: 'cloud',
      modules: ['AI Core', 'Trading']
    },
    {
      id: 'backup_003',
      timestamp: '2024-07-11 20:00:00',
      type: 'full',
      size: '2.3 GB',
      status: 'completed',
      location: 'both',
      modules: ['All Modules']
    }
  ]);

  const [recoveryPoints, setRecoveryPoints] = useState<RecoveryPoint[]>([
    {
      id: 'rp_001',
      timestamp: '2024-07-12 14:30:00',
      description: 'Post-update checkpoint - All systems optimized',
      integrityCheck: true,
      modules: 48,
      dataSize: '2.4 GB'
    },
    {
      id: 'rp_002',
      timestamp: '2024-07-12 08:00:00',
      description: 'Scheduled backup point - Pre-trading session',
      integrityCheck: true,
      modules: 48,
      dataSize: '2.3 GB'
    },
    {
      id: 'rp_003',
      timestamp: '2024-07-11 20:00:00',
      description: 'Daily backup checkpoint',
      integrityCheck: true,
      modules: 47,
      dataSize: '2.2 GB'
    }
  ]);

  const [systemIntegrity, setSystemIntegrity] = useState({
    overall: 98.7,
    coreModules: 100,
    databases: 97.2,
    configurations: 99.1,
    userdata: 98.9
  });

  // Simulate backup progress
  const startBackup = (type: 'full' | 'incremental' | 'differential') => {
    setIsBackupRunning(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackupRunning(false);
          
          // Add new backup to history
          const newBackup: BackupStatus = {
            id: `backup_${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            type,
            size: type === 'full' ? '2.4 GB' : type === 'incremental' ? '120 MB' : '450 MB',
            status: 'completed',
            location: 'both',
            modules: type === 'full' ? ['All Modules'] : ['AI Core', 'Trading', 'System Core']
          };
          
          setBackupHistory(prev => [newBackup, ...prev.slice(0, 9)]);
          setLastBackup(new Date().toLocaleString());
          
          toast({
            title: "Backup Completed",
            description: `${type.charAt(0).toUpperCase() + type.slice(1)} backup successfully created`,
          });
          
          return 100;
        }
        return prev + (Math.random() * 15);
      });
    }, 500);
  };

  const performSystemRecovery = (recoveryPointId: string) => {
    const recoveryPoint = recoveryPoints.find(rp => rp.id === recoveryPointId);
    if (!recoveryPoint) return;

    toast({
      title: "System Recovery Initiated",
      description: `Restoring system to ${recoveryPoint.timestamp}`,
    });

    // Simulate recovery process
    setTimeout(() => {
      toast({
        title: "Recovery Complete",
        description: "System successfully restored to selected recovery point",
      });
    }, 3000);
  };

  const runIntegrityCheck = () => {
    toast({
      title: "Integrity Check Started",
      description: "Scanning all system components...",
    });

    // Simulate integrity check
    setTimeout(() => {
      setSystemIntegrity(prev => ({
        ...prev,
        overall: Math.max(95, Math.min(100, prev.overall + (Math.random() - 0.3) * 2))
      }));
      
      toast({
        title: "Integrity Check Complete",
        description: "All critical systems verified",
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'local':
        return <HardDrive className="w-4 h-4" />;
      case 'cloud':
        return <Cloud className="w-4 h-4" />;
      case 'both':
        return <Server className="w-4 h-4" />;
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Backup & Recovery System</h2>
          <p className="text-gray-400">Advanced data protection dengan automated recovery</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => startBackup('incremental')} variant="secondary" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Quick Backup
          </Button>
          <Button onClick={() => startBackup('full')} size="sm">
            <Database className="w-4 h-4 mr-2" />
            Full Backup
          </Button>
        </div>
      </div>

      {/* Backup Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-300 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Last Backup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white font-mono text-sm">{lastBackup}</div>
            <div className="text-green-400 text-xs mt-1">Successfully completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-300 text-sm">
              <Timer className="w-4 h-4 mr-2" />
              Next Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white font-mono text-sm">{nextScheduledBackup}</div>
            <div className="text-blue-400 text-xs mt-1">Auto-backup enabled</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-300 text-sm">
              <Archive className="w-4 h-4 mr-2" />
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white font-mono text-sm">12.3 GB</div>
            <div className="text-purple-400 text-xs mt-1">Cloud + Local</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-300 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Integrity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white font-mono text-sm">{systemIntegrity.overall.toFixed(1)}%</div>
            <div className="text-orange-400 text-xs mt-1">All systems verified</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Backup Progress */}
      {isBackupRunning && (
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-300">
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Backup in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white">Backup Progress</span>
                <span className="text-indigo-400 font-mono">{backupProgress.toFixed(1)}%</span>
              </div>
              <Progress value={backupProgress} className="h-3" />
              <div className="text-sm text-gray-400">
                Backing up critical system data and configurations...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup History */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-300">
              <Database className="w-5 h-5 mr-2" />
              Recent Backups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {backupHistory.map((backup) => (
                <div key={backup.id} className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getLocationIcon(backup.location)}
                    <div className="text-xs text-gray-400">{backup.type}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">{backup.timestamp}</span>
                      {getStatusBadge(backup.status)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {backup.size} • {backup.modules.join(', ')}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Points */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-300">
              <RotateCcw className="w-5 h-5 mr-2" />
              Recovery Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recoveryPoints.map((point) => (
                <div key={point.id} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm font-medium">{point.timestamp}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => performSystemRecovery(point.id)}
                      className="text-xs"
                    >
                      Restore
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{point.description}</div>
                  <div className="text-xs text-gray-500">
                    {point.modules} modules • {point.dataSize} • Verified: {point.integrityCheck ? 'Yes' : 'No'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Integrity Dashboard */}
      <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-slate-300">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              System Integrity Monitor
            </div>
            <Button onClick={runIntegrityCheck} size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Check
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {systemIntegrity.overall.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">Overall</div>
              <Progress value={systemIntegrity.overall} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {systemIntegrity.coreModules}%
              </div>
              <div className="text-xs text-gray-400">Core Modules</div>
              <Progress value={systemIntegrity.coreModules} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {systemIntegrity.databases.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">Databases</div>
              <Progress value={systemIntegrity.databases} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {systemIntegrity.configurations.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">Configurations</div>
              <Progress value={systemIntegrity.configurations} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {systemIntegrity.userdata.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">User Data</div>
              <Progress value={systemIntegrity.userdata} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};