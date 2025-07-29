export interface CryptoSignal {
  id: string;
  symbol: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  currentPrice: number;
  profitTargets: number[];
  stopLoss: number;
  confidence: number;
  accuracy: number;
  timeframe: string;
  technique: string[];
  analysis: string;
  trend: 'BULLISH' | 'BEARISH' | 'SIDEWAYS';
  rsi: number;
  macd: number;
  ema12: number;
  ema26: number;
  volume: number;
  support: number;
  resistance: number;
  timestamp: number;
  status: 'ACTIVE' | 'COMPLETED' | 'STOPPED';
  pnl: number;
  riskReward: string;
  // Enhanced Exchange Integration
  exchange: ExchangeSource;
  realTimePrice: RealTimePrice;
  // Enhanced Action Points
  detailedActionPoints: DetailedActionPoint[];
  // Chart Pattern Recognition
  chartPattern: ChartPattern;
  confirmationSignals: ConfirmationSignal[];
  beginnerGuide: BeginnerGuide;
}

export interface ExchangeSource {
  name: 'Binance' | 'Bybit' | 'OKX' | 'KuCoin' | 'Gate.io' | 'BitMEX' | 'Huobi' | 'FTX';
  apiEndpoint: string;
  fees: {
    maker: number;
    taker: number;
  };
  leverage: {
    max: number;
    available: number[];
  };
  reliability: number; // 1-100
  lastUpdate: number;
}

export interface RealTimePrice {
  bid: number;
  ask: number;
  spread: number;
  lastPrice: number;
  volume24h: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  highPrice24h: number;
  lowPrice24h: number;
  updateFrequency: number; // milliseconds
}

export interface DetailedActionPoint {
  id: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  action: string;
  description: string;
  expectedOutcome: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: string;
  confirmationRequired: ConfirmationRequirement[];
  beginnerExplanation: string;
}

export interface ConfirmationRequirement {
  type: 'PRICE_LEVEL' | 'INDICATOR' | 'VOLUME' | 'TIME' | 'PATTERN';
  condition: string;
  threshold: number | string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  explanation: string;
}

export interface ChartPattern {
  type: 'ASCENDING_TRIANGLE' | 'DESCENDING_TRIANGLE' | 'SYMMETRICAL_TRIANGLE' | 
        'HEAD_SHOULDERS' | 'INVERSE_HEAD_SHOULDERS' | 'DOUBLE_TOP' | 'DOUBLE_BOTTOM' |
        'CUP_HANDLE' | 'FLAG' | 'PENNANT' | 'WEDGE' | 'RECTANGLE' | 'CHANNEL';
  confidence: number;
  description: string;
  visualData: CandleData[];
  keyLevels: {
    support: number[];
    resistance: number[];
    breakout: number;
  };
  expectedMove: {
    direction: 'UP' | 'DOWN';
    target: number;
    probability: number;
  };
  beginnerExplanation: string;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  color: 'GREEN' | 'RED' | 'DOJI';
}

export interface ConfirmationSignal {
  name: string;
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  strength: number; // 1-100
  description: string;
  technicalBasis: string;
  timeframe: string;
  beginnerTip: string;
}

export interface BeginnerStep {
  step: number;
  title: string;
  description: string;
  action: string;
  warningNote?: string;
}

export interface BeginnerGuide {
  overview: string;
  stepByStep: BeginnerStep[];
  riskWarning: string;
  tipsPemula: string[];
  commonMistakes: string[];
  glossary: { [key: string]: string };
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  volatility: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: number;
  ema12: number;
  ema26: number;
  volume: number;
  support: number;
  resistance: number;
}