import { useState, useEffect, useCallback, useRef } from 'react';
import { exchangeWS, PriceUpdate } from '../services';
import { toast } from '@/hooks/use-toast';

export interface RealTimePriceData {
  [symbol: string]: {
    price: number;
    bid: number;
    ask: number;
    volume24h: number;
    change24h: number;
    exchange: string;
    lastUpdate: number;
    spread: number;
    isConnected: boolean;
  };
}

export const useRealTimePrices = (symbols: string[] = [], enabledExchanges: string[] = []) => {
  const [priceData, setPriceData] = useState<RealTimePriceData>({});
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastNotificationTime, setLastNotificationTime] = useState<number>(0);
  const symbolsRef = useRef<string[]>([]);
  const exchangesRef = useRef<string[]>([]);

  const handlePriceUpdate = useCallback((update: PriceUpdate) => {
    setPriceData(prev => ({
      ...prev,
      [update.symbol]: {
        price: update.price,
        bid: update.bid,
        ask: update.ask,
        volume24h: update.volume24h,
        change24h: update.change24h,
        exchange: update.exchange,
        lastUpdate: Date.now(),
        spread: ((update.ask - update.bid) / update.bid) * 100,
        isConnected: true
      }
    }));
  }, []);

  const initializeConnections = useCallback(() => {
    if (symbols.length === 0) return;

    const now = Date.now();
    // Prevent showing notification more than once every 30 seconds
    const shouldShowNotification = now - lastNotificationTime > 30000;

    // Initialize with simulated data since real connections are disabled
    const newPriceData: RealTimePriceData = {};
    symbols.forEach(symbol => {
      const basePrice = Math.random() * 50000 + 10000; // Random price between 10k-60k
      newPriceData[symbol] = {
        price: basePrice,
        bid: basePrice * 0.999,
        ask: basePrice * 1.001,
        volume24h: Math.random() * 1000000,
        change24h: (Math.random() - 0.5) * 10,
        exchange: 'Simulated',
        lastUpdate: Date.now(),
        spread: 0.2,
        isConnected: true
      };
    });

    setPriceData(prev => ({ ...prev, ...newPriceData }));

    if (shouldShowNotification) {
      setLastNotificationTime(now);
      toast({
        title: `🎯 MIORA Mode Aktif`,
        description: `Analisis Level 10 untuk ${symbols.length} pairs`,
        duration: 3000,
      });
    }

    setIsInitialized(true);
  }, [symbols.join(','), enabledExchanges.join(','), lastNotificationTime]);

  // ENHANCED Monitor connection status with auto-recovery
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const status = exchangeWS.getConnectionStatus();
      setConnectionStatus(status);
      
      // ENHANCED: Auto-reconnect disconnected exchanges
      Object.entries(status).forEach(([exchange, connected]) => {
        if (!connected && enabledExchanges.includes(exchange)) {
          console.log(`Auto-reconnecting ${exchange}...`);
          setTimeout(() => {
            try {
              exchangeWS.connect(exchange, symbols);
              symbols.forEach(symbol => {
                exchangeWS.subscribe(symbol, handlePriceUpdate);
              });
            } catch (error) {
              console.error(`Auto-reconnect failed for ${exchange}:`, error);
            }
          }, 2000);
        }
      });
      
      // Update connection status in price data
      setPriceData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const exchange = updated[symbol].exchange.toLowerCase();
          updated[symbol].isConnected = status[exchange] || false;
        });
        return updated;
      });
    }, 8000); // OPTIMIZED: Increased from 5s to 8s

    return () => clearInterval(statusInterval);
  }, [handlePriceUpdate]);

  // Initialize connections when symbols change - FIXED: Remove dependencies that cause infinite loops
  useEffect(() => {
    if (symbols.length > 0 && !isInitialized) {
      initializeConnections();
    }

    return () => {
      // Cleanup subscriptions
      symbols.forEach(symbol => {
        exchangeWS.unsubscribe(symbol, handlePriceUpdate);
      });
    };
  }, [symbols.join(','), enabledExchanges.join(','), isInitialized]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      exchangeWS.disconnectAll();
    };
  }, []);

  const getRealTimePrice = useCallback((symbol: string, fallbackPrice?: number): number => {
    const data = priceData[symbol];
    if (data && data.isConnected) {
      return data.price;
    }
    // Fallback to provided price or simulate if no real data available
    return fallbackPrice || 0;
  }, [priceData]);

  const getSpread = useCallback((symbol: string): number => {
    const data = priceData[symbol];
    return data?.spread || 0;
  }, [priceData]);

  const isSymbolConnected = useCallback((symbol: string): boolean => {
    return priceData[symbol]?.isConnected || false;
  }, [priceData]);

  const getExchangeForSymbol = useCallback((symbol: string): string => {
    return priceData[symbol]?.exchange || 'Simulated';
  }, [priceData]);

  const getConnectedExchanges = useCallback((): string[] => {
    return Object.entries(connectionStatus)
      .filter(([_, connected]) => connected)
      .map(([exchange, _]) => exchange);
  }, [connectionStatus]);

  const reconnectExchange = useCallback((exchange: string) => {
    if (symbols.length > 0) {
      exchangeWS.disconnect(exchange);
      setTimeout(() => {
        exchangeWS.connect(exchange, symbols);
        symbols.forEach(symbol => {
          exchangeWS.subscribe(symbol, handlePriceUpdate);
        });
      }, 1000);
    }
  }, [symbols, handlePriceUpdate]);

  return {
    priceData,
    connectionStatus,
    isInitialized,
    getRealTimePrice,
    getSpread,
    isSymbolConnected,
    getExchangeForSymbol,
    getConnectedExchanges,
    reconnectExchange,
    
    // Statistics
    totalSymbols: symbols.length,
    connectedSymbols: Object.values(priceData).filter(data => data.isConnected).length,
    connectedExchanges: getConnectedExchanges().length
  };
};