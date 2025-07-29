import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Search, AlertTriangle } from 'lucide-react';

export const LogAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const analyzeLogs = () => {
    setIsAnalyzing(true);
    const mockLogs = [
      '[INFO] User login successful - admin@localhost',
      '[WARN] Multiple failed login attempts detected',
      '[ERROR] SQL injection attempt blocked',
      '[INFO] File access logged - /etc/passwd'
    ];
    setLogs(mockLogs);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center text-yellow-400 mb-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Educational Log Analysis Tool
        </div>
      </div>
      
      <Button onClick={analyzeLogs} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
        <Database className="h-4 w-4 mr-2" />
        {isAnalyzing ? 'ANALYZING...' : 'ANALYZE LOGS'}
      </Button>

      {logs.length > 0 && (
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="p-2 bg-black/40 border border-gray-600 rounded font-mono text-sm text-green-400">
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};