export interface LLMModel {
  id: string;
  name: string;
  provider: 'huggingface' | 'openai' | 'anthropic' | 'custom' | 'local';
  type: 'text-generation' | 'chat' | 'embedding' | 'classification';
  modelPath?: string;
  apiUrl?: string;
  size?: string;
  capabilities: string[];
  status: 'available' | 'downloading' | 'loaded' | 'error';
  progress?: number;
  localPath?: string;
  config?: {
    temperature?: number;
    maxTokens?: number;
    contextLength?: number;
  };
}

export interface LLMProvider {
  id: string;
  name: string;
  type: 'local' | 'api';
  apiKey?: string;
  baseUrl?: string;
  models: LLMModel[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface LLMResponse {
  text: string;
  tokenCount?: number;
  finishReason?: string;
  model: string;
  provider: string;
}

export interface LLMRequest {
  messages: ChatMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}