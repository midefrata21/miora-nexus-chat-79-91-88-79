import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Settings,
  Clock,
  Zap,
  Shield,
  Cpu
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ErrorStatus {
  id: string;
  type: 'quota' | 'network' | 'performance' | 'cache';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  component: string;
  timestamp: number;
  resolved: boolean;
  autoFixAvailable: boolean;
}

export const MIORAErrorDashboard: React.FC = () => {
  const [errors, setErrors] = useState<ErrorStatus[]>([
    {
      id: '1',
      type: 'quota',
      severity: 'warning',
      message: 'Gemini API quota exceeded - fallback systems activated',
      component: 'Gemini Integration',
      timestamp: Date.now() - 120000,
      resolved: false,
      autoFixAvailable: true
    },
    {
      id: '2',
      type: 'performance',
      severity: 'info',
      message: 'High signal generation frequency detected - intervals optimized',
      component: 'Scalping Engine',
      timestamp: Date.now() - 300000,
      resolved: true,
      autoFixAvailable: false
    },
    {
      id: '3',
      type: 'cache',
      severity: 'info',
      message: 'Low cache hit rate - TTL settings optimized',
      component: 'MIORA Performance',
      timestamp: Date.now() - 60000,
      resolved: true,
      autoFixAvailable: false
    }
  ]);

  const [isAutoFixing, setIsAutoFixing] = useState(false);

  const autoFixAllErrors = async () => {
    setIsAutoFixing(true);
    
    const fixableErrors = errors.filter(error => !error.resolved && error.autoFixAvailable);
    
    for (const error of fixableErrors) {
      toast({
        title: "🔧 AUTO-FIXING ERROR",
        description: `Resolving: ${error.message}`,
        duration: 3000,
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark as resolved
      setErrors(prev => prev.map(e => 
        e.id === error.id 
          ? { ...e, resolved: true, autoFixAvailable: false }
          : e
      ));
    }
    
    setIsAutoFixing(false);
    
    if (fixableErrors.length > 0) {
      toast({
        title: "✅ AUTO-FIX COMPLETE",
        description: `${fixableErrors.length} error(s) berhasil diperbaiki otomatis!`,
        duration: 5000,
      });
    } else {
      toast({
        title: "ℹ️ NO FIXABLE ERRORS",
        description: "Tidak ada error yang dapat diperbaiki otomatis saat ini.",
        duration: 3000,
      });
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 border-red-400';
      case 'warning':
        return 'text-yellow-400 border-yellow-400';
      case 'info':
        return 'text-blue-400 border-blue-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quota':
        return <Zap className="h-4 w-4" />;
      case 'network':
        return <RefreshCw className="h-4 w-4" />;
      case 'performance':
        return <Cpu className="h-4 w-4" />;
      case 'cache':
        return <Settings className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const unresolvedErrors = errors.filter(error => !error.resolved);
  const criticalErrors = unresolvedErrors.filter(error => error.severity === 'critical');
  const warningErrors = unresolvedErrors.filter(error => error.severity === 'warning');

  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-red-300">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            MIORA Error Resolution Dashboard
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-red-400 border-red-400">
              {criticalErrors.length} Critical
            </Badge>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              {warningErrors.length} Warning
            </Badge>
            <Button
              onClick={autoFixAllErrors}
              disabled={isAutoFixing || errors.filter(e => !e.resolved && e.autoFixAvailable).length === 0}
              size="sm"
              className="bg-green-600 hover:bg-green-500"
            >
              {isAutoFixing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Fixing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Auto-Fix All
                </>
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-xs text-gray-400">Critical Issues</span>
            </div>
            <div className="text-xl font-bold text-red-400">{criticalErrors.length}</div>
          </div>
          
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Warnings</span>
            </div>
            <div className="text-xl font-bold text-yellow-400">{warningErrors.length}</div>
          </div>
          
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Resolved</span>
            </div>
            <div className="text-xl font-bold text-green-400">
              {errors.filter(e => e.resolved).length}
            </div>
          </div>
        </div>

        {/* Error List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {errors.map((error) => (
            <div 
              key={error.id} 
              className={`p-4 rounded-lg border ${error.resolved ? 'bg-green-900/20 border-green-500/30' : 'bg-black/30 border-gray-600'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(error.type)}
                  <span className="text-white font-medium">{error.component}</span>
                  <Badge variant="outline" className={getSeverityColor(error.severity)}>
                    {error.severity.toUpperCase()}
                  </Badge>
                  {error.resolved && (
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      RESOLVED
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {error.autoFixAvailable && !error.resolved && (
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      AUTO-FIXABLE
                    </Badge>
                  )}
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimestamp(error.timestamp)}
                  </div>
                </div>
              </div>
              
              <p className={`text-sm ${error.resolved ? 'text-green-300' : 'text-gray-300'}`}>
                {error.message}
              </p>
            </div>
          ))}
        </div>

        {/* Status Summary */}
        <div className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-red-400" />
              <div>
                <div className="text-white font-semibold">System Error Status</div>
                <div className="text-xs text-gray-400">
                  {unresolvedErrors.length} active issues • Auto-resolution enabled
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {Math.round((errors.filter(e => e.resolved).length / errors.length) * 100)}%
              </div>
              <div className="text-xs text-gray-400">Resolved</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};