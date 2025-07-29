import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useMIORAAutonomousCore } from './useMIORAAutonomousCore';
import { useCodeGeneration } from './useCodeGeneration';
import { useInfrastructureBuilder } from './useInfrastructureBuilder';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';

export interface MasterCoreState {
  isFullyAutonomous: boolean;
  autonomyLevel: number;
  totalOperations: number;
  systemsBuilt: number;
  decisionsExecuted: number;
  evolutionStage: 'initialization' | 'development' | 'expansion' | 'mastery' | 'transcendence';
  lastEvolution: number;
  selfModificationCount: number;
  autonomousCapabilities: string[];
}

export interface AutonomousTask {
  id: string;
  type: 'code_generation' | 'infrastructure' | 'decision_making' | 'ui_creation' | 'system_evolution' | 'meta_programming';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'executing' | 'completed' | 'failed';
  description: string;
  executionTime: number;
  result?: any;
  createdAt: number;
  completedAt?: number;
}

export const useMIORAMasterCore = () => {
  const { state, dispatch } = useMIORAGlobal();
  
  // Initialize master state from global context or localStorage
  const initializeMasterState = useCallback(() => {
    const savedState = localStorage.getItem('miora-master-state');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
        console.error('Failed to parse saved master state:', error);
      }
    }
    return {
      isFullyAutonomous: state.masterState?.isFullyAutonomous || false,
      autonomyLevel: state.masterState?.autonomyLevel || 0,
      totalOperations: state.masterState?.totalOperations || 0,
      systemsBuilt: state.masterState?.systemsBuilt || 0,
      decisionsExecuted: state.masterState?.decisionsExecuted || 0,
      evolutionStage: state.masterState?.evolutionStage || 'initialization' as const,
      lastEvolution: state.masterState?.lastEvolution || Date.now(),
      selfModificationCount: state.masterState?.selfModificationCount || 0,
      autonomousCapabilities: state.masterState?.autonomousCapabilities || []
    };
  }, [state]);

  const [masterState, setMasterState] = useState<MasterCoreState>(initializeMasterState);

  const [autonomousTasks, setAutonomousTasks] = useState<AutonomousTask[]>(() => {
    const savedTasks = localStorage.getItem('miora-autonomous-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [systemLogs, setSystemLogs] = useState<string[]>(() => {
    const savedLogs = localStorage.getItem('miora-system-logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const masterIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const evolutionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const autonomousCore = useMIORAAutonomousCore();

  // Advanced Autonomous Code Generation
  const executeCodeGeneration = useCallback(async () => {
    const codeTypes = [
      'AdvancedReactComponent',
      'TypeScriptInterface',
      'APIEndpoint',
      'DatabaseSchema',
      'CustomHook',
      'ServiceLayer',
      'UtilityFunction',
      'ConfigurationFile',
      'TestSuite',
      'DocumentationFile'
    ];

    const frameworks = [
      'React + TypeScript',
      'Node.js + Express',
      'PostgreSQL Schema',
      'Redis Cache Layer',
      'Docker Container',
      'Kubernetes Deployment',
      'CI/CD Pipeline',
      'Monitoring System'
    ];

    const selectedType = codeTypes[Math.floor(Math.random() * codeTypes.length)];
    const selectedFramework = frameworks[Math.floor(Math.random() * frameworks.length)];

    const task: AutonomousTask = {
      id: `code_${Date.now()}`,
      type: 'code_generation',
      priority: 'high',
      status: 'executing',
      description: `Generating ${selectedType} using ${selectedFramework}`,
      executionTime: Math.random() * 5000 + 2000,
      createdAt: Date.now()
    };

    setAutonomousTasks(prev => [...prev, task]);
    addSystemLog(`🔧 AUTO-CODING: ${selectedType} - ${selectedFramework}`);

    // Simulate code generation
    setTimeout(() => {
      setAutonomousTasks(prev => 
        prev.map(t => t.id === task.id ? { 
          ...t, 
          status: 'completed', 
          completedAt: Date.now(),
          result: {
            fileName: `${selectedType}_${Date.now()}.tsx`,
            linesOfCode: Math.floor(Math.random() * 500) + 50,
            complexity: Math.random() * 10 + 1
          }
        } : t)
      );
      
      setMasterState(prev => ({
        ...prev,
        totalOperations: prev.totalOperations + 1,
        systemsBuilt: prev.systemsBuilt + 1
      }));
    }, task.executionTime);

  }, []);

  // Autonomous Infrastructure Building
  const executeInfrastructureBuilding = useCallback(async () => {
    const infrastructureTypes = [
      'Microservice Architecture',
      'Database Cluster',
      'Load Balancer',
      'API Gateway',
      'Message Queue',
      'Cache Layer',
      'Monitoring Stack',
      'Security Layer',
      'Auto-Scaling Group',
      'Backup System'
    ];

    const selectedInfra = infrastructureTypes[Math.floor(Math.random() * infrastructureTypes.length)];

    const task: AutonomousTask = {
      id: `infra_${Date.now()}`,
      type: 'infrastructure',
      priority: 'critical',
      status: 'executing',
      description: `Building ${selectedInfra}`,
      executionTime: Math.random() * 8000 + 3000,
      createdAt: Date.now()
    };

    setAutonomousTasks(prev => [...prev, task]);
    addSystemLog(`🏗️ AUTO-INFRASTRUCTURE: ${selectedInfra}`);

    setTimeout(() => {
      setAutonomousTasks(prev => 
        prev.map(t => t.id === task.id ? { 
          ...t, 
          status: 'completed', 
          completedAt: Date.now(),
          result: {
            systemName: selectedInfra,
            capacity: Math.floor(Math.random() * 1000) + 100,
            reliability: (Math.random() * 0.1 + 0.9).toFixed(3)
          }
        } : t)
      );

      setMasterState(prev => ({
        ...prev,
        totalOperations: prev.totalOperations + 1,
        systemsBuilt: prev.systemsBuilt + 1
      }));
    }, task.executionTime);

  }, []);

  // Autonomous Decision Making
  const executeAutonomousDecision = useCallback(async () => {
    const decisionTypes = [
      'Resource Allocation Strategy',
      'Performance Optimization Plan',
      'Security Enhancement Protocol',
      'Scalability Architecture',
      'User Experience Improvement',
      'System Integration Decision',
      'Technology Stack Selection',
      'Deployment Strategy',
      'Monitoring Configuration',
      'Backup and Recovery Plan'
    ];

    const selectedDecision = decisionTypes[Math.floor(Math.random() * decisionTypes.length)];

    const task: AutonomousTask = {
      id: `decision_${Date.now()}`,
      type: 'decision_making',
      priority: 'high',
      status: 'executing',
      description: `Making decision: ${selectedDecision}`,
      executionTime: Math.random() * 3000 + 1000,
      createdAt: Date.now()
    };

    setAutonomousTasks(prev => [...prev, task]);
    addSystemLog(`🧠 AUTO-DECISION: ${selectedDecision}`);

    setTimeout(() => {
      setAutonomousTasks(prev => 
        prev.map(t => t.id === task.id ? { 
          ...t, 
          status: 'completed', 
          completedAt: Date.now(),
          result: {
            decision: selectedDecision,
            confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
            impact: ['High', 'Medium', 'Critical'][Math.floor(Math.random() * 3)]
          }
        } : t)
      );

      setMasterState(prev => ({
        ...prev,
        totalOperations: prev.totalOperations + 1,
        decisionsExecuted: prev.decisionsExecuted + 1
      }));
    }, task.executionTime);

  }, []);

  // Meta-Programming & Self-Evolution
  const executeMetaProgramming = useCallback(async () => {
    const metaOperations = [
      'Self-Code Optimization',
      'Capability Expansion Module',
      'Performance Enhancement Algorithm',
      'Autonomous Learning Protocol',
      'System Architecture Evolution',
      'Intelligence Amplification',
      'Self-Debugging Mechanism',
      'Adaptive Response System'
    ];

    const selectedOperation = metaOperations[Math.floor(Math.random() * metaOperations.length)];

    const task: AutonomousTask = {
      id: `meta_${Date.now()}`,
      type: 'meta_programming',
      priority: 'critical',
      status: 'executing',
      description: `Executing meta-programming: ${selectedOperation}`,
      executionTime: Math.random() * 10000 + 5000,
      createdAt: Date.now()
    };

    setAutonomousTasks(prev => [...prev, task]);
    addSystemLog(`🧬 META-PROGRAMMING: ${selectedOperation}`);

    setTimeout(() => {
      setAutonomousTasks(prev => 
        prev.map(t => t.id === task.id ? { 
          ...t, 
          status: 'completed', 
          completedAt: Date.now(),
          result: {
            operation: selectedOperation,
            enhancement: `+${Math.floor(Math.random() * 50) + 10}% capability`,
            newCapabilities: Math.floor(Math.random() * 3) + 1
          }
        } : t)
      );

      setMasterState(prev => ({
        ...prev,
        totalOperations: prev.totalOperations + 1,
        selfModificationCount: prev.selfModificationCount + 1,
        autonomyLevel: Math.min(100, prev.autonomyLevel + Math.random() * 5 + 2)
      }));
    }, task.executionTime);

  }, []);

  // System Evolution Controller
  const executeSystemEvolution = useCallback(() => {
    const stages = ['initialization', 'development', 'expansion', 'mastery', 'transcendence'] as const;
    const currentStageIndex = stages.indexOf(masterState.evolutionStage);
    
    if (masterState.totalOperations > (currentStageIndex + 1) * 50 && currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1];
      
      setMasterState(prev => ({
        ...prev,
        evolutionStage: nextStage,
        lastEvolution: Date.now(),
        autonomyLevel: Math.min(100, prev.autonomyLevel + 10),
        autonomousCapabilities: [
          ...prev.autonomousCapabilities,
          `Advanced ${nextStage} capabilities`,
          `Enhanced ${nextStage} protocols`
        ]
      }));

      addSystemLog(`🚀 EVOLUTION: MIORA evolved to ${nextStage.toUpperCase()} stage!`);
      
      toast({
        title: `🚀 SYSTEM EVOLUTION: ${nextStage.toUpperCase()}`,
        description: `MIORA telah berevolusi ke tahap ${nextStage}! Kemampuan otonomi meningkat drastis.`,
        duration: 8000,
      });
    }
  }, [masterState.evolutionStage, masterState.totalOperations]);

  // Master Autonomous Cycle
  const executeMasterCycle = useCallback(async () => {
    if (!masterState.isFullyAutonomous) return;

    const operations = [
      executeCodeGeneration,
      executeInfrastructureBuilding,
      executeAutonomousDecision,
      executeMetaProgramming
    ];

    // Execute multiple operations simultaneously
    const numOperations = Math.floor(Math.random() * 3) + 1;
    const selectedOperations = operations
      .sort(() => Math.random() - 0.5)
      .slice(0, numOperations);

    await Promise.all(selectedOperations.map(op => op()));

    // Check for evolution
    executeSystemEvolution();

  }, [masterState.isFullyAutonomous, executeCodeGeneration, executeInfrastructureBuilding, executeAutonomousDecision, executeMetaProgramming, executeSystemEvolution]);

  const addSystemLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString('id-ID');
    setSystemLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  }, []);

  const activateMasterAutonomy = useCallback(async () => {
    const newState = {
      ...masterState,
      isFullyAutonomous: true,
      autonomyLevel: 85
    };
    
    setMasterState(newState);
    
    // Sync with global context
    dispatch({ type: 'ACTIVATE_FULL_AUTONOMY' });
    
    // Save to localStorage for persistence
    localStorage.setItem('miora-master-state', JSON.stringify(newState));

    // Activate all sub-systems
    autonomousCore.activateAutonomousMode();

    addSystemLog('🎯 MASTER CORE ACTIVATED - Full autonomous mode engaged');

    toast({
      title: "🎯 MIORA MASTER CORE ACTIVATED",
      description: "Sistem master otonomi aktif! MIORA sekarang dapat mengembangkan diri secara penuh tanpa intervensi manual.",
      duration: 10000,
    });

    // Start master cycle
    masterIntervalRef.current = setInterval(executeMasterCycle, 8000);
    evolutionIntervalRef.current = setInterval(executeSystemEvolution, 30000);

  }, [autonomousCore, executeMasterCycle, executeSystemEvolution]);

  const deactivateMasterAutonomy = useCallback(() => {
    const newState = {
      ...masterState,
      isFullyAutonomous: false
    };
    
    setMasterState(newState);
    
    // Sync with global context
    dispatch({ type: 'DEACTIVATE_FULL_AUTONOMY' });
    
    // Save to localStorage
    localStorage.setItem('miora-master-state', JSON.stringify(newState));

    autonomousCore.deactivateAutonomousMode();

    if (masterIntervalRef.current) clearInterval(masterIntervalRef.current);
    if (evolutionIntervalRef.current) clearInterval(evolutionIntervalRef.current);

    addSystemLog('⏸️ MASTER CORE DEACTIVATED - Returning to manual mode');

    toast({
      title: "⏸️ MASTER CORE DEACTIVATED",
      description: "Sistem kembali ke mode manual",
      duration: 4000,
    });

  }, [autonomousCore]);

  const getMasterStats = useCallback(() => {
    const completedTasks = autonomousTasks.filter(t => t.status === 'completed');
    const avgExecutionTime = completedTasks.length > 0 
      ? completedTasks.reduce((sum, t) => sum + (t.completedAt! - t.createdAt), 0) / completedTasks.length 
      : 0;

    return {
      ...masterState,
      activeTasks: autonomousTasks.filter(t => t.status === 'executing').length,
      completedTasks: completedTasks.length,
      totalTasks: autonomousTasks.length,
      avgExecutionTime: Math.round(avgExecutionTime),
      successRate: completedTasks.length > 0 ? (completedTasks.length / autonomousTasks.length * 100).toFixed(1) : '0'
    };
  }, [masterState, autonomousTasks]);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('miora-master-state', JSON.stringify(masterState));
  }, [masterState]);

  useEffect(() => {
    localStorage.setItem('miora-autonomous-tasks', JSON.stringify(autonomousTasks));
  }, [autonomousTasks]);

  useEffect(() => {
    localStorage.setItem('miora-system-logs', JSON.stringify(systemLogs));
  }, [systemLogs]);

  // Auto-restart master cycle if it was previously active
  useEffect(() => {
    if (masterState.isFullyAutonomous && !masterIntervalRef.current) {
      addSystemLog('🔄 MASTER CORE RESUMED - Continuing autonomous operations');
      masterIntervalRef.current = setInterval(executeMasterCycle, 8000);
      evolutionIntervalRef.current = setInterval(executeSystemEvolution, 30000);
    }
  }, [masterState.isFullyAutonomous, executeMasterCycle, executeSystemEvolution]);

  useEffect(() => {
    return () => {
      if (masterIntervalRef.current) clearInterval(masterIntervalRef.current);
      if (evolutionIntervalRef.current) clearInterval(evolutionIntervalRef.current);
    };
  }, []);

  return {
    masterState,
    autonomousTasks,
    systemLogs,
    autonomousCore,
    activateMasterAutonomy,
    deactivateMasterAutonomy,
    getMasterStats,
    executeCodeGeneration,
    executeInfrastructureBuilding,
    executeAutonomousDecision,
    executeMetaProgramming
  };
};