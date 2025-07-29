
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal, Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface MIORALog {
  id: string;
  timestamp: number;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface MIORALogsProps {
  logs: MIORALog[];
}

export const MIORALogs: React.FC<MIORALogsProps> = ({ logs }) => {
  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="h-4 w-4 text-blue-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Info className="h-4 w-4 text-gray-400" />;
    }
  };

  const getLogBadgeColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Terminal className="h-5 w-5 mr-2" />
          System Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-black/20 rounded-lg">
                {getLogIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{log.message}</span>
                    <Badge className={`${getLogBadgeColor(log.level)} text-white text-xs`}>
                      {log.level.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
