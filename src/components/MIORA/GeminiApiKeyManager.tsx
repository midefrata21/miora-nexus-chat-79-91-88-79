import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GeminiApiKeyManagerProps {
  currentApiKey: string;
  onApiKeyUpdate: (newApiKey: string) => void;
  isConnected: boolean;
}

export const GeminiApiKeyManager: React.FC<GeminiApiKeyManagerProps> = ({
  currentApiKey,
  onApiKeyUpdate,
  isConnected
}) => {
  const [newApiKey, setNewApiKey] = useState('');
  const [showCurrentKey, setShowCurrentKey] = useState(false);
  const [showNewKey, setShowNewKey] = useState(false);

  const handleUpdateApiKey = () => {
    if (!newApiKey.trim()) {
      toast({
        title: "❌ Error",
        description: "API Key tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    if (!newApiKey.startsWith('AIzaSy')) {
      toast({
        title: "⚠️ Warning",
        description: "API Key Gemini biasanya dimulai dengan 'AIzaSy'. Pastikan key yang Anda masukkan benar.",
        variant: "destructive"
      });
      return;
    }

    if (newApiKey === currentApiKey) {
      toast({
        title: "ℹ️ Info",
        description: "API Key yang sama sudah digunakan",
        variant: "default"
      });
      return;
    }

    console.log('Updating API key from', currentApiKey, 'to', newApiKey);
    onApiKeyUpdate(newApiKey);
    setNewApiKey('');
    
    toast({
      title: "✅ Berhasil",
      description: "API Key Gemini berhasil diperbarui! Sistem akan melakukan health check otomatis dalam beberapa detik.",
      duration: 4000
    });
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '••••••••••••••••••••••••••••••••••••••••' + key.substring(key.length - 4);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center">
          <Key className="h-5 w-5 mr-2" />
          Gemini API Key Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Current API Key Status */}
        <div className="space-y-3">
          <Label className="text-gray-300">Current API Key</Label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center space-x-2 p-3 bg-black/30 rounded-lg border border-gray-600">
              <span className="text-sm text-gray-300 font-mono flex-1">
                {showCurrentKey ? currentApiKey : maskApiKey(currentApiKey)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCurrentKey(!showCurrentKey)}
                className="text-gray-400 hover:text-white"
              >
                {showCurrentKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-400 text-sm font-medium">ACTIVE</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-400 text-sm font-medium">ERROR/QUOTA</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* New API Key Input */}
        <div className="space-y-3">
          <Label className="text-gray-300">Update API Key</Label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                type={showNewKey ? "text" : "password"}
                placeholder="Masukkan API Key Gemini baru..."
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                className="pr-10 bg-black/30 border-gray-600 text-white"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewKey(!showNewKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              >
                {showNewKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              onClick={handleUpdateApiKey}
              disabled={!newApiKey.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update
            </Button>
          </div>
          <p className="text-xs text-gray-400">
            API Key harus dimulai dengan 'AIzaSy' dan minimal 39 karakter
          </p>
        </div>

        {/* Help Section */}
        <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <h4 className="text-yellow-300 font-semibold mb-2 text-sm">💡 Cara Mendapatkan API Key</h4>
          <div className="space-y-2 text-xs text-yellow-200">
            <p>1. Kunjungi Google AI Studio</p>
            <p>2. Login dengan akun Google Anda</p>
            <p>3. Buat atau pilih project</p>
            <p>4. Generate API Key baru</p>
            <p>5. Copy dan paste di form di atas</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
            className="mt-3 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Buka Google AI Studio
          </Button>
        </div>

        {/* Quota Info & Status */}
        <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h4 className="text-purple-300 font-semibold mb-2 text-sm">📊 Quota Information</h4>
          <div className="text-xs text-purple-200 space-y-1">
            <p>• Free Tier: 50 requests per day</p>
            <p>• Paid Tier: Higher limits available</p>
            <p>• Rate Limit: 60 requests per minute</p>
            {!isConnected && (
              <div className="mt-2 p-2 bg-red-900/30 border border-red-500/30 rounded">
                <p className="text-red-300 text-xs font-semibold">⚠️ Current Issue:</p>
                <p className="text-red-200 text-xs">Quota exceeded atau API key tidak valid. Silakan update API key dengan yang baru.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};