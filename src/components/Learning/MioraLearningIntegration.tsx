
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MioraEvaluationDashboard } from './MioraEvaluationDashboard';
import { Brain, BarChart3, Settings, Zap } from 'lucide-react';

export const MioraLearningIntegration = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">MIORA Learning Integration</h2>
        <p className="text-gray-400">
          Sistem evaluasi mandiri, komunikasi sinkron, dan monitoring voice MIORA
        </p>
      </div>

      <Tabs defaultValue="evaluation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evaluation" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Auto Evaluation
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Smart Sync
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Voice Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evaluation" className="space-y-6">
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300">Automatic Self-Evaluation System</CardTitle>
              <CardDescription>
                MIORA melakukan evaluasi mandiri setiap 24 jam dengan laporan komprehensif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h4 className="text-white font-medium">Progress Tracking</h4>
                  <p className="text-sm text-gray-400">Monitor pembelajaran mingguan</p>
                </div>
                <div className="p-4 bg-green-900/20 rounded-lg">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <h4 className="text-white font-medium">Module Analysis</h4>
                  <p className="text-sm text-gray-400">Identifikasi modul aktif/terlewat</p>
                </div>
                <div className="p-4 bg-purple-900/20 rounded-lg">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <h4 className="text-white font-medium">Auto Optimization</h4>
                  <p className="text-sm text-gray-400">Rekomendasi perbaikan sistem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-6">
          <Card className="bg-gray-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300">Smart Synchronous Communication</CardTitle>
              <CardDescription>
                Sistem komunikasi cerdas dengan fallback otomatis voice ke text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Mode SMART-SYNC:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-400">✅ Voice aktif → Kirim suara + teks</p>
                    <p className="text-yellow-400">⚠️ Voice error → Kirim teks + info fallback</p>
                    <p className="text-blue-400">🔄 Auto-retry koneksi voice</p>
                    <p className="text-purple-400">📱 Notifikasi status real-time</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Fallback Messages:</h4>
                  <div className="p-3 bg-black/30 rounded border-l-4 border-yellow-400">
                    <p className="text-yellow-300 text-sm">
                      "🔇 Maaf voice sedang offline, berikut jawaban dalam pesan:"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card className="bg-gray-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-300">Voice Watchdog Monitoring</CardTitle>
              <CardDescription>
                Monitor koneksi voice setiap 5 menit dengan auto-reconnect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Monitoring Features:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-400">🔍 Health check setiap 5 menit</p>
                    <p className="text-blue-400">🔄 Auto-reconnect 3x attempts</p>
                    <p className="text-yellow-400">⚡ Exponential backoff retry</p>
                    <p className="text-red-400">🚨 Fallback ke text-only mode</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Status Indicators:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-400">🟢 ONLINE - Voice siap</p>
                    <p className="text-yellow-400">🟡 RECONNECTING - Mencoba ulang</p>
                    <p className="text-red-400">🔴 OFFLINE - Mode text-only</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Main Dashboard */}
      <MioraEvaluationDashboard />
    </div>
  );
};
