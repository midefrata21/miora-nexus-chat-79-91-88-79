
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ModuleState {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'developing' | 'error';
  progress: number;
  capabilities: string[];
  lastActivity: number;
}

interface ModuleCardProps {
  module: ModuleState;
  icon: React.ReactNode;
  color: 'cyan' | 'purple' | 'green' | 'orange' | 'blue' | 'red';
}

const colorClasses = {
  cyan: {
    border: 'border-cyan-500/30',
    bg: 'from-cyan-900/30 to-cyan-800/20',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500'
  },
  purple: {
    border: 'border-purple-500/30',
    bg: 'from-purple-900/30 to-purple-800/20',
    text: 'text-purple-400',
    badge: 'bg-purple-500'
  },
  green: {
    border: 'border-green-500/30',
    bg: 'from-green-900/30 to-green-800/20',
    text: 'text-green-400',
    badge: 'bg-green-500'
  },
  orange: {
    border: 'border-orange-500/30',
    bg: 'from-orange-900/30 to-orange-800/20',
    text: 'text-orange-400',
    badge: 'bg-orange-500'
  },
  blue: {
    border: 'border-blue-500/30',
    bg: 'from-blue-900/30 to-blue-800/20',
    text: 'text-blue-400',
    badge: 'bg-blue-500'
  },
  red: {
    border: 'border-red-500/30',
    bg: 'from-red-900/30 to-red-800/20',
    text: 'text-red-400',
    badge: 'bg-red-500'
  }
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, icon, color }) => {
  const colors = colorClasses[color];

  const getStatusBadge = () => {
    switch (module.status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'developing':
        return <Badge className="bg-blue-500">Developing</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      default:
        return <Badge className="bg-gray-500">Idle</Badge>;
    }
  };

  return (
    <Card className={`bg-gradient-to-br ${colors.bg} ${colors.border} hover:border-opacity-50 transition-all`}>
      <CardHeader className="pb-3">
        <CardTitle className={`${colors.text} flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium">{module.name}</span>
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className={colors.text}>{module.progress.toFixed(1)}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Capabilities</div>
          <div className="flex flex-wrap gap-1">
            {module.capabilities.slice(0, 3).map((capability, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs text-gray-300 border-gray-600"
              >
                {capability.replace(/_/g, ' ')}
              </Badge>
            ))}
            {module.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                +{module.capabilities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Last activity: {new Date(module.lastActivity).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};
