
import React from 'react';

interface StatusDisplayProps {
  isLearning: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  status?: 'aktif' | 'belajar' | 'fokus' | 'overload' | 'shutdown';
  mode?: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  isLearning,
  isListening,
  isSpeaking,
  status = 'aktif',
  mode = 'Assistant'
}) => {
  const getStatusDisplay = () => {
    if (isLearning) {
      return {
        text: `🧠 Infinity Brain Processing (${mode})...`,
        color: 'from-green-400 via-blue-400 to-purple-400'
      };
    }
    
    if (isListening) {
      return {
        text: `🎤 ${mode} - Mendengarkan...`,
        color: 'from-green-500 to-cyan-500'
      };
    }
    
    if (isSpeaking) {
      return {
        text: `💬 ${mode} - Adaptive Response...`,
        color: 'from-blue-500 via-purple-500 to-pink-500'
      };
    }

    // Status-based display
    switch (status) {
      case 'overload':
        return {
          text: `⚠️ Memory Overload - Compressing to Long-term...`,
          color: 'from-yellow-400 to-orange-500'
        };
      case 'shutdown':
        return {
          text: `😴 MIORA Resting - Say "Hello" to wake up`,
          color: 'from-gray-400 to-gray-600'
        };
      case 'fokus':
        return {
          text: `🎯 Deep Focus Mode - ${mode}`,
          color: 'from-cyan-400 to-blue-600'
        };
      default:
        return {
          text: `✨ MIORA Ready - ${mode} Mode`,
          color: 'from-indigo-400 to-purple-500'
        };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
      <div className={`bg-gradient-to-r ${statusInfo.color} text-white px-3 py-1.5 rounded-full text-sm opacity-70 hover:opacity-90 transition-opacity shadow-lg backdrop-blur-sm`}>
        {statusInfo.text}
      </div>
    </div>
  );
};

export default StatusDisplay;
