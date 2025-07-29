import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, BarChart3, Activity } from 'lucide-react';

const InteractiveDashboard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-rose-900/40 to-pink-900/40 border-rose-500/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-300">
          <Monitor className="w-6 h-6" />
          Interactive Dashboard
          <Badge className="bg-rose-600/20 text-rose-300">Real-time</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-300">24/7</div>
            <div className="text-xs text-gray-400">Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-300">156</div>
            <div className="text-xs text-gray-400">Widgets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">99.9%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">Real-time</div>
            <div className="text-xs text-gray-400">Updates</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveDashboard;