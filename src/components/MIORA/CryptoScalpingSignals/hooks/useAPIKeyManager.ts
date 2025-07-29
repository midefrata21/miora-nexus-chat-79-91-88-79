import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { APIKey } from '../types/apiKey';

export const useAPIKeyManager = (exchangeId: string, exchangeName: string) => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const [hasKeys, setHasKeys] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved keys from localStorage
    const savedKeys = localStorage.getItem(`${exchangeId}_api_keys`);
    if (savedKeys) {
      try {
        const parsed = JSON.parse(savedKeys);
        setApiKey(parsed.apiKey || '');
        setSecretKey(parsed.secretKey || '');
        setPassphrase(parsed.passphrase || '');
        setHasKeys(true);
      } catch (error) {
        console.error('Error loading API keys:', error);
      }
    }
  }, [exchangeId]);

  const saveKeys = (onSave: (exchangeId: string, keys: APIKey) => void) => {
    if (!apiKey.trim() || !secretKey.trim()) {
      toast({
        title: "Error",
        description: "API Key dan Secret Key wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const keys: APIKey = {
      apiKey: apiKey.trim(),
      secretKey: secretKey.trim(),
      ...(passphrase.trim() && { passphrase: passphrase.trim() })
    };

    // Save to localStorage
    localStorage.setItem(`${exchangeId}_api_keys`, JSON.stringify(keys));
    
    onSave(exchangeId, keys);
    setHasKeys(true);
    
    toast({
      title: "Berhasil",
      description: `API Key ${exchangeName} berhasil disimpan`,
    });
  };

  const deleteKeys = (onDelete: (exchangeId: string) => void) => {
    localStorage.removeItem(`${exchangeId}_api_keys`);
    setApiKey('');
    setSecretKey('');
    setPassphrase('');
    setHasKeys(false);
    onDelete(exchangeId);
    
    toast({
      title: "Berhasil",
      description: `API Key ${exchangeName} berhasil dihapus`,
    });
  };

  return {
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
  };
};