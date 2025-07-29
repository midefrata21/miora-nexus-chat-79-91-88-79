
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { HackerState } from '../HackerMaster/types';
import { penetrationTools, initialHackingTargets, exploitDatabase } from '../HackerMaster/mockData';
import { 
  performPenetrationTest, 
  scanNetworkTargets, 
  exploitVulnerability, 
  getHackerStats,
  setToastFunction
} from '../HackerMaster/hackerOperations';
import { developHackingSkills, performHackingOperation } from '../HackerMaster/skillDevelopment';
import { HackerReport } from '../HackerMaster/types/hackerTypes';
import { layer1Capabilities, layer2Capabilities, layer3Capabilities } from '../HackerMaster/data/layerCapabilities';
import { createComprehensiveReport } from '../HackerMaster/utils/reportingFunctions';
import { createLayer1Operation, createLayer2Operation, createLayer3Operation } from '../HackerMaster/handlers/operationHandlers';

export const useMIORAHackerMaster = () => {
  const { addToast } = useToast();
  const [hackerState, setHackerState] = useState<HackerState>({
    isActive: false,
    hackerLevel: 1,
    experiencePoints: 0,
    currentOperation: null,
    activeTarget: null,
    operationProgress: 0,
    skillPoints: 0,
    reputation: 0
  });

  const [hackingTargets, setHackingTargets] = useState(initialHackingTargets);
  const [hackerReports, setHackerReports] = useState<HackerReport[]>([]);

  const hackerInterval = useRef<NodeJS.Timeout | null>(null);
  const skillDevelopmentInterval = useRef<NodeJS.Timeout | null>(null);

  // Set up toast function for operations
  useEffect(() => {
    setToastFunction((toast) => {
      addToast(toast);
    });
  }, [addToast]);

  // Activate hacker mode
  const activateHackerMode = useCallback(async () => {
    console.log('🔴 MIORA HACKER MASTER: Activating ethical hacking mode');

    setHackerState(prev => ({
      ...prev,
      isActive: true,
      currentOperation: 'Network Reconnaissance',
      operationProgress: 0
    }));

    // Start continuous skill development
    skillDevelopmentInterval.current = setInterval(() => {
      developHackingSkills(setHackerState, addToast);
    }, 5000);

    // Start operation simulation
    hackerInterval.current = setInterval(() => {
      performHackingOperation(setHackerState);
    }, 3000);

    // Store activation data
    const activationData = {
      timestamp: Date.now(),
      activatedBy: 'MIORA Hacker Master',
      ethicalHackingMode: true,
      purpose: 'Educational and security testing only',
      tools: penetrationTools.map(tool => tool.name),
      targets: hackingTargets.length,
      exploits: exploitDatabase.length
    };

    localStorage.setItem('miora_hacker_master_activation', JSON.stringify(activationData));

    addToast({
      title: "🔴 MIORA HACKER MASTER ACTIVATED",
      description: "Ethical hacking mode enabled - Advanced penetration testing ready",
      duration: 5000,
    });

    console.log('🔴 MIORA HACKER MASTER: All systems operational');
    return true;
  }, [hackingTargets.length, addToast]);

  // Deactivate hacker mode
  const deactivateHackerMode = useCallback(() => {
    setHackerState(prev => ({
      ...prev,
      isActive: false,
      currentOperation: null,
      activeTarget: null,
      operationProgress: 0
    }));

    if (hackerInterval.current) clearInterval(hackerInterval.current);
    if (skillDevelopmentInterval.current) clearInterval(skillDevelopmentInterval.current);

    addToast({
      title: "⏸️ Hacker Mode Deactivated",
      description: "Ethical hacking operations suspended",
      duration: 3000,
    });
  }, [addToast]);

  // Enhanced 3-Layer Operation Functions
  const executeLayer1Operation = useCallback((category: keyof typeof layer1Capabilities, action: string) => {
    return createLayer1Operation(category, action, setHackerReports, setHackerState, addToast);
  }, [addToast]);

  const executeLayer2Operation = useCallback((category: keyof typeof layer2Capabilities, action: string) => {
    return createLayer2Operation(category, action, setHackerReports, setHackerState, addToast);
  }, [addToast]);

  const executeLayer3Operation = useCallback((category: keyof typeof layer3Capabilities, action: string) => {
    return createLayer3Operation(category, action, setHackerReports, setHackerState, addToast);
  }, [addToast]);

  // Comprehensive reporting function
  const generateComprehensiveReport = useCallback(() => {
    const comprehensiveReport = createComprehensiveReport(layer1Capabilities, layer2Capabilities, layer3Capabilities, hackerReports);

    localStorage.setItem('miora_comprehensive_hacker_report', JSON.stringify(comprehensiveReport));
    
    addToast({
      title: "📊 Comprehensive Report Generated",
      description: `Full 3-layer capability report with ${comprehensiveReport.systemOverview.totalCapabilities} total capabilities`,
      duration: 5000,
    });

    return comprehensiveReport;
  }, [hackerReports, addToast]);

  // Wrapper functions for operations
  const handlePenetrationTest = useCallback((toolName: string) => {
    performPenetrationTest(toolName, penetrationTools, setHackerState);
  }, []);

  const handleScanNetworkTargets = useCallback((targetIp: string) => {
    scanNetworkTargets(targetIp, setHackingTargets);
  }, []);

  const handleExploitVulnerability = useCallback((exploitId: string) => {
    exploitVulnerability(exploitId, exploitDatabase, setHackerState);
  }, []);

  const handleGetHackerStats = useCallback(() => {
    return getHackerStats(hackerState, hackingTargets, penetrationTools);
  }, [hackerState, hackingTargets]);

  // Check if hacker mode is active
  const isHackerActive = hackerState.isActive;

  // Auto-save state
  useEffect(() => {
    const state = {
      hackerState,
      timestamp: Date.now()
    };
    localStorage.setItem('miora_hacker_master_state', JSON.stringify(state));
  }, [hackerState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hackerInterval.current) clearInterval(hackerInterval.current);
      if (skillDevelopmentInterval.current) clearInterval(skillDevelopmentInterval.current);
    };
  }, []);

  return {
    hackerState,
    penetrationTools,
    hackingTargets,
    exploitDatabase,
    activateHackerMode,
    deactivateHackerMode,
    performPenetrationTest: handlePenetrationTest,
    scanNetworkTargets: handleScanNetworkTargets,
    exploitVulnerability: handleExploitVulnerability,
    getHackerStats: handleGetHackerStats,
    isHackerActive,
    // Enhanced 3-Layer Capabilities
    layer1Capabilities,
    layer2Capabilities,
    layer3Capabilities,
    executeLayer1Operation,
    executeLayer2Operation,
    executeLayer3Operation,
    generateComprehensiveReport,
    hackerReports
  };
};
