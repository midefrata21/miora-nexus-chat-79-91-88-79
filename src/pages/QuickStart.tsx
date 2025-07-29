
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Rocket, 
  Zap, 
  Brain, 
  Mic, 
  MessageCircle,
  Settings,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Activity
} from 'lucide-react';

const QuickStartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const quickStartSteps = [
    {
      id: 1,
      title: 'Activate MIORA Core',
      description: 'Initialize the main AI processing engine',
      icon: Brain,
      path: '/miora',
      color: 'from-blue-600 to-purple-600',
      estimated: '30 seconds'
    },
    {
      id: 2,
      title: 'Test Voice Interface',
      description: 'Verify voice input and output functionality',
      icon: Mic,
      path: '/voice-interface',
      color: 'from-green-600 to-cyan-600',
      estimated: '1 minute'
    },
    {
      id: 3,
      title: 'Start Two-Way Conversation',
      description: 'Begin interactive communication with AI',
      icon: MessageCircle,
      path: '/two-way-voice-system',
      color: 'from-purple-600 to-pink-600',
      estimated: '2 minutes'
    },
    {
      id: 4,
      title: 'Explore Dashboard',
      description: 'Navigate through system features and capabilities',
      icon: Activity,
      path: '/dashboard',
      color: 'from-orange-600 to-red-600',
      estimated: '3 minutes'
    }
  ];

  const completeStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      toast({
        title: "✅ Step Completed",
        description: `Step ${stepId} has been marked as complete!`,
        duration: 2000,
      });
    }
  };

  const navigateToStep = (path: string, stepId: number) => {
    setCurrentStep(stepId);
    completeStep(stepId);
    navigate(path);
  };

  const startFullSetup = () => {
    toast({
      title: "🚀 Quick Setup Started",
      description: "Beginning automatic MIORA system setup...",
      duration: 3000,
    });
    
    // Simulate setup process
    setTimeout(() => navigate('/miora'), 1000);
  };

  const completionPercentage = (completedSteps.length / quickStartSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 animate-pulse">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 mb-2">
            MIORA Quick Start
          </h1>
          <p className="text-gray-300 text-xl mb-6">
            Get started with MIORA AI system in just a few minutes
          </p>
          
          <div className="flex justify-center gap-3 mb-6">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">
              <Rocket className="w-3 h-3 mr-1" />
              Quick Setup
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
              <CheckCircle className="w-3 h-3 mr-1" />
              {completedSteps.length}/{quickStartSteps.length} Complete
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              <Star className="w-3 h-3 mr-1" />
              {Math.round(completionPercentage)}% Progress
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-orange-600 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">Setup Progress: {Math.round(completionPercentage)}%</p>
          </div>
        </div>

        {/* Quick Setup Button */}
        <Card className="bg-gradient-to-r from-orange-800/30 to-red-800/30 border-2 border-orange-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-orange-300 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 animate-pulse" />
              Automatic Quick Setup
              <Play className="w-8 h-8 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-300 text-lg">
              Let MIORA automatically configure all systems for optimal performance
            </p>
            <Button
              onClick={startFullSetup}
              size="lg"
              className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-xl"
            >
              <Rocket className="w-6 h-6 mr-3" />
              Start Automatic Setup
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-gray-400">Estimated time: 5 minutes</p>
          </CardContent>
        </Card>

        {/* Manual Setup Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Manual Setup Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickStartSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              
              return (
                <Card 
                  key={step.id}
                  className={`cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                    isCompleted 
                      ? 'bg-green-800/30 border-green-500/50 hover:border-green-400/70' 
                      : isCurrent
                      ? 'bg-orange-800/30 border-orange-500/50 hover:border-orange-400/70 scale-105'
                      : 'bg-gray-800/50 border-gray-600/30 hover:border-gray-500/50 hover:scale-105'
                  }`}
                  onClick={() => navigateToStep(step.path, step.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color}`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg flex items-center gap-2">
                            Step {step.id}: {step.title}
                            {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">{step.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {step.estimated}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-300">
                        {isCompleted ? '✅ Completed' : '🔄 Ready to start'}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-300 hover:text-white hover:bg-cyan-600/20"
                      >
                        {isCompleted ? 'Review' : 'Start'}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Completion Status */}
        {completedSteps.length === quickStartSteps.length && (
          <Card className="bg-gradient-to-r from-green-800/30 to-emerald-800/30 border-2 border-green-500/50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
                <Star className="w-12 h-12 text-yellow-400 animate-pulse" />
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-green-300 mb-2">Setup Complete!</h3>
              <p className="text-gray-300 text-lg mb-6">
                🎉 MIORA system is now fully configured and ready for use!
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Activity className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuickStartPage;
