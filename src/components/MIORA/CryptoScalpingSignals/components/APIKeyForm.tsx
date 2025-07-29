import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface APIKeyFormProps {
  exchangeId: string;
  apiKey: string;
  secretKey: string;
  passphrase: string;
  showKeys: boolean;
  needsPassphrase: boolean;
  onApiKeyChange: (value: string) => void;
  onSecretKeyChange: (value: string) => void;
  onPassphraseChange: (value: string) => void;
  onToggleShowKeys: () => void;
}

export const APIKeyForm: React.FC<APIKeyFormProps> = ({
  exchangeId,
  apiKey,
  secretKey,
  passphrase,
  showKeys,
  needsPassphrase,
  onApiKeyChange,
  onSecretKeyChange,
  onPassphraseChange,
  onToggleShowKeys
}) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`${exchangeId}-api-key`} className="text-white text-sm">
          API Key
        </Label>
        <Input
          id={`${exchangeId}-api-key`}
          type={showKeys ? "text" : "password"}
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="Masukkan API Key"
          className="bg-gray-700/50 border-gray-600 text-white"
        />
      </div>

      <div>
        <Label htmlFor={`${exchangeId}-secret-key`} className="text-white text-sm">
          Secret Key
        </Label>
        <Input
          id={`${exchangeId}-secret-key`}
          type={showKeys ? "text" : "password"}
          value={secretKey}
          onChange={(e) => onSecretKeyChange(e.target.value)}
          placeholder="Masukkan Secret Key"
          className="bg-gray-700/50 border-gray-600 text-white"
        />
      </div>

      {needsPassphrase && (
        <div>
          <Label htmlFor={`${exchangeId}-passphrase`} className="text-white text-sm">
            Passphrase
          </Label>
          <Input
            id={`${exchangeId}-passphrase`}
            type={showKeys ? "text" : "password"}
            value={passphrase}
            onChange={(e) => onPassphraseChange(e.target.value)}
            placeholder="Masukkan Passphrase (OKX)"
            className="bg-gray-700/50 border-gray-600 text-white"
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleShowKeys}
          className="border-gray-600 text-gray-400 hover:text-white"
        >
          {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showKeys ? "Sembunyikan" : "Tampilkan"}
        </Button>
      </div>
    </div>
  );
};