// Export types
export type { ExchangeConfig, PriceUpdate, ExchangeInfo } from './types';

// Export configurations
export { exchangeConfigs } from './configs';

// Export manager class
export { ExchangeWebSocketManager } from './manager';

// Create and export singleton instance
import { ExchangeWebSocketManager } from './manager';
export const exchangeWS = new ExchangeWebSocketManager();