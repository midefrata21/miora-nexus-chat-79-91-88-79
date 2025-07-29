import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  threshold: number;
  trend: 'improving' | 'stable' | 'degrading';
  prediction: number;
  timestamp: number;
}

interface SystemPrediction {
  id: string;
  type: 'performance' | 'memory' | 'error' | 'resource';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  timeToOccurrence: number;
  description: string;
  preventiveActions: string[];
  timestamp: number;
}

interface MaintenanceTask {
  id: string;
  type: 'optimization' | 'cleanup' | 'update' | 'repair';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  scheduledTime: number;
  estimatedDuration: number;
  automated: boolean;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed';
  timestamp: number;
}

interface HealthReport {
  overall: 'excellent' | 'good' | 'warning' | 'critical';
  score: number;
  metrics: HealthMetric[];
  predictions: SystemPrediction[];
  recommendations: string[];
  timestamp: number;
}

export const useSystemHealthPredictor = () => {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [systemPredictions, setSystemPredictions] = useState<SystemPrediction[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictorActive, setPredictorActive] = useState(false);
  const [historicalData, setHistoricalData] = useState<HealthMetric[][]>([]);

  const analysisInterval = useRef<NodeJS.Timeout | null>(null);
  const predictionInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize health metrics
  const initializeHealthMetrics = useCallback(() => {
    const initialMetrics: HealthMetric[] = [
      {
        id: 'cpu_usage',
        name: 'CPU Usage',
        value: 25,
        threshold: 80,
        trend: 'stable',
        prediction: 30,
        timestamp: Date.now()
      },
      {
        id: 'memory_usage',
        name: 'Memory Usage',
        value: 45,
        threshold: 85,
        trend: 'improving',
        prediction: 40,
        timestamp: Date.now()
      },
      {
        id: 'response_time',
        name: 'Response Time (ms)',
        value: 120,
        threshold: 500,
        trend: 'stable',
        prediction: 115,
        timestamp: Date.now()
      },
      {
        id: 'error_rate',
        name: 'Error Rate (%)',
        value: 0.02,
        threshold: 5,
        trend: 'improving',
        prediction: 0.01,
        timestamp: Date.now()
      },
      {
        id: 'disk_usage',
        name: 'Disk Usage',
        value: 60,
        threshold: 90,
        trend: 'degrading',
        prediction: 65,
        timestamp: Date.now()
      },
      {
        id: 'network_latency',
        name: 'Network Latency (ms)',
        value: 45,
        threshold: 200,
        trend: 'stable',
        prediction: 50,
        timestamp: Date.now()
      }
    ];

    setHealthMetrics(initialMetrics);
  }, []);

  // Analyze health trends
  const analyzeHealthTrends = useCallback(() => {
    setIsAnalyzing(true);

    setHealthMetrics(prev => {
      const updated = prev.map(metric => {
        // Simulate realistic metric changes
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.max(0, Math.min(100, metric.value + change));
        
        // Determine trend
        let trend: 'improving' | 'stable' | 'degrading' = 'stable';
        if (newValue > metric.value + 2) trend = 'degrading';
        else if (newValue < metric.value - 2) trend = 'improving';
        
        // Predict future value
        const prediction = predictNextValue(metric.value, newValue, historicalData);
        
        return {
          ...metric,
          value: newValue,
          trend,
          prediction,
          timestamp: Date.now()
        };
      });

      // Store historical data
      setHistoricalData(prev => [...prev.slice(-50), updated]);
      
      return updated;
    });

    setIsAnalyzing(false);
  }, [historicalData]);

  // Predict system failures
  const predictSystemFailures = useCallback(() => {
    const predictions: SystemPrediction[] = [];

    healthMetrics.forEach(metric => {
      const riskLevel = calculateRiskLevel(metric);
      
      if (riskLevel > 0.3) {
        const prediction: SystemPrediction = {
          id: `pred_${metric.id}_${Date.now()}`,
          type: getFailureType(metric.id),
          severity: getSeverity(riskLevel),
          probability: riskLevel,
          timeToOccurrence: calculateTimeToFailure(metric, riskLevel),
          description: generateFailureDescription(metric, riskLevel),
          preventiveActions: generatePreventiveActions(metric),
          timestamp: Date.now()
        };
        
        predictions.push(prediction);
      }
    });

    setSystemPredictions(prev => {
      const updated = [...predictions, ...prev.slice(0, 20)];
      
      // Alert for critical predictions
      predictions.forEach(pred => {
        if (pred.severity === 'critical') {
          toast({
            title: "🚨 Critical System Prediction",
            description: pred.description,
            variant: "destructive",
            duration: 8000,
          });
        }
      });
      
      return updated;
    });
  }, [healthMetrics]);

  // Schedule maintenance tasks
  const scheduleMaintenanceTasks = useCallback(() => {
    const tasks: MaintenanceTask[] = [];

    systemPredictions.forEach(prediction => {
      if (prediction.probability > 0.5) {
        const task: MaintenanceTask = {
          id: `task_${prediction.id}_${Date.now()}`,
          type: getMaintenanceType(prediction.type),
          priority: prediction.severity === 'critical' ? 'critical' : 'high',
          description: `Preventive maintenance for ${prediction.description}`,
          scheduledTime: Date.now() + (prediction.timeToOccurrence * 0.8), // 80% of time to occurrence
          estimatedDuration: estimateMaintenanceDuration(prediction.type),
          automated: canAutomate(prediction.type),
          status: 'scheduled',
          timestamp: Date.now()
        };
        
        tasks.push(task);
      }
    });

    setMaintenanceTasks(prev => [...tasks, ...prev.slice(0, 15)]);
    
    if (tasks.length > 0) {
      toast({
        title: "📅 Maintenance Tasks Scheduled",
        description: `${tasks.length} preventive maintenance tasks scheduled`,
        duration: 5000,
      });
    }
  }, [systemPredictions]);

  // Generate health report
  const generateHealthReport = useCallback(() => {
    const overallScore = calculateOverallScore(healthMetrics);
    const overallHealth = getOverallHealth(overallScore);
    const recommendations = generateRecommendations(healthMetrics, systemPredictions);

    const report: HealthReport = {
      overall: overallHealth,
      score: overallScore,
      metrics: healthMetrics,
      predictions: systemPredictions,
      recommendations,
      timestamp: Date.now()
    };

    setHealthReport(report);
    
    return report;
  }, [healthMetrics, systemPredictions]);

  // Helper functions
  const predictNextValue = (current: number, recent: number, historical: HealthMetric[][]): number => {
    if (historical.length < 3) return recent;
    
    const recentTrend = historical.slice(-3).map(h => h.find(m => m.value)?.value || 0);
    const avgChange = recentTrend.reduce((acc, val, i) => 
      i > 0 ? acc + (val - recentTrend[i-1]) : acc, 0) / (recentTrend.length - 1);
    
    return Math.max(0, Math.min(100, recent + avgChange));
  };

  const calculateRiskLevel = (metric: HealthMetric): number => {
    const threshold = metric.threshold;
    const current = metric.value;
    const predicted = metric.prediction;
    
    // Risk based on current value
    const currentRisk = Math.max(0, (current - threshold * 0.7) / (threshold * 0.3));
    
    // Risk based on prediction
    const predictedRisk = Math.max(0, (predicted - threshold * 0.7) / (threshold * 0.3));
    
    // Risk based on trend
    const trendRisk = metric.trend === 'degrading' ? 0.3 : 0;
    
    return Math.min(1, currentRisk + predictedRisk + trendRisk);
  };

  const getFailureType = (metricId: string): 'performance' | 'memory' | 'error' | 'resource' => {
    const typeMap: Record<string, 'performance' | 'memory' | 'error' | 'resource'> = {
      'cpu_usage': 'performance',
      'memory_usage': 'memory',
      'response_time': 'performance',
      'error_rate': 'error',
      'disk_usage': 'resource',
      'network_latency': 'performance'
    };
    
    return typeMap[metricId] || 'performance';
  };

  const getSeverity = (riskLevel: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (riskLevel >= 0.8) return 'critical';
    if (riskLevel >= 0.6) return 'high';
    if (riskLevel >= 0.4) return 'medium';
    return 'low';
  };

  const calculateTimeToFailure = (metric: HealthMetric, riskLevel: number): number => {
    const baseTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const urgencyFactor = 1 - riskLevel;
    
    return Math.max(60 * 60 * 1000, baseTime * urgencyFactor); // Minimum 1 hour
  };

  const generateFailureDescription = (metric: HealthMetric, riskLevel: number): string => {
    const severity = getSeverity(riskLevel);
    const descriptions = {
      'cpu_usage': `CPU usage approaching ${severity} levels - system slowdown expected`,
      'memory_usage': `Memory usage trending towards ${severity} - potential memory leaks detected`,
      'response_time': `Response time degradation at ${severity} level - user experience impact`,
      'error_rate': `Error rate increasing to ${severity} levels - system instability predicted`,
      'disk_usage': `Disk usage reaching ${severity} capacity - storage exhaustion imminent`,
      'network_latency': `Network latency at ${severity} levels - connectivity issues expected`
    };
    
    return descriptions[metric.id as keyof typeof descriptions] || `${metric.name} at ${severity} risk level`;
  };

  const generatePreventiveActions = (metric: HealthMetric): string[] => {
    const actions = {
      'cpu_usage': [
        'Optimize CPU-intensive processes',
        'Implement process throttling',
        'Scale horizontally if needed',
        'Review and optimize algorithms'
      ],
      'memory_usage': [
        'Run memory cleanup routines',
        'Identify and fix memory leaks',
        'Optimize data structures',
        'Implement garbage collection tuning'
      ],
      'response_time': [
        'Optimize database queries',
        'Implement caching strategies',
        'Review API performance',
        'Optimize network requests'
      ],
      'error_rate': [
        'Review error logs',
        'Implement better error handling',
        'Update error monitoring',
        'Fix identified bugs'
      ],
      'disk_usage': [
        'Clean up temporary files',
        'Archive old data',
        'Implement log rotation',
        'Optimize storage usage'
      ],
      'network_latency': [
        'Optimize network requests',
        'Implement connection pooling',
        'Review CDN configuration',
        'Check network infrastructure'
      ]
    };
    
    return actions[metric.id as keyof typeof actions] || ['Monitor and optimize'];
  };

  const getMaintenanceType = (failureType: string): 'optimization' | 'cleanup' | 'update' | 'repair' => {
    const typeMap: Record<string, 'optimization' | 'cleanup' | 'update' | 'repair'> = {
      'performance': 'optimization',
      'memory': 'cleanup',
      'error': 'repair',
      'resource': 'cleanup'
    };
    
    return typeMap[failureType] || 'optimization';
  };

  const estimateMaintenanceDuration = (type: string): number => {
    const durations = {
      'performance': 30 * 60 * 1000, // 30 minutes
      'memory': 15 * 60 * 1000, // 15 minutes
      'error': 60 * 60 * 1000, // 1 hour
      'resource': 20 * 60 * 1000 // 20 minutes
    };
    
    return durations[type as keyof typeof durations] || 30 * 60 * 1000;
  };

  const canAutomate = (type: string): boolean => {
    const automatable = ['performance', 'memory', 'resource'];
    return automatable.includes(type);
  };

  const calculateOverallScore = (metrics: HealthMetric[]): number => {
    const totalScore = metrics.reduce((sum, metric) => {
      const normalized = Math.max(0, 100 - (metric.value / metric.threshold) * 100);
      return sum + normalized;
    }, 0);
    
    return Math.round(totalScore / metrics.length);
  };

  const getOverallHealth = (score: number): 'excellent' | 'good' | 'warning' | 'critical' => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'warning';
    return 'critical';
  };

  const generateRecommendations = (metrics: HealthMetric[], predictions: SystemPrediction[]): string[] => {
    const recommendations: string[] = [];
    
    // Metric-based recommendations
    metrics.forEach(metric => {
      if (metric.value > metric.threshold * 0.8) {
        recommendations.push(`Address ${metric.name} - currently at ${metric.value.toFixed(1)}%`);
      }
    });
    
    // Prediction-based recommendations
    predictions.forEach(prediction => {
      if (prediction.severity === 'critical' || prediction.severity === 'high') {
        recommendations.push(`Immediate attention: ${prediction.description}`);
      }
    });
    
    // General recommendations
    if (recommendations.length === 0) {
      recommendations.push('System is operating within normal parameters');
      recommendations.push('Continue regular monitoring and maintenance');
    }
    
    return recommendations.slice(0, 5); // Limit to 5 recommendations
  };

  // Activate predictor
  const activatePredictor = useCallback(() => {
    setPredictorActive(true);
    initializeHealthMetrics();
    
    // Start continuous monitoring
    analysisInterval.current = setInterval(() => {
      analyzeHealthTrends();
    }, 5000); // Every 5 seconds
    
    // Start prediction cycles
    predictionInterval.current = setInterval(() => {
      predictSystemFailures();
      scheduleMaintenanceTasks();
    }, 15000); // Every 15 seconds
    
    toast({
      title: "🎯 System Health Predictor Activated",
      description: "Continuous monitoring and predictive maintenance enabled",
      duration: 6000,
    });
  }, [initializeHealthMetrics, analyzeHealthTrends, predictSystemFailures, scheduleMaintenanceTasks]);

  // Cleanup intervals
  useEffect(() => {
    return () => {
      if (analysisInterval.current) clearInterval(analysisInterval.current);
      if (predictionInterval.current) clearInterval(predictionInterval.current);
    };
  }, []);

  // Auto-generate reports
  useEffect(() => {
    if (predictorActive && healthMetrics.length > 0) {
      generateHealthReport();
    }
  }, [healthMetrics, systemPredictions, predictorActive, generateHealthReport]);

  return {
    healthMetrics,
    systemPredictions,
    maintenanceTasks,
    healthReport,
    isAnalyzing,
    predictorActive,
    activatePredictor,
    analyzeHealthTrends,
    predictSystemFailures,
    scheduleMaintenanceTasks,
    generateHealthReport
  };
};