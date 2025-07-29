
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Plus, TrendingUp, Target } from 'lucide-react';
import { useGrowthDocumentation } from '@/hooks/useGrowthDocumentation';

export const GrowthTracker: React.FC = () => {
  const { todaysGrowth, totalGrowthPoints, recordGrowth } = useGrowthDocumentation();

  const addSampleGrowth = () => {
    const now = Date.now();
    recordGrowth({
      id: `manual_${now}`,
      timestamp: now,
      type: 'learning',
      title: 'Manual Growth Entry',
      description: 'Contoh pertumbuhan yang didokumentasikan secara manual',
      impact: 'medium',
      category: 'manual_documentation',
      evidence: ['User initiated growth tracking', 'System capability test']
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center text-2xl">
            <Brain className="h-8 w-8 mr-3" />
            Growth Tracker Dashboard
          </CardTitle>
          <p className="text-gray-300">
            Monitor dan dokumentasikan pertumbuhan pembelajaran MIORA
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-300">{todaysGrowth.length}</div>
              <div className="text-sm text-gray-400">Pertumbuhan Hari Ini</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-300">{totalGrowthPoints}</div>
              <div className="text-sm text-gray-400">Total Growth Points</div>
            </div>
            <div className="text-center space-y-2">
              <Button onClick={addSampleGrowth} className="bg-green-600 hover:bg-green-500">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Growth
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Growth Entries */}
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Pertumbuhan Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysGrowth.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              Belum ada pertumbuhan yang didokumentasikan hari ini
            </p>
          ) : (
            <div className="space-y-3">
              {todaysGrowth.map((entry) => (
                <div key={entry.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{entry.title}</h4>
                    <Badge variant="outline" className={`text-xs ${
                      entry.impact === 'critical' ? 'border-red-500 text-red-400' :
                      entry.impact === 'high' ? 'border-orange-500 text-orange-400' :
                      entry.impact === 'medium' ? 'border-blue-500 text-blue-400' :
                      'border-gray-500 text-gray-400'
                    }`}>
                      {entry.impact.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{entry.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.evidence.slice(0, 3).map((evidence, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-green-300 border-green-400">
                        {evidence}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthTracker;
