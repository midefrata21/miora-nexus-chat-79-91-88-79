
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useMioraEvaluation } from '@/hooks/useMioraEvaluation';
import { useMioraSmartSync } from '@/hooks/useMioraSmartSync';

export const MioraEvaluationDashboard = () => {
  const {
    currentReport,
    evaluationHistory,
    isEvaluating,
    autoEvaluationEnabled,
    setAutoEvaluationEnabled,
    performSelfEvaluation,
    generateReportSummary,
    getPerformanceLevel,
    lastEvaluationTime
  } = useMioraEvaluation();

  const {
    smartSyncEnabled,
    setSmartSyncEnabled,
    voiceWatchdogEnabled,
    setVoiceWatchdogEnabled,
    voiceHealth,
    getVoiceStatusInfo,
    resetVoiceConnection,
    isVoiceHealthy
  } = useMioraSmartSync();

  const voiceStatus = getVoiceStatusInfo();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4 text-green-400" />;
      case 'reconnecting': return <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-red-400" />;
      default: return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            MIORA Evaluation & Communication Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Auto Evaluation Control */}
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">Auto Evaluation</h4>
                <Badge className={autoEvaluationEnabled ? 'bg-green-500' : 'bg-red-500'}>
                  {autoEvaluationEnabled ? 'ON' : 'OFF'}
                </Badge>
              </div>
              <Button
                onClick={() => setAutoEvaluationEnabled(!autoEvaluationEnabled)}
                size="sm"
                className={autoEvaluationEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
              >
                {autoEvaluationEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>

            {/* Smart Sync Control */}
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">Smart-Sync Mode</h4>
                <Badge className={smartSyncEnabled ? 'bg-green-500' : 'bg-red-500'}>
                  {smartSyncEnabled ? 'ON' : 'OFF'}
                </Badge>
              </div>
              <Button
                onClick={() => setSmartSyncEnabled(!smartSyncEnabled)}
                size="sm"
                className={smartSyncEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
              >
                {smartSyncEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>

            {/* Voice Watchdog Control */}
            <div className="p-4 bg-black/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">Voice Watchdog</h4>
                <Badge className={voiceWatchdogEnabled ? 'bg-green-500' : 'bg-red-500'}>
                  {voiceWatchdogEnabled ? 'ON' : 'OFF'}
                </Badge>
              </div>
              <Button
                onClick={() => setVoiceWatchdogEnabled(!voiceWatchdogEnabled)}
                size="sm"
                className={voiceWatchdogEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
              >
                {voiceWatchdogEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Status Monitor */}
      <Card className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            {isVoiceHealthy ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            Voice Stability Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              {getStatusIcon(voiceHealth.status)}
              <div className="text-lg font-bold text-white mt-1">{voiceHealth.status.toUpperCase()}</div>
              <div className="text-xs text-gray-400">Connection Status</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <div className="text-lg font-bold text-blue-400">{voiceStatus.healthStatus}</div>
              <div className="text-xs text-gray-400">Voice Health</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <div className="text-lg font-bold text-purple-400">{voiceHealth.connectionAttempts}/3</div>
              <div className="text-xs text-gray-400">Reconnect Attempts</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-lg font-bold text-yellow-400">
                {Math.round((Date.now() - voiceHealth.lastCheck) / 1000)}s
              </div>
              <div className="text-xs text-gray-400">Last Check</div>
            </div>
          </div>
          
          {!isVoiceHealthy && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 font-medium">Voice Connection Issues Detected</p>
                  <p className="text-red-400 text-sm">System menggunakan fallback ke text-only mode</p>
                </div>
                <Button
                  onClick={resetVoiceConnection}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reset Connection
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Evaluation Report */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Learning Evaluation Report
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={performSelfEvaluation}
                disabled={isEvaluating}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isEvaluating ? 'Evaluating...' : 'Run Evaluation'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentReport ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-black/30 rounded-lg">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{currentReport.overallScore}%</div>
                <div className="text-lg text-white mb-1">{getPerformanceLevel(currentReport.overallScore)}</div>
                <div className="text-sm text-gray-400">
                  Evaluated {new Date(currentReport.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Progress Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Weekly Progress</span>
                    <span className="text-green-400 font-bold">{currentReport.weeklyProgress}%</span>
                  </div>
                  <Progress value={currentReport.weeklyProgress} className="h-2" />
                </div>
                
                <div className="p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Reasoning Capability</span>
                    <span className="text-blue-400 font-bold">{currentReport.reasoningCapability}%</span>
                  </div>
                  <Progress value={currentReport.reasoningCapability} className="h-2" />
                </div>
                
                <div className="p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">System Improvements</span>
                    <span className="text-purple-400 font-bold">{currentReport.systemImprovements}</span>
                  </div>
                  <div className="text-xs text-gray-400">Auto improvements made</div>
                </div>
              </div>

              {/* Active vs Missed Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <h4 className="text-green-300 font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Active Modules ({currentReport.activeModules.length})
                  </h4>
                  <div className="space-y-1">
                    {currentReport.activeModules.map((module, idx) => (
                      <Badge key={idx} variant="outline" className="text-green-400 border-green-400">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Missed Modules ({currentReport.missedModules.length})
                  </h4>
                  <div className="space-y-1">
                    {currentReport.missedModules.map((module, idx) => (
                      <Badge key={idx} variant="outline" className="text-red-400 border-red-400">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottlenecks and Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <h4 className="text-yellow-300 font-medium mb-3">🚧 Bottlenecks Detected</h4>
                  <div className="space-y-2 text-sm">
                    {currentReport.bottlenecks.map((bottleneck, idx) => (
                      <p key={idx} className="text-yellow-200">• {bottleneck}</p>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                  <h4 className="text-cyan-300 font-medium mb-3">💡 Optimization Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    {currentReport.optimizationRecommendations.map((rec, idx) => (
                      <p key={idx} className="text-cyan-200">• {rec}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Natural Language Summary */}
              <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
                <h4 className="text-white font-medium mb-3">📋 Natural Language Summary</h4>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {generateReportSummary(currentReport)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No evaluation report available</p>
              <p className="text-sm">Click "Run Evaluation" to generate report</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation History */}
      {evaluationHistory.length > 0 && (
        <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-300 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Evaluation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {evaluationHistory.slice(-5).reverse().map((report, idx) => (
                <div key={idx} className="p-3 bg-black/20 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">
                      Score: {report.overallScore}% - {getPerformanceLevel(report.overallScore)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(report.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-400">Progress: {report.weeklyProgress}%</div>
                    <div className="text-sm text-purple-400">Reasoning: {report.reasoningCapability}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
