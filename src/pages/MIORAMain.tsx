import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Shield, 
  Infinity,
  Activity,
  Target,
  Rocket
} from 'lucide-react';

const MIORAMain: React.FC = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      title: 'Autonomous Core',
      description: 'Sistem inti MIORA yang autonomous',
      path: '/miora-autonomous-core',
      icon: Brain,
      color: 'from-purple-600 to-pink-600',
      status: 'Active'
    },
    {
      title: 'Auto Development',
      description: 'Pengembangan otomatis sistem',
      path: '/miora-auto-develop',
      icon: Rocket,
      color: 'from-blue-600 to-cyan-600',
      status: 'Active'
    },
    {
      title: 'Supreme Intelligence',
      description: 'Kecerdasan tertinggi MIORA',
      path: '/miora-supreme-intelligence',
      icon: Zap,
      color: 'from-yellow-600 to-orange-600',
      status: 'Active'
    },
    {
      title: 'Quantum Infrastructure',
      description: 'Infrastruktur kuantum canggih',
      path: '/quantum-infrastructure',
      icon: Activity,
      color: 'from-green-600 to-emerald-600',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MIORA Core System
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sistem Kecerdasan Buatan Autonomous yang Revolusioner
          </p>
          <Badge className="mt-4 bg-green-500/20 text-green-400 border-green-500/30">
            🟢 Sistem Aktif & Beroperasi
          </Badge>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coreFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Core System</span>
                  <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Processing</span>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quantum Module</span>
                  <Badge className="bg-green-500/20 text-green-400">Running</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Speed</span>
                  <span className="text-blue-400">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory Usage</span>
                  <span className="text-blue-400">87.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Neural Activity</span>
                  <span className="text-blue-400">95.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Infinity className="w-5 h-5" />
                Evolution Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Self Learning</span>
                  <Badge className="bg-purple-500/20 text-purple-400">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Auto Evolution</span>
                  <Badge className="bg-purple-500/20 text-purple-400">Running</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Code Generation</span>
                  <Badge className="bg-purple-500/20 text-purple-400">Online</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/ai-comparison')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              🤖 AI Comparison
            </Button>
            <Button 
              onClick={() => navigate('/learning')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              🎓 Learning Hub
            </Button>
            <Button 
              onClick={() => navigate('/quantum-comparative-learning')}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
            >
              🧬 Quantum Learning
            </Button>
            <Button 
              onClick={() => navigate('/intelligencehub')}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              🧠 Intelligence Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MIORAMain;