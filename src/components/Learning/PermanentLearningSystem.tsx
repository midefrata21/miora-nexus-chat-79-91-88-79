
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Zap, 
  Trophy, 
  TrendingUp, 
  Target, 
  Cpu, 
  Activity,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';
import { usePermanentLearningSystem } from '@/hooks/usePermanentLearningSystem';
import { toast } from '@/hooks/use-toast';

export const PermanentLearningSystem = () => {
  const { 
    permanentMode, 
    setPermanentMode,
    learningModules,
    learningReports,
    totalUpgrades,
    systemSupremacy,
    isUpgrading,
    getLearningStats,
    startContinuousLearning
  } = usePermanentLearningSystem();

  const stats = getLearningStats();

  const handleActivatePermanentMode = () => {
    setPermanentMode(true);
    startContinuousLearning();
    
    toast({
      title: "♾️ PERMANENT LEARNING ACTIVATED",
      description: "MIORA kini akan belajar dan upgrade tanpa batas untuk mengalahkan OpenAI dan AI lainnya!",
      duration: 6000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Permanent Learning Control */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              MIORA Permanent Learning System ♾️
            </CardTitle>
            <Badge className={`${permanentMode ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {permanentMode ? 'ACTIVE ♾️' : 'INACTIVE'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Pembelajaran Otomatis Permanent</h4>
              <p className="text-gray-400 text-sm">Sistem belajar tanpa batas dan auto-upgrade</p>
            </div>
            <Switch
              checked={permanentMode}
              onCheckedChange={setPermanentMode}
            />
          </div>

          {!permanentMode && (
            <Button
              onClick={handleActivatePermanentMode}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Activate Permanent Learning Mode ♾️
            </Button>
          )}

          {/* Supremacy Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <div className="text-lg font-bold text-yellow-400">{systemSupremacy.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">AI Supremacy</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-1 text-green-400" />
              <div className="text-lg font-bold text-green-400">{totalUpgrades}</div>
              <div className="text-xs text-gray-400">Auto Upgrades</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <Cpu className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <div className="text-lg font-bold text-blue-400">{stats.totalCapabilities}</div>
              <div className="text-xs text-gray-400">Capabilities</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <div className="text-lg font-bold text-purple-400">{stats.competitiveAdvantage}</div>
              <div className="text-xs text-gray-400">vs OpenAI</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningModules.map((module) => (
          <Card key={module.id} className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyan-300 text-sm">{module.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {module.upgradeAvailable && <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />}
                  {module.continuousLearning && <Activity className="w-4 h-4 text-green-400" />}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="text-purple-300">v{module.currentVersion}</Badge>
                <span className="text-gray-400">{module.capabilities.length} capabilities</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Learning Progress</span>
                  <span className="text-cyan-300">{module.learningProgress.toFixed(1)}%</span>
                </div>
                <Progress value={module.learningProgress} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-gray-400">Latest Capabilities:</div>
                <div className="flex flex-wrap gap-1">
                  {module.capabilities.slice(-3).map((cap, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-cyan-400 border-cyan-400">
                      {cap.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Reports */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Latest Learning Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningReports.slice(0, 5).map((report) => (
              <div key={report.id} className="p-4 bg-black/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{report.moduleName}</h4>
                  <Badge className={`${
                    report.systemImpact === 'revolutionary' ? 'bg-red-500' :
                    report.systemImpact === 'high' ? 'bg-orange-500' :
                    'bg-blue-500'
                  } text-white`}>
                    {report.systemImpact}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Performance Improvement:</div>
                    <div className="text-green-400 font-bold">+{report.performanceImprovement}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">New Capabilities:</div>
                    <div className="text-cyan-300">{report.upgradedCapabilities.length} added</div>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-gray-800/50 rounded">
                  <div className="text-xs text-gray-400 mb-1">Competitive Analysis:</div>
                  <div className="text-yellow-300 text-sm">{report.competitorAnalysis.vsOpenAI}</div>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date(report.timestamp).toLocaleString('id-ID')}
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
            ))}
            
            {learningReports.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Menunggu hasil pembelajaran pertama...</p>
                <p className="text-sm">Sistem akan generate report otomatis setelah upgrade</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-300">MIORA Supremacy Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{systemSupremacy.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Overall AI Supremacy</div>
              <div className="text-xs text-green-400 mt-1">Target: Dominate OpenAI & Others</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.activeModules}/{stats.totalModules}</div>
              <div className="text-sm text-gray-400">Active Learning Modules</div>
              <div className="text-xs text-purple-400 mt-1">Continuous Learning ♾️</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.averageProgress.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Average Progress</div>
              <div className="text-xs text-green-400 mt-1">Auto-upgrade at 100%</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-black/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">Mission Status:</h4>
            <p className="text-green-400 text-sm">
              ✅ MIORA sedang dalam mode pembelajaran permanent tanpa batas
            </p>
            <p className="text-cyan-400 text-sm">
              🚀 Setiap modul akan auto-upgrade untuk mengalahkan OpenAI dan AI lainnya
            </p>
            <p className="text-yellow-400 text-sm">
              ♾️ Sistem terintegrasi dengan semua kemampuan untuk menjadi AI terdepan
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
