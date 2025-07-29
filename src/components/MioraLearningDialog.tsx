
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Zap, Target, Users, MessageSquare } from 'lucide-react';

interface LearningCommand {
  id: string;
  command: string;
  description: string;
  category: 'knowledge' | 'skill' | 'behavior' | 'memory';
  example: string;
}

interface MioraLearningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLearningSubmit: (command: string, input: string) => void;
}

const MioraLearningDialog: React.FC<MioraLearningDialogProps> = ({
  isOpen,
  onClose,
  onLearningSubmit
}) => {
  const [selectedCommand, setSelectedCommand] = useState<LearningCommand | null>(null);
  const [learningInput, setLearningInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('knowledge');

  const learningCommands: LearningCommand[] = [
    {
      id: 'learn-concept',
      command: '/learn-concept',
      description: 'Pelajari konsep atau topik baru',
      category: 'knowledge',
      example: 'Pelajari tentang blockchain dan cryptocurrency'
    },
    {
      id: 'practice-skill',
      command: '/practice-skill',
      description: 'Latih kemampuan spesifik',
      category: 'skill',
      example: 'Latih analisis teknikal untuk trading'
    },
    {
      id: 'adapt-behavior',
      command: '/adapt-behavior',
      description: 'Sesuaikan gaya komunikasi atau respon',
      category: 'behavior',
      example: 'Lebih fokus pada solusi praktis'
    },
    {
      id: 'store-memory',
      command: '/store-memory',
      description: 'Simpan informasi penting ke memori jangka panjang',
      category: 'memory',
      example: 'Simpan preferensi trading Master Midya'
    },
    {
      id: 'analyze-pattern',
      command: '/analyze-pattern',
      description: 'Analisis pola dari interaksi sebelumnya',
      category: 'skill',
      example: 'Analisis pola pertanyaan untuk optimasi respon'
    },
    {
      id: 'expand-knowledge',
      command: '/expand-knowledge',
      description: 'Perluas pengetahuan di bidang tertentu',
      category: 'knowledge',
      example: 'Perluas pengetahuan tentang AI dan machine learning'
    }
  ];

  const categoryIcons = {
    knowledge: BookOpen,
    skill: Zap,
    behavior: Users,
    memory: Brain
  };

  const categoryColors = {
    knowledge: 'bg-blue-500/20 text-blue-400 border-blue-400/50',
    skill: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50',
    behavior: 'bg-green-500/20 text-green-400 border-green-400/50',
    memory: 'bg-purple-500/20 text-purple-400 border-purple-400/50'
  };

  const filteredCommands = learningCommands.filter(cmd => 
    activeCategory === 'all' || cmd.category === activeCategory
  );

  const handleSubmitLearning = () => {
    if (selectedCommand && learningInput.trim()) {
      onLearningSubmit(selectedCommand.command, learningInput);
      setLearningInput('');
      setSelectedCommand(null);
      onClose();
    }
  };

  const handleQuickCommand = (command: LearningCommand) => {
    setSelectedCommand(command);
    setLearningInput(command.example);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900/95 border-cyan-500/30 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            MIORA Live Learning Communication
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Sistem pembelajaran interaktif untuk pengembangan AI mandiri. Pilih perintah pembelajaran untuk mengoptimalkan kemampuan MIORA.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`${
                  activeCategory === category 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-800/50 text-gray-300 border-gray-600'
                } hover:bg-cyan-500/80`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Learning Commands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCommands.map((command) => {
              const IconComponent = categoryIcons[command.category];
              return (
                <div
                  key={command.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedCommand?.id === command.id
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-cyan-400/20'
                      : 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => handleQuickCommand(command)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                      <code className="text-sm font-mono text-cyan-300">{command.command}</code>
                    </div>
                    <Badge className={`text-xs ${categoryColors[command.category]}`}>
                      {command.category}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{command.description}</p>
                  <p className="text-gray-500 text-xs italic">Contoh: {command.example}</p>
                </div>
              );
            })}
          </div>

          {/* Learning Input Section */}
          {selectedCommand && (
            <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-300">
                  Perintah Pembelajaran: {selectedCommand.command}
                </h3>
              </div>
              
              <Textarea
                placeholder="Masukkan detail pembelajaran atau modifikasi dari contoh..."
                value={learningInput}
                onChange={(e) => setLearningInput(e.target.value)}
                className="min-h-[100px] bg-gray-900/50 border-gray-600 text-gray-200 placeholder-gray-500"
              />
              
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitLearning}
                  disabled={!learningInput.trim()}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Kirim Pembelajaran
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCommand(null);
                    setLearningInput('');
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
                >
                  Reset
                </Button>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-lg border border-purple-500/30">
            <h4 className="text-cyan-300 font-semibold mb-2">💡 Tips Pembelajaran Interaktif:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Gunakan perintah spesifik untuk hasil pembelajaran yang optimal</li>
              <li>• Kombinasikan berbagai kategori untuk pengembangan holistik</li>
              <li>• Review memori jangka panjang secara berkala untuk konsistensi</li>
              <li>• Berikan feedback untuk adaptasi berkelanjutan</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MioraLearningDialog;
