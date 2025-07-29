import { MarketData } from '../types';
import { generateCryptoPrice, activePairs } from '../utils';

export const generateMarketData = (): MarketData[] => {
  const data: MarketData[] = activePairs.map(pair => ({
    symbol: pair.replace('USDT', ''),
    price: generateCryptoPrice(
      pair === 'BTCUSDT' ? 43000 : 
      pair === 'ETHUSDT' ? 2500 :
      pair === 'BNBUSDT' ? 300 :
      pair === 'ADAUSDT' ? 0.5 :
      pair === 'SOLUSDT' ? 100 : 0.6
    ),
    change24h: (Math.random() - 0.5) * 10, // -5% to +5%
    volume24h: Math.random() * 1000000000,
    marketCap: Math.random() * 100000000000,
    volatility: Math.random() * 5 + 1 // 1-6%
  }));
  
  return data;
};