import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, BarChart3, PieChart } from 'lucide-react';

export const EconomicManagement: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Economic Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>GDP Growth</span>
                <span>3.2%</span>
              </div>
              <Progress value={32} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Inflation Rate</span>
                <span>2.5%</span>
              </div>
              <Progress value={25} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Unemployment</span>
                <span>3.8%</span>
              </div>
              <Progress value={38} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            MRC Market Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">$1.25</div>
              <div className="text-sm text-muted-foreground">Current MRC Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+5.2%</div>
              <div className="text-sm text-muted-foreground">24h Change</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};