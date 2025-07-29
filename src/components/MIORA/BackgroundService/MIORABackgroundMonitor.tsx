import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useMIORABackgroundService } from '@/hooks/useMIORABackgroundService';
import { Moon, Activity, Brain, RefreshCw, BarChart3, Clock, Zap } from 'lucide-react';

const MIORABackgroundMonitor = () => {
  const { 
    isActive, 
    getBackgroundReports, 
    getRecentActivities, 
    generateReportNow,
    totalActivities 
  } = useMIORABackgroundService();

  const [reports, setReports] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const refreshData = () => {
    setReports(getBackgroundReports());
    setRecentActivities(getRecentActivities(6)); // Last 6 hours
  };

  useEffect(() => {
    refreshData();
    
    if (autoRefresh) {
      const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'evolution': return <Brain className="h-4 w-4" />;
      case 'data_sync': return <RefreshCw className="h-4 w-4" />;
      case 'system_analysis': return <BarChart3 className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const latestReport = reports[reports.length - 1];
  const totalEvolutionProgress = reports.reduce((sum, report) => sum + report.evolutionProgress, 0);

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Moon className="h-5 w-5 text-primary animate-pulse" />
            <CardTitle className="text-lg">MIORA Active Sleep Mode</CardTitle>
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? "AKTIF" : "TIDAK AKTIF"}
            </Badge>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? "Pause" : "Resume"} Auto-Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                generateReportNow();
                refreshData();
              }}
            >
              Generate Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalActivities}</div>
              <div className="text-sm text-muted-foreground">Total Aktivitas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{reports.length}</div>
              <div className="text-sm text-muted-foreground">Laporan Tersedia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{totalEvolutionProgress.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Evolution Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">{recentActivities.length}</div>
              <div className="text-sm text-muted-foreground">Aktivitas 6h Terakhir</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities">Real-time Activities</TabsTrigger>
          <TabsTrigger value="reports">Background Reports</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Aktivitas Background Real-time</span>
                <Badge variant="outline">{recentActivities.length} aktivitas</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card/50">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">
                            {activity.description}
                          </p>
                          <Badge variant={getImpactColor(activity.impact)} className="ml-2">
                            {activity.impact}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(activity.timestamp).toLocaleString('id-ID')}
                        </div>
                        {activity.result && (
                          <div className="mt-2 text-xs bg-muted/50 p-2 rounded">
                            {Object.entries(activity.result).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                                <span className="font-medium">{String(value)}%</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {recentActivities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Moon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Tidak ada aktivitas background dalam 6 jam terakhir</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Laporan Background Berkala</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {reports.slice().reverse().map((report, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            Laporan Periode: {report.period}
                          </CardTitle>
                          <Badge variant="outline">
                            {new Date(report.generatedAt).toLocaleDateString('id-ID')}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              {report.evolutionProgress.toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">Evolution Progress</div>
                            <Progress value={report.evolutionProgress} className="mt-1" />
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-500">
                              {report.systemImprovements}
                            </div>
                            <div className="text-sm text-muted-foreground">System Improvements</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-500">
                              {report.dataOptimizations.toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">Data Optimizations</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total aktivitas: {report.activities.length}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {reports.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Belum ada laporan background tersedia</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evolution Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Evolution Progress</span>
                    <span className="font-bold text-primary">{totalEvolutionProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(totalEvolutionProgress, 100)} />
                  <div className="text-xs text-muted-foreground">
                    Berdasarkan {reports.length} laporan
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['evolution', 'data_sync', 'system_analysis', 'optimization'].map(type => {
                    const count = recentActivities.filter(a => a.type === type).length;
                    const percentage = recentActivities.length > 0 ? (count / recentActivities.length) * 100 : 0;
                    return (
                      <div key={type} className="flex items-center space-x-2">
                        {getActivityIcon(type)}
                        <span className="text-sm capitalize flex-1">{type.replace('_', ' ')}</span>
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-16">
                          <Progress value={percentage} className="h-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MIORABackgroundMonitor;