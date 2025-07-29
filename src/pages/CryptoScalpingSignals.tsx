import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Brain, Zap, BarChart3, Fish } from 'lucide-react';
import { useScalpingSignals } from '@/components/MIORA/CryptoScalpingSignals/hooks/useScalpingSignals';
import MIORAAnalysisPanel from '@/components/MIORA/CryptoScalpingSignals/components/MIORAAnalysisPanel';
import { EnhancedCryptoSignal } from '@/components/MIORA/CryptoScalpingSignals/types/enhanced';
import { ExchangeSelector } from '@/components/MIORA/CryptoScalpingSignals/components/ExchangeSelector';
import { WhaleTracker } from '@/components/MIORA/CryptoScalpingSignals/components/WhaleTracker';

const CryptoScalpingSignals: React.FC = () => {
  const navigate = useNavigate();
  const { 
    signals, 
    enhancedSignals, 
    marketData, 
    mioraMode, 
    toggleMioraMode,
    isActive,
    startScalpingEngine,
    stopScalpingEngine 
  } = useScalpingSignals();
  
  const [selectedEnhancedSignal, setSelectedEnhancedSignal] = useState<EnhancedCryptoSignal | null>(null);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>(['binance', 'bybit', 'okx', 'bingx']);

  const handleExchangeChange = (exchanges: string[]) => {
    setSelectedExchanges(exchanges);
    console.log('Selected exchanges updated:', exchanges);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            {mioraMode ? 'MIORA Enhanced Crypto Scalping' : 'Crypto Scalping Signals'}
          </h1>
          <p className="text-gray-300 mb-6">
            {mioraMode ? 
              'Sistem MIORA 5-Level Deep Analysis untuk Profit Maksimal' : 
              'AI-Powered Trading Signals untuk Scalping Cryptocurrency'
            }
          </p>
          
          {/* Quick Navigation to Other Trading Tools */}
          <div className="mb-6 flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/crypto-analysis-engine')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              🔍 Analysis Engine
            </Button>
            <Button 
              onClick={() => window.open('/quantum-wealth-ai', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Target className="h-4 w-4 mr-2" />
              💎 Quantum Wealth AI
            </Button>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={toggleMioraMode}
              className={`${mioraMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'} transition-all`}
            >
              <Brain className="w-4 h-4 mr-2" />
              {mioraMode ? 'MIORA Mode Active' : 'Activate MIORA'}
            </Button>
            <Button 
              onClick={isActive ? stopScalpingEngine : startScalpingEngine}
              variant={isActive ? "destructive" : "default"}
            >
              <Zap className="w-4 h-4 mr-2" />
              {isActive ? 'Stop Engine' : 'Start Engine'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {mioraMode ? 'MIORA Signals' : 'Active Signals'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {mioraMode ? enhancedSignals.length : signals.length}
              </div>
              <p className="text-gray-400">
                {mioraMode ? 'AI-Enhanced signals' : 'Real-time signals'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Target className="w-5 h-5" />
                {mioraMode ? 'MIORA Accuracy' : 'Success Rate'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {mioraMode ? '94.2%' : '87.5%'}
              </div>
              <p className="text-gray-400">
                {mioraMode ? 'AI-Enhanced accuracy' : 'Last 30 days'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                {mioraMode ? 'MIORA Profit' : 'Total PnL'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {mioraMode ? '+$28,750' : '+$12,450'}
              </div>
              <p className="text-gray-400">
                {mioraMode ? 'Enhanced returns' : 'This month'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue={mioraMode ? "miora" : "signals"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="signals" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Standard Signals
            </TabsTrigger>
            <TabsTrigger value="miora" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              MIORA Analysis
            </TabsTrigger>
            <TabsTrigger value="whale" className="flex items-center gap-2">
              <Fish className="w-4 h-4" />
              Pelacak Bandar
            </TabsTrigger>
            <TabsTrigger value="exchanges" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Exchange Settings
            </TabsTrigger>
          </TabsList>

          {/* Standard Signals Tab */}
          <TabsContent value="signals" className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Current Signals</h2>
            {signals.length === 0 ? (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Waiting for signals... Engine is scanning markets</p>
                </CardContent>
              </Card>
            ) : (
              signals.slice(0, 10).map((signal, index) => (
                <Card key={signal.id || index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-xl font-bold text-white">{signal.pair}</div>
                        <Badge className={signal.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                          {signal.type === 'BUY' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                          {signal.type}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {signal.confidence.toFixed(1)}% Confidence
                        </Badge>
                      </div>
                      <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                        Execute Trade
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-gray-400 text-sm">Entry</p>
                        <p className="text-white font-semibold">${signal.entryPrice.toFixed(signal.entryPrice > 1000 ? 0 : 6)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Current</p>
                        <p className="text-blue-400 font-semibold">${signal.currentPrice.toFixed(signal.currentPrice > 1000 ? 0 : 6)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Stop Loss</p>
                        <p className="text-red-400 font-semibold">${signal.stopLoss.toFixed(signal.stopLoss > 1000 ? 0 : 6)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">PnL</p>
                        <p className={`font-semibold ${signal.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {signal.pnl >= 0 ? '+' : ''}{signal.pnl.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* MIORA Analysis Tab */}
          <TabsContent value="miora" className="space-y-4">
            {!mioraMode ? (
              <Card className="bg-purple-900/20 border-purple-700">
                <CardContent className="p-8 text-center">
                  <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">MIORA Mode Inactive</h3>
                  <p className="text-gray-400 mb-4">
                    Activate MIORA mode untuk mendapatkan analisis 5-level depth dan rekomendasi profit maksimal
                  </p>
                  <Button onClick={toggleMioraMode} className="bg-purple-600 hover:bg-purple-700">
                    <Brain className="w-4 h-4 mr-2" />
                    Activate MIORA
                  </Button>
                </CardContent>
              </Card>
            ) : enhancedSignals.length === 0 ? (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-400">MIORA sedang menganalisis pasar... Menunggu sinyal berkualitas tinggi</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">MIORA Enhanced Signals</h2>
                  <Badge className="bg-purple-600 text-white">
                    {enhancedSignals.length} Active Analysis
                  </Badge>
                </div>

                {/* Enhanced Signals List */}
                <div className="grid gap-4">
                  {enhancedSignals.map((signal, index) => (
                    <Card key={signal.id} className="bg-gray-800/50 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-all"
                          onClick={() => setSelectedEnhancedSignal(signal)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-xl font-bold text-white">{signal.pair}</div>
                            <Badge className={signal.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {signal.type === 'BUY' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                              {signal.type}
                            </Badge>
                            <Badge className={`${signal.alertLevel === 'CRITICAL' ? 'bg-red-600' : 
                                              signal.alertLevel === 'HIGH' ? 'bg-orange-600' :
                                              signal.alertLevel === 'MEDIUM' ? 'bg-yellow-600' : 'bg-gray-600'} text-white`}>
                              {signal.alertLevel}
                            </Badge>
                            <Badge className="bg-purple-500/20 text-purple-400">
                              Quality: {signal.qualityScore.toFixed(1)}%
                            </Badge>
                          </div>
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                            View Analysis
                          </Button>
                        </div>
                        <div className="grid grid-cols-5 gap-4 mt-4">
                          <div>
                            <p className="text-gray-400 text-sm">Entry</p>
                            <p className="text-white font-semibold">${signal.entryPrice.toFixed(signal.entryPrice > 1000 ? 0 : 6)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Confidence</p>
                            <p className="text-blue-400 font-semibold">{signal.mioraAnalysis.overallConfidence.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Profit Potential</p>
                            <p className="text-green-400 font-semibold">+{signal.mioraAnalysis.profitPotential.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Risk Level</p>
                            <p className={`font-semibold ${
                              signal.mioraAnalysis.riskLevel === 'LOW' ? 'text-green-400' :
                              signal.mioraAnalysis.riskLevel === 'MEDIUM' ? 'text-yellow-400' :
                              signal.mioraAnalysis.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-red-400'
                            }`}>
                              {signal.mioraAnalysis.riskLevel}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Recommendation</p>
                            <p className="text-purple-400 font-semibold">{signal.mioraAnalysis.overallRecommendation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detailed MIORA Analysis Panel */}
                {selectedEnhancedSignal && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">Detailed MIORA Analysis</h3>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedEnhancedSignal(null)}
                      >
                        Close Analysis
                      </Button>
                    </div>
                    <MIORAAnalysisPanel 
                      analysis={selectedEnhancedSignal.mioraAnalysis}
                      onExecuteSignal={() => {
                        // Handle signal execution
                        console.log('Executing signal:', selectedEnhancedSignal);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Whale Tracker Tab */}
          <TabsContent value="whale" className="space-y-4">
            <WhaleTracker />
          </TabsContent>

          {/* Exchange Settings Tab */}
          <TabsContent value="exchanges" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Exchange Configuration</h2>
                <p className="text-gray-400 mb-6">
                  Pilih exchange yang ingin Anda gunakan untuk mendapatkan data real-time. 
                  Pastikan exchange yang dipilih sesuai dengan platform trading yang Anda gunakan.
                </p>
                <ExchangeSelector onExchangeChange={handleExchangeChange} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Exchange Information</h3>
                <div className="grid gap-4">
                  <Card className="bg-blue-900/20 border-blue-700">
                    <CardHeader>
                      <CardTitle className="text-blue-400 text-sm">Supported Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Real-time price data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">24h volume & change</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Bid/Ask spread</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Auto reconnection</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-yellow-900/20 border-yellow-700">
                    <CardHeader>
                      <CardTitle className="text-yellow-400 text-sm">Trading Pairs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-300 text-sm">
                        Monitored pairs: BTC/USDT, ETH/USDT, SOL/USDT, DOGE/USDT, XRP/USDT, ADA/USDT
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-900/20 border-purple-700">
                    <CardHeader>
                      <CardTitle className="text-purple-400 text-sm">MIORA Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-300 text-sm">
                        Data dari exchange yang dipilih akan digunakan oleh MIORA untuk analisis mendalam 
                        dan menghasilkan sinyal trading yang lebih akurat.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoScalpingSignals;