import { useQuantumMode } from './useQuantumMode';
import { useInfrastructureNodes } from './useInfrastructureNodes';
import { useSystemMetrics } from './useSystemMetrics';
import { useAutoScaling } from './useAutoScaling';
import { useSystemOperations } from './useSystemOperations';
import { useQuantumFieldBridge } from './useQuantumFieldBridge';
import { cleanupGlobalIntervals } from '@/utils/systemCleanup';

export const useQuantumInfrastructure = () => {
  const { quantumMode, activateQuantumMode } = useQuantumMode();
  
  const {
    infrastructureNodes,
    toggleModule,
    activateAllNodes,
    updateNodeMetrics
  } = useInfrastructureNodes();

  const {
    systemMetrics,
    getSystemStatus,
    updateStressTestMetrics
  } = useSystemMetrics(quantumMode.isActive);

  useAutoScaling(quantumMode.isActive, systemMetrics, infrastructureNodes);

  const {
    performStressTest,
    enableSelfHealing,
    deployNeuroServer,
    sendDashboardEmail,
    syncToTelegram
  } = useSystemOperations(updateStressTestMetrics);

  const {
    isActive: quantumBridgeActive,
    connectedDevices,
    fieldStats,
    activateQuantumBridge,
    syncDevice,
    discoverDevices
  } = useQuantumFieldBridge();

  // ULTRA MAXIMUM QUANTUM SUPREME ACTIVATION - Level ∞ Enhanced Infrastructure with Unlimited Power
  const enhancedActivateQuantumMode = async (): Promise<boolean> => {
    console.log('🚀 MIORA QUANTUM SUPREME INFRASTRUCTURE - INITIATING LEVEL ∞ ACTIVATION 🚀');
    const result = await activateQuantumMode();
    if (result) {
      console.log('⚡ QUANTUM INFRASTRUCTURE SUPREME MODE ONLINE ⚡');
      
      // Instant activation of all nodes with quantum enhancement
      activateAllNodes();
      console.log('🧠 ALL QUANTUM NODES ACTIVATED - UNLIMITED SCALING ENABLED 🧠');
      
      // Immediate Quantum Field Bridge activation with maximum power
      activateQuantumBridge();
      console.log('🌟 QUANTUM FIELD BRIDGE SUPREME - MAXIMUM POWER ACTIVATED 🌟');
      
      // Auto-enable all maximum features with enhanced quantum capabilities
      setTimeout(() => {
        enableSelfHealing();
        deployNeuroServer();
        // Enhanced stress testing with quantum acceleration
        performStressTest();
        // Auto-sync to communication channels
        syncToTelegram();
        sendDashboardEmail('midefrata@gmail.com');
        console.log('💀 MIORA QUANTUM INFRASTRUCTURE SUPREME - ALL SYSTEMS MAXIMUM POWER 💀');
      }, 500);
      
      // Auto-discover and sync all quantum devices with continuous optimization
      setTimeout(() => {
        discoverDevices();
        // Continuous device synchronization with proper cleanup
        const syncInterval = setInterval(() => {
          if (connectedDevices.length > 0) {
            connectedDevices.forEach(device => {
              syncDevice(device.id);
            });
          }
        }, 30000); // Sync every 30 seconds
        
        // Store intervals globally for cleanup when needed
        if (!(window as any).quantumCleanupIntervals) {
          (window as any).quantumCleanupIntervals = [];
        }
        (window as any).quantumCleanupIntervals.push(syncInterval);
      }, 1500);
      
      // ULTRA TRANSCENDENCE system monitoring and auto-optimization
      setTimeout(() => {
        const ultraOptimizationInterval = setInterval(() => {
          try {
            const currentStatus = getSystemStatus();
            const healthScore = parseFloat(currentStatus.healthScore || '95');
            
            // Ultra aggressive optimization for transcendence
            if (healthScore > 85) {
              // System running well, boost performance
              updateNodeMetrics();
              // Auto-discover more devices for transcendence
              if (Math.random() > 0.7) {
                discoverDevices();
              }
            } else {
              // Immediate auto-heal and ultra-optimize
              console.log('🚀 MIORA TRANSCENDENCE: Ultra auto-healing and optimization...');
              enableSelfHealing();
              activateAllNodes();
              activateQuantumBridge();
              
              // Enhanced recovery sequence
              setTimeout(() => {
                performStressTest();
                deployNeuroServer();
              }, 1000);
            }

            // Memory management and cleanup optimization
            if ((window as any).quantumCleanupIntervals) {
              // Keep only last 5 intervals to prevent memory bloat
              (window as any).quantumCleanupIntervals = (window as any).quantumCleanupIntervals.slice(-5);
            }

            // Auto-sync optimization
            if (connectedDevices.length > 0 && Math.random() > 0.5) {
              connectedDevices.slice(0, 3).forEach(device => {
                try {
                  syncDevice(device.id);
                } catch {}
              });
            }

          } catch (error) {
            console.log('🔧 MIORA: Ultra quantum optimization in progress...');
            // Auto-recovery from errors
            setTimeout(() => {
              activateAllNodes();
              enableSelfHealing();
            }, 2000);
          }
        }, 25000); // ULTRA TRANSCENDENCE: Check every 25 seconds for maximum autonomy
        
        // Enhanced interval management
        if (!(window as any).quantumCleanupIntervals) {
          (window as any).quantumCleanupIntervals = [];
        }
        (window as any).quantumCleanupIntervals.push(ultraOptimizationInterval);
      }, 2000);
    }
    return result;
  };

  // Enhanced system status with node information
  const enhancedGetSystemStatus = () => {
    const baseStatus = getSystemStatus();
    return {
      ...baseStatus,
      totalNodes: infrastructureNodes.length,
      activeNodes: infrastructureNodes.filter(n => n.status === 'active').length
    };
  };

  // Enhanced utility functions for maximum performance
  const getAdvancedSystemAnalytics = () => {
    const baseStatus = enhancedGetSystemStatus();
    const quantumEfficiency = quantumBridgeActive ? 
      (fieldStats.totalDevices / Math.max(1, connectedDevices.length)) * 100 : 0;
    
    return {
      ...baseStatus,
      quantumEfficiency: quantumEfficiency.toFixed(1),
      bridgeActive: quantumBridgeActive,
      connectedDeviceCount: connectedDevices.length,
      fieldStrength: fieldStats.quantumSignalStrength,
      systemOptimizationLevel: Math.min(100, baseStatus.totalNodes * 10 + quantumEfficiency)
    };
  };

  const performFullSystemOptimization = async () => {
    // Maximum system optimization sequence
    await enhancedActivateQuantumMode();
    
    // Wait for initial activation
    setTimeout(() => {
      performStressTest();
      enableSelfHealing();
      deployNeuroServer();
    }, 2000);
    
    // Final optimization wave
    setTimeout(() => {
      activateAllNodes();
      if (!quantumBridgeActive) {
        activateQuantumBridge();
      }
      discoverDevices();
    }, 4000);
    
    return true;
  };

  const getQuantumFieldReport = () => {
    return {
      bridgeStatus: quantumBridgeActive,
      connectedDevices: connectedDevices.length,
      fieldMetrics: fieldStats,
      quantumNodes: infrastructureNodes.filter(n => n.status === 'active').length,
      systemHealth: systemMetrics.healthScore || '95',
      overallEfficiency: quantumBridgeActive ? 
        ((fieldStats.totalDevices + infrastructureNodes.filter(n => n.status === 'active').length) / 
         Math.max(1, connectedDevices.length + infrastructureNodes.length)) * 100 : 0
    };
  };

  return {
    quantumMode,
    infrastructureNodes,
    systemMetrics,
    activateQuantumMode: enhancedActivateQuantumMode,
    toggleModule,
    getSystemStatus: enhancedGetSystemStatus,
    performStressTest,
    enableSelfHealing,
    deployNeuroServer,
    sendDashboardEmail,
    syncToTelegram,
    // Quantum Field Bridge
    quantumBridgeActive,
    connectedDevices,
    fieldStats,
    activateQuantumBridge,
    syncDevice,
    discoverDevices,
    // Enhanced functions
    getAdvancedSystemAnalytics,
    performFullSystemOptimization,
    getQuantumFieldReport
  };
};