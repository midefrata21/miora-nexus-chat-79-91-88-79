
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AnalyticsPlaceholder: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center text-green-300">
          <BarChart3 className="w-5 h-5 mr-2" />
          Growth Analytics (Coming Soon)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">Advanced analytics dashboard untuk tracking pertumbuhan MIORA akan segera tersedia.</p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPlaceholder;
