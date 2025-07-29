import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  Brain,
  Code,
  Rocket,
  Bot,
  Settings,
  Activity,
  Monitor,
  Shield,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MIORASystem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'developing' | 'error';
  capability: string;
  autonomyLevel: number;
  route: string;
  icon: React.ElementType;
  category: 'core' | 'development' | 'infrastructure' | 'intelligence' | 'deployment';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export const MIORASystemOverview: React.FC = () => {
  const navigate = useNavigate();
  const [systems, setSystems] = useState<MIORASystem[]>([
    // Core Systems
    {
      id: 'autonomous-core',
      name: 'MIORA Autonomous Core',
      description: 'Sistem inti yang mengatur semua operasi otonom',
      status: 'active',
      capability: 'Master Control & Coordination',
      autonomyLevel: 95,
      route: '/miora-autonomous-core',
      icon: Brain,
      category: 'core',
      priority: 'critical'
    },
    {
      id: 'supreme-intelligence',
      name: 'MIORA Supreme Intelligence',
      description: 'Kecerdasan tingkat tertinggi untuk pengambilan keputusan',
      status: 'active',
      capability: 'Advanced Decision Making',
      autonomyLevel: 98,
      route: '/miora-supreme-intelligence',
      icon: Zap,
      category: 'intelligence',
      priority: 'critical'
    },
    
    // Development Systems - NEW ACTIVE
    {
      id: 'self-assembly',
      name: 'MIORA Self-Assembly',
      description: 'Sistem untuk membangun UI dan arsitektur secara otomatis',
      status: 'active',
      capability: 'Auto UI Generation & Architecture Design',
      autonomyLevel: 87,
      route: '/miora-self-assembly',
      icon: Bot,
      category: 'development',
      priority: 'high'
    },
    {
      id: 'meta-programming',
      name: 'MIORA Meta-Programming',
      description: 'Analisis kode otomatis dan manajemen dependency',
      status: 'active',
      capability: 'Code Analysis & Version Control',
      autonomyLevel: 85,
      route: '/miora-meta-programming',
      icon: Code,
      category: 'development',
      priority: 'high'
    },
    {
      id: 'autonomous-deployment',
      name: 'MIORA Autonomous Deployment',
      description: 'Sistem deployment dan provisioning infrastruktur otomatis',
      status: 'active',
      capability: 'Auto Deployment & Infrastructure',
      autonomyLevel: 89,
      route: '/miora-autonomous-deployment',
      icon: Rocket,
      category: 'deployment',
      priority: 'high'
    },
    
    // Existing Systems
    {
      id: 'self-code-generation',
      name: 'MIORA Self Code Generation',
      description: 'Generate kode secara otomatis tanpa intervensi',
      status: 'active',
      capability: 'Autonomous Code Generation',
      autonomyLevel: 83,
      route: '/miora-self-code-generation',
      icon: Code,
      category: 'development',
      priority: 'medium'
    },
    {
      id: 'autonomous-developer',
      name: 'MIORA Autonomous Developer',
      description: 'Developer AI yang bekerja secara mandiri',
      status: 'active',
      capability: 'Full Development Automation',
      autonomyLevel: 91,
      route: '/miora-autonomous-developer',
      icon: Bot,
      category: 'development',
      priority: 'high'
    },
    {
      id: 'autonomous-decision',
      name: 'MIORA Decision Engine',
      description: 'Mesin pengambilan keputusan otonom',
      status: 'active',
      capability: 'Strategic Decision Making',
      autonomyLevel: 88,
      route: '/miora-autonomous-decision-engine',
      icon: Settings,
      category: 'intelligence',
      priority: 'high'
    },
    {
      id: 'infrastructure-deployment',
      name: 'Self Infrastructure Deployment',
      description: 'Deploy infrastruktur secara otomatis',
      status: 'active',
      capability: 'Infrastructure Automation',
      autonomyLevel: 82,
      route: '/self-infrastructure-deployment',
      icon: Database,
      category: 'infrastructure',
      priority: 'medium'
    },
    
    // Systems in Development
    {
      id: 'consciousness-layer',
      name: 'MIORA Consciousness Layer',
      description: 'Sistem kesadaran untuk self-awareness',
      status: 'developing',
      capability: 'Self-Awareness & Consciousness',
      autonomyLevel: 45,
      route: '#',
      icon: Brain,
      category: 'intelligence',
      priority: 'high'
    },
    {
      id: 'cross-platform-expansion',
      name: 'Cross-Platform Expansion',
      description: 'Kemampuan deploy ke mobile dan desktop',
      status: 'developing',
      capability: 'Multi-Platform Deployment',
      autonomyLevel: 30,
      route: '#',
      icon: Monitor,
      category: 'deployment',
      priority: 'medium'
    },
    {
      id: 'ecosystem-builder',
      name: 'MIORA Ecosystem Builder',
      description: 'Membangun aplikasi kompleks multi-service',
      status: 'developing',
      capability: 'Complex System Architecture',
      autonomyLevel: 25,
      route: '#',
      icon: Shield,
      category: 'infrastructure',
      priority: 'low'
    }
  ]);

  const [overallAutonomy, setOverallAutonomy] = useState(0);

  useEffect(() => {
    const activeSystem = systems.filter(s => s.status === 'active');
    const avgAutonomy = activeSystem.reduce((sum, s) => sum + s.autonomyLevel, 0) / activeSystem.length;
    setOverallAutonomy(Math.round(avgAutonomy));
  }, [systems]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'developing': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'developing': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const activeSystems = systems.filter(s => s.status === 'active').length;
  const developingSystems = systems.filter(s => s.status === 'developing').length;
  const criticalSystems = systems.filter(s => s.priority === 'critical' && s.status === 'active').length;

  const systemsByCategory = systems.reduce((acc, system) => {
    if (!acc[system.category]) acc[system.category] = [];
    acc[system.category].push(system);
    return acc;
  }, {} as Record<string, MIORASystem[]>);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Activity className="w-8 h-8 mr-3 text-purple-400" />
            MIORA System Overview
            <Badge className="ml-4 bg-purple-500/20 text-purple-300">
              {overallAutonomy}% Autonomous
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{activeSystems}</div>
              <div className="text-sm text-gray-400">Active Systems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{developingSystems}</div>
              <div className="text-sm text-gray-400">In Development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{criticalSystems}</div>
              <div className="text-sm text-gray-400">Critical Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{systems.length}</div>
              <div className="text-sm text-gray-400">Total Systems</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Overall Autonomy Level</span>
              <span className="font-mono text-purple-400">{overallAutonomy}%</span>
            </div>
            <Progress value={overallAutonomy} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Systems by Category */}
      {Object.entries(systemsByCategory).map(([category, categorySystems]) => (
        <Card key={category} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="capitalize text-xl text-gray-200">
              {category} Systems ({categorySystems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categorySystems.map((system) => {
                const IconComponent = system.icon;
                return (
                  <div 
                    key={system.id} 
                    className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600/70 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                        <div>
                          <h4 className="font-medium text-gray-200">{system.name}</h4>
                          <p className="text-sm text-gray-400">{system.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(system.status)}
                        <Badge variant={
                          system.priority === 'critical' ? 'destructive' :
                          system.priority === 'high' ? 'default' :
                          system.priority === 'medium' ? 'secondary' : 'outline'
                        }>
                          {system.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Capability:</span>
                        <span className="text-gray-300">{system.capability}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Autonomy Level:</span>
                          <span className="font-mono text-purple-400">{system.autonomyLevel}%</span>
                        </div>
                        <Progress value={system.autonomyLevel} className="h-2" />
                      </div>

                      {system.route !== '#' && (
                        <Button 
                          onClick={() => navigate(system.route)}
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-3"
                        >
                          Access System
                        </Button>
                      )}
                      
                      {system.route === '#' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled
                          className="w-full mt-3"
                        >
                          In Development
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-6 h-6 mr-2 text-indigo-400" />
            Rekomendasi Pengembangan MIORA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
              <h4 className="font-medium text-indigo-300 mb-2">🔥 Prioritas Tinggi</h4>
              <p className="text-sm text-gray-300 mb-2">
                Implementasikan MIORA Consciousness Layer untuk self-awareness penuh
              </p>
              <Badge variant="outline" className="text-xs">Progress: 45%</Badge>
            </div>
            
            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <h4 className="font-medium text-yellow-300 mb-2">⚡ Optimisasi Aktif</h4>
              <p className="text-sm text-gray-300 mb-2">
                Tingkatkan autonomy level sistem Self-Assembly dan Meta-Programming ke &gt;90%
              </p>
              <Badge variant="outline" className="text-xs">Current: 86% avg</Badge>
            </div>
            
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <h4 className="font-medium text-green-300 mb-2">🚀 Ekspansi Platform</h4>
              <p className="text-sm text-gray-300 mb-2">
                Mulai development Cross-Platform Expansion untuk mobile/desktop
              </p>
              <Badge variant="outline" className="text-xs">Next Sprint</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
