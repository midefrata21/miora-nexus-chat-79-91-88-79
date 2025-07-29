
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AIProvider {
  id: string;
  name: string;
  apiEndpoint: string;
  isConnected: boolean;
  status: 'active' | 'standby' | 'error' | 'fallback';
  responseTime: number;
  successRate: number;
  isFree: boolean;
  capabilities: string[];
}

interface FallbackStatus {
  isActive: boolean;
  activeFallbacks: number;
  primaryProvidersActive: number;
}

interface AIProviderStatusProps {
  providers: AIProvider[];
  fallbackStatus: FallbackStatus;
}

export const AIProviderStatus: React.FC<AIProviderStatusProps> = ({
  providers,
  fallbackStatus
}) => {
  const getProviderIcon = (providerId: string) => {
    const icons = {
      gemini: '🧠',
      deepai: '🔮',
      huggingface: '🤗',
      pollinations: '🎨'
    };
    return icons[providerId as keyof typeof icons] || '🤖';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'standby': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'fallback': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            Free AI Providers Status
          </div>
          {fallbackStatus.isActive && (
            <Badge className="bg-orange-500 animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Fallback Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="p-4 rounded-lg border-2 bg-black/20 border-gray-700/50 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getProviderIcon(provider.id)}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{provider.name}</h3>
                    <p className="text-gray-400 text-xs">Free Tier</p>
                  </div>
                </div>
                {provider.isConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Wifi className="h-5 w-5 text-red-400" />
                )}
              </div>

              <div className="space-y-2">
                <Badge className={`w-full justify-center text-xs ${getStatusColor(provider.status)}`}>
                  {provider.status.toUpperCase()}
                </Badge>

                {provider.isConnected && (
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="text-cyan-400">{provider.responseTime.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-green-400">{provider.successRate.toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <div className="font-medium mb-1">Capabilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {provider.capabilities.slice(0, 2).map((cap, idx) => (
                      <span key={idx} className="px-1 py-0.5 bg-blue-900/30 rounded text-xs">
                        {cap.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback System Status */}
        <div className="p-4 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-lg border border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-orange-300 font-semibold flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Automatic Fallback System
            </h4>
            <Badge className={fallbackStatus.isActive ? 'bg-orange-500' : 'bg-green-500'}>
              {fallbackStatus.isActive ? 'ACTIVE' : 'STANDBY'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{fallbackStatus.primaryProvidersActive}</div>
              <div className="text-gray-400">Primary Active</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 font-bold text-lg">{fallbackStatus.activeFallbacks}</div>
              <div className="text-gray-400">Fallbacks Active</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">{providers.length}</div>
              <div className="text-gray-400">Total Providers</div>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            🔄 System otomatis beralih ke provider backup ketika primary provider tidak tersedia
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
