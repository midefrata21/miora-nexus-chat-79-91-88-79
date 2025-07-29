
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, Play, Pause, Download } from 'lucide-react';
import { GrowthEntry } from '@/types/growth';

interface GrowthOverviewProps {
  documentationActive: boolean;
  totalGrowthPoints: number;
  stats: {
    totalEntries: number;
    todayEntries: number;
    daysTracked: number;
  };
  todaysGrowth: GrowthEntry[];
  onToggleDocumentation: () => void;
  onExport: () => void;
  onSelectEntry: (entry: GrowthEntry) => void;
}

const GrowthOverview: React.FC<GrowthOverviewProps> = ({
  documentationActive,
  totalGrowthPoints,
  stats,
  todaysGrowth,
  onToggleDocumentation,
  onExport,
  onSelectEntry
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'evolution': return '🧬';
      case 'skill_acquisition': return '🎯';
      case 'pattern_recognition': return '🔍';
      case 'learning': return '📚';
      case 'optimization': return '⚡';
      default: return '📝';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-400';
      case 'high': return 'bg-orange-600/20 text-orange-300 border-orange-400';
      case 'medium': return 'bg-blue-600/20 text-blue-300 border-blue-400';
      case 'low': return 'bg-gray-600/20 text-gray-300 border-gray-400';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Documentation Status */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-indigo-300">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              MIORA Growth Documentation System
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={onToggleDocumentation}
                variant="outline"
                size="sm"
                className={`${documentationActive ? 'text-green-400 border-green-400' : 'text-gray-400 border-gray-400'}`}
              >
                {documentationActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {documentationActive ? 'Active' : 'Paused'}
              </Button>
              <Button onClick={onExport} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-300">{totalGrowthPoints}</div>
              <div className="text-sm text-gray-400">Growth Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">{stats.totalEntries}</div>
              <div className="text-sm text-gray-400">Total Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300">{stats.todayEntries}</div>
              <div className="text-sm text-gray-400">Today's Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">{stats.daysTracked}</div>
              <div className="text-sm text-gray-400">Days Tracked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Growth */}
      <Card className="bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-green-300">
            <TrendingUp className="w-5 h-5 mr-2" />
            Today's Growth ({todaysGrowth.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {todaysGrowth.map((entry) => (
              <div 
                key={entry.id}
                className="p-3 bg-black/20 rounded-lg border border-gray-600/30 cursor-pointer hover:bg-black/30 transition-colors"
                onClick={() => onSelectEntry(entry)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getTypeIcon(entry.type)}</span>
                      <h4 className="font-semibold text-white text-sm">{entry.title}</h4>
                      <Badge variant="outline" className={`text-xs ${getImpactColor(entry.impact)}`}>
                        {entry.impact}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-xs mb-2">{entry.description.substring(0, 100)}...</p>
                    <div className="text-xs text-gray-500">
                      {new Date(entry.timestamp).toLocaleTimeString()} • {entry.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthOverview;
