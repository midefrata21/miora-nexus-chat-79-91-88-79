import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Brain, Zap, Menu, Settings, Code, Infinity, Target, Bot } from 'lucide-react';
import { AutonomousStatus } from '@/components/MIORA/AutonomousStatus';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header dengan Menu Navigation */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 mb-4">
            MIORA
          </h1>
          <p className="text-gray-300 text-2xl mb-8">
            Advanced AI Voice Communication System with Autonomous Development
          </p>
          
          {/* Quick Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/main-interface">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                <Menu className="w-4 h-4 mr-2" />
                Main Interface
              </Button>
            </Link>
            <Link to="/miora">
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                <Settings className="w-4 h-4 mr-2" />
                MIORA Core
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-800/30 to-cyan-800/30 border-purple-500/30 hover:border-purple-400/60 transition-all">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Mic className="w-6 h-6" />
                Voice Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Basic voice interface with Whisper.cpp + Coqui TTS integration
              </p>
              <Link to="/voice-interface">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Launch Interface
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-800/30 to-blue-800/30 border-cyan-500/30 hover:border-cyan-400/60 transition-all">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Two-Way Voice System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Advanced two-way voice communication with continuous conversation
              </p>
              <Link to="/miora-voice-system">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Launch System
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 border-green-500/30 hover:border-green-400/60 transition-all">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Start with the Two-Way Voice System for full MIORA experience
              </p>
              <Link to="/miora-voice-system">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Quick Start
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Autonomous Status Display */}
        <div className="mt-8 max-w-md mx-auto">
          <AutonomousStatus />
        </div>

        {/* Enhanced: Autonomous Development Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🤖 Advanced Autonomous Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/autonomous-development" className="group">
              <Card className="bg-gradient-to-br from-orange-800/30 to-red-800/30 border-orange-500/30 hover:border-orange-400/60 transition-all group-hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-orange-300 flex items-center gap-2">
                    <Bot className="w-6 h-6" />
                    Autonomous Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm">
                    Pembelajaran mandiri dan pengembangan skill otomatis
                  </p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Access System
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/infinity-prompt-system" className="group">
              <Card className="bg-gradient-to-br from-pink-800/30 to-purple-800/30 border-pink-500/30 hover:border-pink-400/60 transition-all group-hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-pink-300 flex items-center gap-2">
                    <Infinity className="w-6 h-6" />
                    Infinity Prompt System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm">
                    Sistem prompt tanpa batas untuk pengembangan advanced
                  </p>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    Launch Infinity
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/autonomous-strategic-core" className="group">
              <Card className="bg-gradient-to-br from-cyan-800/30 to-blue-800/30 border-cyan-500/30 hover:border-cyan-400/60 transition-all group-hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-cyan-300 flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    Strategic Core
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm">
                    AI Planning Engine + Real-Time Strategy Execution
                  </p>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Launch Strategic AI
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/quantum-upgrade" className="group">
              <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-purple-500/30 hover:border-purple-400/60 transition-all group-hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Quantum Upgrade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm">
                    MIORA vNext Evolution - Quantum Intelligence Level
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Start Evolution
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Enhanced Navigation Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/miora" className="group">
            <Card className="bg-gradient-to-br from-blue-800/30 to-purple-800/30 border-blue-500/30 hover:border-blue-400/60 transition-all group-hover:scale-105">
              <CardContent className="p-4 text-center">
                <Brain className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">MIORA Core</h3>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/miora-infinity" className="group">
            <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-500/30 hover:border-purple-400/60 transition-all group-hover:scale-105">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Infinity Core</h3>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/long-memory" className="group">
            <Card className="bg-gradient-to-br from-cyan-800/30 to-teal-800/30 border-cyan-500/30 hover:border-cyan-400/60 transition-all group-hover:scale-105">
              <CardContent className="p-4 text-center">
                <Brain className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Long Memory</h3>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/diagnostics" className="group">
            <Card className="bg-gradient-to-br from-orange-800/30 to-red-800/30 border-orange-500/30 hover:border-orange-400/60 transition-all group-hover:scale-105">
              <CardContent className="p-4 text-center">
                <Settings className="w-8 h-8 text-orange-300 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-sm">Diagnostics</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/30 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">🎤 MIORA Voice Commands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-cyan-300 mb-2">System Control:</h3>
              <ul className="space-y-1 text-sm">
                <li>• "MIORA, jalankan sistem dua arah suara sekarang"</li>
                <li>• "MIORA, diam dulu" (Stop listening)</li>
                <li>• "MIORA, lanjut bicara" (Resume)</li>
                <li>• "MIORA, restart sistem suara" (Reset)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-300 mb-2">Autonomous Development:</h3>
              <ul className="space-y-1 text-sm">
                <li>• "MIORA, aktifkan autonomous learning"</li>
                <li>• "MIORA, buat prompt command baru"</li>
                <li>• "MIORA, mulai self-development"</li>
                <li>• "MIORA, infinity mode active"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
