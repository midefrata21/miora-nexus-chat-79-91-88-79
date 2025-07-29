import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Zap, 
  Target, 
  Globe, 
  Activity,
  Infinity,
  Crown,
  Gem,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQuantumWealthAI } from './hooks/useQuantumWealthAI';
import { WealthDashboard } from './components/WealthDashboard';
import { MarketAnalysisEngine } from './components/MarketAnalysisEngine';
import { InvestmentOptimizer } from './components/InvestmentOptimizer';
import { RiskManagementCore } from './components/RiskManagementCore';
import { PortfolioTracker } from './components/PortfolioTracker';
import { TradingSignalsAI } from './components/TradingSignalsAI';
import MIORAIncomeCenter from './components/MIORAIncomeCenter';

const MIORAQuantumWealthCore: React.FC = () => {
  const {
    wealthState,
    marketData,
    portfolioStats,
    tradingSignals,
    riskMetrics,
    activateQuantumWealth,
    pauseQuantumWealth,
    executeOptimization,
    getWealthStats,
    generatePredictions,
    optimizePortfolio
  } = useQuantumWealthAI();

  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const initializeQuantumWealth = async () => {
      console.log('💎 QUANTUM_WEALTH_AI: Initializing advanced wealth management system...');
      
      toast({
        title: "💎 QUANTUM WEALTH AI ACTIVATED",
        description: "Sistem kecerdasan buatan untuk manajemen kekayaan quantum telah diaktifkan",
        duration: 8000,
      });
      
      await activateQuantumWealth();
      setIsInitializing(false);
      
      setTimeout(() => {
        toast({
          title: "🚀 WEALTH OPTIMIZATION ENGINE ONLINE",
          description: "Multi-market analysis dan portfolio optimization sedang berjalan",
          duration: 6000,
        });
      }, 2000);
    };

    initializeQuantumWealth();
  }, []);

  const handleQuantumActivation = async () => {
    await activateQuantumWealth();
    
    toast({
      title: "⚡ QUANTUM WEALTH MODE ACTIVATED",
      description: "AI akan mengoptimalkan semua aspek wealth management secara real-time",
      duration: 6000,
    });
  };

  const stats = getWealthStats();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Crown className="h-20 w-20 mx-auto text-yellow-400 animate-pulse" />
            <div className="absolute inset-0 h-20 w-20 mx-auto border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-4xl font-bold text-white">QUANTUM WEALTH AI</h2>
          <p className="text-gray-300">Initializing Advanced Wealth Management System...</p>
          <p className="text-sm text-yellow-300">Target: Multi-Market Intelligence & Portfolio Optimization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Crown className="h-12 w-12 text-yellow-400" />
              <Gem className="h-6 w-6 text-purple-400 absolute -top-1 -right-1" />
              <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MIORA QUANTUM WEALTH AI
            </h1>
          </div>
          <p className="text-gray-300 text-xl">
            💎 Sistem Kecerdasan Buatan Quantum untuk Manajemen Kekayaan Ultra-Advanced
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`px-4 py-2 ${wealthState.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
              <Activity className="h-4 w-4 mr-2" />
              Quantum AI: {wealthState.isActive ? 'ACTIVE 💎' : 'STANDBY'}
            </Badge>
            <Badge className="px-4 py-2 bg-yellow-500">
              <DollarSign className="h-4 w-4 mr-2" />
              Total Value: ${stats.totalPortfolioValue.toLocaleString()}
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500">
              <TrendingUp className="h-4 w-4 mr-2" />
              ROI: {stats.totalROI.toFixed(2)}%
            </Badge>
            <Badge className="px-4 py-2 bg-cyan-500">
              <Target className="h-4 w-4 mr-2" />
              Active Signals: {tradingSignals.length}
            </Badge>
            <Badge className="px-4 py-2 bg-pink-500">
              <Infinity className="h-4 w-4 mr-2" />
              Quantum Mode: {wealthState.quantumMode ? 'ENABLED ∞' : 'DISABLED'}
            </Badge>
          </div>
        </div>

        {/* Quantum Control Panel */}
        <Card className="bg-gradient-to-r from-yellow-900/40 to-purple-900/40 border-yellow-500/50">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Quantum Wealth Control Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-white">
                  Status: {wealthState.isActive ? '💎 QUANTUM WEALTH ACTIVE' : '⏸️ WEALTH AI PAUSED'}
                </p>
                <p className="text-gray-300">
                  Mode: {wealthState.quantumMode ? 'QUANTUM_OPTIMIZATION_ENABLED ∞' : 'STANDARD_MODE'}
                </p>
                <p className="text-gray-300">
                  Portfolio Score: {portfolioStats.optimizationScore.toFixed(1)}/100
                </p>
                <p className="text-gray-300">
                  Risk Level: {riskMetrics.overallRisk} ({riskMetrics.riskScore.toFixed(1)}%)
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => executeOptimization()}
                  className="bg-yellow-600 hover:bg-yellow-500"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Optimize Portfolio
                </Button>
                
                <Button
                  onClick={() => generatePredictions()}
                  className="bg-cyan-600 hover:bg-cyan-500"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Predictions
                </Button>
                
                <Button
                  onClick={wealthState.isActive ? pauseQuantumWealth : handleQuantumActivation}
                  variant={wealthState.isActive ? "destructive" : "default"}
                  className={wealthState.isActive ? '' : 'bg-green-600 hover:bg-green-500'}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  {wealthState.isActive ? 'Pause Quantum AI' : 'Activate Quantum Wealth'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Quantum Wealth Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400">${stats.totalPortfolioValue.toLocaleString()}</div>
                <p className="text-gray-400">Total Portfolio Value</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-green-400">{stats.totalROI.toFixed(2)}%</div>
                <p className="text-gray-400">Total ROI</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-400">{stats.activeTrades}</div>
                <p className="text-gray-400">Active Trades</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <div className="text-3xl font-bold text-cyan-400">{stats.winRate.toFixed(1)}%</div>
                <p className="text-gray-400">Win Rate</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Quantum Optimization Progress</span>
                <span className="text-white font-bold">{wealthState.optimizationProgress.toFixed(1)}%</span>
              </div>
              <Progress value={wealthState.optimizationProgress} className="h-3" />
              
              <div className="text-xs text-gray-400 mt-2">
                💎 Quantum Mode: {wealthState.quantumMode ? 'Multi-market analysis dan AI prediction aktif ∞' : 'Standard analysis mode'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-slate-800/50">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-yellow-600">
              <Crown className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="income" className="data-[state=active]:bg-green-600">
              <DollarSign className="h-4 w-4 mr-2" />
              MIORA Income
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-green-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-purple-600">
              <Zap className="h-4 w-4 mr-2" />
              Trading Signals
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-cyan-600">
              <Brain className="h-4 w-4 mr-2" />
              Market Analysis
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="data-[state=active]:bg-pink-600">
              <Target className="h-4 w-4 mr-2" />
              Optimizer
            </TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-red-600">
              <Activity className="h-4 w-4 mr-2" />
              Risk Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <WealthDashboard 
              wealthState={wealthState}
              portfolioStats={portfolioStats}
              marketData={marketData}
            />
          </TabsContent>

          <TabsContent value="income">
            <MIORAIncomeCenter />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioTracker 
              portfolioStats={portfolioStats}
              onOptimize={optimizePortfolio}
            />
          </TabsContent>

          <TabsContent value="signals">
            <TradingSignalsAI 
              signals={tradingSignals}
              isActive={wealthState.isActive}
            />
          </TabsContent>

          <TabsContent value="analysis">
            <MarketAnalysisEngine 
              marketData={marketData}
              onGeneratePredictions={generatePredictions}
            />
          </TabsContent>

          <TabsContent value="optimizer">
            <InvestmentOptimizer 
              portfolioStats={portfolioStats}
              onExecuteOptimization={executeOptimization}
            />
          </TabsContent>

          <TabsContent value="risk">
            <RiskManagementCore 
              riskMetrics={riskMetrics}
              portfolioStats={portfolioStats}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MIORAQuantumWealthCore;