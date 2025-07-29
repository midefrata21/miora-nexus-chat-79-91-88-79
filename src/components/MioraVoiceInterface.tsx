
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMioraVoiceEngine } from '@/hooks/useMioraVoiceEngine';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain,
  CheckCircle,
  Settings,
  Zap
} from 'lucide-react';

interface MioraVoiceInterfaceProps {
  onVoiceInput?: (transcript: string) => void;
  onStatusChange?: (status: string) => void;
}

const MioraVoiceInterface: React.FC<MioraVoiceInterfaceProps> = ({
  onVoiceInput,
  onStatusChange
}) => {
  const {
    isInitialized,
    isListening,
    isSpeaking,
    isProcessing,
    voiceEnabled,
    availableVoices,
    selectedVoice,
    voiceSettings,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    toggleVoice,
    updateVoiceSettings,
    selectVoice,
    getEngineStatus,
    isReady,
    hasVoiceSupport
  } = useMioraVoiceEngine();

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      onStatusChange?.('Voice input stopped');
    } else {
      startListening((transcript) => {
        onVoiceInput?.(transcript);
        onStatusChange?.('Voice input received');
      });
      onStatusChange?.('Voice input started');
    }
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      toggleVoice();
    }
  };

  const testVoice = () => {
    const testMessage = "Halo, saya MIORA. Voice engine mandiri telah aktif dan siap beroperasi tanpa ketergantungan API eksternal.";
    speak(testMessage);
  };

  const engineStatus = getEngineStatus();

  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-purple-800/50 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-300 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          MIORA Voice Engine - Standalone System
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isReady ? "default" : "secondary"} className="bg-green-600">
            {isReady ? "Engine Ready" : "Initializing"}
          </Badge>
          <Badge variant="outline" className="border-cyan-400 text-cyan-300">
            {availableVoices.length} Voices Available
          </Badge>
          {hasVoiceSupport && (
            <Badge variant="outline" className="border-green-400 text-green-300">
              <CheckCircle className="w-3 h-3 mr-1" />
              Full Support
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Voice Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleVoiceToggle}
            disabled={!isReady || isProcessing}
            size="lg"
            className={`rounded-full w-16 h-16 ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            } border-2 border-white/20 transition-all duration-300 backdrop-blur-sm`}
          >
            {isListening ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </Button>

          <Button
            onClick={handleSpeakToggle}
            disabled={!isReady}
            size="lg"
            variant="outline"
            className={`rounded-full w-16 h-16 ${
              voiceEnabled && !isSpeaking
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                : 'bg-gray-800/50 border-gray-500/50 shadow-[0_0_15px_rgba(107,114,128,0.3)]'
            } backdrop-blur-sm transition-all duration-300`}
          >
            {voiceEnabled && !isSpeaking ? (
              <Volume2 className="w-6 h-6 text-green-400" />
            ) : (
              <VolumeX className="w-6 h-6 text-gray-400" />
            )}
          </Button>

          <Button
            onClick={testVoice}
            disabled={!isReady}
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 hover:bg-purple-500/30 backdrop-blur-sm transition-all duration-300"
          >
            <Zap className="w-6 h-6 text-purple-400" />
          </Button>
        </div>

        {/* Status Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
              engineStatus.isReady ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <p className="text-xs text-gray-300">Engine Status</p>
            <p className="text-sm font-semibold text-white">
              {engineStatus.isReady ? 'Ready' : 'Loading'}
            </p>
          </div>
          
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
              isListening ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <p className="text-xs text-gray-300">Voice Input</p>
            <p className="text-sm font-semibold text-white">
              {isListening ? 'Listening' : 'Standby'}
            </p>
          </div>
          
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
              isSpeaking ? 'bg-orange-400 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <p className="text-xs text-gray-300">Voice Output</p>
            <p className="text-sm font-semibold text-white">
              {isSpeaking ? 'Speaking' : 'Silent'}
            </p>
          </div>
          
          <div className="p-3 bg-gray-700/30 rounded-lg text-center">
            <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
              isProcessing ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'
            }`}></div>
            <p className="text-xs text-gray-300">Processing</p>
            <p className="text-sm font-semibold text-white">
              {isProcessing ? 'Active' : 'Idle'}
            </p>
          </div>
        </div>

        {/* Engine Info */}
        <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 border border-cyan-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Engine Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-300">Selected Voice:</p>
              <p className="text-white font-medium">
                {selectedVoice?.name || 'Default System Voice'}
              </p>
            </div>
            <div>
              <p className="text-gray-300">Language:</p>
              <p className="text-white font-medium">{voiceSettings.language}</p>
            </div>
            <div>
              <p className="text-gray-300">Speech Rate:</p>
              <p className="text-white font-medium">{voiceSettings.rate}x</p>
            </div>
            <div>
              <p className="text-gray-300">Available Voices:</p>
              <p className="text-white font-medium">{availableVoices.length}</p>
            </div>
          </div>
        </div>

        {/* Standalone Benefits */}
        <div className="p-4 bg-gradient-to-r from-green-600/10 to-cyan-600/10 border border-green-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Standalone Engine Benefits
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>• Tidak bergantung pada API eksternal</li>
            <li>• Latensi rendah untuk respons real-time</li>
            <li>• Privacy terjaga - semua processing lokal</li>
            <li>• Tidak ada biaya API tambahan</li>
            <li>• Reliability tinggi tanpa network dependency</li>
            <li>• Mendukung berbagai bahasa dan voice</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MioraVoiceInterface;
