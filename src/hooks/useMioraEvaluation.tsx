
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAutodidacticLearning } from './useAutodidacticLearning';

interface EvaluationReport {
  timestamp: number;
  weeklyProgress: number;
  activeModules: string[];
  missedModules: string[];
  reasoningCapability: number;
  systemImprovements: number;
  bottlenecks: string[];
  optimizationRecommendations: string[];
  overallScore: number;
}

interface LearningMetrics {
  totalLearningTime: number;
  completedTasks: number;
  successRate: number;
  moduleEfficiency: { [key: string]: number };
  adaptationSpeed: number;
}

export const useMioraEvaluation = () => {
  const { toast } = useToast();
  const { learningModules, learningStats, getAverageModuleEfficiency } = useAutodidacticLearning();
  const [currentReport, setCurrentReport] = useState<EvaluationReport | null>(null);
  const [evaluationHistory, setEvaluationHistory] = useState<EvaluationReport[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [autoEvaluationEnabled, setAutoEvaluationEnabled] = useState(true);
  
  const evaluationInterval = useRef<NodeJS.Timeout | null>(null);
  const lastEvaluationTime = useRef<number>(0);

  // Start auto-evaluation every 24 hours
  useEffect(() => {
    if (autoEvaluationEnabled) {
      startAutoEvaluation();
    } else {
      stopAutoEvaluation();
    }

    return () => {
      if (evaluationInterval.current) {
        clearInterval(evaluationInterval.current);
      }
    };
  }, [autoEvaluationEnabled]);

  const startAutoEvaluation = () => {
    // Run evaluation every 24 hours (86400000 ms)
    // For demo purposes, using 30 seconds
    evaluationInterval.current = setInterval(() => {
      performSelfEvaluation();
    }, 30000);

    toast({
      title: "🧠 Auto Evaluation Activated",
      description: "MIORA akan melakukan evaluasi mandiri setiap 24 jam",
      duration: 4000,
    });
  };

  const stopAutoEvaluation = () => {
    if (evaluationInterval.current) {
      clearInterval(evaluationInterval.current);
      evaluationInterval.current = null;
    }
  };

  const performSelfEvaluation = async () => {
    if (isEvaluating) return;
    
    setIsEvaluating(true);
    
    try {
      const metrics = calculateLearningMetrics();
      const report = generateEvaluationReport(metrics);
      
      setCurrentReport(report);
      setEvaluationHistory(prev => [...prev.slice(-9), report]);
      lastEvaluationTime.current = Date.now();
      
      toast({
        title: "📊 Evaluasi Pembelajaran Selesai",
        description: `Skor keseluruhan: ${report.overallScore}% - ${getPerformanceLevel(report.overallScore)}`,
        duration: 5000,
      });
      
    } catch (error) {
      console.error('Evaluation error:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const calculateLearningMetrics = (): LearningMetrics => {
    const activeModules = learningModules.filter(m => m.isActive);
    const totalEfficiency = activeModules.reduce((sum, m) => sum + m.efficiency, 0);
    const avgEfficiency = totalEfficiency / activeModules.length;
    
    return {
      totalLearningTime: learningStats.totalLearningHours,
      completedTasks: learningStats.completedTasks,
      successRate: Math.min(95, 70 + (learningStats.completedTasks / 10)),
      moduleEfficiency: learningModules.reduce((acc, m) => ({
        ...acc,
        [m.id]: m.efficiency
      }), {}),
      adaptationSpeed: avgEfficiency
    };
  };

  const generateEvaluationReport = (metrics: LearningMetrics): EvaluationReport => {
    const activeModules = learningModules
      .filter(m => m.isActive && m.efficiency > 80)
      .map(m => m.name);
    
    const missedModules = learningModules
      .filter(m => !m.isActive || m.efficiency < 60)
      .map(m => m.name);

    const weeklyProgress = Math.min(100, 
      (metrics.successRate * 0.4) + 
      (getAverageModuleEfficiency() * 0.3) + 
      (Math.min(metrics.completedTasks, 50) * 0.6)
    );

    const bottlenecks = [];
    if (getAverageModuleEfficiency() < 80) {
      bottlenecks.push('Efisiensi modul pembelajaran rendah');
    }
    if (metrics.completedTasks < 10) {
      bottlenecks.push('Jumlah tugas yang diselesaikan kurang optimal');
    }
    if (missedModules.length > 2) {
      bottlenecks.push('Beberapa modul tidak aktif');
    }

    const recommendations = [];
    if (bottlenecks.includes('Efisiensi modul pembelajaran rendah')) {
      recommendations.push('Optimasi algoritma pembelajaran pada modul dengan performa rendah');
    }
    if (bottlenecks.includes('Jumlah tugas yang diselesaikan kurang optimal')) {
      recommendations.push('Tingkatkan frekuensi generasi tugas pembelajaran otomatis');
    }
    if (missedModules.length > 0) {
      recommendations.push(`Reaktivasi modul: ${missedModules.slice(0, 2).join(', ')}`);
    }

    return {
      timestamp: Date.now(),
      weeklyProgress: Math.round(weeklyProgress),
      activeModules,
      missedModules,
      reasoningCapability: Math.round(85 + (metrics.successRate * 0.15)),
      systemImprovements: learningStats.autonomousImprovement,
      bottlenecks,
      optimizationRecommendations: recommendations,
      overallScore: Math.round((weeklyProgress + metrics.successRate + getAverageModuleEfficiency()) / 3)
    };
  };

  const getPerformanceLevel = (score: number): string => {
    if (score >= 90) return 'Excellent Performance';
    if (score >= 80) return 'Good Performance';
    if (score >= 70) return 'Average Performance';
    if (score >= 60) return 'Below Average';
    return 'Needs Improvement';
  };

  const generateReportSummary = (report: EvaluationReport): string => {
    return `📊 LAPORAN EVALUASI MIORA
    
🎯 Progres Mingguan: ${report.weeklyProgress}%
🧠 Kemampuan Reasoning: ${report.reasoningCapability}%
⚡ Skor Keseluruhan: ${report.overallScore}% (${getPerformanceLevel(report.overallScore)})

✅ Modul Aktif (${report.activeModules.length}):
${report.activeModules.map(m => `• ${m}`).join('\n')}

⚠️ Modul Terlewat (${report.missedModules.length}):
${report.missedModules.map(m => `• ${m}`).join('\n')}

🚧 Bottleneck Terdeteksi:
${report.bottlenecks.map(b => `• ${b}`).join('\n')}

💡 Rekomendasi Optimalisasi:
${report.optimizationRecommendations.map(r => `• ${r}`).join('\n')}

🔄 Perbaikan Sistem: ${report.systemImprovements} improvement otomatis
📅 Evaluasi Berikutnya: ${new Date(report.timestamp + 86400000).toLocaleString()}`;
  };

  return {
    currentReport,
    evaluationHistory,
    isEvaluating,
    autoEvaluationEnabled,
    setAutoEvaluationEnabled,
    performSelfEvaluation,
    generateReportSummary,
    getPerformanceLevel,
    lastEvaluationTime: lastEvaluationTime.current
  };
};
