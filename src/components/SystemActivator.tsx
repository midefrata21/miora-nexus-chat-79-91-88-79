import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSystemsActivator } from '@/hooks/useSystemsActivator';
import { Power, Activity, Shield, Zap } from 'lucide-react';

export const SystemActivator: React.FC = () => {
  const { activateAllSystems, getSystemsStatus } = useSystemsActivator();
  const status = getSystemsStatus();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Power className="h-6 w-6 text-primary" />
          MIORA Systems Activator
        </CardTitle>
        <CardDescription>
          Activate all MIORA systems for full autonomous operation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Systems Status</span>
            <span className="text-sm text-muted-foreground">
              {status.active}/{status.total} Active
            </span>
          </div>
          
          <Progress value={status.percentage} className="w-full" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Activity className="h-8 w-8 mx-auto text-green-500" />
              <div className="text-2xl font-bold">{status.active}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            
            <div className="space-y-2">
              <Shield className="h-8 w-8 mx-auto text-blue-500" />
              <div className="text-2xl font-bold">{status.percentage}%</div>
              <div className="text-xs text-muted-foreground">Coverage</div>
            </div>
            
            <div className="space-y-2">
              <Zap className="h-8 w-8 mx-auto text-yellow-500" />
              <div className="text-2xl font-bold">{status.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>

        <Button 
          onClick={activateAllSystems}
          className="w-full"
          size="lg"
          disabled={status.percentage === 100}
        >
          <Power className="mr-2 h-4 w-4" />
          {status.percentage === 100 ? 'All Systems Active' : 'Activate All Systems'}
        </Button>
        
        {status.percentage === 100 && (
          <div className="text-center text-sm text-green-600 font-medium">
            🚀 MIORA is now fully operational and autonomous
          </div>
        )}
      </CardContent>
    </Card>
  );
};