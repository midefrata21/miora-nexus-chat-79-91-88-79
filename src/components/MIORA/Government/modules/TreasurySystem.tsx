import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export const TreasurySystem: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            Treasury Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">500,000 MRC</div>
          <div className="text-sm text-muted-foreground">Government Reserves</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowDownLeft className="h-5 w-5 mr-2" />
            Monthly Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25,000 MRC</div>
          <div className="text-sm text-muted-foreground">From Taxes & Fees</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUpRight className="h-5 w-5 mr-2" />
            Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18,000 MRC</div>
          <div className="text-sm text-muted-foreground">Operations & Salaries</div>
        </CardContent>
      </Card>
    </div>
  );
};