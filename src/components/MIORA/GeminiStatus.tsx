import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Wifi, WifiOff, Zap, Activity } from 'lucide-react';
import { useGoogleGemini } from '@/hooks/useGoogleGemini';

interface GeminiStatusProps {
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onStatusClick?: () => void;
}

export const GeminiStatus: React.FC<GeminiStatusProps> = ({ 
  showDetails = false, 
  size = 'md',
  onStatusClick 
}) => {
  const { metrics, isActive, performHealthCheck } = useGoogleGemini();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Update setiap 5 detik untuk real-time status
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!isActive) return 'bg-gray-500';
    return metrics.isConnected ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = () => {
    if (!isActive) return 'STANDBY';
    return metrics.isConnected ? 'ONLINE' : 'OFFLINE';
  };

  const getTimeSinceLastActivity = () => {
    if (metrics.lastActivity === 0) return 'Never';
    const seconds = Math.floor((Date.now() - metrics.lastActivity) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const formatResponseTime = (time: number) => {
    return time > 1000 ? `${(time / 1000).toFixed(1)}s` : `${Math.round(time)}ms`;
  };

  const sizeClasses = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  };

  if (!showDetails) {
    // Compact status badge
    return (
      <div 
        className={`flex items-center space-x-2 cursor-pointer ${sizeClasses[size]}`}
        onClick={onStatusClick}
      >
        <div className="flex items-center space-x-1">
          <Brain className={`h-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'} w-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'} text-purple-400`} />
          <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}></div>
        </div>
        
        <Badge 
          variant="outline" 
          className={`
            ${metrics.isConnected ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}
            ${size === 'sm' ? 'text-xs px-1 py-0' : ''}
          `}
        >
          {getStatusText()}
        </Badge>

        {size !== 'sm' && (
          <span className="text-xs text-gray-400">
            {getTimeSinceLastActivity()}
          </span>
        )}
      </div>
    );
  }

  // Detailed status panel
  return (
    <div className={`bg-black/20 rounded-lg border border-purple-500/20 ${sizeClasses[size]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-400" />
          <span className="text-white font-semibold">Gemini Status</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
          <Badge 
            variant="outline" 
            className={`
              ${metrics.isConnected ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}
            `}
          >
            {getStatusText()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-blue-400" />
          <div>
            <div className="text-xs text-gray-400">Requests</div>
            <div className="text-sm font-semibold text-white">{metrics.totalRequests}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-400" />
          <div>
            <div className="text-xs text-gray-400">Success Rate</div>
            <div className="text-sm font-semibold text-white">
              {metrics.totalRequests > 0 
                ? `${Math.round((metrics.successfulRequests / metrics.totalRequests) * 100)}%`
                : '0%'
              }
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {metrics.isConnected ? 
            <Wifi className="h-4 w-4 text-green-400" /> : 
            <WifiOff className="h-4 w-4 text-red-400" />
          }
          <div>
            <div className="text-xs text-gray-400">Response Time</div>
            <div className="text-sm font-semibold text-white">
              {formatResponseTime(metrics.avgResponseTime)}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Last Activity</div>
            <div className="text-sm font-semibold text-white">
              {getTimeSinceLastActivity()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Auto-monitoring: {isActive ? 'Active' : 'Inactive'}
        </span>
        
        <Button
          onClick={performHealthCheck}
          size="sm"
          variant="outline"
          className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 text-xs px-2 py-1"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};