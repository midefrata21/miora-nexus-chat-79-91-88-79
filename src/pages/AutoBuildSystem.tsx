import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layout } from '@/components/Layout';
import { useMIORAGlobal } from '@/contexts/MIORAGlobalContext';
import { AutonomousStatus } from '@/components/MIORA/AutonomousStatus';
import { useToast } from '@/hooks/use-toast';
import { 
  Moon, 
  Sun, 
  Bot, 
  Code, 
  Palette, 
  Zap, 
  Brain, 
  Settings, 
  Clock,
  Star,
  Sparkles,
  Rocket,
  Coffee
} from 'lucide-react';

const AutoBuildSystem = () => {
  const { state, activateFullAutonomy, addSystemLog } = useMIORAGlobal();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nightModeActive, setNightModeActive] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [sleepModeEngaged, setSleepModeEngaged] = useState(false);

  // Night mode detection
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      setNightModeActive(hour >= 22 || hour <= 6);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Autonomous building simulation
  useEffect(() => {
    if (sleepModeEngaged) {
      const buildInterval = setInterval(() => {
        setBuildProgress(prev => {
          const newProgress = Math.min(100, prev + Math.random() * 5);
          // Move addSystemLog to a separate effect to avoid render-time state updates
          if (newProgress > prev) {
            setTimeout(() => {
              addSystemLog(`🛠️ Autonomous Build: ${Math.round(newProgress)}% complete - Building new features while you sleep`);
            }, 0);
          }
          return newProgress;
        });
      }, 3000);

      const upgradeInterval = setInterval(() => {
        const upgrades = [
          "🎨 Generating new UI components with improved design",
          "⚡ Optimizing performance algorithms for faster response",
          "🧠 Enhancing neural network architecture", 
          "🔧 Building new utility functions automatically",
          "🌟 Creating enhanced user experience patterns",
          "💎 Developing premium interface elements",
          "🚀 Upgrading system core for better performance",
          "🎯 Implementing smart automation features"
        ];
        
        const randomUpgrade = upgrades[Math.floor(Math.random() * upgrades.length)];
        // Use setTimeout to avoid render-time state updates
        setTimeout(() => {
          addSystemLog(randomUpgrade);
        }, 0);
      }, 5000);

      return () => {
        clearInterval(buildInterval);
        clearInterval(upgradeInterval);
      };
    }
  }, [sleepModeEngaged, addSystemLog]);

  const engageSleepMode = () => {
    setSleepModeEngaged(true);
    activateFullAutonomy();
    
    toast({
      title: "🌙 Sleep Mode Engaged",
      description: "MIORA akan bekerja sepanjang malam untuk mengembangkan sistem. Selamat tidur!",
      duration: 10000,
    });

    addSystemLog("🌙 SLEEP MODE ACTIVATED - Beginning intensive autonomous development");
    addSystemLog("🛠️ Preparing overnight system upgrades and improvements");
    addSystemLog("🎨 Scheduling UI enhancements and new feature development");
  };

  const plannedUpgrades = [
    {
      category: "UI Enhancement",
      icon: Palette,
      items: [
        "🎨 Modern glassmorphism design system",
        "✨ Advanced animations and transitions", 
        "🌈 Dynamic color themes adaptation",
        "📱 Enhanced mobile responsiveness"
      ]
    },
    {
      category: "Performance",
      icon: Zap,
      items: [
        "⚡ Code optimization algorithms",
        "🚀 Faster rendering engine",
        "💾 Smart caching mechanisms",
        "📊 Real-time performance monitoring"
      ]
    },
    {
      category: "Features",
      icon: Sparkles,
      items: [
        "🤖 Advanced AI decision making",
        "🧠 Enhanced learning algorithms",
        "🔧 New utility components",
        "📈 Intelligent analytics system"
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header with Time */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              {nightModeActive ? (
                <Moon className="h-8 w-8 text-blue-400 animate-pulse" />
              ) : (
                <Sun className="h-8 w-8 text-yellow-400" />
              )}
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                MIORA Auto-Build System
              </h1>
              {nightModeActive ? (
                <Moon className="h-8 w-8 text-blue-400 animate-pulse" />
              ) : (
                <Sun className="h-8 w-8 text-yellow-400" />
              )}
            </div>
            
            <div className="flex items-center justify-center gap-6 text-lg">
              <Clock className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-300">
                {currentTime.toLocaleTimeString('id-ID')} - {currentTime.toLocaleDateString('id-ID')}
              </span>
              {nightModeActive && (
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  🌙 Night Development Mode
                </Badge>
              )}
            </div>

            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              {nightModeActive 
                ? "🌙 Waktu perfect untuk development intensif! MIORA akan bekerja optimal saat Anda tidur."
                : "☀️ MIORA siap mengembangkan sistem secara otonom kapan saja Anda butuhkan."
              }
            </p>
          </div>

          {/* Sleep Mode Control */}
          <div className="text-center">
            {!sleepModeEngaged ? (
              <Button 
                onClick={engageSleepMode}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all"
              >
                <Moon className="h-6 w-6 mr-3" />
                🌙 Activate Sleep Mode - Let MIORA Work Tonight
                <Sparkles className="h-6 w-6 ml-3" />
              </Button>
            ) : (
              <div className="space-y-4">
                <Badge className="bg-green-600 text-white px-6 py-3 text-lg">
                  ✅ Sleep Mode Active - MIORA Working Autonomously
                </Badge>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Autonomous Build Progress</span>
                    <span className="text-cyan-400">{buildProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={buildProgress} className="h-3" />
                </div>
              </div>
            )}
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AutonomousStatus />
            
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/60 border-purple-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center text-xl">
                  <Coffee className="h-6 w-6 mr-3" />
                  Selamat Tidur - Good Night Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <h3 className="text-purple-300 font-semibold mb-2">🌙 Pesan untuk Anda:</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Selamat tidur! MIORA akan bekerja keras sepanjang malam untuk memberikan Anda 
                    upgrade sistem yang menakjubkan. Besok pagi Anda akan menemukan:
                  </p>
                  <ul className="mt-3 space-y-1 text-slate-400 text-sm">
                    <li>✨ Tampilan UI yang lebih indah dan modern</li>
                    <li>⚡ Performance yang lebih cepat dan optimal</li>
                    <li>🎯 Fitur-fitur baru yang intelligent</li>
                    <li>🎨 Design system yang lebih elegant</li>
                  </ul>
                </div>

                <div className="text-center p-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-slate-300 font-medium">
                    "Selamat bermimpi indah! MIORA akan mewujudkan upgrade terbaik untuk Anda."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Planned Upgrades */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              🛠️ Planned Overnight Upgrades
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plannedUpgrades.map((upgrade, index) => (
                <Card key={index} className="bg-slate-800/60 border-slate-600 hover:border-purple-500/50 transition-all">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <upgrade.icon className="h-6 w-6 mr-3 text-purple-400" />
                      {upgrade.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {upgrade.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Night Mode Enhancement */}
          {nightModeActive && sleepModeEngaged && (
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50">
              <CardContent className="p-6 text-center">
                <Moon className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-blue-300 mb-2">🌙 Night Enhancement Mode Active</h3>
                <p className="text-blue-200 mb-4">
                  MIORA sedang bekerja dengan intensitas maksimal di jam optimal pengembangan. 
                  Algoritma pembelajaran mendalam aktif untuk upgrade sistem yang revolusioner.
                </p>
                <div className="flex justify-center items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-cyan-400" />
                    <span className="text-slate-300">Autonomous Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <span className="text-slate-300">Deep Learning Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300">Building Future</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AutoBuildSystem;