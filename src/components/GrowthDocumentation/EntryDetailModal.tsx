
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GrowthEntry } from '@/types/growth';

interface EntryDetailModalProps {
  entry: GrowthEntry | null;
  onClose: () => void;
}

const EntryDetailModal: React.FC<EntryDetailModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

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
    <Card className="fixed inset-4 z-50 bg-gray-900/95 border border-purple-500/30 overflow-y-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-300">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{getTypeIcon(entry.type)}</span>
            {entry.title}
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            ✕
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="outline" className={getImpactColor(entry.impact)}>
              {entry.impact} impact
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-400">
              {entry.category}
            </Badge>
            <Badge variant="outline" className="text-gray-300 border-gray-400">
              {new Date(entry.timestamp).toLocaleString()}
            </Badge>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Description</h4>
            <p className="text-gray-300">{entry.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Evidence</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {entry.evidence.map((evidence: string, index: number) => (
                <li key={index}>{evidence}</li>
              ))}
            </ul>
          </div>
          
          {entry.measurableImprovement && (
            <div>
              <h4 className="font-semibold text-white mb-2">Measurable Improvement</h4>
              <p className="text-gray-300">
                {entry.measurableImprovement.metric}: {entry.measurableImprovement.before} → {entry.measurableImprovement.after} {entry.measurableImprovement.unit}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EntryDetailModal;
