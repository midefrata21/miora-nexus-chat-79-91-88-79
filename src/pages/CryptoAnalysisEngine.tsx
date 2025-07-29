import React from 'react';
import CryptoAnalyzer from '@/components/MIORA/CryptoAnalyzer/CryptoAnalyzer';

const CryptoAnalysisEnginePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🔍 MIORA Crypto Analysis Engine
          </h1>
          <p className="text-lg text-gray-300">
            Sistem analisa cryptocurrency canggih dengan multi-timeframe, support/resistance detection, dan trading signals akurat
          </p>
        </div>
        
        <CryptoAnalyzer />
      </div>
    </div>
  );
};

export default CryptoAnalysisEnginePage;