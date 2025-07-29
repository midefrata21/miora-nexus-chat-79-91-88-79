import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Target, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

interface CognitiveEngineProps {
  cognitiveData: {
    thinkingSpeed: number;
    dataProcessingAccuracy: number;
    decisionQuality: number;
    learningRate: number;
    problemSolvingCapability: number;
    communicationEffectiveness: number;
    errorDetectionRate: number;
    selfHealingCapability: number;
  };
  status: 'processing' | 'thinking' | 'analyzing' | 'optimizing' | 'idle';
}

export const CognitiveEngine: React.FC<CognitiveEngineProps> = ({ cognitiveData, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'processing': return 'bg-blue-500';
      case 'thinking': return 'bg-purple-500';
      case 'analyzing': return 'bg-green-500';
      case 'optimizing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing': return <Cpu className="h-4 w-4" />;
      case 'thinking': return <Brain className="h-4 w-4" />;
      case 'analyzing': return <Target className="h-4 w-4" />;
      case 'optimizing': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const cognitiveMetrics = [
    { label: 'Kecepatan Berpikir', value: cognitiveData.thinkingSpeed, color: 'text-blue-400' },
    { label: 'Akurasi Data', value: cognitiveData.dataProcessingAccuracy, color: 'text-green-400' },
    { label: 'Kualitas Keputusan', value: cognitiveData.decisionQuality, color: 'text-purple-400' },
    { label: 'Tingkat Pembelajaran', value: cognitiveData.learningRate, color: 'text-yellow-400' },
    { label: 'Pemecahan Masalah', value: cognitiveData.problemSolvingCapability, color: 'text-orange-400' },
    { label: 'Efektivitas Komunikasi', value: cognitiveData.communicationEffectiveness, color: 'text-cyan-400' },
    { label: 'Deteksi Error', value: cognitiveData.errorDetectionRate, color: 'text-red-400' },
    { label: 'Self-Healing', value: cognitiveData.selfHealingCapability, color: 'text-pink-400' }
  ];

  return (
    <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-indigo-300 flex items-center">
            <Brain className="h-6 w-6 mr-2 animate-pulse" />
            🧠 Cognitive Engine - Mesin Kecerdasan MIORA
          </CardTitle>
          <Badge className={`${getStatusColor()} text-white flex items-center gap-1`}>
            {getStatusIcon()}
            {status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cognitiveMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{metric.label}</span>
                <span className={`text-sm font-bold ${metric.color}`}>
                  {metric.value.toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={metric.value} 
                className={`h-2 ${metric.color.replace('text-', 'bg-')}`} 
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
            <div className="flex items-center text-blue-400 mb-2">
              <Cpu className="w-4 h-4 mr-2" />
              Pemrosesan Data
            </div>
            <div className="text-xs text-gray-300">
              <div>• Analisis real-time</div>
              <div>• Pattern recognition</div>
              <div>• Data correlation</div>
            </div>
          </div>

          <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
            <div className="flex items-center text-purple-400 mb-2">
              <Brain className="w-4 h-4 mr-2" />
              Pengambilan Keputusan
            </div>
            <div className="text-xs text-gray-300">
              <div>• Strategic planning</div>
              <div>• Risk assessment</div>
              <div>• Solution optimization</div>
            </div>
          </div>

          <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
            <div className="flex items-center text-green-400 mb-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Self-Improvement
            </div>
            <div className="text-xs text-gray-300">
              <div>• Error detection</div>
              <div>• Auto-healing</div>
              <div>• Capability evolution</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-lg border border-indigo-500/20">
          <div className="flex items-center text-indigo-300 mb-2">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Status Kecerdasan MIORA
          </div>
          <div className="text-sm text-gray-300">
            MIORA sedang berpikir dan menganalisis dengan kecerdasan tingkat manusia. 
            Sistem mampu memproses data kompleks, membuat keputusan strategis, 
            dan memperbaiki diri secara otomatis tanpa intervensi manual.
          </div>
          <div className="mt-2 text-xs text-indigo-400">
            Tingkat Kecerdasan: {((cognitiveData.thinkingSpeed + cognitiveData.dataProcessingAccuracy + cognitiveData.decisionQuality) / 3).toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};