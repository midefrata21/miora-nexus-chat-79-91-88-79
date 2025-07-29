
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Download, 
  Mail, 
  Save, 
  Trash2, 
  MessageCircle,
  Clock,
  TrendingUp,
  Volume2
} from 'lucide-react';

interface VoiceInteraction {
  id: string;
  timestamp: number;
  userInput: string;
  mioraResponse: string;
  responseTime: number;
  confidence: number;
  savedToMemory: boolean;
  audioLevel: number;
}

interface VoiceInteractionLoggerProps {
  interactions: VoiceInteraction[];
  onExportLog?: () => void;
  onEmailLog?: () => void;
  onSaveToMemory?: (interaction: VoiceInteraction) => void;
  onClearLog?: () => void;
}

const VoiceInteractionLogger: React.FC<VoiceInteractionLoggerProps> = ({
  interactions,
  onExportLog,
  onEmailLog,
  onSaveToMemory,
  onClearLog
}) => {
  const [selectedInteraction, setSelectedInteraction] = useState<string | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAudioLevelColor = (level: number) => {
    if (level >= 0.7) return 'bg-green-500';
    if (level >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const averageConfidence = interactions.length > 0 
    ? interactions.reduce((sum, int) => sum + int.confidence, 0) / interactions.length 
    : 0;

  const averageResponseTime = interactions.length > 0
    ? interactions.reduce((sum, int) => sum + int.responseTime, 0) / interactions.length
    : 0;

  const savedCount = interactions.filter(int => int.savedToMemory).length;

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 border-slate-600/50">
      <CardHeader>
        <CardTitle className="text-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Voice Interaction Logger
          </div>
          <Badge variant="outline" className="border-purple-400 text-purple-300">
            {interactions.length} Interactions
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-700/30 rounded-lg text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-400" />
            <p className="text-xs text-slate-400">Avg Confidence</p>
            <p className={`text-sm font-semibold ${getConfidenceColor(averageConfidence)}`}>
              {averageConfidence.toFixed(1)}%
            </p>
          </div>
          
          <div className="p-3 bg-slate-700/30 rounded-lg text-center">
            <Clock className="w-5 h-5 mx-auto mb-2 text-blue-400" />
            <p className="text-xs text-slate-400">Avg Response</p>
            <p className="text-sm font-semibold text-blue-300">
              {formatDuration(averageResponseTime)}
            </p>
          </div>
          
          <div className="p-3 bg-slate-700/30 rounded-lg text-center">
            <Save className="w-5 h-5 mx-auto mb-2 text-purple-400" />
            <p className="text-xs text-slate-400">Saved to Memory</p>
            <p className="text-sm font-semibold text-purple-300">
              {savedCount}/{interactions.length}
            </p>
          </div>
          
          <div className="p-3 bg-slate-700/30 rounded-lg text-center">
            <Volume2 className="w-5 h-5 mx-auto mb-2 text-orange-400" />
            <p className="text-xs text-slate-400">Total Sessions</p>
            <p className="text-sm font-semibold text-orange-300">
              {Math.ceil(interactions.length / 5)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onExportLog}
            size="sm"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
          
          <Button
            onClick={onEmailLog}
            size="sm"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Report
          </Button>
          
          {onClearLog && (
            <Button
              onClick={onClearLog}
              size="sm"
              variant="outline"
              className="border-red-600 text-red-300 hover:bg-red-700/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Log
            </Button>
          )}
        </div>

        {/* Interaction List */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-200 mb-3">Recent Interactions</h3>
          
          {interactions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No voice interactions recorded yet</p>
              <p className="text-sm">Start a conversation to see logs here</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {interactions.slice().reverse().map((interaction) => (
                  <div
                    key={interaction.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedInteraction === interaction.id
                        ? 'border-purple-400 bg-purple-500/10'
                        : 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50'
                    }`}
                    onClick={() => setSelectedInteraction(
                      selectedInteraction === interaction.id ? null : interaction.id
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-slate-500 text-slate-300">
                          {formatTime(interaction.timestamp)}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getConfidenceColor(interaction.confidence)} border-current`}
                        >
                          {interaction.confidence.toFixed(0)}%
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div 
                            className={`w-2 h-2 rounded-full ${getAudioLevelColor(interaction.audioLevel)}`}
                          ></div>
                          <span className="text-xs text-slate-400">
                            {formatDuration(interaction.responseTime)}
                          </span>
                        </div>
                      </div>
                      
                      {!interaction.savedToMemory && onSaveToMemory && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSaveToMemory(interaction);
                          }}
                          size="sm"
                          variant="ghost"
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="p-2 bg-blue-500/10 border border-blue-400/30 rounded">
                        <p className="text-xs text-blue-300 font-medium mb-1">User Input:</p>
                        <p className="text-slate-200 text-sm">{interaction.userInput}</p>
                      </div>
                      
                      {selectedInteraction === interaction.id && (
                        <div className="p-2 bg-purple-500/10 border border-purple-400/30 rounded">
                          <p className="text-xs text-purple-300 font-medium mb-1">MIORA Response:</p>
                          <p className="text-slate-200 text-sm">{interaction.mioraResponse}</p>
                        </div>
                      )}
                    </div>
                    
                    {interaction.savedToMemory && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs border-green-400 text-green-300">
                          Saved to Memory
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Summary */}
        {interactions.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/30 rounded-lg">
            <h4 className="text-purple-300 font-medium mb-2">Session Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Total Interactions: <span className="text-white font-medium">{interactions.length}</span></p>
                <p className="text-slate-400">Average Quality: <span className={`font-medium ${getConfidenceColor(averageConfidence)}`}>{averageConfidence.toFixed(1)}%</span></p>
              </div>
              <div>
                <p className="text-slate-400">Memory Saved: <span className="text-green-300 font-medium">{savedCount}</span></p>
                <p className="text-slate-400">Avg Speed: <span className="text-blue-300 font-medium">{formatDuration(averageResponseTime)}</span></p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceInteractionLogger;
