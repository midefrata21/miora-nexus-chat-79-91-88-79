
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2, Clock, MessageCircle } from 'lucide-react';

interface VoiceSession {
  id: string;
  timestamp: number;
  duration: number;
  conversationCount: number;
  emotionsDetected: string[];
  personality: string;
  audioSaved: boolean;
}

interface VoiceSessionLoggerProps {
  sessions: VoiceSession[];
  onExportSession?: (sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
  onClearAll?: () => void;
}

const VoiceSessionLogger: React.FC<VoiceSessionLoggerProps> = ({
  sessions,
  onExportSession,
  onDeleteSession,
  onClearAll
}) => {
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString('id-ID');
  };

  return (
    <Card className="bg-gray-800/50 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Voice Session Logs ({sessions.length})
          </div>
          {sessions.length > 0 && (
            <Button
              onClick={onClearAll}
              size="sm"
              variant="outline"
              className="text-red-400 border-red-400 hover:bg-red-400/20"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No voice sessions recorded yet</p>
            <p className="text-sm">Start a voice session to see logs here</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.slice().reverse().map((session) => (
              <div
                key={session.id}
                className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-300 border-blue-400">
                      {session.personality}
                    </Badge>
                    {session.audioSaved && (
                      <Badge variant="outline" className="text-green-300 border-green-400">
                        Audio Saved
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => onExportSession?.(session.id)}
                      size="sm"
                      variant="outline"
                      className="p-1 h-7 w-7"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => onDeleteSession?.(session.id)}
                      size="sm"
                      variant="outline"
                      className="p-1 h-7 w-7 text-red-400 border-red-400 hover:bg-red-400/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{formatDuration(session.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{session.conversationCount} turns</span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-400">
                    {formatTimestamp(session.timestamp)}
                  </div>
                </div>

                {session.emotionsDetected.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {session.emotionsDetected.map((emotion, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-purple-600/20 text-purple-300"
                      >
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceSessionLogger;
