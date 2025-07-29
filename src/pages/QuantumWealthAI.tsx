import React from 'react';
import { useQuantumWealthAI } from '@/components/MIORA/QuantumWealthAI/hooks/useQuantumWealthAI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  DollarSign, 
  Shield, 
  Zap,
  Brain,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

const QuantumWealthAIPage: React.FC = () => {
  const {
    wealthState,
    marketData,
    portfolioStats,
    tradingSignals,
    riskMetrics,
    activateQuantumWealth,
    pauseQuantumWealth,
    executeOptimization,
    generatePredictions,
    optimizePortfolio
  } = useQuantumWealthAI();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getSignalIcon = (type: 'BUY' | 'SELL' | 'HOLD') => {
    switch (type) {
      case 'BUY': return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'SELL': return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'HOLD': return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSignalColor = (type: 'BUY' | 'SELL' | 'HOLD') => {
    switch (type) {
      case 'BUY': return 'bg-green-500 hover:bg-green-600';
      case 'SELL': return 'bg-red-500 hover:bg-red-600';
      case 'HOLD': return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            💎 QUANTUM WEALTH AI
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Advanced AI Portfolio Management & Wealth Optimization System
          </p>
          
          <div className="flex justify-center gap-4">
            {!wealthState.isActive ? (
              <Button 
                onClick={activateQuantumWealth}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Activate Quantum Wealth AI
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button 
                  onClick={pauseQuantumWealth}
                  variant="outline"
                  size="lg"
                >
                  <Activity className="h-5 w-5 mr-2" />
                  Pause System
                </Button>
                <Button 
                  onClick={optimizePortfolio}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Optimize Portfolio
                </Button>
                <Button 
                  onClick={generatePredictions}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="lg"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Generate Predictions
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(portfolioStats.totalValue)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm">Total ROI</p>
                  <p className="text-2xl font-bold text-white">
                    {formatPercent(portfolioStats.totalROI)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {portfolioStats.winRate.toFixed(1)}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 text-sm">Active Trades</p>
                  <p className="text-2xl font-bold text-white">
                    {portfolioStats.activeTrades}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="signals">Trading Signals</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioStats.assets.map((asset, index) => (
                      <div key={asset.symbol} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{asset.symbol}</span>
                          <span className="text-sm text-muted-foreground">
                            {asset.allocation}% • {formatCurrency(asset.value)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={asset.allocation} className="flex-1" />
                          <Badge variant={asset.roi > 0 ? "default" : "destructive"}>
                            {formatPercent(asset.roi)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>System Status:</span>
                    <Badge variant={wealthState.isActive ? "default" : "secondary"}>
                      {wealthState.isActive ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantum Mode:</span>
                    <Badge variant={wealthState.quantumMode ? "default" : "secondary"}>
                      {wealthState.quantumMode ? "ENABLED" : "DISABLED"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Optimization Progress:</span>
                      <span>{wealthState.optimizationProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={wealthState.optimizationProgress} />
                  </div>
                  <div className="flex justify-between">
                    <span>Optimization Score:</span>
                    <Badge>{portfolioStats.optimizationScore.toFixed(1)}%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <div className="grid gap-4">
              {tradingSignals.map((signal) => (
                <Card key={signal.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold">{signal.symbol}</h3>
                        <Button 
                          size="sm" 
                          className={getSignalColor(signal.type)}
                        >
                          {getSignalIcon(signal.type)}
                          {signal.type}
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Strength</p>
                        <p className="font-bold">{signal.strength.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Entry</p>
                        <p className="font-semibold">${signal.entry.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="font-semibold text-green-600">${signal.target.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stop Loss</p>
                        <p className="font-semibold text-red-600">${signal.stopLoss.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <p className="font-semibold">{signal.confidence.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{signal.reasoning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid gap-4">
              {marketData.map((asset) => (
                <Card key={asset.symbol}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold">{asset.symbol}</h3>
                        <Badge variant={asset.prediction === 'buy' ? 'default' : asset.prediction === 'sell' ? 'destructive' : 'secondary'}>
                          {asset.prediction.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${asset.price.toFixed(2)}</p>
                        <p className={`text-sm ${asset.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatPercent(asset.change24h)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <p className="font-semibold">{asset.confidence.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Technical Score</p>
                        <p className="font-semibold">{asset.technicalScore.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Trend</p>
                        <Badge variant={asset.trend === 'bullish' ? 'default' : asset.trend === 'bearish' ? 'destructive' : 'secondary'}>
                          {asset.trend}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Risk</p>
                    <Badge variant={riskMetrics.overallRisk === 'low' ? 'default' : riskMetrics.overallRisk === 'high' ? 'destructive' : 'secondary'}>
                      {riskMetrics.overallRisk.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                    <p className="font-bold">{riskMetrics.riskScore.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                    <p className="font-bold">{riskMetrics.sharpeRatio.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Drawdown</p>
                    <p className="font-bold text-red-500">-{riskMetrics.maxDrawdown.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Asset Correlations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(riskMetrics.correlationMatrix).map(([asset, correlation]) => (
                      <div key={asset} className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{asset}</span>
                        <span className="text-sm font-mono">{correlation.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuantumWealthAIPage;