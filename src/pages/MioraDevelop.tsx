
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Cog, 
  Play, 
  Plus, 
  Terminal, 
  Code, 
  Zap,
  Shield,
  Activity,
  Database,
  Infinity,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye
} from 'lucide-react';

interface CommandBlueprint {
  id: string;
  title: string;
  command: string;
  description: string;
  category: 'system' | 'module' | 'learning' | 'evolution';
  status: 'pending' | 'executing' | 'completed' | 'failed';
  createdAt: number;
  executedAt?: number;
  results?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface DevelopmentLog {
  id: string;
  timestamp: number;
  action: string;
  details: string;
  moduleVersion: string;
  status: 'success' | 'warning' | 'error';
}

interface NewCommandForm {
  title: string;
  command: string;
  description: string;
  category: CommandBlueprint['category'];
  priority: CommandBlueprint['priority'];
}

const MioraDevelop: React.FC = () => {
  const [commands, setCommands] = useState<CommandBlueprint[]>([]);
  const [developmentLogs, setDevelopmentLogs] = useState<DevelopmentLog[]>([]);
  const [newCommand, setNewCommand] = useState<NewCommandForm>({ 
    title: '', 
    command: '', 
    description: '', 
    category: 'system', 
    priority: 'medium' 
  });
  const [showCommandEditor, setShowCommandEditor] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [systemStats, setSystemStats] = useState({
    selfEvolutionMode: true,
    externalDependency: false,
    criticalAnalysisLoop: true,
    totalCommands: 0,
    executedCommands: 0,
    systemVersion: '2.1.0-develop',
    infinityCoreLinkStatus: 'active'
  });

  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    const savedCommands = localStorage.getItem('miora_develop_commands');
    const savedLogs = localStorage.getItem('miora_develop_logs');
    
    if (savedCommands) setCommands(JSON.parse(savedCommands));
    if (savedLogs) setDevelopmentLogs(JSON.parse(savedLogs));

    // Initialize with some sample commands
    if (!savedCommands) {
      const initialCommands: CommandBlueprint[] = [
        {
          id: '1',
          title: 'Activate Self-Learning Protocol',
          command: '/activate-self-learning --mode=continuous --background=true',
          description: 'Mengaktifkan protokol pembelajaran mandiri dengan mode kontinyu',
          category: 'learning',
          status: 'completed',
          createdAt: Date.now() - 3600000,
          executedAt: Date.now() - 3500000,
          results: 'Self-learning protocol activated successfully. Background processing enabled.',
          priority: 'critical'
        },
        {
          id: '2',
          title: 'Initialize Module Sandbox',
          command: '/init-sandbox --isolation=high --scripting=enabled',
          description: 'Menginisialisasi sandbox untuk eksekusi modul yang aman',
          category: 'system',
          status: 'completed',
          createdAt: Date.now() - 7200000,
          executedAt: Date.now() - 7100000,
          results: 'Sandbox environment initialized with high isolation.',
          priority: 'high'
        }
      ];
      setCommands(initialCommands);
    }
  }, []);

  // Auto-save commands and logs
  useEffect(() => {
    localStorage.setItem('miora_develop_commands', JSON.stringify(commands));
    setSystemStats(prev => ({
      ...prev,
      totalCommands: commands.length,
      executedCommands: commands.filter(c => c.status === 'completed').length
    }));
  }, [commands]);

  useEffect(() => {
    localStorage.setItem('miora_develop_logs', JSON.stringify(developmentLogs));
  }, [developmentLogs]);

  const addCommand = () => {
    if (!newCommand.title || !newCommand.command) {
      toast({
        title: "⚠️ Data Tidak Lengkap",
        description: "Judul dan perintah harus diisi",
        variant: "destructive"
      });
      return;
    }

    const command: CommandBlueprint = {
      id: Date.now().toString(),
      ...newCommand,
      status: 'pending',
      createdAt: Date.now()
    };

    setCommands(prev => [...prev, command]);
    setNewCommand({ title: '', command: '', description: '', category: 'system', priority: 'medium' });
    setShowCommandEditor(false);

    // Add to development log
    addLog('Command Created', `New command "${command.title}" added to blueprint`, 'success');

    toast({
      title: "✅ Perintah Ditambahkan",
      description: `Blueprint "${command.title}" telah disimpan`,
    });
  };

  const executeCommand = async (commandId: string) => {
    const command = commands.find(c => c.id === commandId);
    if (!command) return;

    // Update status to executing
    setCommands(prev => prev.map(c => 
      c.id === commandId ? { ...c, status: 'executing' } : c
    ));

    addLog('Command Execution Started', `Executing: ${command.title}`, 'success');

    toast({
      title: "🔄 Mengeksekusi Perintah",
      description: `Menjalankan: ${command.title}`,
    });

    // Simulate command execution
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate
      const newStatus = isSuccess ? 'completed' : 'failed';
      const results = isSuccess 
        ? `Command executed successfully. Module updated to version ${systemStats.systemVersion}`
        : 'Execution failed: Insufficient permissions or system conflict';

      setCommands(prev => prev.map(c => 
        c.id === commandId 
          ? { ...c, status: newStatus, executedAt: Date.now(), results }
          : c
      ));

      addLog(
        isSuccess ? 'Command Completed' : 'Command Failed',
        `${command.title}: ${results}`,
        isSuccess ? 'success' : 'error'
      );

      toast({
        title: isSuccess ? "✅ Perintah Berhasil" : "❌ Perintah Gagal",
        description: `${command.title}: ${isSuccess ? 'Eksekusi berhasil' : 'Eksekusi gagal'}`,
        variant: isSuccess ? "default" : "destructive"
      });
    }, 2000 + Math.random() * 3000);
  };

  const addLog = (action: string, details: string, status: 'success' | 'warning' | 'error') => {
    const log: DevelopmentLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      action,
      details,
      moduleVersion: systemStats.systemVersion,
      status
    };

    setDevelopmentLogs(prev => [log, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  const deleteCommand = (commandId: string) => {
    setCommands(prev => prev.filter(c => c.id !== commandId));
    addLog('Command Deleted', `Command blueprint removed from system`, 'warning');
    toast({
      title: "🗑️ Perintah Dihapus",
      description: "Blueprint perintah telah dihapus dari sistem",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'executing': return 'text-blue-400 bg-blue-400/20 animate-pulse';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-yellow-400 bg-yellow-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/20';
      case 'medium': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
              <Cog className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            MIORA DEVELOP
          </h1>
          <p className="text-gray-300 text-lg">
            Self-Evolution Development Center
          </p>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Self Evolution</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.selfEvolutionMode ? 'ON' : 'OFF'}
              </div>
              <div className="text-xs text-gray-400">Mode: Active</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Commands</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.executedCommands}/{systemStats.totalCommands}
              </div>
              <div className="text-xs text-gray-400">Executed/Total</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Infinity className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Infinity Core</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.infinityCoreLinkStatus.toUpperCase()}
              </div>
              <div className="text-xs text-gray-400">Link Status</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">Version</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {systemStats.systemVersion}
              </div>
              <div className="text-xs text-gray-400">System Build</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Command Blueprints */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-purple-500/30 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-cyan-300 flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Command Blueprints
                  </CardTitle>
                  <Button
                    onClick={() => setShowCommandEditor(!showCommandEditor)}
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Command
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showCommandEditor && (
                  <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600/30">
                    <h3 className="text-lg font-semibold text-white mb-4">New Command Blueprint</h3>
                    <div className="space-y-4">
                      <Input
                        placeholder="Command Title"
                        value={newCommand.title}
                        onChange={(e) => setNewCommand(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Textarea
                        placeholder="Command/Script (e.g., /activate-module --name=learning --mode=auto)"
                        value={newCommand.command}
                        onChange={(e) => setNewCommand(prev => ({ ...prev, command: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white font-mono"
                        rows={3}
                      />
                      <Textarea
                        placeholder="Description"
                        value={newCommand.description}
                        onChange={(e) => setNewCommand(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                        rows={2}
                      />
                      <div className="flex gap-4">
                        <select
                          value={newCommand.category}
                          onChange={(e) => setNewCommand(prev => ({ ...prev, category: e.target.value as CommandBlueprint['category'] }))}
                          className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
                        >
                          <option value="system">System</option>
                          <option value="module">Module</option>
                          <option value="learning">Learning</option>
                          <option value="evolution">Evolution</option>
                        </select>
                        <select
                          value={newCommand.priority}
                          onChange={(e) => setNewCommand(prev => ({ ...prev, priority: e.target.value as CommandBlueprint['priority'] }))}
                          className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addCommand} className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Blueprint
                        </Button>
                        <Button
                          onClick={() => setShowCommandEditor(false)}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {commands.map((command) => (
                      <div
                        key={command.id}
                        className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{command.title}</h4>
                            <code className="text-sm text-green-300 bg-gray-800 px-2 py-1 rounded">
                              {command.command}
                            </code>
                            {command.description && (
                              <p className="text-sm text-gray-400 mt-2">{command.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              onClick={() => executeCommand(command.id)}
                              disabled={command.status === 'executing'}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => deleteCommand(command.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge className={`${getStatusColor(command.status)} border-0`}>
                            {command.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(command.priority)} border-0`}>
                            {command.priority}
                          </Badge>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {command.category}
                          </Badge>
                        </div>
                        {command.results && (
                          <div className="mt-2 p-2 bg-gray-800/50 rounded text-sm text-gray-300">
                            <strong>Results:</strong> {command.results}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Development Logs */}
          <div>
            <Card className="bg-gray-800/50 border-purple-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Development Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {developmentLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {log.status === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {log.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                          {log.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                          <span className="font-medium text-white text-sm">{log.action}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{log.details}</p>
                        <div className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()} • v{log.moduleVersion}
                        </div>
                      </div>
                    ))}
                    {developmentLogs.length === 0 && (
                      <div className="text-center text-gray-400 py-8">
                        No development logs yet
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security & Access Control */}
        <Card className="bg-gray-800/50 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Access Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-300 mb-2">Master Access</h4>
                <p className="text-sm text-gray-300">
                  Full system access granted to: <strong>Midya</strong>
                </p>
              </div>
              <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Encryption Status</h4>
                <p className="text-sm text-gray-300">
                  All structural changes: <strong>Encrypted & Logged</strong>
                </p>
              </div>
              <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-300 mb-2">Sandbox Mode</h4>
                <p className="text-sm text-gray-300">
                  Safe execution environment: <strong>Active</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MioraDevelop;
