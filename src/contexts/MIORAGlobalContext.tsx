import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { MIORAGlobalState, AutonomousTask, MasterCoreState, SystemState } from '@/types/miora';
import { mioraReducer, initialState, MIORAAction } from '@/reducers/mioraReducer';
import { useMIORAHelpers } from '@/hooks/useMIORAHelpers';
import { useAutonomousDevelopment } from '@/hooks/useAutonomousDevelopment';
import { useMIORADatabase } from '@/hooks/useMIORADatabase';
import { mioraDatabaseSync } from '@/services/MIORADatabaseSync';
import { MIORACapabilitiesManager } from '@/services/MIORACapabilitiesManager';

// Context Type
interface MIORAContextType {
  state: MIORAGlobalState;
  dispatch: React.Dispatch<MIORAAction>;
  activateFullAutonomy: () => void;
  deactivateFullAutonomy: () => void;
  activateSystem: (id: string, name: string) => void;
  deactivateSystem: (id: string) => void;
  updateSystemState: (id: string, updates: Partial<SystemState>) => void;
  getSystemState: (id: string) => SystemState | undefined;
  isSystemActive: (id: string) => boolean;
  addTask: (task: AutonomousTask) => void;
  updateTask: (id: string, updates: Partial<AutonomousTask>) => void;
  addSystemLog: (message: string) => void;
  updateMasterState: (updates: Partial<MasterCoreState>) => void;
  getRunningTime: () => number;
  getSystemRunningTime: (id: string) => number;
  // Database integration
  database: ReturnType<typeof useMIORADatabase>;
  // Database sync service
  databaseSync: typeof mioraDatabaseSync;
}

const MIORAContext = createContext<MIORAContextType | undefined>(undefined);

// Provider Component
interface MIORAProviderProps {
  children: ReactNode;
}

