
import React from 'react';
import { Brain, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MioraHeaderProps {
  isLearning: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  useGroqAPI: boolean;
  onToggleAPI: () => void;
  onClearMessages: () => void;
  adaptiveContext: {
    adaptationReason?: string;
  };
}

const MioraHeader: React.FC<MioraHeaderProps> = ({
  isLearning,
  isListening,
  isSpeaking,
  useGroqAPI,
  onToggleAPI,
  onClearMessages,
  adaptiveContext
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
        MIORA
      </h1>
      <p className="text-cyan-300 text-xl mb-2">Molecular Intelligence & Orbital Response Assistant</p>
      <p className="text-gray-400">
        {isLearning ? "🧠 Processing with Groq AI..." : 
         isListening ? "🎤 Infinity Brain Active - Mendengarkan..." : 
         isSpeaking ? "💬 Adaptive Response - Berbicara..." : 
         "🌟 Groq AI + Adaptive Intelligence Ready"}
      </p>
      
      {/* API Status and Controls */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${useGroqAPI ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-300">Groq API</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleAPI}
          className="text-xs text-purple-300 hover:text-purple-200"
        >
          Toggle API
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearMessages}
          className="text-xs text-red-300 hover:text-red-200"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear Memory
        </Button>
      </div>
      
      {/* Adaptive Context Display */}
      {adaptiveContext.adaptationReason && (
        <div className="mt-3 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30">
          <p className="text-sm text-green-300">
            <Brain className="w-4 h-4 inline mr-2" />
            {adaptiveContext.adaptationReason}
          </p>
        </div>
      )}
    </div>
  );
};

export default MioraHeader;
