import { LLMModel, LLMProvider, LLMRequest, LLMResponse } from '../../types';

export class AnthropicLLMProvider {
  private apiKey: string | null = null;
  private baseUrl: string = 'https://api.anthropic.com/v1';
  private availableModels: LLMModel[] = [
    {
      id: 'claude-opus-4-20250514',
      name: 'Claude Opus 4 (2025-05-14)',
      provider: 'anthropic',
      type: 'chat',
      capabilities: ['chat', 'reasoning', 'analysis', 'vision'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 200000
      }
    },
    {
      id: 'claude-sonnet-4-20250514',
      name: 'Claude Sonnet 4 (2025-05-14)',
      provider: 'anthropic',
      type: 'chat',
      capabilities: ['chat', 'reasoning', 'efficiency', 'vision'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 200000
      }
    },
    {
      id: 'claude-3-5-haiku-20241022',
      name: 'Claude 3.5 Haiku (2024-10-22)',
      provider: 'anthropic',
      type: 'chat',
      capabilities: ['chat', 'fast-responses', 'vision'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        contextLength: 200000
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
      throw new Error('Anthropic API key not set');
    }
    
    model.status = 'loaded';
    console.log(`✅ Anthropic model ready: ${model.name}`);
  }

  async generateResponse(request: LLMRequest, model: LLMModel): Promise<LLMResponse> {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not set');
    }

    try {
      // Convert messages to Anthropic format
      const messages = request.messages.filter(msg => msg.role !== 'system');
      const systemMessage = request.messages.find(msg => msg.role === 'system');

      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model.id,
          max_tokens: request.maxTokens || model.config?.maxTokens || 1000,
          temperature: request.temperature || model.config?.temperature || 0.7,
          system: systemMessage?.content,
          messages: messages.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();

      return {
        text: data.content[0]?.text || '',
        tokenCount: data.usage?.output_tokens,
        finishReason: data.stop_reason,
        model: model.id,
        provider: 'anthropic'
      };
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw error;
    }
  }

  async generateStream(request: LLMRequest, model: LLMModel, onChunk: (chunk: string) => void): Promise<void> {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not set');
    }

    try {
      const messages = request.messages.filter(msg => msg.role !== 'system');
      const systemMessage = request.messages.find(msg => msg.role === 'system');

      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model.id,
          max_tokens: request.maxTokens || model.config?.maxTokens || 1000,
          temperature: request.temperature || model.config?.temperature || 0.7,
          system: systemMessage?.content,
          stream: true,
          messages: messages.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status}`);
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
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta') {
                const content = parsed.delta?.text;
                if (content) {
                  onChunk(content);
                }
              }
            } catch (e) {
              // Ignore parse errors for malformed chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Anthropic streaming error:', error);
      throw error;
    }
  }

  getProviderInfo(): LLMProvider {
    return {
      id: 'anthropic',
      name: 'Anthropic Claude',
      type: 'api',
      models: this.availableModels,
      baseUrl: this.baseUrl
    };
  }
}