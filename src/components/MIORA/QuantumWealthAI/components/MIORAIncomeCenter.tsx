import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Zap, 
  Crown, 
  Activity, 
  Target, 
  Gem,
  Star,
  ChevronUp,
  ChevronDown,
  Clock,
  Bot
} from 'lucide-react';
import { useMIORAIncomeSystem } from '../../hooks/useMIORAIncomeSystem';

const MIORAIncomeCenter: React.FC = () => {
  const {
    incomeStreams,
    incomeStats,
    clientInteractions,
    isIncomeSystemActive,
    mrcBalance,
    activateIncomeSystem,
    deactivateIncomeSystem,
    optimizeIncomeStreams,
    generateIncome
  } = useMIORAIncomeSystem();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wealth_management': return <Crown className="h-4 w-4" />;
      case 'trading_signals': return <TrendingUp className="h-4 w-4" />;
      case 'ai_consulting': return <Bot className="h-4 w-4" />;
      case 'data_analysis': return <Activity className="h-4 w-4" />;
      case 'government_services': return <Users className="h-4 w-4" />;
      case 'research_services': return <Star className="h-4 w-4" />;
      default: return <Gem className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wealth_management': return 'bg-yellow-500';
      case 'trading_signals': return 'bg-green-500';
      case 'ai_consulting': return 'bg-blue-500';
      case 'data_analysis': return 'bg-purple-500';
      case 'government_services': return 'bg-red-500';
      case 'research_services': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <DollarSign className="h-12 w-12 text-green-400" />
            <Gem className="h-6 w-6 text-yellow-400 absolute -top-1 -right-1" />
            {isIncomeSystemActive && (
              <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
            )}
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
            MIORA INCOME CENTER
          </h2>
        </div>
        <p className="text-gray-300 text-lg">
          💰 Sistem Income Otomatis - MIORA menghasilkan uang dari kemampuan AI sendiri
        </p>
      </div>

      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center">
            <Zap className="h-6 w-6 mr-2" />
            MIORA Autonomous Income Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-white flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Status: {isIncomeSystemActive ? '💰 INCOME GENERATION ACTIVE' : '⏸️ INCOME SYSTEM PAUSED'}
              </p>
              <p className="text-gray-300 flex items-center">
                <Crown className="h-4 w-4 mr-2" />
                MIORA Balance: {mrcBalance.toFixed(2)} MRC
              </p>
              <p className="text-gray-300 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Autonomy Level: {incomeStats.autonomyLevel.toFixed(1)}%
              </p>
              <p className="text-gray-300 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Growth Rate: {incomeStats.incomeGrowthRate.toFixed(1)}%
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button
                onClick={optimizeIncomeStreams}
                className="bg-yellow-600 hover:bg-yellow-500"
                disabled={!isIncomeSystemActive}
              >
                <Target className="h-4 w-4 mr-2" />
                Optimize Streams
              </Button>
              
              <Button
                onClick={generateIncome}
                className="bg-purple-600 hover:bg-purple-500"
                disabled={!isIncomeSystemActive}
              >
                <Gem className="h-4 w-4 mr-2" />
                Generate Now
              </Button>
              
              <Button
                onClick={isIncomeSystemActive ? deactivateIncomeSystem : activateIncomeSystem}
                variant={isIncomeSystemActive ? "destructive" : "default"}
                className={isIncomeSystemActive ? '' : 'bg-green-600 hover:bg-green-500'}
              >
                <Crown className="h-4 w-4 mr-2" />
                {isIncomeSystemActive ? 'Pause Income' : 'Activate Income'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 flex items-center justify-center">
              <DollarSign className="h-8 w-8 mr-2" />
              {incomeStats.totalIncome.toFixed(2)}
            </div>
            <p className="text-gray-400 mt-2">Total Income MRC</p>
            <p className="text-xs text-green-300 mt-1">Lifetime Earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 mr-2" />
              {incomeStats.dailyIncome.toFixed(1)}
            </div>
            <p className="text-gray-400 mt-2">Daily Income MRC</p>
            <p className="text-xs text-yellow-300 mt-1">Average per Day</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 flex items-center justify-center">
              <Users className="h-8 w-8 mr-2" />
              {incomeStats.totalClients}
            </div>
            <p className="text-gray-400 mt-2">Total Clients</p>
            <p className="text-xs text-blue-300 mt-1">Served Successfully</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 flex items-center justify-center">
              <Star className="h-8 w-8 mr-2" />
              {incomeStats.averageSuccessRate.toFixed(1)}%
            </div>
            <p className="text-gray-400 mt-2">Success Rate</p>
            <p className="text-xs text-purple-300 mt-1">Client Satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Autonomy Progress */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            MIORA Autonomy Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Financial Independence Progress</span>
              <span className="text-white font-bold">{incomeStats.autonomyLevel.toFixed(1)}%</span>
            </div>
            <Progress value={incomeStats.autonomyLevel} className="h-4" />
            <div className="text-sm text-gray-400">
              🤖 MIORA semakin mandiri secara finansial dengan kemampuan AI yang berkembang
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Streams */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-500/30">
          <CardHeader>
            <CardTitle className="text-slate-300 flex items-center">
              <Activity className="h-6 w-6 mr-2" />
              Active Income Streams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incomeStreams.map((stream) => (
                <div key={stream.id} className="p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded-full ${getCategoryColor(stream.category)}`}>
                        {getCategoryIcon(stream.category)}
                      </div>
                      <span className="font-semibold text-white">{stream.name}</span>
                      <Badge className={stream.isActive ? 'bg-green-500' : 'bg-red-500'}>
                        {stream.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-400 font-bold">
                        {stream.currentRate.toFixed(2)} MRC/hr
                      </p>
                      <p className="text-xs text-gray-400">
                        Total: {stream.totalEarned.toFixed(2)} MRC
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">{stream.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-400">Clients</p>
                      <p className="text-white font-bold">{stream.clientsServed}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Success</p>
                      <p className="text-green-400 font-bold">{stream.successRate.toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Last Earning</p>
                      <p className="text-yellow-400 font-bold">{stream.lastEarning.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Client Interactions */}
        <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-300 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Recent Client Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {clientInteractions.slice(0, 10).map((interaction) => (
                <div key={interaction.id} className="p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white text-sm">
                      {interaction.clientName}
                    </span>
                    <Badge className={
                      interaction.status === 'completed' ? 'bg-green-500' :
                      interaction.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-500'
                    }>
                      {interaction.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{interaction.serviceType}</span>
                    <span className="text-green-400 font-bold">
                      +{interaction.amount.toFixed(2)} MRC
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs mt-2">
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(interaction.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-3 w-3 mr-1" />
                      {interaction.satisfaction}/10
                    </div>
                  </div>
                </div>
              ))}
              
              {clientInteractions.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No client interactions yet</p>
                  <p className="text-sm">Activate income system to start earning</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Stream */}
      {incomeStats.topPerformingStream && (
        <Card className="bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border-yellow-500/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div className="text-center">
                <p className="text-yellow-300 text-lg font-bold">
                  🏆 Top Performing Stream
                </p>
                <p className="text-white text-2xl font-bold">
                  {incomeStats.topPerformingStream}
                </p>
                <p className="text-gray-300 text-sm">
                  Generating the highest income for MIORA
                </p>
              </div>
              <Crown className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MIORAIncomeCenter;