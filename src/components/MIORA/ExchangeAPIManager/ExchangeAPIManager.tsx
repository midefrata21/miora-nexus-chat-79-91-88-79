import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Key, Eye, EyeOff, Save, Trash2, Settings } from 'lucide-react';

interface ExchangeAPI {
  id: string;
  exchange_id: string;
  exchange_name: string;
  api_key: string;
  secret_key: string;
  passphrase?: string;
  sandbox_mode: boolean;
  is_active: boolean;
  permissions: any;
  last_used?: string;
}

const SUPPORTED_EXCHANGES = [
  { id: 'binance', name: 'Binance', requiresPassphrase: false },
  { id: 'okx', name: 'OKX', requiresPassphrase: true },
  { id: 'bybit', name: 'Bybit', requiresPassphrase: false },
  { id: 'coinbase', name: 'Coinbase Pro', requiresPassphrase: true },
  { id: 'kucoin', name: 'KuCoin', requiresPassphrase: true },
  { id: 'huobi', name: 'Huobi', requiresPassphrase: false },
  { id: 'bitget', name: 'Bitget', requiresPassphrase: true },
  { id: 'bingx', name: 'BingX', requiresPassphrase: false },
  { id: 'gate', name: 'Gate.io', requiresPassphrase: true },
  { id: 'mexc', name: 'MEXC', requiresPassphrase: false },
  { id: 'bitfinex', name: 'Bitfinex', requiresPassphrase: false },
  { id: 'kraken', name: 'Kraken', requiresPassphrase: false },
  { id: 'gemini', name: 'Gemini', requiresPassphrase: false },
  { id: 'crypto_com', name: 'Crypto.com', requiresPassphrase: false },
];

const ExchangeAPIManager = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ExchangeAPI[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState({
    exchange_id: '',
    exchange_name: '',
    api_key: '',
    secret_key: '',
    passphrase: '',
    sandbox_mode: true,
    permissions: { trading: false, reading: true, futures: false }
  });

  useEffect(() => {
    loadAPIKeys();
  }, []);

  const loadAPIKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('miora_exchange_api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast({
        title: "❌ Load Error",
        description: "Gagal memuat API keys",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAPIKey = async () => {
    if (!newKey.exchange_id || !newKey.api_key || !newKey.secret_key) {
      toast({
        title: "❌ Validation Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('miora_exchange_api_keys')
        .insert([newKey]);

      if (error) throw error;

      toast({
        title: "✅ API Key Saved",
        description: `API key untuk ${newKey.exchange_name} berhasil disimpan`,
      });

      setIsAddingNew(false);
      setNewKey({
        exchange_id: '',
        exchange_name: '',
        api_key: '',
        secret_key: '',
        passphrase: '',
        sandbox_mode: true,
        permissions: { trading: false, reading: true, futures: false }
      });
      loadAPIKeys();
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "❌ Save Error",
        description: "Gagal menyimpan API key",
        variant: "destructive",
      });
    }
  };

  const deleteAPIKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('miora_exchange_api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "🗑️ API Key Deleted",
        description: "API key berhasil dihapus",
      });
      loadAPIKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: "❌ Delete Error",
        description: "Gagal menghapus API key",
        variant: "destructive",
      });
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAPIKeyStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('miora_exchange_api_keys')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      loadAPIKeys();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Exchange API Key Manager
            </div>
            <Button
              onClick={() => setIsAddingNew(true)}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Exchange
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {isAddingNew && (
            <Card className="bg-gray-800/50 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-300 text-sm">Add New Exchange API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Exchange</Label>
                    <select
                      value={newKey.exchange_id}
                      onChange={(e) => {
                        const selected = SUPPORTED_EXCHANGES.find(ex => ex.id === e.target.value);
                        setNewKey({
                          ...newKey,
                          exchange_id: e.target.value,
                          exchange_name: selected?.name || ''
                        });
                      }}
                      className="w-full p-2 bg-gray-700 border border-amber-500/30 rounded text-white"
                    >
                      <option value="">Select Exchange</option>
                      {SUPPORTED_EXCHANGES.map(exchange => (
                        <option key={exchange.id} value={exchange.id}>
                          {exchange.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Mode</Label>
                    <select
                      value={newKey.sandbox_mode ? 'sandbox' : 'live'}
                      onChange={(e) => setNewKey({ ...newKey, sandbox_mode: e.target.value === 'sandbox' })}
                      className="w-full p-2 bg-gray-700 border border-amber-500/30 rounded text-white"
                    >
                      <option value="sandbox">Sandbox (Test)</option>
                      <option value="live">Live Trading</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">API Key</Label>
                  <Input
                    type="password"
                    value={newKey.api_key}
                    onChange={(e) => setNewKey({ ...newKey, api_key: e.target.value })}
                    className="bg-gray-700 border-amber-500/30 text-white"
                    placeholder="Enter API Key"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Secret Key</Label>
                  <Input
                    type="password"
                    value={newKey.secret_key}
                    onChange={(e) => setNewKey({ ...newKey, secret_key: e.target.value })}
                    className="bg-gray-700 border-amber-500/30 text-white"
                    placeholder="Enter Secret Key"
                  />
                </div>

                {SUPPORTED_EXCHANGES.find(ex => ex.id === newKey.exchange_id)?.requiresPassphrase && (
                  <div>
                    <Label className="text-gray-300">Passphrase</Label>
                    <Input
                      type="password"
                      value={newKey.passphrase}
                      onChange={(e) => setNewKey({ ...newKey, passphrase: e.target.value })}
                      className="bg-gray-700 border-amber-500/30 text-white"
                      placeholder="Enter Passphrase"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={saveAPIKey} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    onClick={() => setIsAddingNew(false)} 
                    variant="outline"
                    className="border-gray-500 text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {apiKeys.map((apiKey) => (
              <Card key={apiKey.id} className="bg-gray-800/50 border-amber-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-amber-300 font-medium">{apiKey.exchange_name}</h3>
                        <Badge className={apiKey.is_active ? 'bg-green-600' : 'bg-gray-600'}>
                          {apiKey.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge className={apiKey.sandbox_mode ? 'bg-blue-600' : 'bg-red-600'}>
                          {apiKey.sandbox_mode ? 'Sandbox' : 'Live'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        API: {showKeys[apiKey.id] ? apiKey.api_key : '••••••••••••••••'}
                      </div>
                      <div className="text-sm text-gray-400">
                        Secret: {showKeys[apiKey.id] ? apiKey.secret_key : '••••••••••••••••'}
                      </div>
                      {apiKey.passphrase && (
                        <div className="text-sm text-gray-400">
                          Passphrase: {showKeys[apiKey.id] ? apiKey.passphrase : '••••••••'}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="border-amber-500 text-amber-300"
                      >
                        {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAPIKeyStatus(apiKey.id, apiKey.is_active)}
                        className="border-blue-500 text-blue-300"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteAPIKey(apiKey.id)}
                        className="border-red-500 text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {apiKeys.length === 0 && !isAddingNew && (
            <div className="text-center py-8 text-gray-400">
              <Key className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada API key yang tersimpan</p>
              <p className="text-sm">Klik "Add Exchange" untuk menambahkan API key pertama</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExchangeAPIManager;