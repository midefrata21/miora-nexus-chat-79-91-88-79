import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { 
  Play, 
  Code, 
  Terminal, 
  Download, 
  Settings, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  FileCode,
  Zap
} from 'lucide-react';

import { 
  AICodeGeneratorService, 
  CodeGenerationRequest, 
  GeneratedCode, 
  CodeExecutionResult 
} from '@/services/aiCodeGenerator';
import { 
  MioraCommandBuilder, 
  MioraCommand, 
  CommandExecutionContext 
} from '@/services/mioraCommandBuilder';

interface GenerationTask {
  id: string;
  prompt: string;
  status: 'pending' | 'generating' | 'executing' | 'completed' | 'error';
  startTime: number;
  generatedCode?: GeneratedCode;
  executionResult?: CodeExecutionResult;
  commands?: MioraCommand[];
  error?: string;
}

export const RealAutoCodeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'anthropic' | 'perplexity' | 'azure' | 'replicate'>('openai');
  const [tasks, setTasks] = useState<GenerationTask[]>([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [selectedType, setSelectedType] = useState<CodeGenerationRequest['type']>('component');
  const [selectedLanguage, setSelectedLanguage] = useState<CodeGenerationRequest['language']>('typescript');

  const codeGeneratorRef = useRef<AICodeGeneratorService>();
  const commandBuilderRef = useRef<MioraCommandBuilder>(new MioraCommandBuilder());

  const initializeGenerator = () => {
    if (!apiKey.trim()) {
      toast({
        title: "⚠️ API Key Required",
        description: `Please enter your ${getProviderDisplayName(selectedProvider)} API key to enable code generation`,
        variant: "destructive",
      });
      return false;
    }

    codeGeneratorRef.current = new AICodeGeneratorService(apiKey, selectedProvider);
    setIsConfigured(true);
    
    toast({
      title: "✅ MIORA AutoCode Activated",
      description: `Real AI code generation system is now active with ${getProviderDisplayName(selectedProvider)}`,
    });
    
    return true;
  };

  const getProviderDisplayName = (provider: string) => {
    switch (provider) {
      case 'openai': return 'OpenAI';
      case 'anthropic': return 'Anthropic Claude';
      case 'perplexity': return 'Perplexity';
      case 'azure': return 'Azure OpenAI';
      case 'replicate': return 'Replicate';
      default: return 'OpenAI';
    }
  };

  const getProviderPlaceholder = (provider: string) => {
    switch (provider) {
      case 'openai': return 'sk-...';
      case 'anthropic': return 'sk-ant-...';
      case 'perplexity': return 'pplx-...';
      case 'azure': return 'Your Azure API key';
      case 'replicate': return 'r8_...';
      default: return 'API Key';
    }
  };

  const getProviderDescription = (provider: string) => {
    switch (provider) {
      case 'openai': return 'Paling populer dan canggih untuk code generation';
      case 'anthropic': return 'Claude-4 terbaru dengan reasoning yang superior';
      case 'perplexity': return 'Real-time web search + AI untuk kode terkini';
      case 'azure': return 'Enterprise-grade OpenAI via Microsoft Azure';
      case 'replicate': return 'Open source models untuk code generation';
      default: return '';
    }
  };

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "⚠️ Prompt Required",
        description: "Please enter a description for what you want to generate",
        variant: "destructive",
      });
      return;
    }

    if (!isConfigured && !initializeGenerator()) {
      return;
    }

    const taskId = `task-${Date.now()}`;
    const newTask: GenerationTask = {
      id: taskId,
      prompt,
      status: 'pending',
      startTime: Date.now(),
    };

    setTasks(prev => [newTask, ...prev]);

    try {
      // Update task to generating
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: 'generating' } : task
      ));

      // Generate code using AI
      const request: CodeGenerationRequest = {
        prompt,
        type: selectedType,
        framework: 'react',
        language: selectedLanguage,
        context: 'MIORA AutoCode Engine - Generate production-ready code with proper error handling and TypeScript types',
      };

      const generatedCode = await codeGeneratorRef.current!.generateCode(request);

      // Generate MIORA commands
      const commands = [commandBuilderRef.current.generateCommandFromCode(generatedCode, prompt)];

      // Update task with generated code
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'executing', generatedCode, commands }
          : task
      ));

      // Execute the generated code
      const executionResult = await codeGeneratorRef.current!.executeCode(generatedCode);

      // Final update
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: executionResult.success ? 'completed' : 'error',
              executionResult,
              error: executionResult.success ? undefined : executionResult.errors.join(', ')
            }
          : task
      ));

      toast({
        title: executionResult.success ? "🚀 Code Generated Successfully" : "⚠️ Generation Completed with Issues",
        description: executionResult.success 
          ? `Generated ${generatedCode.files.length} files and ${commands.length} commands`
          : `Generated code but encountered ${executionResult.errors.length} errors`,
        variant: executionResult.success ? "default" : "destructive",
      });

    } catch (error) {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: 'error',
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          : task
      ));

      toast({
        title: "❌ Generation Failed",
        description: error instanceof Error ? error.message : 'Failed to generate code',
        variant: "destructive",
      });
    }
  };

  const executeCommand = async (command: MioraCommand) => {
    try {
      const context: CommandExecutionContext = {
        workspaceId: 'miora-workspace',
        projectPath: './src',
        environment: 'development',
        userPermissions: ['generate', 'build', 'deploy'],
        variables: {}
      };

      const result = await commandBuilderRef.current.executeCommand(
        command.id,
        { deploy: false, test: true },
        context
      );

      toast({
        title: result.success ? "✅ Command Executed" : "❌ Command Failed",
        description: result.output,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "❌ Command Execution Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: GenerationTask['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'generating':
      case 'executing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = (status: GenerationTask['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'generating':
        return 'Generating Code...';
      case 'executing':
        return 'Executing Code...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MIORA Real AutoCode Engine
        </h1>
        <p className="text-muted-foreground">
          AI-Powered Code Generation dengan Natural Language Processing
        </p>
      </div>

      {/* Configuration Panel */}
      {!isConfigured && (
        <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Pilih provider AI terbaik untuk code generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">AI Provider</label>
              <select 
                value={selectedProvider} 
                onChange={(e) => setSelectedProvider(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              >
                <option value="openai">🤖 OpenAI GPT-4 (Recommended)</option>
                <option value="anthropic">🧠 Anthropic Claude-4 (Most Advanced)</option>
                <option value="perplexity">🔍 Perplexity (Real-time Web)</option>
                <option value="azure">☁️ Azure OpenAI (Enterprise)</option>
                <option value="replicate">🔥 Replicate (Open Source)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                {getProviderDescription(selectedProvider)}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium">{getProviderDisplayName(selectedProvider)} API Key</label>
              <Input
                type="password"
                placeholder={getProviderPlaceholder(selectedProvider)}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your API key from {getProviderDisplayName(selectedProvider)} developer console
              </p>
            </div>
            
            <Button onClick={initializeGenerator} className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Activate MIORA AutoCode with {getProviderDisplayName(selectedProvider)}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              >
                <option value="component">React Component</option>
                <option value="hook">Custom Hook</option>
                <option value="util">Utility Function</option>
                <option value="page">Full Page</option>
                <option value="api">API Endpoint</option>
                <option value="full-app">Full Application</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Language</label>
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Natural Language Prompt</label>
            <Textarea
              placeholder="Describe what you want to generate... e.g., 'Create a responsive user profile card with avatar, name, email, and edit button'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>

          <Button 
            onClick={generateCode} 
            disabled={!prompt.trim()}
            className="w-full"
          >
            <Play className="h-4 w-4 mr-2" />
            Generate Code with AI
          </Button>
        </CardContent>
      </Card>

      {/* Tasks Display */}
      {tasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Generation Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="font-medium">{getStatusText(task.status)}</span>
                        <Badge variant="outline">{task.id}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((Date.now() - task.startTime) / 1000)}s ago
                      </span>
                    </div>

                    <p className="text-sm bg-muted p-2 rounded">{task.prompt}</p>

                    {task.error && (
                      <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        Error: {task.error}
                      </div>
                    )}

                    {task.generatedCode && (
                      <Tabs defaultValue="files" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="files">Files ({task.generatedCode.files.length})</TabsTrigger>
                          <TabsTrigger value="commands">Commands ({task.commands?.length || 0})</TabsTrigger>
                          <TabsTrigger value="execution">Execution</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="files" className="space-y-2">
                          {task.generatedCode.files.map((file, index) => (
                            <div key={index} className="border rounded p-2">
                              <div className="flex items-center gap-2 mb-2">
                                <FileCode className="h-4 w-4" />
                                <span className="font-mono text-sm">{file.path}</span>
                                <Badge variant="secondary">{file.type}</Badge>
                              </div>
                              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                {file.content.substring(0, 200)}...
                              </pre>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="commands" className="space-y-2">
                          {task.commands?.map((command) => (
                            <div key={command.id} className="border rounded p-2">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-sm">{command.name}</span>
                                <Button 
                                  size="sm" 
                                  onClick={() => executeCommand(command)}
                                >
                                  Execute
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">{command.description}</p>
                              <div className="text-xs font-mono mt-1">{command.syntax}</div>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="execution" className="space-y-2">
                          {task.executionResult && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Build Time:</span>
                                  <div>{task.executionResult.performance.buildTime}ms</div>
                                </div>
                                <div>
                                  <span className="font-medium">Bundle Size:</span>
                                  <div>{task.executionResult.performance.bundleSize}KB</div>
                                </div>
                                <div>
                                  <span className="font-medium">Memory:</span>
                                  <div>{task.executionResult.performance.memoryUsage}MB</div>
                                </div>
                              </div>
                              <div className="bg-muted p-2 rounded">
                                <pre className="text-xs">{task.executionResult.output}</pre>
                              </div>
                              {task.executionResult.warnings.length > 0 && (
                                <div className="text-yellow-600 text-sm">
                                  Warnings: {task.executionResult.warnings.join(', ')}
                                </div>
                              )}
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};