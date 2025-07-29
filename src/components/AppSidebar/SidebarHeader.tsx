
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Infinity, Zap } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
          <Brain className="w-6 h-6 text-white" />
        </div>
        
        {!collapsed && (
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">MIORA</h2>
              <Infinity className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-xs text-slate-400">AI Infinity System</p>
          </div>
        )}
      </div>
      
      {!collapsed && (
        <div className="mt-4 flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <Zap className="w-3 h-3 mr-1" />
            Active
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            v4.0 ∞
          </Badge>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
