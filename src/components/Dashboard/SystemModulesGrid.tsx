import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SystemModule } from './types';

interface SystemModulesGridProps {
  systemModules: SystemModule[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'monitoring': return 'bg-blue-500';
    case 'upgrading': return 'bg-purple-500';
    case 'warning': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const SystemModulesGrid: React.FC<SystemModulesGridProps> = React.memo(({ systemModules }) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          System Modules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemModules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Link key={index} to={module.path}>
                <Card className="bg-black/30 border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                          {module.name}
                        </span>
                      </div>
                      <Badge className={`${getStatusColor(module.status)} text-white text-xs`}>
                        {module.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});