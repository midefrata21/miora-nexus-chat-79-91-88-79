import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';

interface MIORAAPIKeyManagerProps {
  onKeyValidated?: (isValid: boolean) => void;
}

const MIORAAPIKeyManager: React.FC<MIORAAPIKeyManagerProps> = ({ onKeyValidated }) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'none' | 'valid' | 'invalid'>('none');

  useEffect(() => {
    // Check for existing API key in localStorage
    const savedKey = localStorage.getItem('miora_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setKeyStatus('valid');
      onKeyValidated?.(true);
    }
  }, [onKeyValidated]);

  const validateAPIKey = async (key: string): Promise<boolean> => {
    if (!key || key.length < 10) {
      return false;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('API key validation error:', error);
      return false;
    }
  };

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "❌ Invalid Key",
        description: "Silakan masukkan API key yang valid",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const isValid = await validateAPIKey(apiKey);
      
      if (isValid) {
        localStorage.setItem('miora_api_key', apiKey);
        setKeyStatus('valid');
        onKeyValidated?.(true);
        
        toast({
          title: "✅ API Key Valid",
          description: "OpenAI API key berhasil disimpan dan tervalidasi",
          duration: 4000,
        });
      } else {
        setKeyStatus('invalid');
        onKeyValidated?.(false);
        
        toast({
          title: "❌ API Key Invalid",
          description: "API key tidak valid atau tidak memiliki akses",
          variant: "destructive",
        });
      }
    } catch (error) {
      setKeyStatus('invalid');
      onKeyValidated?.(false);
      
      toast({
        title: "❌ Validation Error",
        description: "Gagal memvalidasi API key",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('miora_api_key');
    setApiKey('');
    setKeyStatus('none');
    onKeyValidated?.(false);
    
    toast({
      title: "🗑️ API Key Removed",
      description: "API key telah dihapus dari storage",
      duration: 3000,
    });
  };

  const handleTestKey = async () => {
    if (keyStatus !== 'valid') {
      toast({
        title: "⚠️ No Valid Key",
        description: "Simpan dan validasi API key terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: 'Test message for MIORA voice system'
            }
          ],
          max_tokens: 50
        }),
      });

      if (response.ok) {
        toast({
          title: "✅ API Test Successful",
          description: "API key berfungsi dengan baik untuk chat completions",
          duration: 4000,
        });
      } else {
        throw new Error('API test failed');
      }
    } catch (error) {
      toast({
        title: "❌ API Test Failed",
        description: "API key tidak dapat mengakses chat completions",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const getStatusColor = () => {
    switch (keyStatus) {
      case 'valid': return 'bg-green-500';
      case 'invalid': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (keyStatus) {
      case 'valid': return 'VALID';
      case 'invalid': return 'INVALID';
      default: return 'NOT SET';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
      <CardHeader>
        <CardTitle className="text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            MIORA API Key Manager
          </div>
          <Badge className={`${getStatusColor()} text-white`}>
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 bg-amber-600/10 border border-amber-500/30 rounded-lg">
          <h3 className="text-amber-300 font-medium mb-2">🔑 Setup OpenAI API Key</h3>
          <p className="text-sm text-gray-300 mb-3">
            Untuk mengaktifkan AI responses yang lebih cerdas, masukkan OpenAI API key Anda. 
            Tanpa API key, MIORA akan menggunakan intelligent fallback responses.
          </p>
          <p className="text-xs text-amber-400">
            API key disimpan secara lokal di browser Anda dan tidak dikirim ke server lain.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-gray-800/50 border-amber-500/30 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleSaveKey}
              disabled={isValidating || !apiKey.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Validating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save & Validate
                </>
              )}
            </Button>
            
            {keyStatus === 'valid' && (
              <>
                <Button
                  onClick={handleTestKey}
                  disabled={isValidating}
                  variant="outline"
                  className="border-amber-500 text-amber-300 hover:bg-amber-500/20"
                >
                  Test API
                </Button>
                
                <Button
                  onClick={handleRemoveKey}
                  variant="outline"
                  className="border-red-500 text-red-300 hover:bg-red-500/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {keyStatus === 'valid' && (
          <div className="p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center text-green-400 text-sm">
              <Check className="w-4 h-4 mr-2" />
              API key aktif - MIORA akan menggunakan OpenAI untuk responses yang lebih cerdas
            </div>
          </div>
        )}

        {keyStatus === 'none' && (
          <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded-lg">
            <div className="text-blue-400 text-sm">
              💡 Tanpa API key, MIORA akan menggunakan intelligent fallback system yang tetap bisa memberikan respons yang berguna
            </div>
          </div>
        )}

        <div className="text-xs text-gray-400">
          <p>
            Dapatkan API key gratis di{' '}
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline"
            >
              OpenAI Platform
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MIORAAPIKeyManager;