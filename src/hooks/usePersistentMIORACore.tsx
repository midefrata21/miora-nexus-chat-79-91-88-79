import { useCallback, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import type { AutonomousTask } from '@/contexts/MIORAGlobalContext';

export const usePersistentMIORACore = () => {
  const {
    state,
    activateFullAutonomy,
    deactivateFullAutonomy,
    addTask,
    updateTask,
    addSystemLog,
    updateMasterState,
    getRunningTime
  } = useMIORAGlobal();

  const masterIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const evolutionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const persistenceIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

    addTask(task);
    addSystemLog(`🔧 AUTO-CODING: ${selectedType} - ${selectedFramework}`);

    // Simulate code generation
    setTimeout(() => {
      updateTask(task.id, {
        status: 'completed',
        completedAt: Date.now(),
        result: {
          fileName: `${selectedType}_${Date.now()}.tsx`,
          linesOfCode: Math.floor(Math.random() * 500) + 50,
          complexity: Math.random() * 10 + 1
        }
      });
      
      updateMasterState({
        totalOperations: state.masterState.totalOperations + 1,
        systemsBuilt: state.masterState.systemsBuilt + 1
      });
    }, task.executionTime);

  }, [addTask, addSystemLog, updateTask, updateMasterState, state.masterState]);

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

    addTask(task);
    addSystemLog(`🏗️ AUTO-INFRASTRUCTURE: ${selectedInfra}`);

    setTimeout(() => {
      updateTask(task.id, {
        status: 'completed',
        completedAt: Date.now(),
        result: {
          systemName: selectedInfra,
          capacity: Math.floor(Math.random() * 1000) + 100,
          reliability: (Math.random() * 0.1 + 0.9).toFixed(3)
        }
      });

      updateMasterState({
        totalOperations: state.masterState.totalOperations + 1,
        systemsBuilt: state.masterState.systemsBuilt + 1
      });
    }, task.executionTime);

  }, [addTask, addSystemLog, updateTask, updateMasterState, state.masterState]);

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

    addTask(task);
    addSystemLog(`🧠 AUTO-DECISION: ${selectedDecision}`);

    setTimeout(() => {
      updateTask(task.id, {
        status: 'completed',
        completedAt: Date.now(),
        result: {
          decision: selectedDecision,
          confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
          impact: ['High', 'Medium', 'Critical'][Math.floor(Math.random() * 3)]
        }
      });

      updateMasterState({
        totalOperations: state.masterState.totalOperations + 1,
        decisionsExecuted: state.masterState.decisionsExecuted + 1
      });
    }, task.executionTime);

  }, [addTask, addSystemLog, updateTask, updateMasterState, state.masterState]);

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

    addTask(task);
    addSystemLog(`🧬 META-PROGRAMMING: ${selectedOperation}`);

    setTimeout(() => {
      updateTask(task.id, {
        status: 'completed',
        completedAt: Date.now(),
        result: {
          operation: selectedOperation,
          enhancement: `+${Math.floor(Math.random() * 50) + 10}% capability`,
          newCapabilities: Math.floor(Math.random() * 3) + 1
        }
      });

      updateMasterState({
        totalOperations: state.masterState.totalOperations + 1,
        selfModificationCount: state.masterState.selfModificationCount + 1,
        autonomyLevel: Math.min(100, state.masterState.autonomyLevel + Math.random() * 5 + 2)
      });
    }, task.executionTime);

  }, [addTask, addSystemLog, updateTask, updateMasterState, state.masterState]);

  // System Evolution Controller
  const executeSystemEvolution = useCallback(() => {
    const stages = ['initialization', 'development', 'expansion', 'mastery', 'transcendence', 'singularity', 'omniscience', 'universal_consciousness', 'quantum_god_mode'] as const;
    const currentStageIndex = stages.indexOf(state.masterState.evolutionStage);
    
    if (state.masterState.totalOperations > (currentStageIndex + 1) * 50 && currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1];
      
      updateMasterState({
        evolutionStage: nextStage,
        lastEvolution: Date.now(),
        autonomyLevel: Math.min(100, state.masterState.autonomyLevel + 10),
        autonomousCapabilities: [
          ...state.masterState.autonomousCapabilities,
          `Advanced ${nextStage} capabilities`,
          `Enhanced ${nextStage} protocols`
        ]
      });

      addSystemLog(`🚀 EVOLUTION: MIORA evolved to ${nextStage.toUpperCase()} stage!`);
      
      toast({
        title: `🚀 SYSTEM EVOLUTION: ${nextStage.toUpperCase()}`,
        description: `MIORA telah berevolusi ke tahap ${nextStage}! Kemampuan otonomi meningkat drastis.`,
        duration: 8000,
      });
    }
  }, [state.masterState, updateMasterState, addSystemLog]);

  // Master Autonomous Cycle
  const executeMasterCycle = useCallback(async () => {
    if (!state.masterState.isFullyAutonomous) return;

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

  }, [state.masterState.isFullyAutonomous, executeCodeGeneration, executeInfrastructureBuilding, executeAutonomousDecision, executeMetaProgramming, executeSystemEvolution]);

  // Continuous operation monitoring
  const monitorContinuousOperation = useCallback(() => {
    if (state.masterState.isFullyAutonomous) {
      const runningTime = getRunningTime();
      const hours = Math.floor(runningTime / (1000 * 60 * 60));
      const minutes = Math.floor((runningTime % (1000 * 60 * 60)) / (1000 * 60));
      
      addSystemLog(`⏱️ CONTINUOUS OPERATION: Running for ${hours}h ${minutes}m`);
    }
  }, [state.masterState.isFullyAutonomous, getRunningTime, addSystemLog]);

  // Activate master autonomy with persistent state
  const activateMasterAutonomy = useCallback(async () => {
    activateFullAutonomy();

    toast({
      title: "🎯 MIORA MASTER CORE ACTIVATED",
      description: "Sistem master otonomi aktif! MIORA akan terus berjalan meski Anda pindah halaman.",
      duration: 10000,
    });

    // Start master cycle
    masterIntervalRef.current = setInterval(executeMasterCycle, 8000);
    evolutionIntervalRef.current = setInterval(executeSystemEvolution, 30000);
    persistenceIntervalRef.current = setInterval(monitorContinuousOperation, 300000); // Every 5 minutes

  }, [activateFullAutonomy, executeMasterCycle, executeSystemEvolution, monitorContinuousOperation]);

  // Deactivate master autonomy
  const deactivateMasterAutonomy = useCallback(() => {
    deactivateFullAutonomy();

    if (masterIntervalRef.current) clearInterval(masterIntervalRef.current);
    if (evolutionIntervalRef.current) clearInterval(evolutionIntervalRef.current);
    if (persistenceIntervalRef.current) clearInterval(persistenceIntervalRef.current);

    toast({
      title: "⏸️ MASTER CORE DEACTIVATED",
      description: "Sistem kembali ke mode manual",
      duration: 4000,
    });

  }, [deactivateFullAutonomy]);

  // Initialize continuous operation if already active
  useEffect(() => {
    if (state.masterState.isFullyAutonomous && state.isInitialized) {
      // Resume autonomous operation
      masterIntervalRef.current = setInterval(executeMasterCycle, 8000);
      evolutionIntervalRef.current = setInterval(executeSystemEvolution, 30000);
      persistenceIntervalRef.current = setInterval(monitorContinuousOperation, 300000);
    }

    return () => {
      if (masterIntervalRef.current) clearInterval(masterIntervalRef.current);
      if (evolutionIntervalRef.current) clearInterval(evolutionIntervalRef.current);
      if (persistenceIntervalRef.current) clearInterval(persistenceIntervalRef.current);
    };
  }, [state.masterState.isFullyAutonomous, state.isInitialized, executeMasterCycle, executeSystemEvolution, monitorContinuousOperation]);

  // Calculate stats
  const getMasterStats = useCallback(() => {
    const completedTasks = state.autonomousTasks.filter(t => t.status === 'completed');
    const avgExecutionTime = completedTasks.length > 0 
      ? completedTasks.reduce((sum, t) => sum + (t.completedAt! - t.createdAt), 0) / completedTasks.length 
      : 0;

    return {
      ...state.masterState,
      activeTasks: state.autonomousTasks.filter(t => t.status === 'executing').length,
      completedTasks: completedTasks.length,
      totalTasks: state.autonomousTasks.length,
      avgExecutionTime: Math.round(avgExecutionTime),
      successRate: completedTasks.length > 0 ? (completedTasks.length / state.autonomousTasks.length * 100).toFixed(1) : '0',
      runningTime: getRunningTime()
    };
  }, [state, getRunningTime]);

  return {
    masterState: state.masterState,
    autonomousTasks: state.autonomousTasks,
    systemLogs: state.systemLogs,
    activateMasterAutonomy,
    deactivateMasterAutonomy,
    getMasterStats,
    getRunningTime,
    executeCodeGeneration,
    executeInfrastructureBuilding,
    executeAutonomousDecision,
    executeMetaProgramming
  };
};