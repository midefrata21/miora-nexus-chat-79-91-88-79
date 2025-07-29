import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Database, Clock, MessageSquare, TrendingUp, User } from 'lucide-react';
import { useMemoryTracker } from '@/hooks/useMemoryTracker';

export const MemoryTrackingPanel: React.FC = () => {
  const {
    shortTermMemory,
    longTermMemory,
    masterProfile,
    totalInteractions,
    memoryStats,
    addMemory,
    getRelevantContext
  } = useMemoryTracker();

  const [recentInsights, setRecentInsights] = useState<string[]>([]);

  useEffect(() => {
    // Generate insights based on memory data
    const insights = [
      `Stored ${memoryStats.shortTermCount} short-term memories`,
      `${memoryStats.longTermCount} long-term memory banks active`,
      `Total interactions: ${totalInteractions}`,
      `Master profile: ${memoryStats.hasMasterProfile ? 'Configured' : 'Not set'}`
    ];
    setRecentInsights(insights);
  }, [memoryStats, totalInteractions]);

  const handleTestMemory = () => {
    addMemory(
      "Test memory storage with MIORA database integration", 
      "Memory stored successfully in advanced database system", 
      "database_integration_test"
    );
  };

  return (
    <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-purple-300 flex items-center text-sm">
          <Brain className="h-5 w-5 mr-2" />
          Memory Tracking System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Memory Stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Short Term</span>
              <span className="text-purple-300 font-bold">
                {memoryStats.shortTermCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Long Term</span>
              <span className="text-pink-300 font-bold">
                {memoryStats.longTermCount}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total</span>
              <span className="text-cyan-300 font-bold">
                {totalInteractions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Profile</span>
              <Badge className={`${memoryStats.hasMasterProfile ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs`}>
                {memoryStats.hasMasterProfile ? 'SET' : 'NONE'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Memory Utilization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Memory Utilization</span>
            <span className="text-xs text-purple-300">
              {((memoryStats.shortTermCount + memoryStats.longTermCount) / 100 * 100).toFixed(0)}%
            </span>
          </div>
          <Progress 
            value={Math.min(100, (memoryStats.shortTermCount + memoryStats.longTermCount) * 5)} 
            className="h-1.5" 
          />
        </div>

        {/* Recent Memories */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-purple-300">Recent Memories</h4>
          <ScrollArea className="h-16">
            <div className="space-y-1">
              {shortTermMemory.slice(-3).map((memory, index) => (
                <div key={index} className="text-xs p-2 bg-purple-900/20 rounded border border-purple-500/20">
                  <div className="text-gray-300 truncate">
                    {memory.userInput.substring(0, 40)}...
                  </div>
                  <div className="text-gray-500 text-[10px] flex items-center mt-1">
                    <Clock className="h-2 w-2 mr-1" />
                    {new Date(memory.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Master Profile Summary */}
        {masterProfile && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-pink-300">Master Profile</h4>
            <div className="text-xs p-2 bg-pink-900/20 rounded border border-pink-500/20">
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1 text-pink-400" />
                <span className="text-white font-medium">{masterProfile.name}</span>
              </div>
              <div className="text-gray-400 mt-1">{masterProfile.company}</div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={handleTestMemory}
            size="sm"
            className="bg-purple-600 hover:bg-purple-500 text-xs px-3 py-1 h-auto"
          >
            <Database className="h-3 w-3 mr-1" />
            Test Memory
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};