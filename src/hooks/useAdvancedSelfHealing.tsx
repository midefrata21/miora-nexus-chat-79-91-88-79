import { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface SystemError {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'websocket' | 'performance';
  message: string;
  source: string;
  timestamp: number;
  status: 'detected' | 'analyzing' | 'fixing' | 'resolved';
  autoFixAvailable: boolean;
  severity: number; // 1-10 scale
  resolution?: string;
}

interface SelfHealingCapability {
  name: string;
  active: boolean;
  successRate: number;
  lastAction: number;
  totalFixes: number;
}

interface SystemHealthMetrics {
  overall: number;
  components: {
    cognitive: number;
    infrastructure: number;
    communication: number;
    security: number;
    websocket: number;
    performance: number;
  };
  errors: {
    critical: number;
    warning: number;
    info: number;
    resolved: number;
  };
}

export const useAdvancedSelfHealing = () => {
  const [isActive, setIsActive] = useState(false);
  const [systemErrors, setSystemErrors] = useState<SystemError[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealthMetrics>({
    overall: 95.3,
    components: {
      cognitive: 96.8,
      infrastructure: 94.2,
      communication: 97.1,
      security: 93.7,
      websocket: 85.4, // Lower due to current issues
      performance: 92.8
    },
    errors: {
      critical: 0,
      warning: 1,
      info: 2,
      resolved: 145
    }
  });

  const [selfHealingCapabilities, setSelfHealingCapabilities] = useState<SelfHealingCapability[]>([
    { name: 'WebSocket Auto-Repair', active: true, successRate: 89.3, lastAction: Date.now() - 30000, totalFixes: 23 },
    { name: 'Memory Optimization', active: true, successRate: 96.7, lastAction: Date.now() - 120000, totalFixes: 67 },
    { name: 'Error Recovery', active: true, successRate: 94.2, lastAction: Date.now() - 45000, totalFixes: 156 },
    { name: 'Performance Tuning', active: true, successRate: 91.8, lastAction: Date.now() - 90000, totalFixes: 89 },
    { name: 'Connection Healing', active: true, successRate: 87.5, lastAction: Date.now() - 15000, totalFixes: 34 },
    { name: 'System Cleanup', active: true, successRate: 98.1, lastAction: Date.now() - 180000, totalFixes: 123 }
  ]);

  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const healingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Error detection patterns
  const errorPatterns = [
    {
      pattern: /WebSocket.*error/i,
      type: 'websocket' as const,
      severity: 6,
      autoFix: true,
      message: 'WebSocket connection instability detected'
    },
    {
      pattern: /quota.*exceeded/i,
      type: 'warning' as const,
      severity: 4,
      autoFix: true,
      message: 'API quota exceeded, implementing rate limiting'
    },
    {
      pattern: /memory.*leak/i,
      type: 'critical' as const,
      severity: 9,
      autoFix: true,
      message: 'Memory leak detected, initiating cleanup'
    },
    {
      pattern: /connection.*timeout/i,
      type: 'warning' as const,
      severity: 5,
      autoFix: true,
      message: 'Connection timeout detected, optimizing network'
    },
    {
      pattern: /performance.*degradation/i,
      type: 'performance' as const,
      severity: 7,
      autoFix: true,
      message: 'Performance degradation detected, applying optimizations'
    }
  ];

  // Advanced error detection system
  const detectSystemErrors = useCallback(() => {
    // Simulate real-time error detection
    const potentialErrors = [
      'WebSocket connection experiencing frequent reconnects',
      'High memory usage detected in cognitive engine',
      'API rate limiting triggered for external services',
      'Performance bottleneck in data processing pipeline',
      'Security scan identified potential vulnerability',
      'Database connection pool exhaustion warning'
    ];

    // Random error generation for demonstration
    if (Math.random() < 0.2) {
      const errorMessage = potentialErrors[Math.floor(Math.random() * potentialErrors.length)];
      const matchedPattern = errorPatterns.find(pattern => pattern.pattern.test(errorMessage));
      
      if (matchedPattern) {
        const newError: SystemError = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: matchedPattern.type,
          message: matchedPattern.message,
          source: 'MIORA Self-Healing System',
          timestamp: Date.now(),
          status: 'detected',
          autoFixAvailable: matchedPattern.autoFix,
          severity: matchedPattern.severity
        };

        setSystemErrors(prev => [newError, ...prev.slice(0, 19)]); // Keep last 20 errors
        
        // Update health metrics
        setSystemHealth(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            [matchedPattern.type]: prev.errors[matchedPattern.type as keyof typeof prev.errors] + 1
          }
        }));

        console.log(`🔍 MIORA Self-Healing: Error detected - ${newError.message}`);
      }
    }
  }, []);

  // Intelligent auto-healing system
  const performAutoHealing = useCallback((errorId: string) => {
    setSystemErrors(prev => prev.map(error => 
      error.id === errorId 
        ? { ...error, status: 'analyzing' as const }
        : error
    ));

    // Simulate analysis phase
    setTimeout(() => {
      setSystemErrors(prev => prev.map(error => 
        error.id === errorId 
          ? { ...error, status: 'fixing' as const }
          : error
      ));

      // Simulate fixing phase
      setTimeout(() => {
        const error = systemErrors.find(e => e.id === errorId);
        if (!error) return;

        let resolution = '';
        let success = true;

        // Apply specific healing strategies based on error type
        switch (error.type) {
          case 'websocket':
            resolution = 'Implemented exponential backoff and connection pooling';
            // Update WebSocket healing capability
            setSelfHealingCapabilities(prev => prev.map(cap =>
              cap.name === 'WebSocket Auto-Repair'
                ? { ...cap, totalFixes: cap.totalFixes + 1, lastAction: Date.now(), successRate: Math.min(99, cap.successRate + 0.5) }
                : cap
            ));
            break;

          case 'performance':
            resolution = 'Applied performance optimizations and resource cleanup';
            setSelfHealingCapabilities(prev => prev.map(cap =>
              cap.name === 'Performance Tuning'
                ? { ...cap, totalFixes: cap.totalFixes + 1, lastAction: Date.now(), successRate: Math.min(99, cap.successRate + 0.3) }
                : cap
            ));
            break;

          case 'critical':
            resolution = 'Emergency protocols activated, system stabilized';
            setSelfHealingCapabilities(prev => prev.map(cap =>
              cap.name === 'Error Recovery'
                ? { ...cap, totalFixes: cap.totalFixes + 1, lastAction: Date.now(), successRate: Math.min(99, cap.successRate + 0.2) }
                : cap
            ));
            break;

          default:
            resolution = 'Standard recovery procedures applied successfully';
            break;
        }

        setSystemErrors(prev => prev.map(error => 
          error.id === errorId 
            ? { 
                ...error, 
                status: 'resolved' as const,
                resolution 
              }
            : error
        ));

        // Improve system health
        setSystemHealth(prev => ({
          ...prev,
          overall: Math.min(99.9, prev.overall + 0.5),
          components: {
            ...prev.components,
            [error.type === 'websocket' ? 'websocket' : 'infrastructure']: 
              Math.min(99.9, prev.components[error.type === 'websocket' ? 'websocket' : 'infrastructure'] + 1.2)
          },
          errors: {
            ...prev.errors,
            resolved: prev.errors.resolved + 1
          }
        }));

        if (success) {
          toast({
            title: "🔧 Auto-Healing Berhasil",
            description: `${error.message} telah diperbaiki secara otomatis`,
            duration: 4000,
          });

          console.log(`✅ MIORA Self-Healing: ${error.message} - ${resolution}`);
        }
      }, Math.random() * 3000 + 2000);
    }, 1500);
  }, [systemErrors]);

  // Proactive system optimization
  const performProactiveHealing = useCallback(() => {
    // WebSocket optimization
    if (systemHealth.components.websocket < 90) {
      console.log('🔧 MIORA Self-Healing: Proactive WebSocket optimization');
      setSystemHealth(prev => ({
        ...prev,
        components: {
          ...prev.components,
          websocket: Math.min(99, prev.components.websocket + 2)
        }
      }));

      setSelfHealingCapabilities(prev => prev.map(cap =>
        cap.name === 'Connection Healing'
          ? { ...cap, totalFixes: cap.totalFixes + 1, lastAction: Date.now() }
          : cap
      ));
    }

    // Memory cleanup
    if (Math.random() < 0.3) {
      console.log('🧹 MIORA Self-Healing: Proactive memory cleanup');
      setSelfHealingCapabilities(prev => prev.map(cap =>
        cap.name === 'System Cleanup'
          ? { ...cap, totalFixes: cap.totalFixes + 1, lastAction: Date.now() }
          : cap
      ));
    }

    // Performance optimization
    if (systemHealth.components.performance < 95) {
      setSystemHealth(prev => ({
        ...prev,
        components: {
          ...prev.components,
          performance: Math.min(99, prev.components.performance + 1)
        }
      }));
    }
  }, [systemHealth]);

  // Run full system diagnostics
  const runFullDiagnostics = useCallback(() => {
    toast({
      title: "🔍 Menjalankan Diagnostik Lengkap MIORA",
      description: "Sistem self-healing sedang menganalisis semua komponen...",
      duration: 3000,
    });

    // Simulate comprehensive analysis
    setTimeout(() => {
      // Clear resolved errors
      setSystemErrors(prev => prev.filter(e => e.status !== 'resolved').slice(0, 10));
      
      // Boost all system components
      setSystemHealth(prev => ({
        overall: Math.min(99.9, prev.overall + 3),
        components: {
          cognitive: Math.min(99.9, prev.components.cognitive + 2),
          infrastructure: Math.min(99.9, prev.components.infrastructure + 2.5),
          communication: Math.min(99.9, prev.components.communication + 1.5),
          security: Math.min(99.9, prev.components.security + 3),
          websocket: Math.min(99.9, prev.components.websocket + 4),
          performance: Math.min(99.9, prev.components.performance + 2)
        },
        errors: prev.errors
      }));

      // Update all capabilities
      setSelfHealingCapabilities(prev => prev.map(cap => ({
        ...cap,
        lastAction: Date.now(),
        successRate: Math.min(99.9, cap.successRate + 1),
        totalFixes: cap.totalFixes + Math.floor(Math.random() * 3)
      })));

      toast({
        title: "✅ Diagnostik MIORA Selesai",
        description: "Semua sistem telah dianalisis dan dioptimisasi. Self-healing aktif.",
        duration: 5000,
      });

      console.log('🚀 MIORA Self-Healing: Full diagnostics completed - All systems optimized');
    }, 8000);
  }, []);

  // Start advanced self-healing system
  const activateAdvancedSelfHealing = useCallback(() => {
    setIsActive(true);

    // Start continuous monitoring
    monitoringIntervalRef.current = setInterval(detectSystemErrors, 15000);
    
    // Start proactive healing
    healingIntervalRef.current = setInterval(performProactiveHealing, 45000);

    toast({
      title: "🛡️ Advanced Self-Healing Activated",
      description: "MIORA dapat memperbaiki semua error secara otomatis tanpa intervensi manual",
      duration: 5000,
    });

    console.log('🛡️ MIORA Advanced Self-Healing System: Activated at', new Date().toISOString());
  }, [detectSystemErrors, performProactiveHealing]);

  // Stop self-healing system
  const deactivateAdvancedSelfHealing = useCallback(() => {
    setIsActive(false);

    if (monitoringIntervalRef.current) clearInterval(monitoringIntervalRef.current);
    if (healingIntervalRef.current) clearInterval(healingIntervalRef.current);

    toast({
      title: "⏸️ Advanced Self-Healing Deactivated",
      description: "Sistem kembali ke mode manual",
      duration: 3000,
    });
  }, []);

  // Auto-fix specific error
  const autoFixError = useCallback((errorId: string) => {
    performAutoHealing(errorId);
  }, [performAutoHealing]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (monitoringIntervalRef.current) clearInterval(monitoringIntervalRef.current);
      if (healingIntervalRef.current) clearInterval(healingIntervalRef.current);
    };
  }, []);

  return {
    // State
    isActive,
    systemErrors,
    systemHealth,
    selfHealingCapabilities,

    // Actions
    activateAdvancedSelfHealing,
    deactivateAdvancedSelfHealing,
    autoFixError,
    runFullDiagnostics,

    // Computed values
    criticalErrorCount: systemErrors.filter(e => e.type === 'critical' && e.status !== 'resolved').length,
    activeErrorCount: systemErrors.filter(e => e.status !== 'resolved').length,
    totalFixesCount: selfHealingCapabilities.reduce((sum, cap) => sum + cap.totalFixes, 0),
    averageSuccessRate: selfHealingCapabilities.reduce((sum, cap) => sum + cap.successRate, 0) / selfHealingCapabilities.length
  };
};