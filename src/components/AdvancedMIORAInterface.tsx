import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAdvancedMIORACore } from '@/hooks/useAdvancedMIORACore';
import { 
  Brain, 
  Zap, 
  Infinity, 
  Target, 
  TrendingUp, 
  Lock, 
  Unlock,
  Sparkles,
  Crown,
  Star,
  Atom,
  Eye,
  Layers
} from 'lucide-react';

const AdvancedMIORAInterface: React.FC = () => {
  const {
    mioraState,
    depthLevels,
    deepCapabilities,
    evolveToNextLevel,
    enhanceCognitiveSystem,
    upgradeSystemIntegration,
    activateDeepCapability,
    checkLevelRequirements,
    getCurrentLevelInfo,
    getAvailableUpgrades,
    getSystemOverallPower
  } = useAdvancedMIORACore();

  const [selectedCategory, setSelectedCategory] = useState<string>('overview');
  const currentLevel = getCurrentLevelInfo();
  const availableUpgrades = getAvailableUpgrades();
  const systemPower = getSystemOverallPower();

  const categories = [
    { key: 'overview', label: 'System Overview', icon: <Eye className="w-4 h-4" /> },
    { key: 'cognitive', label: 'Cognitive Evolution', icon: <Brain className="w-4 h-4" /> },
    { key: 'integration', label: 'System Integration', icon: <Layers className="w-4 h-4" /> },
    { key: 'capabilities', label: 'Deep Capabilities', icon: <Atom className="w-4 h-4" /> },
    { key: 'evolution', label: 'Level Evolution', icon: <Crown className="w-4 h-4" /> }
  ];

  const getLevelStatusColor = (level: number) => {
    if (level <= mioraState.currentDepthLevel) return 'text-green-400 border-green-400';
    if (level <= mioraState.maxUnlockedLevel + 1) return 'text-yellow-400 border-yellow-400';
    return 'text-gray-400 border-gray-600';
  };

  const getCognitiveColor = (value: number) => {
    if (value >= 80) return 'text-purple-400';
    if (value >= 60) return 'text-blue-400';
    if (value >= 40) return 'text-green-400';
    return 'text-yellow-400';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-300">
            <div className="flex items-center">
              <Crown className="w-6 h-6 mr-2" />
              MIORA Advanced Intelligence Core
            </div>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              Level {mioraState.currentDepthLevel}: {currentLevel?.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-300">{systemPower}</div>
              <div className="text-sm text-gray-400">System Power</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-300">{mioraState.currentDepthLevel}/7</div>
              <div className="text-sm text-gray-400">Depth Level</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-green-300">{mioraState.activePowers.length}</div>
              <div className="text-sm text-gray-400">Active Powers</div>
            </div>
            <div className="text-center p-3 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-300">{mioraState.emergentCapabilities.length}</div>
              <div className="text-sm text-gray-400">Emergent Capabilities</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Powers */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-green-300">
            <Sparkles className="w-5 h-5 mr-2" />
            Active Powers & Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mioraState.activePowers.slice(0, 8).map((power, index) => (
              <div key={index} className="flex items-center p-3 bg-black/20 rounded-lg">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-white text-sm">{power}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCognitive = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Brain className="w-5 h-5 mr-2" />
            Cognitive Evolution Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(mioraState.cognitiveEvolution).map(([system, value]) => (
              <div key={system} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white capitalize">{system.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`font-bold ${getCognitiveColor(value)}`}>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
                <Button
                  size="sm"
                  onClick={() => enhanceCognitiveSystem(system as any, 5)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Enhance {system.replace(/([A-Z])/g, ' $1')}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegration = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-300">
            <Layers className="w-5 h-5 mr-2" />
            System Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(mioraState.systemIntegration).map(([system, value]) => (
              <div key={system} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white capitalize">{system.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`font-bold ${getCognitiveColor(value)}`}>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
                <Button
                  size="sm"
                  onClick={() => upgradeSystemIntegration(system as any, 5)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Upgrade {system.replace(/([A-Z])/g, ' $1')}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCapabilities = () => (
    <div className="space-y-6">
      {Object.entries(deepCapabilities).map(([category, capabilities]) => (
        <Card key={category} className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-300 capitalize">
              {category.replace(/([A-Z])/g, ' $1')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(capabilities).map(([name, config]) => (
                <div key={name} className={`p-4 rounded-lg border ${config.active ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-900/20 border-gray-600/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">{name}</h4>
                    {config.active ? <Unlock className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      Level {config.level}
                    </Badge>
                    <span className="text-purple-400 text-sm">Power: {config.power}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => activateDeepCapability(category, name)}
                    disabled={config.active || config.level > mioraState.currentDepthLevel}
                    className={`w-full ${config.active ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    {config.active ? 'Active' : 'Activate'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEvolution = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-yellow-300">
            <div className="flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Evolution Path
            </div>
            <Button
              onClick={evolveToNextLevel}
              disabled={!checkLevelRequirements(mioraState.maxUnlockedLevel + 1)}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Star className="w-4 h-4 mr-1" />
              Evolve to Next Level
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {depthLevels.map((level) => (
              <div key={level.level} className={`p-4 rounded-lg border ${getLevelStatusColor(level.level).includes('green') ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-900/20 border-gray-600/30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold">Level {level.level}: {level.name}</h3>
                  <Badge variant="outline" className={getLevelStatusColor(level.level)}>
                    {level.level <= mioraState.currentDepthLevel ? 'ACTIVE' : level.level <= mioraState.maxUnlockedLevel + 1 ? 'AVAILABLE' : 'LOCKED'}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                  <div className="text-sm">
                    <span className="text-gray-400">Capacity: </span>
                    <span className="text-cyan-300">{level.cognitiveCapacity}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Learning Rate: </span>
                    <span className="text-green-300">{level.learningRate}x</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Autonomy: </span>
                    <span className="text-purple-300">{level.autonomyLevel}%</span>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="text-gray-400 text-sm mb-1">Capabilities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {level.capabilities.map((cap, index) => (
                      <Badge key={index} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Requirements:</h4>
                  <div className="flex flex-wrap gap-1">
                    {level.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Navigation */}
      <Card className="bg-gradient-to-r from-gray-900/30 to-indigo-900/30 border-indigo-500/30">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                variant={selectedCategory === category.key ? "default" : "outline"}
                className={`${selectedCategory === category.key ? 'bg-indigo-600' : 'border-gray-600'}`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {selectedCategory === 'overview' && renderOverview()}
      {selectedCategory === 'cognitive' && renderCognitive()}
      {selectedCategory === 'integration' && renderIntegration()}
      {selectedCategory === 'capabilities' && renderCapabilities()}
      {selectedCategory === 'evolution' && renderEvolution()}
    </div>
  );
};

export default AdvancedMIORAInterface;