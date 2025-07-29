import { LLMModel, LLMProvider, LLMRequest, LLMResponse, ChatMessage } from '../types';
import { HuggingFaceLLMProvider } from './providers/HuggingFaceLLMProvider';
import { OpenAILLMProvider } from './providers/OpenAILLMProvider';
import { AnthropicLLMProvider } from './providers/AnthropicLLMProvider';
import { CustomLLMProvider } from './providers/CustomLLMProvider';

export class LLMService {
  private providers: Map<string, any> = new Map();
  private activeModel: LLMModel | null = null;
  private activeProvider: any = null;
  private modelPerformanceMetrics: Map<string, any> = new Map();

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize default providers
    const hfProvider = new HuggingFaceLLMProvider();
    const openaiProvider = new OpenAILLMProvider();
    const anthropicProvider = new AnthropicLLMProvider();
    const customProvider = new CustomLLMProvider();

    this.providers.set('huggingface', hfProvider);
    this.providers.set('openai', openaiProvider);
    this.providers.set('anthropic', anthropicProvider);
    this.providers.set('custom', customProvider);
  }

  async getAvailableModels(): Promise<LLMModel[]> {
    const allModels: LLMModel[] = [];
    
    for (const [providerId, provider] of this.providers) {
      try {
        const models = await provider.getAvailableModels();
        allModels.push(...models);
      } catch (error) {
        console.error(`Error getting models from provider ${providerId}:`, error);
      }
    }

    return allModels;
  }

  async loadModel(modelId: string): Promise<void> {
    const models = await this.getAvailableModels();
    const model = models.find(m => m.id === modelId);
    
    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    const provider = this.providers.get(model.provider);
    if (!provider) {
      throw new Error(`Provider ${model.provider} not found`);
    }

    console.log(`🔄 Loading model: ${model.name}`);
    await provider.loadModel(model);
    
    this.activeModel = model;
    this.activeProvider = provider;
    
    console.log(`✅ Model loaded: ${model.name}`);
  }

  async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    if (!this.activeProvider || !this.activeModel) {
      throw new Error('No model loaded. Please load a model first.');
    }

    try {
      const response = await this.activeProvider.generateResponse(request, this.activeModel);
      
      // Log untuk MIORA learning system
      this.logInteraction(request, response);
      
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

  async generateStream(request: LLMRequest, onChunk: (chunk: string) => void): Promise<void> {
    if (!this.activeProvider || !this.activeModel) {
      throw new Error('No model loaded. Please load a model first.');
    }

    if (!this.activeProvider.generateStream) {
      throw new Error('Streaming not supported by current provider');
    }

    return this.activeProvider.generateStream(request, this.activeModel, onChunk);
  }

  async addCustomModel(model: Partial<LLMModel>, apiUrl?: string, apiKey?: string): Promise<void> {
    const customProvider = this.providers.get('custom');
    if (!customProvider) {
      throw new Error('Custom provider not available');
    }

    await customProvider.addCustomModel(model, apiUrl, apiKey);
  }

  async downloadModel(modelId: string, onProgress?: (progress: number) => void): Promise<void> {
    const models = await this.getAvailableModels();
    const model = models.find(m => m.id === modelId);
    
    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    const provider = this.providers.get(model.provider);
    if (!provider || !provider.downloadModel) {
      throw new Error(`Download not supported for provider ${model.provider}`);
    }

    return provider.downloadModel(model, onProgress);
  }

  getActiveModel(): LLMModel | null {
    return this.activeModel;
  }

  getProviders(): LLMProvider[] {
    return Array.from(this.providers.values()).map(provider => provider.getProviderInfo());
  }

  private logInteraction(request: LLMRequest, response: LLMResponse) {
    // Log untuk MIORA infinity learning system
    const interaction = {
      timestamp: Date.now(),
      model: response.model,
      provider: response.provider,
      inputTokens: request.messages.reduce((sum, msg) => sum + msg.content.length, 0),
      outputTokens: response.tokenCount || response.text.length,
      quality: this.evaluateResponseQuality(request, response)
    };

    // Store untuk MIORA learning
    const existingLogs = JSON.parse(localStorage.getItem('miora_llm_interactions') || '[]');
    existingLogs.push(interaction);
    
    // Keep only last 1000 interactions
    if (existingLogs.length > 1000) {
      existingLogs.splice(0, existingLogs.length - 1000);
    }
    
    localStorage.setItem('miora_llm_interactions', JSON.stringify(existingLogs));
  }

  private evaluateResponseQuality(request: LLMRequest, response: LLMResponse): number {
    // Simple quality evaluation
    let score = 50; // Base score
    
    // Length appropriateness
    if (response.text.length > 10 && response.text.length < 2000) score += 20;
    
    // Response relevance (basic check)
    const lastUserMessage = request.messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
      const commonWords = lastUserMessage.content.toLowerCase().split(' ')
        .filter(word => response.text.toLowerCase().includes(word)).length;
      score += Math.min(commonWords * 5, 30);
    }
    
    return Math.min(Math.max(score, 0), 100);
  }

  async testModelPerformance(modelId: string): Promise<any> {
    const testPrompts = [
      "Hello, how are you?",
      "Explain quantum computing in simple terms.",
      "Write a short story about AI.",
      "What is the capital of Indonesia?"
    ];

    await this.loadModel(modelId);
    
    const results = [];
    for (const prompt of testPrompts) {
      const startTime = Date.now();
      try {
        const response = await this.generateResponse({
          messages: [{ role: 'user', content: prompt, timestamp: Date.now() }],
          model: modelId,
          temperature: 0.7,
          maxTokens: 150
        });
        
        const endTime = Date.now();
        results.push({
          prompt,
          response: response.text,
          responseTime: endTime - startTime,
          tokenCount: response.tokenCount,
          success: true
        });
      } catch (error) {
        results.push({
          prompt,
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        });
      }
    }

    return {
      modelId,
      results,
      avgResponseTime: results.filter(r => r.success).reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.filter(r => r.success).length,
      successRate: results.filter(r => r.success).length / results.length * 100
    };
  }
}
