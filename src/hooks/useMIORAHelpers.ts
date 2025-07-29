import { useCallback } from 'react';
import { MIORAAction } from '@/reducers/mioraReducer';
import { AutonomousTask, MasterCoreState, SystemState } from '@/types/miora';

interface UseMIORAHelpersProps {
  dispatch: React.Dispatch<MIORAAction>;
  state: any;
}

export const useMIORAHelpers = ({ dispatch, state }: UseMIORAHelpersProps) => {
  const activateFullAutonomy = useCallback(() => {
    dispatch({ type: 'ACTIVATE_FULL_AUTONOMY' });
    dispatch({ 
      type: 'ADD_SYSTEM_LOG', 
      payload: '🎯 FULL AUTONOMY ACTIVATED - Continuous operation mode engaged'
    });
  }, [dispatch]);

  const deactivateFullAutonomy = useCallback(() => {
    dispatch({ type: 'DEACTIVATE_FULL_AUTONOMY' });
    dispatch({ 
      type: 'ADD_SYSTEM_LOG', 
      payload: '⏸️ FULL AUTONOMY DEACTIVATED - Returning to manual mode'
    });
  }, [dispatch]);

  const activateSystem = useCallback((id: string, name: string) => {
    dispatch({ type: 'ACTIVATE_SYSTEM', payload: { id, name } });
    dispatch({ 
      type: 'ADD_SYSTEM_LOG', 
      payload: `🟢 ${name} System ACTIVATED - ID: ${id}`
    });
  }, [dispatch]);

  const deactivateSystem = useCallback((id: string) => {
    const system = state.masterState.activeSystems.find((s: SystemState) => s.id === id);
    dispatch({ type: 'DEACTIVATE_SYSTEM', payload: id });
    dispatch({ 
      type: 'ADD_SYSTEM_LOG', 
      payload: `🔴 ${system?.name || 'Unknown'} System DEACTIVATED - ID: ${id}`
    });
  }, [dispatch, state.masterState.activeSystems]);

  const updateSystemState = useCallback((id: string, updates: Partial<SystemState>) => {
    dispatch({ type: 'UPDATE_SYSTEM_STATE', payload: { id, updates } });
  }, [dispatch]);

  const getSystemState = useCallback((id: string): SystemState | undefined => {
    return state.masterState.activeSystems.find((s: SystemState) => s.id === id);
  }, [state.masterState.activeSystems]);

  const isSystemActive = useCallback((id: string): boolean => {
    const system = state.masterState.activeSystems.find((s: SystemState) => s.id === id);
    return system?.isActive || false;
  }, [state.masterState.activeSystems]);

  const addTask = useCallback((task: AutonomousTask) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  }, [dispatch]);

  const updateTask = useCallback((id: string, updates: Partial<AutonomousTask>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  }, [dispatch]);

  const addSystemLog = useCallback((message: string) => {
    dispatch({ type: 'ADD_SYSTEM_LOG', payload: message });
  }, [dispatch]);

  const updateMasterState = useCallback((updates: Partial<MasterCoreState>) => {
    dispatch({ type: 'UPDATE_MASTER_STATE', payload: updates });
  }, [dispatch]);

  const getRunningTime = useCallback((): number => {
    if (!state.masterState.isFullyAutonomous || !state.masterState.activatedAt) {
      return 0;
    }
    return Date.now() - state.masterState.activatedAt;
  }, [state.masterState.isFullyAutonomous, state.masterState.activatedAt]);

  const getSystemRunningTime = useCallback((id: string): number => {
    const system = state.masterState.activeSystems.find((s: SystemState) => s.id === id);
    if (!system?.isActive || !system.activatedAt) {
      return 0;
    }
    return Date.now() - system.activatedAt;
  }, [state.masterState.activeSystems]);

  return {
    activateFullAutonomy,
    deactivateFullAutonomy,
    activateSystem,
    deactivateSystem,
    updateSystemState,
    getSystemState,
    isSystemActive,
    addTask,
    updateTask,
    addSystemLog,
    updateMasterState,
    getRunningTime,
    getSystemRunningTime
  };
};