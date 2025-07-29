import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

const ARVRInterface: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-fuchsia-900/40 to-purple-900/40 border-fuchsia-500/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-fuchsia-300">
          <Eye className="w-6 h-6" />
          AR/VR Development Interface
          <Badge className="bg-fuchsia-600/20 text-fuchsia-300">Immersive</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-fuchsia-300">
          🥽 Immersive development ready
        </div>
      </CardContent>
    </Card>
  );
};

export default ARVRInterface;