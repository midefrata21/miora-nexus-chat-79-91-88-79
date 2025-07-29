
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import { navigationGroups, getSystemStatistics } from '@/components/AppSidebar/navigationData';

export const CategoryMenuStatusMonitor: React.FC = () => {
  const [systemStats, setSystemStats] = useState(getSystemStatistics());
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(getSystemStatistics());
      setLastUpdate(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const healthPercentage = (systemStats.healthStats.excellent / systemStats.total) * 100;

  return (
    <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
      <CardHeader>
        <CardTitle className="flex items-center text-slate-100">
          <Activity className="w-6 h-6 mr-2" />
          Category Menu Status Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{systemStats.active}</div>
            <div className="text-sm text-gray-400">Active Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{systemStats.comingSoon}</div>
            <div className="text-sm text-gray-400">Coming Soon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{systemStats.categories}</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{systemStats.total}</div>
            <div className="text-sm text-gray-400">Total Items</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">System Health</span>
            <Badge className={`${
              systemStats.overallHealth === 'excellent' ? 'bg-green-600' :
              systemStats.overallHealth === 'good' ? 'bg-blue-600' :
              systemStats.overallHealth === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
            } text-white`}>
              {systemStats.overallHealth.toUpperCase()}
            </Badge>
          </div>
          <Progress value={healthPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {navigationGroups.map((group, index) => (
            <div key={group.title} className="text-center p-2 bg-slate-800/30 rounded">
              <div className="text-xs font-medium text-gray-300 mb-1">{group.title}</div>
              <div className="flex justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {group.items.filter(item => ['active', 'critical'].includes(item.status)).length}/{group.items.length}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-400">
          Last Updated: {new Date(lastUpdate).toLocaleString('id-ID')}
        </div>
      </CardContent>
    </Card>
  );
};
