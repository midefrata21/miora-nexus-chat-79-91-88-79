import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Fish, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Eye, 
  DollarSign,
  Activity,
  BarChart3,
  Zap,
  Target,
  Clock,
  Waves
} from 'lucide-react';

interface WhaleTransaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  value: number;
  timestamp: Date;
  exchange: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
}

interface WhaleWallet {
  id: string;
  address: string;
  balance: number;
  recentActivity: number;
  influence: number;
  classification: 'WHALE' | 'INSTITUTION' | 'MARKET_MAKER' | 'EXCHANGE';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface MarketImpact {
  symbol: string;
  priceChange: number;
  volumeSpike: number;
  liquidityChange: number;
  prediction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  timeframe: string;
}

export const WhaleTracker: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [whaleTransactions, setWhaleTransactions] = useState<WhaleTransaction[]>([]);
  const [whaleWallets, setWhaleWallets] = useState<WhaleWallet[]>([]);
  const [marketImpacts, setMarketImpacts] = useState<MarketImpact[]>([]);
  const [alertsCount, setAlertsCount] = useState(0);

  // Generate mock whale data
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Generate whale transactions
        const newTransaction: WhaleTransaction = {
          id: Math.random().toString(36).substr(2, 9),
          symbol: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT'][Math.floor(Math.random() * 4)],
          type: Math.random() > 0.5 ? 'BUY' : 'SELL',
          amount: Math.random() * 100 + 50,
          price: 50000 + Math.random() * 10000,
          value: (Math.random() * 5000000) + 1000000,
          timestamp: new Date(),
          exchange: ['Binance', 'Coinbase', 'Kraken', 'OKX'][Math.floor(Math.random() * 4)],
          impact: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW',
          confidence: Math.random() * 30 + 70
        };

