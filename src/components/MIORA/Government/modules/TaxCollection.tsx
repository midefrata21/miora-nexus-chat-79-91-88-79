import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, Calculator, TrendingUp } from 'lucide-react';

export const TaxCollection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="h-5 w-5 mr-2" />
            Tax Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Income Tax (15%)</span>
              <span>12,000 MRC</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Tax (0.1%)</span>
              <span>3,200 MRC</span>
            </div>
            <div className="flex justify-between">
              <span>Business Tax (8%)</span>
              <span>8,500 MRC</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Tax Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">23,700 MRC</div>
              <div className="text-sm text-muted-foreground">Total Collected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm text-muted-foreground">Collection Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};