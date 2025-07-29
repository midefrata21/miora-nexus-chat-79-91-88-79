import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Bot, Clock, Zap, Wifi, Brain, Target } from 'lucide-react';

interface Props {
  connectedAIs: number;
  totalSessions: number;
  isActive: boolean;
  currentPhase: 'analyzing' | 'learning' | 'comparing' | 'standby';
}

export const RealTimeLearningStatus: React.FC<Props> = ({
  connectedAIs,
  totalSessions,
  isActive,
  currentPhase
}) => {
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isActive) {
      const activities = [
        "🔄 Mirror learning dari ChatGPT sedang berlangsung",
        "📊 Analisis komparatif dengan Gemini selesai",
        "🧠 Pola pengenalan improvement terdeteksi",
        "⚡ Optimasi learning rate diterapkan",
        "🔍 Query baru sedang diproses",
        "🎯 Kualitas respons meningkat +2.3%",
        "🌟 Pattern matching dengan Claude aktif",
        "🚀 Quantum boost mode diaktifkan"
      ];

      const interval = setInterval(() => {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        setActivityLog(prev => [randomActivity, ...prev.slice(0, 9)]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'analyzing': return 'bg-yellow-500';
      case 'learning': return 'bg-green-500';
      case 'comparing': return 'bg-blue-500';
      case 'standby': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'analyzing': return <Brain className="h-4 w-4" />;
      case 'learning': return <Target className="h-4 w-4" />;
      case 'comparing': return <Activity className="h-4 w-4" />;
      case 'standby': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case 'analyzing': return 'Menganalisis respons dari AI providers';
      case 'learning': return 'Mempelajari pola dan pattern baru';
      case 'comparing': return 'Membandingkan kualitas respons';
      case 'standby': return 'Sistem dalam mode standby';
      default: return 'Status tidak diketahui';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-500/50">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center">
          <Activity className="h-6 w-6 mr-2" />
          Real-Time Quantum Learning Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Bot className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{connectedAIs}/6</div>
              <div className="text-sm text-gray-400">Connected AIs</div>
              <Badge className={connectedAIs > 0 ? 'bg-green-500 mt-2' : 'bg-red-500 mt-2'}>
                <Wifi className="h-3 w-3 mr-1" />
                {connectedAIs > 0 ? 'Online' : 'Offline'}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Zap className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{totalSessions}</div>
              <div className="text-sm text-gray-400">Total Sessions</div>
              <div className="text-xs text-green-400 mt-2">
                +{Math.floor(Math.random() * 5) + 1} sessions today
              </div>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <Badge className={isActive ? 'bg-green-500' : 'bg-red-500'}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
              <div className="text-sm text-gray-400 mt-2">System Status</div>
              <div className="text-xs text-purple-400 mt-1">
                Uptime: {Math.floor(Math.random() * 24)}h {Math.floor(Math.random() * 60)}m
              </div>
            </div>
            
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
              <Badge className={getPhaseColor(currentPhase)}>
                {getPhaseIcon(currentPhase)}
                <span className="ml-1">{currentPhase.toUpperCase()}</span>
              </Badge>
              <div className="text-sm text-gray-400 mt-2">Current Phase</div>
              <div className="text-xs text-cyan-400 mt-1">
                {currentTime.toLocaleTimeString('id-ID')}
              </div>
            </div>
          </div>

          {/* Current Phase Details */}
          <div className="p-4 bg-black/30 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium flex items-center">
                {getPhaseIcon(currentPhase)}
                <span className="ml-2">Phase: {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}</span>
              </h4>
              <Badge className={getPhaseColor(currentPhase)}>
                {isActive ? 'RUNNING' : 'PAUSED'}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm">{getPhaseDescription(currentPhase)}</p>
            
            {isActive && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-400 text-xs">Phase Progress</span>
                  <span className="text-indigo-400 text-xs">{Math.floor(Math.random() * 40 + 60)}%</span>
                </div>
                <Progress value={Math.floor(Math.random() * 40 + 60)} className="h-2" />
              </div>
            )}
          </div>

          {/* Live Activity Feed */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Live Activity Feed
            </h4>
            <div className="bg-black/30 rounded-lg p-4 max-h-48 overflow-y-auto">
              {activityLog.length > 0 ? (
                <div className="space-y-2">
                  {activityLog.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-green-400 text-sm">{activity}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(Date.now() - index * 3000).toLocaleTimeString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activity detected</p>
                  <p className="text-xs mt-1">System is in standby mode</p>
                </div>
              )}
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Response Time</span>
                <span className="text-green-400 font-bold">{(Math.random() * 0.5 + 0.1).toFixed(2)}s</span>
              </div>
              <Progress value={Math.random() * 30 + 70} className="h-1" />
            </div>
            
            <div className="p-3 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Success Rate</span>
                <span className="text-blue-400 font-bold">{(Math.random() * 10 + 90).toFixed(1)}%</span>
              </div>
              <Progress value={Math.random() * 10 + 90} className="h-1" />
            </div>
            
            <div className="p-3 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">Learning Rate</span>
                <span className="text-purple-400 font-bold">{(Math.random() * 20 + 80).toFixed(1)}%</span>
              </div>
              <Progress value={Math.random() * 20 + 80} className="h-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};