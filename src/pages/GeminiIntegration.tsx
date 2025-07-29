import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GeminiIntegration } from '@/components/MIORA/GeminiIntegration';
import { GeminiStatus } from '@/components/MIORA/GeminiStatus';
import { GeminiApiKeyManager } from '@/components/MIORA/GeminiApiKeyManager';
import { Brain, ArrowLeft, Sparkles, MessageSquare, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useGoogleGemini } from '@/hooks/useGoogleGemini';

const GeminiIntegrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [lastResponse, setLastResponse] = useState<string>('');
  const [geminiStatus, setGeminiStatus] = useState<boolean>(false);
  const { config, metrics, updateConfig } = useGoogleGemini();

  const handleGeminiResponse = (response: string) => {
    setLastResponse(response);
    console.log('Gemini Response:', response);
  };

  const handleStatusChange = (isConnected: boolean) => {
    setGeminiStatus(isConnected);
    
    if (isConnected) {
      toast({
        title: "✅ Gemini Online",
        description: "Google Gemini berhasil terhubung dan aktif",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Main
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Brain className="h-8 w-8 mr-3 text-purple-400" />
                Google Gemini Integration
              </h1>
              <p className="text-gray-400 mt-1">
                Advanced AI Integration dengan Google Gemini API - Always Active System
              </p>
            </div>
          </div>

          {/* Status Badge di Header */}
          <GeminiStatus size="md" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Integration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <GeminiIntegration 
              onResponse={handleGeminiResponse}
              onStatusChange={handleStatusChange}
            />
            
            {/* Response Display */}
            {lastResponse && (
              <Card className="bg-black/30 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-300 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Latest Gemini Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-black/50 rounded-lg">
                    <p className="text-white text-sm leading-relaxed">
                      {lastResponse}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            
            {/* API Key Manager */}
            <GeminiApiKeyManager 
              currentApiKey={config.apiKey}
              onApiKeyUpdate={(newApiKey) => updateConfig({ apiKey: newApiKey })}
              isConnected={metrics.isConnected}
            />
            
            {/* Detailed Status */}
            <GeminiStatus showDetails={true} size="lg" />
            
            {/* System Info */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">API Provider</div>
                    <div className="text-white font-semibold">Google Gemini</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Model</div>
                    <div className="text-white font-semibold">gemini-1.5-flash</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Mode</div>
                    <div className="text-white font-semibold">Always Active</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Health Check</div>
                    <div className="text-white font-semibold">Every 30s</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center text-purple-400 text-sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    MIORA Integration Active
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Fully integrated dengan sistem MIORA untuk optimal performance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-300 text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => navigate('/ai-comparison')}
                  variant="outline"
                  className="w-full justify-start border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  AI Comparison
                </Button>
                
                <Button 
                  onClick={() => navigate('/chat')}
                  variant="outline"
                  className="w-full justify-start border-green-500/50 text-green-300 hover:bg-green-500/20"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  MIORA Chat
                </Button>
                
                <Button 
                  onClick={() => navigate('/miora-full-autonomy-dashboard')}
                  variant="outline"
                  className="w-full justify-start border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Full Autonomy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-purple-300 font-semibold">Google Gemini - Always Active Integration</h3>
              <p className="text-gray-400 text-sm">
                Sistem akan selalu monitoring dan menjaga koneksi Gemini tetap aktif. Health check otomatis setiap 30 detik.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${geminiStatus ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-sm text-white font-medium">
                {geminiStatus ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiIntegrationPage;