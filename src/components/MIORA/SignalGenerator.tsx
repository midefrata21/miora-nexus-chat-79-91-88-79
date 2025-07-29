
import { useCallback } from 'react';

interface TradingSignal {
  id: string;
  timestamp: number;
  symbol: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  strength: number; // 0-100
  confidence: number; // 0-100
  price: number;
  targetPrice: number;
  stopLoss: number;
  rsi: number;
  ema12: number;
  ema26: number;
  macd: number;
  volume: number;
  reason: string;
  isValid: boolean;
  risk: 'low' | 'medium' | 'high';
  timeframe: string;
}

interface MarketAnalysis {
  trend: 'bullish' | 'bearish' | 'sideways';
  strength: number;
  volatility: number;
  volume: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  technicalScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export const SignalGenerator = () => {
  const calculateRSI = (prices: number[], period: number = 14): number => {
    // Simplified RSI calculation - in production, use proper implementation
    const gains: number[] = [];
    const losses: number[] = [];
    
    for (let i = 1; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      gains.push(diff > 0 ? diff : 0);
      losses.push(diff < 0 ? Math.abs(diff) : 0);
    }
    
    const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  const calculateEMA = (prices: number[], period: number): number => {
    // Simplified EMA calculation
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema;
    }
    
    return ema;
  };

  const calculateMACD = (prices: number[]): { macd: number; signal: number; histogram: number } => {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macd = ema12 - ema26;
    
    // Simple signal line (9-period EMA of MACD)
    const signal = macd * 0.2 + (macd * 0.8); // Simplified
    const histogram = macd - signal;
    
    return { macd, signal, histogram };
  };

  const generateMockPriceData = (currentPrice: number): number[] => {
    const prices: number[] = [];
    let price = currentPrice * 0.95; // Start 5% lower
    
    for (let i = 0; i < 50; i++) {
      const change = (Math.random() - 0.5) * 0.02; // ±1% change
      price = price * (1 + change);
      prices.push(price);
    }
    
    return prices;
  };

  const validateSignal = (signal: TradingSignal): boolean => {
    // Signal validation rules
    if (signal.confidence < 60) return false;
    if (signal.strength < 50) return false;
    if (signal.risk === 'high' && signal.confidence < 80) return false;
    
    // RSI validation
    if (signal.type === 'BUY' && signal.rsi > 70) return false; // Don't buy overbought
    if (signal.type === 'SELL' && signal.rsi < 30) return false; // Don't sell oversold
    
    // Price validation
    if (signal.stopLoss >= signal.price && signal.type === 'BUY') return false;
    if (signal.stopLoss <= signal.price && signal.type === 'SELL') return false;
    
    return true;
  };

  const generateSignalReason = (signal: TradingSignal): string => {
    const reasons: string[] = [];
    
    if (signal.type === 'BUY') {
      if (signal.rsi < 35) reasons.push('RSI oversold');
      if (signal.ema12 > signal.ema26) reasons.push('EMA bullish crossover');
      if (signal.macd > 0) reasons.push('MACD positive');
    } else if (signal.type === 'SELL') {
      if (signal.rsi > 65) reasons.push('RSI overbought');
      if (signal.ema12 < signal.ema26) reasons.push('EMA bearish crossover');
      if (signal.macd < 0) reasons.push('MACD negative');
    }
    
    if (signal.volume > 1000000) reasons.push('High volume confirmation');
    if (signal.strength > 80) reasons.push('Strong signal strength');
    
    return reasons.join(', ') || 'Technical analysis confirmation';
  };

  const generateSignals = useCallback(async (marketAnalysis: MarketAnalysis): Promise<TradingSignal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const signals: TradingSignal[] = [];
        
        // Generate 1-3 signals based on market conditions
        const signalCount = marketAnalysis.volatility > 60 ? 3 : 
                           marketAnalysis.volatility > 30 ? 2 : 1;
        
        for (let i = 0; i < signalCount; i++) {
          const currentPrice = 50000 + Math.random() * 10000;
          const priceHistory = generateMockPriceData(currentPrice);
          
          const rsi = calculateRSI(priceHistory);
          const ema12 = calculateEMA(priceHistory, 12);
          const ema26 = calculateEMA(priceHistory, 26);
          const macdData = calculateMACD(priceHistory);
          
          // Determine signal type based on technical indicators
          let signalType: 'BUY' | 'SELL' | 'HOLD';
          let strength = 50;
          let confidence = 50;
          
          if (rsi < 30 && ema12 > ema26 && macdData.macd > 0) {
            signalType = 'BUY';
            strength = 70 + Math.random() * 30;
            confidence = 70 + Math.random() * 25;
          } else if (rsi > 70 && ema12 < ema26 && macdData.macd < 0) {
            signalType = 'SELL';
            strength = 70 + Math.random() * 30;
            confidence = 70 + Math.random() * 25;
          } else {
            signalType = 'HOLD';
            strength = 30 + Math.random() * 40;
            confidence = 40 + Math.random() * 30;
          }
          
          // Adjust based on market analysis
          if (marketAnalysis.trend === 'bullish' && signalType === 'BUY') {
            strength += 10;
            confidence += 10;
          } else if (marketAnalysis.trend === 'bearish' && signalType === 'SELL') {
            strength += 10;
            confidence += 10;
          }
          
          // Risk assessment
          let risk: 'low' | 'medium' | 'high';
          if (marketAnalysis.volatility > 70 || marketAnalysis.riskLevel === 'high') {
            risk = 'high';
            confidence -= 15;
          } else if (marketAnalysis.volatility > 40) {
            risk = 'medium';
          } else {
            risk = 'low';
            confidence += 5;
          }
          
          const signal: TradingSignal = {
            id: `signal_${Date.now()}_${i}`,
            timestamp: Date.now(),
            symbol: 'BTC/USDT',
            type: signalType,
            strength: Math.max(0, Math.min(100, strength)),
            confidence: Math.max(0, Math.min(100, confidence)),
            price: currentPrice,
            targetPrice: signalType === 'BUY' ? 
              currentPrice * (1 + 0.02 + Math.random() * 0.03) : 
              currentPrice * (1 - 0.02 - Math.random() * 0.03),
            stopLoss: signalType === 'BUY' ? 
              currentPrice * (1 - 0.015 - Math.random() * 0.01) : 
              currentPrice * (1 + 0.015 + Math.random() * 0.01),
            rsi,
            ema12,
            ema26,
            macd: macdData.macd,
            volume: marketAnalysis.volume,
            reason: '',
            isValid: false,
            risk,
            timeframe: '15m'
          };
          
          signal.reason = generateSignalReason(signal);
          signal.isValid = validateSignal(signal);
          
          signals.push(signal);
        }
        
        console.log(`Generated ${signals.length} signals, ${signals.filter(s => s.isValid).length} valid`);
        resolve(signals);
      }, 300);
    });
  }, []);

  const evaluateSignalPerformance = (signal: TradingSignal, actualPrice: number): {
    success: boolean;
    profitLoss: number;
    hitTarget: boolean;
    hitStopLoss: boolean;
  } => {
    let success = false;
    let profitLoss = 0;
    let hitTarget = false;
    let hitStopLoss = false;
    
    if (signal.type === 'BUY') {
      if (actualPrice >= signal.targetPrice) {
        success = true;
        hitTarget = true;
        profitLoss = ((actualPrice - signal.price) / signal.price) * 100;
      } else if (actualPrice <= signal.stopLoss) {
        success = false;
        hitStopLoss = true;
        profitLoss = ((actualPrice - signal.price) / signal.price) * 100;
      }
    } else if (signal.type === 'SELL') {
      if (actualPrice <= signal.targetPrice) {
        success = true;
        hitTarget = true;
        profitLoss = ((signal.price - actualPrice) / signal.price) * 100;
      } else if (actualPrice >= signal.stopLoss) {
        success = false;
        hitStopLoss = true;
        profitLoss = ((signal.price - actualPrice) / signal.price) * 100;
      }
    }
    
    return { success, profitLoss, hitTarget, hitStopLoss };
  };

  return {
    generateSignals,
    validateSignal,
    evaluateSignalPerformance,
    calculateRSI,
    calculateEMA,
    calculateMACD
  };
};

export { type TradingSignal };
