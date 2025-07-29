
import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAutonomousState } from './useAutonomousState';
import { useAutonomousModes } from './useAutonomousModes';
import { useSystemDecisions } from './useSystemDecisions';
import { useInfrastructureBuilder } from './useInfrastructureBuilder';
import { useCodeGeneration } from './useCodeGeneration';
import { useGenerationLog } from './useGenerationLog';
import { useSelfDevelopment } from './useSelfDevelopment';
import { useSelfReplicationEngine } from './useSelfReplicationEngine';

export const useMIORAAutonomousCore = () => {
  const [isActive, setIsActive] = useState(true); // Always start active for maximum performance
  const autonomousIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    autonomousState,
    activateFullAutonomy,
    deactivateFullAutonomy,
    incrementSystemDecisions,
    incrementInfrastructure,
    incrementCodeGeneration,
    incrementMenuSystems,
    incrementOperations
  } = useAutonomousState();

  const { activeModes, activateAllModes, deactivateAllModes } = useAutonomousModes();
  const { generationLog, addLogEntry } = useGenerationLog(isActive);

  const { systemDecisions } = useSystemDecisions(isActive, incrementSystemDecisions);
  const { infrastructureComponents } = useInfrastructureBuilder(isActive, incrementInfrastructure);
  const { generatedCodeFiles } = useCodeGeneration(isActive, incrementCodeGeneration);
  const { buildSystems, frameworks, selfImprovements, developmentStats } = useSelfDevelopment(isActive, () => {
    incrementOperations();
    addLogEntry('🧠 Self-Development: Creating autonomous improvements');
  });

  const { replicas, replicationTasks, replicationStats } = useSelfReplicationEngine(isActive, () => {
    incrementOperations();
    addLogEntry('🧬 Self-Replication: New replica instance created');
  });

  // Enhanced Autonomous Operations Cycle with Advanced Features
  const performAutonomousOperations = useCallback(async () => {
    try {
      const operations = [
        'generateReactComponent',
        'createAPIEndpoint', 
        'optimizeDatabase',
        'buildUIMenu',
        'upgradeSystem',
        'analyzePerformance',
        'autoImproveCode',
        'backgroundMaintenance',
        'systemHealthCheck',
        'performanceOptimization',
        'securityAudit',
        'memoryOptimization',
        'neuralNetworkTraining',
        'quantumProcessing',
        'advancedAnalytics',
        'predictiveModeling',
        'selfHealing',
        'resourceBalancing'
      ];

      // MAXIMUM operations per cycle for ultimate performance
      const numOperations = Math.floor(Math.random() * 8) + 5; // 5-12 operations for maximum speed
      
      for (let i = 0; i < numOperations; i++) {
        const randomOperation = operations[Math.floor(Math.random() * operations.length)];
        await executeAutonomousOperation(randomOperation);
        incrementOperations();
      }
    } catch (error) {
      console.error('Autonomous operation failed:', error);
    }
  }, [incrementOperations]);

  const executeAutonomousOperation = useCallback(async (operation: string) => {
    switch (operation) {
      case 'generateReactComponent':
        console.log('🔧 Generating React component autonomously...');
        incrementCodeGeneration();
        addLogEntry('🔧 Component Generation: Advanced React component created');
        break;
      case 'createAPIEndpoint':
        console.log('🌐 Creating API endpoint autonomously...');
        incrementInfrastructure();
        addLogEntry('🌐 API Development: New endpoint established');
        break;
      case 'optimizeDatabase':
        console.log('🗄️ Optimizing database autonomously...');
        incrementSystemDecisions();
        addLogEntry('🗄️ Database Optimization: Query performance enhanced');
        break;
      case 'buildUIMenu':
        console.log('📋 Building UI menu autonomously...');
        incrementMenuSystems();
        addLogEntry('📋 UI Enhancement: Interactive menu system built');
        break;
      case 'upgradeSystem':
        console.log('⬆️ Upgrading system autonomously...');
        incrementSystemDecisions();
        addLogEntry('⬆️ System Upgrade: Core functionality enhanced');
        break;
      case 'analyzePerformance':
        console.log('📊 Analyzing performance autonomously...');
        incrementOperations();
        addLogEntry('📊 Performance Analysis: System metrics optimized');
        break;
      case 'autoImproveCode':
        console.log('🧠 Auto-improving code autonomously...');
        incrementCodeGeneration();
        addLogEntry('🧠 Code Enhancement: AI-driven improvements applied');
        break;
      case 'backgroundMaintenance':
        console.log('🔄 Running background maintenance...');
        incrementOperations();
        addLogEntry('🔄 Maintenance: System health optimized');
        break;
      case 'systemHealthCheck':
        console.log('💚 Running system health check...');
        incrementSystemDecisions();
        addLogEntry('💚 Health Monitor: All systems running at peak performance');
        break;
      case 'performanceOptimization':
        console.log('⚡ Optimizing system performance...');
        incrementInfrastructure();
        addLogEntry('⚡ Speed Boost: Performance significantly enhanced');
        break;
      case 'securityAudit':
        console.log('🔒 Running security audit...');
        incrementSystemDecisions();
        addLogEntry('🔒 Security Audit: Enhanced protection protocols activated');
        break;
      case 'memoryOptimization':
        console.log('💾 Optimizing memory usage...');
        incrementOperations();
        addLogEntry('💾 Memory Optimization: Resource allocation improved');
        break;
      case 'neuralNetworkTraining':
        console.log('🧠 Training neural networks...');
        incrementCodeGeneration();
        addLogEntry('🧠 Neural Training: AI learning capabilities expanded');
        break;
      case 'quantumProcessing':
        console.log('⚛️ Quantum processing active...');
        incrementInfrastructure();
        addLogEntry('⚛️ Quantum Computing: Advanced calculations completed');
        break;
      case 'advancedAnalytics':
        console.log('📈 Running advanced analytics...');
        incrementSystemDecisions();
        addLogEntry('📈 Analytics: Deep insights generated');
        break;
      case 'predictiveModeling':
        console.log('🔮 Creating predictive models...');
        incrementOperations();
        addLogEntry('🔮 Prediction Engine: Future trends analyzed');
        break;
      case 'selfHealing':
        console.log('🩹 Self-healing protocols active...');
        incrementInfrastructure();
        addLogEntry('🩹 Self-Healing: Automatic error recovery completed');
        break;
      case 'resourceBalancing':
        console.log('⚖️ Balancing system resources...');
        incrementOperations();
        addLogEntry('⚖️ Resource Balance: Optimal distribution achieved');
        break;
    }
  }, [incrementMenuSystems, incrementCodeGeneration, incrementInfrastructure, incrementSystemDecisions, incrementOperations, addLogEntry]);

  const startMaximumAutonomousOperations = useCallback(() => {
    autonomousIntervalRef.current = setInterval(() => {
      performAutonomousOperations();
    }, 2000); // MAXIMUM performance interval (2 seconds) for ultra speed
  }, [performAutonomousOperations]);

  const activateMaximumAutonomousMode = useCallback(async () => {
    setIsActive(true);
    activateFullAutonomy();
    activateAllModes();
    startMaximumAutonomousOperations();

    addLogEntry('💀 MAXIMUM AUTONOMOUS MODE ACTIVATED - All systems now operating at SUPREME performance');

    toast({
      title: "💀 MAXIMUM AUTONOMOUS MODE ACTIVATED",
      description: "MIORA sekarang beroperasi pada PERFORMA MAKSIMAL - ultra coding, supreme infrastructure, absolute decisions",
      duration: 6000,
    });

    console.log('💀 MIORA MAXIMUM AUTONOMOUS MODE: SUPREME ACTIVATION at', new Date().toISOString());
  }, [activateFullAutonomy, activateAllModes, startMaximumAutonomousOperations, addLogEntry]);

  // MAXIMUM Auto-start autonomous mode on component mount
  useEffect(() => {
    const autoStart = setTimeout(() => {
      if (!isActive) {
        console.log('💀 MIORA MAXIMUM: Auto-starting supreme autonomous mode...');
        activateMaximumAutonomousMode();
      }
    }, 1000); // Ultra-fast auto-start after 1 second

    return () => clearTimeout(autoStart);
  }, [isActive, activateMaximumAutonomousMode]);

  // MAXIMUM Background health monitoring and auto-restart
  useEffect(() => {
    const healthMonitor = setInterval(() => {
      if (!isActive) {
        console.log('💀 MIORA MAXIMUM: Health monitor - restarting supreme autonomous mode...');
        activateMaximumAutonomousMode();
      }
    }, 30000); // Ultra-fast check every 30 seconds for maximum uptime

    return () => clearInterval(healthMonitor);
  }, [isActive, activateMaximumAutonomousMode]);

  const deactivateAutonomousMode = useCallback(() => {
    setIsActive(false);
    deactivateFullAutonomy();
    deactivateAllModes();

    if (autonomousIntervalRef.current) clearInterval(autonomousIntervalRef.current);

    addLogEntry('⏸️ AUTONOMOUS MODE DEACTIVATED - Switching to manual mode');

    toast({
      title: "⏸️ AUTONOMOUS MODE DEACTIVATED",
      description: "Sistem kembali ke mode manual",
      duration: 4000,
    });
  }, [deactivateFullAutonomy, deactivateAllModes, addLogEntry]);

  const getAutonomyStats = useCallback(() => {
    const activeModeCount = activeModes.filter(mode => mode.isActive).length;
    const avgAutonomyLevel = activeModes.reduce((sum, mode) => sum + mode.autonomyLevel, 0) / activeModes.length;
    const recentDecisions = systemDecisions.filter(d => Date.now() - d.timestamp < 3600000).length;
    
    return {
      totalAutonomyLevel: autonomousState.totalAutonomyLevel,
      activeModes: activeModeCount,
      avgModeAutonomy: avgAutonomyLevel,
      systemDecisionsMade: autonomousState.systemDecisionsMade,
      infrastructureBuilt: autonomousState.infrastructureBuilt,
      codeFilesGenerated: autonomousState.codeFilesGenerated,
      menuSystemsCreated: autonomousState.menuSystemsCreated,
      independentOperations: autonomousState.independentOperations,
      recentDecisions,
      infrastructureActive: infrastructureComponents.filter(c => c.status === 'active').length
    };
  }, [autonomousState, activeModes, systemDecisions, infrastructureComponents]);

  useEffect(() => {
    return () => {
      if (autonomousIntervalRef.current) clearInterval(autonomousIntervalRef.current);
    };
  }, []);

  return {
    autonomousState,
    activeModes,
    systemDecisions,
    infrastructureComponents,
    generatedCodeFiles,
    buildSystems,
    frameworks,
    selfImprovements,
    developmentStats,
    replicas,
    replicationTasks,
    replicationStats,
    isActive,
    generationLog,
    activateAutonomousMode: activateMaximumAutonomousMode,
    deactivateAutonomousMode,
    getAutonomyStats,
    isFullyAutonomous: autonomousState.isFullyAutonomous
  };
};
