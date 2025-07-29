import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, BarChart3, Zap, Settings, Crown } from 'lucide-react';

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

interface InvestmentOptimizerProps {
  portfolioStats: PortfolioStats;
  onExecuteOptimization: () => void;
}

export const InvestmentOptimizer: React.FC<InvestmentOptimizerProps> = ({
  portfolioStats,
  onExecuteOptimization
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const optimizationSuggestions = [
    {
      id: 1,
      title: 'Rebalance High-Risk Assets',
      description: 'Reduce SOL allocation by 5% to improve risk-adjusted returns',
      impact: '+3.2% Expected ROI',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Increase DeFi Exposure',
      description: 'Add 10% allocation to DeFi tokens for enhanced yield',
      impact: '+5.7% APY',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Optimize Staking Rewards',
      description: 'Move ETH to staking for additional 4.5% APY',
      impact: '+$12,000 Annual',
      priority: 'high'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500/30">
        <CardHeader>
          <CardTitle className="text-pink-300 flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Investment Optimizer
            </div>
            <Button
              onClick={onExecuteOptimization}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500"
            >
              <Zap className="h-4 w-4 mr-2" />
              Execute Optimization
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Crown className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {portfolioStats.optimizationScore.toFixed(1)}/100
              </div>
              <p className="text-gray-400">Optimization Score</p>
              <Progress value={portfolioStats.optimizationScore} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <BarChart3 className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">
                {portfolioStats.diversificationIndex.toFixed(1)}/10
              </div>
              <p className="text-gray-400">Diversification Index</p>
              <Progress value={portfolioStats.diversificationIndex * 10} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {portfolioStats.winRate.toFixed(1)}%
              </div>
              <p className="text-gray-400">Success Rate</p>
              <Progress value={portfolioStats.winRate} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{suggestion.title}</h4>
                  <Badge className={
                    suggestion.priority === 'high' ? 'bg-red-500' :
                    suggestion.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }>
                    {suggestion.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-2">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-medium">{suggestion.impact}</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-500">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Asset Allocation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioStats.assets.map((asset) => (
              <div key={asset.symbol} className="p-3 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{asset.symbol}</span>
                  <div className="flex items-center space-x-2">
                    <Badge className={asset.roi > 0 ? 'bg-green-500' : 'bg-red-500'}>
                      {asset.roi > 0 ? '+' : ''}{asset.roi.toFixed(1)}%
                    </Badge>
                    <span className={`text-sm ${getRiskColor(asset.risk)}`}>
                      {asset.risk.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current: {asset.allocation}%</span>
                    <span className="text-gray-400">Value: ${asset.value.toLocaleString()}</span>
                  </div>
                  <Progress value={asset.allocation} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};