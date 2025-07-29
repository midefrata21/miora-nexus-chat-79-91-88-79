import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle } from 'lucide-react';

interface ControlPanelProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ isActive, onStart, onStop }) => {
  return (
    <Card className="bg-black/40 border-orange-500/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Scalping Engine Control</h3>
            <p className="text-gray-300">
              Sistem sinyal crypto scalping dengan analisis real-time multi-timeframe
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={isActive ? onStop : onStart}
              className={`px-6 py-3 ${
                isActive 
                  ? 'bg-red-600 hover:bg-red-500' 
                  : 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500'
              }`}
            >
              {isActive ? (
                <>
                  <PauseCircle className="h-5 w-5 mr-2" />
                  Stop Scalping
                </>
              ) : (
                <>
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Start Scalping
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};