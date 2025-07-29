import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

interface EthicalHackerAuthProps {
  onAuthenticate: (authenticated: boolean) => void;
}

export const EthicalHackerAuth: React.FC<EthicalHackerAuthProps> = ({ onAuthenticate }) => {
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState('');

  const handleAuth = () => {
    if (agreed && code === 'ETHICAL2024') {
      onAuthenticate(true);
    } else {
      alert('Authentication failed. Please read and agree to ethical guidelines.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-black/60 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-400">
            <Shield className="h-6 w-6 mr-2" />
            Ethical Hacker Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center text-yellow-400 mb-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Ethical Guidelines
            </div>
            <ul className="text-xs text-yellow-300 space-y-1">
              <li>• Only test systems you own or have permission</li>
              <li>• Educational purposes only</li>
              <li>• No malicious activities</li>
              <li>• Report vulnerabilities responsibly</li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-300">
              I agree to ethical hacking guidelines
            </label>
          </div>
          
          <Input
            type="password"
            placeholder="Enter access code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-black/40 border-gray-600"
          />
          
          <Button
            onClick={handleAuth}
            disabled={!agreed}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            AUTHENTICATE
          </Button>
          
          <p className="text-xs text-gray-400 text-center">
            Hint: Code is "ETHICAL2024"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};