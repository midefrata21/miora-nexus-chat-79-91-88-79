import { 
  ExchangeSource, 
  RealTimePrice, 
  DetailedActionPoint, 
  ChartPattern, 
  ConfirmationSignal, 
  BeginnerGuide,
  CandleData,
  ConfirmationRequirement,
  BeginnerStep
} from '../types';

// Exchange data dengan informasi real-time
export const exchangeSources: ExchangeSource[] = [
  {
    name: 'Binance',
    apiEndpoint: 'https://api.binance.com/api/v3',
    fees: { maker: 0.001, taker: 0.001 },
    leverage: { max: 125, available: [1, 2, 3, 5, 10, 20, 50, 75, 100, 125] },
    reliability: 98,
    lastUpdate: Date.now()
  },
  {
    name: 'Bybit',
    apiEndpoint: 'https://api.bybit.com/v2',
    fees: { maker: 0.0001, taker: 0.0006 },
    leverage: { max: 100, available: [1, 2, 3, 5, 10, 20, 50, 100] },
    reliability: 95,
    lastUpdate: Date.now()
  },
  {
    name: 'OKX',
    apiEndpoint: 'https://www.okx.com/api/v5',
    fees: { maker: 0.0008, taker: 0.001 },
    leverage: { max: 100, available: [1, 2, 3, 5, 10, 20, 50, 100] },
    reliability: 94,
    lastUpdate: Date.now()
  },
  {
    name: 'KuCoin',
    apiEndpoint: 'https://api.kucoin.com/api/v1',
    fees: { maker: 0.001, taker: 0.001 },
    leverage: { max: 10, available: [1, 2, 3, 5, 10] },
    reliability: 90,
    lastUpdate: Date.now()
  }
];

export const generateRealTimePrice = (basePrice: number, pair: string): RealTimePrice => {
  const spread = basePrice * 0.0001; // 0.01% spread
  const bid = basePrice - spread / 2;
  const ask = basePrice + spread / 2;
  const change24h = (Math.random() - 0.5) * basePrice * 0.1; // ±10% change
  
  return {
    bid,
    ask,
    spread,
    lastPrice: basePrice,
    volume24h: 1000000 + Math.random() * 50000000,
    priceChange24h: change24h,
    priceChangePercent24h: (change24h / basePrice) * 100,
    highPrice24h: basePrice * (1 + Math.random() * 0.05),
    lowPrice24h: basePrice * (1 - Math.random() * 0.05),
    updateFrequency: 1000 // 1 second
  };
};

