
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, AlertTriangle } from 'lucide-react';

interface MIORAControlPanelProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onEmergencyStop: () => void;
}

export const MIORAControlPanel: React.FC<MIORAControlPanelProps> = ({
  isRunning,
  onStart,
  onStop,
  onEmergencyStop
}) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white">Control Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          {!isRunning ? (
            <Button
              onClick={onStart}
              className="bg-green-600 hover:bg-green-500 flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Start MIORA</span>
            </Button>
          ) : (
            <Button
              onClick={onStop}
              className="bg-blue-600 hover:bg-blue-500 flex items-center space-x-2"
            >
              <Square className="h-4 w-4" />
              <span>Stop MIORA</span>
            </Button>
          )}
          
          <Button
            onClick={onEmergencyStop}
            variant="destructive"
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Emergency Stop</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
