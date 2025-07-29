import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Zap, 
  Activity, 
  Settings, 
  MessageSquare, 
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useGoogleGemini } from '@/hooks/useGoogleGemini';
import { toast } from '@/hooks/use-toast';

interface GeminiIntegrationProps {
  onResponse?: (response: string) => void;
  onStatusChange?: (isConnected: boolean) => void;
}

export const GeminiIntegration: React.FC<GeminiIntegrationProps> = ({ 
  onResponse, 
  onStatusChange 
}) => {
  const {
    config,
    metrics,
    isActive,
    sendToGemini,
    updateConfig,
    clearHistory,
    toggleActive,
    performHealthCheck
  } = useGoogleGemini();

  const [testMessage, setTestMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Notify parent about connection status changes
  useEffect(() => {
    onStatusChange?.(metrics.isConnected);
  }, [metrics.isConnected, onStatusChange]);

  const handleTestMessage = async () => {
    if (!testMessage.trim()) {
      toast({
        title: "⚠️ Pesan Kosong",
        description: "Masukkan pesan untuk ditest",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendToGemini(testMessage);
      
      toast({
        title: "✅ Gemini Berhasil",
        description: "Pesan berhasil dikirim dan direspon",
        duration: 3000,
      });

      onResponse?.(response);
      setTestMessage('');
    } catch (error) {
      toast({
        title: "❌ Gemini Error",
        description: error instanceof Error ? error.message : "Gagal mengirim pesan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!isActive) return 'bg-gray-500';
    return metrics.isConnected ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = () => {
    if (!isActive) return 'INACTIVE';
    return metrics.isConnected ? 'ONLINE' : 'OFFLINE';
  };

  const formatResponseTime = (time: number) => {
    return time > 1000 ? `${(time / 1000).toFixed(1)}s` : `${Math.round(time)}ms`;
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            Google Gemini Integration
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
            <Badge variant="outline" className={`
              ${metrics.isConnected ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}
            `}>
              {getStatusText()}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Control Panel */}
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Switch
              checked={isActive}
              onCheckedChange={toggleActive}
              className="data-[state=checked]:bg-green-600"
            />
            <span className="text-white font-medium">
              {isActive ? 'Sistem Aktif' : 'Sistem Nonaktif'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={performHealthCheck}
              size="sm"
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Check Health
            </Button>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              size="sm"
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Connection Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Activity className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Total Requests</span>
            </div>
            <div className="text-xl font-bold text-white">{metrics.totalRequests}</div>
          </div>
          
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Success Rate</span>
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.totalRequests > 0 
                ? `${Math.round((metrics.successfulRequests / metrics.totalRequests) * 100)}%`
                : '0%'
              }
            </div>
          </div>
          
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-gray-400">Avg Response</span>
            </div>
            <div className="text-xl font-bold text-white">
              {formatResponseTime(metrics.avgResponseTime)}
            </div>
          </div>
          
          <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              {metrics.isConnected ? 
                <Wifi className="h-4 w-4 text-green-400" /> : 
                <WifiOff className="h-4 w-4 text-red-400" />
              }
              <span className="text-xs text-gray-400">Status</span>
            </div>
            <div className="text-sm font-bold text-white">
              {metrics.lastActivity > 0 
                ? `${Math.round((Date.now() - metrics.lastActivity) / 1000)}s ago`
                : 'Never'
              }
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 bg-black/20 rounded-lg space-y-4">
            <h4 className="text-white font-semibold flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Konfigurasi Gemini
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Model</label>
                <Input
                  value={config.model}
                  onChange={(e) => updateConfig({ model: e.target.value })}
                  className="bg-black/30 border-gray-600 text-white text-sm"
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Temperature</label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => updateConfig({ temperature: parseFloat(e.target.value) })}
                  className="bg-black/30 border-gray-600 text-white text-sm"
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Max Tokens</label>
                <Input
                  type="number"
                  value={config.maxOutputTokens}
                  onChange={(e) => updateConfig({ maxOutputTokens: parseInt(e.target.value) })}
                  className="bg-black/30 border-gray-600 text-white text-sm"
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Top P</label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.topP}
                  onChange={(e) => updateConfig({ topP: parseFloat(e.target.value) })}
                  className="bg-black/30 border-gray-600 text-white text-sm"
                />
              </div>
            </div>
            
            <Button
              onClick={clearHistory}
              size="sm"
              variant="outline"
              className="border-red-500 text-red-300 hover:bg-red-500/20"
            >
              Clear Conversation History
            </Button>
          </div>
        )}

        {/* Test Interface */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Test Gemini Response
          </h4>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Ketik pesan untuk test Gemini..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTestMessage()}
              className="bg-black/30 border-purple-500/50 text-white"
              disabled={!isActive || isLoading}
            />
            <Button
              onClick={handleTestMessage}
              disabled={!isActive || isLoading || !testMessage.trim()}
              className="bg-purple-600 hover:bg-purple-500"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Status Info */}
        <div className="p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg">
          <div className="flex items-center text-purple-400 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            {isActive ? 
              'Gemini Integration Active - Monitoring connection every 30s' :
              'Gemini Integration Paused - Toggle switch to activate'
            }
          </div>
          <p className="text-xs text-gray-400 mt-1">
            API: {config.apiKey.substring(0, 15)}...****
          </p>
        </div>
      </CardContent>
    </Card>
  );
};