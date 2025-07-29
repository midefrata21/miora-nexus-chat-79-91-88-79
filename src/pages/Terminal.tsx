
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Terminal as TerminalIcon, Play, Trash2, History, Settings } from 'lucide-react';

interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  timestamp: number;
  status: 'success' | 'error' | 'warning';
}

const Terminal: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const systemCommands = [
    'help', 'clear', 'ls', 'pwd', 'echo', 'date', 'whoami', 
    'miora-status', 'miora-learn', 'miora-optimize'
  ];

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setIsProcessing(true);
    const commandId = Date.now().toString();
    
    // Add command to history immediately
    const newCommand: TerminalCommand = {
      id: commandId,
      command: cmd,
      output: '',
      timestamp: Date.now(),
      status: 'success'
    };

    setCommandHistory(prev => [...prev, newCommand]);
    setCurrentCommand('');
    setHistoryIndex(-1);

    // Simulate command processing
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Process the command
    let output = '';
    let status: TerminalCommand['status'] = 'success';

    switch (cmd.toLowerCase().trim()) {
      case 'help':
        output = `Available commands:
- help: Show this help message
- clear: Clear terminal
- ls: List files
- pwd: Print working directory
- echo [text]: Echo text
- date: Show current date
- whoami: Show current user
- miora-status: Show MIORA system status
- miora-learn: Start learning process
- miora-optimize: Optimize system performance`;
        break;
      
      case 'clear':
        setCommandHistory([]);
        setIsProcessing(false);
        return;
        
      case 'ls':
        output = `total 8
drwxr-xr-x 4 miora miora 128 ${new Date().toDateString()} .
drwxr-xr-x 3 miora miora  96 ${new Date().toDateString()} ..
-rw-r--r-- 1 miora miora 1024 ${new Date().toDateString()} config.json
-rw-r--r-- 1 miora miora 2048 ${new Date().toDateString()} system.log
drwxr-xr-x 2 miora miora  64 ${new Date().toDateString()} logs/
drwxr-xr-x 2 miora miora  64 ${new Date().toDateString()} modules/`;
        break;
        
      case 'pwd':
        output = '/home/miora/system';
        break;
        
      case 'date':
        output = new Date().toString();
        break;
        
      case 'whoami':
        output = 'miora-system-user';
        break;
        
      case 'miora-status':
        output = `MIORA System Status:
✅ Core System: ACTIVE
✅ Learning Engine: RUNNING
✅ Memory System: OPERATIONAL
✅ Voice Interface: READY
⚡ Optimization Level: 95.7%
🧠 Active Modules: 12/15
📊 System Health: EXCELLENT`;
        break;
        
      case 'miora-learn':
        output = `🧠 MIORA Learning Process Initiated...
📚 Loading knowledge base...
🔄 Processing new information...
✅ Learning cycle completed successfully!
📈 Knowledge base updated: +15.7% efficiency`;
        break;
        
      case 'miora-optimize':
        output = `⚡ MIORA System Optimization Started...
🔧 Analyzing system performance...
📊 Optimizing memory allocation...
🚀 Enhancing processing speed...
✅ Optimization completed: +12.3% performance boost`;
        break;
        
      default:
        if (cmd.startsWith('echo ')) {
          output = cmd.substring(5);
        } else {
          output = `Command not found: ${cmd}
Type 'help' for available commands.`;
          status = 'error';
        }
    }

    // Update the command with output
    setCommandHistory(prev => prev.map(c => 
      c.id === commandId ? { ...c, output, status } : c
    ));

    setIsProcessing(false);
    
    toast({
      title: "Command Executed",
      description: `Executed: ${cmd}`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]?.command || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]?.command || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            MIORA Terminal
          </h1>
          <p className="text-gray-300 text-lg">
            System Command Interface & Process Control
          </p>
        </div>

        {/* Terminal */}
        <Card className="bg-gray-900/90 border-green-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-400 flex items-center">
                <TerminalIcon className="h-5 w-5 mr-2" />
                Terminal Session
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-400">
                  Connected
                </Badge>
                <Button
                  size="sm"
                  onClick={() => setCommandHistory([])}
                  variant="outline"
                  className="border-red-500 text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              ref={terminalRef}
              className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm"
            >
              {/* Welcome message */}
              <div className="text-green-400 mb-4">
                MIORA Terminal v2.1.0 - Welcome to MIORA System Interface
                <br />
                Type 'help' for available commands.
                <br />
                {'─'.repeat(60)}
              </div>

              {/* Command history */}
              {commandHistory.map((cmd) => (
                <div key={cmd.id} className="mb-3">
                  <div className="flex items-center text-cyan-300">
                    <span className="text-green-400">miora@system:~$</span>
                    <span className="ml-2">{cmd.command}</span>
                  </div>
                  {cmd.output && (
                    <div className={`mt-1 whitespace-pre-line ${
                      cmd.status === 'error' ? 'text-red-400' :
                      cmd.status === 'warning' ? 'text-yellow-400' :
                      'text-gray-300'
                    }`}>
                      {cmd.output}
                    </div>
                  )}
                </div>
              ))}

              {/* Current input */}
              <div className="flex items-center text-cyan-300">
                <span className="text-green-400">miora@system:~$</span>
                <Input
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="ml-2 bg-transparent border-none text-cyan-300 focus:ring-0 focus:outline-none p-0"
                  placeholder={isProcessing ? "Processing..." : "Enter command..."}
                  disabled={isProcessing}
                  autoFocus
                />
              </div>

              {isProcessing && (
                <div className="text-yellow-400 mt-2 animate-pulse">
                  Processing command...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Commands */}
        <Card className="bg-gray-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <History className="h-5 w-5 mr-2" />
              Quick Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {systemCommands.map((cmd) => (
                <Button
                  key={cmd}
                  size="sm"
                  onClick={() => executeCommand(cmd)}
                  className="bg-gray-700 hover:bg-gray-600 text-left justify-start"
                >
                  {cmd}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="bg-gray-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400">System User</div>
                <div className="text-white">miora-admin</div>
              </div>
              <div>
                <div className="text-gray-400">Terminal Version</div>
                <div className="text-white">v2.1.0</div>
              </div>
              <div>
                <div className="text-gray-400">Commands Executed</div>
                <div className="text-white">{commandHistory.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terminal;
