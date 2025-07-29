import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Clock } from 'lucide-react';
import { CryptoSignal } from '../types';
import { getPnLColor, getConfidenceColor } from '../utils';

interface SignalCardProps {
  signal: CryptoSignal;
  onClick: () => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onClick }) => {
  return (
    <Card 
      className="bg-gray-800/50 border-gray-700/50 hover:border-orange-500/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge className={
              signal.type === 'BUY' ? 'bg-green-500' : 'bg-red-500'
            }>
              {signal.type === 'BUY' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {signal.type}
            </Badge>
            <span className="text-lg font-bold text-white">{signal.pair}</span>
          </div>
          <Badge className={getConfidenceColor(signal.confidence)}>
            {signal.confidence.toFixed(1)}%
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Entry:</span>
            <span className="text-white">${signal.entryPrice.toFixed(6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Current:</span>
            <span className="text-cyan-400">${signal.currentPrice.toFixed(6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">PnL:</span>
            <span className={getPnLColor(signal.pnl)}>
              {signal.pnl > 0 ? '+' : ''}{signal.pnl.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">R:R:</span>
            <span className="text-green-400">{signal.riskReward}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">
              <Clock className="h-3 w-3 mr-1 inline" />
              {signal.timeframe}
            </span>
            <Badge variant="outline" className="text-xs">
              {signal.technique[0]}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};