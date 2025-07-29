
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';

interface ErrorLog {
  id: string;
  timestamp: number;
  level: 'info' | 'warning' | 'error' | 'critical';
  module: string;
  message: string;
  stackTrace?: string;
  isResolved: boolean;
  autoRepaired: boolean;
}

interface ErrorLogViewerProps {
  errorLogs: ErrorLog[];
  onClearLogs: () => void;
}

export const ErrorLogViewer: React.FC<ErrorLogViewerProps> = ({ errorLogs, onClearLogs }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-primary';
      case 'warning': return 'bg-miora-warning';
      case 'error': return 'bg-miora-error';
      case 'critical': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="bg-card/50 border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center justify-between">
          <span className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Error Logs ({errorLogs.length})
          </span>
          <Button
            onClick={onClearLogs}
            variant="outline"
            size="sm"
            className="border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {errorLogs.slice(0, 10).map((log) => (
            <div key={log.id} className="p-3 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getLevelColor(log.level)} text-white text-xs`}>
                    {log.level.toUpperCase()}
                  </Badge>
                  <span className="text-muted-foreground text-sm">{log.module}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {log.isResolved && (
                    <CheckCircle className="h-4 w-4 text-miora-success" />
                  )}
                  {log.autoRepaired && (
                    <Badge className="bg-miora-success text-white text-xs">AUTO-FIXED</Badge>
                  )}
                </div>
              </div>
              <p className="text-foreground text-sm mb-1">{log.message}</p>
              <p className="text-muted-foreground text-xs">
                {new Date(log.timestamp).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
          {errorLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50 text-miora-success" />
              <p>No errors detected</p>
              <p className="text-sm">System is running smoothly</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