        setWhaleTransactions(prev => [newTransaction, ...prev.slice(0, 19)]);
        setAlertsCount(prev => prev + 1);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Generate initial data
  useEffect(() => {
    const initialWallets: WhaleWallet[] = Array.from({ length: 5 }, (_, i) => ({
      id: `whale_${i + 1}`,
      address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      balance: Math.random() * 10000 + 5000,
      recentActivity: Math.random() * 100,
      influence: Math.random() * 100,
      classification: ['WHALE', 'INSTITUTION', 'MARKET_MAKER', 'EXCHANGE'][Math.floor(Math.random() * 4)] as any,
      riskLevel: ['HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 3)] as any
    }));

    const initialImpacts: MarketImpact[] = Array.from({ length: 6 }, (_, i) => ({
      symbol: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'SOL/USDT', 'DOGE/USDT'][i],
      priceChange: (Math.random() - 0.5) * 10,
      volumeSpike: Math.random() * 200 + 50,
      liquidityChange: (Math.random() - 0.5) * 50,
      prediction: ['BULLISH', 'BEARISH', 'NEUTRAL'][Math.floor(Math.random() * 3)] as any,
      timeframe: ['5M', '15M', '1H'][Math.floor(Math.random() * 3)]
    }));

    setWhaleWallets(initialWallets);
    setMarketImpacts(initialImpacts);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-orange-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'WHALE': return 'bg-purple-500';
      case 'INSTITUTION': return 'bg-blue-500';
      case 'MARKET_MAKER': return 'bg-orange-500';
      case 'EXCHANGE': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'BULLISH': return 'text-green-400';
      case 'BEARISH': return 'text-red-400';
      case 'NEUTRAL': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="bg-gray-800/50 border-cyan-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Fish className="h-6 w-6 text-cyan-400" />
              <div>
                <CardTitle className="text-cyan-400">Pelacak Bandar & Whale</CardTitle>
                <p className="text-sm text-gray-400">Deteksi pergerakan whale real-time seperti Binance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-orange-500 text-white">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {alertsCount} Alerts
              </Badge>
              <Button
                onClick={() => setIsActive(!isActive)}
                className={`${
                  isActive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isActive ? 'Stop Tracking' : 'Start Tracking'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="transactions" className="data-[state=active]:bg-cyan-600">
            <Activity className="h-4 w-4 mr-2" />
            Live Transactions
          </TabsTrigger>
          <TabsTrigger value="wallets" className="data-[state=active]:bg-purple-600">
            <Fish className="h-4 w-4 mr-2" />
            Whale Wallets
          </TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:bg-orange-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market Impact
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {whaleTransactions.length === 0 ? (
              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="text-center py-12">
                  <Fish className="h-16 w-16 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">Tidak ada transaksi whale terdeteksi</p>
                  <p className="text-sm text-gray-500">Aktifkan tracking untuk mulai memantau</p>
                </CardContent>
              </Card>
            ) : (
              whaleTransactions.map((transaction) => (
                <Card key={transaction.id} className="bg-gray-800/50 border-cyan-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${transaction.type === 'BUY' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {transaction.type === 'BUY' ? 
                            <TrendingUp className="h-5 w-5 text-green-400" /> : 
                            <TrendingDown className="h-5 w-5 text-red-400" />
                          }
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white">{transaction.symbol}</span>
                            <Badge className={`${transaction.type === 'BUY' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs`}>
                              {transaction.type}
                            </Badge>
                            <Badge className={`${getImpactColor(transaction.impact)} text-white text-xs`}>
                              {transaction.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                            <span>{transaction.amount.toFixed(2)} coins</span>
                            <span>${transaction.price.toLocaleString()}</span>
                            <span className="font-bold text-cyan-400">${transaction.value.toLocaleString()}</span>
                            <span>{transaction.exchange}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          {transaction.timestamp.toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-cyan-400">
                          {transaction.confidence.toFixed(1)}% confidence
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whaleWallets.map((wallet) => (
              <Card key={wallet.id} className="bg-gray-800/50 border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-purple-400 text-sm">Whale Wallet</CardTitle>
                    <Badge className={`${getClassificationColor(wallet.classification)} text-white text-xs`}>
                      {wallet.classification}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-400">Address</div>
                    <div className="text-white font-mono text-sm">{wallet.address}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-400">Balance</div>
                      <div className="text-white font-bold">{wallet.balance.toFixed(2)} BTC</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Risk Level</div>
                      <Badge className={`${getRiskColor(wallet.riskLevel)} text-white text-xs`}>
                        {wallet.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-1">Activity Level</div>
                    <Progress value={wallet.recentActivity} className="h-2" />
                    <div className="text-xs text-cyan-400 mt-1">{wallet.recentActivity.toFixed(1)}%</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-1">Market Influence</div>
                    <Progress value={wallet.influence} className="h-2" />
                    <div className="text-xs text-orange-400 mt-1">{wallet.influence.toFixed(1)}%</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketImpacts.map((impact) => (
              <Card key={impact.symbol} className="bg-gray-800/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-400 text-sm flex items-center justify-between">
                    {impact.symbol}
                    <Badge className="bg-gray-600 text-white text-xs">{impact.timeframe}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-xs text-gray-400">Price Change</div>
                      <div className={`font-bold ${impact.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {impact.priceChange >= 0 ? '+' : ''}{impact.priceChange.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Volume Spike</div>
                      <div className="text-cyan-400 font-bold">+{impact.volumeSpike.toFixed(1)}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400">Liquidity Change</div>
                    <div className={`font-bold ${impact.liquidityChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {impact.liquidityChange >= 0 ? '+' : ''}{impact.liquidityChange.toFixed(1)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">Prediction</div>
                    <div className={`font-bold ${getPredictionColor(impact.prediction)}`}>
                      {impact.prediction}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Total Volume</div>
                    <div className="text-xl font-bold text-green-400">$2.4B</div>
                  </div>
                  <Waves className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Active Whales</div>
                    <div className="text-xl font-bold text-cyan-400">127</div>
                  </div>
                  <Fish className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Market Impact</div>
                    <div className="text-xl font-bold text-orange-400">High</div>
                  </div>
                  <Target className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Accuracy</div>
                    <div className="text-xl font-bold text-purple-400">94.2%</div>
                  </div>
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Whale Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm">Large BTC movement detected</div>
                      <div className="text-xs text-gray-400">{5 - i} minutes ago</div>
                    </div>
                    <Badge className="bg-orange-500 text-white text-xs">HIGH</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhaleTracker;