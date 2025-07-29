import { PriceUpdate, ExchangeInfo } from './types';
import { exchangeConfigs } from './configs';
import { mioraDatabaseService } from '@/services/MIORADatabaseService';

export class ExchangeWebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private subscribers: Map<string, Set<(update: PriceUpdate) => void>> = new Map();
  private reconnectTimers: Map<string, NodeJS.Timeout> = new Map();
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries = 5; // Increased max retries
  private baseRetryDelay = 45000; // 45 seconds - more stable
  private isReconnecting: Map<string, boolean> = new Map();
  private lastErrorTime: Map<string, number> = new Map();
  private errorSuppressionTime = 120000; // 2 minutes error suppression
  private autoReconnectEnabled: Map<string, boolean> = new Map();
  private errorCounts: Map<string, number> = new Map();
  private consecutiveFailures: Map<string, number> = new Map();

  private async processUpdates(updates: PriceUpdate | PriceUpdate[] | null) {
    if (updates) {
      const updatesArray = Array.isArray(updates) ? updates : [updates];
      updatesArray.forEach(async (update) => {
        const subscribers = this.subscribers.get(update.symbol) || new Set();
        subscribers.forEach(callback => callback(update));
        
        // Generate trading signals based on price analysis
        await this.analyzeAndGenerateSignals(update);
      });
    }
  }

  private async analyzeAndGenerateSignals(update: PriceUpdate) {
    try {
      // Simple signal generation based on price movements
      const changePercent = Math.abs(update.change24h || 0);
      const volume = update.volume24h || 0;
      
      // Generate signal for significant price movements with high volume
      if (changePercent > 5 && volume > 1000000) {
        const signalType = (update.change24h || 0) > 0 ? 'buy' : 'sell';
        const confidence = Math.min(90, Math.max(60, changePercent * 10 + (volume / 1000000) * 5));
        
        await mioraDatabaseService.createTradingSignal({
          signal_id: `signal_${update.exchange}_${update.symbol}_${Date.now()}`,
          exchange: update.exchange,
          symbol: update.symbol,
          signal_type: signalType,
          confidence: Math.round(confidence),
          price: update.price,
          volume: volume,
          timeframe: '1m',
          technical_indicators: {
            price_change_24h: update.change24h,
            volume_24h: volume,
            current_price: update.price,
            bid: update.bid,
            ask: update.ask
          },
          market_conditions: {
            trend: signalType === 'buy' ? 'bullish' : 'bearish',
            volatility: changePercent > 10 ? 'high' : 'medium'
          },
          risk_level: changePercent > 10 ? 'high' : changePercent > 5 ? 'medium' : 'low',
          system_generated_by: 'miora-trading-engine',
          expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes expiry
        });

        console.log(`📈 Generated ${signalType} signal for ${update.symbol}: ${confidence}% confidence`);
      }
    } catch (error) {
      console.error('Error generating trading signal:', error);
    }
  }

  private getRetryDelay(attempts: number, exchange: string): number {
    const consecutiveFailures = this.consecutiveFailures.get(exchange) || 0;
    
    // Adaptive delay based on consecutive failures
    let baseDelay = this.baseRetryDelay;
    if (consecutiveFailures > 10) {
      baseDelay = 120000; // 2 minutes for very problematic connections
    } else if (consecutiveFailures > 5) {
      baseDelay = 90000; // 1.5 minutes for problematic connections
    }
    
    return Math.min(baseDelay * Math.pow(1.5, attempts), 180000); // Max 3 minutes
  }

  connect(exchange: string, symbols: string[]) {
    // Prevent multiple simultaneous connections
    if (this.isReconnecting.get(exchange)) {
      console.log(`Already reconnecting to ${exchange}, skipping...`);
      return;
    }

    if (this.connections.has(exchange)) {
      this.disconnect(exchange);
    }

    const config = exchangeConfigs[exchange];
    if (!config) {
      console.error(`Exchange ${exchange} not supported`);
      return;
    }

    this.isReconnecting.set(exchange, true);

    try {
      // Enhanced WebSocket creation with error handling
      const ws = new WebSocket(config.wsUrl);
      ws.binaryType = 'arraybuffer'; // Handle binary data better
      
      ws.onopen = () => {
        console.log(`✅ Connected to ${config.name} WebSocket`);
        
        // Reset all error tracking on successful connection
        this.retryAttempts.set(exchange, 0);
        this.isReconnecting.set(exchange, false);
        this.errorCounts.set(exchange, 0);
        this.consecutiveFailures.set(exchange, 0);
        
        // Subscribe to symbols with error handling
        try {
          const subscribeMsg = config.subscribeFormat(symbols);
          ws.send(JSON.stringify(subscribeMsg));
        } catch (error) {
          console.error(`Failed to subscribe to ${config.name}:`, error);
        }
        
        // Clear any existing reconnect timer
        if (this.reconnectTimers.has(exchange)) {
          clearTimeout(this.reconnectTimers.get(exchange)!);
          this.reconnectTimers.delete(exchange);
        }
      };

      ws.onmessage = (event) => {
        try {
          let data;
          // Handle different message types (text, blob, etc.)
          if (typeof event.data === 'string') {
            data = JSON.parse(event.data);
          } else if (event.data instanceof Blob) {
            // Enhanced blob handling for BingX with compression detection
            event.data.arrayBuffer().then(arrayBuffer => {
              try {
                const uint8Array = new Uint8Array(arrayBuffer);
                
                // Check if data is compressed (gzip/deflate) by looking at magic bytes
                const isGzipped = uint8Array[0] === 0x1f && uint8Array[1] === 0x8b;
                
                if (isGzipped || uint8Array[0] === 0x1f) {
                  // Skip compressed data for now - BingX compression handling
                  console.log(`Skipping compressed ${config.name} message`);
                  return;
                }
                
                // Try to decode as text
                const text = new TextDecoder('utf-8').decode(uint8Array);
                
                // Validate JSON before parsing
                if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
                  const parsedData = JSON.parse(text);
                  const updates = config.parseMessage(parsedData);
                  this.processUpdates(updates);
                } else {
                  console.log(`Non-JSON ${config.name} blob message ignored`);
                }
              } catch (err) {
                // Silently ignore unparseable blob messages (likely compressed data)
                console.log(`Skipping unparseable ${config.name} blob message`);
              }
            }).catch(err => {
              console.log(`Failed to process ${config.name} blob:`, err.message);
            });
            return;
          } else {
            data = event.data;
          }

          const updates = config.parseMessage(data);
          this.processUpdates(updates);
        } catch (error) {
          console.error(`Error parsing ${config.name} message:`, error);
        }
      };

      ws.onclose = (event) => {
        // Suppress duplicate error logs
        const now = Date.now();
        const lastError = this.lastErrorTime.get(exchange) || 0;
        
        if (now - lastError > this.errorSuppressionTime) {
          console.log(`❌ ${config.name} WebSocket disconnected`, event.code, event.reason);
          this.lastErrorTime.set(exchange, now);
        }
        
        this.connections.delete(exchange);
        this.isReconnecting.set(exchange, false);
        
        // Intelligent reconnection logic with adaptive behavior
        const autoReconnect = this.autoReconnectEnabled.get(exchange) !== false;
        const consecutiveFailures = this.consecutiveFailures.get(exchange) || 0;
        
        if (autoReconnect && (event.code === 1006 || event.code === 1000 || event.code === 1005)) {
          const attempts = this.retryAttempts.get(exchange) || 0;
          
          // Adaptive max retries based on connection stability
          const maxRetries = consecutiveFailures > 20 ? 2 : this.maxRetries;
          
          if (attempts < maxRetries) {
            const delay = this.getRetryDelay(attempts, exchange);
            this.retryAttempts.set(exchange, attempts + 1);
            
            const timer = setTimeout(() => {
              // Only log reconnection attempts occasionally
              if (attempts < 3 || attempts % 5 === 0) {
                console.log(`Auto-reconnecting ${exchange} (attempt ${attempts + 1}/${maxRetries})...`);
              }
              this.connect(exchange, symbols);
            }, delay);
            
            this.reconnectTimers.set(exchange, timer);
          } else {
            // Extended cooldown for problematic connections
            const cooldownTime = consecutiveFailures > 10 ? 300000 : 120000; // 5 min or 2 min
            setTimeout(() => {
              this.retryAttempts.set(exchange, 0);
              if (autoReconnect) {
                console.log(`Attempting recovery for ${exchange} after extended cooldown`);
                this.connect(exchange, symbols);
              }
            }, cooldownTime);
          }
        }
      };

      ws.onerror = (error) => {
        const now = Date.now();
        const lastError = this.lastErrorTime.get(exchange) || 0;
        const errorCount = this.errorCounts.get(exchange) || 0;
        
        // Enhanced error counting and suppression
        this.errorCounts.set(exchange, errorCount + 1);
        
        // Only log significant errors to reduce spam dramatically
        const shouldLog = (
          errorCount < 3 || // First 3 errors
          (errorCount % 50 === 0) || // Every 50th error
          (now - lastError > this.errorSuppressionTime) // After suppression time
        );
        
        if (shouldLog) {
          console.warn(`⚠️ ${config.name} connection issue #${errorCount + 1} (suppressing similar errors)`);
          this.lastErrorTime.set(exchange, now);
        }
        
        // Track consecutive failures for adaptive reconnection
        const failures = this.consecutiveFailures.get(exchange) || 0;
        this.consecutiveFailures.set(exchange, failures + 1);
      };

      this.connections.set(exchange, ws);
    } catch (error) {
      console.error(`Failed to connect to ${exchange}:`, error);
    }
  }

  disconnect(exchange: string) {
    const ws = this.connections.get(exchange);
    if (ws) {
      ws.close();
      this.connections.delete(exchange);
    }
    
    // Clear reconnection flag and timer
    this.isReconnecting.set(exchange, false);
    const timer = this.reconnectTimers.get(exchange);
    if (timer) {
      clearTimeout(timer);
      this.reconnectTimers.delete(exchange);
    }
  }

  subscribe(symbol: string, callback: (update: PriceUpdate) => void) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol)!.add(callback);
  }

  unsubscribe(symbol: string, callback: (update: PriceUpdate) => void) {
    const subscribers = this.subscribers.get(symbol);
    if (subscribers) {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        this.subscribers.delete(symbol);
      }
    }
  }

  disconnectAll() {
    this.connections.forEach((ws, exchange) => {
      this.disconnect(exchange);
    });
    this.subscribers.clear();
  }

  getConnectionStatus() {
    const status: Record<string, boolean> = {};
    Object.keys(exchangeConfigs).forEach(exchange => {
      const ws = this.connections.get(exchange);
      status[exchange] = ws ? ws.readyState === WebSocket.OPEN : false;
    });
    return status;
  }

  getAvailableExchanges(): ExchangeInfo[] {
    return Object.keys(exchangeConfigs).map(key => ({
      id: key,
      name: exchangeConfigs[key].name
    }));
  }

  connectToSelectedExchanges(selectedExchanges: string[], symbols: string[]) {
    // Disconnect all first
    this.disconnectAll();
    
    // Connect only to selected exchanges
    selectedExchanges.forEach(exchange => {
      this.connect(exchange, symbols);
    });
  }
}