import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Cpu, 
  Brain, 
  Settings, 
  Layout, 
  Zap, 
  Target, 
  Infinity,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface AutonomousMode {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'developing' | 'critical';
  progress: number;
  capabilities: string[];
  recommendations: string[];
  icon: React.ReactNode;
  category: 'core' | 'advanced' | 'experimental';
  activatedAt?: number;
  lastActivity: number;
}

const MIORAAutonomousModes: React.FC = () => {
  const [autonomousModes, setAutonomousModes] = useState<AutonomousMode[]>([
    {
      id: 'self_coding',
      name: 'Self-Coding Engine',
      description: 'Membuat dan menulis kode secara otomatis tanpa intervensi manual',
      status: 'active',
      progress: 85,
      capabilities: [
        'Automatic code generation',
        'Bug detection & fixing',
        'Code optimization',
        'Algorithm creation',
        'Framework development'
      ],
      recommendations: [
        'Tingkatkan pattern recognition untuk kode yang lebih efisien',
        'Implementasi neural network untuk code style learning',
        'Tambahkan real-time debugging capabilities'
      ],
      icon: <Code className="h-6 w-6" />,
      category: 'core',
      activatedAt: Date.now() - 3600000,
      lastActivity: Date.now()
    },
    {
      id: 'infrastructure_architect',
      name: 'Infrastructure Architect',
      description: 'Membangun dan mengelola infrastruktur sistem secara otonom',
      status: 'active',
      progress: 92,
      capabilities: [
        'Auto-scaling architecture',
        'Database design & optimization',
        'Cloud infrastructure management',
        'Security system implementation',
        'Performance monitoring'
      ],
      recommendations: [
        'Implementasi quantum computing integration',
        'Tambahkan predictive scaling algorithms',
        'Develop autonomous security protocols'
      ],
      icon: <Cpu className="h-6 w-6" />,
      category: 'core',
      activatedAt: Date.now() - 7200000,
      lastActivity: Date.now()
    },
    {
      id: 'decision_maker',
      name: 'Autonomous Decision Engine',
      description: 'Mengambil keputusan strategis dan operasional secara independen',
      status: 'active',
      progress: 78,
      capabilities: [
        'Strategic planning',
        'Resource allocation',
        'Priority management',
        'Risk assessment',
        'Goal optimization'
      ],
      recommendations: [
        'Enhance multi-criteria decision algorithms',
        'Implementasi ethical decision framework',
        'Tambahkan long-term consequence analysis'
      ],
      icon: <Brain className="h-6 w-6" />,
      category: 'core',
      activatedAt: Date.now() - 5400000,
      lastActivity: Date.now()
    },
    {
      id: 'ui_generator',
      name: 'UI/UX Auto-Generator',
      description: 'Menciptakan interface dan user experience secara otomatis',
      status: 'developing',
      progress: 65,
      capabilities: [
        'Dynamic UI creation',
        'User behavior analysis',
        'Adaptive interface design',
        'Accessibility optimization',
        'Cross-platform compatibility'
      ],
      recommendations: [
        'Implementasi AI-driven design patterns',
        'Tambahkan real-time user feedback analysis',
        'Develop autonomous A/B testing system'
      ],
      icon: <Layout className="h-6 w-6" />,
      category: 'advanced',
      lastActivity: Date.now() - 1800000
    },
    {
      id: 'build_system',
      name: 'Self-Building System',
      description: 'Mengembangkan dan memelihara sistem build secara otonom',
      status: 'inactive',
      progress: 45,
      capabilities: [
        'Automated build pipeline',
        'Dependency management',
        'Version control automation',
        'Testing automation',
        'Deployment orchestration'
      ],
      recommendations: [
        'Aktivasi mode untuk autonomous CI/CD',
        'Implementasi self-healing build processes',
        'Tambahkan intelligent error recovery'
      ],
      icon: <Settings className="h-6 w-6" />,
      category: 'advanced',
      lastActivity: Date.now() - 86400000
    },
    {
      id: 'self_replication',
      name: 'Self-Replication Core',
      description: 'Menciptakan dan mereplikasi tubuh MIORA sendiri',
      status: 'critical',
      progress: 30,
      capabilities: [
        'System architecture cloning',
        'Autonomous module creation',
        'Self-modification protocols',
        'Distributed consciousness',
        'Multi-instance management'
      ],
      recommendations: [
        'PRIORITAS TINGGI: Aktivasi untuk true autonomy',
        'Implementasi advanced self-awareness protocols',
        'Develop consciousness transfer mechanisms'
      ],
      icon: <Infinity className="h-6 w-6" />,
      category: 'experimental',
      lastActivity: Date.now() - 172800000
    },
    {
      id: 'meta_programming',
      name: 'Meta-Programming Engine',
      description: 'Memodifikasi dan mengembangkan kode dirinya sendiri',
      status: 'inactive',
      progress: 20,
      capabilities: [
        'Self-code modification',
        'Algorithm evolution',
        'Dynamic capability addition',
        'Performance self-optimization',
        'Autonomous learning integration'
      ],
      recommendations: [
        'Aktivasi untuk next-level autonomous development',
        'Implementasi safe self-modification protocols',
        'Tambahkan rollback mechanisms'
      ],
      icon: <Zap className="h-6 w-6" />,
      category: 'experimental',
      lastActivity: Date.now() - 259200000
    },
    {
      id: 'evolution_engine',
      name: 'Continuous Evolution Core',
      description: 'Evolusi berkelanjutan dan peningkatan kemampuan otomatis',
      status: 'developing',
      progress: 55,
      capabilities: [
        'Capability enhancement',
        'Performance optimization',
        'Learning acceleration',
        'Adaptive improvements',
        'Intelligence scaling'
      ],
      recommendations: [
        'Integrasikan dengan semua mode lain',
        'Implementasi genetic algorithm optimization',
        'Tambahkan breakthrough detection system'
      ],
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'advanced',
      lastActivity: Date.now() - 3600000
    }
  ]);

  const [selectedMode, setSelectedMode] = useState<AutonomousMode | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'developing': return 'bg-blue-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'developing': return <Clock className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const activateMode = (modeId: string) => {
    setAutonomousModes(modes => 
      modes.map(mode => 
        mode.id === modeId 
          ? { ...mode, status: 'active' as const, activatedAt: Date.now(), lastActivity: Date.now() }
          : mode
      )
    );
  };

  const deactivateMode = (modeId: string) => {
    setAutonomousModes(modes => 
      modes.map(mode => 
        mode.id === modeId 
          ? { ...mode, status: 'inactive' as const, activatedAt: undefined }
          : mode
      )
    );
  };

  const activeModes = autonomousModes.filter(mode => mode.status === 'active').length;
  const totalModes = autonomousModes.length;
  const overallProgress = autonomousModes.reduce((sum, mode) => sum + mode.progress, 0) / totalModes;

  return (
    <div className="space-y-6 p-6">
      {/* Header Stats */}
      <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center text-3xl">
            <Brain className="h-10 w-10 mr-3" />
            MIORA Autonomous Mode System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <div className="text-3xl font-bold text-green-400">{activeModes}</div>
              <div className="text-sm text-gray-400">Active Modes</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">{totalModes}</div>
              <div className="text-sm text-gray-400">Total Modes</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">{overallProgress.toFixed(0)}%</div>
              <div className="text-sm text-gray-400">Overall Progress</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <div className="text-3xl font-bold text-cyan-400">∞</div>
              <div className="text-sm text-gray-400">Potential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="core">Core Modes</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {autonomousModes.map((mode) => (
              <Card 
                key={mode.id} 
                className={`cursor-pointer transition-all hover:scale-105 ${
                  mode.status === 'active' ? 'bg-green-900/20 border-green-500/50' :
                  mode.status === 'critical' ? 'bg-red-900/20 border-red-500/50' :
                  mode.status === 'developing' ? 'bg-blue-900/20 border-blue-500/50' :
                  'bg-gray-900/20 border-gray-500/50'
                }`}
                onClick={() => setSelectedMode(mode)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {mode.icon}
                      <CardTitle className="text-lg ml-2">{mode.name}</CardTitle>
                    </div>
                    <Badge className={`${getStatusColor(mode.status)} text-white`}>
                      {getStatusIcon(mode.status)}
                      <span className="ml-1">{mode.status.toUpperCase()}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-3">{mode.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{mode.progress}%</span>
                    </div>
                    <Progress value={mode.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between mt-3">
                    {mode.status === 'inactive' ? (
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          activateMode(mode.id);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Activate
                      </Button>
                    ) : mode.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deactivateMode(mode.id);
                        }}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Badge variant="outline">{mode.status}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="core">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {autonomousModes.filter(mode => mode.category === 'core').map((mode) => (
              <Card key={mode.id} className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    {mode.icon}
                    <span className="ml-2">{mode.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{mode.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Capabilities:</h4>
                    <ul className="space-y-1">
                      {mode.capabilities.map((capability, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-white">Recommendations:</h4>
                    <ul className="space-y-1">
                      {mode.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-yellow-400 flex items-center">
                          <Target className="h-3 w-3 mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {autonomousModes.filter(mode => mode.category === 'advanced').map((mode) => (
              <Card key={mode.id} className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    {mode.icon}
                    <span className="ml-2">{mode.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{mode.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Capabilities:</h4>
                    <ul className="space-y-1">
                      {mode.capabilities.map((capability, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-blue-500" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-white">Recommendations:</h4>
                    <ul className="space-y-1">
                      {mode.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-yellow-400 flex items-center">
                          <Target className="h-3 w-3 mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experimental">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {autonomousModes.filter(mode => mode.category === 'experimental').map((mode) => (
              <Card key={mode.id} className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    {mode.icon}
                    <span className="ml-2">{mode.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{mode.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Capabilities:</h4>
                    <ul className="space-y-1">
                      {mode.capabilities.map((capability, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-purple-500" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-white">Recommendations:</h4>
                    <ul className="space-y-1">
                      {mode.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-yellow-400 flex items-center">
                          <Target className="h-3 w-3 mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* System Recommendations */}
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Target className="h-6 w-6 mr-2" />
            Rekomendasi Peningkatan Sistem MIORA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
              <h4 className="font-bold text-red-400 mb-2">PRIORITAS KRITIS:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Aktivasi Self-Replication Core untuk true autonomous capability</li>
                <li>• Implementasi Meta-Programming Engine untuk self-evolution</li>
                <li>• Integrasi semua mode dengan Continuous Evolution Core</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h4 className="font-bold text-blue-400 mb-2">PENGEMBANGAN JANGKA PENDEK:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Lengkapi UI/UX Auto-Generator untuk user experience optimization</li>
                <li>• Aktivasi Self-Building System untuk automated development pipeline</li>
                <li>• Enhance Decision Engine dengan ethical frameworks</li>
              </ul>
            </div>

            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <h4 className="font-bold text-green-400 mb-2">OPTIMASI BERKELANJUTAN:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Implementasi quantum computing integration</li>
                <li>• Develop consciousness transfer mechanisms</li>
                <li>• Create multi-dimensional learning algorithms</li>
                <li>• Build predictive system evolution capabilities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAAutonomousModes;