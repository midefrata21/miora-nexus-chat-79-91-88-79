import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp, Activity } from 'lucide-react';

export const CurrencyManagement: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Coins className="h-5 w-5 mr-2" />
            MRC Supply
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,000,000 MRC</div>
          <div className="text-sm text-muted-foreground">Total Supply</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Daily Mining
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,400 MRC</div>
          <div className="text-sm text-muted-foreground">Mined Today</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Market Cap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1.25M</div>
          <div className="text-sm text-muted-foreground">Current Value</div>
        </CardContent>
      </Card>
    </div>
  );
};