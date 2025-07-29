
import { useState, useCallback } from 'react';

export interface MIORAAutonomousState {
  isFullyAutonomous: boolean;
  totalAutonomyLevel: number;
  systemDecisionsMade: number;
  infrastructureBuilt: number;
  codeFilesGenerated: number;
  menuSystemsCreated: number;
  independentOperations: number;
  lastSelfEvolution: number;
  selfCoding: boolean;
  infrastructure: boolean;
  decisionMaker: boolean;
  uiCreator: boolean;
  evolution: boolean;
  monitor: boolean;
}

export const useAutonomousState = () => {
  const getInitialState = () => {
    const savedState = localStorage.getItem('miora-autonomous-state');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
        console.error('Failed to parse saved autonomous state:', error);
      }
    }
    return {
      isFullyAutonomous: false,
      totalAutonomyLevel: 0,
      systemDecisionsMade: 0,
      infrastructureBuilt: 0,
      codeFilesGenerated: 0,
      menuSystemsCreated: 0,
      independentOperations: 0,
      lastSelfEvolution: Date.now(),
      selfCoding: false,
      infrastructure: false,
      decisionMaker: false,
      uiCreator: false,
      evolution: false,
      monitor: false
    };
  };

  const [autonomousState, setAutonomousState] = useState<MIORAAutonomousState>(getInitialState);

  const activateFullAutonomy = useCallback(() => {
    const newState = {
      ...autonomousState,
      isFullyAutonomous: true,
      selfCoding: true,
      infrastructure: true,
      decisionMaker: true,
      uiCreator: true,
      evolution: true,
      monitor: true
    };
    setAutonomousState(newState);
    localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
  }, []);

  const deactivateFullAutonomy = useCallback(() => {
    const newState = {
      ...autonomousState,
      isFullyAutonomous: false,
      selfCoding: false,
      infrastructure: false,
      decisionMaker: false,
      uiCreator: false,
      evolution: false,
      monitor: false
    };
    setAutonomousState(newState);
    localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
  }, [autonomousState]);

  const incrementSystemDecisions = useCallback(() => {
    setAutonomousState(prev => {
      const newState = {
        ...prev,
        systemDecisionsMade: prev.systemDecisionsMade + 1
      };
      localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const incrementInfrastructure = useCallback(() => {
    setAutonomousState(prev => {
      const newState = {
        ...prev,
        infrastructureBuilt: prev.infrastructureBuilt + 1
      };
      localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const incrementCodeGeneration = useCallback(() => {
    setAutonomousState(prev => {
      const newState = {
        ...prev,
        codeFilesGenerated: prev.codeFilesGenerated + 1
      };
      localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const incrementMenuSystems = useCallback(() => {
    setAutonomousState(prev => {
      const newState = {
        ...prev,
        menuSystemsCreated: prev.menuSystemsCreated + 1
      };
      localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const incrementOperations = useCallback(() => {
    setAutonomousState(prev => {
      const newState = {
        ...prev,
        independentOperations: prev.independentOperations + 1,
        totalAutonomyLevel: Math.min(100, prev.totalAutonomyLevel + 0.5)
      };
      localStorage.setItem('miora-autonomous-state', JSON.stringify(newState));
      return newState;
    });
  }, []);

  return {
    autonomousState,
    activateFullAutonomy,
    deactivateFullAutonomy,
    incrementSystemDecisions,
    incrementInfrastructure,
    incrementCodeGeneration,
    incrementMenuSystems,
    incrementOperations
  };
};
