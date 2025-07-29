
import React from 'react';
import { Button } from '@/components/ui/button';
import { BrainCircuit, TrendingUp, GraduationCap, Zap, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MioraMode = 'casual' | 'trading' | 'education' | 'motivation' | 'technical';

interface ModeSelectorProps {
  currentMode: MioraMode;
  onModeSwitch: (mode: MioraMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeSwitch }) => {
  const { toast } = useToast();

  const handleModeClick = (mode: MioraMode) => {
    try {
      onModeSwitch(mode);
      toast({
        title: `🧠 Mode Switch: ${getModeDisplayName(mode)}`,
        description: `MIORA sekarang dioptimalkan untuk tugas ${mode}`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Mode switch error:', error);
      toast({
        title: "⚠️ Error Mode Switch",
        description: "Tidak dapat beralih mode. Coba lagi.",
        variant: "destructive",
      });
    }
  };

  const getModeDisplayName = (mode: MioraMode) => {
    const modeNames = {
      casual: 'Asisten Ramah',
      trading: 'Analis Trading', 
      education: 'Mentor Belajar',
      motivation: 'Coach Sukses',
      technical: 'Ahli Teknis'
    };
    return modeNames[mode];
  };

  const modeButtons = [
    { 
      mode: 'casual' as MioraMode, 
      icon: BrainCircuit, 
      label: 'Asisten', 
      color: 'from-indigo-500 to-purple-600',
      description: 'Mode percakapan santai dan ramah' 
    },
    { 
      mode: 'trading' as MioraMode, 
      icon: TrendingUp, 
      label: 'Trading', 
      color: 'from-green-500 to-blue-600',
      description: 'Analisis pasar dan strategi trading'
    },
    { 
      mode: 'education' as MioraMode, 
      icon: GraduationCap, 
      label: 'Edukasi', 
      color: 'from-purple-500 to-pink-600',
      description: 'Pembelajaran dan penjelasan konsep'
    },
    { 
      mode: 'motivation' as MioraMode, 
      icon: Zap, 
      label: 'Motivasi', 
      color: 'from-orange-500 to-red-600',
      description: 'Coaching dan motivasi personal'
    },
    { 
      mode: 'technical' as MioraMode, 
      icon: Code, 
      label: 'Teknis', 
      color: 'from-cyan-500 to-blue-600',
      description: 'Pemrograman dan solusi teknis'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <h3 className="text-center text-gray-300 text-sm mb-4 font-medium">Pilih Mode MIORA Assistant</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {modeButtons.map(({ mode, icon: Icon, label, color, description }) => (
          <Button
            key={mode}
            onClick={() => handleModeClick(mode)}
            variant={currentMode === mode ? 'default' : 'outline'}
            className={`${currentMode === mode 
              ? `bg-gradient-to-r ${color} text-white border-0 shadow-lg scale-105` 
              : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:scale-102'
            } transition-all duration-300 px-4 py-6 flex-col h-auto min-h-[80px] group relative`}
            title={description}
          >
            <Icon className={`w-6 h-6 mb-2 ${currentMode === mode ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform`} />
            <span className="text-sm font-medium">{label}</span>
            {currentMode === mode && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
