import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Volume2 } from 'lucide-react';

const VoiceCommands: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-sky-900/40 to-blue-900/40 border-sky-500/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-sky-300">
          <Mic className="w-6 h-6" />
          Voice Commands Interface
          <Badge className="bg-sky-600/20 text-sky-300">Voice-Activated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sky-300">
          🎤 Voice control system active
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCommands;