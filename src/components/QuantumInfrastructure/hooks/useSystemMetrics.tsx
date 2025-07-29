import { useState, useEffect, useCallback } from 'react';

export interface SystemMetrics {
  responseTime: number;
  errorRate: number;
  activeConnections: number;
  dataFlow: number;
  totalRequests: number;
  throughput: number;
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  healthScore: number;
}

export const useSystemMetrics = (isQuantumActive: boolean) => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    responseTime: 89,
    errorRate: 0.012,
    activeConnections: 12847,
    dataFlow: 247.3,
    totalRequests: 2847291,
    throughput: 15840,
    cpuUsage: 45,
    memoryUsage: 67,
    networkLatency: 12,
    healthScore: 97.8
  });

  // Real-time metrics updates
  useEffect(() => {
    if (!isQuantumActive) return;

    const metricsInterval = setInterval(() => {
      setSystemMetrics(prev => ({
        responseTime: Math.max(45, Math.min(250, prev.responseTime + (Math.random() - 0.5) * 20)),
        errorRate: Math.max(0.001, Math.min(0.03, prev.errorRate + (Math.random() - 0.5) * 0.005)),
        activeConnections: Math.max(8000, Math.min(5000, prev.activeConnections + (Math.random() - 0.5) * 1000)),
        dataFlow: Math.max(100, Math.min(1000, prev.dataFlow + (Math.random() - 0.5) * 50)),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 1000),
        throughput: Math.max(10000, Math.min(25000, prev.throughput + (Math.random() - 0.5) * 2000)),
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 5)),
        healthScore: Math.max(85, Math.min(100, prev.healthScore + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, [isQuantumActive]);

  const getSystemStatus = useCallback(() => {
    return {
      responseTime: Math.round(systemMetrics.responseTime),
      errorRate: systemMetrics.errorRate.toFixed(3),
      activeConnections: systemMetrics.activeConnections.toLocaleString(),
      dataFlow: systemMetrics.dataFlow.toFixed(1),
      healthScore: systemMetrics.healthScore.toFixed(1),
      uptime: '99.97%'
    };
  }, [systemMetrics]);

  const updateStressTestMetrics = useCallback(() => {
    setSystemMetrics(prev => ({
      ...prev,
      responseTime: 180,
      errorRate: 0.025,
      activeConnections: 4500,
      cpuUsage: 85,
      memoryUsage: 88
    }));

    // Recovery after 10 seconds
    setTimeout(() => {
      setSystemMetrics(prev => ({
        ...prev,
        responseTime: 65,
        errorRate: 0.008,
        activeConnections: 1200,
        cpuUsage: 35,
        memoryUsage: 55
      }));
    }, 10000);
  }, []);

  return {
    systemMetrics,
    setSystemMetrics,
    getSystemStatus,
    updateStressTestMetrics
  };
};