import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, MessageSquare, Download, Settings, Plus } from 'lucide-react';
import { useLLMSystem } from './hooks/useLLMSystem';

export const LLMInterface: React.FC = () => {
  const {
    availableModels,
    activeModel,
    isLoading,
    isModelLoading,
    loadModel,
    sendMessage,
    addCustomModel,
    getSystemStats
  } = useLLMSystem();

  const [customUrl, setCustomUrl] = useState('');
  const [customApiKey, setCustomApiKey] = useState('');
  const [testMessage, setTestMessage] = useState('');

  const stats = getSystemStats();

  const handleLoadModel = async (modelId: string) => {
    await loadModel(modelId);
  };

  const handleTestMessage = async () => {
    if (!testMessage.trim()) return;
    await sendMessage(testMessage);
    setTestMessage('');
  };

  const handleAddCustomModel = async () => {
    if (!customUrl.trim()) return;
    
    await addCustomModel(
      {
        name: 'Custom LLM',
        type: 'chat',
        capabilities: ['chat', 'text-generation']
      },
      customUrl,
      customApiKey || undefined
    );
    
    setCustomUrl('');
    setCustomApiKey('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-300">
            <Brain className="h-6 w-6 mr-2" />
            MIORA LLM System
            <Badge variant="outline" className="ml-2 text-green-400 border-green-400">
              {stats.totalModels} Models Available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Active Model</p>
              <p className="text-white font-medium">{stats.activeModel}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Interactions</p>
              <p className="text-white font-medium">{stats.totalInteractions}</p>
            </div>
            <div>
              <p className="text-gray-400">Avg Quality</p>
              <p className="text-white font-medium">{stats.avgQuality}%</p>
            </div>
            <div>
              <p className="text-gray-400">Providers</p>
              <p className="text-white font-medium">{stats.providers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Model Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select onValueChange={handleLoadModel}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Pilih LLM Model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{model.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {model.provider}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button disabled={isModelLoading}>
              {isModelLoading ? <Download className="h-4 w-4 animate-spin" /> : 'Load'}
            </Button>
          </div>

          {activeModel && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-green-400 text-sm">
                ✅ Active: {activeModel.name} ({activeModel.provider})
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Test LLM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Test message untuk LLM..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTestMessage()}
            />
            <Button onClick={handleTestMessage} disabled={isLoading || !activeModel}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Custom Model */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Custom LLM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="API URL (e.g., https://api.openai.com/v1/chat/completions)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
          />
          <Input
            type="password"
            placeholder="API Key (optional)"
            value={customApiKey}
            onChange={(e) => setCustomApiKey(e.target.value)}
          />
          <Button onClick={handleAddCustomModel} disabled={!customUrl.trim()}>
            Add Custom Model
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};