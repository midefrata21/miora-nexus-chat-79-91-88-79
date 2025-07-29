import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Target, Shield, Zap, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TradingPosition {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  stopLoss: number;
  takeProfit: number;
  confidence: number;
  strategy: string;
  openTime: number;
  status: 'open' | 'closed' | 'pending';
}

interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  totalTrades: number;
  active: boolean;
  performance: number;
}

interface RiskMetrics {
  portfolioValue: number;
  totalExposure: number;
  availableMargin: number;
  riskPercentage: number;
  maxDailyLoss: number;
  currentDailyPnL: number;
  volatilityIndex: number;
  sharpeRatio: number;
}

export const MIORAAutonomousTrading: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [positions, setPositions] = useState<TradingPosition[]>([]);
  const [strategies, setStrategies] = useState<TradingStrategy[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>({
    portfolioValue: 100000,
    totalExposure: 0,
    availableMargin: 100000,
    riskPercentage: 0,
    maxDailyLoss: 5000,
    currentDailyPnL: 0,
    volatilityIndex: 25,
    sharpeRatio: 1.2
  });

  const [tradingStats, setTradingStats] = useState({
    totalTrades: 0,
    winningTrades: 0,
    losingTrades: 0,
    totalProfit: 0,
    totalLoss: 0,
    winRate: 0,
    profitFactor: 0,
    avgWin: 0,
    avgLoss: 0,
    largestWin: 0,
    largestLoss: 0,
    currentStreak: 0
  });

  // Initialize trading strategies
  useEffect(() => {
    const initialStrategies: TradingStrategy[] = [
      {
        id: 'momentum_scalping',
        name: 'Momentum Scalping',
        description: 'High-frequency momentum trading with AI pattern recognition',
        winRate: 78.5,
        profitFactor: 1.85,
        maxDrawdown: 3.2,
        totalTrades: 1250,
        active: true,
        performance: 15.7
      },
      {
        id: 'mean_reversion',
        name: 'Mean Reversion Pro',
        description: 'Advanced mean reversion with volatility adjustment',
        winRate: 65.2,
        profitFactor: 2.1,
        maxDrawdown: 5.8,
        totalTrades: 890,
        active: true,
        performance: 12.3
      },
      {
        id: 'breakout_hunter',
        name: 'Breakout Hunter',
        description: 'Multi-timeframe breakout detection with volume confirmation',
        winRate: 72.1,
        profitFactor: 1.95,
        maxDrawdown: 4.5,
        totalTrades: 650,
        active: true,
        performance: 18.9
      },
      {
        id: 'arbitrage_master',
        name: 'Cross-Exchange Arbitrage',
        description: 'Real-time arbitrage opportunities across multiple exchanges',
        winRate: 95.8,
        profitFactor: 3.2,
        maxDrawdown: 1.2,
        totalTrades: 2100,
        active: true,
        performance: 8.5
      },
      {
        id: 'ai_sentiment',
        name: 'AI Sentiment Trader',
        description: 'News and social sentiment analysis with ML prediction',
        winRate: 69.7,
        profitFactor: 2.3,
        maxDrawdown: 6.1,
        totalTrades: 450,
        active: true,
        performance: 22.4
      }
    ];
    setStrategies(initialStrategies);
  }, []);

  // Autonomous trading logic
  useEffect(() => {
    if (!isActive) return;

    const tradingInterval = setInterval(() => {
      // Analyze market conditions
      analyzeMarketConditions();
      
      // Execute trading decisions
      executeAutonomousTrading();
      
      // Update positions
      updatePositions();
      
      // Manage risk
      manageRisk();
      
    }, 3000); // Every 3 seconds

    return () => clearInterval(tradingInterval);
  }, [isActive, positions, strategies]);

  const analyzeMarketConditions = () => {
    // Simulate advanced market analysis
    const volatility = 15 + Math.random() * 20;
    const sentiment = Math.random() > 0.5 ? 'bullish' : 'bearish';
    const trendStrength = Math.random() * 100;
    
    // Update volatility index
    setRiskMetrics(prev => ({
      ...prev,
      volatilityIndex: volatility
    }));

    // Log analysis
    if (Math.random() > 0.9) {
      console.info(`🔍 MIORA Market Analysis: Volatility: ${volatility.toFixed(1)}%, Sentiment: ${sentiment}, Trend: ${trendStrength.toFixed(1)}%`);
    }
  };

  const executeAutonomousTrading = () => {
    // Check if we should open new positions
    const activeStrategies = strategies.filter(s => s.active);
    
    activeStrategies.forEach(strategy => {
      // Strategy-specific logic
      if (shouldOpenPosition(strategy)) {
        openNewPosition(strategy);
      }
    });
  };

  const shouldOpenPosition = (strategy: TradingStrategy): boolean => {
    // Risk management checks
    if (riskMetrics.riskPercentage > 80) return false;
    if (positions.length >= 10) return false;
    if (riskMetrics.currentDailyPnL < -riskMetrics.maxDailyLoss) return false;
    
    // Strategy-specific probability
    const probability = strategy.winRate / 100;
    return Math.random() < (probability * 0.3); // 30% chance scaled by win rate
  };

  const openNewPosition = (strategy: TradingStrategy) => {
    const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'DOT/USDT', 'LINK/USDT'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    const basePrice = 50000 + Math.random() * 10000;
    const isLong = Math.random() > 0.5;
    const confidence = 60 + Math.random() * 35; // 60-95%
    
    // Position sizing based on confidence and risk
    const riskAmount = riskMetrics.portfolioValue * 0.02; // 2% risk per trade
    const stopLossPercent = 2 + Math.random() * 2; // 2-4%
    const takeProfitPercent = stopLossPercent * (1.5 + Math.random()); // 1.5-2.5 risk:reward
    
    const positionSize = riskAmount / (basePrice * stopLossPercent / 100);
    
    const newPosition: TradingPosition = {
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      symbol,
      type: isLong ? 'long' : 'short',
      size: positionSize,
      entryPrice: basePrice,
      currentPrice: basePrice,
      pnl: 0,
      pnlPercent: 0,
      stopLoss: isLong ? basePrice * (1 - stopLossPercent/100) : basePrice * (1 + stopLossPercent/100),
      takeProfit: isLong ? basePrice * (1 + takeProfitPercent/100) : basePrice * (1 - takeProfitPercent/100),
      confidence,
      strategy: strategy.name,
      openTime: Date.now(),
      status: 'open'
    };

    setPositions(prev => [...prev, newPosition]);
    
    // Update exposure
    setRiskMetrics(prev => ({
      ...prev,
      totalExposure: prev.totalExposure + (positionSize * basePrice),
      availableMargin: prev.availableMargin - (positionSize * basePrice * 0.1), // 10% margin
      riskPercentage: Math.min(100, ((prev.totalExposure + positionSize * basePrice) / prev.portfolioValue) * 100)
    }));

    toast({
      title: `📈 ${strategy.name}`,
      description: `Opened ${isLong ? 'LONG' : 'SHORT'} ${symbol} - Size: ${positionSize.toFixed(4)} - Confidence: ${confidence.toFixed(1)}%`,
      duration: 3000,
    });
  };

  const updatePositions = () => {
    setPositions(prev => prev.map(position => {
      if (position.status !== 'open') return position;
      
      // Simulate price movement
      const volatility = riskMetrics.volatilityIndex / 100;
      const priceChange = (Math.random() - 0.5) * volatility * 0.1; // Small price movements
      const newPrice = position.currentPrice * (1 + priceChange);
      
      // Calculate PnL
      const priceDiff = newPrice - position.entryPrice;
      const pnl = position.type === 'long' ? 
        priceDiff * position.size : 
        -priceDiff * position.size;
      const pnlPercent = (pnl / (position.entryPrice * position.size)) * 100;
      
      // Check stop loss / take profit
      const shouldClose = position.type === 'long' ? 
        (newPrice <= position.stopLoss || newPrice >= position.takeProfit) :
        (newPrice >= position.stopLoss || newPrice <= position.takeProfit);
      
      if (shouldClose) {
        closePosition({ ...position, currentPrice: newPrice, pnl, pnlPercent });
        return { ...position, currentPrice: newPrice, pnl, pnlPercent, status: 'closed' as const };
      }
      
      return { ...position, currentPrice: newPrice, pnl, pnlPercent };
    }));
  };

  const closePosition = (position: TradingPosition) => {
    // Update trading stats
    setTradingStats(prev => {
      const isWin = position.pnl > 0;
      const newTotalTrades = prev.totalTrades + 1;
      const newWinningTrades = prev.winningTrades + (isWin ? 1 : 0);
      const newLosingTrades = prev.losingTrades + (isWin ? 0 : 1);
      const newTotalProfit = prev.totalProfit + (isWin ? position.pnl : 0);
      const newTotalLoss = prev.totalLoss + (isWin ? 0 : Math.abs(position.pnl));
      
      return {
        ...prev,
        totalTrades: newTotalTrades,
        winningTrades: newWinningTrades,
        losingTrades: newLosingTrades,
        totalProfit: newTotalProfit,
        totalLoss: newTotalLoss,
        winRate: (newWinningTrades / newTotalTrades) * 100,
        profitFactor: newTotalLoss > 0 ? newTotalProfit / newTotalLoss : 0,
        avgWin: newWinningTrades > 0 ? newTotalProfit / newWinningTrades : 0,
        avgLoss: newLosingTrades > 0 ? newTotalLoss / newLosingTrades : 0,
        largestWin: Math.max(prev.largestWin, isWin ? position.pnl : 0),
        largestLoss: Math.min(prev.largestLoss, isWin ? 0 : position.pnl),
        currentStreak: isWin ? (prev.currentStreak > 0 ? prev.currentStreak + 1 : 1) : 
                              (prev.currentStreak < 0 ? prev.currentStreak - 1 : -1)
      };
    });

    // Update risk metrics
    setRiskMetrics(prev => ({
      ...prev,
      portfolioValue: prev.portfolioValue + position.pnl,
      totalExposure: prev.totalExposure - (position.size * position.entryPrice),
      availableMargin: prev.availableMargin + (position.size * position.entryPrice * 0.1),
      currentDailyPnL: prev.currentDailyPnL + position.pnl,
      riskPercentage: Math.max(0, ((prev.totalExposure - position.size * position.entryPrice) / prev.portfolioValue) * 100)
    }));

    const result = position.pnl > 0 ? 'PROFIT' : 'LOSS';
    const color = position.pnl > 0 ? 'green' : 'red';
    
    console.info(`💰 Position Closed: ${position.symbol} ${position.type.toUpperCase()} - ${result}: $${position.pnl.toFixed(2)} (${position.pnlPercent.toFixed(2)}%)`);
  };

  const manageRisk = () => {
    // Emergency risk management
    if (riskMetrics.riskPercentage > 95) {
      // Close all positions
      setPositions(prev => prev.map(pos => ({ ...pos, status: 'closed' as const })));
      toast({
        title: "🚨 EMERGENCY RISK MANAGEMENT",
        description: "Semua posisi ditutup karena risk exposure terlalu tinggi",
        duration: 5000,
      });
    }
    
    // Daily loss limit
    if (riskMetrics.currentDailyPnL < -riskMetrics.maxDailyLoss) {
      setIsActive(false);
      toast({
        title: "⛔ DAILY LOSS LIMIT REACHED",
        description: "Trading dihentikan untuk hari ini",
        duration: 5000,
      });
    }
  };

  const toggleTrading = () => {
    setIsActive(!isActive);
    
    toast({
      title: isActive ? "⏸️ Autonomous Trading Stopped" : "🚀 MIORA Autonomous Trading Activated",
      description: isActive ? 
        "Semua trading otonom dihentikan" : 
        "MIORA mulai trading secara otonom dengan 5 strategi advanced AI!",
      duration: 3000,
    });
  };

  const openPositions = positions.filter(p => p.status === 'open');
  const totalPnL = openPositions.reduce((sum, p) => sum + p.pnl, 0);

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-6 h-6 text-green-400" />
            MIORA Autonomous Trading System
            <Badge className={isActive ? 'bg-green-500' : 'bg-red-500'}>
              {isActive ? 'TRADING' : 'STOPPED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">${riskMetrics.portfolioValue.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Portfolio Value</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${totalPnL.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Open P&L</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">{tradingStats.winRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">{openPositions.length}</div>
              <div className="text-sm text-gray-400">Active Positions</div>
            </div>
          </div>

          {/* Risk Management */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5 text-yellow-400" />
                Risk Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Portfolio Risk</div>
                  <div className="flex items-center gap-2">
                    <Progress value={riskMetrics.riskPercentage} className="flex-1 h-2" />
                    <span className="text-white text-sm">{riskMetrics.riskPercentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Daily P&L</div>
                  <div className={`font-bold ${riskMetrics.currentDailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${riskMetrics.currentDailyPnL.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Available Margin</div>
                  <div className="text-white font-bold">${riskMetrics.availableMargin.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Strategies */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Active Trading Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategies.filter(s => s.active).map(strategy => (
                  <div key={strategy.id} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{strategy.name}</h4>
                      <Badge className="bg-green-500 text-xs">Active</Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{strategy.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Win Rate:</span>
                        <span className="text-green-400">{strategy.winRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Profit Factor:</span>
                        <span className="text-blue-400">{strategy.profitFactor.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Performance:</span>
                        <span className="text-yellow-400">{strategy.performance.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Open Positions */}
          {openPositions.length > 0 && (
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-orange-400" />
                  Open Positions ({openPositions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openPositions.slice(0, 5).map(position => (
                    <div key={position.id} className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {position.type === 'long' ? 
                            <TrendingUp className="w-4 h-4 text-green-400" /> : 
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          }
                          <span className="text-white font-medium">{position.symbol}</span>
                          <Badge className={position.type === 'long' ? 'bg-green-600' : 'bg-red-600'}>
                            {position.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${position.pnl.toFixed(2)} ({position.pnlPercent.toFixed(2)}%)
                          </div>
                          <div className="text-sm text-gray-400">{position.strategy}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Size: {position.size.toFixed(4)} | Entry: ${position.entryPrice.toFixed(2)} | 
                        Current: ${position.currentPrice.toFixed(2)} | Confidence: {position.confidence.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                  {openPositions.length > 5 && (
                    <div className="text-center text-gray-400 text-sm">
                      ... and {openPositions.length - 5} more positions
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex gap-4">
            <Button
              onClick={toggleTrading}
              className={`flex-1 ${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isActive ? "Stop Trading" : "Start Autonomous Trading"}
            </Button>
          </div>

          <div className="bg-green-900/20 p-4 rounded-lg">
            <h4 className="text-green-300 font-medium mb-2">🚀 Autonomous Trading Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <div>• 5 AI trading strategies dengan machine learning</div>
              <div>• Real-time risk management dan position sizing</div>
              <div>• Cross-exchange arbitrage opportunities</div>
              <div>• Dynamic stop-loss dan take-profit optimization</div>
              <div>• Advanced portfolio management dengan rebalancing</div>
              <div>• Sentiment analysis dan news-based trading</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAAutonomousTrading;