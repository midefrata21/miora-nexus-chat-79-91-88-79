import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Zap, 
  Target, 
  Network, 
  TrendingUp, 
  ArrowRight,
  Cpu,
  Activity
} from 'lucide-react';

const AdvancedCapabilitiesWidget: React.FC = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      name: 'Quantum Reasoning',
      description: 'Multi-dimensional thinking',
      icon: Brain,
      status: 'Ready',
      color: 'purple'
    },
    {
      name: 'Meta-Learning',
      description: 'Learning how to learn',
      icon: Zap,
      status: 'Ready',
      color: 'cyan'
    },
    {
      name: 'Self-Reflection',
      description: 'Autonomous evaluation',
      icon: Target,
      status: 'Ready',
      color: 'green'
    },
    {
      name: 'Distributed Computing',
      description: 'Parallel processing',
      icon: Network,
      status: 'Ready',
      color: 'orange'
    }
  ];

  const handleActivateAll = () => {
    navigate('/advanced-capabilities');
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border-purple-400/40 shadow-xl">
      <CardHeader>
        <CardTitle className="text-purple-200 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            Advanced Capabilities
          </div>
          <Badge className="bg-green-500/90 text-white">
            6 Systems Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {capabilities.map((capability, index) => (
            <div key={index} className="p-3 bg-black/30 rounded-lg flex items-center space-x-3">
              <capability.icon className={`h-5 w-5 text-${capability.color}-400`} />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">
                  {capability.name}
                </div>
                <div className="text-gray-400 text-xs truncate">
                  {capability.description}
                </div>
              </div>
              <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                {capability.status}
              </Badge>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleActivateAll}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3"
        >
          <Activity className="h-4 w-4 mr-2" />
          Activate Advanced Capabilities
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        
        <div className="text-center text-xs text-gray-400">
          Quantum reasoning, meta-learning, dan sistem canggih lainnya
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedCapabilitiesWidget;