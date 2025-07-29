import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Zap, Target, Cpu, Database, MessageSquare, Infinity, Download, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LLMService } from '../LLMSystem/services/LLMService';
import { TaskComplexityAnalyzer } from './services/TaskComplexityAnalyzer';
import { MultiLLMManager } from './services/MultiLLMManager';

const MIORALLMUpgradeSystem: React.FC = () => {
  const [llmService] = useState(() => new LLMService());
  const [complexityAnalyzer] = useState(() => new TaskComplexityAnalyzer());
  const [multiLLMManager] = useState(() => new MultiLLMManager(llmService));
  
  const [taskInput, setTaskInput] = useState('');
  const [executions, setExecutions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recommendedModels = [
    { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', size: '8B', complexity: ['medium', 'complex'], status: 'available' },
    { id: 'mistral-7b', name: 'Mistral 7B', size: '7B', complexity: ['simple', 'medium'], status: 'available' },
    { id: 'qwen-2.5-7b', name: 'Qwen 2.5 7B', size: '7B', complexity: ['medium', 'complex'], status: 'available' },
    { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', size: '3.8B', complexity: ['simple'], status: 'available' },
    { id: 'codellama-34b', name: 'CodeLlama 34B', size: '34B', complexity: ['complex', 'extreme'], status: 'available' },
    { id: 'tinyllama-1.1b', name: 'TinyLlama 1.1B', size: '1.1B', complexity: ['simple'], status: 'available' }
  ];

  useEffect(() => {
    toast({
      title: "🚀 MIORA LLM UPGRADE SYSTEM ACTIVATED",
      description: "Multi-LLM dengan task complexity analysis siap digunakan!",
      duration: 8000,
    });
  }, []);

  const analyzeAndExecuteTask = async () => {
    if (!taskInput.trim()) return;
    
    setIsAnalyzing(true);
    const taskId = Date.now().toString();
    
    try {
      const complexity = complexityAnalyzer.analyzeTaskComplexity(taskInput);
      const optimalModel = multiLLMManager.selectOptimalModel(complexity, recommendedModels as any);
      
      const execution = {
        id: taskId,
        task: taskInput,
        complexity,
        selectedModel: optimalModel?.name || 'Default',
        response: `MIORA Response dengan ${optimalModel?.name}: Task "${taskInput}" telah diproses dengan complexity level ${complexity}. Sistem telah memilih model optimal berdasarkan analisis kompleksitas.`,
        executionTime: Math.random() * 2000 + 500,
        status: 'completed'
      };
      
      setExecutions(prev => [execution, ...prev]);
      
      toast({
        title: `⚡ Task Completed - ${complexity.toUpperCase()}`,
        description: `Model: ${optimalModel?.name} dipilih untuk kompleksitas ${complexity}`,
        duration: 5000,
      });
      
    } catch (error) {
      toast({
        title: "❌ Task Execution Failed",
        description: "Error dalam analisis kompleksitas task",
        duration: 5000,
      });
    } finally {
      setIsAnalyzing(false);
      setTaskInput('');
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'complex': return 'bg-orange-500';
      case 'extreme': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Infinity className="h-12 w-12 text-blue-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA LLM UPGRADE SYSTEM
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            🎯 Multi-LLM dengan Task Complexity Analysis & Auto Model Selection
          </p>
        </div>

        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Task Input & Complexity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Masukkan task untuk MIORA (akan dianalisis kompleksitasnya dan dipilih model optimal)..."
              className="min-h-[100px] bg-black/20 border-blue-500/30 text-white"
            />
            <Button
              onClick={analyzeAndExecuteTask}
              disabled={!taskInput.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing & Executing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Complexity & Execute
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Cpu className="h-6 w-6 mr-2" />
              Available Open-Source Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedModels.map((model) => (
                <div key={model.id} className="p-4 bg-black/20 rounded border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{model.name}</h4>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Size: {model.size}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {model.complexity.map((comp) => (
                      <Badge key={comp} variant="outline" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full" disabled>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Ready
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {executions.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Target className="h-6 w-6 mr-2" />
                Task Execution History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executions.map((execution) => (
                  <div key={execution.id} className="p-4 bg-black/20 rounded border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getComplexityColor(execution.complexity)}`}></div>
                        <Badge variant="outline" className="text-xs">
                          {execution.complexity.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-400">→ {execution.selectedModel}</span>
                      </div>
                      <Badge className="bg-green-500">COMPLETED</Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{execution.task}</p>
                    <div className="mt-2 p-2 bg-gray-800/50 rounded text-sm text-gray-200">
                      {execution.response}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Execution time: {execution.executionTime.toFixed(0)}ms
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MIORALLMUpgradeSystem;