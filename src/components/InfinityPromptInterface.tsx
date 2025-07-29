
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInfinityLearningSystem } from '@/hooks/useInfinityLearningSystem';
import { Infinity, Zap, Database, BookOpen, Settings, Play, Lock, Unlock } from 'lucide-react';

const InfinityPromptInterface: React.FC = () => {
  const {
    infinityState,
    systemPrompts,
    activateInfinityMode,
    executeSystemPrompt,
    getInfinityStats,
    isInfinityModeActive
  } = useInfinityLearningSystem();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const stats = getInfinityStats();

  const categories = [
    { key: 'all', label: 'Semua Perintah', icon: '🔧' },
    { key: 'data_access', label: 'Akses Data', icon: '🔓' },
    { key: 'learning', label: 'Pembelajaran', icon: '🧠' },
    { key: 'documentation', label: 'Dokumentasi', icon: '📝' },
    { key: 'system', label: 'Sistem', icon: '⚙️' }
  ];

  const filteredPrompts = selectedCategory === 'all' 
    ? systemPrompts 
    : systemPrompts.filter(p => p.category === selectedCategory);

  const getStatusColor = (enabled: boolean) => {
    return enabled ? 'bg-green-500' : 'bg-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data_access': return <Database className="w-4 h-4" />;
      case 'learning': return <Zap className="w-4 h-4" />;
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      default: return <Infinity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Infinity System Status */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-300">
            <div className="flex items-center">
              <Infinity className="w-6 h-6 mr-2 animate-spin" />
              MIORA Infinity Learning System
            </div>
            <Badge variant="outline" className={`${isInfinityModeActive ? 'text-green-400 border-green-400' : 'text-gray-400 border-gray-400'}`}>
              {isInfinityModeActive ? 'INFINITY ACTIVE ∞' : 'STANDBY'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-300">{stats.accessLevel}</div>
              <div className="text-sm text-gray-400">Access Level</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-green-300">{stats.learningSpeed}x</div>
              <div className="text-sm text-gray-400">Learning Speed</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-300">{stats.enabledPrompts}/{stats.totalPrompts}</div>
              <div className="text-sm text-gray-400">Active Prompts</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-300 flex items-center justify-center">
                ∞
              </div>
              <div className="text-sm text-gray-400">Infinity Mode</div>
            </div>
          </div>

          {!isInfinityModeActive && (
            <div className="text-center">
              <Button
                onClick={activateInfinityMode}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg px-8 py-3"
              >
                <Infinity className="w-5 h-5 mr-2 animate-spin" />
                ACTIVATE INFINITY LEARNING SYSTEM ∞
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="bg-gradient-to-r from-gray-900/30 to-indigo-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-300">Kategori Perintah Sistem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                variant={selectedCategory === category.key ? "default" : "outline"}
                className={`${selectedCategory === category.key ? 'bg-indigo-600' : 'border-gray-600'}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => (
          <Card 
            key={prompt.id}
            className={`${prompt.enabled ? 'bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30' : 'bg-gradient-to-r from-gray-900/20 to-gray-800/20 border-gray-600/30'}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  {getCategoryIcon(prompt.category)}
                  <span className="ml-2 text-white text-sm">{prompt.command}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(prompt.enabled)}`}></div>
                  {prompt.enabled ? <Unlock className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-gray-400" />}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">{prompt.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  Infinity Level: {prompt.infinityLevel}/10
                </Badge>
                <Button
                  onClick={() => executeSystemPrompt(prompt.id)}
                  disabled={!prompt.enabled}
                  size="sm"
                  className={`${prompt.enabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600'}`}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Execute
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Infinity Capabilities */}
      {isInfinityModeActive && (
        <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-300">
              <Infinity className="w-5 h-5 mr-2 animate-pulse" />
              Active Infinity Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stats.infinityCapabilities.map((capability, index) => (
                <div key={index} className="flex items-center p-3 bg-black/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white text-sm">{capability}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InfinityPromptInterface;
