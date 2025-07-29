import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Zap, TrendingUp, Cpu, RefreshCw, Infinity, Gauge, Rocket, Home, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface UpgradeMetrics {
  currentVersion: string;
  upgradeProgress: number;
  performanceGain: number;
  systemEfficiency: number;
  upgradeCount: number;
  nextUpgradeETA: number;
}

const InfinityUpgradeLoop = () => {
  const [metrics, setMetrics] = useState<UpgradeMetrics>({
    currentVersion: '3.14.159',
    upgradeProgress: 67,
    performanceGain: 342.7,
    systemEfficiency: 94.8,
    upgradeCount: 1573,
    nextUpgradeETA: 847
  });

  const [autoUpgradeEnabled, setAutoUpgradeEnabled] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    if (autoUpgradeEnabled) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          upgradeProgress: Math.min(100, prev.upgradeProgress + Math.random() * 2),
          performanceGain: prev.performanceGain + Math.random() * 0.5,
          systemEfficiency: Math.min(100, prev.systemEfficiency + Math.random() * 0.1),
          nextUpgradeETA: Math.max(0, prev.nextUpgradeETA - 1)
        }));

        // Auto upgrade when progress reaches 100%
        if (Math.random() > 0.95) {
          setMetrics(prev => ({
            ...prev,
            upgradeCount: prev.upgradeCount + 1,
            upgradeProgress: 0,
            currentVersion: updateVersion(prev.currentVersion)
          }));
          toast({
            title: "🚀 Auto-Upgrade Complete",
            description: "System evolved to next performance level",
            duration: 3000,
          });
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [autoUpgradeEnabled]);

  const updateVersion = (version: string) => {
    const parts = version.split('.');
    const patch = parseInt(parts[2]) + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  };

  const initiateManualUpgrade = async () => {
    setIsUpgrading(true);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setMetrics(prev => ({ ...prev, upgradeProgress: i }));
    }

    setMetrics(prev => ({
      ...prev,
      upgradeCount: prev.upgradeCount + 1,
      performanceGain: prev.performanceGain + 25.5,
      currentVersion: updateVersion(prev.currentVersion)
    }));

    setIsUpgrading(false);
    toast({
      title: "🚀 Manual Upgrade Complete",
      description: "System performance enhanced",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali ke Home</span>
          </Link>
          
          <div className="flex space-x-3">
            <Link to="/miora-infinity">
              <Button className="bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600/30">
                <Home className="h-4 w-4 mr-2" />
                MIORA Infinity Core
              </Button>
            </Link>
            <Link to="/miora-system-status">
              <Button className="bg-cyan-600/20 border-cyan-500 text-cyan-300 hover:bg-cyan-600/30">
                <Gauge className="h-4 w-4 mr-2" />
                System Status
              </Button>
            </Link>
            <Link to="/miora">
              <Button className="bg-blue-600/20 border-blue-500 text-blue-300 hover:bg-blue-600/30">
                <Rocket className="h-4 w-4 mr-2" />
                MIORA Core
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Infinity className="h-12 w-12 text-purple-400" />
            Infinity Upgrade Loop
          </h1>
          <p className="text-gray-300 text-lg">Continuous self-improvement system with autonomous optimization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Rocket className="h-5 w-5" />Version</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.currentVersion}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><TrendingUp className="h-5 w-5" />Performance</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">+{metrics.performanceGain.toFixed(1)}%</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Gauge className="h-5 w-5" />Efficiency</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.systemEfficiency.toFixed(1)}%</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><RotateCcw className="h-5 w-5" />Upgrades</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{metrics.upgradeCount}</div></CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><RefreshCw className="h-5 w-5" />Upgrade Control</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progress</span>
                <span className="text-white">{metrics.upgradeProgress.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.upgradeProgress} className="h-3" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Next Upgrade ETA: {Math.floor(metrics.nextUpgradeETA / 60)}m {metrics.nextUpgradeETA % 60}s</h3>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={autoUpgradeEnabled ? "default" : "outline"}
                  onClick={() => setAutoUpgradeEnabled(!autoUpgradeEnabled)}
                  className={autoUpgradeEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Auto-Upgrade {autoUpgradeEnabled ? 'ON' : 'OFF'}
                </Button>
                <Button onClick={initiateManualUpgrade} disabled={isUpgrading} className="bg-blue-600 hover:bg-blue-700">
                  {isUpgrading ? 'Upgrading...' : 'Manual Upgrade'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfinityUpgradeLoop;