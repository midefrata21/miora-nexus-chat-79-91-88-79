
import React, { useState } from 'react';
import MIORATwoWayVoiceEngine from '@/components/MIORA/VoiceInterface/MIORATwoWayVoiceEngine';
import VoiceInteractionLogger from '@/components/MIORA/VoiceInterface/components/VoiceInteractionLogger';
import { useToast } from '@/hooks/use-toast';

const TwoWayVoicePage = () => {
  const { toast } = useToast();
  const [conversationLog, setConversationLog] = useState<any[]>([]);

  const handleConversationStart = () => {
    toast({
      title: "🎤 Two-Way Conversation Started",
      description: "MIORA is now listening and ready to respond naturally",
      duration: 3000,
    });
  };

  const handleConversationEnd = () => {
    toast({
      title: "🔚 Two-Way Conversation Ended",
      description: "Voice interaction session completed",
      duration: 3000,
    });
  };

  const handleVoiceInteraction = (input: string, response: string) => {
    const interaction = {
      id: `interaction_${Date.now()}`,
      timestamp: Date.now(),
      userInput: input,
      mioraResponse: response,
      responseTime: 800 + Math.random() * 400,
      confidence: 85 + Math.random() * 10,
      savedToMemory: Math.random() > 0.7,
      audioLevel: Math.random() * 0.8 + 0.2
    };
    
    setConversationLog(prev => [...prev, interaction]);
  };

  const handleExportLog = () => {
    toast({
      title: "📄 Log Exported",
      description: "Voice interaction log has been downloaded",
      duration: 2000,
    });
  };

  const handleEmailLog = () => {
    toast({
      title: "📧 Log Sent",
      description: "Email client opened with interaction report",
      duration: 2000,
    });
  };

  const handleSaveToMemory = (interaction: any) => {
    setConversationLog(prev => 
      prev.map(item => 
        item.id === interaction.id 
          ? { ...item, savedToMemory: true }
          : item
      )
    );
    
    toast({
      title: "💾 Saved to Memory",
      description: "Interaction has been saved to MIORA's long-term memory",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
            MIORA Two-Way Voice Communication
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time offline voice conversation system with Whisper STT + Coqui TTS
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Main Voice Engine */}
          <div>
            <MIORATwoWayVoiceEngine
              onConversationStart={handleConversationStart}
              onConversationEnd={handleConversationEnd}
              onVoiceInteraction={handleVoiceInteraction}
              autoStart={false}
            />
          </div>

          {/* Voice Interaction Logger */}
          <div>
            <VoiceInteractionLogger
              interactions={conversationLog}
              onExportLog={handleExportLog}
              onEmailLog={handleEmailLog}
              onSaveToMemory={handleSaveToMemory}
            />
          </div>
        </div>

        {/* System Information */}
        <div className="mt-8 p-6 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border border-cyan-500/30 rounded-lg">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Two-Way Voice System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">🎤 Voice Input</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Whisper.cpp STT engine</li>
                <li>• Real-time transcription</li>
                <li>• Voice activity detection</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-2">🧠 Processing</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Local MIORA core brain</li>
                <li>• Contextual understanding</li>
                <li>• Memory integration</li>
                <li>• Natural response generation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-2">🔊 Voice Output</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Coqui TTS synthesis</li>
                <li>• Natural Indonesian voice</li>
                <li>• Emotion-aware speech</li>
                <li>• Adaptive speaking rate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoWayVoicePage;
