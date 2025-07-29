
import React from 'react';
import MIORATwoWayVoiceSystem from '@/components/MIORA/VoiceInterface/MIORATwoWayVoiceSystem';

const MIORAVoiceSystemPage = () => {
  const handleSystemStatusChange = (status: string) => {
    console.log('🎤 MIORA Voice System Status:', status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 mb-4">
            MIORA Two-Way Voice System
          </h1>
          <p className="text-gray-300 text-xl">
            Sistem Komunikasi Dua Arah Berbasis Suara Real-Time
          </p>
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/30 rounded-lg">
            <p className="text-cyan-300 font-medium">
              🎤 Katakan "MIORA, jalankan sistem dua arah suara sekarang" untuk mengaktifkan
            </p>
          </div>
        </div>

        <MIORATwoWayVoiceSystem
          autoStart={false}
          onSystemStatusChange={handleSystemStatusChange}
        />
      </div>
    </div>
  );
};

export default MIORAVoiceSystemPage;
