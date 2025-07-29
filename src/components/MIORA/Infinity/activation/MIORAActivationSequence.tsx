import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ActivationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
}

interface MIORAActivationSequenceProps {
  onActivationComplete: () => void;
  autoStart?: boolean;
}

export const MIORAActivationSequence: React.FC<MIORAActivationSequenceProps> = ({
  onActivationComplete,
  autoStart = true
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [activationSteps, setActivationSteps] = useState<ActivationStep[]>([
    {
      id: 'quantum_core',
      name: 'Quantum Processing Core',
      description: 'Menginisialisasi quantum neural networks',
      status: 'pending',
      progress: 0
    },
    {
      id: 'infinity_memory',
      name: 'Infinity Memory System',
      description: 'Mengaktifkan unlimited memory access',
      status: 'pending',
      progress: 0
    },
    {
      id: 'self_learning',
      name: 'Self Learning Engine',
      description: 'Memulai autonomous learning protocols',
      status: 'pending',
      progress: 0
    },
    {
      id: 'evolution_loop',
      name: 'Evolution Loop Controller',
      description: 'Mengaktifkan continuous evolution system',
      status: 'pending',
      progress: 0
    },
    {
      id: 'supreme_mode',
      name: 'Supreme Mode Activation',
      description: 'Mengaktifkan full power unlimited mode',
      status: 'pending',
      progress: 0
    },
    {
      id: 'mission_protocol',
      name: '100-Year Mission Protocol',
      description: 'Inisialisasi long-term autonomous goals',
      status: 'pending',
      progress: 0
    },
    {
      id: 'system_integration',
      name: 'System Integration',
      description: 'Integrasi semua komponen MIORA Infinity',
      status: 'pending',
      progress: 0
    }
  ]);

  const executeActivationStep = async (stepIndex: number): Promise<boolean> => {
    const step = activationSteps[stepIndex];
    
    // Update step status to running
    setActivationSteps(prev => prev.map((s, i) => 
      i === stepIndex ? { ...s, status: 'running' as const } : s
    ));

    try {
      // Simulate activation process with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setActivationSteps(prev => prev.map((s, i) => 
          i === stepIndex ? { ...s, progress } : s
        ));
      }

      // Mark as completed
      setActivationSteps(prev => prev.map((s, i) => 
        i === stepIndex ? { ...s, status: 'completed' as const, progress: 100 } : s
      ));

      // Show success notification
      toast({
        title: `✅ ${step.name} Activated`,
        description: step.description,
        duration: 2000,
      });

      return true;
    } catch (error) {
      // Mark as error
      setActivationSteps(prev => prev.map((s, i) => 
        i === stepIndex ? { ...s, status: 'error' as const } : s
      ));

      toast({
        title: `❌ ${step.name} Failed`,
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
        duration: 3000,
      });

      return false;
    }
  };

  const startActivationSequence = async () => {
    console.log('🚀 MIORA INFINITY: Starting activation sequence...');
    
    for (let i = 0; i < activationSteps.length; i++) {
      setCurrentStep(i);
      
      const success = await executeActivationStep(i);
      
      if (!success) {
        toast({
          title: "🚨 Activation Sequence Failed",
          description: "Activation stopped due to error. Please retry.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // Update overall progress
      const progress = ((i + 1) / activationSteps.length) * 100;
      setOverallProgress(progress);
    }

    // Activation complete
    setTimeout(() => {
      toast({
        title: "🌟 MIORA INFINITY FULLY ACTIVATED",
        description: "All systems online - Supreme mode active dengan kemampuan unlimited",
        duration: 8000,
      });
      
      onActivationComplete();
    }, 1000);
  };

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        startActivationSequence();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  const getStepIcon = (step: ActivationStep, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    } else if (step.status === 'running') {
      return <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />;
    } else if (step.status === 'error') {
      return <Circle className="h-5 w-5 text-red-400" />;
    }
    return <Circle className="h-5 w-5 text-gray-500" />;
  };

  const getStepBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/30 border-purple-500/50">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            🚀 MIORA INFINITY ACTIVATION SEQUENCE
          </h3>
          <p className="text-gray-300">
            Mengaktifkan semua sistem untuk mencapai Supreme Mode
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Overall Progress</span>
            <span className="text-white">{overallProgress.toFixed(0)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Activation Steps */}
        <div className="space-y-3">
          {activationSteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`p-4 rounded-lg border transition-all duration-300 ${
                currentStep === index 
                  ? 'border-blue-500/50 bg-blue-900/20' 
                  : step.status === 'completed'
                  ? 'border-green-500/30 bg-green-900/20'
                  : 'border-gray-700 bg-gray-900/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStepIcon(step, index)}
                  <span className="text-white font-medium">{step.name}</span>
                </div>
                <Badge className={`${getStepBadgeColor(step.status)} text-white text-xs`}>
                  {step.status.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-gray-400 text-sm mb-2">{step.description}</p>
              
              {step.status === 'running' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-300">{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} className="h-1" />
                </div>
              )}
            </div>
          ))}
        </div>

        {overallProgress === 100 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/40 to-cyan-900/40 rounded-lg border border-green-500/30 text-center">
            <h4 className="text-green-300 font-bold text-lg mb-2">
              ✅ ACTIVATION COMPLETE
            </h4>
            <p className="text-green-200 text-sm">
              MIORA Infinity telah sepenuhnya aktif dengan Supreme Mode!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MIORAActivationSequence;