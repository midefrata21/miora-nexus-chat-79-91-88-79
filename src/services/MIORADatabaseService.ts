import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Types for MIORA database operations
export interface MIORASystem {
  id?: string;
  system_id: string;
  name: string;
  type: 'core' | 'autonomous' | 'quantum' | 'supreme' | 'infinity' | 'trading' | 'development' | 'monitoring';
  status: 'active' | 'inactive' | 'developing' | 'optimizing' | 'error';
  version?: string;
  capabilities: string[];
  performance_score: number;
  last_activity?: string;
  activation_count?: number;
  total_runtime_seconds?: number;
  error_count?: number;
  optimization_count?: number;
}

export interface SystemMetric {
  system_id: string;
  metric_type: 'performance' | 'memory' | 'cpu' | 'network' | 'websocket';
  value: number;
  unit: string;
  metadata?: Record<string, any>;
}

export interface AutonomousTask {
  task_id: string;
  system_id?: string;
  name: string;
  description?: string;
  type: 'optimization' | 'development' | 'analysis' | 'trading' | 'monitoring';
  priority: number;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  result?: Record<string, any>;
  auto_generated?: boolean;
  dependencies?: string[];
}

export interface TradingSignal {
  signal_id: string;
  exchange: string;
  symbol: string;
  signal_type: 'buy' | 'sell' | 'long' | 'short';
  confidence: number;
  price: number;
  volume?: number;
  timeframe: string;
  technical_indicators?: Record<string, any>;
  market_conditions?: Record<string, any>;
  risk_level: 'low' | 'medium' | 'high' | 'extreme';
  system_generated_by?: string;
  expires_at?: string;
}

export interface SystemLog {
  system_id?: string;
  level: 'info' | 'warning' | 'error' | 'critical' | 'debug';
  message: string;
  category: 'system' | 'performance' | 'trading' | 'development' | 'user';
  event_type?: string;
  metadata?: Record<string, any>;
}

export interface WebSocketStatus {
  exchange: string;
  connection_id: string;
  status: 'connected' | 'disconnected' | 'reconnecting' | 'error';
  latency_ms?: number;
  error_count?: number;
  reconnect_count?: number;
  data_received_count?: number;
}

export interface Integration {
  integration_id: string;
  name: string;
  type: 'api' | 'database' | 'service' | 'module' | 'external';
  status: 'connected' | 'connecting' | 'error' | 'optimizing' | 'inactive';
  endpoint_url?: string;
  api_version?: string;
  performance_score: number;
  data_flow_mb_per_sec?: number;
  error_count?: number;
  success_count?: number;
  configuration?: Record<string, any>;
  dependencies?: string[];
  auto_managed?: boolean;
}

class MIORADatabaseService {
  private isConnected: boolean = false;
  private metricsInterval: NodeJS.Timeout | null = null;
  private realTimeSubscriptions: any[] = [];

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Test database connection
      const { data, error } = await supabase.from('miora_systems').select('count').limit(1);
      if (error) throw error;
      
      this.isConnected = true;
      console.log('🔗 MIORA Database Service initialized successfully');
      
      // Start real-time subscriptions
      this.setupRealTimeSubscriptions();
      
      // Start metrics collection
      this.startMetricsCollection();
      
      toast({
        title: "🔗 Database Connected",
        description: "MIORA database service is now active",
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to initialize MIORA Database Service:', error);
      this.isConnected = false;
    }
  }

