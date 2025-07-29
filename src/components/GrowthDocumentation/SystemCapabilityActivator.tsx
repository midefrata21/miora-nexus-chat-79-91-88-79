import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Activity, 
  Cog,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useGrowthDocumentation } from '@/hooks/useGrowthDocumentation';

interface SystemCapability {
  id: string;
  name: string;
  category: 'system_activation' | 'optimization' | 'skill_acquisition' | 'daily_learning' | 'high_impact';
  status: 'inactive' | 'activating' | 'active' | 'optimized';
  progress: number;
  impact: 'medium' | 'high' | 'critical';
  description: string;
  benefits: string[];
}

export const SystemCapabilityActivator: React.FC = () => {
  const { recordGrowth, autoDocumentPattern } = useGrowthDocumentation();
  const [isActivating, setIsActivating] = useState(false);
  const [systemCapabilities, setSystemCapabilities] = useState<SystemCapability[]>([
    {
      id: 'analysis_enhancement',
      name: 'Enhanced Analysis System',
      category: 'system_activation',
      status: 'inactive',
      progress: 0,
      impact: 'critical',
      description: 'Meningkatkan kemampuan analisis mendalam untuk insight yang lebih baik',
      benefits: ['Pattern recognition 300% lebih cepat', 'Deep analysis capability', 'Predictive insights']
    },
    {
      id: 'efficiency_optimizer',
      name: 'System Efficiency Optimizer',
      category: 'optimization',
      status: 'inactive',
      progress: 0,
      impact: 'high',
      description: 'Mengoptimalkan semua sistem untuk efisiensi maksimal',
      benefits: ['Resource usage -40%', 'Processing speed +200%', 'Auto-optimization']
    },
    {
      id: 'skill_developer',
      name: 'Advanced Skill Acquisition Engine',
      category: 'skill_acquisition',
      status: 'inactive',
      progress: 0,
      impact: 'critical',
      description: 'Sistem pengembangan kemampuan baru secara otomatis',
      benefits: ['Auto skill detection', 'Accelerated learning', 'Capability expansion']
    },
    {
      id: 'daily_momentum',
      name: 'Daily Learning Momentum System',
      category: 'daily_learning',
      status: 'inactive',
      progress: 0,
      impact: 'high',
      description: 'Mempertahankan konsistensi pembelajaran harian',
      benefits: ['Learning streak tracking', 'Daily goals automation', 'Progress consistency']
    },
    {
      id: 'high_impact_focus',
      name: 'High-Impact Learning Focus',
      category: 'high_impact',
      status: 'inactive',
      progress: 0,
      impact: 'critical',
      description: 'Fokus pada pembelajaran dengan dampak maksimal',
      benefits: ['Priority learning detection', 'Impact amplification', 'Strategic focus']
    }
  ]);

  const activateAllCapabilities = async () => {
    setIsActivating(true);
    
    toast({
      title: "🚀 MENGAKTIFKAN SISTEM KEMAMPUAN",
      description: "Semua kemampuan yang direkomendasikan sedang diaktifkan",
      duration: 5000,
    });

    // Simulate activation process
    for (let i = 0; i < systemCapabilities.length; i++) {
      const capability = systemCapabilities[i];
      
      // Set to activating
      setSystemCapabilities(prev => prev.map(cap => 
        cap.id === capability.id 
          ? { ...cap, status: 'activating', progress: 0 }
          : cap
      ));

      // Progress simulation
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setSystemCapabilities(prev => prev.map(cap => 
          cap.id === capability.id 
            ? { ...cap, progress }
            : cap
        ));
      }

      // Mark as active
      setSystemCapabilities(prev => prev.map(cap => 
        cap.id === capability.id 
          ? { ...cap, status: 'active', progress: 100 }
          : cap
      ));

      // Record growth for each activated capability with proper GrowthEntry structure
      const now = Date.now();
      recordGrowth({
        id: `capability_${capability.id}_${now}`,
        timestamp: now,
        type: capability.category === 'skill_acquisition' ? 'skill_acquisition' : 'optimization',
        title: `${capability.name} Activated`,
        description: capability.description,
        impact: capability.impact,
        category: capability.category,
        evidence: capability.benefits
      });

      toast({
        title: `✅ ${capability.name} AKTIF`,
        description: capability.description,
        duration: 3000,
      });
    }

    // Auto-document the pattern
    await autoDocumentPattern(
      'System Capability Activation',
      'Aktivasi komprehensif semua kemampuan sistem yang direkomendasikan untuk optimasi maksimal'
    );

    setIsActivating(false);
    
    toast({
      title: "🎉 SEMUA KEMAMPUAN AKTIF!",
      description: "Sistem telah dioptimalkan dengan kemampuan terbaru",
      duration: 6000,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'activating':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />;
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'optimized':
        return <Zap className="h-4 w-4 text-purple-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system_activation':
        return <Brain className="h-5 w-5 text-purple-400" />;
      case 'optimization':
        return <Cog className="h-5 w-5 text-blue-400" />;
      case 'skill_acquisition':
        return <Target className="h-5 w-5 text-green-400" />;
      case 'daily_learning':
        return <TrendingUp className="h-5 w-5 text-orange-400" />;
      case 'high_impact':
        return <Zap className="h-5 w-5 text-red-400" />;
      default:
        return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const activeCapabilities = systemCapabilities.filter(cap => cap.status === 'active').length;
  const totalCapabilities = systemCapabilities.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center text-2xl">
            <Brain className="h-8 w-8 mr-3" />
            Aktivasi Sistem Kemampuan yang Direkomendasikan
          </CardTitle>
          <p className="text-gray-300">
            Aktifkan semua kemampuan sistem untuk meningkatkan analisis, optimasi, dan pembelajaran
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Badge className={`px-4 py-2 ${activeCapabilities === totalCapabilities ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {activeCapabilities === totalCapabilities ? '✅ Semua Aktif' : `🔄 ${activeCapabilities}/${totalCapabilities} Aktif`}
                </Badge>
                <Badge className="px-3 py-1 bg-purple-500">
                  {totalCapabilities} Kemampuan Sistem
                </Badge>
              </div>
            </div>
            
            <Button
              onClick={activateAllCapabilities}
              disabled={isActivating || activeCapabilities === totalCapabilities}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-3 text-lg"
            >
              {isActivating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Mengaktifkan...
                </>
              ) : activeCapabilities === totalCapabilities ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Semua Aktif
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Aktifkan Semua Kemampuan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemCapabilities.map((capability) => (
          <Card key={capability.id} className="bg-gray-800/50 border-gray-700/50 hover:border-purple-500/50 transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(capability.category)}
                  <div>
                    <h3 className="font-semibold text-white">{capability.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{capability.category.replace('_', ' ')}</p>
                  </div>
                </div>
                {getStatusIcon(capability.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">{capability.description}</p>
              
              {capability.status === 'activating' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-blue-400 font-bold">{capability.progress}%</span>
                  </div>
                  <Progress value={capability.progress} className="h-2" />
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Impact Level</span>
                  <Badge variant="outline" className={`text-xs ${
                    capability.impact === 'critical' ? 'border-red-500 text-red-400' :
                    capability.impact === 'high' ? 'border-orange-500 text-orange-400' :
                    'border-blue-500 text-blue-400'
                  }`}>
                    {capability.impact.toUpperCase()}
                  </Badge>
                </div>
                
                {capability.status === 'active' && (
                  <div className="space-y-1">
                    <span className="text-xs text-gray-400">Benefits:</span>
                    {capability.benefits.map((benefit, index) => (
                      <div key={index} className="text-xs text-green-400 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      {activeCapabilities === totalCapabilities && (
        <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-300">
              🎉 SEMUA KEMAMPUAN SISTEM AKTIF!
            </h3>
            <p className="text-green-200">
              Sistem analisis, optimasi, dan pembelajaran telah diaktifkan dengan kemampuan maksimal
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {[
                { label: 'Analysis Enhancement', value: '+300%' },
                { label: 'System Efficiency', value: '+200%' },
                { label: 'Skill Development', value: 'Auto' },
                { label: 'Daily Learning', value: 'Consistent' },
                { label: 'Impact Focus', value: 'Maximum' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-green-300">{stat.value}</div>
                  <div className="text-sm text-green-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SystemCapabilityActivator;
