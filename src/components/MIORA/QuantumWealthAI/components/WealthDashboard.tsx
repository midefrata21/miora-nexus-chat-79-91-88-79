import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  BarChart3, 
  Activity,
  Crown,
  Gem,
  Zap
} from 'lucide-react';

interface WealthDashboardProps {
  wealthState: {
    isActive: boolean;
    quantumMode: boolean;
    optimizationProgress: number;
    totalValue: number;
  };
  portfolioStats: {
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
  };
  marketData: Array<{
    symbol: string;
    price: number;
    change24h: number;
    trend: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
  }>;
}

export const WealthDashboard: React.FC<WealthDashboardProps> = ({
  wealthState,
  portfolioStats,
  marketData
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-300 text-sm flex items-center">
              <Crown className="h-4 w-4 mr-2" />
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-yellow-200 mt-1">
              +${(portfolioStats.totalValue * 0.12).toLocaleString()} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-300 text-sm flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Total ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {portfolioStats.totalROI.toFixed(2)}%
            </div>
            <p className="text-xs text-green-200 mt-1">
              +{(portfolioStats.totalROI * 0.05).toFixed(1)}% this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-300 text-sm flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Active Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {portfolioStats.activeTrades}
            </div>
            <p className="text-xs text-purple-200 mt-1">
              {portfolioStats.winRate.toFixed(1)}% win rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-cyan-300 text-sm flex items-center">
              <Gem className="h-4 w-4 mr-2" />
              Optimization Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">
              {portfolioStats.optimizationScore.toFixed(1)}/100
            </div>
            <Progress value={portfolioStats.optimizationScore} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Portfolio Asset Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioStats.assets.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{asset.symbol.slice(0, 3)}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{asset.symbol}</h4>
                    <p className="text-gray-400 text-sm">{asset.allocation}% allocation</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">${asset.value.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${asset.roi > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      {asset.roi > 0 ? '+' : ''}{asset.roi.toFixed(1)}%
                    </Badge>
                    <span className={`text-xs ${getRiskColor(asset.risk)}`}>
                      {asset.risk.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Market Overview & Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.slice(0, 6).map((market) => (
              <div key={market.symbol} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">{market.symbol}</span>
                    {getTrendIcon(market.trend)}
                  </div>
                  <Badge className={`text-xs ${market.change24h > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    {market.change24h > 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">
                    ${market.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-cyan-400 text-sm font-medium">
                      {market.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={market.confidence} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quantum Status */}
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Quantum Wealth AI Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                wealthState.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}>
                <Crown className="h-8 w-8 text-white" />
              </div>
              <p className="text-white font-medium">AI Status</p>
              <p className="text-gray-400 text-sm">
                {wealthState.isActive ? 'ACTIVE' : 'INACTIVE'}
              </p>
            </div>
            
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                wealthState.quantumMode ? 'bg-purple-500 animate-pulse' : 'bg-gray-500'
              }`}>
                <Gem className="h-8 w-8 text-white" />
              </div>
              <p className="text-white font-medium">Quantum Mode</p>
              <p className="text-gray-400 text-sm">
                {wealthState.quantumMode ? 'ENABLED' : 'DISABLED'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500">
                <span className="text-white font-bold text-lg">
                  {wealthState.optimizationProgress.toFixed(0)}%
                </span>
              </div>
              <p className="text-white font-medium">Optimization</p>
              <p className="text-gray-400 text-sm">Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};