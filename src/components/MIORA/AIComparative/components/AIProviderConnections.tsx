import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Key, CheckCircle, XCircle, Wifi } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AIProvider {
  id: string;
  name: string;
  apiEndpoint: string;
  isConnected: boolean;
  model: string;
  responseQuality: number;
  lastUsed: number;
  status: 'active' | 'standby' | 'error';
}

interface AIProviderConnectionsProps {
  providers: AIProvider[];
  onConnect: (providerId: string, apiKey: string) => void;
  selectedProvider: string | null;
  onSelectProvider: (providerId: string) => void;
}

export const AIProviderConnections: React.FC<AIProviderConnectionsProps> = ({
  providers,
  onConnect,
  selectedProvider,
  onSelectProvider
}) => {
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({});

  const handleConnect = (providerId: string) => {
    const apiKey = apiKeys[providerId];
    if (!apiKey) {
      toast({
        title: "⚠️ API Key Required",
        description: "Please enter your API key",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    onConnect(providerId, apiKey);
    setApiKeys(prev => ({ ...prev, [providerId]: '' }));
  };

  const getProviderIcon = (providerId: string) => {
    const icons = {
      openai: '🤖',
      google: '🧠',
      gemini: '✨',
      anthropic: '🔮',
      xai: '⚡',
      mistral: '🌟',
      perplexity: '🔍'
    };
    return icons[providerId as keyof typeof icons] || '🤖';
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          AI Provider Connections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <div 
              key={provider.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedProvider === provider.id 
                  ? 'border-cyan-500 bg-cyan-500/10' 
                  : 'border-gray-700 bg-black/20'
              }`}
              onClick={() => onSelectProvider(provider.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getProviderIcon(provider.id)}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{provider.name}</h3>
                    <p className="text-gray-400 text-xs">{provider.model}</p>
                  </div>
                </div>
                {provider.isConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
              </div>

              <div className="space-y-2">
                <Badge className={`w-full justify-center ${
                  provider.isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <Wifi className="h-3 w-3 mr-1" />
                  {provider.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </Badge>

                {provider.isConnected && (
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Quality: {provider.responseQuality.toFixed(1)}%</div>
                    <div>Status: {provider.status.toUpperCase()}</div>
                  </div>
                )}

                {!provider.isConnected && (
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Enter API Key"
                      value={apiKeys[provider.id] || ''}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, [provider.id]: e.target.value }))}
                      className="bg-black/30 border-gray-600 text-white text-xs"
                    />
                    <Button
                      onClick={() => handleConnect(provider.id)}
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-500"
                    >
                      <Key className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Gemini Integration Status */}
        <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h4 className="text-purple-300 font-semibold mb-2">✨ Google Gemini</h4>
          <p className="text-purple-200 text-sm mb-3">
            Google Gemini API sudah terintegrasi dan selalu aktif. API Key sudah dikonfigurasi untuk penggunaan optimal.
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Always Active & Monitoring</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <h4 className="text-yellow-300 font-semibold mb-2">🔐 Security Notice</h4>
          <p className="text-yellow-200 text-sm">
            For production use, we recommend connecting to Supabase to securely store API keys in Edge Function Secrets. 
            Current implementation stores keys in localStorage for demo purposes only.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};