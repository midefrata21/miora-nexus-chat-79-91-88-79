
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMIORAVoiceEngine } from './hooks/useMIORAVoiceEngine';
import { WhisperEngine } from './engines/WhisperEngine';
import { CoquiTTSEngine } from './engines/CoquiTTSEngine';
import { VoicePipelineManager } from './managers/VoicePipelineManager';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain,
  Zap,
  Settings,
  Activity,
  Headphones
} from 'lucide-react';

interface MIORAVoiceInterfaceProps {
  onVoiceInput?: (transcript: string, confidence: number) => void;
  onVoiceOutput?: (text: string) => void;
  systemStatus?: 'initializing' | 'ready' | 'processing' | 'error';
}

const MIORAVoiceInterface: React.FC<MIORAVoiceInterfaceProps> = ({
  onVoiceInput,
  onVoiceOutput,
  systemStatus = 'initializing'
}) => {
  const {
    voiceState,
    whisperEngine,
    coquiEngine,
    pipelineManager,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    initializeEngines,
    resetEngines,
    getEngineMetrics,
    isReady
  } = useMIORAVoiceEngine();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [voiceMetrics, setVoiceMetrics] = useState({
    latency: 0,
    accuracy: 0,
    processingTime: 0,
    queueLength: 0
  });

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      const metrics = getEngineMetrics();
      setVoiceMetrics(metrics);
    }, 1000);

    return () => clearInterval(metricsInterval);
  }, [getEngineMetrics]);

  const handleVoiceToggle = async () => {
    if (voiceState.isListening) {
      await stopListening();
    } else {
      await startListening((transcript, confidence) => {
        onVoiceInput?.(transcript, confidence);
      });
    }
  };

  const handleSpeakToggle = () => {
    if (voiceState.isSpeaking) {
      stopSpeaking();
    } else {
      const testMessage = "MIORA Voice Interface aktif dengan Whisper dan Coqui TTS";
      speakText(testMessage);
      onVoiceOutput?.(testMessage);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'initializing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Voice Interface */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              MIORA Voice Interface
              <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                Whisper + Coqui TTS
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)} animate-pulse`}></div>
              <Badge variant={isReady ? "default" : "secondary"}>
                {isReady ? "Ready" : "Initializing"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Voice Controls */}
          <div className="flex justify-center gap-6">
            <Button
              onClick={handleVoiceToggle}
              disabled={!isReady}
              size="lg"
              className={`rounded-full w-20 h-20 ${
                voiceState.isListening 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.6)]' 
                  : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-[0_0_30px_rgba(147,51,234,0.4)]'
              } border-2 border-white/20 transition-all duration-300 backdrop-blur-sm`}
            >
              {voiceState.isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </Button>

            <Button
              onClick={handleSpeakToggle}
              disabled={!isReady}
              size="lg"
              variant="outline"
              className={`rounded-full w-20 h-20 ${
                voiceState.isSpeaking
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'bg-gray-800/50 border-gray-500/50 shadow-[0_0_20px_rgba(107,114,128,0.3)]'
              } backdrop-blur-sm transition-all duration-300`}
            >
              {voiceState.isSpeaking ? (
                <Volume2 className="w-8 h-8 text-green-400" />
              ) : (
                <VolumeX className="w-8 h-8 text-gray-400" />
              )}
            </Button>

            <Button
              onClick={() => setShowAdvanced(!showAdvanced)}
              size="lg"
              variant="outline"
              className="rounded-full w-20 h-20 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/50 hover:bg-orange-500/30 backdrop-blur-sm transition-all duration-300"
            >
              <Settings className="w-8 h-8 text-orange-400" />
            </Button>
          </div>

          {/* Status Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                voiceState.isListening ? 'bg-purple-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <p className="text-xs text-gray-300">Voice Input</p>
              <p className="text-sm font-semibold text-white">
                {voiceState.isListening ? 'Listening' : 'Standby'}
              </p>
            </div>
            
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                voiceState.isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <p className="text-xs text-gray-300">Voice Output</p>
              <p className="text-sm font-semibold text-white">
                {voiceState.isSpeaking ? 'Speaking' : 'Silent'}
              </p>
            </div>
            
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                voiceState.isProcessing ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <p className="text-xs text-gray-300">Processing</p>
              <p className="text-sm font-semibold text-white">
                {voiceState.isProcessing ? 'Active' : 'Idle'}
              </p>
            </div>
            
            <div className="p-3 bg-gray-700/30 rounded-lg text-center">
              <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${
                voiceMetrics.latency < 200 ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
              <p className="text-xs text-gray-300">Latency</p>
              <p className="text-sm font-semibold text-white">
                {voiceMetrics.latency}ms
              </p>
            </div>
          </div>

          {/* Voice Pipeline Status */}
          <div className="p-4 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Voice Pipeline Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300">Whisper Engine:</p>
                <p className="text-white font-medium">
                  {whisperEngine.isLoaded ? 'Loaded' : 'Loading...'}
                </p>
                <Progress value={whisperEngine.loadProgress} className="h-1 mt-1" />
              </div>
              <div>
                <p className="text-gray-300">Coqui TTS:</p>
                <p className="text-white font-medium">
                  {coquiEngine.isLoaded ? 'Ready' : 'Initializing...'}
                </p>
                <Progress value={coquiEngine.loadProgress} className="h-1 mt-1" />
              </div>
              <div>
                <p className="text-gray-300">Pipeline Manager:</p>
                <p className="text-white font-medium">
                  {pipelineManager.isActive ? 'Active' : 'Standby'}
                </p>
              </div>
              <div>
                <p className="text-gray-300">Queue Length:</p>
                <p className="text-white font-medium">
                  {voiceMetrics.queueLength} items
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="p-4 bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-300 mb-3 flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Advanced Voice Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Whisper Configuration</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Model: whisper-base</p>
                    <p>• Language: auto-detect</p>
                    <p>• VAD: enabled</p>
                    <p>• Real-time: active</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Coqui TTS Settings</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Voice: Indonesian Neural</p>
                    <p>• Speed: adaptive</p>
                    <p>• Emotion: contextual</p>
                    <p>• Quality: high</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={resetEngines}>
                  Reset Engines
                </Button>
                <Button size="sm" variant="outline" onClick={initializeEngines}>
                  Reinitialize
                </Button>
              </div>
            </div>
          )}

          {/* Real-time Feedback */}
          <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Real-time Voice Feedback
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Speech Recognition Accuracy:</span>
                <span className="text-sm text-white font-medium">{voiceMetrics.accuracy}%</span>
              </div>
              <Progress value={voiceMetrics.accuracy} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Processing Time:</span>
                <span className="text-sm text-white font-medium">{voiceMetrics.processingTime}ms</span>
              </div>
              <Progress value={Math.min(voiceMetrics.processingTime / 10, 100)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MIORAVoiceInterface;
