import { pipeline } from '@huggingface/transformers';
import { LLMModel, LLMProvider, LLMRequest, LLMResponse } from '../../types';

export class HuggingFaceLLMProvider {
  private loadedPipelines: Map<string, any> = new Map();
  private availableModels: LLMModel[] = [
    {
      id: 'microsoft/DialoGPT-medium',
      name: 'DialoGPT Medium',
      provider: 'huggingface',
      type: 'chat',
      modelPath: 'microsoft/DialoGPT-medium',
      size: '350MB',
      capabilities: ['conversation', 'text-generation'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 100,
        contextLength: 1024
      }
    },
    {
      id: 'Xenova/LaMini-Flan-T5-783M',
      name: 'LaMini Flan T5 783M',
      provider: 'huggingface',
      type: 'text-generation',
      modelPath: 'Xenova/LaMini-Flan-T5-783M',
      size: '300MB',
      capabilities: ['text-generation', 'question-answering'],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 200,
        contextLength: 512
      }
    },
    {
      id: 'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
      name: 'DistilBERT Sentiment',
      provider: 'huggingface',
      type: 'classification',
      modelPath: 'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
      size: '65MB',
      capabilities: ['sentiment-analysis', 'classification'],
      status: 'available',
      config: {
        contextLength: 512
      }
    },
    {
      id: 'Xenova/all-MiniLM-L6-v2',
      name: 'All MiniLM L6 v2',
      provider: 'huggingface',
      type: 'embedding',
      modelPath: 'Xenova/all-MiniLM-L6-v2',
      size: '23MB',
      capabilities: ['embeddings', 'similarity'],
      status: 'available',
      config: {
        contextLength: 256
      }
    }
  ];

  async getAvailableModels(): Promise<LLMModel[]> {
    return this.availableModels;
  }

  async loadModel(model: LLMModel): Promise<void> {
    try {
      console.log(`🔄 Loading Hugging Face model: ${model.name}`);
      
      let task: any;
      switch (model.type) {
        case 'chat':
        case 'text-generation':
          task = 'text-generation';
          break;
        case 'classification':
          task = 'text-classification';
          break;
        case 'embedding':
          task = 'feature-extraction';
          break;
        default:
          task = 'text-generation';
      }

      const pipe = await pipeline(task as any, model.modelPath!, {
        device: 'webgpu', // Use WebGPU for better performance
        dtype: 'fp16', // Use half precision for better performance
      });

      this.loadedPipelines.set(model.id, pipe);
      model.status = 'loaded';
      
      console.log(`✅ Hugging Face model loaded: ${model.name}`);
    } catch (error) {
      console.error(`❌ Error loading Hugging Face model ${model.name}:`, error);
      model.status = 'error';
      
      // Fallback to CPU if WebGPU fails
      try {
        console.log(`🔄 Retrying with CPU for model: ${model.name}`);
        let task: any;
        switch (model.type) {
          case 'chat':
          case 'text-generation':
            task = 'text-generation';
            break;
          case 'classification':
            task = 'text-classification';
            break;
          case 'embedding':
            task = 'feature-extraction';
            break;
          default:
            task = 'text-generation';
        }

        const pipe = await pipeline(task as any, model.modelPath!);
        this.loadedPipelines.set(model.id, pipe);
        model.status = 'loaded';
        console.log(`✅ Hugging Face model loaded on CPU: ${model.name}`);
      } catch (cpuError) {
        console.error(`❌ CPU fallback failed for ${model.name}:`, cpuError);
        throw cpuError;
      }
    }
  }

  async generateResponse(request: LLMRequest, model: LLMModel): Promise<LLMResponse> {
    const pipeline = this.loadedPipelines.get(model.id);
    if (!pipeline) {
      throw new Error(`Model ${model.name} not loaded`);
    }

    try {
      const lastMessage = request.messages[request.messages.length - 1];
      let input = lastMessage.content;

      // For chat models, format the conversation
      if (model.type === 'chat') {
        input = request.messages
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n') + '\nassistant:';
      }

      let result: any;
      
      if (model.type === 'embedding') {
        result = await pipeline(input, { pooling: 'mean', normalize: true });
        return {
          text: JSON.stringify(result.data || result),
          model: model.id,
          provider: 'huggingface',
          tokenCount: input.length
        };
      } else if (model.type === 'classification') {
        result = await pipeline(input);
        const classification = Array.isArray(result) ? result[0] : result;
        return {
          text: `Label: ${classification.label}, Score: ${classification.score.toFixed(3)}`,
          model: model.id,
          provider: 'huggingface',
          tokenCount: input.length
        };
      } else {
        // Text generation
        result = await pipeline(input, {
          max_new_tokens: request.maxTokens || model.config?.maxTokens || 50,
          temperature: request.temperature || model.config?.temperature || 0.7,
          do_sample: true,
          return_full_text: false
        });

        let generatedText = '';
        if (Array.isArray(result)) {
          generatedText = result[0]?.generated_text || result[0]?.text || '';
        } else {
          generatedText = result.generated_text || result.text || '';
        }

        // Clean up the response
        if (model.type === 'chat') {
          // Remove the input prompt from response
          generatedText = generatedText.replace(input, '').trim();
        }

        return {
          text: generatedText,
          model: model.id,
          provider: 'huggingface',
          tokenCount: generatedText.length
        };
      }
    } catch (error) {
      console.error(`Error generating response with ${model.name}:`, error);
      throw error;
    }
  }

  async downloadModel(model: LLMModel, onProgress?: (progress: number) => void): Promise<void> {
    // For Hugging Face models, they are downloaded automatically when loaded
    // We'll simulate progress for user feedback
    if (onProgress) {
      for (let i = 0; i <= 100; i += 10) {
        onProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    await this.loadModel(model);
  }

  getProviderInfo(): LLMProvider {
    return {
      id: 'huggingface',
      name: 'Hugging Face Transformers',
      type: 'local',
      models: this.availableModels
    };
  }

  async addModel(modelPath: string, name: string, type: 'text-generation' | 'chat' | 'embedding' | 'classification' = 'text-generation'): Promise<LLMModel> {
    const newModel: LLMModel = {
      id: modelPath,
      name: name,
      provider: 'huggingface',
      type: type,
      modelPath: modelPath,
      capabilities: [type],
      status: 'available',
      config: {
        temperature: 0.7,
        maxTokens: 100,
        contextLength: 512
      }
    };

    this.availableModels.push(newModel);
    return newModel;
  }
}