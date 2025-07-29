import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings2 } from 'lucide-react';
import { ExchangeSelector } from './ExchangeSelector';
import { APIKeyManager } from './APIKeyManager';
import { exchangeWS } from '../services';
import { APIKey } from '../types/apiKey';

interface ExchangeConfigurationProps {
  onExchangeChange: (selectedExchanges: string[]) => void;
}

export const ExchangeConfiguration: React.FC<ExchangeConfigurationProps> = ({ onExchangeChange }) => {
  const [apiKeys, setApiKeys] = useState<Record<string, APIKey>>({});
  
  const availableExchanges = exchangeWS.getAvailableExchanges();

  const handleSaveAPIKey = (exchangeId: string, keys: APIKey) => {
    setApiKeys(prev => ({
      ...prev,
      [exchangeId]: keys
    }));
  };

  const handleDeleteAPIKey = (exchangeId: string) => {
    setApiKeys(prev => {
      const updated = { ...prev };
      delete updated[exchangeId];
      return updated;
    });
  };

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center text-sm">
          <Settings2 className="h-5 w-5 mr-2" />
          Konfigurasi Exchange
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="selection" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-700/50">
            <TabsTrigger value="selection" className="text-white data-[state=active]:bg-cyan-600">
              Pilih Exchange
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="text-white data-[state=active]:bg-cyan-600">
              API Keys
            </TabsTrigger>
            <TabsTrigger value="manual-input" className="text-white data-[state=active]:bg-cyan-600">
              Manual Input
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="selection" className="mt-4">
            <ExchangeSelector onExchangeChange={onExchangeChange} />
          </TabsContent>
          
          <TabsContent value="api-keys" className="mt-4 space-y-4">
            <div className="text-sm text-gray-400 mb-4">
              Konfigurasi API Keys untuk setiap exchange (opsional - diperlukan untuk rate limit lebih tinggi)
            </div>
            
            {availableExchanges.map(exchange => (
              <APIKeyManager
                key={exchange.id}
                exchangeId={exchange.id}
                exchangeName={exchange.name}
                onSave={handleSaveAPIKey}
                onDelete={handleDeleteAPIKey}
              />
            ))}
          </TabsContent>

          <TabsContent value="manual-input" className="mt-4 space-y-4">
            <div className="text-sm text-gray-400 mb-4">
              Input manual API keys untuk akses yang dikustomisasi
            </div>
            
            {/* Khusus BingX Manual Input */}
            <div className="space-y-4">
              <APIKeyManager
                exchangeId="bingx"
                exchangeName="BingX (Manual)"
                onSave={handleSaveAPIKey}
                onDelete={handleDeleteAPIKey}
              />
              
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-300 font-semibold mb-2">📋 Manual Input Instructions</h4>
                <div className="text-blue-200 text-sm space-y-1">
                  <p>• Gunakan tab ini untuk input API key secara manual</p>
                  <p>• API key akan disimpan di localStorage browser</p>
                  <p>• Pastikan API key memiliki permission "Read Only"</p>
                  <p>• Refresh halaman setelah menyimpan API key</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};