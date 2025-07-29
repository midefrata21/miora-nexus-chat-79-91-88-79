import { ExchangeConfig } from './types';

export const exchangeConfigs: Record<string, ExchangeConfig> = {
  binance: {
    name: 'Binance',
    wsUrl: 'wss://stream.binance.com:9443/ws',
    subscribeFormat: (symbols) => ({
      method: 'SUBSCRIBE',
      params: symbols.map(s => `${s.toLowerCase()}@ticker`),
      id: Date.now()
    }),
    parseMessage: (data) => {
      if (Array.isArray(data)) {
        return data.map(ticker => ({
          symbol: ticker.s,
          price: parseFloat(ticker.c),
          bid: parseFloat(ticker.b),
          ask: parseFloat(ticker.a),
          volume24h: parseFloat(ticker.v),
          change24h: parseFloat(ticker.P),
          timestamp: ticker.E,
          exchange: 'Binance'
        }));
      }
      return null;
    }
  },
  bybit: {
    name: 'Bybit',
    wsUrl: 'wss://stream.bybit.com/v5/public/linear',
    subscribeFormat: (symbols) => ({
      op: 'subscribe',
      args: symbols.map(s => `tickers.${s}`)
    }),
    parseMessage: (data) => {
      if (data.topic?.startsWith('tickers.')) {
        const ticker = data.data;
        return {
          symbol: ticker.symbol,
          price: parseFloat(ticker.lastPrice),
          bid: parseFloat(ticker.bid1Price),
          ask: parseFloat(ticker.ask1Price),
          volume24h: parseFloat(ticker.volume24h),
          change24h: parseFloat(ticker.price24hPcnt) * 100,
          timestamp: data.ts,
          exchange: 'Bybit'
        };
      }
      return null;
    }
  },
  okx: {
    name: 'OKX',
    wsUrl: 'wss://ws.okx.com:8443/ws/v5/public',
    subscribeFormat: (symbols) => ({
      op: 'subscribe',
      args: symbols.map(s => ({ channel: 'tickers', instId: s }))
    }),
    parseMessage: (data) => {
      if (data.arg?.channel === 'tickers' && data.data) {
        const ticker = data.data[0];
        return {
          symbol: ticker.instId,
          price: parseFloat(ticker.last),
          bid: parseFloat(ticker.bidPx),
          ask: parseFloat(ticker.askPx),
          volume24h: parseFloat(ticker.vol24h),
          change24h: parseFloat(ticker.sodUtc8) * 100,
          timestamp: parseInt(ticker.ts),
          exchange: 'OKX'
        };
      }
      return null;
    }
  },
  kucoin: {
    name: 'KuCoin',
    wsUrl: 'wss://ws-api-spot.kucoin.com/',
    subscribeFormat: (symbols) => ({
      id: Date.now(),
      type: 'subscribe',
      topic: '/market/ticker:all',
      response: true
    }),
    parseMessage: (data) => {
      if (data.topic === '/market/ticker:all' && data.data) {
        const ticker = data.data;
        return {
          symbol: ticker.symbol,
          price: parseFloat(ticker.price),
          bid: parseFloat(ticker.bestBid),
          ask: parseFloat(ticker.bestAsk),
          volume24h: parseFloat(ticker.vol),
          change24h: parseFloat(ticker.changeRate) * 100,
          timestamp: ticker.time,
          exchange: 'KuCoin'
        };
      }
      return null;
    }
  },
  bingx: {
    name: 'BingX',
    wsUrl: 'wss://open-api-ws.bingx.com/market',
    subscribeFormat: (symbols) => ({
      id: `${Date.now()}`,
      reqType: 'sub',
      dataType: `${symbols[0]}@ticker`
    }),
    parseMessage: (data) => {
      if (data.dataType?.includes('@ticker') && data.data) {
        const ticker = data.data;
        return {
          symbol: ticker.s,
          price: parseFloat(ticker.c),
          bid: parseFloat(ticker.b),
          ask: parseFloat(ticker.a),
          volume24h: parseFloat(ticker.v),
          change24h: parseFloat(ticker.P),
          timestamp: ticker.E,
          exchange: 'BingX'
        };
      }
      return null;
    }
  }
};