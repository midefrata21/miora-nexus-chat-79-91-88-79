import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, BarChart3, Brain, Settings2, Fish } from 'lucide-react';
import { useScalpingSignals } from './hooks/useScalpingSignals';
import { HeaderSection } from './components/HeaderSection';
import { ControlPanel } from './components/ControlPanel';
import { ExchangeConfiguration } from './components/ExchangeConfiguration';
import { SignalCard } from './components/SignalCard';
import { MarketCard } from './components/MarketCard';
import { AnalysisPanel } from './components/AnalysisPanel';
import { WhaleTracker } from './components/WhaleTracker';

export const CryptoScalpingSignals: React.FC = () => {
  const {
    isActive,
    signals,
    marketData,
    selectedSignal,
    setSelectedSignal,
    startScalpingEngine,
    stopScalpingEngine
  } = useScalpingSignals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <HeaderSection isActive={isActive} signalsCount={signals.length} />
        
        <ControlPanel 
          isActive={isActive} 
          onStart={startScalpingEngine} 
          onStop={stopScalpingEngine} 
        />

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger value="config" className="data-[state=active]:bg-cyan-600">
              <Settings2 className="h-4 w-4 mr-2" />
              Konfigurasi
            </TabsTrigger>
            <TabsTrigger value="signals" className="data-[state=active]:bg-orange-600">
              <Zap className="h-4 w-4 mr-2" />
              Live Signals
            </TabsTrigger>
            <TabsTrigger value="market" className="data-[state=active]:bg-green-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Market Overview
            </TabsTrigger>
            <TabsTrigger value="whale" className="data-[state=active]:bg-blue-600">
              <Fish className="h-4 w-4 mr-2" />
              Pelacak Bandar
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
              <Brain className="h-4 w-4 mr-2" />
              Technical Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6 mt-6">
            <ExchangeConfiguration onExchangeChange={(exchanges) => console.log('Selected exchanges:', exchanges)} />
          </TabsContent>

          <TabsContent value="signals" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {signals.map((signal) => (
                <SignalCard
                  key={signal.id}
                  signal={signal}
                  onClick={() => setSelectedSignal(signal)}
                />
              ))}
            </div>

            {signals.length === 0 && (
              <div className="text-center text-gray-400 py-12">
                <Zap className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Tidak ada sinyal aktif</p>
                <p>Aktifkan scalping engine untuk mulai menerima sinyal</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="market" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.map((data) => (
                <MarketCard key={data.symbol} data={data} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="whale" className="space-y-6 mt-6">
            <WhaleTracker />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            <AnalysisPanel selectedSignal={selectedSignal} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoScalpingSignals;