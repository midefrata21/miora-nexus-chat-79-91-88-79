import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Building2,
  RefreshCw,
  Target,
  ShieldAlert,
  BookOpen,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { CryptoSignal } from '../types';
import { getPnLColor, getConfidenceColor } from '../utils';

interface EnhancedSignalCardProps {
  signal: CryptoSignal;
  onClick: () => void;
}

export const EnhancedSignalCard: React.FC<EnhancedSignalCardProps> = ({ signal, onClick }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getExchangeBadgeColor = (reliability: number) => {
    if (reliability >= 95) return 'bg-green-500';
    if (reliability >= 90) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getConfirmationIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const formatPrice = (price: number) => {
    return price > 1000 ? price.toFixed(0) : price.toFixed(6);
  };

  return (
    <Card 
      className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {signal.type === 'BUY' ? (
                <ArrowUp className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDown className="w-5 h-5 text-red-400" />
              )}
              <CardTitle className="text-lg font-bold text-white">
                {signal.pair}
              </CardTitle>
            </div>
            <Badge 
              className={`${signal.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} border-0`}
            >
              {signal.type}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            <Badge className={`${getExchangeBadgeColor(signal.exchange.reliability)} text-white border-0`}>
              {signal.exchange.name}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Real-time Price Info */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-800/30 rounded-lg">
          <div>
            <p className="text-xs text-gray-400">Current Price</p>
            <p className="text-sm font-mono text-white">${formatPrice(signal.realTimePrice.lastPrice)}</p>
            <p className={`text-xs font-mono ${signal.realTimePrice.priceChangePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {signal.realTimePrice.priceChangePercent24h >= 0 ? '+' : ''}{signal.realTimePrice.priceChangePercent24h.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Entry Target</p>
            <p className="text-sm font-mono text-white">${formatPrice(signal.entryPrice)}</p>
            <p className="text-xs text-gray-400">Spread: {(signal.realTimePrice.spread * 100).toFixed(4)}%</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="actions" className="text-xs">Actions</TabsTrigger>
            <TabsTrigger value="pattern" className="text-xs">Pattern</TabsTrigger>
            <TabsTrigger value="guide" className="text-xs">Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3 mt-3">
            {/* Confidence & Pattern */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Confidence</span>
                <span className="text-sm font-bold text-white">{signal.confidence.toFixed(1)}%</span>
              </div>
              <Progress value={signal.confidence} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Chart Pattern</span>
                <span className="text-sm text-white">{signal.chartPattern.type.replace('_', ' ')}</span>
              </div>
              <Progress value={signal.chartPattern.confidence} className="h-2" />
            </div>

            {/* PnL */}
            <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
              <span className="text-xs text-gray-400">Current P&L</span>
              <span className={`text-sm font-mono ${getPnLColor(signal.pnl)}`}>
                {signal.pnl >= 0 ? '+' : ''}{signal.pnl.toFixed(2)}%
              </span>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-3 mt-3">
            <div className="space-y-2">
              {signal.detailedActionPoints.slice(0, 3).map((action, idx) => (
                <div key={action.id} className="p-2 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white">{action.action}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs border-0 ${
                        action.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                        action.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-300 mb-1">{action.description}</p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{action.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pattern" className="space-y-3 mt-3">
            <div className="p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-white">
                  {signal.chartPattern.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-3">{signal.chartPattern.beginnerExplanation}</p>
              
              {/* Expected Move */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Expected Direction</span>
                  <div className="flex items-center gap-1">
                    {signal.chartPattern.expectedMove.direction === 'UP' ? (
                      <TrendingUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className="text-xs text-white">{signal.chartPattern.expectedMove.direction}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Target Price</span>
                  <span className="text-xs font-mono text-white">
                    ${formatPrice(signal.chartPattern.expectedMove.target)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400">Probability</span>
                  <span className="text-xs text-white">{signal.chartPattern.expectedMove.probability.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Confirmation Signals */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-300">Confirmations:</span>
              {signal.confirmationSignals.slice(0, 3).map((conf, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-800/20 rounded">
                  <span className="text-xs text-gray-300">{conf.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-white">{conf.strength.toFixed(0)}%</span>
                    {conf.type === 'BULLISH' ? (
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    ) : conf.type === 'BEARISH' ? (
                      <XCircle className="w-3 h-3 text-red-400" />
                    ) : (
                      <HelpCircle className="w-3 h-3 text-yellow-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-3 mt-3">
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-white">Panduan Pemula</span>
              </div>
              <p className="text-xs text-gray-300 mb-3">{signal.beginnerGuide.overview}</p>
              
              {/* Risk Warning */}
              <div className="flex items-start gap-2 p-2 bg-red-500/10 rounded border border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-200">{signal.beginnerGuide.riskWarning}</p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-300">Tips Pemula:</span>
              {signal.beginnerGuide.tipsPemula.slice(0, 3).map((tip, idx) => (
                <div key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="bg-gray-700" />

        {/* Exchange Info & Last Update */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Building2 className="w-3 h-3" />
            <span>{signal.exchange.name}</span>
            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
              {signal.exchange.reliability}% reliable
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            <span>{new Date(signal.timestamp).toLocaleTimeString('id-ID', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'Asia/Jakarta'
            })} WIB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};