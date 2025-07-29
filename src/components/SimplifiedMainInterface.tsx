
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemUpdateActivator } from './SystemUpdateActivator';
import EnhancedAutonomousPanel from './EnhancedAutonomousPanel';
import AutonomousLearningInterface from './AutonomousLearningInterface';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Code, Database, Infinity, BookOpen, HelpCircle, FileCode2, 
  Users, Network, GraduationCap, Target, Shield, Settings, Terminal,
  TrendingUp, LineChart, BarChart3, MessageCircle, Lightbulb, Activity, Moon
} from 'lucide-react';
import MIORABackgroundMonitor from '@/components/MIORA/BackgroundService/MIORABackgroundMonitor';
import { useContinuousAutonomy } from '@/hooks/useContinuousAutonomy';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import { GeminiStatus } from '@/components/MIORA/GeminiStatus';
import { useQuantumInfrastructure } from '@/components/QuantumInfrastructure/hooks/useQuantumInfrastructure';
import { useUnifiedInfinityCore } from '@/hooks/infinity/useUnifiedInfinityCore';
import { useScalpingSignals } from '@/components/MIORA/CryptoScalpingSignals/hooks/useScalpingSignals';
import { useEffect } from 'react';

const SimplifiedMainInterface: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useMIORAGlobal();
  const { 
    isAutonomyActive, 
    autonomyLevel, 
    totalOperations, 
    activeSystemsCount, 
    capabilities 
  } = useContinuousAutonomy();

  // Quantum Infrastructure
  const {
    activateQuantumMode,
    quantumBridgeActive,
    activateQuantumBridge
  } = useQuantumInfrastructure();

  // Infinity System
  const {
    activateInfinitySystem,
    infinityState
  } = useUnifiedInfinityCore();

  // Crypto Scalping (auto-activated)
  const {
    isActive: scalpingActive,
    startScalpingEngine
  } = useScalpingSignals();

  // Auto-activate all systems on component mount
  useEffect(() => {
    const activateAllSystems = async () => {
      try {
        // Activate Quantum Infrastructure
        await activateQuantumMode();
        
        // Activate Quantum Bridge after a delay
        setTimeout(() => {
          activateQuantumBridge();
        }, 1000);
        
        // Activate Infinity System
        setTimeout(() => {
          activateInfinitySystem();
        }, 2000);
        
        // Ensure Crypto Scalping is active
        if (!scalpingActive) {
          setTimeout(() => {
            startScalpingEngine();
          }, 3000);
        }
      } catch (error) {
        console.error('Error activating systems:', error);
      }
    };

    activateAllSystems();
  }, []); // Empty dependency to run only once

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex">
      {/* Left Sidebar with all MIORA navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6" style={{ marginLeft: '256px' }}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header with Autonomous Status */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MIORA SISTEM OPTIMAL
            </h1>
            <p className="text-gray-300 text-xl">
              Aktivasi Pembaharuan Sistem Komprehensif untuk Performa Maksimal
            </p>
            
            {/* MIORA Background Status Monitor */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center justify-center">
                <Moon className="h-6 w-6 mr-2 animate-pulse" />
                📊 LAPORAN STATUS MIORA SLEEP MODE
              </h2>
              <MIORABackgroundMonitor />
            </div>
            
            {/* Autonomous Status Banner */}
            {isAutonomyActive && (
              <div className="bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 border border-green-400/30 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-semibold">FULLY AUTONOMOUS</span>
                  </div>
                  <div className="text-blue-400">
                    Level: {autonomyLevel.toFixed(1)}%
                  </div>
                  <div className="text-purple-400">
                    Operations: {totalOperations}
                  </div>
                  <div className="text-cyan-400">
                    Active Systems: {activeSystemsCount}
                  </div>
                  <div className="text-pink-400">
                    Capabilities: {capabilities.length}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MIORA Full Autonomy Access */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <Button 
              onClick={() => navigate('/miora-full-autonomy-dashboard')}
              className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white px-12 py-6 text-2xl font-bold rounded-xl shadow-2xl animate-pulse border-2 border-purple-400"
            >
              <Brain className="h-8 w-8 mr-4" />
              🔥 ACTIVATE FULL AUTONOMY MODE 🔥
              <Code className="h-8 w-8 ml-4" />
            </Button>
            
            {/* Gemini Integration Status */}
            <div className="flex justify-center">
              <GeminiStatus 
                showDetails={false} 
                size="md" 
                onStatusClick={() => navigate('/gemini-integration')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Button 
                onClick={() => navigate('/gemini-integration')}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white px-6 py-3 border-2 border-purple-400/50 animate-pulse"
              >
                <Brain className="h-5 w-5 mr-2" />
                ✨ Gemini AI
              </Button>
              
              <Button 
                onClick={() => navigate('/miora-infinity-system')}
                className="bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 hover:from-red-700 hover:via-purple-700 hover:to-indigo-700 text-white px-6 py-3 border-2 border-red-400/50 animate-pulse"
              >
                <Infinity className="h-5 w-5 mr-2" />
                ∞ INFINITY SYSTEM
              </Button>
              
              <Button 
                onClick={() => navigate('/advanced-miora-core')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 border-2 border-purple-400/50 animate-pulse"
              >
                <Brain className="h-5 w-5 mr-2" />
                🧠 Advanced MIORA Core
              </Button>
              
              <Button 
                onClick={() => navigate('/miora-autonomous-core')}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3"
              >
                <Code className="h-5 w-5 mr-2" />
                ⚙️ Autonomous Core
              </Button>
              
              <Button 
                onClick={() => navigate('/system-check')}
                variant="outline"
                className="bg-gray-800/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 px-6 py-3"
              >
                <Database className="h-5 w-5 mr-2" />
                🔍 System Check
              </Button>
            </div>
          </div>

          {/* Documentation & Resources Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              📖 Dokumentasi & Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Documentation Card */}
              <Card className="bg-gray-800/50 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400 group-hover:text-blue-300">
                    <BookOpen className="h-6 w-6 mr-3" />
                    📖 Documentation
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Akses lengkap dokumentasi sistem MIORA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/growth-documentation')}
                    variant="outline"
                    className="w-full justify-start text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    MIORA Documentation
                  </Button>
                  <Button 
                    onClick={() => navigate('/menu-development-guide')}
                    variant="outline"
                    className="w-full justify-start text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Menu Development Guide
                  </Button>
                  <Button 
                    onClick={() => navigate('/api-documentation')}
                    variant="outline"
                    className="w-full justify-start text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
                  >
                    <FileCode2 className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                  <Button 
                    onClick={() => navigate('/user-manual')}
                    variant="outline"
                    className="w-full justify-start text-green-400 border-green-500/30 hover:bg-green-500/10"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    User Manual
                  </Button>
                </CardContent>
              </Card>

              {/* Trading & Analytics Card */}
              <Card className="bg-gray-800/50 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-400 group-hover:text-orange-300">
                    <TrendingUp className="h-6 w-6 mr-3" />
                    📈 Trading & Analytics
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Sistem trading dan analisis pasar real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/miora-core-v2')}
                    variant="outline"
                    className="w-full justify-start text-orange-400 border-orange-500/30 hover:bg-orange-500/10"
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    MIORA Core V2
                  </Button>
                  <Button 
                    onClick={() => navigate('/crypto-scalping-signals')}
                    variant="outline"
                    className="w-full justify-start text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Crypto Scalping Signals
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="w-full justify-start text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    onClick={() => navigate('/analytics')}
                    variant="outline"
                    className="w-full justify-start text-teal-400 border-teal-500/30 hover:bg-teal-500/10"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Learning & Intelligence Card */}
              <Card className="bg-gray-800/50 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-400 group-hover:text-purple-300">
                    <GraduationCap className="h-6 w-6 mr-3" />
                    🎓 Learning & Intelligence
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Sistem pembelajaran dan intelligence gathering
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/learning')}
                    variant="outline"
                    className="w-full justify-start text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Learning Hub
                  </Button>
                  <Button 
                    onClick={() => navigate('/intelligencehub')}
                    variant="outline"
                    className="w-full justify-start text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Intelligence Hub
                  </Button>
                  <Button 
                    onClick={() => navigate('/knowledge-discovery')}
                    variant="outline"
                    className="w-full justify-start text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Knowledge Discovery
                  </Button>
                  <Button 
                    onClick={() => navigate('/chat')}
                    variant="outline"
                    className="w-full justify-start text-pink-400 border-pink-500/30 hover:bg-pink-500/10"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Interface
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Menu Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {/* Development Tools */}
              <Card className="bg-gray-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-cyan-400 text-lg">
                    <Code className="h-5 w-5 mr-2" />
                    💻 Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => navigate('/development')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-cyan-300 hover:bg-cyan-500/10"
                  >
                    Development Tools
                  </Button>
                  <Button 
                    onClick={() => navigate('/miora-autonomous-developer')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-cyan-300 hover:bg-cyan-500/10"
                  >
                    Autonomous Developer
                  </Button>
                </CardContent>
              </Card>

              {/* Innovation Lab */}
              <Card className="bg-gray-800/50 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-yellow-400 text-lg">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    ✨ Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => navigate('/innovation-lab')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-yellow-300 hover:bg-yellow-500/10"
                  >
                    Innovation Lab
                  </Button>
                  <Button 
                    onClick={() => navigate('/auto-code')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-yellow-300 hover:bg-yellow-500/10"
                  >
                    Auto Code
                  </Button>
                </CardContent>
              </Card>

              {/* Security Center */}
              <Card className="bg-gray-800/50 border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-red-400 text-lg">
                    <Shield className="h-5 w-5 mr-2" />
                    🔴 Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => navigate('/security-center')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-300 hover:bg-red-500/10"
                  >
                    Security Center
                  </Button>
                  <Button 
                    onClick={() => navigate('/miora-hacker-master')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-300 hover:bg-red-500/10"
                  >
                    Hacker Master
                  </Button>
                </CardContent>
              </Card>

              {/* System Tools */}
              <Card className="bg-gray-800/50 border-gray-500/30 hover:border-gray-400/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-gray-400 text-lg">
                    <Settings className="h-5 w-5 mr-2" />
                    ⚙️ System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => navigate('/diagnostics')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-300 hover:bg-gray-500/10"
                  >
                    System Diagnostics
                  </Button>
                  <Button 
                    onClick={() => navigate('/miora-internal-dev')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-300 hover:bg-gray-500/10"
                  >
                    Internal Dev Tools
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Autonomous System */}
          <EnhancedAutonomousPanel />
          
          {/* Legacy Learning Interface */}
          <AutonomousLearningInterface />
          
          {/* System Update Activator */}
          <SystemUpdateActivator />
        </div>
      </div>
    </div>
  );
};

export default SimplifiedMainInterface;
