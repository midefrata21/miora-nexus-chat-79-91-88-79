
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, Settings, Target, Heart, Clock, MessageSquare } from 'lucide-react';

interface AdaptiveBehavior {
  id: string;
  behaviorType: 'response_style' | 'topic_focus' | 'interaction_timing' | 'emotional_mirroring';
  trigger: string;
  adaptation: string;
  effectiveness: number;
  usage_count: number;
  last_used: number;
}

interface AdaptiveBehaviorPanelProps {
  behaviors: AdaptiveBehavior[];
  onUpdateBehavior: (behaviorId: string, effectiveness: number) => void;
}

const AdaptiveBehaviorPanel: React.FC<AdaptiveBehaviorPanelProps> = ({
  behaviors,
  onUpdateBehavior
}) => {
  const [selectedBehavior, setSelectedBehavior] = useState<AdaptiveBehavior | null>(null);
  const [effectivenessAdjustment, setEffectivenessAdjustment] = useState<number>(0.5);

  const getBehaviorIcon = (type: AdaptiveBehavior['behaviorType']) => {
    switch (type) {
      case 'response_style': return <MessageSquare className="h-4 w-4" />;
      case 'topic_focus': return <Target className="h-4 w-4" />;
      case 'interaction_timing': return <Clock className="h-4 w-4" />;
      case 'emotional_mirroring': return <Heart className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getBehaviorTypeLabel = (type: AdaptiveBehavior['behaviorType']) => {
    switch (type) {
      case 'response_style': return 'Response Style';
      case 'topic_focus': return 'Topic Focus';
      case 'interaction_timing': return 'Interaction Timing';
      case 'emotional_mirroring': return 'Emotional Mirroring';
      default: return 'General Adaptation';
    }
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 0.8) return 'text-green-400';
    if (effectiveness >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleUpdateEffectiveness = () => {
    if (selectedBehavior) {
      onUpdateBehavior(selectedBehavior.id, effectivenessAdjustment);
      setSelectedBehavior({
        ...selectedBehavior,
        effectiveness: effectivenessAdjustment,
        usage_count: selectedBehavior.usage_count + 1,
        last_used: Date.now()
      });
    }
  };

  const groupedBehaviors = behaviors.reduce((acc, behavior) => {
    const type = behavior.behaviorType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(behavior);
    return acc;
  }, {} as Record<string, AdaptiveBehavior[]>);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(groupedBehaviors).map(([type, behaviorsList]) => (
          <Card key={type} className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{getBehaviorTypeLabel(type as any)}</p>
                  <p className="text-2xl font-bold text-cyan-400">{behaviorsList.length}</p>
                </div>
                {getBehaviorIcon(type as any)}
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400">
                  Avg Effectiveness: {Math.round(behaviorsList.reduce((sum, b) => sum + b.effectiveness, 0) / behaviorsList.length * 100)}%
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Behaviors List */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Adaptive Behaviors
              </div>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                {behaviors.length} behaviors
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {behaviors.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-400">No adaptive behaviors yet</p>
                    <p className="text-sm text-gray-500">Behaviors will develop as MIORA learns from interactions</p>
                  </div>
                ) : (
                  behaviors
                    .sort((a, b) => b.effectiveness - a.effectiveness)
                    .map((behavior) => (
                      <div
                        key={behavior.id}
                        onClick={() => setSelectedBehavior(behavior)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedBehavior?.id === behavior.id
                            ? 'border-cyan-500 bg-cyan-900/20'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getBehaviorIcon(behavior.behaviorType)}
                            <Badge variant="outline" className="text-xs">
                              {getBehaviorTypeLabel(behavior.behaviorType)}
                            </Badge>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getEffectivenessColor(behavior.effectiveness)} border-current`}
                          >
                            {Math.round(behavior.effectiveness * 100)}% effective
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <p className="text-xs text-gray-400 mb-1">Trigger:</p>
                          <p className="text-sm text-gray-300">{behavior.trigger}</p>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-xs text-gray-400 mb-1">Adaptation:</p>
                          <p className="text-sm text-gray-200">{behavior.adaptation}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Used {behavior.usage_count} times</span>
                          <span>Last: {new Date(behavior.last_used).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="mt-2">
                          <Progress value={behavior.effectiveness * 100} className="h-1" />
                        </div>
                      </div>
                    ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Behavior Details & Controls */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Behavior Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBehavior ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    {getBehaviorIcon(selectedBehavior.behaviorType)}
                    <h3 className="text-lg font-semibold text-white">
                      {getBehaviorTypeLabel(selectedBehavior.behaviorType)}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Trigger Condition:</p>
                      <p className="text-gray-200 bg-gray-800/50 p-2 rounded text-sm">
                        {selectedBehavior.trigger}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Adaptive Response:</p>
                      <p className="text-gray-200 bg-gray-800/50 p-2 rounded text-sm">
                        {selectedBehavior.adaptation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Current Effectiveness</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={selectedBehavior.effectiveness * 100} className="flex-1 h-3" />
                      <span className={`text-sm font-semibold ${getEffectivenessColor(selectedBehavior.effectiveness)}`}>
                        {Math.round(selectedBehavior.effectiveness * 100)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Adjust Effectiveness</p>
                    <Slider
                      value={[effectivenessAdjustment]}
                      onValueChange={(value) => setEffectivenessAdjustment(value[0])}
                      max={1}
                      min={0}
                      step={0.1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Poor (0%)</span>
                      <span className="text-white font-medium">
                        {Math.round(effectivenessAdjustment * 100)}%
                      </span>
                      <span>Excellent (100%)</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleUpdateEffectiveness}
                    className="w-full bg-cyan-600 hover:bg-cyan-500"
                  >
                    Update Effectiveness
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-sm text-gray-400">Usage Count</p>
                    <p className="text-xl font-bold text-white">{selectedBehavior.usage_count}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Used</p>
                    <p className="text-sm text-white">
                      {new Date(selectedBehavior.last_used).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 pt-2 border-t border-gray-700">
                  <p>Behavior ID: {selectedBehavior.id}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-400">Select a behavior to control its effectiveness</p>
                <p className="text-sm text-gray-500 mt-2">
                  You can adjust how effective each adaptive behavior is for better personalization
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdaptiveBehaviorPanel;
