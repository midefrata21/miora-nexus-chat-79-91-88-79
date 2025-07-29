import { LLMModel, LLMProvider, LLMRequest, LLMResponse } from '../../types';

interface CustomEndpoint {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
  format: 'openai' | 'anthropic' | 'ollama' | 'generic';
  headers?: Record<string, string>;
}

export class CustomLLMProvider {
  private customEndpoints: Map<string, CustomEndpoint> = new Map();
  private availableModels: LLMModel[] = [];

  async addCustomModel(
    model: Partial<LLMModel>,
    apiUrl?: string,
    apiKey?: string,
    format: 'openai' | 'anthropic' | 'ollama' | 'generic' = 'openai'
  ): Promise<void> {
    const customModel: LLMModel = {
      id: model.id || `custom_${Date.now()}`,
      name: model.name || 'Custom Model',
      provider: 'custom',
      type: model.type || 'chat',
      capabilities: model.capabilities || ['chat', 'text-generation'],
      status: 'available',
      apiUrl: apiUrl,
      config: {
        temperature: 0.7,
        maxTokens: 1000,
        contextLength: 4096,
        ...model.config
      }
    };

    if (apiUrl) {
      const endpoint: CustomEndpoint = {
        id: customModel.id,
        name: customModel.name,
        url: apiUrl,
        apiKey: apiKey,
        format: format
      };

      this.customEndpoints.set(customModel.id, endpoint);
    }

    this.availableModels.push(customModel);
    console.log(`✅ Custom model added: ${customModel.name}`);
  }

  async addOllamaModel(modelName: string, baseUrl: string = 'http://localhost:11434'): Promise<void> {
    await this.addCustomModel(
      {
        id: `ollama_${modelName}`,
        name: `Ollama ${modelName}`,
        type: 'chat',
        capabilities: ['chat', 'text-generation', 'local']
      },
      `${baseUrl}/api/chat`,
      undefined,
      'ollama'
    );
  }

  async addHuggingFaceInference(modelId: string, apiKey: string): Promise<void> {
    await this.addCustomModel(
      {
        id: `hf_${modelId.replace('/', '_')}`,
        name: `HF ${modelId}`,
        type: 'text-generation',
        capabilities: ['text-generation', 'cloud']
      },
      `https://api-inference.huggingface.co/models/${modelId}`,
      apiKey,
      'generic'
    );
  }

  async getAvailableModels(): Promise<LLMModel[]> {
    return this.availableModels;
  }

  async loadModel(model: LLMModel): Promise<void> {
    const endpoint = this.customEndpoints.get(model.id);
    if (!endpoint) {
      // Model without custom endpoint - just mark as loaded
      model.status = 'loaded';
      return;
    }

    // Test connection if endpoint exists
    try {
      const testResponse = await this.testConnection(endpoint);
      if (testResponse) {
        model.status = 'loaded';
        console.log(`✅ Custom model loaded: ${model.name}`);
      }
    } catch (error) {
      model.status = 'error';
      console.error(`❌ Error loading custom model ${model.name}:`, error);
      throw error;
    }
  }

  private async testConnection(endpoint: CustomEndpoint): Promise<boolean> {
    try {
      // Simple ping test based on format
      switch (endpoint.format) {
        case 'ollama':
          const ollamaResponse = await fetch(endpoint.url.replace('/api/chat', '/api/tags'));
          return ollamaResponse.ok;
        
        case 'openai':
          if (!endpoint.apiKey) return true; // Skip test if no API key
          const openaiResponse = await fetch(endpoint.url.replace('/chat/completions', '/models'), {
            headers: {
              'Authorization': `Bearer ${endpoint.apiKey}`,
              'Content-Type': 'application/json'
            }
          });
          return openaiResponse.ok;
        
        default:
          return true; // Skip test for generic endpoints
      }
    } catch (error) {
      console.warn('Connection test failed:', error);
      return false;
    }
  }

  async generateResponse(request: LLMRequest, model: LLMModel): Promise<LLMResponse> {
    const endpoint = this.customEndpoints.get(model.id);
    if (!endpoint) {
      throw new Error(`No endpoint configured for model ${model.name}`);
    }

    try {
      let requestBody: any;
      let headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...endpoint.headers
      };

      // Format request based on endpoint type
      switch (endpoint.format) {
        case 'openai':
          if (endpoint.apiKey) {
            headers['Authorization'] = `Bearer ${endpoint.apiKey}`;
          }
          requestBody = {
            model: model.modelPath || model.id,
            messages: request.messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            temperature: request.temperature || model.config?.temperature || 0.7,
            max_tokens: request.maxTokens || model.config?.maxTokens || 1000
          };
          break;

        case 'anthropic':
          if (endpoint.apiKey) {
            headers['x-api-key'] = endpoint.apiKey;
            headers['anthropic-version'] = '2023-06-01';
          }
          const messages = request.messages.filter(msg => msg.role !== 'system');
          const systemMessage = request.messages.find(msg => msg.role === 'system');
          requestBody = {
            model: model.modelPath || model.id,
            max_tokens: request.maxTokens || model.config?.maxTokens || 1000,
            temperature: request.temperature || model.config?.temperature || 0.7,
            system: systemMessage?.content,
            messages: messages.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.content
            }))
          };
          break;

        case 'ollama':
          requestBody = {
            model: model.modelPath || model.id.replace('ollama_', ''),
            messages: request.messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            stream: false,
            options: {
              temperature: request.temperature || model.config?.temperature || 0.7,
              num_predict: request.maxTokens || model.config?.maxTokens || 1000
            }
          };
          break;

        case 'generic':
        default:
          if (endpoint.apiKey) {
            headers['Authorization'] = `Bearer ${endpoint.apiKey}`;
          }
          requestBody = {
            inputs: request.messages[request.messages.length - 1].content,
            parameters: {
              temperature: request.temperature || model.config?.temperature || 0.7,
              max_new_tokens: request.maxTokens || model.config?.maxTokens || 1000
            }
          };
          break;
      }

      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Custom API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      // Parse response based on endpoint type
      let text = '';
      let tokenCount = undefined;

      switch (endpoint.format) {
        case 'openai':
          text = data.choices[0]?.message?.content || '';
          tokenCount = data.usage?.total_tokens;
          break;

        case 'anthropic':
          text = data.content[0]?.text || '';
          tokenCount = data.usage?.output_tokens;
          break;

        case 'ollama':
          text = data.message?.content || '';
          break;

        case 'generic':
        default:
          if (Array.isArray(data)) {
            text = data[0]?.generated_text || data[0]?.text || JSON.stringify(data[0]);
          } else {
            text = data.generated_text || data.text || data.output || JSON.stringify(data);
          }
          break;
      }

      return {
        text,
        tokenCount,
        model: model.id,
        provider: 'custom'
      };

    } catch (error) {
      console.error(`Error with custom model ${model.name}:`, error);
      throw error;
    }
  }

  getProviderInfo(): LLMProvider {
    return {
      id: 'custom',
      name: 'Custom Endpoints',
      type: 'api',
      models: this.availableModels
    };
  }

  removeModel(modelId: string): void {
    this.availableModels = this.availableModels.filter(m => m.id !== modelId);
    this.customEndpoints.delete(modelId);
  }

  listEndpoints(): CustomEndpoint[] {
    return Array.from(this.customEndpoints.values());
  }
}