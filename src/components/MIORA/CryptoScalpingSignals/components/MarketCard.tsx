import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MarketData } from '../types';

interface MarketCardProps {
  data: MarketData;
}

export const MarketCard: React.FC<MarketCardProps> = ({ data }) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-white text-lg">{data.symbol}/USDT</h3>
          <Badge className={data.change24h > 0 ? 'bg-green-500' : 'bg-red-500'}>
            {data.change24h > 0 ? '+' : ''}{data.change24h.toFixed(2)}%
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Price:</span>
            <span className="text-white">${data.price.toFixed(6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Volume 24h:</span>
            <span className="text-cyan-400">${(data.volume24h / 1000000).toFixed(2)}M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Volatility:</span>
            <span className="text-yellow-400">{data.volatility.toFixed(2)}%</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Volatility</span>
            <span>{data.volatility.toFixed(1)}%</span>
          </div>
          <Progress value={data.volatility * 20} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};