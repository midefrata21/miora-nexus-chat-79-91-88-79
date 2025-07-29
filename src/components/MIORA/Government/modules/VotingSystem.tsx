import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Users, CheckCircle } from 'lucide-react';

export const VotingSystem: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Vote className="h-5 w-5 mr-2" />
            Active Votes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Universal Basic Income</h4>
              <div className="text-sm text-muted-foreground">Ends in 3 days</div>
              <div className="flex justify-between mt-2">
                <span className="text-green-600">For: 80</span>
                <span className="text-red-600">Against: 90</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Voting Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Active Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">Voter Participation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};