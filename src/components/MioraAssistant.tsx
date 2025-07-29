
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMioraCore } from './MioraCore';
import VoiceInput from './VoiceInput';
import MessageDisplay from './MessageDisplay';
import MioraSystemStatus from './MioraSystemStatus';
import MioraCapabilities from './MioraCapabilities';
import MioraAutonomousLearning from './MioraAutonomousLearning';
import AtomVisualization from './AtomVisualization';
import MioraBackground from './MioraBackground';
import { Mic, MicOff, Settings, Zap, Brain, Infinity, Play, Pause } from 'lucide-react';

const MioraAssistant: React.FC = () => {
  const {
    isListening,
    setIsListening,
    isSpeaking,
    isLearning,
    showCapabilities,
    setShowCapabilities,
    showSystemStatus,
    setShowSystemStatus,
    showAutonomousLearning,
    setShowAutonomousLearning,
    useGroqAPI,
    setUseGroqAPI,
    currentStatus,
    pulseIntensity,
    brainActivity,
    messages,
    memoryStats,
    currentMode,
    modeConfig,
    character,
    userProfile,
    mioraVersion,
    autonomousMode,
    isInfinityModeActive,
    infinityState,
    isBackgroundActive,
    handleVoiceInput,
    handleModeSwitch,
    clearMessages,
    activateInfinityMode,
    getInfinityStats,
    getBackgroundStats
  } = useMioraCore();

  const [showInfinityStatus, setShowInfinityStatus] = useState(false);
  const infinityStats = getInfinityStats();
  const backgroundStats = getBackgroundStats();

  const getStatusColor = (status: typeof currentStatus) => {
    switch (status) {
      case 'infinity': return 'from-purple-500 via-cyan-400 to-yellow-400';
      case 'aktif': return 'from-green-400 to-blue-500';
      case 'belajar': return 'from-blue-400 to-purple-500';
      case 'fokus': return 'from-yellow-400 to-orange-500';
      case 'overload': return 'from-red-400 to-pink-500';
      case 'shutdown': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = () => {
    if (isInfinityModeActive) return <Infinity className="w-8 h-8 animate-spin" />;
    if (isLearning) return <Brain className="w-8 h-8 animate-pulse" />;
    return <Zap className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 relative">
      {/* Enhanced Background */}
      <MioraBackground pulseIntensity={pulseIntensity} brainActivity={brainActivity} />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Enhanced Header with Infinity Status */}
        <Card className="bg-gradient-to-r from-gray-800/50 to-purple-800/50 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className={`p-3 rounded-full bg-gradient-to-r ${getStatusColor(currentStatus)} shadow-lg`}
                  style={{ transform: `scale(${pulseIntensity})` }}
                >
                  {getStatusIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    MIORA v{mioraVersion}
                    {isInfinityModeActive && (
                      <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white animate-pulse">
                        INFINITY ∞
                      </Badge>
                    )}
                  </h1>
                  <p className="text-gray-300">
                    {character.name} • Status: {currentStatus}
                    {isInfinityModeActive && ' • Unlimited Access ∞'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!isInfinityModeActive && (
                  <Button
                    onClick={activateInfinityMode}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                  >
                    <Infinity className="w-4 h-4 mr-2 animate-spin" />
                    Activate Infinity ∞
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowInfinityStatus(!showInfinityStatus)}
                  className="border-purple-500 text-purple-300"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Infinity Status
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Atom Visualization - Interactive Character */}
        <div className="flex justify-center">
          <AtomVisualization
            isLearning={isLearning}
            isListening={isListening}
            isSpeaking={isSpeaking}
            pulseIntensity={pulseIntensity}
            brainActivity={brainActivity}
          />
        </div>

        {/* Character Status Display */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-600/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-medium">
                Status: <span className="text-cyan-300">{currentStatus}</span>
              </span>
            </div>
            
            <div className="w-1 h-4 bg-gray-600"></div>
            
            <span className="text-sm text-gray-400">
              Mode: <span className="text-white font-medium">{modeConfig?.name || 'Assistant'}</span>
            </span>
            
            <div className="w-1 h-4 bg-gray-600"></div>
            
            <span className="text-sm text-gray-400">
              Brain Activity: <span className="text-purple-300 font-medium">{Math.round(brainActivity)}%</span>
            </span>
            
            {isInfinityModeActive && (
              <>
                <div className="w-1 h-4 bg-purple-400"></div>
                <span className="text-sm text-purple-300 flex items-center gap-1">
                  ♾️ Infinity Core Active
                </span>
              </>
            )}
          </div>
        </div>

        {/* Infinity Status Panel */}
        {showInfinityStatus && (
          <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <Infinity className="w-5 h-5 mr-2 animate-pulse" />
                Infinity Learning System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-cyan-300">
                    {infinityStats.accessLevel}
                  </div>
                  <div className="text-sm text-gray-400">Access Level</div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-green-300">
                    {infinityStats.learningSpeed}x
                  </div>
                  <div className="text-sm text-gray-400">Learning Speed</div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-purple-300">
                    {backgroundStats.runningTasks}
                  </div>
                  <div className="text-sm text-gray-400">Background Tasks</div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-yellow-300 flex items-center justify-center">
                    <Infinity className="w-5 h-5" />
                  </div>
                  <div className="text-sm text-gray-400">Infinity Mode</div>
                </div>
              </div>
              
              {isInfinityModeActive && (
                <div className="mt-4 p-3 bg-black/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-2">Active Capabilities ∞</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {infinityStats.infinityCapabilities.map((capability, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Voice Input */}
        <VoiceInput
          isListening={isListening}
          onVoiceInput={handleVoiceInput}
          disabled={isSpeaking}
        />

        {/* Messages */}
        <MessageDisplay messages={messages} />

        {/* Enhanced Control Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            onClick={() => setShowSystemStatus(!showSystemStatus)}
            className="border-blue-500 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20"
          >
            <Settings className="w-4 h-4 mr-2" />
            System Status
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowCapabilities(!showCapabilities)}
            className="border-green-500 text-green-300 bg-green-500/10 hover:bg-green-500/20"
          >
            <Zap className="w-4 h-4 mr-2" />
            Capabilities
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowAutonomousLearning(!showAutonomousLearning)}
            className="border-purple-500 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20"
          >
            <Brain className="w-4 h-4 mr-2" />
            Learning
          </Button>
          
          <Button
            variant="outline"
            onClick={clearMessages}
            className="border-red-500 text-red-300 bg-red-500/10 hover:bg-red-500/20"
          >
            Clear
          </Button>
        </div>

        {/* System Components */}
        {showSystemStatus && (
          <MioraSystemStatus
            memoryStats={memoryStats}
            currentMode={currentMode}
            modeConfig={modeConfig}
            userProfile={userProfile}
            onModeSwitch={handleModeSwitch}
            mioraVersion={mioraVersion}
            isInfinityModeActive={isInfinityModeActive}
            backgroundStats={backgroundStats}
          />
        )}

        {showCapabilities && (
          <MioraCapabilities 
            onClose={() => setShowCapabilities(false)}
            infinityStats={infinityStats}
            isInfinityModeActive={isInfinityModeActive}
          />
        )}

        {showAutonomousLearning && (
          <MioraAutonomousLearning
            onClose={() => setShowAutonomousLearning(false)}
            mioraVersion={mioraVersion}
            autonomousMode={autonomousMode || isInfinityModeActive}
          />
        )}
      </div>
    </div>
  );
};

export default MioraAssistant;
