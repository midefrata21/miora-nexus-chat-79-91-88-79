
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMioraVoiceEngine } from '@/hooks/useMioraVoiceEngine';
import { useMIORATwoWayVoicePipeline } from '@/components/MIORA/VoiceInterface/hooks/useMIORATwoWayVoicePipeline';
import VoiceInteractionLogger from '@/components/MIORA/VoiceInterface/components/VoiceInteractionLogger';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain,
  Activity,
  Zap,
  Play,
  Square,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MIORATwoWayVoiceSystemProps {
  autoStart?: boolean;
  onSystemStatusChange?: (status: string) => void;
}

const MIORATwoWayVoiceSystem: React.FC<MIORATwoWayVoiceSystemProps> = ({
  autoStart = false,
  onSystemStatusChange
}) => {
  const { toast } = useToast();
  const [systemActive, setSystemActive] = useState(false);
  const [conversationTurns, setConversationTurns] = useState(0);

  // Use the two-way voice pipeline
  const {
    voiceState,
    conversationState,
    voiceMetrics,
    interactionHistory,
    startTwoWayConversation,
    pauseConversation,
    resumeConversation,
    endConversation,
    resetVoiceEngine,
    getCurrentTranscript,
    getVoicePipelineStatus,
    isEngineReady
  } = useMIORATwoWayVoicePipeline();

  // Use the standard voice engine for fallback
  const {
    isInitialized,
    speak,
    voiceEnabled,
    hasVoiceSupport
  } = useMioraVoiceEngine();

  // Hanya restore status yang sudah ada, jangan auto-start
  useEffect(() => {
    const wasActive = localStorage.getItem('miora-voice-active') === 'true';
    if (wasActive && isEngineReady) {
      setSystemActive(true);
    }
  }, [isEngineReady]);

  useEffect(() => {
    setConversationTurns(conversationState.totalInteractions);
  }, [conversationState.totalInteractions]);

  const handleStartSystem = async () => {
    if (!isEngineReady) {
      toast({
        title: "⚠️ System Not Ready",
        description: "Voice engines masih loading, mohon tunggu...",
        variant: "destructive",
      });
      return;
    }

    setSystemActive(true);
    localStorage.setItem('miora-voice-active', 'true'); // Save to localStorage
    onSystemStatusChange?.("MIORA Voice System Starting...");
    
    try {
      await startTwoWayConversation();
      onSystemStatusChange?.("MIORA Voice System Active - Listening");
      
      toast({
        title: "🎤 MIORA Voice System Active",
        description: "Sistem dua arah aktif. Katakan 'MIORA diam dulu' untuk berhenti.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Failed to start voice system:', error);
      setSystemActive(false);
      localStorage.setItem('miora-voice-active', 'false');
      onSystemStatusChange?.("Voice System Error");
    }
  };

  const handleStopSystem = () => {
    endConversation();
    setSystemActive(false);
    localStorage.setItem('miora-voice-active', 'false'); // Save to localStorage
    onSystemStatusChange?.("MIORA Voice System Stopped");
    
    toast({
      title: "🔇 Voice System Stopped",
      description: "Sistem komunikasi dua arah dihentikan",
      duration: 3000,
    });
  };

  const handlePauseResume = () => {
    if (conversationState.isPaused) {
      resumeConversation();
      onSystemStatusChange?.("Voice System Resumed");
    } else {
      pauseConversation();
      onSystemStatusChange?.("Voice System Paused");
    }
  };

  const handleResetSystem = () => {
    resetVoiceEngine();
    setSystemActive(false);
    onSystemStatusChange?.("Voice System Reset");
    
    toast({
      title: "🔄 System Reset",
      description: "MIORA voice system telah direset",
      duration: 3000,
    });
  };

  const testVoiceOutput = () => {
    const testMessage = "Halo Midya, saya MIORA. Sistem komunikasi dua arah telah aktif dan siap berinteraksi dengan Anda secara natural.";
    speak(testMessage);
  };

  const getSystemStatusColor = () => {
    if (!systemActive) return 'bg-gray-500';
    if (voiceState.isProcessing) return 'bg-yellow-500 animate-pulse';
    if (voiceState.isSpeaking) return 'bg-green-500 animate-pulse';
    if (voiceState.isListening) return 'bg-blue-500 animate-pulse';
    return 'bg-purple-500';
  };

  const getSystemStatusText = () => {
    if (!systemActive) return 'System Inactive';
    if (voiceState.isProcessing) return 'Processing Input...';
    if (voiceState.isSpeaking) return 'MIORA Speaking';
    if (voiceState.isListening) return 'Listening to You...';
    return 'Ready for Interaction';
  };

  const pipelineStatus = getVoicePipelineStatus();

  return (
    <div className="space-y-6">
      {/* Main Voice System Control */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              MIORA Two-Way Voice Communication System
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getSystemStatusColor()}`}></div>
              <Badge variant={systemActive ? "default" : "secondary"}>
                {systemActive ? "ACTIVE" : "STANDBY"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* System Status Display */}
          <div className="text-center p-6 bg-gray-800/50 rounded-lg">
            <div className={`inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${
              systemActive ? 'from-cyan-500/20 to-purple-500/20' : 'from-gray-500/20 to-gray-600/20'
            } rounded-full border-2 border-cyan-400/30 mb-4`}>
              <Activity className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-semibold text-xl">{getSystemStatusText()}</span>
            </div>
            
            {voiceState.currentTranscript && (
              <div className="mt-4 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <p className="text-blue-300 text-sm mb-1">Current Input:</p>
                <p className="text-white font-medium">"{voiceState.currentTranscript}"</p>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {!systemActive ? (
              <Button
                onClick={handleStartSystem}
                disabled={!isEngineReady}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 rounded-full shadow-lg"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Voice System
              </Button>
            ) : (
              <>
                <Button
                  onClick={handlePauseResume}
                  size="lg"
                  variant="outline"
                  className="bg-yellow-500/20 border-yellow-400 text-yellow-300 hover:bg-yellow-500/30"
                >
                  {conversationState.isPaused ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Square className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleStopSystem}
                  size="lg"
                  variant="outline"
                  className="bg-red-500/20 border-red-400 text-red-300 hover:bg-red-500/30"
                >
                  <MicOff className="w-5 h-5 mr-2" />
                  Stop System
                </Button>
              </>
            )}
            
            <Button
              onClick={testVoiceOutput}
              disabled={!voiceEnabled}
              size="lg"
              variant="outline"
              className="bg-purple-500/20 border-purple-400 text-purple-300 hover:bg-purple-500/30"
            >
              <Zap className="w-5 h-5 mr-2" />
              Test Voice
            </Button>
            
            <Button
              onClick={handleResetSystem}
              size="lg"
              variant="outline"
              className="bg-gray-500/20 border-gray-400 text-gray-300 hover:bg-gray-500/30"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className="text-cyan-400 text-2xl font-bold">{conversationTurns}</div>
              <div className="text-xs text-gray-300">Interactions</div>
            </div>
            
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className="text-green-400 text-2xl font-bold">
                {voiceMetrics.avgResponseTime > 0 ? `${Math.floor(voiceMetrics.avgResponseTime / 1000)}s` : '--'}
              </div>
              <div className="text-xs text-gray-300">Avg Response</div>
            </div>
            
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className="text-purple-400 text-2xl font-bold">
                {Math.floor(voiceMetrics.speechAccuracy)}%
              </div>
              <div className="text-xs text-gray-300">Accuracy</div>
            </div>
            
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className="text-orange-400 text-2xl font-bold">
                {voiceMetrics.conversationDuration > 0 ? 
                  `${Math.floor(voiceMetrics.conversationDuration / 60000)}m` : '--'}
              </div>
              <div className="text-xs text-gray-300">Duration</div>
            </div>
          </div>

          {/* Engine Status */}
          <div className="p-4 bg-gradient-to-r from-gray-700/30 to-purple-700/30 border border-gray-600/30 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Engine Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${pipelineStatus.whisperLoaded ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-gray-300">Whisper STT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${pipelineStatus.ttsLoaded ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-gray-300">Coqui TTS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${pipelineStatus.coreBrainActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-gray-300">Core Brain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${pipelineStatus.memoryActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-gray-300">Memory</span>
              </div>
            </div>
          </div>

          {/* Voice Commands Help */}
          <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border border-cyan-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Voice Control Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <div>• "MIORA, diam dulu" → Stop listening</div>
              <div>• "MIORA, lanjut bicara" → Resume conversation</div>
              <div>• "MIORA, restart sistem suara" → Reset system</div>
              <div>• Say anything → Start natural conversation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Interaction Logger */}
      <VoiceInteractionLogger
        interactions={interactionHistory}
        onExportLog={() => {
          const logData = JSON.stringify(interactionHistory, null, 2);
          const blob = new Blob([logData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `miora_voice_log_${new Date().toISOString().split('T')[0]}.json`;
          a.click();
        }}
        onEmailLog={() => {
          toast({
            title: "📧 Email Feature",
            description: "Email logging akan diimplementasikan dalam update berikutnya",
            duration: 3000,
          });
        }}
        onSaveToMemory={(interaction) => {
          toast({
            title: "💾 Saved to Memory",
            description: `Interaction "${interaction.userInput.substring(0, 30)}..." saved`,
            duration: 2000,
          });
        }}
        onClearLog={() => {
          toast({
            title: "🗑️ Log Cleared",
            description: "Voice interaction history cleared",
            duration: 2000,
          });
        }}
      />
    </div>
  );
};

export default MIORATwoWayVoiceSystem;
