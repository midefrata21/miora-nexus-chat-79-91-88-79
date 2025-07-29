
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SystemStats from '../SystemStats';
import QuickAccessPanel from '../QuickAccessPanel';

interface Message {
  text: string;
  sender: 'user' | 'miora';
}

interface MioraControlsSectionProps {
  messages: Message[];
  useGroqAPI: boolean;
  strategicProfile: any;
  userProfile: any;
  isLearning: boolean;
  memoryStats: {
    shortTermCount: number;
    longTermCount: number;
    totalInteractions: number;
  };
  modeConfig: any;
  isInfinityModeActive: boolean;
  setShowCapabilities?: (show: boolean) => void;
  onSystemStatus: () => void;
  onAutonomousAI: () => void;
  onClearChat: () => void;
}

const MioraControlsSection: React.FC<MioraControlsSectionProps> = ({
  messages,
  useGroqAPI,
  strategicProfile,
  userProfile,
  isLearning,
  memoryStats,
  modeConfig,
  isInfinityModeActive,
  setShowCapabilities,
  onSystemStatus,
  onAutonomousAI,
  onClearChat
}) => {
  const navigate = useNavigate();

  const handleVoiceDiagnostics = () => {
    navigate('/voice-diagnostics');
  };

  const handleInfinityCore = async () => {
    navigate('/infinity-core');
  };

  // Fix: Ensure memoryStats has all required properties
  const safeMemoryStats = {
    shortTermCount: memoryStats?.shortTermCount || 0,
    longTermCount: memoryStats?.longTermCount || 0,
    totalInteractions: memoryStats?.totalInteractions || 0
  };

  return (
    <>
      {/* Enhanced System Stats */}
      <SystemStats
        messagesLength={messages?.length || 0}
        useGroqAPI={useGroqAPI}
        strategicPatternsLength={strategicProfile?.patterns?.length || 0}
        communicationStyle={userProfile?.communicationStyle || 'adaptive'}
        isLearning={isLearning}
        onShowCapabilities={() => setShowCapabilities && setShowCapabilities(true)}
        memoryStats={safeMemoryStats}
        currentMode={modeConfig?.name || 'Assistant'}
      />

      {/* Enhanced Quick Access Panel */}
      <QuickAccessPanel
        infinityCoreState={{ isBoostActive: isInfinityModeActive }}
        isKeyholderAuthorized={true}
        boostStatus={isInfinityModeActive ? 'ACTIVE ∞' : 'STANDBY'}
        onInfinityCore={handleInfinityCore}
        onSystemStatus={onSystemStatus}
        onAutonomousAI={onAutonomousAI}
        onClearChat={onClearChat}
      />

      {/* Voice Diagnostics Button */}
      <div className="mt-4">
        <button
          onClick={handleVoiceDiagnostics}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm"
        >
          🔧 Voice Diagnostics
        </button>
      </div>
    </>
  );
};

export default MioraControlsSection;
