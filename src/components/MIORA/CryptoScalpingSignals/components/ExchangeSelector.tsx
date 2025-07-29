import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Wifi, WifiOff } from 'lucide-react';
import { exchangeWS } from '../services';
import { useToast } from '@/hooks/use-toast';

interface ExchangeSelectorProps {
  onExchangeChange: (selectedExchanges: string[]) => void;
}

export const ExchangeSelector: React.FC<ExchangeSelectorProps> = ({ onExchangeChange }) => {
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>(['bingx']);
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const availableExchanges = exchangeWS.getAvailableExchanges();

  useEffect(() => {
    // Update connection status every 2 seconds
    const interval = setInterval(() => {
      const status = exchangeWS.getConnectionStatus();
      setConnectionStatus(status);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleExchangeToggle = (exchangeId: string, checked: boolean) => {
    // Only allow BingX to be toggled
    if (exchangeId !== 'bingx') return;
    
    const updatedSelection = checked
      ? [...selectedExchanges, exchangeId]
      : selectedExchanges.filter(id => id !== exchangeId);
    
    setSelectedExchanges(updatedSelection);
  };

  const handleApplyChanges = async () => {
    if (selectedExchanges.length === 0) {
      toast({
        title: "Peringatan",
        description: "Pilih minimal satu exchange untuk melanjutkan",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT', 'XRPUSDT', 'ADAUSDT'];
      await exchangeWS.connectToSelectedExchanges(selectedExchanges, symbols);
      
      onExchangeChange(selectedExchanges);
      
      toast({
        title: "Berhasil",
        description: `Menghubungkan ke ${selectedExchanges.length} exchange`,
      });
      
      // Wait a bit for connections to establish
      setTimeout(() => {
        const newStatus = exchangeWS.getConnectionStatus();
        setConnectionStatus(newStatus);
        
        const connectedCount = Object.values(newStatus).filter(Boolean).length;
        if (connectedCount > 0) {
          toast({
            title: "Koneksi Berhasil",
            description: `${connectedCount} exchange terhubung`,
          });
        } else {
          toast({
            title: "Peringatan",
            description: "Tidak ada exchange yang berhasil terhubung. Periksa koneksi internet.",
            variant: "destructive"
          });
        }
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghubungkan ke exchange",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const getConnectionIcon = (exchangeId: string) => {
    const isConnected = connectionStatus[exchangeId];
    return isConnected ? (
      <Wifi className="h-4 w-4 text-green-400" />
    ) : (
      <WifiOff className="h-4 w-4 text-red-400" />
    );
  };

  const getConnectionBadge = (exchangeId: string) => {
    const isConnected = connectionStatus[exchangeId];
    return (
      <Badge 
        variant={isConnected ? "default" : "destructive"}
        className="text-xs"
      >
        {isConnected ? "Terhubung" : "Terputus"}
      </Badge>
    );
  };

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center text-sm">
          <Settings className="h-5 w-5 mr-2" />
          Pengaturan Exchange
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs text-gray-400 mb-3">
          Pilih exchange yang akan digunakan untuk mendapatkan sinyal real-time
        </div>
        
        <div className="space-y-3">
          {availableExchanges.map((exchange) => (
            <div key={exchange.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={exchange.id}
                  checked={selectedExchanges.includes(exchange.id)}
                  onCheckedChange={(checked) => handleExchangeToggle(exchange.id, !!checked)}
                  className="border-cyan-500 data-[state=checked]:bg-cyan-500"
                  disabled={exchange.id !== 'bingx'}
                />
                <label 
                  htmlFor={exchange.id} 
                  className={`font-medium cursor-pointer ${exchange.id === 'bingx' ? 'text-white' : 'text-gray-500'}`}
                >
                  {exchange.name} {exchange.id !== 'bingx' && '(Disabled)'}
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                {getConnectionIcon(exchange.id)}
                {getConnectionBadge(exchange.id)}
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={handleApplyChanges}
          disabled={isConnecting || selectedExchanges.length === 0}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          {isConnecting ? "Menghubungkan..." : "Terapkan Pengaturan"}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Exchange aktif: {selectedExchanges.length} dari {availableExchanges.length}
        </div>
      </CardContent>
    </Card>
  );
};