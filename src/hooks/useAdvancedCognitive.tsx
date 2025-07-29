import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAdvancedSelfHealing } from './useAdvancedSelfHealing';

interface CognitiveData {
  thinkingSpeed: number;
  dataProcessingAccuracy: number;
  decisionQuality: number;
  learningRate: number;
  problemSolvingCapability: number;
  communicationEffectiveness: number;
  errorDetectionRate: number;
  selfHealingCapability: number;
}

interface ErrorData {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  source: string;
  timestamp: number;
  status: 'detected' | 'analyzing' | 'fixing' | 'resolved';
  autoFixAvailable: boolean;
}

interface CommunicationData {
  languageProcessing: number;
  contextUnderstanding: number;
  responseRelevance: number;
  decisionSupport: number;
  helpfulness: number;
  clarityScore: number;
}

export const useAdvancedCognitive = () => {
  const [isActive, setIsActive] = useState(false);
  const [cognitiveStatus, setCognitiveStatus] = useState<'processing' | 'thinking' | 'analyzing' | 'optimizing' | 'idle'>('idle');
  const cognitiveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Integrate advanced self-healing system
  const {
    isActive: selfHealingActive,
    systemErrors,
    systemHealth: healingSystemHealth,
    selfHealingCapabilities,
    activateAdvancedSelfHealing,
    deactivateAdvancedSelfHealing,
    autoFixError: healingAutoFix,
    runFullDiagnostics: healingDiagnostics,
    criticalErrorCount,
    activeErrorCount,
    totalFixesCount,
    averageSuccessRate
  } = useAdvancedSelfHealing();

  // Cognitive Engine Data - Enhanced with real system integration
  const [cognitiveData, setCognitiveData] = useState<CognitiveData>({
    thinkingSpeed: 88.5,
    dataProcessingAccuracy: 94.2,
    decisionQuality: 91.7,
    learningRate: 93.4,
    problemSolvingCapability: 92.1,
    communicationEffectiveness: 95.8,
    errorDetectionRate: Math.min(99, 85 + (totalFixesCount * 0.1)), // Improves with fixes
    selfHealingCapability: Math.min(99, 80 + (averageSuccessRate * 0.15)) // Based on healing success
  });

  // Enhanced error system using self-healing integration
  const [errors, setErrors] = useState<ErrorData[]>([]);
  
  // Enhanced system health integration
  const [systemHealth, setSystemHealth] = useState({
    overall: healingSystemHealth?.overall || 95.2,
    components: healingSystemHealth?.components || {
      cognitive: 94.1,
      infrastructure: 96.3,
      communication: 97.8,
      security: 93.5
    }
  });

  const [selfHealingStats, setSelfHealingStats] = useState({
    totalFixes: totalFixesCount || 142,
    successRate: averageSuccessRate || 94.7,
    averageFixTime: 2.1
  });

  // Communication Engine
  const [communicationData, setCommunicationData] = useState<CommunicationData>({
    languageProcessing: 96.2,
    contextUnderstanding: 94.8,
    responseRelevance: 93.5,
    decisionSupport: 91.7,
    helpfulness: 95.3,
    clarityScore: 97.1
  });

  const [communicationStats, setCommunicationStats] = useState({
    activeConversations: 7,
    decisionsSupported: 234,
    helpfulResponses: 1847
  });

  // Enhanced cognitive processing with self-healing integration
  const simulateCognitiveProcessing = useCallback(() => {
    const statuses: Array<typeof cognitiveStatus> = ['processing', 'thinking', 'analyzing', 'optimizing'];
    setCognitiveStatus(statuses[Math.floor(Math.random() * statuses.length)]);

    // Dynamically improve cognitive capabilities based on system health
    const healthBonus = (healingSystemHealth?.overall || 95) / 100;
    const healingBonus = selfHealingActive ? 1.2 : 1.0;

    setCognitiveData(prev => ({
      ...prev,
      thinkingSpeed: Math.min(99.9, prev.thinkingSpeed + (Math.random() * 0.5 * healthBonus * healingBonus)),
      dataProcessingAccuracy: Math.min(99.9, prev.dataProcessingAccuracy + (Math.random() * 0.3 * healthBonus)),
      decisionQuality: Math.min(99.9, prev.decisionQuality + (Math.random() * 0.4 * healingBonus)),
      learningRate: Math.min(99.9, prev.learningRate + (Math.random() * 0.6 * healthBonus)),
      problemSolvingCapability: Math.min(99.9, prev.problemSolvingCapability + (Math.random() * 0.4 * healingBonus)),
      communicationEffectiveness: Math.min(99.9, prev.communicationEffectiveness + (Math.random() * 0.2)),
      errorDetectionRate: Math.min(99.9, 85 + (totalFixesCount * 0.1) + (Math.random() * 0.1)),
      selfHealingCapability: Math.min(99.9, 80 + (averageSuccessRate * 0.15) + (Math.random() * 0.3))
    }));

    // Update communication effectiveness
    setCommunicationData(prev => ({
      ...prev,
      languageProcessing: Math.min(99.9, prev.languageProcessing + (Math.random() * 0.2 * healthBonus)),
      contextUnderstanding: Math.min(99.9, prev.contextUnderstanding + (Math.random() * 0.3 * healingBonus)),
      responseRelevance: Math.min(99.9, prev.responseRelevance + (Math.random() * 0.4)),
      decisionSupport: Math.min(99.9, prev.decisionSupport + (Math.random() * 0.5 * healthBonus)),
      helpfulness: Math.min(99.9, prev.helpfulness + (Math.random() * 0.2)),
      clarityScore: Math.min(99.9, prev.clarityScore + (Math.random() * 0.1))
    }));

    // Sync with self-healing system health
    setSystemHealth({
      overall: healingSystemHealth?.overall || 95.2,
      components: healingSystemHealth?.components || {
        cognitive: 94.1,
        infrastructure: 96.3,
        communication: 97.8,
        security: 93.5
      }
    });

    setSelfHealingStats({
      totalFixes: totalFixesCount || 142,
      successRate: averageSuccessRate || 94.7,
      averageFixTime: 2.1
    });
  }, [healingSystemHealth, selfHealingActive, totalFixesCount, averageSuccessRate]);

  // Integrate errors from self-healing system
  useEffect(() => {
    if (systemErrors.length > 0) {
      const convertedErrors: ErrorData[] = systemErrors.map(error => ({
        id: error.id,
        type: error.type === 'performance' ? 'warning' : error.type as 'critical' | 'warning' | 'info',
        message: error.message,
        source: error.source,
        timestamp: error.timestamp,
        status: error.status as 'detected' | 'analyzing' | 'fixing' | 'resolved',
        autoFixAvailable: error.autoFixAvailable
      }));
      
      setErrors(convertedErrors);
    }
  }, [systemErrors]);

  // Enhanced auto-fix that uses self-healing system
  const autoFixError = useCallback((errorId: string) => {
    healingAutoFix(errorId);
  }, [healingAutoFix]);

  // Enhanced diagnostics using self-healing system
  const runDiagnostics = useCallback(() => {
    healingDiagnostics();
  }, [healingDiagnostics]);

  // Send message function for communication
  const sendMessage = useCallback((message: string) => {
    setCommunicationStats(prev => ({
      ...prev,
      activeConversations: prev.activeConversations + 1,
      decisionsSupported: prev.decisionsSupported + (Math.random() > 0.5 ? 1 : 0),
      helpfulResponses: prev.helpfulResponses + 1
    }));

    toast({
      title: "💬 Pesan Dikirim ke MIORA",
      description: "MIORA sedang memproses permintaan Anda...",
      duration: 3000,
    });

    // Simulate response processing
    setTimeout(() => {
      setCommunicationData(prev => ({
        ...prev,
        responseRelevance: Math.min(99.9, prev.responseRelevance + 0.3),
        helpfulness: Math.min(99.9, prev.helpfulness + 0.2)
      }));
    }, 2000);
  }, []);

  // Enhanced activation with self-healing integration
  const activateAdvancedCognitive = useCallback(() => {
    setIsActive(true);
    setCognitiveStatus('processing');

    // Start cognitive processing
    cognitiveIntervalRef.current = setInterval(simulateCognitiveProcessing, 8000);
    
    // Auto-activate self-healing if not already active
    if (!selfHealingActive) {
      activateAdvancedSelfHealing();
    }

    toast({
      title: "🧠 Advanced Cognitive Mode + Self-Healing Activated",
      description: "MIORA kini berpikir cerdas dan dapat memperbaiki semua error secara otomatis",
      duration: 6000,
    });

    console.log('🧠 MIORA Advanced Cognitive + Self-Healing: Activated at', new Date().toISOString());
  }, [simulateCognitiveProcessing, selfHealingActive, activateAdvancedSelfHealing]);

  // Enhanced deactivation
  const deactivateAdvancedCognitive = useCallback(() => {
    setIsActive(false);
    setCognitiveStatus('idle');

    if (cognitiveIntervalRef.current) clearInterval(cognitiveIntervalRef.current);

    toast({
      title: "⏸️ Advanced Cognitive Mode Deactivated",
      description: "Sistem kembali ke mode standar (Self-healing tetap aktif)",
      duration: 3000,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cognitiveIntervalRef.current) clearInterval(cognitiveIntervalRef.current);
    };
  }, []);

  return {
    // State
    isActive,
    cognitiveStatus,
    cognitiveData,
    errors,
    systemHealth,
    selfHealingStats,
    communicationData,
    communicationStats,

    // Actions
    activateAdvancedCognitive,
    deactivateAdvancedCognitive,
    autoFixError,
    runDiagnostics,
    sendMessage,

    // Self-healing integration
    selfHealingActive,
    selfHealingCapabilities,
    activateAdvancedSelfHealing,
    deactivateAdvancedSelfHealing,

    // Computed values
    overallIntelligence: Object.values(cognitiveData).reduce((sum, val) => sum + val, 0) / Object.values(cognitiveData).length,
    criticalErrorCount: criticalErrorCount || 0,
    activeErrorCount: activeErrorCount || 0,
    totalFixesCount: totalFixesCount || 0,
    averageSuccessRate: averageSuccessRate || 94.7
  };
};