import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart, Activity, TrendingUp } from 'lucide-react';

export const GovernmentStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Government Efficiency</span>
              <span className="font-bold">85%</span>
            </div>
            <div className="flex justify-between">
              <span>Citizen Satisfaction</span>
              <span className="font-bold">78%</span>
            </div>
            <div className="flex justify-between">
              <span>Economic Growth</span>
              <span className="font-bold">+3.2%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <div className="text-sm text-muted-foreground">All Systems Normal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99.8%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};