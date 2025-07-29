
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Moon, Brain, Zap, Clock, TrendingUp, AlertCircle, CheckCircle, Play } from 'lucide-react';
import { useMIORAAutoDailyLearning } from '@/hooks/useMIORAAutoDailyLearning';

const MIORAAutoDailyLearning: React.FC = () => {
  const {
    learningState,
    learningHistory,
    detectedErrors,
    responseModels,
    isLearning,
    activateDailyLearning,
    triggerManualLearning,
    getLearningStats
  } = useMIORAAutoDailyLearning();

  const [stats, setStats] = useState(getLearningStats());

  useEffect(() => {
    setStats(getLearningStats());
  }, [learningState, learningHistory, responseModels, detectedErrors, isLearning, getLearningStats]);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'analyzing': return <Brain className="h-4 w-4 animate-pulse" />;
      case 'error_fixing': return <AlertCircle className="h-4 w-4 animate-pulse" />;
      case 'model_building': return <TrendingUp className="h-4 w-4 animate-pulse" />;
      case 'testing': return <CheckCircle className="h-4 w-4 animate-pulse" />;
      default: return <Moon className="h-4 w-4" />;
    }
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'analyzing': return 'Analyzing Daily Logs';
      case 'error_fixing': return 'Fixing Logic Errors';
      case 'model_building': return 'Building Response Models';
      case 'testing': return 'Testing Improvements';
      default: return 'Idle - Waiting for Next Session';
    }
  };

  const formatTimeUntilNext = (timestamp: number) => {
    const now = Date.now();
    const diff = timestamp - now;
    
    if (diff <= 0) return 'Ready to learn';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Moon className="h-12 w-12 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              MIORA Auto Daily Learning
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Sistem Pembelajaran Otomatis Harian - Review Log, Perbaikan Error, dan Model Respon Baru
          </p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">System Status</p>
                  <Badge variant="outline" className={`mt-1 ${stats.isActive ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
                    {stats.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                </div>
                {getPhaseIcon(stats.currentPhase)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Sessions</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalSessions}</p>
                </div>
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Errors Fixed</p>
                  <p className="text-2xl font-bold text-green-400">{stats.totalErrorsFixed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-pink-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Response Models</p>
                  <p className="text-2xl font-bold text-pink-400">{stats.totalPatternsCreated}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-pink-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Learning Status */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-300">
              {getPhaseIcon(stats.currentPhase)}
              <span className="ml-2">Current Learning Phase</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{getPhaseLabel(stats.currentPhase)}</span>
                {isLearning && (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400 animate-pulse">
                    LEARNING IN PROGRESS
                  </Badge>
                )}
              </div>
              
              {isLearning && (
                <Progress value={75} className="h-2" />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Next Scheduled Learning:</span>
                  <p className="text-blue-400 font-medium">
                    {formatTimeUntilNext(stats.nextSession)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Avg Improvement Score:</span>
                  <p className="text-green-400 font-medium">{stats.avgImprovementScore}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Learning Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {!stats.isActive ? (
                <Button
                  onClick={activateDailyLearning}
                  className="bg-purple-600 hover:bg-purple-500"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Activate Daily Learning
                </Button>
              ) : (
                <Badge variant="outline" className="text-green-400 border-green-400 p-2">
                  Daily Learning Active
                </Badge>
              )}
              
              <Button
                onClick={triggerManualLearning}
                disabled={isLearning}
                variant="outline"
                className="border-blue-500 text-blue-400"
              >
                <Play className="h-4 w-4 mr-2" />
                {isLearning ? 'Learning...' : 'Manual Learning Session'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning History & Detected Errors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning History */}
          <Card className="bg-black/40 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Learning Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {learningHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-400">No learning sessions yet</p>
                    </div>
                  ) : (
                    learningHistory.slice(0, 10).map((session) => (
                      <div key={session.id} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">
                            {new Date(session.timestamp).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                            {Math.round(session.improvementScore)}% improvement
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                          <span>Logs: {session.logsAnalyzed}</span>
                          <span>Fixes: {session.errorsFixed}</span>
                          <span>Models: {session.newResponsePatterns}</span>
                        </div>
                        
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">
                            Duration: {Math.round(session.duration / 1000)}s
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Detected Errors */}
          <Card className="bg-black/40 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Detected Error Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {detectedErrors.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-400 mb-3" />
                      <p className="text-gray-400">No errors detected</p>
                    </div>
                  ) : (
                    detectedErrors.map((error, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className={`text-xs ${
                            error.severity === 'critical' ? 'text-red-400 border-red-400' :
                            error.severity === 'high' ? 'text-orange-400 border-orange-400' :
                            error.severity === 'medium' ? 'text-yellow-400 border-yellow-400' :
                            'text-blue-400 border-blue-400'
                          }`}>
                            {error.severity} - {error.type}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Freq: {error.frequency}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-200 mb-2">{error.pattern}</p>
                        <p className="text-xs text-gray-400">{error.suggestedFix}</p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MIORAAutoDailyLearning;
