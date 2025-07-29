import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, TrendingDown, Target, BarChart3, Activity } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  prediction: 'buy' | 'sell' | 'hold';
  confidence: number;
  technicalScore: number;
}

interface MarketAnalysisEngineProps {
  marketData: MarketData[];
  onGeneratePredictions: () => void;
}

export const MarketAnalysisEngine: React.FC<MarketAnalysisEngineProps> = ({
  marketData,
  onGeneratePredictions
}) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'buy': return 'bg-green-500';
      case 'sell': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Market Analysis Engine
            </div>
            <Button
              onClick={onGeneratePredictions}
              className="bg-purple-600 hover:bg-purple-500"
            >
              <Target className="h-4 w-4 mr-2" />
              Generate Predictions
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.map((market) => (
              <div key={market.symbol} className="p-4 bg-black/20 rounded-lg border border-gray-700/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-lg">{market.symbol}</span>
                    {getTrendIcon(market.trend)}
                  </div>
                  <Badge className={getPredictionColor(market.prediction)}>
                    {market.prediction.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-bold">
                      ${market.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <Badge className={market.change24h > 0 ? 'bg-green-500' : 'bg-red-500'}>
                      {market.change24h > 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume</span>
                    <span className="text-cyan-400">
                      ${(market.volume / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Confidence</span>
                      <span className="text-white text-sm">{market.confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={market.confidence} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Technical Score</span>
                      <span className="text-white text-sm">{market.technicalScore.toFixed(1)}/100</span>
                    </div>
                    <Progress value={market.technicalScore} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            Market Sentiment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {marketData.filter(m => m.prediction === 'buy').length}
              </div>
              <p className="text-gray-400">Bullish Signals</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {marketData.filter(m => m.prediction === 'hold').length}
              </div>
              <p className="text-gray-400">Neutral Signals</p>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {marketData.filter(m => m.prediction === 'sell').length}
              </div>
              <p className="text-gray-400">Bearish Signals</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Overall Market Sentiment</span>
              <span className="text-white font-bold">
                {(marketData.reduce((acc, m) => acc + m.confidence, 0) / marketData.length).toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={marketData.reduce((acc, m) => acc + m.confidence, 0) / marketData.length} 
              className="h-3" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};