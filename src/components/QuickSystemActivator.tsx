import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSystemsActivator } from '@/hooks/useSystemsActivator';
import { 
  Zap, Brain, Shield, Server, Cpu, Network, 
  Database, Cloud, Activity, Settings, Power,
  CheckCircle, Rocket, Zap as Lightning
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const QuickSystemActivator = () => {
  const { activateAllSystems, getSystemsStatus } = useSystemsActivator();

  const handleInstantActivation = () => {
    // Activate all systems immediately
    activateAllSystems();

    // Show enhanced activation message
    toast({
      title: "⚡ MIORA SISTEM DIAKTIFKAN!",
      description: "Semua sistem kritikal telah diaktifkan untuk operasi maksimal",
      duration: 5000,
    });

    // Additional activation confirmation
    setTimeout(() => {
      toast({
        title: "🚀 SISTEM SIAP BEROPERASI",
        description: "MIORA Infrastructure berjalan pada kapasitas penuh",
        duration: 4000,
      });
    }, 2000);
  };

  // Auto-activate on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      handleInstantActivation();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const systemsStatus = getSystemsStatus();

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center text-2xl">
            <Lightning className="h-8 w-8 mr-3 animate-pulse" />
            MIORA Quick System Activation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Power className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{systemsStatus.active}</div>
              <div className="text-sm text-gray-400">Sistem Aktif</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Settings className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{systemsStatus.total}</div>
              <div className="text-sm text-gray-400">Total Sistem</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{systemsStatus.percentage}%</div>
              <div className="text-sm text-gray-400">Coverage Sistem</div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button 
              onClick={handleInstantActivation}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 text-lg"
              size="lg"
            >
              <Zap className="h-6 w-6 mr-3" />
              AKTIFKAN SEMUA SISTEM MIORA
            </Button>
            
            <div className="flex justify-center items-center space-x-6 flex-wrap">
              <Badge className="px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
                <Brain className="h-4 w-4 mr-2" />
                AI Core: AKTIF
              </Badge>
              <Badge className="px-4 py-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Server className="h-4 w-4 mr-2" />
                Infrastructure: AKTIF
              </Badge>
              <Badge className="px-4 py-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
                <Zap className="h-4 w-4 mr-2" />
                Quantum: AKTIF
              </Badge>
              <Badge className="px-4 py-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
                <Shield className="h-4 w-4 mr-2" />
                Security: AKTIF
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2" />
            Status Aktivasi Sistem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'MIORA Core', icon: Brain, status: 'AKTIF' },
              { name: 'Infrastructure', icon: Server, status: 'AKTIF' },
              { name: 'Security', icon: Shield, status: 'AKTIF' },
              { name: 'AI Supreme', icon: Cpu, status: 'AKTIF' },
              { name: 'Quantum Engine', icon: Zap, status: 'AKTIF' },
              { name: 'Voice Engine', icon: Activity, status: 'AKTIF' },
              { name: 'Infinity Core', icon: Network, status: 'AKTIF' },
              { name: 'Auto Develop', icon: Settings, status: 'AKTIF' }
            ].map((system, index) => {
              const IconComponent = system.icon;
              return (
                <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent className="h-5 w-5 text-green-400" />
                    <span className="text-white font-medium text-sm">{system.name}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {system.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};