import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Key, Save, Trash2 } from 'lucide-react';
import { APIKeyManagerProps } from '../types/apiKey';
import { useAPIKeyManager } from '../hooks/useAPIKeyManager';
import { APIKeyForm } from './APIKeyForm';
import { APIKeyInstructions } from './APIKeyInstructions';

export const APIKeyManager: React.FC<APIKeyManagerProps> = ({ 
  exchangeId, 
  exchangeName, 
  onSave, 
  onDelete 
}) => {
  const {
    apiKey,
    setApiKey,
    secretKey,
    setSecretKey,
    passphrase,
    setPassphrase,
    showKeys,
    setShowKeys,
    hasKeys,
    saveKeys,
    deleteKeys
  } = useAPIKeyManager(exchangeId, exchangeName);

  const needsPassphrase = exchangeId === 'okx';
  const isBingX = exchangeId === 'bingx';

  const handleSave = () => saveKeys(onSave);
  const handleDelete = () => deleteKeys(onDelete);

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            API Keys - {exchangeName}
          </div>
          {hasKeys && (
            <Badge className="bg-green-600 text-white text-xs">
              Tersimpan
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <APIKeyInstructions 
          isBingX={isBingX}
          needsPassphrase={needsPassphrase}
        />
        
        <APIKeyForm
          exchangeId={exchangeId}
          apiKey={apiKey}
          secretKey={secretKey}
          passphrase={passphrase}
          showKeys={showKeys}
          needsPassphrase={needsPassphrase}
          onApiKeyChange={setApiKey}
          onSecretKeyChange={setSecretKey}
          onPassphraseChange={setPassphrase}
          onToggleShowKeys={() => setShowKeys(!showKeys)}
        />

        <div className="flex space-x-2 pt-2">
          <Button 
            onClick={handleSave}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Simpan
          </Button>
          
          {hasKeys && (
            <Button 
              onClick={handleDelete}
              variant="destructive"
              className="px-3"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500">
          <p>• API Keys disimpan secara lokal di browser Anda</p>
          <p>• Hanya diperlukan untuk rate limit yang lebih tinggi</p>
          <p>• Pastikan API Key memiliki izin "Read" saja</p>
        </div>
      </CardContent>
    </Card>
  );
};