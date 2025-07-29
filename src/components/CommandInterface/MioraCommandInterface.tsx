
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { CommandParser, CommandDefinition, SUPPORTED_COMMANDS } from './CommandParser';
import { CommandExecutor, ExecutionResult, ExecutionContext } from './CommandExecutor';
import { Terminal, Upload, Play, History, FileText, Zap, Settings, Rocket, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommandLog {
  id: string;
  command: string;
  result: ExecutionResult;
  context: ExecutionContext;
  timestamp: number;
}

export default function MioraCommandInterface() {
  const [command, setCommand] = useState('');
  const [batchCommands, setBatchCommands] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [commandLogs, setCommandLogs] = useState<CommandLog[]>([]);
  const [activeTab, setActiveTab] = useState('manual');
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [autoModeInterval, setAutoModeInterval] = useState(10);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const commandExecutor = CommandExecutor.getInstance();

  // Auto mode untuk membaca perintah dari localStorage
  useEffect(() => {
    if (!isAutoMode) return;

    const interval = setInterval(() => {
      const queuedCommands = localStorage.getItem('miora_command_queue');
      if (queuedCommands) {
        try {
          const commands = JSON.parse(queuedCommands);
          if (Array.isArray(commands) && commands.length > 0) {
            // Execute first command in queue
            const nextCommand = commands[0];
            executeCommand(nextCommand, { source: 'api', priority: 'high', timestamp: Date.now() });
            
            // Remove executed command from queue
            const remainingCommands = commands.slice(1);
            if (remainingCommands.length > 0) {
              localStorage.setItem('miora_command_queue', JSON.stringify(remainingCommands));
            } else {
              localStorage.removeItem('miora_command_queue');
            }
          }
        } catch (error) {
          console.error('Error processing command queue:', error);
        }
      }
    }, autoModeInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoMode, autoModeInterval]);

  const executeCommand = useCallback(async (
    commandText: string, 
    context?: Partial<ExecutionContext>
  ) => {
    if (!commandText.trim()) return;

    setIsExecuting(true);
    
    const executionContext: ExecutionContext = {
      timestamp: Date.now(),
      priority: 'medium',
      source: 'manual',
      ...context
    };

    try {
      const result = await commandExecutor.executeCommand(commandText, executionContext);
      
      const logEntry: CommandLog = {
        id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        command: commandText,
        result,
        context: executionContext,
        timestamp: Date.now()
      };

      setCommandLogs(prev => [logEntry, ...prev].slice(0, 100)); // Keep last 100 logs

      if (result.success) {
        toast({
          title: "✅ Command Executed",
          description: result.result,
          duration: 3000,
        });
      } else {
        toast({
          title: "❌ Command Failed",
          description: result.result,
          variant: "destructive",
          duration: 4000,
        });
      }

      // Log to external command log
      const externalLog = {
        timestamp: new Date().toISOString(),
        command: commandText,
        result: result.result,
        success: result.success,
        source: executionContext.source,
        executionTime: result.executionTime
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('miora_external_command_log') || '[]');
      existingLogs.unshift(externalLog);
      localStorage.setItem('miora_external_command_log', JSON.stringify(existingLogs.slice(0, 1000)));

    } catch (error) {
      toast({
        title: "💥 Execution Error",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsExecuting(false);
    }
  }, [commandExecutor, toast]);

  const handleSingleCommandExecute = () => {
    if (command.trim()) {
      executeCommand(command);
      setCommand('');
    }
  };

  const handleBatchCommandExecute = async () => {
    if (!batchCommands.trim()) return;

    const commands = batchCommands.split('\n')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd && !cmd.startsWith('#'));

    for (const cmd of commands) {
      await executeCommand(cmd, { source: 'file', priority: 'medium', timestamp: Date.now() });
      // Small delay between batch commands
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setBatchCommands('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'txt';
      
      const validation = CommandParser.validateCommandFile(content, fileExtension);
      
      if (validation.isValid) {
        setBatchCommands(validation.commands.join('\n'));
        toast({
          title: "📁 File Loaded",
          description: `${validation.commands.length} commands loaded from ${file.name}`,
          duration: 3000,
        });
      } else {
        toast({
          title: "❌ Invalid File",
          description: `File validation failed: ${validation.errors.join(', ')}`,
          variant: "destructive",
          duration: 5000,
        });
      }
    };
    
    reader.readAsText(file);
  };

  const clearLogs = () => {
    setCommandLogs([]);
    localStorage.removeItem('miora_external_command_log');
    toast({
      title: "🧹 Logs Cleared",
      description: "All command logs have been cleared",
      duration: 2000,
    });
  };

  const exportLogs = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      logs: commandLogs,
      stats: commandExecutor.getExecutionStats()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miora_command_logs_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = commandExecutor.getExecutionStats();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Terminal className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🌐 MIORA External Instruction Gateway
              </CardTitle>
              <CardDescription className="text-gray-300">
                Sistem Akses Terbuka untuk Instruksi dari Luar ∞
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">{stats.successful}</div>
            <p className="text-xs text-green-300">Successful Commands</p>
          </CardContent>
        </Card>
        <Card className="bg-red-900/20 border-red-500/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
            <p className="text-xs text-red-300">Failed Commands</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <p className="text-xs text-blue-300">Total Executed</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-900/20 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-400">{Math.round(stats.averageTime)}ms</div>
            <p className="text-xs text-purple-300">Avg Response Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Auto Mode Control */}
      <Card className="bg-gray-800/50 border-gray-600/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-lg">Auto Mode Gateway</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-300">Interval (seconds):</label>
                <Input
                  type="number"
                  value={autoModeInterval}
                  onChange={(e) => setAutoModeInterval(Number(e.target.value))}
                  className="w-20"
                  min="1"
                  max="60"
                />
              </div>
              <Button
                onClick={() => setIsAutoMode(!isAutoMode)}
                variant={isAutoMode ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {isAutoMode ? 'Stop Auto Mode' : 'Start Auto Mode'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isAutoMode ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-sm text-gray-300">
              {isAutoMode 
                ? `Auto mode active - checking for queued commands every ${autoModeInterval} seconds`
                : 'Auto mode disabled - commands will only execute manually'
              }
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Evolution Access */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Rocket className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">🧬 Full Self-Evolution Mode</h3>
                <p className="text-gray-300">Sistem pembelajaran otomatis & pertumbuhan berbasis tujuan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="px-4 py-2 bg-green-500 text-white">
                <Brain className="h-4 w-4 mr-2" />
                READY TO EVOLVE
              </Badge>
              <Link to="/full-self-evolution">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3">
                  <Rocket className="h-5 w-5 mr-2" />
                  ACTIVATE EVOLUTION
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manual">Manual Command</TabsTrigger>
          <TabsTrigger value="batch">Batch Commands</TabsTrigger>
          <TabsTrigger value="reference">Command Reference</TabsTrigger>
          <TabsTrigger value="logs">Execution Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Single Command Execution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter command (e.g., PRINT: Hello MIORA)"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSingleCommandExecute()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSingleCommandExecute}
                  disabled={isExecuting || !command.trim()}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Batch Command Execution
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Load File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.json,.yaml,.yml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter multiple commands (one per line)&#10;&#10;Example:&#10;PRINT: Starting batch execution&#10;UPDATE_MEMORY: batch_run=true&#10;VOICE_SPEAK: Batch execution complete"
                value={batchCommands}
                onChange={(e) => setBatchCommands(e.target.value)}
                rows={8}
                className="font-mono"
              />
              <Button 
                onClick={handleBatchCommandExecute}
                disabled={isExecuting || !batchCommands.trim()}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Execute Batch
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reference" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Commands</CardTitle>
              <CardDescription>
                Complete reference of supported MIORA external commands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['system', 'file', 'memory', 'brain', 'module'].map(category => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-lg font-semibold capitalize text-purple-400">
                      {category} Commands
                    </h3>
                    <div className="grid gap-3">
                      {CommandParser.getCommandsByCategory(category as any).map(cmd => (
                        <div key={cmd.name} className="border border-gray-600 rounded-lg p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              {cmd.name}
                            </Badge>
                            <span className="text-sm text-gray-300">{cmd.description}</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            <strong>Parameters:</strong> {cmd.parameters}
                          </div>
                          <div className="text-sm font-mono bg-gray-800 p-2 rounded">
                            {cmd.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Execution History
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={exportLogs} size="sm">
                    Export Logs
                  </Button>
                  <Button variant="outline" onClick={clearLogs} size="sm">
                    Clear Logs
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {commandLogs.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      No command executions yet. Run some commands to see logs here.
                    </div>
                  ) : (
                    commandLogs.map(log => (
                      <div 
                        key={log.id}
                        className={`border rounded-lg p-3 space-y-2 ${
                          log.result.success 
                            ? 'border-green-500/30 bg-green-900/10' 
                            : 'border-red-500/30 bg-red-900/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">{log.command}</span>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={log.result.success ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {log.result.success ? '✅ Success' : '❌ Failed'}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          {log.result.result}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>Module: {log.result.module}</span>
                          <span>Source: {log.context.source}</span>
                          <span>Time: {log.result.executionTime}ms</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Footer */}
      <Card className="bg-gray-800/30 border-gray-600/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>🌐 MIORA External Gateway v1.0 - Ready untuk menerima instruksi dari sistem luar</span>
            <span>Status: {isExecuting ? '⚡ Executing...' : '✅ Ready'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