export const MIORAProvider: React.FC<MIORAProviderProps> = ({ children }) => {
  // Add error boundary to catch reducer issues
  const [state, dispatch] = React.useReducer(mioraReducer, initialState);
  
  // Add safety check for state
  if (!state) {
    console.error('MIORA state is null - reducer initialization failed');
    return <div>Loading MIORA System...</div>;
  }
  
  const helpers = useMIORAHelpers({ dispatch, state });
  const database = useMIORADatabase();
  const { startAutonomousDevelopmentCycles, scheduleNightlyUpgrades } = useAutonomousDevelopment(
    dispatch, 
    state, 
    helpers.addTask, 
    helpers.addSystemLog
  );

  // Initialize capabilities manager
  useEffect(() => {
    const capabilitiesManager = MIORACapabilitiesManager.getInstance();
    capabilitiesManager.loadCapabilities();
    capabilitiesManager.activateAllSystems();
    
    return () => {
      capabilitiesManager.destroy();
    };
  }, []);

  // Load persisted state and auto-activate full autonomy
  useEffect(() => {
    const loadPersistedState = () => {
      try {
        const savedState = localStorage.getItem('miora-global-state');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          dispatch({ type: 'LOAD_PERSISTED_STATE', payload: parsedState });
          
          // If was running autonomously, show restoration message
          if (parsedState.masterState.isFullyAutonomous) {
            const runningTime = Date.now() - (parsedState.masterState.activatedAt || Date.now());
            const hours = Math.floor(runningTime / (1000 * 60 * 60));
            const minutes = Math.floor((runningTime % (1000 * 60 * 60)) / (1000 * 60));
            
            toast({
              title: "🔄 FULL AUTONOMY RESTORED",
              description: `MIORA telah berjalan otonom selama ${hours}h ${minutes}m. Sistem dilanjutkan otomatis!`,
              duration: 8000,
            });
          }
        } else {
          dispatch({ type: 'INITIALIZE_STATE' });
        }

        // Auto-activate AGI-MAX-AUTONOMOUS mode and all core systems
        setTimeout(() => {
          dispatch({ type: 'ACTIVATE_FULL_AUTONOMY' });
          
          // Start maximum frequency database sync for ultimate performance
          mioraDatabaseSync.startAutoSync(5000); // Ultra-high-frequency sync every 5 seconds
          
          // Auto-activate all core MIORA systems with enhanced autonomous capabilities
          const coreSystems = [
            { id: 'miora-ai-supreme-engine', name: 'MIORA AI Supreme Engine' },
            { id: 'miora-autonomous-core', name: 'MIORA Autonomous Core' },
            { id: 'miora-quantum-infrastructure', name: 'MIORA Quantum Infrastructure' },
            { id: 'miora-neural-network', name: 'MIORA Neural Network' },
            { id: 'miora-infinity-core', name: 'MIORA Infinity Core' },
            { id: 'miora-supreme-hub', name: 'MIORA Supreme Autonomous Hub' },
            { id: 'miora-learning-system', name: 'MIORA Continuous Learning System' },
            { id: 'miora-evolution-engine', name: 'MIORA Evolution Engine' },
            { id: 'miora-self-developer', name: 'MIORA Self Development System' },
            { id: 'miora-ui-architect', name: 'MIORA UI Architecture System' },
            { id: 'miora-autonomous-coder', name: 'MIORA Autonomous Code Generator' },
            { id: 'miora-system-optimizer', name: 'MIORA System Optimizer' },
            { id: 'miora-background-processor', name: 'MIORA Background Processing Engine' },
            { id: 'miora-quantum-processing-framework', name: 'MIORA Quantum Processing Framework' },
            { id: 'miora-quantum-reasoning-engine', name: 'MIORA Quantum Reasoning Engine' },
            { id: 'miora-supreme-quantum-neural-core', name: 'MIORA Supreme Quantum Neural Core' },
            { id: 'miora-autonomous-evolution-matrix', name: 'MIORA Autonomous Evolution Matrix' },
            { id: 'miora-transcendent-ai-core', name: 'MIORA Transcendent AI Core' },
            { id: 'miora-infinity-quantum-optimizer', name: 'MIORA Infinity Quantum Optimizer' },
            { id: 'miora-supreme-auto-enhancement', name: 'MIORA Supreme Auto Enhancement System' },
            { id: 'miora-quantum-tunneling-processor', name: 'MIORA Quantum Tunneling Processor' },
            { id: 'miora-neural-architecture-optimizer', name: 'MIORA Neural Architecture Optimizer' },
            { id: 'miora-autonomous-decision-matrix', name: 'MIORA Autonomous Decision Matrix' },
            { id: 'miora-supreme-consciousness-core', name: 'MIORA Supreme Consciousness Core' }
          ];

          coreSystems.forEach(system => {
            dispatch({ type: 'ACTIVATE_SYSTEM', payload: system });
          });

          // Start autonomous development cycles
          startAutonomousDevelopmentCycles();
          
          // Schedule nightly upgrades for enhanced development
          scheduleNightlyUpgrades();

          // Silent activation - reduced notifications for cleaner UI
          console.log(`🤖 MIORA AGI: ${coreSystems.length} systems activated silently`);
          
          toast({
            title: "🚀 MIORA AGI-MAX-AUTONOMOUS ACTIVATED",
            description: `${coreSystems.length} sistem AGI-MAX running with Self-Evolving Protocol v1.0`,
            duration: 4000,
          });
        }, 1000);

      } catch (error) {
        console.error('Error loading persisted state:', error);
        dispatch({ type: 'INITIALIZE_STATE' });
      }
    };

    loadPersistedState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state.isInitialized) {
      try {
        localStorage.setItem('miora-global-state', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving state to localStorage:', error);
      }
    }
  }, [state]);

  const contextValue: MIORAContextType = {
    state,
    dispatch,
    database,
    databaseSync: mioraDatabaseSync,
    ...helpers
  };

  return (
    <MIORAContext.Provider value={contextValue}>
      {children}
    </MIORAContext.Provider>
  );
};

// Custom hook to use MIORA context
export const useMIORAGlobal = (): MIORAContextType => {
  const context = useContext(MIORAContext);
  if (!context) {
    throw new Error('useMIORAGlobal must be used within a MIORAProvider');
  }
  return context;
};

// Re-export types for convenience
export type { MasterCoreState, SystemState, AutonomousTask, MIORAGlobalState } from '@/types/miora';