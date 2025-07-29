
export interface CommandDefinition {
  name: string;
  category: 'system' | 'file' | 'memory' | 'brain' | 'module';
  description: string;
  parameters: string;
  example: string;
}

export const SUPPORTED_COMMANDS: CommandDefinition[] = [
  {
    name: 'PRINT',
    category: 'system',
    description: 'Display message to console and UI',
    parameters: 'message: string',
    example: 'PRINT: Hello MIORA System'
  },
  {
    name: 'UPDATE_MEMORY',
    category: 'memory',
    description: 'Update memory with key-value pair',
    parameters: 'key=value',
    example: 'UPDATE_MEMORY: user_preference=dark_mode'
  },
  {
    name: 'ACTIVATE_MODULE',
    category: 'module',
    description: 'Activate specific MIORA module',
    parameters: 'module_name: string',
    example: 'ACTIVATE_MODULE: quantum_processing'
  },
  {
    name: 'SYSTEM_STATUS',
    category: 'system',
    description: 'Get current system status',
    parameters: 'none',
    example: 'SYSTEM_STATUS'
  },
  {
    name: 'VOICE_SPEAK',
    category: 'brain',
    description: 'Use voice synthesis to speak text',
    parameters: 'text: string',
    example: 'VOICE_SPEAK: MIORA system is operational'
  }
];

export class CommandParser {
  static parseCommand(input: string): { command: string; parameters: string } | null {
    const trimmed = input.trim();
    if (!trimmed) return null;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) {
      return { command: trimmed.toUpperCase(), parameters: '' };
    }

    const command = trimmed.substring(0, colonIndex).trim().toUpperCase();
    const parameters = trimmed.substring(colonIndex + 1).trim();

    return { command, parameters };
  }

  static validateCommand(command: string): boolean {
    return SUPPORTED_COMMANDS.some(cmd => cmd.name === command);
  }

  static getCommandsByCategory(category: CommandDefinition['category']): CommandDefinition[] {
    return SUPPORTED_COMMANDS.filter(cmd => cmd.category === category);
  }

  static validateCommandFile(content: string, fileExtension: string): { isValid: boolean; commands: string[]; errors: string[] } {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    const commands: string[] = [];
    const errors: string[] = [];

    for (const line of lines) {
      const parsed = this.parseCommand(line);
      if (parsed && this.validateCommand(parsed.command)) {
        commands.push(line);
      } else {
        errors.push(`Invalid command: ${line}`);
      }
    }

    return {
      isValid: errors.length === 0,
      commands,
      errors
    };
  }
}
