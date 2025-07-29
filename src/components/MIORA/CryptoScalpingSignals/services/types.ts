export interface ExchangeConfig {
  name: string;
  wsUrl: string;
  subscribeFormat: (symbols: string[]) => any;
  parseMessage: (data: any) => PriceUpdate | PriceUpdate[] | null;
}

export interface PriceUpdate {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  volume24h: number;
  change24h: number;
  timestamp: number;
  exchange: string;
}

export interface ExchangeInfo {
  id: string;
  name: string;
}