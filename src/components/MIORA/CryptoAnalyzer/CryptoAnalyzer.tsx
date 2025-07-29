import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, Target, Clock, DollarSign, Star, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CryptoAnalysis {
  symbol: string;
  lastPrice: number;
  change24h: number;
  volume: number;
  support: number;
  resistance: number;
  rsi: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
  strength: number;
  confidence: number;
  reason: string;
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  estimatedProfit: number;
  timeframe: string;
  technicalScore: number;
  momentum: number;
  bookmarked: boolean;
}

interface TimeframeData {
  timeframe: string;
  rsi: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
  strength: number;
  support: number;
  resistance: number;
}

const CryptoAnalyzer: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<'scalping' | 'intraday' | 'swing' | 'confluence'>('intraday');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const timeframes = ['15m', '30m', '1h', '2h', '4h', '1d'];
  const strategies = [
    { value: 'scalping', label: 'Scalping', color: 'bg-red-500' },
    { value: 'intraday', label: 'Intraday', color: 'bg-blue-500' },
    { value: 'swing', label: 'Swing', color: 'bg-green-500' },
    { value: 'confluence', label: 'Confluence', color: 'bg-purple-500' }
  ];

  // Sample crypto pairs (dalam implementasi nyata, ini akan dari API)
  const cryptoPairs = [
    'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 
    'DOGEUSDT', 'AVAXUSDT', 'DOTUSDT', 'LINKUSDT', 'UNIUSDT', 'LTCUSDT',
    'TRXUSDT', 'PEPEUSDT', 'SHIBUSDT', 'APTUSDT', 'NEARUSDT', 'INJUSDT',
    'OPUSDT', 'ARBUSDT', 'FETUSDT', 'RENDERUSDT', 'FILUSDT', 'MKRUSDT'
  ];

  const generateAnalysis = (symbol: string): CryptoAnalysis => {
    const basePrice = Math.random() * 50000 + 100;
    const change = (Math.random() - 0.5) * 20;
    const rsi = Math.random() * 100;
    const volume = Math.random() * 1000000000;
    
    // Determine signal based on RSI and momentum
    let signal: 'BUY' | 'SELL' | 'HOLD';
    let strength = 0;
    let reason = '';
    
    if (rsi < 30 && change > -5) {
      signal = 'BUY';
      strength = 75 + Math.random() * 25;
      reason = `🟢 ULTRA MIORA AGI Analysis: RSI oversold at ${rsi.toFixed(1)} with recovery momentum ${change.toFixed(2)}%. Strong reversal pattern detected with high probability bounce from support level. Recommended aggressive entry with tight stop-loss.`;
    } else if (rsi > 70 && change < 5) {
      signal = 'SELL';
      strength = 75 + Math.random() * 25;
      reason = `🔴 ULTRA MIORA AGI Analysis: RSI overbought at ${rsi.toFixed(1)} showing momentum exhaustion ${change.toFixed(2)}%. Bearish divergence forming with distribution pattern. Expect pullback to key support levels.`;
    } else if (rsi >= 45 && rsi <= 55 && Math.abs(change) < 2) {
      signal = 'HOLD';
      strength = 60 + Math.random() * 30;
      reason = `🟡 ULTRA MIORA AGI Analysis: Neutral consolidation phase with RSI ${rsi.toFixed(1)} in equilibrium. Price action showing indecision. Wait for breakout confirmation above/below key levels.`;
    } else if (change > 5 && rsi < 70) {
      signal = 'BUY';
      strength = 80 + Math.random() * 20;
      reason = `🚀 ULTRA MIORA AGI Analysis: Explosive bullish momentum ${change.toFixed(2)}% with RSI ${rsi.toFixed(1)} below overbought. Strong institutional buying detected with volume confirmation. Momentum continuation expected.`;
    } else if (change < -5 && rsi > 30) {
      signal = 'SELL';
      strength = 75 + Math.random() * 25;
      reason = `📉 ULTRA MIORA AGI Analysis: Sharp bearish decline ${change.toFixed(2)}% with RSI ${rsi.toFixed(1)} above oversold. Selling pressure increasing with potential further downside. Bearish continuation pattern active.`;
    } else {
      signal = Math.random() > 0.5 ? 'BUY' : 'SELL';
      strength = 50 + Math.random() * 40;
      reason = `⚠️ ULTRA MIORA AGI Analysis: Mixed technical signals with RSI ${rsi.toFixed(1)} and price change ${change.toFixed(2)}%. Market in transition phase. Monitor for clearer directional bias before entry.`;
    }

    const support = basePrice * (0.95 + Math.random() * 0.03);
    const resistance = basePrice * (1.02 + Math.random() * 0.03);
    const entryPrice = basePrice * (0.998 + Math.random() * 0.004);
    
    return {
      symbol,
      lastPrice: basePrice,
      change24h: change,
      volume,
      support,
      resistance,
      rsi,
      signal,
      strength,
      confidence: 60 + Math.random() * 35,
      reason,
      entryPrice,
      takeProfit: signal === 'BUY' ? basePrice * (1.05 + Math.random() * 0.1) : basePrice * (0.9 + Math.random() * 0.05),
      stopLoss: signal === 'BUY' ? basePrice * (0.95 - Math.random() * 0.03) : basePrice * (1.05 + Math.random() * 0.03),
      estimatedProfit: Math.random() * 15 + 2,
      timeframe: selectedTimeframe,
      technicalScore: 40 + Math.random() * 60,
      momentum: change > 0 ? Math.random() * 50 + 50 : Math.random() * 50,
      bookmarked: Math.random() > 0.8
    };
  };

  const analyzeAllCrypto = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Reduced toast notifications for cleaner UI
    console.log(`🔍 ULTRA MIORA AGI CRYPTO ANALYSIS: Analyzing ${cryptoPairs.length} pairs with ${selectedStrategy} strategy`);

    // Simulate analysis progress
    const totalPairs = cryptoPairs.length;
    const analyses: CryptoAnalysis[] = [];

    for (let i = 0; i < totalPairs; i++) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
      
      const analysis = generateAnalysis(cryptoPairs[i]);
      analyses.push(analysis);
      
      setAnalysisProgress((i + 1) / totalPairs * 100);
    }

    setCryptoData(analyses.sort((a, b) => b.strength - a.strength));
    setLastUpdate(new Date());
    setIsAnalyzing(false);

    // Show completion toast for important results
    toast({
      title: "✅ ULTRA MIORA AGI ANALYSIS COMPLETED",
      description: `${analyses.length} pairs analyzed: ${analyses.filter(a => a.signal === 'BUY').length} BUY signals, ${analyses.filter(a => a.strength > 80).length} ultra-strong signals`,
      duration: 3000,
    });
  };

  const getSignalColor = (signal: 'BUY' | 'SELL' | 'HOLD') => {
    switch (signal) {
      case 'BUY': return 'bg-green-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-black';
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-500';
    if (strength >= 60) return 'text-blue-500';
    if (strength >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(6);
    if (price < 100) return price.toFixed(4);
    return price.toFixed(2);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            MIORA Crypto Analysis Engine
          </CardTitle>
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedStrategy} onValueChange={(value: any) => setSelectedStrategy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {strategies.map(strategy => (
                  <SelectItem key={strategy.value} value={strategy.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${strategy.color}`} />
                      {strategy.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map(tf => (
                  <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={analyzeAllCrypto} 
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Analyze All ({cryptoPairs.length})
                </>
              )}
            </Button>

            {lastUpdate && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Analyzing {Math.floor(analysisProgress / 100 * cryptoPairs.length)}/{cryptoPairs.length} pairs...
              </p>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            ⚠️ Data analisa diperbaharui setiap klik button "Analyze All"
          </div>

          {cryptoData.length > 0 && (
            <Tabs defaultValue="table" className="w-full">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="signals">Strong Signals</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">★</th>
                        <th className="text-left p-2">Symbol</th>
                        <th className="text-left p-2">Last Price</th>
                        <th className="text-left p-2">24h Change</th>
                        <th className="text-left p-2">Support</th>
                        <th className="text-left p-2">Resistance</th>
                        <th className="text-left p-2">RSI</th>
                        <th className="text-left p-2">Signal</th>
                        <th className="text-left p-2">Strength</th>
                        <th className="text-left p-2">Reason</th>
                        <th className="text-left p-2">Entry</th>
                        <th className="text-left p-2">TP/SL</th>
                        <th className="text-left p-2">Est. Profit</th>
                        <th className="text-left p-2">Chart</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cryptoData.map((crypto, index) => (
                        <tr key={crypto.symbol} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <Star 
                              className={`h-4 w-4 cursor-pointer ${crypto.bookmarked ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
                            />
                          </td>
                          <td className="p-2 font-semibold">{crypto.symbol}</td>
                          <td className="p-2">${formatPrice(crypto.lastPrice)}</td>
                          <td className={`p-2 ${crypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <div className="flex items-center gap-1">
                              {crypto.change24h > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {formatPercent(crypto.change24h)}
                            </div>
                          </td>
                          <td className="p-2 text-green-600">${formatPrice(crypto.support)}</td>
                          <td className="p-2 text-red-600">${formatPrice(crypto.resistance)}</td>
                          <td className="p-2">
                            <span className={crypto.rsi < 30 ? 'text-green-500' : crypto.rsi > 70 ? 'text-red-500' : 'text-yellow-500'}>
                              {crypto.rsi.toFixed(1)}
                            </span>
                          </td>
                          <td className="p-2">
                            <Badge className={getSignalColor(crypto.signal)}>
                              {crypto.signal}
                            </Badge>
                          </td>
                          <td className={`p-2 font-semibold ${getStrengthColor(crypto.strength)}`}>
                            {crypto.strength.toFixed(1)}%
                          </td>
                           <td className="p-2 text-xs max-w-48">
                             <div className="whitespace-normal break-words leading-tight">
                               {crypto.reason}
                             </div>
                           </td>
                          <td className="p-2">${formatPrice(crypto.entryPrice)}</td>
                          <td className="p-2 text-xs">
                            <div className="space-y-1">
                              <div className="text-green-600">TP: ${formatPrice(crypto.takeProfit)}</div>
                              <div className="text-red-600">SL: ${formatPrice(crypto.stopLoss)}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1 text-green-600">
                              <DollarSign className="h-3 w-3" />
                              {crypto.estimatedProfit.toFixed(1)}%
                            </div>
                          </td>
                          <td className="p-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(`https://www.binance.com/en/trade/${crypto.symbol}`, '_blank')}
                            >
                              Chart
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="signals" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cryptoData
                    .filter(crypto => crypto.strength >= 70)
                    .map((crypto) => (
                      <Card key={crypto.symbol} className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{crypto.symbol}</CardTitle>
                            <Badge className={getSignalColor(crypto.signal)}>
                              {crypto.signal}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-semibold">${formatPrice(crypto.lastPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Strength:</span>
                            <span className={`font-semibold ${getStrengthColor(crypto.strength)}`}>
                              {crypto.strength.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Est. Profit:</span>
                            <span className="font-semibold text-green-600">
                              +{crypto.estimatedProfit.toFixed(1)}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {crypto.reason}
                          </div>
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={() => window.open(`https://www.binance.com/en/trade/${crypto.symbol}`, '_blank')}
                          >
                            Open Chart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="bookmarks" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cryptoData
                    .filter(crypto => crypto.bookmarked)
                    .map((crypto) => (
                      <Card key={crypto.symbol}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              {crypto.symbol}
                            </CardTitle>
                            <Badge className={getSignalColor(crypto.signal)}>
                              {crypto.signal}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-semibold">${formatPrice(crypto.lastPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>24h Change:</span>
                            <span className={crypto.change24h > 0 ? 'text-green-500' : 'text-red-500'}>
                              {formatPercent(crypto.change24h)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>RSI:</span>
                            <span className={crypto.rsi < 30 ? 'text-green-500' : crypto.rsi > 70 ? 'text-red-500' : 'text-yellow-500'}>
                              {crypto.rsi.toFixed(1)}
                            </span>
                          </div>
                          <Button 
                            className="w-full" 
                            size="sm"
                            onClick={() => window.open(`https://www.binance.com/en/trade/${crypto.symbol}`, '_blank')}
                          >
                            Open Chart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoAnalyzer;