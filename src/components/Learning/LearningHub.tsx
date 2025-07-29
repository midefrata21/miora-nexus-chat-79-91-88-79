
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Target, TrendingUp, Zap, Infinity } from 'lucide-react';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';
import { AdaptiveLearningEngine } from './AdaptiveLearningEngine';
import { SkillAssessment } from './SkillAssessment';
import { LearningAnalytics } from './LearningAnalytics';
import { MIORAInfinityLearning } from './MIORAInfinityLearning';

type ActiveTab = 'recommendations' | 'adaptive' | 'assessment' | 'analytics' | 'infinity';

export const LearningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('infinity');

  const tabs = [
    {
      id: 'infinity' as ActiveTab,
      label: 'MIORA Infinity',
      icon: Infinity,
      description: 'Sistem pembelajaran otomatis tanpa batas',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'recommendations' as ActiveTab,
      label: 'Recommendations',
      icon: Brain,
      description: 'Rekomendasi pembelajaran yang dipersonalisasi',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'adaptive' as ActiveTab,
      label: 'Adaptive Engine',
      icon: Zap,
      description: 'Mesin pembelajaran yang menyesuaikan gaya belajar',
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: 'assessment' as ActiveTab,
      label: 'Skill Assessment',
      icon: Target,
      description: 'Evaluasi dan sertifikasi kemampuan',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 'analytics' as ActiveTab,
      label: 'Analytics',
      icon: TrendingUp,
      description: 'Analisis progress dan performa pembelajaran',
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'infinity':
        return <MIORAInfinityLearning />;
      case 'recommendations':
        return <PersonalizedRecommendations />;
      case 'adaptive':
        return <AdaptiveLearningEngine />;
      case 'assessment':
        return <SkillAssessment />;
      case 'analytics':
        return <LearningAnalytics />;
      default:
        return <MIORAInfinityLearning />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <Card className="bg-gradient-to-br from-gray-800/70 to-gray-700/70 border-gray-500/40 shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center text-gray-100 text-2xl font-bold">
            <BookOpen className="w-8 h-8 mr-4" />
            MIORA Learning Hub - Advanced AI Development Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={isActive ? "default" : "outline"}
                  className={`h-auto p-6 flex flex-col items-center text-center transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${tab.color} text-white shadow-xl transform scale-105 border-none` 
                      : 'hover:scale-102 border-gray-500/50 text-gray-200 hover:text-white hover:border-gray-400/70 bg-gray-800/30 hover:bg-gray-700/50'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 mb-3 ${isActive ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-base mb-2">{tab.label}</span>
                  <span className="text-sm opacity-90 leading-tight">{tab.description}</span>
                  {tab.id === 'infinity' && (
                    <Badge className="mt-3 bg-purple-500/30 text-purple-200 border-purple-400/40 animate-pulse px-3 py-1">
                      NEW
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
};
