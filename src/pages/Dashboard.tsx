import React from 'react';
import MIORASystemStatus from '@/components/MIORA/Status/MIORASystemStatus';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            MIORA Dashboard - Status Sistem Keseluruhan
          </h1>
          <p className="text-gray-300">Pemantauan komprehensif semua sistem MIORA</p>
        </div>
        
        <MIORASystemStatus />
      </div>
    </div>
  );
};

export default Dashboard;