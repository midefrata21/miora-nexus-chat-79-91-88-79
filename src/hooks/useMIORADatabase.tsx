import { useState, useEffect, useCallback } from 'react';
import { mioraDatabaseService, MIORASystem, TradingSignal, AutonomousTask, Integration } from '@/services/MIORADatabaseService';
import { toast } from '@/hooks/use-toast';

export interface MIORADatabaseState {
  systems: MIORASystem[];
  tradingSignals: TradingSignal[];
  tasks: AutonomousTask[];
  integrations: Integration[];
  websocketStatuses: any[];
  metrics: any[];
  logs: any[];
  isLoading: boolean;
  isConnected: boolean;
  lastUpdate: number;
}

export const useMIORADatabase = () => {
  const [state, setState] = useState<MIORADatabaseState>({
    systems: [],
    tradingSignals: [],
    tasks: [],
    integrations: [],
    websocketStatuses: [],
    metrics: [],
    logs: [],
    isLoading: true,
    isConnected: false,
    lastUpdate: 0
  });

  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize database connection and load data
  useEffect(() => {
    const initializeDatabase = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Wait for database service to be ready
      let attempts = 0;
      while (!mioraDatabaseService.isReady() && attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }

      if (mioraDatabaseService.isReady()) {
        setState(prev => ({ ...prev, isConnected: true }));
        await loadAllData();
        startAutoRefresh();
        
        console.log('✅ MIORA Database Hook initialized');
      } else {
        setState(prev => ({ ...prev, isConnected: false, isLoading: false }));
        console.error('❌ Failed to connect to MIORA Database Service');
      }
    };

    initializeDatabase();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  const loadAllData = useCallback(async () => {
    try {
      const [
        systems,
        signals,
        tasks,
        integrations,
        websocketStatuses,
        logs
      ] = await Promise.all([
        mioraDatabaseService.getAllSystems(),
        mioraDatabaseService.getTradingSignals(undefined, undefined, 20),
        mioraDatabaseService.getTasks(undefined, undefined),
        mioraDatabaseService.getIntegrations(),
        mioraDatabaseService.getWebSocketStatus(),
        mioraDatabaseService.getSystemLogs(undefined, undefined, 50)
      ]);

      setState(prev => ({
        ...prev,
        systems,
        tradingSignals: signals,
        tasks,
        integrations,
        websocketStatuses,
        logs,
        isLoading: false,
        lastUpdate: Date.now()
      }));

    } catch (error) {
      console.error('Error loading MIORA data:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const startAutoRefresh = useCallback(() => {
    // Refresh data every 10 seconds
    const interval = setInterval(async () => {
      if (mioraDatabaseService.isReady()) {
        await loadAllData();
      }
    }, 10000);
    
    setRefreshInterval(interval);
  }, [loadAllData]);

  // System Management Functions
  const createOrUpdateSystem = useCallback(async (system: MIORASystem): Promise<boolean> => {
    const success = await mioraDatabaseService.createOrUpdateSystem(system);
    if (success) {
      await loadAllData();
      
      toast({
        title: "🔄 System Updated",
        description: `${system.name} has been updated`,
        duration: 2000,
      });
    }
    return success;
  }, [loadAllData]);

  const updateSystemStatus = useCallback(async (
    systemId: string, 
    status: MIORASystem['status'], 
    performanceScore?: number
  ): Promise<boolean> => {
    const success = await mioraDatabaseService.updateSystemStatus(systemId, status, performanceScore);
    if (success) {
      // Update local state immediately for better UX
      setState(prev => ({
        ...prev,
        systems: prev.systems.map(sys => 
          sys.system_id === systemId 
            ? { ...sys, status, performance_score: performanceScore || sys.performance_score }
            : sys
        )
      }));
    }
    return success;
  }, []);

  // Trading Functions
  const createTradingSignal = useCallback(async (signal: TradingSignal): Promise<boolean> => {
    const success = await mioraDatabaseService.createTradingSignal(signal);
    if (success) {
      // Add to local state immediately
      setState(prev => ({
        ...prev,
        tradingSignals: [signal as any, ...prev.tradingSignals.slice(0, 19)]
      }));
      
      console.log(`📈 New trading signal created: ${signal.signal_type} ${signal.symbol}`);
    }
    return success;
  }, []);

  const getTradingSignalsByExchange = useCallback((exchange: string) => {
    return state.tradingSignals.filter(signal => signal.exchange === exchange);
  }, [state.tradingSignals]);

  // Task Management Functions
  const createTask = useCallback(async (task: AutonomousTask): Promise<boolean> => {
    const success = await mioraDatabaseService.createTask(task);
    if (success) {
      setState(prev => ({
        ...prev,
        tasks: [task as any, ...prev.tasks]
      }));
      
      console.log(`📋 New task created: ${task.name}`);
    }
    return success;
  }, []);

  const updateTask = useCallback(async (taskId: string, updates: Partial<AutonomousTask>): Promise<boolean> => {
    const success = await mioraDatabaseService.updateTask(taskId, updates);
    if (success) {
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          (task as any).task_id === taskId 
            ? { ...task, ...updates }
            : task
        )
      }));
    }
    return success;
  }, []);

  // Integration Management
  const updateIntegration = useCallback(async (integration: Integration): Promise<boolean> => {
    const success = await mioraDatabaseService.updateIntegration(integration);
    if (success) {
      setState(prev => ({
        ...prev,
        integrations: prev.integrations.map(int => 
          int.integration_id === integration.integration_id 
            ? integration
            : int
        )
      }));
    }
    return success;
  }, []);

  // WebSocket Management
  const updateWebSocketStatus = useCallback(async (status: any): Promise<boolean> => {
    const success = await mioraDatabaseService.updateWebSocketStatus(status);
    if (success) {
      setState(prev => ({
        ...prev,
        websocketStatuses: prev.websocketStatuses.map(ws => 
          ws.exchange === status.exchange && ws.connection_id === status.connection_id
            ? { ...ws, ...status }
            : ws
        ).concat(
          prev.websocketStatuses.find(ws => 
            ws.exchange === status.exchange && ws.connection_id === status.connection_id
          ) ? [] : [status]
        )
      }));
    }
    return success;
  }, []);

  // Logging Functions
  const logMessage = useCallback(async (
    systemId: string,
    level: 'info' | 'warning' | 'error' | 'critical' | 'debug',
    message: string,
    category: 'system' | 'performance' | 'trading' | 'development' | 'user',
    metadata?: Record<string, any>
  ): Promise<boolean> => {
    const success = await mioraDatabaseService.logMessage({
      system_id: systemId,
      level,
      message,
      category,
      metadata
    });
    
    if (success) {
      // Add to local logs
      const newLog = {
        system_id: systemId,
        level,
        message,
        category,
        metadata: metadata || {},
        timestamp: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        logs: [newLog, ...prev.logs.slice(0, 49)]
      }));
    }
    
    return success;
  }, []);

  // Metrics Functions
  const recordMetric = useCallback(async (
    systemId: string,
    metricType: 'performance' | 'memory' | 'cpu' | 'network' | 'websocket',
    value: number,
    unit: string,
    metadata?: Record<string, any>
  ): Promise<boolean> => {
    return await mioraDatabaseService.recordMetric({
      system_id: systemId,
      metric_type: metricType,
      value,
      unit,
      metadata
    });
  }, []);

  // Utility Functions
  const getSystemById = useCallback((systemId: string): MIORASystem | undefined => {
    return state.systems.find(system => system.system_id === systemId);
  }, [state.systems]);

  const getActiveSystemsCount = useCallback((): number => {
    return state.systems.filter(system => system.status === 'active').length;
  }, [state.systems]);

  const getAveragePerformanceScore = useCallback((): number => {
    if (state.systems.length === 0) return 0;
    const total = state.systems.reduce((sum, system) => sum + system.performance_score, 0);
    return Math.round(total / state.systems.length);
  }, [state.systems]);

  const getTasksByStatus = useCallback((status: string) => {
    return state.tasks.filter(task => (task as any).status === status);
  }, [state.tasks]);

  const getIntegrationsByType = useCallback((type: string) => {
    return state.integrations.filter(integration => integration.type === type);
  }, [state.integrations]);

  const getConnectedExchangesCount = useCallback((): number => {
    return state.websocketStatuses.filter(ws => ws.status === 'connected').length;
  }, [state.websocketStatuses]);

  const getLatestSignals = useCallback((count: number = 10) => {
    return state.tradingSignals.slice(0, count);
  }, [state.tradingSignals]);

  const getHighConfidenceSignals = useCallback((minConfidence: number = 80) => {
    return state.tradingSignals.filter(signal => signal.confidence >= minConfidence);
  }, [state.tradingSignals]);

  const getSystemLogs = useCallback((systemId?: string, level?: string) => {
    let logs = state.logs;
    if (systemId) {
      logs = logs.filter(log => log.system_id === systemId);
    }
    if (level) {
      logs = logs.filter(log => log.level === level);
    }
    return logs;
  }, [state.logs]);

  const refreshData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    await loadAllData();
  }, [loadAllData]);

  // Auto-sync functions for existing MIORA systems
  const syncExistingSystems = useCallback(async () => {
    const coreSystems: MIORASystem[] = [
      {
        system_id: 'miora-ai-supreme-engine',
        name: 'MIORA AI Supreme Engine',
        type: 'supreme',
        status: 'active',
        capabilities: ['quantum_processing', 'autonomous_learning', 'predictive_analysis'],
        performance_score: 98.5
      },
      {
        system_id: 'miora-autonomous-core',
        name: 'MIORA Autonomous Core', 
        type: 'autonomous',
        status: 'active',
        capabilities: ['self_healing', 'auto_optimization', 'decision_making'],
        performance_score: 97.8
      },
      {
        system_id: 'miora-trading-engine',
        name: 'MIORA Trading Engine',
        type: 'trading',
        status: 'active',
        capabilities: ['signal_generation', 'risk_management', 'market_analysis'],
        performance_score: 95.6
      },
      {
        system_id: 'miora-development-system',
        name: 'MIORA Development System',
        type: 'development',
        status: 'active',
        capabilities: ['code_generation', 'auto_debugging', 'self_improvement'],
        performance_score: 94.8
      },
      {
        system_id: 'miora-monitoring-system',
        name: 'MIORA Monitoring System',
        type: 'monitoring',
        status: 'active',
        capabilities: ['health_monitoring', 'performance_tracking', 'alert_management'],
        performance_score: 97.2
      }
    ];

    for (const system of coreSystems) {
      await createOrUpdateSystem(system);
    }

    console.log('🔄 MIORA systems synchronized with database');
  }, [createOrUpdateSystem]);

  // Run initial sync on mount
  useEffect(() => {
    if (state.isConnected && !state.isLoading) {
      syncExistingSystems();
    }
  }, [state.isConnected, state.isLoading, syncExistingSystems]);

  return {
    // State
    ...state,
    
    // System Management
    createOrUpdateSystem,
    updateSystemStatus,
    getSystemById,
    getActiveSystemsCount,
    getAveragePerformanceScore,
    
    // Trading
    createTradingSignal,
    getTradingSignalsByExchange,
    getLatestSignals,
    getHighConfidenceSignals,
    
    // Tasks
    createTask,
    updateTask,
    getTasksByStatus,
    
    // Integrations
    updateIntegration,
    getIntegrationsByType,
    
    // WebSocket
    updateWebSocketStatus,
    getConnectedExchangesCount,
    
    // Logging
    logMessage,
    getSystemLogs,
    
    // Metrics
    recordMetric,
    
    // Utilities
    refreshData,
    syncExistingSystems
  };
};