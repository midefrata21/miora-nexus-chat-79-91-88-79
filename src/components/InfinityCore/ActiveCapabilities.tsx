
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActiveCapabilitiesProps {
  isBoostActive: boolean;
  capabilities: string[];
}

const ActiveCapabilities: React.FC<ActiveCapabilitiesProps> = ({
  isBoostActive,
  capabilities
}) => {
  if (!isBoostActive || capabilities.length === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30 mb-8">
      <CardHeader>
        <CardTitle className="text-indigo-300">🚀 Active Infinity Capabilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {capabilities.map((capability, index) => (
            <div key={index} className="p-3 bg-black/20 rounded-lg border border-indigo-500/20">
              <div className="text-sm text-indigo-200">✨ {capability}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCapabilities;
