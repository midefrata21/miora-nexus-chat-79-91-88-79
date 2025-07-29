
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, TrendingUp, MessageCircle, Clock, Target } from 'lucide-react';

interface ConversationPattern {
  id: string;
  patternType: 'topic_preference' | 'communication_style' | 'response_timing' | 'emotional_adaptation';
  pattern: string;
  frequency: number;
  confidence: number;
  lastSeen: number;
  examples: string[];
}

interface ConversationPatternAnalyzerProps {
  patterns: ConversationPattern[];
  onAnalyzePattern: (timeframe: 'recent' | 'all') => ConversationPattern[];
}

const ConversationPatternAnalyzer: React.FC<ConversationPatternAnalyzerProps> = ({
  patterns,
  onAnalyzePattern
}) => {
  const [selectedPattern, setSelectedPattern] = useState<ConversationPattern | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzePatterns = async (timeframe: 'recent' | 'all') => {
    setIsAnalyzing(true);
    try {
      const newPatterns = onAnalyzePattern(timeframe);
      console.log(`Analyzed ${newPatterns.length} patterns for ${timeframe} timeframe`);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPatternIcon = (type: ConversationPattern['patternType']) => {
    switch (type) {
      case 'topic_preference': return <Target className="h-4 w-4" />;
      case 'communication_style': return <MessageCircle className="h-4 w-4" />;
      case 'response_timing': return <Clock className="h-4 w-4" />;
      case 'emotional_adaptation': return <Brain className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getPatternTypeLabel = (type: ConversationPattern['patternType']) => {
    switch (type) {
      case 'topic_preference': return 'Topic Preference';
      case 'communication_style': return 'Communication Style';
      case 'response_timing': return 'Response Timing';
      case 'emotional_adaptation': return 'Emotional Adaptation';
      default: return 'General Pattern';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400 border-green-400';
    if (confidence >= 0.6) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Brain className="h-5 w-5 mr-2" />
            Pattern Analysis Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              onClick={() => handleAnalyzePatterns('recent')}
              disabled={isAnalyzing}
              className="bg-purple-600 hover:bg-purple-500"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Recent Patterns'}
            </Button>
            <Button
              onClick={() => handleAnalyzePatterns('all')}
              disabled={isAnalyzing}
              variant="outline"
              className="border-purple-500 text-purple-400"
            >
              Analyze All Patterns
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patterns List */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Detected Patterns
              </div>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                {patterns.length} patterns
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {patterns.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-400">No patterns detected yet</p>
                    <p className="text-sm text-gray-500">Start analyzing conversations to detect patterns</p>
                  </div>
                ) : (
                  patterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      onClick={() => setSelectedPattern(pattern)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPattern?.id === pattern.id
                          ? 'border-purple-500 bg-purple-900/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getPatternIcon(pattern.patternType)}
                          <Badge variant="outline" className="text-xs">
                            {getPatternTypeLabel(pattern.patternType)}
                          </Badge>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getConfidenceColor(pattern.confidence)}`}
                        >
                          {Math.round(pattern.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-200 mb-2">{pattern.pattern}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Frequency: {pattern.frequency}</span>
                        <span>Last seen: {new Date(pattern.lastSeen).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={pattern.confidence * 100} className="h-1" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Pattern Details */}
        <Card className="bg-black/40 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Pattern Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPattern ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getPatternIcon(selectedPattern.patternType)}
                    <h3 className="text-lg font-semibold text-white">
                      {getPatternTypeLabel(selectedPattern.patternType)}
                    </h3>
                  </div>
                  <p className="text-gray-300">{selectedPattern.pattern}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Confidence Level</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={selectedPattern.confidence * 100} className="flex-1 h-2" />
                      <span className="text-sm text-white">{Math.round(selectedPattern.confidence * 100)}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Frequency</p>
                    <p className="text-lg font-semibold text-white">{selectedPattern.frequency}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Pattern Examples</p>
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {selectedPattern.examples.map((example, index) => (
                        <div key={index} className="p-2 bg-gray-800/50 rounded text-xs text-gray-300">
                          "{example}..."
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="text-xs text-gray-400">
                  <p>Pattern ID: {selectedPattern.id}</p>
                  <p>Last detected: {new Date(selectedPattern.lastSeen).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-400">Select a pattern to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConversationPatternAnalyzer;
