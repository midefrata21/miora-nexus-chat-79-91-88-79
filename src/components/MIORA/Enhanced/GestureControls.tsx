import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

const GestureControls: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-lime-900/40 to-green-900/40 border-lime-500/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lime-300">
          <Activity className="w-6 h-6" />
          Gesture Controls
          <Badge className="bg-lime-600/20 text-lime-300">Touch & Gesture</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-lime-300">
          ✋ Gesture recognition active
        </div>
      </CardContent>
    </Card>
  );
};

export default GestureControls;