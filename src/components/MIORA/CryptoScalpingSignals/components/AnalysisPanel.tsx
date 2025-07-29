import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { CryptoSignal } from '../types';
import { getPnLColor } from '../utils';

interface AnalysisPanelProps {
  selectedSignal: CryptoSignal | null;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ selectedSignal }) => {
  if (!selectedSignal) {
    return (
      <div className="text-center text-gray-400 py-12">
        <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <p className="text-xl">Pilih sinyal untuk melihat analisis detail</p>
        <p>Klik pada salah satu sinyal di tab Live Signals</p>
      </div>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-orange-400 flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          Analisis Detail: {selectedSignal.pair}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
          {selectedSignal.analysis}
        </pre>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{selectedSignal.confidence.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{selectedSignal.accuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{selectedSignal.riskReward}</div>
            <div className="text-sm text-gray-400">Risk/Reward</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getPnLColor(selectedSignal.pnl)}`}>
              {selectedSignal.pnl > 0 ? '+' : ''}{selectedSignal.pnl.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-400">Current PnL</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};