
import React from 'react';

interface Message {
  text: string;
  sender: 'user' | 'miora';
}

interface MioraStatusInfoProps {
  currentStatus: string;
  modeConfig: any;
  messages: Message[];
  isInfinityModeActive: boolean;
}

const MioraStatusInfo: React.FC<MioraStatusInfoProps> = ({
  currentStatus,
  modeConfig,
  messages,
  isInfinityModeActive
}) => {
  return (
    <div className="mt-6 text-center">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-600/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full animate-pulse ${
            currentStatus === 'infinity' ? 'bg-purple-400' :
            currentStatus === 'belajar' ? 'bg-blue-400' :
            currentStatus === 'fokus' ? 'bg-yellow-400' :
            'bg-green-400'
          }`}></div>
          <span className="text-sm text-gray-300 font-medium">
            Mode: <span className="text-cyan-300">{modeConfig?.name || 'Assistant'}</span>
          </span>
        </div>
        
        <div className="w-1 h-4 bg-gray-600"></div>
        
        <span className="text-sm text-gray-400">
          Messages: <span className="text-white font-medium">{messages?.length || 0}</span>
        </span>
        
        <div className="w-1 h-4 bg-gray-600"></div>
        
        <span className="text-sm text-gray-400">
          Status: <span className={`font-medium ${
            currentStatus === 'infinity' ? 'text-purple-300' :
            currentStatus === 'belajar' ? 'text-blue-300' :
            currentStatus === 'fokus' ? 'text-yellow-300' :
            'text-green-300'
          }`}>
            {currentStatus === 'infinity' ? 'INFINITY ∞' : currentStatus.toUpperCase()}
          </span>
        </span>
        
        {isInfinityModeActive && (
          <>
            <div className="w-1 h-4 bg-purple-400"></div>
            <span className="text-sm text-purple-300 flex items-center gap-1">
              ♾️ Unlimited Access
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default MioraStatusInfo;
