import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Command, 
  Mic, 
  Brain, 
  Zap, 
  Settings, 
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  description: string;
  enabled: boolean;
  confidence: number;
  category: 'system' | 'conversation' | 'control' | 'learning';
  lastUsed: number;
  usage: number;
}

interface CommandProcessorProps {
  onCommandExecuted: (command: VoiceCommand, result: any) => void;
  onSystemAction?: (action: string, params?: any) => void;
  isActive: boolean;
}

const VoiceCommandProcessor: React.FC<CommandProcessorProps> = ({
  onCommandExecuted,
  onSystemAction,
  isActive
}) => {
  const { toast } = useToast();
  
  const [commands, setCommands] = useState<VoiceCommand[]>([
    // System Commands
    {
      id: 'cmd_activate',
      phrase: 'MIORA aktifkan sistem',
      action: 'system_activate',
      description: 'Mengaktifkan semua sistem MIORA',
      enabled: true,
      confidence: 0.9,
      category: 'system',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_deactivate',
      phrase: 'MIORA nonaktifkan sistem',
      action: 'system_deactivate',
      description: 'Menonaktifkan sistem dengan aman',
      enabled: true,
      confidence: 0.9,
      category: 'system',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_status',
      phrase: 'MIORA laporan status',
      action: 'system_status',
      description: 'Memberikan laporan status sistem lengkap',
      enabled: true,
      confidence: 0.85,
      category: 'system',
      lastUsed: 0,
      usage: 0
    },

    // Conversation Commands
    {
      id: 'cmd_start_conversation',
      phrase: 'MIORA mulai percakapan',
      action: 'conversation_start',
      description: 'Memulai mode percakapan interaktif',
      enabled: true,
      confidence: 0.88,
      category: 'conversation',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_change_topic',
      phrase: 'MIORA ganti topik',
      action: 'conversation_change_topic',
      description: 'Mengganti topik percakapan',
      enabled: true,
      confidence: 0.8,
      category: 'conversation',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_summarize',
      phrase: 'MIORA ringkas percakapan',
      action: 'conversation_summarize',
      description: 'Meringkas percakapan yang telah berlangsung',
      enabled: true,
      confidence: 0.85,
      category: 'conversation',
      lastUsed: 0,
      usage: 0
    },

    // Control Commands
    {
      id: 'cmd_pause_listening',
      phrase: 'MIORA berhenti mendengar',
      action: 'control_pause_listening',
      description: 'Menjeda input suara sementara',
      enabled: true,
      confidence: 0.9,
      category: 'control',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_resume_listening',
      phrase: 'MIORA mulai mendengar',
      action: 'control_resume_listening',
      description: 'Melanjutkan input suara',
      enabled: true,
      confidence: 0.9,
      category: 'control',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_increase_volume',
      phrase: 'MIORA naikkan volume',
      action: 'control_volume_up',
      description: 'Menaikkan volume output suara',
      enabled: true,
      confidence: 0.85,
      category: 'control',
      lastUsed: 0,
      usage: 0
    },

    // Learning Commands
    {
      id: 'cmd_learn_mode',
      phrase: 'MIORA mode pembelajaran',
      action: 'learning_activate',
      description: 'Mengaktifkan mode pembelajaran otomatis',
      enabled: true,
      confidence: 0.85,
      category: 'learning',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_save_context',
      phrase: 'MIORA simpan konteks',
      action: 'learning_save_context',
      description: 'Menyimpan konteks percakapan untuk pembelajaran',
      enabled: true,
      confidence: 0.8,
      category: 'learning',
      lastUsed: 0,
      usage: 0
    },
    {
      id: 'cmd_adaptive_response',
      phrase: 'MIORA adaptif mode',
      action: 'learning_adaptive_mode',
      description: 'Mengaktifkan mode respons adaptif',
      enabled: true,
      confidence: 0.82,
      category: 'learning',
      lastUsed: 0,
      usage: 0
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessedCommand, setLastProcessedCommand] = useState<VoiceCommand | null>(null);
  const [commandStats, setCommandStats] = useState({
    totalProcessed: 0,
    successRate: 95,
    averageConfidence: 0.85,
    mostUsedCategory: 'conversation'
  });

  // Process voice input for command detection
  const processVoiceInput = useCallback(async (transcript: string, confidence: number) => {
    if (!isActive) return null;

    setIsProcessing(true);

    try {
      // Find matching command
      const matchedCommand = findBestMatch(transcript, confidence);
      
      if (matchedCommand) {
        await executeCommand(matchedCommand);
        updateCommandUsage(matchedCommand);
        setLastProcessedCommand(matchedCommand);
        
        toast({
          title: "🎯 Voice Command Detected",
          description: `Executing: ${matchedCommand.description}`,
          duration: 3000,
        });

        return matchedCommand;
      }

      return null;
    } catch (error) {
      console.error('Command processing error:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [isActive, commands, toast]);

  const findBestMatch = (transcript: string, confidence: number): VoiceCommand | null => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    let bestMatch: VoiceCommand | null = null;
    let bestScore = 0;

    for (const command of commands) {
      if (!command.enabled) continue;

      const normalizedPhrase = command.phrase.toLowerCase();
      const similarityScore = calculateSimilarity(normalizedTranscript, normalizedPhrase);
      
      // Consider both similarity and required confidence
      const totalScore = similarityScore * confidence;
      
      if (totalScore > command.confidence && totalScore > bestScore) {
        bestScore = totalScore;
        bestMatch = command;
      }
    }

    return bestMatch;
  };

  const calculateSimilarity = (text1: string, text2: string): number => {
    // Simple similarity calculation based on common words and phrase matching
    const words1 = text1.split(' ');
    const words2 = text2.split(' ');
    
    // Exact phrase match gets highest score
    if (text1.includes(text2) || text2.includes(text1)) {
      return 0.95;
    }

    // Calculate word overlap
    const commonWords = words1.filter(word => words2.includes(word));
    const similarity = (commonWords.length * 2) / (words1.length + words2.length);
    
    return similarity;
  };

  const executeCommand = async (command: VoiceCommand) => {
    try {
      let result;

      switch (command.action) {
        case 'system_activate':
          result = await executeSystemActivate();
          break;
        case 'system_deactivate':
          result = await executeSystemDeactivate();
          break;
        case 'system_status':
          result = await executeSystemStatus();
          break;
        case 'conversation_start':
          result = await executeConversationStart();
          break;
        case 'conversation_change_topic':
          result = await executeChangeopic();
          break;
        case 'conversation_summarize':
          result = await executeSummarize();
          break;
        case 'control_pause_listening':
          result = await executePauseListening();
          break;
        case 'control_resume_listening':
          result = await executeResumeListening();
          break;
        case 'control_volume_up':
          result = await executeVolumeUp();
          break;
        case 'learning_activate':
          result = await executeLearningMode();
          break;
        case 'learning_save_context':
          result = await executeSaveContext();
          break;
        case 'learning_adaptive_mode':
          result = await executeAdaptiveMode();
          break;
        default:
          result = { success: false, message: 'Unknown command' };
      }

      onCommandExecuted(command, result);
      return result;
    } catch (error) {
      console.error('Command execution error:', error);
      return { success: false, error };
    }
  };

  // Command execution functions
  const executeSystemActivate = async () => {
    onSystemAction?.('activate_all_systems');
    return { 
      success: true, 
      message: 'Sistem MIORA telah diaktifkan secara menyeluruh',
      actions: ['voice_engine_on', 'llm_ready', 'learning_active'] 
    };
  };

  const executeSystemDeactivate = async () => {
    onSystemAction?.('deactivate_systems');
    return { 
      success: true, 
      message: 'Sistem MIORA dinonaktifkan dengan aman',
      actions: ['safe_shutdown'] 
    };
  };

  const executeSystemStatus = async () => {
    return { 
      success: true, 
      message: 'Sistem berjalan optimal. Voice engine: aktif, LLM: ready, Learning: active',
      status: {
        voice: 'active',
        llm: 'ready',
        learning: 'active',
        memory: '85%'
      }
    };
  };

  const executeConversationStart = async () => {
    onSystemAction?.('start_interactive_conversation');
    return { 
      success: true, 
      message: 'Mode percakapan interaktif telah dimulai' 
    };
  };

  const executeChangeopic = async () => {
    onSystemAction?.('change_conversation_topic');
    return { 
      success: true, 
      message: 'Siap untuk topik percakapan baru' 
    };
  };

  const executeSummarize = async () => {
    onSystemAction?.('summarize_conversation');
    return { 
      success: true, 
      message: 'Ringkasan percakapan sedang disiapkan' 
    };
  };

  const executePauseListening = async () => {
    onSystemAction?.('pause_voice_input');
    return { 
      success: true, 
      message: 'Input suara dijeda' 
    };
  };

  const executeResumeListening = async () => {
    onSystemAction?.('resume_voice_input');
    return { 
      success: true, 
      message: 'Input suara dilanjutkan' 
    };
  };

  const executeVolumeUp = async () => {
    onSystemAction?.('increase_volume');
    return { 
      success: true, 
      message: 'Volume output dinaikkan' 
    };
  };

  const executeLearningMode = async () => {
    onSystemAction?.('activate_learning_mode');
    return { 
      success: true, 
      message: 'Mode pembelajaran otomatis diaktifkan' 
    };
  };

  const executeSaveContext = async () => {
    onSystemAction?.('save_conversation_context');
    return { 
      success: true, 
      message: 'Konteks percakapan disimpan untuk pembelajaran' 
    };
  };

  const executeAdaptiveMode = async () => {
    onSystemAction?.('activate_adaptive_responses');
    return { 
      success: true, 
      message: 'Mode respons adaptif diaktifkan' 
    };
  };

  const updateCommandUsage = (command: VoiceCommand) => {
    setCommands(prev => prev.map(cmd => 
      cmd.id === command.id 
        ? { ...cmd, usage: cmd.usage + 1, lastUsed: Date.now() }
        : cmd
    ));

    setCommandStats(prev => ({
      ...prev,
      totalProcessed: prev.totalProcessed + 1
    }));
  };

  const toggleCommand = (commandId: string) => {
    setCommands(prev => prev.map(cmd => 
      cmd.id === commandId 
        ? { ...cmd, enabled: !cmd.enabled }
        : cmd
    ));
  };

  const getCategoryCommands = (category: string) => {
    return commands.filter(cmd => cmd.category === category);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'system': return 'border-red-500/30 bg-red-900/20';
      case 'conversation': return 'border-blue-500/30 bg-blue-900/20';
      case 'control': return 'border-green-500/30 bg-green-900/20';
      case 'learning': return 'border-purple-500/30 bg-purple-900/20';
      default: return 'border-gray-500/30 bg-gray-900/20';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-orange-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-6 h-6" />
            Voice Command Processor
            <Badge variant="outline" className="border-orange-400 text-orange-300">
              {commands.filter(c => c.enabled).length} Active
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-sm">{isActive ? 'Listening' : 'Inactive'}</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Command Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-orange-400 font-bold text-lg">{commandStats.totalProcessed}</div>
            <div className="text-xs text-gray-400">Commands Processed</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-green-400 font-bold text-lg">{commandStats.successRate}%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-blue-400 font-bold text-lg">{(commandStats.averageConfidence * 100).toFixed(0)}%</div>
            <div className="text-xs text-gray-400">Avg Confidence</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg text-center">
            <div className="text-purple-400 font-bold text-lg">{commandStats.mostUsedCategory}</div>
            <div className="text-xs text-gray-400">Most Used</div>
          </div>
        </div>

        {/* Last Processed Command */}
        {lastProcessedCommand && (
          <div className="p-4 bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-500/30 rounded-lg">
            <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Last Processed Command
            </h4>
            <div className="text-white">
              <span className="font-medium">"{lastProcessedCommand.phrase}"</span>
              <p className="text-sm text-gray-300 mt-1">{lastProcessedCommand.description}</p>
            </div>
          </div>
        )}

        {/* Command Categories */}
        <div className="space-y-4">
          {['system', 'conversation', 'control', 'learning'].map(category => (
            <div key={category} className={`p-4 rounded-lg border ${getCategoryColor(category)}`}>
              <h4 className="text-white font-semibold mb-3 capitalize flex items-center gap-2">
                <Brain className="w-4 h-4" />
                {category} Commands ({getCategoryCommands(category).length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getCategoryCommands(category).map(command => (
                  <div key={command.id} className="flex items-center justify-between p-2 bg-black/20 rounded">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">
                        "{command.phrase}"
                      </div>
                      <div className="text-xs text-gray-400">
                        Used: {command.usage} times
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleCommand(command.id)}
                      className={`ml-2 ${command.enabled ? 'text-green-400' : 'text-gray-500'}`}
                    >
                      {command.enabled ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-yellow-300">Processing voice command...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceCommandProcessor;