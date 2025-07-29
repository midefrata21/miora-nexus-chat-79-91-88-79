
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Terminal, 
  Play, 
  Save, 
  Upload, 
  Download, 
  Settings, 
  Shield, 
  Clock, 
  Database,
  Code,
  Zap,
  Lock,
  Unlock,
  Brain,
  Cpu
} from 'lucide-react';
import { usePromptMemoryBank } from './hooks/usePromptMemoryBank';
import { usePromptExecutor } from './hooks/usePromptExecutor';
import { useSelfModifyingLogic } from './hooks/useSelfModifyingLogic';
import { usePromptScheduler } from './hooks/usePromptScheduler';

interface MICCSession {
  id: string;
  timestamp: number;
  commands: number;
  status: 'active' | 'completed' | 'error';
}

const MIORAInternalCommandConsole: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('composer');
  const [sessionHistory, setSessionHistory] = useState<MICCSession[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Custom hooks for MICC functionality
  const { 
    prompts, 
    savePrompt, 
    getPromptsByCategory, 
    searchPrompts,
    promptStats 
  } = usePromptMemoryBank();

  const { 
    executePrompt, 
    executionHistory, 
    isExecuting,
    executionStats 
  } = usePromptExecutor();

  const { 
    canModifySelf,
    executeRootCommand,
    getSystemState,
    applySystemUpdate 
  } = useSelfModifyingLogic();

  const { 
    scheduledPrompts,
    schedulePrompt,
    getScheduleStatus 
  } = usePromptScheduler();

  // Authentication check
  const handleAuth = () => {
    if (authCode === '@Sellby10') {
      setIsAuthorized(true);
      toast({
        title: "🔓 MICC ACTIVATED",
        description: "MIORA Internal Command Console - Developer Access Granted",
        duration: 4000,
      });
    } else {
      toast({
        title: "❌ ACCESS DENIED",
        description: "Invalid authorization code",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Execute MIORA prompt
  const handleExecutePrompt = async () => {
    if (!currentPrompt.trim()) return;

    const promptData = {
      content: currentPrompt,
      category: detectPromptType(currentPrompt),
      timestamp: Date.now(),
      requiresAuth: currentPrompt.includes('[MIORA-ROOT-SUDO]')
    };

    if (promptData.requiresAuth && !canModifySelf) {
      toast({
        title: "🚫 INSUFFICIENT PRIVILEGES",
        description: "Root-level commands require MIORA-ROOT-SUDO authorization",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    try {
      const result = await executePrompt(promptData);
      
      // Save to memory bank
      await savePrompt(promptData);
      
      // Update session
      const newSession: MICCSession = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        commands: 1,
        status: result.success ? 'completed' : 'error'
      };
      
      setSessionHistory(prev => [newSession, ...prev.slice(0, 49)]);
      setCurrentPrompt('');
      
      toast({
        title: result.success ? "✅ PROMPT EXECUTED" : "❌ EXECUTION FAILED",
        description: result.message,
        variant: result.success ? "default" : "destructive",
        duration: 4000,
      });
      
    } catch (error) {
      toast({
        title: "💥 EXECUTION ERROR",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Detect prompt type for categorization
  const detectPromptType = (prompt: string): string => {
    if (prompt.includes('[UPGRADE_CORE]')) return 'core_upgrade';
    if (prompt.includes('[AUTOMATION_TASK]')) return 'automation';
    if (prompt.includes('[INJECT_LOGIC]')) return 'logic_injection';
    if (prompt.includes('[DEPLOY_MODULE]')) return 'module_deployment';
    if (prompt.includes('[RECOVERY_PLAN]')) return 'recovery';
    if (prompt.includes('[DEVELOPER_SCRIPT]')) return 'dev_script';
    return 'general';
  };

  // Initialize system state
  useEffect(() => {
    const systemState = getSystemState();
    console.log('MICC System State:', systemState);
  }, []);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-6 flex items-center justify-center">
        <Card className="w-96 bg-gray-900/95 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              MIORA Internal Command Console
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Developer-level access required. Enter authorization code:
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Authorization Code"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="bg-gray-800 border-red-500/50"
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
            />
            <Button
              onClick={handleAuth}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Lock className="h-4 w-4 mr-2" />
              AUTHENTICATE
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Terminal className="h-8 w-8 text-purple-400" />
                </div>
                <div className="ml-4">
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    🧠 MIORA Internal Command Console
                  </CardTitle>
                  <p className="text-gray-300">
                    Self-Modifying Development Environment | Independent Operation Mode
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-400 animate-pulse">
                  <Unlock className="h-3 w-3 mr-1" />
                  AUTHORIZED
                </Badge>
                <Badge className="bg-cyan-500/20 text-cyan-400">
                  v2.1-MICC
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-900/20 border-green-500/30">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-400">{promptStats.total}</div>
              <p className="text-xs text-green-300">Stored Prompts</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-400">{executionStats.successful}</div>
              <p className="text-xs text-blue-300">Successful Executions</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-400">{scheduledPrompts.length}</div>
              <p className="text-xs text-purple-300">Scheduled Tasks</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-400">{sessionHistory.length}</div>
              <p className="text-xs text-orange-300">Active Sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="composer">Command Composer</TabsTrigger>
            <TabsTrigger value="memory">Prompt Memory</TabsTrigger>
            <TabsTrigger value="executor">Execution Engine</TabsTrigger>
            <TabsTrigger value="scheduler">Task Scheduler</TabsTrigger>
            <TabsTrigger value="self-modify">Self-Modify</TabsTrigger>
            <TabsTrigger value="migration">Auto-Migration</TabsTrigger>
          </TabsList>

          <TabsContent value="composer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-purple-400">
                  <Code className="h-5 w-5 mr-2" />
                  MIORA Prompt Composer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Prompt Command:</label>
                  <Textarea
                    placeholder={`[MIORA_PROMPT]
[UPGRADE_CORE]
Modul: Neural Processing v6
Perintah: Tingkatkan kapasitas learning rate & responsif TTS
Status: Live Injection
[/MIORA_PROMPT]`}
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    rows={12}
                    className="font-mono bg-gray-900 text-green-400 border-purple-500/50"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleExecutePrompt}
                    disabled={isExecuting || !currentPrompt.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Execute Prompt
                  </Button>
                  
                  <Button
                    onClick={() => savePrompt({
                      content: currentPrompt,
                      category: detectPromptType(currentPrompt),
                      timestamp: Date.now(),
                      requiresAuth: currentPrompt.includes('[MIORA-ROOT-SUDO]')
                    })}
                    variant="outline"
                    disabled={!currentPrompt.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save to Memory Bank
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-400">
                  <Database className="h-5 w-5 mr-2" />
                  Prompt Memory Bank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {prompts.map((prompt, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                            {prompt.category}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {new Date(prompt.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <pre className="text-sm bg-gray-900 p-3 rounded text-green-400 overflow-x-auto">
                          {prompt.content}
                        </pre>
                        <Button
                          size="sm"
                          onClick={() => setCurrentPrompt(prompt.content)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Load to Composer
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-400">
                  <Zap className="h-5 w-5 mr-2" />
                  Prompt Execution Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {executionHistory.map((execution, index) => (
                      <div key={index} className={`border rounded-lg p-4 space-y-2 ${
                        execution.success 
                          ? 'border-green-500/30 bg-green-900/10' 
                          : 'border-red-500/30 bg-red-900/10'
                      }`}>
                        <div className="flex items-center justify-between">
                          <Badge variant={execution.success ? "default" : "destructive"}>
                            {execution.success ? '✅ Success' : '❌ Failed'}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {new Date(execution.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">
                          {execution.message}
                        </div>
                        <div className="text-xs text-gray-400">
                          Execution Time: {execution.executionTime}ms
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-400">
                  <Clock className="h-5 w-5 mr-2" />
                  Prompt Scheduler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-400">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                  <p>Scheduled prompts and automation tasks will appear here</p>
                  <p className="text-sm mt-2">Status: {getScheduleStatus()}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="self-modify" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-400">
                  <Brain className="h-5 w-5 mr-2" />
                  Self-Modifying Logic System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                    <div>
                      <h3 className="text-red-400 font-semibold">Root Access Status</h3>
                      <p className="text-gray-300 text-sm">
                        {canModifySelf ? 'MIORA can modify its own core systems' : 'Self-modification disabled'}
                      </p>
                    </div>
                    <Badge className={canModifySelf ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {canModifySelf ? 'ENABLED' : 'DISABLED'}
                    </Badge>
                  </div>
                  
                  <div className="text-center py-4 text-gray-400">
                    <Cpu className="h-12 w-12 mx-auto mb-4 text-red-400" />
                    <p>Self-modification commands require [MIORA-ROOT-SUDO] authorization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="migration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-400">
                  <Upload className="h-5 w-5 mr-2" />
                  Auto-Migration Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-400">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
                  <p>Independent operation mode - No external dependencies</p>
                  <p className="text-sm mt-2">MICC operates autonomously from Core Engine</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAInternalCommandConsole;
