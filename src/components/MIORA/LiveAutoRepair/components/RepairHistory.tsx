
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface RepairAction {
  id: string;
  timestamp: number;
  type: 'auto' | 'manual';
  target: string;
  action: string;
  success: boolean;
  duration: number;
  rollbackAvailable: boolean;
}

interface RepairHistoryProps {
  repairHistory: RepairAction[];
  onRollback: (snapshotId: string) => void;
}

export const RepairHistory: React.FC<RepairHistoryProps> = ({ repairHistory, onRollback }) => {
  return (
    <Card className="bg-gray-800/50 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center">
          <History className="h-5 w-5 mr-2" />
          Repair History ({repairHistory.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {repairHistory.slice(0, 10).map((repair) => (
            <div key={repair.id} className="p-3 bg-black/20 rounded-lg border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {repair.success ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <Badge className={repair.type === 'auto' ? 'bg-blue-500' : 'bg-purple-500'}>
                    {repair.type.toUpperCase()}
                  </Badge>
                  <span className="text-gray-300 text-sm">{repair.target}</span>
                </div>
                {repair.rollbackAvailable && (
                  <Button
                    onClick={() => onRollback(repair.id)}
                    variant="outline"
                    size="sm"
                    className="border-gray-400/50 text-gray-400"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Rollback
                  </Button>
                )}
              </div>
              <p className="text-white text-sm mb-1">{repair.action}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Duration: {repair.duration}ms</span>
                <span>{new Date(repair.timestamp).toLocaleTimeString('id-ID')}</span>
              </div>
            </div>
          ))}
          {repairHistory.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No repair history available</p>
              <p className="text-sm">System repairs will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
