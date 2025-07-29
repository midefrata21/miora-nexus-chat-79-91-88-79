import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';

interface MIORASystemState {
  isRunning: boolean;
  systemHealth: number;
  cycleCount: number;
  performanceScore: number;
  totalProfitLoss: number;
  activeSignals: number;
}

interface MIORAMetrics {
  cpu: number;
  memory: number;
  network: number;
  performance: number;
}

interface MIORALog {
  id: string;
  timestamp: number;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface UseMIORASystemOptions {
  systemId: string;
  systemName: string;
  autoStart?: boolean;
}

export const useMIORASystem = ({ systemId, systemName, autoStart = false }: UseMIORASystemOptions) => {
  const { 
    activateSystem, 
    deactivateSystem, 
    updateSystemState, 
    getSystemState, 
    isSystemActive,
    addSystemLog,
    state: globalState 
  } = useMIORAGlobal();

  const [state, setState] = useState<MIORASystemState>({
    isRunning: false,
    systemHealth: 95,
    cycleCount: 0,
    performanceScore: 87,
    totalProfitLoss: 0,
    activeSignals: 0
  });

  const [metrics, setMetrics] = useState<MIORAMetrics>({
    cpu: 45,
    memory: 62,
    network: 78,
    performance: 91
  });

  const [logs, setLogs] = useState<MIORALog[]>([]);

  // Sync with global state
  useEffect(() => {
    const systemState = getSystemState(systemId);
    const isActive = isSystemActive(systemId);
    
    setState(prev => ({
      ...prev,
      isRunning: isActive,
      cycleCount: systemState?.cycleCount || prev.cycleCount,
      systemHealth: systemState?.health || prev.systemHealth,
      performanceScore: systemState?.performanceScore || prev.performanceScore
    }));
  }, [systemId, getSystemState, isSystemActive, globalState.masterState.activeSystems]);

  const addLog = useCallback((level: MIORALog['level'], message: string) => {
    const newLog: MIORALog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      level,
      message
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  }, []);

  const startSystem = useCallback(() => {
    activateSystem(systemId, systemName);
    setState(prev => ({ ...prev, isRunning: true }));
    addLog('success', `${systemName} system started`);
    toast({
      title: `🚀 ${systemName} Started`,
      description: `${systemName} is now running and processing`,
      duration: 4000,
    });
  }, [activateSystem, systemId, systemName, addLog]);

  const stopSystem = useCallback(() => {
    deactivateSystem(systemId);
    setState(prev => ({ ...prev, isRunning: false }));
    addLog('info', `${systemName} system stopped`);
    toast({
      title: `⏹️ ${systemName} Stopped`,
      description: `${systemName} has been safely stopped`,
      duration: 3000,
    });
  }, [deactivateSystem, systemId, systemName, addLog]);

  const emergencyStop = useCallback(() => {
    deactivateSystem(systemId);
    setState(prev => ({ ...prev, isRunning: false }));
    addLog('warning', `${systemName} emergency stop activated`);
    toast({
      title: `🚨 ${systemName} Emergency Stop`,
      description: `${systemName} has been emergency stopped`,
      variant: "destructive",
      duration: 5000,
    });
  }, [deactivateSystem, systemId, systemName, addLog]);

  // Initialize system - hanya restore state yang sudah ada, jangan auto-start
  useEffect(() => {
    if (!globalState.isInitialized) return;
    
    const systemState = getSystemState(systemId);
    const isActive = isSystemActive(systemId);
    
    if (isActive && systemState) {
      // System sudah aktif dari session sebelumnya - restore state saja, jangan start ulang
      setState(prev => ({ ...prev, isRunning: true }));
      const runningMinutes = Math.floor((Date.now() - (systemState.activatedAt || Date.now())) / 60000);
      addLog('info', `${systemName} tetap berjalan - durasi ${runningMinutes} menit`);
      
      // Tidak perlu toast karena ini hanya restore state, bukan aktivasi baru
    } else if (!isActive) {
      // System tidak aktif - hanya set state sebagai not running
      setState(prev => ({ ...prev, isRunning: false }));
      addLog('info', `${systemName} siap - klik start untuk mengaktifkan`);
    }
    
    // HAPUS autoStart logic - sistem hanya akan start jika user mengklik start button
  }, [globalState.isInitialized, systemId, systemName, getSystemState, isSystemActive, addLog]);

  // Update global state with local metrics
  useEffect(() => {
    if (state.isRunning) {
      updateSystemState(systemId, {
        health: state.systemHealth,
        performanceScore: state.performanceScore,
        cycleCount: state.cycleCount,
        totalOperations: state.cycleCount
      });
    }
  }, [state.isRunning, state.systemHealth, state.performanceScore, state.cycleCount, systemId, updateSystemState]);

  // Simulation loop
  useEffect(() => {
    if (state.isRunning) {
      const interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          cycleCount: prev.cycleCount + 1,
          systemHealth: Math.max(85, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2)),
          performanceScore: Math.max(80, Math.min(100, prev.performanceScore + (Math.random() - 0.5) * 3)),
          totalProfitLoss: prev.totalProfitLoss + (Math.random() - 0.4) * 10,
          activeSignals: Math.floor(Math.random() * 8) + 1
        }));

        setMetrics(prev => ({
          cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
          network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 5)),
          performance: Math.max(75, Math.min(100, prev.performance + (Math.random() - 0.5) * 4))
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [state.isRunning]);

  return {
    state,
    metrics,
    logs,
    startSystem,
    stopSystem,
    emergencyStop,
    systemId,
    systemName,
    getRunningTime: () => {
      const systemState = getSystemState(systemId);
      if (!systemState?.isActive || !systemState.activatedAt) return 0;
      return Date.now() - systemState.activatedAt;
    }
  };
};