export const generateDetailedActionPoints = (
  signalType: 'BUY' | 'SELL',
  entryPrice: number,
  stopLoss: number,
  profitTargets: number[]
): DetailedActionPoint[] => {
  const basePoints: DetailedActionPoint[] = [
    {
      id: 'entry-1',
      priority: 'CRITICAL',
      action: `Masuk posisi ${signalType}`,
      description: `Buka posisi ${signalType} di level ${entryPrice.toFixed(6)}`,
      expectedOutcome: `Profit potential 2-5% dalam 15-60 menit`,
      riskLevel: 'MEDIUM',
      timeframe: '1-5 menit',
      confirmationRequired: [
        {
          type: 'PRICE_LEVEL',
          condition: `Harga ${signalType === 'BUY' ? 'di atas' : 'di bawah'} ${entryPrice.toFixed(6)}`,
          threshold: entryPrice,
          status: 'PENDING',
          explanation: 'Tunggu konfirmasi harga sebelum entry'
        },
        {
          type: 'VOLUME',
          condition: 'Volume di atas rata-rata 20% terakhir',
          threshold: '120%',
          status: 'PENDING',
          explanation: 'Volume tinggi konfirmasi momentum'
        }
      ],
      beginnerExplanation: `Ini adalah titik masuk utama. Tunggu harga mencapai level yang disarankan sebelum buka posisi. Jangan terburu-buru, konfirmasi dulu!`
    },
    {
      id: 'sl-1',
      priority: 'CRITICAL',
      action: 'Set Stop Loss',
      description: `Pasang stop loss di ${stopLoss.toFixed(6)}`,
      expectedOutcome: 'Protect modal dari kerugian besar',
      riskLevel: 'LOW',
      timeframe: 'Segera setelah entry',
      confirmationRequired: [
        {
          type: 'PRICE_LEVEL',
          condition: `Stop loss aktif di ${stopLoss.toFixed(6)}`,
          threshold: stopLoss,
          status: 'PENDING',
          explanation: 'Stop loss wajib dipasang untuk manajemen risiko'
        }
      ],
      beginnerExplanation: 'Stop loss adalah pengaman utama Anda. Ini akan otomatis menutup posisi jika harga bergerak berlawanan, melindungi modal Anda dari kerugian besar.'
    },
    {
      id: 'tp1-1',
      priority: 'HIGH',
      action: 'Take Profit 1',
      description: `Ambil profit 50% di ${profitTargets[0].toFixed(6)}`,
      expectedOutcome: 'Secure profit awal 1-3%',
      riskLevel: 'LOW',
      timeframe: '5-30 menit',
      confirmationRequired: [
        {
          type: 'PRICE_LEVEL',
          condition: `Harga mencapai ${profitTargets[0].toFixed(6)}`,
          threshold: profitTargets[0],
          status: 'PENDING',
          explanation: 'Target profit pertama untuk mengamankan keuntungan'
        }
      ],
      beginnerExplanation: 'Ambil profit sebagian di target pertama. Ini strategi aman untuk mengunci keuntungan awal sambil membiarkan sisanya berjalan untuk profit lebih besar.'
    }
  ];

  if (profitTargets.length > 1) {
    basePoints.push({
      id: 'tp2-1',
      priority: 'MEDIUM',
      action: 'Take Profit 2',
      description: `Ambil profit 30% di ${profitTargets[1].toFixed(6)}`,
      expectedOutcome: 'Additional profit 3-7%',
      riskLevel: 'MEDIUM',
      timeframe: '15-60 menit',
      confirmationRequired: [
        {
          type: 'PRICE_LEVEL',
          condition: `Harga mencapai ${profitTargets[1].toFixed(6)}`,
          threshold: profitTargets[1],
          status: 'PENDING',
          explanation: 'Target profit kedua untuk profit maksimal'
        },
        {
          type: 'INDICATOR',
          condition: 'RSI tidak overbought/oversold',
          threshold: '30-70',
          status: 'PENDING',
          explanation: 'Pastikan momentum masih sehat'
        }
      ],
      beginnerExplanation: 'Target kedua untuk profit lebih besar. Jika mencapai TP1, Anda bisa menunggu TP2 atau trailing stop untuk memaksimalkan profit.'
    });
  }

  return basePoints;
};

export const generateChartPattern = (
  signalType: 'BUY' | 'SELL',
  entryPrice: number
): ChartPattern => {
  const patterns = {
    BUY: ['ASCENDING_TRIANGLE', 'INVERSE_HEAD_SHOULDERS', 'DOUBLE_BOTTOM', 'CUP_HANDLE', 'FLAG'],
    SELL: ['DESCENDING_TRIANGLE', 'HEAD_SHOULDERS', 'DOUBLE_TOP', 'WEDGE', 'PENNANT']
  };

  const patternType = patterns[signalType][Math.floor(Math.random() * patterns[signalType].length)] as ChartPattern['type'];
  
  // Generate candle data untuk visualisasi
  const candleData: CandleData[] = [];
  let currentPrice = entryPrice * 0.98;
  
  for (let i = 0; i < 20; i++) {
    const open = currentPrice;
    const volatility = 0.002;
    const close = open * (1 + (Math.random() - 0.5) * volatility);
    const high = Math.max(open, close) * (1 + Math.random() * volatility / 2);
    const low = Math.min(open, close) * (1 - Math.random() * volatility / 2);
    
    candleData.push({
      time: Date.now() - (20 - i) * 60000,
      open,
      high,
      low,
      close,
      volume: 1000 + Math.random() * 5000,
      color: close > open ? 'GREEN' : close < open ? 'RED' : 'DOJI'
    });
    
    currentPrice = close;
  }

  const explanations = {
    'ASCENDING_TRIANGLE': 'Pola segitiga naik menunjukkan akumulasi pembeli. Resistance horizontal dengan support yang naik menandakan tekanan beli kuat.',
    'DOUBLE_BOTTOM': 'Pola double bottom adalah sinyal reversal bullish. Dua titik terendah yang sama menunjukkan support kuat.',
    'CUP_HANDLE': 'Pola cup and handle menunjukkan konsolidasi sebelum breakout. Seperti cangkir dengan pegangan, sangat bullish.',
    'HEAD_SHOULDERS': 'Pola head and shoulders adalah reversal bearish klasik. Tiga puncak dengan yang tengah tertinggi.',
    'DOUBLE_TOP': 'Double top menandakan resistance kuat dan potensi reversal bearish setelah uptrend.',
    'DESCENDING_TRIANGLE': 'Segitiga turun menunjukkan tekanan jual. Support horizontal dengan resistance menurun.'
  };

  return {
    type: patternType,
    confidence: 75 + Math.random() * 20, // 75-95%
    description: `Pola ${patternType.replace('_', ' ')} terdeteksi dengan confidence tinggi`,
    visualData: candleData,
    keyLevels: {
      support: [entryPrice * 0.995, entryPrice * 0.99],
      resistance: [entryPrice * 1.005, entryPrice * 1.01],
      breakout: signalType === 'BUY' ? entryPrice * 1.005 : entryPrice * 0.995
    },
    expectedMove: {
      direction: signalType === 'BUY' ? 'UP' : 'DOWN',
      target: signalType === 'BUY' ? entryPrice * 1.02 : entryPrice * 0.98,
      probability: 70 + Math.random() * 25 // 70-95%
    },
    beginnerExplanation: explanations[patternType] || 'Pola chart yang menunjukkan kemungkinan arah pergerakan harga.'
  };
};

