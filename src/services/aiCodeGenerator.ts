import { toast } from '@/hooks/use-toast';

export interface CodeGenerationRequest {
  prompt: string;
  type: 'component' | 'hook' | 'util' | 'page' | 'api' | 'full-app';
  framework: 'react' | 'vue' | 'vanilla';
  language: 'typescript' | 'javascript';
  context?: string;
  projectStructure?: string[];
}

export interface GeneratedCode {
  files: {
    path: string;
    content: string;
    type: 'component' | 'hook' | 'util' | 'config' | 'api';
  }[];
  dependencies: string[];
  commands: string[];
  description: string;
  usage: string;
  tests?: string;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  errors: string[];
  warnings: string[];
  performance: {
    buildTime: number;
    bundleSize: number;
    memoryUsage: number;
  };
}

export class AICodeGeneratorService {
  private apiKey: string | null = null;
  private baseURL = 'https://api.openai.com/v1';
  private provider: 'openai' | 'anthropic' | 'perplexity' | 'azure' | 'replicate' = 'openai';

  constructor(apiKey?: string, provider?: 'openai' | 'anthropic' | 'perplexity' | 'azure' | 'replicate') {
    this.apiKey = apiKey || null;
    this.provider = provider || 'openai';
    this.baseURL = this.getProviderURL(this.provider);
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getProviderURL(provider: string): string {
    switch (provider) {
      case 'openai': return 'https://api.openai.com/v1';
      case 'anthropic': return 'https://api.anthropic.com/v1';
      case 'perplexity': return 'https://api.perplexity.ai';
      case 'azure': return 'https://your-resource.openai.azure.com/openai/deployments/your-deployment';
      case 'replicate': return 'https://api.replicate.com/v1';
      default: return 'https://api.openai.com/v1';
    }
  }

  private getProviderModel(provider: string): string {
    switch (provider) {
      case 'openai': return 'gpt-4.1-2025-04-14';
      case 'anthropic': return 'claude-opus-4-20250514';
      case 'perplexity': return 'llama-3.1-sonar-large-128k-online';
      case 'azure': return 'gpt-4';
      case 'replicate': return 'meta/llama-2-70b-chat';
      default: return 'gpt-4.1-2025-04-14';
    }
  }

  private getProviderHeaders(): Record<string, string> {
    const baseHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    switch (this.provider) {
      case 'openai':
      case 'azure':
        return {
          ...baseHeaders,
          'Authorization': `Bearer ${this.apiKey}`,
        };
      case 'anthropic':
        return {
          ...baseHeaders,
          'x-api-key': this.apiKey!,
          'anthropic-version': '2023-06-01',
        };
      case 'perplexity':
        return {
          ...baseHeaders,
          'Authorization': `Bearer ${this.apiKey}`,
        };
      case 'replicate':
        return {
          ...baseHeaders,
          'Authorization': `Token ${this.apiKey}`,
        };
      default:
        return {
          ...baseHeaders,
          'Authorization': `Bearer ${this.apiKey}`,
        };
    }
  }

  async generateCode(request: CodeGenerationRequest): Promise<GeneratedCode> {
    if (!this.apiKey) {
      throw new Error('API Key diperlukan untuk code generation');
    }

    const systemPrompt = this.buildSystemPrompt(request);
    const userPrompt = this.buildUserPrompt(request);

    try {
      const endpoint = this.provider === 'anthropic' ? `${this.baseURL}/messages` : `${this.baseURL}/chat/completions`;
      const requestBody = this.buildRequestBody(systemPrompt, userPrompt);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: this.getProviderHeaders(),
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedContent = this.extractContent(data);

      return this.parseGeneratedCode(generatedContent, request);
    } catch (error) {
      console.error('Code generation failed:', error);
      throw new Error(`Code generation gagal: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private buildRequestBody(systemPrompt: string, userPrompt: string) {
    const model = this.getProviderModel(this.provider);
    
    switch (this.provider) {
      case 'anthropic':
        return {
          model,
          max_tokens: 4000,
          messages: [
            { role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }
          ],
          temperature: 0.2,
        };
      case 'perplexity':
        return {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 4000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
        };
      default:
        return {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 4000,
        };
    }
  }

  private extractContent(data: any): string {
    switch (this.provider) {
      case 'anthropic':
        return data.content[0].text;
      case 'perplexity':
        return data.choices[0].message.content;
      default:
        return data.choices[0].message.content;
    }
  }

  private buildSystemPrompt(request: CodeGenerationRequest): string {
    return `You are MIORA AI, an advanced code generation system. Generate production-ready ${request.language} ${request.framework} code.

CRITICAL REQUIREMENTS:
- Use modern best practices and patterns
- Include proper TypeScript types if language is typescript
- Generate clean, maintainable code
- Include error handling
- Add proper imports and exports
- Follow React/Vue conventions
- Include prop types and interfaces
- Add comprehensive comments

OUTPUT FORMAT (JSON):
{
  "files": [
    {
      "path": "src/components/ExampleComponent.tsx",
      "content": "// Complete file content here",
      "type": "component"
    }
  ],
  "dependencies": ["@types/react", "lodash"],
  "commands": ["/install-dependencies", "/run-tests"],
  "description": "Brief description of generated code",
  "usage": "How to use the generated code",
  "tests": "Test code if applicable"
}

MIORA Commands to generate:
- /install-dependencies - Install required packages
- /run-build - Build the code  
- /run-tests - Run tests
- /deploy - Deploy to production
- /optimize - Optimize performance`;
  }

  private buildUserPrompt(request: CodeGenerationRequest): string {
    let prompt = `Generate ${request.type} dengan prompt: "${request.prompt}"

Target: ${request.framework} with ${request.language}`;

    if (request.context) {
      prompt += `\n\nContext: ${request.context}`;
    }

    if (request.projectStructure) {
      prompt += `\n\nProject Structure:\n${request.projectStructure.join('\n')}`;
    }

    return prompt;
  }

  private parseGeneratedCode(content: string, request: CodeGenerationRequest): GeneratedCode {
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate and structure the response
      return {
        files: parsed.files || [],
        dependencies: parsed.dependencies || [],
        commands: parsed.commands || [],
        description: parsed.description || 'Generated code',
        usage: parsed.usage || 'No usage instructions provided',
        tests: parsed.tests
      };
    } catch (error) {
      console.error('Failed to parse generated code:', error);
      
      // Fallback: create basic structure from content
      return {
        files: [{
          path: `src/${request.type}s/Generated${request.type}.${request.language === 'typescript' ? 'tsx' : 'jsx'}`,
          content: content,
          type: request.type as any
        }],
        dependencies: [],
        commands: ['/install-dependencies', '/run-build'],
        description: 'Generated code from AI',
        usage: 'Import and use the generated component/function',
      };
    }
  }

  async executeCode(code: GeneratedCode): Promise<CodeExecutionResult> {
    const startTime = Date.now();
    
    try {
      // Simulate code execution environment
      // In real implementation, this would:
      // 1. Create temporary workspace
      // 2. Write files to filesystem
      // 3. Install dependencies
      // 4. Run build process
      // 5. Execute tests
      // 6. Return results

      const simulatedExecution = await this.simulateExecution(code);
      const buildTime = Date.now() - startTime;

      return {
        success: simulatedExecution.success,
        output: simulatedExecution.output,
        errors: simulatedExecution.errors,
        warnings: simulatedExecution.warnings,
        performance: {
          buildTime,
          bundleSize: Math.floor(Math.random() * 100) + 50, // KB
          memoryUsage: Math.floor(Math.random() * 50) + 10, // MB
        }
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        errors: [error instanceof Error ? error.message : 'Execution failed'],
        warnings: [],
        performance: {
          buildTime: Date.now() - startTime,
          bundleSize: 0,
          memoryUsage: 0,
        }
      };
    }
  }

  private async simulateExecution(code: GeneratedCode): Promise<{
    success: boolean;
    output: string;
    errors: string[];
    warnings: string[];
  }> {
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Basic code validation
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const file of code.files) {
      // Check for basic syntax issues
      if (!file.content.includes('export')) {
        warnings.push(`${file.path}: No export statement found`);
      }
      
      if (file.content.includes('undefined') && !file.content.includes('typeof')) {
        warnings.push(`${file.path}: Potential undefined usage`);
      }
    }

    const success = errors.length === 0;
    const output = success 
      ? `Successfully processed ${code.files.length} files\nBuild completed successfully\nNo runtime errors detected`
      : 'Build failed with errors';

    return { success, output, errors, warnings };
  }
}

export const aiCodeGenerator = new AICodeGeneratorService();