import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, CheckCircle, AlertTriangle } from 'lucide-react';

const DependencyManager: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-violet-900/40 to-purple-900/40 border-violet-500/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-violet-300">
          <GitBranch className="w-6 h-6" />
          Smart Dependency Manager
          <Badge className="bg-violet-600/20 text-violet-300">Auto-Updates</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-violet-300">247</div>
            <div className="text-xs text-gray-400">Dependencies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">234</div>
            <div className="text-xs text-gray-400">Up to Date</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-300">8</div>
            <div className="text-xs text-gray-400">Updates Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-300">5</div>
            <div className="text-xs text-gray-400">Security Issues</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DependencyManager;