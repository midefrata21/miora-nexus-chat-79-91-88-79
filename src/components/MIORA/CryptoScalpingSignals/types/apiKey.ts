export interface APIKey {
  apiKey: string;
  secretKey: string;
  passphrase?: string; // For OKX
}

export interface APIKeyManagerProps {
  exchangeId: string;
  exchangeName: string;
  onSave: (exchangeId: string, keys: APIKey) => void;
  onDelete: (exchangeId: string) => void;
}