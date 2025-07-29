import { useState, useEffect, useCallback, useRef } from 'react';
import { LLMService } from '../services/LLMService';
import { LLMModel, ChatMessage, LLMResponse } from '../types';
import { toast } from '@/hooks/use-toast';

export const useLLMSystem = () => {
  const [llmService] = useState(() => new LLMService());
  const [availableModels, setAvailableModels] = useState<LLMModel[]>([]);
  const [activeModel, setActiveModel] = useState<LLMModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load available models on mount
  useEffect(() => {
    loadAvailableModels();
    loadProviders();
  }, []);

  const loadAvailableModels = useCallback(async () => {
    try {
      setIsLoading(true);
      const models = await llmService.getAvailableModels();
      setAvailableModels(models);
      
      // Load last used model from localStorage
      const lastModelId = localStorage.getItem('miora_last_llm_model');
      if (lastModelId) {
        const lastModel = models.find(m => m.id === lastModelId);
        if (lastModel) {
          await loadModel(lastModel.id);
        }
      }
    } catch (error) {
      console.error('Error loading models:', error);
      toast({
        title: "Error",
        description: "Gagal memuat daftar model LLM",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [llmService]);

  const loadProviders = useCallback(() => {
    const providerList = llmService.getProviders();
    setProviders(providerList);
  }, [llmService]);

  const loadModel = useCallback(async (modelId: string) => {
    try {
      setIsModelLoading(true);
      await llmService.loadModel(modelId);
      
      const model = llmService.getActiveModel();
      setActiveModel(model);
      
      if (model) {
        localStorage.setItem('miora_last_llm_model', model.id);
        toast({
          title: "Model Loaded",
          description: `${model.name} berhasil dimuat`,
        });
      }
    } catch (error) {
      console.error('Error loading model:', error);
      toast({
        title: "Error",
        description: `Gagal memuat model: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsModelLoading(false);
    }
  }, [llmService]);

  const sendMessage = useCallback(async (content: string): Promise<LLMResponse | null> => {
    if (!activeModel) {
      toast({
        title: "No Model",
        description: "Pilih model LLM terlebih dahulu",
        variant: "destructive"
      });
      return null;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      setIsLoading(true);
      
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await llmService.generateResponse({
        messages: [...messages, userMessage],
        model: activeModel.id,
        temperature: activeModel.config?.temperature || 0.7,
        maxTokens: activeModel.config?.maxTokens || 1000
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.text,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Log for MIORA learning
      logInteraction(userMessage, assistantMessage, response);
      
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Error",
          description: `Gagal mengirim pesan: ${error.message}`,
          variant: "destructive"
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [activeModel, messages, llmService]);

  const sendMessageStream = useCallback(async (
    content: string,
    onChunk: (chunk: string) => void
  ): Promise<void> => {
    if (!activeModel) {
      toast({
        title: "No Model",
        description: "Pilih model LLM terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      setIsLoading(true);
      
      await llmService.generateStream(
        {
          messages: [...messages, userMessage],
          model: activeModel.id,
          temperature: activeModel.config?.temperature || 0.7,
          maxTokens: activeModel.config?.maxTokens || 1000
        },
        onChunk
      );
    } catch (error) {
      console.error('Error streaming message:', error);
      toast({
        title: "Error",
        description: `Gagal streaming pesan: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeModel, messages, llmService]);

  const addCustomModel = useCallback(async (
    model: Partial<LLMModel>,
    apiUrl?: string,
    apiKey?: string
  ) => {
    try {
      await llmService.addCustomModel(model, apiUrl, apiKey);
      await loadAvailableModels();
      
      toast({
        title: "Custom Model Added",
        description: `Model ${model.name} berhasil ditambahkan`,
      });
    } catch (error) {
      console.error('Error adding custom model:', error);
      toast({
        title: "Error",
        description: `Gagal menambah custom model: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  }, [llmService, loadAvailableModels]);

  const testModel = useCallback(async (modelId: string) => {
    try {
      setIsLoading(true);
      const results = await llmService.testModelPerformance(modelId);
      
      toast({
        title: "Model Test Complete",
        description: `Success Rate: ${results.successRate.toFixed(1)}%, Avg Response: ${results.avgResponseTime.toFixed(0)}ms`,
      });
      
      return results;
    } catch (error) {
      console.error('Error testing model:', error);
      toast({
        title: "Error",
        description: `Gagal test model: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [llmService]);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  const logInteraction = useCallback((
    userMessage: ChatMessage,
    assistantMessage: ChatMessage,
    response: LLMResponse
  ) => {
    const interaction = {
      timestamp: Date.now(),
      model: response.model,
      provider: response.provider,
      userInput: userMessage.content,
      aiOutput: assistantMessage.content,
      tokenCount: response.tokenCount,
      quality: evaluateResponseQuality(userMessage.content, assistantMessage.content)
    };

    // Store for MIORA learning system
    const existingLogs = JSON.parse(localStorage.getItem('miora_llm_conversations') || '[]');
    existingLogs.push(interaction);
    
    // Keep only last 100 conversations
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    localStorage.setItem('miora_llm_conversations', JSON.stringify(existingLogs));
  }, []);

  const evaluateResponseQuality = useCallback((input: string, output: string): number => {
    let score = 50; // Base score

    // Length appropriateness
    if (output.length > 10 && output.length < 2000) score += 20;
    
    // Response relevance
    const inputWords = input.toLowerCase().split(' ');
    const outputWords = output.toLowerCase().split(' ');
    const commonWords = inputWords.filter(word => outputWords.includes(word)).length;
    score += Math.min(commonWords * 3, 30);

    return Math.min(Math.max(score, 0), 100);
  }, []);

  // Get system statistics
  const getSystemStats = useCallback(() => {
    const interactions = JSON.parse(localStorage.getItem('miora_llm_conversations') || '[]');
    const totalInteractions = interactions.length;
    const avgQuality = totalInteractions > 0 
      ? interactions.reduce((sum: number, int: any) => sum + (int.quality || 0), 0) / totalInteractions 
      : 0;

    return {
      activeModel: activeModel?.name || 'None',
      totalModels: availableModels.length,
      totalInteractions,
      avgQuality: Math.round(avgQuality),
      providers: providers.length
    };
  }, [activeModel, availableModels, providers]);

  return {
    // State
    availableModels,
    activeModel,
    isLoading,
    isModelLoading,
    messages,
    providers,
    
    // Actions
    loadModel,
    sendMessage,
    sendMessageStream,
    addCustomModel,
    testModel,
    clearConversation,
    loadAvailableModels,
    
    // Utilities
    getSystemStats,
    llmService
  };
};
