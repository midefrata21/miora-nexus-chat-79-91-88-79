import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSystemStatus } from '@/contexts/SystemStatusContext';
import { 
  Monitor, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Pause, 
  BarChart3,
  Clock,
  Cpu,
  Shield,
  Zap,
  Move
} from 'lucide-react';

const GlobalSystemMonitor: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { systems, getActiveSystemsCount, getTotalUptime, deactivateSystem } = useSystemStatus();

  const activeSystems = Object.values(systems).filter(system => system.isActive);
  const activeCount = getActiveSystemsCount();
  const totalUptime = getTotalUptime();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'starting': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-3 h-3" />;
      case 'processing': return <Cpu className="w-3 h-3" />;
      case 'starting': return <Clock className="w-3 h-3" />;
      case 'error': return <Shield className="w-3 h-3" />;
      default: return <Monitor className="w-3 h-3" />;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 320, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (activeCount === 0) {
    return null; // Don't show if no systems are active
  }

  return (
    <Card 
      ref={cardRef}
      className="fixed z-50 bg-gray-900/80 border-cyan-500/20 backdrop-blur-sm w-80 opacity-85 hover:opacity-100 transition-opacity cursor-move select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 text-cyan-400/70" />
            <Monitor className="w-4 h-4 text-cyan-400" />
            <CardTitle className="text-cyan-300 text-xs">System Monitor</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-xs">
              {activeCount}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-cyan-300 hover:text-white hover:bg-cyan-600/20 p-1"
            >
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-800/50 rounded-lg p-2">
            <div className="text-lg font-bold text-cyan-400">{activeCount}</div>
            <div className="text-xs text-gray-400">Systems</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2">
            <div className="text-lg font-bold text-green-400">{totalUptime}%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2">
            <div className="text-lg font-bold text-purple-400">
              {Object.values(systems).reduce((sum, system) => sum + system.processCount, 0)}
            </div>
            <div className="text-xs text-gray-400">Processes</div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <div className="border-t border-gray-700/50 pt-2">
              <h4 className="text-sm font-medium text-cyan-300 mb-2">Active Systems</h4>
            </div>
            
            {activeSystems.map((system) => (
              <Card key={system.id} className="bg-gray-800/30 border-gray-700/30">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={getStatusColor(system.status)}>
                        {getStatusIcon(system.status)}
                      </div>
                      <span className="text-sm font-medium text-white truncate">
                        {system.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deactivateSystem(system.id as any)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-600/20 p-1"
                    >
                      <Pause className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-cyan-400">{system.metrics.performance.toFixed(1)}%</span>
                    </div>
                    <Progress value={system.metrics.performance} className="h-1" />
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Reliability</span>
                      <span className="text-green-400">{system.metrics.reliability.toFixed(1)}%</span>
                    </div>
                    <Progress value={system.metrics.reliability} className="h-1" />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Processes: {system.processCount}</span>
                    <span>Data: {system.dataGenerated}</span>
                  </div>
                  
                  {/* Latest Activity */}
                  {system.logs.length > 0 && (
                    <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs">
                      <div className="text-cyan-300 mb-1">Latest Activity:</div>
                      <div className="text-gray-300 truncate">
                        {system.logs[system.logs.length - 1]}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-center text-xs text-gray-400 border-t border-gray-700/50 pt-2">
          <Zap className="w-3 h-3 mr-1 text-green-400" />
          All systems running autonomously
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalSystemMonitor;