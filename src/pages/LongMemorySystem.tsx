import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Database, Clock, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LongMemorySystem = () => {
  const [memoryStats, setMemoryStats] = useState({
    totalEntries: 15420,
    storageUsed: 87.5,
    retentionRate: 94.2,
    queryPerformance: 0.023
  });

  const [autoOptimizationEnabled, setAutoOptimizationEnabled] = useState(true);

  useEffect(() => {
    if (autoOptimizationEnabled) {
      const interval = setInterval(() => {
        setMemoryStats(prev => ({
          ...prev,
          retentionRate: Math.min(100, prev.retentionRate + Math.random() * 0.5)
        }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoOptimizationEnabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🧠 Long Memory System
          </h1>
          <p className="text-gray-300 text-lg">Advanced persistent memory management with automatic optimization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Database className="h-5 w-5" />Total Entries</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{memoryStats.totalEntries.toLocaleString()}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Clock className="h-5 w-5" />Storage Usage</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{memoryStats.storageUsed}%</div><Progress value={memoryStats.storageUsed} className="mt-2" /></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Brain className="h-5 w-5" />Retention Rate</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{memoryStats.retentionRate.toFixed(1)}%</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Zap className="h-5 w-5" />Query Speed</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{memoryStats.queryPerformance.toFixed(3)}s</div></CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400">Memory Management Control</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto-Optimization</h3>
                <p className="text-gray-400 text-sm">Continuous memory management</p>
              </div>
              <Button
                variant={autoOptimizationEnabled ? "default" : "outline"}
                onClick={() => {
                  setAutoOptimizationEnabled(!autoOptimizationEnabled);
                  toast({ title: autoOptimizationEnabled ? "Auto-optimization disabled" : "Auto-optimization enabled" });
                }}
              >
                {autoOptimizationEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LongMemorySystem;