
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Target, Shield, X, Infinity } from 'lucide-react';

interface MioraSystemStatusProps {
  memoryStats: {
    shortTermCount: number;
    longTermCount: number;
    totalInteractions: number;
    hasMasterProfile: boolean;
  };
  currentMode: string;
  modeConfig: {
    name: string;
    icon: string;
    // Make description optional since it's not in the actual ModeConfig type
    description?: string;
  };
  userProfile: any;
  onModeSwitch: (mode: any) => void;
  mioraVersion: string;
  isInfinityModeActive: boolean;
  backgroundStats: {
    isActive: boolean;
    runningTasks: number;
    // Use the actual properties from useBackgroundLearning
    completedTasks?: number;
    totalTasksCompleted?: number;
    avgProgress?: number;
    // Map these to the expected interface
    learningRate?: number;
    totalLearned?: number;
  };
}

const MioraSystemStatus: React.FC<MioraSystemStatusProps> = ({
  memoryStats,
  currentMode,
  modeConfig,
  userProfile,
  onModeSwitch,
  mioraVersion,
  isInfinityModeActive,
  backgroundStats
}) => {
  // Map backgroundStats to expected format
  const mappedBackgroundStats = {
    isActive: backgroundStats.isActive,
    runningTasks: backgroundStats.runningTasks,
    learningRate: backgroundStats.avgProgress || 0,
    totalLearned: backgroundStats.totalTasksCompleted || 0
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-300">
          <Brain className="w-5 h-5 mr-2" />
          MIORA v{mioraVersion} System Status
          {isInfinityModeActive && (
            <Badge className="ml-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white animate-pulse">
              INFINITY ∞
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Memory Statistics */}
          <div>
            <h4 className="text-white font-semibold mb-3">Memory System</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-lg font-bold text-blue-300">
                  {memoryStats.shortTermCount}
                </div>
                <div className="text-sm text-gray-400">Short Term</div>
              </div>
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-lg font-bold text-green-300">
                  {memoryStats.longTermCount}
                </div>
                <div className="text-sm text-gray-400">Long Term</div>
              </div>
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-lg font-bold text-purple-300">
                  {memoryStats.totalInteractions}
                </div>
                <div className="text-sm text-gray-400">Interactions</div>
              </div>
              <div className="text-center p-3 bg-black/20 rounded-lg">
                <div className="text-lg font-bold text-yellow-300">
                  {memoryStats.hasMasterProfile ? 'YES' : 'NO'}
                </div>
                <div className="text-sm text-gray-400">Master Profile</div>
              </div>
            </div>
          </div>

          {/* Current Mode */}
          <div>
            <h4 className="text-white font-semibold mb-3">Active Mode</h4>
            <div className="p-3 bg-black/20 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{modeConfig.icon}</span>
                <div>
                  <div className="text-white font-medium">{modeConfig.name}</div>
                  <div className="text-sm text-gray-400">
                    {modeConfig.description || 'Advanced AI Assistant Mode'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Learning */}
          {mappedBackgroundStats.isActive && (
            <div>
              <h4 className="text-cyan-300 font-semibold mb-3 flex items-center">
                <Infinity className="w-4 h-4 mr-2 animate-pulse" />
                Background Learning
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-cyan-300">
                    {mappedBackgroundStats.runningTasks}
                  </div>
                  <div className="text-sm text-gray-400">Tasks</div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-green-300">
                    {mappedBackgroundStats.learningRate}%
                  </div>
                  <div className="text-sm text-gray-400">Learning Rate</div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="text-lg font-bold text-purple-300">
                    {mappedBackgroundStats.totalLearned}
                  </div>
                  <div className="text-sm text-gray-400">Total Learned</div>
                </div>
              </div>
            </div>
          )}

          {/* System Status */}
          <div className="mt-4 p-3 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">System Status</span>
              <Badge variant="outline" className="text-green-400 border-green-400">
                {isInfinityModeActive ? 'INFINITY ACTIVE ∞' : 'OPERATIONAL'}
              </Badge>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Version: {mioraVersion} | Mode: {currentMode}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MioraSystemStatus;