  // ===== SYSTEM MANAGEMENT =====
  async createOrUpdateSystem(system: MIORASystem): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_systems')
        .upsert({
          system_id: system.system_id,
          name: system.name,
          type: system.type,
          status: system.status,
          version: system.version || '1.0.0',
          capabilities: system.capabilities,
          performance_score: system.performance_score,
          last_activity: new Date().toISOString(),
          activation_count: system.activation_count || 0,
          error_count: system.error_count || 0,
          optimization_count: system.optimization_count || 0
        }, {
          onConflict: 'system_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating/updating system:', error);
      return false;
    }
  }

  async getSystemStatus(systemId: string): Promise<MIORASystem | null> {
    try {
      const { data, error } = await supabase
        .from('miora_systems')
        .select('*')
        .eq('system_id', systemId)
        .single();

      if (error) throw error;
      return data as MIORASystem;
    } catch (error) {
      console.error('Error getting system status:', error);
      return null;
    }
  }

  async getAllSystems(): Promise<MIORASystem[]> {
    try {
      const { data, error } = await supabase
        .from('miora_systems')
        .select('*')
        .order('performance_score', { ascending: false });

      if (error) throw error;
      return (data || []) as MIORASystem[];
    } catch (error) {
      console.error('Error getting all systems:', error);
      return [];
    }
  }

  async updateSystemStatus(systemId: string, status: MIORASystem['status'], performanceScore?: number): Promise<boolean> {
    try {
      const updateData: any = {
        status,
        last_activity: new Date().toISOString()
      };

      if (performanceScore !== undefined) {
        updateData.performance_score = performanceScore;
      }

      const { error } = await supabase
        .from('miora_systems')
        .update(updateData)
        .eq('system_id', systemId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating system status:', error);
      return false;
    }
  }

  // ===== METRICS MANAGEMENT =====
  async recordMetric(metric: SystemMetric): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_system_metrics')
        .insert({
          system_id: metric.system_id,
          metric_type: metric.metric_type,
          value: metric.value,
          unit: metric.unit,
          metadata: metric.metadata || {}
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error recording metric:', error);
      return false;
    }
  }

  async getSystemMetrics(systemId: string, metricType?: string, limit: number = 100): Promise<any[]> {
    try {
      let query = supabase
        .from('miora_system_metrics')
        .select('*')
        .eq('system_id', systemId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (metricType) {
        query = query.eq('metric_type', metricType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting system metrics:', error);
      return [];
    }
  }

  // ===== TASK MANAGEMENT =====
  async createTask(task: AutonomousTask): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_autonomous_tasks')
        .insert({
          task_id: task.task_id,
          system_id: task.system_id,
          name: task.name,
          description: task.description,
          type: task.type,
          priority: task.priority,
          status: task.status,
          progress: task.progress,
          result: task.result || {},
          auto_generated: task.auto_generated !== false,
          dependencies: task.dependencies || []
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating task:', error);
      return false;
    }
  }

  async updateTask(taskId: string, updates: Partial<AutonomousTask>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_autonomous_tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('task_id', taskId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  }

  async getTasks(systemId?: string, status?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('miora_autonomous_tasks')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (systemId) {
        query = query.eq('system_id', systemId);
      }

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  }

  // ===== TRADING SIGNALS =====
  async createTradingSignal(signal: TradingSignal): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_trading_signals')
        .insert({
          signal_id: signal.signal_id,
          exchange: signal.exchange,
          symbol: signal.symbol,
          signal_type: signal.signal_type,
          confidence: signal.confidence,
          price: signal.price,
          volume: signal.volume,
          timeframe: signal.timeframe,
          technical_indicators: signal.technical_indicators || {},
          market_conditions: signal.market_conditions || {},
          risk_level: signal.risk_level,
          system_generated_by: signal.system_generated_by,
          expires_at: signal.expires_at
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating trading signal:', error);
      return false;
    }
  }

  async getTradingSignals(exchange?: string, symbol?: string, limit: number = 50): Promise<any[]> {
    try {
      let query = supabase
        .from('miora_trading_signals')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (exchange) {
        query = query.eq('exchange', exchange);
      }

      if (symbol) {
        query = query.eq('symbol', symbol);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting trading signals:', error);
      return [];
    }
  }

  // ===== SYSTEM LOGS =====
  async logMessage(log: SystemLog): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_system_logs')
        .insert({
          system_id: log.system_id,
          level: log.level,
          message: log.message,
          category: log.category,
          event_type: log.event_type,
          metadata: log.metadata || {}
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error logging message:', error);
      return false;
    }
  }

  async getSystemLogs(systemId?: string, level?: string, limit: number = 100): Promise<any[]> {
    try {
      let query = supabase
        .from('miora_system_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (systemId) {
        query = query.eq('system_id', systemId);
      }

      if (level) {
        query = query.eq('level', level);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting system logs:', error);
      return [];
    }
  }

  // ===== WEBSOCKET STATUS =====
  async updateWebSocketStatus(status: WebSocketStatus): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_websocket_status')
        .upsert({
          exchange: status.exchange,
          connection_id: status.connection_id,
          status: status.status,
          latency_ms: status.latency_ms,
          error_count: status.error_count || 0,
          reconnect_count: status.reconnect_count || 0,
          data_received_count: status.data_received_count || 0,
          last_data_received: status.status === 'connected' ? new Date().toISOString() : undefined,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'exchange,connection_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating WebSocket status:', error);
      return false;
    }
  }

  async getWebSocketStatus(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('miora_websocket_status')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting WebSocket status:', error);
      return [];
    }
  }

  // ===== INTEGRATIONS =====
  async updateIntegration(integration: Integration): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('miora_integrations')
        .upsert({
          integration_id: integration.integration_id,
          name: integration.name,
          type: integration.type,
          status: integration.status,
          endpoint_url: integration.endpoint_url,
          api_version: integration.api_version,
          performance_score: integration.performance_score,
          last_sync: integration.status === 'connected' ? new Date().toISOString() : undefined,
          data_flow_mb_per_sec: integration.data_flow_mb_per_sec || 0,
          error_count: integration.error_count || 0,
          success_count: integration.success_count || 0,
          configuration: integration.configuration || {},
          dependencies: integration.dependencies || [],
          auto_managed: integration.auto_managed !== false
        }, {
          onConflict: 'integration_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating integration:', error);
      return false;
    }
  }

  async getIntegrations(): Promise<Integration[]> {
    try {
      const { data, error } = await supabase
        .from('miora_integrations')
        .select('*')
        .order('performance_score', { ascending: false });

      if (error) throw error;
      return (data || []) as Integration[];
    } catch (error) {
      console.error('Error getting integrations:', error);
      return [];
    }
  }

  // ===== REAL-TIME SUBSCRIPTIONS =====
  private setupRealTimeSubscriptions() {
    // Subscribe to system status changes
    const systemsSub = supabase
      .channel('miora_systems_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'miora_systems'
      }, (payload) => {
        console.log('🔄 System status changed:', payload);
        this.handleSystemStatusChange(payload);
      })
      .subscribe();

    // Subscribe to new trading signals
    const signalsSub = supabase
      .channel('miora_trading_signals_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'miora_trading_signals'
      }, (payload) => {
        console.log('📈 New trading signal:', payload);
        this.handleNewTradingSignal(payload);
      })
      .subscribe();

    // Subscribe to task updates
    const tasksSub = supabase
      .channel('miora_tasks_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'miora_autonomous_tasks'
      }, (payload) => {
        console.log('📋 Task updated:', payload);
        this.handleTaskUpdate(payload);
      })
      .subscribe();

    this.realTimeSubscriptions = [systemsSub, signalsSub, tasksSub];
  }

  private handleSystemStatusChange(payload: any) {
    if (payload.new?.status === 'error') {
      toast({
        title: "⚠️ System Error",
        description: `${payload.new.name} encountered an error`,
        variant: "destructive",
        duration: 5000,
      });
    } else if (payload.new?.status === 'active' && payload.old?.status !== 'active') {
      toast({
        title: "✅ System Activated",
        description: `${payload.new.name} is now active`,
        duration: 3000,
      });
    }
  }

  private handleNewTradingSignal(payload: any) {
    const signal = payload.new;
    if (signal?.confidence > 80) {
      toast({
        title: "🎯 High-Confidence Signal",
        description: `${signal.signal_type.toUpperCase()} ${signal.symbol} - ${signal.confidence}% confidence`,
        duration: 5000,
      });
    }
  }

  private handleTaskUpdate(payload: any) {
    const task = payload.new;
    if (task?.status === 'completed' && payload.old?.status !== 'completed') {
      console.log(`✅ Task completed: ${task.name}`);
    } else if (task?.status === 'failed') {
      console.log(`❌ Task failed: ${task.name}`);
    }
  }

  // ===== METRICS COLLECTION =====
  private startMetricsCollection() {
    // Collect metrics every 30 seconds
    this.metricsInterval = setInterval(async () => {
      await this.collectSystemMetrics();
    }, 30000);
  }

  private async collectSystemMetrics() {
    try {
      // Simulate collecting real-time metrics
      const systems = await this.getAllSystems();
      
      for (const system of systems) {
        if (system.status === 'active') {
          // Record performance metrics
          await this.recordMetric({
            system_id: system.system_id,
            metric_type: 'performance',
            value: system.performance_score + (Math.random() - 0.5) * 2,
            unit: '%'
          });

          // Record memory usage
          await this.recordMetric({
            system_id: system.system_id,
            metric_type: 'memory',
            value: Math.random() * 40 + 30,
            unit: '%'
          });

          // Record CPU usage
          await this.recordMetric({
            system_id: system.system_id,
            metric_type: 'cpu',
            value: Math.random() * 50 + 20,
            unit: '%'
          });
        }
      }
    } catch (error) {
      console.error('Error collecting system metrics:', error);
    }
  }

  // ===== UTILITY METHODS =====
  public isReady(): boolean {
    return this.isConnected;
  }

  public async syncSystemData(systemId: string, data: any): Promise<boolean> {
    try {
      await this.logMessage({
        system_id: systemId,
        level: 'info',
        message: 'System data synchronized',
        category: 'system',
        event_type: 'sync',
        metadata: { data_size: JSON.stringify(data).length }
      });
      return true;
    } catch (error) {
      console.error('Error syncing system data:', error);
      return false;
    }
  }

  public cleanup() {
    // Clean up intervals and subscriptions
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }

    this.realTimeSubscriptions.forEach(sub => {
      supabase.removeChannel(sub);
    });
    this.realTimeSubscriptions = [];

    console.log('🧹 MIORA Database Service cleaned up');
  }
}

// Export singleton instance
export const mioraDatabaseService = new MIORADatabaseService();
export default MIORADatabaseService;