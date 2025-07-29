
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAutoCodeCore } from '@/hooks/useAutoCodeCore';
import { Code, Zap, Terminal, Cpu, Play, Settings, Server, Webhook, Bot } from 'lucide-react';

const AutoCodeInterface: React.FC = () => {
  const {
    autoCommands,
    commandHistory,
    infrastructureProjects,
    isCompiling,
    autoCommandMode,
    setAutoCommandMode,
    createAutoCommand,
    createInfrastructureProject,
    executeCommand,
    improveCommand,
    getCommandStats
  } = useAutoCodeCore();

  const [selectedCommand, setSelectedCommand] = useState<string>('');
  const [commandParams, setCommandParams] = useState<string>('');
  const [newCommandName, setNewCommandName] = useState('');
  const [newCommandDesc, setNewCommandDesc] = useState('');

  const stats = getCommandStats();

  const handleExecuteCommand = async () => {
    if (selectedCommand && commandParams) {
      try {
        const params = JSON.parse(commandParams || '{}');
        await executeCommand(selectedCommand, params);
      } catch {
        await executeCommand(selectedCommand, { raw: commandParams });
      }
      setCommandParams('');
    }
  };

  const handleCreateCommand = () => {
    if (newCommandName && newCommandDesc) {
      createAutoCommand(
        newCommandName,
        newCommandDesc,
        'development',
        'manual_creation'
      );
      setNewCommandName('');
      setNewCommandDesc('');
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* System Status */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-indigo-300">
            <div className="flex items-center">
              <Code className="w-5 h-5 mr-2" />
              MIORA AutoCode Core v1.0
            </div>
            <Badge variant="outline" className={`${autoCommandMode ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
              {autoCommandMode ? 'AUTO-MODE ACTIVE' : 'MANUAL MODE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{autoCommands.length}</div>
              <div className="text-xs text-gray-400">Total Commands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.averageEfficiency?.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Avg Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{commandHistory.length}</div>
              <div className="text-xs text-gray-400">Executions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{(stats.successRate * 100)?.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{stats.activeInfrastructure}</div>
              <div className="text-xs text-gray-400">Active Infra</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setAutoCommandMode(!autoCommandMode)}
              className={`${autoCommandMode ? 'bg-green-600' : 'bg-gray-600'}`}
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              {autoCommandMode ? 'Auto Mode ON' : 'Enable Auto Mode'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Projects */}
      <Card className="bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-violet-300">
            <Server className="w-5 h-5 mr-2" />
            Infrastructure Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {infrastructureProjects.map((project) => (
              <div key={project.id} className="p-4 bg-black/20 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {project.category === 'SignalBot Engine' && <Bot className="w-5 h-5 text-cyan-400" />}
                      {project.category === 'Auto-TTS Notifier' && <Terminal className="w-5 h-5 text-green-400" />}
                      {project.category === 'Telegram Core Link' && <Webhook className="w-5 h-5 text-blue-400" />}
                      {project.category === 'Internal Strategy Optimizer' && <Cpu className="w-5 h-5 text-purple-400" />}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{project.name}</h3>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${
                      project.status === 'active' ? 'text-green-400 border-green-400' :
                      project.status === 'development' ? 'text-yellow-400 border-yellow-400' :
                      'text-gray-400 border-gray-400'
                    }`}>
                      {project.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-violet-400 border-violet-400">
                      v{project.version}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Code Base:</span>
                    <p className="text-gray-300">{project.codeBase}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Dependencies:</span>
                    <p className="text-gray-300">{project.dependencies.join(', ') || 'None'}</p>
                  </div>
                </div>
                
                {project.endpoints.length > 0 && (
                  <div className="mt-3">
                    <span className="text-gray-500 text-sm">Endpoints:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.endpoints.map((endpoint, idx) => (
                        <code key={idx} className="text-xs bg-gray-800 px-2 py-1 rounded text-cyan-300">
                          {endpoint}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Command Execution */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-teal-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-300">
            <Terminal className="w-5 h-5 mr-2" />
            Command Execution Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Select Command</label>
              <select
                value={selectedCommand}
                onChange={(e) => setSelectedCommand(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              >
                <option value="">Choose command...</option>
                {autoCommands.map((cmd) => (
                  <option key={cmd.id} value={cmd.name}>{cmd.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Parameters (JSON)</label>
              <Input
                value={commandParams}
                onChange={(e) => setCommandParams(e.target.value)}
                placeholder='{"symbol": "BTC", "rsi": 25, "type": "breakout"}'
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <Button
            onClick={handleExecuteCommand}
            disabled={!selectedCommand || isCompiling}
            className="bg-gradient-to-r from-cyan-600 to-blue-600"
          >
            <Play className="w-4 h-4 mr-2" />
            {isCompiling ? 'Compiling...' : 'Execute Command'}
          </Button>
        </CardContent>
      </Card>

      {/* Available Commands - Enhanced */}
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-green-300">
            <Cpu className="w-5 h-5 mr-2" />
            Available Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {autoCommands.map((command) => (
              <div key={command.id} className="p-3 bg-black/20 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <code className="text-green-400 font-mono text-sm mr-3">{command.name}</code>
                    <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                      v{command.version}
                    </Badge>
                    {command.isPermanent && (
                      <Badge variant="outline" className="text-xs text-purple-400 border-purple-400 ml-2">
                        CORE
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs text-purple-400 border-purple-400">
                      {command.efficiency}% efficient
                    </Badge>
                    <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                      {command.category}
                    </Badge>
                    {command.name === '/auto-webhook-alert' && (
                      <Webhook className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{command.description}</p>
                <p className="text-gray-500 text-xs">Example: <code>{command.example}</code></p>
                {command.triggerConditions.length > 0 && (
                  <div className="mt-2">
                    <span className="text-gray-500 text-xs">Triggers: </span>
                    <span className="text-gray-400 text-xs">{command.triggerConditions.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create New Command */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Zap className="w-5 h-5 mr-2" />
            Create New Command
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              value={newCommandName}
              onChange={(e) => setNewCommandName(e.target.value)}
              placeholder="Command name (e.g., /my-new-command)"
              className="bg-gray-800 border-gray-600 text-white"
            />
            <Input
              value={newCommandDesc}
              onChange={(e) => setNewCommandDesc(e.target.value)}
              placeholder="Command description"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <Button
            onClick={handleCreateCommand}
            disabled={!newCommandName || !newCommandDesc}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Zap className="w-4 h-4 mr-2" />
            Create Command
          </Button>
        </CardContent>
      </Card>

      {/* Recent Executions */}
      {commandHistory.length > 0 && (
        <Card className="bg-gradient-to-r from-gray-900/30 to-slate-900/30 border-gray-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-300">
              <Terminal className="w-5 h-5 mr-2" />
              Recent Executions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {commandHistory.slice(-10).reverse().map((execution, index) => (
                <div key={index} className="p-2 bg-black/20 rounded text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400">
                      {new Date(execution.timestamp).toLocaleTimeString()}
                    </span>
                    <Badge variant="outline" className={`text-xs ${execution.success ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
                      {execution.success ? 'SUCCESS' : 'FAILED'}
                    </Badge>
                  </div>
                  <p className="text-gray-300">{execution.result}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutoCodeInterface;
