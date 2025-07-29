import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Shield, AlertTriangle, TrendingDown, BarChart3, Target } from 'lucide-react';

interface RiskMetrics {
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  volatilityIndex: number;
  sharpeRatio: number;
  maxDrawdown: number;
  correlationMatrix: Record<string, number>;
}

interface PortfolioStats {
  totalValue: number;
  assets: Array<{
    symbol: string;
    allocation: number;
    value: number;
    roi: number;
    risk: 'low' | 'medium' | 'high';
  }>;
}

interface RiskManagementCoreProps {
  riskMetrics: RiskMetrics;
  portfolioStats: PortfolioStats;
}

export const RiskManagementCore: React.FC<RiskManagementCoreProps> = ({
  riskMetrics,
  portfolioStats
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const riskAlerts = [
    {
      level: 'warning',
      message: 'High correlation detected between BTC and ETH (87%)',
      action: 'Consider diversifying into uncorrelated assets'
    },
    {
      level: 'info',
      message: 'Volatility index within acceptable range',
      action: 'Continue monitoring market conditions'
    },
    {
      level: 'critical',
      message: 'SOL allocation exceeds recommended risk threshold',
      action: 'Reduce position size to maintain portfolio balance'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            Risk Management Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Shield className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {riskMetrics.riskScore.toFixed(1)}%
              </div>
              <p className="text-gray-400">Risk Score</p>
              <Badge className={getRiskBadgeColor(riskMetrics.overallRisk)}>
                {riskMetrics.overallRisk.toUpperCase()}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Activity className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {riskMetrics.volatilityIndex.toFixed(1)}%
              </div>
              <p className="text-gray-400">Volatility Index</p>
              <Progress value={riskMetrics.volatilityIndex} className="mt-2 h-2" />
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <TrendingDown className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {riskMetrics.maxDrawdown.toFixed(1)}%
              </div>
              <p className="text-gray-400">Max Drawdown</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">
                {riskMetrics.sharpeRatio.toFixed(2)}
              </div>
              <p className="text-gray-400">Sharpe Ratio</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2" />
            Risk Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAlerts.map((alert, index) => (
              <Alert key={index} className={`border-l-4 ${
                alert.level === 'critical' ? 'border-red-500 bg-red-900/20' :
                alert.level === 'warning' ? 'border-yellow-500 bg-yellow-900/20' :
                'border-blue-500 bg-blue-900/20'
              }`}>
                <AlertTriangle className={`h-4 w-4 ${
                  alert.level === 'critical' ? 'text-red-400' :
                  alert.level === 'warning' ? 'text-yellow-400' :
                  'text-blue-400'
                }`} />
                <AlertDescription className="text-white">
                  <div className="font-medium mb-1">{alert.message}</div>
                  <div className="text-sm text-gray-300">{alert.action}</div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Asset Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioStats.assets.map((asset) => (
              <div key={asset.symbol} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-bold">{asset.symbol}</span>
                    <Badge className={getRiskBadgeColor(asset.risk)}>
                      {asset.risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{asset.allocation}%</p>
                    <p className="text-gray-400 text-sm">${asset.value.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risk Contribution</span>
                    <span className={getRiskColor(asset.risk)}>
                      {(asset.allocation * (asset.risk === 'high' ? 3 : asset.risk === 'medium' ? 2 : 1)).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={asset.allocation * (asset.risk === 'high' ? 3 : asset.risk === 'medium' ? 2 : 1)} 
                    className="h-2" 
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">ROI</span>
                    <Badge className={asset.roi > 0 ? 'bg-green-500' : 'bg-red-500'}>
                      {asset.roi > 0 ? '+' : ''}{asset.roi.toFixed(1)}%
                    </Badge>
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
            <Activity className="h-6 w-6 mr-2" />
            Correlation Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(riskMetrics.correlationMatrix).map(([asset, correlation]) => (
              <div key={asset} className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-lg font-bold text-white mb-1">{asset}</div>
                <div className={`text-2xl font-bold mb-2 ${
                  correlation > 0.7 ? 'text-red-400' :
                  correlation > 0.3 ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {correlation.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400">
                  {correlation > 0.7 ? 'HIGH' : correlation > 0.3 ? 'MEDIUM' : 'LOW'} CORRELATION
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};