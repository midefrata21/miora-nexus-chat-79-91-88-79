import { LLMModel, LLMProvider, LLMRequest, LLMResponse } from '../../types';

export class OpenAILLMProvider {
  private apiKey: string | null = null;
  private baseUrl: string = 'https://api.openai.com/v1';
  private availableModels: LLMModel[] = [
    {
      id: 'gpt-4.1-2025-04-14',
      name: 'GPT-4.1 (2025-04-14)',
      provider: 'openai',
      type: 'chat',
      capabilities: ['chat', 'text-generation', 'reasoning'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 128000
      }
    },
    {
      id: 'gpt-4.1-mini-2025-04-14',
      name: 'GPT-4.1 Mini (2025-04-14)',
      provider: 'openai',
      type: 'chat',
      capabilities: ['chat', 'text-generation', 'vision'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 128000
      }
    },
    {
      id: 'o3-2025-04-16',
      name: 'O3 (2025-04-16)',
      provider: 'openai',
      type: 'chat',
      capabilities: ['reasoning', 'complex-analysis', 'multi-step-problems'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 200000
      }
    },
    {
      id: 'o4-mini-2025-04-16',
      name: 'O4 Mini (2025-04-16)',
      provider: 'openai',
      type: 'chat',
      capabilities: ['fast-reasoning', 'coding', 'visual-tasks'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 128000
      }
    }
  ];

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAvailableModels(): Promise<LLMModel[]> {
    return this.availableModels;
  }

  async loadModel(model: LLMModel): Promise<void> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not set');
    }
    
    // Test API connection
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API test failed: ${response.status} ${response.statusText}`);
      }

      model.status = 'loaded';
      console.log(`✅ OpenAI model ready: ${model.name}`);
    } catch (error) {
      model.status = 'error';
      console.error(`❌ Error connecting to OpenAI:`, error);
      throw error;
    }
  }

  async generateResponse(request: LLMRequest, model: LLMModel): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not set');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model.id,
          messages: request.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: request.temperature || model.config?.temperature || 0.7,
          max_tokens: request.maxTokens || model.config?.maxTokens || 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const choice = data.choices[0];

      return {
        text: choice.message.content,
        tokenCount: data.usage?.total_tokens,
        finishReason: choice.finish_reason,
        model: model.id,
        provider: 'openai'
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  async generateStream(request: LLMRequest, model: LLMModel, onChunk: (chunk: string) => void): Promise<void> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not set');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model.id,
          messages: request.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: request.temperature || model.config?.temperature || 0.7,
          max_tokens: request.maxTokens || model.config?.maxTokens || 1000,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              // Ignore parse errors for malformed chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('OpenAI streaming error:', error);
      throw error;
    }
  }

  getProviderInfo(): LLMProvider {
    return {
      id: 'openai',
      name: 'OpenAI',
      type: 'api',
      models: this.availableModels,
      baseUrl: this.baseUrl
    };
  }
}