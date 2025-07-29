import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, TrendingUp, TrendingDown, Target, Activity, Brain } from 'lucide-react';

interface TradingSignal {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  strength: number;
  confidence: number;
  timeframe: string;
  entry: number;
  target: number;
  stopLoss: number;
  reasoning: string;
  timestamp: number;
}

interface TradingSignalsAIProps {
  signals: TradingSignal[];
  isActive: boolean;
}

export const TradingSignalsAI: React.FC<TradingSignalsAIProps> = ({
  signals,
  isActive
}) => {
  const getSignalColor = (type: string) => {
    switch (type) {
      case 'BUY': return 'bg-green-500';
      case 'SELL': return 'bg-red-500';
      case 'HOLD': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'BUY': return <TrendingUp className="h-4 w-4" />;
      case 'SELL': return <TrendingDown className="h-4 w-4" />;
      case 'HOLD': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              AI Trading Signals
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-300">
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {signals.filter(s => s.type === 'BUY').length}
              </div>
              <p className="text-gray-400">Buy Signals</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">
                {signals.filter(s => s.type === 'SELL').length}
              </div>
              <p className="text-gray-400">Sell Signals</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                {signals.filter(s => s.type === 'HOLD').length}
              </div>
              <p className="text-gray-400">Hold Signals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {signals.map((signal) => (
          <Card key={signal.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{signal.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{signal.symbol}</h3>
                    <p className="text-gray-400 text-sm">{signal.timeframe} • {getTimeAgo(signal.timestamp)}</p>
                  </div>
                </div>
                <Badge className={getSignalColor(signal.type)}>
                  {getSignalIcon(signal.type)}
                  <span className="ml-1">{signal.type}</span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Entry Price</span>
                    <span className="text-white font-medium">${signal.entry.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Target</span>
                    <span className="text-green-400 font-medium">${signal.target.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Stop Loss</span>
                    <span className="text-red-400 font-medium">${signal.stopLoss.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Strength</span>
                      <span className="text-white text-sm">{signal.strength.toFixed(1)}%</span>
                    </div>
                    <Progress value={signal.strength} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Confidence</span>
                      <span className="text-white text-sm">{signal.confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={signal.confidence} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg">
                <h4 className="text-cyan-300 font-medium mb-1">AI Analysis</h4>
                <p className="text-gray-300 text-sm">{signal.reasoning}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Potential: {signal.type === 'BUY' ? '+' : signal.type === 'SELL' ? '-' : '±'}
                  {Math.abs(((signal.target - signal.entry) / signal.entry) * 100).toFixed(1)}%
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-500">
                  <Target className="h-3 w-3 mr-1" />
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {signals.length === 0 && (
        <Card className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border-gray-700/30">
          <CardContent className="text-center py-12">
            <Zap className="h-16 w-16 mx-auto text-gray-400 mb-4 opacity-50" />
            <h3 className="text-xl text-white mb-2">No Active Signals</h3>
            <p className="text-gray-400">
              {isActive 
                ? 'AI is analyzing market conditions for new opportunities...' 
                : 'Activate Quantum Wealth AI to start receiving trading signals'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};