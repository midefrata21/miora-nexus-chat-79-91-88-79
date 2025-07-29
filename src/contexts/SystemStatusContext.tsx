import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// System status types
export interface SystemStatus {
  id: string;
  name: string;
  isActive: boolean;
  activatedAt: Date | null;
  lastActivity: Date | null;
  processCount: number;
  dataGenerated: number;
  status: 'inactive' | 'starting' | 'active' | 'processing' | 'error';
  logs: string[];
  metrics: {
    uptime: number;
    performance: number;
    reliability: number;
  };
}

// Available systems
export const SYSTEM_TYPES = {
  AUTONOMOUS_CORE: 'autonomous-core',
  AUTO_DEVELOP: 'auto-develop',
  INFRASTRUCTURE: 'infrastructure',
  SECURITY: 'security',
  VOICE_ENGINE: 'voice-engine',
  QUANTUM_ENGINE: 'quantum-engine',
  AI_SUPREME: 'ai-supreme',
  INFINITY_CORE: 'infinity-core',
  STRATEGIC_PLANNING: 'strategic-planning',
  SELF_MODIFICATION: 'self-modification',
  RESOURCE_ALLOCATION: 'resource-allocation',
  DECISION_ENGINE: 'decision-engine'
} as const;

type SystemType = typeof SYSTEM_TYPES[keyof typeof SYSTEM_TYPES];

// Actions
type SystemAction = 
  | { type: 'ACTIVATE_SYSTEM'; payload: { id: SystemType; name: string } }
  | { type: 'DEACTIVATE_SYSTEM'; payload: { id: SystemType } }
  | { type: 'UPDATE_ACTIVITY'; payload: { id: SystemType; activity: string } }
  | { type: 'UPDATE_METRICS'; payload: { id: SystemType; metrics: Partial<SystemStatus['metrics']> } }
  | { type: 'ADD_LOG'; payload: { id: SystemType; log: string } }
  | { type: 'INCREMENT_PROCESS'; payload: { id: SystemType } }
  | { type: 'LOAD_PERSISTED_STATE'; payload: { systems: Record<string, SystemStatus> } };

// Initial state
const initialState: Record<string, SystemStatus> = {};

// Reducer
function systemStatusReducer(state: Record<string, SystemStatus>, action: SystemAction): Record<string, SystemStatus> {
  const now = new Date();
  
  switch (action.type) {
    case 'ACTIVATE_SYSTEM': {
      const { id, name } = action.payload;
      return {
        ...state,
        [id]: {
          id,
          name,
          isActive: true,
          activatedAt: now,
          lastActivity: now,
          processCount: 0,
          dataGenerated: 0,
          status: 'starting',
          logs: [`System ${name} activated at ${now.toLocaleTimeString()}`],
          metrics: {
            uptime: 0,
            performance: 95,
            reliability: 98
          }
        }
      };
    }
    
    case 'DEACTIVATE_SYSTEM': {
      const { id } = action.payload;
      if (!state[id]) return state;
      
      return {
        ...state,
        [id]: {
          ...state[id],
          isActive: false,
          status: 'inactive',
          logs: [...state[id].logs, `System deactivated at ${now.toLocaleTimeString()}`]
        }
      };
    }
    
    case 'UPDATE_ACTIVITY': {
      const { id, activity } = action.payload;
      if (!state[id]) return state;
      
      return {
        ...state,
        [id]: {
          ...state[id],
          lastActivity: now,
          status: 'processing',
          logs: [...state[id].logs.slice(-9), `${now.toLocaleTimeString()}: ${activity}`]
        }
      };
    }
    
    case 'UPDATE_METRICS': {
      const { id, metrics } = action.payload;
      if (!state[id]) return state;
      
      return {
        ...state,
        [id]: {
          ...state[id],
          metrics: { ...state[id].metrics, ...metrics }
        }
      };
    }
    
    case 'ADD_LOG': {
      const { id, log } = action.payload;
      if (!state[id]) return state;
      
      return {
        ...state,
        [id]: {
          ...state[id],
          logs: [...state[id].logs.slice(-9), `${now.toLocaleTimeString()}: ${log}`],
          lastActivity: now
        }
      };
    }
    
    case 'INCREMENT_PROCESS': {
      const { id } = action.payload;
      if (!state[id]) return state;
      
      return {
        ...state,
        [id]: {
          ...state[id],
          processCount: state[id].processCount + 1,
          dataGenerated: state[id].dataGenerated + Math.floor(Math.random() * 100),
          lastActivity: now,
          status: 'active'
        }
      };
    }
    
    case 'LOAD_PERSISTED_STATE': {
      return action.payload.systems;
    }
    
    default:
      return state;
  }
}