export const generateConfirmationSignals = (
  signalType: 'BUY' | 'SELL',
  indicators: any
): ConfirmationSignal[] => {
  const signals: ConfirmationSignal[] = [
    {
      name: 'RSI Divergence',
      type: signalType === 'BUY' ? 'BULLISH' : 'BEARISH',
      strength: 70 + Math.random() * 25,
      description: `RSI menunjukkan ${signalType === 'BUY' ? 'oversold' : 'overbought'} condition`,
      technicalBasis: `RSI saat ini ${indicators.rsi.toFixed(1)}, ${signalType === 'BUY' ? 'di bawah 30 menandakan oversold' : 'di atas 70 menandakan overbought'}`,
      timeframe: '15m',
      beginnerTip: 'RSI adalah indikator momentum. Di bawah 30 = oversold (bisa beli), di atas 70 = overbought (bisa jual).'
    },
    {
      name: 'MACD Cross',
      type: indicators.macd > 0 ? 'BULLISH' : 'BEARISH',
      strength: 60 + Math.random() * 30,
      description: `MACD ${indicators.macd > 0 ? 'bullish' : 'bearish'} crossover detected`,
      technicalBasis: `MACD line ${indicators.macd > 0 ? 'di atas' : 'di bawah'} signal line, menunjukkan momentum ${indicators.macd > 0 ? 'naik' : 'turun'}`,
      timeframe: '15m',
      beginnerTip: 'MACD cross di atas garis nol = bullish, di bawah garis nol = bearish. Semakin jauh dari nol, semakin kuat momentumnya.'
    },
    {
      name: 'EMA Alignment',
      type: indicators.ema12 > indicators.ema26 ? 'BULLISH' : 'BEARISH',
      strength: 55 + Math.random() * 35,
      description: `EMA ${indicators.ema12 > indicators.ema26 ? 'bullish' : 'bearish'} alignment`,
      technicalBasis: `EMA 12 ${indicators.ema12 > indicators.ema26 ? 'di atas' : 'di bawah'} EMA 26, trend ${indicators.ema12 > indicators.ema26 ? 'naik' : 'turun'}`,
      timeframe: '1h',
      beginnerTip: 'EMA 12 di atas EMA 26 = uptrend, sebaliknya = downtrend. Ini menunjukkan arah trend jangka pendek.'
    },
    {
      name: 'Volume Confirmation',
      type: indicators.volume > 0.8 ? 'BULLISH' : 'BEARISH',
      strength: 65 + Math.random() * 25,
      description: `Volume ${indicators.volume > 0.8 ? 'tinggi' : 'rendah'} mendukung pergerakan`,
      technicalBasis: `Volume saat ini ${(indicators.volume * 100).toFixed(0)}% dari rata-rata`,
      timeframe: '5m',
      beginnerTip: 'Volume tinggi mengkonfirmasi kekuatan pergerakan harga. Volume rendah = gerakan lemah, volume tinggi = gerakan kuat.'
    }
  ];

  return signals;
};

