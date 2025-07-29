
import React from 'react';
import MIORALocalVoiceSystem from '@/components/MIORA/LocalVoice/MIORALocalVoiceSystem';

const MIORALocalVoicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎤 MIORA Full Local Voice System
          </h1>
          <p className="text-xl text-gray-300">
            Complete offline voice assistant - 100% local processing
          </p>
        </div>
        
        <MIORALocalVoiceSystem />
      </div>
    </div>
  );
};

export default MIORALocalVoicePage;