// Context
interface SystemStatusContextType {
  systems: Record<string, SystemStatus>;
  activateSystem: (id: SystemType, name: string) => void;
  deactivateSystem: (id: SystemType) => void;
  updateActivity: (id: SystemType, activity: string) => void;
  updateMetrics: (id: SystemType, metrics: Partial<SystemStatus['metrics']>) => void;
  addLog: (id: SystemType, log: string) => void;
  getActiveSystemsCount: () => number;
  getTotalUptime: () => number;
}

const SystemStatusContext = createContext<SystemStatusContextType | undefined>(undefined);

// Provider
export const SystemStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [systems, dispatch] = useReducer(systemStatusReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const saved = localStorage.getItem('miora-systems-status');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const systems = Object.keys(parsed).reduce((acc, key) => {
          acc[key] = {
            ...parsed[key],
            activatedAt: parsed[key].activatedAt ? new Date(parsed[key].activatedAt) : null,
            lastActivity: parsed[key].lastActivity ? new Date(parsed[key].lastActivity) : null
          };
          return acc;
        }, {} as Record<string, SystemStatus>);
        
        dispatch({ type: 'LOAD_PERSISTED_STATE', payload: { systems } });
      } catch (error) {
        console.error('Failed to load persisted system status:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('miora-systems-status', JSON.stringify(systems));
  }, [systems]);

  // Background processes simulation
  useEffect(() => {
    const interval = setInterval(() => {
      Object.keys(systems).forEach(id => {
        const system = systems[id];
        if (system.isActive) {
          // Simulate background activity
          const activities = [
            'Processing autonomous tasks',
            'Analyzing system metrics',
            'Optimizing performance',
            'Updating configurations',
            'Monitoring security',
            'Generating reports',
            'Self-improving algorithms',
            'Processing data streams',
            'Executing strategic plans',
            'Managing resources'
          ];
          
          const randomActivity = activities[Math.floor(Math.random() * activities.length)];
          
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { id: id as SystemType, activity: randomActivity } });
          dispatch({ type: 'INCREMENT_PROCESS', payload: { id: id as SystemType } });
          
          // Update metrics occasionally
          if (Math.random() > 0.7) {
            const newMetrics = {
              uptime: Math.min(100, system.metrics.uptime + 1),
              performance: Math.max(85, Math.min(100, system.metrics.performance + (Math.random() - 0.5) * 2)),
              reliability: Math.max(90, Math.min(100, system.metrics.reliability + (Math.random() - 0.3) * 1))
            };
            dispatch({ type: 'UPDATE_METRICS', payload: { id: id as SystemType, metrics: newMetrics } });
          }
        }
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [systems]);

  const activateSystem = (id: SystemType, name: string) => {
    dispatch({ type: 'ACTIVATE_SYSTEM', payload: { id, name } });
  };

  const deactivateSystem = (id: SystemType) => {
    dispatch({ type: 'DEACTIVATE_SYSTEM', payload: { id } });
  };

  const updateActivity = (id: SystemType, activity: string) => {
    dispatch({ type: 'UPDATE_ACTIVITY', payload: { id, activity } });
  };

  const updateMetrics = (id: SystemType, metrics: Partial<SystemStatus['metrics']>) => {
    dispatch({ type: 'UPDATE_METRICS', payload: { id, metrics } });
  };

  const addLog = (id: SystemType, log: string) => {
    dispatch({ type: 'ADD_LOG', payload: { id, log } });
  };

  const getActiveSystemsCount = () => {
    return Object.values(systems).filter(system => system.isActive).length;
  };

  const getTotalUptime = () => {
    const activeSystems = Object.values(systems).filter(system => system.isActive);
    if (activeSystems.length === 0) return 0;
    return Math.round(activeSystems.reduce((sum, system) => sum + system.metrics.uptime, 0) / activeSystems.length);
  };

  return (
    <SystemStatusContext.Provider value={{
      systems,
      activateSystem,
      deactivateSystem,
      updateActivity,
      updateMetrics,
      addLog,
      getActiveSystemsCount,
      getTotalUptime
    }}>
      {children}
    </SystemStatusContext.Provider>
  );
};

// Hook
export const useSystemStatus = () => {
  const context = useContext(SystemStatusContext);
  if (context === undefined) {
    throw new Error('useSystemStatus must be used within a SystemStatusProvider');
  }
  return context;
};