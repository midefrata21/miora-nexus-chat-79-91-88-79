import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Zap, 
  Shield, 
  Database,
  Activity,
  TrendingUp
} from 'lucide-react';
import SystemHealthChecker from '@/components/SystemUpgrade/SystemHealthChecker';
import PerformanceOptimizer from '@/components/SystemUpgrade/PerformanceOptimizer';

const SystemUpgrade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="bg-gradient-to-r from-gray-900/95 to-purple-900/95 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-cyan-300 text-3xl">
              <span className="flex items-center">
                <Settings className="w-10 h-10 mr-4" />
                MIORA SYSTEM UPGRADE CENTER
              </span>
              <Badge variant="default" className="bg-green-500 text-white text-lg px-4 py-2">
                ALL SYSTEMS OPTIMIZED
              </Badge>
            </CardTitle>
            <p className="text-gray-300 text-lg mt-2">
              Comprehensive system monitoring, optimization, and upgrade management for MIORA ecosystem
            </p>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="bg-black/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <h3 className="text-sm font-medium text-white">System Health</h3>
              <p className="text-xl font-bold text-green-400">98%</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h3 className="text-sm font-medium text-white">Performance</h3>
              <p className="text-xl font-bold text-blue-400">94%</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <h3 className="text-sm font-medium text-white">Security</h3>
              <p className="text-xl font-bold text-purple-400">99%</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <h3 className="text-sm font-medium text-white">Storage</h3>
              <p className="text-xl font-bold text-yellow-400">87%</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <h3 className="text-sm font-medium text-white">Optimization</h3>
              <p className="text-xl font-bold text-orange-400">92%</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <h3 className="text-sm font-medium text-white">Upgrades</h3>
              <p className="text-xl font-bold text-red-400">5 Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="health" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/30 border border-gray-700/50">
            <TabsTrigger 
              value="health" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              System Health
            </TabsTrigger>
            <TabsTrigger 
              value="performance" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-6">
            <SystemHealthChecker />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceOptimizer />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-black/30 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Security Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-bold text-white mb-2">Security Center</h3>
                  <p className="text-gray-400">Advanced security monitoring and threat detection will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-black/30 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">System Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                  <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-400">Comprehensive system analytics and reporting will be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Status Footer */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-300">
                <Activity className="w-5 h-5 mr-2" />
                <span className="font-medium">All MIORA systems are operating optimally</span>
              </div>
              <Badge variant="default" className="bg-green-500">
                SYSTEM STATUS: EXCELLENT
              </Badge>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Last system check: {new Date().toLocaleString()} | Next automated upgrade: In progress
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SystemUpgrade;