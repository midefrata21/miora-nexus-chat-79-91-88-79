
import { useCallback, useState, useEffect } from 'react';

interface TradeResult {
  signalId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  profitLoss: number;
  profitLossPercent: number;
  duration: number; // in minutes
  timestamp: number;
  success: boolean;
  reason: string;
}

interface PerformanceMetrics {
  totalPL: number;
  totalPLPercent: number;
  winRate: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  score: number;
}

interface MemoryData {
  tradeHistory: TradeResult[];
  signalAccuracy: Map<string, number>;
  marketConditions: Array<{
    timestamp: number;
    volatility: number;
    trend: string;
    performance: number;
  }>;
  learningInsights: Array<{
    timestamp: number;
    insight: string;
    impact: number;
    applied: boolean;
  }>;
}

export const MemoryTracker = () => {
  const [memoryData, setMemoryData] = useState<MemoryData>({
    tradeHistory: [],
    signalAccuracy: new Map(),
    marketConditions: [],
    learningInsights: []
  });

  // Load data from localStorage on initialization
  useEffect(() => {
    const savedData = localStorage.getItem('miora_memory_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setMemoryData({
          ...parsed,
          signalAccuracy: new Map(parsed.signalAccuracy || [])
        });
      } catch (error) {
        console.error('Failed to load memory data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever memoryData changes
  useEffect(() => {
    const dataToSave = {
      ...memoryData,
      signalAccuracy: Array.from(memoryData.signalAccuracy.entries())
    };
    localStorage.setItem('miora_memory_data', JSON.stringify(dataToSave));
  }, [memoryData]);

  const storeResults = useCallback(async (signals: any[]): Promise<{ usage: number; stored: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let storedCount = 0;
        
        // Simulate storing signal results
        signals.forEach(signal => {
          if (signal.isValid) {
            // Simulate trade execution and result
            const mockResult: TradeResult = {
              signalId: signal.id,
              symbol: signal.symbol,
              type: signal.type,
              entryPrice: signal.price,
              exitPrice: signal.price * (1 + (Math.random() - 0.5) * 0.04), // ±2% random exit
              profitLoss: 0,
              profitLossPercent: 0,
              duration: Math.floor(Math.random() * 240) + 15, // 15-255 minutes
              timestamp: Date.now(),
              success: Math.random() > 0.4, // 60% success rate
              reason: signal.reason
            };
            
            // Calculate P&L
            if (signal.type === 'BUY') {
              mockResult.profitLoss = mockResult.exitPrice - mockResult.entryPrice;
            } else {
              mockResult.profitLoss = mockResult.entryPrice - mockResult.exitPrice;
            }
            
            mockResult.profitLossPercent = (mockResult.profitLoss / mockResult.entryPrice) * 100;
            mockResult.success = mockResult.profitLoss > 0;
            
            setMemoryData(prev => ({
              ...prev,
              tradeHistory: [...prev.tradeHistory.slice(-999), mockResult] // Keep last 1000 trades
            }));
            
            storedCount++;
          }
        });
        
        // Store market conditions
        const marketCondition = {
          timestamp: Date.now(),
          volatility: Math.random() * 100,
          trend: ['bullish', 'bearish', 'sideways'][Math.floor(Math.random() * 3)],
          performance: signals.filter(s => s.isValid).length * 10
        };
        
        setMemoryData(prev => ({
          ...prev,
          marketConditions: [...prev.marketConditions.slice(-99), marketCondition] // Keep last 100 conditions
        }));
        
        const memoryUsage = (storedCount * 0.1) + (memoryData.tradeHistory.length * 0.05);
        
        resolve({
          usage: memoryUsage,
          stored: storedCount
        });
      }, 100);
    });
  }, [memoryData.tradeHistory.length]);

  const calculatePerformance = useCallback(async (): Promise<PerformanceMetrics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const trades = memoryData.tradeHistory;
        
        if (trades.length === 0) {
          resolve({
            totalPL: 0,
            totalPLPercent: 0,
            winRate: 0,
            totalTrades: 0,
            winningTrades: 0,
            losingTrades: 0,
            avgWin: 0,
            avgLoss: 0,
            profitFactor: 0,
            maxDrawdown: 0,
            sharpeRatio: 0,
            score: 50
          });
          return;
        }
        
        const totalPL = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
        const totalPLPercent = trades.reduce((sum, trade) => sum + trade.profitLossPercent, 0);
        const winningTrades = trades.filter(trade => trade.success).length;
        const losingTrades = trades.length - winningTrades;
        const winRate = (winningTrades / trades.length) * 100;
        
        const winningAmounts = trades.filter(t => t.success).map(t => t.profitLoss);
        const losingAmounts = trades.filter(t => !t.success).map(t => Math.abs(t.profitLoss));
        
        const avgWin = winningAmounts.length > 0 ? 
          winningAmounts.reduce((a, b) => a + b, 0) / winningAmounts.length : 0;
        const avgLoss = losingAmounts.length > 0 ? 
          losingAmounts.reduce((a, b) => a + b, 0) / losingAmounts.length : 0;
        
        const profitFactor = avgLoss > 0 ? (avgWin * winningTrades) / (avgLoss * losingTrades) : 0;
        
        // Calculate max drawdown
        let maxDrawdown = 0;
        let peak = 0;
        let runningPL = 0;
        
        trades.forEach(trade => {
          runningPL += trade.profitLoss;
          if (runningPL > peak) peak = runningPL;
          const drawdown = peak - runningPL;
          if (drawdown > maxDrawdown) maxDrawdown = drawdown;
        });
        
        // Simple Sharpe ratio calculation
        const returns = trades.map(t => t.profitLossPercent);
        const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
        const stdDev = Math.sqrt(
          returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length
        );
        const sharpeRatio = stdDev > 0 ? avgReturn / stdDev : 0;
        
        // Overall performance score (0-100)
        let score = 50; // Base score
        score += Math.min(winRate - 50, 30); // Win rate bonus (max 30 points)
        score += Math.min(profitFactor * 10, 20); // Profit factor bonus (max 20 points)
        score -= Math.min(maxDrawdown / 100, 20); // Drawdown penalty (max -20 points)
        score = Math.max(0, Math.min(100, score));
        
        const metrics: PerformanceMetrics = {
          totalPL,
          totalPLPercent,
          winRate,
          totalTrades: trades.length,
          winningTrades,
          losingTrades,
          avgWin,
          avgLoss,
          profitFactor,
          maxDrawdown,
          sharpeRatio,
          score
        };
        
        console.log('Performance calculated:', {
          totalTrades: metrics.totalTrades,
          winRate: metrics.winRate.toFixed(1),
          totalPL: metrics.totalPL.toFixed(2),
          score: metrics.score.toFixed(1)
        });
        
        resolve(metrics);
      }, 200);
    });
  }, [memoryData.tradeHistory]);

  const addLearningInsight = useCallback((insight: string, impact: number) => {
    const newInsight = {
      timestamp: Date.now(),
      insight,
      impact,
      applied: false
    };
    
    setMemoryData(prev => ({
      ...prev,
      learningInsights: [...prev.learningInsights.slice(-49), newInsight] // Keep last 50 insights
    }));
  }, []);

  const getLearningInsights = useCallback(() => {
    const recentTrades = memoryData.tradeHistory.slice(-50);
    const insights: string[] = [];
    
    if (recentTrades.length >= 10) {
      const recentWinRate = (recentTrades.filter(t => t.success).length / recentTrades.length) * 100;
      
      if (recentWinRate < 40) {
        insights.push('Recent performance below average - consider adjusting strategy parameters');
      }
      
      if (recentWinRate > 70) {
        insights.push('Excellent recent performance - current strategy is effective');
      }
      
      // Analyze by market conditions
      const bullishTrades = recentTrades.filter(t => 
        memoryData.marketConditions.find(mc => 
          Math.abs(mc.timestamp - t.timestamp) < 600000 && mc.trend === 'bullish'
        )
      );
      
      if (bullishTrades.length > 5) {
        const bullishWinRate = (bullishTrades.filter(t => t.success).length / bullishTrades.length) * 100;
        if (bullishWinRate > 60) {
          insights.push('Strong performance in bullish markets detected');
        } else {
          insights.push('Poor performance in bullish markets - review long strategies');
        }
      }
    }
    
    return insights;
  }, [memoryData.tradeHistory, memoryData.marketConditions]);

  const getMemoryStats = useCallback(() => {
    return {
      totalTrades: memoryData.tradeHistory.length,
      marketConditions: memoryData.marketConditions.length,
      learningInsights: memoryData.learningInsights.length,
      dataSize: JSON.stringify(memoryData).length / 1024, // KB
      oldestTrade: memoryData.tradeHistory.length > 0 ? 
        new Date(memoryData.tradeHistory[0].timestamp).toLocaleDateString() : 'N/A',
      newestTrade: memoryData.tradeHistory.length > 0 ? 
        new Date(memoryData.tradeHistory[memoryData.tradeHistory.length - 1].timestamp).toLocaleDateString() : 'N/A'
    };
  }, [memoryData]);

  const clearMemory = useCallback(() => {
    setMemoryData({
      tradeHistory: [],
      signalAccuracy: new Map(),
      marketConditions: [],
      learningInsights: []
    });
    localStorage.removeItem('miora_memory_data');
  }, []);

  const exportMemoryData = useCallback(() => {
    const dataToExport = {
      ...memoryData,
      signalAccuracy: Array.from(memoryData.signalAccuracy.entries()),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miora_memory_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [memoryData]);

  return {
    storeResults,
    calculatePerformance,
    addLearningInsight,
    getLearningInsights,
    getMemoryStats,
    clearMemory,
    exportMemoryData,
    memoryData
  };
};

export { type TradeResult, type PerformanceMetrics, type MemoryData };
