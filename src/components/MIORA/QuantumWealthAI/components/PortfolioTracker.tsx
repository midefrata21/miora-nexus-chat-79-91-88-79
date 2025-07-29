import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Target, DollarSign, Crown, Gem } from 'lucide-react';

interface PortfolioStats {
  totalValue: number;
  totalROI: number;
  activeTrades: number;
  winRate: number;
  optimizationScore: number;
  diversificationIndex: number;
  assets: Array<{
    symbol: string;
    allocation: number;
    value: number;
    roi: number;
    risk: 'low' | 'medium' | 'high';
  }>;
}

interface PortfolioTrackerProps {
  portfolioStats: PortfolioStats;
  onOptimize: () => void;
}

export const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({
  portfolioStats,
  onOptimize
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const totalProfit = portfolioStats.totalValue * (portfolioStats.totalROI / 100);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Portfolio Overview
            </div>
            <Button
              onClick={onOptimize}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
            >
              <Target className="h-4 w-4 mr-2" />
              Optimize Portfolio
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Crown className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                ${portfolioStats.totalValue.toLocaleString()}
              </div>
              <p className="text-gray-400">Total Portfolio Value</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {portfolioStats.totalROI.toFixed(2)}%
              </div>
              <p className="text-gray-400">Total ROI</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">
                ${totalProfit.toLocaleString()}
              </div>
              <p className="text-gray-400">Total Profit</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Gem className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {portfolioStats.activeTrades}
              </div>
              <p className="text-gray-400">Active Trades</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Optimization Score</span>
                <span className="text-white font-bold">{portfolioStats.optimizationScore.toFixed(1)}/100</span>
              </div>
              <Progress value={portfolioStats.optimizationScore} className="h-3" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Win Rate</span>
                <span className="text-white font-bold">{portfolioStats.winRate.toFixed(1)}%</span>
              </div>
              <Progress value={portfolioStats.winRate} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <Target className="h-6 w-6 mr-2" />
            Asset Allocation Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioStats.assets.map((asset) => (
              <div key={asset.symbol} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 3)}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{asset.symbol}</h4>
                      <p className={`text-sm ${getRiskColor(asset.risk)}`}>
                        {asset.risk.toUpperCase()} RISK
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{asset.allocation}%</p>
                    <p className="text-gray-400">${asset.value.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Allocation</span>
                    <span className="text-white">{asset.allocation}%</span>
                  </div>
                  <Progress value={asset.allocation} className="h-2 mb-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">ROI</span>
                    <Badge className={asset.roi > 0 ? 'bg-green-500' : 'bg-red-500'}>
                      {asset.roi > 0 ? '+' : ''}{asset.roi.toFixed(1)}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Profit/Loss</span>
                    <span className={asset.roi > 0 ? 'text-green-400' : 'text-red-400'}>
                      ${((asset.value * asset.roi) / 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {portfolioStats.diversificationIndex.toFixed(1)}/10
              </div>
              <p className="text-gray-400">Diversification Index</p>
              <Progress value={portfolioStats.diversificationIndex * 10} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {portfolioStats.winRate.toFixed(1)}%
              </div>
              <p className="text-gray-400">Win Rate</p>
              <Progress value={portfolioStats.winRate} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {((portfolioStats.totalROI / 12) * 100).toFixed(1)}%
              </div>
              <p className="text-gray-400">Annualized Return</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};