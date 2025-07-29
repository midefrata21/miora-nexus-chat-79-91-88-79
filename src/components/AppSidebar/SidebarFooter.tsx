
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Database } from 'lucide-react';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  if (collapsed) {
    return (
      <div className="p-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {/* System Status */}
      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">System Status</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-blue-400" />
              <span className="text-slate-300">CPU</span>
            </div>
            <span className="text-blue-400">34%</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Database className="w-3 h-3 text-green-400" />
              <span className="text-slate-300">Memory</span>
            </div>
            <span className="text-green-400">67%</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-purple-400" />
              <span className="text-slate-300">AI Load</span>
            </div>
            <span className="text-purple-400">89%</span>
          </div>
        </div>
      </div>
      
      {/* Version Info */}
      <div className="text-center">
        <Badge className="bg-slate-900/60 text-slate-400 border-slate-600/50 text-xs">
          MIORA Infinity v4.0.∞
        </Badge>
      </div>
    </div>
  );
};

export default SidebarFooter;