export const generateBeginnerGuide = (
  signalType: 'BUY' | 'SELL',
  pair: string,
  exchange: ExchangeSource
): BeginnerGuide => {
  const steps: BeginnerStep[] = [
    {
      step: 1,
      title: 'Persiapan Trading',
      description: 'Pastikan akun trading Anda sudah siap',
      action: `Login ke akun ${exchange.name} dan pastikan ada balance cukup`,
      warningNote: 'Jangan gunakan lebih dari 2% total balance untuk satu trade'
    },
    {
      step: 2,
      title: 'Cari Pair Trading',
      description: `Buka pair ${pair} di platform trading`,
      action: `Search ${pair} di search bar exchange`,
      warningNote: 'Pastikan Anda trading pair yang benar'
    },
    {
      step: 3,
      title: 'Set Order Type',
      description: `Pilih order type untuk posisi ${signalType}`,
      action: `Pilih ${signalType === 'BUY' ? 'Market Buy' : 'Market Sell'} atau Limit Order`,
      warningNote: 'Limit order lebih aman tapi mungkin tidak tereksekusi'
    },
    {
      step: 4,
      title: 'Tentukan Position Size',
      description: 'Hitung ukuran posisi berdasarkan risk management',
      action: 'Gunakan maksimal 2% dari total balance',
      warningNote: 'JANGAN PERNAH all-in atau gunakan seluruh balance'
    },
    {
      step: 5,
      title: 'Set Stop Loss',
      description: 'Pasang stop loss SEBELUM atau BERSAMAAN dengan entry',
      action: 'Set stop loss sesuai level yang disarankan',
      warningNote: 'Stop loss adalah nyawa trader. WAJIB dipasang!'
    },
    {
      step: 6,
      title: 'Monitor & Take Profit',
      description: 'Pantau posisi dan ambil profit sesuai target',
      action: 'Ambil profit sebagian di TP1, sisanya biarkan ke TP2',
      warningNote: 'Jangan serakah, profit kecil konsisten lebih baik'
    }
  ];

  return {
    overview: `Panduan lengkap trading ${signalType} ${pair} di ${exchange.name}. Signal ini cocok untuk scalping dengan target profit 2-5% dalam timeframe 15 menit hingga 1 jam.`,
    stepByStep: steps,
    riskWarning: '⚠️ PERINGATAN: Trading crypto sangat berisiko. Hanya gunakan uang yang siap hilang. Selalu gunakan stop loss dan jangan trading dengan emosi.',
    tipsPemula: [
      'Mulai dengan position size kecil sampai konsisten profit',
      'Catat semua trade untuk evaluasi',
      'Jangan revenge trading setelah loss',
      'Belajar dulu sebelum trading dengan uang besar',
      'Gunakan demo account untuk latihan',
      'Jangan FOMO, selalu ada opportunity lain'
    ],
    commonMistakes: [
      'Tidak pakai stop loss',
      'Position size terlalu besar',
      'Trading dengan emosi',
      'Tidak sabar menunggu setup yang tepat',
      'Revenge trading setelah loss',
      'Mengabaikan risk management'
    ],
    glossary: {
      'Stop Loss': 'Order otomatis untuk menutup posisi saat rugi mencapai level tertentu',
      'Take Profit': 'Order otomatis untuk menutup posisi saat profit mencapai target',
      'RSI': 'Relative Strength Index - indikator momentum (0-100)',
      'MACD': 'Moving Average Convergence Divergence - indikator trend',
      'EMA': 'Exponential Moving Average - rata-rata bergerak eksponensial',
      'Support': 'Level harga dimana biasanya ada tekanan beli',
      'Resistance': 'Level harga dimana biasanya ada tekanan jual',
      'Scalping': 'Trading jangka sangat pendek (menit-jam)',
      'Leverage': 'Pinjaman modal untuk memperbesar posisi trading',
      'Spread': 'Selisih antara harga bid dan ask'
    }
  };
};

export const getRandomExchange = (): ExchangeSource => {
  return exchangeSources[Math.floor(Math.random() * exchangeSources.length)];
};