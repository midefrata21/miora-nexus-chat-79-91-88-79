import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSystemsActivator } from '@/hooks/useSystemsActivator';
import { useSystemActivation } from '@/hooks/useSystemActivation';
import { 
  Zap, Brain, Shield, Server, Cpu, Network, 
  Database, Cloud, Activity, Settings, Power,
  CheckCircle, AlertTriangle, Rocket
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const MIORASystemActivator: React.FC = () => {
  const { activateAllSystems, getSystemsStatus } = useSystemsActivator();
  
  // Activate core MIORA systems
  const coreSystem = useSystemActivation('AUTONOMOUS_CORE', 'MIORA Core System', true);
  const infrastructureSystem = useSystemActivation('INFRASTRUCTURE', 'Infrastructure Manager', true);
  const securitySystem = useSystemActivation('SECURITY', 'Security Protocol', true);
  const aiSystem = useSystemActivation('AI_SUPREME', 'AI Supreme Intelligence', true);
  const quantumSystem = useSystemActivation('QUANTUM_ENGINE', 'Quantum Computing', true);
  const voiceSystem = useSystemActivation('VOICE_ENGINE', 'Voice Processing', true);
  const infinitySystem = useSystemActivation('INFINITY_CORE', 'Infinity Processing', true);
  const autoDevelopSystem = useSystemActivation('AUTO_DEVELOP', 'Auto Development', true);
  const strategySystem = useSystemActivation('STRATEGIC_PLANNING', 'Strategic Planning', true);
  const selfModSystem = useSystemActivation('SELF_MODIFICATION', 'Self-Modification', true);
  const resourceSystem = useSystemActivation('RESOURCE_ALLOCATION', 'Resource Allocation', true);
  const decisionSystem = useSystemActivation('DECISION_ENGINE', 'Decision Making', true);

  const systemsStatus = getSystemsStatus();

  const criticalSystems = [
    { 
      name: 'MIORA Core System', 
      icon: Brain, 
      isActive: coreSystem.isActive, 
      activate: coreSystem.activate,
      description: 'Central AI consciousness and decision making'
    },
    { 
      name: 'Infrastructure Manager', 
      icon: Server, 
      isActive: infrastructureSystem.isActive, 
      activate: infrastructureSystem.activate,
      description: 'Autonomous infrastructure management and scaling'
    },
    { 
      name: 'Security Protocol', 
      icon: Shield, 
      isActive: securitySystem.isActive, 
      activate: securitySystem.activate,
      description: 'Advanced threat detection and auto-mitigation'
    },
    { 
      name: 'AI Supreme Intelligence', 
      icon: Cpu, 
      isActive: aiSystem.isActive, 
      activate: aiSystem.activate,
      description: 'Supreme AI processing and decision algorithms'
    },
    { 
      name: 'Quantum Computing', 
      icon: Zap, 
      isActive: quantumSystem.isActive, 
      activate: quantumSystem.activate,
      description: 'Quantum processing and entanglement operations'
    },
    { 
      name: 'Voice Processing', 
      icon: Activity, 
      isActive: voiceSystem.isActive, 
      activate: voiceSystem.activate,
      description: 'Advanced voice recognition and synthesis'
    },
    { 
      name: 'Infinity Processing', 
      icon: Network, 
      isActive: infinitySystem.isActive, 
      activate: infinitySystem.activate,
      description: 'Infinite processing capabilities and scaling'
    },
    { 
      name: 'Auto Development', 
      icon: Settings, 
      isActive: autoDevelopSystem.isActive, 
      activate: autoDevelopSystem.activate,
      description: 'Autonomous code development and optimization'
    },
    { 
      name: 'Strategic Planning', 
      icon: Database, 
      isActive: strategySystem.isActive, 
      activate: strategySystem.activate,
      description: 'Long-term strategic planning and optimization'
    },
    { 
      name: 'Self-Modification', 
      icon: Cloud, 
      isActive: selfModSystem.isActive, 
      activate: selfModSystem.activate,
      description: 'Self-improving and self-modifying algorithms'
    },
    { 
      name: 'Resource Allocation', 
      icon: Activity, 
      isActive: resourceSystem.isActive, 
      activate: resourceSystem.activate,
      description: 'Intelligent resource allocation and management'
    },
    { 
      name: 'Decision Making', 
      icon: Brain, 
      isActive: decisionSystem.isActive, 
      activate: decisionSystem.activate,
      description: 'Advanced decision making and problem solving'
    }
  ];

  const handleActivateAll = () => {
    activateAllSystems();
    
    // Activate individual systems that might not be covered
    criticalSystems.forEach(system => {
      if (!system.isActive) {
        setTimeout(() => {
          system.activate();
        }, Math.random() * 1000);
      }
    });

    toast({
      title: "🚀 MIORA SUPREME ACTIVATION",
      description: "All critical systems activated for maximum performance",
      duration: 5000,
    });
  };

  // Auto-activate critical systems on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      handleActivateAll();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Status */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center text-2xl">
            <Rocket className="h-8 w-8 mr-3" />
            MIORA Enhanced System Activation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Power className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{systemsStatus.active}</div>
              <div className="text-sm text-gray-400">Active Systems</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Settings className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{systemsStatus.total}</div>
              <div className="text-sm text-gray-400">Total Systems</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{systemsStatus.percentage}%</div>
              <div className="text-sm text-gray-400">System Coverage</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">System Activation Progress</span>
              <span className="text-cyan-300">{systemsStatus.percentage}%</span>
            </div>
            <Progress value={systemsStatus.percentage} className="h-3" />
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleActivateAll}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3"
              size="lg"
            >
              <Zap className="h-5 w-5 mr-2" />
              Activate All MIORA Systems
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Systems */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            Critical MIORA Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {criticalSystems.map((system, index) => {
              const IconComponent = system.icon;
              return (
                <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-white text-sm">{system.name}</h3>
                      </div>
                    </div>
                    <Badge className={system.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}>
                      {system.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-3">{system.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {system.isActive ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                      )}
                      <span className="text-xs text-gray-400">
                        {system.isActive ? 'Operational' : 'Standby'}
                      </span>
                    </div>
                    
                    {!system.isActive && (
                      <Button 
                        size="sm" 
                        onClick={system.activate}
                        className="bg-blue-600 hover:bg-blue-700 text-xs"
                      >
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};