import { CryptoSignal, MarketData, TechnicalIndicators } from './types';

export const activePairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT', 'XRPUSDT'];

export const scalpingTechniques = [
  'RSI Divergence',
  'MACD Signal Line Cross',
  'EMA Crossover Strategy',
  'Support/Resistance Bounce',
  'Volume Breakout',
  'Bollinger Band Squeeze',
  'Fibonacci Retracement',
  'Price Action Patterns',
  'Order Flow Analysis',
  'Market Structure Break'
];

export const basePrices: Record<string, number> = {
  'BTCUSDT': 43000,
  'ETHUSDT': 2500,
  'BNBUSDT': 300,
  'ADAUSDT': 0.5,
  'SOLUSDT': 100,
  'XRPUSDT': 0.6
};

export const generateCryptoPrice = (base: number, volatility: number = 0.02): number => {
  return base * (1 + (Math.random() - 0.5) * volatility);
};

export const calculateTechnicalIndicators = (price: number): TechnicalIndicators => {
  return {
    rsi: 30 + Math.random() * 40, // RSI between 30-70
    macd: (Math.random() - 0.5) * 2,
    ema12: price * (1 + (Math.random() - 0.5) * 0.001),
    ema26: price * (1 + (Math.random() - 0.5) * 0.001),
    volume: Math.random() * 10000000,
    support: price * (0.98 + Math.random() * 0.01),
    resistance: price * (1.01 + Math.random() * 0.01)
  };
};

export const generateMIORARecommendation = (pair: string): string => {
  const currentPrice = generateCryptoPrice(basePrices[pair] || 100, 0.005);
  const indicators = calculateTechnicalIndicators(currentPrice);
  
  // Determine signal type with improved logic
  const signalType: 'BUY' | 'SELL' = 
    indicators.rsi < 45 && indicators.macd > 0 && indicators.ema12 > indicators.ema26 ? 'BUY' : 
    indicators.rsi > 55 && indicators.macd < 0 && indicators.ema12 < indicators.ema26 ? 'SELL' : 
    Math.random() > 0.5 ? 'BUY' : 'SELL';
  
  const confidence = 85 + Math.random() * 12; // 85-97%
  
  // Calculate entry range and targets for 15m/1h scalping
  const entryRange = signalType === 'BUY' 
    ? [currentPrice * 0.998, currentPrice * 1.002]
    : [currentPrice * 0.998, currentPrice * 1.002];
  
  const tp1 = signalType === 'BUY' ? currentPrice * 1.008 : currentPrice * 0.992;
  const tp2 = signalType === 'BUY' ? currentPrice * 1.015 : currentPrice * 0.985;
  const stopLoss = signalType === 'BUY' ? currentPrice * 0.995 : currentPrice * 1.005;
  
  // Market structure analysis
  const structures = ['Double Bottom', 'Triple Bottom', 'Ascending Triangle', 'Bull Flag', 'Cup & Handle', 'Bear Flag', 'Head & Shoulders', 'Inverse H&S'];
  const strategies = ['Reversal Bounce + EMA Support', 'Breakout Momentum', 'Support/Resistance Bounce', 'Fibonacci Retracement', 'Volume Breakout'];
  const sentiments = ['Positif', 'Sangat Positif', 'Netral-Positif', 'Negatif', 'Sangat Negatif'];
  
  const selectedStructure = structures[Math.floor(Math.random() * structures.length)];
  const selectedStrategy = strategies[Math.floor(Math.random() * strategies.length)];
  const selectedSentiment = signalType === 'BUY' ? sentiments[Math.floor(Math.random() * 3)] : sentiments[3 + Math.floor(Math.random() * 2)];
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });
  
  return `✅ MIORA SIGNAL REKOMENDASI 

📍Pair: ${pair} (15m)
⏱️ Update: ${timeStr} WIB
🎯 Confidence: ${confidence.toFixed(1)}%

🚦Sinyal: ${signalType === 'BUY' ? '✅ BUY' : '🔴 SELL'}
- Harga Sekarang: $${currentPrice.toFixed(currentPrice > 1000 ? 0 : 6)}
- Entry Ideal: $${entryRange[0].toFixed(currentPrice > 1000 ? 0 : 6)} – $${entryRange[1].toFixed(currentPrice > 1000 ? 0 : 6)}
- TP 1: $${tp1.toFixed(currentPrice > 1000 ? 0 : 6)}
- TP 2: $${tp2.toFixed(currentPrice > 1000 ? 0 : 6)}
- Stop Loss: $${stopLoss.toFixed(currentPrice > 1000 ? 0 : 6)}
- Strategi: ${selectedStrategy}
- Sentimen Market: ${selectedSentiment}

📊 Indikator:
- RSI: ${indicators.rsi.toFixed(0)} ${indicators.rsi < 30 ? '(Oversold)' : indicators.rsi > 70 ? '(Overbought)' : '(Normal)'}
- MACD: ${indicators.macd > 0 ? 'Cross Up' : 'Cross Down'}
- Struktur: ${selectedStructure} ${Math.random() > 0.3 ? '(valid)' : '(pending)'}

🧠 Rekomendasi:
- Entry dengan leverage ${signalType === 'BUY' ? '3x-5x' : '2x-3x'}
- Gunakan trailing stop jika harga > TP1
- Risk Management: Max 2% dari total balance
- Timeframe konfirmasi: 1H untuk trend utama
- Exit strategy: Partial profit di TP1 (50%), sisanya trailing`;
};

export const getPnLColor = (pnl: number): string => {
  if (pnl > 0) return 'text-green-400';
  if (pnl < 0) return 'text-red-400';
  return 'text-gray-400';
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 90) return 'bg-green-500';
  if (confidence >= 80) return 'bg-yellow-500';
  if (confidence >= 70) return 'bg-orange-500';
  return 'bg-red-500';
};