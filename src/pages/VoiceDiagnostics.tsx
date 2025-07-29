import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, BarChart3, Headphones, Waves, Activity, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoiceMetrics {
  clarity: number;
  confidence: number;
  emotionalState: string;
  stressLevel: number;
  speechRate: number;
  volumeLevel: number;
  backgroundNoise: number;
}

const VoiceDiagnostics = () => {
  const [voiceMetrics, setVoiceMetrics] = useState<VoiceMetrics>({
    clarity: 92,
    confidence: 87,
    emotionalState: 'Focused',
    stressLevel: 23,
    speechRate: 145,
    volumeLevel: 68,
    backgroundNoise: 15
  });

  const [healthIndicators] = useState([
    { name: 'Vocal Stress', value: 18, status: 'good' },
    { name: 'Breathing Pattern', value: 89, status: 'excellent' },
    { name: 'Articulation', value: 94, status: 'excellent' },
    { name: 'Cognitive Load', value: 67, status: 'warning' }
  ]);

  const [isListening, setIsListening] = useState(false);
  const [autoAnalysis, setAutoAnalysis] = useState(true);

  useEffect(() => {
    if (autoAnalysis) {
      const interval = setInterval(() => {
        setVoiceMetrics(prev => ({
          ...prev,
          clarity: Math.max(70, Math.min(100, prev.clarity + (Math.random() - 0.5) * 3)),
          confidence: Math.max(60, Math.min(100, prev.confidence + (Math.random() - 0.5) * 4)),
          stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() - 0.5) * 5)),
          speechRate: Math.max(100, Math.min(200, prev.speechRate + (Math.random() - 0.5) * 10)),
          volumeLevel: Math.max(30, Math.min(100, prev.volumeLevel + (Math.random() - 0.5) * 8))
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoAnalysis]);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "🎤 Voice Analysis Started",
        description: "MIORA is analyzing voice patterns in real-time",
        duration: 3000,
      });
    } else {
      toast({
        title: "⏹️ Analysis Stopped",
        description: "Voice analysis session saved",
        duration: 3000,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 border-green-500';
      case 'good': return 'text-blue-400 border-blue-500';
      case 'warning': return 'text-yellow-400 border-yellow-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getEmotionalStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'focused': return 'text-blue-400';
      case 'calm': return 'text-green-400';
      case 'excited': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Headphones className="h-12 w-12 text-cyan-400" />
            Voice Diagnostics
          </h1>
          <p className="text-gray-300 text-lg">Advanced voice analysis and health monitoring with pattern recognition</p>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Mic className="h-5 w-5" />Voice Analysis Control</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Real-time Analysis</h3>
                <p className="text-gray-400 text-sm">Continuous voice pattern monitoring</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={autoAnalysis ? "default" : "outline"}
                  onClick={() => setAutoAnalysis(!autoAnalysis)}
                  className={autoAnalysis ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Auto-Analysis {autoAnalysis ? 'ON' : 'OFF'}
                </Button>
                <Button 
                  onClick={toggleListening}
                  className={isListening ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? 'Stop' : 'Start'}
                </Button>
              </div>
            </div>

            {isListening && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Activity className="h-4 w-4 animate-pulse" />
                  <span className="font-medium">Live Voice Analysis Active</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-gray-400">Volume:</span><span className="text-white ml-2">{voiceMetrics.volumeLevel}%</span></div>
                  <div><span className="text-gray-400">Clarity:</span><span className="text-white ml-2">{voiceMetrics.clarity}%</span></div>
                  <div><span className="text-gray-400">Rate:</span><span className="text-white ml-2">{voiceMetrics.speechRate} wpm</span></div>
                  <div><span className="text-gray-400">Noise:</span><span className="text-white ml-2">{voiceMetrics.backgroundNoise}%</span></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Waves className="h-5 w-5" />Clarity</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{voiceMetrics.clarity}%</div><Progress value={voiceMetrics.clarity} className="mt-2" /></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Volume2 className="h-5 w-5" />Confidence</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{voiceMetrics.confidence}%</div><Progress value={voiceMetrics.confidence} className="mt-2" /></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><Activity className="h-5 w-5" />Emotional State</CardTitle></CardHeader>
            <CardContent><div className={`text-2xl font-bold ${getEmotionalStateColor(voiceMetrics.emotionalState)}`}>{voiceMetrics.emotionalState}</div></CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />Stress Level</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-white">{voiceMetrics.stressLevel}%</div><Progress value={voiceMetrics.stressLevel} className="mt-2" /></CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-cyan-500/30">
          <CardHeader><CardTitle className="text-cyan-400 flex items-center gap-2"><BarChart3 className="h-5 w-5" />Health Indicators</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthIndicators.map((indicator, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{indicator.name}</h3>
                    <Badge variant="outline" className={getStatusColor(indicator.status)}>
                      {indicator.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Level</span>
                      <span className="text-white">{indicator.value}%</span>
                    </div>
                    <Progress value={indicator.value} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceDiagnostics;